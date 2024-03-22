---
slug: tk
title: SAST and rule-writing glossary
hide_title: true
description: Definitions of static analysis terms related to Semgrep Code and Semgrep rule writing.
tags:
  - tk
---

# Semgrep Code, static analysis, and rule-writing glossary

The definitions provided here are specific to each term's meaning and use in Semgrep.

## Static analysis and rule-writing terms

### Constant propagation

Refers to state of a variable remaining constant throughout the program. Semgrep can analyze whether a variable carries a constant value at a given point. Both Semgrep OSS and Semgrep Pro Engine perform this analysis, with Semgrep Pro able to track the propagation across files.

You can write checks for constant propagation through the use of `pattern-not` in conjunction with `pattern` or `metavariable-comparison`.

It is enabled by default when writing rules and [can be disabled](/data-flow/constant-propagation/#disabling-constant-propagation).

### Cross-file analysis

Also known as **interfile analysis**. This analysis traces or tracks data and its transformations across files, such as when a variable is defined in one file but used in another.

Cross file analysis can be paired with taint analysis to detect unsanitized variables flowing from a source to a sink.

Also known as **interfile analysis**. Available in Semgrep Pro Engine.

### Cross-function analysis

This analysis traces or tracks data and its transformations across functions in a single file, such as when a globally-scoped variable is defined in one function but used in another.

Also known as **intrafile** or **interprocedural** analysis. Available in Semgrep Pro Engine.

### Error matrix

An error matrix is a 2x2 table that visualizes the performance of a Semgrep rule in relation to the findings it does or doesn't detect. It has two axes:

- Positive and negative
- True or false

These yield the following combinations:

<dl>
<dt>True positive</dt>
<dd>The rule detected a piece of code it was intended to find.</dd>
<dt>False positive</dt>
<dd>The rule detected a piece of code it was not intended to find.</dd>
<dt>True negative</dt>
<dd>The rule correctly skipped over a piece of code it wasn't meant to find.</dd>
<dt>False negative</dt>
<dd>The rule failed to detect a piece of code it should have found.</dd>
</dl>

Not to be confused with **risk matrices**.

### Finding

A finding is the core result of Semgrep's analysis. Findings are generated when a Semgrep rule matches a piece of code. Findings can be security issues, bugs, or code that doesn't follow coding conventions.

### Fully-qualified name

A fully-qualified name refers to a name which uniquely identifies a class, method, type, or module. Languages such as C# and Ruby use `::` to distinguish between fully-qualified names and regular names.

Not to be confused with **tokens**.

### Metavariable

A metavariable is an abstraction that lets you match something even when you don't know exactly what it is you want to match. It is similar to capture groups in regular expressions. All metavariables begin with a `$` and can only contain uppercase characters, digits, and underscores.

### Propagator

A propagator is any code that alters a piece of data as the data moves across the program. This includes functions, reassignments, and so on.

### Rule (Semgrep rule)

A rule is a specification of the patterns that Semgrep must match to the code to generate a finding. Rules are written in YAML. Without a rule, the engine has no instructions on how to match code.

Rules can be run on either Semgrep OSS Engine or Semgrep Pro Engine.

There are two types of rules: search and taint.

<dl>
<dt>Search rules</dt>
<dd>Rules default to this type. Search rules simply detect matches based on the patterns described by a rule.</dd>
<dt>Taint rules</dt>
<dd>Taint rules make use of Semgrep's taint analysis in addition to default search functionalities. Taint rules are able to specify sources, sinks, and propagators of data as well as sanitizers of that data. For more information, see Taint analysis documentation (tk link)</dd>
</dl>

<!-- how can we say that search rules are semantic if no analysis is performed on the value of data, such as variables? Or are there levels of semantic understanding that semgrep can perform? -->

### Sanitizers

### Single-file analysis

Also known as intrafile analysis. This refers to a tool's ability to trace or track data and its transformations across files, such as when a variable is defined in one file but used in another.

### Single-function analysis

Also known as intraprocedural analysis.

### Sink

In taint analysis,

### Source

In taint analysis,

### Taint analysis

definition

Semgrep's taint analysis provides additional mechanisms that can be used to write accurate rules. These include taint labels.

See also: sink, source.

<!-- ## Field sensitivity

### Index sensitivity -->


## Semgrep Code product terms

### Diff-aware scan

A diff-aware scan is a type of scan that scans changes in files starting from a certain git baseline. It is typically performed on feature branches when a pull or merge request is opened.

See also Full scan.

### Full scan

A full scan scans the entire codebase or git repository in its current state. It is typically performed on trunk or mainline branches, such as `master`. Semgrep, Inc. recommends scanning on a recurring basis, such as daily or weekly.

See also Diff-aware scan.

### Policy

A policy in Semgrep Code refers to the set of rules that Semgrep runs and the workflow actions undertaken when a rule from the policy generates a finding. A workflow action is an action that is performed by Semgrep when a finding is detected, such as notifying Slack channels or posting a comment in the PR or MR that generated the finding.

Not to be confused with **policy-as-code**.

### Registry (Semgrep Registry)

A collection of publicly-available SAST rules that you can download from. It can be filtered by language, OWASP bug class, severity, and so on. Many of these rules are open source, and you can also view the license of the rule you are using. Contributions are welcome. 

