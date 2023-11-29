---
slug: getting-started
append_help_link: true
description: "Perform a SAST scan with Semgrep Code "
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

# Scan your codebase

Code is a static application security testing (SAST) tool that scans your project (which is the repo that contains the app you want inspected) for security vulnerabilities. You can scan your project by integrating Code into your CI/CD pipeline, or you can scan projects available locally on your machine.

## Use the Cloud Platform to automate continous scanning of your code

<PlatformAddRepo />

:::tip Scan a demo application
You can start using Semgrep by scanning a demo project that requires only minor
configuration. See [Learning Semgrep Cloud Platform with a demo project](/semgrep-code/demo-project/)
for details.
:::

### Detect GitHub repositories

<PlatformDetectGhRepos />

## Scan a project on your local machine

You can perform a one-time scan of your project locally using the Semgrep CI. To
do so:

1. Log in to the Cloud Platform.

2. Navigate to Projects > Scan new project.

3. Select **Locally**, and follow the instructions displayed on the **Run a scan
   locally** screen. For your convenience, we've reproduced that information
   here:

    ```console
    # log in to Semgrep
    semgrep login

    # run the scan
    semgrep ci
    ```

4. Once the scan is finished, return to Cloud Platform and click **View
   findings** to see your results. Alterantively, you can go directly to your
   [findings](https://semgrep.dev/orgs/-/findings) page.

### Link local scans to their remote repositories 

Because the results from from local repos aren't automatically linked to the
remote repos, the Cloud Platform doesn't create and show links to specific lines
of code on the **Findings** page. 

![Screenshot of findings page snippet with no hyperlinks](/img/findings-no-hyperlinks.png "Screenshot of findings page snippet
with no hyperlinks") *Figure 1.* Partial screenshot of findings page with no
hyperlinks.

To configure cross-linking between local and remote repositories, you must set up
environment variables via the CLI:

1. Navigate into the root of your repo.

2. Create the `SEMGREP_REPO_URL` variable, setting it to the URL you'd just to access your online repo:
    
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

When done, you'll see the links populate correctly in the Cloud Platform.

![Screenshot of findings page snippet with hyperlinks](/img/findings-with-hyperlinks.png "Screenshot of findings page snippet with hyperlinks")
*Figure 3.* Partial screenshot of findings page with hyperlinks.

#### Sample values

The following is an example of the variables you'd need to create, along with sample values:

![Screenshot of sample environment variables on a Linux shell](/img/app-ci-setenvvar.png "Screenshot of sample environment variables on
a Linux shell") *Figure 2.* Sample environment variables set up on a Linux
shell.

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
commit fa4e36b9369e5b039bh2220b5h9R61a38b077f29 (HEAD -> s_juiceshop, origin/master, origin/HEAD, master)

# Set the commit hash
export SEMGREP_COMMIT=fa4e36b9369e5b039bh2220b5h9R61a38b077f29
 ```

## View and manage findings

After your scan completes, you can view your findings in the Cloud Platform.

![Screenshot of Dashboard](/img/dashboard-view.png "Screenshot of Dashboard")

Both **Dashboard** and **Code** display the results of a scan.

**[Dashboard](/semgrep-cloud-platform/dashboard/)** is a high-level report
that assists you in evaluating your security posture across multiple repositories.

**[Code](/semgrep-code/findings/#managing-finding-status-bulk-triage)** displays
a full list of identified findings and provides you with the information you need
to prioritize findings based on criteria like severity level, coding standards, business rules, and product goals and triage them appropriately.

## Next steps


* Send [alerts and notifications](/semgrep-code/notifications/), create tickets in project management systems, or leverage the webhooks to receive information about your findings.
* Enable [autofix](/writing-rules/autofix) so that Semgrep can push code suggestions to GitHub or GitLab to help your developers resolve findings.
* Customize how Semgrep scans your code by [default rules set](https://semgrep.dev/p/default) or [writing your own rules](/semgrep-code/editor/#jumpstart-rule-writing-using-existing-rules).

<MoreHelp />
