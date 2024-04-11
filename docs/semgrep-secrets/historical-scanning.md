---
slug: historical-scanning
append_help_link: true
title: Scan your Git history (beta)
hide_title: true
description: Detect valid, leaked secrets in previous Git commits through a historical scan.
tags:
  - Semgrep Secrets
  - Team & Enterprise tier
---

# Scan your Git history (beta)

Detect valid, leaked secrets in previous Git commits through a **historical scan**.

You can perform one-time historical scans or enable historical scanning for full Secrets scans. Detecting valid secrets in your Git history is a step towards reducing your repository's attack surface.

You can run historical scans in the CLI and in your Semgrep deployment, which enables you to track and triage these secrets.

:::note Feature maturity
- This feature is in **public beta**. See [Limitations](#limitations) for more information.
- All Semgrep Secrets customers can enable this feature.
- Please leave feedback by either reaching out to your technical account manager (TAM) or through the **<i class="fa-solid fa-bullhorn"></i> Feedback** form in Semgrep Cloud Platform's navigation bar.
:::

## Run historical scans

You can enable historical scanning for your full scans or run a dedicated CI job for one-time scans. Historical scans display **valid, leaked secrets** to ensure a high true positive rate. Historical scans do **not** run on diff scans.

### Prerequisites

- **CLI tool**: Historical scanning requires at least Semgrep **v1.65.0**. See [Update](/update/) for instructions.
- **Single-tenant Semgrep Cloud Platform (SCP)**: Reach out to your TAM to ensure your instance is up-to-date.

### Enable historical scanning for full Secrets scans

:::tip
If possible, [test historical scans locally](#run-a-local-test-scan) to create a benchmark of performance and scan times before adding historical scans to your formal security process.
:::

1. Sign in to Semgrep Cloud Platform.
1. Click **<i class="fa-solid fa-gear"></i> Settings**.
1. Under Deployment, click the **<i class="fa-solid fa-toggle-large-on"></i> Historical scanning** toggle.
![Historical scanning settings toggle](/img/historical-scanning-settings.png#md-width)

Subsequent Semgrep full scans now include historical scanning.

### Run a one-off historical scan

To run a one-off or on-demand historical scan, you can create a specific CI job and then manually start the job as needed.

The general steps are:

1. Copy your current full scan CI job configuration file, or use [a template](/semgrep-ci/sample-ci-configs/).
1. Look for the `semgrep ci` command.
1. Append the `--historical-secrets` flag:
    ```
    semgrep ci --historical-secrets
    ```
1. Depending on your CI provider, you may have to perform additional steps to enable the job to run manually. For example, GitHub Actions requires the `workflow_dispatch` event to be added to your CI job.

### Run a local test scan

You can run a historical scan locally without sending the scan results to Semgrep Cloud Platform. This can help you determine the time it takes for Semgrep Secrets to run on your repository's Git commit history.

To run a test scan, enter the following command:

```bash
semgrep scan --historical-secrets
```

The historical scan results appear in the **Secrets Historical Scan** section:

![Historical scan section in the CLI](/img/historical-scans-cli.png#md-width)

## View or hide historical findings

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep Cloud Platform](https://semgrep.dev/login).
1. Click **<i class="fa-solid fa-key"></i> Secrets**. Historical findings are identified by an **<i class="fa-solid fa-hourglass-half"></i>** icon.
1. Click **<i class="fa-solid fa-hourglass-half"></i> Hide historical** to toggle the display of historical findings.

![Historical secrets in Semgrep Cloud Platform](/img/historical-secrets-scp.png)
*Figure.* Historical findings in Semgrep Cloud Platform.

## Scope of findings

- Historical scans display **valid** Secrets findings. These secrets have been [validated through authentication or a similar function](/semgrep-secrets/conceptual-overview/#validate-secrets).
- Historical scans do **not** display the following finding types:
    - Invalid Secrets findings
    - Secrets findings without validator functions
    - Secrets findings with validation errors
- Findings from historical scans are generated through **Generic** (regex-based) rules only.
    - Navigate to **[<i class="fas fa-external-link fa-xs"></i> Semgrep Cloud Platform > Policies > Secrets](https://semgrep.dev/orgs/-/policies/secrets?analysis-method=generic)** and click **Generic** under **Analysis method** to view these rules.

For more information on the types of findings by validation, see [Semgrep Secrets overview](/semgrep-secrets/conceptual-overview/#validate-secrets).

## Triage process

Historical scan findings are not automatically marked as **Fixed**. To triage a historical finding, you must:

1. Manually rotate the secret.
1. In Semgrep Cloud Platform, click **Secrets**.
1. Toggle the **Hide historical** button if it is enabled. This displays all historical findings.
1. Select all the checkboxes for secrets you want to triage, then click **Triage > Ignore**, optionally including a comment in the provided text box.

## Limitations

- Historical scanning can slow down scan times. Depending on the size of your repository history, scans can finish under 5 minutes to more than 60 minutes for extreme cases.
- Within SCP, historical scan findings are not automatically marked as **Fixed**. Findings can only exist in two states: `Open` or `Ignored`. Because Semgrep scans do not automatically detect historical findings as fixed, you must manually rotate and triage the secret as `Ignored`.
- A finding can show up twice in the CLI with historical scanning enabled: the HEAD commit in the regular Secrets scan and another commit in the historical scan.
    - If findings are sent to SCP, they are deduplicated and appear as a **regular finding**, not a historical finding.

### Size of commit history

- Semgrep Secrets scans up to **5 GiB** of uncompressed blobs. This ranges from around **10,000 to 50,000** previous commits depending on the average size of the commit.
- For repositories with more than 5 GiB of history, Semgrep Secrets is still able to complete the scan, but the scan scope will not cover the older commits beyond 5 GiB.
- The size of the commit history affects the speed of the scan. Larger repositories take longer to complete.
- Semgrep Secrets scans the whole commit history every time a full scan is run. This guarantees that your Git history is also scanned using the **latest Secrets rules**.
