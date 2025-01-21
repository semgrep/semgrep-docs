---
description: If needed, check the box to enable non-password authentication mechanisms on Semgrep AppSec Platform.
tags:
  - Semgrep AppSec Platform
  - SSO
  - SAML
---

# SAML SSO Error: Authentication method doesn't match requested

When logging in to Semgrep using SAML single-sign on (SSO), you may see the error `Authentication method doesn't match requested`:

![SAML auth method error](/img/kb/saml-auth-method-doesnt-match.png)

This error only occurs when starting sign-in from Semgrep. To prevent the error, start your sign-in from your IdP (SSO provider).

To fix this problem, you must be an `admin` in Semgrep AppSec Platform.

1. Sign in to [Semgrep AppSec Platform](https://semgrep.dev/login).
2. Click **<i class="fa-solid fa-gear"></i> Settings > Access > [SSO](https://semgrep.dev/orgs/-/settings/access/sso)**.
4. Check the box labeled **Check if your SSO supports non-password authentication mechanisms (e.g. MFA, X509, PasswordLessPhoneSignin)**.
4. Click **Save** to save this setting.

:::note Admin and org owner accounts
If you're an admin setting up SSO, Semgrep creates an SSO account for you that is a **Member** by default. To elevate the permissions granted to this account, log in to Semgrep with your admin account using the original login method, then change the role of your newly created SSO account to **Admin**.
:::