---
description: Product-specific path ignores require a supported CLI version.
tags: 
    - Semgrep Secrets
---

# Why didn't Semgrep Secrets ignore the files and folders I specified?

The Semgrep AppSec Platform allows you to [define ignore patterns](https://semgrep.dev/docs/ignoring-files-folders-code#define-ignored-files-and-folders-in-semgrep-appsec-platform) for specific Semgrep products for each project. However, product-specific ignores for Semgrep Secrets require Semgrep version `1.71.0` or later in your CLI or CI environment.

If you are using an older version of the CLI, the path ignores for Semgrep Secrets will not be applied. Instead, the system will fallback to the SAST + SCA path ignores.