---
slug: scm-support
append_help_link: true
title: Supported source code managers
hide_title: true
description: Supported source code managers for use with Semgrep.
tags:
  - SCM
  - Deployment
---

# Supported source code managers

Semgrep supports the following source code managers (SCM) and plans to varying degrees. Please review the information for your specific SCM and plan to see what Semgrep features are available to you.

Some SCMs offer security features that limit access to your resources. Additionally, self-hosted SCMs may be subject to network access restrictions. If either case applies to you, you may need to add [Semgrep's IP addresses](/deployment/checklist#ip-addresses) to your ingress and egress allowlists, or you can use the [Network Broker](/semgrep-ci/network-broker).

| Plan | Unsupported Semgrep features |
| - | - |
| Azure DevOps Cloud | <ul><li>Query console</li><li>Auto PRs for Supply Chain findings</li></ul> |
| Azure DevOps Server | <ul><li>Semgrep Assistant</li><li>Semgrep Managed Scans</li><li>Pull request comments</li><li>Query console</li><li>Diff-aware scans</li><li>Sending findings to Semgrep AppSec Platform</li><li>Default branch identification</li><li>Auto PRs for Supply Chain findings</li></ul> |
| Bitbucket Cloud Free | <ul><li>Semgrep Assistant†</li><li> Semgrep Managed Scan†</li><li> Query console</li><li>Auto PRs for Supply Chain findings</li></ul> |
| Bitbucket Cloud Standard | <ul><li>Semgrep Assistant†</li><li>Semgrep Managed Scan†</li><li> Query console</li><li>Auto PRs for Supply Chain findings</li></ul> |
| Bitbucket Cloud Premium | <ul><li>Query console</li><li>Auto PRs for Supply Chain findings</li></ul> |
| Bitbucket Data Center | <ul><li>Semgrep Assistant</li><li>Query console</li><li>Diff-aware scans require Bitbucket Data Center version 8.8 or later.</li><li>Auto PRs for Supply Chain findings</li></ul> |
| GitHub Free | - |
| GitHub Pro | - |
| GitHub Team | - |
| GitHub Enterprise Cloud | - |
| GitHub Enterprise Server | <ul><li>Auto PRs for Supply Chain findings</li></ul> |
| GitLab Free | <ul><li>Semgrep Managed Scans*</li><li> Query console</li><li>Auto PRs for Supply Chain findings</li></ul> |
| GitLab Premium | <ul><li>Query console</li><li>Auto PRs for Supply Chain findings</li></ul> |
| GitLab Ultimate | <ul><li>Query console</li><li>Auto PRs for Supply Chain findings</li></ul> |
| GitLab Dedicated / Dedicated for Government | <ul><li>Query console</li><li>Auto PRs for Supply Chain findings</li></ul> |
| GitLab Self-Managed Free | <ul><li>Semgrep Managed Scans*<br /> Query console</li><li>Auto PRs for Supply Chain findings</li></ul> |
| GitLab Self-Managed Premium | <ul><li>Query console</li><li>Auto PRs for Supply Chain findings</li></ul> |
| GitLab Self-Managed Ultimate | <ul><li>Query console</li><li>Auto PRs for Supply Chain findings</li></ul> |

<strong>†</strong>Semgrep Assistant and Managed Scans require a workspace access token, which is only available to users with Bitbucket Cloud Premium.

<strong>*</strong>Semgrep Managed Scans requires access to group webhooks, which is unavailable to GitLab Free users. 

<!--
## Azure DevOps

| Plan | Unsupported Semgrep features |
| - | - |
| Azure DevOps Cloud | - |
| Azure DevOps Server | Semgrep Assistant<br /> Semgrep Managed Scans<br /> Pull request comments |

## Bitbucket

| Plan | Unsupported Semgrep features |
| - | - |
| Bitbucket Cloud Free | †Semgrep Assistant<br /> †Semgrep Managed Scan |
| Bitbucket Cloud Standard | †Semgrep Assistant<br /> †Semgrep Managed Scan |
| Bitbucket Cloud Premium | - |
| Bitbucket Data Center | Semgrep Assistant<br /> Diff-aware scans require Bitbucket Data Center version 8.8 or later. |

†Semgrep Assistant and Managed Scans require a workspace access token, which is only available to users with Bitbucket Cloud Premium.

## GitHub

| Plan | Unsupported Semgrep features |
| - | - |
| GitHub Free | - |
| GitHub Pro | - |
| GitHub Team | - |
| GitHub Enterprise Cloud | - |
| GitHub Enterprise Server | - |

Query console is available only to users with GitHub-hosted plans, such as Free, Pro, Team, and Enterprise Cloud.

## GitLab

| Plan | Unsupported Semgrep features |
| - | - |
| GitLab Free | *Semgrep Managed Scans |
| GitLab Premium | - |
| GitLab Ultimate | - |
| GitLab Dedicated / Dedicated for Government | - |
| GitLab Self-Managed Free | *Semgrep Managed Scans |
| GitLab Self-Managed Premium | - |
| GitLab Self-Managed Ultimate | - |

*Semgrep Managed Scans requires access to group webhooks, which is unavailable to GitLab Free users. 
-->