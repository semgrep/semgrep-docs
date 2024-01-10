---
slug: create-an-account
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

# Create a Semgrep account

You can create a Semgrep account by signing in to Semgrep Cloud Platform (SCP) through GitHub or GitLab. After this **initial** sign-in, you can:

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

## Signing in to Semgrep Cloud Platform

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
