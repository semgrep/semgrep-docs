---
description: How do I run all available rules on my repository?
tags:
  - Rules
  - Semgrep Registry
  - Semgrep Code
---

# Run all available rules on a repository

To run all rules that are available within the [Semgrep Registry](https://semgrep.dev/explore) without using the Rule board, enter the following command:

```
semgrep --config=r/all
```

This command runs the following rules from the Semgrep Registry:

* All public or community-written rules
* Your organization's private rules, if you are logged in 
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

If you are not logged in, `config=r/all` runs public rules only.

## Troubleshooting invalid configuration file

The following error may occur:

```
[ERROR] invalid configuration file found (1 configs were invalid)
```

This error appears if there is a syntax or other error within any of your custom rules.

Enter the following two commands as a workaround:

```
semgrep --config r/all . -d
semgrep --config ~/.semgrep/semgrep_rules.json .
```
