---
slug: metrics
title: Metrics and methodology
hide_title: true
description: Learn about Semgrep Multimodal metrics and methodology.
tags:
  - Deployment
  - Semgrep Multimodal
---

# Semgrep Multimodal metrics and methodology

Metrics for evaluating Semgrep Multimodal's performance are derived from two sources:

- **User feedback** on Multimodal recommendations within the product
- **Internal triage and benchmarking** conducted by Semgrep's security research team 

This methodology ensures that Multimodal is evaluated from both user and expert perspectives. This gives Semgrep's product and engineering teams a holistic view into Multimodal's real-world performance.[^1]

## User feedback

User feedback shows the aggregated and anonymized performance of Multimodal across **more than 1000 customers**, providing a comprehensive **real-world dataset**. 

Users are prompted in-line to "thumbs up" or "thumbs down" Multimodal suggestions as they receive Multimodal suggestions in their PR or MR. This ensures that sampling bias is reduced, as both developers and AppSec engineers can provide feedback. 

**Results as of Aug 21, 2025:**

<table>
    <tr>
        <td>Customers in dataset</td>
        <td><strong>3500+</strong></td>
    </tr>
    <tr>
        <td>Findings analyzed</td>
        <td><strong>6,500,000+</strong></td>
    </tr>
    <tr>
        <td>Average reduction in findings[^2]</td>
        <td><strong>60%</strong></td>
    </tr>
    <tr>
        <td>Human-agree rate</td>
        <td><strong>96%</strong></td>
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

Internal benchmarks for Multimodal use a process in which a rotating team of security engineers conduct periodic reviews of findings and their Multimodal generated triage recommendations or remediation guidance. This is the same process used to evaluate Semgrep's SAST engine and rule performance.

Internal benchmarks for Multimodal run on the same dataset used by Semgrep's security research team to analyze Semgrep rule performance. This means the dataset is not prone to cherry-picked findings that are easier for AI to analyze, and accurately represents real-world performance across a variety of contexts. 

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

[^2]:The average % of SAST findings that Multimodal filters out as noise.

[^3]:False positive confidence rate measures how often Multimodal is correct when it identifies a false positive. **A high confidence rate means users can trust when Multimodal identifies a false positive - it does not mean that Multimodal catches all false positives.** 

[^4]:Remediation guidance is rated on a binary scale of "helpful" / "not helpful".
