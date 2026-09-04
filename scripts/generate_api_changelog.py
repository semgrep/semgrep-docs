#!/usr/bin/env python3
# /// script
# requires-python = ">=3.9"
# dependencies = ["pyyaml"]
#
# [tool.uv]
# exclude-newer = "1 week"
# ///
#
# Generate a Mintlify changelog page (docs/api-reference/*/Changelog.mdx) from
# an OpenAPI spec's git history.
#
# Why this exists: the API reference is rendered straight from the checked-in
# specs, so the spec's git history *is* the API's change history — but nothing
# surfaced it to readers. This script walks that history with oasdiff
# (https://github.com/oasdiff/oasdiff), which diffs the specs semantically:
# line reorders from sort_openapi_nav.py and description edits from
# mirror_openapi.py produce no entries, only consumer-affecting changes do.
#
# How dates work: commits touching the spec are collapsed to one snapshot per
# committer-date (the day's final state — intra-day flip-flops intentionally
# vanish), and consecutive snapshots are diffed to make one <Update> block per
# day. If the working tree differs from HEAD (the update-openapi-specs.yml
# cron fetches fresh specs before committing), a snapshot dated "today" is
# added so the changelog entry lands in the same PR as the spec change. Should
# that PR merge on a later day, the next full regeneration re-dates the entry
# to the merge commit's date — a small, self-correcting relabel diff.
#
# The page is fully regenerated on every run (idempotent, and retroactively
# consistent if tooling changes). Output is a pure function of git history and
# the oasdiff version, so keep oasdiff pinned in CI — bumping it may reword
# every entry at once, which is expected and fine in a deliberate bump PR.
#
# Requires the oasdiff binary (brew install oasdiff, or see the pinned install
# in .github/workflows/update-openapi-specs.yml) and full git history (not a
# shallow clone).

from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Callable, NamedTuple, Optional

import yaml

# Spec-hygiene checks aimed at API maintainers, not consumers. The `info`
# section only ever changes when the spec's own version/title metadata does
# (e.g. "major version did not increase"), which is meaningless noise on a
# reader-facing changelog.
EXCLUDED_SECTIONS = frozenset(("info",))

# Checks dropped outright, by id.
#
# A tag is documentation grouping: it decides which nav group an endpoint
# renders under, not what the endpoint accepts or returns. Regrouping the
# public API into its new services re-tags roughly 200 endpoints, and oasdiff
# emits an `added` and a `removed` for each, so the whole reorganisation would
# land as ~400 rows on one date -- a new <Update>, which is the one thing that
# still publishes to RSS subscribers. That would announce an internal filing
# change as the largest entry in the feed's history while burying the real
# changes shipped that day.
#
# Not entirely free: some SDK generators namespace by tag, so a consumer
# generating a client from the published spec could see a method move class.
# It is still not a change to the HTTP contract -- same path, same request,
# same response -- and oasdiff itself rates both checks INFO.
EXCLUDED_CHECKS = frozenset(("api-tag-added", "api-tag-removed"))

# oasdiff levels we deliberately disagree with, keyed by check id.
#
# oasdiff rates a new *response* enum value WARN (potentially breaking) on the
# theory that a consumer exhaustively switching on the enum, or validating
# responses against a closed set, breaks when an unseen value arrives. That is
# reasonable for a hand-written spec, but ours are generated from protobuf,
# where enums are open by construction and gaining values is routine
# evolution -- so every sync filed a pile of `SCAN_STATUS_*`-style additions
# under a "Potentially breaking changes" heading and buried the actual
# removals. Request-side enum additions are already INFO upstream (the server
# accepting strictly more input cannot break a caller), so only the response
# side needs correcting.
LEVEL_OVERRIDES = {
    "response-property-enum-value-added": 1,
}

