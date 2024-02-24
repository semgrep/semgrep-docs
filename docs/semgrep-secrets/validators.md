---
slug: validators
title: Validators
hide_title: true
description: Learn about validators used in Semgrep Secrets rules.
tags:
  - Semgrep Secrets
---

# Validators

[Semgrep Secrets](/semgrep-secrets/conceptual-overview) uses proprietary **validators** to determine if a secret is
actively being used. Validators are included in the
[rules](/semgrep-secrets/rules) that Semgrep Secrets uses.

This article walks you through the syntax required to write your own custom
validators.

:::note Validation
Semgrep currently supports validation using HTTP and HTTPS.
:::

## Sample validator

```yaml
validators:
- http:
    request:
      headers:
        Authorization: Bearer $REGEX
        Host: api.exampleCo.com
        User-Agent: Semgrep
      method: GET
      url: https://api.exampleCo.com/user
    response:
    - match:
      - status-code: 200
      result:
        validity: valid
    - match:
      - status-code: 401
      result:
        validity: invalid 
```

<details>
<summary>See a validator in the context of a full rule.</summary>

```yaml
rules:
- id: exampleCo_example
  message: >-
    This is an example rule that performs validation against exampleCo.com
  severity: WARNING 
  metadata:
    product: secrets
    secret_type: exampleCo
  languages:
  - regex
  validators:
  - http:
      request:
        headers:
          Authorization: Bearer $REGEX
          Host: api.exampleCo.com
          User-Agent: Semgrep
        method: GET
        url: https://api.exampleCo.com/user
      response:
      - match:
        - status-code: 200
        result:
          validity: valid
      - match:
        - status-code: 401
        result:
          validity: invalid 
  patterns:
  - patterns:
    - pattern-regex: (?<REGEX>\b(someprefix_someRegex[0-9A-Z]{32})\b)
    - focus-metavariable: $REGEX
    - metavariable-analysis:
        analyzer: entropy
        metavariable: $REGEX
```

</details>

## Syntax

### validator

| Key | Required | Description |
| - | - | - |
| validator | Yes | Used to define a list of validators within a Semgrep rule. |

### type

| Key | Required | Description |
| - | - | - |
| http | Yes | Indicates that the request type is `http`. |

:::note Currently we only support web services via HTTP(S).
:::

<!-- TODO: if we expand to more validator types we should  -->
### request

| Key | Required | Description |
| - | - | - |
| request | Yes | Describes the request object and the URL to which the request object should be sent |
| method | Yes | The HTTP method Semgrep uses to make the call. Accepted values: `GET`, `POST`, `PUT`, `DELETE`, `OPTIONS`, `PATCH` |
| url | Yes | The URL to which the call is made |
| headers | Yes | The headers to include with the call |
| body | No | The body used with only `POST`,`PUT`,`PATCH` requests |

#### Sub-keys for `headers`

The following keys are for use with `headers`:

| Key | Required | Description |
| - | - | - |
| Host | No | The host to which the call is made, only the `url` field is required, but you can override the host if needed  |
| Other-values | No | The request header. Accepts all values, including `Authorization`, `Content-Type`, `User-Agent`, and so on  |

#### Example

```yaml
request:
  headers:
    Authorization: Bearer $REGEX
    Host: api.exampleCo.com
    User-Agent: Semgrep
  method: GET
  url: https://api.exampleCo.com/user
```

### response

| Key | Required | Description |
| - | - | - |
| response | Yes | The response key is used to determine the validation state, it accepts a list of objects with the sub keys match and result |
| match | Yes | Defines the list of match conditions. |
| result | Yes | Defines the validility. |

#### Sub-keys for `match`

| Key | Required | Description |
| - | - | - |
| status-code | Yes | The HTTP status code expected by Semgrep Secrets for it to consider the secret a match |
| result | Yes | Defines the result of the call based on the HTTP status code received |
| content | No | The response body; you can inspect it for a specific value or JSON response to determine if the request is valid. An example of where this is useful is when both invalid and valid responses return the same status code |
| message | No | Used to override the rule message based on the secret's validity state |
| metadata | No | Used to override existing metadata fields or add new metadata fields based on the secret's validity state |
| severity |  No | Used to override the existing rule severity based on the validity state |

