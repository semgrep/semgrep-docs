---
slug: taint-labels
append_help_link: true
description: "Taint labels increase the expressiveness of taint-mode by allowing to specify and track different kinds of taint through labels."
---

# Taint labels

Previously taint mode could only track one kind of taint, data was either tainted or clean and that had to be specified using no more than a single pattern operator. Sometimes this is not enough. For example, data may become _dangerous_ through several steps that are not easily specified with a single pair source-sink. Taint labels increase the expressiveness of taint-mode by allowing to specify and track different kinds of taint through labels. 

We can attach labels to taint sources with the `label` key, e.g. `label: TAINTED`. Any valid Python identifier is accepted as a label. With that, the taint produced by a source will be labeled accordingly and can be individually tracked. A sink can be restricted to a subset of labels, using the `requires` key and a Python Boolean expression over labels, e.g. `requires: LABEL1 and not LABEL2`. A source can also be restricted via the `requires` key in the same way as a sink, in which case extra taint will only be produced if the source itself is tainted an satisfies the `requires` formula.

For example, let's say that `user_input` is dangerous but only when it passes through the `evil` function. We could specify this with taint labels as follows:

<iframe src="https://semgrep.dev/embed/editor?snippet=PwKY" border="0" frameBorder="0" width="100%" height="432"></iframe>

<!--
TODO: For some reason the embedded editor doesn't like the rule, even though the Playground can run it.

Interestingly, you can (ab)use taint labels to write some [typestate analyses](https://en.wikipedia.org/wiki/Typestate_analysis)!

<iframe src="https://semgrep.dev/embed/editor?snippet=DYxo" border="0" frameBorder="0" width="100%" height="432"></iframe>
-->
