---
description: Learn how to set up SAML access to Semgrep AppSec Platform with Microsoft Entra ID.
tags:
  - Semgrep AppSec Platform
  - SSO
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# SAML SSO with Microsoft Entra ID

This article describes how to set up SAML Single Sign-on for Semgrep AppSec Platform with Microsoft Entra ID.

<!--
Semgrep AppSec Platform doesn't have an integration app in Microsoft Entra ID the way it does with Slack and GitHub.
So, the user has to create a custom app (integration) for SAML SSO.
We only use SOME steps in the documentation for Azure, so we'll have to make our own guide.

The following references are used:

-->

:::info Prerequisites
* An existing Microsoft Entra ID account.
* Sufficient permissions within Microsoft Entra ID to create enterprise apps. See [Microsoft Entra ID roles](https://learn.microsoft.com/en-us/azure/active-directory/roles/permissions-reference).
* Admin privileges for your Semgrep deployment.
:::

Setting up SAML SSO using Microsoft Entra ID consists of the following general steps:

1. Create a custom **enterprise app** within Microsoft Entra ID.
2. Set up SAML SSO for your new enterprise app.
3. Configure Semgrep.
4. Add users to your new enterprise app.

## Create a custom enterprise app

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

## Set up SAML SSO for your new enterprise app

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

## Configure Semgrep

<Tabs
    defaultValue="current"
    values={[
    {label: 'Guided setup (beta)', value: 'current'},
  {label: 'Legacy manual configuration', value: 'legacy'},
    ]}
>

<TabItem value='current'>

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login).
1. Go to [**Settings > Access > Login methods**](https://semgrep.dev/orgs/-/settings/access/loginMethods).
1. In the **Single sign-on (SSO)** section, provide a valid **Email domain**, then click **Initialize**.
1. The **Configure Single Sign-On** dialog appears to guide you through the remaining configuration steps. Begin by selecting your identity provider, or choose **Custom SAML**.
1. Follow the instructions provided on the subsequent **Configure Single Sign-On** dialog pages to complete this process. When you've completed the required steps, verify that the **Connection details** shown on the **Connection activated** screen are correct, and use **Test sign-in** to test the connection.
1. To use the new connection, log out of Semgrep, then log back in using SSO.

</TabItem>

<TabItem value='legacy'>

1. Navigate to Semgrep AppSec Platform, and provide the values required by the SAML2 form:
    1. Provide the **Display name** and the **Email domain** you are using for the integration.
    2. Copy the **Login URL** value from Microsoft Entra ID and paste it in into Semgrep AppSec Platform's **IDP SSO URL** field.
    3. Copy and paste the **Microsoft Entra ID Identifier** value into Semgrep AppSec Platform's **IdP Issuer ID** field.
    4. In Entra ID's **SAML-based Sign-on** page, click **Download** to obtain the **Certificate (Base64)**.
    5. In Semgrep AppSec Platform, under **Upload/Paste certificate**, click **Browse** and then select the certificate you downloaded.
   ![Semgrep AppSec Platform's SAML2 configuration screen](/img/entra-5.png#md-width)
2.  Select the box next to **This SSO supports non-password authentication mechanisms (e.g. MFA, X509, PasswordLessPhoneSignin)** if applicable.
3. Click **Save** to proceed.

</TabItem>
</Tabs>

## Add users to your new enterprise app

To add users to the application in so they can log in with their domain emails, refer to [Assign users and groups to an application](https://learn.microsoft.com/en-us/azure/active-directory/manage-apps/assign-user-or-group-access-portal).
