---
title: Add Semgrep to your Semaphore pipeline
toc_max_heading_level: 2
description: Learn how to add Semgrep to your Semaphore pipeline
---

<!-- Semaphore -->
import SemaphoreSemgrepAppSast from "/src/components/code_snippets/_semaphore-semgrep-app-sast.mdx"
import SemaphoreSemgrepOssSast from "/src/components/code_snippets/_semaphore-semgrep-oss-sast.mdx"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Add Semgrep to your Semaphore pipeline

This document shows you how to add Semgrep into Semaphore.

In Semaphore:

1. [Create a secret](https://docs.semaphore.io/using-semaphore/secrets) with [your `SEMGREP_APP_TOKEN`](https://semgrep.dev/orgs/-/settings/tokens).
2. Open the YAML pipeline for your project using the [Visual Editor](https://docs.semaphore.io/using-semaphore/workflows#workflow-editor).
3. Click **+Add Block**.
5. Expand **Jobs**, and add the following commands to perform a full scan:
   ```console
   checkout
   sudo pip install semgrep
   semgrep ci
   ```
4. Enable the secret that you created in **Step 1**. To do this, expand **Secret**, and select `SEMGREP_APP_TOKEN`.
6. Click **Run the workflow**, provide a **Commit summary**, and click **Looks good, Start** to save your changes and run the pipeline job.

### Sample Semaphore configuration snippet

<Tabs
    defaultValue="semaphore-semgrep"
    values={[
    {label: 'Default', value: 'semaphore-semgrep'},
    {label: 'Semgrep CE', value: 'semaphore-oss'},
    ]}
>

<TabItem value='semaphore-semgrep'>

The following configuration creates a CI job that runs scans using the products and options you have enabled in Semgrep AppSec Platform.

<SemaphoreSemgrepAppSast />

You can **run specific product scans** by passing an argument, such as `--supply-chain`. View the [list of arguments](/getting-started/cli/#scan-using-specific-semgrep-products).

</TabItem>

<TabItem value='semaphore-oss'>

The following configuration creates a CI job that runs Semgrep CE scans using rules configured for your programming language.

<SemaphoreSemgrepOssSast />

You can customize the scan by entering custom rules or other rulesets to scan with. See [Scan your codebase with a specific ruleset](/customize-semgrep-ce#scan-your-codebase-with-a-specific-ruleset).

</TabItem>

</Tabs>