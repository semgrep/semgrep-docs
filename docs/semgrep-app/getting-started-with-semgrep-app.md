---
slug: getting-started-with-semgrep-app
append_help_link: true
title: Semgrep Cloud Platform
hide_title: true
description: "Get started with Semgrep App to scan for security vulnerabilities on both local and remote repositories hosted on GitHub and GitLab."
tags:
    - Semgrep App
    - Community Tier
    - Team & Enterprise Tier
---

import MoreHelp from "/src/components/MoreHelp"
import EnableAutofix from "/src/components/procedure/_enable-autofix.mdx"
import PlatformSigninIntro from "/src/components/concept/_platform-signin-intro.md"
import PlatformSigninGithub from "/src/components/procedure/_platform-signin-github.md"
import PlatformSigninGitlab from "/src/components/procedure/_platform-signin-gitlab.md"
import PlatformAddRepo from "/src/components/procedure/_platform-add-repo.md"

<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>

# Getting started with Semgrep App

Semgrep App enables you to run scans on multiple repositories by integrating with your GitHub or GitLab SaaS account. Semgrep uses **rules** to scan code. Matches found based on those rules are called **findings**. A Semgrep rule encapsulates pattern-matching logic and data-flow analysis used to find vulnerabilities such as code violations, security issues, or outdated libraries.

:::info
Many improvements to the Semgrep App experience only work with up-to-date Semgrep CLI versions. For this reason, Semgrep App only supports the 10 most recent minor versions of the Semgrep open-source tool. For example, if the latest release was 0.114.0, all versions greater than 0.104.0 are supported while earlier versions, such as 0.103.0 can be deprecated or can result in failures.

