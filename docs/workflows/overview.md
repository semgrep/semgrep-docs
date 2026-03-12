---
slug: overview
title: Workflows
hide_title: true
description: Learn how to use Semgrep Workflows to automate code security at scale.
tags:
  - workflows
  - deployment
---

# Workflows

<!-- Semgrep Workflows is a programmable system for expressing and automating code security work at scale. This allows AppSec teams to encode how they perform their code-focused work and run that process across their entire organization. --> Semgrep Workflows is a framework for building automated code security workflows. It pairs AI agents with deterministic security tools to help you detect, triage, and fix security issues in your projects.

A workflow is a sequence of steps, written as code, that:

1. Takes your code and security context as input
2. Applies security tools, such as static analysis, software composition analysis, and secrets detection, LLM-backed analysis, and conditional behavior
3. Produces structured output, such as securiting findings, triage decisions, research artifacts, and code changes

Semgrep offers pre-built workflows that you can run immediately, including those that scan your project for security vulnerabilities. These include issues like injection-type issues and SSRF, as well as more complex issues like IDOR, access control issues, and other logic errors.

Semgrep also offers a toolkit that enables you to build new workflows to meet the unique needs of your organization. 

## Workflow components

- **Workflow design system language (DSL)**: Semgrep Workflows are designed using YAML syntax with an optional Python SDK.
- **Tools**: containerized code-aware and security-aware primitives for inspecting and manipulating code and security data, including program analysis, structured LLM calls, and bring-your-own tools, all with explicit inputs and structured outputs.
- **CLI**: A local command-line interface for executing, debugging, and publishing workflows that uses Docker to ensure consistent behavior between local and production Workflow runs.
- **Semgrep Managed Scans (SMS)**: SMS orchestrates the implementation of the workflow you define

## Out-of-the-box workflows

## Custom workflows

Because no two organizations have the same security requirements, Semgrep offers an agent SDK that you can use to create fully custom workflows. Contact your Semgrep Sales Engineer for further information on implementing custom workflows for your organization.


