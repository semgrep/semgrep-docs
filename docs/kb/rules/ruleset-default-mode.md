---
description: Adjust the default mode for a whole ruleset.
tags:
  - Rules
  - Semgrep Registry
  - Semgrep Code
append_help_link: true
---

# Why do new rules keep appearing in Comment or Block mode?

Semgrep AppSec Platform [Policies](/docs/semgrep-code/policies) can contain both individual rules and **rulesets**, which are curated groups of rules recommended for particular purposes. All organizations in the AppSec Platform start with two rulesets: the `default` ruleset and the `comment` ruleset. These rulesets are curated to be good starter packs for security teams to review, and for developers to see comments about, respectively.

As Semgrep adds new rules to improve coverage, some of these rules are also added to rulesets. If you have a ruleset added to your organization's policies, any new rules will be added to the ruleset automatically, and become part of your policies also.

The `default` and `comment` rulesets are initially added in Monitor mode, which is primarily intended for security teams to review. You can also [add new rulesets to your policies](/docs/semgrep-code/policies#add-rulesets-to-your-policies-from-the-registry) from the Semgrep Registry.

When you add a ruleset through the registry, you can add it in any policy mode: Monitor, Comment, or Block. The mode you choose will determine the mode for future rules that are added to that ruleset.

Even if you later move some or all rules from a ruleset to a different mode, the default mode for the ruleset remains the same as it was when it was originally added, and it might be somewhat surprising when new rules are added in the original mode.

## Changing the default mode for a ruleset

To change the default mode for a ruleset, follow the same process as for [adding a new ruleset to your policies](/docs/semgrep-code/policies#add-rulesets-to-your-policies-from-the-registry) and select the desired default mode.

After adding the ruleset in the default mode, you can then [change any individual rule modes](/docs/semgrep-code/policies#block-a-pr-or-mr-through-rule-modes) for rules that you prefer to keep in a different mode.
