---
slug: policies
append_help_link: true
title: Policies
hide_title: true
description: "The Policies page is a visual representation of the rules that Semgrep Code uses to scan code."
tags:
    - Semgrep Cloud Platform
    - Team & Enterprise Tier
    - Semgrep Code
---

import MoreHelp from "/src/components/MoreHelp"
import RemoveRuleset from "/src/components/procedure/_remove-ruleset.mdx"
import DisableRule from "/src/components/procedure/_disable-rule.mdx"

<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>

# Policies

:::tip
The Policies page is a new version of the [Rule board](https://semgrep.dev/orgs/-/board).

To access Policies page: Go to [Rule board](https://semgrep.dev/orgs/-/board), and then click **Try new version**. You can always go back to the old Rule board by clicking **Back to old version** button.
:::

The Policies page displays a visual representation of the rules that Semgrep Code uses for scanning. Rules can be categorized into various groups. The Policies page uses the following categorization criteria:

- **Rule name**: Name of the rule that Semgrep Code uses for scanning.
- **Severity**: The higher the severity, the more critical issues can a rule potentially detect. This value is based on `likelihood` and `impact` metadata fields in rule files. Policies page displayes the **high**, **medium**, and **low** severities.
- **Confidence**: Indicates confidence of the rule to detect true positives. There are rules with **high**, **medium**, and **low** confidence.
- **Source**: Indicates whether the rule is a **Pro**, **Community rule**, or a **Custom rule** .
    - **Pro**: Authored by Semgrep with cross-file (interfile), and cross-function (interprocedural) analysis capabilities providing you with enhanced scan accuracy. For more information, see [Pro rules](/semgrep-code/pro-rules/) documentation.
    - **Community**: Authored by Semgrep, Inc or external contributors such as Trail of Bits.
    - **Custom**: Rules created within your Semgrep organization. For more information, see [Private rules](/writing-rules/private-rules/) documentation.
- **Ruleset**: Rules are also organized in rulesets. Rulesets are groups of rules related through a programming language, OWASP category, or framework.
- **Mode**: Specifies an action that a rule triggers when a rule detects a finding (sometimes called matching - when a rule matches a code). The mode a behavior in which the finding is reported to you and your developers. There are the three following modes:
    - **Monitor**: Display findings only in [Fidnings](https://semgrep.dev/orgs/-/findings?tab=open) page of Semgrep Code.
    - **Comment**: Display findings in [Fidnings](https://semgrep.dev/orgs/-/findings?tab=open) page of Semgrep Code and create comments in MRs or PRs.
    - **Block**: Display findings in [Fidnings](https://semgrep.dev/orgs/-/findings?tab=open) page of Semgrep Code, create comments in MRs or PRs, and block PRs or MRs where the finding was detected.

![Screenshot of the default state of the Policies page](/img/policies.png)

## Policies page structure

## Adding rules

To add rules, follow these steps:

1. On the [Policies](https://semgrep.dev/orgs/-/board) page, click **Add Rules**.
1. You are taken to [Semgrep Registry](https://semgrep.dev/explore) page. Explore the page, open cards of individual rules, and then click **Add to Rule Board**.
1. Specify behavior of the rule that you are adding. Select either: 
    - **Monitor**: Display findings only in [Fidnings](https://semgrep.dev/orgs/-/findings?tab=open) page of Semgrep Code.
    - **Comment**: Display findings in [Fidnings](https://semgrep.dev/orgs/-/findings?tab=open) page of Semgrep Code and create comments in MRs or PRs.
    - **Block**: Display findings in [Fidnings](https://semgrep.dev/orgs/-/findings?tab=open) page of Semgrep Code, create comments in MRs or PRs, and block PRs or MRs where the finding was detected.

## Disabling rules

## Filtering options

<MoreHelp />