# oasdiff names properties with JSON Schema's internal vocabulary, which leaks
# spec plumbing into reader-facing text. Three rewrites turn a path into the
# field reference a consumer would actually write:
#
#   1. `allOf[#/components/schemas/protos.projects.v1.RepoFilters]` segments are
#      dropped. These specs are protobuf-generated and wrap every described
#      $ref in a single-element allOf (the OpenAPI 3.0 workaround for $ref
#      siblings being ignored), so the segment is pure composition bookkeeping
#      -- the wire payload has no such level, and dropping it makes the path
#      *more* accurate as well as shorter. It also happens to be the only place
#      an internal proto package name appears.
#   2. An `items` segment means "element of the preceding array", so it folds
#      into the parent as `[]`. A trailing one (an array of scalars, e.g.
#      `repositoryId/items/`) would otherwise dangle.
#   3. `/` becomes `.`, matching how the field is addressed in JSON.
#
# Field-name *case* is deliberately never touched: the specs inconsistently
# emit both `deployment_id` and `deploymentId` depending on the service, and
# the changelog has to name the key the endpoint actually accepts.
# Stripped whole, before splitting on "/": the JSON pointer inside the brackets
# contains slashes of its own, so a naive split would shred it.
ALLOF_SEGMENT = re.compile(r"/allOf\[[^\]]*\]")


def humanize_property_path(path: str) -> str:
    """`a/items/b/allOf[#/...]/c` -> `a[].b.c`. Non-paths pass through."""
    out: list[str] = []
    for segment in ALLOF_SEGMENT.sub("", path).split("/"):
        if not segment:
            continue
        if segment == "items" and out:
            out[-1] += "[]"
            continue
        out.append(segment)
    return ".".join(out)


def humanize_change_text(change: dict) -> dict:
    """Rewrite property paths inside the change's code spans."""
    text = change.get("text") or ""
    if "`" not in text:
        return change
    parts = text.split("`")
    if len(parts) % 2 == 0:  # unbalanced backticks: leave well alone
        return change
    for i in range(1, len(parts), 2):  # odd indices are code spans
        span = parts[i]
        # a leading "/" marks a URL path, not a property path
        if "/" in span and not span.startswith("/"):
            parts[i] = humanize_property_path(span)
    rewritten = "`".join(parts)
    return change if rewritten == text else {**change, "text": rewritten}


MONTHS = (
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
)

BREAKING = 3
POTENTIALLY_BREAKING = 2

SECTION_TITLES = {
    BREAKING: "Breaking changes",
    POTENTIALLY_BREAKING: "Potentially breaking changes",
    1: "Changes",
}

# One upstream sync often lands the same kind of change many times over — six
# enum values added to one property, a dozen properties switching `uint32` to
# `int64`. Rendering each as its own bullet buries the day's real news, so
# changes whose oasdiff text differs only in one identifier are folded into a
# single bullet. Keyed by oasdiff check id; the regex names the varying token
# `value` and any other groups become part of the merge key (changes merge only
# when everything but `value` matches). Texts that don't match the expected
# wording (e.g. after an oasdiff upgrade) are left verbatim.
COALESCIBLE = {
    "request-property-enum-value-added": (
        re.compile(r"^added the new `(?P<value>[^`]+)` enum value to the request property `(?P<prop>[^`]+)`$"),
        "added the new {values} enum values to the request property `{prop}`",
    ),
    "response-property-enum-value-added": (
        re.compile(
            r"^added the new `(?P<value>[^`]+)` enum value to the `(?P<prop>[^`]+)` response property"
            r" for the response status `(?P<status>[^`]+)`$"
        ),
        "added the new {values} enum values to the `{prop}` response property"
        " for the response status `{status}`",
    ),
    "request-parameter-enum-value-added": (
        re.compile(
            r"^added the new enum value `(?P<value>[^`]+)` to the `(?P<loc>[^`]+)`"
            r" request parameter `(?P<param>[^`]+)`$"
        ),
        "added the new enum values {values} to the `{loc}` request parameter `{param}`",
    ),
    "request-property-type-changed": (
        re.compile(
            r"^the `(?P<value>[^`]+)` request property `(?P<attr>[^`]+)` changed"
            r" from `(?P<old>[^`]+)` to `(?P<new>[^`]+)`$"
        ),
        "the `{attr}` of the request properties {values} changed from `{old}` to `{new}`",
    ),
    "response-property-type-changed": (
        re.compile(
            r"^the `(?P<value>[^`]+)` response's property `(?P<attr>[^`]+)` changed"
            r" from `(?P<old>[^`]+)` to `(?P<new>[^`]+)` for status `(?P<status>[^`]+)`$"
        ),
        "the `{attr}` of the response properties {values} changed"
        " from `{old}` to `{new}` for status `{status}`",
    ),
    "request-parameter-type-changed": (
        re.compile(
            r"^for the `(?P<loc>[^`]+)` request parameter `(?P<value>[^`]+)`, the `(?P<attr>[^`]+)`"
            r" was changed from `(?P<old>[^`]+)` to `(?P<new>[^`]+)`$"
        ),
        "for the `{loc}` request parameters {values}, the `{attr}`"
        " was changed from `{old}` to `{new}`",
    ),
}


