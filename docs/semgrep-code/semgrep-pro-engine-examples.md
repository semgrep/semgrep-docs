---
slug: semgrep-pro-engine-examples
append_help_link: true
description: "This document provides an overview of Semgrep cross-file analysis use cases."
toc_max_heading_level: 5
---

# Cross-file analysis examples

This document provides an overview of Semgrep's proprietary cross-file (interfile) and cross-function (intrafile) taint analysis features through specific examples, such as its use in type inferences, class inheritance, constant propagation, and taint analysis.

Differences between Semgrep and Semgrep OSS can be observed by viewing the examples in separate Playground tabs. See the following section for more information.

Note that Semgrep cross-file analysis implies cross-function analysis as well.

## Tips and tricks for an interactive experience

The following resources can help you test the code in the sections below. As you work through the examples in this document, try the following:

- Ensure that the **<i class="fa-solid fa-gem"></i> Pro** toggle is enabled on the [Playground](https://semgrep.dev/playground/new) page.
  - Rules that make use of interfile analysis require the `interfile: true` key included under the `options` key.
  - On the Playground, true positives that are detected by Semgrep's cross-file analysis are marked with a **purple star: <span style={{color: '#b968ff'}}><i class="fa-solid fa-star"></i></span>**.
- Clone the [Semgrep cross-file analysis testing repository](https://github.com/semgrep/semgrep-pro-tests):
  ```sh
  git clone https://github.com/semgrep/semgrep-pro-tests
   ```
  - Follow the instructions in the subsequent sections of this document using this testing repository. To run Semgrep in the cloned testing repository with cross-file (interfile) analysis, enter:
    ```sh
    semgrep --pro --config=pro.yaml .
    ```

## Taint tracking

Semgrep OSS allows you to search for the flow of any potentially exploitable input into an important sink using taint mode. For more information, see the [taint mode](/writing-rules/data-flow/taint-mode) documentation.

In the examples below, see a comparison of Semgrep and Semgrep OSS  while searching for dangerous calls using data obtained `get_user_input` call. The rule does this by specifying the source of taint as `get_user_input(...)` and the sink as `dangerous(...);`.

### Java

Semgrep matches `dangerous(“Select * from “ + user_input)`, because `user_input` is obtained by calling `get_user_input`. However, on Semgrep OSS, it does not match the similar call using `still_user_input`, because its analysis does not cross function boundaries to know that `still_user_input` is a wrapper function for `user_input`.

<iframe title="Semgrep example no prints" src="https://semgrep.dev/embed/editor?snippet=Ab0Zp" width="100%" height="432" frameborder="0"></iframe>

Semgrep matches both dangerous calls because it does cross function boundaries. In fact, the taint rule can track calls to `get_user_input` over multiple jumps in multiple files.

:::tip Try it out
- Turn on the **<i class="fa-solid fa-gem"></i> Pro** toggle in the following link to an [example of dangerous taint](https://semgrep.dev/playground/s/J0dQ) rule.
- To run Semgrep in the cloned [testing repository](https://github.com/semgrep/semgrep-pro-tests), go to `docs/taint_tracking/java` and run the following command:
  ```sh
  semgrep --config pro.yaml . --pro
  ```
:::

### JavaScript and TypeScript

Here, Semgrep OSS matches `dangerous(“Select * from “ + user_input)`, because `user_input` is obtained by calling `get_user_input`. However, Semgrep OSS does not match the similar call using `still_user_input`, because its analysis does not cross function boundaries to know that `still_user_input` is a wrapper function for `user_input`.

<iframe title="Semgrep example no prints" src="https://semgrep.dev/embed/editor?snippet=kO41" width="100%" height="432" frameborder="0"></iframe>

Semgrep matches both dangerous calls because it does cross function boundaries. In fact, with Semgrep Pro, the taint rule can track calls to `get_user_input` over multiple jumps in multiple files.

You can run JavaScript examples in your cloned [Semgrep testing repository](https://github.com/semgrep/semgrep-pro-tests) by going to `docs/taint_tracking/javascript` and running the following command:

```sh
semgrep --config pro.yaml . --pro
```

#### ES6 and CommonJS

The JavaScript and TypeScript ecosystems contain various ways for importing and exporting code. Semgrep can track dataflow through ES6 imports or exports and some CommonJS export paths. See [Known limitations of cross file analysis](/semgrep-code/semgrep-pro-engine-intro#known-limitations-of-cross-file-analysis).

##### ES6

Semgrep can track data through the definition of exports for ES6:

```js
export function readUser() {
    return get_user_input("example")
}
```

Semgrep can follow the dataflow when it is imported into another location:

```js
import { readUser } from "./es6/es6";

readUser()
```

##### CommonJS

Semgrep can track data through the definition of exports for CommonJS when the function is defined inline:

```js
module.exports = function get_user() {
    return get_user_input("example")
}
```
Semgrep is able to follow the dataflow when it is required in another location:

```js
const readUser = require("./commonjs/common")
readUser()
```

You can run examples in your cloned [Semgrep testing repository](https://github.com/semgrep/semgrep-pro-tests) by going to `docs/taint_tracking/imports` and running the following command:
```sh
semgrep --config pro.yaml . --pro
```

## Type inference and class inheritance

### Class inheritance

This section compares the possible findings of a scan across multiple files using Semgrep OSS and Semgrep. The file `app.java` includes two check functions that throw exceptions. This example looks for methods that throw a particular exception, `ExampleException`.

<iframe title="Semgrep example no prints"src="https://semgrep.dev/embed/editor?snippet=yOYk" width="100%" height="432" frameborder="0"></iframe>

When using this rule, Semgrep OSS matches code that throws `ExampleException` but not `BadRequest`. Check other files in the `docs/class_inheritance` directory. In the context of all files, you can find that this match does **not** capture the whole picture. The `BadRequest` extends `ExampleException`:

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

Where `ExampleException` is thrown, it is also good to find `BadRequest`, because `BadRequest` is a child of `ExampleException`. Unlike Semgrep OSS, Semgrep can find `BadRequest`. Since Semgrep uses information from all the files in the directory it scans, it detects `BadRequest` and finds both thrown exceptions.

If you are following along with the cloned [Semgrep testing repository](https://github.com/semgrep/semgrep-pro-tests), in the `docs/class_inheritance` directory, try the following commands to test the difference:

1. Run Semgrep OSS:
    ```sh
    semgrep --config pro.yaml .
    ```
2. Run Semgrep:
    ```sh
    semgrep --config pro.yaml . --pro
    ```

### Using class inheritance with typed metavariables

Semgrep uses cross-file class inheritance information when matching [typed metavariables](/writing-rules/pattern-syntax/#typed-metavariables). Continuing the example from the previous section, see the following example file, which has defined some exceptions and includes their logging:

<iframe title="Semgrep example no prints" src="https://semgrep.dev/embed/editor?snippet=14bk" width="100%" height="432" frameborder="0"></iframe>

The rule searches for any variable of type `ExampleException` being logged. Semgrep OSS is **not** able to find instances of `BadRequest` being logged, unlike Semgrep. Allowing typed metavariables to access information from the entire program enables users to query any variable for its type and use that information in conjunction with the rest of the code resulting in more accurate findings.

:::note
For a more realistic example where typed metavariables are used, see the following [rule written by the Semgrep community](https://semgrep.dev/playground/s/o9l6) to find code vulnerable to the log4j vulnerability.
:::

To test this example in the cloned [Semgrep testing repository](https://github.com/semgrep/semgrep-pro-tests), run Semgrep by going to `docs/class_inheritance_with_typed_metavariables` and entering the following command:

```sh
semgrep --config pro.yaml . --pro
```

## Constant propagation

### Finding dangerous calls

[Constant propagation](/writing-rules/pattern-syntax/#constants) provides a syntax for eliminating false positives in Semgrep rules. Even if a variable is set to a constant before being used in a function call several lines below, Semgrep knows that it must have that value and matches the function call. For example, this rule looks for non-constant values passed to the `dangerous` function:

#### Java

<iframe title="Semgrep example no prints" src="https://semgrep.dev/embed/editor?snippet=XK9N" width="100%" height="432" frameborder="0"></iframe>

Semgrep OSS matches the first and second calls as it cannot find a constant value for either `user_input` or `EMPLOYEE_TABLE_NAME`.

Now consider an example a bit more complicated to illustrate what Semgrep can do. If the `EMPLOYEE_TABLE_NAME` is imported from a global constants file with the following content:

Global constants file:
```java
package com.main;

public final class Constants {
    public static final double PI = 3.14159;
    public static final double PLANCK_CONSTANT = 6.62606896e-34;
    public static final String EMPLOYEE_TABLE_NAME = "Employees";
}
```

Semgrep matches the first call without any change to the rule.

To test this through the cloned [Semgrep testing repository](https://github.com/semgrep/semgrep-pro-tests), go to `docs/constant_propagation_dangerous_calls` and run the following command:

```sh
semgrep --config pro.yaml . --pro
```

#### JavaScript and TypeScript

<iframe title="Semgrep example no prints" src="https://semgrep.dev/embed/editor?snippet=odGx" width="100%" height="432" frameborder="0"></iframe>

Semgrep matches the first and second calls because Semgrep cannot find a constant value for either `user_input` or `EMPLOYEE_TABLE_NAME`.

Now consider an example a bit more complicated to illustrate what Semgrep can do. If the `EMPLOYEE_TABLE_NAME` is imported from a global constants file with the following content:

Global constants file:
```js
export const PI = 3.14159;
export const PLANCK_CONSTANT = 6.62606896e-34;
export const EMPLOYEE_TABLE_NAME = "Employees";
```

Semgrep matches the first call without any change to the rule.

To test this in the cloned [Semgrep testing repository](https://github.com/semgrep/semgrep-pro-tests),go to `docs/constant_propagation_dangerous_calls` and run the following command:

```sh
semgrep --config pro.yaml . --pro
```

### Propagating values

In the previous example, it only mattered cared whether the string was constant or not, so the example used `”...”`, but constant propagation also propagates the constant value. To illustrate the use of Semgrep with constant propagation, the rule from the previous section is changed to search for calls to `dangerous("Employees");`.

#### Java

<iframe title="Semgrep example no prints" src="https://semgrep.dev/embed/editor?snippet=YqyD" width="100%" height="432" frameborder="0"></iframe>

With Semgrep, this rule matches the last three calls to `dangerous`, since these calls are selected from the `Employees` table, though each one obtains the table name differently:

To test this in the cloned [Semgrep testing repository](https://github.com/semgrep/semgrep-pro-tests), go to `docs/constant_propagation_propagating_values` and run the following command:

```sh
semgrep --config pro.yaml . --pro
```

#### JavaScript and TypeScript

<iframe title="Semgrep example no prints" src="https://semgrep.dev/embed/editor?snippet=pORk" width="100%" height="432" frameborder="0"></iframe>

With Semgrep, this rule matches the last three calls to `dangerous`, since these calls are selected from the `Employees` table, though each one obtains the table name differently.

To test this in the cloned [Semgrep testing repository](https://github.com/semgrep/semgrep-pro-tests), go to `docs/constant_propagation_propagating_values` and run the following command:

```sh
semgrep --config pro.yaml . --pro
```
