---
slug: scm-code-access
append_help_link: true
title: Enable source code manager code access
hide_title: true
description: Learn how to enable source code manager code access
tags:
  - Deployment
  - Semgrep AppSec Platform
---

# Enable source code manager code access

import PL from '@site/src/components/Placeholder';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Some Semgrep features require additional levels of code access. You can grant these permissions to Semgrep by assigning additional scopes to the access token that facilitates communication between Semgrep and the source code manager (SCM). The following table shows the minimum scope needed to enable the required code access level.

#### Required SCM code access scopes

| SCM | Read access scope | Write access scope |
|----------|-------------|--------------|
| Azure DevOps | `code:read` | `code:write` |
| Bitbucket Cloud | `repository:read`<br />`pullrequest:read` | `repository:write`<br />`pullrequest:write` |
| Bitbucket Data Center | `repository:read` | `repository:write` |
| GitHub.com and Github Enterprise | `contents:read` | `contents:write` |
| GitLab and Gitlab Self-Managed | `read_repository` | `write_repository` |

## Grant code access to Semgrep with a private GitHub app

If you already have a private Semgrep GitHub app set up and configured for your deployment that **doesn't** have code access enabled, follow these steps to update the app and grant code access to Semgrep.

:::tip App slug
If you don't know the name of your app slug, you can find it on the [**Settings > Source code managers** page](https://semgrep.dev/orgs/-/settings/source-code). 

![DESCRIPTION](/img/github-app-slug.png#md-width)
_**Figure**. Add a description here._
:::

1. Navigate to the GitHub Application permissions and events page. GitHub Enterprise users must replace the `https://github.com` base URL with the base URL of the GitHub Enterprise instance.
    1. For organization accounts, go to <code>https://github.com/organizations/<PL>ORGANIZATION_NAME</PL>/settings/apps/<PL>APP_SLUG</PL>/permissions</code>.
    1. For user accounts, go to <code>https://github.com/settings/apps/<PL>APP_SLUG</PL>/permissions</code>
2. Expand **Repository Permissions**.
3. Under **Contents**, change the access level to **Read and write**.
4. Click **Save Changes**.
5. At this point, GitHub sends you or your GitHub admin an email to approve the permissions changes. Once approved, Semgrep has code access to your GitHub instance.

## Grant code access to Semgrep with an access token

If you onboarded your repositories using an access token, then you can follow these steps to grant code access to Semgrep.

<Tabs
    defaultValue="github"
    values={[
    {label: 'Azure DevOps Cloud', value: 'ado'},
    {label: 'Bitbucket Cloud', value: 'bitbucket'},
    {label: 'Bitbucket Cloud', value: 'bitbucket_datacenter'},
    {label: 'GitHub', value: 'github'},
    {label: 'GitLab', value: 'gitlab'},
    ]}
>

<TabItem value="ado">
1. Navigate to the Azure DevDps access token settings page: <code>https://dev.azure.com/<PL>ORGANIZATION_NAME</PL>/_usersSettings/tokens</code>.
2. Click **New token** to launch the **Create a new personal access token** dialog. Ensure that you assign the `Code: Read` and `Code: Write` scopes to the token, in addition to [any other scopes you may need](/deployment/managed-scanning/azure#prerequisites-and-permissions) for other features you've enabled for your Semgrep deployment. Create the token, and copy its value.
3. Return to Semgrep AppSec Platform, and go to [**Settings > Source code managers**](https://semgrep.dev/orgs/-/settings/source-code). 
4. Find the connection associated with your organization, and click **Update access token**.
5. Paste in your new access token.
6. Click **Save**.
</TabItem>

<TabItem value="bitbucket">
1. Navigate to the Bitbucket Cloud access token settings page: <code>https://bitbucket.org/<PL>WORKSPACE</PL>/workspace/settings/access-keys</code>.
2. Create a new access token and ensure that you assign the `repository:read`, `pullrequest:read`, `repository:write`, and `pullrequest:write` scopes to the token, in addition to [any other scopes you may need](/deployment/managed-scanning/bitbucket#bitbucket-cloud) for other features you've enabled for your Semgrep deployment. Create the token, and copy the token's value.
3. Return to Semgrep AppSec Platform, and go to [**Settings > Source code managers**](https://semgrep.dev/orgs/-/settings/source-code). 
4. Find the Bitbucket connection associated with your workspace, and click **Update access token**.
5. Paste in your new access token.
6. Click **Save**.
</TabItem>

<TabItem value="bitbucket_datacenter">
1. Navigate to the Bitbucket Data Center access token settings page: <code><PL>BITBUCKET_BASE_URL</PL>/plugins/servlet/access-tokens/projects/<PL>PROJECT</PL></code>.
2. Create a new HTTP access token, ensuring that you assign the `repository:read` and `repository:write` scopes to the token, along with [any other scopes or permissions you may need](/deployment/managed-scanning/bitbucket#bitbucket-data-center) for other features you've enabled for your Semgrep deployment. Copy the token's value.
3. Return to Semgrep AppSec Platform, and go to [**Settings > Source code managers**](https://semgrep.dev/orgs/-/settings/source-code). 
4. Find the Bitbucket connection associated with your workspace, and click **Update access token**.
5. Paste in your new access token.
6. Click **Save**.
</TabItem>

<TabItem value="github">

1. Navigate to the GitHub personal access token settings page: `https://github.com/settings/personal-access-tokens`. GitHub Enterprise users must replace the `https://github.com` base URL with the base URL of the GitHub Enterprise instance.
2. Click **Generate new token**.
3. Under **Repository access**, select either **All repositories** or **Only select repositories**. If you choose **Only select repositories**, select the repositories that this token is used with.
4. Under **Contents**, set the access level to **Read and write**. 
5. Click **Generate token** and copy its value.
6. Return to Semgrep AppSec Platform, and go to [**Settings > Source code managers**](https://semgrep.dev/orgs/-/settings/source-code).
7. Find the GitHub connection associated with your org, and click **Update access token**.
8. Paste in your new access token.
9. Click **Save**.
</TabItem>

<TabItem value="gitlab">

1. Navigate to the GitLab access token settings page: <code>https://gitlab.com/groups/<pl>GROUP</pl>/-/settings/access_tokens</code>.
2. Create a new access token, ensuring that you add the `read_repository` and `write_repository` scopes, along with [any other scopes or permissions you may need](/deployment/managed-scanning/gitlab#prerequisites-and-permissions) for other features you've enabled for your Semgrep deployment. Copy the token's value. Copy the token's value.
3. Return to Semgrep AppSec Platform, and go to [**Settings > Source code managers**](https://semgrep.dev/orgs/-/settings/source-code).
4. Find the GitLab connection associated with your group, and click **Update access token**.
5. Paste in your new access token.
6. Click **Save**.
 


</TabItem>
</Tabs>