class Snapshot(NamedTuple):
    ref: Optional[str]  # commit sha, or None for the working tree
    date: str  # ISO YYYY-MM-DD


class Entry(NamedTuple):
    date: str  # ISO YYYY-MM-DD
    changes: list


def repo_root() -> Path:
    out = subprocess.run(
        ["git", "rev-parse", "--show-toplevel"],
        capture_output=True, text=True, check=True,
    )
    return Path(out.stdout.strip())


def list_snapshots(spec_rel: str, cwd: Path) -> list[Snapshot]:
    """One snapshot per committer-date the spec changed on, newest first.

    --first-parent keeps dates monotonic along the main branch; without it,
    commits authored days earlier on a side branch would interleave.
    """
    out = subprocess.run(
        ["git", "log", "--first-parent", "--format=%H %cs", "--", spec_rel],
        capture_output=True, text=True, check=True, cwd=cwd,
    )
    snapshots: list[Snapshot] = []
    seen_dates = set()
    for line in out.stdout.splitlines():
        sha, _, date = line.strip().partition(" ")
        if not sha or date in seen_dates:
            continue  # git log is newest-first: first hash = day's final state
        seen_dates.add(date)
        snapshots.append(Snapshot(sha, date))
    return snapshots


def working_tree_differs(spec_rel: str, cwd: Path) -> bool:
    return (
        subprocess.run(
            ["git", "diff", "--quiet", "HEAD", "--", spec_rel], cwd=cwd
        ).returncode
        != 0
    )


def run_oasdiff(base: str, rev: str, oasdiff_bin: str, cwd: Path) -> Optional[list]:
    """Changes between two spec revisions, or None if oasdiff failed.

    Exit code 0 covers both "changes found" and "no changes" (we don't pass
    --fail-on), so a non-zero exit always means a real error such as an
    unparseable revision.
    """
    result = subprocess.run(
        [oasdiff_bin, "changelog", "--format", "json", "--flatten-allof", base, rev],
        capture_output=True, text=True, cwd=cwd,
    )
    if result.returncode != 0:
        print(
            f"warning: oasdiff failed for {base} -> {rev}: {result.stderr.strip()}",
            file=sys.stderr,
        )
        return None
    return json.loads(result.stdout)


def _revision_arg(snapshot: Snapshot, spec_rel: str) -> str:
    return f"{snapshot.ref}:{spec_rel}" if snapshot.ref else spec_rel


def build_entries(
    snapshots: list[Snapshot],
    spec_rel: str,
    diff: Callable[[str, str], Optional[list]],
) -> list[Entry]:
    """Diff consecutive snapshots into per-date entries, newest first.

    The oldest snapshot is the baseline and never gets an entry — diffing it
    against nothing would report every endpoint as "added".
    """
    ordered = list(reversed(snapshots))  # oldest -> newest
    if not ordered:
        return []

    entries: list[Entry] = []
    last_good = ordered[0]
    for snapshot in ordered[1:]:
        rev_arg = _revision_arg(snapshot, spec_rel)
        changes = diff(_revision_arg(last_good, spec_rel), rev_arg)
        if changes is None:
            # Decide which side is unparseable: if the newer side self-diffs
            # cleanly, the base was bad — drop it and let its successor's diff
            # pick up any changes; otherwise skip the newer snapshot.
            if diff(rev_arg, rev_arg) is not None:
                last_good = snapshot
            continue
        changes = [
            c
            for c in changes
            if c.get("section") not in EXCLUDED_SECTIONS
            and c.get("id") not in EXCLUDED_CHECKS
        ]
        changes = [humanize_change_text(apply_level_override(c)) for c in changes]
        if changes:
            entries.append(Entry(snapshot.date, changes))
        last_good = snapshot
    return list(reversed(entries))


