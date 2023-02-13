---
slug: january-2023
append_help_link: true
hide_title: true
description: >-
  Release notes include the changes, fixes, and additions in specific versions of Semgrep.
toc_max_heading_level: 3
---

# January 2023

## Semgrep Supply Chain

### Additions

- Added a new **Exposure** category called **Not analyzed** within **Semgrep App > Vulnerabilities** page. Users who have enabled **Historical coverage** rules now see vulnerabilities detected from those rules under **Not analyzed**. This is because Historical coverage rules rules do not have reachability patterns, therefore it is not analyzed that their findings are reachable or unreachable.
- The **Semgrep App** > **Advisories** page displays a new tag, **Reachability: review manually** for rules that must be reviewed manually.
    ![Semgrep App Advisories, Reachability review manually](/img/release-notes-semgrep-app-reachability-review.png)
- You can now give feedback for **Supply Chain** rules. In the **Semgrep App > Advisories** page, click on an advisory to expand on it and click on the **Leave feedback for this rule** button.
    ![Screen Shot 2023-01-24 at 1.52.45 PM.png](Release%20notes%20January%202023%20draft%20a54192a13ba04adbb58180c9b90a331f/Screen_Shot_2023-01-24_at_1.52.45_PM.png)
- Added `exposure` property to SARIF output for Semgrep Supply Chain findings.

### Changes

- The **Semgrep App > Vulnerabilities** page now hides transitive vulnerabilities by default. To see transitive vulnerabilities, click on **Transitive** under the **Transitivity** filter in the Semgrep App > Vulnerabilities page.
- New lockfile parsers with improved error messages for all supported ecosystems except Rust
- Removed support for reading dependencies from `pom.xml` files. Instead, Semgrep Supply Chain reads dependencies from a `maven_dep_tree.txt` file, which can be generated using the following command:
    `mvn dependency:tree -DoutputFile=maven_dep_tree.txt`

## Semgrep App

### Additions

- Display findings grouped together by rules that detected them! Group by rule view helps you to identify patterns in your code and to triage findings easily. Findings grouped by rule are sorted by count from high to low. This enables you to know which rules have fired the most. In comparison, regularly grouped findings are sorted by their recency (most recent findings are at the top of the Findings page). See how to enable this view on the Findings page in [Group by rule](/semgrep-app/findings/#grouping-by-rule) documentation.
    ![Untitled](Release%20notes%20January%202023%20draft%20a54192a13ba04adbb58180c9b90a331f/Untitled.png)
- Semgrep API now allows you to add or remove tags to a project. See [Managing projects through tags](/semgrep-app/tags/) documentation.

### Changes

- The findings detail page has received a facelift. This update is preparing the ground for future updates and features. The following list provides an overview of the implemented improvements:
    - New read-only rule preview component at the bottom of the page to view the rule and test cases.
    - The interface is now standardized with the rest of the Findings page, showing information about the location of the finding under the heading.
    - New rule information card component that displays information about the rule. This information includes any references and information about the rule severity and confidence. ![Semgrep App finding details page](/img/app-finding-details.png)

## Semgrep CLI

These release notes include upgrades for versions ranging between 1.3.0 and 1.6.0.

### Additions

- Semgrep now provides experimental support for XML, Clojure, Lisp, Scheme, Dart, and Jsonnet languages.
- Rust language support is now improved from Experimental to Beta!
- Python: Constant propagation now recognizes the idiom `cond and X or Y`,
as well as `True and X` and `False or X`. For example, `cond and "a" or "b"` is identified as a constant string. (Issue [#6079](https://github.com/returntocorp/semgrep/issues/6079))

### Changes

- Tests: Allow `-test` to process entire file trees rather than single files. See more information about the `semgrep --test` in the [Testing rules](/writing-rules/testing-rules.md) documentation. (Issue [#5487](https://github.com/returntocorp/semgrep/issues/5487))
- metavariable-pattern: For performance reasons the [generic mode](https://semgrep.dev/docs/writing-rules/generic-pattern-matching/) ignores target files that are machine-generated. However, this change prevented the use of `metavariable-pattern` operator on the text that seemed or was machine-generated, such as an RSA key contained in a file. This issue has been fixed. Now, when the analysis is requested within a `metavariable-pattern` operator, the generic mode always matches any text even if it seems to be machine-generated.

## Semgrep Registry

### Changes

- Semgrep Registry now displays gem icons on Team tier rules and rulesets.

## Semgrep in CI

### Changes

- Previously, new users who logged in with GitLab landed on a GitLab Groups page, then enable the GitLab groups they wanted to onboard, and then logout and login, in before landing on the Semgrep App > Dashboard page. Now, new users are immediately redirected to Semgrep App > Dashboard.
- In order to associate their Semgrep account with their GitLab Groups, users need to use the GitLab “Add Org” workflow, which brings them to the Gitlab Groups page. This change also addresses a bug when enabling a GitLab Group that would cause the app to crash.

## Documentation updates

### Additions

- Cheat sheets have been revisited, added, improved and rewritten:
    - Added a new [XML External entity (XXE) prevention for Java](https://semgrep.dev/docs/cheat-sheets/java-xxe/) cheat sheet.
    - Added new command and code injection cheat sheets:
        - [Code injection prevention for Java](https://semgrep.dev/docs/cheat-sheets/java-code-injection/).
        - [Command injection prevention for Java](https://semgrep.dev/docs/cheat-sheets/java-command-injection/).
        - [Code injection prevention for JavaScript](https://semgrep.dev/docs/cheat-sheets/javascript-code-injection/).
        - [Command injection prevention for JavaScript](https://semgrep.dev/docs/cheat-sheets/javascript-command-injection/).
        - [Code injection prevention for Ruby](https://semgrep.dev/docs/cheat-sheets/ruby-code-injection/).
        - [Command injection prevention for Ruby](https://semgrep.dev/docs/cheat-sheets/ruby-command-injection/).
        - Many other cheat sheets (such as [Command injection prevention for Go](https://semgrep.dev/docs/cheat-sheets/go-command-injection/)) now have updated examples and were enriched by other improvements.
- Added a new document on how to set up [notifications for Semgrep Supply Chain](https://semgrep.dev/docs/semgrep-sc/receiving-notifications-from-ssc/) scans.
- Added a new section [Transform](https://semgrep.dev/docs/writing-rules/experiments/extract-mode/#transform) to the Exctract mode documentation.

### Changes

- Updated Getting started with Semgrep Supply Chain with additional information on scanning [Maven projects](https://semgrep.dev/docs/semgrep-sc/scanning-open-source-dependencies/#apache-maven-java).
- Updated documentation of Semgrep App [Findings](https://semgrep.dev/docs/semgrep-app/findings/) with fresh screenshots.
- Updated Supported languages with [additional information on transitivity](https://semgrep.dev/docs/supported-languages/#general-availability).
- Updated Semgrep App’s [Tagging](https://semgrep.dev/docs/semgrep-app/tags/) documentation.
- Updated [Getting started with Semgrep CLI](https://semgrep.dev/docs/getting-started/).