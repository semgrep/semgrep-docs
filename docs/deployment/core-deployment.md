---
slug: core-deployment 
append_help_link: true
title: Core deployment 
description: Learn how to set up a comprehensive Semgrep deployment for yourself or your organization.
tags:
  - Deployment
  - Semgrep Cloud Platform
---

Semgrep can be set up to manage teams and scan many repositories of any size.

**Deployment** refers to the process of integrating Semgrep into your developer and infrastructure workflows. Completing the deployment process provides you with the Semgrep features that meet your security program's needs.

Deployment includes:

- Running Semgrep scanners as part of your CI. These scanners can be any combination of SAST, SCA, or Secrets, depending on your plan.
- Managing team members' access and authentication.
- Ensuring that Semgrep has sufficient access to your self-hosted source code manager (SCM), such as GitLab Self-Managed.

:::tip Are these guides for you?
These guides outline procedures for the deployment of Semgrep as part of a security program. To try out Semgrep, refer to the [<i class="fa-regular fa-file-lines"></i> Quickstart](/getting-started/quickstart) document.
:::

Many deployment features are set up through **Semgrep Cloud Platform**.

Deployment does **not** include:

- Customizing your SAST, SCA, or secrets scans.
- Custom rule writing.
- Triage.

For these features, refer to the **Scan and Triage** section in the navigation bar.

### Semgrep deployment features available to you

Semgrep supports many different technology stacks. Refer to the following table to evaluate which deployment features of Semgrep you can use based on your technologies.

<table>
    <thead>
        <tr>
            <th>Deployment feature</th>
            <th>Evaluation</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>SAST scanning</td>
            <td>Check that Semgrep:
            <ul><li>Can scan your language and that the language's maturity matches your security needs. See <a href="/supported-languages"><i class="fa-regular fa-file-lines" /> Supported languages</a>.</li>
            <li>Provides rulesets that you can use out-of-the-box. See <a href="https://semgrep.dev/r/"><i class="fas fa-external-link fa-xs" /> Semgrep Registry</a>.</li></ul></td>
        </tr>
        <tr>
            <td>SCA scanning</td>
            <td>Check that Semgrep supports your lockfile or package manager.</td>
        </tr>
        <tr>
            <td>Secrets scanning (beta)</td>
            <td>Check that your services, such as Slack or Twilio, can be validated by Semgrep. Semgrep Secrets is in beta, so you must <a href="https://get.semgrep.dev/Book-a-demo.html"><i class="fas fa-external-link fa-xs"/> Book a demo.</a></td>
        </tr>
        <tr>
            <td>SSO</td>
            <td>Semgrep supports:
            <ul><li>OpenID Connect or OAuth 2</li>
            <li>SAML 2.0</li></ul></td>
        </tr>
        <tr>
            <td>Organizations</td>
            <td>Semgrep can connect to orgs from <strong>GitHub and GitLab</strong>. Connecting an org enables Semgrep Cloud Platform to authenticate new users from the same org easily.<br /><br />If you use <strong>Bitbucket or Azure Repos</strong>, you can use SSO to manage the authentication of your users, then add repositories for scanning through your CI provider.</td>
        </tr>
        <tr>
            <td>Scanning in CI</td>
            <td>Semgrep fully supports many popular CI providers.</td>
        </tr>
        <tr>
            <td>PR or MR comments</td>
            <td>Semgrep can post PR or MR comments in the following SCMs:
            <ul><li>GitHub</li><li>GitLab</li><li>Bitbucket</li></ul></td>
        </tr>
        <tr>
            <td>Notifications</td>
            <td>Semgrep can send notifications through the following channels:<ul><li>Slack</li> <li>Email</li><li>Webhooks</li></ul></td>
        </tr>
        <tr>
            <td>API</td>
            <td>Check that Semgrep's API meets your needs. See <a href=""><i class="fas fa-external-link fa-xs" /> API docs</a> </td>
        </tr>
    </tbody>
</table>

### Deployment process

#### Core deployment steps

At the minimum, your deployment of Semgrep consists of the following steps:

1. Creating a Semgrep account. Each user of Semgrep has one account.
2. Setting up organizations (orgs). Each Semgrep account can have many orgs. Creating an org enables you to invite other users to join your org and manage repositories of that org for scanning.
3. Connecting your Semgrep orgs to the orgs in your source code manager (SCM). For GitHub and GitLab users, this enables you to automate certain onboarding tasks.
4. Adding Semgrep into your CI workflows. This step ensures that your Semgrep deployment is up and running and that you receive **findings** of security issues in Semgrep Cloud Platform.
5. Enabling Semgrep to post PR or MR comments.

These steps are typically sufficient for **individuals and small teams**.

To deploy to **large teams or enterprise users**, you may need to perform additional steps:

- Setting up SSO.
- Role management.
- Configuring a self-hosted SCM, such as GitLab Self-Managed.
- Tagging projects.

These steps are covered in the section Enterprise and large teams.

Team size isn't necessarily indicative of deployment needs. Features for large teams can be deployed to smaller teams, too, and are available on the Semgrep Team Tier.

#### Additional deployment features

You can integrate Semgrep further into your security workflows after some initial testing of your core deployment. Once everything works smoothly, you can:

- Set up notification channels.
- Encourage developers to set up Semgrep as a linter in their IDE.
- Integrate Semgrep with project management software (Private beta).

### Next steps

Click **Create an account** to begin setting up your core deployment.

