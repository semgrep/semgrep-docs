---
slug: pro-vs-community-secrets-vs-code-rules
title: Rule upgrades and supersession in Semgrep
hide_title: true
description: Supersession between Community and Pro rules and between Semgrep Code and Semgrep Secrets
tags:
  - Rule supression
  - Rule upgrates
---

# Rule upgrades and supersession

More than one rule can match the same issue in the same code. Semgrep records supersession relationships between rules in order to recommend the preferred rule. On the **Findings** and findings' **Details** page, superseded rules can show a badge such as **Pro rule available**, **Upgrade available**, or **Secrets version available**.

This article describes the behavior for overlapping **Pro** and **CE** rules in Semgrep Code, and overlapping **Semgrep Code** and **Semgrep Secrets** rules. 

## Pro versus CE rules in Semgrep Code {#pro-community-supersession}

CE rules are public, and anyone can contribute them. They use only features available in the Semgrep CE (OSS) engine.

Pro rules are authored by Semgrep. They might cover the same topics as a CE rule, but they use the Pro engine. Since the Pro engine includes advanced features, like **cross-file (interfile)** analysis, matches are often more precise. Semgrep also publishes new Pro rules that overlap older Pro rules as coverage improves.

When rules overlap, results might vary depending on which rules you run:
* If a Pro rule exists, but you run only the overlapping CE rule, you might see more false positives than you would with the Pro rule.
* If you run both the Pro and the CE rules, you might see duplicate findings for the same underlying issue.


Semgrep uses **badges** to mark superseded rules on AppSec Platform. Findings from the superseding rule do not show upgrade badges. Findings from a superseded rule may show a badge; select the badge to see the rule Semgrep recommends using instead.

The following table summarizes the badges:

| Badge | Meaning |
| ------- | ------- |
| Pro | The finding is from a Pro rule. This label is separate from the **Upgrade available** badge below. |
| Pro rule available | The finding is from a CE rule, but Semgrep recommends a Pro rule for this use case. |
| Upgrade available | The finding is from a Pro rule, but Semgrep recommends a different Pro rule, such as a newer or narrower rule. The finding can also show the **Pro** badge. |



## Semgrep Secrets versus Semgrep Code rules

Semgrep Secrets is newer product than Semgrep Code’s secret-detection rules. Before Semgrep Secrets, some Semgrep Code rules could identify potential secret values in source code.

Now, Semgrep Secrets rules add validators and other Semgrep Secrets behavior so Semgrep can confirm whether a match is a real, active secret and reduce noise.

Semgrep marks the relevant Semgrep Secrets rules as superseding the Semgrep Code rules that covered the same cases. The supersession behavior matches the behavior outlined in the [Pro versus CE rules in Semgrep Code](#pro-community-supersession) above.

A finding from the superseded Semgrep Code rule displays the **Secrets version available** badge.


## Related documentation

See [Upgrade your rules](/semgrep-secrets/getting-started#upgrade-your-rules) for information on viewing Code findings where a Secrets rule is available.
