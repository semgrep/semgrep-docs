---
slug: resolve-findings
title: Resolve findings in your pull or merge request
hide_title: true
description: Learn to resolve or triage findings with Semgrep in developer-native interfaces.
tags:
  - Developer education
---

import TriageStatuses from "/src/components/reference/_triage-states.mdx"

# Resolve findings

Findings resolution involves the assessment of a finding, then either fixing or triaging (ignoring) it. You can fix or triage findings from your source code manager (SCM) or from Semgrep AppSec Platform.

Findings are primarily presented to developers through **pull request (PR) or merge request (MR) comments**. These findings are generated from rules that your AppSec team has vetted or approved. 

Findings from these rules are meant to be **fixed** rather than ignored unless the finding is a false positive.

In **typical coding workflows**, it is recommended to fix or ignore findings within your source code manager (SCM) as part of your code review process; the results of triage or remediation in your SCM are synchronized with Semgrep AppSec Platform.

However, if you have accumulated many findings to ignore, it may be faster to perform bulk triage actions in Semgrep AppSec Platform.

:::info Prerequisites and optional features
- The procedures described in this guide rely on PR or MR comments. Ensure that your security team has enabled this feature.
- To receive AI-assisted remediation, your security team must enable the **Semgrep Assistant** feature.
:::

<!--
Many factors affect whether or not a finding should be fixed: whether it is a true or false positive, if the fix can be applied within deadlines, if the finding is easily exploitable, the degree of the finding's severity, and so on.

Here are some of the most common Semgrep rule attributes used to quickly assess findings:

- **Severity**. Prioritize fixing critical and high severity findings.
- **Confidence**. Higher confidence rules indicate a higher chance of true positives. 
- **Exploit prediction scoring system (EPSS) score**. For SCA findings, higher EPSS scores should be fixed.
- **Reachability**. Prioritize updating dependencies or refactoring code to patch reachable dependency vulnerabilities.
-->


## Fix the finding through your SCM

Your SCM is the most common environment in which to fix findings. Semgrep provides several features to help you fix findings quickly.

### Human-written guidance

All comments include a human-written message to help you understand the finding and why it occurred. It may include tips about when it is safe to ignore a finding, or how to refactor the code.

### Human-written autofix

Some Semgrep Code rules provide an **autofix**. The fix can be committed directly, such as by clicking **Commit suggestion** in GitHub repositories. This is the fastest way to fix a finding. 

All Semgrep-supported SCMs provide this feature.

![GitHub PR comment with fix suggestion.](/img/pr-comment-autofix.png#md-width)
_**Figure**. GitHub enables you to commit the suggestion from Semgrep directly, fixing the finding._


:::info
If a line of code contains several findings, Semgrep does not provide the autofix or **Commit suggestion** feature to prevent fixes from conflicting.
:::

### Assistant (AI) remediation

Semgrep Assistant provides AI-powered security recommendations to help you triage and remediate your Semgrep findings. Depending on your organization's settings, Semgrep Assistant may show you:

- Remediation guidance
- An AI-written code snippet or fix
- An assessment if it thinks the finding can be safely ignored or is a false positive

#### "Safe to ignore" suggestions

![Semgrep Assistant suggesting that a finding is safe to ignore.](/img/ai-assessment-tp-fp.png#md-width)
_**Figure**. Semgrep Assistant suggesting that a finding is safe to ignore._

#### AI-written fixes

Semgrep also provides AI-written code fixes when a human-written autofix is not available and a code fix can resolve the finding.

![PR comment with an AI-written fix.](/img/comment-with-ai-fix.png#md-width)
_**Figure**. PR comment with an AI-written fix._

## Ignore the finding

If the finding is a false positive, acceptable risk, or similar, you can choose to ignore the finding.

### Ignore the finding through your SCM

In many cases, it is easiest to ignore the finding through your SCM as part of your code review. You can ignore findings directly from your SCM by **replying** to the finding comment. 

1. Find an open comment created by Semgrep AppSec Platform in your pull request or merge request:
    ![Screenshot of Semgrep AppSec Platform comment in GitHub](/img/semgrep-app-comment-github-beta.png#md-width)
2. In a subsequent comment, reply with the action you want to take. You must provide a **reason** to help the reader understand why the finding has been triaged as **ignored**:

    | Comment | Description |
    | - | - |
    | <code>/fp <span className="placeholder">&lt;REASON&gt;</span></code> | Triage a finding as **Ignored** with the triage reason **false positive**. |
    | <code>/ar <span className="placeholder">&lt;REASON&gt;</span></code> | Triage a finding as **Ignored** with the triage reason **acceptable risk**. |
    | <code>/other <span className="placeholder">&lt;REASON&gt;</span></code> | Triage a finding as **Ignored** without specifying the reason; the triage reason value is set to **No triage reason**. |
    | <code>/open <span className="placeholder">&lt;REASON&gt;</span></code> | Reopen a finding that has been triaged as **Ignored**. The comment is optional. |
    | <code>/remember <span className="placeholder">&lt;REASON&gt;</span></code> | [Add Assistant Memories](/semgrep-assistant/getting-started#add-memories-beta). |

![A completed triage flow.](/img/pr-comment-triage-response.png#md-width)
_**Figure**. A completed triage flow._

## Ignore the finding through Semgrep AppSec Platform

:::caution
- Not all organizations allow developers to use the AppSec Platform; ask your security team if you have access.
- When triaging through Semgrep AppSec Platform, developers typically triage findings specific to their **branch**. Avoid triaging findings in branches that are not yours to triage.
:::

To ignore comments in bulk quickly, select and triage these findings through Semgrep AppSec Platform:

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login).
1. Click **Code** for SAST findings, **Secrets** for secrets findings, or **Supply Chain** for SCA findings. You are taken to a page with all the findings for that product.
1. Click on **Projects and branches**, then click the **<i class="fa-solid fa-chevron-down"></i> drop-down arrow** to view open branches, which is listed by its unique ID. For example, GitHub branches are represented by their PR number.
1. Click your branch. This filters the displayed findings to those specific to your PR or MR.
1. Click the findings you want to triage, then click **Triage**.
1. In the drop-down box, select a new **Status**, typically **Ignored**, and optionally include a comment.

## Findings from other environments

When Semgrep performs a CLI or IDE scan, it presents findings from **all rules** that your AppSec team uses. For this reason, you may encounter **more false positive or low severity findings** that you can ignore.

You can ignore findings other environments, such as your IDE, in `pre-commit`, and the CLI, but these scans are performed **locally**. They are **not** tracked by Semgrep AppSec Platform. Semgrep does **not** save a history of ignored findings from these scans.

## Appendix

### Triage statuses

<details>
<summary>Click to view all triage statuses.</summary>

<TriageStatuses />

</details>
