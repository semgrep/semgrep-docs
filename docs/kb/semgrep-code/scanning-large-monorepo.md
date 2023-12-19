---
append_help_link: true
title: Learn how to scan a large monorepo.
description: Learn how to scan a large monorepo.
tags:
  - Semgrep Code
---

# How to scan a large monorepo

This article walks you through scanning a large monorepo using Semgrep. Without proper preparation, your scans could take a long time or terminate prematurely and return the following error:

```console
2023-09-12T01:03:51.3518200Z [ERROR] Error while running rules:
2023-09-12T01:03:51.3540807Z           You are seeing this because the engine was killed.
2023-09-12T01:03:51.3545620Z
2023-09-12T01:03:51.3548455Z           The most common reason this happens is because it used too much memory.
2023-09-12T01:03:51.3560079Z           If your repo is large (~10k files or more), you have three options:
2023-09-12T01:03:51.3575580Z           1. Increase the amount of memory available to semgrep
2023-09-12T01:03:51.3666291Z           2. Reduce the number of jobs semgrep runs with via `-j <jobs>`.  We
2023-09-12T01:03:51.3672499Z             recommend using 1 job if you are running out of memory.
2023-09-12T01:03:51.3681798Z           3. Scan the repo in parts (contact us for help)
2023-09-12T01:03:51.3684692Z
2023-09-12T01:03:51.3690247Z           Otherwise, it is likely that semgrep is hitting the limit on only some
2023-09-12T01:03:51.3700620Z           files. In this case, you can try to set the limit on the amount of memory
2023-09-12T01:03:51.3707550Z           semgrep can use on each file with `--max-memory <memory>`. We recommend
2023-09-12T01:03:51.3713522Z           lowering this to a limit 70% of the available memory. For CI runs with
2023-09-12T01:03:51.3720156Z           interfile analysis, the default max-memory is 5000MB. Without, the default
2023-09-12T01:03:51.3729092Z           is unlimited.
2023-09-12T01:03:51.3732103Z
2023-09-12T01:03:51.3735917Z           The last thing you can try if none of these work is to raise the stack
2023-09-12T01:03:51.3743847Z           limit with `ulimit -s <limit>`.
2023-09-12T01:03:51.3750684Z
2023-09-12T01:03:51.3754569Z           If you have tried all these steps and still are seeing this error, please
2023-09-12T01:03:51.3765605Z           contact us.
2023-09-12T01:03:51.3768601Z
2023-09-12T01:03:51.3772217Z            Error: semgrep-core exited with unexpected output
```

