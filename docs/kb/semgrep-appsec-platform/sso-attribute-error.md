---
description: Ensure that you're sending the required name and email attributes to Semgrep AppSec Platform.
tags:
  - Semgrep AppSec Platform
  - SSO
  - SAML
---

import MoreHelp from "/src/components/MoreHelp"

# SAML SSO error BadRequest: Missing attribute

When setting up SAML-based SSO for Semgrep AppSec Platform, you may see the following error:

```
Semgrep encountered an SSO error BadRequest. 
Could not process SAML parameters. Missing attribute: email
```

Semgrep AppSec Platform requires two SAML attributes to be sent: `name` and `email`. If either one is missing, this error appears during the login process. For example, if the `name` attribute is missing, the message reads `Missing attribute: name`.

When you see this error, review your SAML configuration or the SAML assertion content. Most commonly, when setting up the SAML app, you provided the right information (the user's name and email) but the name or namespace of the attributes isn't an exact match to `name` or `email`. For example, you are sending the user's full name, but the attribute is called `user.fullName`. You should rename the attribute to `name`.

Review step 4 of the [SAML setup process](/docs/deployment/sso/#saml-20) for guidance in setting up the attributes as required by Semgrep. For Microsoft Entra ID, see steps 4 and 5 of [Set up SAML SSO with Microsoft Entra ID](/docs/deployment/sso/#set-up-saml-sso-with-microsoft-entra-id).

<MoreHelp />
