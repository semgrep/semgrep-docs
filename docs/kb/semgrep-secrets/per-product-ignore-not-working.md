---
description: Product specific path ignores requires a supported CLI version
tags: 
    - Semgrep Secrets
---

# Why didn't Semgrep Secrets ignore the files/folders I specified?

The Semgrep AppSec platform allows you to [define ignore patterns](https://semgrep.dev/docs/ignoring-files-folders-code#define-ignored-files-and-folders-in-semgrep-appsec-platform) for specific products within a project. However, these product-specific ignores for Semgrep Secrets require a CLI version `1.71.0` or later.

If you are using an older version of the CLI, the path ignores for Semgrep Secrets will not be applied. Instead, the system will fallback to the SAST + SCA path ignores.