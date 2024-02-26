---
slug: /semgrep-secrets/conceptual-overview
append_help_link: true
title: About Semgrep Secrets 
hide_title: true
description: Learn how Semgrep Secrets detects leaked secrets and helps you prioritize what keys to rotate.
tags:
  - Semgrep Secrets
---

import MoreHelp from "/src/components/MoreHelp"

# Overview

**Semgrep Secrets** scans code to detect exposed API keys, passwords, and other
credentials. When exposed, these can be used by malicious actors to leak data
or gain access to sensitive systems. Semgrep Secrets allows you to determine:

* What secrets have been committed to your repository.
* The validation status of the secret; for example, **valid** secrets are those that have been tested against a web service and
confirmed to successfully grant resources or authentication. They are actively
in use. 
* For GitHub repositories: if there are credentials in public or private repositories.

Save time and effort by prioritizing valid leaked secrets. Inform developers of valid secrets in their GitHub PRs by posting PR comments. 

## How Semgrep Secrets works

To ensure that findings are high-signal, comprehensive, and easy for users to
prioritize, a Semgrep Secrets scan performs the following:

* Search using regex
* Semantic analysis
* Validation
* Entropy analysis

The following sections explain how each step works.

### Detect secrets through regex

Semgrep Secrets uses a regex language detector to find secrets in various file types. This is done by detecting a commonly defined prefix and then searching for the secret using its expected length and format.

To reduce the number of false positives this process raises, Semgrep uses and combines as many of the following processes with its search using regex when possible:

- Removal of results that are likely to be false positives
- Validation
- Entropy analysis

### Detect secrets through semantic analysis

Semantic analysis refers to Semgrep Secrets' ability to understand how data is
used within your code. This differentiates Semgrep Secrets from regex-based
detectors that simply define a pattern to match a piece of code.

Semgrep Secrets uses several mechanisms to perform semantic analysis. It uses
[<i class="fa-regular fa-file-lines"></i> data-flow
analysis](/writing-rules/data-flow/data-flow-overview/) and [<i
class="fa-regular fa-file-lines"></i> constant
propagation](/writing-rules/data-flow/constant-propagation/) which means that it
is able to track data, such as variables, and the flow of that data across files
and functions in your codebase.

Performing semantic analysis is encapsulated in [<i class="fa-regular
fa-file-lines"></i> rules](/running-rules/). By running these rules, Semgrep
Secrets is able to detect if a variable is renamed,
reassigned, or used in a function in such a way that a secret is exposed.

<!-- TODO, rewrite this to be more relevant and use a better example-->
See the following rule and JavaScript test code for an example.

<iframe title="AWS hardcoded access key" src="https://semgrep.dev/embed/editor?snippet=EPj5" width="100%" height="432px" frameBorder="0"></iframe>
<br />

<!-- 
The rule detects hardcoded AWS secret access keys. The test code defines an access key in the variable `secret`. Click **<i class="fa-solid fa-play"></i> Run** to see the true positives.
-->

<!-- Some differences between Semgrep Secrets and regex-based scanners include: -->

<!--* **Line 2:** Both can detect the variable name `secret` and its value (token)
  in line 2. * A regex-based scanner may generate a noisy finding from line 2
  even though `secret` has not been passed to any function. * Semgrep Secrets
  doesn't generate a finding because the token hasn't been passed as a
  `secretAccessKey` or similar.
* **Line 7:** Both can detect **line 6**, in which the plain-text secret is
  passed to the `AWS.config.update` function.
* **Line 17:** Both can detect **line 14**, in which `secret` is passed.
* **Line 26:** Semgrep Secrets correctly skips `conf.secret` in **line 21**.
  Regex-based scanners simply looking for matches of the string `secret`
  generate a false positive. -->

### Validate secrets 

After scanning, Semgrep Secrets uses a proprietary
**validator** to determine if a secret is actively being used or some other
state.

:::info
All validations, such as API calls, are done **locally** in your environment. No tokens are sent to Semgrep servers.
:::

1. The validator detects the service, such as Slack or AWS, that the secret
   is used for.
2. If the validator doesn't support the service that the secret is used
   for, Semgrep notes that there is **No validator** finding for the secret.
3. Semgrep Secrets performs an API
  call if the validator supports the service. The following outcomes can occur: 
   1. **Confirmed valid:** Semgrep made
   an HTTP request using the secret, and it returned an HTTP status code of 200 or
   similar **and** some indication of valid access. For example, a service can
   include a `"message": "ok"` in the response body.
   2. **Confirmed invalid:** Semgrep made an HTTP request using the secret and
   it returned an HTTP status code of 401 or similar.
   3. **Validation error:** Semgrep made an HTTP request using the secret, but
   either the network request could not be made, a timeout occurred, or
   the HTTP status code returned a different HTTP status code. In this case,
   the Semgrep Team recommends manually reviewing the finding.

By performing this validation check, you can prioritize and triage the most
high-priority, active findings.


:::note
For a list of all supported detectors that Semgrep offers, see the [Policies](/semgrep-secrets/policies) page in your deployment.
:::

### Fine-tune findings through entropy analysis

Entropy is the measure of a **string's randomness**. It's used to measure how
likely a string is random. If a string is highly entropic, it's highly
random. For certain types of secrets, such as API keys, randomness indicates
that a string could be a secret. By performing entropy analysis, Semgrep Secrets
can reduce false positives and produce more true positives.

Examples of high-entropy (random) strings:

```
VERZVs+/nd56Z+/Qxy1mzEqqBwUS1l9D4YbqmPoOß
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
```

Examples of low-entropy strings:

```
XXXXXX
txtPassword1
```

## Next steps

See [<i class="fa-regular fa-file-lines"></i> Getting started with Semgrep Secrets](/semgrep-secrets/getting-started) to learn how to:
* Enable secrets scanning for your repositories
* Manage your rules via [policies](/semgrep-secrets/policies) to have complete control over how 
* View and triage secrets-related findings
* Receive notifications and post tickets whenever Semgrep Secrets identifies issues
* Write [custom rules](/semgrep-secrets/rules) with [validators](/semgrep-secrets/validators) to find bespoke secrets

<MoreHelp />
