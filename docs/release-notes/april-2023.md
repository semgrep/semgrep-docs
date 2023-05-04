---
slug: april-2023
append_help_link: true
hide_title: true
description: >-
  Release notes include the changes, fixes, and additions in specific versions of Semgrep.
toc_max_heading_level: 3
---

# April 2023

## Semgrep OSS Engine

This section of release notes includes upgrades of Semgrep OSS Engine for versions ranging between 1.17.0 and 1.20.0.

### Added

- Java support: With this update, private static variables that are defined just once in a static block are now considered as `final` by constant-propagation, even if they are not explicitly declared as such.
- Metavariable comparison: With this update, you can now use the exponentiation operator `**` in your expressions when comparing metavariables.
- Kotlin language support: With this update, Semgrep evaluates class fields with the correct types and can detect these fields accurately with typed metavariables. For example, a class such as the following:
    ```kotlin
    class Foo {
        var x: Int
    }
    
    ```
- Scala language support improvements:
    - Semgrep can now parse indented matches, such as the following:
        
        ```scala
        e match
        case foo => "foo"
        case bar => "bar"
        ```
        
    - Semgrep now provides improved parsing functionality for arguments with `using` and splatted arguments. With this update, Semgrep can now correctly parse Scala code with constructs such as:
        
        ```scala
        foo(using bar)
        foo(1, 2, bar*)
        ```
        
    - Improved parsing functionality for indented `for` expressions in Scala. With this update, Semgrep can now correctly parse `for` expressions that are indented, such as:
        
        ```scala
        for
          _ <- 5
          yield ...
        ```
        
    - Some additional Scala updates that Semgrep now supports:
        - `enum` constructs
        - `given` definitions
        - `export` keyword
        - Top-level definitions
        - Added proper parsing for Scala 3 style imports.

### Changed

- Semgrep no longer reports partially analyzed files as skipped when using `--verbose` flag. If Semgrep lacks information about what lines have been skipped, it no longer reports that all lines have been skipped. For example, an error while evaluating a `metavariable-pattern` operator in one rule may cause a finding to be missed and report the file as partially analyzed. However, that error did not affect any other rules, and even the affected rule can produce some findings.
- Enhancement to the `--verbose` flag output. When you use the `--verbose` flag in the command line, the different lists of skipped files are now sorted alphabetically. This makes it easier to `diff` the outputs of two runs and quickly identify any differences in skipped files.
- Taint analysis:
    - Added option `taint_assume_safe_comparisons`, disabled by default, that prevents comparison operators to propagate taint, so for example `tainted != "something"` is not considered tainted. Note that this a syntactic check, if the operator is overloaded to perform a different operation this will not be detected.
    - Semgrep OSS Engine taint analysis now includes option `taint_assume_safe_comparisons` that prevents comparison operators to propagate taint. For example, `tainted != "something"` is not considered tainted. The `taint_assume_safe_comparisons` is disabled by default. Note that this a syntactic check, if the operator is overloaded to perform a different operation Semgrep does not detect this code.

## Semgrep Code

### Changed

