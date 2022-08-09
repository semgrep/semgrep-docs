---
slug: configuration-reference
description: ""
---

import MoreHelp from "/src/components/MoreHelp"

# Running Semgrep in continuous integration (CI) with Semgrep App

Run Semgrep in your continous integration (CI) pipeline to scan your repository for code vulnerabilities and other issues. Connect your CI pipeline with Semgrep App to:

* Triage (ignore) false-positive findings from low-performing rules.
* Manage repositories at scale.
* Block pull or merge requests (PRs or MRs) based on the rule that generated the finding.
* Easily fork existing rules to create custom rules and add them to Semgrep App for scanning.

[embed video]

This guide explains how to connect your repository to Semgrep App to scan continuously. There are four general steps:

1. Create an account with Semgrep App.
2. Connect a new repository through Semgrep App's Projects page.
3. Ensure that Semgrep App is able to receive findings.
4. Refine your Semgrep App's CI job parameters. It is easier to troubleshoot parameters after testing that Semgrep App runs successfully on your repository.


## Setting up the CI job

### In-App Providers (such as GitLab CI/CD, BitBucket Pipelines, Jenkins)

Semgrep App is able to generate configuration files for the following providers:

* GitHub Actions
* GitLab CI/CD
* Jenkins
* Bitbucket Pipelines
* CircleCI
* Buildkite

1. Create an account.
2. Click **Projects > Scan New Project > Run Scan in CI**.
3. Select your provider from the menu.
4. Follow the steps outlined in the page.

### Other CI providers (supported through environment variables)

TODO 
1. Generate a Semgrep App token.
2. Add this token as a credential, secret, 
3. Add the `semgrep ci` command to your CI provider's configuration file.
3. Test that...


## Refining Semgrep App and your CI job parameters

### Setting a scan schedule

### Customizing rules and rulesets

### Ignoring files


