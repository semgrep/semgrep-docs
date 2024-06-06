---
slug: core-deployment
append_help_link: true
title: Core deployment
description: Learn how to set up a comprehensive Semgrep deployment for yourself or your organization.
tags:
  - Deployment
  - Semgrep AppSec Platform
---

Semgrep can be set up to scan repositories of any size.

**Deployment** refers to the process of integrating Semgrep into your developer and infrastructure workflows. Completing the deployment process provides you with the Semgrep features that meet your security program's needs.

Deployment includes:

- Running Semgrep scanners as part of your CI. These scans can be any combination of SAST (Static Application Security Testing), SCA (Software Composition Analysis), or Secrets, depending on your plan.
- Managing team members' access and authentication.
- Ensuring that Semgrep has sufficient access to your self-hosted source code manager (SCM), such as GitLab Self-Managed.

Semgrep does not require code access to complete the core deployment process. Your code is not sent anywhere.

:::tip Are these guides for you?
- These guides outline procedures for the deployment of Semgrep as part of a security program. To try out Semgrep, refer to the [<i class="fa-regular fa-file-lines"></i> Quickstart](/getting-started/quickstart) document.
- Individual users can also use these guides to deploy Semgrep as part of their personal security.
:::

Many deployment features are set up through **Semgrep AppSec Platform**.

Deployment does **not** include:

- Customizing your SAST, SCA, or secrets scans
- Custom rule writing
- Triage

For these features, refer to the **Scan and Triage** section in the navigation bar.

### All Semgrep deployment features

Semgrep supports many different technology stacks. Refer to the following table to evaluate which deployment features of Semgrep you can use based on your technologies.

#### Core deployment

These are the absolute minimum Semgrep features for any deployment.

<table>
    <thead>
        <tr>
            <th>Deployment feature</th>
            <th>Notes</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>SAST scanning</td>
            <td>Check that Semgrep:
            <ul><li>Can scan your language and that the language's maturity matches your security needs. See <a href="/docs/supported-languages"><i class="fa-regular fa-file-lines" /> Supported languages</a>.</li>
            <li>Provides rulesets that you can use out-of-the-box. See <a href="https://semgrep.dev/r/"><i class="fas fa-external-link fa-xs" /> Semgrep Registry</a>.</li></ul></td>
        </tr>
        <tr>
            <td>SCA scanning</td>
            <td>Check that Semgrep supports your lockfile or package manager.</td>
        </tr>
        <tr>
            <td>Secrets scanning</td>
            <td>Check that your services, such as Slack or Twilio, can be validated by Semgrep. Semgrep Secrets is available through Semgrep Sales, so you must <a href="https://get.semgrep.dev/Book-a-demo.html"><i class="fas fa-external-link fa-xs"/> Book a demo.</a></td>
        </tr>
        <tr>
            <td>SSO</td>
            <td>Semgrep supports:
            <ul><li>OpenID Connect or OAuth 2</li>
            <li>SAML 2.0</li></ul></td>
        </tr>
        <tr>
            <td>Organizations</td>
            <td>Semgrep can connect to orgs from <strong>GitHub and GitLab</strong>. Connecting an org enables Semgrep AppSec Platform to authenticate new users from the same org easily.<br /><br />If you use <strong>Bitbucket or Azure Repos</strong>, you can use SSO to manage the authentication of your users, then add repositories for scanning through your CI provider.</td>
        </tr>
        <tr>
            <td>Scanning remote repositories through CI</td>
            <td>Semgrep fully supports many popular CI providers. See <a href="/docs/deployment/add-semgrep-to-ci"><i class="fa-regular fa-file-lines"></i> Add Semgrep to CI</a>.</td>
        </tr>
        <tr>
            <td>Managed scanning (beta): scanning remote repositories in bulk without CI changes</td>
            <td>An alternative method of scanning many repositories with Semgrep that doesn't require integration with your CI. Requires read access to user-selected repositories. See <a href="/docs/deployment/managed-scanning"><i class="fa-regular fa-file-lines"></i> Add repositories to Semgrep in bulk (beta)</a>.</td>
        </tr>
        <tr>
            <td>PR or MR comments</td>
            <td>Semgrep can post PR or MR comments in the following SCMs:
            <ul><li>GitHub</li><li>GitLab</li><li>Bitbucket</li></ul></td>
        </tr>
    </tbody>
</table>

#### Additional deployment features

Useful features that you can add based on your tech stack. You can integrate these features further into your security workflows after some initial testing of your core deployment.

<table>
    <thead>
        <tr>
            <th>Deployment feature</th>
            <th>Notes</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Notifications</td>
            <td>Semgrep can send notifications through the following channels:<ul><li>Slack</li> <li>Email</li><li>Webhooks</li></ul></td>
        </tr>
        <tr>
            <td>GPT-assisted triage and remediation</td>
            <td>Semgrep can give GPT-assisted recommendations on whether a finding is a true or false positive as well as suggest code fixes for true positive findings.</td>
        </tr>
        <tr>
            <td>IDE integration</td>
            <td>
                Encourage developers to run Semgrep in their IDE. Officially supported extensions include:
                <ul>
                    <li>Microsoft Visual Studio Code</li>
                    <li>IntelliJ Ultimate IDEA</li>
                    <li>Emacs</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>API</td>
            <td>Check that Semgrep's API meets your needs. See <a href=""><i class="fas fa-external-link fa-xs" /> API docs</a>.</td>
        </tr>
    </tbody>
</table>

<!-- - Integrate Semgrep with Jira (Private beta). -->

## Core deployment process

At the minimum, your deployment of Semgrep consists of the following steps:

1. **Creating a Semgrep account**. Each user of Semgrep has one account.
1. **Setting up organizations (orgs)**. Each Semgrep account can have many orgs. Orgs are logical groupings of related repositories and users.
1. **Setting up membership**:
    - For GitHub or GitLab users, you can connect your Semgrep org to the orgs in your source code manager (SCM). This means that any member of an org in your SCM can sign in to your Semgrep deployment.
    - You can also use SSO to manage user authentication.
1. **Adding Semgrep into your CI workflows**. This step ensures that your Semgrep deployment is up and running and that you receive **findings** of security issues in Semgrep AppSec Platform.
1. **Enabling Semgrep to post PR or MR comments**.

![Core deployment steps](/img/core-deployment.png#sm-width-noborder)

To manage a large volume of users and repositories, you may need to perform additional steps:

- Role management
- Tagging projects

These steps are covered in the section [Deployment at scale](/category/deployment-at-scale).

Team size isn't necessarily indicative of deployment needs. Features for large teams can be deployed for smaller teams as well, and are available on the Semgrep Team Tier.

## Deploy Semgrep in phases

It is recommended to finish the core deployment of Semgrep to a few repositories or departments in your organization first before attempting to deploy to the majority.

This **initial phase** prepares you to deploy Semgrep to the rest of the organization. Organizational infrastructure can vary greatly and the initial deployment can help you identify and address issues so that they do not recur in a wider deployment.

## Next steps

Click **Next** to begin setting up your core deployment.
