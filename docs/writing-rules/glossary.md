---
slug: glossary
title: SAST and rule-writing glossary
hide_title: true
description: Definitions of static analysis and Semgrep rule-writing terms.
tags:
  - Rule writing
---

# Static analysis and rule-writing glossary

The definitions provided here are specific to each term's meaning and use in Semgrep.

## Constant propagation

<!-- Refers to state of a variable remaining constant throughout the program. Semgrep can analyze whether a variable carries a constant value at a given point. Both Semgrep OSS and Semgrep Pro Engine perform this analysis, with Semgrep Pro able to track the propagation across files. -->

Constant propagation is a type of analysis where values known to be constant are substituted in later uses. Semgrep can perform constant propagation across files, unless you are running Semgrep OSS, which can only propagate within a function.

Constant propagation is applied to all rules unless [it is disabled](/data-flow/constant-propagation/#disabling-constant-propagation).

For example, given the following code:

```javascript showLineNumbers
var x = 2;
console.log(x);
```
The pattern operator `pattern: print(2)` tells Semgrep to match line 2 because it propagates the value `2` from the assignment in line 1 to the `console.log()` function in line.

Constant propagation is one of the many analyses that differentiate Semgrep from grep.

## Cross-file analysis

Also known as **interfile analysis**. Cross-file analysis takes into account how information flows between files. In particular, cross-file analysis includes **cross-file taint analysis**, which tracks unsanitized variables flowing from a source to a sink through arbitrarily many files. Other analyses performed across files include constant propagation and type inference.

Cross-file analysis is usually used in contrast to intrafile or per-file analysis, where each file is analyzed as a standalone block of code. 

Semgrep OSS is limited to per-file analysis.

## Cross-function analysis

Cross-function analysis means that interactions between functions are taken into account. This improves taint analysis, which tracks unsanitized variables flowing from a source to a sink through arbitrarily many functions.

For the purpose of its usage in Semgrep, cross-function analysis implies intrafile or per-file analysis. Each file is still analyzed as a standalone block, but within the file it takes into account how information flows between functions.

Also known as **interprocedural** or **intrafile** analysis.

## Error matrix

An error matrix is a 2x2 table that visualizes the findings of a Semgrep rule in relation to the vulnerable lines of code it does or doesn't detect. It has two axes:

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

## Finding

A finding is the core result of Semgrep's analysis. Findings are generated when a Semgrep rule matches a piece of code. Findings can be security issues, bugs, or code that doesn't follow coding conventions.

## Fully qualified name

A **fully qualified name** refers to a name which uniquely identifies a class, method, type, or module. Languages such as C# and Ruby use `::` to distinguish between fully qualified names and regular names.

Not to be confused with **tokens**.

## l-value (left-, or location-value)

An expression that denotes an object in memory; a memory location, something that you can use in the left-hand side (LHS) of an assignment. For example, `x` and `array[2]` are l-values, but `2+2` is not.

## Metavariable

A metavariable is an abstraction that lets you match something even when you don't know exactly what it is you want to match. It is similar to capture groups in regular expressions. All metavariables begin with a `$` and can only contain uppercase characters, digits, and underscores.

## Propagator

A propagator is any code that alters a piece of data as the data moves across the program. This includes functions, reassignments, and so on.

When you write rules that perform taint analysis, propagators are pieces of code that you specify through the `pattern-propagator` key as code that always passes tainted data. This is especially relevant when Semgrep performs intraprocedural taint analysis, as there is no way for Semgrep to infer or guess which lines of code propagate taint. Thus, explicitly listing propagators is the only way for Semgrep to know if tainted data could be passed within your function.

## Rule (Semgrep rule)

A rule is a specification of the patterns that Semgrep must match to the code to generate a finding. Rules are written in YAML. Without a rule, the engine has no instructions on how to match code.

Rules can be run on either Semgrep OSS Engine or Semgrep Pro Engine.

There are two types of rules: search and taint.

<dl>
<dt>Search rules</dt>
<dd>Rules default to this type. Search rules detect matches based on the patterns described by a rule. There are several semantic analyses that search rules perform, such as:
    <ul>
    <li>Interpreting syntactically different code as semantically equivalent</li>
    <li>Constant propagation</li>
    <li>Matching a fully qualified name to its reference in the code, even when not fully qualified</li>
    <li>Type inference, particularly when using typed metavariables</li>
    </ul>
</dd>
<dt>Taint rules</dt>
<dd>Taint rules make use of Semgrep's taint analysis in addition to default search functionalities. Taint rules are able to specify sources, sinks, and propagators of data as well as sanitizers of that data. For more information, see <a href="/writing-rules/data-flow/taint-mode/">Taint analysis documentation</a></dd>
</dl>

<!-- how can we say that search rules are semantic if no analysis is performed on the value of data, such as variables? Or are there levels of semantic understanding that semgrep can perform? -->

## Sanitizers

A sanitizer is any piece of code, such as a function or [a cast](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/types/casting-and-type-conversions#explicit-conversions), that can clean untrusted or tainted data. Data from untrusted sources, such as user inputs, may be tainted with unsafe characters. Sanitizers ensure that unsafe characters are removed or stripped from the input.

An example of a sanitizer is the [<i class="fas fa-external-link fa-xs"></i> `DOMPurify.sanitize(dirty);`](https://github.com/cure53/DOMPurify) function from the  DOMPurify package in JavaScript.

## Single-file analysis

Also known as intrafile analysis. This refers to a tool's ability to trace or track the flow of information, such as when a variable is defined in one function but used in another.

## Single-function analysis

Also known as intraprocedural analysis. This refers to a tool's ability to trace or track data and its transformations within a single function.

## Sink

In taint analysis, a sink is any vulnerable function that is called with potentially tainted or unsafe data.

## Source

In taint analysis, a source is any piece of code that assigns or sets tainted data, typically user input.

## Taint analysis

Taint analysis tracks and traces the flow of untrusted or unsafe data. Data coming from sources such as user inputs could be unsafe and used as an attack vector if these inputs are not sanitized. Taint analysis provides a means of tracing that data as it moves through the program from untrusted sources to vulnerable functions.
