---
append_help_link: true
---

# Pattern syntax

!!! info
    Getting started with rule writing? Try the [Semgrep Tutorial](https://semgrep.dev/learn) 🎓

This document describes Semgrep’s pattern syntax. You can also see pattern [examples by language](pattern-examples.md). In the command line, patterns are specified with the flag `--pattern` (or `-e`). Multiple
coordinating patterns may be specified in a configuration file. See
[rule syntax](rule-syntax.md) for more information.

[TOC]

# Pattern matching

Pattern matching searches code for a given pattern. For example, the
expression pattern `1 + func(42)` can match a full expression or be
part of a subexpression:

```python
foo(1 + func(42)) + bar()
```

In the same way, the statement pattern `return 42` can match a top
statement in a function or any nested statement:

```python
def foo(x):
  if x > 1:
     if x > 2:
       return 42
  return 42
```
  

# Ellipsis operator

The ellipsis operator (`...`) abstracts away a sequence of zero or more
arguments, statements, parameters, fields, characters, etc.

## Function calls

Use the ellipsis operator to search for function calls or
function calls with specific arguments. For example, the pattern `insecure_function(...)` finds calls regardless of its arguments.

```python
insecure_function("MALICIOUS_STRING", arg1, arg2)
```

Functions and classes can be referenced by their fully qualified name, e.g.,

- `django.utils.safestring.mark_safe(...)` or `mark_safe(...)`
- `System.out.println(...)` or `println(...)`

You can also search for calls with arguments after a match. The pattern `func(1, ...)` will match both:

```python
func(1, "extra stuff", False)
func(1)  # Matches no arguments as well
```

Or find calls with arguments before a match with `func(..., 1)`:

```python
func("extra stuff", False, 1)
func(1)  # Matches no arguments as well
```

The pattern `requests.get(..., verify=False, ...)` finds calls where an argument appears anywhere:

```python
requests.get(verify=False, url=URL)
requests.get(URL, verify=False, timeout=3)
requests.get(URL, verify=False)
```

Match the keyword argument value with the pattern `$FUNC(..., $KEY=$VALUE, ...)`.


## Method calls

The ellipsis operator can be used to search for method calls on a specific
object type. For example, the pattern `$OBJECT.extractall(...)` matches:

```python
tarball.extractall('/path/to/directory')  # Oops, potential arbitrary file overwrite
```

## Function definitions

The ellipsis operator can be used in function parameter lists or in the function
body. To find function definitions with [mutable default arguments](https://docs.python-guide.org/writing/gotchas/#mutable-default-arguments):

```text
pattern: |
  def $FUNC(..., $ARG={}, ...):
      ...
```

```python
def parse_data(parser, data={}):  # Oops, mutable default arguments
    pass
```

!!! info
    The YAML `|` operator allows for [multiline strings](https://yaml-multiline.info/).


## Class definitions

The ellipsis operator can be used in class definitions. To find classes that
inherit from a certain parent:

```text
pattern: |
  class $CLASS(InsecureBaseClass):
      ...
```

```python
class DataRetriever(InsecureBaseClass):
    def __init__(self):
        pass
```

!!! info
    The YAML `|` operator allows for [multiline strings](https://yaml-multiline.info/).

## Strings

The ellipsis operator can be used to search for strings containing any data. The pattern `crypto.set_secret_key("...")` matches:

```python
crypto.set_secret_key("HARDCODED SECRET")
```

This also works with [constant propagation](#constants).

## Binary operations

The ellipsis operator can match any number of arguments to binary operations. The pattern `$X = 1 + 2 + ...` matches:

```python
foo = 1 + 2 + 3 + 4
```

## Containers

The ellipsis operator can match inside container data structures like lists, arrays, and key-value stores.

The pattern `user_list = [..., 10]` matches:

```python
user_list = [8, 9, 10]
```

The pattern `user_dict = {...}` matches:

```python
user_dict = {'username': 'password'}
```

The pattern `user_dict = {..., $KEY: $VALUE, ...}` matches the following and allows for further metavariable queries:

```python
user_dict = {'username': 'password', 'address': 'zipcode'}
```

You can also match just a key-value pair in
a container, for example in JSON the pattern `"foo": $X` matches
just a single line in:

```json
{ "bar": True,
  "name": "self",
  "foo": 42
}
```

## Conditionals and loops

The ellipsis operator can be used inside conditionals or loops. The pattern:

```text
pattern: |
  if $CONDITION:
      ...
```

!!! info
    The YAML `|` operator allows for [multiline strings](https://yaml-multiline.info/).

matches:

```python
if can_make_request:
    check_status()
    make_request()
    return
```

A metavariable can match a conditional or loop body if the body statement information is re-used later. The pattern:

```text
pattern: |
  if $CONDITION:
      $BODY
```

matches:

```python
if can_make_request:
    single_request_statement()
```

!!! note
    Half or partial statements can't be matches; both of the examples above must specify the contents of the condition’s body (e.g., `$BODY` or `...`), otherwise they are not valid patterns.


# Metavariables

Metavariables are an abstraction to match code when you don’t know the value or contents ahead of time, similar to [capture groups](https://regexone.com/lesson/capturing_groups) in regular expressions.

Metavariables can be used to track values across a specific code scope. This
includes variables, functions, arguments, classes, object methods, imports,
exceptions, and more.

Metavariables look like `$X`, `$WIDGET`, or `$USERS_2`. They begin with a `$` and can only
contain uppercase characters, `_`, or digits. Names like `$x` or `$some_value` are invalid.

## Expression metavariables

The pattern `$X + $Y` matches the following code examples:


```python
foo() + bar()
```

```python
current + total
```

## Import metavariables

Metavariables can also be used to match imports. For example, `import $X` matches:

```python
import random
```

## Reoccuring metavariables

Re-using metavariables shows their true power. Detect useless assignments:

```text
pattern: |
  $X = $Y
  $X = $Z
```

Useless assignment detected:
```python
initial_value = 10  # Oops, useless assignment
initial_value = get_initial_value()
```

!!! info
    The YAML `|` operator allows for [multiline strings](https://yaml-multiline.info/).

## Typed Metavariables

Typed metavariables only match a metavariable if it’s declared as a specific type. For example, you may want to specifically check that `==` is never used for
strings.

Go:

```text
pattern: "$X == ($Y : string)"
```

```go
func main() {
    var x string
    var y string
    var a int
    var b int

    // Matched
    if x == y {
       x = y
    }

    // Not matched
    if a == b {
       a = b
    }
}
```

!!! warning
    For Go, Semgrep currently does not recognize the type of all variables that are declared on the same line. That is, the following will not take both `a` and `b` as `int`s: `var a, b = 1, 2`

Java:

```text
pattern: $X == (String $Y)
```

```java
public class Example {
    public int foo(String a, int b) {
        // Matched
        if (a == "hello") {
            return 1;
        }

        // Not matched
        if (b == 2) {
            return -1;
        }
    }
}
```

C:

```text
pattern: $X == (char *$Y)
```

```c
int main() {
    char *a = "Hello";
    int b = 1;

    // Matched
    if (a == "world") {
        return 1;
    }

    // Not matched
    if (b == 2) {
        return -1;
    }

    return 0;
}
```

TypeScript:

```text
pattern: $X == ($Y : string)
```

```typescript
function foo(a: string, b: number) {
    // Matched
    if (a == "hello") {
        return 1;
    }

    // Not matched
    if (b == 1) {
        return -1;
    }
}
```

!!! warning
    Since matching happens within a single file, this is only guaranteed to work for local variables and arguments. Additionally, Semgrep currently understands types on a shallow level. For example, if you have `int[] A`, it will not recognize `A[0]` as an integer. If you have a class with fields, you will not be able to use typechecking on field accesses, and it will not recognize the class’s field as the expected type. Literal types are understood to a limited extent. Expanded type support is under active development.

# Equivalences

Semgrep automatically searches for code that is semantically equivalent.

## Imports

Equivalent imports using aliasing or submodules are matched. 

The pattern `subprocess.Popen(...)` matches:

```python
import subprocess.Popen as sub_popen
sub_popen('ls')
```

The pattern `foo.bar.baz.qux(...)` matches:

```python
from foo.bar import baz
baz.qux()
```

## Constants

Semgrep performs constant propagation.

The pattern `set_password("password")` matches:

```python
HARDCODED_PASSWORD = "password"

def update_system():
    set_password(HARDCODED_PASSWORD)
```

Basic constant propagation support like in the example above is a stable feature.
Experimentally, Semgrep also supports [intra-procedural flow-sensitive constant propagation](../experiments/overview.md#constant-propagation).

The pattern `set_password("...")` also matches:

```python
def update_system():
    if cond():
        password = "abc"
    else:
        password = "123"
    set_password(password)
```

## Associative and commutative operators

Semgrep performs associative-commutative (AC) matching. For example, `... && B && C` will match both `B && C` and `(A && B) && C` (i.e., `&&` is associative). Also, `A | B | C` will match `A | B | C`, and `B | C | A`, and `C | B | A`, and any other permutation (i.e., `|` is associative and commutative).

Under AC-matching metavariables behave similarly to `...`. For example, `A | $X` can match `A | B | C` in four different ways (`$X` can bind to `B`, or `C`, or `B | C`). In order to avoid a combinatorial explosion, Semgrep will only perform AC-matching with metavariables if the number of potential matches is _small_, otherwise it will produce just one match (if possible) where each metavariable is bound to a single operand.

Using [`options`](./rule-syntax.md#options) it is possible to entirely disable AC-matching. It is also possible to treat boolean AND and OR operators (e.g., `&&` in `||` in C-family languages) as commutative, which can be useful despite not being semantically accurate.

# Deep expression operator

Use the deep expression operator `<... [your_pattern] ...>` to match an expression that could be deeply nested within another expression. An example is looking for a pattern anywhere within an `if` statement. The deep expression operator matches your pattern in the current expression context and recursively in any subexpressions.

For example, this pattern:

```yaml
pattern: |
  if <... $USER.is_admin() ...>:
    ...
```

matches:

```python
if user.authenticated() and user.is_admin() and user.has_group(gid):
  [ CONDITIONAL BODY ]
```

The deep expression operator works in:

- `if` statements: `if <... $X ...>:`
- nested calls: `sql.query(<... $X ...>)`
- operands of a binary expression: `"..." + <... $X ...>`
- any other expression context

# Limitations

## Statements types

Semgrep handles some statement types differently than others, particularly when searching for fragments inside statements. For example, the pattern `foo` will match these statements:

```python
x += foo()
return bar + foo
foo(1, 2)
```

But `foo` will not match the following statement (`import foo` will match it though):

```python
import foo
```

### Statements as expressions

Many programming languages differentiate between expressions and statements. Expressions can appear inside if conditions, in function call arguments, etc. Statements can not appear everywhere; they are sequence of operations (in many languages using `;` as a separator/terminator) or special control flow constructs (if, while, etc.).

`foo()` is an expression (in most languages).

`foo();` is a statement (in most languages).

If your search pattern is a statement, Semgrep will automatically try to search for it as _both_ an expression and a statement. 

When you write the expression `foo()` in a pattern, Semgrep will visit every expression and sub-expression in your program and try to find a match.

Many programmers don't really see the difference between `foo()` and `foo();`. This is why when one looks for `foo()`; Semgrep thinks the user wants to match statements like `a = foo();`, or `print(foo());`.

!!! info
    Note that in some programming languages such as Python, which does not use semicolons as a separator or terminator, the difference between expressions and statements is even more confusing. Indentation in Python matters, and a newline after `foo()` is really the same than `foo();` in other programming languages such as C.


## Partial expressions

Partial expressions are not valid patterns. For example, the following is invalid:

```text
pattern: 1+
```

A complete expression is needed (like `1 + $X`)

## Partial statements

Partial statements are partially supported. For example,
you can just match the header of a conditional with `if ($E)`,
or just the try part of an exception statement with `try { ... }`.

This is especially useful when used in a
[pattern-inside](./rule-syntax.md#pattern-inside) to restrict the
context in which to search for other things.

## Other partial constructs

It is possible to just match the header of a function (without its body),
for example `int foo(...)` to match just the header part of the
function `foo`. In the same way, you can just match a class header
(e.g., with `class $A`).

# Deprecated features

## String matching

!!! warning
    String matching has been deprecated. You should use 
	[metavariable regexp](rule-syntax.md#metavariable-regex) instead.

Search string literals within code with [Perl Compatible Regular Expressions (PCRE)](https://learnxinyminutes.com/docs/pcre/).

The pattern `requests.get("=~/dev\./i")` matches:

```python
requests.get("api.dev.corp.com")  # Oops, development API left in
```

To search for specific strings, use the syntax `"=~/<regexp>/"`. Advanced regexp features are available, such as case-insensitive regexps with `'/i'` (e.g., `"=~/foo/i"`). Matching occurs anywhere in the string unless the regexp `^` anchor character is used: `"=~/^foo.*/"` checks if a string begins with `foo`.
