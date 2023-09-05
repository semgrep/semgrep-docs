---
slug: august-2023
append_help_link: true
title: August 2023
hide_title: true
description: >-
  Release notes include the changes, fixes, and additions in specific versions of Semgrep.
---

# August 2023 release notes

## Semgrep OSS Engine

This section of release notes includes upgrades of Semgrep OSS Engine for versions between **1.35.0** and **1.38.3**.

### Added

- The CLI now returns the commit timestamp when running `semgrep ci`.
- Added optional `min-version` and `max-version` fields for a Semgrep rule, specifying a range of compatible Semgrep versions.
    - If a rule is incompatible with the version of Semgrep being used, it is reported in the JSON output at the newly-added `info` level, which doesn't cause an exit failure. ([#8496](https://github.com/returntocorp/semgrep/pull/8496/))
- The `semgrep scan` command is now more resilient to failures when fetching a configuration file (config) from Semgrep servers.
    - If it can't fetch a config from Semgrep servers it will use backup infrastructure to fetch the most recent successful config for that customers environment. ([#8459](https://github.com/returntocorp/semgrep/pull/8459/))
- `metavariable-comparison`: You can now use `in` and `not in` for strings in the same sense as in Python, for substring checking. ([#2979](https://github.com/returntocorp/semgrep/pull/8406))
- **Julia:** Added the deep expression operator. Now you can write patterns such as `foo(<... 42 ...>)` to find instances of calls to `foo` that contain `42` somewhere inside of it. ([#8540](https://github.com/returntocorp/semgrep/pull/8540))
- Added support for languages with case insensitive identifiers and generalized PHP to use these case insensitive identifiers.
  - For example, in PHP the pattern `MyClass()` now matches calls with different capitalizations such as `myclass()` and `Myclass()`. ([#8356](https://github.com/returntocorp/semgrep/pull/8356))

### Fixed

- Fixed `--text` and `--output` flags which broke in 1.38.0. If you are using version 1.38.0, update Semgrep to receive these fixes.
- Fixed issues to Semgrep docker image in version 1.38.3. tk to confirm
- Converted all '@r2c.dev' email addresses to '@semgrep.com'. Several error messages displayed outdated email addresses. With this fix, users can now see the correct email to reach out to the Semgrep Support team at [support@semgrep.com](mailto:support@semgrep.com) ([#8446](https://github.com/returntocorp/semgrep/pull/8446))
- Fixed CLI output to display matches from different rules with the same message. Now you are able to see the rule ID granularly even if two rules have the same rule message. ([#8557](https://github.com/returntocorp/semgrep/pull/8557))
- Semgrep PyPI package can now be installed on **aarch64 libmusl** platforms such as Alpine. (gh-8565)
- Improved the `--max-memory` help description to make it clearer. Its previous message, "Defaults to 0 for all CLI scans" implies a different default for non-CLI scans, where in practicality the default is 0 for all scans except when using Pro Engine, where the default is 5000.
- Fixed a regression introduced three years ago in 0.9.0, when optimizing the evaluation of the ellipsis operator `...` to be faster. The ellipsis only matched deeply, such as inside an if block, if it did not match anything non-deeply, thus causing that this pattern:
  ```
  foo()
  ...
  bar($A)
  ```
  would only produce a single match rather than two on this code:
  ```
  foo()
  if cond:
      bar(x)
  bar(y)
  ```
  Semgrep matched from `foo()` to `bar(y)` and because of that it did not try to match inside the `if`, thus there was no match from `foo()` to `bar(x)`. However, commenting out `bar(y)`, results in Semgrep matching `bar(x)`. Semgrep now produces the two expected matches. ([#8440](https://github.com/returntocorp/semgrep/pull/8440))
- **Semgrep VSCode Extension:** Semgrep Language Server Protocol (LSP) is now compiled with `tls`. It should no longer cause crashes when running the Semgrep VSCode extension.
- **PromQL:** make aggregation labels independent of order. ([#8399](https://github.com/returntocorp/semgrep/pull/8399)).
  For example:
  ```
  "sum by (..., b, a, c, ...) (X)" 
  ```
  should match
  ```
  "sum by (a,b,c) (X)"
  ```
- **Julia:** Fixed a bug where `let end` blocks were not being parsed correctly, causing their contents to not strictly match while inside of a block. For example, `let ... end` didn't count as being inside of the `let` block, and would match everything. (pa-3029)
- **Julia:** correctly parse `BitOr` and `BitAnd` (gh-8449)
- **Julia:** Fixed a bug where parenthesized expressions sometimes did not match in constructs such as metavariable-comparison. (pa-2991)
- **Julia:** Type information from declarations can now be used in metavariable-type. For instance, the program:
  ```
  x :: Int64 = 2
  ```
  now allows uses of x to match to the type Int64. (pa-3001)
- **Julia:** Metavariables are now able to appear anywhere that identifiers can. For instance, they were not able to appear as the argument to a do block. ( pa-3007)Now, you can write patterns such as:
```
map($Y) do $X
  ...
end
```

- **Java:** Fixed naming bug affecting Java and other OO languages that allowed a method parameter to shadow a class attribute. For example, in:
  ```
  class Test {
  
      private int x;
  
      public void test2(int x) {
          foo(this.x);
      }
  
  }
  ```
  Semgrep was considering that this.x referred to the parameter x of test2 rather than to the class attribute x. (pa-3010)


### Changed

- Running the `semgrep`  command now displays the help message. Previously, the `semgrep` command ran a SAST scan.
- Semgrep no longer looks for a `.semgrep.yml` config file or `.semgrep/` in the current directory, which previously caused conflicts when invoking `semgrep` from your home directory, as the home directory can contain a `.semgrep/settings.yml` file that `semgrep` treated as a Semgrep rule. (gh-4457)

### Removed

- `python -m semgrep` has been removed. tk use this tk instead.

## Semgrep Pro Engine

<!-- Separated pro engine because it is proprietary -->

### Fixed

- **JavaScipt (JS) or TypeScript (TS) taint mode:** fixed a bug introduced in 1.33.1 that had the side-effect of hurting performance of taint rules on JS or TS repositories that used destructuring in a function's formal parameters.

## Semgrep Cloud Platform

### Added

- The `semgrep ci` command now displays enabled products when scans are command now created or when the scan config is generated from Semgrep Cloud Platform. Additionally, if no products are enabled then a friendly error is raised and the scan is stopped. Users must enable a product to start a scan.

## Semgrep SSC

### Added

- Semgrep Supply Chain added **lockfile-only rules** for the following languages:
  - C#
  - PHP

### Fixed

- **PNPM:** Fixed a bug where dependencies in `pnpm-lock.yaml` at version 6.0 and up were not parsed.
- **Gradle:** Fixed an issue where packages in `build.gradle` files had their names incorrectly parsed without their group ID.
