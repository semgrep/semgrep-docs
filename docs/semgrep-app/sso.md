---
slug: sso
append_help_link: true
description: "SSO configuration instruction"
title: Single-sign on (SSO) configuration
hide_title: true
tags:
    - Semgrep App
    - Team & Enterprise Tier
---

<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>

import MoreHelp from "/src/components/MoreHelp"

#  Single-sign on (SSO) configuration

**SSO (single sign-on)** is a **Team/Enterprise tier feature**. Semgrep supports [OAuth2/OIDC](#oauth2oidc) and [SAML 2.0](#saml-20).

## OAuth2/OIDC

OAuth2/OIDC is configured through the **Semgrep App Dashboard**. 

To set up SSO:

1. From the **App Dashboard**, click on **Settings > Configure SSO: OpenID**.
2. Copy the `Provider ID` and `Redirect URI`.
![Finding providerId and RedirectURL via the Semgrep App](/img/sso-finding-providerId-and-Redirect-URL.png "Finding Provider ID and RedirectURI via the Semgrep App")
3.Generate a `Client ID` and `Client Secret` through your authentication provider by pasting `Provider ID` and `Redirect URI` values as needed.
![Generating Client ID and Client Secret via the Okta](/img/sso-clientID-clientSecret.png "Generating Client ID and Client Secret through Okta")
4. From your authentication provider, copy the values for `Base URL/Domain` and `Email Domain` to Semgrep's Configure SSO: OpenID tab. `Base URL/Domain` is `Okta domain` for Okta SSO.
5. Provide a descriptive `Display Name`.
![Providing the Base URL/Domain, Display Name, and Email Domain](/img/sso-providing-BaseURL-DisplayName-EmailDomain.png "Providing the Base URL/Domain, Display Name, and Email Domain")

In case you encounter issues during the setup process, please reach out to [support@r2c.dev](mailto:support@r2c.dev) for assistance.

## SAML 2.0

SAML2.0 is configured through the **Semgrep App Dashboard**. 

To set up SSO:

1. From your **authentication provider**, create the **SAML app**.
![Creating SAML app through Okta](/img/saml-creating-app.png "Creating SAML app through Okta")
2. From the **App Dashboard**, click on **Settings > Configure SSO: SAML**.
3. Copy the `Provider ID`, the `Single sign on URL`, and `Audience URI`. Paste the values as needed in your authentication provider.
![Finding Provider ID, Single sign on URL, and Audience URI via the Semgrep App](/img/saml-finding-providerId-SsoURL-and-AudienceURI.png "Finding Provider ID, Single sign on URL, and Audience URI via the Semgrep App")
4. From your authentication provider, add in two attribute statements `name` and `email`.
![Filling in attribute statements in Okta](/img/saml-attribute-statements.png "Filling in attribute statements through Okta")
5. From your authentication provider, copy your `IdP SSO URL`, `IdP Issuer ID`, and `X509 Certificate` to Semgrep's Configure SSO: SAML tab.
![Finding IdP SSO URL, IdP Issuer ID, and X509 Certificate through Okta](/img/saml-copy-IdPSSO-IdPID-and-X509.png "Finding IdP SSO URL, IdP Issuer ID, and X509 Certificate through Okta")
![Filling in Idp SSO URL, Idp Issuer ID, and X509 Certificate on Semgrep](/img/saml-filling-IdpSSO-IdpID-X509.png "Filling in Idp SSO URL, Idp Issuer ID, and X509 Certificate on Semgrep")
6. Provide a descriptive `Display Name`.
![Providing the Base URL/Domain, Display Name, and Email Domain](/img/sso-providing-BaseURL-DisplayName-EmailDomain.png "Providing the Base URL/Domain, Display Name, and Email Domain")

If you encounter issues during the setup process, reach out to [support@r2c.dev](mailto:support@r2c.dev) for assistance.

### Setting up SAML SSO with Azure Active Directory

<!--
Semgrep App doesn't have an integration app in Azure AD the way it does with Slack and GitHub.
So, the user has to create a custom app (integration) for SAML SSO.
We only use SOME steps in the documentation for Azure, so we'll have to make our own guide.

The following references are used:

-->

:::info Prerequisites
* An existing Azure Active Directory account.
* Sufficient permissions within Azure Active Directory to create Enterprise Apps. See [Azure AD roles](https://learn.microsoft.com/en-us/azure/active-directory/roles/permissions-reference).
:::

Setting up SAML SSO using Azure Active Directory (Azure AD) consists of the following general steps:

1. Creating a custom **Enterprise App** within Azure Active Directory.
2. Setting up SAML SSO for your new Enterprise App.
3. Adding users to your new Enterprise App.

#### Creating a custom Enterprise App

<!-- Rather than using portal.azure.com, which takes us to Azure Dashboard, sign in straight away to Azure AD -->

1. Sign in to the [Azure AD portal](https://aad.portal.azure.com/).
2. Under **Manage**, click **Enterprise applications**.
3. Click **New application** > **Create your own application**. A menu appears.
![Screenshot of create your own Application page in Azure AD](/img/azure-create-application.png#bordered)
4. Give your new application a name, such as `Semgrep SAML`.
5. Select **Integrate any other application you don't find in the gallery (non-gallery)**.
6. Click **Create**. This takes you to your new Enterprise Application's page.

You have now created a custom Enterprise App for Semgrep to integrate into Azure AD. This enables you to set up SAML SSO.

#### Setting up SAML SSO for your new Enterprise App

1. From your new Enterprise App's page, Click **Single-sign on** > **SAML** tile. This takes you to the **Set up Single Sign-On with SAML** page.
![Screenshot of your Enterprise App's page](/img/azure-select-sso.png#bordered)
2. Under the **Basic SAML Configuration** form, click **Edit** to enter values for **Entity ID** and **Reply URL**. These values are retrieved from Semgrep App by performing the following steps:
    1. Go to Semgrep App [Settings](https://semgrep.dev/orgs/-/settings/sso) page, and then click **SAML2** under **SSO Method** to display the SAML2 form.
    2. Copy the **Audience URL** value from Semgrep App, then in **Basic SAML Configuration**, under **Identifier (Entity ID)** click the **Add identifier** and paste in the URL.
    3. Copy the **SSO URL** value from Semgrep App, then in **Basic SAML Configuration**, under **Reply URL (Assertion Consumer Service URL)** click the **Add reply URL** and paste in the URL.
3. In the **Basic SAML Configuration** form, click **Save**.
4. Under the **Attributes & Claims** form, click **Edit** > **Add new claim**.
    1. Enter `name` in the **Name** field.
    2. From the **Source attribute** drop-down box, select `user.givenname`.
    ![Screenshot of create your own Application page in Azure AD](/img/azure_ad-add-claim.png#bordered)
4. Under the **User Attributes & Claims** form, click **Edit** < **Add new claim**.
    1. Enter `email` in the **Name** field.
    2. From the **Source attribute** drop-down box, select `user.email`.
6. Fill out the values required by Semgrep App's SAML2 form (**IdP SSO URL**, **IdP Issuer ID**, **X.509 Certificate**) by copying the values from Azure AD's **Set up Single Sign-On with SAML** page. Perform the following steps:
    1. Copy the **Login URL** value from Azure AD to **IDP SSO URL**. 
    2. Copy **Azure AD Identifier** value to **IdP Issuer ID**.
    3. Click **Download** next to **Certificate (Base64)**.
    4. Copy the contents of the downloaded certificate to **X.509 Certificate**. 
    7. At the beginning of Semgrep App's SSO form, fill out **Email Domain** and **Display Name**.
8. Click **Create/Update Auth Provider** at the beginning of of Semgrep App's SAML2 form.

You have now set up SAML configuration between Azure AD and Semgrep App.

#### Adding users to your new Enterprise App

To add users to the application in so they can log in with their domain emails, refer to [Assign users and groups to an application](https://learn.microsoft.com/en-us/azure/active-directory/manage-apps/assign-user-or-group-access-portal).

<MoreHelp />
