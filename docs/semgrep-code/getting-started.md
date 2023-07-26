---
slug: getting-started
append_help_link: true
description: "Perform a SAST scan with Semgrep Code "
title: Semgrep Code
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

# Getting started with Semgrep Code

Secure your code quickly and continuously by scanning with Semgrep Code, a fast and lightweight SAST (Static Application Security Testing) engine that leverages Semgrep OSS.

<SemgrepScan />

Semgrep Code is transparent: you can fully configure what rules are run and inspect the Semgrep syntax to understand how the finding was detected. The content of a rule can be customized to improve the true positive rate of a rule or its message to fellow developers.

This document provides steps to get started with Semgrep Code for all tiers except where indicated.

## Semgrep Code with Semgrep Cloud Platform

Semgrep Code includes Semgrep Cloud Platform (SCP), a web application that helps security teams meet their goals, such as:

* Sorting, filtering, triaging, and remediating security issues.
* Enforcing coding standards through the creation of custom rules.
* Preventing insecure code from reaching production or staging servers by blocking pull or merge requests, based on how you configure your rules.
* Notifying security teams of findings (results) as well as communicating with other developers by leaving pull or merge request comments in GitHub, GitLab, or BitBucket.

:::tip Suggested workflows 
* You can use Semgrep Cloud Platform to scan remote repositories (GitHub, GitLab, or BitBucket) and consolidate the findings.
* You can also use Semgrep Cloud Platform to consolidate findings from a Semgrep CLI scan performed on a **local** machine.
* Semgrep Code can be integrated into your custom infrastructure without SCP. See [API](/semgrep-cloud-platform/semgrep-api) for details.
:::

### Scanning a repository

#### Signing in to Semgrep Cloud Platform

<PlatformSigninIntro />

<Tabs
    defaultValue="signin-github"
    values={[
    {label: 'Sign in with GitHub', value: 'signin-github'},
    {label: 'Sign in with GitLab', value: 'signin-gitlab'},
    ]}
>

<TabItem value='signin-github'>

<PlatformSigninGithub />

