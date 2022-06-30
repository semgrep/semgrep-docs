---
slug: release-notes
append_help_link: true
description: >-
  Release notes include the changes, fixes, and additions in specific versions of Semgrep.
toc_max_heading_level: 2
---

# Release notes

Welcome to Semgrep release notes. This document provides an overview of the changes, additions, and selected important fixes. Release notes published since April 2022 include Semgrep CLI, CI, and Semgrep App updates. Release notes published since April 2022 also include updates from more versions collected together.

## June 2022

### Semgrep App

#### Additions

- Effective August 1, 2022, Semgrep App Community tier will be limited to 20 developers each month. Please see our [Usage Limits FAQ](https://semgrep.dev/faq-usage-limits) for more information. 
- You can now see the number of developers committing to private repositories scanned by Semgrep App in the **Settings page**.
- New accounts can now try out Semgrep with the default inclusion of `juice-shop`, an intentionally vulnerable codebase. This enables new users to explore Semgrep's scanning capability, dashboard, and features.
- Additional scan status messages have been added in the Projects page, under the **Last scan** row to better assist users in troubleshooting and understanding scan behavior.
- [Team or Enterprise Tier] You can now **tag** repositories within Semgrep App with up to 10 tags. Tagging enables teams to group together related repositories. Tags are implemented in [Semgrep's API](https://semgrep.dev/api/v1/docs/#section/Introduction), enabling you to filter and group repository findings through tags.

#### Changes

- **Semgrep App Findings page**: The **Closed** tab is now labeled as Fixed. This change prevents confusion between findings that were fixed and findings that were removed.
- Findings that Semgrep App found in a previous scan but no longer found them in the latest scan are called **Fixed findings**. To mark findings as fixed, the rule that matched the code and the file that was scanned must still be present during the latest scan. Under these conditions, Semgrep App concludes that the finding is fixed.
- Removed findings are not included in the count in the Fixed findings tab. **Removed findings** are findings in the code that were previously found by a rule, but either the rule or the file containing the code has been removed in the most recent scan. Thus, the code cannot be considered "fixed", but is instead "removed." See [Semgrep App Findings](https://semgrep.dev/docs/semgrep-app/findings/) documentation for more information.
- Both fixed findings and removed findings were previously counted together in the Closed tab, causing confusion as to the actual count of fixed findings. Now only findings that were purposefully fixed or addressed are counted.
- PR Fix Rate has been renamed to **Comment Fix Rate**. The use of a more general term, "comment", captures both GitLab merge requests (MRs) and GitHub pull requests (PRs).
- The **Comment Fix Rate** is the percentage of PR or MR comments fixed by developers. These PR or MR comments are findings detected by Semgrep from rules in the Comment column of your Rule Board.

#### Fixes

- When adding GitHub projects, Semgrep App previously redirected the user to GitHub and then back into Semgrep App's Dashboard page while adding a project. Because of this, users would have to manually return to the Projects page to finish adding a project. Semgrep App now correctly redirects users to the Project page.

### Semgrep CLI and Semgrep in CI

These release notes include upgrades for all versions ranging between **0.95.0** and **0.101.0**.

#### Additions

- Semgrep installation through PyPi is now supported on Apple M1 processors!
- Semgrep now supports the R language as an experimental language. Thanks to Zythosec for contributions! ([Issue #2360](https://github.com/returntocorp/semgrep/issues/2360))
- Bash: Semgrep now supports subshell syntax for example commands in parentheses. ([Issue #5629](https://github.com/returntocorp/semgrep/issues/5629))
- Java: You can now use a metavariable in a package directive, for example, `package $X`, which is useful to bind the package name and use it in the error message. ([Issue #5420](https://github.com/returntocorp/semgrep/issues/5420))
- Building the foundation for an improved Visual Studio Code user experience, Semgrep now has an experimental Language Server Protocol (LSP) daemon mode. A client program (such as Visual Studio Code) would typically run the  LSP daemon. If you feel like an adventurer, all you need to do to start it is to run `semgrep lsp --config p/r2c`. Stay tuned for more LSP goodness!
- Semgrep in CI:
  - Starting to run Semgrep CI in your pipelines was easier in GitHub and GitLab than for any other CI provider. With this release, the process has been simplified for many other CI providers! Previously, for any provider except for GitHub and GitLab, you would have to commit a lengthy configuration file to enable Semgrep in CI to start working in your pipeline. Now, the autodetection of the CI environment supports Azure Pipelines, Bitbucket, Buildkite, CircleCI, Jenkins, and Travis CI in addition to GitHub and GitLab. Now you do not need to commit big configuration files again for these providers!
  - You can now disable version checks with an environment variable by setting `SEMGREP_ENABLE_VERSION_CHECK=0`.
  - Accept `SEMGREP_BASELINE_REF` as an alias for `SEMGREP_BASELINE_COMMIT`.
  - The `ci` CLI command now includes ignored findings in output formats according to their configuration.
- taint-mode:
  - Taint tracking now analyzes lambdas in their surrounding context. Previously, if a variable became tainted outside a lambda, and this variable was used inside the lambda causing the taint to reach a sink, this was not detected because any nested lambdas were "opaque" to the analysis. Taint tracking looked at lambdas but as isolated functions. With this update, lambdas are simply analyzed as if they were statement blocks. However, taint tracking still does not follow the flow of taint through the lambda's arguments!
  - New experimental `pattern-propagators` feature that allows you to specify arbitrary patterns for the propagation of taint by side-effect. In particular, this allows specifying how taint propagates through side-effectful function calls. For example, you can specify when tainted data is added to an array then the array itself becomes tainted. ([Issue #4509](https://github.com/returntocorp/semgrep/issues/4509))
- Dataflow: 
  - Spread operators in record expressions (for example `{...foo}`) are now translated into the Dataflow Intermediate Language (IL).
  - XML elements (for example JSX elements) have now a basic translation to the Dataflow IL, meaning that dataflow analysis (constant propagation, taint tracking) can now operate inside these elements. ([Issue #5115](https://github.com/returntocorp/semgrep/issues/5115))
- Generic mode:
  - New option `generic_ellipsis_max_span` for controlling how many lines an ellipsis can match. ([Issue #5211](https://github.com/returntocorp/semgrep/issues/5211))
  - New option `generic_comment_style` for ignoring comments that follow the specified syntax (C style, C++ style, or Shell style). ([Issue #3428](https://github.com/returntocorp/semgrep/issues/3428))
- Metrics:
  - A list of features used during execution is now included among metrics. Examples of such features are: languages scanned, CLI options passed, keys used in rules, or certain code paths reached, such as using an `:include` instruction in a `.semgrepignore` file. These strings will **not** include user data or specific settings. As an example, with `semgrep scan --output=secret.txt` we send `"option/output"` but will **not** send `"option/output=secret.txt"`.
  - An anonymous Event ID has been included among metrics. This is an ID generated at send-time and will be used to de-duplicate events that potentially get duplicated during transmission.
  - Metrics now include an anonymous User ID. This ID is stored in the `~/.semgrep/settings.yml` file. If the ID disappears, the next run will generate a new ID randomly. See the <a target="_self" href="https://semgrep.dev/docs/metrics/#anonymous-user-id" >Anonymous User ID in PRIVACY.md</a> for more details.

#### Changes

- PHP: Semgrep PHP support now reached GA General Availability (GA) maturity! Thanks a lot to Sjoerd Langkemper for most of the heavy work!
- Gitlab SAST output is now v14.1.2 compliant.
- The following deprecated `semgrep scan` options are now removed:
  `--json-stats`, `--json-time`, `--debugging-json`, `--save-test-output-tar`, `--synthesize-patterns`,
  `--generate-config/-g`, `--dangerously-allow-arbitrary-code-execution-from-rules`,
  and `--apply` (which was an easter egg for job applications, not the same as `--autofix`).
- Rules are now downloaded from the Semgrep Registry in JSON format instead of YAML. This speeds up rule parsing in the Semgrep CLI, making a `semgrep --config auto` run on the semgrep Python package in 14s instead of 16s.
- The output summarizing scan results has been simplified.
- Previously, you could use `$X` in a message to interpolate the variable captured by a metavariable named `$X`, but there was no way to access the underlying value. However, sometimes that value is more important than the captured variable. Now you can use the syntax `value($X)` to interpolate the underlying propagated value if it exists (if not, it will just use the variable name).

  **Example**: Take a target file such as the following:

  ```py
  x = 42
  log(x)
  ```

  Now take a rule to find that log command:
  ```yaml
  - id: example_log
    message: Logged $SECRET: value($SECRET)
    pattern: log(42)
    languages: [python]
  ```

  Before this update, the same rule applied to our test example would give you the message `Logged x: value(x)`. Now, it gives the message `Logged x: 42`.

##### Additional information

Bug fixes are not included in these release notes unless they are potentially breaking your workflow. To see the complete change notes for Semgrep CLI and CI that include fixes, visit the [Semgrep changelog](https://github.com/returntocorp/semgrep/releases/).

## May 2022

### Semgrep App

#### Additions

- Team and Enterprise tier users can now integrate Semgrep into their GitHub Enterprise (GHE) and GitLab Self-Managed (GLSM) repositories. See [Integrating Semgrep into source code management (SCM) tools](https://semgrep.dev/docs/semgrep-app/scm/).
- You can now scan locally through Semgrep CLI and then upload findings to Semgrep App.
- Semgrep App now has a project setup page for integrating Semgrep with Jenkins. To create a new project with Jenkins, log in to Semgrep App and click **[Projects](https://semgrep.dev/orgs/-/projects)** > **Scan new project** > **Run scan in CI** > **Jenkins**.

#### Changes

- The Playground UI is now similar to Semgrep App's Editor UI for a consistent experience.

### Semgrep CLI and Semgrep in CI

These release notes include upgrades for all versions ranging between **0.91.0** and **0.94.0**.

#### Changes

- taint-mode: Let's say that the `taint(x)` function makes `x` argument tainted by side-effect. Previously, Semgrep had to rely on a workaround that declared that any occurrence of `x` inside `taint(x); ...` was a taint source. If `x` was overwritten with safe data, this was not recognized by the taint engine. Also, if `taint(x)` occurred inside of, for example, an `if` block, any occurrence of `x` outside that block was not considered tainted. Now, if you specify that the code variable itself is a taint source (using `focus-metavariable`), the taint engine will handle this as expected, and it will not suffer from the aforementioned limitations. We believe that this change should not break existing taint rules, but please report any regressions that you may find.

- taint-mode: Let's say that the `sanitize(x)` function sanitizes `x` argument by side-effect. Previously, Semgrep had to rely on a workaround that declared that any occurrence of `x` inside `sanitize(x); ...` was sanitized. If `x` is later overwritten with tainted data, the taint engine would still consider `x` parameter as safe. Now, if you specify that the code variable itself is sanitized (using `focus-metavariable`), the taint engine handles this as expected and it will not suffer from such limitation. We believe that this change should not break existing taint rules, but please report any regressions that you may find.

- The dot access ellipsis now matches field accesses in addition to method calls. See the following example in [Semgrep Playground](https://semgrep.dev/playground/s/9010).
    <iframe title="Semgrep example no prints"src="https://semgrep.dev/embed/editor?snippet=j4x2" width="100%" height="432" frameborder="0"></iframe>
  
- In this version, we have made several performance improvements to the code that surrounds our source parsing and matching core. This includes file targeting, rule fetching, and similar parts of the codebase. When we tested `semgrep scan --config auto` on the Semgrep repository itself, the performance improved from 50-54 seconds to 28-30 seconds.
    - As part of these changes, we removed `:include .gitignore` and `.git/` from the default `.semgrepignore` patterns. This should not cause any difference in which files are targeted as other parts of Semgrep ignore these files already.
    - A full breakdown of our performance updates, including some upcoming ones, can be found in this [GitHub comment that gives an overview of these changes](https://github.com/returntocorp/semgrep/issues/5257#issuecomment-1133395694).

- If a metrics event request times out, Semgrep no longer retries the request. This avoids Semgrep waiting 10-20 seconds before exiting if these requests are slow.

- The metrics collection timeout has been raised from 2 seconds to 3 seconds.

- Files, where only a part of the code was skipped due to a parse failure, are now listed as `partially scanned` in the end-of-scan skip report.

- The `isAuthenticated` was added to metrics sent to Semgrep backend. This is a boolean flag that is true if you are logged in.

- Semgrep in CI prints out all findings instead of hiding nonblocking findings. ([#5116](https://github.com/returntocorp/semgrep/issues/5116))

#### Additions

- `metavariable-regex` now supports an optional `constant-propagation` key. When this is set to `true`, information learned from constant propagation is used when matching the metavariable against the regex. By default, it is set to `false`.

- Dockerfile: Constant propagation now works on variables declared with `ENV`.

- Added `shouldafound`. You can report false negatives that Semgrep should have found through the Semgrep CLI itself. See the following use case of `shouldafound`:

    See the following file `test.go`:
    ```go                                    
    package main
    ​
    import "fmt"
    ​
    func main() {
        fmt.Println("foo")
    }
    ```

    Let's notify Semgrep creators that they missed some vulnerable code in the previous file:
    ```sh
    semgrep shouldafound --email "test@foo.com" --start 5 --end 7
    -m "Semgrep missed a vulnerable code here" ./test.go
    ```

    This will send the following information to semgrep.dev:

    ```sh
    {
      "email": "test@foo.com",
      "lines": "func main() {\n    fmt.Println(\"foo\")\n}\n",
      "message": "Semgrep missed a vulnerable code here",
      "path": "test.go"
    }
    OK to send? [y/N]: y
    ```

    If you send the code, you get the following notice in the terminal:

    ```sh
    Sent feedback. Thanks for your contribution!
    You can view and extend the generated rule template here: https://semgrep.dev/s/ylAk
    ```

- dataflow: The [data-flow analysis engine](https://semgrep.dev/docs/writing-rules/data-flow/) now handles `if-then-else` **expressions** as in OCaml, Ruby etc. Previously it only handled `if-then-else` **statements**. ([#4965](https://github.com/returntocorp/semgrep/issues/4965))

- taint-mode: Previously, to declare a function parameter as a taint source, Semgrep relied on a workaround that declared that any occurrence of the parameter was a taint source. If the parameter was overwritten with safe data, this was not recognized by the taint engine. Now, `focus-metavariable` can be used to specify that a function parameter is a source of taint, and the taint engine handles this as expected.

- taint-mode: Add basic support for object destructuring in languages such as JavaScript. For example, given `let {x} = E`, Semgrep now infers that `x` is tainted if `E` is tainted.

- The JSON output of the Semgrep scan is now fully specified using [ATD](https://atd.readthedocs.io/) and JSON Schema (https://json-schema.org/). See the semgrep-interfaces submodule under interfaces/ (for example, `interfaces/semgrep-interfaces/Semgrep_output_v0.atd` for the ATD specifications).

- The JSON output of `semgrep scan` now contains a `version`: field with the version of Semgrep used to generate the match results.

#### Additional information

To see the complete change notes which include fixed issues, visit the [Semgrep changelog](https://github.com/returntocorp/semgrep/releases/).

## April 2022

These release notes now include edited important and breaking changes. To see the complete change notes, visit the [Semgrep changelog](https://github.com/returntocorp/semgrep/releases).

### Semgrep App

#### Additions

- You can now search for a rule within your Rule Board.
- A `Comment` column within the Rule Board enables Semgrep App to create suggestions and messages within Pull Requests (PRs) or Merge Requests (MR) based on the rule's `autofix` and `message` values.

#### Changes

- Unlisted rule visibility has been renamed to Public within the Editor.
- The `Audit` column within the Rule Board has been renamed to `Monitor`. Findings generated by rules within this column are displayed only on Semgrep App.
![New rule board.](img/rule-board.png "New rule board.")

### Semgrep CLI and Semgrep in CI

These release notes encompass upgrades for all versions ranging between **0.87.0** and **0.90.0**.

#### Changes

- For GitHub Enterprise users: Semgrep CI uses `GITHUB_SERVER_URL` to generate URLs if it is available.
- When running a baseline scan on a shallow-cloned Git repository, Semgrep still needs enough Git history available to reach the branch-off point between the baseline and current branch. Previously, Semgrep tried to gradually fetch more and more commits up to a thousand commits of history, and then fetch all commits from the remote Git server. Now, Semgrep keeps trying smaller batches until up to a million commits. This change reduces runtimes on large baseline scans on very large repositories.
- You can now set `NO_COLOR=1` to force-disable colored output.

#### Breaking changes

- taint-mode: Unification of metavariables between sources and sinks is no longer enforced by default. It was not clear that this is the most natural behavior as it was confusing even for experienced Semgrep users. Instead, each set of metavariables is now considered independent by Semgrep. The metavariables available to the rule message are all metavariables bound by `pattern-sinks`, and the subset of metavariables bound by `pattern-sources` that do not collide with the ones bound by `pattern-sinks`. We do not expect this change to break many taint rules because source-sink metavariable unification had a bug (see [#4464](https://github.com/returntocorp/semgrep/issues/4453)) that prevented metavariables bound by a `pattern-inside` to be unified, thus limiting the usefulness of the feature. Nonetheless, it is still possible to enforce metavariable unification by setting `taint_unify_mvars: true` in the rule options. For more information, see section [Metavariables, rule message, and unification](/writing-rules/data-flow/taint-mode/#metavariables-rule-message-and-unification).
- The `returntocorp/semgrep` Docker image no longer sets `semgrep` as the entry point. This means that Semgrep is no longer prepended automatically to any command you run in the image. This makes it possible to use the image in CI executors that run provisioning commands within the image. Affected users may receive a deprecation notice. Adjust scripts accordingly.

#### Additions

- A new `focus-metavariable` operator that enables you to focus (or zoom in) the match on the code region delimited by a metavariable. This operator is useful for narrowing down the code matched by a rule, to focus on what matters. For more information, see [focus-metavariable documentation](/experiments/focus-metavariable/). ([#4453](https://github.com/returntocorp/semgrep/issues/4453))
- Join mode now supports inline rules through the `rules` key underneath the `join` key. For more information, see [Inline rule example](/experiments/join-mode/overview/#inline-rule-example).

Language support improvements:
- Scala support is now officially fully GA.
    - Ellipsis method chaining supported.
    - Type `metavariables` are now supported.
- Ruby support improvement:
    - Add basic support for lambdas in patterns. You can now write patterns of the form `-> (P) {Q}` where `P` and `Q` are sub-patterns. ([#4950](https://github.com/returntocorp/semgrep/issues/4950))

## March 2022

### Version 0.86.5

#### Additions

##### Semgrep findings available in two GitLab formats

Semgrep can now output findings in the following formats:

- GitLab SAST report format with `--gitlab-sast`.
- GitLab secret detection report format with `--gitlab-secrets`.

##### JSON output fingerprint of each finding

JSON output now includes a fingerprint of each finding. This fingerprint remains consistent when scanned code is just moved or reindented.

##### Go improvement

Use latest `tree-sitter-go` with support for Go 1.18 generics. ([#4823](https://github.com/returntocorp/semgrep/issues/4823))

##### Terraform support

Basic support for constant propagation of locals and variables. ([#1147](https://github.com/returntocorp/semgrep/issues/1147), [#4816](https://github.com/returntocorp/semgrep/issues/4816))

##### Ellipsis metavariable in HTML

You can now use metavariable ellipsis inside a `<script>` tag. For example `<script>$...JS</script>`. ([#4841](https://github.com/returntocorp/semgrep/issues/4841)) 

##### Semgrep CI is now a part of Semgrep CLI

You can now run Semgrep CI with `semgrep ci` subcommand that auto-detects settings from your CI environment and can upload findings to Semgrep App when logged in.

#### Changes

##### SARIF output

SARIF output includes matching code snippet ([#4812](https://github.com/returntocorp/semgrep/issues/4812))

##### Python wheel

Removed tests from published Python wheel.

##### Findings comparison changes

Findings are now considered identical between baseline and current scans, meaning that:

- Two findings are now identical after whitespace changes such as re-indentation.
- Two findings are now identical after a nosemgrep comment is added.
- Findings are now different if the same code triggered them on different lines.

##### Semgrep docker image running as root

Docker image now runs as root to allow the docker image to be used in CI/CD pipelines.

##### XDG Base Directory

Semgrep now supports XDG Base Directory specification format. ([#4818](https://github.com/returntocorp/semgrep/issues/4818))

#### Additional information

To see the complete change notes, visit the [Semgrep changelog](https://github.com/returntocorp/semgrep/releases/).

### Version 0.85.0

#### Additions

##### C# improvement

Semgrep uses the latest tree-sitter-c-sharp with support for most C# 10.0 features.

##### HTML improvement

Support for metavariables on tags (for example: `<$TAG>...</$TAG>`). ([#4078](https://github.com/returntocorp/semgrep/issues/4078))

##### Scala improvement

The data-flow engine now handles expression blocks. Previously, Semgrep did not report some false negatives when run with taint analysis on expression blocks, which are now reported.

##### Dockerfile improvement

Allow for example `CMD …` to match both `CMD ls` and `CMD ["ls"]`. ([#4770](https://github.com/returntocorp/semgrep/issues/4770))

##### Semgrep informs about used rules for multiple languages

When scanning multiple languages, Semgrep now prints a table of how many rules and files are used for each language.

#### Changes

##### File targeting logic

The following inconsistencies were fixed: ([#4776](https://github.com/returntocorp/semgrep/pull/4776))

##### Explicitly targeted files are now unaffected by global filters

Previously, explicitly targeted files (files that are directly passed to the command line) were unaffected by most global filters: global include or exclude patterns, and the file size limit. Now, the `.semgrepignore` patterns do not affect explicitly targeted files as well.

##### Semgrep scans with `--skip-unknown-extensions` flag now use shebang

Previously, `--skip-unknown-extensions` skipped files based only on file extension, even though extensionless shell scripts expose their language through the shebang of the first line. As a result, when you set `--skip-unknown-extensions` flag, Semgrep always skipped explicitly targeted shell files with no extension. Now, Semgrep with said flag decides if a file is a correct language using both extensions and shebangs.

##### Faster scans with `--baseline-commit` flag

These optimizations were added:

- When `--baseline-commit` is set, Semgrep runs the **current scan**, then switches to the `–baseline-commit`, and runs the **baseline scan**. The current scan now excludes files that are unchanged between the baseline and the current commit according to the output of `git status`.

- The **baseline scan** now excludes rules and files that had no matches in the **current scan**.

- When `git ls-files` is unavailable or `--disable-git-ignore` is set, Semgrep walks the file system to find all target files. Semgrep now walks the file system 30% faster compared to previous versions.

##### Improved Semgrep output format

The output format is updated to visually separate lines with headings and indentation.

#### Fixes

##### Deep expression matching and metavariable interaction

Semgrep does not stop at the first match and enumerates all possible matches if a metavariable is used in a deep expression pattern (for example: `<... $X ...>`). This fix can introduce performance regressions.

#### Additional information

To see the complete change notes, visit the [Semgrep changelog](https://github.com/returntocorp/semgrep/releases/tag/v0.85.0).

### Version 0.84.0

#### Additions

##### Semgrep CLI lists supported languages

Semgrep CLI now includes `--show-supported-languages` flag to display the list of languages supported by Semgrep. Thanks to John Wu for this contribution! ([#4754](https://github.com/returntocorp/semgrep/pull/4754))

##### JSX (JavaScript) improvement

Semgrep CLI now provides the following improvements for JSX (JavaScript extension) scans:

- Semgrep scans for JSX self closing tags (XML elements) such as `<foo />` can result in a match of explicitly closed tags, for example: `<foo >some child</foo>`. You can now disable this behavior by rule options: `xml_singleton_loose_matching: false` (#4730)
- New rule option `xml_attrs_implicit_ellipsis` that allows you to disable the implicit ellipsis `...` that was added to JSX attributes patterns.

##### Updated validation of rules

The `semgrep --config [file] --validate` now checks for invalid metavariables.

##### The `project-depends-on` now supports more languages

You can now use `r2c-internal-project-depends-on` with lockfiles for Java, Go, Ruby, and Rust. ([#4699](https://github.com/returntocorp/semgrep/pull/4699))

##### Improved PHP support

Semgrep now treats TPL files as PHP files. ([#4763](https://github.com/returntocorp/semgrep/pull/4763))

##### Improved Scala support

Semgrep CLI now provides the following improvements for Scala language scans:

- Custom string interpolators. ([#4655](https://github.com/returntocorp/semgrep/issues/4655))
- Support for parsing scripts that contain plain definitions outside of an object or class.

## February 2022

### Version 0.83.0

#### Additions

##### Semgrep logs

Semgrep now saves logs of its last run to `~/.semgrep/last.log`.

##### New recursive operator in join mode

Join mode enables you to cross file boundaries, allowing you to write rules for whole code bases instead of individual files. With this update, you can now use a new recursive operator `-->` to recursively chain Semgrep rules based on metavariable contents. ([#4684](https://github.com/returntocorp/semgrep/pull/4684))

##### Scanned paths under `paths.scanned` key

Semgrep now lists the scanned paths in its JSON output under the `paths.scanned` key.

##### The `--verbose` option lists skipped paths

With the `--verbose` option, the skipped paths are listed under the `paths.skipped` key.

##### C# improvement

Semgrep now supports typed metavariables in C#. ([#4657](https://github.com/returntocorp/semgrep/issues/4657))

##### The `metavariable-analysis`

Experimental `metavariable-analysis` feature that supports two kinds of analyses rules: 
- Prediction of regular expression denial-of-service vulnerabilities (Regular expression Denial of Service (ReDoS) analyzer). ([#4700](https://github.com/returntocorp/semgrep/pull/4700))
- High-entropy string detection (`entropy`). ([#4672](https://github.com/returntocorp/semgrep/pull/4672))

##### The `semgrep publish`

A new subcommand `semgrep publish` allows users to upload private, unlisted, or public rules to the Semgrep Registry.

#### Changes

##### Constant propagation

Improved constant propagation for global constants.

##### PHP improvement

Constant propagation is now aware of `escapeshellarg` and `htmlspecialchars_decode`. If you give these functions constant arguments, Semgrep assumes that their output is also a constant.

##### Use different environment variable

The environment variable used by Semgrep login changed from `SEMGREP_LOGIN_TOKEN` to `SEMGREP_APP_TOKEN`.

#### Fixes

The fixes section includes only important or breaking fixes. To see the full list of fixes, see [Semgrep changelog](https://github.com/returntocorp/semgrep/releases/tag/v0.83.0).

##### Limit for Perl Compatible Regular Expressions (PCRE) engine retries

With this update, the Perl Compatible Regular Expressions (PCRE) engine is now configured to limit hanging scans. As a consequence, the hanging scans which took a long time to process are now stopped after a specific limit is reached. However, some scan results may not be reported as their processing was above this limit.

#### Additional information

To see the complete change notes, visit the [Semgrep changelog](https://github.com/returntocorp/semgrep/releases/tag/v0.83.0).

### Version 0.82.0

#### Additions

##### Support of semgrep --baseline-commit

With this update, you can use experimental baseline scanning by issuing the following command:

```
semgrep --baseline-commit GIT_COMMIT_HASH
```

Use this option with a commit hash or a branch name. The `--baseline-commit` option limits the scan results to those introduced after the commit you specify.
For example, you have a repository with 10 commits, use the commit hash of the 8th commit, and Semgrep returns scan results introduced by changes in commits 9 and 10. ([#4571](https://github.com/returntocorp/semgrep/pull/4571))

#### Changes

##### Scans indicate skipped target paths

Semgrep scans now indicate a breakdown of skipped target paths with the reason for the scan skip. In addition, using the `--verbose` mode lists all skipped paths.

##### Performance improvement of semgrep-core

All rules are now sent directly to semgrep-core, resulting in a significant performance increase for small-to-medium-sized code repositories. This improvement led to the following changes:
- Static Analysis Results Interchange Format (SARIF) output includes all used rules.
- Error messages use the full path of rules.
- Progress bar reports by file instead of by rule.

##### Python 3.7 is the minimum version to use Semgrep

The required minimum version of Python for Semgrep is now 3.7 instead of EOL 3.6.

##### Bloom filter

Bloom filter optimization now considers `import` module file names. As a consequence, Semgrep matches patterns such as `import { $X } from 'foo'` with increased performance. ([#4605](https://github.com/returntocorp/semgrep/pull/4605))

##### Indentation removed to provide additional space

Indentation is now removed from matches to provide more space.

#### Additional information

To see the complete change notes, visit the [Semgrep changelog](https://github.com/returntocorp/semgrep/releases/tag/v0.82.0).

### Version 0.81.0

#### Additions

##### Dockerfile

Complete support for metavariables and anonymous ellipses except in ENV instructions. ([#4556](https://github.com/returntocorp/semgrep/pull/4556), [#4577](https://github.com/returntocorp/semgrep/pull/4577))

#### Fixes

##### Java

Match resources in Java try-with-resources statements. ([#4228](https://github.com/returntocorp/semgrep/issues/4228))

#### Additional information

To see the complete change notes, visit the [Semgrep changelog](https://github.com/returntocorp/semgrep/releases/tag/v0.81.0).

## January 2022

### Version 0.80.0

#### Additions

##### Autocomplete

Autocomplete is now available for CLI options.

##### Dockerfile

Support for Semgrep's metavariables where argument expansion is already supported. ([#4556](https://github.com/returntocorp/semgrep/pull/4556))

#### Changes

##### Ruby

You can now use an atom to match an identifier of the same name. ([#4550](https://github.com/returntocorp/semgrep/issues/4550))

#### Fixes

##### Missing target file does not lead to Semgrep crash

Before this update, handling a missing target file could crash Semgrep. This issue has been fixed. ([#4462](https://github.com/returntocorp/semgrep/issues/4462))

#### Additional information

To see the complete change notes, visit the [Semgrep changelog](https://github.com/returntocorp/semgrep/releases/tag/v0.80.0).

### Version 0.79.0

#### Additions

##### Ignoring code

Support for placing nosemgrep comments on the line before a match, causing such match to be ignored ([#3521](https://github.com/returntocorp/semgrep/issues/3521)).


#### Changes

##### Verbose output

Parse errors (reported with `--verbose`) appear once per file, not once per rule/file.
### Version 0.78.0

#### Additions

##### Symbolic propagation

Semgrep can now symbolically propagate simple definitions. For example, given
an assignment `x = foo.bar()` followed by a call `x.baz()`, Semgrep will keep track of `x`'s definition, and it will successfully match `x.baz()` with a pattern like `foo.bar().baz()`. This feature should help writing simple yet powerful rules, by letting the dataflow engine take care of any intermediate assignments. Symbolic propagation is still experimental and is disabled by default. It must be enabled on a per-rule basis using `options:` and setting `symbolic_propagation: true`. ([#2783](https://github.com/returntocorp/semgrep/issues/2783), [#2859](https://github.com/returntocorp/semgrep/issues/2859), [#3207](https://github.com/returntocorp/semgrep/issues/3207))

##### Verbose output

`--verbose` now outputs a timing and file breakdown summary at the end.

##### Metavariables

`metavariable-comparison` now handles metavariables that bind to arbitrary constant expressions (instead of just code variables).

##### Dockerfile

Pre-alpha support for Dockerfile as a new target language.

#### Additional information

To see the complete change notes, visit the [Semgrep changelog](https://github.com/returntocorp/semgrep/releases/tag/v0.78.0).

## December 2021

### Version 0.77.0

#### Highlights

##### Semgrep CLI and Semgrep CI now ignore the same patterns

With this update, Semgrep CLI now ignores the same patterns as the Semgrep CI by default. Find [the default .semgrepignore on GitHub](https://github.com/returntocorp/semgrep/blob/develop/cli/src/semgrep/templates/.semgrepignore). If you want to return to Semgrep’s previous behavior, create an empty `.semgrepignore` file. However, creating a new `.semgrepignore` overrides the default setup.

##### Autofix improvement

An autofix improvement from [https://github.com/chair6](https://github.com/chair6) from Hashicorp! Big shoutout to them. Fixes several issues (auto fixing multiple things in the same set of lines). This change addresses several issues related to autofix by adding per-file line and column offset tracking, and uses those offsets when making edits to files. The improvement addresses several edge cases in the existing autofix implementation that Semgrep did not handle correctly previously. The addressed issues are the following: [#4428](https://github.com/returntocorp/semgrep/issues/4428), [#3577](https://github.com/returntocorp/semgrep/issues/3577), [#3388](https://github.com/returntocorp/semgrep/issues/3388).

#### Additions

##### Scala

Semgrep now correctly matches patterns as `List(...)`.

##### `.semgrepignore`

Default set of `.semgrepignore` patterns (in `semgrep/templates/.semgrepignore`) is now used by default. You can override the default behavior by creating your own `.semgrepignore` file.

##### Java

You can now use ellipsis metavariables for parameters. ([#4420](https://github.com/returntocorp/semgrep/issues/4420))

#### Fixes

The fixed section now remains only as changelog notes. To see the changelog notes, visit [Semgrep changelog](https://github.com/returntocorp/semgrep/releases/tag/v0.77.0).

#### Changes

##### Constant propagation

Constant propagation is now fully a must analysis, if a variable is undefined in some path then it is considered as a non-constant.

##### Dataflow

Dataflow now considers only reachable nodes, which prevents some false-positive or false-negative findings.

##### The `--time` option now includes time spent on processing

With this update, Semgrep's `--time` option output includes the time spent on getting the configs, running the matching engine, and processing of ignores.

##### semgrep-core improvement

The semgrep-core logs a warning when a worker process is consuming above 400 MiB of memory or reaches 80% of the specified memory limit. This change is made to help diagnose out of memory (OOM) related crashes.

##### Additional information

To view the original release information, see [the changelog of this release on GitHub](https://github.com/returntocorp/semgrep/releases/tag/v0.77.0).

### Version 0.76.2

#### Additions

##### Support for Solidity

Semgrep now provides experimental support for the Solidity programming language.

#### Fixes

##### Python

Comprehension variables now have the correct scope, which means that a pattern like `[$X for $X in $ITERATOR]` now correctly matches `[v for v in foo()]`. ([#4260](https://github.com/returntocorp/semgrep/issues/4260))

##### Semgrep reports relative file paths with `.semgrepignore`

Previously, when you used Semgrep with `.semgrepignore` file, Semgrep reported targets with absolute instead of relative file paths. This issue has now been fixed. ([#4402](https://github.com/returntocorp/semgrep/pull/4402))

##### Additional information

To view the original release information, see [the changelog of this release on GitHub](https://github.com/returntocorp/semgrep/releases/tag/v0.76.2).

### Version 0.76.1

#### Fixes

##### `.semgrepignore`

Previously, when you used Semgrep with a `.semgrepignore` file, Semgrep failed to run on files that were not subpaths of the directory where Semgrep was used.

### Version 0.76.0

#### Additions

##### Improved filtering of rules

Semgrep now has improved filtering of rules based on file content, resulting in notable speedup for NodeJsScan rules.

##### Semgrep CLI

Semgrep CLI now respects `.semgrepignore` files. For more information about ignoring files, see [Semgrep documentation](https://semgrep.dev/docs/cli-reference/#ignoring-files).

##### Java support improvement

Semgrep now supports ellipsis in generics, for example: `class Foo<...>` ([#4335](https://github.com/returntocorp/semgrep/issues/4335))

#### Fixes

##### Java

When you use Semgrep to search for patterns that do not specify generics, Semgrep now also matches classes that are using generics. For example: `class $X {...}` which is not specifying generics, now matches `class Foo<T> { }`. ([#4335](https://github.com/returntocorp/semgrep/issues/4335))

##### TypeScript

Semgrep now correctly parses TypeScript type definitions. ([#4330](https://github.com/returntocorp/semgrep/issues/4330))

##### taint-mode

Semgrep taint-mode now reports findings when the Left Hand Side (LHS) operand of an access operator is a sink (for example as in `$SINK->method`), and the LHS operand is a tainted variable. ([#4320](https://github.com/returntocorp/semgrep/issues/4320))

##### metavariable-comparison

Semgrep metavariable-comparison does not return a `NotHandled` error anymore. ([#4328](https://github.com/returntocorp/semgrep/issues/4328))

##### semgrep-core

Fix a segmentation fault on Apple M1 processors when using `-filter_irrelevant_rules` on rules with very large pattern-either fields. ([#4305](https://github.com/returntocorp/semgrep/issues/4305))

##### Python

Generate correct lexical exn for unbalanced braces. ([#4310](https://github.com/returntocorp/semgrep/issues/4310))

##### YAML

Fix off-by-one error in location of arrays.

#### Changes

##### semgrep-core

Log messages are now tagged with the process id.

##### Given `--output` Semgrep no longer prints search results to stdout

When using `--output` parameter, Semgrep no longer prints findings to standard output (stdout), but it only saves or posts those findings to the specified file or URL.

##### Additional information

To view the original release information, see [the changelog of this release on GitHub](https://github.com/returntocorp/semgrep/releases/tag/v0.76.0).

## November 2021

### Version 0.75.0

#### Fixes

##### Semgrep CI

In Semgrep CI, the option `--disable-nosem` now tags findings with the `is_ignored` option correctly. Previously, an optimization from version 0.74.0 left the field `None` when the described option has been used. The optimization has been reverted.

### Version v0.74.0

#### Additions

##### Method chaining

Semgrep now supports method chaining patterns in Python, Golang, Ruby, and C#. ([#4300](https://github.com/returntocorp/semgrep/issues/4300))

##### Scala

Semgrep now translates infix operations as regular method calls, enabling patterns similar to: `$X.map($F)` to also match code written as `xs map f`. ([#4290](https://github.com/returntocorp/semgrep/pull/4290))

##### PHP

Semgrep now supports parsing method patterns. ([#4262](https://github.com/returntocorp/semgrep/issues/4262))

#### **Changed**

##### Semgrep profiling improved

Semgrep is now more efficiently measuring its performance. The new `profiling_times` object in `--time --json` output enables better visibility of slowly performing Semgrep code.

##### Constant propagation

In constant propagation, Python strings are now evaluated as string literals. You can now match any kind of Python string (raw, byte, or unicode) by the `"..."` operator. ([#3881](https://github.com/returntocorp/semgrep/issues/3881))

#### Fixes

##### Ruby

Ruby blocks are now represented with an extra function call in Semgrep's generic abstract syntax tree (AST) so that both `f(...)` and `f($X)` correctly match `f(x)` in `f(x) { |n| puts n }`. ([#3880](https://github.com/returntocorp/semgrep/issues/3880))

##### Generic filters exclude large and binary files

Generic filters exclude large files and binary files to 'generic' and 'regex' targets as it was already done for the other languages.

##### PHP

An issue with stack overflow when using `-filter_irrelevant_rules` has been fixed. ([#4305](https://github.com/returntocorp/semgrep/issues/4305))

##### Dataflow no longer returns false positive results for switch statements

When a `switch` was not followed by another statement, and the last statement of the default case of the `switch` was a statement, such as `throw`, that could exit the execution of the current function. This caused unresolved `break` statements in the `switch` during the construction of the control flow graph (CFG). One of the possible consequences could be that constant propagation incorrectly flagged variables as constants. This issue has now been fixed. ([#4265](https://github.com/returntocorp/semgrep/issues/4265))

#### Additional information

To view the original release information, see [the changelog of this release on GitHub](https://github.com/returntocorp/semgrep/releases/tag/v0.72.0).

### Version 0.73.0

#### Additions

##### C++ support improved

With this release, Semgrep has improved the C++ parsing rate from 72.9% to 94.6%. Parsing rate is calculated as the number of lines Semgrep successfully parses in a corpus of popular GitHub repos.

#### Fixes

##### Semgrep CI no longer fails scan with binary files

Before this update, Semgrep sometimes reported `Pcre.Error(BadUTF8) error` when it tried to analyze PNG, TTF, EOT or WOFF, zip, tar, and other binary files. As a consequence, scans failed when binary files were present. With this update, the underlying issue has been fixed, and Semgrep skips binary files. ([#4258](https://github.com/returntocorp/semgrep/issues/4258))

##### Constant propagation improvements

Previously, Semgrep's constant propagation handled specific corner cases by raising an "impossible" error. Constant propagation now handles corner cases more gracefully instead of raising errors.

#### Additional information

To view the original release information, see [the changelog of this release on GitHub](https://github.com/returntocorp/semgrep/releases/tag/v0.73.0).

### Version 0.72.0

#### Additions

##### Dataflow support enhancements

Semgrep's Dataflow engine now tracks data flow through the following constructs:

- `synchronize` (Java) and `lock` (C#) blocks. ([#4150](https://github.com/returntocorp/semgrep/issues/4150))
- `await` and `yield` expressions (for example JavaScript and Python).
- `&amp;` expression (for example C, C++, and Go).
- Other language constructs are represented by `OtherExpr` in the Generic Abstract Syntax Tree (AST).

##### JavaScript enhancements

- Field-definition-as-assignment equivalence allows matching expression patterns against field definitions. This functionality is disabled by default. Enable it with the following rule option: `flddef_assign: true` ([#4187](https://github.com/returntocorp/semgrep/issues/4187))
- Arrows (short lambdas) patterns used to match also regular function definitions. This can now be disabled with rule options: `arrow_is_function: false` ([#4187](https://github.com/returntocorp/semgrep/issues/4187))
- When a pattern contains the `var` keyword to match variable declarations, Semgrep also matches variables declared with `let` or `const`. With this update, you can disable the described functionality by the rule options: `let_is_var: false`. This rule allows you to scan for `var` keywords while not matching `let` or `const`.

#### Fixes

##### Constant propagation improvement

Constant propagation now allows to recognize patterns such as the following for a method call:

```
x.f(y)
```

If `x` is a constant, it is correctly recognized.

##### Go improvements

This update includes various enhancements for the Go language. Semgrep is now able to:

- Correctly replace braces in composite literals for autofix.
- Correctly replace parenthesis in cast for autofix.
- Parse ellipsis in return type parameters.

##### Scala improvements

Parsing of Scala is improved with this update, because Semgrep is now able to parse:

- Case object within blocks.
- Typed patterns with variables that begin with an underscore: `case _x : Int => …`
- Unicode identifiers.
- Nullary constructors with no arguments in more positions.
- The `infix` type operators with tuple arguments.
- Nested comments.
- Case class within blocks.

##### Semgrep's pattern-regex now accepts unicode

Semgrep's pattern-regex now supports hexadecimal notation of Unicode code points and assumes UTF-8. For more information, see [Semgrep documentation](https://semgrep.dev/docs/writing-rules/rule-syntax/#pattern-regex). ([#4240](https://github.com/returntocorp/semgrep/pull/4240))

##### Additional fixes and improvements in this version

Some of the new fixes with this version include the following:

- The semgrep-core accepts `sh` as an alias for Bash.
- Semgrep's metavariable-comparison is now able to detect when a metavariable binds to a code variable that is a constant, and use the constant value in the comparison. ([#3727](https://github.com/returntocorp/semgrep/issues/3727))
- Expand `~` when resolving config paths.

#### Changes

##### C# support

C# support is now generally available.

##### Command line interface (CLI) changes

When the semgrep-core results in a segmentation fault, Semgrep now only suggests increasing stack size.

Semgrep's CLI output no longer displays severity levels.

##### Scanning for executable scripts with shebang

Previously, Semgrep only scanned files that matched a file extension for the language that was scanned. Scripting languages are often written extensionless with the script interpreter in a shebang. Now, Semgrep scans executable scripts in which shebang interpreter directives match the language of the rule. ([#3986](https://github.com/returntocorp/semgrep/pull/3986))

#### Additional information

To view the original release information, see [the changelog of this release on GitHub](https://github.com/returntocorp/semgrep/releases/tag/v0.72.0).

### Version 0.71.0

#### Additions

- In taint mode, you can now write rules that use the same metavariable in sources, sanitizers, and sinks. In addition, these metavariables correctly appear in matched messages. ([#4073](https://github.com/returntocorp/semgrep/pull/4073))
- Experimental support for Bash as a new target language.
- Experimental support for C++ as a new target language.
- Increase soft stack limit when running semgrep-core. ([#4120](https://github.com/returntocorp/semgrep/pull/4120))
- Semgrep `--validate` runs metachecks on the rule. ([#4170](https://github.com/returntocorp/semgrep/pull/4170))

#### Fixes

- The `text_wrapping` defaults to `MAX_TEXT_WIDTH` if `get_terminal_size` reports width smaller than 1. ([#4110](https://github.com/returntocorp/semgrep/pull/4110))
- Metrics report the error type of semgrep core errors (for example Timeout, and MaxMemory). ([#4156](https://github.com/returntocorp/semgrep/pull/4156))
- Missing or misformatted global settings files are no longer crashing Semgrep. ([#4164](https://github.com/returntocorp/semgrep/pull/4164))
- Constant propagation: Previously an assignment as `[x,y] = f()` was not counted as an assignment to `x` or `y` by constant propagation. Now these types of assignments are recognized by both basic and dataflow based constant propagations. As a result, tuple, or array destructuring assignments now correctly prevent constant propagation. ([#4109](https://github.com/returntocorp/semgrep/pull/4109))
- JS: Semgrep now correctly parses metavariables in template strings. ([#4139](https://github.com/returntocorp/semgrep/pull/4139))
- Scala: Semgrep now parses underscore separators in number literals. In addition, Semgrep now parses long suffixes (`l` and `L`) on number literals. ([#4155](https://github.com/returntocorp/semgrep/pull/4155))
- Scala: Semgrep parses name arguments in arbitrary function types, for example `(=> Int) => Int`. ([#4178](https://github.com/returntocorp/semgrep/pull/4178))
- Bash: Various fixes and improvements.
- Kotlin: Ellipsis operator in class and body parameters are now supported. ([#4141](https://github.com/returntocorp/semgrep/issues/4141))
- Go: Method interface pattern is now supported. ([#4172](https://github.com/returntocorp/semgrep/issues/4172))

#### Changes

- Report CI environment variable in metrics for better environment determination. ([#4108](https://github.com/returntocorp/semgrep/pull/4108))
- Bash: A simple expression pattern can now match any command argument rather than having to match the whole command.

#### Additional information

To view the original release information, see [the changelog of this release on GitHub](https://github.com/returntocorp/semgrep/releases/tag/v0.71.0).

## October 2021

### Version 0.70.0

#### Additions

Experimental Bash support. ([#4081](https://github.com/returntocorp/semgrep/pull/4081))

#### Fixes

- Go: Ellipsis operator `(...)` is now supported in the import list. For example, import `(..."error"...)`. ([#4067](https://github.com/returntocorp/semgrep/issues/4067))
- Java: Ellipsis operator in method chain calls can now match 0 elements. For example: o. ... .foo() now also matches o.foo(). ([#4082](https://github.com/returntocorp/semgrep/issues/4082))
- Previously, Semgrep crashed when used with a YAML rule file that contained only comments. This bug is now fixed. As a result, Semgrep gracefully handles YAML rule files that contain only comments. ([#3773](https://github.com/returntocorp/semgrep/issues/3773))

#### Changes

- Resolution of rulesets uses the legacy registry instead of the cdn registry.
- The Benchmark suite is easier to modify.

#### Additional information

To view the original release information, see [the changelog of this release on GitHub](https://github.com/returntocorp/semgrep/releases/tag/v0.70.0).

### Version 0.69.1

#### Fixes

- The --enable-metrics flag is now always a flag and does not optionally take an argument.

#### Additional information

To view the original release information, see [the changelog of this release on GitHub](https://github.com/returntocorp/semgrep/releases/tag/v0.69.1).

### Version 0.69.0

#### Additions

- C: Semgrep now recognizes the sizeof() operator as valid C code. ([#4037](https://github.com/returntocorp/semgrep/issues/4037))
- C: Semgrep recognizes declaration and function patterns in C code..
- Java: As of this update, Semgrep supports the @interface annotation type pattern. ([#4030](https://github.com/returntocorp/semgrep/issues/4030))

#### Fixes

- Previously, minified files have been excluded from Semgrep scans (see[the changelog for version 0.66.0](https://github.com/returntocorp/semgrep/blob/develop/CHANGELOG.md#0660---09-22-2021)). As of this update, this change has been reverted and minified files are included in Semgrep scans.
- Java: Before this update, Semgrep returned incorrect findings for classes with import. With this update, the equality of metavariables bounded to imported classes was fixed and the problem no longer occurs. ([#3748](https://github.com/returntocorp/semgrep/issues/3748))
- Python: The issue with matching tuples and parenthesized expressions has been fixed. ([#3832](https://github.com/returntocorp/semgrep/issues/3832))
- C: With this update, the issue with the typedef reserved keyword inference has been fixed. ([#4054](https://github.com/returntocorp/semgrep/pull/4054))
- Ruby: In Semgrep version 0.66.0, you could scan for both the hash rocket and regular hash in function calls with expressions similar to Oj.load(..., mode: :object, ...). The change implemented in Semgrep version 0.67.0 has changed this behavior. As a consequence, to scan for function calls with both the hash rocket and hash, the rule needed to be defined for both syntax patterns separately. With this update, the issue has been fixed and you can use the older syntax to search for both syntax patterns simultaneously. ([#3981](https://github.com/returntocorp/semgrep/issues/3981))
- OCaml: Added body of functor in Abstract Syntax Tree (AST). ([#3821](https://github.com/returntocorp/semgrep/issues/3821))

#### Changes

- taint-mode: In version 0.68.0, sanitizers matching a source or a sink were automatically filtered out. This allowed a pattern sanitizer such as $F(...) to sanitize every other function without conflicting with neither sources nor sinks. As a consequence, other idioms used to specify sanitizers were broken. To resolve this issue, there are now two types of sanitizers:

- The default semantics of sanitizers is reverted to the state before version 0.68.0. By default, if a sanitizer matches a source or a sink, that source or sink becomes sanitized.
- A new type of sanitizer is now available. To prevent the sanitizer from overriding a source or a sink annotation when they match exactly, specify this sanitizer with a not_conflicting: true flag in the sanitizer declaration. This allows using sanitizer patterns such as $F(...) without the need to explicitly filter for sources and sinks from sanitization. ([#4033](https://github.com/returntocorp/semgrep/pull/4033))

#### Additional information

To view the original release information, see [the changelog of this release on GitHub](https://github.com/returntocorp/semgrep/releases/tag/v0.69.0).

### Version 0.68.2

#### Fixes

- The --skip-unknown-extensions option now treats files with no extension as files with an unknown extension.

#### Additional information

To view the original release information, see [the changelog of this release on GitHub](https://github.com/returntocorp/semgrep/releases/tag/v0.68.2).

### Version 0.68.1

#### Additions

- Added support for raise and throw statements in the dataflow engine and improved current support for the try and catch statements. ([#4006](https://github.com/returntocorp/semgrep/pull/4006))

#### Fixes

- Respect path filtering at the rule level.

#### Additional information

To view the original release information, see [the changelog of this release on GitHub](https://github.com/returntocorp/semgrep/releases/tag/v0.68.1).

### Version 0.68.0

#### Additions

- Semgrep now enables you to scan input code from subshells. See the following example: `semgrep -e 'a' --lang js <(echo 'a')` ([#3966](https://github.com/returntocorp/semgrep/pull/3966))

#### Fixes

- Previously, Semgrep could not find empty try and catch statements with a wildcard matching in Java code. This issue has been fixed, and as a consequence, finding the empty try and catch statements works correctly. ([#4002](https://github.com/returntocorp/semgrep/issues/4002))
- taint-mode: Previously, Semgrep did not report a tainted sink included in a specific argument of a function call. This issue has been fixed.
- PHP: You can now use more keywords as valid field names. ([#3954](https://github.com/returntocorp/semgrep/issues/3954))

#### Changes

- taint-mode: Sanitizers matching a source or a sink are filtered out. You can now use the following pattern: $F(...) As a result, it is possible to find other functions which are sanitizers.
- taint-mode: Previously, built-in source(...) and built-in sanitizer sanitize(...) could cause unexpected behavior in code, such as functions called source. In this update, both functions have been removed and the described issue no longer occurs.
- Improved Kotlin parsing from 77% to 90%.
- Resolution of Semgrep Registry rulesets (for example p/ci) uses a new rule content delivery network ( **CDN** ) and does client-side hydration.
- Set the Perl Compatible Regular Expressions (PCRE) recursion limit so it does not vary with different installations of the PCRE. Improved PCRE error handling in the Semgrep core.

#### Additional information

To view the original release information, see [the changelog of this release on GitHub](https://github.com/returntocorp/semgrep/releases/tag/v0.68.0).

## September 2021

### Version 0.67.0

#### Additions

- Support for break and continue in the dataflow engine
- Support for switch statements in the dataflow engine

#### Fixes

- Fix CFG dummy nodes to always connect to exit node
- Deep ellipsis <... x ...> now matches sub-expressions of statements
- Ruby: treat 'foo' as a function call when alone on its line ([#3811](https://github.com/returntocorp/semgrep/issues/3811))
- Fixed bug in semgrep-core's -filter_irrelevant_rules causing Semgrep to incorrectly skip a file ([#3755](https://github.com/returntocorp/semgrep/issues/3755))
- PHP: allows more keywords as valid field names ([#3954](https://github.com/returntocorp/semgrep/issues/3954))

#### Changes

- Taint no longer analyzes dead/unreachable code
- Improve error message for segmentation faults/stack overflows
- Attribute-expression equivalence that allows matching expression patterns against attributes, it is enabled by default but can be disabled via rule options: with attr_expr: false ([#3489](https://github.com/returntocorp/semgrep/issues/3489))
- Improved Kotlin parsing from 35% to 77% on our Kotlin corpus

### Version 0.66.0

#### Additions

- HCL (a.k.a Terraform) experimental support (see[this Terraform ruleset](https://semgrep.dev/p/terraform))

#### Fixes

- Dataflow: Recognize "concat" method and interpret it in a language-dependent manner ([#3316](https://github.com/returntocorp/semgrep/issues/3316))
- PHP: allows certain keywords as valid field names ([#3907](https://github.com/returntocorp/semgrep/issues/3907))

#### Changes

- Constant propagation now assumes that void methods may update the callee ([#3316](https://github.com/returntocorp/semgrep/issues/3316))
- Add rule message to emacs output ([#3851](https://github.com/returntocorp/semgrep/pull/3851))
- Show stack trace on fatal errors ([#3876](https://github.com/returntocorp/semgrep/pull/3876))
- Various changes to error messages ([#3827](https://github.com/returntocorp/semgrep/pull/3827))

### Version 0.65.0

#### Additions

- Allow autofix using the command line rather than only with the fix: YAML key

#### Fixes

- Taint detection with ternary ifs ([#3778](https://github.com/returntocorp/semgrep/issues/3778))
- Fixed corner-case crash affecting the pattern: $X optimization ("empty And; no positive terms in And")
- PHP: Added support for parsing labels and goto ([#3592](https://github.com/returntocorp/semgrep/issues/3592))
- PHP: Parse correctly constants named PUBLIC or DEFAULT ([#3589](https://github.com/returntocorp/semgrep/issues/3589))
- Go: Added type inference for struct literals ([#3622](https://github.com/returntocorp/semgrep/issues/3622))
- Fix semgrep-core crash when a cache file exceeds the file size limit
- Sped up Semgrep interface with tree-sitter parsing

#### Changes

- Grouped semgrep CLI options and added constraints when useful (e.g., cannot use --vim and --emacs at the same time)

### Version 0.64.0

#### Additions

- Enable associative matching for string concatenation ([#3741](https://github.com/returntocorp/semgrep/issues/3741))

#### Fixes

- Java: separate import static from regular imports during matching ([#3772](https://github.com/returntocorp/semgrep/issues/3772))
- Taint mode will now benefit from semgrep-core's -filter_irrelevant_rules
- Taint mode should no longer report duplicate matches ([#3742](https://github.com/returntocorp/semgrep/issues/3742))
- Only change source directory when running in docker context ([#3732](https://github.com/returntocorp/semgrep/pull/3732))

#### Changes

- Add logging on failure to git ls-files ([#3777](https://github.com/returntocorp/semgrep/pull/3777))

## August 2021

### Version 0.63.0

#### Additions

- C#: support ellipsis in declarations ([#3720](https://github.com/returntocorp/semgrep/pull/3720))

#### Fixes

- Hack: improved support for metavariables ([#3716](https://github.com/returntocorp/semgrep/pull/3716))
- Dataflow: Disregard type arguments but not the entire instruction

#### Changes

- Optimize ending ... in pattern-insides to simply match anything left

### Version 0.62.0

#### Additions

- OCaml: support module aliasing, so looking for List.map will also find code that renamed List as L via module L = List.
- Add help text to sarif formatter output if defined in metadata field.
- Update shortDescription in SARIF formatter output if defined in metadata field.
- Add tags as defined in metadata field in addition to the existing tags.

#### Fixes

- core: fix parsing of numeric literals in rule files
- Java: fix the range and autofix of Cast expressions ([#3669](https://github.com/returntocorp/semgrep/issues/3669))
- Generic mode scanner no longer tries to open submodule folders as files ([#3701](https://github.com/returntocorp/semgrep/pull/3701))
- pattern-regex with completely empty files ([#3705](https://github.com/returntocorp/semgrep/issues/3705))
- --sarif exit code with suppressed findings ([#3680](https://github.com/returntocorp/semgrep/issues/3680))
- Fixed fatal errors when a pattern results in a large number of matches
- Better error message when rule contains empty pattern

#### Changes

- Add backtrace to fatal errors reported by semgrep-core
- Report errors during rule evaluation to the user
- When and-ed with other patterns, pattern: $X will not be evaluated on its own, but will look at the context and find $X within the metavariables bound, which should be significantly faster

## July 2021

### Version 0.60.0

#### Additions

- Detect duplicate keys in YAML dictionaries in Semgrep rules when parsing a rule (for example detect multiple metavariable inside one metavariable-regex).

#### Fixes

C/C++: Fixed stack overflows (segmentation faults) when processing very large files ([#3538](https://github.com/returntocorp/semgrep/issues/3538))

- JavaScript: Fixed stack overflows (segmentation faults) when processing very large files ([#3538](https://github.com/returntocorp/semgrep/issues/3538))
- JavaScript: Detect numeric object keys 1 and 0x1 as equal ([#3579](https://github.com/returntocorp/semgrep/issues/3579))
- OCaml: improved parsing stats by using tree-sitter-ocaml (from 25% to 88%)
- taint-mode: Check nested functions
- taint-mode: foo.x is now detected as tainted if foo is a source of taint
- taint-mode: Do not crash when it is not possible to compute range info
- Rust: recognize ellipsis in macro calls patterns ([#3600](https://github.com/returntocorp/semgrep/issues/3600))
- Ruby: correctly represent a.(b) in the AST ([#3603](https://github.com/returntocorp/semgrep/issues/3603))

#### Changes

- Added precise error location for the Semgrep metachecker, for example to detect duplicate patterns in a rule.

### Version 0.58.2

#### Additions

- New iteration of taint-mode that allows to specify sources/sanitizers/sinks using arbitrary pattern formulas. This provides plenty of flexibility. Note that we breaks compatibility with the previous taint-mode format, e.g., - source(...) must now be written as - pattern: source(...).
- Experimental support for HTML. This does not rely on the generic mode but instead parses the HTML using tree-sitter-html. This allows some semantic matching (e.g., matching attributes in any order).
- js alpha support ([#1751](https://github.com/returntocorp/semgrep/issues/1751))
- New matching option implicit_ellipsis that allows disabling the implicit ... that are added to record patterns, plus allow matching "spread fields" (JS ...x) at any position ([#3120](https://github.com/returntocorp/semgrep/issues/3120))
- Support globstar (**) syntax in path include/exclude ([#3173](https://github.com/returntocorp/semgrep/pull/3173))

#### Fixes

- Apple M1: Semgrep installed from Homebrew no longer hangs ([#2432](https://github.com/returntocorp/semgrep/issues/2432))
- Ruby command shells are distinguished from strings ([#3343](https://github.com/returntocorp/semgrep/issues/3343))
- Java varargs are now correctly matched ([#3455](https://github.com/returntocorp/semgrep/issues/3455))
- Support for partial statements (e.g., try { ... }) for Java ([#3417](https://github.com/returntocorp/semgrep/issues/3417))
- Java generics are now correctly stored in the AST ([#3505](https://github.com/returntocorp/semgrep/pull/3505))
- Constant propagation now works inside Python with statements ([#3402](https://github.com/returntocorp/semgrep/issues/3402))
- Metavariable value replacement in message/autofix no longer mixes up short and long names like $X vs $X2 ([#3458](https://github.com/returntocorp/semgrep/issues/3458))
- Fixed metavariable name collision during interpolation of message / autofix ([#3483](https://github.com/returntocorp/semgrep/pull/3483)) Thanks to[@Justin Timmons](https://r2c-community.slack.com/team/U026SUZKJ8Z) for the fix!
- Revert pattern: $X optimization ([#3476](https://github.com/returntocorp/semgrep/issues/3476))
- metavariable-pattern: Allow filtering using a single pattern or pattern-regex
- Dataflow: Translate call chains into IL

#### Changes

- Significant speed improvements (noted above)
- The size of the semgrep-core the binary is now 95 MB (was 170 MB in v0.58.0) and a smaller Docker image (from 95 MB to 40 MB)
- The --debug option now displays which files are currently processed incrementally; it will not wait until semgrep-core completely finishes.
- Switch from OCaml 4.10.0 to OCaml 4.12.0
- Faster matching times for generic mode

- Better error message when rule contains empty pattern

## June 2021

### Version 0.57.0

#### Additions

- New options: field in a YAML rule to enable/disable certain features (e.g., constant propagation) (See [https://github.com/returntocorp/semgrep/blob/develop/semgrep-core/src/core/Config_semgrep.atd](https://github.com/returntocorp/semgrep/blob/develop/semgrep-core/src/core/Config_semgrep.atd) for the list of available features one can enable/disable)
- Capture groups in pattern-regex: in $1, $2, etc. ([#3356](https://github.com/returntocorp/semgrep/issues/3356))
- Support metavariables inside atoms (e.g., foo(:$ATOM))
- Support metavariables and ellipsis inside regexp literals (e.g., foo(/.../))
- Associative-commutative matching for bitwise OR, AND, and XOR operations
- Add support for $...MVAR in generic patterns
- Add support for $...MVAR in generic patterns
- metavariable-pattern: Add support for nested Spacegrep/regex/Comby patterns
- C#: support ellipsis in method parameters ([#3289](https://github.com/returntocorp/semgrep/issues/3289))

#### Fixes

- C#: parse __makeref, __reftype, __refvalue ([#3364](https://github.com/returntocorp/semgrep/pull/3364))
- Java: parsing of dots inside function annotations with brackets ([#3389](https://github.com/returntocorp/semgrep/pull/3389))
- Do not pretend that short-circuit Boolean AND and OR operators are commutative ([#3399](https://github.com/returntocorp/semgrep/issues/3399))
- metavariable-pattern: Fix crash when nesting a non-generic pattern within a generic rule
- metavariable-pattern: Fix parse info when matching content of a metavariable under a different language
- generic mode on Markdown files with very long lines will now work ([#2987](https://github.com/returntocorp/semgrep/issues/2987))

#### Changes

- generic mode: files that don't look like nicely-indented programs are no longer ignored, which may cause accidental slowdowns in setups where excessively large files are not excluded explicitly ([#3418](https://github.com/returntocorp/semgrep/pull/3418))
- metavariable-comparison: Fix crash when comparing integers and floats
- Do not filter findings with the same range but different metavariable bindings ([#3310](https://github.com/returntocorp/semgrep/pull/3310))
- Set parsing_state.have_timeout when a timeout occurs ([#3438](https://github.com/returntocorp/semgrep/pull/3438))
- Set a timeout of 10s per file ([#3434](https://github.com/returntocorp/semgrep/pull/3434))
- Improvements to contributing documentation ([#3353](https://github.com/returntocorp/semgrep/pull/3353))
- Memoize getting ranges to speed up rules with large ranges
- When and-ed with other patterns, pattern: $X will not be evaluated on its own, but will look at the context and find $X within the metavariables bound, which should be significantly faster

### Version 0.56.0

#### Additions

- Associative-commutative matching for Boolean AND and OR operations ([#3198](https://github.com/returntocorp/semgrep/issues/3198))
- Support metavariables inside strings (e.g., foo("$VAR"))
- Support metavariables inside atoms (e.g., foo(:$ATOM))
- metavariable-pattern: allow matching the content of a metavariable under a different language

#### Fixes

- C#: Parse attributes for local functions ([#3348](https://github.com/returntocorp/semgrep/issues/3348))
- Go: Recognize other common package naming conventions ([#2424](https://github.com/returntocorp/semgrep/issues/2424))

#### Changes

- Upgraded TypeScript parser ([#3102](https://github.com/returntocorp/semgrep/issues/3102))

### Version 0.55.1

#### Additions

- Added new metavariable-pattern operator (available only via --optimizations), thanks to Kai Zhong for the feature request ([#3257](https://github.com/returntocorp/semgrep/issues/3257))
- Add helpUri to SARIF output if rule source metadata is defined

#### Fixes

- C#: Support unsafe block syntax ([#3283](https://github.com/returntocorp/semgrep/pull/3283))
- Generic mode: fixed wrong line numbers for multi-lines match ([#3315](https://github.com/returntocorp/semgrep/issues/3315))
- JavaScript: support partial field definitions pattern, like in JSON
- JSON: handle correctly metavariables as field ([#3279](https://github.com/returntocorp/semgrep/issues/3279))
- PHP: Support ellipsis in include/require and echo ([#3191](https://github.com/returntocorp/semgrep/issues/3191),[#3245](https://github.com/returntocorp/semgrep/issues/3245))
- PHP: Prefer expression patterns over statement patterns ([#3191](https://github.com/returntocorp/semgrep/issues/3191))
- Python: support ellipsis in try-except ([#3233](https://github.com/returntocorp/semgrep/pull/3233))
- Scala: correctly parse symbol literals and interpolated strings containing double dollars ([#3271](https://github.com/returntocorp/semgrep/pull/3271))
- Taint mode: Allow statement-patterns when these are represented as statement-expressions in the Generic AST ([#3191](https://github.com/returntocorp/semgrep/issues/3191))
- Dataflow: Analyze foreach body even if we do not handle the pattern yet (#3155)
- Correctly handle ellipsis inside function types ([#3119](https://github.com/returntocorp/semgrep/issues/3119))
- Fall back to no optimizations when using unsupported features: pattern-where-python, taint rules, and --debugging-json ([#3265](https://github.com/returntocorp/semgrep/pull/3265))
- Handle regexp parse errors gracefully when using optimizations ([#3266](https://github.com/returntocorp/semgrep/pull/3266))
- Support equivalences when using optimizations ([#3259](https://github.com/returntocorp/semgrep/pull/3259))

#### Changes

- Run rules in semgrep-core (rather than patterns) by default (these are the optimizations described above)

### Version 0.54.0

This version includes release notes for Semgrep version 0.53.0 as well.

#### Additions

- Alpha support for Scala
- Metrics collection of project_hash in cases where git is not available
- Taint mode now also analyzes top-level statements
- Per rule parse times and per rule-file parse and match times added to opt-in metrics
- $...MVAR can now match a list of statements (not just a list of arguments) ([#3170](https://github.com/returntocorp/semgrep/issues/3170))

#### Fixes

- JavaScript parsing: Support decorators on properties
- JavaScript parsing: Allow default export for any declaration
- Metavariables in messages are filled in when using --optimizations all
- Respect --timeout-threshold option in --optimizations all mode
- Python: class variables are matched in any order ([#3212](https://github.com/returntocorp/semgrep/issues/3212))
- Running with --strict will now return results if there are nosem mismatches. Semgrep will report a nonzero exit code if --strict is set and there are nosem mismatches ([#3099](https://github.com/returntocorp/semgrep/issues/3099))
- PHP: parsing correctly ... and metavariables in parameters
- PHP: parsing correctly functions with a single statement in their body
- Evaluate interpolated strings during constant propagation ([#3127](https://github.com/returntocorp/semgrep/issues/3127))
- Semgrep will report an InvalidRuleSchemaError for dictionaries with duplicate key names ([#3084](https://github.com/returntocorp/semgrep/issues/3084))
- Basic type inference also for implicit variable declarations (Python, Ruby, PHP, and JavaScript)
- JavaScript/TypeScript: differentiating tagged template literals in the AST ([#3187](https://github.com/returntocorp/semgrep/issues/3187))
- Ruby: storing parenthesis in function calls in the AST ([#3178](https://github.com/returntocorp/semgrep/issues/3178))

#### Changes

- Moved some debug logging to verbose logging
- $...ARGS can now match an empty list of arguments, just like ... ([#3177](https://github.com/returntocorp/semgrep/issues/3177))
- JSON and SARIF outputs sort keys for predictable results

## May 2021

### Version 0.52.0

This version also includes release notes for Semgrep version 0.53.0.

#### Additions

- Alpha support for C#
- Metavariables match both a constant variable occurrence and that same constant value ([#3058](https://github.com/returntocorp/semgrep/pull/3058))

#### Fixes

- OCaml: fix useless-else false positives by generating appropriate AST for if without an else.
- JavaScript/TypeScript: Propagate constant definitions without declaration

### Version 0.51.0

#### Additions

- Keep track of and report rule parse time in addition to file parse time
- v0 of opt-in, anonymous aggregate metrics

#### Fixes

- JavaScript/TypeScript: allow the deep expression operator `<... ...>` in expression statement position, for example:

```

ARG = [$V];

...

<... $O[$ARG] ...>; // this works now

```

- PHP arrays with dots inside parse
- Propagate constants in nested lvalues such as y in x[y]
- Experimental support for C#

#### Changes

- Show log messages from semgrep-core when running semgrep with --debug
- By default, targets larger than 1 MB are now excluded from Semgrep scans. The new option --max-target-bytes 0 restores the previous behavior.
- Report relative path instead of absolute when using --time

### Version 0.50.1

#### Additions

- JS/TS: Infer global constants even if the const qualifier is missing ([#2978](https://github.com/returntocorp/semgrep/pull/2978))
- PHP: Resolve names and infer global constants in the same way as for Python

#### Fixes

- Empty yaml files do not crash
- Autofix does not insert newline characters for patterns from semgrep.live ([#3045](https://github.com/returntocorp/semgrep/pull/3045))
- Autofix printout is grouped with its own finding rather than the one below it ([#3046](https://github.com/returntocorp/semgrep/pull/3046))
- Do not assign constant values to assigned variables ([#2805](https://github.com/returntocorp/semgrep/issues/2805))
- A --time flag instead of --json-time which shows a summary of the timing information when invoked with normal output and adds a time field to the json output when --json is also present

#### Changes

- Moved some debug logging to verbose logging
- $...ARGS can now match an empty list of arguments, just like ... ([#3177](https://github.com/returntocorp/semgrep/issues/3177))
- JSON and SARIF outputs sort keys for predictable results
- .git/ directories are ignored when scanning
- External Python API (semgrep_main.invoke_semgrep) now takes an optional OutputSettings argument for controlling output
- json_time has moved to OutputSettings.output_time, this and many other OutputSettings arguments have been made optional

#### Removed

- `--json-time` flag in favor of `--json` + `--time`

## April 2021

### Version 0.49.0

#### Additions

- Support for matching multiple arguments with a metavariable ([#3009](https://github.com/returntocorp/semgrep/issues/3009)). This is done with a "spread metavariable" operator that looks like $...ARGS. This used to be available only for JavaScript and TypeScript, and is now available for the other languages (Python, Java, Go, C, Ruby, PHP, and OCaml).
- A new --optimizations [STR] command-line flag to turn on or off some optimizations. Use "none" to turn off everything and "all" to turn on everything. Just using `--optimizations` is equivalent to `--optimizations` all, and not using `--optimizations` is equivalent to `--optimizations` none.
- JavaScript/TypeScript: Support `...` inside JSX text to match any text, as in `<a href="foo">...</a>`. ([#2963](https://github.com/returntocorp/semgrep/issues/2963))
- JavaScript/TypeScript: Support metavariables for JSX attribute values, as in `<a href=$X>some text</a>`. ([#2964](https://github.com/returntocorp/semgrep/issues/2964))

#### Fixes

- Python: correctly parsing fstring with multiple colons
- Ruby: better matching for interpolated strings ([#2826](https://github.com/returntocorp/semgrep/issues/2826) and[#2949](https://github.com/returntocorp/semgrep/issues/2949))
- Ruby: correctly matching numbers

#### Changes

- Add required executionSuccessful attribute to SARIF output ([#2983](https://github.com/returntocorp/semgrep/pull/2983)). Thanks to[Simon Engledew](https://github.com/simon-engledew)!
- Remove jsx and tsx from languages, instead just use javascript or typescript ([#3000](https://github.com/returntocorp/semgrep/pull/3000))
- Add limit max characters in the output line (#2958) and add a flag to control maximum characters (defaults to 160). Thanks to[Ankush Menat](https://github.com/ankush)!

### Version 0.48.0

#### Additions

- Taint mode: Basic cross-function analysis ([#2913](https://github.com/returntocorp/semgrep/pull/2913))
- Support for the new Java record extension and Java symbols with accented characters ([#2704](https://github.com/returntocorp/semgrep/issues/2704))

#### Fixes

- Capturing functions when used as both expressions and statements in JavaScript ([#1007](https://github.com/returntocorp/semgrep/issues/1007))
- Literal for ocaml tree sitter ([#2885](https://github.com/returntocorp/semgrep/issues/2885))

#### Changes

- The extra lines data is now consistent across scan types (e.g., semgrep-core, spacegrep, pattern-regex)

### Version 0.47.0

#### Additions

- Java: support of for(...)
- Rust: Semgrep patterns now support top-level statements ([#2910](https://github.com/returntocorp/semgrep/pull/2910))
- Support for UTF-8 code with non-ASCII chars ([#2944](https://github.com/returntocorp/semgrep/pull/2944))

#### Fixes

- Single field pattern in JSON, allowing $FLD: { ... } pattern
- Config detection in files with many suffix delimiters, like this.that.check.yaml. More concretely: configs end with .yaml, YAML language tests end with .test.yaml, and everything else is handled by its respective language extension (e.g., .py).
- Single array field in YAML in a pattern is parsed as a field, not a one element array

### Version 0.46.0

#### Additions

- YAML language support to --test

#### Fixes

- SARIF output now nests invocations inside runs
- Go backslashed carets in regexes can be parsed

#### Changes

- Deep expression matches (<... foo ...>) now match within the bodies of anonymous functions (a.k.a. lambda-expressions) and arbitrary language-specific statements (e.g., the Golang go statement)

### Version 0.45.0

#### Additions

- --experimental flag for passing rules directly to semgrep-core ([#2836](https://github.com/returntocorp/semgrep/pull/2836))

#### Fixes

- Ellipses in template strings don't match string literals ([#2780](https://github.com/returntocorp/semgrep/issues/2780))
- Go: correctly parse select/switch clauses like in tree-sitter ([#2847](https://github.com/returntocorp/semgrep/issues/2847))
- Go: parse correctly 'for ...' header in Go patterns ([#2838](https://github.com/returntocorp/semgrep/issues/2838))

## Finding remaining release notes

This document encompasses only a limited number of release notes. See the changelog that includes descriptions of older versions than displayed in this document: [Semgrep GitHub changelog](https://github.com/returntocorp/semgrep/releases)
