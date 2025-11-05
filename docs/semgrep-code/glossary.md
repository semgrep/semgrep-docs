---
slug: glossary
title: Code glossary
hide_title: true
description: Definitions of Semgrep Code product-specific terms.
tags:
  - Semgrep Code
---

import ScanTarget from '/src/components/reference/_scan-target.mdx'
import PolicyDefinition from '/src/components/reference/_policy-definition.mdx'

# Semgrep Code product terms

The terms and definitions provided here are specific to Semgrep Code.

For rule-writing and SAST (static application security testing) terms, see the [Rule-writing glossary](/writing-rules/glossary).

## Default branch

Also known as a **mainline**, **primary**, or **trunk** branch. In many cases, Semgrep automatically detects these branches as primary branches when it first scans your project. If you have projects (repositories) with unique primary branch names, you can set them through the Semgrep web app.

## Diff-aware scan

A diff-aware scan is a type of scan that shows only the findings that have been caused by changes in files starting from a specific Git baseline. It is typically performed on feature branches when a pull request or merge request is opened. Unlike full scans, diff-aware scans only consider changes within modified files. At this time, cross-file analysis is not supported for diff-aware scans.

## Full scan

A full scan scans the entire codebase or Git repository in its current state. It is typically performed on trunk or mainline branches, such as `main`. Semgrep, Inc. recommends performing full scans on a recurring basis, such as daily or weekly.

## Policy

<PolicyDefinition />

## Registry (Semgrep Registry)

A [<i class="fas fa-external-link fa-xs"></i> collection of publicly available SAST rules](https://semgrep.dev/r) that you can download. Rules can be filtered by language, OWASP bug class, severity, and so on. [<i class="fas fa-external-link fa-xs"></i> Contributions are welcome](/contributing/contributing-to-semgrep-rules-repository). 

Rules are frequently organized by [rulesets](#ruleset), enabling you to find related rules by framework and language.

### Sources of rules

The Registry contains rules imported from various repositories. These include rules authored by other individuals or groups, such as Trail of Bits and GitLab.

You can view a rule's `license` key to ensure the license meets your needs.

## Ruleset

Rulesets are rules related through a programming language, OWASP category, or framework. Rulesets are curated by the team at Semgrep and updated as new rules are added to the Semgrep Registry.

<ScanTarget />
