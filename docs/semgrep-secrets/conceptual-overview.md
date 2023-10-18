---
slug: /semgrep-secrets/conceptual-overview
append_help_link: true
title: Conceptual overview
hide_title: true
description: Learn how Semgrep detects leaked secrets and helps you prioritize what keys to rotate.
tags:
  - Semgrep Secrets
---

import MoreHelp from "/src/components/MoreHelp"

# Conceptual overview of Semgrep Secrets

**Semgrep Secrets** is a code scanner that detects exposed API keys, passwords, and other credentials. These exposed secrets can be used by malicious actors to leak data or gain access to sensitive systems. Semgrep Secrets enables the user to know the following: 

* What secrets have leaked.
* The validation status of the secret, such as if it is confirmed valid. **Valid** secrets are secrets that are tested against a web service and confirmed to successfully grant resources or authentication. 
* (For GitHub repositories) If these secrets are in public or private repositories.

Save time and effort by prioritizing valid leaked secrets. Inform developers of valid, active secrets in their GitHub PRs by posting PR comments. 

This document explains how Semgrep Secrets works and its approach to detecting secrets.

:::info
For a guide to setting up Semgrep Secrets, see [<i class="fa-regular fa-file-lines"></i> Getting started with Semgrep Secrets](/semgrep-secrets/getting-started).
:::

:::tip
Secrets scanning is **language-agnostic**. This means Semgrep Secrets can scan any language for secrets.
:::

To ensure that findings are high-signal, comprehensive, and easy for users to prioritize, a secrets scan performs the following:

* Semantic analysis
* Validation
* Entropy analysis

The following sections explain how each analysis works.

## Detecting secrets through semantic analysis

Semantic analysis refers to Semgrep's ability to understand how data is used within your code. This differentiates Semgrep from regex-based detectors that simply define a pattern to match to a piece of code.

Semgrep uses several mechanisms to perform semantic analysis. In particular, Semgrep uses **data-flow analysis**, which means that it is able to track data, such as variables, and the flow of that data across files and functions in your codebase. Semgrep is able to detect if a variable is renamed, unsanitized or sanitized, reassigned, or used in a function in such a way that a secret is exposed.

See the following Semgrep rule and JavaScript test code for an example.

<iframe title="AWS hardcoded access key" src="https://semgrep.dev/embed/editor?snippet=EPj5" width="100%" height="432px" frameBorder="0"></iframe>
<br />

 The Semgrep rule detects hardcoded AWS secret access keys. The test code defines an access key in the variable `secret`. Click **<i class="fa-solid fa-play"></i> Run** to see the true positives.

* **Line 2:** Semgrep and regex-based scanners can detect both the variable name `secret` and its value (token) in line 2.
	* A regex-based scanner may generate a noisy finding from line 2 even though `secret` has not been passed to any function.
	* Semgrep doesn't generate a finding because the token hasn't been passed as a `secretAccessKey` or similar.
* **Line 7:** Semgrep and regex-based scanners are able to detect **line 6**, in which the plain-text secret is passed to the `AWS.config.update` function.
* **Line 17:** Semgrep and regex-based scanners can detect **line 14**, in which `secret` is passed.
* **Line 26:** Semgrep correctly skips `conf.secret` in **line 21**. Regex-based scanners simply looking for matches of the string `secret` generate a false positive.

## Validating secrets 

After scanning for secrets, Semgrep uses a **post-processor** function called a **validator** to determine if a secret is actively being used, or some other state.

:::info
* All validations, such as API calls, are done **locally**.
* No tokens are ever to Semgrep servers.
:::

1. The post-processor detects the service, such as Slack or AWS, that the secret is used for.
2. If the post-processor does not support the service that the secret is used for, Semgrep notes that there is **No validator** for the secret.
3. If the validator can detect the service, Semgrep performs an API call. The following outcomes can occur:
	1. **Confirmed valid:** Semgrep made an HTTP request using the secret and it returned an HTTP status code of 200 or similar **and** some indication of valid access. For example, a service can include a `"message": "ok"`.
    2. **Confirmed invalid:** Semgrep made an HTTP request using the secret and it returned an HTTP status code of 401 or similar.
    3. **Validation error:** Semgrep made an HTTP request using the secret, but the either the network request could not be made, a timeout occurred, or the HTTP status code returned a different HTTP status code. In this case, the Semgrep Team recommends manually reviewing the finding.