Before proceeding, please review the [recommendations outlined regarding memory usage](/kb/semgrep-code/semgrep-scan-troubleshooting/#memory-usage-issues-oom-errors).

## Background

By default, Semgrep places limitations on the size of file scanned and memory allocated:

```console
--max-lines-per-finding=VAL (absent=10)
    Maximum number of lines of code that will be shown for each match
    before trimming (set to 0 for unlimited).

--max-memory=VAL (absent=0)
    Maximum system memory to use running a rule on a single file in
    MiB. If set to 0 will not have memory limit. Defaults to 0. For CI
    scans that use the Pro Engine, it defaults to 5000 MiB.

--max-target-bytes=VAL (absent=1000000)
    Maximum size for a file to be scanned by Semgrep, e.g '1.5MB'. Any
    input program larger than this will be ignored. A zero or negative
    value disables this filter. Defaults to 1000000 bytes.
```

However, Semgrep does not limit the number of files scanned, and scanning a large monorepo can involve a large amount of code. Therefore, if your scans do not complete, the first things to do are:

* Determine how many files Semgrep is scanning
* Obtain the `ci.log` file for the failed scan

In the `ci.log` file, search for the section `Scan Status`, which includes the file breakdown. For example, it might look something like:

```log
2023-09-12T20:08:48.3929861Z ┌─────────────┐
2023-09-12T20:08:48.3930003Z │ Scan Status │ 
2023-09-12T20:08:48.3930129Z └─────────────┘ 
2023-09-12T20:11:23.7708766Z   Scanning 91749 files tracked by git with 1068 Code rules, 498 Pro rules:
2023-09-12T20:11:24.7538063Z             
2023-09-12T20:11:24.7538887Z   Language      Rules    Files          Origin      Rules
2023-09-12T20:11:24.7588740Z  ──────────────────────────────        ───────────────────
2023-09-12T20:11:24.7589130Z   <multilang>      60   199251          Community     551
2023-09-12T20:11:24.7589478Z   ts              166    26672          Pro rules     498
2023-09-12T20:11:24.7589812Z   python          314     8089          Custom         19
2023-09-12T20:11:24.7590160Z   scala            13     5415
2023-09-12T20:11:24.7590473Z   json              1     4149       
2023-09-12T20:11:24.7590759Z   yaml              7     1952
2023-09-12T20:11:24.7591330Z   js              160     1084      
2023-09-12T20:11:24.7591642Z   terraform        13      470      
2023-09-12T20:11:24.7591954Z   bash              4      408           
2023-09-12T20:11:24.7592237Z   go               95      228
2023-09-12T20:11:24.7592524Z   ruby             22      228
2023-09-12T20:11:24.7592816Z   php              25       99
2023-09-12T20:11:24.7593106Z   swift            41       89
2023-09-12T20:11:24.7593466Z   html              1       72         
2023-09-12T20:11:24.7593764Z   dockerfile        2       31           
2023-09-12T20:11:24.7594058Z   c                 9       16
2023-09-12T20:11:24.7594338Z   rust             49        8
2023-09-12T20:11:24.7594627Z   java            156        2
2023-09-12T20:11:24.7594911Z   kotlin           47        1
```

Once you have information about how many files in the monorepo Semgrep scans, you can decide how to proceed.

## Breaking the monorepo down into smaller pieces and scanning each piece individually

If your repo is fairly modular, you might consider scanning the components separately. Interfile analysis will still apply in the smaller scope, assuming the modules are disparate. 
  
Furthermore, you can consider performing modular scans daily and larger monolithic scans every few weeks to keep tabs on and cap any false negative interfile/inter-component outliers that can get introduced with code change. This helps deflect costs as you are scanning the majority on smaller runners.

## Serializing rulesets

Beginning with Semgrep 1.42.0, Secrets rulesets are included in the default scan configuration. That said, you do not need to scan using Semgrep Code, Supply Chain, and Secret rulesets concurrently -- you may find that you can get around resource limits by serializing scans and running each ruleset by itself. For example, you may opt against running
  
```console
semgrep ci
```

in favor of 

```console
semgrep ci --code --pro 
semgrep ci --supply-chain --oss-only
semgrep ci --secrets
```

Running the rulesets individually instead of in parallel reduces the memory required.

## Increase memory allocation

If breaking the monorepo down into components for scanning and serializing rulesets isn't sufficient for your scan to complete, you may need to determine if your hardware is adequate for your scans.

Determine the minimum amount of memory required to scan your repository. Not only is this important for avoiding killed scans, it is important to avoid running scans using swap memory. Scans using swap memory will result in decreased performance since swap memory is memory on disk, and Semgrep is I/O intensive. Swapping in and out with a swap file results in significant overhead.

When determining the amount of memory required during a scan:

* Start with a larger runner or cluster with a large memory allocation.
* Perform the scan with a `-j 1` configuration, or no parallelization or subprocesses.
* Enable a swap monitor during the scan to ensure an accurate assessment of the memory used.

Once you have determined the memory allocation required, add about 10% more to account for churn, increases in the amount of code scanned, and so on.

## Parallelization

Once you have allocated sufficient memory to your scan, you can introduce parallelization to speed up the subprocesses that can be parallelized. You must experiment to find the optimal configuration for your system. For example, you may test your scan with a `-j 2` configuration. Then, if that goes well, move to a `-j 4` configuration to continue improving the scan time.

Parallelization does introduce some overhead, so you should not expect precisely 50 percent less RAM used when moving from one job to two jobs. You may even find that you need more memory for a `-j 2` job than a `-j 1` job, though your scan times will be faster.