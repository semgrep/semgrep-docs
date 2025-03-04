# Detect malicious dependencies

:::info
This feature is in private beta. To join, reach out to support@semgrep.com
:::

**Malicious dependencies** are intentionally dangerous packages, designed to compromise systems, unlike vulnerable dependencies, which are accidentally risky. These threats include packages that have always been malicious, such as typo-squatting attacks, or packages that become malicious after an attacker compromises a maintainer or injects harmful code. In some of these cases, the maliciousness of a package affects a specific range of versions.

Semgrep is able to detect malicious dependencies in your projects and in pull requests (PRs) or merge requests (MRs).

This feature is enabled by default and is performed every time you run a Supply Chain scan.

## Supported package managers and sources of information

Semgrep ingests data from Open Source Vulnerabilities ([osv.dev](https://osv.dev/)).

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

Malicious dependency findings are treated as **always reachable, critical severity** findings.

If you have set up your Supply Chain policies to block with these conditions, malicious dependency findings block a PR or MR in the same way as any other Supply Chain finding.

## Enable or disable malicious dependency detection

* I need a feature flag to test this.  
1. Click Settings \> …

## View malicious dependencies

Use the Malicious dependencies filter to display only malicious dependencies detected in your projects.

* Would be helpful if we have a screenshot so users can visualize the difference between a regular supply chain finding and a maldeps finding.

## Remediate malicious dependencies

* Does Semgrep give suggestions (i.e. in the case of typo squatting) of how to fix?  
* How is our remediation advice presented?
