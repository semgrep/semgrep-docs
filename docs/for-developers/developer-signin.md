---
slug: /for-developers/signin
title: Sign in to Semgrep
hide_title: true
description: Sign in to Semgrep to run scans following your organization's Semgrep deployment.
tags:
  - Developer education
  - Semgrep AppSec Platform
---

import JoinAnOrg from "/src/components/procedure/_join-an-org.md"
import Install from "/src/components/procedure/_install-cli.mdx";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Sign in to Semgrep

Signing in to the [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform web app](https://semgrep.dev/login) enables you to:

- View and triage your findings in bulk.
- Use your organization's custom Semgrep rules and configurations when you perform local scans with Semgrep. This ensures that everyone in the organization uses the same rules and analyses.

:::tip Is this document for you?
- Not all organizations require their developers to create a Semgrep account.
- You can resolve or triage (ignore) findings in pull or merge request comments, even **without** a Semgrep account, by replying to the comment. See [Resolve findings in your pull or merge request](/for-developers/resolve-findings-through-comments).
:::

## Semgrep in multiple environments

If you have not yet created a Semgrep account, it is **recommended** to first sign in to the Semgrep web app. This process creates a **personal** account, which you can then use to **join** your organization's Semgrep account. This lets you use your organization's Semgrep configuration, such as custom rules and scan parameters.

If you use Semgrep in your CLI or IDE, you must sign in from those environments as well. It is recommended to sign in from these interfaces **after** you have signed in to your organization account in the web app.

## Prerequisites

- Confirm with your security team that there is an existing organization account for you to join.
- For CLI and IDE scans, see [Prerequisites > Command line tool](/prerequisites#semgrep-command-line-tool) to ensure that your machine meets Semgrep's requirements.

## Sign in to the web app

In a typical Semgrep deployment, your company creates an **org** that you can sign in to and join using your GitHub, GitLab, or SSO credentials. Your organization will let you know through a notice or announcement once you can sign in.

 <JoinAnOrg />

After signing in to your org's account, you can now sign in and scan with Semgrep from other environments, such as your CLI or IDE.

## Set up Semgrep in the CLI

### Install the Semgrep CLI tool

<Install />

### Sign in to Semgrep from the CLI

To sign in to Semgrep:

1. Ensure that you are signed in to your **[org account](#sign-in-to-the-web-app)** in the Semgrep web app.
1. Enter the following command in your CLI:
    ```bash
    semgrep login
    ``` 
1. Running this command launches a browser window, but you can also use the link that's returned in the CLI to proceed.
1. In the Semgrep CLI login dialog, click **Activate** to proceed.

You are now ready to run local scans with your org's Semgrep configuration.