All findings, whether they are validated, with validation errors, invalid, or valid, appear in Semgrep Cloud Platform.

By performing this post-processor check, you are able to prioritize (triage) the most high priority, active findings.

<!--
:::note
For a list of all supported services that Semgrep can detect, see Semgrep post-processor list.
:::
-->

## Fine-tuning findings through entropy analysis

In secret scanning, entropy is the measure of a **string's randomness**. It is used to measure how likely a string is random. If a string is highly entropic, it is highly random, and therefore likelier to be a secret. By performing entropy analysis, Semgrep is able to reduce false positives.

Examples of high-entropy (random) strings:

```
VERZVs+/nd56Z+/Qxy1mzEqqBwUS1l9D4YbqmPoO
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
```

Examples of low-entropy strings:

```
XXXXXX
txtCfmPassword
```

## Differences between Semgrep Secrets and Semgrep Registry rules

The Semgrep Registry includes SAST rules that can detect secrets to a certain extent. You can run these rules in Semgrep Code (Semgrep's SAST analyzer), or even write your own custom secret-detecting SAST rules, but with the following differences:

* Semgrep Code does not run a validator function or perform entropy analysis against these rules, resulting in less accurate results.
    * Because the results are less accurate, these rules are not suitable as a criteria to block a PR or MR.
* The UI for Semgrep Code is tailored to SAST triage, and does not include filtering functions for valid or invalid tokens.
* Existing Semgrep Pro rules that detect secrets are transitioning from Semgrep Code to Semgrep Secrets. By transitioning these rules, improvements, such as validator functions, can be added to the rules when they are run in Semgrep Secrets.
* You can write your own custom validator functions and run them in Semgrep Secrets for your own custom services or use cases.

### Semgrep Secrets rule sample and structure

The following example detects a leaked GitHub PAT:

```yaml
rules:
- id: github_pat
  message: >-
    To revoke the token, visit the `Active tokens` page in the organization settings screen: `https://github.com/organizations/<ORGRANIZATION>/settings/personal-access-tokens/active`.
    From here, select the token, and revoke it using the drop down field and selecting `"Revoke"`.
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

The following sections describe new and existing keys in the context of a Secrets rule.

#### Subkeys under the `metadata` key

These subkeys provide context to both you and other end-users, as well as to Semgrep.

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
| `secret_type`  | Defines the name of the service or the type of Secret. When writing a custom validator, set this value to a descriptive name to help identify it when triaging secrets. Examples of secret types include "Slack," "Asana," and other common service names. |
| `technology` | Set this to `secrets` to identify the rule as a Secrets rule. |
   
#### Subkeys under the `patterns` key

These subkeys identify the token to analyze in a given match.

```yaml
  ...
  patterns:
  ...
  - focus-metavariable: $REGEX
  - metavariable-analysis:
      analyzer: entropy
      metavariable: $REGEX
  ..
```

| Key | Description |
| -------  | ------ |
| `focus_metavariable`  | This key enables the rule to define a metavariable upon which Semgrep can perform further analysis, such as entropy analysis. |
| `metavariable_analysis`  | Under `metavariable_analysis`, you can define additional keys: `analyzer` and `metavariable`, which specifies the kind of analysis Semgrep performs and on what variable.  |

:::tip
For more information, see Semgrep rule definition for [<i class="fa-regular fa-file-lines"></i> Focus metavariable](/writing-rules/rule-syntax/#focus-metavariable).
:::

#### Subkeys under the `validators` and `http` keys

The validators key uses a list of keys to define the validator function. In particular, the `http` key defines how the rule forms a request object and what response is expected for valid and invalid states. Although there are some rules that do not use a `validators` key, most Secrets rules make use of it. 

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
| `response`  | This key and its subkeys determine **validation status**. Semgrep identifies a validation status through HTTP status code **and** other key-value pairs. For example, a rule may require both a 200 status code **and** a `"message": "ok"` in the response body for the matching secret to be considered **Confirmed valid**. |


## Next steps

See [<i class="fa-regular fa-file-lines"></i> Getting started with Semgrep Secrets](/semgrep-secrets/getting-started) to:
* Enable secrets scanning for your repositories
* Learn how to triage secrets-related findings
* Receive notifications and post tickets


<MoreHelp />
