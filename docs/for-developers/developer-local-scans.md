---
slug: /for-developers/cli
title: Run local CLI scans
hide_title: true
description: Run local Semgrep CLI scans.
tags:
  - Semgrep AppSec Platform
---

# Run local CLI scans

You can run local Semgrep CLI scans with the Semgrep command-line tool.

## Prerequisites

- An existing Semgrep org account.
- Semgrep CLI tool installed in your local machine.

## Best practices

It's best to run the following command for local scans:

```bash
semgrep ci --dry-run
```

- The command `semgrep ci` tells Semgrep to use your organization's chosen analyses and rules for the scan.
- The `--dry-run` flag ensures that your scans are not uploaded to the Semgrep web app. This is recommended because your code could be a work in progress, subject to change, whereas code uploaded as a PR or MR usually indicates the code is ready for review. 

When Semgrep performs a CLI or IDE scan, it presents findings from **all rules** that your AppSec team uses. For this reason, you may encounter **more false positive or low severity findings** that you can ignore.

## Common Semgrep commands

### `semgrep scan`

The following command runs a local scan with Semgrep's open source Community Edition (CE) using pre-selected rules for a variety of languages:

```bash
semgrep scan
```
- `semgrep scan` does not take into account your organization's settings.
- You do **not** need to be logged in to run a scan.
- It only runs lightweight SAST analyses.
- It does not run other Semgrep products, such as Secrets or Supply Chain. 

:::caution
- `semgrep scan` does not run the same analyses as `semgrep ci` so you may have a higher rate of false positives.
- You can run `semgrep scan --pro` to run advanced SAST analyses with no other Semgrep products.
:::

#### Test a custom rule

You can test a custom rule by creating a test file. See [Testing rules](/writing-rules/testing-rules). 

After your've tested your custom rule, you can try it on your codebase locally:

1. Ensure that you're signed in to Semgrep from the CLI by entering `semgrep login`. If you have successfully signed in, you should see **API token already exists** or a similar message.
1. Enter the following command:
    ```bash
    semgrep scan --pro --config [CUSTOM_RULE].yaml
    ```
    Replace `CUSTOM_RULE.yaml` with the name of your custom rule.

### `semgrep ci`

The `semgrep ci` command, without any flags, sends the results of your scan to Semgrep AppSec Platform with the slug `local-scan/PROJECT_NAME`. When using this command in a team setting, ensure that you are aware of its risks and that your team members are aware that you're uploading the results of local scans.
