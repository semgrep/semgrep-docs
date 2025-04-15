---
slug: generic-secrets
title: Scan for generic secrets
hide_title: true
description: Use Semgrep to identify generic secrets in your code.
tags:
 - Semgrep Assistant
 - Semgrep Secrets
---

import PL from '@site/src/components/Placeholder';

# Generic secrets (beta)

:::info
Generic secrets is in public beta. Please contact [Support](/support) to request access to this feature.
:::

Like Semgrep Secrets, which scans for specific secrets, **generic secrets detection** scans your code for the inadvertent inclusion of credentials, such as API keys, passwords, and access tokens using rules. However, generic secrets detection looks for common keywords, such as auth, key, or passwords, and flags anything nearby that appears to be a secret. It then analyzes the results to eliminate false positives, so you only see high-signal results likely to be true positives.

## Prerequisites

To scan your code for generic secrets, you must have the following:

- Access to [Semgrep Secrets](/semgrep-secrets/getting-started).
- [Semgrep Assistant](/semgrep-assistant/getting-started) enabled.
- Semgrep CLI version `1.86.0` or higher running in your CI environment.

Generic secrets does *not* work with local scans initiated by running the `semgrep ci` command.

## Enable generic secrets

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login).
2. Go to **Settings > Deployment** and navigate to the **Secrets** section.
3. Click the **Generic secrets** <i class="fa-solid fa-toggle-large-on"></i> toggle to turn on generic secrets.

Once you have enabled generic secrets, your subsequent Semgrep Secrets scans automatically run with generic secrets rules. Semgrep also returns the following CLI message indicating that generic secrets detection has started: 

> Your deployment has generic secrets enabled. <PL>X</PL> potential line locations
will be uploaded to the Semgrep platform and then analyzed by Semgrep Assistant.
Any findings that appear actionable will be available in the Semgrep Platform.
You can view the secrets analyzed by Assistant at <PL>URL</PL>

## View findings

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login).
1. Go to [**Secrets**](https://semgrep.dev/orgs/-/secrets?validation_state=confirmed_valid%2Cvalidation_error%2Cno_validator&tab=open&last_opened=All+time&type=AI-detected+secret+(beta)) to see a list of all findings identified by Semgrep Secrets. 
1. Filter for generic secrets findings by setting the **Secret type** filter to **AI-detected secret (beta)**.

![Generic secrets findings in Semgrep AppSec Platform](/img/generic-secrets.png#md-width)
_**Figure**. Generic secrets findings in Semgrep AppSec Platform._

## Disable generic secrets

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login).
2. Go to **Settings > Deployment** and navigate to the **Secrets** section.
3. Click the **Generic secrets** <i class="fa-solid fa-toggle-large-on"></i> toggle to turn off generic secrets.

Once disabled, all of your generic secrets findings will be removed from Semgrep AppSec Platform after the following scan.
