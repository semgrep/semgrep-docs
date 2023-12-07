```
NAME
       semgrep scan - run semgrep rules on files

SYNOPSIS
       semgrep scan [OPTION]… [TARGETS]…

DESCRIPTION
       Searches TARGET paths for matches to rules or patterns. Defaults to
       searching entire current working directory.

       To get started quickly, run

       semgrep --config auto .

       This will automatically fetch rules for your project from the Semgrep
       Registry. NOTE: Using `--config auto` will log in to the Semgrep
       Registry with your project URL.

       For more information about Semgrep, go to https://semgrep.dev.

       NOTE: By default, Semgrep will report pseudonymous usage metrics to
       its server if you pull your configuration from the Semgrep registry.
       To learn more about how and why these metrics are collected, please
       see https://semgrep.dev/docs/metrics. To modify this behavior, see the
       --metrics option below.

ARGUMENTS
       TARGETS
           Files or folders to be scanned by semgrep.

OPTIONS
       -a, --autofix
           Apply autofix patches. WARNING: data loss can occur with this
           flag. Make sure your files are stored in a version control system.
           Note that this mode is experimental and not guaranteed to function
           properly. 

       --allow-untrusted-validators
           Run postprocessors from untrusted sources.

       --ast-caching
           Store in ~/.semgrep/cache/asts/ the parsed ASTs to speedup things.
           Requires --experimental. 

       --baseline-commit=VAL (absent SEMGREP_BASELINE_COMMIT env)
           Only show results that are not found in this commit hash. Aborts
           run if not currently in a git directory, there are unstaged
           changes, or given baseline hash doesn't exist. 

       --beta-testing-secrets-enabled
           Enable support for secret validation. Requires Semgrep Secrets,
           contact support@semgrep.com for more information on this.

       -d, --dump-command-for-core
           <internal, do not use>

       --dataflow-traces
           Explain how non-local values reach the location of a finding (only
           affects text and SARIF output).

       --debug
           All of --verbose, but with additional debugging information.

       --develop
           Living on the edge.

       --diff-depth=VAL (absent=2)
           The depth of the Pro (interfile) differential scan, the number of
           steps (both in the caller and callee sides) from the targets in
           the call graph tracked by the deep preprocessor. Only applied in
           differential scan mode. Default to 2. 

       --disable-nosem
           negates --enable-nosem

       --disable-version-check
           negates --enable-version-check

       --dryrun
           If --dryrun, does not write autofixes to a file. This will print
           the changes to the console. This lets you see the changes before
           you commit to them. Only works with the --autofix flag. Otherwise
           does nothing. 

       --dump-ast
           If --dump-ast, shows AST of the input file or passed expression
           and then exit (can use --json). 

       --dump-engine-path
           <internal, do not use>

       -e VAL, --pattern=VAL
           Code search pattern. See
           https://semgrep.dev/docs/writing-rules/pattern-syntax for
           information on pattern features. 

       --emacs
           Output results in Emacs single-line format.

       --enable-nosem
           Enables 'nosem'. Findings will not be reported on lines containing
           a 'nosem' comment at the end. Enabled by default.

       --enable-version-check (absent SEMGREP_ENABLE_VERSION_CHECK env)
           Checks Semgrep servers to see if the latest version is run;
           disabling this may reduce exit time after returning results. 

       --error
           Exit 1 if there are findings. Useful for CI and scripts.

       --exclude=VAL
           Skip any file or directory that matches this pattern;
           --exclude='*.py' will ignore the following: foo.py, src/foo.py,
           foo.py/bar.sh. --exclude='tests' will ignore tests/foo.py as well
           as a/b/tests/c/foo.py. Can add multiple times. If present, any
           --include directives are ignored. 

       --exclude-rule=VAL
           Skip any rule with the given id. Can add multiple times.

       --experimental
           Enable experimental features.

       -f VAL, -c VAL, --config=VAL (absent SEMGREP_RULES env)
           YAML configuration file, directory of YAML files ending in
           .yml|.yaml, URL of a configuration file, or Semgrep registry entry
           name. Use --config auto to automatically obtain rules tailored to
           this project; your project URL will be used to log in to the
           Semgrep registry. To run multiple rule files simultaneously, use
           --config before every YAML, URL, or Semgrep registry entry name.
           For example `semgrep --config p/python --config
           myrules/myrule.yaml` See
           https://semgrep.dev/docs/writing-rules/rule-syntax for information
           on configuration file format. 

       --force-color (absent SEMGREP_FORCE_COLOR env)
           Always include ANSI color in the output, even if not writing to a
           TTY; defaults to using the TTY status 

       --gitlab-sast
           Output results in GitLab SAST format.

       --gitlab-secrets
           Output results in GitLab Secrets format.

       --include=VAL
           Filter files or directories by path. The argument is a glob-style
           pattern such as 'foo.*' that must match the path. This is an extra
           filter in addition to other applicable filters. For example,
           specifying the language with '-l javascript' might preselect files
           'src/foo.jsx' and 'lib/bar.js'. Specifying one of '--include=src',
           '-- include=*.jsx', or '--include=src/foo.*' will restrict the
           selection to the single file 'src/foo.jsx'. A choice of multiple
           '-- include' patterns can be specified. For example,
           '--include=foo.* --include=bar.*' will select both 'src/foo.jsx'
           and 'lib/bar.js'. Glob-style patterns follow the syntax supported
           by python, which is documented at
           https://docs.python.org/3/library/glob.html 

       --interfile-timeout=VAL (absent=0)
           Maximum time to spend on interfile analysis. If set to 0 will not
           have time limit. Defaults to 0 s for all CLI scans. For CI scans,
           it defaults to 3 hours.

       -j VAL, --jobs=VAL (absent=4)
           Number of subprocesses to use to run checks in parallel. Defaults
           to the number of cores detected on the system (1 if using --pro). 

       --json
           Output results in Semgrep's JSON format.

       --junit-xml
           Output results in JUnit XML format.

       -l VAL, --lang=VAL
           Parse pattern and all files in specified language. Must be used
           with -e/--pattern. 

       --legacy
           Prefer old (legacy) behavior.

       --matching-explanations
           Add debugging information in the JSON output to trace how
           different parts of a rule are matched (a.k.a., "Inspect Rule" in
           the Semgrep playground)

       --max-chars-per-line=VAL (absent=160)
           Maximum number of characters to show per line.

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
           value disables this filter. Defaults to 1000000 bytes

       --metrics=VAL (absent=auto or SEMGREP_SEND_METRICS env)
           Configures how usage metrics are sent to the Semgrep server. If
           'auto', metrics are sent whenever the --config value pulls from
           the Semgrep server. If 'on', metrics are always sent. If 'off',
           metrics are disabled altogether and not sent. If absent, the
           SEMGREP_SEND_METRICS environment variable value will be used. If
           no environment variable, defaults to 'auto'. 

       --no-ast-caching
           negates --ast-caching

       --no-autofix
           negates -a/--autofix

       --no-dryrun
           negates --dryrun

       --no-error
           negates --error

       --no-force-color
           negates --force-color

       --no-git-ignore
           negates --use-git-ignore

       --no-registry-caching
           negates --registry-caching

       --no-rewrite-rule-ids
           negates --rewrite-rule-ids

       --no-secrets-validation
           Disables secrets validation

       --no-strict
           negates --strict

       --no-test-ignore-todo
           negates --test-ignore-todo

       --no-time
           negates --time

       -o VAL, --output=VAL
           Save search results to a file or post to URL. Default is to print
           to stdout.

       --optimizations=VAL (absent=all)
           Turn on/off optimizations. Default = 'all'. Use 'none' to turn all
           optimizations off. 

       --oss-only
           Run using only OSS features, even if the Semgrep Pro toggle is on.

       --pro
           Inter-file analysis and Pro languages (currently just Apex).
           Requires Semgrep Pro Engine. See
           https://semgrep.dev/products/pro-engine/ for more.

       --pro-intrafile
           Intra-file inter-procedural taint analysis. Implies
           --pro-languages. Requires Semgrep Pro Engine. See
           https://semgrep.dev/products/pro-engine/ for more.

       --pro-languages
           Enable Pro languages (currently just Apex). Requires Semgrep Pro
           Engine. See https://semgrep.dev/products/pro-engine/ for more.

       --profile
           <undocumented>

       --project-root=VAL
           The project root for gitignore and semgrepignore purposes is
           detected automatically from the presence of a .git/ directory in
           the current directory or one of its parents. If not found, the
           current directory is used as the project root. This option forces
           a specific directory to be the project root. This is useful for
           testing or for restoring compatibility with older semgrep
           implementations that only looked for a .semgrepignore file in the
           current directory.

       -q, --quiet
           Only output findings.

       --registry-caching
           Cache for 24 hours in ~/.semgrep/cache rules from the registry.
           Requires --experimental. 

       --replacement=VAL
           An autofix expression that will be applied to any matches found
           with --pattern. Only valid with a command-line specified pattern. 

       --rewrite-rule-ids
           Rewrite rule ids when they appear in nested sub-directories (Rule
           'foo' in test/rules.yaml will be renamed 'test.foo'). 

       --sarif
           Output results in SARIF format.

       --scan-unknown-extensions
           If true, explicit files will be scanned using the language
           specified in --lang. If --skip-unknown-extensions, these files
           will not be scanned. Defaults to false. 

       --severity=VAL
           Report findings only from rules matching the supplied severity
           level. By default all applicable rules are run. Can add multiple
           times. Each should be one of INFO, WARNING, or ERROR. 

       --show-supported-languages
           Print a list of languages that are currently supported by Semgrep.

       --skip-unknown-extensions
           negates --scan-unknown-extensions

       --strict
           Return a nonzero exit code when WARN level errors are encountered.
           Fails early if invalid configuration files are present. Defaults
           to --no-strict. 

       --test
           Run test suite.

       --test-ignore-todo
           If --test-ignore-todo, ignores rules marked as '#todoruleid:' in
           test files. 

       --text
           Output results in text format.

       --time
           Include a timing summary with the results. If output format is
           json, provides times for each pair (rule, target). 

       --timeout=VAL (absent=5.)
           Maximum time to spend running a rule on a single file in seconds.
           If set to 0 will not have time limit. Defaults to 5.0 s. 

       --timeout-threshold=VAL (absent=3)
           Maximum number of rules that can time out on a file before the
           file is skipped. If set to 0 will not have limit. Defaults to 3. 

       --use-git-ignore
           Skip files ignored by git. Scanning starts from the root folder
           specified on the Semgrep command line. Normally, if the scanning
           root is within a git repository, only the tracked files and the
           new files would be scanned. Git submodules and git- ignored files
           would normally be skipped. --no-git-ignore will disable git-aware
           filtering. Setting this flag does nothing if the scanning root is
           not in a git repository. 

       -v, --verbose
           Show more details about what rules are running, which files failed
           to parse, etc. 

       --validate
           Validate configuration file(s). This will check YAML files for
           errors and run 'p/semgrep-rule-lints' on the YAML files. No search
           is performed. 

       --version
           Show the version and exit.

       --vim
           Output results in vim single-line format.

       --x-ls
           [INTERNAL] List the selected target files and the skipped target
           files before any rule-specific or language-specific filtering.
           Then exit. The output format is unspecified. THIS OPTION IS NOT
           PART OF THE SEMGREP API AND MAY CHANGE OR DISAPPEAR WITHOUT
           NOTICE. 

COMMON OPTIONS
       --help[=FMT] (default=auto)
           Show this help in format FMT. The value FMT must be one of auto,
           pager, groff or plain. With auto, the format is pager or plain
           whenever the TERM env var is dumb or undefined.

EXIT STATUS
       semgrep scan exits with:

       0   on success.

       123 on indiscriminate errors reported on standard error.

       124 on command line parsing errors.

       125 on unexpected internal errors (bugs).

ENVIRONMENT
       These environment variables affect the execution of semgrep scan:

       SEMGREP_BASELINE_COMMIT
           See option --baseline-commit.

       SEMGREP_ENABLE_VERSION_CHECK
           See option --enable-version-check.

       SEMGREP_FORCE_COLOR
           See option --force-color.

       SEMGREP_RULES
           See option --config.

       SEMGREP_SEND_METRICS
           See option --metrics.

AUTHORS
       Semgrep Inc. <support@semgrep.com>

BUGS
       If you encounter an issue, please report it at
       https://github.com/returntocorp/semgrep/issues

```
