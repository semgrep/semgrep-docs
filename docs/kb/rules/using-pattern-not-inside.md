---
tags:
  - Semgrep OSS Engine
  - Semgrep Rules
---

# My rule with `pattern-not` doesn't work: using `pattern-not-inside`

One common issue when writing custom rules is to try to exclude some cases using `pattern-not`, without success. This is especially common if a pattern is not acceptable by itself, but is acceptable as long as some other pattern is also present. In this type of situation, the solution is usually to switch from `pattern-not` to `pattern-not-inside`.

## What does "inside" mean?

Intuitively, "inside" means "wholly within an outer container". But in Semgrep, one pattern being "inside" another can also mean that it is at the same level, but includes less code. 

Another way to express this is that `pattern-not` assumes that the matches are the same "size" and produces undesirable results if that’s not the case.

## Example

The `find-unverified-transactions` [custom rule example](https://semgrep.dev/docs/writing-rules/rule-ideas/#systematize-project-specific-coding-patterns) is a good example: `make_transaction($T)` is only acceptable if `verify_transaction($T)` is also present. The example uses `pattern` and `pattern-not`, and matches the target code successfully:

<iframe src="https://semgrep.dev/embed/editor?snippet=Nr3z" title="pattern-not rule for unverified transactions" width="100%" height="432px" frameBorder="0"></iframe>

However, this rule has some redundancy. Both pattern clauses contain:

```yml
public $RETURN $METHOD(...){
  ...
}
```

But pulling this container out as a `pattern-inside` and rewriting the rule as: 

```yml
rules:
  - id: find-unverified-transactions-inside
    patterns:
      - pattern-inside: |
          $RETURN $METHOD(...) {
            ...
          }
      - pattern: |
          ...
          make_transaction($T);
          ...
      - pattern-not: |
          ...
          verify_transaction($T);
          ...
          make_transaction($T);
          ...       
```

is not successful - [try it out](https://semgrep.dev/playground/s/KZOd?editorMode=advanced) if you like!

With the knowledge above about how `pattern-not` operates, we can see that this is because the matches are not the same size. The `pattern-not` is larger, but at the same level. This matches the criteria for switching to `pattern-not-inside`:

```yml
- pattern-not-inside: |
    ...
    verify_transaction($T);
    ...
    make_transaction($T);
    ...       
```

With that change, the rule successfully matches the example code.

For more on `pattern-not-inside`, check out this video from our team:

<iframe class="yt_embed" width="100%" height="432px" src="https://www.youtube.com/embed/g_Yrp9_ZK2c" frameborder="0" allowfullscreen></iframe>
