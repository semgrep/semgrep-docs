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

:::caution
Semgrep version 1.38.0 removed some features that may break your Semgrep workflows. See [Semgrep OSS > Removed](#removed) for more information.
:::

This section of release notes includes upgrades of Semgrep OSS Engine for versions between **1.35.0** and **1.38.3**.

### Added

- The CLI now returns the commit timestamp when running `semgrep ci`.
- Added optional `min-version` and `max-version` fields for a Semgrep rule, specifying a range of compatible Semgrep versions.
    - If a rule is incompatible with the version of Semgrep being used, it is reported in the JSON output at the newly added `info` level, which doesn't cause an exit failure. ([#8496](https://github.com/returntocorp/semgrep/pull/8496/))
- The `semgrep scan` command is now more resilient to failures when fetching a configuration file (config) from Semgrep servers.
    - If it can't fetch a config from Semgrep servers it will use backup infrastructure to fetch the most recent successful config for that customers environment. ([#8459](https://github.com/returntocorp/semgrep/pull/8459/))
- `metavariable-comparison`: You can now use `in` and `not in` for strings in the same sense as in Python, for substring checking. ([#2979](https://github.com/returntocorp/semgrep/pull/8406))
- **Julia:** Added the deep expression operator. Now you can write patterns such as `foo(<... 42 ...>)` to find instances of calls to `foo` that contain `42` somewhere inside of it. ([#8540](https://github.com/returntocorp/semgrep/pull/8540))
- Added support for languages with case insensitive identifiers and generalized PHP to use these case insensitive identifiers.
  - For example, in PHP the pattern `MyClass()` now matches calls with different capitalizations such as `myclass()` and `Myclass()`. ([#8356](https://github.com/returntocorp/semgrep/pull/8356))

### Fixed

- Fixed `--text` and `--output` flags which broke in 1.38.0. If you are using version 1.38.0, update Semgrep to receive these fixes.
- Converted all '@r2c.dev' email addresses to '@semgrep.com'. Several error messages displayed outdated email addresses. With this fix, you can now see in the CLI the correct email to reach out to the Semgrep Support team, which is [support@semgrep.com](mailto:support@semgrep.com). ([#8446](https://github.com/returntocorp/semgrep/pull/8446))
- Fixed CLI output to display matches from different rules with the same message. Now you are able to see the rule ID granularly even if two rules have the same rule message. ([#8557](https://github.com/returntocorp/semgrep/pull/8557))
- Semgrep PyPI package can now be installed on **aarch64 libmusl** platforms such as Alpine. (gh-8565)
- Improved the `--max-memory` help description to make it clearer. Its previous message, "Defaults to 0 for all CLI scans," did not convey that the default is 0 for all scans except when using Semgrep Pro Engine in CI scans. The default is 5000MiB for Semgrep Pro Engine CI scans. In this context, a CI scan is any scan using the `semgrep ci` command, whether in a local environment or a CI/CD pipeline, and Pro Engine must be enabled for the org whose repositories you are scanning.
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
- **Julia:** Fixed a bug where `let end` blocks were not being parsed correctly, causing their contents to not strictly match while inside of a block. For example, `let ... end` didn't count as being inside of the `let` block, and would match everything. ([#8569](https://github.com/returntocorp/semgrep/issues/8569))
- **Julia:** correctly parse `BitOr` and `BitAnd` ([#8449](https://github.com/returntocorp/semgrep/issues/8449))
- **Julia:** Fixed a bug where parenthesized expressions sometimes did not match in constructs such as metavariable-comparison. ([#8444](https://github.com/returntocorp/semgrep/issues/8444))
- **Julia:** Type information from declarations can now be used in metavariable-type. For instance, the program:
  ```
  x :: Int64 = 2
  ```
  now allows uses of x to match to the type Int64. ([#8470](https://github.com/returntocorp/semgrep/issues/8470))
- **Julia:** Metavariables are now able to appear anywhere that identifiers can. For instance, they were not able to appear as the argument to a `do` block. ([#8486](https://github.com/returntocorp/semgrep/issues/8486)) Now, you can write patterns such as:
```
map($Y) do $X
  ...
end
```
- **Java:** Fixed a naming bug affecting Java and other object-oriented (OO) languages that allowed a method parameter to shadow a class attribute. For example, in:
  ```
  class Test {
  
      private int x;
  
      public void test2(int x) {
          foo(this.x);
      }
  
  }
  ```
  Semgrep was considering that `this.x` referred to the parameter `x` of `test2` rather than to the class attribute `x`. ([#8508](https://github.com/returntocorp/semgrep/pull/8508))


### Changed

- Running the `semgrep`  command with no subcommand now displays the help message. Previously, the `semgrep` command ran a SAST scan by default.

### Removed

- `python -m semgrep` has been removed. Instead, invoke Semgrep directly by entering `semgrep` in the CLI.
- Semgrep no longer looks for a `.semgrep.yml` config file or `.semgrep/` in the current directory, which previously caused conflicts when invoking `semgrep` from your home directory. This is because the home directory can contain a `.semgrep/settings.yml` file that is not a Semgrep rule, despite Semgrep expecting a rule file. ([#4457](https://github.com/returntocorp/semgrep/issues/4457))
  - The preferred method to run rules is to explicitly pass rules through the `--config` option. For example, to run a `.semgrep.yml` file containing rules, you must enter `semgrep --config .semgrep.yml`.
- If you previously wrapped Semgrep Python code by calling `semgrep_main.main`, you must replace the previous call with `run_scan.run_scan`. Note that these Python calls will be removed in the future.
- `--enable-metrics` and `--disable-metrics` have been removed. Instead, use any of the following:
  - `--metrics=on`
  - `--metrics=off`
  - `--metrics=auto`

## Semgrep Pro Engine

<!-- Separated pro engine because it is proprietary -->

### Fixed

- **JavaScipt (JS) or TypeScript (TS) taint mode:** fixed a bug introduced in 1.33.1 that had the side-effect of hurting performance of taint rules on JS or TS repositories that used destructuring in a function's formal parameters.

## Semgrep Cloud Platform

### Added

- The `semgrep ci` command now displays enabled products when scans are command now created or when the scan config is generated from Semgrep Cloud Platform. Additionally, if no products are enabled then a friendly error is raised and the scan is stopped. You must enable a product in Semgrep **Cloud Platform > Settings** to start a scan.
- You can now remove your SSO configuration. Previously, you had to reach out to [support@semgrep.com](mailto:support@semgrep.com) to remove an SSO configuration. To remove your SSO configuration, go to **[Settings > Access > SSO](https://semgrep.dev/orgs/-/settings/)**.
- **Projects page:** Added a **Sync projects** button which enables you to synchronize your Semgrep projects with your SCM. This enables you to onboard projects faster to the Semgrep Cloud Platform and ensure all your repositories are represented and available for scanning.

## Semgrep Code

### Added 

- **Rules page:** Added a new view, **Group by vulnerability class**, that is the default view within the Rules page.
- Added a **last updated** attribute to rule cards. This helps you troubleshoot unexpected findings in unchanged configs.
- Added a **<i class="fa-regular fa-clipboard"></i> Copy rule** button within the rule popup.

## Semgrep Supply Chain

### Added

- Added **lockfile-only rules** for the following languages:
  - C#
  - PHP

### Fixed

- **PNPM:** Fixed a bug where dependencies in `pnpm-lock.yaml` at version 6.0 and up were not parsed.
- **Gradle:** Fixed an issue where packages in `build.gradle` files had their names incorrectly parsed without their group ID.

### Removed

- Removed the ability to turn off scanning with lockfile-only rules. Moving forward, lockfile-only rules are included in all full scans.

## Semgrep Assistant (beta)

### Fixed

- **GitHub:** Fixed a bug in which you could receive duplicate PR comments if you had installed more than one instance of `semgrep-app`.
- **Slack notifications:** Previously, clicking the **Agree** button in a Slack Assistant message does not triage the original issue created. Now, if Semgrep Assistant suggests that a finding is safe to ignore, clicking Agree also triages the finding to Ignored.
- Various bugfixes and improvements.

## Documentation and knowledge base updates

### Added

- Added a section on Semgrep Code's [deduplication behavior in the API](/semgrep-code/findings/#deduplicating-findings-in-semgrep-api) and expanded on deduplication behavior in Semgrep Cloud Platform.
- A new section has been added to guide you through [infrastructure-specific configuration when setting up Semgrep Cloud Platform](/semgrep-supply-chain/setup-infrastructure/) for the first time. 
- Added section on how a future [change in a Semgrep Supply Chain rule affects scan behavior](/semgrep-supply-chain/getting-started/#future-rule-updates-to-existing-or-current-rules).
- Added a section describing how SSC's License compliance feature handles [packages with multiple licenses](/semgrep-supply-chain/license-compliance/#multiple-licenses).
- Added the following knowledge base articles:
  - [Running Semgrep in Visual Studio Code on Windows](/kb/integrations/semgrep-vs-code-windows/)
  - [Matching multiple tokens with ellipsis metavariables](/kb/rules/ellipsis-metavariables)

### Changed

- The [Getting started with Semgrep Cloud Platform](/semgrep-cloud-platform/getting-started/) page has been rewritten to help you onboard yourself, your team or organization, and your repositories to SCP.
- Prefer the `semgrep ci` command to execute Semgrep in several quickstart and getting started guides.
- Updated Supported languages table for Swift, Rust, and Apex.

### Removed

- **Rule board documentation** has been removed. Refer to the [Policies](/semgrep-code/policies) documentation for information on rule management in Semgrep Cloud Platform.
