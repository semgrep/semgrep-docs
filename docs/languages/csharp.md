---
slug: csharp
append_help_link: true
description: >-
  Detailed documentation for Semgrep's C# support. 
hide_title: true
tags:
    - Semgrep Code
    - Semgrep Supply Chain
title: C#
---

# C# support

:::tip 
Semgrep’s C# coverage leverages framework-specific analysis capabilities that are not present in OSS. As a result, many framework specific Pro rules will **fail** to return findings if run on OSS. To ensure full security coverage, run: `semgrep login && semgrep ci`.
:::

## Semgrep Code analyses

* Framework-specific control flow analysis 
* Interfile analysis (cross-file)
* Interprocedural analysis (cross-function)

## Coverage 

Semgrep aims to provide comprehensive and accurate detection of common OWASP Top 10 issues in source code.

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

