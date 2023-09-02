---
slug: tk 
append_help_link: true
title: tk 
hide_title: true
description: tk 
tags:
  - tk 
---

# [todoMONTH] 2023 release notes

## Semgrep OSS Engine

This section of release notes includes upgrades of Semgrep OSS Engine for versions between **todo** and **todo**.

### Added
- The CLI now returns the commit timestamp when running `semgrep ci`.
- Add support for `min-version` and `max-version` fields for each rule, specifying a range of compatible Semgrep versions. If a rule is incompatible with the version of Semgrep being used, it is reported in the JSON output at the "info" level which doesn't cause an exit failure. (gh-8496)
- semgrep scan is now more resilient to failures when fetching config from semgrep.dev. If it can't fetch a config from semgrep.dev it will use backup infrastructure to fetch the most recent successful config for that customers environment. (gh-8459)
- metavariable-comparison: You can now use "in" and "not in" for strings in the same sense as in Python, for substring checking. (pa-2979)
- Julia: Added the deep expression operator, so now you can write patterns like foo(<... 42 ...>) to find instances of calls to foo that contain 42 somewhere inside of it. (pa-3018)
`semgrep ci` displays enabled products when scans are created and/or when the scan config is generated from Semgrep Cloud Platform. Additionally, if no products are enabled then a friendly error is raised. (scp-432)
- Added general machinery to support languages with case insensitive identifiers and generalized php to use these case insensitive identifiers For example, in php the pattern MyClass() will now match calls with different capitalization such as myclass() and Myclass(). (gh-8356)

### Fixed

- Fixed `--text` and `--output flags` in 1.38.2, which broke in 1.38.0. If you are using version 1.38.0, update Semgrep to receive these fixes.

### Changed

### Removed

- `python -m semgrep` has been removed. tk use this tk instead.

Semgrep SSC

C# parity rules
Maven Dep Tree parsing now surfaces children dependencies per package (sc-996)
