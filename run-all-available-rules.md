---
description: How do I run all available rules on my repository?
tags:
  - Rules
  - Semgrep Registry
  - Semgrep Code
---

# How to run all available rules on a repository.

If you would like to run all rules that are available within the [Semgrep Registry](https://semgrep.dev/explore) and are not willing to add all available rules/rulesets to the Rule Board or add a variety of `--config` entries, what you can do is run the following command:

```
semgrep --config=r/all
```

This command will pull out all available public, org private, and pro tiered rules if you have access to them. Below is an example output:

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
The above example output is when you are running `--config=r/all` while logged in via `semgrep ci`. If you are not logged in you will just use the public rules within `r/all`.

However there is one error that you should be wary about which is the following:

```
[ERROR] invalid configuration file found (1 configs were invalid)
```

This error may come up when running `r/all` if there is a current error within any of your custom/private rules.

To get around this you can use the following two commands as a workaround:

```
semgrep --config r/all . -d
semgrep --config ~/.semgrep/semgrep_rules.json .
```
