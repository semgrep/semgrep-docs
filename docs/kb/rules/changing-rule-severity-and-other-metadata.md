---
description: Change rule severity and other metadata by forking rules
tags:
  - Rules
  - Semgrep Registry
  - Semgrep Code
  - Semgrep Secrets
append_help_link: true
---

# Change rule severity and other metadata by forking rules

To alter the severity or other metadata of a Semgrep rule, it will first need to be forked and then updated. Forking means to copy or duplicate the rule, thereby creating your own custom version of it. Once this custom version is created, it can then be modified as needed.

:::note
Only Semgrep Code and Secrets rules can be forked.
:::

## Forking a rule

To fork a rule, you must first open the rule definition in the Semgrep Editor. There are various ways to end up in the Editor, but one way would be via the Semgrep Registry. 

Let's say you want to fork the rule `c.lang.security.insecure-use-gets-fn.insecure-use-gets-fn`.

From the [Semgrep Registry](https://semgrep.dev/r), you can search for the rule, and once found, you can click the icon in the top right to open the rule definition in the Editor.
![Open a Semgrep Rule in the Editor](/img/kb/open_rule_in_editor.png)

Here, you will be shown the rule and its definition on the left, along with its test code to the right. To fork the rule so you can customize it, utilize the "Fork" button in the top righ menu.

![Fork a rule in the Editor](/img/kb/fork_rule_editor.png)

You will notice after forking the rule, that `-copy` has been added to the `id` of the rule definition to differentiate it from the original rule. You may keep this or change the `id` to anything else.

## Changing the severity

Once forked, you may customize the [severity or other metadata](/docs/writing-rules/rule-syntax#required) to your liking. Finally, you should save this custom version of the rule to your registry, making it available to use within your policy as defined in Semgrep AppSec Platform.

![Save a rule in the Editor](/img/kb/save_rule_editor.png)

As can be seen, after the forked custom rule has been saved, it will show up in your registry.

![Custom rules in registry](/img/kb/custom_rules_in_editor.png)

