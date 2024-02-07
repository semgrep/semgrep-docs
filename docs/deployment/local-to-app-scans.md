---
slug: local-to-app-scans
title: Local to app scans
hide_title: true
description: tk
tags:
  - tk
---

# Scan local repositories and upload findings 

You can send scan results from a local repository to Semgrep Cloud Platform. The local repository is a separate **Project** from its remote counterpart.

:::caution
For team members of an organization, it is **not** recommended to send local repository scan results to the organization account. When logging in to Semgrep from the CLI through `semgrep login`, ensure that you are signed in SCP as your **personal account**. See [Project separation between local and remote repositories](#project-separation-between-local-and-remote-repositories).
:::

To send findings from a local repository, perform the following steps:

1. Ensure that you are signed into Semgrep Cloud Platform in the account you want to send findings to. It is recommended to send local repository findings to your **personal** account.
2. Log in to Semgrep:
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

* **For personal accounts:** A local repository scan does not overwrite the findings records of its remote counterpart. They are two separate Projects. Personal accounts only have one team member or user: you.
* **For organization accounts**: A local repository scan does **not** overwrite findings records of its remote counterpart. For locally scanned Projects or repositories, if two members both send local repository findings, one set of findings may overwrite other unintentionally. This is because org accounts can have more than one team member, but all local scans are sent to the same Project slug.
