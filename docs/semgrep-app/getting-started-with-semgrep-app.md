---
slug: getting-started-with-semgrep-app
append_help_link: true
title: Getting started with Semgrep App
description: "Get started with Semgrep App to scan for security vulnerabilities on cloud repositories hosted on GitHub and GitLab."
---

# Scanning cloud repositories with Semgrep App

Semgrep App enables you to run scans on multiple repositories by integrating with your GitHub or GitLab SaaS account. Scans are powered by **rules**. A Semgrep rule encapsulates pattern-matching logic and data-flow analysis used to find code violations, security issues, outdated libraries, and other issues.


![Diagram of Semgrep App flow](../img/semgrep-app-diagram.png "Diagram of Semgrep App flow")


Many rules are available from [Semgrep Registry](https://semgrep.dev/r), an open-source, community-driven repository of rules. Write your own rules to create general security checks through the Registry while customizing Semgrep to work for your team's specific secret-keeping and API practices.

After performing a scan, use Semgrep App's Rule Board feature to prevent pull requests (PRs) or merge requests (MRs) from merging until findings are resolved. This helps prevent vulnerable code from shipping to widely-accessible environments, such as production or staging servers.

Semgrep App enables you to scan whole repositories on a cloud. You can try Semgrep CLI for local scans as well. For more information, see [Getting started with Semgrep CLI](https://semgrep.dev/docs/getting-started/).


## Signing into Semgrep App

Signing into Semgrep App requires either a GitHub or GitLab account. Semgrep App also supports Single Sign-On (SSO) on Team or Enterprise tiers. This guide focuses on GitHub and GitLab sign-ins. See [SSO Configuration](https://semgrep.dev/docs/semgrep-app/sso/) for information on single sign-on.

**Prerequisites:**

* A GitHub or GitLab SaaS account.
* At least one repository associated with the account.


### Signing in with GitHub

To sign into Semgrep with a GitHub account:

1. Click the following link: [Sign into Semgrep](https://semgrep.dev/login?return_path=/manage/projects).
2. Select **Sign in with GitHub**. You are redirected to the GitHub sign in page if you are not currently signed in.
3. Sign in with your credentials.
4. Click **Authorize semgrep-app**. See the GitHub documentation about [Authorizing GitHub Apps](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/authorizing-github-apps) to understand the scope of permissions requested by Semgrep.
5. You are redirected back to Semgrep App.
6. Click **Accept** to accept Semgrep's Terms of Service.
7. Optional: Fill out the survey and click Complete or click Skip to omit this step.

You are now signed in to Semgrep App.


#### Permissions for GitHub

This section explains why Semgrep App requires specific permissions. Semgrep App requires the following permissions in order to log in through GitHub:

<dl>
    <dt>Verify your GitHub identity</dt>
    <dd>Enables Semgrep App to read your GitHub profile data, such as your username.</dd>
    <dt>Know which resources you can access</dt>
    <dd>Enables Semgrep App to access and display private repositories you can scan.</dd>
    <dt>Act on your behalf</dt>
    <dd>Enables Semgrep App to start or stop scans on the repository and commit files for continuous integration.</dd>
</dl>

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

### Signing in with GitLab

1. Click the following link: [Sign into Semgrep](https://semgrep.dev/login?return_path=/manage/projects).
2. Select **Sign in with GitLab**. You are redirected to the GitLab sign in page if you are not currently signed in.
3. Sign in with your credentials.
4. Click **Authorize**. See the GitLab documentation about [Authorized applications](https://docs.gitlab.com/ee/integration/oauth_provider.html#authorized-applications) to understand the scope of permissions requested by Semgrep.
5. You are redirected back to Semgrep App.
6. Click **Accept** to accept Semgrep's Terms of Service.
7. Optional: Fill out the survey and click Complete or click Skip to omit this step.

You are now signed in to Semgrep App.


#### Permissions for GitLab

Semgrep requires the following permissions (scopes) in order to function:


<dl>
    <dt>`api`</dt>
    <dd>Legacy usage enables Semgrep App to retrieve repositories from GitLab.</dd>
    <dt>`openid`, `email`, and `profile`</dt>
    <dd>Enables authentication of a session through OpenID.</dd>
</dl>

## Performing a scan

Scanning is Semgrep's primary operation. Scan results (findings) depend on rules. Scanning is powered by rules. At first scan, Semgrep App uses a default ruleset selected to enforce best practices for a repository's framework and programming language. Future scans may be further tuned to an organization's specific practices.

Semgrep App enables users to choose what findings prevent a pull or merge request (PR or MR) from merging into the repository. Setting these blocking and non-blocking rules is achieved through the Rule Board.


### Adding a project

A **project** is a repository from your GitHub or GitLab account that you add to Semgrep App for scanning. Semgrep App can run scans on many projects with rules set in the Rule Board. When you add a project, Semgrep scans it for the first time with pre-selected rules chosen based on the repository's language and framework.


To add a project:

1. Ensure you are signed in to Semgrep App.
2. Click **Projects** on the left sidebar.
3. Optional: If you do not see the repository you want to add in the **Projects **page of Semgrep app, follow the steps in the succeeding sections to ensure that Semgrep App can detect the repository.{{
4. Click **Setup New Project**, and then select which repository provider Semgrep to integrate with.
5. For **GitHub Actions**:
    1. Click **Add CI Job **next to the name of the project to add.
    2. Optional: If you do not see the repository you want to add, follow the succeeding guide on **detecting GitHub repositories**.
    3. Click **Commit file**. This commits a `semgrep.yml` file containing pertinent scan parameters, such as schedule, what branch to scan on, and so on.
    4. Semgrep App generates a token composed of a **Secret name** and **Secret value**. Copy and paste these into your repository's settings. Links are provided by Semgrep App.
    5. Click **The secret's there, continue**.
    6. Semgrep App creates a file for the CI job. Select toggles for desired features, such as scanning on a schedule.
6. For **GitLab CI/CD**:
    1. Create a Semgrep App token by clicking **Settings > Tokens > Create new token**, then return to the project setup by clicking on the back arrow on your browser.
    2. Add the Semgrep App token as a secret [CI/CD variable](https://docs.gitlab.com/ee/ci/variables/#custom-cicd-variables) named `SEMGREP_APP_TOKEN`.
    3. Select toggles to determine scan behavior.
    4. Copy the snippet provided to your `.gitlab-ci.yml` file and commit it.
7. For **CircleCI**:
    1. Create a Semgrep App token by clicking **Settings > Tokens > Create new token**, then return to the project setup by clicking on the back arrow on your browser.
    2. Add the Semgrep App token as a project [environment variable](https://circleci.com/docs/2.0/env-vars/) named `SEMGREP_APP_TOKEN`.
    3. Copy the snippet provided and commit the `circleci/config.yml` file.
8. If successful, Semgrep App scans the repository for the first time using default, pre-selected rules.

To ensure that your GitHub repository is **detected** by Semgrep App:

1. Log into GitHub.
2. Click your **profile photo > Settings > Applications**.
3. On the `semgrep-app` entry, click **Configure**.
4. Under Repository access select an option to provide access:
    1. All repositories will display all current and future public and private repositories.
    2. Only select repositories will display explicitly selected repositories.


### Running a scan

By default, scans are triggered through the following parameters, which are defined during a project's initial setup in Semgrep App:


* Either a daily or weekly schedule.
* Upon every PR or MR.
* Upon every update to the `semgrep.yml` file.

To change these scan parameters, either:

* Edit `semgrep.yml` file manually.
* Remove the project and redo the steps described in Adding a project section.

Additional scan parameters include:

**Rule recommendation**
    Select this toggle to receive rule recommendations in the Rule Board based on the framework and language of the repository.

**Autofix**
    Select this toggle to enable autofix, which creates suggestions in addition to PR or MR comments. For example, a rule may suggest using a function such as `logging.debug()` instead of `print()`.

**Path ignores**
	Paths and files specified here are not scanned by Semgrep App.

To see additional scan parameters:

1. Click **Projects **on the left sidebar.
2. Select the name of the project to modify.
3. Make edits as necessary.


### Adding rules and rulesets to scan with

Semgrep App's Rule Board displays all rules and rulesets that are used to scan repositories. These rules are scanned based on the repository's programming language and framework as well as additional Semgrep parameters, such as ignored files.

For example, given five repositories each with different programming languages, the Rule Board will only scan using rules and rulesets for that repository's language that are in the Rule Board.

Semgrep's speed is not affected by having multiple rules for different languages in the Rule Board.

You may select rules and rulesets from your own rules, your organization's rules, or rules from the Registry.



![alt_text](../img/rule-board.png "image_tooltip")


The Rule Board is composed of three columns:


<dl>
    <dt>Audit</dt>
    <dd>Rules here show findings only on Semgrep App.</dd>
    <dt>PR/MR Comments</dt>
    <dd>Rules here show findings to developers through PRs or MRs.</dd>
    <dt>Block</dt>
    <dd>Rules here show block merges and commits, in addition to showing findings in Semgrep App and PRs or MRs.</dd>
</dl>    

To add rules and rulesets into your Rule Board:

1. Click **Rule Board** on the left sidebar.
2. Click Add Rules. A right-side drawer appears.
3. Type in a search term relevant to your codebase's framework or programming language.
4. Drag a card from the search results to the appropriate column.
5. Select **Save changes**.

For more information on operations such as filtering and deleting as well as Rule board management, see [Rule board](https://semgrep.dev/docs/semgrep-app/rule-board/).


## Viewing and managing findings


### Viewing findings of a scan


![alt_text](../img/dashboard-view.png "image_tooltip")


Both the Dashboard and the Findings page display the results of a scan. These pages are accessible from the left sidebar in Semgrep App. The **[Dashboard](https://semgrep.dev/docs/semgrep-app/dashboard/)** is a report view to assist in evaluating security posture across repositories. It organizes findings into OWASP categories, enabling users to assess habits and trends within their team or organization.

The **[Findings](https://semgrep.dev/docs/semgrep-app/findings/#managing-triage-states-bulk-triage)** page is used to triage findings. Triaging refers to prioritizing a finding based on criteria set by your team or organization. While severity is a factor in triage, your organization may define additional criteria based on coding standards, business, or product goals.

To see rule specifics that triggered the finding, click on the rule entry.


### Automatically resolving findings




![alt_text](../img/notifications-github-suggestions.png "image_tooltip")


Include code suggestions that resolve findings in both GitHub and GitLab through Semgrep App's autofix feature. This improves the fix rate of findings by reducing the steps needed to resolve a finding. See the section above on Running a scan to enable autofix.


## Going further with Semgrep App

Semgrep app supports various phases of the development cycle through the following features:

* Integrations keep teams informed without having to leave their working environment, such as Slack or email.
* Forking Registry rules to easily write custom rules, enabling teams to enforce their own standards.
* Developer feedback enables teams to collaborate and improve on scan quality.

### Tracking findings and receiving notifications

Receive notifications of new findings through email and Slack after every scan. Additionally, Enterprise or Team tier users are able to set up notifications through webhooks and can track findings on Jira. See [Integrations](https://semgrep.dev/docs/semgrep-app/integrations/) documentation for more information.


### Writing your own rules

Semgrep's pattern-matching behavior resembles a linter, but its data flow engine extends Semgrep's capabilities as a static application security testing (SAST) tool.

Semgrep provides the following environments to learn, experiment, and write Semgrep rules:

<dl>
    <dt><a href="https://semgrep.dev/learn">Tutorial</a></dt>
	<dd>Learn Semgrep's pattern matching syntax, rule composition, and advanced features.</dd>
    <dt><a href="https://semgrep.dev/playground">Playground</a></dt>
    <dd>Learn the nuances of Semgrep operators by creating your own rules and run Semgrep on your own test cases.</dd>
    <dt><a href= "https://semgrep.dev/login?return_path=/orgs/-/editor">Editor</a></dt>
    <dd>Fork existing security rules to customize them for your own organization or team's use in this advanced editor. Refer to <a href="https://semgrep.dev/docs/semgrep-app/editor/#jumpstart-rule-writing-using-existing-rules">Writing rules using Semgrep Editor</a>.</dd>
</dl>

### Receiving feedback about a rule

[Developer feedback](https://semgrep.dev/docs/semgrep-app/dashboard/#rule-performance-through-developer-feedbackhttps://semgrep.dev/docs/semgrep-app/dashboard/#rule-performance-through-developer-feedback) is a Team/Enterprise tier feature in which developers are able to submit feedback about a rule or finding. This is used to evaluate a rule's performance:

* Is the rule's message clear?
* Does the rule have too many false positives?
* Should the rule be ignored for a certain file or block of code?
* Are there additional improvements to the rule, such as possible autofix values?


### Getting support

Refer to [Troubleshooting Semgrep App](https://semgrep.dev/docs/troubleshooting/semgrep-app/) for common installation issues. Help is also available for all users through the[ r2c Community Slack](https://r2c.dev/slack).
