---
slug: sso
append_help_link: true
description: "SSO Configuration instruction"
---

import MoreHelp from "/src/components/MoreHelp"

# SSO Configuration

SSO (single sign-on) is a Team/Enterprise tier feature. Organizations can choose between [OAuth2/OIDC](#oauth2oidc) or [SAML 2.0](#saml-20).

## OAuth2/OIDC

OAuth2/OIDC is configured through **Semgrep App Dashboard**. 

To edit SSO configuration, click on **Settings > Configure SSO tab**.

There you’ll find a `providerId` and `Redirect URL`.

![Finding providerId and RedirectURL via the Semgrep App](../img/sso-finding-providerId-and-Redirect-URL.png "Finding providerId and RedirectURL via the Semgrep App")

Using these, please generate a `Client ID` and `Client Secret`.

The last step will be to provide a `Base URL/Domain`, `Display Name`, and your `Email Domain`.

<b>If you are using Okta the following are some example screenshots of retrieving the above items.</b>

Generating `Client ID` and `Client Secret`.
![Generating Client ID and Client Secret via the Okta](../img/sso-clientID-clientSecret.png "Generating Client ID and Client Secret via the Okta")

Providing the `Base URL/Domain`, `Display Name`, and `Email Domain`. 

:::info
  `Base URL/Domain` used here is `drewdennison.okta.com` seen 
  on the above screenshot.
:::

![Providing the Base URL/Domain, Display Name, and Email Domain](../img/sso-providing-BaseURL-DisplayName-EmailDomain.png "Providing the Base URL/Domain, Display Name, and Email Domain")


In case you encounter issues during the setup process, please reach out to [support@r2c.dev](mailto:support@r2c.dev) for assistance.

## SAML 2.0

SAML 2.0 currently requires manual support. Please reach out via Slack or [support@r2c.dev](mailto:support@r2c.dev).

<MoreHelp />
