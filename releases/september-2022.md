---
slug: september-2022
append_help_link: true
hide_title: true
description: >-
  Release notes include the changes, fixes, and additions in specific versions of Semgrep.
toc_max_heading_level: 3
---

# September 2022

## Semgrep App

### Changes

- The Findings page has been updated with UX/UI improvements to its filtering and triage functions.
- The Dashboard page has been updated with UI improvements.

### Bug fixes

- Previously, users could not receive merge request (MR) comments within GitLab repositories. This issue has been fixed. Users can now receive MR comments in GitLab from Semgrep App.
- Update git URL parser to support optional organization after the hostname. For example `https://some.enterprise.scm/myorg/owner/repo`.
- Various fixes and improvements to speed.

## Semgrep CLI

These release notes include upgrades for versions ranging between 0.112.0 and 0.115.0.

### Additions

- Exclude rules by ID using CLI flag `--exclude-rule`. To exclude a specific rule, use for example <code>semgrep --config=auto --exclude <span className="placeholder">RULE_ID</span></code>. (Issue [2530](https://github.com/semgrep/semgrep/issues/2530), PR [5974](https://github.com/semgrep/semgrep/pull/5974))

- You can now have multiple metavariables under `focus-metavariable`, which allows. Semgrep to highlight the values matched by multiple metavariables more easily in certain circumstances. For more information, see [Using multiple focus metavariables](/writing-rules/experiments/multiple-focus-metavariables) documentation. (Issue [5686](https://github.com/semgrep/semgrep/issues/5686))

- You can add tags for specific projects in the Semgrep App on the configuration page of a project. With this update, you can create `.semgrepconfig.yml` file in the root directory of your repository and add tags in this file also. See [Tagging projects](/semgrep-appsec-platform/tags).

- The Semgrep CLI output now displays non-blocking and blocking findings separately. CLI output also provides a list of the blocking rules that matched the code.

- taint-mode: Experimental support for basic field-sensitive taint tracking. Semgrep can now track `x.a` and `x.b` separately, so that for example: `x.a` can be tainted at the same time as `x.b` is clean, hence `sink(x.a)` can produce a finding but `sink(x.b)` does not. It is also possible for `x` to be tainted while `x.a` is clean. As a result, the number of false positives that Semgrep reports is reduced.

### Changes

- generic mode: Allow text input up to 500 bytes without human-readable indentation. This value is subject to change. This relaxation is intended to facilitate testing a long line without a trailing newline. Semgrep users should not expect files that are not human-readable to be processed by Semgrep's generic mode, or in any mode. (Issues [6071](https://github.com/semgrep/semgrep/issues/6071), [6162](https://github.com/semgrep/semgrep/issues/6162))

- Changed behavior for renamed files in diff-aware scans. Semgrep no longer displays old issues to developers when they rename a file. As a result, findings in renamed files are displayed for security engineers but do not block or spam developers. (Issue [6157](https://github.com/semgrep/semgrep/pull/6157))

## Additional information

Minor bug fixes are not included in the release notes unless they are potentially breaking your workflow. To see the complete change notes for Semgrep CLI and CI that include fixes, visit the [Semgrep changelog](https://github.com/semgrep/semgrep/releases/).

## Documentation updates

- New documentation for experimental [Taint labels](/writing-rules/data-flow/taint-mode#taint-labels-pro-).
- New documentation for [Display matched metavariables in rule messages](/writing-rules/pattern-syntax/#display-matched-metavariables-in-rule-messages) and experimental [Displaying propagated value of metavariables](/writing-rules/experiments/display-propagated-metavariable).
- New documentation for [Using multiple focus metavariables](/writing-rules/experiments/multiple-focus-metavariables).
- Added information about [Ellipsis operator scope](/writing-rules/pattern-syntax/#ellipsis-operator-scope).
- Many documents, such as [Getting started with Semgrep App](/deployment/core-deployment) now display minimal Semgrep tier required for a particular feature documented on the page.
- Updated [Managing findings in Semgrep App](/semgrep-code/findings).
- [Taint mode](/writing-rules/data-flow/taint-mode) documentation has been updated and now includes introductory video.
- Updated [Getting started with Semgrep in continuous integration (CI)](/deployment/core-deployment)
- Updated [Data-flow analysis engine overview](/writing-rules/data-flow/data-flow-overview).
- Updated [Integrating Semgrep into source code management (SCM) tools](/deployment/connect-scm).
- Updated [Evaluating your security posture through the Dashboard](/semgrep-appsec-platform/dashboard).
- Updated [Notifications](/semgrep-appsec-platform/notifications) documentation.
