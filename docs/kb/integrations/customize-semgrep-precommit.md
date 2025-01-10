---
description: Understand how to customize Semgrep's behavior when using it with pre-commit.
tags:
  - Extensions
---

# Customize Semgrep in pre-commit

Semgrep offers two standard pre-commit hooks [outlined here](/docs/extensions/overview/#pre-commit).

* The `semgrep` hook is optimized to run with a provided set of rules, either local rules or rules from the Semgrep Registry.
* The `semgrep-ci` hook is optimized to run with the rules from your organization in the Semgrep AppSec Platform, without sending results to the platform, since results from pre-commit are temporary and not linked to the final code in the repository.
  * This hook requires the user be logged in locally to fetch the rules from the organization.

You can also create your own Semgrep hooks for pre-commit if you have particular needs or preferences, such as if you want users to see the output of the Semgrep scan even if it passed, or if you want to limit the scan to a particular Semgrep product.

## Show the scan output

By default, pre-commit does not show the scan output if the hook passes. If you want your developers to see the output even if non-blocking findings are found, you can set the `verbose` option to print the output. To limit output to findings only (no scan information or diagnostics), redirect `stderr` to `/dev/null`, or use `--quiet`.

This example is based on the `semgrep-ci` hook, but a similar adjustment would also work with the `semgrep` hook.

```yaml
repos:
- repo: https://github.com/semgrep/pre-commit
  rev: 'v1.101.0'
  hooks:
    - id: semgrep-verbose
      entry: semgrep
      args: ["ci", "--dry-run", "--baseline-commit", "HEAD" "2>/dev/null"]
      verbose: true
      pass_filenames: false
```

## Limit the scan to a particular product

Semgrep Secrets is an ideal product to run before commit, since it can help prevent secrets from ever making it into the Git history, even locally. To run only Secrets in pre-commit, add the product flag to the `args`:

```yaml
- repo: https://github.com/semgrep/pre-commit
  rev: 'v1.101.0'
  hooks:
    - id:  semgrep-secrets
      pass_filenames: false
      args: ["ci", "--dry-run", "--baseline-commit", "HEAD", "--secrets"]
```

## Scan with Pro rules and cross-function analysis

The `semgrep-ci` hook requires the user to be logged in locally and runs with the engine configured in the organization, but the standard `semgrep` hook can also take advantage of local login to run with Pro rules and cross-function analysis.

```yaml
- id: semgrep
  name: semgrep
  entry: semgrep
  args: ["--pro", "--disable-version-check", "--quiet", "--skip-unknown-extensions"]
```

This provides analysis across modified files during the pre-commit scan, which may catch additional vulnerabilities, or prevent false positives.

## Customization tips

### Useful arguments

The provided hooks include useful arguments for Semgrep that you may want to include in your hooks as well.

For example, for the `semgrep` hook that runs with a provided `--config`, the arguments also include:

 * `--disable-version-check`: skip checking whether there's a new version of Semgrep (speeds up the check and avoids irrelevant output)
 * `--quiet`: only print findings, not other messages
 * `--skip-unknown-extensions`: if files are modified that aren't in a recognized language, skip them

The `semgrep-ci` hook runs with the pre-commit option `pass_filenames: false`. This is important because `semgrep ci` doesn't expect a list of filenames; it just expects to scan the folder, so you should preserve this option in your usage.

Adding `baseline-commit HEAD` performs a diff scan; this diff scan only scans the changes being added in the current commit (as intended for a pre-commit hook). It uses `--dry-run` so that findings that have no existence except in the local filesystem aren't added to the platform, which would otherwise result in clutter.

### Entry point

Both of the default hooks use `semgrep` as the `entry`, which means the command executed is just `semgrep` with the `args` provided. However, you can write your own `entry` point. This approach is used in the less commonly used `semgrep-docker` hook also available in the [semgrep/pre-commit repository](https://github.com/semgrep/pre-commit/blob/develop/.pre-commit-hooks.yaml).

It can also be used with a standard Semgrep execution to set environment variables in addition to (or instead of) arguments:

```bash
 entry: sh -c 'env SEMGREP_RULES=<SEMGREP_RULESET_URL> semgrep scan --code --no-suppress-errors --baseline-commit HEAD'
```

In this case, setting `SEMGREP_RULES=<SEMGREP_RULESET_URL>` substitutes for supplying `--config` and `<SEMGREP_RULESET_URL>` in the `args`.
