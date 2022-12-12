# Recursive joins

Join mode is an extension of Semgrep that runs multiple rules at once and only returns results if certain conditions are met. This is an experimental mode that enables you to cross file boundaries, allowing you to write rules for whole codebases instead of individual files. More information is available in [Join mode overview](../overview/).

Recursive join mode has a recursive operator, `-->`, which executes a recursive query on the given condition. This recursive operator allows you to write a Semgrep rule that effectively crawls the codebase on a condition you specify, letting you build chains such as function call chains or class inheritance chains.

## Understanding recursive join mode

In the background, join rules turn captured metavariables into database table columns. For example, a rule with $FUNCTIONNAME, $FUNCTIONCALLED, and $PARAMETER is a table similar to the following:

| $FUNCTIONNAME | $FUNCTIONCALLED | $PARAMETER   |
|---------------|-----------------|--------------|
| getName       | writeOutput     | user         |
| getName       | lookupUser      | uid          |
| lookupUser    | databaseQuery   | uid          |

The join conditions then join various tables together and return a result if any rows match the criteria.

Recursive join mode conditions use [recursive joins](https://www.sqlite.org/lang_with.html#recursive_common_table_expressions) to construct a table that recursively joins with itself. For example, you can use a Semgrep rule that gets all function calls and join them recursively to approximate a callgraph.

Consider the following Python script and rule.

```python
def function_1():
    print("hello")
    function_2()

def function_2():
    function_4()

def function_3():
    function_5()

def function_4():
    function_5()

def function_5():
    print("goodbye")
```

```yaml
rules:
- id: python-callgraph
  message: python callgraph
  languages: [python]
  severity: INFO
  pattern: |
    def $CALLER(...):
      ...
      $CALLEE(...)
```

A join condition such as the following: `python-callgraph.$CALLER --> python-callgraph.$CALLEE` produces a table below. Notice how `function_1` appears with `function_4` and `function_5` as callees, even though it is not directly called.

| $CALLER  | $CALLEE  |
|----------|----------|
|function_1|function_2|
|function_1|function_4|
|function_1|function_5|
|function_1|print     |
|function_2|function_4|
|function_2|function_5|
|function_3|function_5|
|function_4|function_5|
|function_5|print     |

## Example rule

It's important to think of a join mode rule as "asking questions about the whole project", rather than looking for a single pattern. For example, to find an SQL injection, you need to understand a few things about the project:

1. Is there any user input?
1. Do any functions manually build an SQL string using function input?
1. Can the user input reach the function that manually builds the SQL string?

Now, you can write individual Semgrep rules that gather information about each of these questions. This example uses [Vulnado](https://github.com/ScaleSec/vulnado) for finding an SQL injection. Vulnado is a Spring application.

The first rule searches for user input into the Spring application. This rule also captures sinks that use a user-inputtable parameter as an argument.

```yaml
rules:
- id: java-spring-user-input
  message: user input
  languages: [java]
  severity: INFO
  mode: taint
  pattern-sources:
  - pattern: |
      @RequestMapping(...)
      $RETURNTYPE $USERINPUTMETHOD(..., $TYPE $PARAMETER, ...) {
        ...
      }
  pattern-sinks:
  - patterns:
    - pattern: $OBJ.$SINK(...)
    - pattern: $PARAMETER
```

A second rule looks for all methods in the application that build an SQL string with a method parameter.

```yaml
rules:
- id: method-parameter-formatted-sql
  message: method uses parameter for sql string
  languages: [java]
  severity: INFO
  patterns:
  - pattern-inside: |
      $RETURNTYPE $METHODNAME(..., $TYPE $PARAMETER, ...) {
        ...
      }
  - patterns:
    - pattern-either:
      - pattern: |
          "$SQLSTATEMENT" + $PARAMETER
      - pattern: |
          String.format("$SQLSTATEMENT", ..., $PARAMETER, ...)
    - metavariable-regex:
        metavariable: $SQLSTATEMENT
        regex: (?i)(select|delete|insert).*
```

Finally, the third rule is used to construct a pseudo-callgraph:

```yaml
rules:
- id: java-callgraph 
  languages: [java]
  severity: INFO
  message: $CALLER calls $OBJ.$CALLEE
  patterns:
  - pattern-inside: |
      $TYPE $CALLER(...) {
        ...
      }
  - pattern: $OBJ.$CALLEE(...)
```

The join rule, is displayed as follows:

```yaml
rules:
- id: spring-sql-injection
  message: SQLi
  severity: ERROR
  mode: join
  join:
    refs:
    - rule: rule_parts/java-spring-user-input.yaml
      as: user-input
    - rule: rule_parts/method-parameter-formatted-sql.yaml
      as: formatted-sql
    - rule: rule_parts/java-callgraph.yaml
      as: callgraph
    on:
    - 'callgraph.$CALLER --> callgraph.$CALLEE'
    - 'user-input.$SINK == callgraph.$CALLER'
    - 'callgraph.$CALLEE == formatted-sql.$METHODNAME'
```

The `on:` conditions, in order, read as follows:
- Recursively generate a pseudo callgraph on $CALLER to $CALLEE.
- Match when a method with user input has a $SINK that is the $CALLER in the pseudo-callgraph.
- Match when the $CALLEE is the $METHODNAME of a method that uses a parameter to construct an SQL string.

Running this on Vulnado produces tables that look like this:

|$RETURNTYPE |$USERINPUTMETHOD |$TYPE      |$PARAMETER  |$OBJ     |$SINK       |
|------------|-----------------|-----------|------------|---------|------------|
|...         |...              |...        | ...        |...      |...         |
|LoginResponse|login           |LoginRequest|input      |user     |token       |
|LoginResponse|login           |LoginRequest|input      |User     |getUser     |
|...         |...              |...        | ...        |...      |...         |


|$RETURNTYPE |$METHODNAME |$TYPE      |$PARAMETER  |$SQLSTATEMENT |
|------------|------------|-----------|------------|--------------|
|...         |...         |...        | ...        |...           |
|User        |fetch       |String     |un          |select * from users where username = '|
|...         |...         |...        | ...        |...           |

|$CALLER    |$CALLEE    |
|-----------|-----------|
|...        |...        |
|login      |getUser    |
|login      |fetch      |
|getUser    |fetch      |
|...        |...        |

The join conditions select rows which meet the conditions.

- Match when a method with user input has a $SINK that is the $CALLER in the pseudo-callgraph.

|... |user-input.$SINK    |== |callgraph.$CALLER   |... |
|----|---------|---|----------|----|
|... |getUser  |== |getUser   |... |

- Match when the $CALLEE is the $METHODNAME of a method that uses a parameter to construct an SQL string.

|...|callgraph.$CALLEE  |== |formatted-sql.$METHODNAME|...|
|---|---------|---|-----------|---|
|...|fetch    |== |fetch      |...|

```console
(semgrep) ➜  join_mode_demo semgrep -f vulnado-sqli.yaml vulnado
Running 1 rules...
Running 3 rules...
100%|██████████████████████████|3/3
ran 3 rules on 11 files: 158 findings
vulnado/src/main/java/com/scalesec/vulnado/User.java
rule:spring-sql-injection: SQLi
55:      String query = "select * from users where username = '" + un + "' limit 1";
ran 0 rules on 0 files: 1 findings
```

## Limitations

Join mode only works on the metavariable contents, which means it's fundamentally operating with text strings and not code constructs. There will be some false positives if similarly-named metavariables are extracted.

## Use cases

- Approximating callgraphs in a project
- Approximating class inheritance
