---
slug: pro-vs-community-secrets-vs-code-rules
title: Rule upgrades and supersession in Semgrep
hide_title: true
description: Supersession between Community and Pro rules and between Semgrep Code and Semgrep Secrets
tags:
  - Rule supression
  - Rule upgrates
---

# Rule upgrades and supersession: Semgrep Code versus Secrets and Pro versus Community Edition (CE) rules

More than one rule can match the same issue in the same code. To recommend the preferred rule Semgrep records supersession relationships between rules. On the **Findings** page and finding **Details** page, superseded rules can show a badge such as **Pro rule available**, **Upgrade available**, or **Secrets version available**.

This article describes the behavior for overlapping **Pro** and **CE** rules in Semgrep Code, and overlapping **Semgrep Code** and **Semgrep Secrets** rules. 

## Pro versus CE rules in Semgrep Code {#pro-community-supersession}

CE rules are public, and anyone can contribute them. They use only features available in the Semgrep CE (OSS) engine.

Pro rules are authored by Semgrep. They may cover the same topics as a CE rule, but they use the Pro engine. Since the Pro engine includes advanced features, like **cross-file (interfile)** analysis matches are often more precise. Semgrep also publishes new Pro rules that overlap older Pro rules as coverage improves.

Behavior to note:
* If a Pro rule exists, but you run only the CE rule in an overlapping pair, you might see more false positives than with the Pro rule. 
* If you run two or more overlapping rules, you are likely to see duplicate findings for the same underlying issue.


### Read callouts on findings

Semgrep uses badges to mark superseded rules on AppSec Platform. 
The following statements describe how supersession appears in Semgrep AppSec Platform:

- Findings from the superseding rule do **not** show these upgrade badges.
- Findings from a superseded rule can show a badge. Select the badge to see which rule Semgrep recommends.

The following table summarizes the badges:

| Badge | Meaning |
| ------- | ------- |
| Pro | The finding is from a Pro rule. This label is separate from the upgrade callouts below. |
| Pro rule available | The finding is from a CE rule, but Semgrep recommends a Pro rule for this use case. |
| Upgrade available | The finding is from a Pro rule, but Semgrep recommends a different Pro rule, for example a newer or narrower rule. The finding can also show the **Pro** badge. |

Some summaries describe a Pro version upgrade. 


## Semgrep Secrets versus Semgrep Code rules

Semgrep Secrets is newer product than Semgrep Code’s secret-detection rules. Before Semgrep Secrets, some Semgrep Code rules could identify potential secret values in source code.

Now, Semgrep Secrets rules add validators and other Semgrep Secrets behavior so Semgrep can confirm whether a match is a real, active secret and reduce noise.

Semgrep marks the relevant Semgrep Secrets rules as superseding the Semgrep Code rules that covered the same cases. The supersession behavior matches [Compare Pro and CE rules in Semgrep Code](#pro-community-supersession): prefer the superseding rule to limit duplicate findings and weaker coverage.

A finding from the superseded Semgrep Code rule can show a badge similar to **Secrets version available**.

## List rules that have upgrades

To list rules that have a Semgrep upgrade:

1. Sign in to Semgrep AppSec Platform.
2. Go to **Rules & policies > Policies > Code**.
3. Under **Available rule upgrades**, select **Secrets**, **Pro**, or both.

For background, UI copy, and next steps, see [Upgrade your rules in Semgrep Secrets getting started](/semgrep-secrets/getting-started#upgrade-your-rules).


## Related documentation

- [Pro rules](/semgrep-code/pro-rules/)
- [Reduce false positives in `semgrep scan`](/kb/semgrep-code/reduce-false-positives)
- [Manage rules and policies](/semgrep-code/policies)
- [Upgrade your rules in Semgrep Secrets getting started](/semgrep-secrets/getting-started#upgrade-your-rules)
