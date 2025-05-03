---
slug: python
id: python
append_help_link: true
description: >-
  Detailed documentation for Semgrep's Python support. 
hide_title: true
tags:
    - Semgrep Code 
title: Python
---

import SupportedLibrariesTable from '/src/components/reference/_supported-libraries-python-table.md'
import LangCallout from "/src/components/concept/_lang-callout.md"
import LangCoverage from "/src/components/concept/_lang-coverage.md"
import LangDefCode from "/src/components/concept/_lang-def-code.md"
import LangDefSsc from "/src/components/concept/_lang-def-ssc.md"
import LangCeIntro from "/src/components/concept/_lang-ce-intro.md"
import LangSscFeatures from "/src/components/concept/_lang-ssc-features.md"

# Python support

<LangCallout name="Python" />

## Python support in Semgrep Code

<LangDefCode />

### Analyses and frameworks

* Framework-specific control flow analysis 
* Interfile analysis (cross-file)
* Interprocedural analysis (cross-function)
* All analyses performed by [Semgrep CE](#python-support-in-semgrep-ce)

## Coverage 

<LangCoverage />

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

### Benchmark results exclusive of [AI](https://semgrep.dev/docs/semgrep-assistant/overview) processing

Semgrep's benchmarking process involves scanning open source repositories, triaging the findings, and making iterative rule updates. This process was developed and is used internally by the Semgrep security research team to monitor and improve rule performance.

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

## Python support in Semgrep Supply Chain

<LangDefSsc />

### Supported package managers

Semgrep supports the following Python package managers:

- pip
- pip-tools
- Pipenv
- Poetry

### Analyses and features

The following analyses and features are available for Python:

<LangSscFeatures />

## Python support in Semgrep CE

<LangCeIntro />
<!-- use a component here -->


The Semgrep Registry provides the following JavaScript rulesets:

- [<i class="fas fa-external-link fa-xs"></i> `p/default`](https://semgrep.dev/p/default)
-  [<i class="fas fa-external-link fa-xs"></i> `p/python`](https://semgrep.dev/p/python)
- [<i class="fas fa-external-link fa-xs"></i> `p/trailofbits`](https://semgrep.dev/p/trailofbits)
- [<i class="fas fa-external-link fa-xs"></i> `p/xss`](https://semgrep.dev/p/trailofbits)

Sample usage:

```bash
semgrep scan --config p/python
```

