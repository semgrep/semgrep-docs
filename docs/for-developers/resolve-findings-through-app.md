---
slug: resolve-findings-through-app
title: Resolve findings using Semgrep AppSec Platform
hide_title: true
description: Sign in to Semgrep to run scans following your organization's Semgrep deployment.
tags:
  - Developer education
  - Semgrep AppSec Platform
---

import TriageStatuses from "/src/components/reference/_triage-states.mdx"

# Resolve findings through Semgrep AppSec Platform

This guide explains how you can view and triage findings in bulk through the Semgrep AppSec Platform web app.

:::caution
- Not all organizations allow developers to use Semgrep AppSec Platform; ask your security team if you have access.
- When triaging through Semgrep AppSec Platform, developers typically triage findings specific to their **branch**. Avoid triaging findings in branches that are not yours to triage.
:::

## Prerequisites

You must have an existing Semgrep org account. See [Sign in to Semgrep](/for-developers/signin).

## Ignore findings in bulk

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login).
1. Click **Code** for SAST findings, **Secrets** for secrets findings, or **Supply Chain** for SCA findings. You are taken to a page with all the findings for that product.
1. Click on **Projects and branches**, then click the **<i class="fa-solid fa-chevron-down"></i> drop-down arrow** to view open branches, which is listed by its unique ID. For example, GitHub branches are represented by their PR number.
1. Click your branch. This filters the displayed findings to those specific to your PR or MR.
1. Click the findings you want to triage, then click **Triage**.
1. In the drop-down box, select a new **Status**, typically **Ignored**.
1. Optional: include a comment as to why you ignored a finding.

## Appendix: triage statuses

<details>
<summary>Click to view all triage statuses.</summary>

<TriageStatuses />

</details>
