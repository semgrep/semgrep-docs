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

Organizations (orgs) in Semgrep enable users to share access to, and management of, Semgrep resources such as findings and reports. Semgrep organizations can be **connected** to equivalent GitHub, GitLab, and SSO organizations, which enables users from those organizations to easily join your Semgrep deployment by signing in to Semgrep Cloud Platform with their existing credentials.

### For GitHub and GitLab users
- GitHub and GitLab users have the option to use their SCM for both user and repository management. Refer to tk link
- If you also have an SSO provider, you can opt to use SSO to manage user authentication as well. Refer to tk link

### For Bitbucket and Azure Repos users

- To quickly add members to your Semgrep organization, connect to **SSO**. tk link
- If you don't use SSO, you can still scan your Bitbucket and Azure Repos repositories without connecting to any SCM. If you  the previous step,tk , you can skip the rest of this guide.
    - This means you are not able to share resources or manage findings with other security engineers or fellow team members.

### How Semgrep organizations work

Users can have more than one organization, and an organization can consist of one or many user accounts. Users must belong to at least one organization when they first sign in to Semgrep. 

Organizations can be as small as a single user or department, or encompass whole companies. 

By default, orgs do not manage any authentication or repositories. You add resources and users to an org by connecting to an SCM or SSO, or setting up a Semgrep scan.

Once you have connected to your SSO or SCM, any team member from your GitHub, Gitlab, or SSO organization can sign in to Semgrep. This includes developers not part of your security team. To control which resources they are able to see or what policies they can change, configure their **role** through user access control features. [tk link]

### Create a new org

If you have multiple organizations in GitHub or GitLab, you can create additional orgs in Semgrep to manage them:

1. In Semgrep Cloud Platform, click the drop-down box with your organization name.
2. Click **Add org**.
3. Click **Create an organization**.
4. In the popup, provide an **Organization display name**.

### Example organization setup


### Join an existing org

This section is for team members who have been  

