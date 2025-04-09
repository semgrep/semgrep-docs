---
slug: february-2022
append_help_link: true
hide_title: true
description: >-
  Release notes include the changes, fixes, and additions in specific versions of Semgrep.
toc_max_heading_level: 3
---

# February 2022

## Version 0.83.0

### Additions

#### Semgrep logs

Semgrep now saves logs of its last run to `~/.semgrep/last.log`.

#### New recursive operator in join mode

Join mode enables you to cross file boundaries, allowing you to write rules for whole code bases instead of individual files. With this update, you can now use a new recursive operator `-->` to recursively chain Semgrep rules based on metavariable contents. ([#4684](https://github.com/semgrep/semgrep/pull/4684))

#### Scanned paths under `paths.scanned` key

Semgrep now lists the scanned paths in its JSON output under the `paths.scanned` key.

#### The `--verbose` option lists skipped paths

With the `--verbose` option, the skipped paths are listed under the `paths.skipped` key.

#### C improvement

Semgrep now supports typed metavariables in C#. ([#4657](https://github.com/semgrep/semgrep/issues/4657))

#### The `metavariable-analysis`

Experimental `metavariable-analysis` feature that supports two kinds of analyses rules: 
- Prediction of regular expression denial-of-service vulnerabilities (Regular expression Denial of Service (ReDoS) analyzer). ([#4700](https://github.com/semgrep/semgrep/pull/4700))
- High-entropy string detection (`entropy`). ([#4672](https://github.com/semgrep/semgrep/pull/4672))

#### The `semgrep publish`

A new subcommand `semgrep publish` allows users to upload private, unlisted, or public rules to the Semgrep Registry.

### Changes

#### Constant propagation

Improved constant propagation for global constants.

#### PHP improvement

Constant propagation is now aware of `escapeshellarg` and `htmlspecialchars_decode`. If you give these functions constant arguments, Semgrep assumes that their output is also a constant.

#### Use different environment variable

The environment variable used by Semgrep login changed from `SEMGREP_LOGIN_TOKEN` to `SEMGREP_APP_TOKEN`.

### Fixes

The fixes section includes only important or breaking fixes. To see the full list of fixes, see [Semgrep changelog](https://github.com/semgrep/semgrep/releases/tag/v0.83.0).

#### Limit for Perl Compatible Regular Expressions (PCRE) engine retries

With this update, the Perl Compatible Regular Expressions (PCRE) engine is now configured to limit hanging scans. As a consequence, the hanging scans which took a long time to process are now stopped after a specific limit is reached. However, some scan results may not be reported as their processing was above this limit.

### Additional information

To see the complete change notes, visit the [Semgrep changelog](https://github.com/semgrep/semgrep/releases/tag/v0.83.0).

## Version 0.82.0

### Additions

#### Support of semgrep --baseline-commit

With this update, you can use experimental baseline scanning by issuing the following command:

```
semgrep --baseline-commit GIT_COMMIT_HASH
```

Use this option with a commit hash or a branch name. The `--baseline-commit` option limits the scan results to those introduced after the commit you specify.
For example, you have a repository with 10 commits, use the commit hash of the 8th commit, and Semgrep returns scan results introduced by changes in commits 9 and 10. ([#4571](https://github.com/semgrep/semgrep/pull/4571))

### Changes

#### Scans indicate skipped target paths

Semgrep scans now indicate a breakdown of skipped target paths with the reason for the scan skip. In addition, using the `--verbose` mode lists all skipped paths.

#### Performance improvement of semgrep-core

All rules are now sent directly to semgrep-core, resulting in a significant performance increase for small-to-medium-sized code repositories. This improvement led to the following changes:
- Static Analysis Results Interchange Format (SARIF) output includes all used rules.
- Error messages use the full path of rules.
- Progress bar reports by file instead of by rule.

#### Python 3.7 is the minimum version to use Semgrep

The required minimum version of Python for Semgrep is now 3.7 instead of EOL 3.6.

#### Bloom filter

Bloom filter optimization now considers `import` module file names. As a consequence, Semgrep matches patterns such as `import { $X } from 'foo'` with increased performance. ([#4605](https://github.com/semgrep/semgrep/pull/4605))

#### Indentation removed to provide additional space

Indentation is now removed from matches to provide more space.

### Additional information

To see the complete change notes, visit the [Semgrep changelog](https://github.com/semgrep/semgrep/releases/tag/v0.82.0).

## Version 0.81.0

### Additions

#### Dockerfile

Complete support for metavariables and anonymous ellipses except in ENV instructions. ([#4556](https://github.com/semgrep/semgrep/pull/4556), [#4577](https://github.com/semgrep/semgrep/pull/4577))

### Fixes

#### Java

Match resources in Java try-with-resources statements. ([#4228](https://github.com/semgrep/semgrep/issues/4228))

### Additional information

To see the complete change notes, visit the [Semgrep changelog](https://github.com/semgrep/semgrep/releases/tag/v0.81.0).