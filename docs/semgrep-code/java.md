---
slug: java
append_help_link: true
title: Java
hide_title: true
description: Classes of false positives in the Java language that Semgrep Pro Engine can eliminate.
tags:
  - tk
---

# Semgrep Pro for Java

This document explains how Semgrep Pro Engine eliminates certain classes of false positives.

## Semgrep understands the Java standard library and APIs

Java provides a wide array of standard classes and methods across its various libraries. These facilitate programming by offering ready-to-use methods for common tasks. Many of these take string inputs, and return integer or boolean values. Thus, these statements returning integer or boolean values are not considered tainted. Semgrep is able to make that distinction, preventing this type of false positive. 

### Example rule: `sqli-demo-bool_doesnt_taint`

<iframe title="Semgrep example no prints" src="https://semgrep.dev/embed/editor?snippet=Kx1AY" width="100%" height="432px" frameBorder="0"></iframe>

**Figure**. `sqli-demo-bool_doesnt_taint`. To view the entire sample code and rule, click **Open in Playground**.

This demo rule detects SQL injection through a `UserInputGenerator` class. This class's unsanitized user input is passed to `SQLQueryRunner`.

* This example has two true positives: **line 11** and **line 20**.
* Semgrep Pro is able to detect that **line 14 and 17 are false positives**. Semgrep OSS can't catch that distinction.
* Line 14 and 17 are false positives because `input.endsWith("something")` and `input.indexOf('u')` return a boolean and integer respectively. Semgrep Pro is able to understand those Java methods.
* The Semgrep rule uses the fields `taint_assume_safe_booleans` and `taint_assume_safe_numbers` to tell the engine that these types are safe and not tainted. 

## Java's language features prevent injection through boolean and integer types 

Strong typing in Java, combined with its compile-time and runtime checks, ensures that an integer input cannot be exploited to perform injection-style attacks

