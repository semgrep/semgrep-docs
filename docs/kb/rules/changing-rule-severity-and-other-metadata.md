---
description: Change rule severity and other metadata by forking rules
tags:
  - Rules
  - Semgrep Code
  - Semgrep Secrets
append_help_link: true
---
import ForkExistingRule from '/src/components/reference/_fork_existing_rule.md'

# Change rule severity and other metadata by forking rules

To alter the severity or other metadata of a Semgrep rule, it must be forked and then updated. Forking means to copy or duplicate the rule, thereby creating your own custom version of it. Once this custom version is created, it can then be modified as needed.

:::note
Only Semgrep Code and Secrets rules can be forked.
:::

## Fork a rule

<ForkExistingRule />

## Changing the severity

Once you have forked the rule, you can change the [severity or other metadata](/docs/writing-rules/rule-syntax#required) to your liking. 

Then, save this custom version of the rule to your organization's rules, making it available to use within your policy as defined in Semgrep AppSec Platform.

![Save a rule in the Editor](/img/kb/save_rule_editor.png)

By default, saving the rule also enables you to search for it in the [Semgrep Registry](https://semgrep.dev/r), with visibility limited to your organization.

![Custom rules in registry](/img/kb/custom_rules_in_editor.png)

