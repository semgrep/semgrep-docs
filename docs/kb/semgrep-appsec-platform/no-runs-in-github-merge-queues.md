---
description: Learn how to work around Semgrep Managed Scans not running for pull requests in GitHub merge queues
tags:
  - Managed Scans
  - GitHub
---

# Semgrep Managed Scans doesn't run for pull requests in GitHub merge queues

Your merge queue pipelines can become blocked if you:

- Use Semgrep Managed Scans to automatically scan your projects
- Use GitHub merge queues to automate pull request merges
- Have made the Semgrep scan a required check

Managed Scans do not run in merge queues, so the required Semgrep check never passes, preventing merges.

## Why Semgrep doesn't run in merge queues

Semgrep doesn't run in merge queues because:

- Diff-aware scans during a merge queue check aren't meaningful. The purpose of a diff-aware scan is to catch issues before code is merged. Pull requests in a merge queue are already approved for merge.
- While full scans could surface other potential issues, they can take a long time, significantly delaying merges for larger repositories.

## Workaround

To keep Semgrep required for pull requests without blocking merge queues, define a placeholder workflow in merge queues with the same name as the Semgrep Managed Scans check: `semgrep-cloud-platform/scan`.

### Create a placeholder workflow

Define a workflow to provide a passing check for merge queue events:

```yaml
# .github/workflows/semgrep-mq-placeholder.yml
name: Semgrep - merge queue placeholder

on:
   merge_group: {}

jobs:
   semgrep-mq-placeholder:
      name: semgrep-cloud-platform/scan   # this is the name required in the ruleset
      runs-on: ubuntu-latest
      timeout-minutes: 3
      steps:
         - run: echo "OK – Semgrep already ran on the PR; MQ can proceed."
```

### Define your rulesets

Depending on your preferences, there are several ways to configure required workflows. The most granular option is to use two separate [GitHub rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets#about-rulesets) at the repository level:

1. **Branch ruleset for the main branch, "PR"**: requires the named check `semgrep-cloud-platform/scan` from the Semgrep GitHub App source to pass before merging
2. **Branch ruleset for the main branch, "MQ"**: requires the check of the same name, but from any source or from the YML file shown above.



1. Go to your GitHub repository.
1. Go to **Settings > Code and automation > Rules > Rulesets**.
1. Configure your rulesets.

## Example walkthrough

Watch this [Loom recording](https://www.loom.com/share/57e7288e1c5b4b22b6386e5c49953381) to see a walkthrough of the workaround.
