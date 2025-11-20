---
description: Learn how to set up SAML access to Semgrep AppSec Platform with Google Workspace.
tags:
  - Semgrep AppSec Platform
  - SSO
---

# SAML SSO with Google Workspace

This article describes how to set up SAML Single Sign-on for Semgrep AppSec Platform with Google Workspace, including how to set up the necessary attribute mappings.

Follow these steps:

1. [Set up a custom SAML app](https://support.google.com/a/answer/6087519?hl=en#zippy=%2Cstep-add-the-custom-saml-app) in Google Workspace. The default **Name ID** is the primary email, and this value is optimal for use with Semgrep AppSec Platform.
1. When you reach the **Add mapping** step of the instructions to set up a custom SAML app, add the two attribute statements that Semgrep AppSec Platform requires: `name` and `email`.
   * The attribute mapped to `email` should be the primary email.
   * The attribute mapped to `name` should be some form of the user's name. You can use a default attribute like the user's first name, or create a custom attribute for their full name.
      ![Attribute mappings](/img/kb/google_attributes.png)
1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login).
1. Go to **[Settings > Access > Login methods](https://semgrep.dev/orgs/-/settings/access/loginMethods)**.
1. In the **Single sign-on (SSO)** section, provide a valid **Email domain**, then click **Initialize**. The initialization process begins when you enter a valid domain, which is one that hasn't been registered with Semgrep.
1. The **Configure Single Sign-On** dialog appears to guide you through the remaining configuration steps. Begin by selecting **Google SAML** in the **Select your identity provider** dialog. Then, followed the steps displayed to complete the process.
1. When you've completed the required steps, you'll see the **Connection activated** screen. Verify that the **Connection details** are correct, and use **Test sign-in** to test the connection.
1. To use the new connection, log out of Semgrep, then log back in using SSO.
