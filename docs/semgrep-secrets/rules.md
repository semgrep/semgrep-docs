---
slug: rules
append_help_link: true
title: Rules structure
hide_title: true
description: Learn about Semgrep Secrets rules.
tags:
  - Semgrep Secrets
---

# Semgrep Secrets rule sample and structure

This article demonstrates what a sample Semgrep Secrets rule looks like.
Subsequent sections describe the key-value pairs in the context of a Semgrep
Secrets rule.

## Metavariable binding

Semgrep secrets uses metavariables. Metavariables allow Semgrep Secrets to reuse matched information from your code in its validators. An example of a metavariable is as follows:

<iframe title="Message displays metavariable content" src="https://semgrep.dev/embed/editor?snippet=JDzRR" width="100%" height="432px" frameBorder="0"></iframe>
<br />

When you click **Run**, the content from the metavariable `$HELLO` displays as `This content is now reusable in validators`. If this were a secret, Semgrep Secrets could use this to call the appropriate service to determine if the secret is active.

## Sample rule

The following sample rule detects a leaked GitHub personal access token (PAT):

```yaml
rules:
- id: github_example
  message: >-
    This is an example rule, that performs validation against github.com
  severity: WARNING 
  languages:
  - regex
  validators:
  - http:
      request:
        headers:
          Authorization: Bearer $REGEX
          Host: api.github.com
          User-Agent: Semgrep
        method: GET
        url: https://api.github.com/user
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
    - pattern-regex: (?<REGEX>\b((ghp|gho|ghu|ghs|ghr|github_pat)_[a-zA-Z0-9_]{36,255})\b)
    - focus-metavariable: $REGEX
    - metavariable-analysis:
        analyzer: entropy
        metavariable: $REGEX
```

This can also be done in any Semgrep-supported language:

```yaml
rules:
- id: github_example
  message: >-
    This is an example rule that performs validation against github.com
  severity: WARNING 
  languages:
  - javascript
  - typescript
  validators:
  - http:
      request:
        headers:
          Authorization: Bearer $REGEX
          Host: api.github.com
          User-Agent: Semgrep
        method: GET
        url: https://api.github.com/user
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
    - pattern: |
        "$R"
    - metavariable-pattern:
        metavariable: $R
        patterns:
          - pattern-regex: (?<REGEX>\b((ghp|gho|ghu|ghs|ghr|github_pat)_[a-zA-Z0-9_]{36,255})\b)
    - focus-metavariable: $REGEX
    - metavariable-analysis:
        analyzer: entropy
        metavariable: $REGEX
```

### Subkeys under the `metadata` key

These subkeys provide context to both you and other end-users, as well as to
Semgrep.

```yaml
  ...
  metadata:
    ...
    secret_type: GitHub
    technology:
    - secrets
  ...
```
| Key | Description |
| -------  | ------ |
| `secret_type`  | Defines the name of the service or the type of secret. When writing a custom validator, set this value to a descriptive name to help identify it when triaging secrets. Examples of secret types include "Slack," "Asana," and other common service names. |
| `technology` | Set this to `secrets` to identify the rule as a Secrets rule. |
   
### Subkeys under the `patterns` key

These subkeys identify the token to analyze in a given match.

```yaml
  ...
  patterns:
  ...
  - pattern-regex: (?<REGEX>\b((ghp|gho|ghu|ghs|ghr|github_pat)_[a-zA-Z0-9_]{36,255})\b)
  - focus-metavariable: $REGEX
  - metavariable-analysis:
      analyzer: entropy
      metavariable: $REGEX
  ..
```

| Key | Description |
| -------  | ------ |
| `pattern-regex`  | Searches for a regular expression and assigns it to the named capture group regex, which is then used as $REGEX. |
| `focus_metavariable`  | This key enables the rule to define a metavariable upon which Semgrep can perform further analysis, such as entropy analysis. |
| `metavariable_analysis`  | Under `metavariable_analysis`, you can define additional keys: `analyzer` and `metavariable`. These specify the kind of analysis Semgrep performs and on what variable.  |

:::tip 
For more information, see the rule syntax for [<i class="fa-regular fa-file-lines"></i> Focus
metavariable](/writing-rules/rule-syntax/#focus-metavariable).
:::

### Subkeys under the `validators` and `http` keys

The `validators` key uses a list of keys to define the validator function. In
particular, the `http` key defines how the rule forms a request object and what
response is expected for valid and invalid states. Although some rules do not use a `validators` key, most Secrets rules use it. 

```yaml
  ...
  validators:
  - http:
      request:
        headers:
          Authorization: Bearer $REGEX
          Host: api.github.com
          User-Agent: Semgrep
        method: GET
        url: https://api.github.com/user
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

| Key | Description |
| -------  | ------ |
| `request`  | This key and its subkeys describe the request object and the URL to send the request object to. |
| `response`  | This key and its subkeys determine **validation status**. Semgrep Secrets identifies a validation status through HTTP status code **and** other key-value pairs. For example, a rule may require a 200 status code **and** a `"message": "ok"` in the response body for the matching secret to be considered **Confirmed valid**. |

:::tip
See [<i class="fa-regular fa-file-lines"></i> Validators](/semgrep-secrets/validators/) for more information.
:::

## Differences between Semgrep Secrets rules and Semgrep Registry rules

The Semgrep Registry includes SAST rules that can detect secrets to a certain
extent. You can run these rules in Semgrep Code (Semgrep's SAST analyzer), or
even write your own custom secret-detecting SAST rules, but with the following
differences:

* Semgrep Code does not run a validator function against these rules, resulting in less accurate results.
    * Because the results are less accurate, these rules are not suitable as criteria to block a PR or MR.
* The UI for Semgrep Code is tailored to SAST triage and does not include filtering functions for valid or invalid tokens.
* Existing Semgrep Pro rules that detect secrets are transitioning from Semgrep Code to Semgrep Secrets. By transitioning these rules, improvements, such as validator functions, can be added to the rules when they are run in Semgrep Secrets.
* You can write your own custom validator functions and run them in Semgrep Secrets for custom services or use cases.
