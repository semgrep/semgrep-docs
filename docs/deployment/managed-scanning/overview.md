---
slug: sms-overview
title: Managed Scans (beta)
hide_title: true
description: Semgrep Managed Scans provides an alternative to CI-based workflows. It enables you to add repositories to your Semgrep org in bulk without changing your CI workflows.
tags:
  - Beta
  - Deployment
  - Semgrep AppSec Platform
---

# Semgrep Managed Scans

Add repositories to your Semgrep organization in bulk without adding or changing your existing CI workflows through **Managed Scans**. Similar to CI workflows, Managed Scans also integrates into developer workflows through PR comments.

This is an alternative method to [adding Semgrep in CI](/deployment/add-semgrep-to-ci). Instead of adding a Semgrep job or workflow to your CI/CD pipeline, repositories are added to Semgrep AppSec Platform.


## Feature maturity and support

- Managed Scans is in **public beta** for all existing Semgrep AppSec Platform users with hosted GitHub (GitHub.com) and GitHub Enterprise Server plans.
- Managed Scans is in **private beta** for all existing Semgrep AppSec Platform users with GitLab Cloud and GitLab self-managed plans.
- Please leave feedback by either contacting your technical account manager (TAM) or through the **<i class="fa-solid fa-bullhorn"></i> Feedback** form in Semgrep AppSec Platform's navigation bar.
- Managed Scans is available for all Semgrep products you have purchased, including:
    - Semgrep Code
    - Semgrep Supply Chain
    - Semgrep Secrets
- Semgrep performs both full and diff-aware managed scans when a developer creates a pull request.

:::info
- To receive Supply Chain findings, you must have a supported lockfile in your repository. Managed Scans does **not** support lockfile generation.
- For existing Semgrep projects, custom `semgrep.yml` configurations are not copied or detected when you use Managed Scans. If you have additional build steps when scanning, use [Semgrep in CI instead](/deployment/add-semgrep-to-ci).
:::

## Security

Managed Scans require **read access** to your code for the repositories you choose to scan. Semgrep clones your repository at the beginning of every scan. Once the scan completes, the clone is destroyed and is not persisted anywhere.

For GitHub users, access to your code is facilitated by a **private Semgrep GitHub app** that you create and register in your GitHub organization. For GitLab users, access to your code is facilitated by a **personal access token** that you generate and provide to Semgrep.

- You are in control of the app and can revoke access to repositories at any time.
- GitHub users only: you can limit access to specific repositories.

Managed scans are specifically designed to limit the amount of time that code remains within Semgrep infrastructure.

### Life cycle of a managed scan

1. When a scan begins, Semgrep creates an ephemeral container and clones the repository into it.
1. Semgrep runs the scan from that container. Diff-aware scans typically take seconds, while full scans can take minutes to hours to complete.
1. The ephemeral container is immediately and automatically destroyed post-scan along with all contents in it.

## Default configuration

By default, projects on Managed Scans are configured with:

- **Weekly full scans** of the entire repository. When a project is first added to Managed Scans, the AppSec Platform performs an initial scan and then sets a random time up to 6 days after to perform a weekly full scan. Each weekly scan occurs on that same day and time.
- **Diff-aware scans** on pull requests that run on every PR. These diff-aware scans follow the **rule modes** set in your Policies, ensuring that developers are only notified of findings from high-signal rules you place in Comment or Block mode.

## Add a repository to Semgrep Managed Scans

Learn how to add a repository to Semgrep Managed Scans:

- [GitHub](/deployment/managed-scanning/github)
- [GitLab](/deployment/managed-scanning/gitlab)
