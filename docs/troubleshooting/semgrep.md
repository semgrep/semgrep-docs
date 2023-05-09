---
slug: semgrep
description: "Get more information when Semgrep hangs, crashes, times out, or runs very slowly."
title: Troubleshooting
hide_title: true
append_help_link: true
---

import MoreHelp from "/src/components/MoreHelp"

# Troubleshooting Semgrep CLI

## Semgrep exited with code -11 (or -9)

This can happen when Semgrep crashes, usually as a result of memory exhaustion. `-11` and `-9` are the POSIX signals raised to cause the crash. Try increasing your stack limit, as suggested (`ulimit -s [limit]`). If you are working in a container where you can set the memory you are working with, you can also try increasing this limit. Alternatively, you can add `--max-memory [limit]` to your Semgrep run, which will stop a rule/file scan if it reaches the limit.

Additionally, you can run Semgrep in single-threaded mode with `--jobs 1`. This reduces the amount of memory used compared to running multiple jobs.

When reporting these errors, please include the rule it failed on, the total size of the files (or the files themselves if possible!), the maximum memory used by Semgrep (an estimate from `top` is fine), and your system specifications.

## Semgrep is too slow

We record Semgrep runtimes for each file and rule. This information is displayed when you include `--time`. How you choose to interact with the `--time` output depends on your goals.

### I just want Semgrep to run faster

Just run Semgrep with `--time` and not `--json`. This will output a list of the rules and files that took the longest. Often, you will find that those files shouldn't have been scanned in the first place.

The first step to improving Semgrep's speed is limiting its run to only the files you care about. You can do this by adding a `.semgrepignore` file. See [how to ignore files & directories in Semgrep CI](/ignoring-files-folders-code/).

If Semgrep is still running slowly, examine the output and identify the slowest rules. You may find that some of them don't apply to your codebase and can be skipped.

### I am a contributor who wants to improve Semgrep's engine

#### Interpreting the result object

For full timing information, run Semgrep with `--time` and `--json`. In addition, you will want to `time` the entire command to get the true wall time. The full command would look sometthing like:

<pre class="language-bash"><code>time semgrep --config=auto <span className="placeholder">PATH/TO/SRC</span></code></pre>
Substitute the optional placeholder <code><span className="placeholder">PATH/TO/SRC</span></code> with the path to your source code.

Here is an example result object.

```JSON
{
  "errors": [],
  "results": [],
  "time": {
    "profiling_times": {
      "config_time": 0.10301780700683594,
      "core_time": 0.0883018970489502,
      "ignores_time": 2.7894973754882812e-05,
      "total_time": 0.1915416717529297
    },
    "rule_parse_info": [
      0.0011630058288574219
    ],
    "rules": [
      {
        "id": "Users.emma.workspace.testing.error_configs.use-sys-exit"
      }
    ],
    "targets": [
      {
        "match_times": [
          0
        ],
        "num_bytes": 444,
        "parse_times": [
          0
        ],
        "path": "/Users/emma/workspace/testing/situations_test/no_token_location.py",
        "run_times": [
          0.0006248950958251953
        ]
      }
    ],
    "total_bytes": 444
  }
}
```

All the information about timing is contained under `time`.

The first section is `profiling_times`. This contains wall time durations of various steps we consider interesting: getting the rule config files (`config_time`), running the main engine (`core_time`), and processing the ignores (`ignores_time`). The `total_time` field represents the sum of these steps.

The remaining fields report engine performance. Together, `rule_parse_info` and `targets` should capture all the time spent running `semgrep-core`.

`rule_parse_info` is straightforward. It records the time spent parsing each rule.

`targets` poses more difficulty. Since files are run in parallel, the amount of time spent parsing (`parse_times`) and matching (`match_times`) will inevitably be meaningless compared against `total_time` or `core_time`. Therefore, the total run time (`run_times`) of each target for each rule is taken within the parallel run. This helps contextualize the time spent parsing and matching each target. The sum of the run times thus can (and usually should) be longer than the total time.

The lists `rule_parse_info`, `match_times`, `parse_times`, and `run_times` are all in the same order as `rules`. That is, the parse time of rule `rules[0]` is `rule_parse_info[0]`.

Note that `parse_times` is given for each rule, but a file should only be parsed once (the first number). Afterwards, the parse time represents the time spent retrieving the file's AST from the cache.

#### Negative values in the metrics

When a time is not measured, by default it has the value -1. It is common to a have a normal runtime but -1 for the parse time or match time; this indicates an error in parsing.

#### Tips for exploring Semgrep results

There are several scripts already written to analyze and summarize these timing data. Find them in [`scripts/processing-output`](https://github.com/returntocorp/semgrep/tree/develop/scripts/processing-output). If you have a timing file, you will probably want to run

```bash
python read_timing.py [your_timing_file]
```

You may need to adjust the line `result_times = results` based on whether you have a timing file or the full results (in which case this should be `result_times = results["time"]`)

## How to get help

Please check the [Support](/support/) page to get help from the Semgrep maintainers & community, via Slack, GitHub, email, or phone.

<MoreHelp />
