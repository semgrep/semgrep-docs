---
tags:
  - Semgrep Supply Chain
description: Exclude a Semgrep Supply Chain rule from a scan
---

# How to exclude a Semgrep Supply Chain rule from a scan

To troubleshoot a problematic rule or to remove a rule that's too noisy, you can exclude a specific rule from being run during a Semgrep Supply Chain scan using the `--exclude-rule` flag:

```console
semgrep ci --exclude-rule <rule_ID>
```

The `--exclude-rule` flag requires the rule ID as a parameter. You can get this value as follows:

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login), and go to **Supply Chain**.
2. Select the finding whose details you want to view details:
    - If the default **Group by Rule** is enabled, click the <i class="fa-regular fa-window-restore"></i> **Details** icon on the card of the finding.
    - If the **No grouping** view is enabled, click the **header hyperlink** on the card of the finding.
3. Scroll to the **Pattern** panel, and click **Rule** to change the view. The rule `id` is listed in row 1 and begins with the `ssc` prefix.
