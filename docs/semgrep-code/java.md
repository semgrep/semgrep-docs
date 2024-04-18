---
slug: java
append_help_link: true
title: Semgrep Pro in Java
hide_title: true
description: Semgrep Pro Engine features for the Java language that can increase true positives and reduce false positives.
tags:
  - Semgrep Code
---

# Semgrep Pro performance in Java

This document explains how Semgrep Pro Engine detects true positives and reduces false positives in Java.

Additionally, it provides several simple rule examples to illustrate the concepts and how you can make use of these Semgrep features when writing your own rules.

:::tip
The code examples shown here are best viewed in **a separate Semgrep Playground tab** so that you can see the <span style={{backgroundColor: '#b968ff'}}><i class="fa-regular fa-star"></i></span> purple star outline. This star marks the lines that contain false positives and are correctly identified and removed by Semgrep Pro Engine.
:::

## Language features that prevent injection through Boolean and integer types

Strong typing in Java, combined with its compile-time and runtime checks, reduces the likelihood that an integer or Boolean input will be exploited to perform injection-style attacks. Semgrep Pro can reduce false positives by leveraging these checks.

The Semgrep OSS Engine matches based on patterns, which can result in false positives (FPs), but the Pro Engine can detect Boolean and integer values and mark these as untainted, or safe, eliminating FPs.

### Example: `int-bool-untainted`

The following demo rule and code sample detects tainted data in `sink()`.

```yaml showLineNumbers
# Semgrep rule
rules:
  - id: int-bool-untainted
    languages:
      - java
    severity: WARNING
    options:
      interfile: true
      taint_assume_safe_booleans: true
      taint_assume_safe_numbers: true
    mode: taint
    message: Test
    pattern-sources:
      - patterns:
          - pattern-inside: |
              class $C {
                $T $M(..., $A, ...) {
                  ...
                }
              }
          - focus-metavariable: $A
    pattern-sinks:
      - pattern: sink(...)
```

```java showLineNumbers
class Foo {
  String x;
  List<Integer> ids;

  public List<Integer> getIds() {
    return ids;
  }
}

class Bar {
  String y;
  Set<Boolean> flags;

  public Set<Boolean> getFlags() {
    return flags;
  }
}

class Test {
  public void test1(Foo foo) {
      //ruleid: int-bool-untainted
      //highlight-next-line
      sink(foo.x);
      //OK: int-bool-untainted
      sink(foo.getIds().get(0));
  }
  public void test2(Bar bar) {
      //ruleid: int-bool-untainted
      //highlight-next-line
      sink(bar.y);
      //OK: int-bool-untainted
      sink(bar.getFlags().get(0));
  }
}
```

