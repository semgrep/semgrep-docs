---
slug: local-to-scp-scans
title: Upload local scan findings
hide_title: true
description: Send your local scans to Semgrep Cloud Platform to view and track your findings.
tags:
  - CLI
  - Semgrep Cloud Platform
---

# Scan local repositories and upload findings 

You can send findings (scan results) from a local repository to Semgrep Cloud Platform (SCP). The local repository is a separate **project** from its remote counterpart. This is useful for testing rules and policies, or simply scanning your own work before it is merged to your organization's trunk branch.

## Prerequisites

- Locally installed `semgrep`.

## Best practices

You can keep your local scans private and separate from your team by creating a Semgrep organization with only a single user. This is a **personal** org, similar to a personal account in your source code manager (SCM). This separation ensures that your findings data does not affect organizational records and trends.

To create an org, perform the steps in [Create additional orgs](/deployment/create-account-and-orgs/#create-additional-orgs). You don't need to perform any other steps.

## Send findings from local repository scan to SCP

1. Ensure that you are signed into Semgrep Cloud Platform and you've switched to the org you want to send findings to. It is recommended to send local repository findings to your **personal** org.
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

The project slug for a **remote repository** takes the form `account-name/repository-name`.

The project slug for a **local repository** takes the form `repository-name`.

Refer to the following image for an example of both remote and local Projects in a single personal account.

![Projects view with local and remote counterparts of the same repository.](/img/projects-remote-local-slugs.png)

* **For personal orgs:** A local repository scan does **not** overwrite the findings records of its remote counterpart. They are two separate projects. Personal accounts only have one team member or user: you.
* **For organization orgs**: A local repository scan does **not** overwrite findings records of its remote counterpart. However, if two members have both cloned the same local repository, such as `RepoA`, and both send local `RepoA` findings, one set of findings may overwrite other unintentionally. This is because orgs can have more than one team member, but all local scans are sent to the same project slug.

## Link local scans to their remote repositories 

When sending findings from local repositories to Semgrep Cloud Platform, the links shown on the **Findings** page are not generated. They may be missing, or they may not link to the correct file. This is because the scan was performed on your local repository, not remote.

You can optionally set up cross-linking between local and remote repositories to create the correct hyperlinks. To do so, set up environment variables through the CLI:

1. Navigate to the root of your repo.
2. Create the `SEMGREP_REPO_URL` variable, setting it to the URL you'd use to access your online repo:
    <pre><code>
    export SEMGREP_REPO_URL=<span className="placeholder">URL_ADDRESS</span>
    </code></pre>
3. Create the `SEMGREP_BRANCH` variable:
    1. Retrieve the branch name:
        ```console
        git rev-parse --abbrev-ref HEAD
        ```
    2. Set the variable as shown, making sure that you replace the <code><span className="placeholder">BRANCH_NAME</span></code> placeholder:
        <pre><code>
        export SEMGREP_BRANCH=<span className="placeholder">BRANCH_NAME</span>
        </code></pre>
4. Create the `SEMGREP_REPO_NAME` variable, setting it to the name of your repo:
    <pre><code>
    export SEMGREP_REPO_NAME=<span className="placeholder">REPO_NAME</span>
    </code></pre>
5. Create the `SEMGREP_COMMIT` variable:
    1. Retrieve the commit hash:
        ```console
        git log -n 1
        ```
    2. Set the variable by entering the text below, substituting <code><span className="placeholder">COMMIT_HASH</span></code> with the value from the previous step.
    <pre><code>
    export SEMGREP_COMMIT=<span className="placeholder">COMMIT_HASH</span>
    </code></pre>

After performing these steps, rescan your repository to correctly generate links in Semgrep Cloud Platform.

![Findings page snippet with hyperlinks](/img/findings-with-hyperlinks.png "Findings page snippet with hyperlinks")
**Figure.** Findings page with hyperlinks.

### Sample values

The following is an example of the variables you'd need to create, along with sample values:

```console
# Set the repository URL
export SEMGREP_REPO_URL=https://github.com/corporation/s_juiceshop

# Set the repository name
export SEMGREP_REPO_NAME=corporation/s_juiceshop

# Retrieve the branch 
git rev-parse --abbrev-ref HEAD
s_update

# Set the branch
export SEMGREP_BRANCH=s_update

# Retrieve the commit hash
git log -n 1
commit fa4e36b9369e5b039bh2220b5h9R61a38b077f29 (HEAD -> s_juiceshop, origin/main, origin/HEAD, master)

# Set the commit hash
export SEMGREP_COMMIT=fa4e36b9369e5b039bh2220b5h9R61a38b077f29
 ```
