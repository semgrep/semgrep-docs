---
description: Fix a SAML configuration error when an AttributeStatement is missing.
tags:
  - Semgrep AppSec Platform
  - SSO
  - Troubleshooting
---



# SAML SSO error: There is no AttributeStatement on the Response

When configuring SAML single sign-on (SSO) in Semgrep AppSec Platform, you may encounter the following error: `There is no AttributeStatement on the Response`

![SAML AttributeStatement error](/img/attribute-statement.png#md-width)

This error occurs when [an attribute within the SAML response does not contain a value](https://support.okta.com/help/s/article/SAML-attribute-statement-with-no-value-configured-not-properly-closed-in-assertion?language=en_US), resulting in a SAML assertion that does not correctly close the attribute statement. The attribute statement causes an SSO error when the service provider (SP) receives the SAML response.

## Find the SAML attribute that is causing the error

1. If you do not know the attribute that is causing the error, you can [identify it by investigating the payload](https://support.okta.com/help/s/article/How-to-View-a-SAML-Response-in-Your-Browser-for-Troubleshooting?language=en_US).
2. Once you have identified the attribute in question, there are two ways for you to fix the issue. The best option depends on what information your SP expects to receive:
   - If your SP requires a value for the specific SAML attribute statement, you must add the value in the IdP. When [setting up SSO to Semgrep AppSec Platform](/deployment/sso/#saml-20), you must provide `name` and `email`.
   - If your SP does *not* expect the attribute statement in your SAML settings, you can remove it.

Regardless of which option you choose, you can update or remove SAML attribute statements using your identity provider (IdP). Reach out to your SSO administrator or your IdP for instructions.
