---
slug: metrics
title: Metrics and methodology
hide_title: true
description: Learn about Semgrep Assistant metrics and methodology.
tags:
  - Deployment
  - Semgrep Assistant
---

# Semgrep Assistant metrics and methodology

Semgrep's metrics for evaluating Semgrep Assistant's performance are derived from two sources:

- **User feedback** on Assistant recommendations within the product
- **Internal triage and benchmarking** conducted by Semgreps security research team 

This methodology ensures that Assistant is evaluated from both a user's and expert's perspective. This gives Semgrep's product and engineering teams a holistic view into Assistant's real-world performance. 

## User feedback (real-world dataset)

User feedback shows the aggregated and anonymized performance of Assistant across **more than 1000 customers**, providing a comprehensive real-world dataset. 

Users are prompted in-line to "thumbs up" or "thumbs down" Assistant suggestions as they receive Assistant suggestions in their PR or MR. This ensures that sampling bias is reduced, as both developers and AppSec engineers can provide feedback. 

**Results as of Jan 10, 2024:**

<table>
    <tr>
        <td>Customers in dataset</td>
        <td><b>1000+</b></td>
    </tr>
    <tr>
        <td>Findings analyzed</td>
        <td><b>250,000+</b></td>
    </tr>
    <tr>
        <td>Human-agree rate</td>
        <td><b>92%</b></td>
    </tr>
    <tr>
        <td>Median time to resolution</td>
        <td><b>22% faster than baseline</b></td>
    </tr>
    <tr>
        <td>Average time saved per finding</td>
        <td><b>30 minutes</b></td>
    </tr>
</table>

## Internal benchmarks

Internal benchmarks for Assistant use a process in which a rotating team of security engineers conduct periodic reviews of findings and their Assistant generated triage recommendations or remediation guidance. This is the same process used to evaluate Semgrep's SAST engine and rule performance.

Internal benchmarks for Assistant run on the same dataset used by Semgrep's security research team to analyze Semgrep rule performance. This means the dataset is not prone to cherry-picked findings that are easier for AI to analyze, and accurately represents real-world performance across a variety of contexts. 

<table>
    <tr>
        <td>Findings analyzed</td>
        <td><b>2000+</b></td>
    </tr>
    <tr>
        <td>Average reduction in findings[^1]</td>
        <td><b>20%</b></td>
    </tr>
    <tr>
        <td>False positive confidence rate[^2]</td>
        <td><b>96%</b></td>
    </tr>
    <tr>
        <td>Remediation guidance confidence rate[^3]</td>
        <td><b>80%</b></td>
    </tr>
</table>

[^1]:The average % of SAST findings that Assistant filters out as noise.  

[^2]:False positive confidence rate measures how often Assistant is correct when it identifies a false positive. **A high confidence rate means users can trust when Assistant identifies a false positive - it does not mean that Assistant catches all false positives.** 

[^3]:Remediation guidance is rated on a binary scale of "helpful" / "not helpful".  
