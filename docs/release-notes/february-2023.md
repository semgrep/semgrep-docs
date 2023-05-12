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

- Semgrep CLI is now officially renamed to **Semgrep open-source (OSS) Engine**. As of this update, this documentation uses the term Semgrep CLI for Semgrep command-line interface (CLI) which you can utilize for several products, such as Semgrep OSS, Semgrep Code, and Semgrep Supply Chain.
- Team tier rules are now renamed to Pro Rules. **Pro rules** are created by Semgrep Inc for security and software engineers who need accurate findings. These rules were previously called Team tier rules. As of this update, these rules are officially called the **[Pro rules](/semgrep-code/pro-rules/)** and are available with the [Team or higher tier](https://semgrep.dev/pricing).
- DeepSemgrep has been bundled with other functionalities to offer you **Semgrep Pro Engine**. Semgrep Pro Engine is fully available for [Team or higher tier](https://semgrep.dev/pricing) users. See the [DeepSemgrep → Semgrep Pro Engine](#deepsemgrep--semgrep-pro-engine) update below for more details.

## Semgrep CLI → Semgrep OSS Engine

These release notes include upgrades for versions ranging between 1.8.0 and 1.13.0.

- Semgrep CLI is now Semgrep OSS Engine!
- Newly added or upgraded [supported languages](/supported-languages/): 
    - Experimental support for Clojure, Lisp, Scheme, XML, Jsonnet.
    - Beta support for Rust.

- taint-mode: Taint propagators can now specify `by-side-effect`, just like sources and sanitizers. However, the default value of `by-side-effect` for propagators is `true` (unlike for sources or sanitizers). When using rule option `taint_assume_safe_functions: true`, this allows specifying functions that must propagate taint, for example:

    Without `by-side-effect: true`, `unsafe_function` itself would be tainted by side-effect, and subsequent invocations of this function, even if the arguments were safe, would be tainted.

    ```yaml
    pattern-propagators:
      - by-side-effect: false
        patterns:
          - pattern-inside: $F(..., $X, ...)
          - focus-metavariable: $F
          - pattern-either:
              - pattern: unsafe_function
        from: $X
        to: $F`
    ```
- Allow metavariable-pattern clauses that use `language: generic` to potentially match any metavariable binding kind. For example, with the pattern `foo($...ARGS)`, it is now possible to use a `metavariable-pattern` on `$...ARGS` with `language: generic`, and match using generic mode against whatever text `$...ARGS` is bound to.

## DeepSemgrep → Semgrep Pro Engine

- DeepSemgrep has been bundled with other functionalities to offer you **Semgrep Pro Engine**! Semgrep Pro Engine is fully available for [Team or higher tier](https://semgrep.dev/pricing) users. See [Semgrep Pro](/semgrep-code/semgrep-pro-engine-intro/) documentation. 
- Experimental support for Apex language is now available in Semgrep Pro Engine.
- The following already **deprecated** flags have been completely removed and substituted:
    - `-deep` has been removed and substituted by `-pro`.
    - `-interfile` has been removed and substituted by `-pro`.
    - `-interproc` has been removed and substituted by `-pro-intrafile`.
- Removed already **deprecated** command:
`install-deep-semgrep` has been removed and substituted by `install-semgrep-pro`.

## Semgrep App → Semgrep Cloud Platform

- Semgrep App is now Semgrep Cloud Platform!
- Group by rule became the default view on the Findings page (now labeled as **Code** page) of Semgrep Cloud Platform. This view enables you to see which rules detected certain findings. You can always switch to the old no grouping view. For more information, see [Grouping by rule](/semgrep-code/findings/#grouping-by-rule).
    ![Screenshot of the Findings page with findings grouped by rule](/img/app-findings.png)<br />
- Taint analysis traces are now displayed on the finding detail page, helping you to track tainted data as they propagate through your code. See [Viewing the path of tainted data](/semgrep-code/findings/#viewing-the-path-of-tainted-data) to try out this feature.
    ![Data flow in Finding details page](/img/cloud-platform-findings-details-data-flow.png)<br />

## Semgrep Supply Chain

- Semgrep Supply Chain now displays a summary of vulnerabilities and scan data in the **Semgrep Cloud Platform** > **Dashboard** page. This enables users to view a report of findings for both their first-party and third-party code.
- Java is now a Generally Available language in Semgrep Supply Chain.
- Various fixes and improvements to performance.

## Semgrep Registry

- When you now click on a hyperlink header with the rule name in [Semgrep Registry](https://semgrep.dev/explore), the link opens a new tab with the rule in either the Semgrep Playground (if you are logged out) or in Semgrep Editor (if you are logged in). This means that you can keep open the Semgrep Registry page and easily check and modify rules.

## Documentation

- Slight improvements to relevancy in Semgrep Docs’s search bar.
- Updates to **Supported Languages** > **Semgrep Supply Chain** and **Semgrep Code** > **Semgrep Pro Engine**.
- Updates to **Semgrep Code** > **Alerts and Notifications** to consolidate all methods to send and receive scan data, such as findings.
- Updates to **Pricing and Billing** to reflect the differences between Semgrep OSS Engine and Semgrep Code.
- Added new documentation category Semgrep Code.
- Updates to Semgrep Docs’s navbar.
- Added [Grouping by rule](/semgrep-code/findings/#grouping-by-rule) section.
- Added [Viewing the path of tainted data](/semgrep-code/findings/#viewing-the-path-of-tainted-data) section and [Semgrep Pro Engine taint traces](/semgrep-code/semgrep-pro-engine-data-flow/) document.
- Updated [Viewing details and adding notes to findings](/semgrep-code/findings/#viewing-details-and-adding-notes-to-findings) section.
- Updated [Tagging projects](/semgrep-cloud-platform/tags/) document.
- Iframes with rule examples in [Rule syntax](/writing-rules/rule-syntax/) document have been changed to links to specific rules due to a great number of calls generated from this page. Iframes or code snippets may return in future updates.
- Many small updates, fixed broken links, typos, night theme logo on our home page, and overall improvements to make your experience of reading our documentation smoother.
