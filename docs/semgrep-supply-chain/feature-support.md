---
slug: sca-feature-support
append_help_link: true
title: Feature support
hide_title: true
description: Feature coverage for Semgrep Supply Chain across supported languages.
tags:
  - Semgrep Supply Chain
---

import SscIntro from "/src/components/concept/_ssc-intro.md"

# Supply Chain feature support

<SscIntro/>

The following table lists all Supply Chain features for each language. Languages
with **reachability** support are listed first.

<table>
<thead>
<tr>
<th>Language</th>
<th align="center">Reachability<br />(see <a href="#cve-coverage">CVE coverage</a>)</th>
<th><a href="/docs/semgrep-supply-chain/getting-started#scan-a-project-without-lockfiles-beta">Scan without lockfiles (beta)</a></th>
<th>License detection</th>
<th>Malicious dependency<br />detection</th>
</tr>
</thead>
<tbody>
<tr>
<td>C#</td>
<td align="center">✅</td>
<td align="center">✅</td>
<td align="center">✅</td>
<td align="center">✅</td>
</tr>
<tr>
<td>Go</td>
<td align="center">✅</td>
<td align="center">--</td>
<td align="center">✅</td>
<td align="center">✅</td>
</tr>
<tr>
<td>Java</td>
<td align="center">✅</td>
<td align="center">✅</td>
<td align="center">✅</td>
<td align="center">--</td>
</tr>
<tr>
<td>JavaScript or TypeScript</td>
<td align="center">✅</td>
<td align="center">--</td>
<td align="center">✅</td>
<td align="center">✅</td>
</tr>
<tr>
<td>Kotlin</td>
<td align="center">✅</td>
<td align="center">✅</td>
<td align="center">✅</td>
<td align="center">--</td>
</tr>
<tr>
<td>Python</td>
<td align="center">✅</td>
<td align="center">✅</td>
<td align="center">✅<br /> For PyPi only</td>
<td align="center">✅</td>
</tr>
<tr>
<td>Ruby</td>
<td align="center">✅</td>
<td align="center">--</td>
<td align="center">✅</td>
<td align="center">✅</td>
</tr>
<tr>
<td>Scala</td>
<td align="center">✅</td>
<td align="center">--</td>
<td align="center">✅</td>
<td align="center">--</td>
</tr>
<tr>
<td>Swift</td>
<td align="center">✅</td>
<td align="center">--</td>
<td align="center">✅†</td>
<td align="center">--</td>
</tr>
<tr>
<td>PHP</td>
<td align="center">✅</td>
<td align="center">--</td>
<td align="center">✅</td>
<td align="center">--</td>
</tr>
<tr>
<td>Rust</td>
<td align="center" width="180px" rowspan="3">No reachability analysis. However, Semgrep can compare a package's version against a list of versions with known vulnerabilities.</td>
<td align="center">--</td>
<td align="center">✅</td>
<td align="center">✅</td>
</tr>
<tr>
<td>Dart</td>
<td align="center">--</td>
<td align="center">--</td>
<td align="center">--</td>
</tr>
<tr>
<td>Elixir</td>
<td align="center">--</td>
<td align="center">--</td>
<td align="center">--</td>
</tr>
</tbody>
</table>

_<strong>†</strong>License detection for new packages is asynchronous and processed
after the initial scan. Policies aren't applied on first detection, but are enforced
in subsequent scans._

## CVE coverage

For customers with an active paid subscription, Semgrep’s reachability analysis
covers all **critical and high severity** CVEs from [supported sources](#supported-sources)
starting in 2017 across all supported languages.

### Supported sources

- [<i class="fas fa-external-link fa-xs" /> Reviewed GitHub Security Advisories](https://github.com/advisories?query=type%3Areviewed)
- [<i class="fas fa-external-link fa-xs" /> Electron release notes](https://releases.electronjs.org/releases/stable)
