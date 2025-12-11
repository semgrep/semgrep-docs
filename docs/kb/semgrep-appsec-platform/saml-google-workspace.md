---
description: Learn how to set up SAML access to Semgrep AppSec Platform with Google Workspace.
tags:
  - Semgrep AppSec Platform
  - SSO
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# SAML SSO with Google Workspace

This article describes how to set up SAML Single Sign-on for Semgrep AppSec Platform with Google Workspace, including how to set up the necessary attribute mappings.

<Tabs
    defaultValue="current"
    values={[
    {label: 'Guided setup (beta)', value: 'current'},
  {label: 'Legacy manual configuration', value: 'legacy'},
    ]}
>

<TabItem value='current'>

This article describes how to set up SAML Single Sign-on for Semgrep AppSec Platform with Google Workspace, including how to set up the necessary attribute mappings.

Ensure that you are an admin for both your Semgrep deployment and your Google Workspace account.

## Google Workspace configuration

1. [Set up a custom SAML app](https://support.google.com/a/answer/6087519?hl=en#zippy=%2Cstep-add-the-custom-saml-app) in Google Workspace. The default **Name ID** is the primary email, and this value is optimal for use with Semgrep AppSec Platform.
2. When you reach the **Add mapping** step of the instructions to set up a custom SAML app, add the attribute statements that Semgrep AppSec Platform requires:
    | Name | Value |
    | - | - |
    | id | `user.login` **or** `user.email` |
    | email | `user.email` |
    | firstName | `user.firstName` |
    | lastName | `user.lastName` |

## Semgrep configuration

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login).
1. Go to **[Settings > Access > Login methods](https://semgrep.dev/orgs/-/settings/access/loginMethods)**.
In the **Single sign-on (SSO)** section, provide a valid **Email domain**, then click **Initialize**.
1. The **Configure Single Sign-On** dialog appears to guide you through the remaining configuration steps. Begin by selecting **Custom SAML**.
1. Follow the instructions provided on the subsequent **Configure Single Sign-On** dialog pages to complete this process. When you've completed the required steps, verify that the **Connection details** shown on the **Connection activated** screen are correct, and use **Test sign-in** to test the connection.
1. To use the new connection, log out of Semgrep, then log back in using SSO.

</TabItem>

<TabItem value='legacy'>

Follow these steps:

1. [Set up a custom SAML app](https://support.google.com/a/answer/6087519?hl=en#zippy=%2Cstep-add-the-custom-saml-app) in Google Workspace. The default **Name ID** is the primary email, and this value is optimal for use with Semgrep AppSec Platform.
2. When you reach the **Add mapping** step of the instructions to set up a custom SAML app, add the two attribute statements that Semgrep AppSec Platform requires: `name` and `email`.
   * The attribute mapped to `email` should be the primary email.
   * The attribute mapped to `name` should be some form of the user's name. You can use a default attribute like the user's first name, or create a custom attribute for their full name.
      ![Attribute mappings](/img/kb/google_attributes.png)
3. Sign in to Semgrep AppSec Platform.
4. Navigate to **[Settings > Access > Login methods](https://semgrep.dev/orgs/-/settings/access/loginMethods)**.
5. Click **Add SSO configuration** and select **SAML2 SSO**.
6. Provide a **Display name** and your **Email domain**.
7. Copy the **SSO URL** and **Audience URL (SP Entity ID)**, and provide them to Google Workspace as the **ACS URL** and **Entity ID**, respectively.
8. Copy your IDP metadata, including the SSO URL and Entity ID and the x509 certificate, from the custom SAML app in Google Workspace.
9. Enter these in Semgrep AppSec Platform as the **IdP SSO URL** and **IdP Issuer ID** values respectively, and upload or paste the X509 Certificate.
10. Click **Save** to proceed.

</TabItem>
</Tabs>
