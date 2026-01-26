---
slug: language-maturity-levels
append_help_link: true
title: Language maturity levels
hide_title: true
description: Definitions for language maturity levels across Semgrep products.
tags:
  - Reference
---

import LanguageMaturityCode from '/src/components/reference/_language-maturity-code.md'

# Language maturity levels

Use these definitions to understand the maturity levels shown on the [Supported languages](/docs/supported-languages) page.

## Semgrep Code

Semgrep Code languages can be classified into four maturity levels:

- Generally available (GA)
- Beta
- Experimental
- Community supported\*

\*Community supported languages meet the parse rate and syntax requirements of
**Experimental** languages. Users can still access community rules or write their
own rules.

<LanguageMaturityCode />

## Semgrep Supply Chain

Semgrep Supply Chain has two language maturity levels:

- Generally available
- Beta

<table>
  <tr>
    <td><strong>Feature</strong></td>
    <td><strong>Generally available</strong></td>
    <td><strong>Beta</strong></td>
  </tr>
  <tr>
    <td>Number of reachability rules</td>
    <td>As defined by <a href="/semgrep-supply-chain/sca-feature-support#cve-coverage">CVE coverage</a>.</td>
    <td>All critical severity CVEs from <a href="/semgrep-supply-chain/sca-feature-support#supported-sources">supported sources</a> starting 2022 onwards, for packages used by customers with an active, paid subscription.</td>
  </tr>
  <tr>
    <td>Semgrep, Inc. rule-writing support</td>
    <td>Quickly support CVE coverage with reachability analysis for all critical and high vulnerabilities based on the latest <a href="https://nvd.nist.gov/vuln">security advisories</a>.</td>
    <td>Coverage for CVEs but without reachability analysis.</td>
  </tr>
  <tr>
    <td>Semgrep Community Edition (CE) <a href='/supported-languages#semgrep-oss-language-support'>language support</a></td>
    <td>Semgrep CE support is GA.</td>
    <td>Semgrep CE support is at least Beta.</td>
  </tr>
</table>
