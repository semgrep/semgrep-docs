---
slug: malicious-dependencies
title: Detect and remove malicious dependencies
hide_title: true
description: Learn how Semgrep detects malicious dependencies and enable malicious dependency detection in your Supply Chain scans.
tags:
  - Semgrep Supply Chain
---

# Detect and remove malicious dependencies

**Malicious dependencies** are dangerous packages, or dangerous versions of packages, that are designed to compromise systems. These threats include packages that have always been malicious, such as typo-squatting attacks, or packages that become malicious after an attacker compromises a maintainer or injects harmful code. They are also known as malware.

Semgrep can detect malicious dependencies in your projects and pull requests (PRs) or merge requests (MRs).

## Supported package managers

The following table lists the languages for which Supply Chain can detect malicious dependencies.

| Language | Package manager or ecosystem |
| :---- | :---- |
| C\# | NuGet |
| Go | `go.mod` |
| JavaScript | npm |
| Python | PyPi |
| Ruby | RubyGems |
| Rust | `cargo.lock` |
| TypeScript | npm |

<!--
| Dart | Pub | 
| Elixir | Hex | 
| Java | Maven | 
| Scala | Maven | 
| Swift | SwiftPM | 
| PHP | \-- | 
-->

## Enabling malicious dependency rules

To include malicious dependency rules in your Supply Chain scan, navigate to **Settings > Supply Chain** and enable Malicious dependency advisories. 

You can also use this setting to disable malicious dependency scanning for your Semgrep organization.

## Malicious dependency findings


Malicious dependency findings are treated as **critical severity** findings.

If you set up your Supply Chain [policies](https://semgrep.dev/orgs/-/policies/supply-chain) to block critical severity findings, malicious dependency findings block a PR or MR in the same way as any other Supply Chain finding.

From the Supply Chain policies page, you can also configure a policy to trigger conditionally based on whether a dependency is marked **Malicious**.

<!--  No way to do this currently
## Enable or disable malicious dependency detection

1. Click Settings \> …
-->

## View malicious dependencies

Malicious dependencies appear in the [**Supply Chain**](https://semgrep.dev/orgs/-/supply-chain/vulnerabilities?primary=true&tab=open&last_opened=All+time) tab, alongside other Supply Chain findings. They are denoted by the **MAL** badge.

![Malicious dependency finding with badge](/img/findings-maldeps.png)
_**Figure**. A malicious dependency finding._

To view malicious dependencies detected in your projects:
1. Navigate to [Supply Chain](https://semgrep.dev/orgs/-/supply-chain).
2. Click the **filters** icon and enable the **Malicious dependency** filter.
3. Review the results listed. Click **Details** to learn more about available remediation guidance. 

![Malicious dependency details](/img/mal-dependencies-details.png)


## Triage and remediation for malicious dependencies

- If there is no fix available, **remove** the malicious dependency from your codebase and re-run a Supply Chain scan.
- If there is a safe version to update to, fix the finding by updating the dependency. Then, re-run a Supply Chain scan.
- You can apply [any Semgrep triage state](/semgrep-supply-chain/triage-and-remediation#ignore-findings), such as **Ignored**, though this is not recommended.

:::caution
If you have configured your policies to display malicious dependency findings to your developers, and you have enabled **Settings > General > Code > Triage via code review comments**, your developers are able to triage these findings as **Ignored**.
:::

## Create Jira tickets for malicious dependency findings

Semgrep provides a Jira integration option that lets you create Jira tickets for malicious dependency findings across any branch, not just the primary branch. This capability enables developers to respond immediately when a malicious package is detected.

To enable Jira ticket creation for malicious dependencies:

1. Navigate to **Settings > Integrations > Jira**.
2. Select the option to **Automatically create tickets for malicious dependency findings on any branch**.


## Advisories for malicious dependencies

You can view all the malicious dependencies that Semgrep can detect by navigating to [**Supply Chain > Rules & Policies > Advisories**](https://semgrep.dev/orgs/-/advisories) and clicking on the **<i class="fa-solid fa-square-check"></i> Malicious** filter.

Currently, advisories for malicious dependencies are generated automatically and use the package name and version to identify the dependency. In some cases, the advisory indicates that only specific sources of the dependency have been compromised. If you do not use those sources and have never done so, then it may be appropriate to mark the findings for that advisory as ignored.



