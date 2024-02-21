---
slug: core-deployment 
append_help_link: true
title: Core deployment 
description: Learn how to set up a Semgrep OSS deployment for yourself or your organization.
tags:
  - Deployment
  - Semgrep OSS Engine 
---

# Semgrep OSS Deployment


Semgrep OSS can be set up run static application security testing (SAST) scans on repositories of any size.

**Deployment** refers to the process of integrating Semgrep into your developer and infrastructure workflows. This is mainly achieved by running Semgrep OSS in your CI pipeline.

This guide explains how to set up Semgrep OSS in your pipeline **without** the use of Semgrep Cloud Platform or any other Semgrep products.

## Limitations of Semgrep OSS CI scans 

Running Semgrep in CI without Semgrep Cloud Platform has specific limitations compared to the use of Semgrep in CI with Semgrep Cloud Platform. See the following list:

* Stand-alone CI jobs cannot send [PR or MR comments](/category/pr-or-mr-comments/). These comments describe the finding and help developers resolve vulnerabilities and other code issues.
* Stand-alone CI jobs cannot fail a CI job based on the severity of a finding or some other user-defined criteria. There are no user-defined rule modes to distinguish between rules.
* Findings are written to a log, but there is no record of a finding's **status**, such as open, ignored, or fixed.

## Set up the CI job


