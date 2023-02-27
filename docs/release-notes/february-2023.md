---
slug: february-2023
append_help_link: true
hide_title: true
description: >-
  Release notes include the changes, fixes, and additions in specific versions of Semgrep.
toc_max_heading_level: 3
---

# February 2023

## Important update

- Semgrep CLI is now officially renamed to **Semgrep OSS Engine**. Note that Semgrep CLI is an interface, not a product. As an interface, you can use the CLI as an interface to several products - the OSS, Semgrep Code, Semgrep Supply Chain.
- Team tier rules are now renamed to Pro Rules. The **Pro rules** are created by r2c and targeted for security and software engineers who need accurate findings. These rules were previously called Team tier rules. As of this update, these rules are officially called the **[Pro rules](/semgrep-code/pro-rules/)** and are available with the [Team or higher tier](https://semgrep.dev/pricing).
- DeepSemgrep is renamed to **Semgrep Pro Engine**. Semgrep Pro Engine is fully available for [Team or higher tier](https://semgrep.dev/pricing) users. See [Semgrep Pro](/deepsemgrep/deepsemgrep-introduction/) documentation. Some specific flags have been removed:
    - The following already **deprecated** flags have been completely removed and substituted:
        - `-deep` has been removed and substituted by `-pro`
        - `-interfile` has been removed and substituted by `-pro`
        - `-interproc` has been removed and substituted by `-pro-intrafile`
    - Removed already **deprecated** command:
    `install-deep-semgrep` has been removed and substituted by `install-semgrep-pro`
- Semgrep App is now renamed mainly as **Semgrep Cloud Platform**.

## Semgrep CLI and CI → Semgrep OSS Engine

These release notes include upgrades for versions ranging between 1.8.0 and 1.13.0.

- Language support: 
    - Experimental support for Clojure, Lisp, Scheme, XML.
    - Beta support for Rust.
    - Experimental support for Jsonnet.
    - Apex experimental support with Semgrep Pro Engine.

- taint-mode: Taint propagators can now specify `by-side-effect`, just like sources and sanitizers. However, the default value of `by-side-effect` for propagators is `true` (unlike for sources or sanitizers). When using rule option `taint_assume_safe_functions: true`, this allows to specify functions that must propagate taint, for example:

    Without `by-side-effect: true`, `unsafe_function` itself would be tainted by side-effect, and subsequent invocations of this function, even if the arguments were safe, would be tainted.

    ```yaml
    `pattern-propagators:
      - by-side-effect: false
        patterns:
          - pattern-inside: $F(..., $X, ...)
          - focus-metavariable: $F
          - pattern-either:
              - pattern: unsafe_function
        from: $X
        to: $F`
    ```

- Allow metavariable-pattern clauses that use `language: generic` to potentially match any metavariable binding kind. For example, with the pattern `foo($...ARGS)`, it is now possible to use a `metavariable-pattern` on `$...ARGS` with `language: generic`, and match using generic mode against whatever text `$...ARGS` is bound to. (metavar-pattern-generic)

## Semgrep App → Semgrep Cloud Platform

- Semgrep App is now Semgrep Cloud Platform!
- Semgrep Cloud Platform now supports PR comments in BitBucket repositories.
- 

## Semgrep Supply Chain

- Semgrep Supply Chain now displays a summary of vulnerabilities and scan data in **Semgrep Cloud Platform** > **Dashboard** page. This enables users to view a report of findings for both their first-party and third-party code.
- Java is now a Generally Available language in Semgrep Supply Chain.
- Various fixes and improvements to performance.

## Documentation

- Slight improvements to relevancy in Semgrep Docs’s search bar.
- Updates to **Supported Languages  > Semgrep Supply Chain** and **Semgrep Code > Semgrep Pro Engine**.
- Updates to **Semgrep Code > Alerts and Notifications** to consolidate all methods to send and receive scan data, such as findings.
- Updates to **Pricing and Billing** to reflect the differences between Semgrep OSS Engine and Semgrep Code.
- New documentation for Semgrep Code.
- Updates to Semgrep Docs’s navbar.