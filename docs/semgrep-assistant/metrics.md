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

Metrics for evaluating Semgrep Assistant's performance are derived from two sources:

- **User feedback** on Assistant recommendations within the product
- **Internal triage and benchmarking** conducted by Semgrep's security research team 

This methodology ensures that Assistant is evaluated from both user and expert perspectives. This gives Semgrep's product and engineering teams a holistic view into Assistant's real-world performance.[^1]

## User feedback

User feedback shows the aggregated and anonymized performance of Assistant across **more than 1000 customers**, providing a comprehensive **real-world dataset**. 

Users are prompted in-line to "thumbs up" or "thumbs down" Assistant suggestions as they receive Assistant suggestions in their PR or MR. This ensures that sampling bias is reduced, as both developers and AppSec engineers can provide feedback. 

**Results as of Jan 10, 2024:**

<table>
    <tr>
        <td>Customers in dataset</td>
        <td><strong>1000+</strong></td>
    </tr>
    <tr>
        <td>Findings analyzed</td>
        <td><strong>250,000+</strong></td>
    </tr>
    <tr>
        <td>Average reduction in findings[^2]</td>
        <td><strong>20%</strong></td>
    </tr>
    <tr>
        <td>Human-agree rate</td>
        <td><strong>92%</strong></td>
    </tr>
    <tr>
        <td>Median time to resolution</td>
        <td><strong>22% faster than baseline</strong></td>
    </tr>
    <tr>
        <td>Average time saved per finding</td>
        <td><strong>30 minutes</strong></td>
    </tr>
</table>

## Internal benchmarks

Internal benchmarks for Assistant use a process in which a rotating team of security engineers conduct periodic reviews of findings and their Assistant generated triage recommendations or remediation guidance. This is the same process used to evaluate Semgrep's SAST engine and rule performance.

Internal benchmarks for Assistant run on the same dataset used by Semgrep's security research team to analyze Semgrep rule performance. This means the dataset is not prone to cherry-picked findings that are easier for AI to analyze, and accurately represents real-world performance across a variety of contexts. 

<table>
    <tr>
        <td>Findings analyzed</td>
        <td><strong>2000+</strong></td>
    </tr>
    <tr>
        <td>False positive confidence rate[^3]</td>
        <td><strong>96%</strong></td>
    </tr>
    <tr>
        <td>Remediation guidance confidence rate[^4]</td>
        <td><strong>80%</strong></td>
    </tr>
</table>

[^1]: Learn more about how Semgrep achieved these numbers in [How we built an AppSec AI that security researchers agree with 96% of the time](https://semgrep.dev/blog/2025/building-an-appsec-ai-that-security-researchers-agree-with-96-of-the-time/).

[^2]:The average % of SAST findings that Assistant filters out as noise.

[^3]:False positive confidence rate measures how often Assistant is correct when it identifies a false positive. **A high confidence rate means users can trust when Assistant identifies a false positive - it does not mean that Assistant catches all false positives.** 

[^4]:Remediation guidance is rated on a binary scale of "helpful" / "not helpful".
