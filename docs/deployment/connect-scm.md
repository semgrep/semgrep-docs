---
slug: connect-scm 
title: Connect a source code manager
hide_title: true
description: Connect a GitHub or GitLab organization to manage user authentication.
tags:
  - Semgrep Cloud Platform
  - Team & Enterprise Tier
  - Deployment
---

# Connect a source code manager

:::note Your deployment journey
- You have [<i class="fa-regular fa-file-lines"></i> created a Semgrep account and organization](/deployment/create-account-and-orgs). 
:::

Linking a source code manager provides the following benefits:

- Allows the Semgrep org membership to be managed by GitHub or GitLab.
- For GitHub users:
    - Provides Semgrep access to post PR or MR comments.
    - For GitHub Actions users: Enables you to add a Semgrep CI job to repositories in bulk.

You can only connect your Semgrep organization to the source code manager that you originally logged in with. If your organization uses both GitHub and GitLab to manage source code, log in with the source code manager that you would prefer to use to manage Semgrep org membership. You can still scan repositories from other sources.

The process to connect a source code manager depends on whether your SCM tool is cloud-hosted by the service provider, hosted on-premise, or hosted as a single-tenant by the service provider.

:::note Review necessary permissions 
Refer to the [<i class="fa-regular fa-file-lines"></i> Pre-deployment checklist](/deployment/deployment-checklist) to ensure you have permissions necessary to perform these steps.
:::

## Connect to cloud-hosted orgs

To connect your SCM:

1. Sign in to Semgrep Cloud Platform.
2. On the sidebar, click **the organization account** you want to make a connection for.
3. Click **Settings** > **Source Code Managers**.
4. Click on your source code manager, for example, **Connect to GitHub**.
![Source code manager tab](/img/source-code-manager.png#md-width)
5. Follow the prompts in the Cloud Platform and select an organization or group to link.
6. After a successful link, you are signed out of Semgrep Cloud Platform automatically, as your credentials have changed after linking an organization.
7. Sign back in to Semgrep Cloud Platform.

You have successfully connected an org in Semgrep Cloud Platform with an organization in your source code management tool.

## Connect to on-premise GitHub or GitLab orgs

### Applicable plans

| GitHub | GitLab |
| ------ | ------ |
| GitHub Enterprise Server       | Any GitLab Self Managed plan        |

### Table of required scopes for PATs

Semgrep Cloud Platform requires personal access tokens (PATs) with assigned scopes. These scopes grant necessary permissions to the PAT and vary depending on the user's plan.

| GitHub Enterprise Server          | GitLab Self-Managed        |
|:---------------------------|:---------------------------|
| <ul><li>`public_repo`</li> <li>`repo:status`</li> <li>`user:email`</li> <li>`write:discussion`</li></ul> | `api` |

### Make the connection

Integrate Semgrep into these custom source code management (SCM) tools by following the steps below:

1. Sign in to [Semgrep Cloud Platform](https://semgrep.dev/login).
2. Click **Settings** > **Source Code Managers**.
![Source code manager tab](/img/source-code-manager.png#md-width)
3. Select your source code manager.
4. For **GitHub Enterprise Server**, follow these steps:
    1. Create a PAT by following the steps outlined in this [guide to creating a PAT](https://docs.github.com/en/enterprise-server@3.1/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token). Ensure that the PAT is **[created with the required scopes](../scm/#table-of-required-scopes-for-pats)**.
    2. Enter the personal access token generated into the **Access token** field.
    3. Enter your GHE Server base URL into the **URL** field.
    4. Ensure that your SCM integration successfully detects repositories by setting up a CI job for any repository you want to scan:
        1. Commit a `semgrep.yml` configuration file into the `.github/workflows` folder. Refer to [Sample CI configurations](/docs/semgrep-ci/sample-ci-configs#github-actions) for a template you can copy and customize. 
        2. The CI job starts automatically to establish a connection with Semgrep Cloud Platform. Upon establishing a connection, your repository appears in **Semgrep Cloud Platform > [Projects](https://semgrep.dev/orgs/-/projects)** page.
5. For **GitLab Self Managed**, follow these steps:
    1. Create a PAT by following the steps outlined in this [guide to creating a PAT](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html). Ensure that the PAT is **[created with the required scopes](../scm/#table-of-required-scopes-for-pats)**.
    2. Enter the personal access token generated into the **Access token** field.
    3. Enter your GLSM base URL into the **URL** field.
    4. Ensure that your SCM integration successfully detects repositories by setting up a CI job for any repository you want to scan:
        1. Create or edit your `.gitlab-ci.yml` configuration file to add Semgrep as part of your GitLab CI/CD pipeline. Refer to [Sample CI configurations](/docs/semgrep-ci/sample-ci-configs#gitlab-cicd) for a template you can copy and customize.
        2. Commit the updated `.gitlab-ci.yml` file.
        3. The CI job starts automatically to establish a connection with Semgrep Cloud Platform. Alternatively, if it does not start automatically, start the job from the GitLab CI/CD interface. Upon establishing a connection, your repository appears in **Semgrep Cloud Platform > [Projects](https://semgrep.dev/orgs/-/projects)** page.

## Next steps

- Optional: If you want to set up SSO to manage your users, see [<i class="fa-regular fa-file-lines"></i> SSO authentication](/deployment/sso).
- You are ready to start your first remote scan.
