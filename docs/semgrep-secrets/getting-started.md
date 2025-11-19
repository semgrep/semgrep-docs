---
slug: /semgrep-secrets/getting-started
append_help_link: true
title: Scan for secrets
hide_title: true
description: Set up secrets scanning to find and rotate valid leaked secrets.
tags:
  - Semgrep Secrets
---

import ValidationStates from '/src/components/reference/_validation-states.mdx'

# Scan for secrets

Semgrep Secrets allows you to detect and triage leaked secrets and credentials and save time by prioritizing which secrets to rotate based on whether they're active and in use.

This document guides you through:

1. Enabling Semgrep Secrets and scanning your repository
2. Configuring your ignore files
3. Upgrading your Semgrep Code rules to Semgrep Secrets rules

:::info
To access Semgrep Secrets, contact [Semgrep Sales](mailto:sales@semgrep.com) for a trial license.
:::

## Language and environment support

Semgrep Secrets can scan repositories using **any programming language** and supports the posting of pull request (PR) and merge request (MR) comments to GitHub, GitLab, and Bitbucket.

## Enable Semgrep Secrets

:::info Prerequisite
You have completed a [Semgrep core deployment](/deployment/core-deployment).
:::

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login).
2. Go to **Settings > General > Secrets**.
3. Click the **<i class="fa-solid fa-toggle-large-on"></i> Secrets scans** toggle to enable Semgrep Secrets.

## Scan your repository

Once you've enabled Secrets for your organization, all Semgrep scans include secret scanning. You can:

* Manually trigger a full scan of your repository through your CI provider
* Start a scan from the CLI (Semgrep recommends that you run CLI scans only on feature branches, not main branches)
* Wait for your scheduled Semgrep full scan
* Open a pull request or merge request and wait for Semgrep to scan the branch automatically

## Configure files to ignore

Semgrep Secrets scans all files, even those specified in a local `.semgrepignore` file, since secrets can often be found in files that aren't relevant for code scanning. To specify files that Semgrep Secrets should ignore:

1. Sign in to [Semgrep AppSec Platform](https://semgrep.dev/login?return_path=/manage/projects).
2. From the **Navigation bar**, select **[Projects](https://semgrep.dev/orgs/-/projects)**.
3. Find your project, then click **Details**.
4. Go to **Settings > Path ignores**.
5. Enter files and folders to ignore in the **Path Ignores** for Secrets box.
6. Click **Save changes**.

## Upgrade your rules

If you're using Semgrep Code rules to identify leaked credentials, you'll see prompts in Semgrep AppSec Platform indicating that there's an improved version that uses Semgrep Secrets' feature set, primarily its validators, which can validate whether the detected credential is active, and improvements in detecting and hiding false positives.

You can see individual findings for which there is a Semgrep Secrets rule upgrade in Semgrep AppSec Platform's **Findings** page. The findings are tagged with a label that says `Secrets version available! Click to see rule(s)`.

To see the rules you're using for which there is a Secrets rule upgrade in Semgrep AppSec Platform:

1. Sign in to Semgrep AppSec Platform.
2. Go to **Rules & Policies > Policies > Code**.
3. Under **Available rule upgrades**, select **Secrets**.

## Next steps

* [Scan your Git history](/semgrep-secrets/historical-scanning) for secrets and [scan for generic secrets](/semgrep-secrets/generic-secrets).
* Learn how to [view your findings in Semgrep AppSec Platform](/semgrep-secrets/findings).
* Learn more about the [structure of rules for Semgrep Secrets](/semgrep-secrets/rules), as well as how to [manage your rules using Semgrep AppSec Platform](/semgrep-secrets/policies).
* Learn how to [write custom validators](/semgrep-secrets/validators) for your Semgrep Secrets rules.
