---
slug: sso
append_help_link: true
description: "SSO Configuration instruction"
---

import MoreHelp from "/src/components/MoreHelp"

# SSO Configuration

**SSO (single sign-on)** is a **Team/Enterprise tier feature**. Semgrep supports [OAuth2/OIDC](#oauth2oidc) and [SAML 2.0](#saml-20).

## OAuth2/OIDC

OAuth2/OIDC is configured through the **Semgrep App Dashboard**. 

To set up SSO:

1. From the **App Dashboard**, click on **Settings > Configure SSO: OpenID**.
2. Copy the `Provider ID` and `Redirect URI`.
![Finding providerId and RedirectURL via the Semgrep App](../img/sso-finding-providerId-and-Redirect-URL.png "Finding Provider ID and RedirectURI via the Semgrep App")
3.Generate a `Client ID` and `Client Secret` through your authentication provider by pasting `Provider ID` and `Redirect URI` values as needed.
![Generating Client ID and Client Secret via the Okta](../img/sso-clientID-clientSecret.png "Generating Client ID and Client Secret through Okta")
4. From your authentication provider, copy the values for `Base URL/Domain` and `Email Domain` to Semgrep's Configure SSO: OpenID tab. `Base URL/Domain` is `Okta domain` for Okta SSO.
5. Provide a descriptive `Display Name`.
![Providing the Base URL/Domain, Display Name, and Email Domain](../img/sso-providing-BaseURL-DisplayName-EmailDomain.png "Providing the Base URL/Domain, Display Name, and Email Domain")

In case you encounter issues during the setup process, please reach out to [support@r2c.dev](mailto:support@r2c.dev) for assistance.

## SAML 2.0

SAML2.0 is configured through the **Semgrep App Dashboard**. 

To set up SSO:

1. From your **authentication provider**, create the **SAML app**.
![Creating SAML app through Okta](../img/saml-creating-app.png "Creating SAML app through Okta")
2. From the **App Dashboard**, click on **Settings > Configure SSO: SAML**.
3. Copy the `Provider ID`, the `Single sign on URL`, and `Audience URI`. Paste the values as needed in your authentication provider.
![Finding Provider ID, Single sign on URL, and Audience URI via the Semgrep App](../img/saml-finding-providerId-SsoURL-and-AudienceURI.png "Finding Provider ID, Single sign on URL, and Audience URI via the Semgrep App")
4. From your authentication provider, add in two attribute statements `name` and `email`.
![Filling in attribute statements in Okta](../img/saml-attribute-statements.png "Filling in attribute statements through Okta")
5. From your authentication provider, copy your `IdP SSO URL`, `IdP Issuer ID`, and `X509 Certificate` to Semgrep's Configure SSO: SAML tab.
![Finding IdP SSO URL, IdP Issuer ID, and X509 Certificate through Okta](../img/saml-copy-IdPSSO-IdPID-and-X509.png "Finding IdP SSO URL, IdP Issuer ID, and X509 Certificate through Okta")
![Filling in Idp SSO URL, Idp Issuer ID, and X509 Certificate on Semgrep](../img/saml-filling-IdpSSO-IdpID-X509.png "Filling in Idp SSO URL, Idp Issuer ID, and X509 Certificate on Semgrep")
6. Provide a descriptive `Display Name`.
![Providing the Base URL/Domain, Display Name, and Email Domain](../img/sso-providing-BaseURL-DisplayName-EmailDomain.png "Providing the Base URL/Domain, Display Name, and Email Domain")

If you encounter issues during the setup process, reach out to [support@r2c.dev](mailto:support@r2c.dev) for assistance.

<MoreHelp />
