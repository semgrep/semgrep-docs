#!/usr/bin/env python3
#
# Tests for add_openapi_servers.py.
#
# Run with:
#   uv run --with pyyaml --with pytest pytest scripts/tests

from __future__ import annotations

import textwrap

import pytest
import yaml

from add_openapi_servers import SERVER, add_servers

# v1 is emitted with 2-space indentation, top-level keys alphabetical, and a
# `tags:` sequence whose dashes sit at column 0.
SPEC_TWO_SPACE = textwrap.dedent(
    """\
    components:
      schemas:
        Deployment:
          type: object
    info:
      title: Semgrep API
      version: v1
    openapi: 3.0.3
    paths:
      /api/v1/deployments:
        get:
          operationId: Deployments_List
          summary: List deployments
    tags:
    - name: DeploymentsService
      x-displayName: Deployments
    """
)

# v2 is emitted with 4-space indentation and conventional key order.
SPEC_FOUR_SPACE = textwrap.dedent(
    """\
    openapi: 3.0.3
    info:
        title: Semgrep API
        version: v2.0.0.alpha
    paths:
        /api/policies/v2/deployments/{deploymentId}/detection-policy/{product}:
            get:
                operationId: PoliciesV2Service_GetDetectionPolicy
                summary: Get a detection policy
    components:
        schemas:
            DetectionPolicy:
                type: object
    tags:
        - name: PoliciesV2Service
          x-displayName: Policies
    """
)

SPECS = pytest.mark.parametrize(
    "spec", (SPEC_TWO_SPACE, SPEC_FOUR_SPACE), ids=("two-space", "four-space")
)


@SPECS
def test_adds_servers_when_absent(spec):
    doc = yaml.safe_load(add_servers(spec))
    assert doc["servers"] == [SERVER]


@SPECS
def test_output_is_parseable_and_leaves_other_sections_alone(spec):
    before = yaml.safe_load(spec)
    after = yaml.safe_load(add_servers(spec))

    assert after["paths"] == before["paths"]
    assert after["components"] == before["components"]
    assert after["tags"] == before["tags"]
    assert after["info"] == before["info"]


@SPECS
def test_matches_the_files_indent_step(spec):
    added = [
        line
        for line in add_servers(spec).split("\n")
        if line not in spec.split("\n") and line.strip()
    ]
    step = 4 if spec is SPEC_FOUR_SPACE else 2

    assert added[0] == "servers:"
    assert added[1] == f"{' ' * step}- url: {SERVER['url']}"
    # Sibling keys align with `url`, i.e. past the "- " of the sequence dash.
    assert added[2] == f"{' ' * (step + 2)}description: {SERVER['description']}"


@SPECS
def test_is_idempotent(spec):
    once = add_servers(spec)

    assert add_servers(once) == once


@SPECS
def test_servers_precedes_paths(spec):
    lines = add_servers(spec).split("\n")

    assert lines.index("servers:") < lines.index("paths:")


# The point of the no-op: the day semgrep-app emits its own `servers`, this
# script stops touching the spec instead of fighting it.
@pytest.mark.parametrize(
    "existing",
    (
        "servers:\n  - url: https://upstream.example\n",
        "servers: []\n",
    ),
    ids=("populated", "empty"),
)
def test_leaves_an_existing_servers_block_alone(existing):
    spec = existing + SPEC_TWO_SPACE

    assert add_servers(spec) == spec


def test_ignores_a_nested_servers_key():
    """A `servers` under an operation must not be mistaken for the top-level one."""
    spec = textwrap.dedent(
        """\
        openapi: 3.0.3
        paths:
          /api/v1/deployments:
            get:
              operationId: Deployments_List
              servers:
                - url: https://override.example
        """
    )
    doc = yaml.safe_load(add_servers(spec))

    assert doc["servers"] == [SERVER]


def test_returns_input_unchanged_when_there_is_no_paths_key():
    spec = "openapi: 3.0.3\ninfo:\n  title: Semgrep API\n"

    assert add_servers(spec) == spec


def test_preserves_a_missing_trailing_newline():
    spec = SPEC_TWO_SPACE.rstrip("\n")

    assert not add_servers(spec).endswith("\n")


def test_server_url_is_the_bare_origin():
    """Paths carry their own /api/... prefix, so the URL must not repeat it."""
    assert SERVER["url"] == "https://semgrep.dev"
