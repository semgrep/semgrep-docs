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

The only required steps to ensure that users are added to Semgrep AppSec Platform are on the side of the SSO provider. After setting up SSO, users are able to sign in to your Semgrep organizations by entering their SSO credentials.

Semgrep supports SSO through [OpenID Connect / OAuth 2.0](#openid-connect--oauth2) and [SAML 2.0](#saml-20).

## OpenID Connect / OAuth 2.0

To set up SSO:

1. In Semgrep AppSec Platform, click **Settings** > **Access** > **[SSO](https://semgrep.dev/orgs/-/settings/access/sso)**, and then select **Add OpenID SSO**.
2. Copy the `Redirect URL`.
    ![Finding providerId and RedirectURL via Semgrep AppSec Platform](/img/sso-redirect-url.png "Finding Provider ID and RedirectURI via Semgrep AppSec Platform")
3. Generate a `Client ID` and `Client Secret` through your authentication provider and paste them.
    ![Generating Client ID and Client Secret via the Okta](/img/sso-clientID-clientSecret.png "Generating Client ID and Client Secret through Okta")
4. From your authentication provider, copy the values for `Base URL/Domain` and `Email Domain` to Semgrep's Configure SSO: OpenID tab. `Base URL/Domain` is `Okta domain` for Okta SSO.
5. Provide a descriptive `Display Name`.
    ![Providing the Base URL/Domain, Display Name, and Email Domain](/img/sso-display-name.png "Providing the Base URL/Domain, Display Name, and Email Domain")

In case you encounter issues during the setup process, please reach out to [support@semgrep.com](mailto:support@semgrep.com) for assistance.

## SAML 2.0

SAML2.0 is configured through **Semgrep AppSec Platform**.

To set up SSO:

1. From your **authentication provider**, create the **SAML app**.
    ![Creating SAML app through Okta](/img/saml-creating-app.png "Creating SAML app through Okta")
2. From the **App Dashboard**, click **Settings** > **Access** > **[SSO](https://semgrep.dev/orgs/-/settings/access/sso)**
3. Copy the `Single sign on URL`, and `Audience URI`. Paste the values as needed in your authentication provider. The Provider ID value will be your organization's slug in **Settings** > **Deployment**,
    ![Finding Single sign on URL, and Audience URI via Semgrep AppSec Platform](/img/saml-copy-urls.png "Finding Single sign on URL, and Audience URI via Semgrep AppSec Platform")
4. From your authentication provider, add in two attribute statements `name` and `email`.
    ![Filling in attribute statements in Okta](/img/saml-attribute-statements.png "Filling in attribute statements through Okta")
5. From your authentication provider, copy your `IdP SSO URL`, `IdP Issuer ID`, and `X509 Certificate` to Semgrep's Configure SSO: SAML tab.
    ![Finding IdP SSO URL, IdP Issuer ID, and X509 Certificate through Okta](/img/saml-copy-IdPSSO-IdPID-and-X509.png "Finding IdP SSO URL, IdP Issuer ID, and X509 Certificate through Okta")
    ![Filling in IdP SSO URL, IdP Issuer ID, and X509 Certificate on Semgrep](/img/saml-filling-IdpSSO-IdpID-X509.png "Filling in Idp SSO URL, IdP Issuer ID, and X509 Certificate on Semgrep")
6. Provide a descriptive `Display Name`.
    ![Providing the Base URL/Domain, Display Name, and Email Domain](/img/sso-display-name.png "Providing the Base URL/Domain, Display Name, and Email Domain")

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
    1. Log in to Semgrep AppSec Platform and navigate to [**Settings** > **Access** > **SSO**](https://semgrep.dev/orgs/-/settings/access/sso) page.
    2. Click **Add SAML2 SSO**.
    3. Copy the **Audience URL** value from Semgrep AppSec Platform. Return to **Basic SAML Configuration**. Click **Add identifier** to paste this value as the **Identifier (Entity ID)**.
    4. Copy the **SSO URL** value from Semgrep AppSec Platform. Return to **Basic SAML Configuration**. Click **Add reply URL** to paste this value as the **Reply URL (Assertion Consumer Service URL)**.
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
 9.  Click **Save**. When prompted to confirm your SSO updates, click **Update**.

You have now set up SAML configuration between Microsoft Entra ID and Semgrep AppSec Platform.

#### Add users to your new enterprise app

To add users to the application in so they can log in with their domain emails, refer to [Assign users and groups to an application](https://learn.microsoft.com/en-us/azure/active-directory/manage-apps/assign-user-or-group-access-portal).
