---
slug: create-account-and-orgs
append_help_link: true
title: Create an account
hide_title: true
description: tk
tags:
  - Semgrep Cloud Platform
  - Team & Enterprise Tier
  - Deployment
---

import PlatformSigninGithub from "/src/components/procedure/_platform-signin-github.md"
import PlatformSigninGitlab from "/src/components/procedure/_platform-signin-gitlab.md"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Create a Semgrep account and set up organizations

You can create a Semgrep user account by signing in to Semgrep Cloud Platform (SCP) through GitHub or GitLab. After this **initial** sign-in, you can:

* Add the rest of your organization (org) to Semgrep through SSO. 
* Configure Semgrep to scan in other SCMs, such as Bitbucket.

:::tip Using SSO for your initial sign-in 
Alternatively, reach out to [<i class="fa-regular fa-envelope"></i> sales@semgrep.com](mailto:sales@semgrep.com) to set up SSO. This removes the need to sign in through a GitHub or GitLab account if you don't have one.
:::

## Semgrep Cloud Platform

Semgrep Cloud Platform (SCP) is used to manage all Semgrep Pro products. With SCP, you can:

- View and manage your Semgrep findings.
- Customize how Semgrep scans your code.
- Manage the users associated with your Semgrep organization.
- Set up alerts and notifications, including Slack alerts, emails, and pull request or merge request comments pushed to your source code manager

## Initial sign in to Semgrep Cloud Platform

The following steps walk you through creating a **user account** and your first **organization**:

<Tabs
    defaultValue="signin-github"
    values={[
    {label: 'Sign in with GitHub', value: 'signin-github'},
    {label: 'Sign in with GitLab', value: 'signin-gitlab'},
    ]}
>

<TabItem value='signin-github'>

<PlatformSigninGithub />

</TabItem>

<TabItem value='signin-gitlab'>

<PlatformSigninGitlab />

</TabItem>

</Tabs>

## Set up organizations

Organizations (orgs) in Semgrep enable users to share access to, and management of, Semgrep resources such as findings and reports.

Semgrep organizations can be **connected** to equivalent GitHub, GitLab, and SSO organizations, which enables users from those organizations to easily join your Semgrep deployment through their existing credentials.

### How Semgrep organizations work

Users can have more than one organization, and an organization can consist of one or many user accounts. Users must belong to at least one organization when they first sign in to Semgrep. 

Organizations can be as small as a single user in a department, or encompass whole companies. 

By default, orgs do not manage any authentication or repositories. You add resources and users to an org by connecting to an SCM or SSO, or setting up a Semgrep scan.

Once you have connected to your SSO or SCM, any team member from your GitHub, Gitlab, or SSO organization can sign in to Semgrep. This includes developers not part of your security team. To control which resources they are able to see or what policies they can change, configure their **role** through user access control features. [tk link]

### Create additional orgs

After you create your first org, you can create multiple orgs to group related resources together:

1. In Semgrep Cloud Platform, click the drop-down box with your organization name, located at the sidebar.
2. Click **Add org**.
3. Click **Create an organization**.
4. In the popup, provide an **Organization display name**.

### Next steps for GitHub and GitLab users
- GitHub and GitLab users can choose to use their SCM for both user and repository management. Refer to tk link
- Alternatively, if you also have an SSO provider, you can opt to use SSO to manage user authentication instead.Refer to tk link

### Next steps for Bitbucket and Azure Repos users

- To quickly add members to your Semgrep organization, connect to **SSO**. tk link
- If you don't use SSO, you can still scan your Bitbucket and Azure Repos repositories without connecting to any SCM. If you  the previous step,tk , you can skip the rest of this guide.
    - This means you are not able to share resources or manage findings with other security engineers or fellow team members.

 
## Appendix: Organization setup examples

:::note 
These sections are helpful, but are not necessary to set up a deployment. 
:::
The following examples illustrate what a completed organizational set-up can look like.

### Single-user organization in GitLab

- In this example, a single GitLab user, `john-doe`, has a Semgrep org account with the same name.
- He has set up his CI workflow to scan `repo-A` and `repo-B` in his GitLab account. The CI job sends scan results (findings) to Semgrep Cloud Platform.

![DESCRIPTION](/img/personal-org.png#md-noborder)

### Company with org departments in GitHub

In this example, a `parent-company` has multiple `subsidiaries`:

- Each `subsidiary` is its own GitHub organization. 
- The security team is responsible for all `subsidiaries` in `parent-company`. The security team is a part of all `subsidiaries`.
- The `parent-company` enforces SSO for all of its `subsidiaries`.
- Here, membership and repository scanning are separately managed by two different services.

The Semgrep deployment could look like this:

- Each GitHub org has a corresponding Semgrep org.
- The security team has configured SSO for each Semgrep org.
    - This means that `team-member-P` can also access `subsidiary-1-org`. The resources they are able to view or change can be constrained through **roles**.

![DESCRIPTION](/img/multiple-orgs.png)

## Join an existing org

This section is for team members who have been invited to join a Semgrep organization.

<Tabs
    defaultValue="gh-gl"
    values={[
    {label: 'GitHub or GitLab', value: 'gh-gl'},
    {label: 'SSO', value: 'sso'},
    ]}
>

<TabItem value='gh-gl'>

To join an existing org in GitHub or GitLab:

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep Cloud Platform](https://semgrep.dev/login) with the account credentials specified by your admin.
1. Follow the on-screen prompts to [grant Semgrep the needed permissions](/semgrep-cloud-platform/getting-started/#requested-permissions-for-github-and-gitlab) and proceed.
1. Click **Join an existing organization**.

</TabItem>

<TabItem value='sso'>

To join an existing org through your SSO provider:

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep Cloud Platform](https://semgrep.dev/login) with the account credentials specified by your admin.
2. You are automatically signed in to all organizations that your admin has set up for you.

## Delete an existing org

Reach out to [<i class="fa-regular fa-envelope"></i> support@semgrep.com](mailto:support@semgrep.com) to delete an organization.

</TabItem>

</Tabs>
