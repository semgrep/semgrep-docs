---
slug: primary-branch
title: Primary branch
hide_title: true
description: Set your primary or default branch to ensure Semgrep full scans display accurate counts and deduplicated findings.
tags:
  - Semgrep AppSec Platform
---

# Set a primary branch

A **primary branch** is the base or target branch for pull and merge requests. It is usually referred to as a **default branch** or **trunk** by your source code manager (SCM). Typical names for a primary branch include `dev`, `production`, or `develop`.

In many cases, Semgrep automatically detects primary branches. If you have projects (repositories) with unique primary branch names, you can set them through the Semgrep web app.

:::note
- This feature is in **private beta**. To request access, contact your Technical Account Manager or your Account Executive and let them know you'd like to join the primary branch beta.
- Primary branches are set on a per-project basis. They cannot be set in bulk.
:::

## Discover which projects do not have a primary branch


## Set a project's primary branch

1. Sign in to Semgrep AppSec Platform.
1. Click **Projects**.
1. Search for your project's name.
1. Click the **<i class="fa-solid fa-gear"></i> gear icon** to access the settings page for that project.
1. In the **Primary branch** section, click the drop-down box and select a branch.
1. Click **Save**.
