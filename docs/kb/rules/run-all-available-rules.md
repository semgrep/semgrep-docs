---
description: How do I run all available rules on my repository?
tags:
  - Rules
  - Semgrep Registry
  - Semgrep Code
---

# Running all available rules on a repository

To scan with all rules available in the [Semgrep Registry](https://semgrep.dev/explore), run the following command in your repository directory:

```
semgrep --config=r/all .
```

If you are not logged in, `--config=r/all` runs public rules from the Semgrep Registry, including community-authored rules.

If you are logged in, this command also runs:

* Your organization's private rules that have been published to the Registry
  - Unlisted private rules do not run with `--config=r/all`.
* Semgrep Pro rules, if you have access to them

Refer to the following snippet for a sample output of `config=r/all` while logged in through `semgrep ci`:

```
┌─────────────┐
│ Scan Status │
└─────────────┘
  Scanning 8453 files tracked by git with 3248 Code rules, 451 Pro rules:
                                                                                                                        
  Language      Rules   Files          Origin      Rules                                                                
 ─────────────────────────────        ───────────────────                                                               
  <multilang>     289   16870          Community    2432                                                                
  html              4    2783          Pro rules     451                                                                
  java            437    2763          Custom        365                                                                
  bash              8      29                                                                                           
  yaml             89       5                                                                                           
  js              550       4                                                                                           
  dockerfile       40       1                                                                                           
                                                                                                                        
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100% 0:02:31   
```

Running all rules is likely to produce many findings, including some false positives (noise).

## Troubleshooting "invalid configuration file found" error

If you see the following error:

```
[ERROR] invalid configuration file found (1 configs were invalid)
```

There is a syntax or other error in one of your custom rules.

Enter the following commands as a workaround:

```
semgrep --config r/all . -d
semgrep --config ~/.semgrep/semgrep_rules.json .
```

The first command creates a cache of rules in `semgrep_rules.json` within the `.semgrep` directory in your home folder which omits the invalid rule. The second command runs a Semgrep scan using the local rule cache.
