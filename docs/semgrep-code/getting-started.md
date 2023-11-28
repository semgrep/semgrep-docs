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

A **project** in Semgrep Code is a repository that contains the app that you
want scanned. You can integrate Semgrep into your CI/CD pipeline, or you can
scan can scan projects available locally on your machine.

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

Enabling hyperlinks in the Cloud Platform requires additional configuration. To
configure cross-linking between local and remote repositories, you must set up
environment variables via the CLI.

![Screenshot of sample environment variables on a Linux shell](/img/app-ci-setenvvar.png "Screenshot of sample environment variables on
a Linux shell") *Figure 2.* Sample environment variables set up on a Linux
shell.

To set up environment variables:

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

#### Sample values

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
commit fa4e36b9369e5b039bh2220b5h9R61a38b077f29 (HEAD -> s_juiceshop, origin/master, origin/HEAD, master)

# Set the commit hash
export SEMGREP_COMMIT=fa4e36b9369e5b039bh2220b5h9R61a38b077f29
 ```

![Screenshot of findings page snippet with hyperlinks](/img/findings-with-hyperlinks.png "Screenshot of findings page snippet with hyperlinks")

*Figure 3.* Partial screenshot of findings page with hyperlinks.

## View and manage findings

After your scan completes, you can view your findings in the Cloud Platform.

![Screenshot of Dashboard](/img/dashboard-view.png "Screenshot of Dashboard")

Both the **Dashboard** and the **Code** page display the results of a scan.
The **[Dashboard](/semgrep-cloud-platform/dashboard/)** is a high-level report
that assists you in evaluating your security posture across repositories.

The **[Code](/semgrep-code/findings/#managing-finding-status-bulk-triage)**
page, which displays a full list of identified findings, provides you with the
information you need to triage findings. Triaging refers to the act of
prioritizing a finding based on criteria set by your team or organization. While
severity is one of the factors you consider, your organization may define
additional criteria based on coding standards, business rules, or product goals.

Click **details** to see additional information about the finding.

### Track findings and send notifications

Receive notifications of new findings through email or Slack after every scan, or set up notifications through webhooks. See [Alerts and notifications](/semgrep-code/notifications/) for more information.


### Resolve findings with Autofix

![Screenshot of autofix in GitHub](/img/notifications-github-suggestions.png "Screenshot of autofix in GitHub")

The Cloud Platform's autofix feature can push code suggestions to both GitHub and GitLab to help your developers resolve findings.

<EnableAutofix />

## Customize scans

You can customize the way Semgrep scans your code to better support your business and security goals.

### Modify rules

For your first scan, Semgrep chooses a [default rules set](https://semgrep.dev/p/default) appropriate based on your project's language and framework. However, you can modify the rules Semgrep uses when scanning your code in the Cloud Platform to support your business or security goals by going to **Rules** > **Policies**. 

Additionally, you can extend the functionality of Semgrep by writing your own rules. The following resources are designed to help you get started:

<dl>
    <dt><a href="https://semgrep.dev/learn">Tutorial</a></dt>
    <dd>Learn Semgrep's pattern matching syntax, rule composition, and advanced features.</dd>
    <dt><a href="https://semgrep.dev/playground">Playground</a></dt>
    <dd>Learn the nuances of Semgrep operators by creating your own rules and run Semgrep on your own test cases.</dd>
    <dt><a href= "https://semgrep.dev/login?return_path=/orgs/-/editor">Editor</a></dt>
    <dd>Fork existing security rules to customize them for your own organization or team's use in this advanced editor. Refer to <a href="/semgrep-code/editor/#jumpstart-rule-writing-using-existing-rules">Writing rules using Semgrep Editor</a>.</dd>
</dl>

### Modify scan parameters

Semgrep defines the parameters of a scan during the initial setup process using the Cloud Platform (e.g., when a scan is triggered). These parameters are stored in the `semgrep.yml` file. 

To modify the paramters of your scan, you can make the desired changes on your organization's [**Settings**](https://semgrep.dev/orgs/-/settings) page, or you can also manually edit the YAML file. If necessary, you can regenerate this file by removing and readding a project to the Cloud Platform. 

You can also configure additional options for specific projects. To configure project-specific settings:

1. In the Cloud Platform, go to **[Projects](https://semgrep.dev/orgs/-/projects)**.
2. Find the project you'd like to modify, then click its <i class="fa-solid fa-gear"></i> **gear** icon in the **Settings** column.
3. Modify your **Path ignores** and **Tags**:

    <dl>
        <dt>Path ignores</dt>
        <dd>The directories or files you want excluded from scans. See <a href="/ignoring-files-folders-code/#defining-ignored-files-and-folders-in-semgrep-cloud-platform">Defining ignored files and folders in Semgrep Cloud Platform</a> for more information.</dd>
        <dt>Tags</dt>
        <dd>The labels attached to projects that you can later use as a filter. See <a href="/docs/semgrep-cloud-platform/tags/">Tagging projects</a> for more information.</dd>
    </dl>

<MoreHelp />
