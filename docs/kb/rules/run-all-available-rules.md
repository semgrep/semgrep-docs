---
description: Learn how to run all available rules on your repository.
tags:
  - Rules
  - Semgrep Registry
  - Semgrep Code
append_help_link: true
---



# Run all available rules on a repository

To scan your repository with all of the rules available in the [Semgrep Registry](https://semgrep.dev/explore), navigate to the root of your repository and run:

```
semgrep --config=r/all .
```

If you are *not* logged in, `--config=r/all` runs all public rules from the Semgrep Registry, including community-authored rules.

If you are logged in, `--config=r/all` runs all public rules from the Semgrep Registry, including community-authored rules, plus:

* Your organization's private rules in the Registry, excluding unlisted private rules
  * This excludes unlisted private rules
* Semgrep Pro rules, if you have a Team or Enterprise subscription

:::warning
Running all rules is likely to produce many findings and generate noise in the form of false positives.
:::

## Error: "invalid configuration file found"

If you encounter the following error, there is a syntax error in one of your custom rules.

```console
[ERROR] invalid configuration file found (1 configs were invalid)
```

To work around this error, while you correct the issues in the affected configuration file, run:

```
semgrep --config r/all . -d
semgrep --config ~/.semgrep/semgrep_rules.json .
```

The first command creates a cache of rules in `semgrep_rules.json` within the `.semgrep` directory in your home folder that omits the invalid rule. The second command runs a Semgrep scan using the local rule cache.
