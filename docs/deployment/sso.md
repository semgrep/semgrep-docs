---
slug: sso
append_help_link: true
description: "SSO configuration instructions."
title: SSO authentication
hide_title: true
tags:
    - Deployment
    - Semgrep AppSec Platform
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
Semgrep AppSec Platform does not support using OpenID with Microsoft Entra ID. Follow the instructions for [setting up SAML SSO with Microsoft Entra ID](#set-up-saml-sso-with-microsoft-entra-id) instead.
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
4. Return to Semgrep AppSect Platform, and paste the **IdP SSO URL** and **IdP Issuer ID** values, and upload your **X509 Certificate**.
    ![Filling in IdP SSO URL, IdP Issuer ID, and X509 Certificate on Semgrep](/img/saml-filling-IdpSSO-IdpID-X509.png#md-width)
5. Select the box next to **This SSO supports non-password authentication mechanisms (e.g. MFA, X509, PasswordLessPhoneSignin)** if applicable.
6. Click **Save** to proceed.

If you encounter issues during the setup process, reach out to [support@semgrep.com](mailto:support@semgrep.com) for assistance.

### Set up SAML SSO with Microsoft Entra ID

<!--
Semgrep AppSec Platform doesn't have an integration app in Microsoft Entra ID the way it does with Slack and GitHub.
So, the user has to create a custom app (integration) for SAML SSO.
We only use SOME steps in the documentation for Azure, so we'll have to make our own guide.

The following references are used:

-->

:::info Prerequisites
* An existing Microsoft Entra ID account.
* Sufficient permissions within Microsoft Entra ID to create enterprise apps. See [Microsoft Entra ID roles](https://learn.microsoft.com/en-us/azure/active-directory/roles/permissions-reference).
:::

Setting up SAML SSO using Microsoft Entra ID consists of the following general steps:

1. Create a custom **enterprise app** within Microsoft Entra ID.
2. Set up SAML SSO for your new enterprise app.
3. Add users to your new enterprise app.

#### Create a custom enterprise app

<!-- Rather than using portal.azure.com, which takes us to Azure Dashboard, sign in straight away to Microsoft Entra ID -->

1. Sign in to the [Microsoft Entra admin center](https://entra.microsoft.com/).
2. Use the search bar to find and navigate to **enterprise applications**.
   ![Microsoft Entra admin center's Enterprise applications screen](/img/entra-1.png#md-width)
3. Click **New application** > **Create your own application**. A menu appears.
   ![Create your own application screen](/img/entra-2.png#md-width)
4. Name your new application something like `Semgrep SAML`.
5. Select **Integrate any other application you don't find in the gallery (non-gallery)**.
6. Click **Create**. This takes you to your new enterprise application's page.

You have now created a custom enterprise app for Semgrep to integrate with Microsoft Entra ID. This enables you to set up SAML SSO.

#### Set up SAML SSO for your new enterprise app

1. From your new enterprise app's page, go to **Single-sign on** > **SAML**.
   ![Enterprise application's Single-sign on menu option](/img/entra-3.png#md-width)
2. When prompted to **Select a single sign-on method**, select **SAML**. You are redirected to the **SAML-based Sign-on** page.
   ![SAML-based Sign-on screen](/img/entra-4.png#md-width)
3. In the **Basic SAML Configuration** section, click **Edit**. Provide the **Entity ID** and **Reply URL**. You can retrieve these values from Semgrep AppSec Platform by performing the following steps:
    1. Sign in to Semgrep AppSec Platform.
    2. Navigate to **[Settings > Access > Login methods](https://semgrep.dev/orgs/-/settings/access/loginMethods)**.
    3. Click **Add SSO configuration** and select **SAML2 SSO**.
    4. Copy the **Audience URL (SP Entity ID)** value from Semgrep AppSec Platform. Return to **Basic SAML Configuration**. Click **Add identifier** to paste this value as the **Identifier (Entity ID)**.
    5. Copy the **SSO URL** value from Semgrep AppSec Platform. Return to **Basic SAML Configuration**. Click **Add reply URL** to paste this value as the **Reply URL (Assertion Consumer Service URL)**.
4. Click **Save** and close out of **Basic SAML Configuration**.
5. In the **Attributes and Claims** section, click **Edit**. You must add two claims. To add your first claim:
    1. Click **Add new claim**.
    2. Enter `name` in the **Name** field.
    3. For the **Source attribute** drop-down box, select `user.displayname`.
    4. Click **Save**.
6. To add your second claim:
    1. Click **Add new claim**.
    2. Enter `email` in the **Name** field.
    3. From the **Source attribute** drop-down box, select `user.mail`.
    4. Click **Save**.
7. Close out of **Attributes & Claims**.
8. Navigate to Semgrep AppSec Platform, and provide the values required by the SAML2 form:
    1. Provide the **Display name** and the **Email domain** you are using for the integration.
    2. Copy the **Login URL** value from Microsoft Entra ID and paste it in into Semgrep AppSec Platform's **IDP SSO URL** field.
    3. Copy and paste the **Microsoft Entra ID Identifier** value into Semgrep AppSec Platform's **IdP Issuer ID** field.
    4. In Entra ID's **SAML-based Sign-on** page, click **Download** to obtain the **Certificate (Base64)**.
    5. In Semgrep AppSec Platform, under **Upload/Paste certificate**, click **Browse** and then select the certificate you downloaded.
   ![Semgrep AppSec Platform's SAML2 configuration screen](/img/entra-5.png#md-width)
9. Select the box next to **This SSO supports non-password authentication mechanisms (e.g. MFA, X509, PasswordLessPhoneSignin)** if applicable.
10. Click **Save** to proceed.

#### Add users to your new enterprise app

To add users to the application in so they can log in with their domain emails, refer to [Assign users and groups to an application](https://learn.microsoft.com/en-us/azure/active-directory/manage-apps/assign-user-or-group-access-portal).

## Turn off sign in with GitHub / GitLab

If you have SSO enabled, you can turn off login using GitHub or GitLab credentials. Doing so forces members of your organization to log in using an email address with an approved domain.

1. Sign in to your [Semgrep account](https://semgrep.dev/login).
2. Navigate to [**Settings > Access > Login methods**](https://semgrep.dev/orgs/docs-test/settings/access/loginMethods).
3. GitHub users: Click the **GitHub SSO** <i class="fa-solid fa-toggle-large-on"></i> toggle to turn off logins using GitHub.
4. GitLab users: Click the **GitLab SSO** <i class="fa-solid fa-toggle-large-on"></i> toggle to turn off logins using GitLab.

:::warning
Ensure that you have at least one user who can log in through SSO before disabling sign in with GitHub or GitLab.
:::
