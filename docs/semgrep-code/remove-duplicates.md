---
slug: remove-duplicates
append_help_link: true
title: Remove duplicate findings
hide_title: true
description: Learn how to remove duplicate findings and prevent them from displayed in Semgrep AppSec Platform.
tags:
 - Semgrep Code
 - Semgrep AppSec Platform
---

# Remove duplicate findings

Semgrep scans are performed on both mainline (trunk) and non-mainline branches. The scope of the scan can differ depending on if Semgrep is called on a mainline or non-mainline branch.

<dl>
 <dt>Full scan</dt>
 <dd>Scans the repository in its entirety. It is recommended to perform full scans on mainline branches, such as <code>master</code> or <code>main</code>. This scan is performed on a scheduled basis.</dd>
 <dt>Diff-aware scan</dt>
 <dd>Diff-aware scans are performed on non-mainline branches, such as in pull requests and merge requests. Diff-aware scans traverse the repository's files based on the commit where the branch diverged from the mainline branch (or diverged from the last commit that was fully scanned)</dd>
</dl>

Regardless of scan type, Semgrep generates a finding whenever a Semgrep rule matches a piece of code.

For each finding identified by Semgrep, Semgrep tags the finding with a unique fingerprint that allows Semgrep to track the finding as it exists in a file over time. Semgrep generates this fingerprint by combining and hashing information retrieved during runtime, including file path, rule name, and pattern, and the metavariables substituted into the pattern.

Additionally, Semgrep appends an index value that reflects the number of occurrences of a finding matching the same rule in a single file. The index helps Semgrep determine how two or more findings are related to each other. In other words, a finding with fingerprint `123_0` and a finding with fingerprint `123_1` indicates that the findings were generated from the same rule that matched a given piece of code in the same file.

With this fingerprint, Semgrep can determine if a finding with the same fingerprint already exists. If not, it is considered a new finding.

## Deduplicate findings by rescanning the project

Semgrep's correlation of findings across branches based on their unique fingerprint allows for automatic deduplication of findings and makes it simpler for you to triage findings.

If a finding is fixed in one branch (such as `main`) but open in another branch (such as `production`), and the code fixes are present in both branches, initiate scans through your CI job or SCM tool on the branches with open findings. Semgrep will reconcile the findings and mark them as fixed.

## Remove duplicate findings using Semgrep API

Semgrep API does not automatically deduplicate findings. If you are using Semgrep API to receive or pull findings data, set the `dedup` flag to `true` to deduplicate findings across refs or branches. Refer to [List all findings](https://semgrep.dev/api/v1/docs/#tag/Finding/operation/semgrep_app.saas.handlers.issue.openapi_list_recent_issues) in the Semgrep API docs for more information.
