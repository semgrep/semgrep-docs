---
slug: historical-scanning
append_help_link: true
title: Scan your Git history (beta)
hide_title: true
description: Detect valid, leaked secrets in previous Git commits through a historical scan.
tags:
  - Semgrep Secrets
  - Semgrep AppSec Platform
---

# Scan your Git history (beta)

Historical scans allow you to detect valid, leaked secrets in your Git history, helping you reduce your repository's attack surface. 

## Feature maturity

- This feature is currently in beta. See [Limitations](#limitations) for more information.
- All Semgrep Secrets customers can enable this feature.
- Only rules that perform HTTP validation are incorporated during historical scanning. Findings that have been verified as valid are surfaced.

Please leave feedback either by reaching out to your technical account manager (TAM) or through the **<i class="fa-solid fa-bullhorn"></i> Feedback** form in Semgrep AppSec Platform's navigation bar.

## Prerequisites

Historical scanning requires Semgrep **v1.65.0** or later.

## Scope of findings

- Historical scans display **valid** Secrets findings. These secrets have been [validated through authentication or a similar function](/semgrep-secrets/conceptual-overview/#validate-secrets).
- Historical scans do **not** display the following finding types:
    - Invalid Secrets findings
    - Secrets findings without validator functions
    - Secrets findings with validation errors
- Findings from historical scans are generated through **Generic** (regex-based) rules only. To view these rules:
    - Navigate to **[<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform > Rules & Policies > Secrets](https://semgrep.dev/orgs/-/policies/secrets?analysis-method=generic)**.
    - Go to Validation state policies > Global rule behavior. Click **Edit**.
    - In the filter bar, click **Generic** under **Analysis method**.

For more information on the types of findings by validation, see [Semgrep Secrets overview](/semgrep-secrets/conceptual-overview/#validate-secrets).

## Enable historical scans for full Secrets scans

You can enable historical scans for your full scans, perform one-time historical scans using the Semgrep CLI, or create an on-demand CI job. Then, track and triage these findings in Semgrep AppSec Platform. Historical scans display **valid, leaked secrets** to ensure a high true positive rate. Diff-aware scans do **not** perform historical scans.

:::tip
[Test historical scans locally](#run-a-local-test-scan) to create a benchmark of performance and scan times before adding historical scans to your formal security process.
:::

To enable historical scanning:

1. Sign in to Semgrep AppSec Platform.
2. Go to **Settings > General > Secrets**.
3. Click the **<i class="fa-solid fa-toggle-large-on"></i> Historical scanning** toggle.

Subsequent Semgrep full scans now include historical scanning.

### Run a one-off historical scan

To run a one-off or on-demand historical scan, you can create a specific CI job and then manually start the job as needed. The general steps are:

1. Copy your current full scan CI job configuration file, or use [a template](/semgrep-ci/sample-ci-configs/).
2. Append the `--historical-secrets` flag to the `semgrep ci` command:
    ```bash
    semgrep ci --historical-secrets
    ```
3. Depending on your CI provider, you may have to perform additional steps to enable the job to run manually. For example, GitHub Actions requires the `workflow_dispatch` event to be added to your CI job.

### Run a local test scan

You can run a historical scan locally without sending the scan results to Semgrep AppSec Platform. This can help you determine the time it takes for Semgrep Secrets to run on your repository's Git commit history.

To run a test scan, enter the following command:

```bash
semgrep ci --secrets --historical-secrets --dry-run
```

The historical scan results appear in the **Secrets Historical Scan** section of the CLI output.

## Triage process

Historical scan findings are not automatically marked as **Fixed**. To triage a historical finding, you must:

1. Manually rotate the secret.
1. In Semgrep AppSec Platform, click **Secrets**.
2. Select the checkboxes for all of the historical secrets that you want to triage, then click **Triage > Ignored**.
3. Provide a **Comment** about why you're changing the status to **Ignored**, then click **Submit**.

## Hide historical findings

Semgrep AppSec Platform displays historical findings by default. These findings are flagged as **Historical <i class="fa-regular fa-clock-rotate-left"></i>** in the findings list. To hide historical findings:

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login).
2. Go to [**<i class="fa-solid fa-key"></i> Secrets**](https://semgrep.dev/orgs/-/secrets).
3. Expand the **Additional filters** menu, then select **Historical findings > Exclude historical** to toggle off the display of historical findings.

## Limitations

- Historical scanning can slow down scan times. Depending on the size of your repository history, scans can finish in less than 5 minutes or may take more than 60 minutes.
- Within Semgrep AppSec Platform, historical scan findings are not automatically marked as **Fixed**. Findings can only exist in two states: `Open` or `Ignored`. Because Semgrep scans do not automatically detect historical findings as fixed, you must manually rotate and triage the secret as `Ignored`.
- With historical scans enabled, the CLI output displays secrets still present in the current version of the code twice: once at the commit where they were initially added and once at the current commit from the standard Secrets scan. Semgrep AppSec Platform deduplicates the two findings and displays the secret as a current rather than a historical one.

### Commit history size

- Semgrep Secrets scans up to **5 GiB** of uncompressed blobs. This ranges from around **10,000 to 50,000** previous commits depending on the average size of the commit.
- For repositories with more than 5 GiB of history, Semgrep Secrets is still able to complete the scan, but the scan scope will not cover the older commits beyond 5 GiB.
- The size of the commit history affects the speed of the scan. Larger repositories take longer to complete.
- Semgrep Secrets scans the whole commit history every time a full scan is run. This guarantees that your Git history is also scanned using the **latest Secrets rules**.