**Figure**. `int-bool-untainted`. [<i class="fas fa-external-link fa-xs"></i> Open in interactive Playground](https://semgrep.dev/playground/s/r6rKR).

* This example has two true positives: **line 22** and **line 28**.
* Semgrep Pro is able to detect that **line 24 and 30 are false positives**. Semgrep OSS can't catch that distinction.
    * Line 24 is a false positive because the data in the sink is an element of an integer list.
    * Line 30 is a false positive because the data in the sink is an element in a set of Boolean values.
* The Semgrep rule uses the fields `taint_assume_safe_booleans` and `taint_assume_safe_numbers` to tell the engine that these types are safe and not tainted.

## Semgrep understands the Java standard library and APIs

Java provides a wide array of standard classes and methods across its various libraries. These facilitate programming by offering ready-to-use methods for common tasks. Many of these take string inputs, and return integer or Boolean values. Thus, these statements returning integer or Boolean values are not considered tainted. Semgrep is able to make that distinction, preventing this type of false positive.

### Example: `sqli-demo-bool_doesnt_taint`

<!-- <iframe title="sqli-demo-bool_doesnt_taint" src="https://semgrep.dev/embed/editor?snippet=Kx1AY" width="100%" height="432px" frameBorder="0"></iframe> -->

This demo rule detects SQL injection through a `UserInputGenerator` class. The class's unsanitized user input is passed to `SQLQueryRunner`.

```yaml showLineNumbers
# Semgrep rule
rules:
  - id: sqli-demo-bool_doesnt_taint
    message: Found SQLi
    languages:
      - java
    severity: WARNING
    mode: taint
    options:
      taint_assume_safe_booleans: true
      taint_assume_safe_numbers: true
      interfile: true
    pattern-sources:
      - pattern: |
          (UserInputGenerator $X).getUserInput(...)
    pattern-sinks:
      - pattern: |
          (SQLQueryRunner $X).run(...)
```

```java showLineNumbers
public class Test {
  // Run with `javac Test.java && java Test`
  public static void main(String[] args) {
    SQLQueryRunner runner = new SQLQueryRunner();
    String input = new UserInputGenerator().getUserInput();

    // safe
    runner.run("SELECT * from table");

    //ruleid:sqli-demo-bool_dont_taint
    //highlight-next-line
    runner.run("SELECT * from " + input);

    //ok:sqli-demo-bool_dont_taint
    runner.run("SELECT * from table" + input.endsWith("something"));

    //ok:sqli-demo-bool_dont_taint
    runner.run("SELECT * from table" + input.indexOf('u'));

    //ruleid:sqli-demo-bool_dont_taint
    //highlight-next-line
    runner.run("SELECT * from " + input.substring(0));
  }
}

class UserInputGenerator {
  public String getUserInput() {
    return "fake user input";
  }
}

class SQLQueryRunner {
  public void run(String query) {
    System.out.println("Would have run query:");
    System.out.println(query);
  }
}
```

**Figure**. `sqli-demo-bool_doesnt_taint`. [<i class="fas fa-external-link fa-xs"></i> Open in interactive Playground](https://semgrep.dev/playground/s/Kx1AY).


* This example has two true positives: **line 11** and **line 20**.
* Semgrep Pro is able to detect that **line 14 and 17 are false positives**. Semgrep OSS can't catch that distinction.
    * Lines 14 and 17 are false positives because `input.endsWith("something")` and `input.indexOf('u')` return a Boolean and integer respectively. Semgrep Pro is able to understand `endsWith` and `indexOf` Java methods.
* The Semgrep rule uses the fields `taint_assume_safe_booleans` and `taint_assume_safe_numbers` to tell the engine that these types are safe and not tainted.

## Semgrep targets code in a parent class and its subclasses

Semgrep supports class inheritance in Java. You can use Semgrep to search across all subclasses. This specificity means that rules can better target your codebase, increasing true positive rates. This is achieved through the `metavariable-type` field, which can accept the name of any user-defined class.

The `metavariable-type` field is available in Semgrep OSS. However, classes in Java are frequently defined across files (interfile), which is beyond the scope of Semgrep OSS's analysis. Use Semgrep Pro to perform cross-file analysis to ensure that Semgrep can detect all class and subclass definitions.

### Example: `detect-pattern-in-subclass`

<!-- <iframe title="detect-pattern-in-subclass" src="https://semgrep.dev/embed/editor?snippet=nJjjG" width="100%" height="432px" frameBorder="0"></iframe> -->

**Figure**. `detect-pattern-in-subclass`. To view the entire sample code and rule, click **Open in Playground**.

This demo rule detects patterns in instances of the user-defined parent class `Foo` and its subclasses.

- This example has two true positives: **line 10** and **line 25**.
- The `patterns` array initially defines a `pattern: $CLASS.x`.
    - **Line 17**, `baz.x` fulfills this pattern.
    - However, the `metavariable-type` specifies a `type` of `Foo`.
    - This specification narrows the match to **line 10** because `Bar` is a subclass of `Foo`, and **line 25**, which is an instance of the `Foo` object itself.

## Semgrep supports field and index sensitivity

Field sensitivity means that Semgrep can track taint for each field of an object independently. Given an object `C` with properties `C.x` and `C.y`, if `C.x` is tainted, then Semgrep does **not** automatically mark `C.y` as tainted.

Similarly, index sensitivity means that Semgrep can track taint for each element of an array independently.

### Example: `unsafe-sql-concatenation-in-method-taint-field-sensitivity`

<iframe title="unsafe-sql-concatenation-in-method-taint-field-sensitivity" src="https://semgrep.dev/embed/editor?snippet=OrAwe" width="100%" height="432px" frameBorder="0"></iframe>

**Figure**. `unsafe-sql-concatenation-in-method-taint-field-sensitivity`. To view the entire sample code and rule, click **Open in Playground**.

This demo rule detects that `C.x` is tainted by way of the `injection` variable. It is able to differentiate `C.y` as untainted.

- This example has one true positive on **line 21** and one true negative on **line 24**.
- **Line 15** of the rule tells Semgrep to match for the following pattern:
  ```yaml
  pattern: |
    $X(..., $SRC, ...) { ... }
    focus-metavariable: $SRC
  ```
  - This matches `private void LoggerTruePositives(String injection)`, specifically the `injection` variable in the sample code.
- The value of the injection variable is passed to `C.x`, thus, `C.x` is tainted, but `C.y` is not.
