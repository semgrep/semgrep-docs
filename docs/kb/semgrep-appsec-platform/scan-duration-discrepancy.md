---
description: Learn why the scan duration for a managed scan differs from the scan duration reported by a CI/CD provider.
tags:
  - Semgrep AppSec Platform
  - Semgrep Managed Scans
---

# Why is the scan duration reported by Semgrep different from the scan duration of the entire process of running a diff-aware managed scan?

The **Duration** of a scan shown on Semgrep AppSec Platform's **Projects** page reflects the amount of time required to run the a Semgrep Managed Scan (SMS). This begins when Semgrep generates and sends the scan ID and ends when Semgrep sends results and a scan complete response. 

However, the full scanning process for your project likely takes longer, as it includes setup, pre-processing, and post-processing. For example, if your CI/CD system displays a process time that is longer than the scan duration displayed in Semgrep AppSec Platform, it includes the time it takes to do things like:

- Receiving and processing the webhook notification to start the scan and the check
- Relaying the scan setup data to the SMS cluster that runs the scan
- Waiting for the job to start on the node, pod, or container on the SMS cluster
- Cloning the repository
- Running the scan
- Reporting the results 
- Getting a scan complete response
- Printing the result