See [Permissions in GitHub](/semgrep-cloud-platform/getting-started/#requested-permissions-for-github-and-gitlab) to learn more about how Semgrep features use requested permissions in GitHub.

</TabItem>

<TabItem value='signin-gitlab'>

<PlatformSigninGitlab />

See [Permissions in GitLab](/semgrep-cloud-platform/getting-started/#requested-permissions-for-github-and-gitlab) to learn more about how Semgrep features use requested permissions in GitLab.

</TabItem>

</Tabs>

:::tip
To use Semgrep with your team, [create an organization account](/semgrep-cloud-platform/user-management/). An organization account enables users to share rules and perform triage or remediation as a team.
:::

## Performing a scan

Scanning is Semgrep's primary operation. When you first sign into Semgrep Cloud Platform, it uses a default SAST ruleset selected to enforce best practices for a repository's framework and programming language. You can customize future scans to address your organization's specific practices.

Semgrep Cloud Platform enables users to choose what findings prevent a pull or merge request (PR or MR) from merging into the repository. Setting these blocking and non-blocking rules is achieved through the [Policies page](/semgrep-code/policies).

### Adding or onboarding a new project (repository)

A **project** is a repository from either:

* Your GitHub, GitLab, or BitBucket account that you add to Semgrep Cloud Platform for scanning.
* A local Git repository in your machine. Projects from your local machine are integrated through Semgrep CLI.

Semgrep Cloud Platform can run scans on many projects with rules set in the Policies page. First-time Semgrep Cloud Platform users scan projects with pre-selected rules chosen based on the repository's language and framework. To view these pre-selected rules, see the [Registry default ruleset](https://semgrep.dev/p/default).

Over time, users modify the Policies page with rules specific to their codebase's security or business goals.

:::tip Try Semgrep Zero-config Scanning (Beta)
Semgrep Zero-config Scanning enables you to quickly onboard or add many repositories without configuring a CI job. This feature is available for users of GitHub Free or Team tiers. Contact [sales@semgrep.com](mailto:sales@semgrep.com) to try it out.
:::

#### Option A: Scanning a local repository through Semgrep CLI

Scanning a project from the CLI is a standalone action. This means that you manually triggered the scan. Scans from CLI are not continuous nor scheduled, unlike scans run in a CI job.

:::info Prerequisites
- Semgrep CLI must be installed. See [Getting started with Semgrep OSS Engine](/getting-started).
- Ensure that you are running a recent version of Semgrep CLI. Semgrep Cloud Platform supports the 10 most recent minor versions of Semgrep CLI.
:::

To scan a local repository through Semgrep CLI, follow these steps:

1. Ensure you are signed in to Semgrep Cloud Platform.
2. Click **[Projects](https://semgrep.dev/orgs/-/projects)** on the left sidebar.
3. Click **Scan new project** > **Run a scan locally**.
4. Log in to Semgrep from the CLI:
    ``` 
    semgrep login
    ```
5. Follow the instructions in the CLI.
6. After logging in, run a scan by entering the following command. This command sends the findings to Semgrep Cloud Platform.
    ```
    semgrep ci
    ```
7. View your project's [findings](https://semgrep.dev/orgs/-/findings).

:::note
Scans from local repositories do not access their corresponding remote repositories. For this reason, links to specific lines of code in the Findings page are not created. See [Linking local scans to their remote repositories](#linking-local-scans-to-their-remote-repositories) for a workaround.
:::

##### Linking local scans to their remote repositories 

![Screenshot of findings page snippet with no hyperlinks](/img/findings-no-hyperlinks.png "Screenshot of findings page snippet with no hyperlinks")
*Figure 1.* Partial screenshot of findings page with no hyperlinks.

Local repository scans require additional configuration to **create hyperlinks to their corresponding remote repositories**. Set up environment variables within your command line to configure cross-linking between local and remote repositories within Semgrep Cloud Platform.

![Screenshot of sample environment variables on a Linux shell](/img/app-ci-setenvvar.png "Screenshot of sample environment variables on a Linux shell")
*Figure 2.* Sample environment variables set up on a Linux shell.

To set up environment variables:

1. Ensure that your current working directory is the root of the repository to create links for. 
2. Set up the `SEMGREP_REPO_URL`:
    1. Retrieve the URL by navigating to your online repository. Copy the value in the address bar. This is your `URL_ADDRESS`.
    2. Set the variable by entering the text below, substituting <code><span className="placeholder">URL_ADDRESS</span></code> with the value from the previous step.
    <pre><code>
    export SEMGREP_REPO_URL=<span className="placeholder">URL_ADDRESS</span>
    </code></pre>
3. Set up the `SEMGREP_BRANCH`:
    1. Run the following to retrieve the branch name:
        ```bash
        git rev-parse --abbrev-ref HEAD
        ```
    2. Set the variable by entering the text below, substituting <code><span className="placeholder">BRANCH_NAME</span></code> with the value from the previous step.
    <pre><code>
    export SEMGREP_BRANCH=<span className="placeholder">BRANCH_NAME</span>
    </code></pre>
4. Set up the `SEMGREP_REPO_NAME`:
    1. Retrieve the repository name by logging in to your GitHub or GitLab account and copying the repository name from your dashboard. 
    2. Set the variable by entering the text below, substituting <code><span className="placeholder">REPO_NAME</span></code> with the value from the previous step.
    <pre><code>
    export SEMGREP_REPO_NAME=<span className="placeholder">REPO_NAME</span>
    </code></pre>
5. Set up the `SEMGREP_COMMIT`:
    1. Run the following to retrieve the commit hash:
        ```bash
        git log -n 1
        ```
    2. Set the variable by entering the text below, substituting <code><span className="placeholder">COMMIT_HASH</span></code> with the value from the previous step.
    <pre><code>
    export SEMGREP_COMMIT=<span className="placeholder">COMMIT_HASH</span>
    </code></pre>

Sample values:

```
# Set the repository URL
$> export SEMGREP_REPO_URL=https://github.com/corporation/s_juiceshop

# Set the repository name
$> export SEMGREP_REPO_NAME=corporation/s_juiceshop

# Retrieve the branch 
$> git rev-parse --abbrev-ref HEAD
s_update
# Set the branch
$> export SEMGREP_BRANCH=s_update

# Retrieve the commit hash
$> git log -n 1
commit fa4e36b9369e5b039bh2220b5h9R61a38b077f29 (HEAD -> s_juiceshop, origin/master, origin/HEAD, master)
# Set the commit hash
$> export SEMGREP_COMMIT=fa4e36b9369e5b039bh2220b5h9R61a38b077f29
 ```

![Screenshot of findings page snippet with hyperlinks](/img/findings-with-hyperlinks.png "Screenshot of findings page snippet with hyperlinks")

*Figure 3.* Partial screenshot of findings page with hyperlinks.

#### Option B: Adding a repository from GitHub, GitLab, or BitBucket

<PlatformAddRepo />

:::tip Optional workflow
Start using Semgrep Cloud Platform by scanning a demo project that requires only 3 seconds to configure. See [Learning Semgrep Cloud Platform with a demo project](/semgrep-code/demo-project/).
:::

##### Detecting GitHub repositories

To ensure that your GitHub repository is **detected** by Semgrep Cloud Platform:

1. Log into GitHub.
2. Click your **profile photo > Settings > Applications**.
3. On the `semgrep-app` entry, click **Configure**.
4. Under Repository access select an option to provide access:
    1. All repositories will display all current and future public and private repositories.
    2. Only select repositories will display explicitly selected repositories.

### Running a scan

By default, Semgrep scans are defined during a project's initial setup in Semgrep Cloud Platform. Semgrep scans are triggered by the following parameters:

* Daily or weekly schedule.
* After every PR or MR.
* Update to the `semgrep.yml` file (dependent on your CI provider).

To change these scan parameters:

* Manually edit the `semgrep.yml` file.
* Remove the project and redo the steps described in [Scanning a new project](#scanning-a-new-project) section.

Set up additional scan parameters in your organization's [Settings](https://semgrep.dev/orgs/-/settings) page.

You can also configure additional configuration options for a specific project. To configure project specific settings, follow these steps:

1. Click **[Projects](https://semgrep.dev/orgs/-/projects)** on the left sidebar.
2. Select the name of the project to modify, and then click the respective <i class="fa-solid fa-gear"></i> **gear** icon in the Settings column.
3. Make changes as necessary.

<dl>
    <dt>Path ignores</dt>
    <dd>Specify which directories or files you want to exclude from Semgrep scans. See <a href="/ignoring-files-folders-code/#defining-ignored-files-and-folders-in-semgrep-cloud-platform">Defining ignored files and folders in Semgrep Cloud Platform</a> for specific details.</dd>
    <dt>Tags</dt>
	<dd>Add or remove tags to specific projects. See <a href="/docs/semgrep-cloud-platform/tags/">Tagging projects</a> for more information.</dd>
</dl>

### Adding rules and rulesets to scan with

Semgrep Cloud Platform's Policies displays all rules and rulesets that are used to scan repositories. These rules are scanned based on the repository's programming language and framework as well as additional Semgrep parameters, such as ignored files.

For example, given five repositories each with different programming languages, Semgrep only scans using rules and rulesets for that repository's language that are in the Policies page.

Semgrep's speed is not affected by having multiple rules for different languages in the Policies page.

You may select rules and rulesets from your own rules, your organization's rules, or rules from the Registry.

![Policies page](/img/policies.png "Policies page")

The Policies page uses three **rule modes** to determine what action to undertake when a finding is generated by a rule:

<dl>
    <dt>Monitor</dt>
    <dd>Rules set to Monitor mode show findings only on Semgrep Cloud Platform, without notifying developers.</dd>
    <dt>Comment</dt>
    <dd>Rules set to Comment mode show findings to developers through PR or MR comments.</dd>
    <dt>Block</dt>
    <dd>Rules set to Block mode prevent merges and commits, in addition to showing findings in Semgrep Cloud Platform and PRs or MRs.</dd>
</dl>    

To add rules and rulesets to your Policies:

1. Click **Policies** on the left sidebar.
2. Click **Add Rules**. You are taken to Semgrep Registry.
3. Enter a search term in the Registry search bar or browse to find rulepacks and rules.
4. When you have found a rule to add, click on the rule's card.
5. Click **Add to Policy**.
6. Select what rule mode to set the rule to.

For more information on operations such as filtering and deleting as well as Policy management, see [Policies](/semgrep-code/policies/).

## Viewing and managing findings

### Viewing findings of a scan

![Screenshot of Dashboard](/img/dashboard-view.png "Screenshot of Dashboard")

Both the Dashboard and the Findings page display the results of a scan. These pages are accessible from the left sidebar in Semgrep Cloud Platform. The **[Dashboard](/semgrep-cloud-platform/dashboard/)** is a report view to assist in evaluating security posture across repositories. It organizes findings into OWASP categories, enabling users to assess habits and trends within their team or organization.

The **[Findings](/semgrep-code/findings/#managing-finding-status-bulk-triage)** page enables you to triage findings. Triaging refers to prioritizing a finding based on criteria set by your team or organization. While severity is a factor in triage, your organization may define additional criteria based on coding standards, business, or product goals.

To see the rule specifics that triggered the finding, click on the rule entry.

### Automatically resolving findings

![Screenshot of autofix in GitHub](/img/notifications-github-suggestions.png "Screenshot of autofix in GitHub")

Include code suggestions that resolve findings in both GitHub and GitLab through Semgrep Cloud Platform's autofix feature. This improves the fix rate of findings by reducing the steps needed to resolve a finding. See the section above on Running a scan to enable autofix.

<EnableAutofix />

## Semgrep Code and Semgrep OSS Engine

The following table shows differences between Semgrep Code and Semgrep OSS Engine:

| Feature                | Description | Semgrep OSS Engine | Semgrep Code |
| -------                | ---   | -----------------  | ------------ |
| Semgrep CLI            | Run local scans. | ✔️  | ✔️  |
| Semgrep CI             | Run scans on remote repositories. | ✔️  | ✔️  | 
| Custom rules           | Write your own rules tailored to your organization's needs. | ✔️  | ✔️  |
| Community rules        | Make use of community-contributed rules. | ✔️  | ✔️  |
| Semgrep Cloud Platform | Manage findings, rules, and alerts in a centralized location. | ❌ | ✔️  |
| Semgrep Pro Engine     | Run Semgrep with cross-function (interprocedural) and cross-file (interfile) analysis. | ❌ | ✔️ * |
| Semgrep Pro rules      | Rules leveraging Semgrep Pro Engine to detect hardcoded secrets, XXE injections, deserialization issues, and more. | ❌ | ✔️ * |
| Findings retention     | Keep track of when a finding is created and resolved. | ❌ | ✔️  |
| Alerts & notifications | Receive alerts to catch issues before they reach live servers. | ❌ | ✔️  |
| Findings management    | Filter and sort findings in bulk. | ❌ | ✔️  |
| API and webhooks       | Query and receive scan data for your custom infrastructure. |❌ | ✔️  |
_*These features require a Team-tier license or above*._

## Going further with Semgrep Cloud Platform

Semgrep Cloud Platform supports various phases of the development cycle through the following features:

* Alerts and notifications keep teams informed without having to leave their working environments, such as Slack or email.
* Forking Registry rules to easily write custom rules, enabling teams to enforce their own standards.
* User management and collaboration features for security teams to work as a team in for rule-writing, triage, and remediation.

### Tracking findings and receiving notifications

Receive notifications of new findings through email and Slack after every scan. Additionally, Enterprise or Team tier users are able to set up notifications through webhooks. See [Alerts and notifications](/semgrep-code/notifications/) documentation for more information.

### Writing your own rules

Semgrep's pattern-matching behavior resembles a linter, but its data flow engine extends Semgrep's capabilities as a static application security testing (SAST) tool.

Semgrep provides the following environments to learn, experiment, and write Semgrep rules:

<dl>
    <dt><a href="https://semgrep.dev/learn">Tutorial</a></dt>
	<dd>Learn Semgrep's pattern matching syntax, rule composition, and advanced features.</dd>
    <dt><a href="https://semgrep.dev/playground">Playground</a></dt>
    <dd>Learn the nuances of Semgrep operators by creating your own rules and run Semgrep on your own test cases.</dd>
    <dt><a href= "https://semgrep.dev/login?return_path=/orgs/-/editor">Editor</a></dt>
    <dd>Fork existing security rules to customize them for your own organization or team's use in this advanced editor. Refer to <a href="/semgrep-code/editor/#jumpstart-rule-writing-using-existing-rules">Writing rules using Semgrep Editor</a>.</dd>
</dl>

### User management

You can onboard (add) your entire organization's users and repositories by creating an organization account. Additionally, Semgrep Cloud Platform provides role-based access control (RBAC) for Team or Enterprise tiers. See [User management, accounts, and roles](/semgrep-cloud-platform/user-management) to learn more.

### Getting support

Refer to [Troubleshooting Semgrep Cloud Platform](/docs/troubleshooting/semgrep-app/) for common installation issues. Help is also available for all users through the [Semgrep Community Slack](https://go.semgrep.dev/slack).

<MoreHelp />
