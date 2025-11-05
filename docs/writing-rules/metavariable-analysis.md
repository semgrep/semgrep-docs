---
slug: metavariable-analysis
append_help_link: true
description: "metavariable-analysis allows Semgrep users to check metavariables for common problematic properties, such as RegEx denial of service (ReDoS) and high-entropy values."
tags:
 - Rule writing
---

# Metavariable analysis

Semgrep developed metavariable analysis to support several metavariable inspection techniques that are difficult to express with existing rules, but have "simple" binary classifier behavior. Currently, this syntax supports two analyzers: `redos` and `entropy`.

## ReDoS

```yaml
metavariable-analysis:
    analyzer: redos
    metavariable: $VARIABLE
```

Poorly constructed regular expressions that exhibit exponential runtime when fed specifically crafted inputs can cause RegEx denial of service. The `redos` analyzer uses known RegEx anti-patterns to determine if the target expression is potentially vulnerable to catastrophic backtracking.

<iframe src="https://semgrep.dev/embed/editor?snippet=2Aoj" border="0" frameBorder="0" width="100%" height="432" loading="lazy"></iframe>

## Entropy

```yaml
metavariable-analysis:
    analyzer: entropy
    metavariable: $VARIABLE
```

Entropy is a common approach for detecting secret strings. Many existing tools utilize a combination of entropy calculations and regular expressions (RegEx) for secret detection. This analyzer returns `true` if a metavariable has high entropy, or randomness, relative to the English language.

<iframe src="https://semgrep.dev/embed/editor?snippet=GgZG" border="0" frameBorder="0" width="100%" height="432" loading="lazy"></iframe>
