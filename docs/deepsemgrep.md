---
slug: deepsemgrep
append_help_link: true
description: "This document provides an overview of DeepSemgrep use cases, such as its use in type inferences, class inheritance, constant propagation, taint analysis."
---

import MoreHelp from "/src/components/MoreHelp"

# DeepSemgrep

## Introduction

Improve your scan results for entire codebases with interfile coding paradigms using DeepSemgrep instead of Semgrep's regular intrafile (within-a-single-file) approach. DeepSemgrep empowers you to easily scan whole repositories that have object-oriented programming paradigms with classes in different files to find vulnerabilities in your code. DeepSemgrep is a proprietary extension of free and open source Semgrep which leverages global analysis tools, and uses the same rules as Semgrep. 

This document demonstrates the utility of DeepSemgrep through use cases, guiding you through examples of Semgrep rules. Both Semgrep rules and code on which rules are tested are marked as code snippets and introduced always as a rule, code, or file used to illustrate the capabilities of DeepSemgrep.

### DeepSemgrep language support

DeepSemgrep now offers alpha support for Java, JavaScript/TypeScript.

## Installing DeepSemgrep

To enable DeepSemgrep installation, schedule a product demo by following these steps:

1. Submit your email using the [DeepSemgrep beta form](https://semgrep.dev/deep-semgrep-beta).
1. Follow the steps and instructions in the email you receive from the Semgrep team and schedule a product demo.

After your product demo, you'll get access to a new ruleset! Follow the instructions below to get your findings.

:::info Prerequisite
- Local installation of Semgrep CLI. See [Getting started with Semgrep CLI](/getting-started) to install Semgrep CLI.
:::

To install DeepSemgrep, follow these steps:

1. Log in to Semgrep CLI with the following command:
    ```sh
    semgrep login
    ```
1. Follow the link that Semgrep printed in the command-line.
1. To install DeepSemgrep, use the following command:
    ```sh
    semgrep install-deep-semgrep
    ```
1. To test DeepSemgrep, use the following command:
    ```bash
    semgrep --deep --config "p/deepsemgrep" --dataflow-traces
    ```
    The `p/deepsemgrep` is a DeepSeemgrep-specific ruleset to which you gained access after your product demo.
1. Optional: We appreciate your help gathering data as we improve DeepSemgrep! If you are fine with sending r2c usage metrics, run the command with `--time --metrics on`:
    ```bash
    semgrep --deep --config "p/deepsemgrep" --dataflow-traces --time --metrics on
    ```
    See [Semgrep Privacy Policy](/metrics) for details of what is being sent to r2c.

:::note
Let us know what you think about the results in the <a href="https://r2c.dev/slack">Community Slack</a>.
:::

### Cloning the DeepSemgrep testing repository

DeepSemgrep’s full value is achieved when scanning with more files. Semgrep’s usual embedded code examples are not useful for demonstrating the capabilities of DeepSemgrep because embedded code from Semgrep App only displays one rule and one test file at a time.

To learn by doing, use DeepSemgrep while reading this documentation. Follow this document while testing code examples in the [DeepSemgrep testing repository](https://github.com/returntocorp/deep-semgrep-tests).

To find code examples used in this document, go to `docs` directory in the DeepSemgrep testing code repository. To see the difference between findings of DeepSemgrep compared to Semgrep, in each directory under `docs` run `semgrep --config deep.yaml` (obtain Semgrep findings) and then `semgrep --config deep.yaml . --deep` (obtain DeepSemgrep findings).

## Type inference and class inheritance

### Class inheritance

This section compares the possible findings of a scan across multiple files using Semgrep and DeepSemgrep. The file `app.java` includes two check functions that throw exceptions. This example looks for methods that throw a particular exception, `ExampleException`.

<iframe title="Semgrep example no prints"src="https://semgrep.dev/embed/editor?snippet=adamkvitek:throw-exception-example" width="100%" height="432" frameborder="0"></iframe>

When using this rule, Semgrep matches code that throws `ExampleException` but not `BadRequest`. Check other files in the `docs/class_inheritance` directory. In the context of all files, you can find that this match does **not** capture the whole picture. The `BadRequest` extends `ExampleException`:

File `example_exception.java`:
```java
package example;

public class ExampleException extends Exception {

    public ExampleException(String exception) {
        super(exception);
    }
}
```

File `bad_request.java`:
```java
package example; 

class BadRequest extends ExampleException {
  public BadRequest(String exception) {
    super(exception);
  }
}
```

Where `ExampleException` is thrown, we also want to find `BadRequest`, because `BadRequest` is a child of `ExampleException`. Unlike Semgrep, DeepSemgrep can find `BadRequest`. Since DeepSemgrep uses information from all the files in the directory it scans, it detects `BadRequest` and finds both thrown exceptions.
 
If you are following in the cloned [DeepSemgrep testing repository](https://github.com/returntocorp/deep-semgrep-tests), in the `docs/class_inheritance` directory, try the following commands to test the difference:

1. Run Semgrep:
    ```sh
    semgrep --config deep.yaml .
    ```
2. Run DeepSemgrep:
    ```sh
    semgrep --config deep.yaml . --deep --dataflow-traces
    ```

### Using class inheritance with typed metavariables

DeepSemgrep uses interfile class inheritance information when matching [typed metavariables](https://semgrep.dev/docs/writing-rules/pattern-syntax/#typed-metavariables). Continuing the example from the previous section, see the following example file, which has defined some exceptions and includes their logging:

<iframe title="Semgrep example no prints" src="https://semgrep.dev/embed/editor?snippet=adamkvitek:log-exception-example1-copy" width="100%" height="432" frameborder="0"></iframe>

The rule searches for any variable of type `ExampleException` being logged. Semgrep is **not** able to find instances of `BadRequest` being logged, unlike DeepSemgrep. Allowing typed metavariables to access information from the entire program enables users to query any variable for its type and use that information in conjunction with the rest of the code resulting in more accurate findings.

:::note
For a more realistic example where typed metavariables are used, see the following [rule written by Semgrep community](https://semgrep.dev/playground/s/chegg:log4j2_tainted_argument) to find code vulnerable to the log4j vulnerability.
:::

Try to run DeepSemgrep in the cloned [DeepSemgrep testing repository](https://github.com/returntocorp/deep-semgrep-tests). Go to `docs/class_inheritance_with_typed_metavariables` and run the following command:

```sh
semgrep --config deep.yaml . --deep
```

## Constant propagation

### Finding dangerous calls

[Constant propagation](https://semgrep.dev/docs/writing-rules/pattern-syntax/#constants) provides a syntax for eliminating false positives in Semgrep rules. Even if a variable is set to a constant before being used in a function call several lines below, Semgrep knows that it must have that value and matches the function call. For example, this rule looks for non-constant values passed to the `dangerous` function:

<iframe title="Semgrep example no prints" src="https://semgrep.dev/embed/editor?snippet=adamkvitek:dangerous-call" width="100%" height="432" frameborder="0"></iframe>

Semgrep matches the first and second calls because Semgrep cannot find a constant value for either `user_input` or `EMPLOYEE_TABLE_NAME`.

Now consider an example a bit more complicated to illustrate what DeepSemgrep can do. If the `EMPLOYEE_TABLE_NAME` is imported from a global constants file with the following content:

Global constants file:
```java
package com.main;

public final class Constants {
    public static final double PI = 3.14159;
    public static final double PLANCK_CONSTANT = 6.62606896e-34;
    public static final String EMPLOYEE_TABLE_NAME = "Employees";
}
```

DeepSemgrep matches the first call without any change to the rule.

Try to run DeepSemgrep in the cloned [DeepSemgrep testing repository](https://github.com/returntocorp/deep-semgrep-tests). Go to `docs/constant_propagation_dangerous_calls` and run the following command:

```sh
semgrep --config deep.yaml . --deep
```

### Propagating values

In the previous example, we only cared whether the string was constant or not, so we used `”...”`, but constant propagation also propagates the constant value. To illustrate the use of DeepSemgrep with constant propagation, the rule from the previous section is changed to search for calls to `dangerous("Employees");`.

<iframe title="Semgrep example no prints" src="https://semgrep.dev/embed/editor?snippet=adamkvitek:propagating-values" width="100%" height="432" frameborder="0"></iframe>

With DeepSemgrep, this rule matches the last three calls to `dangerous`, since these calls are selected from the `Employees` table, though each one obtains the table name differently:

Try to run DeepSemgrep in the cloned [DeepSemgrep testing repository](https://github.com/returntocorp/deep-semgrep-tests). Go to `docs/constant_propagation_propagating_values` and run the following command:

```sh
semgrep --config deep.yaml . --deep
```

## Taint tracking

Semgrep allows you to search for the flow of any potentially exploitable input into an important sink using taint mode. For more information, see [taint mode](https://semgrep.dev/docs/writing-rules/data-flow/taint-mode/) documentation.

To continue with the previous example, we have modified our previous files a bit. Semgrep is searching for dangerous calls using data obtained by calling `get_user_input`. The rule does this by specifying the source of taint as `get_user_input(...)` and the sink as `dangerous(...);`.

<iframe title="Semgrep example no prints" src="https://semgrep.dev/embed/editor?snippet=adamkvitek:dangerous-taint" width="100%" height="432" frameborder="0"></iframe>

Here, Semgrep matches `dangerous(“Select * from “ + user_input)`, because `user_input` is obtained by calling `get_user_input`. However, it does not match the similar call using `still_user_input`, because its analysis does not cross function boundaries to know that `still_user_input` is a wrapper function for `user_input`.

DeepSemgrep matches both dangerous calls, because it does cross function boundaries. In fact, with DeepSemgrep, the taint rule can track calls to `get_user_input` over multiple jumps in multiple files.

Try to run DeepSemgrep in the cloned [DeepSemgrep testing repository](https://github.com/returntocorp/deep-semgrep-tests). Go to `docs/taint_tracking` and run the following command:

```sh
semgrep --config deep.yaml . --deep
```

## Appendix

### Difference between DeepSemgrep and join mode

DeepSemgrep is different from [join mode](/writing-rules/experiments/join-mode/overview/), which also allows you to perform interfile analyses by letting you join on the metavariable matches in separate rules.

### Future development of DeepSemgrep

We’re excited to hear what’s on your mind. As users explore the limits of DeepSemgrep, we want to know what they’re failing to express. We believe that interfile type inference, constant propagation, and taint tracking combined allow users to express most restrictions on a program and enforce them quickly.

<MoreHelp />