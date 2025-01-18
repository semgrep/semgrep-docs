--
description: Learn how to set up SAML access to Semgrep AppSec Platform with Google Workspace.
tags:
  - Semgrep AppSec Platform
  - SSO
--

# SAML Single Sign-on with Google Workspace

The process of setting up SAML Single Sign-on for the Semgrep AppSec Platform with Google Workspace is fundamentally similar to the process for other providers. However, there are a few quirks of Google Workspace to account for.

Follow these steps:

1. [Set up a custom SAML app](https://support.google.com/a/answer/6087519?hl=en#zippy=%2Cstep-add-the-custom-saml-app) in Google Workspace. The default Name ID, primary email, is optimal for Semgrep AppSec Platform.
2. When you reach step 12, **Add mapping**, add the two attribute statements that Semgrep AppSec Platform requires: `name` and `email`.
   * The attribute mapped to `email` should be the primary email.
   * The attribute mapped to `name` should be some form of the user's name. You can use a default attribute like the user's first name, or create a custom attribute for their full name.
      ![Attribute mappings](/img/kb/google_attributes.png)
3. Sign in to Semgrep AppSec Platform.
4. Navigate to **[Settings > Access > Login methods](https://semgrep.dev/orgs/-/settings/access/loginMethods)**.
5. Click **Add SSO configuration** and select **SAML2 SSO**.
6. Provide a **Display name** and your email domain.
7. Copy the **SSO URL** and **Audience URL (SP Entity ID)**, and provide them to Google Workspace as the **ACS URL** and **Entity ID** respectively.
8. If you have not already, from the custom SAML app in Google Workspace, copy your IDP metadata, including the SSO URL and Entity ID and the x509 certificate.
9. Enter these in Semgrep AppSec Platform as the **IdP SSO URL** and **IdP Issuer ID** values respectively, and upload or paste the X509 Certificate.
10. Click **Save** to proceed.
