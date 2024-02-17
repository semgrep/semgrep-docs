---
slug: local-to-scp-scans
title: Upload local scan findings
hide_title: true
description: Send your local scans to Semgrep Cloud Platform to view and track your findings.
tags:
  - tk
---

# Scan local repositories and upload findings 

You can send findings (scan results) from a local repository to Semgrep Cloud Platform. The local repository is a separate **project** from its remote counterpart. This is useful for testing rules and policies, or simply scanning your own work before it is merged to your organization's trunk branch.

## Prerequisites

- Locally installed `semgrep`.


## Best practices

You can keep your local scans private and separate from your team by creating a Semgrep organization with only a single user. This is a **personal** org, similar to a personal account in your source code manager. This separation ensures that your findings data does not affect organizational records and trends.

To create an org, perform the steps in [Create additional orgs](/deployment/create-account-and-orgs/#create-additional-orgs). You don't need to perform any other steps.

## Send findings from local repository scan to SCP`

1. Ensure that you are signed into Semgrep Cloud Platform in the org you want to send findings to. It is recommended to send local repository findings to your **personal** org.
2. In your CLI, log in to Semgrep:
```
semgrep login
```
2. Click the login URL provided, or copy and paste it into your browser's address bar. Your are taken to your web browser to complete the login process.
3. Follow any additional steps.
4. After logging in, start a scan in your CLI:
```
semgrep ci
```

## Project separation between local and remote repositories

The Project slug for a **remote repository** takes the form `account-name/repository-name`.

The Project slug for a **local repository** takes the form `repository-name`.

Refer to the following image for an example of both remote and local Projects in a single personal account.

![Projects view with local and remote counterparts of the same repository.](/img/projects-remote-local-slugs.png)

* **For personal orgs:** A local repository scan does not overwrite the findings records of its remote counterpart. They are two separate projects. Personal accounts only have one team member or user: you.
* **For organization orgs**: A local repository scan does **not** overwrite findings records of its remote counterpart. For locally scanned projects or repositories, if two members both send local repository findings, one set of findings may overwrite other unintentionally. This is because orgs can have more than one team member, but all local scans are sent to the same project slug.
