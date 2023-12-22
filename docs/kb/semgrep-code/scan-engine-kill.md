---
append_help_link: true
title: Troubleshoot monorepo scan failures
hide_title: true
description: Troubleshoot scan failures on monorepos by studying logs, compartmentalizing scans, increasing RAM, and running jobs in parallel.
tags:
  - Semgrep Code
---

# Troubleshooting "You are seeing this because the engine was killed" on monorepos

Scans can fail to complete on large monorepos. This article describes possible solutions, such as:

- [Scanning the components of a monorepo separately](https://semgrep.dev/docs/kb/semgrep-ci/scan-monorepo-in-parts/).
- Serializing the type of scan performed.
- Increasing the RAM of the job runner for CI jobs.

Given the following log or similar:

```
[ERROR] Error while running rules:
          You are seeing this because the engine was killed.

          The most common reason this happens is because it used too much memory.
          If your repo is large (~10k files or more), you have three options:
          1. Increase the amount of memory available to semgrep
          2. Reduce the number of jobs semgrep runs with via `-j <jobs>`.  We
            recommend using 1 job if you are running out of memory.
          3. Scan the repo in parts (contact us for help)

          Otherwise, it is likely that semgrep is hitting the limit on only some
          files. In this case, you can try to set the limit on the amount of memory
          semgrep can use on each file with `--max-memory <memory>`. We recommend
          lowering this to a limit 70% of the available memory. For CI runs with
          interfile analysis, the default max-memory is 5000MB. Without, the default
          is unlimited.

          The last thing you can try if none of these work is to raise the stack
          limit with `ulimit -s <limit>`.

          If you have tried all these steps and still are seeing this error, please
          contact us.

           Error: semgrep-core exited with unexpected output
```

## Determining the size of your monorepo

By default, Semgrep places resource limitations on the size of file scanned and memory allocated.

However, Semgrep does not place limitations on the number of files scanned and scanning a large monorepo can involve thousands of files. Thus, the first course of action is to determine exactly how many files are getting scanned:

1. View the Semgrep scan output in your CI logs. This step depends on your CI provider.
2. In the CI logs, search for the section **Scan Status**.

A sample Semgrep scan ouptut can look like this:

```console
┌─────────────┐
│ Scan Status │ 
└─────────────┘ 
  Scanning 91749 files tracked by git with 1068 Code rules, 498 Pro rules:
            
  Language      Rules    Files          Origin      Rules
 ──────────────────────────────        ───────────────────
  <multilang>      60   199251          Community     551
  ts              166    26672          Pro rules     498
  python          314     8089          Custom         19
  scala            13     5415
  json              1     4149       
  yaml              7     1952
  js              160     1084      
  terraform        13      470      
  bash              4      408           
  go               95      228
  ruby             22      228
  php              25       99
  swift            41       89
  html              1       72         
  dockerfile        2       31           
  c                 9       16
  rust             49        8
  java            156        2
  kotlin           47        1
```

Now you have a good idea of the size of your monorepo. After establishing the size and breakdown of your files by programming language, you can decide what adjustments to take for a scan to succeed.

## Scanning components separately 

Based on the composition provided by the logs, you may be able to determine if your repository is modular. If so, you can try [scanning the components separately](https://semgrep.dev/docs/kb/semgrep-ci/scan-monorepo-in-parts/).

[<i class="fa-regular fa-file-lines"></i> Interfile analysis](/docs/semgrep-code/semgrep-pro-engine-intro/#types-of-semgrep-pro-engine-analysis) still applies in the smaller scope assuming the modules are disparate. 

## Serializing types of scans

Instead of running Semgrep products concurrently, you can circumnavigate exhausting resource limits by scanning Code, Supply Chain, and Secrets in a serial fashion.  Rather than issuing one monolithic command, for example:

```console
 semgrep ci
```
 
You can instead run:
 
 ```
semgrep ci --code
semgrep ci --supply-chain
semgrep ci --secrets
 ```

As a result, less memory is used in total at any point in time.

## Increasing RAM 

Lastly, you can also tackle a large scan by increasing the RAM.

### Establish RAM baseline and avoid swap memory

First, establish how much memory is required to scan. Determining the total amount of memory required is key, not just to avoid killed scans but also to avoid running scans that use swap memory. Semgrep and other SAST tools are disk I/O intensive and swapping in and out with a swap file reduces performance severely.

- In the early phases of your scan deployment, start with a relatively larger runner or Kubernetes pod that has lots of memory.
- Perform the scan with the `-j 1` option ([see CLI reference](/docs/cli-reference/)). This sets the number of jobs to 1 (no parallelization of subprocesses).
- Enable a swap monitor for the entire duration of the scan to ensure an accurate assessment of RAM used, for example, running a script that samples the memory frequently: 
```
$ free -m 
```
to see both your RAM and your swap space usage in Linux. 
- Then perhaps add 10% more RAM to your final memory tally to account for churn, increase in code, and so on.  This is something you must gauge.

## Parallelization

Once you have determined the RAM sufficient to scan your large codebase, you can now introduce parallelization to speed up the scan.

Per the previous section, you have determined the total memory required for a `-j 1` configuration. Now, you can begin testing different parallelization configurations, such as specifying `-j 2`, all the whilst still monitoring for any swap usage.

If that succeeds, you can experiment with a `-j 4` configuration and continue monitoring scan time for improvements.  Keeping resource costs in mind, it serves well to determine the optimal configuration in bumping up the number of parallel jobs to speed up the scan. Thus, there is a balancing act between achieving faster scans and keeping your overhead costs down as much as possible. 

Furthermore, there is overhead in parallelization: the total RAM required for a `-j 2` scan is greater than a `-j 1` scan for the same codebase, but you should see a decrease in total scan time.

## Scanning schedule

We recommend performing modular scans on a daily basis along with one comprehensive monolithic scan every two weeks or so to address code introduced outside the scope of the modular scans. This helps true-up your dependency graph for the monolithic build and optimizes scan feasibility.
