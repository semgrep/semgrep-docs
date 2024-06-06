---
slug: /semgrep-secrets/getting-started
append_help_link: true
title: Scan for secrets
hide_title: true
description: Set up secrets scanning to find and rotate valid leaked secrets.
tags:
  - Semgrep Secrets
---

# Scan for secrets

Semgrep Secrets allows you to detect and triage leaked secrets and credentials
and save time by prioritizing which secrets to rotate based on whether they're active and in use.

![Semgrep Secrets page](/img/secrets-page.png#md-width)

This document guides you through:

1. Enabling Semgrep Secrets and scanning your repository
2. Configuring your ignore files
3. Upgrading your Semgrep Code rules to Semgrep Secrets rules

## Language and environment support

Semgrep Secrets can scan repositories using **any programming language** and supports the posting of PR and MR comments to GitHub, GitLab, and Bitbucket.

## Enable Semgrep Secrets

:::info Prerequisite
You have completed a [Semgrep core deployment](/deployment/core-deployment).
:::

1. Log into [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login).
2. Click **<i class="fa-solid fa-gear"></i> Settings**.
3. On the **Deployment** tab, click the **<i class="fa-solid fa-toggle-large-on"></i> Secrets** toggle to enable.

Once you've enabled Secrets for your organization, all Semgrep scans include secret scanning.

## Scan your repository

After you've enabled Semgrep Secrets, you can:

* Manually trigger a full scan of your repository through your CI provider
* Start a scan from the CLI (Semgrep recommends that you run CLI scans only on feature branches, not main branches)
* Wait for your scheduled Semgrep full scan
* Open a pull request or merge request and wait for Semgrep to scan the branch automatically

## Configure files to ignore

Semgrep Secrets scans all files, even those specified in a local `.semgrepignore` file, since secrets can often be found in files that aren't relevant for code scanning. To specify files that Semgrep Secrets should ignore:

1. Sign in to Semgrep AppSec Platform.
2. Go to **Projects** and find your project. Select the gear icon <i class="fa-solid fa-gear"></i> to access the settings for the related project.
3. Add the file paths to the **Path ignores** box. Semgrep ignores all file paths listed, including for Semgrep Secrets.
4. Click **Save changes**.

## Upgrade your rules

If you're using Semgrep Code rules to identify leaked credentials, you'll see prompts in Semgrep AppSec Platform indicating that there's an improved version that uses Semgrep Secrets' feature set, primarily its validators, which can validate whether the detected credential is active, and improvements in detecting and hiding false positives.

You can see individual findings for which there is a Semgrep Secrets rule upgrade in Semgrep AppSec Platform's **Findings** page. The findings are tagged with a label that says `Secrets version available! Click to see rule(s)`.

![Finding tagged as having a Secrets rule available](/img/superseded-rules-finding.png#md-width)

To see the rules you're using for which there is a Secrets rule upgrade in Semgrep AppSec Platform:

1. Sign in to Semgrep AppSec Platform.
2. Go to **Rules** > **Policies** > **Code**.
3. Under **Available rule upgrades**, ensure that you've selected **Secrets**.

![Filter to find rules for which there is a rule upgrade](/img/superseded-rules-policies.png#md-width)

## Next steps

* Learn how to [view and triage secrets in Semgrep AppSec Platform](/semgrep-secrets/view-triage)

### Additional information

* Learn more about the [structure of rules for Semgrep Secrets](/semgrep-secrets/rules), as well as how to [manage your rules using Semgrep AppSec Platform](/semgrep-secrets/policies).
* Learn how to [write custom validators](/semgrep-secrets/validators) for your Semgrep Secrets rules.
