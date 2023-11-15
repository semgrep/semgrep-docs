---
tags:
  - Semgrep CLI
  - Logs
description: How to collect logs when running Semgrep on the command line.
---

# How to collect logs when running Semgrep in CLI

When troubleshooting Semgrep scans on the command line interface (CLI), collecting and sharing logs can be extremely helpful. By default, Semgrep prints findings from a scan to `stdout`, and other messages, including scan details and progress, to `stderr`. For troubleshooting, it's best to provide both.

To collect all relevant logs for a scan, follow these instructions. All log output options apply to both `semgrep scan` and `semgrep ci`. All examples use `semgrep ci` for simplicity, and name the output file as `semgrep.log`.

## Capturing full log output

To store the entire Semgrep log for a scan, including the findings:

```
semgrep ci &> semgrep.log
```

## Separating findings and other logs

Sometimes it's helpful to separate findings from other scan logs. Using the following commands separates the two and allows for independent review of findings and scan behavior.

Write only findings to a file, print other logs to the terminal:

```
semgrep ci > semgrep.log
```

Separate findings and logs by writing findings to `findings.txt` and logs to `semgrep.log` through either of the following commands:

```
semgrep ci -o findings.txt 2> semgrep.log
semgrep ci > findings.txt 2> semgrep.log
```

Write logs to a file, print findings to the terminal:

```
semgrep ci 2> semgrep.log
```

### Formatting findings

Semgrep can output findings in a variety of formats. By default, the findings are formatted as readable text in the terminal, but they can also be output in other formats such as JSON or SARIF. For example:

```
semgrep ci --json -o findings.json 2> semgrep.log
```

outputs findings as JSON and saves the scan log to `semgrep.log`.

In addition to findings formats, there are options to add details of the data flow (`--dataflow-traces`) or explanations of rule matching (`--matching-explanations`). These are less frequently used in overall scan troubleshooting, but can be helpful for understanding findings.

## Logging verbosity options

Semgrep has three commonly used log levels.

* Default: Prints scan progress, findings, and errors or warnings.
* Verbose (`-v` or `--verbose`): Adds list of rules and other details such as skipped files.
* Debug (`--debug`): Logs entire scan process at a very high level of detail.

The default level is useful for many common tasks such as identifying the scan in the Cloud Platform, checking which products were run, and seeing how many files were scanned with how many rules. 

Verbose logs are useful to determine which specific files were scanned and list all rules run. They provide the most useful detail when a particular file appears to be missed or it's not clear which rules are running in a scan.

Debug logs are typically collected only if very detailed debugging is needed, such as if Semgrep crashes or is running very slowly. They're often very large. 

Semgrep can also output only findings with its Quiet mode (`-q`). This is not recommended when troubleshooting.

## Additional references

See [Semgrep scan troubleshooting](/docs/kb/semgrep-code/semgrep-scan-troubleshooting) for specific troubleshooting suggestions for scans.

<MoreHelp/>