# Integrating Semgrep into Source Code Management (SCM) tools

Semgrep App's Team tier supports repositories hosted on both GitHub Enterprise (GHE) and GitLab Self Managed (GLSM) plans. Create multiple integrations in different self-hosted or custom servers.


## Prerequisites

You need the following privileges and permissions to integrate Semgrep into GHE or GLSM servers:

* Permission to create a personal access token (PAT) for the repository to scan Semgrep on.
* Permission to add secrets into your [GitHub](https://docs.github.com/en/actions/security-guides/encrypted-secrets) or [GitLab](https://docs.gitlab.com/ee/ci/secrets/) environments.

## Integrating Semgrep into GHE and GLSM

Integrate Semgrep into these custom source code management (SCM) tools by following the steps below:

1. Sign in to [Semgrep App](https://semgrep.dev/login).
2. Click **[Settings](https://semgrep.dev/orgs/-/settings)** > **Create new parent organization**.
![Screenshot of settings for parent organization](img/app-parent-org.png "Screenshot of settings for parent organization")
3. Enter the name of your parent organization.
4. Sign out, then sign in again to enable SCM management.
5. Click **Settings** > **SCM management** > **Configure new SCM**.
![Screenshot of SCM configuration tab](img/app-scm.png)
6. Select your SCM provider.
7. For **GitHub Enterprise**, follow the steps below:
    1. Create a personal access token (PAT) by following the steps outlined in this [guide to creating a PAT](https://docs.github.com/en/enterprise-server@3.1/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).
    2. Enter the personal access token generated into the Access Token field.
    3. Enter your GHE base URL into the SCM Base URL.
8. For **GitLab Self Managed**, follow the steps below:
    4. Create a personal access token (PAT) by following the steps outlined in this [guide to creating a PAT](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html).
    5. Enter the personal access token generated into the Access Token field.
    6. Enter your GLSM base URL into the **SCM Base URL** field.
9. Ensure that your SCM integration successfully detects repositories by following the steps below:
    7. Click **Projects > Setup New Project**.
    8. Select your CI provider.
    9. Semgrep App detects repositories from your SCM integration.

## Additional references
* [Semgrep's May 2022 updates: DeepSemgrep, New Playground, and Self Managed GitHub and GitLab support](https://r2c.dev/blog/2022/semgreps-may-2022-updates/)
