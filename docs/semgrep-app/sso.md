---
slug: sso
append_help_link: true
description: "SSO Configuration instruction"
---

import MoreHelp from "/src/components/MoreHelp"

# SSO Configuration

SSO is a Team/Enterprise tier feature. Organizations can choose between [OAuth2/OIDC](#oauth2oidc) or [SAML 2.0](#saml-20).

## OAuth2/OIDC

OAuth2/OIDC can be configured via the Semgrep App Dashboard. Please visit the <b>Configure SSO</b> tab under Settings to edit the SSO configuration.

There you’ll find a `providerId` and `Redirect URI`.

Using these, please generate a `Client ID` and `Client Secret`.

The last step will be to provide a `Base URL/Domain`, `Display Name`, and your `Email Domain`.

In case you encounter issues during the setup process, please reach out to [support@r2c.dev](mailto:support@r2c.dev) for assistance.

## SAML 2.0

SAML 2.0 currently requires manual support. Please reach out via Slack or [support@r2c.dev](mailto:support@r2c.dev).

<MoreHelp />