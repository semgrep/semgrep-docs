---
slug: april-2022
append_help_link: true
hide_title: true
description: >-
  Release notes include the changes, fixes, and additions in specific versions of Semgrep.
toc_max_heading_level: 3
tags: 
  - Release notes
hide_table_of_contents: false
date: 2022-04-30T10:00
title: April 2022
---

# April 2022

The following updates were made to Semgrep in April 2022.

<!-- truncate -->

These release notes now include edited important and breaking changes. To see the complete change notes, visit the [Semgrep changelog](https://github.com/semgrep/semgrep/releases).

## Semgrep App

### Additions

- You can now search for a rule within your Rule Board.
- A `Comment` column within the Rule Board enables Semgrep App to create suggestions and messages within Pull Requests (PRs) or Merge Requests (MR) based on the rule's `autofix` and `message` values.

### Changes

- Unlisted rule visibility has been renamed to Public within the Editor.
- The `Audit` column within the Rule Board has been renamed to `Monitor`. Findings generated by rules within this column are displayed only on Semgrep App.
![New rule board.](/img/rule-board.png "New rule board.")

## Semgrep CLI and Semgrep in CI

These release notes encompass upgrades for all versions ranging between **0.87.0** and **0.90.0**.

### Changes

- For GitHub Enterprise users: Semgrep CI uses `GITHUB_SERVER_URL` to generate URLs if it is available.
- When running a baseline scan on a shallow-cloned Git repository, Semgrep still needs enough Git history available to reach the branch-off point between the baseline and current branch. Previously, Semgrep tried to gradually fetch more and more commits up to a thousand commits of history, and then fetch all commits from the remote Git server. Now, Semgrep keeps trying smaller batches until up to a million commits. This change reduces runtimes on large baseline scans on very large repositories.
- You can now set `NO_COLOR=1` to force-disable colored output.

### Breaking changes

- taint-mode: Unification of metavariables between sources and sinks is no longer enforced by default. It was not clear that this is the most natural behavior as it was confusing even for experienced Semgrep users. Instead, each set of metavariables is now considered independent by Semgrep. The metavariables available to the rule message are all metavariables bound by `pattern-sinks`, and the subset of metavariables bound by `pattern-sources` that do not collide with the ones bound by `pattern-sinks`. We do not expect this change to break many taint rules because source-sink metavariable unification had a bug (see [#4464](https://github.com/semgrep/semgrep/issues/4453)) that prevented metavariables bound by a `pattern-inside` to be unified, thus limiting the usefulness of the feature. Nonetheless, it is still possible to enforce metavariable unification by setting `taint_unify_mvars: true` in the rule options. For more information, see section [Metavariables, rule message, and unification](/writing-rules/data-flow/taint-mode/#metavariables-rule-message-and-unification).
- The `semgrep/semgrep` Docker image no longer sets `semgrep` as the entry point. This means that Semgrep is no longer prepended automatically to any command you run in the image. This makes it possible to use the image in CI executors that run provisioning commands within the image. Affected users may receive a deprecation notice. Adjust scripts accordingly.

### Additions

- A new `focus-metavariable` operator that enables you to focus (or zoom in) the match on the code region delimited by a metavariable. This operator is useful for narrowing down the code matched by a rule, to focus on what matters. For more information, see [focus-metavariable documentation](/writing-rules/rule-syntax/#focus-metavariable). ([#4453](https://github.com/semgrep/semgrep/issues/4453))
- Join mode now supports inline rules through the `rules` key underneath the `join` key. For more information, see [Inline rule example](/writing-rules/experiments/join-mode/overview/#inline-rule-example).

Language support improvements:
- Scala support is now officially fully GA.
    - Ellipsis method chaining supported.
    - Type `metavariables` are now supported.
- Ruby support improvement:
    - Add basic support for lambdas in patterns. You can now write patterns of the form `-> (P) {Q}` where `P` and `Q` are sub-patterns. ([#4950](https://github.com/semgrep/semgrep/issues/4950))
