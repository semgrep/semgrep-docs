---
slug: january-2022
append_help_link: true
hide_title: true
description: >-
  Release notes include the changes, fixes, and additions in specific versions of Semgrep.
toc_max_heading_level: 3
---

# January 2022

## Version 0.80.0

### Additions

#### Autocomplete

Autocomplete is now available for CLI options.

#### Dockerfile

Support for Semgrep's metavariables where argument expansion is already supported. ([#4556](https://github.com/semgrep/semgrep/pull/4556))

### Changes

#### Ruby

You can now use an atom to match an identifier of the same name. ([#4550](https://github.com/semgrep/semgrep/issues/4550))

### Fixes

#### Missing target file does not lead to Semgrep crash

Before this update, handling a missing target file could crash Semgrep. This issue has been fixed. ([#4462](https://github.com/semgrep/semgrep/issues/4462))

### Additional information

To see the complete change notes, visit the [Semgrep changelog](https://github.com/semgrep/semgrep/releases/tag/v0.80.0).

## Version 0.79.0

### Additions

#### Ignoring code

Support for placing nosemgrep comments on the line before a match, causing such match to be ignored ([#3521](https://github.com/semgrep/semgrep/issues/3521)).

### Changes

#### Verbose output

Parse errors (reported with `--verbose`) appear once per file, not once per rule/file.
## Version 0.78.0

### Additions

#### Symbolic propagation

Semgrep can now symbolically propagate simple definitions. For example, given
an assignment `x = foo.bar()` followed by a call `x.baz()`, Semgrep will keep track of `x`'s definition, and it will successfully match `x.baz()` with a pattern like `foo.bar().baz()`. This feature should help writing simple yet powerful rules, by letting the dataflow engine take care of any intermediate assignments. Symbolic propagation is still experimental and is disabled by default. It must be enabled on a per-rule basis using `options:` and setting `symbolic_propagation: true`. ([#2783](https://github.com/semgrep/semgrep/issues/2783), [#2859](https://github.com/semgrep/semgrep/issues/2859), [#3207](https://github.com/semgrep/semgrep/issues/3207))

#### Verbose output

`--verbose` now outputs a timing and file breakdown summary at the end.

#### Metavariables

`metavariable-comparison` now handles metavariables that bind to arbitrary constant expressions (instead of just code variables).

#### Dockerfile

Pre-alpha support for Dockerfile as a new target language.

### Additional information

To see the complete change notes, visit the [Semgrep changelog](https://github.com/semgrep/semgrep/releases/tag/v0.78.0).