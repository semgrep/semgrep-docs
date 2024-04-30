---
description: If needed, check the box to enable non-password authentication mechanisms on Semgrep AppSec Platform.
tags:
  - Semgrep AppSec Platform
  - SSO
  - SAML
---

import MoreHelp from "/src/components/MoreHelp"

# SAML SSO Error: Authentication method doesn't match requested

When logging in to Semgrep using SAML single-sign on (SSO), you may see an error `Authentication method doesn't match requested`. The error might look something like this:

![SAML auth method error](/img/kb/saml-auth-method-doesnt-match.png)

This error only occurs when starting sign-in from Semgrep. To prevent the error, start your sign-in from your IdP (SSO provider).

To fix this problem, you must be an `admin` in Semgrep AppSec Platform.

1. Sign in to [Semgrep AppSec Platform](https://semgrep.dev/login).
2. Click **<i class="fa-solid fa-gear"></i> Settings > Access > [SSO](https://semgrep.dev/orgs/-/settings/access/sso)**.
4. Check the box labeled **Check if your SSO supports non-password authentication mechanisms (e.g. MFA, X509, PasswordLessPhoneSignin)**.
4. Click **Save** to save this setting.

<MoreHelp />