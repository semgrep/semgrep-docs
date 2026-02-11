---
slug: overview
title: Managed Scans
hide_title: true
description: Semgrep Managed Scans provides an alternative to CI-based workflows. It enables you to add repositories to your Semgrep org in bulk without changing your CI workflows.
tags:
  - Deployment
  - Semgrep AppSec Platform
---

import SmsSupport from "/src/components/reference/_sms-support.mdx"
import RerunManagedScanEmptyCommit from "/src/components/code_snippets/_rerun-managed-scan-empty-commit.mdx"

# Semgrep Managed Scans

Add repositories to your Semgrep organization in bulk without adding or changing your existing CI workflows through **Managed Scans**. Similar to CI workflows, Managed Scans also integrates into developer workflows through pull request (PR) or merge request (MR) comments.

This is an alternative method to [adding Semgrep in CI](/deployment/add-semgrep-to-ci). Instead of adding a Semgrep job or workflow to your CI/CD pipeline, repositories are added to Semgrep AppSec Platform.

## Feature maturity and support

<SmsSupport />

Managed Scans is available for all Semgrep products you have purchased, including:
  - Semgrep Code
  - Semgrep Supply Chain
  - Semgrep Secrets

Semgrep performs full scans on a weekly basis and diff-aware scans when you create a pull request or merge request.

:::info
- To receive Supply Chain findings, you must have a supported manifest file or lockfile in your repository. Managed Scans does **not** support generation of these files.
- For existing Semgrep projects, custom `semgrep.yml` configurations are not copied or detected when you use Managed Scans. If you have additional build steps when scanning, use [Semgrep in CI instead](/deployment/add-semgrep-to-ci).
:::

Please leave feedback by either contacting your technical account manager (TAM) or through the **<i class="fa-solid fa-bullhorn"></i> Feedback** form in Semgrep AppSec Platform's navigation bar.

## Security

Managed Scans require **read access** to your code for the repositories you choose to scan. Semgrep clones your repository at the beginning of every scan. Once the scan completes, the clone is destroyed and is not persisted anywhere.

For GitHub users, access to your code is facilitated by a **private Semgrep GitHub app** that you create and register in your GitHub organization. For GitLab users, access to your code is facilitated by a **personal access token** that you generate and provide to Semgrep.

- You are in control of the app and can revoke access to repositories at any time.
- GitHub users only: you can limit access to specific repositories.

Managed scans are specifically designed to limit the amount of time that code remains within Semgrep infrastructure.

### Code security measures

Semgrep’s Managed Scans infrastructure ensures that customer code is scanned in a vacuum and inaccessible from other Kubernetes cluster resources. Semgrep does this by employing the following features and best practices:

- **Ephemeral pods**
  - Each scan creates a new pod from scratch, ensuring there is never leftover data from previous scans.
  - Customer code is cloned into the new pod, scanned, and deleted once the scan is completed. The pod is then destroyed. 
  - Pods do not share volumes and do not persist after a scan is completed. Once a pod is destroyed, its volume and the data it contains are destroyed as well.
- **Network isolation**
  - Pod network capabilities are completely locked down to ensure only allowed IP addresses are accessible.
  - Pods are unable to access other pods within the cluster. This ensures that the customer code cloned to one pod is not accessible from another pod. 

### Life cycle of a managed scan

1. When a scan begins, Semgrep creates an ephemeral container and clones the repository into it.
1. Semgrep runs the scan from that container. Diff-aware scans typically take seconds, while full scans can take minutes to hours to complete.
1. The ephemeral container is immediately and automatically destroyed post-scan along with all contents in it.

## Default configuration

By default, projects on Managed Scans are configured with:

- **Weekly full scans** of the entire repository. When a project is first added to Managed Scans, the AppSec Platform performs an initial scan and then sets a random time up to 6 days after to perform a weekly full scan. Each weekly scan occurs on that same day and time. If a full scan doesn't complete, Semgrep re-attempts the scan once, in case it was affected by a temporary error.
- **Diff-aware scans** on pull requests that run on every PR. These diff-aware scans follow the **rule modes** set in your Policies, ensuring that developers are only notified of findings from high-signal rules you place in Comment or Block mode.

## Run scans in bulk

Semgrep Managed Scans enables you to scan multiple projects simultaneously, which is especially useful after updating your ruleset or configuration.

To run scans in bulk, go to the **Projects** page, select the projects of interest, and click **Scan**.

## Re-run scans

<RerunManagedScanEmptyCommit />

## Add a repository to Semgrep Managed Scans

Learn how to add a repository to Semgrep Managed Scans:

- [Azure DevOps](/deployment/managed-scanning/azure)
- [Bitbucket](/deployment/managed-scanning/bitbucket)
- [GitHub](/deployment/managed-scanning/github)
- [GitLab](/deployment/managed-scanning/gitlab)
