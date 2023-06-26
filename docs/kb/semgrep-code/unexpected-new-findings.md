---
tags:
  - Rules
  - Semgrep Code
description: This may be occurring because rule coverage has increased.
---

# Why are there more Semgrep findings when the code hasn't changed?

If the rules you're using in Semgrep have changed since you last scanned your code, you may see more findings even if your code has not changed.

For Semgrep-curated rulesets ("by Semgrep"), if you add a ruleset to one of your policies, the policy will get the most recent updates and additions to the ruleset. So if Semgrep adds a rule to a ruleset, or makes a change to make a rule more comprehensive (or more precise), your policy will automatically pick up those changes.

For these rulesets, you can check the rule history to see recent changes:

1. Open the rule in the Editor.
2. Click the GitHub icon shown next to the rule ID to access the commit history.

There are some Registry rulsets that have an alternative curator - these do not show "by Semgrep". For these rules:

1. Expand the rule within the registry to view its details.
2. Click "Source for rule" to visit the rule source.

## Managing rule versions

If you would prefer to maintain versions of the rules you use, you can create a custom Semgrep rule configuration instead of using a managed policy. Rules can be pinned to a particular sha sum, so that if the rule changes, you'll continue to get the version with the pinned sha sum. A rule's current sha shum is displayed in the Registry.



