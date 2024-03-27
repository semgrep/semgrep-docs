---
slug: java
append_help_link: true
title: Semgrep Pro in Java
hide_title: true
description: How Semgrep Pro Engine can increase true positives and reduce false positives in the Java language.
tags:
  - tk
---

# Semgrep Pro performance in Java

<!-- False positive reduction in Java through Semgrep Pro -->

This document explains how Semgrep Pro Engine detects true positives and reduces false positives in Java.

Additionally, it provides several simple rule examples to illustrate the concepts and how you can make use of these Semgrep features when writing your own rules.

## Language features prevent injection through boolean and integer types 

Strong typing in Java, combined with its compile-time and runtime checks, reduces the likelihood that an integer or boolean input will be exploited to perform injection-style attacks. Semgrep Pro can reduce false positives by leveraging these checks.

The OSS Engine matches based on patterns, which can result in false positivies (FPs), but the Pro Engine can detect boolean and integer values and mark these as untainted, or safe, eliminating FPs.

### Example: `int-bool-untainted`

<iframe title="int-bool-untainted rule" src="https://semgrep.dev/embed/editor?snippet=r6rKR" width="100%" height="432px" frameBorder="0"></iframe>

**Figure**. `int-bool-untainted`. To view the entire sample code and rule, click **Open in Playground**.

This demo rule detects tainted data in `sink`. 

* This example has two true positives: **line 22** and **line 28**.
* Semgrep Pro is able to detect that **line 24 and 30 are false positives**. Semgrep OSS can't catch that distinction.
* Line 24 is a false positive because the data in the sink is an element of an integer list.
* Line 30 is a false positive because the data in the sink is an element in a set of booleans.
* The Semgrep rule uses the fields `taint_assume_safe_booleans` and `taint_assume_safe_numbers` to tell the engine that these types are safe and not tainted. 

## Semgrep understands the Java standard library and APIs

Java provides a wide array of standard classes and methods across its various libraries. These facilitate programming by offering ready-to-use methods for common tasks. Many of these take string inputs, and return integer or boolean values. Thus, these statements returning integer or boolean values are not considered tainted. Semgrep is able to make that distinction, preventing this type of false positive. 

### Example: `sqli-demo-bool_doesnt_taint`

<iframe title="sqli-demo-bool_doesnt_taint" src="https://semgrep.dev/embed/editor?snippet=Kx1AY" width="100%" height="432px" frameBorder="0"></iframe>

**Figure**. `sqli-demo-bool_doesnt_taint`. To view the entire sample code and rule, click **Open in Playground**.

This demo rule detects SQL injection through a `UserInputGenerator` class. This class's unsanitized user input is passed to `SQLQueryRunner`.

* This example has two true positives: **line 11** and **line 20**.
* Semgrep Pro is able to detect that **line 14 and 17 are false positives**. Semgrep OSS can't catch that distinction.
* Lines 14 and 17 are false positives because `input.endsWith("something")` and `input.indexOf('u')` return a boolean and integer respectively. Semgrep Pro is able to understand `endsWith` and `indexOf` Java methods.
* The Semgrep rule uses the fields `taint_assume_safe_booleans` and `taint_assume_safe_numbers` to tell the engine that these types are safe and not tainted. 

## Target code in a parent class and its subclasses

Semgrep supports class inheritance in Java. You can use Semgrep to search across all subclasses. This specificity means that rules can better target your codebase, increasing true positive rates. This is achieved through the `metavariable-type` field, which can accept the name of any user-defined class. 

The `metavariable-type` field is available in Semgrep OSS. However, classes in Java are frequently defined across files (interfile), which is beyond the scope of Semgrep OSS's analysis. Use Semgrep Pro to perform cross-file analysis to ensure that Semgrep can detect all class and subclass definitions.

### Example: `detect-pattern-in-subclass`

<iframe title="detect-pattern-in-subclass" src="https://semgrep.dev/embed/editor?snippet=nJjjG" width="100%" height="432px" frameBorder="0"></iframe>

**Figure**. `detect-pattern-in-subclass`. To view the entire sample code and rule, click **Open in Playground**.

This demo rule detects patterns in instances of the user-defined parent class `Foo` and its subclasses.

- This example has two true positives: **line 10** and **line 25**.
- The `patterns` array initially defines a `pattern: $CLASS.x`.
    - **Line 17**, `baz.x` fulfills this pattern.
    - However, the `metavariable-type` specifies a `type` of `Foo`.
    - This specification narrows the match to **line 10** because `Bar` is a subclass of `Foo`, and **line 25**, which is an instance of the Foo object itself.

## Semgrep supports field sensitivity

todo: Check with SME for explanation of field / index sensitivity specific to Semgrep

<iframe title="tk" src="https://semgrep.dev/embed/editor?snippet=yyjpR" width="100%" height="432px" frameBorder="0"></iframe>