For Docker users: Use the [**latest** tag](https://hub.docker.com/r/returntocorp/semgrep/tags?page=1&name=latest) to ensure you are up-to-date.
:::

Semgrep App supports code scanning from:

* Local command-line interfaces (CLI).
* Source code management (SCM) systems, such as GitHub and GitLab, through continuous integration (CI).

This guide walks you through scanning code in both types of environments.

![Diagram of Semgrep App flow](/img/semgrep-app-diagram.png "Diagram of Semgrep App flow")

Many rules are available from [Semgrep Registry](https://semgrep.dev/explore), an open-source, community-driven repository of rules. You can also write your own rules to customize Semgrep for your team's specific practices, or publish rules for the community.

With Semgrep App's Rule Board you can determine which rules Semgrep uses and what action Semgrep undertakes when it generates a finding. The Rule Board can block pull requests (PRs) or merge requests (MRs) from merging until findings are resolved. This behavior helps to prevent vulnerable code from shipping to widely-accessible environments, such as production or staging servers.

Semgrep App enables you to deploy, configure, and manage Semgrep in your continuous integration (CI) environment. Semgrep App supports the upload of findings from CLI scans as well. For more information, see [Getting started with Semgrep CLI](https://semgrep.dev/docs/getting-started/).

## Signing in to Semgrep App

<PlatformSigninIntro />

### Signing in with GitHub

<PlatformSigninGithub />

#### Permissions for GitHub

This section explains Semgrep App permissions that are requested in two different events:

* When you first sign in through GitHub.
* When you first add, integrate, or onboard your repositories to Semgrep App.

##### Permissions when signing in with GitHub

Semgrep App requests the following standard permissions set by GitHub when you first sign in. However, not all permissions are used by Semgrep App. Read the following list to see how Semgrep App uses permissions when signing in:

<dl>
    <dt>Verify your GitHub identity</dt>
    <dd>Enables Semgrep App to read your GitHub profile data, such as your username.</dd>
    <dt>Know which resources you can access</dt>
    <dd>Semgrep does not use or access any resources when first logging in. However, you can choose to share resources at a later point in order to add repositories into Semgrep App.</dd>
    <dt>Act on your behalf</dt>
    <dd>Enables Semgrep App to perform certain tasks <strong>only on resources that you choose to share with Semgrep App</strong>. Semgrep App never uses this permission and never performs any actions on your behalf, even after you have installed <code>semgrep-app</code>. See <a href ="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/authorizing-github-apps">When does a GitHub App act on your behalf?</a> in GitHub documentation.</dd>
</dl>

##### Permissions when adding your repositories into Semgrep App

The GitHub integration app is called [`semgrep-app`](https://github.com/apps/semgrep-app). This app is used to integrate Semgrep into user-selected GitHub repositories. It requires the following permissions:

<dl>
    <dt>Reading metadata of the repositories you select</dt>
    <dd>Enables Semgrep App to list repository names on the project setup page.</dd>
    <dt>Reading the list of organization members</dt>
    <dd>Enables Semgrep App to determine who can manage your Semgrep organization based on your GitHub organization's members list.</dd>
    <dt>Reading and writing pull requests</dt>
    <dd>Enables Semgrep App to comment about findings on pull requests.</dd>
    <dt>Reading and writing actions</dt>
    <dd>Enables Semgrep App to cancel stuck jobs, rerun jobs, pull logs from jobs, and perform on-demand scanning.</dd>
    <dt>Reading <a href="https://docs.github.com/en/rest/reference/checks">GitHub Checks</a></dt>
    <dd>Facilitates debugging of Semgrep App when configured out of <a href="https://docs.github.com/en/actions">GitHub Actions</a>.</dd>
    <dt>Reading and writing security events</dt>
    <dd>Enables integration with GitHub Advanced Security (for example, to show Semgrep results).</dd>
    <dt>Reading and writing secrets</dt>
    <dd>Enables automatically adding of the Semgrep App Token to your repository secrets when onboarding projects. Note: We cannot read the values of your existing or future secrets (only the names).</dd>
    <dt>Reading and writing 2 files</dt>
    <dd>Enables Semgrep App to configure itself to run in CI by writing to <code>.github/workflows/semgrep.yml</code> and <code>.semgrepignore</code> files.</dd>
    <dt>Reading and writing workflows</dt>
    <dd>Enables Semgrep App to configure itself to run in CI by writing to <code>.github/workflows/semgrep.yml</code>. GitHub allows writing to files within <code>.github/workflows/</code> directory only if this permission is granted along with "Writing a single file".</dd>
    <dt>Reading and writing pull requests</dt>
    <dd>Write permissions allow Semgrep App to leave pull request comments about findings. Read permissions allow Semgrep App to automatically remove findings when the pull request that introduced them is closed without merging.</dd>
</dl>

### Signing in with GitLab

<PlatformSigninGitlab />

#### Permissions for GitLab

Semgrep requires the following permissions (scopes) to enable the authentication of a session:

* `openid`
* `email`
* `profile`
* `API`

## Performing a scan

Scanning is Semgrep's primary operation. When you first sign into Semgrep App, it uses a default ruleset selected to enforce best practices for a repository's framework and programming language. Future scans may be further tuned to an organization's specific practices.

Semgrep App enables users to choose what findings prevent a pull or merge request (PR or MR) from merging into the repository. Setting these blocking and non-blocking rules is achieved through the Rule Board.

### Adding or onboarding a new project (repository)

A **project** is a repository from either:

* Your GitHub or GitLab account that you add to Semgrep App for scanning. Projects from GitHub or GitLab are integrated through Semgrep App.
* A local Git repository in your machine. Projects from your local machine are integrated through Semgrep CLI.

Semgrep App can run scans on many projects with rules set in the Rule Board. First-time Semgrep App users scan projects with pre-selected rules chosen based on the repository's language and framework. To view these pre-selected rules, see the [Registry default ruleset](https://semgrep.dev/p/default).

Over time, users modify the Rule Board with rules specific to their codebase's security or business goals.

:::info
Start using Semgrep App by scanning a demo project that requires only 3 seconds to configure. See [Learning Semgrep App with a demo project](/semgrep-app/demo-project/) start using your demo project.
:::

#### Option A: Scanning a local repository through Semgrep CLI

Scanning a project from the CLI is a standalone action. This means that you manually triggered the scan. Scans from CLI are not continuous nor scheduled, unlike scans run in a CI job.

:::info Prerequisites
- Semgrep CLI must be installed. See [Getting started with Semgrep CLI](../../getting-started).
- Ensure that you are running a recent version of Semgrep CLI. Semgrep-app supports the 10 most recent minor versions of Semgrep.
:::

To scan a local repository through Semgrep CLI, follow these steps:

1. Ensure you are signed in to Semgrep App.
2. Click **[Projects](https://semgrep.dev/orgs/-/projects)** on the left sidebar.
3. Click **Scan new project** > **Run a scan locally**.
4. Log in to Semgrep from the CLI:
    ``` 
    semgrep login
    ```
5. Follow the instructions in the CLI.
6. After logging in, run a scan by entering the following command. This command sends the findings to Semgrep App.
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

Local repository scans require additional configuration to **create hyperlinks to their corresponding remote repositories**. Set up environment variables within your command line to configure cross-linking between local and remote repositories within Semgrep App.

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

#### Option B: Adding a repository from GitHub or GitLab

<PlatformAddRepo />

##### Detecting GitHub repositories

To ensure that your GitHub repository is **detected** by Semgrep App:

1. Log into GitHub.
2. Click your **profile photo > Settings > Applications**.
3. On the `semgrep-app` entry, click **Configure**.
4. Under Repository access select an option to provide access:
    1. All repositories will display all current and future public and private repositories.
    2. Only select repositories will display explicitly selected repositories.

### Running a scan

By default, Semgrep scans are defined during a project's initial setup in Semgrep App. Semgrep scans are triggered by the following parameters:

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
    <dd>Specify which directories or files you want to exclude from Semgrep scans. See <a href="/ignoring-files-folders-code/#defining-ignored-files-and-folders-in-semgrep-app">Defining ignored files and folders in Semgrep App</a> for specific details.</dd>
    <dt>Tags</dt>
	<dd>Add or remove tags to specific projects. See <a href="/semgrep-app/tags/">Managing projects through tags</a> for more information.</dd>
</dl>

### Adding rules and rulesets to scan with

Semgrep App's Rule Board displays all rules and rulesets that are used to scan repositories. These rules are scanned based on the repository's programming language and framework as well as additional Semgrep parameters, such as ignored files.

For example, given five repositories each with different programming languages, the Rule Board only scans using rules and rulesets for that repository's language that are in the Rule Board.

Semgrep's speed is not affected by having multiple rules for different languages in the Rule Board.

You may select rules and rulesets from your own rules, your organization's rules, or rules from the Registry.

![Screenshot of Rule board](/img/rule-board.png "Screenshot of Rule board")

The Rule Board is composed of three columns:


<dl>
    <dt>Monitor</dt>
    <dd>Rules here show findings only on Semgrep App.</dd>
    <dt>Comment</dt>
    <dd>Rules here show findings to developers through PRs or MRs.</dd>
    <dt>Block</dt>
    <dd>Rules here show block merges and commits, in addition to showing findings in Semgrep App and PRs or MRs.</dd>
</dl>    

To add rules and rulesets to your Rule Board:

1. Click **Rule Board** on the left sidebar.
2. Click Add Rules. A right-side drawer appears.
3. Type in a search term relevant to your codebase's framework or programming language.
4. Drag a card from the search results to the appropriate column.
5. Select **Save changes**.

For more information on operations such as filtering and deleting as well as Rule board management, see [Rule board](../rule-board/).

## Viewing and managing findings

### Viewing findings of a scan

![Screenshot of Dashboard](/img/dashboard-view.png "Screenshot of Dashboard")

Both the Dashboard and the Findings page display the results of a scan. These pages are accessible from the left sidebar in Semgrep App. The **[Dashboard](../dashboard/)** is a report view to assist in evaluating security posture across repositories. It organizes findings into OWASP categories, enabling users to assess habits and trends within their team or organization.

The **[Findings](/semgrep-app/findings/#managing-finding-status-bulk-triage)** page enables you to triage findings. Triaging refers to prioritizing a finding based on criteria set by your team or organization. While severity is a factor in triage, your organization may define additional criteria based on coding standards, business, or product goals.

To see the rule specifics that triggered the finding, click on the rule entry.

### Automatically resolving findings

![Screenshot of autofix in GitHub](/img/notifications-github-suggestions.png "Screenshot of autofix in GitHub")

Include code suggestions that resolve findings in both GitHub and GitLab through Semgrep App's autofix feature. This improves the fix rate of findings by reducing the steps needed to resolve a finding. See the section above on Running a scan to enable autofix.

<EnableAutofix />

## Going further with Semgrep App

Semgrep app supports various phases of the development cycle through the following features:

* Integrations keep teams informed without having to leave their working environments, such as Slack or email.
* Forking Registry rules to easily write custom rules, enabling teams to enforce their own standards.
* Developer feedback enables teams to collaborate and improve on scan quality.

### Tracking findings and receiving notifications

Receive notifications of new findings through email and Slack after every scan. Additionally, Enterprise or Team tier users are able to set up notifications through webhooks and can track findings on Jira. See [Integrations](../integrations/) documentation for more information.

### Writing your own rules

Semgrep's pattern-matching behavior resembles a linter, but its data flow engine extends Semgrep's capabilities as a static application security testing (SAST) tool.

Semgrep provides the following environments to learn, experiment, and write Semgrep rules:

<dl>
    <dt><a href="https://semgrep.dev/learn">Tutorial</a></dt>
	<dd>Learn Semgrep's pattern matching syntax, rule composition, and advanced features.</dd>
    <dt><a href="https://semgrep.dev/playground">Playground</a></dt>
    <dd>Learn the nuances of Semgrep operators by creating your own rules and run Semgrep on your own test cases.</dd>
    <dt><a href= "https://semgrep.dev/login?return_path=/orgs/-/editor">Editor</a></dt>
    <dd>Fork existing security rules to customize them for your own organization or team's use in this advanced editor. Refer to <a href="../editor/#jumpstart-rule-writing-using-existing-rules">Writing rules using Semgrep Editor</a>.</dd>
</dl>

### Receiving feedback about a rule

[Developer feedback](../dashboard/#rule-performance-through-developer-feedback) is a Team/Enterprise tier feature in which developers can submit feedback about a rule or finding. This is used to evaluate a rule's performance:

* Is the rule's message clear?
* Does the rule have too many false positives?
* Should the rule be ignored for a certain file or block of code?
* Are there additional improvements to the rule, such as possible autofix values?

### Getting support

Refer to [Troubleshooting Semgrep App](/docs/troubleshooting/semgrep-app/) for common installation issues. Help is also available for all users through the [r2c Community Slack](https://r2c.dev/slack).

## Additional resources

### Semgrep App session details

- The time before you need to reauthenticate to Semgrep App is 7 days.
- Semgrep App session token is valid for 7 days.
- This session timeout is not configurable.
- Semgrep App is not using cookies but `localStorage` to store access tokens. The data in `localStorage` expire every 7 days. 

<MoreHelp />
