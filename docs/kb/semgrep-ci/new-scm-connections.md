---
title: Why are there new source code manager (SCM) connections that I didn't manually configure listed in Semgrep AppSec Platform?
hide_title: true
description: Learn why there are new SCMs listed in Semgrep AppSec Platform.
tags:
  - GitHub
  - GitLab
  - Semgrep in CI
---

# Why are there new source code manager (SCM) connections that I didn't manually configure listed in Semgrep AppSec Platform?

If you initiate Semgrep scans using GitHub Actions or GitLab CI/CD pipeline, Semgrep may automatically create new SCM connections and add the accompanying projects to Semgrep AppSec Platform. This can happen if the CI job has sufficient permissions through the access token you provide to create the connection between Semgrep and GitHub or GitLab.

The projects associated with the newly created SCM connections are listed in Semgrep AppSec Platform on the **Projects > Not scanning** page. They are not automatically scanned by Semgrep.
