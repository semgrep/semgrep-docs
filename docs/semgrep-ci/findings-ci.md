---
slug: findings-ci
title: Findings in CI
hide_title: false
description: Learn how Semgrep Pro tracks findings and triage states in CI pipelines.
tags:
  - Semgrep Code
---

import TriageStatuses from "/src/components/reference/_triage-states.mdx"

When running any Semgrep Pro product in CI, Semgrep is able to track the lifetime of an individual finding. When configured to perform a diff-aware scan, Semgrep only shows new findings relative to some specified baseline commit.

In the code, a Semgrep finding in CI is defined by a 4-tuple:

```
(rule ID, file path, syntactic context, index)
```

These states correspond to:

1. `rule ID`: The rule's ID within the Semgrep ecosystem.
1. `file path`: The filesystem path where the finding occurred.
1. `syntactic context`: The lines of code corresponding to the finding.
1. `index`: An index into identical findings within a file. This is used to disambiguate findings if the same `syntactic context` occurs multiple times in the same file.

## Semgrep Code findings 

Semgrep AppSec Platform builds on CI findings to track status and provide additional context for managing findings within your organization. A finding can be one of four statuses in Semgrep AppSec Platform:

* `OPEN`
* `IGNORED`
* `FIXED`
* `REMOVED`

### Finding status

You can manage finding status through triage in Semgrep AppSec Platform's **Findings** page. The finding statuses are as follows:

<TriageStatuses />
