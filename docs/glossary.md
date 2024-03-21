---
slug: tk
title: SAST and rule-writing glossary
hide_title: true
description: tk
tags:
  - tk
---

# Semgrep Code (SAST) and rule-writing glossary

The definitions provided here are specific to the terms's meaning and use in Semgrep.

## true positive

## false positive

## Diff-aware scan

See also Full scan.

## Full scan

See also Diff-aware scan.

## Constant propagation

## Symbolic propagation

## Cross-file analysis

Also known as **interfile analysis**. This refers to a tool's ability to trace or track data and its transformations across files, such as when a variable is defined in one file but used in another.

Cross file analysis can be paired with taint analysis to detect unsanitized variables flowing from a source to a sink.

<!-- This type of analysis is available in Semgrep Pro engine -->

## Cross-function analysis

Also known as **intrafile** or **interprocedural** analysis. This refers to a tool's ability to trace or track data and its transformations across functions in a single file, such as when a globally-scoped variable is defined in one function but used in another.

<!-- This type of analysis is available in Semgrep Pro engine -->

## Finding

A finding is the core result of Semgrep's analysis. Findings are generated when a Semgrep rule matches a piece of code. Findings can be security issues, bugs, or code that doesn't follow coding conventions.

<!-- ## Field sensitivity

## Index sensitivity -->

## Metavariable

## Policy

[definition]

Not to be confused with **policy-as-code**.

## Single-file analysis

## Single-function analysis

## Sink

In taint analysis,

## Source

In taint analysis,

## Registry (Semgrep Registry)

A collection of publicly-available SAST rules that you can download from, that can be filtered by language, OWASP bug class, severity, and so on. Many of these rules are open source, and you can also check the license of the rule you are using. Contributions are welcome. 

## Rule (Semgrep rule)

A rule is a specification of the patterns that Semgrep must match to the code to generate a finding. A rule is written in YAML. Without a rule, the engine has no instructions on how to match code.

Rules can be run on either Semgrep OSS Engine or Semgrep Pro Engine.

Findings 

## Taint analysis

definition

Semgrep's taint analysis provides additional mechanisms that can be used to write accurate rules. These include taint labels.

See also: sink, source.


## Fully-qualified name

A fully-qualified name refers to a name which uniquely identifies a class, method, type, or module. Languages such as C# and Ruby use `::` to distinguish between fully-qualified names and regular names.

