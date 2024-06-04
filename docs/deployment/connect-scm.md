---
slug: connect-scm
title: Connect a source code manager
hide_title: true
description: Connect a GitHub or GitLab organization to manage user authentication.
toc_max_heading_level: 3
tags:
  - Semgrep AppSec Platform
  - Team & Enterprise Tier
  - Deployment
---

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

You can only connect your Semgrep organization to the source code manager that you originally logged in with. If your organization uses both GitHub and GitLab to manage source code, log in with the source code manager that you would prefer to use to manage Semgrep org membership. You can still scan repositories from other sources.

The process to connect a source code manager depends on whether your SCM tool is cloud-hosted by the service provider, hosted on-premise, or hosted as a single tenant by the service provider.

## Connect to cloud-hosted orgs

If you opted to scan a GitHub or GitLab repository when you initially signed in, you may have already performed these steps and can skip to [Next steps](#next-steps).

### GitHub Cloud

1. Sign in to Semgrep AppSec Platform.
1. On the sidebar, click **the organization account** you want to make a connection for.
1. Click **Settings** > **Source Code Managers**.
![Source code manager tab](/img/source-code-manager.png#md-width)
1. Click **Connect to GitHub**.
1. Review the permissions requested by Semgrep, then click **Continue**.
1. Click the organization you want to install Semgrep on.
1. Choose to authorize and install Semgrep for **<i class="fa-regular fa-circle-dot"></i> All repositories** or **<i class="fa-regular fa-circle-dot"></i> Only select repositories**.
1. Click **Install and authorize**.
1. After a successful link, you are signed out of Semgrep AppSec Platform automatically, as your credentials have changed after linking an organization.
1. Sign back in to Semgrep AppSec Platform.


<!-- removed temporarily because we're using the "old flow"
:::tip
- Getting Assistant recommendations grants Semgrep **code access**.
- **Leave PR comments** refers to Semgrep's capability to post findings to developers in PRs.
:::

-->

You have successfully connected an org in Semgrep AppSec Platform with an organization in your source code management tool.

### GitLab Cloud

For users of GitLab cloud-hosted plans, a connection to GitLab is created automatically after [adding a Semgrep job to GitLab CI/CD](/deployment/add-semgrep-to-ci). No other steps are needed.

## Connect to on-premise orgs

### GitHub Enterprise Server

This section is applicable to users on a **GitHub Enterprise Server** plan. The Semgrep team recommends connecting to your GitHub orgs using the Semgrep App instead of using
a personal access token (PAT) whenever possible.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
    defaultValue="app"
    values={[
    {label: 'Semgrep App (Recommended)', value: 'app'},
    {label: 'PAT', value: 'pat'},
    ]}
>

<TabItem value='app'>

The **Semgrep App for GitHub Enterprise (GHE)** creates a connection between Semgrep
and orgs in your GHE deployment. There are two primary installation steps:

1. Install the Semgrep App for the first time using the GHE organization (org)
   that "owns" the app.
2. Install the app for additional GHE orgs.

#### Initial Semgrep App installation

If your deployment contains many orgs, you must choose an org in the deployment that acts as the **owner** of the Semgrep App. As the owner, this org controls the settings and permissions granted to the app.

1. Log in to [Semgrep AppSec Platform](https://semgrep.dev/login/).
2. Click <i class="fa-solid fa-gear"></i> Settings** > **Source Code Managers**, and click **Add GitHub Enterprise**.
3. In the **Connect your GitHub Organization** dialog box, provide:
   - The **Name of your GitHub Organization**
   - The **URL** to access your deployment
4. Click **Connect** to save your changes.
5. Refresh your browser. You should see a new entry under **Source code managers** that displays the GHE org and instance URL you entered. Click **Register app**.
6. In the **Add GitHub App** page, ensure that:
    - You've selected **Organization**.
    - The **GitHub Organization name** is populated; if not, enter the name of your org.
    - You've selected the **Use for multiple GitHub orgs (Enterprise-public app)** checkbox.
7. Review the permissions for the app; as the app owner, note that you can change these permissions later.
8. Click **Register GitHub App** to proceed.
9. You are taken to your GHE instance and asked to name your app. You can choose whatever name you'd like, but Semgrep recommends that you name it something that indicates that this is the Semgrep GHE app.
10. After you name your app, choose the GHE org to which you want it installed.
11. Select the org that you want to act as the owner of the app, and click **Install**.
12. Wait for the installation to complete. When done, you will be redirected to Semgrep.
13. Verify the installation by navigating to **Settings** > **Source Code Managers**. Ensure that the entry for your SCM shows a **Connected** badge.
14. In GHE, you should see the app listed as installed on the **GitHub Apps** page.
   ![GHE showing installed Semgrep App](/img/ghe-9.png#md-width)
   You can click **Configure** to choose the repositories to which the app has access. Additionally, you can go to **App settings** to customize the permissions granted to the app.
   ![GitHub Apps page showing App settings link](/img/ghe-10.png#md-width)

<br />
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
4. The GHE org should now be listed under **Source code organizations**.
    ![Source code organizations list](/img/ghe-15.png#md-width)

You have successfully connected Semgrep to your GitHub Enterprise Server.

</TabItem>

<TabItem value='pat'>

Connect Semgrep and GitHub Enterprise Server by creating a PAT and setting it in Semgrep AppSec Platform:

1. Sign in to [Semgrep AppSec Platform](https://semgrep.dev/login).
1. Click **Settings** > **Source Code Managers > GitHub Enterprise Server**.
![Source code manager tab](/img/source-code-manager.png#md-width)
1. Create a PAT by following the steps outlined in this [guide to creating a PAT](https://docs.github.com/en/enterprise-server@3.1/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token). Ensure that the PAT is created with the required scopes:
   - `public_repo`
   - `repo:status`
   - `user:email`
   - `write:discussion`
1. Return to Semgrep AppSec Platform and enter the personal access token generated into the **Access token** field.
1. Enter your GHE Server base URL into the **URL** field.
1. Ensure that your SCM integration successfully detects repositories by setting up a CI job. Do the following steps **for each repository** you want to scan:
        1. Commit a `semgrep.yml` configuration file into the `.github/workflows` folder. Refer to [Sample CI configurations](/docs/semgrep-ci/sample-ci-configs#github-actions) for a template you can copy and customize.
        2. The CI job starts automatically to establish a connection with Semgrep AppSec Platform. Upon establishing a connection, your repository appears in **Semgrep AppSec Platform > [Projects](https://semgrep.dev/orgs/-/projects)** page.

</TabItem>

</Tabs>

### GitLab Self-Managed Plans

This section is applicable to users with subscriptions to any **GitLab self-managed plan**.

Connect Semgrep and GitLab Self-Managed by creating a PAT and setting it in Semgrep AppSec Platform:

1. Create a PAT by following the steps outlined in this [guide to creating a PAT](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html). Ensure that the PAT is created with the required `api` scope.
1. Sign in to [Semgrep AppSec Platform](https://semgrep.dev/login).
3. Click **<i class="fa-solid fa-gear"></i> Settings > Source Code Managers > Add GitLab Self-Managed** and enter the personal access token generated into the **Access token** field.
3. Enter your GLSM base URL into the **URL** field.
4. Ensure that your SCM integration successfully detects repositories by setting up a CI job. Do the following steps **for each repository** you want to scan:
    1. Create or edit your `.gitlab-ci.yml` configuration file to add Semgrep as part of your GitLab CI/CD pipeline. Refer to [Sample CI configurations](/docs/semgrep-ci/sample-ci-configs#gitlab-cicd) for a template you can copy and customize.
    2. Commit the updated `.gitlab-ci.yml` file.
    3. The CI job starts automatically to establish a connection with Semgrep AppSec Platform. Alternatively, if it does not start automatically, start the job from the GitLab CI/CD interface. Upon establishing a connection, your repository appears in **Semgrep AppSec Platform > [Projects](https://semgrep.dev/orgs/-/projects)** page.


## Next steps

- Optional: If you want to set up SSO to manage your users, see [<i class="fa-regular fa-file-lines"></i> SSO authentication](/deployment/sso).
- You are ready to scan your org's repositories with Semgrep.
