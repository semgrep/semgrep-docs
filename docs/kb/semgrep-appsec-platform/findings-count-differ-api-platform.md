---
description: Learn why the count of findings differs in the API and Semgrep AppSec Platform.
tags:
 - Semgrep AppSec Platform
 - Semgrep Code
 - Semgrep Secrets
 - Semgrep Supply Chain
---

# Why do the findings count differ in the API and the Semgrep AppSec Platform UI?

## Semgrep Code and Supply Chain findings

Semgrep Code and Supply Chain findings shown in Semgrep AppSec Platform are automatically deduplicated by default. This means that a finding that appears across multiple branches or scans is counted only once (typically for the most recent occurrence on a primary branch). The findings, however, aren't deduplicated by default when you request them through the Semgrep API.

You can see results from the API that match those shown in Semgrep AppSec Platform by making a call to the [List code or supply chain findings](https://semgrep.dev/api/v1/docs/#tag/FindingsService/operation/FindingsService_ListFindings) endpoint, ensuring that you include the `dedup=true` parameter.

## Semgrep Secrets findings

Semgrep AppSec Platform displays the latest instance of a Semgrep Secrets finding by default, even if the finding appears on a non-primary branch. A Secrets finding is considered relevant if it exists on *any* branch. Semgrep's [Secrets API endpoint](https://semgrep.dev/api/v1/docs/#tag/SecretsService) also behaves this way, so the counts shown in Semgrep AppSec Platform and by the API are typically in agreement.

## Filters and scoping the API call to ensure consistency

To ensure consistency in the findings count shown by the Semgrep API and in the Semgrep AppSec Platform UI, use the same filters in your API query as those applied in the UI, such as:

- Ref
- Severity
- Confidence
- `dedup=true` (this parameter is crucial for aligning the API output with the information shown in Semgrep AppSec Platform)

:::note 
When setting `ref`, note that passing the `ref=_default` parameter to the API is *not* equivalent to setting the primary branch in Semgrep AppSec Platform. You must set `ref` explicitly to the primary branch name, such as `main` or `master`, to ensure the output matches the information in the UI. Without this, the API returns findings from all branches.
:::
