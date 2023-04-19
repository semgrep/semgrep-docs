---
slug: taint-labels
append_help_link: true
description: "Taint labels increase the expressiveness of taint-mode by allowing to specify and track different kinds of taint through labels."
---

# Taint labels

Taint labels increase the expressiveness of taint analysis by allowing you to specify and track different kinds of tainted data in one rule using labels. This functionality has various uses, for example, when data becomes dangerous in several steps that are hard to specify through single pair of source and sink.

To include taint labels into a taint mode rule, follow these steps:

1. Attach a `label` key to the taint source. For example, `label: TAINTED` or `label: INPUT`. See the example below:
    ```yaml
      pattern-sources:
        - pattern: user_input
          label: INPUT
    ```
    Semgrep accepts any valid Python identifier as a label.

2. Restrict a taint source to a subset of labels using the `requires` key. Extending the previous example, see the `requires: INPUT` below:
    ```yaml
        pattern-sources:
          - pattern: user_input
            label: INPUT
          - pattern: evil(...)
            requires: INPUT
            label: EVIL
    ```
    Combine labels using the `requires` key. To combine labels, use Python Boolean operators. For example: `requires: LABEL1 and not LABEL2`.

3. Use the `requires` key to restrict a taint sink in the same way as source:
    ```yaml
        pattern-sinks:
          - pattern: sink(...)
            requires: EVIL
    ```

:::info
- Semgrep accepts valid Python identifiers as labels.
- Restrict a source to a subset of labels using the `requires` key. You can combine more labels in the `requires` key using Python Boolean operators. For example: `requires: LABEL1 and not LABEL2`.
- Restrict a sink also. The extra taint is only produced if the source itself is tainted and satisfies the `requires` formula.
:::

In the example below, let's say that `user_input` is dangerous but only when it passes through the `evil` function. This can be specified with taint labels as follows:

<iframe src="https://semgrep.dev/embed/editor?snippet=PwKY" border="0" frameBorder="0" width="100%" height="432"></iframe>

## Creating taint label rules

See the following video where taint labels are used to detect XXE vulnerabilities:

<iframe class="yt_embed" width="100%" height="432px" src="https://www.youtube.com/embed/lAbJdzMUR4k" frameborder="0" allowfullscreen></iframe>

<!--
TODO: For some reason the embedded editor doesn't like the rule, even though the Playground can run it.

Interestingly, you can (ab)use taint labels to write some [typestate analyses](https://en.wikipedia.org/wiki/Typestate_analysis)!

<iframe src="https://semgrep.dev/embed/editor?snippet=DYxo" border="0" frameBorder="0" width="100%" height="432"></iframe>
-->