def apply_level_override(change: dict) -> dict:
    """Re-level a change per LEVEL_OVERRIDES, leaving others untouched."""
    override = LEVEL_OVERRIDES.get(change.get("id"))
    if override is None or change.get("level") == override:
        return change
    return {**change, "level": override}


def format_date(iso: str) -> str:
    """"2026-08-07" -> "August 7, 2026" (no strftime: %-d is platform-bound)."""
    year, month, day = iso.split("-")
    return f"{MONTHS[int(month) - 1]} {int(day)}, {int(year)}"


def _escape_segment(text: str) -> str:
    text = text.replace("&", "&amp;")
    text = text.replace("<", "&lt;").replace(">", "&gt;")
    text = text.replace("{", "&#123;").replace("}", "&#125;")
    for char in "*_[]":
        text = text.replace(char, "\\" + char)
    return text


def escape_mdx(text: str) -> str:
    """Escape MDX-hazardous characters, preserving `code spans`.

    oasdiff wraps identifiers in backticks; inside a code span MDX treats
    braces and angle brackets literally, so only text outside spans needs
    entity-escaping. Unbalanced backticks can't delimit spans — escape them.
    """
    parts = text.split("`")
    if len(parts) % 2 == 0:  # odd backtick count: not span-delimited
        return _escape_segment(text).replace("`", "\\`")
    for i in range(0, len(parts), 2):  # even indices sit outside code spans
        parts[i] = _escape_segment(parts[i])
    return "`".join(parts)


def coalesce_changes(changes: list) -> list:
    """Fold same-kind changes that differ only in one identifier into one.

    See COALESCIBLE. Order follows first appearance of each merge bucket, and
    a bucket with a single change keeps its original dict untouched.
    """
    buckets: dict = {}
    order: list = []
    for change in changes:
        pattern, template = COALESCIBLE.get(change.get("id"), (None, None))
        match = pattern.match(change["text"]) if pattern else None
        if match:
            fixed = {k: v for k, v in match.groupdict().items() if k != "value"}
            key = (
                change["id"], change.get("operation"), change.get("path"),
                tuple(sorted(fixed.items())),
            )
            bucket = buckets.setdefault(key, {"changes": [], "values": [], "fixed": fixed, "template": template})
            bucket["changes"].append(change)
            bucket["values"].append(match.group("value"))
        else:
            key = ("verbatim", len(order))
            buckets[key] = {"changes": [change]}
        if key not in order:
            order.append(key)

    merged = []
    for key in order:
        bucket = buckets[key]
        if len(bucket["changes"]) == 1:
            merged.append(bucket["changes"][0])
            continue
        values = ", ".join(f"`{v}`" for v in sorted(bucket["values"]))
        merged.append(
            {**bucket["changes"][0], "text": bucket["template"].format(values=values, **bucket["fixed"])}
        )
    return merged


HTTP_METHODS = frozenset(
    ("get", "post", "put", "patch", "delete", "options", "head", "trace")
)

# Mintlify Badge colors per HTTP method, matching the API playground's visual
# language (green reads, blue creates, red deletes).
METHOD_BADGE_COLORS = {
    "GET": "green",
    "POST": "blue",
    "PUT": "orange",
    "PATCH": "yellow",
    "DELETE": "red",
}

# Verb chip for the table style's Change column, keyed on tokens of the
# oasdiff check id. Order matters: "api-path-removed-without-deprecation"
# contains both removal and deprecation words, and it is a removal.
CHANGE_VERBS = (
    (frozenset(("removed", "deleted")), ("Removed", "red")),
    (frozenset(("added", "new")), ("Added", "green")),
    (frozenset(("deprecated",)), ("Deprecated", "yellow")),
)
CHANGE_VERB_FALLBACKS = (
    frozenset(
        ("changed", "specialized", "narrowed", "generalized",
         "increased", "decreased", "restricted")
    ),
    ("Changed", "orange"),
)


