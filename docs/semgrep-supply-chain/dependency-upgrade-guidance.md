---
slug: dependency-upgrade-guidance
title: Dependency upgrade guidance
hide_title: true
description: Know if a vulnerable package or dependency can be easily and reliably upgraded to a fixed version.
tags:
  - Semgrep Supply Chain
  - Semgrep AppSec Platform
---
 
# Dependency upgrade guidance

Know if a vulnerable package or dependency can be easily and reliably upgraded to a fixed version. From there, choose to:

- Have Semgrep open a pull request or merge request (PR or MR)
- Create a Jira ticket
- Set the finding's triage status as **To fix**

Semgrep's dependency upgrade guidance uses AI to analyze if a finding can be safely upgraded or if solely upgrading the package can cause breaking changes. From there, it is able to create a PR or MR that addresses the breaking changes, if any, while also upgrading the package.

## Feature maturity

This feature is in **private beta**. TK: How do users join?

## Supported languages and package managers

Semgrep supports **Python** codebases with the following package managers:
  - `pip`
  - `pip-tools`
  - `pipenv`
  - Poetry

Semgrep supports the following source code managers

- GitHub Cloud and GitHub Enterprise Server (self-hosted)
- **TK: Does this feature work with SMS?**

## Prerequisites

- At least one repository that scans for dependencies through Semgrep Supply Chain. See [Scan third-party dependencies](/semgrep-supply-chain/getting-started).
- Semgrep Assistant must be [enabled](/semgrep-assistant/getting-started).
- __Does this feature require code access? Is that what `contents: write` does?__

## How it works

After enabling dependency guidance, Semgrep performs post-scan analysis and marks applicable findings as **Safe to upgrade** or with **Breaking changes**.

- Frequency: this analysis is performed after every diff-aware or full scan.
- Only findings **with fixed versions** are marked by Semgrep as **Safe to upgrade** or with **Breaking changes**.
- Findings without any fixed versions have no badge; instead they say **no patch available**.

![Flowchart explaining how Semgrep provides upgrade guidance and possible actions to take based on its advice.](/img/upgrade-guidance-flowchart.png)
_**Figure**. How Semgrep provides upgrade guidance and possible actions to take based on its advice._

## Enable dependency upgrade guidance

1. After the Semgrep Support team has confirmed that you've been added to the beta program, navigate to Semgrep AppSec Platform > Settings **TK: Are we enabling a toggle here?**

## View findings with dependency upgrade guidance

**_tk: this is the filter + details view_**

Filter for findings with dependency upgrade guidance:

tk

### Details provided by upgrade guidance

tk these are the PR comments

- Safe to upgrade
-

## Remediate or triage the finding




:::info
There is no shortcut to create PRs in bulk for findings with marked **safe to upgrade**.
:::


### Multiple pull requests

- TK:Does Semgrep make 1 PR per finding? If so, won't the code file have plenty of pull requests?

## TK: Questions around implementation

- Can I get this feature enabled for deployment named `s-santillan`?
- We need screenshots of the PR comments generated! Are those available? If they are, should I try it on my personal org?
- Do we use prefab or a feature flag for this?

## Troubleshooting

### The feature has been enabled, but you don't see any analysis

If you can't see any **Breaking changes** or **Safe to upgrade** badges or findings, this may be due to the following reasons:

- Your language or package ecosystem isn't supported
- Your source code manager isn't supported
- Your you have not set the `contents: write` permission within your GitHub workflow file, typically `semgrep.yml`.
- Your findings don't have safe versions to upgrade to yet
- You have no findings within the supported scope of this feature
