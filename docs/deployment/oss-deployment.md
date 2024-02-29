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

This guide explains how to set up Semgrep OSS in your pipeline **without** the use of Semgrep Cloud Platform or any other Semgrep products, also known as a stand-alone setup.

For a comparison of the behavior between Semgrep OSS CI scans and Semgrep Pro scans, see

## Set up the CI job

<!-- old
semgrep ci is the command used to run Semgrep in a CI environment. In most cases, this is the recommended command to run in the CI job. This command is a subset of the semgrep scan command.

-->

Use `semgrep scan` in your job to run Semgrep OSS in a CI environment.


## Semgrep OSS CI scans versus Semgrep Pro scans

<!-- should be a table -->
* Stand-alone Semgrep jobs cannot send [PR or MR comments](/category/pr-or-mr-comments/). These comments describe the finding and help developers resolve vulnerabilities and other code issues.
* Stand-alone Semgrep jobs cannot fail a CI job based on the severity of a finding or some other user-defined criteria. There are no user-defined rule modes to distinguish between rules.
* Findings are written to a log, but there is no record of a finding's **status**, such as open, ignored, or fixed.
* Stand-alone jobs do not run software composition analysis (SCA) or secrets detection scans.
