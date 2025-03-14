---
slug: malicious-dependencies
title: Detect and remove malicious dependencies
hide_title: true
description: Learn how Semgrep detects malicious dependencies and enable malicious dependency detection in your Supply Chain scans.
tags:
  - Semgrep Supply Chain
---

# Detect and remove malicious dependencies

:::info
This feature is in private beta. To join, reach out to [support](/support).
:::

**Malicious dependencies** are dangerous packages, or dangerous versions of packages, that are designed to compromise systems. These threats include packages that have always been malicious, such as typo-squatting attacks, or packages that become malicious after an attacker compromises a maintainer or injects harmful code. They are also known as malware.

Semgrep is able to detect malicious dependencies in your projects and in pull requests (PRs) or merge requests (MRs).

This feature is enabled after opting in to the beta program.

## Supported package managers and sources of information

Semgrep ingests data from <i class="fas fa-external-link fa-xs"></i>[Open Source Vulnerabilities](https://osv.dev/)).

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

## Malicious dependency findings

Malicious dependency findings are treated as **critical severity** findings.

If you have set up your Supply Chain policies to block with this condition, malicious dependency findings block a PR or MR in the same way as any other Supply Chain finding.

<!--  No way to do this currently
## Enable or disable malicious dependency detection

1. Click Settings \> …
-->

## View malicious dependencies

Malicious dependencies appear in [**Supply Chain > Vulnerabilities**](https://semgrep.dev/orgs/-/supply-chain/vulnerabilities?primary=true&tab=open&last_opened=All+time), alongside other Supply Chain findings. They are denoted by the **Malicious** badge.

![Malicious dependency finding with badge](/img/findings-maldeps.png)
_**Figure**. A malicious dependency finding._

Use the **Malicious dependencies <i class="fa-solid fa-toggle-large-on"></i> toggle** to filter for malicious dependencies detected in your projects. Ensure that you don't have other filters enabled as this may inadvertently hide findings.

## Triage and remediation for malicious dependencies

- If there is no fix available, **remove** the malicious dependency from your codebase and re-run a Supply Chain scan to fix it.
- If there is a safe version to update to, you can fix the finding by updating the dependency and re-running a Supply Chain scan.
- You can apply [any Semgrep triage state](/semgrep-supply-chain/triage-and-remediation#ignore-findings), such as **Ignored**, though this is not recommended.

:::caution
If you have configured your policies to display malicious dependency findings to your developers, and you have enabled **Settings > Triage via code review comments**, your developers are able to triage these findings as **Ignored**.
:::

## Advisories for malicious dependencies

You can view all the malicious dependencies that Semgrep can detect by navigating to [**Supply Chain > Advisories**](https://semgrep.dev/orgs/-/supply-chain/advisories) and clicking on the **<i class="fa-solid fa-square-check"></i> Malicious package** filter.

## Disable malicious dependency detection

Reach out to [support](/support) to disable this feature.
