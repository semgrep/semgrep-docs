---
description: Options to scan compressed files or other artifacts with Semgrep.
tags:
  - Scans
  - Semgrep in CI
---

# Does Semgrep scan compressed files or other non-code files?

Semgrep is a pre-build security tool optimized to search for code and text patterns. It does not scan the files within a compressed archive, nor does it scan binaries (built files).

## How can I scan the files inside a compressed archive file?

To scan code or text files that are stored in a compressed archive file with Semgrep, uncompress the files before performing the scan. When the scan is complete, delete the temporary files that were created.

For local scans, this can be done manually. For scans in CI, add appropriate actions to the CI config.

### What are the limitations of this approach?

When possible, Semgrep AppSec Platform generates [hyperlinks](/docs/semgrep-code/findings#code-page-structure) to a finding's location within a repository and file. If the file is not persistent in the repository, and is scanned at a temporary path, then the hyperlink will lead to that temporary path and will not work properly. This may make it more difficult for developers to identify where and how to fix issues identified in the temporary files.

Currently, it is not possible to uncompress files before running a scan in [Semgrep Managed Scans](/docs/deployment/managed-scanning/overview).
