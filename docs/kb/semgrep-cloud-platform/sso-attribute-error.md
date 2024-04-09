---
description: Ensure that you're sending the required name and email attributes to Semgrep Cloud Platform.
tags:
  - Semgrep Cloud Platform
  - SSO
  - SAML
---

import MoreHelp from "/src/components/MoreHelp"

# Resolving SSO error BadRequest: Missing attribute

When setting up SAML-based SSO for Semgrep Cloud Platform, you may see the following error:

```
Semgrep encountered an SSO error BadRequest. 
Could not process SAML parameters. Missing attribute: email
```

Semgrep Cloud Platform requires two SAML attributes to be sent: `name` and `email`. If either one is missing, this error appears during the login process. For example, if the `name` attribute is missing, the message reads `Missing attribute: name`.

When you see this error, review your SAML configuration or check the SAML assertion content. Most commonly, when setting up the SAML application, you provided the right information (the user's name and email) but the name or namespace of the attributes isn't an exact match to `name` or `email`. For example, you are sending the user's full name, but the attribute is called `user.fullName`. The attribute should be called `name`.

Review step 4 of the [SAML setup process](/docs/deployment/sso/#saml-20) for guidance in setting up the attributes as required by Semgrep. For Microsoft Entra ID, see steps 4 and 5 of [Set up SAML SSO with Microsoft Entra ID](/docs/deployment/sso/#set-up-saml-sso-with-microsoft-entra-id).

<MoreHelp />
