---
description: Product-specific path ignores require a supported CLI version.
tags: 
    - Semgrep Secrets
---

# Why are the Secrets-specific ignores I configured not working?

The Semgrep AppSec Platform allows you to [define ignore patterns](https://semgrep.dev/docs/ignoring-files-folders-code#define-ignored-files-and-folders-in-semgrep-appsec-platform) for specific Semgrep products for each project. However, product-specific ignores for Semgrep Secrets require Semgrep version `1.71.0` or later in your CLI or CI environment.

If you use an older version of Semgrep, the path ignores for Semgrep Secrets that are set in Semgrep AppSec Platform are not applied. Instead, the system applies the path ignores from SAST and SCA to your Secrets scan as well.