#### Sub-keys for `result`

| Key | Required | Description |
| - | - | - |
| validity | Yes | Sets the validity based on the HTTP status code received. Accepted values: `valid` and `invalid` |

#### Sub-keys for `content`

| Key | Required | Description |
| - | - | - |
| language | Yes | Indicates the pattern language to use; this is typically regex, but it could be JSON |
| pattern-regex | Yes | Defines the regex used to search the response body. Alternatively, you can use the `patterns` key and [define patterns as you would for rules](/semgrep-secrets/rules/#subkeys-under-the-patterns-key) |
<!-- this can be patterns: too but idk how to represent that -->

#### Example

```yaml
response:
- match:
  - status-code: 200
  - content:
      language: regex
      pattern-regex: (\"ok\":true)
    status-code: 200
```

## Sample rules with validators

<details>
<summary>Sample POST request</summary>

```yaml
rules:
- id: exampleCo_example
  message: >-
    This is an example rule that performs validation against exampleCo.com
  severity: WARNING 
  metadata:
    product: secrets
    secret_type: exampleCo
  languages:
  - regex
  validators:
  - http:
      request:
        headers:
          Host: api.exampleCo.com
          User-Agent: Semgrep
        method: POST
        body: |
          {"key": "$REGEX"}
        url: https://api.exampleCo.com/user
      response:
      - match:
        - status-code: 200
        result:
          validity: valid
      - match:
        - status-code: 401
        result:
          validity: invalid 
  patterns:
  - patterns:
    - pattern-regex: (?<REGEX>\b(someprefix_someRegex[0-9A-Z]{32})\b)
    - focus-metavariable: $REGEX
    - metavariable-analysis:
        analyzer: entropy
        metavariable: $REGEX
```

</details>

<details>
<summary>All fields</summary>

```yaml
rules:
- id: exampleCo_example
  message: >-
    This is an example rule that performs validation against exampleCo.com
  severity: WARNING 
  metadata:
    product: secrets
    secret_type: exampleCo
  languages:
  - regex
  validators:
  - http:
      request:
        headers:
          Host: api.exampleCo.com
          User-Agent: Semgrep
        method: POST
        body: |
          {"key": "$REGEX"}
        url: https://api.exampleCo.com/user
      response:
      - match:
        - status-code: 200
        - content:
            language: regex
            pattern-regex: (\"role\":admin)
          status-code: 200
        message: >-
          The token exposed is for an admin user, this should be fixed immediately! See <insertlink> on how to rotate and look for suspicious activity
        metadata:
          context:
            - admin: true
        severity: ERROR
        result:
          validity: valid
      - match:
        - status-code: 401
        result:
          validity: invalid 
  patterns:
  - patterns:
    - pattern-regex: (?<REGEX>\b(someprefix_someRegex[0-9A-Z]{32})\b)
    - focus-metavariable: $REGEX
    - metavariable-analysis:
        analyzer: entropy
        metavariable: $REGEX
```

</details>


### Base64 encoding

You can use Base64 encoding by leveraging the `__semgrep_internal_encode_64(...)` utility. Base64 encoding can be applied to the following fields:

- `url`
- `body`
- `header` values

<details>
<summary>Sample Semgrep rule with validator using Base64 encoding</summary>

```yaml
rules:
- id: exampleCo_example
  message: >-
    This is an example rule that performs validation against exampleCo.com
  severity: WARNING 
  metadata:
    product: secrets
    secret_type: exampleCo
  languages:
  - regex
  validators:
  - http:
      request:
        headers:
          Authorization: Basic __semgrep_internal_encode_64($REGEX:)
          Host: api.exampleCo.com
          User-Agent: Semgrep
        method: GET
        url: https://api.exampleCo.com/user
      response:
      - match:
        - status-code: 200
        result:
          validity: valid
      - match:
        - status-code: 401
        result:
          validity: invalid 
  patterns:
  - patterns:
    - pattern-regex: (?<REGEX>\b(someprefix_someRegex[0-9A-Z]{32})\b)
    - focus-metavariable: $REGEX
    - metavariable-analysis:
        analyzer: entropy
        metavariable: $REGEX
```
</details>