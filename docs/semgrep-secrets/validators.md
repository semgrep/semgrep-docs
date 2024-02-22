---
slug: validators
title: Semgrep Secrets Validators
hide_title: true
description: Learn about validators used in Semgrep Secrets rules.
tags:
  - Semgrep Secrets
---

# Validators

Semgrep Secrets uses a proprietary **validator** to
determine if a secret is actively being used. Validators are included in the
[rules Semgrep Secrets uses](/semgrep-secrets/rules).

:::note Semgrep currently supports validation for HTTP and HTTPS

This article walks through the validator syntax, so that you can write custom validators.

## Sample validator

```yaml
rules:
- id: exampleCo_example
  message: >-
    This is an example rule, that performs validation against exampleCo.com
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

## Syntax

You can extend semgrep rules with a top level key to use `validators` which needs the following:

:::note You can include a list of validators, so you can include one or more per-rule

| http | Description |
| -------  | ------ |
| `http` | **Required** Indicates that the request type is `http` and its subkeys define the parameters of the call. |


Keys required for HTTP 

| http keys | Description |
| -------  | ------ |
| `request` | **Required** Indicates that the subkeys describe the request object and the URL to send the request object to. |
| `response`  | **Required** This key and its subkeys determine 
<!-- maybe need to split response out from here-->

Request keys

| request | Description |
| -------  | ------ |
| `method` | **Required** The HTTP method (GET,POST,PUT,DELETE OPTIONS,PATCH) Semgrep uses when making the call. |
| `url` | **Required** The URL to which the call is made.  |
| `body` | **Optional** HTTP Body used with POST requests.  |
| `headers` | **Required** Indicates that the subkeys describe the HTTP headers required for the call. |


Header keys

| headers | Description |
| -------  | ------ |
| `Host` | **Required** The host to which the call is made. |
| `Other-Values` | **Optional** You can include any type of Header e.g. Authorization, Content-Type, User-Agent in the rule. |

Response Keys

| response | Description |
| -------  | ------ |
| `match` | **Required** Accepts a list of match conditions. |


Match Keys

| match | Description |
| -------  | ------ |
| `status-code` | **Required** The HTTP status code Semgrep Secrets expects. |
| `result` | **Required** Defines the result based on the HTTP status code received. |
| `content` | **Optional** Allows you to inspect the response body for a specific . |
| `message` | **Optional** Allows you to override the rule message based on the validility state. |
| `metadata` | **Optional** Allows you to override existing metadata fields or add new metadata fields based on the validility state. |
| `severity` | **Optional** Allows you to override the existing rule severity based on the validility state. |

Result keys

| result | Description |
| -------  | ------ |
| `validity` | **Required** Sets the validity based on the HTTP status code received. Accepted values include `valid` and `invalid`. |

Content keys

| content | Description |
| -------  | ------ |
| `language` | **Required** tells Semgrep to use a particular pattern language, we normally recommend regex but this could also be JSON etc. |
| `pattern-regex` | **Required** searches the response body with a regex for a particular regex definition. |
<!-- this can be patterns: too but idk how to represent that -->

## Utilities

base64 encoding is possible by leveraging the `__semgrep_internal_encode_64(...)` utility this can be applied to the following fields

* url
* body
* header value


## POST request Example

```yaml
rules:
- id: exampleCo_example
  message: >-
    This is an example rule, that performs validation against exampleCo.com
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

## Base64 encoding

```yaml
rules:
- id: exampleCo_example
  message: >-
    This is an example rule, that performs validation against exampleCo.com
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

## Using all fields

```yaml
rules:
- id: exampleCo_example
  message: >-
    This is an example rule, that performs validation against exampleCo.com
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
            pattern-regex: (\"ok\":true)
          status-code: 200
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