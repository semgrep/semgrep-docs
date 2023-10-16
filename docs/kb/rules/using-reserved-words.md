# How to implement rule patterns including reserved words from the targeted language's lexicon


### Background

Every programming language carries it's own distinct lexicon and with that there is an array of reserved words idiosyncratic to that language.  If you are implementing a rule and incur the following type of parse error:

```
[ERROR] Pattern parse error in rule route_without_csrf_middleware:

 Invalid pattern for JavaScript:

--- pattern ---

delete

--- end pattern ---

Pattern error: Stdlib.Parsing.Parse_error
```

what you may be incurring is a drawing from using reserved keywords in the target language's lexicon and this creates a conflict in parsing the Semgrep rule itself.  Thus, when you come across this type of parser error, you first need to determine if the word in the cited pattern (in this example, the word, delete, is causing a conflicting parse issue.  In this case, a reference check against Javascript's lexicon needs to be performed to identify if the delete word is a reserved word and it is and thus, cannot be used in a pattern.  

#### Alternative solution.  

The original code that elicited the parser error, as an example:  

```
patterns:

- pattern-inside: app.$FUNC(...)
- pattern-not-regex: .(middleware.csrf.validate).
- metavariable-pattern:
       metavariable: $FUNC

patterns:

- pattern-either:
- pattern: post=
- pattern: put
- pattern: delete
- pattern: patch
```

### Workaround

You can workaround it, for example, by replacing your metavariable-pattern with a metavariable-regex:

```
  - metavariable-regex:
      metavariable: $FUNC
      regex: ^(post|put|delete|patch)$
```

`metavariable-pattern` will try to match pattern on the AST "within" the captured metavariable, which is going to be affected by how reserved keywords are parsed.


`metavariable-regex` will simply run a regex on the text range associated with the metavariable, effectively ignoring how its content would be parsed (which "bypass" the problem in this case).

