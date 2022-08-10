---
slug: semgrep-ci-with-app
description: ""
title: Running Semgrep in CI with Semgrep App
---

import MoreHelp from "/src/components/MoreHelp"

# Running Semgrep in continuous integration (CI) with Semgrep App

Run Semgrep in your continous integration (CI) pipeline to scan your repository for code vulnerabilities and other issues. Connect your CI pipeline with Semgrep App to:

* Block pull or merge requests (PRs or MRs) based on the rule that generated the finding.
* Scan many repositories and manage their findings in bulk.
* Triage (ignore) false-positive findings from low-performing rules.
* Fork existing rules to create custom rules and add them to Semgrep App for scanning.

This guide explains how to connect your repository to Semgrep App to scan continuously. 

## Setting up the CI job and Semgrep App connection

The following video walks you through setting Semgrep in your CI through Semgrep App.
[TODO embed video]

Refer to the remaining sections for guidance specific to your CI provider.

### In-App Providers (such as GitHub Actions, GitLab CI/CD, BitBucket Pipelines)

This section applies to the following providers:
* GitHub Actions
* GitLab CI/CD
* Jenkins
* Bitbucket Pipelines
* CircleCI
* Buildkite

These providers are explicitly listed in Semgrep App, and Semgrep App is able to generate configuration files for you to commit into your CI provider.

To set up the CI job and connect with Semgrep App:

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


