---
description: Learn how to work around Semgrep Managed Scans not running for pull requests in GitHub merge queues
tags:
  - Managed Scans
  - GitHub
---

# Semgrep Managed Scans doesn't run for pull requests in GitHub merge queues

If you:

- Use Semgrep Managed Scans to automatically scan your projects
- Use GitHub merge queues to automate pull request merges
- Have made the Semgrep scan a required check

Then your merge queue pipelines can become blocked, because Managed Scans do not run in merge queues. As a result, the required Semgrep check never passes, preventing merges.

## Why Semgrep doesn't run in merge queues

Semgrep doesn't run in merge queues because:

- Diff-aware scans during a merge queue check aren't meaningful. The purpose of a diff-aware scan is to catch issues before code is merged. Pull requests in a merge queue are already approved for merged.
- Full scans take a long time, significantly delaying merges for larger repositories.

## Workaround

To keep Semgrep required for pull requests without blocking merge queues, define two separate [GitHub rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets#about-rulesets):

1. **Pull request ruleset for the main branch**: requires the Semgrep check to pass before merging
2. **Merge queue ruleset for the main branch**: does **not** require the Semgrep check. Instead, this uses a placeholder check that runs on `merge_group`.

### Define your rulesets

1. Go to your GitHub repository.
1. Go to **Setting > Code and automation > Rules > Rulesets**.
1. Configure your rulesets:
   * **PR**: requires the Semgrep check to pass before merging.
   * **Queue**: does **not** require the Semgrep check

### Create a placeholder workflow

Define a workflow to provide a passing check for merge queue events:

```yaml
# .github/workflows/semgrep-mq-placeholder.yml
name: Semgrep - merge queue placeholder

on:
merge_group: {}
workflow_dispatch: {}

jobs:
semgrep-mq-placeholder:
    name: semgrep-cloud-platform/scan   # this is the name required in the MQ ruleset
    runs-on: ubuntu-latest
    timeout-minutes: 3
    steps:
 - run: echo "OK – Semgrep already ran on the PR; MQ can proceed."
```

## Example walkthrough

Watch this [Loom recording](https://www.loom.com/share/57e7288e1c5b4b22b6386e5c49953381) to see a walkthrough of the workaround.