def mintlify_slug(text: str) -> str:
    """Slugify the way Mintlify names its generated endpoint pages.

    Reverse-engineered and verified against the rendered site (every
    operation in both specs resolved with HTTP 200): lowercase; apostrophes
    stripped outright; underscores and square brackets preserved; every other
    run of non-alphanumerics becomes a single hyphen.
    """
    text = text.lower().replace("'", "")
    return re.sub(r"[^a-z0-9_\[\]]+", "-", text).strip("-")


def _default_page_title(method: str, path: str) -> str:
    """Mintlify's page title for operations without a summary.

    Path parameter segments become word breaks; adjacent literal segments
    run together: GET /api/agent/deployments/{id}/ignores ->
    "Get apiagentdeployments ignores".
    """
    text = "".join(
        " " if seg.startswith("{") else seg for seg in path.strip("/").split("/")
    )
    return f"{method.capitalize()} {' '.join(text.split())}"


def endpoint_urls(spec: dict, link_base: str) -> dict:
    """(METHOD, path) -> docs URL for every operation in the spec.

    Built from the *current* spec on purpose: pages only exist for endpoints
    that are still in it, so removed endpoints simply drop out of the map and
    render unlinked instead of pointing at a 404.
    """
    urls = {}
    for path, item in (spec.get("paths") or {}).items():
        if not isinstance(item, dict):
            continue
        for method, op in item.items():
            if method not in HTTP_METHODS or not isinstance(op, dict):
                continue
            tags = op.get("tags") or []
            if not tags:
                continue
            title = op.get("summary") or _default_page_title(method, path)
            # brackets are legal in Mintlify slugs but break markdown link
            # destinations, so percent-encode them
            slug = mintlify_slug(title).replace("[", "%5B").replace("]", "%5D")
            urls[(method.upper(), path)] = f"{link_base}/{mintlify_slug(tags[0])}/{slug}"
    return urls


def _endpoint_key(change: dict) -> tuple:
    path = change.get("path") or ""
    if not path:
        return (1, "", "")  # General bucket sorts after all endpoints
    return (0, path, change.get("operation") or "")


def _count_parts(changes: list) -> list[str]:
    """Non-zero severity counts, least-qualified last: ["2 breaking", "3 other"].

    Shared by the on-page summary and the RSS description so the two cannot
    disagree. The trailing noun is left to the caller, which appends it to the
    final part -- "2 breaking · 3 other changes" reads as one phrase, so a
    breaking-only day must still come out as "1 breaking change" rather than
    the bare "1 breaking". "other" is dropped when it stands alone, since
    there is then nothing for it to be other than.
    """
    breaking = sum(1 for c in changes if c["level"] == BREAKING)
    potential = sum(1 for c in changes if c["level"] == POTENTIALLY_BREAKING)
    other = len(changes) - breaking - potential
    counts = ((breaking, "breaking"), (potential, "potentially breaking"), (other, "other"))
    present = [(n, word) for n, word in counts if n]
    if len(present) == 1 and present[0][1] == "other":
        return [str(present[0][0])]
    return [f"{n} {word}" for n, word in present]


def _with_noun(parts: list[str], count: int) -> list[str]:
    """Append "change"/"changes" to the final part, agreeing with its count."""
    return parts[:-1] + [f"{parts[-1]} change{'s' if count != 1 else ''}"]


def _summary(changes: list) -> str:
    """Raw change counts, e.g. "2 breaking · 1 potentially breaking · 3 other changes"."""
    parts = _count_parts(changes)
    if not parts:
        return "no changes"
    last = int(parts[-1].split()[0])
    return " · ".join(_with_noun(parts, last))


def _jsx_string(text: str) -> str:
    """Escape text for a double-quoted JSX string literal."""
    return text.replace("\\", "\\\\").replace('"', '\\"')


