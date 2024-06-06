---
description: Learn the rule and file performance principles to abide by when scanning repositories to optimize scan times.
tags:
  - Rules
  - Semgrep Registry
  - Semgrep Code
---



# Performance principles for rules and files to abide by when scanning repositories

## Rules

The amount of time required for rules to run scales better than linearly when
adding interfile rules, which are those with `interfile: true` in the `options` key.
That is, doubling the number of interfile rules increases the runtime, but not
by double. However, some rules run faster than others, and adding a slow rule
when all the rest are fast can cause a significant slowdown.

Rules are slower if the sub-patterns, such as `pattern: <... $X ...>`, result in
a greater number of matches. When writing rules, pay special attention to the
problems raised by sub-pattern matches. The most important factor for runtime is
the time spent adding to various lists or sets.

You can benchmark your rules by adding the `--time` flag to your `semgrep scan`
command. When you use this flag, your results return with a timing summary; if
your output format is JSON, you'll see times for each rule-target pair.

## Files

Generally, the time required to scan files scales linearly with the number of
files scanned, but file size is still important. Overall, the time taken is
**time for setup work + time for matching**. For setup work, files aren’t
analyzed alone but in groups of mutually dependent files called strongly
connected components (SCCs).

The time for setup work is **number of SCCs * time for each SCC**, where the
time for each SCC grows, in the worst case, exponentially up to certain limits
set by Semgrep. This means that making SCCs larger with more mutually dependent
files affects scan time more negatively than adding more SCCs.

The time for matching is **number of files * time to match each file**. The time
to check each file can also grow, in the worst case, exponentially, especially
when a rule has a lot of matches in subpatterns. However, the default settings
of `--timeout 30` `--timeout-threshold 3` means that a file times out if:

* 30 seconds elapse without the match process completing
* 3 rules time out

You can configure these flags to skip long files after a shorter timeout period
or when a smaller number of rules timeout. Usually, Semgrep matches files pretty
quickly, but minified Javascript files can cause significant performance issues.

Semgrep sets a limit of 1 MB for each file scanned, but you can modify this
setting using the `--max-target-bytes` flag. For example, if your flag is
`--max-target-bytes=1500000`, Semgrep ignores any larger file. You can get a
full list of files Semgrep skips by including the `--verbose` flag and
inspecting `ci.log`. This information helps you determine the feasibility of
including those files and whether you should adjust the maximum file size limit
to scan such files.
