# You are seeing this because the engine was killed: how to scan a large monorepo. 

You've started scanning that big, monolithic repo, but find the scans are not completing
and in fact, the Semgrep scan engine is terminating prematurely, getting killed at some point in the scan process and the following articulation in the ci.log:

```
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

Furthermore, you've tried the recommendations outlined and still incurring this error and those in kb article:  https://semgrep.dev/docs/kb/semgrep-code/semgrep-scan-troubleshooting/#memory-usage-issues-oom-errors and still, the scan engine is getting killed.  What to do? 


## Background

By default, Semgrep does place some resource limitations on the size of file scanned and memory allocated:


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
           


But Semgrep does not place limitations on the number of files scanned and scanning a large monorepo can involve thousands of lines of code.  Thus, the first course of action is determine exactly how many files are getting scanned and the ci.log for the failed action is a good place to start.  Within the ci.log file Semgrep articulates the file profile for the repo in question.  Searching within this file for the section "Scan Status", you will find the file breakdown identified.  For example:

```
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

Now you have a good idea to deem whether the repo in question is indeed a monorepo or not and whether special configurations should be put in place for this large codebase.  

## Can this be broken down into smaller scanning pieces? 

If your repo is pretty modular, you might consider scanning the components separately.  Interfile analysis, if indeed you are scanning for interfile analysis, will still apply in the smaller scope assuming the modules are disparate.  The following kind of configuration may be of consideration: performing modular scans on a daily basis and then performing one big monolithic scan every two weeks or so to keep close tabs and cap any false negative interfile/inter-component outliers that can get introduced with code change as a way of truing up your dependency graph for the monolithic build.  This helps deflect costs as you are scanning the majority on smaller runners/k8s.  

However, you still need to address that big monolithic build - whether you scan it biweekly or daily - and the following applies to tackling that big repo whether you adopt the modular paradigm of scanning or not. 

## Serializing rulesets

With Semgrep 1.42.0 and later, Secret rulesets are now included in the default scan configuration.  Instead of scanning Code, Supply Chain and Secret rulesets concurrently, you may find that you can circumnavigate resource limits by scanning rulesets in a serial fashion.  Rather than issuing one monolithic command, for example:

```
 $ semgrep ci
 ```
 
 Instead, you might introduce this scanning serialization:
 
 ```
$ semgrep ci --code --pro
$ semgrep ci --supply-chain --oss-only
$ semgrep ci --secrets
 
 ```

Rather than running all three kinds of rulesets in parallel, these rulesets run in succession, and thus, less memory used in total at any point in time.


## Required Memory

If you have determined that the tweaking recommendations above are not sufficient for such a large code base, you now need to establish the hardware sufficient to be able to handle such a large code base.  First and foremost, you want to establish how much memory is required to scan.  Determining the minimal, total amount of memory required is key, not just to avoid killed scans but running scans that use swap memory.   You never want your scans to get snagged into using swap in any static analysis tool - not just Semgrep but all other vulnerability scanners.  Running a scan utilizing swap memory will seriously decrement the scan performance as swap memory is memory on disk and scanning programs such as Semgrep are disk I/O intensive and swapping in and out with a swap file will bear significant overhead and will peg performance severely.  

* In the nascent phases of your monorepo rollout, start with a relatively larger runner or k8 that has lots of memory.

* Perform the scan with a -j 1 configuration; no parallelization of subprocesses.  

* Enable a swap monitor for the entire duration of the scan to ensure an accurate assessment of RAM used, for example, running a script that samples the memory frequently: 

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