def _rss_description(changes: list) -> str:
    """Plain-prose summary for RSS subscribers.

    Mintlify strips components, code and HTML from feed entries, and our
    entries are almost entirely a JSX table of Badges and links -- so without
    an explicit `rss` description a subscriber would receive an empty item.
    Prose rather than the interpunct-separated on-page summary, since this is
    read in a feed reader with no surrounding context.
    """
    parts = _count_parts(changes)
    if not parts:
        return "No changes."
    last = int(parts[-1].split()[0])
    parts = _with_noun(parts, last)
    if len(parts) == 1:
        listed = parts[0]
    elif len(parts) == 2:
        listed = f"{parts[0]} and {parts[1]}"  # no serial comma for a pair
    else:
        listed = ", ".join(parts[:-1]) + f", and {parts[-1]}"
    endpoints = {(c.get("operation"), c.get("path")) for c in changes if c.get("path")}
    if not endpoints:
        return f"{listed}."
    scope = "endpoint" if len(endpoints) == 1 else "endpoints"
    return f"{listed} across {len(endpoints)} {scope}."


def _render_section(changes: list, links: dict) -> list:
    """Bullets for one severity section, grouped by endpoint."""
    groups: dict[tuple, list] = {}
    for change in changes:
        groups.setdefault(_endpoint_key(change), []).append(change)

    lines = []
    for key in sorted(groups):
        texts = [
            escape_mdx(c["text"])
            for c in sorted(groups[key], key=lambda c: (c["id"], c["text"]))
        ]
        if key[0] == 1:  # General bucket: schema/security changes, no endpoint
            lines.extend(f"- {text}" for text in texts)
            continue
        lead = _endpoint_cell(key, links)
        if len(texts) == 1:
            lines.append(f"- {lead}: {texts[0]}")
        else:
            lines.append(f"- {lead}:")
            lines.extend(f"  - {text}" for text in texts)
    return lines


def _change_verb(change: dict) -> tuple:
    """(label, badge color) for the table's Change column, from the check id."""
    tokens = set(change.get("id", "").split("-"))
    for words, verb in CHANGE_VERBS:
        if tokens & words:
            return verb
    if tokens & CHANGE_VERB_FALLBACKS[0]:
        return CHANGE_VERB_FALLBACKS[1]
    return ("Changed", "gray")


def _endpoint_cell(key: tuple, links: dict) -> str:
    if key[0] == 1:  # General bucket: schema/security changes, no endpoint
        return "—"
    operation, path = key[2], key[1]
    color = METHOD_BADGE_COLORS.get(operation, "gray")
    url = links.get((operation, path))
    target = f"[`{path}`]({url})" if url else f"`{path}`"
    return f'<Badge color="{color}" size="sm">{operation}</Badge> {target}'


def _escape_jsx_text(text: str) -> str:
    """Escape text placed as JSX element children (Badge content).

    Braces open JSX expressions and angle brackets open tags; HTML entities
    are decoded by the JSX runtime, so they render as the literal characters.
    """
    text = text.replace("&", "&amp;")
    text = text.replace("<", "&lt;").replace(">", "&gt;")
    return text.replace("{", "&#123;").replace("}", "&#125;")


def _endpoint_pill(key: tuple, links: dict) -> str:
    """Table style's endpoint cell: one clickable pill with method + path.

    A raw <a> rather than a markdown link because Mintlify underlines links
    with a bottom border, which the inline style suppresses. <wbr/> after
    each path segment lets the pill wrap instead of overflowing the table
    (paths are single unbreakable tokens otherwise) without inserting
    characters that would survive copy-paste.
    """
    if key[0] == 1:  # General bucket: schema/security changes, no endpoint
        return "—"
    operation, path = key[2], key[1]
    color = METHOD_BADGE_COLORS.get(operation, "gray")
    escaped = _escape_jsx_text(path)
    wrappable = escaped[0] + escaped[1:].replace("/", "<wbr/>/")
    badge = f'<Badge color="{color}" size="sm">{operation} {wrappable}</Badge>'
    url = links.get((operation, path))
    if not url:
        return badge
    return (
        f'<a href="{url}" style={{{{ textDecoration: "none", borderBottom: "none" }}}}>'
        f"{badge}</a>"
    )


