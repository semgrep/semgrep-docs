---
slug: validators
title: Semgrep Secrets Validators
hide_title: true
description: Learn about validators used in Semgrep Secrets rules.
tags:
  - Semgrep Secrets
---

# Validators

Semgrep Secrets uses a post-processor function called a **validator** to
determine if a secret is actively being used. Validators are included in the
[rules Semgrep Secrets uses](/semgrep-secrets/rules).

This article walks you through a sample validator, so that you can write custom
validators.

## Sample validator

```yaml
  ...
  validators:
  - http:
      request:
        headers:
          Authorization: Bearer access_token
          Host: api.exampleCo.com
          User-Agent: Semgrep
        method: GET
        url: https://api.exampleCo.com/user
      response:
        - match:
          - status-code: '200'
          result:
            validity: valid
        - match:
          - status-code: '404'
          result:
            validity: invalid
```

Parameters:

<!-- We should list all possible values here. -->

| Key | Description |
| -------  | ------ |
| `validators` | **Required** Indicates that the follow keys define validators. |
| `http` | **Required** Indicates that the request type is `http` and its subkeys define the parameters of the call. |
| `request` | **Required** Indicates that the subkeys describe the request object and the URL to send the request object to. |
| `headers` | **Required** Indicates that the subkeys describe the HTTP headers required for the call. |
| `Authorization` | The authorization value required by the endpoint, such as the access token. |
| `Host` | **Required** The host to which the call is made. |
| `User-Agent` | TODO |
| `method` | **Required** The HTTP method Semgrep uses when making the call. |
| `url` | **Required** The URL to which the call is made.  |
| `response`  | **Required** This key and its subkeys determine **validation status**. Semgrep Secrets identifies a validation status through HTTP status code **and** other key-value pairs. For example, a rule may require both a 200 status code **and** a `"message": "ok"` in the response body for the matching secret to be considered **Confirmed valid**. |
| `match` | **Required** Defines how Semgrep Secrets should treat the response codes it receives. |
| `status-code` | **Required** The HTTP status code Semgrep Secrets expects. |
| `result` | **Required** Defines the result based on the HTTP status code received. |
| `validity` | **Required** Sets the validity based on the HTTP status code received. Accepted values include `valid` and `invalid`. |

<!--## Examples
If we have examples of validators, it might be nice to put them here, along with explanations of anything interesting
-->