---
description: Ellipsis metavariables can help with matching multiple word tokens.
tags:
  - Rules
  - Semgrep Code
---

import MoreHelp from "/src/components/MoreHelp"

# Matching multiple tokens with ellipsis metavariables

## Introduction to ellipsis metavariables

Using ellipsis (`...`) to match a sequence of tokens (for example, items in an array) is one of the most common constructs in Semgrep rules, and ellipses can even be used with metavariables ($VAR) to increase matching scope!

Most commonly, ellipsis metavariables like `$...ARGS` are used for purposes like matching multiple arguments to a function, [while capturing the values for later re-use](/docs/writing-rules/pattern-syntax/#ellipsis-metavariables).

However, they can also be used to match multiple word tokens. This is especially handy in [Generic pattern matching mode](/docs/writing-rules/generic-pattern-matching/), where a token is defined as a sequence of characters in the set `[A-z0-9_]`. Not all languages you might match with Generic mode share the same definition of word tokens. If you're matching patterns in one of these languages, your metavariables might not match as much of a word token as you expect.

## Capturing multiple tokens with ellipsis metavariables

In `generic` mode, `ABC_DEF` is one token, and a metavariable such as `$VAR` captures the entire sequence. However, `ABC-DEF` is two tokens, and a metavariable such as `$VAR` does not capture the entire sequence.

If the language you're working with allows other characters in tokens, using ellipsis metavariables can prevent problems with metavariables matching too little of the pattern.

To match `ABC-DEF` in `generic` mode, use an ellipsis metavariable, like `$...VAR`. Here is an example rule:

<iframe src="https://semgrep.dev/embed/editor?snippet=J6Ro" title="pattern-not rule for unverified transactions" width="100%" height="432px" frameBorder="0"></iframe>

If you remove the ellipsis in the `$...ID` variable, the second example no longer matches.

## Alternative: try the Aliengrep experiment

Semgrep's generic matching mode contains [caveats and limitations](/docs/writing-rules/generic-pattern-matching/#caveats-and-limitations-of-generic-mode). To address some of the limitations, the team is experimenting with a new mode called [Aliengrep](/docs/writing-rules/experiments/aliengrep/). 

With Aliengrep, you can [configure what characters are allowed as part of a word token](/docs/writing-rules/experiments/aliengrep/#additional-word-characters-captured-by-metavariables) as well as [have even more fun with ellipses](/docs/writing-rules/experiments/aliengrep/#ellipsis-).

Give it a try and share your thoughts!

<MoreHelp />