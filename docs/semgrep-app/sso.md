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

1. From the **App Dashboard**, click on **Settings > Configure SSO tab**.
2. Copy the `Provider ID` and `Redirect URI`.
![Finding providerId and RedirectURL via the Semgrep App](../img/sso-finding-providerId-and-Redirect-URL.png "Finding Provider ID and RedirectURI via the Semgrep App")
3.Generate a `Client ID` and `Client Secret` through your authentication provider by pasting `Provider ID` and `Redirect URI` values as needed.
![Generating Client ID and Client Secret via the Okta](../img/sso-clientID-clientSecret.png "Generating Client ID and Client Secret through Okta")
4. From your authentication provider, copy the values for `Base URL/Domain` and `Email Domain` to Semgrep's Configure SSO tab. `Base URL/Domain` is `Okta domain` for Okta SSO.
5. Provide a descriptive `Display Name`.
![Providing the Base URL/Domain, Display Name, and Email Domain](../img/sso-providing-BaseURL-DisplayName-EmailDomain.png "Providing the Base URL/Domain, Display Name, and Email Domain")

In case you encounter issues during the setup process, please reach out to [support@r2c.dev](mailto:support@r2c.dev) for assistance.

## SAML 2.0

SAML 2.0 currently requires manual support. Please reach out via Slack or [support@r2c.dev](mailto:support@r2c.dev).

<MoreHelp />
