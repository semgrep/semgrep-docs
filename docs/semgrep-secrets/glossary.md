---
slug: glossary
description: Definitions of Semgrep Secrets product-specific terms.
tags:
    - Semgrep Secrets
title: Glossary
hide_title: true
---

import ValidationStates from '/src/components/reference/_validation-states.mdx'

import ScanTarget from '/src/components/reference/_scan-target.mdx'
import PolicyDefinition from '/src/components/reference/_policy-definition.mdx'

# Semgrep Secrets glossary

The terms and definitions provided here are specific to Semgrep Secrets.

## Entropy analysis

Entropy, the measure of a string's randomness, measures how likely it is that a given string is random. If a string is highly entropic, it's highly random. Entropy analysis, therefore, can provide insight into whether a given string is a secret, reducing false positives.

## Expiration

Some secrets are time-limited. This means that the secret is only valid for the period set by the creator. Expired secrets can pose fewer problems, so findings involving expired secrets can be deprioritized. 

## Historical scan

A scan of your Git commit history to see if there are valid secrets publicly available in your repository's Git history.

## Policy

<PolicyDefinition />

## Registry (Semgrep Registry)

A [<i class="fas fa-external-link fa-xs"></i> collection of rules](https://semgrep.dev/r) that you can download. Semgrep offers a 
<i class="fas fa-external-link fa-xs"></i> [Secrets-specific ruleset](https://semgrep.dev/p/secrets).

### Sources of rules

The Semgrep Registry contains rules imported from various repositories, including non-Semgrep individuals or groups, such as Trail of Bits and GitLab. You can view a rule's `license` key to ensure the license meets your needs.

## Revocation

Revoking a secret makes it inactive. This is done when a secret isn't required anymore or if a secret becomes compromised.

## Rotation

Rotating secrets is the process of updating a secret regularly. If a secret is leaked, regular rotation can ensure that the credential is valid only for a limited time. Rotating secrets can also minimize risk due to the reuse of secrets.

## Ruleset

Rulesets are rules related through a programming language, OWASP category, or framework. Rulesets are curated by the team at Semgrep and updated as new rules are added to the Semgrep Registry.

<ScanTarget />

## Secret

Secrets are pieces of sensitive information crucial for securing applications and their data. This information can include API keys, access credentials, SSH keys, certificates, and more. If secrets are stored in source code, they can be "leaked," allowing internal and external malicious actors to use this information for unauthorized access.

## Semantic analysis

Semantic analysis refers to Semgrep Secrets' ability to understand how data is used in your code. Semgrep Secrets uses several mechanisms to perform semantic analysis, including [<i class="fa-regular fa-file-lines"></i> data-flow analysis](/writing-rules/data-flow/data-flow-overview) and [<i class="fa-regular fa-file-lines"></i> constant propagation](/writing-rules/data-flow/constant-propagation), allowing Secrets to track data, such as variables, and the flow of that data across files and functions in your codebase.

## Validation state

The validation state of a secret provides information on whether a secret, if leaked, poses an immediate security threat. Current Semgrep validation states for a secret include:

<ValidationStates />

## Validator

Semgrep Secrets rules include validators, which help determine if a secret is actively used. Validators define behavior, such as API calls, that determine whether an identified secret is valid and whether it can be successfully used to access a resource.

## Vault

A secure, centralized storage solution for your sensitive data, including access tokens, API keys, certificates, passwords, and more. A secrets vault can make it easier to store your data securely and allows you to control who accesses the data. The vault may also offer features like auditing, such as who accesses what secret and when or when a secret expires, and rotation of secrets.