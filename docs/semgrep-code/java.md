---
slug: java
append_help_link: true
title: False positive reduction in Java
hide_title: true
description: Classes of false positives in the Java language that Semgrep Pro Engine can eliminate.
tags:
  - tk
---

# False positive reduction in Java through Semgrep Pro 

This document explains how Semgrep Pro Engine eliminates certain classes of false positives.

## Language features prevent injection through boolean and integer types 

Strong typing in Java, combined with its compile-time and runtime checks, ensures that an integer or boolean input cannot be exploited to perform injection-style attacks. Semgrep Pro can reduce false positives by leveraging these checks. The OSS Engine matches based on patterns, but the Pro Engine can detect boolean and integer values and mark these as untainted, or safe.

### Example rule: `int-bool-untainted`

<iframe title="tk" src="https://semgrep.dev/embed/editor?snippet=Ab0p8" width="100%" height="432px" frameBorder="0"></iframe>
**Figure**. `int-bool-untainted`. To view the entire sample code and rule, click **Open in Playground**.

This demo rule detects tainted data in `sink`. 

* This example has two true positives: **line 22** and **line 28**.
* Semgrep Pro is able to detect that **line 24 and 30 are false positives**. Semgrep OSS can't catch that distinction.
* Line 24 is a false positive because the data in the sink is an element of an integer List.
* Line 30 is a false positive because the data in the sink is a set of booleans.
* The Semgrep rule uses the fields `taint_assume_safe_booleans` and `taint_assume_safe_numbers` to tell the engine that these types are safe and not tainted. 

## Semgrep understands the Java standard library and APIs

Java provides a wide array of standard classes and methods across its various libraries. These facilitate programming by offering ready-to-use methods for common tasks. Many of these take string inputs, and return integer or boolean values. Thus, these statements returning integer or boolean values are not considered tainted. Semgrep is able to make that distinction, preventing this type of false positive. 

### Example rule: `sqli-demo-bool_doesnt_taint`

<iframe title="tk" src="https://semgrep.dev/embed/editor?snippet=Kx1AY" width="100%" height="432px" frameBorder="0"></iframe>

**Figure**. `sqli-demo-bool_doesnt_taint`. To view the entire sample code and rule, click **Open in Playground**.

This demo rule detects SQL injection through a `UserInputGenerator` class. This class's unsanitized user input is passed to `SQLQueryRunner`.

* This example has two true positives: **line 11** and **line 20**.
* Semgrep Pro is able to detect that **line 14 and 17 are false positives**. Semgrep OSS can't catch that distinction.
* Lines 14 and 17 are false positives because `input.endsWith("something")` and `input.indexOf('u')` return a boolean and integer respectively. Semgrep Pro is able to understand `endsWith` and `indexOf` Java methods.
* The Semgrep rule uses the fields `taint_assume_safe_booleans` and `taint_assume_safe_numbers` to tell the engine that these types are safe and not tainted. 




