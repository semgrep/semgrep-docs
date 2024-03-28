---
slug: pro-rules
append_help_link: true
description: "A guide using to Semgrep Pro Rules: supported languages, vulnerabilities covered, and using Pro rules in Semgrep scans."
title: Semgrep Pro rules
hide_title: true
tags:
    - Semgrep Code
    - Team & Enterprise Tier
---

<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>

import MoreHelp from "/src/components/MoreHelp"
import RemoveRuleset from "/src/components/procedure/_remove-ruleset.mdx"
import DisableRule from "/src/components/procedure/_disable-rule.mdx"

# Semgrep Pro rules

This article provides an overview of rules provided exclusively by Semgrep, Inc. called Semgrep Pro rules. These high-confidence, professionally maintained rules are a proprietary addition to Semgrep Registry. They are available in the [Team tier](https://semgrep.dev/pricing) or higher.

<!-- 
Claudio's portions
-->

## Kinds of rules in the Semgrep Registry

The Semgrep Registry includes the following kinds of rules:
* **Community rules** - reviewed by the Semgrep team, these rules consist of contributions from Semgrep’s community. Community rules encompass a wide array of rules, including many that are made for security auditors.
* **Third-party rules** - created directly by external contributors such as Trail of Bits, GitLab and many more.
* **Private rules** - rules that can be authored and published by your own organization and for use only by your organization.
* **Pro rules** - proprietary rules created by the Semgrep team targeted for security and software engineers who need accurate findings. These rules provide increased coverage for many programming languages and use the latest Semgrep features.

## Introduction

The goal of Pro rules is to provide a set of well-supported rules with improved coverage across languages and vulnerability types. Semgrep Pro rules are written using Semgrep’s latest features and, in general, target users who are looking to produce highly accurate, actionable findings.

## Semgrep Pro rules content

Semgrep Pro rules provide improved coverage for many languages, including Java, JavaScript, TypeScript, Python, PHP, Ruby, C#, Swift, and Go.

After using Semgrep Pro rules, you will see improved findings across many languages on specific classes of vulnerabilities (such as hard-coded secrets, injection vulnerabilities, deserialization, XXE, and many others) as well as increased support for frameworks and technologies (such as Express, Spring, Java Servlets, Laravel, Go net/http, React, Next.js, Angular).

Semgrep's Security Research team plans to keep improving coverage by adding support for more languages and popular frameworks, as well as reducing potential false positives by monitoring rules’ performance.

:::info 
See the [Rule updates](/release-notes/rule-updates/) for an overview of updates and improvements released by Semgrep, Inc. for Semgrep’s rules, including Semgrep Pro rules.
:::

## Using Semgrep Pro rules

You can use Semgrep Pro rules in both Semgrep Cloud Platform (SCP) and your own CLI or CI environment (without SCP). 

* To use Pro Rules with Semgrep Cloud Platform, add them to your Policies page. The rules are then included in your next scan.
* To use Pro Rules in your own CI or CLI environment, add the rules or rulesets through the `--config` flag.

:::info
Rules that don't apply to your target repository's language or framework are skipped automatically even if they are in your Policies page. For example, if your repository contains JavaScript code and you have added Go rules, the Go rules are unused. Unused rules do not add to scan time.
:::

### Adding Semgrep Pro rules in CLI or CI

:::note Prerequisites
For CLI users: You must be [logged in](/docs/getting-started/#logging-into-semgrep-cloud-platform).
:::

1. Go to [Semgrep Registry](https://semgrep.dev/r).
2. Click on **Visibility > Pro rules**.
3. Optional: Apply additional filters by entering search terms in the search box or selecting filters from drop-down boxes.
4. For a single rule, click on the rule's card > Run locally. For rulesets, click the card.
5. Copy and paste the snippet to your CLI or CI configuration file. You can add several rulesets. Refer to the following sample snippet:

### Adding Semgrep Pro rules in SCP through Semgrep Registry

1. Sign in to [Semgrep Cloud Platform](https://semgrep.dev/login).
2. Go to [Semgrep Registry](https://semgrep.dev/r).
3. Click on **Visibility > Pro rules**.
4. Optional: Apply additional filters by entering search terms in the search box or selecting filters from drop-down boxes. 
5. To add a specific rule or ruleset:
    1. Click on the card for the **rule or ruleset > Add to Policy**.
    2. Select a Policy rule mode to add the rules to. It is recommended to start with the Monitor mode to silently gather findings and audit the rule's performance.

### Filtering behavior

* Filter types such as Language and Technology use AND logic. This means that search terms must match all filters. For example, selecting Java (a Language) and security (a Category) shows only rules with both properties (Java and security).
* Adding filters of the same type use OR logic. This means that search terms can match any of the filters for that type. For example, selecting Java and Python (both languages) shows rules with either language.
* A gem icon (💎) denotes Semgrep Pro rules.

<!-- Future feature: Add Semgrep Pro rules through your Policy -->

<!-- Future feature: Receiving updates on Semgrep Pro rules -->

## Removing or disabling Semgrep Pro rules

### Disabling rules

<DisableRule />

### Removing rulesets

<RemoveRuleset />

## Losing access to Semgrep Pro rules

You lose access to Semgrep Pro rules and their future improvements if you choose not to renew your Team or Enterprise tier plan.

<MoreHelp />
