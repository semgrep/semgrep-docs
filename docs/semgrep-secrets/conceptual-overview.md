---
slug: /semgrep-secrets/conceptual-overview
append_help_link: true
title: Overview
hide_title: true
description: Learn how Semgrep Secrets detects leaked secrets and helps you prioritize what keys to rotate.
tags:
  - Semgrep Secrets
---

import MoreHelp from "/src/components/MoreHelp"

# Overview

**Semgrep Secrets** scans code to detect exposed API keys, passwords, and other
credentials. These exposed secrets can be used by malicious actors to leak data
or gain access to sensitive systems. Semgrep Secrets enables the user to know
the following: 

* What secrets have been committed to your repository.
* The validation status of the secret, such as if it is confirmed valid.
  **Valid** secrets are secrets that are tested against a web service and
  confirmed to successfully grant resources or authentication. They are actively
  in use. 
* For GitHub repositories: If these secrets are in public or private
  repositories.

Save time and effort by prioritizing valid leaked secrets. Inform developers of
valid secrets in their GitHub PRs by posting PR comments. 

## Supported languages

Semgrep Secrets can scan **any programming language** for secrets.

## Supported developer environments and features

This section lists the source code managers (SCMs) that Semgrep Secrets supports.

| Source code manager | Semgrep Secrets | PR or MR comments for valid secrets findings   |
| ------------------- | --------------- | ---------------------------------------------- |
| GitHub              | ✔️               | ✔️                                              |
| GitLab              | ✔️               | ❌                                             |
| BitBucket           | ✔️               | ❌                                             |

## How Semgrep Secrets works

To ensure that findings are high-signal, comprehensive, and easy for users to
prioritize, a Secrets scan performs the following:

* Semantic analysis
* Validation
* Entropy analysis

The following sections explain how each analysis works.

### Detect secrets through semantic analysis

Semantic analysis refers to Semgrep Secrets' ability to understand how data is
used within your code. This differentiates Semgrep Secrets from regex-based
detectors that simply define a pattern to match to a piece of code.

In particular, Semgrep Secrets uses several mechanisms to perform semantic
analysis. It uses [<i class="fa-regular fa-file-lines"></i> data-flow
analysis](/writing-rules/data-flow/data-flow-overview/) and [<i
class="fa-regular fa-file-lines"></i> constant
propagation](/writing-rules/data-flow/constant-propagation/) which means that it
is able to track data, such as variables, and the flow of that data across files
and functions in your codebase.

Performing semantic analysis is encapsulated in [<i class="fa-regular
fa-file-lines"></i> rules](/running-rules/). By running these rules, Semgrep
Secrets is able to detect if a variable is renamed, unsanitized or sanitized,
reassigned, or used in a function in such a way that a secret is exposed.

See the following rule and JavaScript test code for an example.

<iframe title="AWS hardcoded access key" src="https://semgrep.dev/embed/editor?snippet=EPj5" width="100%" height="432px" frameBorder="0"></iframe>
<br />

The rule detects hardcoded AWS secret access keys. The test code defines an
access key in the variable `secret`. Click **<i class="fa-solid fa-play"></i>
Run** to see the true positives.

Some differences between Semgrep Secrets and regex-based scanners include:

* **Line 2:** Both can detect the variable name `secret` and its value (token)
	in line 2. * A regex-based scanner may generate a noisy finding from line 2
	even though `secret` has not been passed to any function. * Semgrep Secrets
	doesn't generate a finding because the token hasn't been passed as a
	`secretAccessKey` or similar.
* **Line 7:** Both can detect **line 6**, in which the plain-text secret is
  passed to the `AWS.config.update` function.
* **Line 17:** Both can detect **line 14**, in which `secret` is passed.
* **Line 26:** Semgrep Secrets correctly skips `conf.secret` in **line 21**.
  Regex-based scanners simply looking for matches of the string `secret`
  generate a false positive.

### Validate secrets 

After scanning, Semgrep Secrets uses a **post-processor** function called a
**validator** to determine if a secret is actively being used, or some other
state.

:::info
* All validations, such as API calls, are done **locally**.
* No tokens are sent to Semgrep servers.
:::

1. The post-processor detects the service, such as Slack or AWS, that the secret
   is used for.
2. If the post-processor does not support the service that the secret is used
   for, Semgrep notes that there is **No validator** for the secret.
3. If the validator can detect the service, Semgrep Secrets performs an API
	call. The following outcomes can occur: 1. **Confirmed valid:** Semgrep made
	an HTTP request using the secret and it returned an HTTP status code of 200 or
	similar **and** some indication of valid access. For example, a service can
	include a `"message": "ok"`.
    2. **Confirmed invalid:** Semgrep made an HTTP request using the secret and
       it returned an HTTP status code of 401 or similar.
    3. **Validation error:** Semgrep made an HTTP request using the secret, but
       the either the network request could not be made, a timeout occurred, or
       the HTTP status code returned a different HTTP status code. In this case,
       the Semgrep Team recommends manually reviewing the finding.

All findings, whether they are validated, with validation errors, invalid, or
valid, appear in Semgrep Cloud Platform.

By performing this post-processor check, you are able to prioritize (triage) the
most high priority, active findings.

<!--
:::note
For a list of all supported services that Semgrep can detect, see Semgrep post-processor list.
:::
-->

### Fine-tune findings through entropy analysis

In secret scanning, entropy is the measure of a **string's randomness**. It is
used to measure how likely a string is random. If a string is highly entropic,
it is highly random. For certain types of secrets, such as API keys, randomness
indicates that a string could be a secret. By performing entropy analysis,
Semgrep Secrets is able to detect true positives.

Examples of high-entropy (random) strings:

```
VERZVs+/nd56Z+/Qxy1mzEqqBwUS1l9D4YbqmPoOß
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
```

Examples of low-entropy strings:

```
XXXXXX
txtCfmPassword
```

## Next steps

See [<i class="fa-regular fa-file-lines"></i> Getting started with Semgrep Secrets](/semgrep-secrets/getting-started) to:
* Enable secrets scanning for your repositories
* Learn how to view and triage secrets-related findings
* Receive notifications and post tickets

<MoreHelp />
