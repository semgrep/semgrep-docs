---
slug: august-2021
append_help_link: true
hide_title: true
description: >-
  Release notes include the changes, fixes, and additions in specific versions of Semgrep.
toc_max_heading_level: 3
---

# August 2021

## Version 0.63.0

### Additions

- C#: support ellipsis in declarations ([#3720](https://github.com/semgrep/semgrep/pull/3720))

### Fixes

- Hack: improved support for metavariables ([#3716](https://github.com/semgrep/semgrep/pull/3716))
- Dataflow: Disregard type arguments but not the entire instruction

### Changes

- Optimize ending ... in pattern-insides to simply match anything left

## Version 0.62.0

### Additions

- OCaml: support module aliasing, so looking for List.map will also find code that renamed List as L via module L = List.
- Add help text to sarif formatter output if defined in metadata field.
- Update shortDescription in SARIF formatter output if defined in metadata field.
- Add tags as defined in metadata field in addition to the existing tags.

### Fixes

- core: fix parsing of numeric literals in rule files
- Java: fix the range and autofix of Cast expressions ([#3669](https://github.com/semgrep/semgrep/issues/3669))
- Generic mode scanner no longer tries to open submodule folders as files ([#3701](https://github.com/semgrep/semgrep/pull/3701))
- pattern-regex with completely empty files ([#3705](https://github.com/semgrep/semgrep/issues/3705))
- --sarif exit code with suppressed findings ([#3680](https://github.com/semgrep/semgrep/issues/3680))
- Fixed fatal errors when a pattern results in a large number of matches
- Better error message when rule contains empty pattern

### Changes

- Add backtrace to fatal errors reported by semgrep-core
- Report errors during rule evaluation to the user
- When and-ed with other patterns, pattern: $X will not be evaluated on its own, but will look at the context and find $X within the metavariables bound, which should be significantly faster
