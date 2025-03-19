---
slug: pre-commit
title: Run scans on pre-commit
hide_title: true
description: Learn to run a Semgrep scan before committing code; this prevents security issues or leaked secrets from entering your source control's history.
tags:
  - Extensions
---

import Login from "/src/components/procedure/_login-activate.mdx"

# Run scans on `pre-commit`

The [pre-commit framework](https://pre-commit.com/) can run `semgrep` at commit-time. This is helpful to prevent secrets and security issues from leaking onto your Git history.

## Prerequisites

- [<i class="fas fa-external-link fa-xs"></i> The `pre-commit` framework](https://pre-commit.com).

## `pre-commit` with Semgrep CE (no login)

Use these instructions to run `pre-commit` without logging in. You can still use custom rules or rules from the Semgrep Registry.

Add the following to your `.pre-commit-config.yaml` file:

```yaml
repos:
- repo: https://github.com/semgrep/pre-commit
  rev: 'SEMGREP_VERSION_LATEST'
  hooks:
    - id: semgrep
      entry: semgrep
      # Replace <SEMGREP_RULESET_URL> with your custom rule source
      # or see https://semgrep.dev/explore to select a ruleset and copy its URL
      args: ['--config', '<SEMGREP_RULESET_URL>', '--error', '--skip-unknown-extensions']
```

## `pre-commit` with your Semgrep AppSec Platform configuration

You  can also run custom rules and rulesets from Semgrep AppSec Platform, similar to running `semgrep ci`.

Ensure that you are logged in:

<Login />

Add the following to your `.pre-commit-config.yaml` file:

```yaml
repos:
- repo: https://github.com/semgrep/pre-commit
  rev: 'SEMGREP_VERSION_LATEST'
  hooks:
    - id:  semgrep-ci
```

For guidance on customizing Semgrep's behavior in pre-commit, see [Customize Semgrep in pre-commit](/docs/kb/integrations/customize-semgrep-precommit).
