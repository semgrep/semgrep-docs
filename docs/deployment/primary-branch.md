---
slug: primary-branch
title: Primary branch
hide_title: true
description: Set your primary or default branch to ensure Semgrep full scans display accurate counts and deduplicated findings.
tags:
  - Core deployment
---

# Set a primary branch

A **primary branch** is the base or target branch for pull and merge requests. It is usually referred to as a **default branch** or **trunk** by your source code manager (SCM). Typical names for a primary branch include `dev`, `production`, or `develop`.

In many cases, Semgrep automatically detects primary branches. If you have projects (repositories) with unique primary branch names, you can set them through the Semgrep web app.

:::note
- This feature is in **private beta**. To request access, contact your Technical Account Manager or your Account Executive and let them know you'd like to join the primary branch beta.
- Primary branches are set on a per-project basis. They cannot be set in bulk.
:::

A primary branch enables Semgrep to filter your findings by branch and to accurately deduplicate findings.

## Find projects without a primary branch

'Projects without primary branches have an orange information icon <span style={{color: 'orange'}}> <i class="fa-solid fa-circle-exclamation"></i></span> next to their name in the **Projects** page.

## Set a project's primary branch

1. In the Semgrep web app, click **Projects**.
1. Search for your project's name.
1. Click the **<i class="fa-solid fa-gear"></i> gear icon** to access the settings page for that project.
1. In the **Primary branch** section, click the drop-down box and select a branch.
1. Click **Save**.

![Primary branch selection](/img/primary-branch.png#md-width-bordered)
_**Figure**. Projects > Project <i class="fa-solid fa-gear"></i> settings page > Primary branch selection._
