---
slug: deepsemgrep-examples
append_help_link: true
description: "This document provides an overview of Semgrep Pro Engine language use cases."
toc_max_heading_level: 5
---

# Semgrep Pro Engine examples

This document provides an overview of Semgrep Pro Engine (Semgrep Pro) features through specific examples, such as its use in type inferences, class inheritance, constant propagation, and taint analysis. Several examples provide a comparison between the results of Semgrep Pro and Semgrep OSS Engine (Semgrep OSS).

Use the following resources as you work through the examples:

* Enable the **Semgrep Pro Engine beta** <i class="fa-solid fa-toggle-large-on"></i> toggle within the [playground](https://semgrep.dev/playground/new).
    * Note this requires `interfile: true` to be included in the metadata, see the following [example](https://semgrep.dev/s/3NZb)
* The [Semgrep Pro Engine testing repository](https://github.com/returntocorp/semgrep-pro-tests) 
    * Clone the repository `git clone https://github.com/returntocorp/semgrep-pro-tests`
    * Follow the instructions in the sections of this document below. Generally:
        * To run Semgrep Pro Engine with interfile analysis, run `semgrep --pro --config=pro.yaml .`
        * To run Semgrep Pro Engine with interprocedural analysis, run `semgrep --pro-intrafile --config=pro.yaml .`

## Taint tracking

Semgrep allows you to search for the flow of any potentially exploitable input into an important sink using taint mode. For more information, see [taint mode](/writing-rules/data-flow/taint-mode/) documentation.

In the examples below, Semgrep is searching for dangerous calls using data obtained `get_user_input` call. The rule does this by specifying the source of taint as `get_user_input(...)` and the sink as `dangerous(...);`.

### Java

Semgrep matches `dangerous(“Select * from “ + user_input)`, because `user_input` is obtained by calling `get_user_input`. However, it does not match the similar call using `still_user_input`, because its analysis does not cross function boundaries to know that `still_user_input` is a wrapper function for `user_input`.

<iframe title="Semgrep example no prints" src="https://semgrep.dev/embed/editor?snippet=J0dQ" width="100%" height="432" frameborder="0"></iframe>

Semgrep Pro Engine matches both dangerous calls, because it does cross function boundaries. In fact, with Semgrep Pro Engine, the taint rule can track calls to `get_user_input` over multiple jumps in multiple files.

In the linked [Semgrep Playground example](https://semgrep.dev/playground/s/J0dQ), enable the **Semgrep Pro Engine beta** toggle to see the results. To run Semgrep Pro Engine in the cloned [Semgrep Pro Engine testing repository](https://github.com/returntocorp/semgrep-pro-tests). Go to `docs/taint_tracking/java` and run the following command:

```sh
semgrep --config pro.yaml . --pro
```

### JavaScript and TypeScript

Here, Semgrep matches `dangerous(“Select * from “ + user_input)`, because `user_input` is obtained by calling `get_user_input`. However, it does not match the similar call using `still_user_input`, because its analysis does not cross function boundaries to know that `still_user_input` is a wrapper function for `user_input`.

<iframe title="Semgrep example no prints" src="https://semgrep.dev/embed/editor?snippet=Po9p" width="100%" height="432" frameborder="0"></iframe>

Semgrep Pro matches both dangerous calls, because it does cross function boundaries. In fact, with Semgrep Pro, the taint rule can track calls to `get_user_input` over multiple jumps in multiple files.

Try toggling the [Semgrep Pro Engine](https://semgrep.dev/s/Po9p) to see it match in the playground. To run Semgrep Pro in the cloned [Semgrep Pro Engine testing repository](https://github.com/returntocorp/semgrep-pro-tests). Go to `docs/taint_tracking/javascript` and run the following command:

```sh
semgrep --config pro.yaml . --pro
```

#### ES6 and CommonJS

The JavaScript and TypeScript ecosystems contain various ways for importing and exporting code, Semgrep Pro is able to track dataflow through ES6 imports/exports and some CommonJS export paths (See known limitations below). 

<b>ES6</b>

Semgrep is able to track data through the definition of exports for es6:

```js
export function readUser() {
    return get_user_input("example")
}
```

Semgrep is able to follow the dataflow when it is imported in another location:

```js
import { readUser } from "./es6/es6";

readUser()
```

<b>CommonJS</b>

Semgrep is able to track data through the definition of exports for CommonJS when the function is defined inline:

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

To run Semgrep Pro in the cloned [Semgrep Pro Engine testing repository](https://github.com/returntocorp/semgrep-pro-tests). Go to `docs/taint_tracking/imports` and run the following command:

```sh
semgrep --config pro.yaml . --pro
```

<b>Known limitations</b>

Currently Semgrep Pro Engine does not handle specific cases of CommmonJS where you define a function and assign it to an export later, Semgrep Pro Engine does not track the code below:

```js
function get_user() {
    return get_user_input("example")
  }

module.exports = get_user
```

## Type inference and class inheritance

### Class inheritance

This section compares the possible findings of a scan across multiple files using Semgrep and Semgrep Pro. The file `app.java` includes two check functions that throw exceptions. This example looks for methods that throw a particular exception, `ExampleException`.

<iframe title="Semgrep example no prints"src="https://semgrep.dev/embed/editor?snippet=X424" width="100%" height="432" frameborder="0"></iframe>

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

Where `ExampleException` is thrown, we also want to find `BadRequest`, because `BadRequest` is a child of `ExampleException`. Unlike Semgrep, Semgrep Pro Engine can find `BadRequest`. Since Semgrep Pro Engine uses information from all the files in the directory it scans, it detects `BadRequest` and finds both thrown exceptions.
 
If you are following in the cloned [Semgrep Pro Engine testing repository](https://github.com/returntocorp/semgrep-pro-tests), in the `docs/class_inheritance` directory, try the following commands to test the difference:

1. Run Semgrep:
    ```sh
    semgrep --config pro.yaml .
    ```
2. Run Semgrep Pro Engine:
    ```sh
    semgrep --config pro.yaml . --pro 
    ```

### Using class inheritance with typed metavariables

Semgrep Pro Engine uses interfile class inheritance information when matching [typed metavariables](/writing-rules/pattern-syntax/#typed-metavariables). Continuing the example from the previous section, see the following example file, which has defined some exceptions and includes their logging:

<iframe title="Semgrep example no prints" src="https://semgrep.dev/embed/editor?snippet=pbG0" width="100%" height="432" frameborder="0"></iframe>

The rule searches for any variable of type `ExampleException` being logged. Semgrep is **not** able to find instances of `BadRequest` being logged, unlike Semgrep Pro Engine. Allowing typed metavariables to access information from the entire program enables users to query any variable for its type and use that information in conjunction with the rest of the code resulting in more accurate findings.

:::note
For a more realistic example where typed metavariables are used, see the following [rule written by Semgrep community](https://semgrep.dev/playground/s/o9l6) to find code vulnerable to the log4j vulnerability.
:::

Try to run Semgrep Pro Engine in the cloned [Semgrep Pro Engine testing repository](https://github.com/returntocorp/semgrep-pro-tests). Go to `docs/class_inheritance_with_typed_metavariables` and run the following command:

```sh
semgrep --config pro.yaml . --pro
```

## Constant propagation

### Finding dangerous calls

[Constant propagation](/writing-rules/pattern-syntax/#constants) provides a syntax for eliminating false positives in Semgrep rules. Even if a variable is set to a constant before being used in a function call several lines below, Semgrep knows that it must have that value and matches the function call. For example, this rule looks for non-constant values passed to the `dangerous` function:

#### Java

<iframe title="Semgrep example no prints" src="https://semgrep.dev/embed/editor?snippet=YPKo" width="100%" height="432" frameborder="0"></iframe>

Semgrep matches the first and second calls because Semgrep cannot find a constant value for either `user_input` or `EMPLOYEE_TABLE_NAME`.

Now consider an example a bit more complicated to illustrate what Semgrep Pro Engine can do. If the `EMPLOYEE_TABLE_NAME` is imported from a global constants file with the following content:

Global constants file:
```java
package com.main;

public final class Constants {
    public static final double PI = 3.14159;
    public static final double PLANCK_CONSTANT = 6.62606896e-34;
    public static final String EMPLOYEE_TABLE_NAME = "Employees";
}
```

Semgrep Pro Engine matches the first call without any change to the rule.

Try to run Semgrep Pro Engine in the cloned [Semgrep Pro Engine testing repository](https://github.com/returntocorp/semgrep-pro-tests). Go to `docs/constant_propagation_dangerous_calls` and run the following command:

```sh
semgrep --config pro.yaml . --pro
```
#### JavaScript/TypeScript

<iframe title="Semgrep example no prints" src="https://semgrep.dev/embed/editor?snippet=BJ2x" width="100%" height="432" frameborder="0"></iframe>

Semgrep matches the first and second calls because Semgrep cannot find a constant value for either `user_input` or `EMPLOYEE_TABLE_NAME`.

Now consider an example a bit more complicated to illustrate what Semgrep Pro Engine can do. If the `EMPLOYEE_TABLE_NAME` is imported from a global constants file with the following content:

Global constants file:
```js
export const PI = 3.14159;
export const PLANCK_CONSTANT = 6.62606896e-34;
export const EMPLOYEE_TABLE_NAME = "Employees";
```

Semgrep Pro Engine matches the first call without any change to the rule.

Try to run Semgrep Pro Engine in the cloned [Semgrep Pro Engine testing repository](https://github.com/returntocorp/semgrep-pro-tests). Go to `docs/constant_propagation_dangerous_calls` and run the following command:

```sh
semgrep --config pro.yaml . --pro
```

### Propagating values

In the previous example, we only cared whether the string was constant or not, so we used `”...”`, but constant propagation also propagates the constant value. To illustrate the use of Semgrep Pro Engine with constant propagation, the rule from the previous section is changed to search for calls to `dangerous("Employees");`.

#### Java

<iframe title="Semgrep example no prints" src="https://semgrep.dev/embed/editor?snippet=qb6e" width="100%" height="432" frameborder="0"></iframe>

With Semgrep Pro Engine, this rule matches the last three calls to `dangerous`, since these calls are selected from the `Employees` table, though each one obtains the table name differently:

Try to run Semgrep Pro Engine in the cloned [Semgrep Pro Engine testing repository](https://github.com/returntocorp/semgrep-pro-tests). Go to `docs/constant_propagation_propagating_values` and run the following command:

```sh
semgrep --config pro.yaml . --pro
```

#### JavaScript/TypeScript

<iframe title="Semgrep example no prints" src="https://semgrep.dev/embed/editor?snippet=0xgB" width="100%" height="432" frameborder="0"></iframe>

With Semgrep Pro Engine, this rule matches the last three calls to `dangerous`, since these calls are selected from the `Employees` table, though each one obtains the table name differently:

Try to run Semgrep Pro Engine in the cloned [Semgrep Pro Engine testing repository](https://github.com/returntocorp/semgrep-pro-tests). Go to `docs/constant_propagation_propagating_values` and run the following command:

```sh
semgrep --config pro.yaml . --pro
```