- Improvements to Slack notifications for Semgrep Code scans. See [Semgrep Cloud Platform](#semgrep-cloud-platform).
- Many Semgrep Pro rules now have rewritten messages. These new rule messages help you to better understand the detected vulnerabilities and enable you to mitigate them with ease. Updates cover all rules associated with the following Common Weakness Enumerations (CWE):
    - CWE-22 (Path Traversal)
    - CWE-78 (Command Injection)
    - CWE-89 (SQLi)
    - CWE-94 (Code Injection)
    - CWE-287 (Improper Authentication)
    - CWE-798 (Hardcoded Secrets)
    - CWE-918 (SSRF)

## Semgrep Pro Engine

### Added

- Taint analysis: Semgrep Pro Engine now supports simple cases of interprocedural taint labels.
- Java language update: Semgrep Pro Engine is now can track the propagation of taint from the arguments of a method to the called object. For example:
    
    ```java
    public void foo(int x) {
        this.x = x;
    }
    ```
    
    When called with a tainted argument:
    
    ```java
    o.foo(tainted);
    ```
    
    Semgrep can track and report that the field `x` of `o` has been tainted.
    

### Changed

- Previously, the `semgrep --pro` command required a directory as its single target. With this update, `semgrep --pro` command is still limited to a single target, but in addition to a whole directory, it can now target files also.

## Semgrep Supply Chain

### Additions

- Semgrep Supply Chain now displays all your direct and transitive dependencies on the **Supply Chain** > **Dependencies** page. You can search for any dependency in all of your repositories in the Semgrep Cloud Platform, provided that their language is supported by Semgrep Supply Chain.
- Semgrep Supply Chain now supports package-lock.json version 3.

### Changes

- Improvements to Slack notifications for Semgrep Supply Chain scans. See [Semgrep Cloud Platform](#semgrep-cloud-platform).
- Semgrep Supply now parses `go.mod` for a list of dependencies.
- Semgrep Supply Chain no longer parses `go.sum` for a list of dependencies.
- The title of Supply Chain findings in the CLI now consists of the package name and CVE, instead of just the rule's UUID.

## Semgrep Cloud Platform

### Additions

- You can now add repositories from Azure Repos into the Semgrep Cloud Platform.
- Bitbucket PR comments are now available for Bitbucket Cloud users. See the [Enabling Bitbucket pull request comments](/semgrep-cloud-platform/bitbucket-pr-comments) to enable PR comments in your repositories.
- Check the new documentation sections [Semgrep add-on reconciliation of licenses](https://semgrep.dev/docs/semgrep-cloud-platform/pricing-and-billing/#semgrep-add-on-reconciliation-of-licenses) and [Example of license reconciliation](https://semgrep.dev/docs/semgrep-cloud-platform/pricing-and-billing/#example-of-license-reconciliation) that inform you about what happens if your organization exceeds the number of purchased licenses.

### Changes

- The Semgrep Slack app has been improved. Create customized subscriptions to Semgrep findings based on Rule board policy (Monitor, Comment, or Block) and other filters for your specific Slack channels. By creating your customized subscriptions, Semgrep only sends notifications about repositories and findings relevant to developers. Security engineers can still receive notifications of all issues across the entire organization’s repositories. See [Receiving Slack notifications](/semgrep-cloud-platform/slack-notifications/).
- Updated the **Settings** > **SSO** page. The page now displays your current SSO settings, if any.
- Previously, Semgrep automatically associated organization accounts with their corresponding GitHub Cloud or GitLab SaaS organizations. Now, users can choose to connect their Semgrep organization accounts with their repository provider. To associate your Semgrep organization with your repository provider, sign in to Semgrep Cloud Platform, then go to Settings > **Source code** > then select your repository provider.
- Various improvements to UI consistency and improved layout for wide monitors.
- Fixed various bugs within the Editor and Playground.

## Documentation updates

### Added

- New section [Semgrep add-on reconciliation of licenses](https://semgrep.dev/docs/semgrep-cloud-platform/pricing-and-billing/#semgrep-add-on-reconciliation-of-licenses) and [Example of license reconciliation](https://semgrep.dev/docs/semgrep-cloud-platform/pricing-and-billing/#example-of-license-reconciliation).
- New section [Updating existing open-source rules in Semgrep Registry](/contributing/contributing-to-semgrep-rules-repository/#updating-existing-open-source-rules-in-semgrep-registry).
- Added section [Creating interfile analysis rules](/semgrep-code/semgrep-pro-engine-intro/#types-of-semgrep-pro-engine-analysis) and [Types of Semgrep Pro Engine analysis](/semgrep-code/semgrep-pro-engine-intro/#types-of-semgrep-pro-engine-analysis).
- Added [Appendix: Token scopes](/semgrep-cloud-platform/user-management/#appendix-token-scopes).

### Changed

- [Notification documentation](/semgrep-cloud-platform/notifications/) has been separated into guides for each notification channel, such as Slack or webhooks.
- Fixed embedded examples in (Semgrep Pro Engine examples)[/semgrep-code/semgrep-pro-engine-examples/] document.
- Our [Cheat sheets](/category/cheat-sheets/) now suggest the default ruleset instead of specific rules for you to scan your code.
- Updated [CLI reference](/cli-reference/).
- Clarified sections [Disabling rules](/semgrep-code/rule-board/#disabling-rules) and [Removing rulesets](/semgrep-code/rule-board/#removing-rulesets).
- [Known limitations of Semgrep Pro Engine](/supported-languages/#known-limitations-of-semgrep-pro-engine) section have been expanded and moved to the [Supported languages](/supported-languages/) document.
- Fixed various broken links.
- Fixed various spelling issues.
