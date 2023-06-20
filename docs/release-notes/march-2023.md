---
slug: march-2023
append_help_link: true
hide_title: true
description: >-
  Release notes include the changes, fixes, and additions in specific versions of Semgrep.
toc_max_heading_level: 3
---

# March 2023

## Semgrep OSS Engine

This section of release notes include upgrades of Semgrep OSS Engine for versions ranging between 1.14.0 and 1.16.0.

### Added

- Kotlin: Semgrep OSS Engine now supports typed metavariables in Kotlin. For example, to find all instances of a string type, you can now use the following rule pattern:
`($X : String)`
- Scala: Semgrep can now parse programs that contain quoted expressions, context parameter clauses that use the `using` function, and soft modifiers like `inline` and `open`.

    Semgrep can now parse and analyze Scala code that contains matches on types, such as:
    ```scala
    type t = K match {
      case Int => String
    }
    ```
    
- metavariable-comparison: Added support for bitwise operators `~`, `&`, `|`, and `^`.
- taint-mode: The latest update to `pattern-propagators` in Semgrep OSS Engine introduces two optional fields `requires` and `label`, that work identically to their counterparts in `pattern-sources` and  `pattern-sinks`. These fields are part of the experimental taint labels feature for taint analysis.
    
    For instance, we can define:
    
    ```yaml
    pattern-propagators:
      - pattern: |
          $TO.foo($FROM)
        from: $FROM
        to: $TO
        requires: A
        replace-labels: [A, C]
        label: B
    ```
    
    This propagator only propagates if the source `$FROM` has taint label `A`. Additionally, any taints from `$TO` with labels `A` or `C` are converted to have label `B`.
    
    If you don't specify a `label`, the target `$TO` is tainted with the same label as the taint on `$FROM`. If you don't specify a `requires` field, the propagator does not require the source to have a specific taint label.
    
    Note that the `replace-labels` field only restricts the label being propagated if you also specify the `label` output.
    

### Changed

- Semgrep’s CLI output has been revamped to better organize scan information and provide more context about scans and findings. Previously, CLI output was minimal without much formatting. With this release, Semgrep CLI now provides headers, tables, scan summaries, and updated, granular data about individual findings and the project it is scanning.
    
    ![release-notes-march2023-cli-output-old.png](/img/release-notes-march2023-cli-output-old.png)
    *Figure 1. Old Semgrep CLI output.*
    
    ![release-notes-march2023-cli-output-new.png](/img/release-notes-march2023-cli-output-new.png)
    *Figure 2. New Semgrep CLI output.*
    
- The latest update to`returntocorp/semgrep` Docker images removes the custom entry point that was previously used to invoke Semgrep. As a result, you must now explicitly call `semgrep` when running the image. This change was already made approximately a year ago. In this update, the backward compatibility layer and a deprecation notice have been removed.
    
    Previously, you could scan your code using the `returntocorp/semgrep` image by running the following command:
    ```bash
    docker run -v $(pwd):/src returntocorp/semgrep scan ...
    ```

    However, this command no longer works. Instead, you must use the following command to achieve the same result:
    ```bash
    docker run -v $(pwd):/src returntocorp/semgrep semgrep scan ...
    ```

    By removing the custom entry point, this update provides greater flexibility and consistency in how Semgrep is invoked within Docker containers.
    
- taint-mode: Previously, Semgrep OSS Engine taint analysis sometimes flagged sinks that did not propagate taint. For example, the `sink(ok if tainted else ok)` was flagged. To address this, we've made taint analysis more precise. Now, sinks like `sink(...)` where you declare that any argument of a given function is a sink. For example:
    
    ```yaml
    pattern-sinks:
      - patterns:
          - pattern: sink($X, ...)
          - focus-metavariable: $X
    ```
    
    As a result, `sink(ok1 if tainted else ok2)`, `sink(not_a_propagator(tainted))`, and
    `sink(some_array[tainted])`, are not be reported as findings.
    

- The `-gitlab-sast` and `-gitlab-secrets` output formats have been upgraded. The output is now valid with the GitLab v15 schema, while staying valid with the GitLab v14 schema as well. Code findings now include the confidence of the rule.

## Semgrep Code

### Added

