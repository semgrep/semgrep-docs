---
slug: endor-labs
append_help_link: true
hide_table_of_contents: true
displayed_sidebar: whatsSemgrepSidebar
tags:
  - Support
description: >-
  See how Semgrep compares to Endor Labs.
---

import TOCInline from "@theme/TOCInline"

# Compare Semgrep to Endor Labs

<TOCInline toc={toc} />

## Prioritization

Both Endor Labs and Semgrep support the prioritization of findings so that AppSec teams focus on the most impactful findings. While both companies offer findings filters based on criteria like reachability and EPSS scores, Semgrep offers support for statuses in addition to the basic reachability statuses of **reachable** and **not reachable**, such as **always reachable** and **conditionally reachable**.

Furthermore, Semgrep Assistant uses AI to help organization admins receive information on top backlog tasks, allowing them to prioritize findings from all products, including the SAST and SCA products, not just those resulting from dependency vulnerability scans.

## Reachability for transitive dependencies

Reachability has been a fundamental part of Semgrep Supply Chain from the beginning. Supply Chain offers advanced reachability analysis for direct dependencies in the form of dataflow reachability, offering accuracy beyond that offered by Endor Labs. This coverage is offered for seven languages and counting.

## Vulnerable functions

Semgrep doesn't just identify a vulnerability as reachable when a vulnerable function is called -- it also takes into account *how* the vulnerable function is called and what data flows into that function. These functions are achieved through the use of Semgrep's rule syntax; when a rule is written, all possible permutations of the vulnerability are encapsulated in the rule. This functionality is something that Endor Labs doesn't have.

Semgrep's security research team doesn't just focus on analyzing a vulnerable function when writing rules. The team extends the scope of analysis to all the third-party callers of the vulnerable functions, not just the reported third-party function that's vulnerable. This extends the set of vulnerable functions greatly. The following rule demonstrates this functionality:

```yaml
---
rules:
  - id: ssc-a462c702-1797-4f92-a577-2232cc25ab08
    message: Affected versions of paddlepaddle are vulnerable to Improper Limitation
      Of A Pathname To A Restricted Directory ('Path Traversal') in the
      `download` and `_check_exists_and_download` of `paddle.dataset.common`.
    severity: ERROR
    metadata:
      confidence: HIGH
      category: security
      cve: CVE-2024-0818
      cwe:
        - "CWE-22: Improper Limitation of a Pathname to a Restricted Directory
          ('Path Traversal')"
      ghsa: GHSA-2rp8-hff9-c5wr
      owasp:
        - A01:2021 - Broken Access Control
        - A05:2017 - Broken Access Control
        - A06:2021 - Vulnerable and Outdated Components
      publish-date: 2024-03-07T15:30:38Z
      references:
        - https://github.com/advisories/GHSA-2rp8-hff9-c5wr
        - https://nvd.nist.gov/vuln/detail/CVE-2024-0818
      sca-fix-versions: []
      sca-kind: reachable
      sca-schema: 20230302
      sca-severity: CRITICAL
      sca-vuln-database-identifier: CVE-2024-0818
      technology:
        - python
    r2c-internal-project-depends-on:
      depends-on-either:
        - namespace: pypi
          package: paddlepaddle
          version: <=2.6.0
    languages:
      - python
    patterns:
      - pattern-either:
          - pattern: paddle.dataset.common.download(...)
          - pattern: paddle.dataset.common._check_exists_and_download(...)
```

The vulnerable function is `download`, as shown by the [fix commit](https://github.com/PaddlePaddle/Paddle/commit/5c50d1a8b97b310cbc36560ec36d8377d6f29d7c). The function `_check_exists_and_download` calls `download`, which you can see in the [source code](https://github.com/PaddlePaddle/Paddle/blob/5c50d1a8b97b310cbc36560ec36d8377d6f29d7c/python/paddle/dataset/common.py#L223). Thus, both functions are flagged in the rule in the final three lines.

Learn more about how the security research team writes rules in [A day in the life: Supply Chain Security Researcher](https://semgrep.dev/blog/2024/a-day-in-the-life-supply-chain-security-researcher)

## Policies and flexibility

Semgrep Supply Chain results in a failed CI job only when there are critical or high-severity findings. However, Semgrep supports notifications and integration with Jira to create tickets for all Supply Chain findings, and it offers the ability to only leave comments on PRs or block a change regarding license detection.

The policies for Semgrep's other products, Semgrep Code and Semgrep Secrets, provide extensive flexibility, especially with respect to a developer's workflow, by allowing results to appear:

- Only in the AppSec team’s view (monitor mode)
- In the AppSec team's view **and** in the developer’s workflow, while not failing the CI job (comment mode)
- In the AppSec team's view **and** in the developer’s workflow, while also failing the CI job (block mode)

## Dependency lifecycle management

To help you manage your findings, Semgrep provides information, including EPSS probabilities, severity levels, transitivity information, and multiple levels of dataflow reachability.

## Accuracy of results

Semgrep has reachability analysis for over 80% of critical CVEs dating back to 2017 and 100% of critical and high severity CVEs dating back to May 2022. Endor Labs' reachability data, however, dates back to 2018.
