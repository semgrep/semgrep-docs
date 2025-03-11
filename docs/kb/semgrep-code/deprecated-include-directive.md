---
tags:
  - Semgrep CLI
  - Semgrepignore
description: How to migrate away from :include directives in Semgrepignore files
---

# How to migrate away from `:include` directives in Semgrepignore files

If you're getting the following warning, you're in the right place:

```
Deprecated include directive ':include ...' in semgrepignore file '...'
```

It means that you're using a recent version of Semgrep implementing
[Semgrepignore v2](/docs/semgrepignore-v2-reference) and that
the `.semgrepignore` file in your project uses `:include` to include
another Semgrepignore or Gitignore file. It was typically used as
follows:

```
:include .gitignore

/ignore/this/path
...
```

Semgrepignore v2 automatically consults the `.gitignore` file as if it
were included at the beginning of the `.semgrepignore` file present
in the same folder. The exact line `:include .gitignore` at the
beginning of a `.semgrepignore` file is now
redundant. Remove it.

If the include directive is more complicated than just `:include
.gitignore`, you should find another way to remove it.
Beware that the `:include` feature is deprecated and will
be removed in a future version of Semgrep. We'll remove this feature
because Gitignore doesn't support it and we no longer see a need for
it. Please reach out to the Semgrep team if you think you still need
it.
