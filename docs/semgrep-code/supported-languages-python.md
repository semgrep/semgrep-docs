---
slug: supported-languages-python
id: supported-languages-python
append_help_link: true
description: >-
  Detailed documentation for Semgrep's Python support. 
hide_title: true
tags:
    - Semgrep Code 
title: Supported languages for Python
---

import SupportedLibrariesTable from '/src/components/reference/_supported-libraries-python-table.md'

# Python

:::tip 
Semgrep’s Python coverage leverages framework-specific analysis capabilities that are not present in OSS. As a result, many framework specific Pro rules will **fail** to return findings if run on OSS. To ensure full security coverage, run: `semgrep login && semgrep ci`.
:::

## Semgrep Code: Analysis capabilities for Python
* Framework-specific control flow analysis 
* Inter-file analysis (cross-file)
* Inter-procedural analysis (cross-function)

## Coverage 
_Semgrep's coverage ethos: comprehensive and accurate detection of common, OWASP Top 10 issues in source code_


In addition to rules, the Semgrep engine itself can analyze code and implicit dataflows in the context of the following supported frameworks:

<table>
    <thead><tr>
        <td><strong>Framework / library</strong></td>
        <td><strong>Category</strong></td>
    </tr></thead>
    <tbody>
    <tr>
        <td>Django</td>
        <td>Web framework</td>
    </tr>
    <tr>
        <td>Flask</td>
        <td>Web framework</td>
    </tr>
    <tr>
        <td>FastAPI</td>
        <td>Web framework</td>
    </tr>
    </tbody>
</table>

<details>
  <summary>**In addition, Semgrep Code supports 100+ libraries & frameworks based on their overall popularity.**</summary>

<SupportedLibrariesTable />

</details>

### Benchmark results (_exclusive of_ [AI](https://semgrep.dev/docs/semgrep-assistant/overview) processing): 

Our benchmarking process involves scanning open-source repositories, triaging the findings, and making iterative rule updates. This process was developed and is used internally by our security research team to monitor and improve rule performance.

Results as of **September 9, 2024**:

<table>
    <tbody>
    <tr>
        <td>Benchmark true positive rate (before AI processing) for latest ruleset</td>
        <td>**84%**</td>
    </tr>
    <tr>
        <td>Lines of code scanned</td>
        <td>**~20 million**</td>
    </tr>
    <tr>
        <td>Repositories scanned</td>
        <td>**192**</td>
    </tr>
      <tr>
        <td>Findings triaged to date</td>
        <td>**~1000**</td>
    </tr>
    
    </tbody>
</table>
