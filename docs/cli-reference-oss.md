---
slug: cli-reference-oss
append_help_link: true
description: "Reference for the Semgrep command-line interface including options and exit code behavior."
tags:
    - Semgrep CLI
    - Semgrep Code
    - Team & Enterprise Tier
hide_title: true
title: CLI reference
---

import MoreHelp from "/src/components/MoreHelp"
import CLIHelpOutput from '/src/components/reference/_cli-help-output.md'
import CLIHelpScanOutput from '/src/components/reference/_cli-help-scan-output.md'

<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>

# CLI reference

This document provides the outputs of the `semgrep --help` and `semgrep scan --help` commands of the [Semgrep command-line interface (CLI)](https://github.com/semgrep/semgrep). In addition, this page also gives an overview of the Semgrep CLI exit codes.

## Semgrep commands

For a list of available commands, run the following command:

```bash
semgrep --help
```

Command output:

<CLIHelpOutput />

## Semgrep scan command options

To list all available `semgrep scan` options, run the following command:

```bash
semgrep scan --help
```

Command output:

<CLIHelpScanOutput />

## Ignoring Files

The Semgrep command line tool supports a `.semgrepignore` file that follows `.gitignore` syntax and is used to skip files and directories during scanning. This is commonly used to avoid vendor and test related code. For a complete example, see the [.semgrepignore file on Semgrep’s source code](https://github.com/semgrep/semgrep/blob/develop/.semgrepignore).

In addition to `.semgrepignore` there are several methods to set up ignore patterns. See [Ignoring files, folders, or code](/ignoring-files-folders-code).

## Connecting to Semgrep Registry through a proxy

Semgrep uses the Python3 `requests` library. Set the following environment variables to point to your proxy:

<pre>
export HTTP_PROXY="<span className="placeholder">HTTP_PROXY_URL</span>"<br />
export HTTPS_PROXY="<span className="placeholder">HTTPS_PROXY_URL</span>"
</pre>

For example:

<pre>
export HTTP_PROXY="http://10.10.1.10:3128" <br />
export HTTPS_PROXY="http://10.10.1.10:1080"
</pre>

## Exit codes

<!-- Source code reference - the exit codes are located in the Semgrep repository - https://github.com/semgrep/semgrep/blob/develop/cli/src/semgrep/error.py. -->

Semgrep can finish with the following exit codes:

- **0**: Semgrep ran successfully and found no errors (or did find errors, but the `--error` flag is **not** being used).
- **1**: Semgrep ran successfully and found issues in your code (while using the `--error` flag).
- **2**: Semgrep failed.
- **3**: Invalid syntax of the scanned language. This error occurs only while using the `--strict` flag.
- **4**: Semgrep encountered an invalid pattern in the rule schema.
- **5**: Semgrep configuration is not valid YAML.
- **7**: At least one rule in the configuration is invalid.
- **8**: Semgrep does not understand specified language.
- **13**: The API key is invalid.
- **14**: Semgrep scan failed.

:::tip
To view the exit code when running `semgrep scan`, enter the following command immediately after the scan finishes:
```console
echo $?
```
The output is a single exit code, such as:
```console
1
```
:::

<!-- REMOVED STATUSES (NOT USED ANYMORE)
- 4: Semgrep encountered an invalid pattern.
- 6: Rule with `pattern-where-python` found but `--dangerously-allow-arbitrary-code-execution-from-rules` was not set. See `--dangerously-allow-arbitrary-code-execution-from-rules`. (Note: `pattern-where-python` is no longer supported in Semgrep, so this applies only to legacy Semgrep versions).
- 9: Semgrep exceeded match timeout. See `--timeout`.
- 10: Semgrep exceeded maximum memory while matching. See `--max-memory`.
- 11: Semgrep encountered a lexical error when running rule on a file.
- 12: Semgrep found too many matches.
-->

<MoreHelp />
