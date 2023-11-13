---
slug: sso
append_help_link: true
description: "SSO configuration instructions."
title: SSO configuration
hide_title: true
tags:
    - Semgrep Cloud Platform
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

Semgrep Cloud Platform supports SSO through [OpenID Connect / OAuth2](#openid-connect--oauth2) and [SAML 2.0](#saml-20).

:::warning
If you are planning to connect your Semgrep organization to your GitHub organization, follow the steps at [Creating a Semgrep organization account](/docs/semgrep-cloud-platform/user-management/#creating-a-semgrep-organization-account) first to connect to GitHub. Then, add SSO.

:::info
Add users through your Single Sign On provider without any additional steps in Semgrep Cloud Platform after you configure the SSO for your organization. The only required steps to ensure that users are added to Semgrep Cloud Platform are on the side of the SSO provider. There are **no** additional emails with links. When you follow the SSO steps, you are able to add users with one click. 
:::

## OpenID Connect / OAuth2

To set up SSO:

1. In Semgrep Cloud Platform, click **Settings** > **Access** > **[SSO](https://semgrep.dev/orgs/-/settings/access/sso)**, and then select **Add OpenID SSO**.
2. Copy the `Redirect URL`.
    ![Finding providerId and RedirectURL via the Semgrep Cloud Platform](/img/sso-redirect-url.png "Finding Provider ID and RedirectURI via the Semgrep Cloud Platform")
3. Generate a `Client ID` and `Client Secret` through your authentication provider and paste them.
    ![Generating Client ID and Client Secret via the Okta](/img/sso-clientID-clientSecret.png "Generating Client ID and Client Secret through Okta")
4. From your authentication provider, copy the values for `Base URL/Domain` and `Email Domain` to Semgrep's Configure SSO: OpenID tab. `Base URL/Domain` is `Okta domain` for Okta SSO.
5. Provide a descriptive `Display Name`.
    ![Providing the Base URL/Domain, Display Name, and Email Domain](/img/sso-display-name.png "Providing the Base URL/Domain, Display Name, and Email Domain")

In case you encounter issues during the setup process, please reach out to [support@semgrep.com](mailto:support@semgrep.com) for assistance.

## SAML 2.0

SAML2.0 is configured through the **Semgrep Cloud Platform Dashboard**. 

To set up SSO:

1. From your **authentication provider**, create the **SAML app**.
    ![Creating SAML app through Okta](/img/saml-creating-app.png "Creating SAML app through Okta")
2. From the **App Dashboard**, click on **Settings** > **Access** > **[SSO](https://semgrep.dev/orgs/-/settings/access/sso)**
3. Copy the `Single sign on URL`, and `Audience URI`. Paste the values as needed in your authentication provider. The Provider ID value will be your organization's slug in **Settings** > **Deployment**,
    ![Finding Single sign on URL, and Audience URI via the Semgrep Cloud Platform](/img/saml-copy-urls.png "Finding Single sign on URL, and Audience URI via the Semgrep Cloud Platform")
4. From your authentication provider, add in two attribute statements `name` and `email`.
    ![Filling in attribute statements in Okta](/img/saml-attribute-statements.png "Filling in attribute statements through Okta")
5. From your authentication provider, copy your `IdP SSO URL`, `IdP Issuer ID`, and `X509 Certificate` to Semgrep's Configure SSO: SAML tab.
    ![Finding IdP SSO URL, IdP Issuer ID, and X509 Certificate through Okta](/img/saml-copy-IdPSSO-IdPID-and-X509.png "Finding IdP SSO URL, IdP Issuer ID, and X509 Certificate through Okta")
    ![Filling in Idp SSO URL, Idp Issuer ID, and X509 Certificate on Semgrep](/img/saml-filling-IdpSSO-IdpID-X509.png "Filling in Idp SSO URL, Idp Issuer ID, and X509 Certificate on Semgrep")
6. Provide a descriptive `Display Name`.
    ![Providing the Base URL/Domain, Display Name, and Email Domain](/img/sso-display-name.png "Providing the Base URL/Domain, Display Name, and Email Domain")

If you encounter issues during the setup process, reach out to [support@semgrep.com](mailto:support@semgrep.com) for assistance.

### Setting up SAML SSO with Azure Active Directory

<!--
Semgrep Cloud Platform doesn't have an integration app in Azure AD the way it does with Slack and GitHub.
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
2. Under the **Basic SAML Configuration** form, click **Edit** to enter values for **Entity ID** and **Reply URL**. These values are retrieved from Semgrep Cloud Platform by performing the following steps:
    1. Go to Semgrep Cloud Platform [Settings](https://semgrep.dev/orgs/-/settings/access/sso) page, and then click **Add SAML2 SSO** to display the SAML2 form.
    2. Copy the **Audience URL** value from Semgrep Cloud Platform, then in **Basic SAML Configuration**, under **Identifier (Entity ID)** click the **Add identifier** and paste in the URL.
    3. Copy the **SSO URL** value from Semgrep Cloud Platform, then in **Basic SAML Configuration**, under **Reply URL (Assertion Consumer Service URL)** click the **Add reply URL** and paste in the URL.
3. In the **Basic SAML Configuration** form, click **Save**.
4. Under the **Attributes & Claims** form, click **Edit** > **Add new claim**.
    1. Enter `name` in the **Name** field.
    2. From the **Source attribute** drop-down box, select `user.givenname`.
    ![Screenshot of create your own Application page in Azure AD](/img/azure_ad-add-claim.png#bordered)
    3. Click **Save**.
4. Under the **Attributes & Claims** form, click **Edit** > **Add new claim**.
    1. Enter `email` in the **Name** field.
    2. From the **Source attribute** drop-down box, select `user.email`.
    3. Click **Save**.
6. Fill out the values required by Semgrep Cloud Platform's SAML2 form (**IdP SSO URL**, **IdP Issuer ID**, **X.509 Certificate**) by copying the values from Azure AD's **Set up Single Sign-On with SAML** page. Perform the following steps:
    1. Copy the **Login URL** value from Azure AD to **IDP SSO URL** in Semgrep Cloud Platform. 
    2. Copy **Azure AD Identifier** value to **IdP Issuer ID** in Semgrep Cloud Platform.
    3. In **Set up Single Sign-On with SAML**, next to **Certificate (Base64)** click **Download**.
    4. In Semgrep Cloud Platform, under **X.509 Certificate**, click **Browse** and then add the downloaded file. 
    7. At the beginning of Semgrep Cloud Platform's SSO form, fill out **Email Domain** and **Display Name**.
8. Click **Create/Update Auth Provider** at the beginning of of Semgrep Cloud Platform's SAML2 form.

You have now set up SAML configuration between Azure AD and Semgrep Cloud Platform.

#### Adding users to your new Enterprise App

To add users to the application in so they can log in with their domain emails, refer to [Assign users and groups to an application](https://learn.microsoft.com/en-us/azure/active-directory/manage-apps/assign-user-or-group-access-portal).

<MoreHelp />
