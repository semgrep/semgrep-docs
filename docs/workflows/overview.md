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

Semgrep Workflows is a programmable system for expressing and automating code security work at scale. This allows AppSec teams to encode how they perform their code-focused work and run that process across their entire organization.

A workflow is a sequence of steps that:

1. Takes your code and security context as input
2. Applies tools, LLM-backed analysis, and conditional behavior
3. Produces structured output, such as securiting findings, triage decisions, research artifacts, and code changes

You can codify security issues as a rule, as well as encode risk assessment, triage logic, and remediation guidance as executable workflows. This allows you to make the logic that your AppSec teams routinely apply explic, reproducible, and scalable.

## Workflow components

- **Workflow design system language (DSL)**: Semgrep Workflows are designed using YAML syntax with an optional Python SDK.
- **Tools**: containerized code- and security-aware primitives for inspecting and manipulating code and security data, including program analysis, structured LLM calls, and bring-your-own tools, all with explicit inputs and structured outputs.
- **CLI**: A local command-line interface for executing, debugging, and publishing workflows that uses Docker to ensure consistent behavior between local and production Workflow runs.
- **Semgrep Managed Scans (SMS)**: SMS orchestrates the implementation of the workflow you define.
