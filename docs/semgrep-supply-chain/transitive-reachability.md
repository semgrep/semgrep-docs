---
slug: transitive-reachability
title: Transitive reachability
hide_title: true
description: Learn how transitive reachability identifies vulnerabilities introduced by third-party packages.
tags:
  - Semgrep Supply Chain
---

# Transitive reachability

:::info
This feature is in private beta. To join, reach out to [support](/support).
:::

Semgrep Supply Chains' transitive reachability feature helps you identify vulnerabilities introduced by third-party packages and their dependencies. 

<!-- NEW STATUSES 
- **Undetermined**: no meaningful analysis on the vulnerability's usage
- **Unreachable**: vulnerabilities that Semgrep can confirm aren't used in a vulnerable way anywhere in the first- or third-party code
-->

## Supported package managers and sources of information

[TODO]

## How transitive reachability works

Semgrep Supply Chain uses rules to identify vulnerabilities present in first-party code, but with transitive reachability, it can also scan third-party code to see if it calls and uses vulnerable packages.

:::note
For the purposes of this article:
- **First-party code**: first-party code refers to your project, which includes the code that Semgrep scans
- **Third-party code**: third-party code refers to the dependencies that the first-party code calls or imports, and then uses
:::

To do this, Semgrep uses its Dependency Path feature to determine the set of packages, which are a subset of the third-party code, that call on vulnerable packages. Semgrep then downloads the source code for the third-party dependencies called by your first-party code for analysis. <!-- TBD on whether we add a new CLI flag to control this behavior:`--allow-package-manager-install-deps` -->

Once Semgrep downloads the source code for the third-party dependencies, it scans this third-party code with the same rules it uses against first-party code. If Semgrep identifies no matches, then the finding is unreachable. However, if the scanned code does introduce a vulnerable usage of the vulnerable package, then Semgrep flags the finding as **may be reachable**. This is because Semgrep can't determine that the first-party code triggers the vulnerable usage identified.

### Example

The following example demonstrates how Semgrep can identify a security vulnerability in a transitive dependency that could compromise your codebase.

In this example, the first-party code implements date selection capability using a package called `demoDep`. `demoDep`, however, implements the date selection capability used by the first-party code, using another dependency, `calendarPlugin`. The logic to implement the calendar itself is in `calendars.js`, and in this file, there is a security vulnerability.

![Example of how a security vulnerability in a transitive dependency can be called by third-party code, which is then called by first-party code](/img/transitive-reachability.png#md-width)
_**Figure**. Example of how a security vulnerability in a transitive dependency can be called by third-party code, which is then called by first-party code._

The code that you scan with Supply Chain is referred to as first-party code. With transitive reachability, Supply Chain also scans third-party code, which, in this case, is `demoDep`. This is done by acquiring the source code, then scanning it using the same rules run against your first-party code. This allows Semgrep to determine if there's a vulnerable usage introduced by the third-party code based on its use of any additional packages.

## Findings

[TODO]

## View findings

[TODO]

### CLI

Semgrep displays transitive reachability information in the CLI results as follows:

```console
┌──────────────────────────────────┐
│ 1 Reachable Supply Chain Finding │
└──────────────────────────────────┘
                                    
    package-lock.json
   ❯❯❱ dont-do-bad-stuff
          Transitivity: Found usages in third-party code in 2 files:                                             
            /index.js:14, /index.js:9                          
          test                                                                                                          
           16┆ "node_modules/foo":
           ...
```

## Triage and remediation

For findings that may be reachable:

- If the vulnerable package has an update that fixes the issue, and the dependency that your first-party code calls utilizes the updated package, you can update the dependency version used. Then, re-run Supply Chain to update your vulnerabilities list.
- If there's no fix available, remove the dependency from your code base and re-run Supply Chain to update your vulnerabilities list.
- If necessary, you can apply [any Semgrep triage state](/semgrep-supply-chain/triage-and-remediation#ignore-findings) to the finding, such as **Ignored**, though this isn't recommended.

## Advisories

[TODO]