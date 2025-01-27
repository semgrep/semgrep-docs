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

## OpenID Connect / OAuth 2.0

:::warning
Semgrep AppSec Platform does not support using OpenID with Microsoft Entra ID. Follow the instructions to [set up SAML SSO with Microsoft Entra ID](/kb/semgrep-appsec-platform/saml-microsoft-entra-id) instead.
:::

To set up SSO in Semgrep AppSec Platform:

1. Sign in to Semgrep AppSec Platform.
2. Navigate to **[Settings > Access > Login methods](https://semgrep.dev/orgs/-/settings/access/loginMethods)**.
3. Click **Add SSO configuration** and select **OpenID SSO**.
4. Provide a **Display name** and the **Email domain**.
5. Copy the **Redirect URL**, and provide it to your authentication provider.
    ![SSO configuration form displaying the redirect URL](/img/sso-redirect-url.png#md-width)
6. Generate a **Client ID** and **Client Secret** through your authentication provider and paste these values into Semgrep.
    ![Generating Client ID and Client Secret via the Okta](/img/sso-clientID-clientSecret.png#md-width)
7. From your authentication provider, copy the **Base URL** value, and provide it to Semgrep. For example, if you're using Okta SSO, the base URL is the **Okta domain**.
8. Optional: provide the following values from your authentication provider if necessary:
   - **Well Known URL**
   - **Authorize URI**
   - **Token URI**
   - **Userinfo URI**
9.  Click **Save** to proceed.

If you encounter issues during the setup process, please reach out to [support@semgrep.com](mailto:support@semgrep.com) for assistance.

## SAML 2.0

SAML2.0 is configured through **Semgrep AppSec Platform**. To set up SSO:

1. Create a SAML app with your authentication provider.
    ![Creating SAML app through Okta](/img/saml-creating-app.png#md-width)
1. With your authentication provider, add in two attribute statements: `name` and `email`.
    ![Filling in attribute statements in Okta](/img/saml-attribute-statements.png#md-width)
1. Sign in to Semgrep AppSec Platform.
1. Navigate to **[Settings > Access > Login methods](https://semgrep.dev/orgs/-/settings/access/loginMethods)**.
1. Click **Add SSO configuration** and select **SAML2 SSO**.
1. Provide a **Display name** and the **Email domain**.
2. Copy the **SSO URL** and **Audience URL (SP Entity ID)**, and provide it to your authentication provider.
    ![Finding Single sign on URL, and Audience URI via Semgrep AppSec Platform](/img/saml-copy-urls.png#md-width)
3. From your authentication provider, copy your **IdP SSO URL** and **IdP Issuer ID** values, and download the **X509 Certificate**.
    ![Finding IdP SSO URL, IdP Issuer ID, and X509 Certificate through Okta](/img/saml-copy-IdPSSO-IdPID-and-X509.png#md-width)
4. Return to Semgrep AppSec Platform, and paste the **IdP SSO URL** and **IdP Issuer ID** values, and upload your **X509 Certificate**.
    ![Filling in IdP SSO URL, IdP Issuer ID, and X509 Certificate on Semgrep](/img/saml-filling-IdpSSO-IdpID-X509.png#md-width)
5. Select the box next to **This SSO supports non-password authentication mechanisms (e.g. MFA, X509, PasswordLessPhoneSignin)** if applicable.
6. Click **Save** to proceed.

If you encounter issues during the setup process, [reach out to support](/docs/support) for assistance.

:::note Admin and org owner accounts
By default, Semgrep creates new SSO accounts with the **Member** role assigned. You can change the default role assigned to a new user by going to [Settings > Access](https://semgrep.dev/orgs/-/settings/access/defaults).

If you're an admin setting up SSO, and Semgrep creates an SSO account for you  with the role of **Member**, you can elevate the permissions granted to your SSO account. To do so, log in to Semgrep with your admin account using the original login method, then [change the role](https://semgrep.dev/orgs/-/settings/access/members) of your newly created SSO account to **Admin**.
:::

## Turn off sign in with GitHub / GitLab

If you have SSO enabled, you can turn off login using GitHub or GitLab credentials. Doing so forces members of your organization to log in using an email address with an approved domain.

1. Sign in to your [Semgrep account](https://semgrep.dev/login).
2. Navigate to [**Settings > Access > Login methods**](https://semgrep.dev/orgs/docs-test/settings/access/loginMethods).
3. GitHub users: Click the **GitHub SSO** <i class="fa-solid fa-toggle-large-on"></i> toggle to turn off logins using GitHub.
4. GitLab users: Click the **GitLab SSO** <i class="fa-solid fa-toggle-large-on"></i> toggle to turn off logins using GitLab.

:::warning
Ensure that you have at least one user who can log in through SSO before disabling sign in with GitHub or GitLab.
:::

## See also

- [SAML SSO with Google Workspace](/docs/kb/semgrep-appsec-platform/saml-google-workspace)
- [SAML SSO with Microsoft Entra ID](/docs/kb/semgrep-appsec-platform/saml-microsoft-entra-id)