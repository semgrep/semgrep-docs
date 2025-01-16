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

Semgrep's metrics for evaluating Semgrep Assistant's performance are derived from two key sources:

- **User feedback** on Assistant recommendations within the product
- **Internal triage and benchmarking** conducted by Semgreps security research team 

This methodology ensures that Assistant is evaluated from both a user-centric perspective and through expert-driven technical scrutiny, giving Semgrep's product and engineering teams a holistic view into Assistant's real-world performance. 

## User feedback (real-world dataset)

User feedback shows the aggregated and anonymized performance of Assistant across **1000+ customers**, providing a comprehensive real-world dataset. 

The user feedback loop is baked into product workflows to ensure comprehensiveness and to reduce sampling bias. Users are prompted in-line to "thumbs up" or "thumbs down" Assistant suggestions. 

**Results as of Jan 10, 2024:**

|                        |         |
|------------------------|---------|
| Customers in dataset   | **1000+**|
| Findings analyzed | **250,000+** |
| Human-agree rate       | **92%** |
| Median time to resolution     | **22% faster than baseline** |
| Average time saved per finding   | **30 minutes** |

## Internal benchmarks (internal dataset)

Internal benchmarks for Assistant utilize a systemic process in which a rotating team of security engineers conduct periodic reviews of findings and their Assistant generated triage recommendations/remediation guidance. This is the same process used to evaluate Semgrep's SAST engine and rule performance.

Internal benchmarks for Assistant run on the same dataset used by Semgrep's security research team to analyze Semgrep rule performance. This means the dataset is not prone to cherry-picked findings that are easier for AI to analyze, and accurately represents real-world performance across a variety of contexts. 

|                        |         |
|------------------------|---------|
| Findings analyzed  | **2000+**|
| Average reduction in findings[^1] | **20%**|
| False positive confidence rate[^2]      | **96%** |
| Remediation guidance confidence rate[^3]    | **80%** |

[^1]:The average % of SAST findings that Assistant filters out as noise.  

[^2]:False positive confidence rate measures how often Assistant is correct when it identifies a false positive. **A high confidence rate means users can trust when Assistant identifies a false positive - it does not mean that Assistant catches all false positives.** 

[^3]:Remediation guidance is rated on a binary scale of "helpful" / "not helpful".  
