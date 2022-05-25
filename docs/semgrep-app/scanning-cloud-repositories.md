---
slug: scanning-cloud-repositories 
append_help_link: true
title: Scanning cloud repositories with Semgrep App 
description: "Get started with Semgrep App to scan for security vulnerabilities on cloud repositories hosted on GitHub and GitLab."
---

import MoreHelp from "/src/components/MoreHelp"

# Scanning cloud repositories with Semgrep App


The GitHub integration app is called `semgrep-app`. It requires the following permissions:

<dl>
    <dt>Read and write permissions to <a href="https://docs.github.com/en/actions">GitHub Actions</a></dt>
    <dd>Allows Semgrep App to cancel stuck jobs, rerun jobs, pull logs from jobs, and perform on-demand scanning.</dd>
    <dt>Read permissions to <a href="https://docs.github.com/en/rest/reference/checks">GitHub Checks</a></dt>
    <dd>Facilitates debugging of Semgrep App when configured out of GitHub Actions.</dd>
    <dt>Read and write to GitHub Security Events</dt>
    <dd>Enables integration with the GitHub Advanced Security to show Semgrep results.</dd>
    <dt><code>.semgrepignore</code> single-file access</dt>
    <dd>Allows debugging of requests and automatic syncing of <code>.semgrepignore</code> between the Semgrep App UI and what is checked into the repository.</dd>
    <dt>Read/write GitHub secrets</dt>
    <dd>Enables automatically adding of the Semgrep App Token to your repository secrets when onboarding projects. This simplifies bulk onboarding of repositories. <strong>Semgrep App cannot read the values of your existing or future secrets due to the security design of GitHub Secrets.</strong> This permission only permits Semgrep App to know the secret name and programmatically adds the Semgrep token to your repository secrets.</dd>
</dl>