- **Semgrep Pro Engine beta** toggle is enabled by default in the [Semgrep Editor](https://semgrep.dev/orgs/-/editor/) and [Semgrep Playground](https://semgrep.dev/playground). Rules can still run with the Semgrep OSS Engine if `interfile: true` is not specified in the rule.
- Findings from Pro rules or Semgrep Pro Engine are now labeled with a gem icon to let you know where the finding has come from.
    ![semgrep-code-findings-pro-rule-gem.png](/img/release-notes-semgrep-code-findings-pro-rule-gem.png)
    

## Semgrep Pro Engine

### Added

- Previously, when installing Semgrep Pro Engine, Semgrep CLI downloaded the most recently released version of Semgrep Pro Engine. As a consequence, this version of Semgrep Pro Engine might not have been the most compatible version with Semgrep OSS Engine. With this update, the most compatible version of Semgrep Pro Engine with Semgrep OSS Engine is downloaded during the installation.

    This behavior is only supported for Semgrep version 1.12.1 and later. Previous versions still download the most recently released version, as before.
    
- taint-mode: Semgrep Pro Engine’s taint analysis capabilities for Java now include support for basic field sensitivity through getters and setters. If you call `obj.setX(tainted)`, Semgrep can now identify that a subsequent call to `obj.getX()` will carry the same taint as `tainted`. Moreover, Semgrep can differentiate between different fields accessed by the getters and setters, such as `obj.getX()` and `obj.getY()`.

    It's important to note that Semgrep Pro Engine doesn't examine the definitions of the getter and setter methods, and it doesn't know whether other methods like `obj.clearX()` clear the taint that `obj.setX(tainted)` adds. Nonetheless, this new feature enables Semgrep to detect vulnerabilities more accurately in tainted data flow in Java code.
    

### Changed

- CI scans that use Semgrep Pro Engine now run intrafile and cross-function (interprocedural) taint analysis by default in differential scans (such as PR or MR scans). Note that cross-file (interfile) analysis is not run in differential scans for performance reasons.

## Semgrep Cloud Platform

### Added

- For organizations with role-based access control (RBAC) enabled, members are now able to [log in through the CLI](/semgrep-cloud-platform/user-management/#member-scoped-access-tokens) and send findings data from their local machine to the Semgrep Cloud Platform.

## Semgrep Supply Chain

### Added

- You can now receive Semgrep Supply Chain notifications in your Slack channel. Be notified of **reachable vulnerabilities** as soon as a scan finishes. Sign in to Semgrep Cloud Platform and click Settings > Integrations > Add integration > Slack and follow the instructions to start setting up your Slack notifications.

### Changed

- Previously, Semgrep Supply Chain used `go.sum` files to read Go dependencies. Semgrep Supply Chain now uses `go.mod` files.
- Supply Chain findings now include the exposure type. Exposure types can be any of the following values:
    - Reachable — this type of exposure means that the finding has detected a vulnerable dependency **and** the vulnerable code is used in your codebase. Additionally, the **inclusion** of certain severely vulnerable packages such as `log4j` is also categorized as a reachable exposure even without the vulnerable code’s usage within your codebase.
    - Unreachable — this type of exposure means that the finding has detected a vulnerable dependency but the vulnerable code is not used in your codebase.
    - Undetermined — Reachability analysis has not been performed on this finding, therefore its exposure is undetermined.
- Historical rules (also known as parity rules) are now enabled by default for new personal and organizational accounts. Existing organizations can reach out to [support@semgrep.com](mailto:support@semgrep.com) to enable parity rules by default.
- Semgrep Supply Chain scans now understand `maven_dep_tree.txt` files that are made of multiple smaller `maven_dep_tree.txt` files concatenated with`cat`. To make use of this functionality, create a script or command using the `cat` command as a step in your CI pipeline.

## Documentation

### Added

- Created a new section on [Member scoped access tokens](/semgrep-cloud-platform/user-management/#member-scoped-access-tokens).

### Changed

- Updated [Tagging projects](/semgrep-cloud-platform/tags/) document.
- Expanded, clarified, and improved licensing information in [FAQs](/faq/#how-are-semgrep-and-its-rules-licensed). See sections such as [I’m a security professional. Do I have to pay for Semgrep?](/faq/#im-a-security-professional-do-i-have-to-pay-for-semgrep) or [Can I ship my own code analysis software that uses Semgrep?](/faq/#can-i-ship-my-own-code-analysis-software-that-uses-semgrep).
- Updated [Private rules](/writing-rules/private-rules/) documentation. Added section about [Creating private rules](/writing-rules/private-rules/#creating-private-rules) and [Deleting private rules](/writing-rules/private-rules/#deleting-private-rules).
