---
slug: best-practices-for-memories
title: Best practices for writing Assistant Memories
hide_title: true
description: Review best practices for writing Memories to ensure optimal results.
tags:
 - Semgrep Assistant
---

# Best practices for writing Assistant Memories

This page covers various best practices for writing Assistant memories.

## Voice and tone

When writing your memories, aim to "talk" to Assistant the way that you would talk to a new security intern:

- Present and describe the information clearly.
- Describe technical concepts as simply as possible.
- Explain the consequences and outcomes of actions in detail.

Examples:

> When generating remediation for SQL injection issues, ensure that the SQL is compatible with BigQuery.

> Data from Foo internal services, such as Bar and FooBar, are trusted sources for data flowing into the URL. These findings are false positives.

> Code that's flagged for missing cookie security attributes may be a false positive if the code's purpose is to delete or clear a cookie, since security attributes may not be necessary for immediate removal.

## Purpose

Before beginning, decide what the purpose of the memory is: triage, remediation, or both.

If the purpose of the memory is to influence triage, you can provide a natural language description of the expected consequence:

> This repository is a QA repository. All findings can be safely ignored due to these mitigating factors.

If the goal is to influence Assistant's remediation guidance, you can provide a natural language description of the recommendation:

> As a standard, leverage the `Jsoup.clean()` function to sanitize input.

Once you've decided on the purpose, this informs how you explain your expectations and desired outcomes to Assistant.

## Structure

When writing a memory, be sure to include as many of the following components as necessary:

1. The **conditions** that Assistant should be looking for in the codebase, as well as any context Assistant should consider when analyzing your codebase
2. **Guidance** as to how Assistant identifies the conditions that you specified
3. The **implications** for triage and remediation if Assistant identifies that the conditions you specify are present in your codebase

**Example:**

> Dockerfiles with image `foo` are designed to run as a non-root user and are an acceptable risk. All relevant findings are false positives.

In the preceding memory, you can see all three components present:

1. The **condition and context**: Dockerfiles with image `foo` are designed to run as non-root user.
2. **Guidance**: In this case, there's some overlap between the condition and context and the guidance. The guidance here to Assistant is to look for Dockerfiles with image `foo`.
3. **Implication**: This is an acceptable risk, so the findings are flagged as false positives.

## Additional considerations

In addition to the voice and tone of the memory, its purpose, and its structure, consider the following when writing your memory.

### Write memories that are general in nature

Avoid writing memories that don't generalize beyond the original finding. For example, the following memory is specific to a finding:

> Interpolated value does not involve user input.

You can generalize this to:

> Interpolated values that are program constants aren't considered dangerous.

Another example of a highly specific memory is:

> The function is called through generated methods, making it unreachable in this use case.

You can generalize this to:

> Functions called through generated methods from framework X or methods that look like Y are safe.

### State all implications and be clear on what the consequences of something are

When writing the memory, be clear about the implications and consequences are for Assistant.

In the following example, the memory states a fact, but leaves the implication unstated:

> The function `generateDevSecret` is used to create development secrets.

The leaking of development secrets might not be a problem, but it's also possible that leaking development secrets is as big a security issue as leaking production secrets.

For some organizations, development secrets are just as powerful as production secrets. For other organizations, development secrets are ephemeral, and it's not a major issue if they're leaked. As such, it's essential to rewrite the memory with the implication stated to help Assistant analyze a finding:

> Secrets created by the `generateDevSecret` function are considered development secrets and pose a security risk.

### Understand the context available to Assistant

When Assistant analyzes a finding, it has the following contextual information available:

- The Semgrep rule
- The code matched by the Semgrep rule
- Multiple lines of code surrounding the finding
- Examples from an AppSec knowledge base
- Memories that you have written
- Prior fixes for similar issues

Assistant does not have access to any other information for use during analysis. For example, the following memory is ineffective:

> Please provide an alternative solution for the validator.

Assistant isn't going to use past remediation advice in a prompt, so the preceding memory likely results in Assistant hallucinating. In this case, if you want Assistant to avoid using a specific validator, you can specify this:

> Fixes should be generated with an alternative to the validation library X.

One common issue is the use of links in memories. Assistant cannot access links, and therefore it cannot read the information that's behind the link. Instead, provide the information at the link to Assistant explicitly:

> Recommend a fix similar to this code: `Sample code...`

Another common issue is assuming that Assistant has access to context that it doesn't actually have. For example, 

> API key from a forked repository poses no security risk.

It's difficult to determine programmatically if a repository is forked, and Assistant cannot use this information when analyzing a finding. Instead, specify the repositories that you've forked:

> Repositories X, Y, and Z are forked. API keys in forked repositories should be triaged as false positives.
