---
slug: getting-started
append_help_link: true
description: "Install Semgrep, run Semgrep locally, and learn about the benefits of running Semgrep in CI (continuous integration)."
title: Semgrep
hide_title: true
---

import MoreHelp from "/src/components/MoreHelp"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Getting started with Semgrep

Detect security issues, vulnerable dependencies, and more by scanning your code with Semgrep. Semgrep performs both SAST (Static application security testing) and SCA (Software composition analysis) scans.

The following guide walks you through:
* Installing Semgrep in your computer locally.
* Running a single scan for both SAST and SCA.
* Sending results to [Semgrep Cloud Platform](/semgrep-cloud-platform/getting-started) for triage and analysis.

:::info
* **Code is not uploaded.** Only **findings** are sent to Semgrep Cloud Platform. 
:::

## Installing and running Semgrep locally

<!-- Commenting out for the interim
Install and run the [Semgrep command-line interface](https://github.com/returntocorp/semgrep/) (CLI) to scan your code locally. Semgrep OSS Engine runs offline on uncompiled code. **No code leaves your computer**.
-->

:::info Prerequisite
The Semgrep command-line tool requires Python 3.7 or later.
:::

To install and run Semgrep, use one of the following options:

<Tabs
    defaultValue="macOS"
    values={[
    {label: 'macOS', value: 'macOS'},
    {label: 'Linux', value: 'Linux'},
    {label: 'Windows Subsystem for Linux (WSL)', value: 'Windows Subsystem for Linux (WSL)'},
    {label: 'Docker', value: 'Docker'},
    ]}
>

<TabItem value='macOS'>

  1. Install:
      ```bash
      brew install semgrep
      ```

      Alternatively:

      ```bash
      python3 -m pip install semgrep
      ```

  2. Confirm installation:
      ```sh
      semgrep --version
      ```
  3. Log in to Semgrep Cloud Platform (SCP):
      ```sh
      semgrep login
      ```
      This command automatically opens a new tab or browser window, or click the link in the CLI to complete the step.
  4. A modal appears after logging in to SCP. Click **Create an organization**. Note that you can further integrate organizations (orgs) with GitLab accounts and GitHub accounts, including personal and org accounts, after you complete this procedure.
  5. After creating an organization in the previous step, return to the CLI and run a scan:
      ```sh
     semgrep ci
      ```
  
</TabItem>

<TabItem value='Linux'>

  1. Install:
      ```bash
      python3 -m pip install semgrep
      ```

  2. Confirm installation:
      ```sh
      semgrep --version
      ```
  3. Log in to Semgrep Cloud Platform (SCP):
      ```sh
      semgrep login
      ```
      This command automatically opens a new tab or browser window, or click the link in the CLI to complete the step.
  4. A modal appears after logging in to SCP. Click **Create an organization**. Note that you can further integrate organizations (orgs) with GitLab accounts and GitHub accounts, including personal and org accounts, after you complete this procedure.
  5. After creating an organization in the previous step, return to the CLI and run a scan: 
      ```sh
     semgrep ci
      ```

</TabItem>

<TabItem value='Windows Subsystem for Linux (WSL)'>

:::info Prerequisite
You must have Windows Subsystem for Linux installed. To install WSL, refer to Microsoft's documentation on [Installing Linux on Windows with WSL](https://learn.microsoft.com/en-us/windows/wsl/install).
:::

  1. Within your WSL interface, install Semgrep:
      ```bash
      python3 -m pip install semgrep
      ```
  2. Confirm installation:
      ```sh
      semgrep --version
      ```
  3. Log in to Semgrep Cloud Platform (SCP):
      ```sh
      semgrep login
      ```
      This command automatically opens a new tab or browser window, or click the link in the CLI to complete the step.
  4. A modal appears after logging in to SCP. Click **Create an organization**. Note that you can further integrate organizations (orgs) with GitLab accounts and GitHub accounts, including personal and org accounts, after you complete this procedure.
  5. After creating an organization in the previous step, return to the CLI and run a scan:
      ```sh
     semgrep ci
      ```

</TabItem>

<TabItem value='Docker'>

  1. Pull the latest image locally:
     ```sh
     docker pull returntocorp/semgrep
     ```
  2. Confirm version:
      ```sh
      docker run --rm returntocorp/semgrep semgrep --version
      ```
  3. For **macOS or Linux** Docker users, perform the following steps:
     1. On **macOS or Linux**, log in to Semgrep Cloud Platform (SCP):
         ```sh
        docker run --rm -v "${PWD}:/src" returntocorp/semgrep semgrep login
         ```
      This command automatically opens a new tab or browser window, or click the link in the CLI to complete the step.
       The provided `-v` option mounts the current directory into the container to be scanned. Change directories locally or provide a specific local directory in the command to scan a different directory.
    2. A modal appears after logging in to SCP. Click **Create an organization**. Note that you can further integrate organizations (orgs) with GitLab accounts and GitHub accounts, including personal and org accounts, after you complete this procedure.
    3. After creating an account in the previous step, you can return to the CLI and run the following command to start a scan using recommended Semgrep rules: 
        ```sh
       docker run --rm -v "${PWD}:/src" returntocorp/semgrep semgrep ci
      ```
  4. For **Windows** Docker users, perform the following steps: 
     1. log in to Semgrep Cloud Platform (SCP):
       ```bash
       docker run --rm -v "%cd%:/src" returntocorp/semgrep semgrep login
       ```
    2. A modal appears after logging in to SCP. Note that you can further integrate organizations (orgs) with GitLab accounts and GitHub accounts, including personal and org accounts, after you complete this procedure.
    3. After creating an account in the previous step, you can return to the CLI and run a scan: 
       ```bash
       docker run --rm -v "%cd%:/src" returntocorp/semgrep semgrep ci
       ```

</TabItem>

</Tabs>

You have just finished installing and running a Semgrep scan. Use [Semgrep Cloud Platform](/semgrep-cloud-platform/getting-started) to triage your findings and view vulnerabilities.

:::tip 
* You can also run `semgrep scan --config=auto` for **offline-only SAST scans**. No SCA scan is performed with this command. 
:::

:::note
- By default, when Semgrep Registry is used, Semgrep collects [usage metrics](./metrics.md).
- If you install Semgrep through Homebrew, ensure that you have added Homebrew to your PATH. See [My Mac .apps don’t find Homebrew utilities!](https://docs.brew.sh/FAQ#my-mac-apps-dont-find-homebrew-utilities) in Homebrew documentation.
:::

### Next steps

By completing this guide, you are now familiar with a simple use of Semgrep. Here are some additional resources to follow:

- Follow tutorials on [Learn Semgrep](https://semgrep.dev/learn/) to learn about Semgrep interactively.
- See [Running rules](./running-rules.md) to try out and understand more about Semgrep rules.
- See [CLI Reference](./cli-reference.md) for command line options and exit codes.
- Explore the Semgrep [Rules Registry](https://semgrep.dev/explore) to add rules to your project or [writing a rule](./writing-rules/overview.md).

## Testing Semgrep on vulnerable repositories

The following community projects are designed to test code scanners and teach security concepts. Try cloning and scanning them with Semgrep.

<details><summary>Expand for sample projects! 🎉</summary>
<p>

```sh
# juice-shop, a vulnerable Node.js + Express app:
git clone https://github.com/bkimminich/juice-shop
cd juice-shop
semgrep --config=auto

# Or if you don't have Semgrep installed, replace the semgrep command with:
docker run --rm -v "$(pwd)/juice-shop:/src" returntocorp/semgrep semgrep --config p/security-audit /src

# Try railsgoat, a vulnerable Ruby on Rails app:
git clone https://github.com/OWASP/railsgoat
cd railsgoat
semgrep --config=auto

# govwa, a vulnerable Go app:
git clone https://github.com/0c34/govwa
cd govwa
semgrep --config=auto 

# Vulnerable-Flask-App, vulnerable Python + Flask:
git clone https://github.com/we45/Vulnerable-Flask-App
cd Vulnerable-Flask-App
semgrep --config=auto 

# WebGoat, a vulnerable Java + Spring app:
git clone https://github.com/WebGoat/WebGoat
cd WebGoat
semgrep --config=auto 
```

</p>
</details>

## Run Semgrep continuously

Semgrep is at its best when used to continuously scan code. Check out [Semgrep in CI](semgrep-ci/overview.md/) to learn how to get results where you already work: GitHub, GitLab, Slack, Jira, and more. To get results even earlier in the development process, such as in a Git pre-commit hook or VS Code, check the available [Semgrep extensions](/extensions/overview/).

Check out [Semgrep Cloud Platform](https://semgrep.dev/manage) (SCP) to integrate Semgrep scans into your CI environment with PR or MR comments, monitor progress, host private rules (Team and Enterprise tiers), and much more! 

## Updating Semgrep

We [release new Semgrep versions](https://github.com/returntocorp/semgrep/releases) often! See [Updating](./upgrading.md) for more details.

<MoreHelp />
