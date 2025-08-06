---
slug: connect-scm
title: Connect a source code manager
hide_title: true
description: Connect a source code manager for use with Semgrep.
toc_max_heading_level: 2
tags:
  - Deployment
  - Semgrep AppSec Platform
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import PL from '@site/src/components/Placeholder';

# Connect a source code manager

:::note Your deployment journey
- You have gained the necessary [resource access and permissions](/deployment/checklist) required for deployment.
- You have [created a Semgrep account and organization](/deployment/create-account-and-orgs).
:::

Linking a source code manager provides the following benefits:

- Allows the Semgrep org membership to be managed by GitHub or GitLab.
- For GitHub users:
    - Provides Semgrep access to post PR or MR comments.
    - For GitHub Actions users: Enables you to add a Semgrep CI job to repositories in bulk.
- Allows you to scan and manage your Azure DevOps and Bitbucket projects in Semgrep AppSec Platform.
- Allows the Semgrep platform to generate hyperlinks to code in findings.

If your organization uses both GitHub and GitLab to manage source code, log in with the source code manager that you would prefer to use to manage Semgrep org membership. You can still scan repositories from other sources, including Azure DevOps and Bitbucket, though you will need to use a separate SSO provider to manage the authentication of your users in such cases.

The process to connect a source code manager depends on whether your SCM tool is cloud-hosted by the service provider, hosted on-premise, or hosted as a single tenant by the service provider.

## Connect to cloud-hosted orgs

If you opted to scan a GitHub or GitLab repository when you initially signed in, you may have already performed these steps and can skip to [Next steps](#next-steps).

<Tabs
    defaultValue="github-cloud"
    values={[
    {label: 'Azure DevOps Cloud', value: 'azure-devops-cloud'},
    {label: 'Bitbucket Cloud', value: 'bitbucket-cloud'},
    {label: 'GitHub Cloud', value: 'github-cloud'},
    {label: 'GitLab Cloud', value: 'gitlab-cloud'},
    ]}
>

<TabItem value='azure-devops-cloud'>

### Azure DevOps Cloud

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login).
1. Optional: If you have created more than one Semgrep account, select the account you want to make a connection for by clicking on the **Navigation bar > Your account name > The account you want to connect**.<br />
   <img src="/docs/img/more-accounts-dropdown.png" height="350px" />
1. Go to **<i class="fa-solid fa-gear"></i> Settings > Source code managers > Add > Azure DevOps**. 
1. In the **Connect your Azure DevOps Project** dialog box, provide:
   - The **Name of your Azure DevOps Organization**.
   - The **Name of your Azure DevOps Project**. The name of your Azure DevOps organization and project can be seen in the project URL, for example `https://dev.azure.com/organization/project`. 
   - Your **Access token**. See [User personal access tokens](https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate) for information on generating a token.
2. Click **Connect** to save and proceed.
3. The Azure DevOps project is now listed under **Source code managers**. Click **Test** to verify that the new connection is installed correctly.

</TabItem>
<TabItem value='bitbucket-cloud'>

### Bitbucket Cloud

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login).
1. Optional: If you have created more than one Semgrep account, select the account you want to make a connection for by clicking on the **Navigation bar > Your account name > The account you want to connect**.<br />
   <img src="/docs/img/more-accounts-dropdown.png" height="350px" />
1. Go to **<i class="fa-solid fa-gear"></i> Settings > Source code managers > Add > Bitbucket Cloud**.
1. In the **Connect your Bitbucket Workspace** dialog box, provide:
   - The **Name of your Bitbucket Workspace**
   - Your **Access token**. Semgrep requires a [workspace-level access token](https://support.atlassian.com/bitbucket-cloud/docs/create-a-workspace-access-token/).
1. Click **Connect** to save and proceed.
1. The Bitbucket project is now listed under **Source code managers**. Click **Test** to verify that the new connection is installed correctly.

</TabItem>
<TabItem value='github-cloud'>

### GitHub Cloud with GitHub SSO

These steps are for users that sign in to Semgrep through GitHub.

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login).
1. Optional: If you have created more than one Semgrep account, select the account you want to make a connection for by clicking on the **Navigation bar > Your account name > The account you want to connect**.<br />
   <img src="/docs/img/more-accounts-dropdown.png" height="350px" />
1. From the **Navigation bar**, click **<i class="fa-solid fa-gear"></i> Settings > Source code managers**.
1. Click **Add > GitHub**.
1. Review the permissions requested by Semgrep, then click **Continue**.
1. Click the organization you want to install Semgrep on.
1. Choose to authorize and install Semgrep for **<i class="fa-regular fa-circle-dot"></i> All repositories** or **<i class="fa-regular fa-circle-dot"></i> Only select repositories**.
1. Click **Install and authorize**.
1. After a successful link, you are signed out of Semgrep AppSec Platform automatically, as your credentials have changed after linking an organization.
1. Sign back in to Semgrep AppSec Platform.

