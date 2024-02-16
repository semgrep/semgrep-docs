---
slug: september-2021
append_help_link: true
hide_title: true
description: >-
  Release notes include the changes, fixes, and additions in specific versions of Semgrep.
toc_max_heading_level: 3
---

# September 2021

## Version 0.67.0

### Additions

- Support for break and continue in the dataflow engine
- Support for switch statements in the dataflow engine

### Fixes

- Fix CFG dummy nodes to always connect to exit node
- Deep ellipsis <... x ...> now matches sub-expressions of statements
- Ruby: treat 'foo' as a function call when alone on its line ([#3811](https://github.com/semgrep/semgrep/issues/3811))
- Fixed bug in semgrep-core's -filter_irrelevant_rules causing Semgrep to incorrectly skip a file ([#3755](https://github.com/semgrep/semgrep/issues/3755))
- PHP: allows more keywords as valid field names ([#3954](https://github.com/semgrep/semgrep/issues/3954))

### Changes

- Taint no longer analyzes dead/unreachable code
- Improve error message for segmentation faults/stack overflows
- Attribute-expression equivalence that allows matching expression patterns against attributes, it is enabled by default but can be disabled via rule options: with attr_expr: false ([#3489](https://github.com/semgrep/semgrep/issues/3489))
- Improved Kotlin parsing from 35% to 77% on our Kotlin corpus

## Version 0.66.0

### Additions

- HCL (a.k.a Terraform) experimental support (see[this Terraform ruleset](https://semgrep.dev/p/terraform))

### Fixes

- Dataflow: Recognize "concat" method and interpret it in a language-dependent manner ([#3316](https://github.com/semgrep/semgrep/issues/3316))
- PHP: allows certain keywords as valid field names ([#3907](https://github.com/semgrep/semgrep/issues/3907))

### Changes

- Constant propagation now assumes that void methods may update the callee ([#3316](https://github.com/semgrep/semgrep/issues/3316))
- Add rule message to emacs output ([#3851](https://github.com/semgrep/semgrep/pull/3851))
- Show stack trace on fatal errors ([#3876](https://github.com/semgrep/semgrep/pull/3876))
- Various changes to error messages ([#3827](https://github.com/semgrep/semgrep/pull/3827))

## Version 0.65.0

### Additions

- Allow autofix using the command line rather than only with the fix: YAML key

### Fixes

- Taint detection with ternary ifs ([#3778](https://github.com/semgrep/semgrep/issues/3778))
- Fixed corner-case crash affecting the pattern: $X optimization ("empty And; no positive terms in And")
- PHP: Added support for parsing labels and goto ([#3592](https://github.com/semgrep/semgrep/issues/3592))
- PHP: Parse correctly constants named PUBLIC or DEFAULT ([#3589](https://github.com/semgrep/semgrep/issues/3589))
- Go: Added type inference for struct literals ([#3622](https://github.com/semgrep/semgrep/issues/3622))
- Fix semgrep-core crash when a cache file exceeds the file size limit
- Sped up Semgrep interface with tree-sitter parsing

### Changes

- Grouped semgrep CLI options and added constraints when useful (e.g., cannot use --vim and --emacs at the same time)

## Version 0.64.0

### Additions

- Enable associative matching for string concatenation ([#3741](https://github.com/semgrep/semgrep/issues/3741))

### Fixes

- Java: separate import static from regular imports during matching ([#3772](https://github.com/semgrep/semgrep/issues/3772))
- Taint mode will now benefit from semgrep-core's -filter_irrelevant_rules
- Taint mode should no longer report duplicate matches ([#3742](https://github.com/semgrep/semgrep/issues/3742))
- Only change source directory when running in docker context ([#3732](https://github.com/semgrep/semgrep/pull/3732))

### Changes

- Add logging on failure to git ls-files ([#3777](https://github.com/semgrep/semgrep/pull/3777))