---
slug: cli-reference
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

<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>

# CLI reference

This document provides the outputs of the `semgrep --help`, and `semgrep scan --help` commands of the [Semgrep command-line interface (CLI)](https://github.com/returntocorp/semgrep). In addition, this page also gives an overview of the Semgrep CLI exit codes.

## Semgrep commands

For a list of available commands, run the following command:

```bash
semgrep --help
```

Command output:

```
Usage: semgrep [OPTIONS] COMMAND [ARGS]...

  To get started quickly, run `semgrep scan --config auto`

  Run `semgrep SUBCOMMAND --help` for more information on each subcommand

  If no subcommand is passed, will run `scan` subcommand by default

Options:
  -h, --help  Show this message and exit.

Commands:
  ci                   The recommended way to run semgrep in CI
  install-semgrep-pro  Install the Semgrep Pro Engine
  login                Obtain and save credentials for semgrep.dev
  logout               Remove locally stored credentials to semgrep.dev
  lsp                  [EXPERIMENTAL] Start the Semgrep LSP server
  publish              Upload rule to semgrep.dev
  scan                 Run semgrep rules on files
  shouldafound         Report a false negative in this project.
```

## Semgrep scan command options

To list all available `semgrep scan` options, run the following command:

```bash
semgrep scan --help
```

Command output:

```
Usage: semgrep scan [OPTIONS] [TARGETS]...

  Run semgrep rules on files

  Searches TARGET paths for matches to rules or patterns. Defaults to
  searching entire current working directory.

  To get started quickly, run

      semgrep --config auto .

  This will automatically fetch rules for your project from the Semgrep
  Registry. NOTE: Using `--config auto` will log in to the Semgrep Registry
  with your project URL.

  For more information about Semgrep, go to https://semgrep.dev.

  NOTE: By default, Semgrep will report pseudonymous usage metrics to its
  server if you pull your configuration from the Semgrep registry. To learn
  more about how and why these metrics are collected, please see
  https://semgrep.dev/docs/metrics. To modify this behavior, see the --metrics
  option below.

Options:
  --replacement TEXT              An autofix expression that will be applied
                                  to any matches found with --pattern. Only
                                  valid with a command-line specified pattern.
  Configuration options: [mutually_exclusive]
    -c, -f, --config TEXT         YAML configuration file, directory of YAML
                                  files ending in .yml|.yaml, URL of a
                                  configuration file, or Semgrep registry
                                  entry name.
                                  
                                  Use --config auto to automatically obtain
                                  rules tailored to this project; your project
                                  URL will be used to log in  to the Semgrep
                                  registry.
                                  
                                  To run multiple rule files simultaneously,
                                  use --config before every YAML, URL, or
                                  Semgrep registry entry name.  For example
                                  `semgrep --config p/python --config
                                  myrules/myrule.yaml`
                                  
                                  See https://semgrep.dev/docs/writing-
                                  rules/rule-syntax for information on
                                  configuration file format.
    -e, --pattern TEXT            Code search pattern. See
                                  https://semgrep.dev/docs/writing-
                                  rules/pattern-syntax for information on
                                  pattern features.
  -l, --lang TEXT                 Parse pattern and all files in specified
                                  language. Must be used with -e/--pattern.
  --dryrun / --no-dryrun          If --dryrun, does not write autofixes to a
                                  file. This will print the changes to the
                                  console. This lets you see the changes
                                  before you commit to them. Only works with
                                  the --autofix flag. Otherwise does nothing.
  --severity [INFO|WARNING|ERROR]
                                  Report findings only from rules matching the
                                  supplied severity level. By default all
                                  applicable rules are run. Can add multiple
                                  times. Each should be one of INFO, WARNING,
                                  or ERROR.
  --show-supported-languages      Print a list of languages that are currently
                                  supported by Semgrep.
  Alternate modes:                No search is performed in these modes
    --validate                    Validate configuration file(s). This will
                                  check YAML files for errors and run
                                  'p/semgrep-rule-lints' on the YAML files. No
                                  search is performed.
    --version                     Show the version and exit.
  Test and debug options: 
    --test                        Run test suite.
    --test-ignore-todo / --no-test-ignore-todo
                                  If --test-ignore-todo, ignores rules marked
                                  as '#todoruleid:' in test files.
    --dump-ast / --no-dump-ast    If --dump-ast, shows AST of the input file
                                  or passed expression and then exit (can use
                                  --json).
  --error / --no-error            Exit 1 if there are findings. Useful for CI
                                  and scripts.
  --strict / --no-strict          Return a nonzero exit code when WARN level
                                  errors are encountered. Fails early if
                                  invalid configuration files are present.
                                  Defaults to --no-strict.
  -h, --help                      Show this message and exit.
  -a, --autofix / --no-autofix    Apply autofix patches. WARNING: data loss
                                  can occur with this flag. Make sure your
                                  files are stored in a version control
                                  system. Note that this mode is experimental
                                  and not guaranteed to function properly.
  --baseline-commit TEXT          Only show results that are not found in this
                                  commit hash. Aborts run if not currently in
                                  a git directory, there are unstaged changes,
                                  or given baseline hash doesn't exist
  --metrics [auto|on|off]         Configures how usage metrics are sent to the
                                  Semgrep server. If 'auto', metrics are sent
                                  whenever the --config value pulls from the
                                  Semgrep server. If 'on', metrics are always
                                  sent. If 'off', metrics are disabled
                                  altogether and not sent. If absent, the
                                  SEMGREP_SEND_METRICS environment variable
                                  value will be used. If no environment
                                  variable, defaults to 'auto'.
  Path options:                   By default, Semgrep scans all git-tracked
                                  files with extensions matching rules'
                                  languages. These options alter which files
                                  Semgrep scans.
    --exclude TEXT                Skip any file or directory that matches this
                                  pattern; --exclude='*.py' will ignore the
                                  following: foo.py, src/foo.py,
                                  foo.py/bar.sh. --exclude='tests' will ignore
                                  tests/foo.py as well as a/b/tests/c/foo.py.
                                  Can add multiple times. If present, any
                                  --include directives are ignored.
    --exclude-rule TEXT           Skip any rule with the given id. Can add
                                  multiple times.
    --include TEXT                Filter files or directories by path. The
                                  argument is a glob-style pattern such as
                                  'foo.*' that must match the path. This is an
                                  extra filter in addition to other applicable
                                  filters. For example, specifying the
                                  language with '-l javascript' might
                                  preselect files 'src/foo.jsx' and
                                  'lib/bar.js'. Specifying one of '--
                                  include=src', '--include=*.jsx', or '--
                                  include=src/foo.*' will restrict the
                                  selection to the single file 'src/foo.jsx'.
                                  A choice of multiple '--include' patterns
                                  can be specified. For example, '--
                                  include=foo.* --include=bar.*' will select
                                  both 'src/foo.jsx' and 'lib/bar.js'. Glob-
                                  style patterns follow the syntax supported
                                  by python, which is documented at
                                  https://docs.python.org/3/library/glob.html
    --max-target-bytes BYTES      Maximum size for a file to be scanned by
                                  Semgrep, e.g '1.5MB'. Any input program
                                  larger than this will be ignored. A zero or
                                  negative value disables this filter.
                                  Defaults to 1000000 bytes.
    --use-git-ignore / --no-git-ignore
                                  Skip files ignored by git. Scanning starts
                                  from the root folder specified on the
                                  Semgrep command line. Normally, if the
                                  scanning root is within a git repository,
                                  only the tracked files and the new files
                                  would be scanned. Git submodules and git-
                                  ignored files would normally be skipped.
                                  --no-git-ignore will disable git-aware
                                  filtering. Setting this flag does nothing if
                                  the scanning root is not in a git
                                  repository.
    --scan-unknown-extensions / --skip-unknown-extensions
                                  If true, explicit files will be scanned
                                  using the language specified in --lang. If
                                  --skip-unknown-extensions, these files will
                                  not be scanned. Defaults to false.
  Performance and memory options: 
    --enable-version-check / --disable-version-check
                                  Checks Semgrep servers to see if the latest
                                  version is run; disabling this may reduce
                                  exit time after returning results.
    -j, --jobs INTEGER            Number of subprocesses to use to run checks
                                  in parallel. Defaults to the number of cores
                                  on the system (1 if using --pro).
    --max-memory INTEGER          Maximum system memory to use running a rule
                                  on a single file in MiB. If set to 0 will
                                  not have memory limit. Defaults to 0 for all
                                  CLI scans. For CI scans that use the pro
                                  engine, it defaults to 5000 MiB
    --optimizations [all|none]    Turn on/off optimizations. Default = 'all'.
                                  Use 'none' to turn all optimizations off.
    --timeout INTEGER             Maximum time to spend running a rule on a
                                  single file in seconds. If set to 0 will not
                                  have time limit. Defaults to 30 s.
    --timeout-threshold INTEGER   Maximum number of rules that can timeout on
                                  a file before the file is skipped. If set to
                                  0 will not have limit. Defaults to 3.
    --interfile-timeout INTEGER   Maximum time to spend on interfile analysis.
                                  If set to 0 will not have time limit.
                                  Defaults to 0 s for all CLI scans. For CI
                                  scans, it defaults to 3 hours.
  Display options: 
    --enable-nosem / --disable-nosem
                                  --enable-nosem enables 'nosem'. Findings
                                  will not be reported on lines containing a
                                  'nosem' comment at the end. Enabled by
                                  default.
    --force-color / --no-force-color
                                  Always include ANSI color in the output,
                                  even if not writing to a TTY; defaults to
                                  using the TTY status
    --max-chars-per-line INTEGER  Maximum number of characters to show per
                                  line.
    --max-lines-per-finding INTEGER
                                  Maximum number of lines of code that will be
                                  shown for each match before trimming (set to
                                  0 for unlimited).
    --dataflow-traces             Explain how non-local values reach the
                                  location of a finding (only affects text and
                                  SARIF output).
    -o, --output TEXT             Save search results to a file or post to
                                  URL. Default is to print to stdout.
    --rewrite-rule-ids / --no-rewrite-rule-ids
                                  Rewrite rule ids when they appear in nested
                                  sub-directories (Rule 'foo' in
                                  test/rules.yaml will be renamed 'test.foo').
    --time / --no-time            Include a timing summary with the results.
                                  If output format is json, provides times for
                                  each pair (rule, target).
  Verbosity options: [mutually_exclusive]
    -q, --quiet                   Only output findings.
    -v, --verbose                 Show more details about what rules are
                                  running, which files failed to parse, etc.
    --debug                       All of --verbose, but with additional
                                  debugging information.
  Output formats: [mutually_exclusive]
                                  Uses ASCII output if no format specified.
    --text                        Output results in Emacs single-line format.
    --emacs                       Output results in Emacs single-line format.
    --json                        Output results in Semgrep's JSON format.
    --gitlab-sast                 Output results in GitLab SAST format.
    --gitlab-secrets              Output results in GitLab Secrets format.
    --junit-xml                   Output results in JUnit XML format.
    --sarif                       Output results in SARIF format.
    --vim                         Output results in vim single-line format.
  Semgrep Pro Engine options: 
    --pro                         Inter-file analysis and Pro languages
                                  (currently just Apex). Requires Semgrep Pro
                                  Engine, contact support@semgrep.com for more
                                  information on this.
    --pro-intrafile               Intra-file inter-procedural taint analysis.
                                  Implies --pro-languages. Requires Semgrep
                                  Pro Engine, contact support@semgrep.com for more
                                  information on this.
    --pro-languages               Enable Pro languages (currently just Apex).
                                  Requires Semgrep Pro Engine, contact
                                  support@semgrep.com for more information on
                                  this.
    --oss-only                    Run using only OSS features, even if the
                                  Semgrep Pro toggle is on.
```

## Autocomplete

The Semgrep command line tool supports autocomplete on all command options, and on configuration rulesets. When typing any option or option parameter, press <kbd>Tab ↹</kbd> twice to use. If you type a registry ruleset name (`semgrep --config p/`'), Semgrep autocompletes any matching options that are publicly available in the registry. For example: `semgrep --config p/` lists all publicly available rulesets, and `semgrep --config p/java<tab><tab>` lists all available rulesets that start with "java". Note: ruleset autocomplete requires internet connection, and it does not autocomplete private rulesets or individual rules.

To enable add the corresponding line to the correct profile given by the table below, corresponding to your shell configuration:

| Shell | File                                      | Add Line                                           |
| :---- | :---------------------------------------- | :------------------------------------------------- |
| Bash  | ` ~/.bashrc`                              | `eval "$(_SEMGREP_COMPLETE=bash_source semgrep)"`  |
| ZSH   | `~/.zshrc`                                | `eval "$(_SEMGREP_COMPLETE=zsh_source semgrep)"`   |
| Fish  | `~/.config/fish/completions/foo-bar.fish` | `eval (env _SEMGREP_COMPLETE=fish_source semgrep)` |

After modifying your shell configuration, you must start a new shell for the changes to take effect.

## Ignoring Files

The Semgrep command line tool supports a `.semgrepignore` file that follows `.gitignore` syntax and is used to skip files and directories during scanning. This is commonly used to avoid vendored and test related code. For a complete example, see the [.semgrepignore file on Semgrep’s source code](https://github.com/returntocorp/semgrep/blob/develop/.semgrepignore).

In addition to `.semgrepignore` there are several methods to set up ignore patterns. See [Ignoring files, folders, or code](../ignoring-files-folders-code).

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

<!-- Source code reference - the exit codes are located in the Semgrep repository - https://github.com/returntocorp/semgrep/blob/develop/cli/src/semgrep/error.py. -->

Semgrep can finish with the following exit codes:

- **0**: Semgrep ran successfully and found no errors (or did find errors, but the `--error` flag is **not** set).
- **1**: Semgrep ran successfully and found issues in your code (and the `--error` flag is set).
- **2**: Semgrep failed.
- **3**: Invalid syntax of the scanned language. This error occurs only while using the `--strict` flag.
- **4**: Semgrep encountered an invalid pattern in the rule schema.
- **5**: Semgrep configuration is not valid YAML.
- **7**: At least one rule in the configuration is invalid.
- **8**: Semgrep does not understand specified language.
- **13**: The API key is invalid.
- **14**: Semgrep scan failed.

<!-- REMOVED STATUSES (NOT USED ANYMORE)
- 4: Semgrep encountered an invalid pattern.
- 6: Rule with `pattern-where-python` found but `--dangerously-allow-arbitrary-code-execution-from-rules` was not set. See `--dangerously-allow-arbitrary-code-execution-from-rules`. (Note: `pattern-where-python` is no longer supported in Semgrep, so this applies only to legacy Semgrep versions).
- 9: Semgrep exceeded match timeout. See `--timeout`.
- 10: Semgrep exceeded maximum memory while matching. See `--max-memory`.
- 11: Semgrep encountered a lexical error when running rule on a file.
- 12: Semgrep found too many matches.
-->

<MoreHelp />
