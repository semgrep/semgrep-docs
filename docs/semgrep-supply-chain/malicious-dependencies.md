---
slug: malicious-dependencies
title: Detect and remove malicious dependencies
hide_title: true
description: tk
tags:
  - Semgrep Supply Chain
---

# Detect and remove malicious dependencies

:::info
This feature is in private beta. To join, reach out to [<i class="fa-regular fa-envelope"></i> support@semgrep.com](mailto:support@semgrep.com).
:::

**Malicious dependencies** are intentionally dangerous packages, designed to compromise systems, unlike vulnerable dependencies, which are accidentally risky. These threats include packages that have always been malicious, such as typo-squatting attacks, or packages that become malicious after an attacker compromises a maintainer or injects harmful code. In some of these cases, the maliciousness of a package affects a specific range of versions.

Semgrep is able to detect malicious dependencies in your projects and in pull requests (PRs) or merge requests (MRs).

This feature is enabled after opting in to the beta program.

## Supported package managers and sources of information

Semgrep ingests data from Open Source Vulnerabilities ([<i class="fas fa-external-link fa-xs"></i>  osv.dev](https://osv.dev/)).

The following table lists the languages for which Supply Chain can detect malicious dependencies.

| Language | Package manager or ecosystem |
| :---- | :---- |
| C\# | NuGet |
| Dart | Pub |
| Elixir | Hex |
| Go | `go.mod` |
| Java | Maven |
| Python | PyPi |
| Ruby | RubyGems |
| Scala | Maven |
| Swift | SwiftPM |
| PHP | \-- |
| Rust | \-- |

## About malicious dependency findings

Malicious dependency findings are treated as **critical severity** findings.

If you have set up your Supply Chain policies to block with these conditions, malicious dependency findings block a PR or MR in the same way as any other Supply Chain finding.

<!--  No way to do this currently
## Enable or disable malicious dependency detection

1. Click Settings \> …
-->

## View malicious dependencies

Malicious dependencies appear in [**Supply Chain > Vulnerabilities**](https://semgrep.dev/orgs/-/supply-chain/vulnerabilities?primary=true&tab=open&last_opened=All+time), alongside other Supply Chain findings. They are denoted by the **Malicious** badge.

![Malicious dependency finding with badge](/img/findings-maldeps.png)
_**Figure**. A malicious dependency finding._

Use the **Malicious dependencies <i class="fa-solid fa-toggle-large-on"></i> toggle** to filter for malicious dependencies detected in your projects. Ensure that you don't have other filters enabled as this may inadvertently hide findings.

## Remediate malicious dependencies

* Does Semgrep give suggestions (i.e. in the case of typo squatting) of how to fix?  
* How is our remediation advice presented?

## Advisories for malicious dependencies

You can view all the malicious dependencies that Semgrep can detect by navigating to [**Supply Chain > Advisories**](https://semgrep.dev/orgs/-/supply-chain/advisories) and clicking on the **<i class="fa-solid fa-square-check"></i> Malicious package** filter.
