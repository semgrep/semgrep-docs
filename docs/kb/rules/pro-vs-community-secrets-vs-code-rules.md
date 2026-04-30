---
slug: pro-vs-community-secrets-vs-code-rules
title: Rule upgrades and supersession
description: Supersession between Community and Pro rules and between Semgrep Code and Semgrep Secrets
tags:
  - Rule supression
  - Rule upgrates
---

# Rule upgrades and supersession

This article describes Semgrep behavior when multiple rules match the same issue in the same code. Overlap can occur when you scan your project with Semgrep Code using similar **Pro** and **CE** rules, or when you scan your code using both **Semgrep Code** and **Semgrep Secrets**.



## Pro versus CE rules in Semgrep Code {#pro-community-supersession}

CE rules are public, and anyone can contribute them. They use only features available in the Semgrep CE (OSS) engine.

Pro rules are authored by Semgrep. They might cover the same topics as a CE rule, but they use the Pro engine. Since the Pro engine includes advanced features, like **cross-file (interfile)** analysis, matches are often more precise. Semgrep also publishes new Pro rules that overlap older Pro rules as coverage improves.

When rules overlap, results might vary depending on which rules you run:
* If a Pro rule exists, but you run only the overlapping CE rule, you might see more false positives than you would with the Pro rule.
* If you run both the Pro and the CE rules, you might see duplicate findings for the same underlying issue.

## Identify findings from superseded rule

When more than one rule can match the same issue in the same code, Semgrep uses supersession relationships between rules to determine and recommend the preferred rule. 

Semgrep uses **badges** to mark superseded rules on the **Findings** and findings' **Details** pages of AppSec Platform. 

Findings from the **superseding** (preferred) rule do not show upgrade badges. Findings from a **superseded** rule may show a badge. On AppSec Platform, you can click the badge to see the rule Semgrep recommends using instead.

The following table summarizes the badges:

| Badge | Meaning |
| ------- | ------- |
| Pro | The finding is from a Pro rule. This label is separate from the **Upgrade available** badge below. |
| Pro rule available | The finding is from a CE rule, but Semgrep recommends a Pro rule for this use case. |
| Upgrade available | The finding is from a Pro rule, but Semgrep recommends a different Pro rule, such as a newer or narrower rule. The finding can also show the **Pro** badge. |



## Semgrep Secrets versus Semgrep Code rules

Semgrep Code offers rules that can identify leaked credentials in source code, but Semgrep Secrets uses detection rules that include [validators](/semgrep-secrets/conceptual-overview#validate-secrets) to confirm whether the match is a real, active secret, helping reduce noise.

When a Code and Secrets rule exists for the same issue, Semgrep marks the findings from Semgrep Secrets rules as superseding the Semgrep Code rules. The supersession behavior matches the behavior outlined in [Pro versus CE rules in Semgrep Code](#pro-community-supersession).

A finding from the superseded Semgrep Code rule displays the **Secrets version available** badge.


## Upgrade rules

See [Upgrade your rules](/semgrep-secrets/getting-started#upgrade-your-rules) to see the rules you're using for which there is an upgrade in Semgrep AppSec Platform.
