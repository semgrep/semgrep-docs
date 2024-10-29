---
slug: pro-rules
append_help_link: true
description: "A guide using to Semgrep Pro Rules: supported languages, vulnerabilities covered, and using Pro rules in Semgrep scans."
title: Semgrep Pro rules
hide_title: true
tags:
    - Semgrep Code
---

import RemoveRuleset from "/src/components/procedure/_remove-ruleset.mdx"
import DisableRule from "/src/components/procedure/_disable-rule.mdx"
import ProRulesLanguageCoverage from "/src/components/reference/_pro-rules-language-coverage.mdx"

# Semgrep Pro rules

This article provides an overview of rules provided exclusively by Semgrep, Inc. called **Semgrep Pro** rules. These high-confidence, professionally maintained rules are a proprietary addition to Semgrep Registry.

The goal of Pro rules is to provide a set of well-supported rules with improved coverage across languages and vulnerability types. Semgrep Pro rules are written using Semgrep’s latest features and, in general, target users who are looking to produce highly accurate, actionable findings.

## Types of rules in the Semgrep Registry by author

* **Community rules** - reviewed by the Semgrep team, these rules consist of contributions from Semgrep’s community. Community rules encompass a wide array of rules, including many that are made for security auditors.
* **Third-party rules** - created directly by external contributors such as Trail of Bits, GitLab and many more.
* **Private rules** - rules authored and published by your own organization, for use only by your organization.
* **Pro rules** - proprietary rules created by the Semgrep team targeted for security and software engineers who need accurate findings. These rules provide increased coverage for many programming languages and use the latest Semgrep features.

## Semgrep Pro rules content

Semgrep Pro rules provide improved coverage for the following languages:

<ProRulesLanguageCoverage />

Semgrep Pro rules provide improved findings across many languages on specific classes of vulnerabilities, such as injection vulnerabilities, deserialization, XXE, and many others, as well as increased support for frameworks and technologies such as Express, Spring, Java Servlets, Laravel, Go net/http, React, Next.js, and Angular.

Semgrep's Security Research team plans to keep improving coverage by adding support for more languages and popular frameworks, as well as reducing potential false positives by monitoring rules’ performance.

## Scan with Semgrep Pro rules

Your Semgrep AppSec Platform account already includes Pro rules that are likely to be widely useful, as they are included in the **Default** ruleset. These Pro rules run on all your scans.


:::info
- To make the most out of Pro rules, ensure that you are [running **cross-file analysis**](/semgrep-code/semgrep-pro-engine-intro#run-cross-file-analysis-with-semgrep-appsec-platform).
- Rules that don't apply to your target repository's language or framework are skipped automatically even if they are in your Policies page. For example, if your repository contains JavaScript code and you have added Go rules, the Go rules are unused. Unused rules do not add to scan time.
:::

### Change rule modes or disable Pro rules in Semgrep AppSec Platform

Like any other rule or ruleset, you can disable Pro rules or change their rule mode to leave comments for developers or potentially block a PR.

1. Sign in to [Semgrep AppSec Platform](https://semgrep.dev/login).
1. Navigate to **Rules > Policies**.
1. Under **Source**, click **Pro <i class="fa-solid fa-gem"></i>** to view all the Semgrep Pro rules currently in your Policies.
1. Find and select the rules you want to disable or change.
1. Click **Change modes** and select one of the provided options.

You can find all previously added Semgrep Pro rules in your Policies page, so if you want to re-enable Pro rules or adjust the mode again in the future, use the **Source > Pro <i class="fa-solid fa-gem"></i>** filter as described previously.

### Add Semgrep Pro rules in CLI or CI

:::info Prerequisites
For CLI users: You must be [logged in](/getting-started/cli#log-in-to-your-semgrep-account).
:::

In some cases, you may want to run a scan with a specific set of Pro rules:

1. Go to [Semgrep Registry](https://semgrep.dev/r).
2. Click **Visibility > Pro rules**.
3. Optional: Apply additional filters by entering search terms in the search box or selecting filters from drop-down boxes.
4. For a single rule, click the **Rule's card > Run locally**. For rulesets, click the card.
5. Copy and paste the command to your CLI or CI configuration file. You can add several rulesets.
  ![A ruleset consisting of Pro and non-Pro rules. Copy the snippet under Test and Run Locally.](/img/registry-run-locally.png#md-width)
  _**Figure**. A ruleset consisting of Pro and non-Pro rules. Copy and paste the snippet under Test and Run Locally to your CLI or CI._
