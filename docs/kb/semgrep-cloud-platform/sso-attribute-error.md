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
Please email support@semgrep.com and let us know so we can fix it! 
Could not process SAML parameters. Missing attribute: email
```

Semgrep Cloud Platform requires two SAML attributes to be sent: `name` and `email`. If either one is missing, this error appears during the login process, referring to the attribute that is missing.

Most commonly, the data is present, but the name or namespace of the attribute isn't an exact match for `name` or `email`. 

Review step 4 of the [SAML setup process](/docs/deployment/sso/#saml-20) for guidance in setting up the attributes. For Azure Active Directory, see steps 4 and 5 of [Setting up SAML SSO for your new Enterprise App](docs/deployment/sso/#setting-up-saml-sso-for-your-new-enterprise-app).

<MoreHelp />
