---
slug: primary-branch
title: Set a primary branch (beta)
hide_title: true
description: Set your primary or default branch to ensure Semgrep full scans display accurate counts and deduplicated findings.
tags:
  - Core deployment
---

# Set a primary branch

A **primary branch** is the base or target branch for pull and merge requests. It is usually referred to as a **default branch** or **trunk** by your source code manager (SCM). Typical names for a primary branch include `dev`, `production`, or `develop`.

In many cases, Semgrep automatically detects primary branches when they first scan your project. If you have projects (repositories) with unique primary branch names, you can set them through the Semgrep web app.

:::note
- This feature is in **private beta**. To request access, contact your Technical Account Manager or your Account Executive and let them know you'd like to join the primary branch beta.
- Primary branches are set on a **per-project** basis in the Semgrep web app. To quickly update your primary branches, use the [API endpoint](#through-an-api-endpoint).
:::

A primary branch enables Semgrep to filter your findings by branch and to accurately deduplicate findings. The primary branch is also used to analyze the deployment of [secure guardrails](/secure-guardrails/secure-guardrails-in-semgrep) to your developers; findings fixed before they are merged into the primary branch reduces the overall production backlog.

## Prerequisite

Ensure that the project you want to set a primary branch for has completed at least one full scan successfully.

## Find projects without a primary branch

Projects without primary branches have an orange information icon <span style={{color: 'orange'}}> <i class="fa-solid fa-circle-exclamation"></i></span> next to their name in the **Projects** page.

## Set a project's primary branch

### Through the web app

1. In the Semgrep web app, click **Projects**.
1. Search for your project's name.
1. Click the **<i class="fa-solid fa-gear"></i> gear icon** to access the settings page for that project.
1. In the **Primary branch** section, click the drop-down box and select a branch. The drop-down menu shows a list of **scanned branches**.
1. Click **Save**.

![Primary branch selection](/img/primary-branch.png#sm-width-bordered)
_**Figure**. Projects > Project <i class="fa-solid fa-gear"></i> settings page > Primary branch selection._

### Through an API endpoint

You can also send a `patch` request to the following endpoint: [Deployment > Project endpoint](https://semgrep.dev/api/v1/docs/#tag/Project/operation/semgrep_app.saas.handlers.repository.openapi_patch_project). Add the `primary_branch` key in the response body.
