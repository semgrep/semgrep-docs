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
2. Click **Enterprise applications**.
3. Click **New application** > **Create your own application**.
4. Give your new application a name, such as `Semgrep SAML`.
5. Click **Integrate any other application you don't find in the gallery (non-gallery)**.
6. Click **Create**. This takes you to your new Enterprise Application's page.

<!-- Should provide a screenshot to reassure users. -->

 You have now created a custom Enterprise App for Semgrep to integrate into Azure AD. This enables you to set up SAML SSO.

#### Setting up SAML SSO for your new Enterprise App

1. From your new Enterprise App's page, Click **Single-sign on** > **SAML** tile. This takes you to the **Set up Single Sign-On with SAML** page.
2. Under the **Basic SAML Configuration** form, click **Edit** to enter values for **Entity ID** and **Reply URL**. These values are retrieved from Semgrep App by performing the following steps:
    1. Go to Semgrep App [Settings](https://semgrep.dev/orgs/-/settings/sso) page, and then click **SAML2** under **SSO Method** to display the SAML2 form.
    2. From the SAML2 form, copy the **Audience URL** value and paste it into **Entity ID**.
    3. From the SAML2 form, copy the **SSO URL** value and paste it into **Reply URL**. [Add a screenshot here]
3. In the **Basic SAML Configuration** form, click **Save**.
4. Under the **User Attributes & Claims** form, click **Edit**.


#### Adding users to your new Enterprise App

To add users to the application in so they can log in with their domain emails, refer to [Assign users and groups to an application](https://learn.microsoft.com/en-us/azure/active-directory/manage-apps/assign-user-or-group-access-portal).










1. TODO You need to add two attribute statements called `name` and `email`, making sure to set the `email` attribute to `user.mail`. For help regarding **Attributes and Claims**, refer to TODO describe process.
1. In the Azure Single sign-on page, find the `Login URL`, `Azure AD Identifier`, and `Certificate (Base64)`. Paste them to your [Settings](https://semgrep.dev/orgs/-/settings/sso) page of SAML2 SSO as `IdP SSO URL` (`Login URL`), `IdP Issuer ID` (`Azure AD Identifier`), and TODO - specify that this needs to be a certificate which can be downloaded - `X.509 Certificate` (`Certificate (Base64)`). 
    ![Setting additional SSO form fields](/img/azure-sso-app-fields.png "Setting additional SSO form fields")
1. In Semgrep App Settings page, fill in your email domain (meaning everything after the `@` sign, for example email `hello@johndoe1700gmail.onmicrosoft.com` has a domain `johndoe1700gmail.onmicrosoft.com`) and a display name for the SSO integration.
    ![Display name and email domain in the SSO form](/img/azure-sso-app-fields-3.png "Display name and email domain in the SSO form")
1. Click the **Create/Update Auth Provider**. See a green confirmation message in the upper-left of the app to verify that we've recieved your SSO info.
    ![Submitting your SSO info in the App](/img/azure-sso-submit.png "Submitting your SSO info in the App")




<MoreHelp />
