# Rule/file performance principles to abide by

## Order of growth


For rules, the time scales better than linearly with the number of interfile rules (rules with interfile: true in the options). However, there are slower and faster rules, and adding a slow rule when all the rest are fast can cause a significant slowdown. Rules are generally slower if the sub-patterns cause more matches (e.g. pattern: <... $X ...>). 

You can benchmark the rules by adding the following flag, from the `semgrep scan --help` pages:

```
       --time
           Include a timing summary with the results. If output format is
           json, provides times for each pair (rule, target).
```

For files, the time scales roughly linearly with the number of files scanned, but file size is also important. Overall, the time taken = setup work + time for matching. For setup work, files aren’t analyzed alone, but in groups of mutually dependent files (SCCs).

The time for setup work is number of SCCs * time for each SCC, where the time for each SCC can grow worst case exponentially up to certain limits we’ve set. This means that making SCCs larger with more mutually dependent files is worse than adding more SCCs.

Semgrep sets a limit of 1MB for default filesize to scan.  From the `semgrep scan --help` pages:

```
       --max-target-bytes=VAL (absent=1000000)
           Maximum size for a file to be scanned by Semgrep, e.g '1.5MB'. Any
           input program larger than this will be ignored. A zero or negative
           value disables this filter. Defaults to 1000000 bytes
```

and with the `--verbose` flag, you can inspect the ci.log for those files that have been skipped by default and determine 1) the feasibility of including these files and 2) whether the default limit should be adjusted.  

The time for matching is number of files * time to match each file. The time to match each file can also grow worst-case exponentially when a rule has a lot of matches in subpatterns, but each file is allowed 30 seconds 3 times by default (that’s the default of --timeout 30 --timeout-threshold 3). You can configure this to skip long files slower or faster. Usually Semgrep matches files pretty quickly, but minified Javascript files can cause big performance issues. 

If you’re writing rules, we really emphasize this problem of sub-pattern matches, because what we have found empirically  is that the most important factor for runtime is usually the time spent adding to various lists/sets. We’re also looking into improvements on our end, but memory operations will always be a source of slowness. 
