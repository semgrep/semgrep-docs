---
description: Ellipsis metavariables can help with matching multiple word tokens.
tags:
  - Rules
  - Semgrep Code
---

import MoreHelp from "/src/components/MoreHelp"

# Matching multiple tokens with ellipsis metavariables

Using ellipsis (`...`) to match a sequence of items (for example, arguments, statements, or fields) is one of the most common constructs in Semgrep rules. Likewise, using metavariables ($VAR) to capture values (such as variables, functions, arguments, classes, and methods) is extremely common and powerful for tracking the use of values across a code scope.

## Introduction to ellipsis metavariables

Ellipses can be combined with metavariables to increase matching scope from a single item to a sequence of items, [while capturing the values for later re-use](/docs/writing-rules/pattern-syntax/#ellipsis-metavariables).

Most commonly, ellipsis metavariables like `$...ARGS` are used for purposes like matching multiple arguments to a function or items in an array.

However, they can also be used to match multiple word tokens. As part of Semgrep's pattern matching, it separates the analyzed language into tokens, which are single units that make up a larger text. Some tokens, typically alphanumeric tokens, are "words", and some are word separators (like punctuation and whitespace).

Using ellipsis metavariables to match multiple word tokens is especially helpful in [Generic pattern matching mode](/docs/writing-rules/generic-pattern-matching). Because this mode is generic, it's not aware of the semantics of any particular language, and that comes with [caveats and limitations](/docs/writing-rules/generic-pattern-matching#caveats-and-limitations-of-generic-mode).

In generic mode, a word token that can be matched by a metavariable is defined as a sequence of characters in the set `[A-z0-9_]`. So `ABC_DEF` is one token, and a metavariable such as `$VAR` captures the entire sequence. However, `ABC-DEF` is two tokens, and a metavariable such as `$VAR` does not capture the entire sequence.

## Capturing multiple tokens with ellipsis metavariables

Not all languages you might match using generic mode share the same definition of word tokens. If you're matching patterns in one of these languages, your metavariables might not match as much of a word token as you expect. For example, in HTML, "ABC-DEF" is a single token (perhaps an `id` value).

If the language you're working with allows other characters in tokens, using ellipsis metavariables can prevent problems with metavariables matching too little of the pattern.

To match all of `ABC-DEF` in `generic` mode, use an ellipsis metavariable, like `$...VAR`. Here is an example rule:

<iframe src="https://semgrep.dev/embed/editor?snippet=J6Ro" title="html-ellipsis-metavariable" width="100%" height="432px" frameBorder="0"></iframe>

If you remove the ellipsis in the `$...ID` variable, the second example no longer matches.

## Alternative: try the Aliengrep experiment

To address some of the limitations of generic mode, the team is experimenting with a new mode called [Aliengrep](/docs/writing-rules/experiments/aliengrep).

With Aliengrep, you can [configure what characters are allowed as part of a word token](/docs/writing-rules/experiments/aliengrep/#additional-word-characters-captured-by-metavariables), so that you could match the HTML example with a single metavariable. You can also [have even more fun with ellipses](/docs/writing-rules/experiments/aliengrep/#ellipsis-).

Give it a try and share your thoughts!

<MoreHelp />
