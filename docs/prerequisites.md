---
slug: prerequisites
append_help_link: true
title: Prerequisites
hide_title: true
description: Required software or services to run various Semgrep products.
tags:
  - Deployment
---

# Prerequisites

This document details the required software or services to run Semgrep products.

## Overall

A programming language must be supported by Semgrep for your chosen product.

| Product              | Scan type | Link   |
| -------              | ------    | ------ |
| Semgrep OSS          | SAST      | [Supported languages](/supported-languages/#language-maturity)  |
| Semgrep Code         | SAST      | [Supported languages](/supported-languages/#language-maturity)  |
| Semgrep Supply Chain | SCA       | [Supported languages](/supported-languages/#semgrep-supply-chain)       |
| Semgrep Secrets      | Secrets   | Language-agnostic       |

<!-- Update Secrets with service validators once available -->

## Semgrep command-line tool

These requirements apply to both Semgrep Pro and Semgrep OSS.

### Software

- Python 3.8 or later installed on the machine you are running Semgrep on.

### Operating system

- macOS
- Linux
- Windows Subsystem for Linux (WSL)

## Semgrep Cloud Platform

- A GitHub or GitLab cloud account. The credentials are used to authenticate and identify you.
- A Git repository to scan, stored in in any of the following source code managers:
    - GitHub
    - GitLab
    - Bitbucket
    - Azure Repos
- A CI provider and sufficient permissions to create CI jobs.

<!-- IDEs - to add after -->
