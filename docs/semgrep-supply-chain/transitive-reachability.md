---
slug: transitive-reachability
title: Transitive reachability
hide_title: true
description: Learn how transitive reachability identifies vulnerabilities introduced by third-party packages.
tags:
 - Semgrep Supply Chain
---

# Transitive reachability (beta)

Semgrep Supply Chains' transitive reachability analysis helps you identify vulnerabilities introduced by third-party packages and their dependencies. 


:::info
This feature is in private beta. To join, contact [support](/support).
:::

## Supported languages

Semgrep currently performs transitive reachability analysis for JavaScript projects.

## Definitions

For this article:
- **First-party code**: first-party code refers to your project, which includes the code that Semgrep scans
- **Third-party code**: third-party code refers to the dependencies that the first-party code calls or imports and then uses

Semgrep uses two overarching categories for project dependencies:

- **Direct**: direct dependencies are those explicitly added by the developer, then called in the first-party code. You can visualize and review direct dependencies using the project's configuration file, such as the lockfile or the manifest file. Semgrep can also generate visual dependency graphs for projects that it scans.
- **Transitive**: transitive dependencies are those that you include indirectly. For example, this happens when you directly add a dependency, but the dependency that you add then calls another dependency. In other words, a transitive dependency is one that third-party code adds and calls.

## How transitive reachability analysis works

Semgrep's reachability analysis determines whether there's a vulnerability in your codebase by checking your code, specifically the functions used and the function calls made. Then, Semgrep checks if the vulnerability is reachable by checking to see if:

- The relevant function is called, which means that the code is used
- The relevant function is called in a potentially unsafe way

If neither condition is met, then Semgrep categorizes the vulnerability as **Unreachable**.

Occasionally, Semgrep flags a finding as **needs review**. These findings are conditionally reachable, and you must manually review your code to validate whether the vulnerability is reachable or not.

![A Supply Chain finding that needs review. Semgrep provides reachability details and remediation advice.](/img/vuln-needs-review.png#md-width)
_**Figure**. A Supply Chain finding that needs review. Semgrep provides reachability details and remediation advice._

The patterns that Semgrep Supply Chain uses to identify vulnerabilities present in first-party code are encapsulated in **rules**. With transitive reachability analysis, Semgrep extends its reachability analysis to the dependencies of dependencies to see if this code calls and uses vulnerable packages in a vulnerable way.

To do this, Semgrep uses its Dependency Path feature to determine the set of packages, a subset of the third-party code, that calls on vulnerable packages. Semgrep then downloads the source code for the third-party dependencies called by your first-party code for analysis. <!-- TBD on whether we add a new CLI flag to control this behavior:`--allow-package-manager-install-deps` -->

Once Semgrep downloads the source code for the third-party dependencies, it scans this third-party code using the same rules it uses against the first-party code. 

If Semgrep identifies no matches, then the finding is unreachable. However, if the scanned code introduces a vulnerable usage of the vulnerable package, Semgrep flags the finding as **may be reachable**. This is because Semgrep can't determine whether the first-party code triggers the identified vulnerable usage.

### Example

The following example demonstrates how Semgrep can identify a security vulnerability in a transitive dependency that could compromise your codebase.

In this example, the first-party code implements date selection capability using a package called `demoDep`. `demoDep`, however, implements the date selection capability used by the first-party code, using another dependency, `calendarPlugin`. The logic for implementing the calendar itself is in `calendars.js`, and there is a security vulnerability in this file.

![Example of how a security vulnerability in a transitive dependency can be called by third-party code, which is then called by first-party code](/img/transitive-reachability.png#md-width)
_**Figure**. Example of how a security vulnerability in a transitive dependency can be called by third-party code, which is then called by first-party code._

The code that you scan with Supply Chain is referred to as first-party code. With transitive reachability, Supply Chain also scans third-party code, which, in this case, is `demoDep`. This is done by acquiring the source code and then scanning it using the same rules run against your first-party code. This allows Semgrep to determine if there's a vulnerable usage introduced by the third-party code based on its use of any additional packages.

## Findings

Semgrep Supply Chain generates a **finding** when it identifies a vulnerability introduced by a dependency, either direct or transitive, in your codebase. You can use Semgrep AppSec Platform's [**Supply Chain > Vulnerabilities** page](https://semgrep.dev/orgs/-/supply-chain/vulnerabilities) to view all of the findings generated by Semgrep Supply Chain after [it scans your codebase](/semgrep-supply-chain/getting-started#enable-semgrep-supply-chain).

To view your findings in Semgrep AppSec Platform:

1. Sign in to [Semgrep AppSec Platform](https://semgrep.dev/login).
2. Click **[Supply Chain](https://semgrep.dev/orgs/-/supply-chain/vulnerabilities)**.
3. Use the **Transitivity** filter to select for **Transitive** findings. You can further filter your results using the **Reachability** filter to select for findings that are **Reachable**, **Unreachable**, or **Needs review**.

Opening up an individual finding displays additional details for your review:

![The finding details page showing that the Supply Chain finding is unreachable.](/img/unreachable-finding-details.png#md-width)
_**Figure**. The finding details page showing that the Supply Chain finding is unreachable._

Semgrep also provides information about other dependencies that may result in volunerabilities.

![The finding details page links to a list of dependencies analyzed.](/img/dependencies-analyzed.png)
_**Figure**. The finding details page links to a list of dependencies analyzed._

You can use **Dependency path** to see how Semgrep determined if a finding is transitive.

![The finding details page showing a reachable transitive finding and its dependency path](/img/reachable-transitive-vuln-dep-path.png#md-width)
_**Figure**. The finding details page showing a reachable transitive finding and its dependency path._

### CLI

When running Semgrep using the CLI or a CI System, Semgrep displays transitive reachability information in the output as follows:

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