def _render_section_table(changes: list, links: dict) -> list:
    """One table for a severity section: Change | Description | Endpoint."""
    groups: dict[tuple, list] = {}
    for change in changes:
        groups.setdefault(_endpoint_key(change), []).append(change)

    # The div carries a hook for docs/styles.css, which hugs the Change
    # column to its chip; plain markdown tables offer no width control.
    lines = [
        '<div className="api-changelog-table">',
        "",
        "| Change | Description | Endpoint |",
        "|---|---|---|",
    ]
    for key in sorted(groups):
        cell = _endpoint_pill(key, links)
        for change in sorted(groups[key], key=lambda c: (c["id"], c["text"])):
            verb, color = _change_verb(change)
            description = escape_mdx(change["text"]).replace("|", "\\|")
            lines.append(
                f'| <Badge color="{color}" size="sm">{verb}</Badge>'
                f" | {description} | {cell} |"
            )
    lines.extend(["", "</div>"])
    return lines


def _render_update(
    entry: Entry, links: dict, style: str = "table", api_name: Optional[str] = None
) -> str:
    label = format_date(entry.date)
    attrs = [f'label="{label}"', f'description="{_summary(entry.changes)}"']
    if any(c["level"] == BREAKING for c in entry.changes):
        attrs.append('tags={["Breaking"]}')
    # Pins the feed to one item per <Update>. Without it Mintlify emits one
    # entry per Markdown heading inside the block, so a day with three
    # severity sections becomes three items titled "Breaking changes",
    # "Potentially breaking changes" and "Changes" -- undated, and repeated
    # across every day. It also decouples the feed from the heading structure:
    # a re-level that adds or drops a section heading would otherwise count as
    # "modifying headings inside an existing Update" and republish the entry.
    rss_title = f"{api_name} — {label}" if api_name else label
    attrs.append(
        'rss={{ title: "%s", description: "%s" }}'
        % (_jsx_string(rss_title), _jsx_string(_rss_description(entry.changes)))
    )

    render_section = _render_section_table if style == "table" else _render_section
    changes = coalesce_changes(entry.changes)
    lines = [f"<Update {' '.join(attrs)}>"]
    first = True
    for level in (BREAKING, POTENTIALLY_BREAKING, 1):
        section = [c for c in changes if (c["level"] if c["level"] in SECTION_TITLES else 1) == level]
        if not section:
            continue
        if not first:
            lines.append("")
        first = False
        # Bold rather than a Markdown heading, deliberately. Mintlify
        # republishes a feed entry when a heading inside an existing <Update>
        # is modified, and which severity sections a day has depends on the
        # level mapping -- so a re-level (see LEVEL_OVERRIDES) or an oasdiff
        # bump would re-notify every subscriber about months-old entries.
        # With no headings in the block, the only publish trigger left is
        # adding a new <Update>. The rss= prop supplies the feed title, so
        # nothing depends on these being headings.
        lines.append(f"**{SECTION_TITLES[level]}**")
        lines.append("")
        lines.extend(render_section(section, links))
    lines.append("</Update>")
    return "\n".join(lines)


def _rss_callout(rss_url: str) -> str:
    """Subscribe instructions.

    Mintlify emits a `<link rel="alternate" type="application/rss+xml">` tag
    for `rss: true` pages, which is autodiscovery only -- it renders no
    visible affordance -- so the page has to say this itself.
    """
    return (
        "<Note>\n"
        f"  **Subscribe to this changelog:** add [`{rss_url}`]({rss_url}) to any\n"
        f"  feed reader, or run `/feed subscribe {rss_url}` in Slack to post new\n"
        "  entries to a channel. Most readers also accept this page's own URL and\n"
        "  find the feed automatically.\n"
        "</Note>"
    )


