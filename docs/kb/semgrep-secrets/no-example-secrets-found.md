---
description: Semgrep Secrets attempts to reduce false positives by bypassing common example secret patterns.
tags:
  - Semgrep Secrets
---



# Why didn't Semgrep Secrets find these example secrets?

One common pattern in code is to include a placeholder value or format indicator for a secret rather than a real secret value. Where possible, Semgrep Secrets rules are intentionally written to minimize matches with this type of placeholder to avoid false positives, since the primary concern is identifying real secrets accidentally committed, especially if they are still valid.

As a result, if you have a line such as:

```
AWS_SECRET_ACCESS_KEY = "AKIA000EXAMPLE83A0I4"
```

Semgrep does not flag this line, because the key contains the string `EXAMPLE` and that's recognized as being a placeholder rather than a valid AWS access key.

If you'd like to flag this type of usage, you can consider [writing a custom Secrets rule](https://semgrep.dev/docs/semgrep-secrets/rules), or [reach out to support](/docs/support) to discuss your question further with the team.
