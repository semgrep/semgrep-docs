---
slug: glossary
title: Semgrep Code glossary 
hide_title: true
description: Definitions of Semgrep Code product-specific terms.
tags:
  - Semgrep Code
---

# Semgrep Code product terms 

The definitions provided here are specific to each term's meaning and use in Semgrep.

For rule-writing and SAST (static application security testing) terms, see the [Rule-writing glossary](/rule-writing/glossary).

## Diff-aware scan

A diff-aware scan is a type of scan that scans changes in files starting from a certain git baseline. It is typically performed on feature branches when a pull or merge request is opened.

## Full scan

A full scan scans the entire codebase or git repository in its current state. It is typically performed on trunk or mainline branches, such as `master`. Semgrep, Inc. recommends scanning on a recurring basis, such as daily or weekly.

## Policy

A policy in Semgrep Code refers to the set of rules that Semgrep runs and the workflow actions undertaken when a rule from the policy generates a finding. A workflow action is an action that is performed by Semgrep when a finding is detected, such as notifying Slack channels or posting a comment in the PR or MR that generated the finding.

Not to be confused with **policy-as-code**.

## Registry (Semgrep Registry)

A [collection of publicly-available SAST rules](https://semgrep.dev/r) that you can download from. It can be filtered by language, OWASP bug class, severity, and so on. Many of these rules are open source, and you can also view the license of the rule you are using. Contributions are welcome.

