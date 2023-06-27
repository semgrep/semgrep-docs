---
tags:
  - Rules
  - Semgrep Code
description: This may be occurring because rule coverage has increased.
---

# Why are there more Semgrep findings when the code hasn't changed?

If the rules you're using in Semgrep have changed since you last scanned your code, you may see more findings even if your code has not changed.

For Semgrep-curated rulesets ("by Semgrep"), if you add a ruleset to one of your policies, the policy will get the most recent updates and additions to the ruleset. So if Semgrep adds a rule to a ruleset, or makes a change to make a rule more comprehensive (or more precise), your policy will automatically pick up those changes, and the next scan will show new findings for the new or updated rules.

For these rulesets, you can check each rule's history to see recent changes:

1. Open the rule in the Editor.
2. Click the GitHub icon shown next to the rule ID to access the commit history.

![GitHub icon to view rule history in the Semgrep Editor](/img/kb/github-icon-editor.png)

There are some Registry rulsets that have an alternative curator - these do not show "by Semgrep". For these rules:

1. Expand the rule within the registry by clicking on the rule card to view its details.
2. Click "Source for rule" under the example code to visit the rule source.

If you have questions or concerns about rule updates for Semgrep-curated rulesets, please feel free to [reach out](/docs/support).
