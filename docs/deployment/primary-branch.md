---
slug: primary-branch
title: Set a primary branch
hide_title: true
description: Set your primary or default branch to ensure Semgrep full scans display accurate counts and deduplicated findings.
tags:
  - Deployment
---

# Set a primary branch

A **primary branch** is the base or target branch for pull and merge requests. It is usually referred to as a **default branch** or **trunk** by your source code manager (SCM). Typical names for a primary branch include `dev`, `production`, or `develop`.

In many cases, Semgrep automatically detects primary branches when they first scan your project. If you have projects (repositories) with unique primary branch names, you can set them through the Semgrep web app.

A primary branch enables Semgrep to filter your findings by branch and to accurately deduplicate findings. The primary branch is also used to analyze the deployment of [secure guardrails](/secure-guardrails/secure-guardrails-in-semgrep) to your developers; findings fixed before they are merged into the primary branch reduces the overall production backlog.

The following video provides an introduction and walkthrough:

<iframe class="yt_embed" width="100%" height="432px" src="https://www.youtube.com/embed/gUjiVXLqK70" frameborder="0" allowfullscreen></iframe>

## Prerequisite

Ensure that the project you want to set a primary branch for has completed **at least one full scan** successfully.

## Find projects without a primary branch

Projects without primary branches have an orange information icon <span style={{color: 'orange'}}> <i class="fa-solid fa-circle-exclamation"></i></span> next to their name in the **Projects** page.

## Changes to existing URLs

For Semgrep AppSec Platform users whose accounts were created prior to September 4, 2024, this feature may affect any bookmarks or saved links created for custom views or slices in product pages such as **Code**, **Supply Chain > Vulnerabilities**, and **Secrets**. The primary branch feature deprecates certain filters, which affect the parameters in your URL. In these cases, you may have to re-create your bookmarks.

- The following parameters are deprecated:
  - `ref=_default`
  - `ref=_other`
- For **Code** page and **Supply Chain > Vulnerabilities** tab:
  - Bookmarks that use the `ref` parameter without a `repo`, your URL will be redirected to the default view instead.
  - Bookmarks that use any number of `repo` parameters without a `ref` will display the findings of primary branches for all repositories selected.
  - Any filters using multiple `refs` now show only one `ref`, such as the primary branch.

## Set a project's primary branch

- Primary branches are set on a **per-project** basis in the Semgrep web app. To quickly update your primary branches, use the [API endpoint](#through-an-api-endpoint).
- For more information on how primary branches may affect existing projects behavior see:
  - [Changes to existing URLs](#changes-to-existing-urls)
  - [How Semgrep counts findings in the projects page](/deployment/primary-branch#how-semgrep-counts-findings-in-the-projects-page)

### Through the web app

:::info
For Semgrep AppSec Platform users whose accounts were created prior to September 4, 2024, you may have to sign out and sign in again for this feature to appear.
:::

1. In the Semgrep web app, click **Projects**.
1. Search for your project's name.
1. Click the **<i class="fa-solid fa-gear"></i> gear icon** to access the settings page for that project.
1. In the **Primary branch** section, click the drop-down box and select a branch. The drop-down menu shows a list of **scanned branches**.
1. Click **Save**.

![Primary branch selection](/img/primary-branch.png#sm-width)
_**Figure**. Projects > Project <i class="fa-solid fa-gear"></i> settings page > Primary branch selection._

### Through an API endpoint

You can also send a `patch` request to the following endpoint: [Deployment > Project endpoint](https://semgrep.dev/api/v1/docs/#tag/Project/operation/semgrep_app.saas.handlers.repository.openapi_patch_project). Add the `primary_branch` key in the request body.

### How Semgrep counts findings in the Projects page

You can view a total count of findings in the **Projects** page for all Semgrep products.

- For Code and Supply Chain, this total count is computed from the **latest scanned branch**, not the primary branch.
- For Secrets, this total count is computed from deduplicated findings across all branches.

This means that the count of findings in your Code, Secrets, or Supply Chain page may differ from the counts in your Projects page.

The following links explain how Semgrep presents findings for each Semgrep product in their respective page:

- [Semgrep Code default view](/docs/semgrep-code/findings#default-code-page-view)
- [Semgrep Supply Chain > Vulnerabilities tab view](/semgrep-supply-chain/triage-and-remediation#default-supply-chain--vulnerabilities-tab-view)
- [Semgrep Secrets default view](/semgrep-secrets/view-triage#default-secrets-page-view-and-branch-logic)
