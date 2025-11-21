---
slug: sso
append_help_link: true
description: "SSO configuration instructions."
title: SSO authentication
hide_title: true
tags:
    - Deployment
    - Semgrep AppSec Platform
    - SSO
---

# Single-sign on (SSO) configuration

:::note Your deployment journey
- You have gained the necessary [resource access and permissions](/deployment/checklist) required for deployment.
- You have [created a Semgrep account and organization](/deployment/create-account-and-orgs).
- For GitHub and GitLab users: You have [connected your source code manager](/deployment/connect-scm).
:::

This article walks you through single-sign on (SSO) configuration. Semgrep supports SSO through [OpenID Connect / OAuth 2.0](#openid-connect--oauth-20) and [SAML 2.0](#saml-20).

After setting up SSO, users are provisioned and managed on your IdP. Semgrep grants access to the deployment to any user at the configured domain who logs in and has the correct permissions in the IdP.

## OpenID Connect / OAuth 2.0

:::note Microsoft Entra ID
Semgrep AppSec Platform does not support using OpenID with Microsoft Entra ID. Follow the instructions to [set up SAML SSO with Microsoft Entra ID](/kb/semgrep-appsec-platform/saml-microsoft-entra-id) instead.
:::

To set up SSO in Semgrep AppSec Platform:

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login).
1. Go to [**Settings > Access > Login methods**](https://semgrep.dev/orgs/-/settings/access/loginMethods).
1. In the **Single sign-on (SSO)** section, provide a valid **Email domain**, then click **Initialize**.
1. The **Configure Single Sign-On** dialog appears. Begin by selecting your identity provider, or choose **Custom OIDC**.
1. Follow the instructions provided on the subsequent **Configure Single Sign-On** dialog pages to complete this process. When you've completed the required steps, verify that the **Connection details** shown on the **Connection activated** screen are correct, and use **Test sign-in** to test the connection.
1. To use the new connection, log out of Semgrep, then log back in using SSO.

If you encounter issues during the setup process, please [reach out to support](/support) for assistance.

## SAML 2.0

:::note Google Workspace SAML
If you're using Google Workspace SAML, see [SAML Single Sign-on with Google Workspace](/docs/kb/semgrep-appsec-platform/saml-google-workspace) for specific guidance.
:::

SAML2.0 is configured through **Semgrep AppSec Platform**. To set up SSO:

1. Create a SAML app with your authentication provider.
1. With your authentication provider, add in two attribute statements: `name` and `email`.
1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login).
1. Go to [**Settings > Access > Login methods**](https://semgrep.dev/orgs/-/settings/access/loginMethods).
1. In the **Single sign-on (SSO)** section, provide a valid **Email domain**, then click **Initialize**.
1. The **Configure Single Sign-On** dialog appears to guide you through the remaining configuration steps. Begin by selecting your identity provider, or choose **Custom SAML**.
1. Follow the instructions provided on the subsequent **Configure Single Sign-On** dialog pages to complete this process. When you've completed the required steps, verify that the **Connection details** shown on the **Connection activated** screen are correct, and use **Test sign-in** to test the connection.
1. To use the new connection, log out of Semgrep, then log back in using SSO.

If you encounter issues during the setup process, [reach out to support](/support) for assistance.

:::note Admin and org owner accounts
By default, Semgrep creates new SSO accounts with the **Member** role assigned. You can change the default role assigned to a new user by going to **[Settings > Access > Defaults](https://semgrep.dev/orgs/-/settings/access/defaults)**.

If you're an admin setting up SSO, and Semgrep creates an SSO account for you  with the role of **Member**, you can elevate the permissions granted to your SSO account. To do so, log in to Semgrep with your admin account using the original login method, then [change the role](https://semgrep.dev/orgs/-/settings/access/members) of your newly created SSO account to **Admin**.
:::

## Turn off sign in with GitHub / GitLab

If you have SSO enabled, you can turn off login using GitHub or GitLab credentials. Doing so forces members of your organization to log in using an email address with an approved domain.

1. Sign in to your [Semgrep account](https://semgrep.dev/login).
2. Navigate to [**Settings > Access > Login methods**](https://semgrep.dev/orgs/docs-test/settings/access/loginMethods).
3. GitHub users: Click the **GitHub SSO** <i class="fa-solid fa-toggle-large-on"></i> toggle to turn off logins using GitHub.
4. GitLab users: Click the **GitLab SSO** <i class="fa-solid fa-toggle-large-on"></i> toggle to turn off logins using GitLab.

:::warning
Ensure that you have at least one user who can log in as an admin through SSO before disabling sign in with GitHub or GitLab.
:::

## See also

- [SAML SSO with Google Workspace](/docs/kb/semgrep-appsec-platform/saml-google-workspace)
- [SAML SSO with Microsoft Entra ID](/docs/kb/semgrep-appsec-platform/saml-microsoft-entra-id)
