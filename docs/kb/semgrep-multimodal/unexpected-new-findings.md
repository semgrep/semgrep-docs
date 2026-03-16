---
tags:
  - Rules
  - Semgrep Code
description: This may be occurring because rule coverage has increased.
---

# Why are there more Semgrep findings when the code hasn't changed?

If the rules you're using in Semgrep have changed since you last scanned your code, you may see more findings even if your code has not changed.

For rulesets in the Semgrep Registry, if you add a ruleset to one of your policies, the policy receives updates and additions to the ruleset on an ongoing basis. So if a rule is added to a ruleset, or changes make a rule more comprehensive (or more precise), your policy automatically picks up those changes, and the subsequent scan can show new findings for the new or updated rules.

For Semgrep-curated rulesets, you can view each rule's history to see recent changes:

1. Open the rule in the Editor.
2. Click the GitHub icon shown next to the rule ID to access the commit history.

![GitHub icon to view rule history in the Semgrep Editor](/img/kb/github-icon-editor.png)

There are some Registry rulsets that have an alternative curator - these do not show "by Semgrep". For these rules:

1. Expand the rule within the registry by clicking on the rule card to view its details.
2. Click "Source for rule" under the example code to visit the rule source.

If you have questions or concerns about rule updates for Semgrep Registry rulesets, please feel free to [reach out](/docs/support).
