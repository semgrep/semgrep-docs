---
tags:
  - API
description: Ensure you select the correct token scopes to avoid API 404s.
---

# Web API error 404 and token scopes

If you receive a 404 error from the [Semgrep Web API](https://semgrep.dev/api/v1/docs/), and you are sure the deployment, API endpoint, and other details are correct, you may be trying to use a token that does not have the **Web API** scope assigned.

Semgrep AppSec Platform supports two primary token scopes: **Agent (CI)** and **Web API**. See [Token scopes](/docs/deployment/teams#token-scopes) for details of their permissions.

Tokens with only the **Agent (CI)** scope can connect scans with the platform to request rules, send findings, and post PR/MR comments, but they cannot use the Web API. They are intended for use locally or in CI.

## Add scopes to a token

You must be an `admin` to perform this operation. Member users cannot access tokens in the Semgrep AppSec Platform.

1. Log in to Semgrep AppSec Platform and navigate to [**Settings > Tokens**](https://semgrep.dev/orgs/-/settings/tokens/).
3. Identify the related token, and click the <i class="fa-regular fa-pen-to-square"></i> icon to edit the token.
4. Click **Web API** under **Token scopes**.

If the token does not appear in the **API Tokens** section, it is a Member-scoped CLI token whose permissions cannot be escalated. Create a new token on the Settings page instead, and make sure to check the **Web API** box.
