---
append_help_link: true
---

# CLI reference

The following usage documentation is for the [Semgrep command line tool](https://github.com/returntocorp/semgrep).

[TOC]

# Command-line options

See `semgrep --help` for command line options.

```
usage: semgrep [-h] [-g | -f CONFIG | -e PATTERN] [-l LANG] [--validate]
               [--strict] [--optimizations [OPTIMIZATIONS]] [--exclude EXCLUDE] 
               [--include INCLUDE] [--no-git-ignore] [--skip-unknown-extensions]
               [--dangerously-allow-arbitrary-code-execution-from-rules]
               [-j JOBS] [--timeout TIMEOUT] [--max-memory MAX_MEMORY]
               [--timeout-threshold TIMEOUT_THRESHOLD] [--severity SEVERITY]
               [-q] [--no-rewrite-rule-ids] [-o OUTPUT] [--json]
               [--save-test-output-tar] [--debugging-json] [--junit-xml]
               [--sarif] [--test] [--test-ignore-todo] [--dump-ast] [--error]
               [-a] [--dryrun] [--disable-nosem]
               [--max-lines-per-finding MAX_LINES_PER_FINDING] [-v] [--debug]
               [--version] [--force-color] [--disable-version-check]
               [target [target ...]]

semgrep CLI. For more information about semgrep, go to https://semgrep.dev/

positional arguments:
  target                Search these files or directories. Defaults to entire
                        current working directory. Implied argument if piping
                        to semgrep.

optional arguments:
  -h, --help            show this help message and exit
  --exclude EXCLUDE     Skip any file or directory that matches this pattern;
                        --exclude='*.py' will ignore the following: foo.py,
                        src/foo.py, foo.py/bar.sh. --exclude='tests' will
                        ignore tests/foo.py as well as a/b/tests/c/foo.py. Can
                        add multiple times. Overrides includes.
  --include INCLUDE     Filter files or directories by path. The argument is a
                        glob-style pattern such as 'foo.*' that must match the
                        path. This is an extra filter in addition to other
                        applicable filters. For example, specifying the
                        language with '-l javascript' might preselect files
                        'src/foo.jsx' and 'lib/bar.js'. Specifying one of '--
                        include=src', '--include=*.jsx', or '--
                        include=src/foo.*' will restrict the selection to the
                        single file 'src/foo.jsx'. A choice of multiple '--
                        include' patterns can be specified. For example, '--
                        include=foo.* --include=bar.*' will select both
                        'src/foo.jsx' and 'lib/bar.js'. Glob-style patterns
                        follow the syntax supported by python, which is
                        documented at
                        https://docs.python.org/3/library/glob.html
  --no-git-ignore       Don`t skip files ignored by git. Scanning starts from
                        the root folder specified on the semgrep command line.
                        Normally, if the scanning root is within a git
                        repository, only the tracked files and the new files
                        would be scanned. Git submodules and git-ignored files
                        would normally be skipped. This option will disable
                        git-aware filtering. Setting this flag does nothing if
                        the scanning root is not in a git repository.
  --skip-unknown-extensions
                        Scan only known file extensions, even if unrecognized
                        ones are explicitly targeted.
  --test-ignore-todo    Ignore rules marked as '#todoruleid:' in test files.
  --version             Show the version and exit.
  --force-color         Always include ANSI color in the output, even if not
                        writing to a TTY
  --disable-version-check
                        Disable checking for latest version.

config:
  -g, --generate-config
                        Generate starter configuration file, .semgrep.yml
  -f CONFIG, -c CONFIG, --config CONFIG
                        YAML configuration file, directory of YAML files
                        ending in .yml|.yaml, URL of a configuration file, or
                        semgrep registry entry name. See
                        https://semgrep.dev/docs/writing-rules/rule-syntax for
                        information on configuration file format.
  -e PATTERN, --pattern PATTERN
                        Code search pattern. See
                        https://semgrep.dev/docs/writing-rules/pattern-syntax
                        for information on pattern features.
  -l LANG, --lang LANG  Parse pattern and all files in specified language.
                        Must be used with -e/--pattern.
  --validate            Validate configuration file(s). No search is
                        performed.
  --strict              Only invoke semgrep if configuration files(s) are
                        valid.
  --optimizations [OPTIMIZATIONS]
                        Turn on/off optimizations. Default = 'none'. Use 'all' to turn all optimizations on.
  --dangerously-allow-arbitrary-code-execution-from-rules
                        WARNING: allow rules to run arbitrary code. ONLY
                        ENABLE IF YOU TRUST THE SOURCE OF ALL RULES IN YOUR
                        CONFIGURATION.
  -j JOBS, --jobs JOBS  Number of subprocesses to use to run checks in
                        parallel. Defaults to the number of CPUs on the
                        system.
  --timeout TIMEOUT     Maximum time to spend running a rule on a single file
                        in seconds. If set to 0 will not have time limit.
                        Defaults to 30 s.
  --max-memory MAX_MEMORY
                        Maximum memory to use running a rule on a single file
                        in MB. If set to 0 will not have memory limit.
                        Defaults to 0.
  --timeout-threshold TIMEOUT_THRESHOLD
                        Maximum number of rules that can timeout on a file
                        before the file is skipped. If set to 0 will not have
                        limit. Defaults to 0.
  --severity SEVERITY   Report findings only from rules matching the supplied
                        severity level. By default all applicable rules are
                        run.Can add multiple times. Each should be one of
                        INFO, WARNING, or ERROR.

output:
  -q, --quiet           Do not print any logging messages to stderr. Finding
                        output will still be sent to stdout. Exit code
                        provides success status.
  --no-rewrite-rule-ids
                        Do not rewrite rule ids when they appear in nested
                        sub-directories (by default, rule 'foo' in
                        test/rules.yaml will be renamed 'test.foo').
  -o OUTPUT, --output OUTPUT
                        Save search results to a file or post to URL. Default
                        is to print to stdout.
  --json                Output results in JSON format.
  --save-test-output-tar
                        Store json output as a tarball that will be uploaded
                        as a Github artifact.
  --debugging-json      Output JSON with extra debugging information
                        (experimental).
  --junit-xml           Output results in JUnit XML format.
  --sarif               Output results in SARIF format.
  --test                Run test suite.
  --dump-ast            Show AST of the input file or passed expression and
                        then exit (can use --json).
  --error               Exit 1 if there are findings. Useful for CI and
                        scripts.
  -a, --autofix         Apply the autofix patches. WARNING: data loss can
                        occur with this flag. Make sure your files are stored
                        in a version control system.
  --dryrun              Do autofixes, but don`t write them to a file. This
                        will print the changes to the console. This lets you
                        see the changes before you commit to them. Only works
                        with the --autofix flag. Otherwise does nothing.
  --disable-nosem       Disable the effect of 'nosem'. This will report
                        findings on lines containing a 'nosem' comment at the
                        end.
  --max-lines-per-finding MAX_LINES_PER_FINDING
                        Maximum number of lines of code that will be shown for
                        each match before trimming (set to 0 for unlimited).
  --debug               Set the logging level to DEBUG

logging:
  -v, --verbose         Show more details about what rules are running, which
                        files failed to parse, etc.
```

# Exit codes

`semgrep` may exit with the following exit codes:

- `0`: Semgrep ran successfully and found no errors (or did find errors, but the `--error` flag is *not* set)
- `1`: Semgrep ran successfully and found issues in your code (and the `--error` flag is set)
- `2`: Semgrep failed
- `3`: Semgrep failed to parse a file in the specified language
- `4`: Semgrep encountered an invalid pattern
- `5`: Semgrep config is not valid yaml
- `6`: Rule with `pattern-where-python` found but `--dangerously-allow-arbitrary-code-execution-from-rules` was not set. See `--dangerously-allow-arbitrary-code-execution-from-rules`.
- `7`: All rules in config are invalid. If semgrep is run with `--strict` then this exit code is returned when any rule in the configs are invalid.
- `8`: Semgrep does not understand specified language
- `9`: Semgrep exceeded match timeout. See `--timeout`
- `10`: Semgrep exceeded max memory while matching. See `--max-memory`.
- `11`: Semgrep encountered a lexical error when running rule on a file.