### GitHub Cloud with non-GitHub SSO

These steps are for users that sign in to Semgrep through a **non-GitHub** SSO provider.  You can still connect to GitHub using the Semgrep Github app and either a personal access token or your individual GitHub account.

1. Navigate to the following link: [<i class="fas fa-external-link fa-xs"></i> Semgrep GitHub app](https://github.com/marketplace/semgrep-dev) and install the Semgrep GitHub app onto the GitHub org you want to connect to.
1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login) using your non-GitHub SSO provider.
1. From the **Navigation bar**, click **<i class="fa-solid fa-gear"></i> Settings > Source code managers**.
1. Click **Add > GitHub**.
1. In the **Connect your GitHub Organization** modal, enter the name of your github organization and:
    - either enter a GitHub personal access token and click **Connect**
    - or click the **Authenticate with GitHub** button without entering a token
1. Your GitHub org is now listed under **Source Code managers**. Click **Test** to verify that the new connection is installed correctly.

Alternatively, after setting up the Semgrep GitHub app (step 1, above), you can  [<i class="fas fa-external-link fa-xs"></i> Contact Support](/support#contact-support) and inform them which Semgrep account needs to be connected to the GitHub org. Support will finalize the connection.

</TabItem>


<TabItem value='gitlab-cloud'>

### GitLab Cloud

1. Create a PAT by following the steps outlined in this [guide to creating a PAT](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html). Ensure that the PAT is created with the required `api` scope.
1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login).
1. Optional: If you have created more than one Semgrep account, select the account you want to make a connection for by clicking on the **Navigation bar > Your account name > The account you want to connect**.<br />
   <img src="/docs/img/more-accounts-dropdown.png" height="350px" />
1. Click **<i class="fa-solid fa-gear"></i> Settings > Source Code Managers > Add > GitLab Cloud**
1. Enter the personal access token generated into the **Access token** field.
1. Enter your GitLab group's name into the **Name of your GitLab Group** field. If your repositories are organized in subgroups, you only need to provide the name of the top-level group.
1. Optional, but recommended: if you have multiple GitLab groups in your GitLab account, create a source code manager per group. Repeat steps 1, 3-4 for each GitLab group.
1. The GitLab groups are now listed under **Source code managers**. Click **Test** to verify that the new connection is configured correctly.

You have successfully connected an org in Semgrep AppSec Platform with an organization in your source code management tool.

</TabItem>
</Tabs>

## Connect to on-premise orgs and projects

<Tabs
    defaultValue="github-enterprise"
    values={[
    {label: 'Bitbucket Data Center', value: 'bitbucket-data-center'},
    {label: 'GitHub Enterprise Server', value: 'github-enterprise'},
    {label: 'GitLab Self-Managed', value: 'gitlab-sm'},
    ]}
>

<TabItem value='bitbucket-data-center'>

### Bitbucket Data Center

1. Create an HTTP Access Token for your project following the steps outlined in [<i class="fas fa-external-link fa-xs"></i> Bitbucket Data Center documentation](https://confluence.atlassian.com/bitbucketserver/http-access-tokens-939515499.html). Ensure that the access token is created with `PROJECT_ADMIN` permissions.
1. Copy the token for use in the next steps.
1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login).
1. Optional: If you have created more than one Semgrep account, select the account you want to make a connection for by clicking on the **Navigation bar > Your account name > The account you want to connect**.<br />
   <img src="/docs/img/more-accounts-dropdown.png" height="350px" />
1. Go to **<i class="fa-solid fa-gear"></i> Settings** > **Source code managers**, and click **Add > Bitbucket Data Center**.
1. In the **Connect your Bitbucket project (key)** dialog box, provide:
   - The **Name of your Bitbucket project (key)**. This must be the project key, which you can find by navigating to `<YOUR_BITBUCKET_DATA_CENTER_BASE_URL>/projects`.
   - The **URL** to access your installation of Bitbucket Data Center; this is your fully-qualified domain name.
   - The **Access Token** that grants Semgrep permission to communicate with your project. Semgrep expects an [HTTP access token](https://confluence.atlassian.com/bitbucketserver/http-access-tokens-939515499.html) with `PROJECT_ADMIN` permissions.
1. Click **Connect** to save and proceed.
1. The Bitbucket project is now listed under **Source code managers**. Click **Test** to verify that the new connection was installed correctly.
1. To enable merge request comments, click **<i class="fa-solid fa-toggle-large-on"></i> Incoming webhooks**.
1. Optional: Click **Auto scan** to onboard all current and future repositories under your project to Semgrep Managed Scanning.

</TabItem>
<TabItem value='github-enterprise'>

### GitHub Enterprise

This section is applicable to users on a **GitHub Enterprise Server** plan. 

The **Semgrep App for GitHub Enterprise (GHE)** creates a connection between Semgrep
and orgs in your GHE deployment. There are two primary installation steps:

1. Install the Semgrep App for the first time using the GHE organization (org)
   that "owns" the app.
2. Install the app for additional GHE orgs.

#### Initial Semgrep App installation

If your deployment contains many orgs, you must **choose an org** among your accounts that acts as the **owner** of the Semgrep App. As the owner, this org controls the settings and permissions granted to the app.

Ensure that you have selected the intended owner by viewing the account name in the navigation bar:
<img src="/docs/img/more-accounts-dropdown.png" height="350px" /><br />
Choose another account by clicking the **account name** and selecting an account from the drop-down box. Then, perform the following steps to set up the connection:

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login/).
2. Click **<i class="fa-solid fa-gear"></i> Settings** > **Source code managers > Add > GitHub Enterprise**.
3. In the **Connect your GitHub Organization** dialog box, provide:
   - The **Name of your GitHub Organization**
   - The **URL** to access your deployment
