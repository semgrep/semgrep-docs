# Semgrep Code (SAST) and rule-writing glossary

The definitions provided here are specific to the terms's meaning and use in Semgrep.

## Cross-file analysis

Also known as **interfile analysis**. This refers to a tool's ability to trace or track data and its transformations across files, such as when a variable is defined in one file but used in another.

Cross file analysis can be paired with taint analysis to detect unsanitized variables flowing from a source to a sink.

## Cross-function analysis

Also known as **intrafile** or **interprocedural** analysis.

## Finding

<!-- ## Field sensitivity

## Index sensitivity -->

## Metavariable

## Policy

A

## Sink

## Source

## Rule

## Taint analysis

Semgrep's taint analysis provides additional mechanisms that can be used to write accurate rules. These include taint labels.


## Fully-qualified name

A fully-qualified name refers to a name which uniquely identifies a class, method, type, or module. Languages such as C# and Ruby use `::` to distinguish between fully-qualified names and regular names.

