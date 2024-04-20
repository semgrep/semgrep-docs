---
slug: glossary
title: Code glossary
hide_title: true
description: Definitions of Semgrep Code product-specific terms.
tags:
  - Semgrep Code
  - Team & Enterprise Tier
---

# Semgrep Code product terms

The definitions provided here are specific to each term's meaning and use in Semgrep.

For rule-writing and SAST (static application security testing) terms, see the [Rule-writing glossary](/writing-rules/glossary).

## Diff-aware scan

A diff-aware scan is a type of scan that scans changes in files starting from a certain Git baseline. It is typically performed on feature branches when a pull or merge request is opened.

## Full scan

A full scan scans the entire codebase or Git repository in its current state. It is typically performed on trunk or mainline branches, such as `master`. Semgrep, Inc. recommends performing full scans on a recurring basis, such as daily or weekly.

## Policy

A policy in Semgrep Code refers to the set of rules that Semgrep runs and the workflow actions undertaken when a rule from the policy generates a finding. A workflow action is an action that is performed by Semgrep when a finding is detected, such as notifying Slack channels or posting a comment in the PR or MR that generated the finding.

Not to be confused with **policy-as-code**.

## Registry (Semgrep Registry)

A [<i class="fas fa-external-link fa-xs"></i> collection of publicly available SAST rules](https://semgrep.dev/r) that you can download from. It can be filtered by language, OWASP bug class, severity, and so on. Many of these rules are open source, and you can also view the license of the rule you are using. Contributions are welcome.

Rules are frequently organized by rulesets, enabling you to find related rules by framework and language.

## Scan target

A scan target is any file, or collection of files and directories that Semgrep can scan. While Semgrep can scan **any** text file through `generic` mode, Semgrep primarily scans the following:

### Codebase

Any code files within a specified directory and its subdirectories.

### Project

A repository or codebase that you have added to Semgrep Cloud Platform for scanning along with finding records and other Semgrep data and resources.

### Repository

A location, typically remote, for source code, including metadata relating to the source code. Semgrep supports Git repositories.
