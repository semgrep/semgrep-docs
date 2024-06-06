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

## Remove duplicate findings using Semgrep AppSec Platform

Regardless of the scope of a scan, Semgrep correlates findings across branches based on their unique fingerprint, automatically deduplicating findings and making it simpler to triage.

If a finding is fixed in one branch (such as `main`) but open in another (such as `production`), and the code fixes are present in both branches, initiate a scan through your CI job or SCM tool on the branch(es) with open findings to have Semgrep mark the findings as fixed.

## Remove duplicate findings using Semgrep API

Semgrep API does not automatically deduplicate findings. If you are using Semgrep API to receive or pull findings data, set the `dedup` flag to `true` to deduplicate findings across refs or branches. Refer to [List all findings](https://semgrep.dev/api/v1/docs/#tag/Finding/operation/semgrep_app.saas.handlers.issue.openapi_list_recent_issues) in the Semgrep API docs for more information.
