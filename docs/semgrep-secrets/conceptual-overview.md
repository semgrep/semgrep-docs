---
slug: overview
append_help_link: true
title: Overview
hide_title: false
description: "Learn about detecting and fixing |
    secrets that are leaked in your code."
tags:
  - Secrets
---

import MoreHelp from "/src/components/MoreHelp"

Semgrep Secrets scans your code to look for exposed credentials such as API keys, access tokens, and passwords that, in the possession of a malicious actor, could compromise your data and systems.

Secrets provides you with information on: 

* The secrets that have been committed to your repositories (for GitHub users, Semgrep can determine if secrets have been leaked in public and private repos);
* The validation status of the secret (i.e., whether the credential is valid and can be used to access a resource);

You can view all Secrets findings in the Cloud Platform.

## Language support

Semgrep is capable of scanning apps written in any programming language for secrets.

## How secrets works

Semgrep relies on the following analysis to ensure that the findings it presents to you are comprehensive, helpful, and information-rich:

* Semantic analysis
* Entropy analysis
* Validation

### Detect leaked credentials with semantic analysis

With semantic analysis, Semgrep understands how your data is used in your code. The primary mechanism used by Semgrep to perform semantic analysis is data flow analysis, specifically constant propagation, which allows Semgrep to track data as it flows through your code, including the value of a variable at a given point in your program.

[<i class="fa-regular fa-file-lines"></i> Rules](/running-rules/) encapsulates how Semgrep performs semantic analysis. With rules, Secrets determines if your variable is renamed, unsanitized, reassigned, or used in a function in a way that exposes your secret.

#### Example: detect a hardcoded AWS secret access key 

The following rule detects hard-coded secret access keys, and the subsequent section of JavaScript code contains a credential leak. This example walks you through Semgrep's logic in identifying this security issue.

Click **<i class="fa-solid fa-play"></i> Run** to see the true positives identified by Semgrep.

<iframe title="AWS hardcoded access key" src="https://semgrep.dev/embed/editor?snippet=EPj5" width="100%" height="432px" frameBorder="0"></iframe>
<br />

Note that:

* In **Line 2**, Semgrep has detected the variable name `secret` and its token value; however, it doesn't generate a finding because the token hasn't been passed as a `secretAccessKey` (or similar).
* In **Line 7**, Semgrep detects that the plaintext secret is passed to the `AWS.config.update` function.
* In **Line 17**, Semgrep detects that the value of `secret` is passed to `secretAccessKey`.
* Semgrep ignores `conf.secret` in **Line 21**, avoiding generating a false positive.

### Fine-tune findings with entropy analysis

Entropy is a measure of a string's randomness -- high entropy strings are more likely to be random. A string's randomness can indicate that the value is a credential of some type, e.g., API keys. Semgrep can better identify whether a string is a secret with entropy analysis.

```text
# examples of high-entropy (random) strings
VERZVs+/nd56Z+/Qxy1mzEqqBwUS1l9D4YbqmPoO
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

# examples of low-entropy strings
XXXXX
txtCfmPassword
```

### Validate secrets

After identifying a secret, Semgrep uses a **post-processor** function called a **validator** to determine if a secret is actively being used.

:::info
All validations, e.g., API calls, are done **locally**. No tokens are sent to Semgrep servers.
:::

1. The validator detects the service for which the credential is valid (e.g., Slack, AWS).
2. If the validator doesn't support the service for which the key is valid, Semgrep notes that there is **No validator** for the secret.
3. If the validator supports the service for which the key is valid, Semgrep performs an API call. The following outcomes are possible:
   1. **Confirmed valid**: Semgrep made an HTTP request with the secret, and the resource returned an HTTP status code of 2xx **and** some indication of valid access (e.g., the message body includes `"message": "ok"`).
   2. **Confirmed invalid**: Semgrep made an HTTP request with the secret, and the resource returned an HTTP status code of 4xx.
   3. **Validation error**: Semgrep made an HTTP request using the secret, but the network request could not be made, a timeout occurred, or the HTTP status code was neither 2xx nor 4xx. If this happens, we recommend manually reviewing the finding.

When triaging findings, we recommend prioritizing high-priority findings where the secrets have been **confirmed valid** since they pose the most significant security threat.

## Secrets vs Registry rules

Semgrep Registry contains rules for use with Code, Semgrep's SAST tool, that can detect the presence of secrets in your code. There are some differences between Secrets and secrets-related rules for SAST, however:

* Code doesn't run validators against the findings it identifies, meaning the results are less information-rich (we don't recommend using Code's findings as a reason to block a pull/merge request for this reason)
* Secrets is capable of running custom validator functions that you write to support your custom use cases
* The Cloud Platform, which is currently tailored to display Code results for triage, does not include filtering functions for valid/invalid tokens

In time, we plan to move the existing rules in the Registry over to Secrets; this allows us to implement improvements, such as validator functions.

## Example: Secrets sample and structure

The following example is a Secrets rule that detects a leaked GitHub personal access token (PAT):

```yaml
rules:
- id: github_pat
  message: 'To revoke the token, visit the Active tokens page in the organization settings screen: https://github.com/organizations/<ORGRANIZATION>/settings/personal-access-tokens/active. Select the token, expand the drop-down menu, and select Revoke.'
  severity: ERROR
  metadata:
    likelihood: LOW
    impact: HIGH
    confidence: HIGH
    category: security
    subcategory:
    - vuln
    cwe:
    - 'CWE-798: Use of Hard-coded Credentials'
    cwe2020-top25: true
    cwe2021-top25: true
    cwe2022-top25: true
    owasp:
    - A07:2021 - Identification and Authentication Failures
    references:
    - https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures
    secret_type: GitHub
    technology:
    - secrets
  languages:
  - regex
  patterns:
  - pattern-regex: (?<REGEX>\b((ghp|gho|ghu|ghs|ghr|github_pat)_[a-zA-Z0-9_]{36,255})\b)
  - focus-metavariable: $REGEX
  - metavariable-analysis:
      analyzer: entropy
      metavariable: $REGEX
  - pattern-not-regex:
      (?i:a{5,}|b{5,}|c{5,}|d{5,}|e{5,}|f{5,}|g{5,}|h{5,}|i{5,}|j{5,}|k{5,}|l{5,}|m{5,}|n{5,}|o{5,}|p{5,}|q{5,}|r{5,}|s{5,}|t{5,}|u{5,}|v{5,}|w{5,}|x{5,}|y{5,}|z{5,}|0{5,}|abcde|abc123|abcd123|abcde123|abcdef123|example|sample|12345|cafecafe|deadbeef|deadb33f|asdfasdf|00112233|000111222|000011112222|aabbccdd|aaabbbccc|aaaabbbbcccc|00112233|000111222|000011112222|aabbccdd|aaabbbccc|aaaabbbbcccc|your[a-z_-]{0,}(?:cred|key|pass|pat|token))
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

### The `metadata` key

The keys nested under `metadata` provide context to end-users and Semgrep.

```yaml
metadata:
  ...
  secret_type: GitHub
  technology:
  - secrets
```

| **Key** | **Description** |
| -------  | ------ |
| `secret_type`  | The name of the service or the type of secret (e.g., `slack`, `asana`). When writing a custom validator, set this value to a descriptive name to help identify it when triaging secrets. |
| `technology` | Set to `secrets` to identify the rule as a Secrets rule. |

### The `patterns` key

The nested keys under `patterns` provide context to end-users and Semgrep.

```yaml
patterns:
...
- focus-metavariable: $REGEX
- metavariable-analysis:
    analyzer: entropy
    metavariable: $REGEX
```

| **Key** | **Description** |
| -------  | ------ |
| `focus_metavariable`  | Allows the rule to define a metavariable on which Semgrep can perform further analysis, such as entropy analysis. See the [<i class="fa-regular fa-file-lines"></i> rule syntax](/writing-rules/rule-syntax/#focus-metavariable) for more information about the focus metavariable. |
| `metavariable_analysis`  | Allows you to define additional keys (`analyzer` and `metavariable`) that specify the kind of analysis Semgrep performs and the variable on which that analysis should be performed. |

### The `validators` and `http` keys

The keys nested under `validators` define the validator functions. For example, the `http` key defines how the rule forms a request object and what responses it can expect for valid and invalid states.

```yaml
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

| **Key** | **Description** |
| -------  | ------ |
| `request` | Describes the request object and the URL to which it should be sent. |
| `response` | Determines **validation status**. Secrets determines the validation status via the HTTP status code **and** other key-value pairs (e.g., an HTTP 200 status code **and** `"message": "ok"` in the response body would result in the secret flagged as **Confirmed valid**). |

## Next steps

See [<i class="fa-regular fa-file-lines"></i> Getting started with Semgrep Secrets](/semgrep-secrets/getting-started) to:

* Enable Secrets for your repositories
* Learn how to triage your findings
* Receive notifications and post tickets with your findings

<MoreHelp />
