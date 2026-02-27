---
description: Learn why the scan duration for a managed scan differs from the scan duration reported by a CI/CD provider.
tags:
  - Semgrep AppSec Platform
  - Semgrep Managed Scans
---

# Why is the scan duration reported by Semgrep different from the scan duration of the entire process of running a diff-aware managed scan?

The **Duration** of a scan shown on Semgrep AppSec Platform's **Projects** page reflects the amount of time required to run the Semgrep scan. This timer begins when Semgrep generates and sends the scan ID and ends when Semgrep sends results and a `scan complete` response. 

However, the full scanning process for your project likely takes longer. For example, if your CI/CD system displays a process time that is longer than the scan duration displayed in Semgrep AppSec Platform, this value likely includes the time required for setup, pre-processing, and post-processing steps.
