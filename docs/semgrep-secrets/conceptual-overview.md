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

* What secrets have leaked
* If these secrets are **valid** (actively being used) or **invalid** (inactive and not in use)
* (For GitHub repositories) If these secrets are in public or private repositories

Save time and effort by prioritizing validated leaked secrets. Prevent future secrets from leaking into production environments through comments in PRs or MRs.

This document explains how Semgrep Secrets works and its approach to detecting secrets.

:::info
For a guide to setting up Semgrep Secrets, see [<i class="fa-regular fa-file-lines"></i> Getting started with Semgrep Secrets](/semgrep-secrets/getting-started).
:::

To ensure that findings are high-signal and easy for users to prioritize, a secrets scan performs the following:

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

After scanning for secrets, Semgrep uses a **post-processor** function called a **validator** to validate if a secret is **valid** or **invalid**.

1. The post-processor detects the service, such as Slack or AWS, that the secret is used for.
2. If the post-processor does not support the service that the secret is used for, Semgrep notes that there is **No validator** for the secret.
3. If the validator can detect the service, Semgrep performs an API call. The following outcomes can occur:
	1. If the API call returns an HTTP response of 200 or similar, then the finding is **valid**.
	2. If the API call returns an HTTP response of 403 or similar, then the finding is **invalid**.
	3. If the API call returns an HTTP response of 500 or similar, or some other error occurred, then Semgrep notes that a **Validation error** has occurred.

All findings, whether they are validated, with validation errors, invalid, or valid, appear in Semgrep Cloud Platform.

By performing this post-processor check, you are able to prioritize (triage) the most high priority, active findings.

<!--
:::note
For a list of all supported services that Semgrep can detect, see Semgrep post-processor list.
(We will add this in some other time.)
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
* Semgrep Code rules don't detect honeypot tokens, resulting in less accurate results.
* Because the results are less accurate, these rules are not suitable as a criteria to block a PR or MR.
* The UI for Semgrep Code is tailored to SAST triage, and does not include filtering functions for valid or invalid tokens.

## Next steps

See [<i class="fa-regular fa-file-lines"></i> Getting started with Semgrep Secrets](/semgrep-secrets/getting-started) to:
* Enable secrets scanning for your repositories
* Learn how to triage secrets-related findings
* Receive notifications and post tickets


<MoreHelp />
