---
slug: getting-started
append_help_link: true
description: "Perform a SAST scan with Semgrep Code"
title: Scan your codebase
hide_title: true
tags:
    - Semgrep Code
    - Team & Enterprise Tier
---

<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import MoreHelp from "/src/components/MoreHelp"
import SemgrepScan from "/src/components/concept/_semgrep-scan.mdx"
import PlatformSigninIntro from "/src/components/concept/_platform-signin-intro.md"
import EnableAutofix from "/src/components/procedure/_enable-autofix.mdx"
import PlatformAddRepo from "/src/components/procedure/_platform-add-repo.md"
import PlatformSigninGithub from "/src/components/procedure/_platform-signin-github.md"
import PlatformSigninGitlab from "/src/components/procedure/_platform-signin-gitlab.md"
import PlatformDetectGhRepos from "/src/components/procedure/_platform-detect-ghrepos.md"
import Quickstart from "/src/components/procedure/_quickstart.md"

# Scan your codebase

Semgrep Code is a static application security testing (SAST) tool that scans your repository for security vulnerabilities. You can scan your repository by integrating Code into your CI/CD pipeline, or you can scan repositories available locally on your machine.

<Quickstart />

## Use the Semgrep Cloud Platform (SCP) to automate the continuous scanning of your code

<PlatformAddRepo />

### Detect GitHub repositories

<PlatformDetectGhRepos />

## Scan a repository on your local machine

You can perform a one-time scan of your repository locally using the Semgrep CI. To
do so:

1. Log in to Semgrep Cloud Platform.

2. Navigate to **Projects** > **Scan new project**.

3. Select **Locally**, and follow the instructions displayed on the **Run a scan
   locally** screen. For your convenience, we've reproduced that information
   here:

    ```console
    # log in to Semgrep
    semgrep login

    # run the scan
    semgrep ci
    ```

4. Once the scan completes, return to Semgrep Cloud Platform and click **View
   findings** to see your results. Alternatively, you can go directly to your
   [findings](https://semgrep.dev/orgs/-/findings) page.


## View and manage findings

After your scan completes, you can view your findings in Semgrep Cloud Platform.

![Screenshot of Dashboard](/img/dashboard-view.png "Screenshot of Dashboard")

Both **Dashboard** and **Code** display the results of a scan.

**[Dashboard](/semgrep-cloud-platform/dashboard/)** is a high-level report
that assists you in evaluating your security posture across multiple repositories.

**[Code](/semgrep-code/findings/#managing-finding-status-bulk-triage)** displays
a full list of identified findings and provides you with the information you need
to prioritize findings based on criteria like severity level, coding standards, business rules, and product goals and triage them appropriately.


<MoreHelp />
