---
description: Re-run a Semgrep Managed Scan check for a pull or merge request.
tags:
  - Semgrep Managed Scans
  - Troubleshooting
  - re-run
---

# Re-run a Semgrep Managed Scan

There is no manual "re-run" action for Semgrep Managed Scans.

If your scan is stuck, you can re-run a scan by pushing a new commit to the pull request (PR) or merge request (MR). 

If you do not need code changes, you can push an empty commit:

```
git commit --allow-empty -m "Trigger Semgrep scan"
git push
```
