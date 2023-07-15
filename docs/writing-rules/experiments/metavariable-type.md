---
slug: metavariable-type
append_help_link: true
description: "With this rule, Semgrep matches captured metavariables with specific types"
---

# Matching captured metavariables with specific types

The `metavariable-type` operator is used to compare metavariables against their types. It utilizes the `type` key to specify the string representation of the type expression in the target language. For example, you can use `String` for Java's String type and `string` for Go's string type. Optionally, the `language` key can be used to manually indicate the target language of the type expression.

`metavariable-type` provides several advantages over typed metavariable. Firstly, it removes the requirement for users to memorize special syntax for defining typed metavariables in various target languages. Moreover, `metavariable-type` enables users to extract type expressions from the pattern expression and include them in other conditional filters for metavariables. This improves the readability of rules and promotes better organization of the code.

For instance, the following rule that identifies potentially unsafe usage of the referential equality operator when comparing String objects in Java:
```yaml
rules:
  - id: no-string-eqeq
    severity: WARNING
    message: Avoid using the referential equality operator when comparing String objects
    languages:
      - java
    patterns:
      - pattern-not: null == (String $Y)
      - pattern: $X == (String $Y)
```

can be modified to the following rule:
```yaml
rules:
  - id: no-string-eqeq
    severity: WARNING
    message: Avoid using the referential equality operator when comparing String objects
    languages:
      - java
    patterns:
      - pattern-not: null == $Y
      - pattern: $X == $Y
      - metavariable-type:
          metavariable: $Y
          type: String
```