4. Click **Connect** to save your changes.
6. In the **Add GitHub App** page that you're redirected to, ensure that:
    - You've selected **Organization**.
    - The **GitHub Organization name** is populated; if not, enter the name of your org.
    - You've selected the **Use for multiple GitHub orgs (Enterprise-public app)** checkbox.
7. Select the features you'd like enabled. Enabling PR comments, Assistant recommendations, and Semgrep Managed Scans requires you to grant Semgrep Code Access, while enabling only PR comments does not.
8. Review the permissions for the app; as the app owner, note that you can change these permissions later.
9. Click **Register GitHub App** to proceed.
10. You are taken to your GHE instance and asked to name your app. You can choose whatever name you'd like, but Semgrep recommends that you name it something that indicates that this is the Semgrep GHE app.
11. After you name your app, choose the GHE org to which you want it installed.
12. Select the org that you want to act as the owner of the app, and click **Install**.
13. Wait for the installation to complete. When done, you will be redirected to Semgrep.
14. Verify the installation by navigating to **Settings** > **Source code managers**. Ensure that the entry for your SCM shows a **Connected** badge.
15. In GHE, you should see the app listed as installed on the **GitHub Apps** page.
   ![GHE showing installed Semgrep App](/img/ghe-9.png#md-width)
   You can click **Configure** to choose the repositories to which the app has access. Additionally, you can go to **App settings** to customize the permissions granted to the app.
   ![GitHub Apps page showing App settings link](/img/ghe-10.png#md-width)
16. If you have additional GHE orgs you'd like to add, you can do so by repeating steps 2-15.

At this point, you've successfully installed the GHE Semgrep App on the owner GHE org. In the future, other members of your GHE instance can install the app on their GHE orgs using the public link if they have the proper permissions. You can get the public link from GHE by going to **GitHub Apps** > **App settings**.

![App installation page](/img/ghe-11.png#md-width)

#### Install the app for subsequent GHE orgs

You can install the Semgrep app onto additional GHE orgs at any time. To do so:

1. Go to the public link for the app shared with you by your admin. Click **Install**.
   ![App installation page](/img/ghe-12.png#md-width)
2. Choose the GHE org to which you want the app installed, and click **Install**.
   ![Org list](/img/ghe-13.png#md-width)
3. In the popup confirmation message, click **Install**.
   ![GitHub installation prompt](/img/ghe-14.png#md-width)
4. The GHE org should now be listed under **Source code managers**.

You have successfully connected Semgrep to your GitHub Enterprise Server.

</TabItem>
<TabItem value='gitlab-sm'>

### GitLab Self-Managed

This section is applicable to users with subscriptions to any **GitLab self-managed plan**.

Connect Semgrep and GitLab Self-Managed accounts by creating a PAT and providing it to Semgrep using Semgrep AppSec Platform:

1. Create a PAT by following the steps outlined in this [guide to creating a PAT](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html). Ensure that the PAT is created with the required `api` scope.
1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login).
1. Optional: If you have created more than one Semgrep account, select the account you want to make a connection for by clicking on the **Navigation bar > Your account name > The account you want to connect**.<br />
   <img src="/docs/img/more-accounts-dropdown.png" height="350px" />
1. Click **<i class="fa-solid fa-gear"></i> Settings > Source code managers > Add > GitLab Self-Managed** and enter the personal access token generated into the **Access token** field.
1. Enter your GLSM base URL into the **URL** field.
1. Enter your GitLab group's name into the **Name of your GitLab Group** field. If your repositories are organized in subgroups, you only need to provide the name of the top-level group.
1. If you have multiple GitLab groups in your GitLab account, you need to create a source code manager per group. Repeat steps 1, 3-5 for each GitLab group.
1. The GitLab groups are now listed under **Source Code managers**. Click **Test** to verify that the new connection is installed correctly.

</TabItem>
</Tabs>

## Next steps

- Optional: See [<i class="fa-regular fa-file-lines"></i> SSO authentication](/deployment/sso) to set up user management through SSO.
- You are ready to scan your org's repositories with Semgrep.
