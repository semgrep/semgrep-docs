---
slug: march-2022
append_help_link: true
hide_title: true
description: >-
  Release notes include the changes, fixes, and additions in specific versions of Semgrep.
toc_max_heading_level: 3
---

# March 2022

## Version 0.86.5

### Additions

#### Semgrep findings available in two GitLab formats

Semgrep can now output findings in the following formats:

- GitLab SAST report format with `--gitlab-sast`.
- GitLab secret detection report format with `--gitlab-secrets`.

#### JSON output fingerprint of each finding

JSON output now includes a fingerprint of each finding. This fingerprint remains consistent when scanned code is just moved or reindented.

#### Go improvement

Use latest `tree-sitter-go` with support for Go 1.18 generics. ([#4823](https://github.com/semgrep/semgrep/issues/4823))

#### Terraform support

Basic support for constant propagation of locals and variables. ([#1147](https://github.com/semgrep/semgrep/issues/1147), [#4816](https://github.com/semgrep/semgrep/issues/4816))

#### Ellipsis metavariable in HTML

You can now use metavariable ellipsis inside a `<script>` tag. For example `<script>$...JS</script>`. ([#4841](https://github.com/semgrep/semgrep/issues/4841)) 

#### Semgrep CI is now a part of Semgrep CLI

You can now run Semgrep CI with `semgrep ci` subcommand that auto-detects settings from your CI environment and can upload findings to Semgrep App when logged in.

### Changes

#### SARIF output

SARIF output includes matching code snippet ([#4812](https://github.com/semgrep/semgrep/issues/4812))

#### Python wheel

Removed tests from published Python wheel.

#### Findings comparison changes

Findings are now considered identical between baseline and current scans, meaning that:

- Two findings are now identical after whitespace changes such as re-indentation.
- Two findings are now identical after a nosemgrep comment is added.
- Findings are now different if the same code triggered them on different lines.

#### Semgrep docker image running as root

Docker image now runs as root to allow the docker image to be used in CI/CD pipelines.

#### XDG Base Directory

Semgrep now supports XDG Base Directory specification format. ([#4818](https://github.com/semgrep/semgrep/issues/4818))

### Additional information

To see the complete change notes, visit the [Semgrep changelog](https://github.com/semgrep/semgrep/releases/).

## Version 0.85.0

### Additions

#### C improvement

Semgrep uses the latest tree-sitter-c-sharp with support for most C 10.0 features.

#### HTML improvement

Support for metavariables on tags (for example: `<$TAG>...</$TAG>`). ([#4078](https://github.com/semgrep/semgrep/issues/4078))

#### Scala improvement

The data-flow engine now handles expression blocks. Previously, Semgrep did not report some false negatives when run with taint analysis on expression blocks, which are now reported.

#### Dockerfile improvement

Allow for example `CMD …` to match both `CMD ls` and `CMD ["ls"]`. ([#4770](https://github.com/semgrep/semgrep/issues/4770))

#### Semgrep informs about used rules for multiple languages

When scanning multiple languages, Semgrep now prints a table of how many rules and files are used for each language.

### Changes

#### File targeting logic

The following inconsistencies were fixed: ([#4776](https://github.com/semgrep/semgrep/pull/4776))

#### Explicitly targeted files are now unaffected by global filters

Previously, explicitly targeted files (files that are directly passed to the command line) were unaffected by most global filters: global include or exclude patterns, and the file size limit. Now, the `.semgrepignore` patterns do not affect explicitly targeted files as well.

#### Semgrep scans with `--skip-unknown-extensions` flag now use shebang

Previously, `--skip-unknown-extensions` skipped files based only on file extension, even though extensionless shell scripts expose their language through the shebang of the first line. As a result, when you set `--skip-unknown-extensions` flag, Semgrep always skipped explicitly targeted shell files with no extension. Now, Semgrep with said flag decides if a file is a correct language using both extensions and shebangs.

#### Faster scans with `--baseline-commit` flag

These optimizations were added:

- When `--baseline-commit` is set, Semgrep runs the **current scan**, then switches to the `–baseline-commit`, and runs the **baseline scan**. The current scan now excludes files that are unchanged between the baseline and the current commit according to the output of `git status`.

- The **baseline scan** now excludes rules and files that had no matches in the **current scan**.

- When `git ls-files` is unavailable or `--disable-git-ignore` is set, Semgrep walks the file system to find all target files. Semgrep now walks the file system 30% faster compared to previous versions.

#### Improved Semgrep output format

The output format is updated to visually separate lines with headings and indentation.

### Fixes

#### Deep expression matching and metavariable interaction

Semgrep does not stop at the first match and enumerates all possible matches if a metavariable is used in a deep expression pattern (for example: `<... $X ...>`). This fix can introduce performance regressions.

### Additional information

To see the complete change notes, visit the [Semgrep changelog](https://github.com/semgrep/semgrep/releases/tag/v0.85.0).

## Version 0.84.0

### Additions

#### Semgrep CLI lists supported languages

Semgrep CLI now includes `--show-supported-languages` flag to display the list of languages supported by Semgrep. Thanks to John Wu for this contribution! ([#4754](https://github.com/semgrep/semgrep/pull/4754))

#### JSX (JavaScript) improvement

Semgrep CLI now provides the following improvements for JSX (JavaScript extension) scans:

- Semgrep scans for JSX self closing tags (XML elements) such as `<foo />` can result in a match of explicitly closed tags, for example: `<foo >some child</foo>`. You can now disable this behavior by rule options: `xml_singleton_loose_matching: false` (#4730)
- New rule option `xml_attrs_implicit_ellipsis` that allows you to disable the implicit ellipsis `...` that was added to JSX attributes patterns.

#### Updated validation of rules

The `semgrep --config [file] --validate` now checks for invalid metavariables.

#### The `project-depends-on` now supports more languages

You can now use `r2c-internal-project-depends-on` with lockfiles for Java, Go, Ruby, and Rust. ([#4699](https://github.com/semgrep/semgrep/pull/4699))

#### Improved PHP support

Semgrep now treats TPL files as PHP files. ([#4763](https://github.com/semgrep/semgrep/pull/4763))

#### Improved Scala support

Semgrep CLI now provides the following improvements for Scala language scans:

- Custom string interpolators. ([#4655](https://github.com/semgrep/semgrep/issues/4655))
- Support for parsing scripts that contain plain definitions outside of an object or class.