---
slug: glossary
description: Definitions of Semgrep Secrets product-specific terms.
tags:
    - Semgrep Secrets
title: Secrets glossary
hide_title: true
---

# Semgrep Secrets glossary

The terms and definitions provided here are specific to Semgrep Secrets.

## Entropy analysis

Entropy, the measure of a string's randomness, measures how likely it is that a given string is random. If a string is highly entropic, it's highly random. Entropy analysis, therefore, can provide insight into whether a given string is a secret, reducing false positives.

## Expiration

Some secrets are time-limited. This means that the secret is only valid for the period set by the creator. Expired secrets can pose fewer problems, so findings involving expired secrets can be deprioritized. 

## Historical scan

A scan of your Git commit history to see if there are valid secrets publicly available in your repository's Git history.

## Policy

A policy defines the set of rules that Semgrep runs and the workflow actions it undertakes when a rule from the policy generates a finding. The workflow action performed by Semgrep when it detects a finding can include notifying Slack channels or posting a comment in the pull request or merge request that generated the finding.

## Registry (Semgrep Registry)

A [<i class="fas fa-external-link fa-xs"></i> collection of rules](https://semgrep.dev/r) that you can download. Semgrep offers a 
<i class="fas fa-external-link fa-xs"></i> Secrets-specific ruleset(https://semgrep.dev/p/secrets).

### Sources of rules

The Semgrep Registry contains rules imported from various repositories, including non-Semgrep individuals or groups, such as Trail of Bits and GitLab. You can view a rule's `license` key to ensure the license meets your needs.

## Revocation

Revoking a secret makes it inactive. This can be done when a secret isn't required anymore or if a secret becomes compromised.

## Rotation

Rotating secrets is the process of updating a secret regularly. If a secret is leaked, regular rotation can ensure that the credential is valid only for a limited time. Rotating secrets can also minimize risk due to the reuse of secrets.

## Ruleset

Rulesets are rules related through a programming language, OWASP category, or framework. Rulesets are curated by the team at Semgrep and updated as new rules are added to the Semgrep Registry.

## Scan target

A scan target is any file or collection of files and directories that Semgrep can scan. While Semgrep can scan **any** text file through `generic` mode, Semgrep primarily scans the following:

### Codebase

Any code files within a specified directory and its subdirectories.

### Project

A repository or codebase that you have added to Semgrep Cloud Platform for scanning along with finding metadata and other Semgrep data and resources.

### Repository

A location, typically remote, for source code, including metadata relating to the source code. Semgrep supports Git repositories.

## Secret

Secrets are pieces of sensitive information crucial for securing applications and their data. This information can include API keys, access credentials, SSH keys, certificates, and more. If secrets are stored in source code, they can be "leaked," allowing internal and external malicious actors to use this information for unauthorized access.

## Semantic analysis

Semantic analysis refers to Semgrep Secrets' ability to understand how data is used in your code. Semgrep Secrets uses several mechanisms to perform semantic analysis, including [<i class="fa-regular fa-file-lines"></i> data-flow analysis](/writing-rules/data-flow/data-flow-overview) and [<i class="fa-regular fa-file-lines"></i> constant propagation](/writing-rules/data-flow/constant-propagation), allowing Secrets to track data, such as variables, and the flow of that data across files and functions in your codebase.

## Validation state

The validation state of a secret provides information on whether a secret, if leaked, poses an immediate security threat. Current Semgrep validation states for a secret include:

- **Confirmed valid:** Semgrep made an HTTP request using the secret, and it returned an HTTP status code of 200 or similar **and** some indication of valid access. For example, a service can include a `"message": "ok"` in the response body.
- **Confirmed invalid:** Semgrep made an HTTP request using the secret and it returned an HTTP status code of 401 or similar.
- **Validation error:** Semgrep made an HTTP request using the secret, but either the network request could not be made, a timeout occurred, or the HTTP status code returned a different HTTP status code. In this case, the Semgrep Team recommends manually reviewing the finding.
- **No Validator:** The rule does not have a validator.

## Validator

Semgrep Secrets rules include validators, which help determine if a secret is actively used. Validators define behavior, such as API calls, that determine whether an identified secret is valid and whether it can be successfully used to access a resource.

## Vault

A secure, centralized storage solution for your sensitive data, including access tokens, API keys, certificates, passwords, and more. A secrets vault can make it easier to store your data securely and allows you to control who accesses the data. The vault may also offer features like auditing, such as who accesses what secret and when or when a secret expires, and rotation of secrets.