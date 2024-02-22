---
slug: october-2022
append_help_link: true
hide_title: true
description: >-
  Release notes include the changes, fixes, and additions in specific versions of Semgrep.
toc_max_heading_level: 3
---

# October 2022

## Semgrep Supply Chain

Semgrep, Inc now offers a new product: Semgrep Supply Chain. Semgrep Supply Chain is a high-signal dependency scanner that detects reachable vulnerabilities in open source, third-party libraries in your code. Learn more about [Semgrep Supply Chain](https://semgrep.dev/products/semgrep-supply-chain).

## Semgrep App

### Additions

- New demo project allows you to try out Semgrep App workflows. If your organization in Semgrep App does not have any projects assigned in the [Projects](https://semgrep.dev/orgs/-/projects) page, you can add the new demo project by clicking **Explore a demo project**.
- You can now triage through PR comments, for more information see [Ignoring findings through comments](/semgrep-code/findings/#ignoring-findings-through-comments) documentation.
- Semgrep Playground now displays its version number. To see the exact version that Semgrep Playground uses, click the <i class="fa-regular fa-ellipsis-vertical"></i> three-dot button, and then see the version number after the <i class="fa-solid fa-code-commit"></i> icon.

    ![Semgrep Playground version number.](/img/semgrep-app-latest-version.png "Semgrep Playground version number.")

### Changes

- Previously, when you removed a rule you had to rescan the code to remove findings associated with the rule. With this change, findings made by the removed rule are now automatically removed without rescanning. If you add a removed rule back, then you need to rescan your code to get the findings from the previously removed rule again. For more information, see [Triaging findings](/semgrep-code/findings/#triaging-findings).
- New [Findings](https://semgrep.dev/orgs/-/findings?tab=open) page styling. See [Managing findings in Semgrep App](/semgrep-code/findings/) documentation for additional information.
- Semgrep App experience is generally improved due to a significant number of fixed bugs.

## Semgrep CLI

These release notes include upgrades for versions ranging between 0.116.0 and 0.118.0.

### Additions

#### Taint mode

- Taint mode now tracks taint coming from the default values of function parameters. For example, given `def test(url = "http://example.com"):`, if `"http://example.com"` is a taint source (as a consequence of not using TLS protocol), then `url` is marked as tainted. (Issue [#6298](https://github.com/semgrep/semgrep/issues/6298))
- Two new rule options that help to minimize false positives:
    - The`taint_assume_safe_indexes`, which makes Semgrep assume that an array-access expression is safe even if the index expression is tainted. Otherwise Semgrep assumes that for example: `a[i]` is tainted if `i` is tainted, even if `a` is not. Enabling this option is recommended for high-signal rules, whereas disabling is preferred for audit rules. Currently, it is disabled by default to attain backwards compatibility, but this can change in the near future after some evaluation. To enable this option, include the `taint_assume_safe_indexes: true` under the `options` key. For more information, see [Rule syntax](/writing-rules/rule-syntax/#options) documentation. (PR [#6327](https://github.com/semgrep/semgrep/pull/6327))
    - The `taint_assume_safe_functions`, makes Semgrep assume that function calls do **not** propagate taint from their arguments to their output. Otherwise, Semgrep always assumes that functions may propagate taint. This is intended to replace **not-conflicting** sanitizers (added in v0.69.0, for more information, see [Minimizing false positives via sanitizers](/writing-rules/data-flow/taint-mode/#minimizing-false-positives-via-sanitizers)) in the future. This option is still experimental and needs to be complemented by other changes in future releases. To enable this option, include the `taint_assume_safe_functions: true` under the `options` key. For more information, see [Rule syntax](/writing-rules/rule-syntax/#options) documentation. (PR [#6327](https://github.com/semgrep/semgrep/pull/6327))
- It is now possible to use `pattern-propagators` to propagate taint through higher-order iterators such as `forEach` in Java.
    For example:
    ```yaml
      pattern-propagators:
           - pattern: $X.forEach(($Y) -> ...)
          from: $X
          to: $Y
    ```
    (Issue [#5971](https://github.com/semgrep/semgrep/issues/5971))
- The following update is only relevant for users of DeepSemgrep: Added support for named arguments in taint mode.

### Changes

- Disabled Bloom filter optimization by default, due to undesired interactions with constant and symbolic propagation, while it appears to not provide a net major performance benefit. If you do notice a significant drop in performance after this change, please let us know.

#### Taint mode

- Removed basic experimental support for wrapper functions around taint sources. This was an early experiment to make Semgrep inter-procedural, but it was abandoned in favor of DeepSemgrep.
    Previously, if Semgrep found a definition such as `wrapper() { return taint_source; }`, it recognized that `wrapper` was propagating taint from `taint_source`. If the code included something as `sink(wrapper())`, Semgrep flagged it. However, for Semgrep to match such code, a `wrapper` had to be defined earlier in the source file before its use. DeepSemgrep is able to handle this case and many more.
    If you relied on this feature, it can generally be worked around using for example:
   ```yaml
   pattern-sources:
    - patterns:
        - pattern-inside: |
            $FUNC(...) {
              ...
              return tainted_source;
            }
            ...
        - pattern: $FUNC(...)
   ```

## Semgrep in CI

### Changes 

- Previously, Semgrep overrode user-defined environment variables with values it detected from the CI provider. Now, user-defined environment variables take precedence (override) Semgrep's detected values. By enabling you to override CI variables, you are able to troubleshoot issues such as hyperlinks to code in the Findings page and receiving comments in pull or merge requests.
     - This change affects the following CI providers:
        - Azure Pipelines
        - BitBucket Pipelines
        - Jenkins
        - Travis CI
     - This change affects the following variables:
        - `SEMGREP_REPO_NAME`
        - `SEMGREP_REPO_URL`
        - `SEMGREP_BRANCH`
        - `SEMGREP_JOB_URL`
        - `SEMGREP_COMMIT`
        - `SEMGREP_PR_ID`

- The `--scan-unknown-extensions` option is now set to false by default. This means that from now on `--skip-unknown-extensions` is the default. This is an important change that prevents many errors when using Semgrep in a pre-commit context or in CI.

## Documentation updates

### Additions

#### Semgrep Supply Chain

The following guides are now available for Semgrep Supply Chain:
- [Scanning open source dependencies](/semgrep-supply-chain/getting-started/) - Walks the user through setting up Semgrep Supply Chain scans and how Semgrep performs reachability analysis.
- [Triaging and remediating dependency findings](/semgrep-supply-chain/triage-and-remediation/) - Provides workflows for triaging dependency findings.
- [Ignoring lockfiles and dependencies](/semgrep-supply-chain/ignoring-lockfiles-dependencies/) - Provides commands to fine-tune what files should not be scanned.

The following references are available for Semgrep Supply Chain:
- [Supported languages](/docs/supported-languages#semgrep-supply-chain) - All languages supported by Semgrep Supply Chain and their maturity levels.
- [Glossary](/semgrep-supply-chain/glossary/) - A list of terms related to software composition analysis and how Semgrep Supply Chain relates to those terms

#### Semgrep App

- [Ignoring findings through comments](/semgrep-code/findings/#ignoring-findings-through-comments) section documents how to triage findings through GitHub comments.

#### Semgrep CLI

- New section [Connecting to Semgrep Registry through a proxy](/cli-reference/#connecting-to-semgrep-registry-through-a-proxy).

### Changes

- [CI configuration reference](/semgrep-ci/configuration-reference/) now includes all environment variables for CI, their uses, and how to set them.
- [Getting started with Semgrep App](/deployment/core-deployment) now includes information about the last 10 supported versions of the Semgrep CLI.
- [Running Semgrep in continuous integration (CI) with Semgrep App](/semgrep-ci/running-semgrep-ci-with-semgrep-cloud-platform/) now includes a new video Scanning code with Semgrep using GitHub Actions.
- Updated a document and section that provides information on how to add multiple focus metavariables in:
    - [Including multiple focus metavariables using set union semantics](/writing-rules/experiments/multiple-focus-metavariables/)
    - [Including multiple focus metavariables using set intersection semantics](/writing-rules/rule-syntax/#including-multiple-focus-metavariables-using-set-intersection-semantics)
- Removing rules from a rule board now removes all associated findings. This change is reflected in the following documents:
    - [Managing findings](/semgrep-ci/findings-ci/#semgrep-code-findings).
    - Section [Triaging findings](/semgrep-code/findings/#triaging-findings) in [Managing findings in Semgrep App](/semgrep-code/findings/).
    - [Getting started with Semgrep App](/deployment/core-deployment/).
- Adjustments to the structure of the documentation in our left sidebar. Many iterative changes, improvements, and fixes to improve your docs reading experience.
