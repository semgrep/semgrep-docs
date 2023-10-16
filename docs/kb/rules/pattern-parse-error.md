# [ERROR] Pattern parse error in rule:  how to implement rule patterns including reserved words from the targeted language's lexicon


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

what you may be incurring is a reserved word conflict.  Drawing from reserved keywords in the target lanuguage's lexicon and incorporating those into your rule implementation can create a conflict in parsing the Semgrep rule itself.  When you come across this type of parser error, you first need to determine if the word in the parser error cited pattern is a reserved word in the language's lexicon.  In this example, the word "delete" is causing a conflicting parse issue and a quick reference check against Javascript's lexicon does indeed indicate it is a reserved word:

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#keywords


Thus, other measures need to be taken to be able to incorporate this reserved word into your rule implementation.  

## Alternative solution  

As an example, the original code that elicited the parser error:  

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

`metavariable-regex` will simply run a regex on the text range associated with the metavariable, effectively ignoring how its content would be parsed (which "bypasses" the problem in this case).
