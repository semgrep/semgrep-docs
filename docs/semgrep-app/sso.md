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

The following is a guide to set up Semgrep as an Enterprise App with SAML SSO using Azure's Active Directory service.

1.) To get started, navigate to **Azure Active Directory** from the Azure Dashboard.

2.) On the left-side menu, click **Enterprise Applications**.

![Selecting Enterprise Applications](/img/azure-enterprise-applications.png "Selecting Enterprise Applications")

3.) On the top bar, click **New Application**, then **Create your own application**. Give it a name, and check **Integrate any other application you don't find in the gallery (Non-gallery)**.

![Create a new Enterprise Application](/img/azure-create-application.png "Create a new Enterprise Application")

4.) On the left-side menu, click **Single sign-on**, then **SAML**. 

![Select "Single sign-on"](/img/azure-select-sso.png "Select "Single sign-on")
![Select "SAML"](/img/azure-select-saml.png "Select "SAML")

5.) Under **Basic Configuration**, you'll need to enter the `Entity ID` and the `Reply URL`. These are provided in the Semgrep App on the left-side **Settings** tab, under the **SSO** tab on the top, as `Audience URL` and `SSO URL`, respectively. Make sure you switch the provider type to **SAML2** in the SSO form in the Semgrep App.

![Adding "Entity ID" and "Reply URL" fields to the SSO config](/img/azure-sso-fields.png "Adding "Entity ID" and "Reply URL" fields to the SSO config")
!["Entity ID" and "Reploy URL" fields from within the App](/img/azure-sso-fields-2.png ""Entity ID" and "Reploy URL" fields from within the App")

6.) You'll need to add two attribute statements called `name` and `email`, making sure to set the `email` attribute to `user.mail`.

![Adding attribute statements to the SSO config](/img/azure-sso-attributes.png "Adding attribute statements to the SSO config")

7.) From within the Semgrep App, you'll need to add the `IdP SSO URL`, `IdP Issuer ID`, and `X.509 Certificate`. These can all be found in the Azure Single sign-on page; fill these fields with the `Login URL`, `Azure AD Identifier`, and `Certificate (Base64)`, respectively.

![Setting additional SSO form fields](/img/azure-sso-app-fields.png "Setting additional SSO form fields")

![Login URL, Azure AD Identifier, and Certificate in Azure](/img/azure-sso-app-fields-2.png "Login URL, Azure AD Identifier, and Certificate in Azure")

8.) At the top of the form, fill in your email domain and a display name for the SSO integration.

![Display name and email domain in the SSO form](/img/azure-sso-app-fields-3.png "Display name and email domain in the SSO form")

9.) Once all the fields are filled out, press the **Create/Update Auth Provider** button at the bottom of the form. You should see a green conformation message in the upper-left of the app to verify that we've recieved your SSO info.

![Submitting your SSO info in the App](/img/azure-sso-submit.png "Submitting your SSO info in the App")

You may still need to add users to the application in order for them to be able to log in with their domain emails. You can do this from the **Users and Groups** section on the left-side menu of your newly-created application.

![Giving users access to your Enterprise SSO App](/img/azure-sso-users.png "Giving users access to your Enterprise SSO App")



<MoreHelp />
