# Troubleshooting "You are seeing this because the engine was killed" on monorepositories

Scans can fail to complete on large monorepositories. This article describes possible solutions, such as

- Scanning the components of the monorepository separately.
- Serializing the type of scan performed.
- In CI jobs, increasing the RAM of the job runner.

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

## Determining the size of your monorepository 

By default, Semgrep places resource limitations on the size of file scanned and memory allocated.

However, Semgrep does not place limitations on the number of files scanned and scanning a large monorepository can involve thousands of lines of code. Thus, the first course of action is to determine exactly how many files are getting scanned:

1. View your CI logs. This step depends on your CI provider.
2. Search for the section "Scan Status".

The following is an example of a large monorepository:


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

Now you have a good idea of the size of your monorepository. After establishing the size and breakdown of programming languages and files, you can decide what adjustments to take for a scan to succeed.

## Scanning components separately 

Based on the composition provided by the logs, you may be able to determine if your repository is modular. If so, you can try scanning the components separately.

Interfile analysis still applies in the smaller scope assuming the modules are disparate. 

### Scanning schedule

You can perform modular scans on a daily basis and then perform one big monolithic scan every two weeks or so to keep close tabs and cap any false negative interfile or inter-component outliers that can get introduced with code change as a way of truing up your dependency graph for the monolithic build. This helps deflect costs as you are scanning the majority on smaller runners/k8s.  

However, you still need to address that monolithic build - whether you scan it biweekly or daily - and the following sections apply to tackling that monolith whether you adopt the modular paradigm of scanning or not. 

## Serializing types of scans

With Semgrep 1.42.0 and later, Secret rulesets are now included in the default scan configuration.  Instead of scanning Code, Supply Chain and Secret rulesets concurrently, you can circumnavigate resource limits by running different types of scans in a serial fashion.  Rather than issuing one monolithic command, for example:

```console
 $ semgrep ci
```
 
You can instead run:
 
 ```
$ semgrep ci --code --pro
$ semgrep ci --supply-chain --oss-only
$ semgrep ci --secrets
 
 ```

As a result, less memory is used in total at any point in time.

## Required Memory

If you have determined that the tweaking recommendations above are not sufficient for such a large code base, you now need to establish the hardware sufficient to be able to handle such a large code base.  First and foremost, you want to establish how much memory is required to scan.  Determining the minimal, total amount of memory required is key, not just to avoid killed scans but running scans that use swap memory.   You never want your scans to get snagged into using swap in any static analysis tool - not just Semgrep but all other vulnerability scanners.  Running a scan utilizing swap memory will seriously decrement the scan performance as swap memory is memory on disk and scanning programs such as Semgrep are disk I/O intensive and swapping in and out with a swap file will bear significant overhead and will peg performance severely.  

- In the nascent phases of your monorepo rollout, start with a relatively larger runner or k8 that has lots of memory.

- Perform the scan with a -j 1 configuration; no parallelization of subprocesses.  

- Enable a swap monitor for the entire duration of the scan to ensure an accurate assessment of RAM used, for example, running a script that samples the memory frequently: 

```
$ free -m 
```

to see both your ram and your swap space usage in Linux. 


* Then perhaps add 10% more RAM to your final memory tally to account for churn, increase in code, etc.  This is something you will need to guage.  


## Parallelization

Once you have determined the RAM sufficient to scan your large code base, you can now introduce parallezation to speed up the subproccesses that can be parallelized, for larger k8's and runners charge on a time basis, so it now becomes a study of feasiblity to achieve the optimal configuration.  

You may want to start with a large k8 pod but still only run with one job with -j 1 set so that you can determine what the total memory is required for this kind of job.  Then, you can pare this memory usage somewhat - and I will be reserved in stating that you never get true parallelism, that is, if you specify -j 2 only half the memory is required as there is overhead in scheduling the parallelism - all the whilst still monitoring for any swap usage.  
If that goes well, you can experiment with a -j 4 configuration and double down on decreasing the scan time in nearly half, etc.  Since kpods are charging per/minute, it will serve you well to determine the optimal configuration in bumping up the number of parallel jobs to speed up the scan.  Thus, a balancing act between achieving full scan coverage and keeping your overhead costs down as much as possible.  

We would expect to see more total RAM than -j 1 but not exactly half per thread.  Codebases are highly variant and we can't peg x number of lines/MB, that sort of benchmarking.  But there is overhead in parallelization, so you would not get a true halving of RAM required going from 1 to 2 jobs.  In fact, the total RAM required will likely be more for a -j 2 job than a -j 1 job, but you should see a decrease in total time.  This is why the empirical testing is important, to find where the right balance is in total time spent vs cost.