def render_page(
    api_name: str,
    api_href: Optional[str],
    note: Optional[str],
    entries: list[Entry],
    links: Optional[dict] = None,
    style: str = "table",
    rss_url: Optional[str] = None,
) -> str:
    name = f"[{api_name}]({api_href})" if api_href else api_name
    intro = (
        f"Changes to the {name}, detected by\n"
        "comparing successive versions of its OpenAPI specification. Breaking changes\n"
        "are labeled; documentation-only edits are not listed."
    )
    if note:
        intro += f" {note}"

    blocks = [
        "---",
        'title: "Changelog"',
        f'description: "Changes to the {api_name}, generated from its OpenAPI specification."',
        "rss: true",
        "---",
        "",
        "{/* Auto-generated by scripts/generate_api_changelog.py -- do not edit by hand. */}",
        "",
        intro,
        "",
    ]
    if rss_url:
        blocks.extend([_rss_callout(rss_url), ""])
    if entries:
        blocks.append(
            "\n\n".join(
                _render_update(entry, links or {}, style, api_name) for entry in entries
            )
        )
    else:
        blocks.append("No API changes recorded yet.")
    return "\n".join(blocks) + "\n"


def main(argv: Optional[list[str]] = None) -> int:
    parser = argparse.ArgumentParser(
        description="Generate a Mintlify changelog page from an OpenAPI spec's git history."
    )
    parser.add_argument("spec", help="path to the OpenAPI spec (tracked in git)")
    parser.add_argument("output", help="path of the Changelog.mdx to write")
    parser.add_argument("--api-name", required=True, help='e.g. "Semgrep API v1"')
    parser.add_argument("--api-href", help="docs link for the API name in the intro")
    parser.add_argument("--note", help="extra sentence appended to the intro")
    parser.add_argument(
        "--rss-url",
        help="absolute URL of the page's Mintlify RSS feed (the page path with"
        " /rss.xml appended); when set, the page carries subscribe instructions",
    )
    parser.add_argument(
        "--link-base",
        help="URL prefix of the generated endpoint pages (e.g. /api-reference/v1);"
        " when set, endpoint mentions link to their reference page",
    )
    parser.add_argument(
        "--style",
        choices=("table", "list"),
        default="table",
        help="table: Stripe-style Change/Description/Endpoint tables (default);"
        " list: endpoint-grouped bullets",
    )
    parser.add_argument(
        "--no-working-tree", action="store_true",
        help="ignore uncommitted spec changes (only diff committed history)",
    )
    parser.add_argument("--today", help="date label for working-tree changes (YYYY-MM-DD)")
    parser.add_argument("--oasdiff-bin", default="oasdiff")
    parser.add_argument(
        "--max-entries", type=int, default=0,
        help="cap the page at the newest N entries (0 = unlimited)",
    )
    args = parser.parse_args(argv)

    cwd = repo_root()
    spec_rel = Path(args.spec).resolve().relative_to(cwd).as_posix()

    snapshots = list_snapshots(spec_rel, cwd)
    if not snapshots:
        print(f"error: no git history for {spec_rel} (shallow clone?)", file=sys.stderr)
        return 1

    if not args.no_working_tree and working_tree_differs(spec_rel, cwd):
        today = args.today or datetime.now(timezone.utc).strftime("%Y-%m-%d")
        worktree = Snapshot(None, today)
        if snapshots[0].date == today:
            snapshots[0] = worktree  # merge into one Update for the day
        else:
            snapshots.insert(0, worktree)

    entries = build_entries(
        snapshots,
        spec_rel,
        lambda base, rev: run_oasdiff(base, rev, oasdiff_bin=args.oasdiff_bin, cwd=cwd),
    )
    if args.max_entries:
        entries = entries[: args.max_entries]

    links = {}
    if args.link_base:
        links = endpoint_urls(yaml.safe_load(Path(args.spec).read_text()), args.link_base)

    content = render_page(
        args.api_name, args.api_href, args.note, entries, links, args.style, args.rss_url
    )
    output = Path(args.output)
    if output.exists() and output.read_text() == content:
        print(f"{output}: unchanged")
        return 0
    output.write_text(content)
    print(f"{output}: regenerated with {len(entries)} entries")
    return 0


if __name__ == "__main__":
    sys.exit(main())
