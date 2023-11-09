---
description: Solve an AttributeStatement issue encountered when setting up Semgrep with SSO.
tags:
  - Semgrep CI
  - PR comments
---

# SAML configuration error: There is no AttributeStatement on the Response

When setting up your SAML SSO (single sign-on) in Semgrep Cloud Platform, you may encounter the following configuration error: `There is no AttributeStatement on the Response`. This error can be seen [on the service provider's side or in Semgrep?]

![SAML AttributeStatement error](/img/kb/attribute-statement.png)

This issue is caused by an **attribute** within your service provider (SP) that does not have a value ascribed to it. When configuring SSO, the payload you send back to your SP, such as Okta or OneLogin, contains this attribute and hence, the SP raises this error.

## If you don't know the SAML attribute that is causing the error

If you don't know what attribute the payload is failing on, you can investigate the payload to determine the attribute. Refer to [How to view a SAML response in your browser](https://support.okta.com/help/s/article/How-to-View-a-SAML-Response-in-Your-Browser-for-Troubleshooting?language=en_US) for debugging steps.

After finding out what attribute is causing the error, proceed to the following section.

## If you know the SAML attribute that is causing the error

There are two possible solutions for this problem, depending on the expectations of your service provider (SP):

- If your service provider anticipates a value for the specific SAML Attribute statement, you must include a value within the SAML settings. [Where do we invlude this value? From the service provider?]
- Conversely, if the service provider does not expect that specific Attribute statement to be transmitted, remove the Attribute statement from the SAML settings. [Now I assume this is from Semgrep's side?]

For additional tips, you can refer to the following documentation: [SAML attribute statement with no value]( https://support.okta.com/help/s/article/SAML-attribute-statement-with-no-value-configured-not-properly-closed-in-assertion?language=en_US).
