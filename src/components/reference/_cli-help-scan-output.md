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

       --allow-local-builds
           Experimental: allow building projects contained in the repository.
           This allows Semgrep to identify dependencies and dependency
           relationships when lockfiles are not present or are insufficient.
           However, building code may inherently require the execution of
           code contained in the scanned project or in its dependencies,
           which is a security risk.

       --allow-untrusted-validators
           Allows running rules with validators from origins other than
           semgrep.dev. Avoid running rules from origins you don't trust.

       --baseline-commit=VAL (absent SEMGREP_BASELINE_COMMIT env)
           Only show results that are not found in this commit hash. Aborts
           run if not currently in a git directory, there are unstaged
           changes, or given baseline hash doesn't exist. 

       -d, --dump-command-for-core
           <internal, do not use>

       --dataflow-traces
           Explain how non-local values reach the location of a finding (only
           affects text and SARIF output).

       --debug
           All of --verbose, but with additional debugging information.

       --develop
           Living on the edge.

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

       --emacs-output=VAL
           Write a copy of the emacs output to a file or post to URL.

       --enable-nosem
           Enables 'nosem'. Findings will not be reported on lines containing
           a 'nosem' comment at the end. Enabled by default.

       --enable-version-check (absent SEMGREP_ENABLE_VERSION_CHECK env)
           Checks Semgrep servers to see if the latest version is run;
           disabling this may reduce exit time after returning results. 

       --error
           Exit 1 if there are findings. Useful for CI and scripts.

       --exclude=PATTERN
           Skip any file or directory whose path that matches PATTERN.
           '--exclude=*.py' will ignore the following: 'foo.py',
           'src/foo.py', 'foo.py/bar.sh'. '--exclude=tests' will ignore
           'tests/foo.py' as well as 'a/b/tests/c/foo.py'. Multiple
           '--exclude' options may be specified. PATTERN is a glob-style
           pattern that uses the same syntax as gitignore and semgrepignore,
           which is documented at
           https://git-scm.com/docs/gitignore#_pattern_format 

       --exclude-minified-files
           Skip minified files. These are files that are < 7% whitespace, or
           which have an average of > 1000 bytes per line. By default
           minified files are scanned. 

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

       --files-with-matches
           Output only the names of files containing matches. REQUIRES
           --experimental

       --force-color (absent SEMGREP_FORCE_COLOR env)
           Always include ANSI color in the output, even if not writing to a
           TTY; defaults to using the TTY status 

       --gitlab-sast
           Output results in GitLab SAST format.

       --gitlab-sast-output=VAL
           Write a copy of the GitLab SAST output to a file or post to URL.

       --gitlab-secrets
           Output results in GitLab Secrets format.

       --gitlab-secrets-output=VAL
           Write a copy of the GitLab Secrets output to a file or post to
           URL.

       --historical-secrets
           Scans git history using Secrets rules.

       --include=PATTERN
           Specify files or directories that should be scanned by semgrep,
           excluding other files. This filter is applied after these other
           filters: '--exclude' options, any filtering done by git (or other
           SCM), and filtering by '.semgrepignore' files. Multiple
           '--include' options can be specified. A file path is selected if
           it matches at least one of the include patterns. PATTERN is a
           glob-style pattern such as 'foo.*' that must match the path. For
           example, specifying the language with '-l javascript' might
           preselect files 'src/foo.jsx' and 'lib/bar.js'. Specifying one of
           '--include=src', '--include=*.jsx', or '--include=src/foo.*' will
           restrict the selection to the single file 'src/foo.jsx'. A choice
           of multiple '--include' patterns can be specified. For example,
           '--include=foo.* --include=bar.*' will select both 'src/foo.jsx'
           and 'lib/bar.js'. Glob-style patterns follow the syntax supported
           by gitignore and semgrepignore, which is documented at
           https://git-scm.com/docs/gitignore#_pattern_format 

       --incremental-output
           Output results incrementally. REQUIRES --experimental

       --interfile-timeout=VAL (absent=0)
           Maximum time to spend on interfile analysis. If set to 0 will not
           have time limit. Defaults to 0 s for all CLI scans. For CI scans,
           it defaults to 3 hours.

       -j VAL, --jobs=VAL (absent=4)
           Number of subprocesses to use to run checks in parallel. The
           default is based on a best effort to determine the number of
           logical CPUs that are available to the user and that semgrep can
           take advantage of (1 if using --pro, 1 on Windows). 

       --json
           Output results in Semgrep's JSON format.

       --json-output=VAL
           Write a copy of the json output to a file or post to URL.

       --junit-xml
           Output results in JUnit XML format.

       --junit-xml-output=VAL
           Write a copy of the JUnit XML output to a file or post to URL.

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

       --max-log-list-entries=VAL (absent=100)
           Maximum number of entries that will be shown in the log (e.g.,
           list of rule ids, list of skipped files). A zero or negative value
           disables this filter. Defaults to 100

       --max-memory=VAL (absent=0)
           Maximum system memory in MiB to use during the interfile
           pre-processing phase, or when running a rule on a single file. If
           set to 0, will not have memory limit. Defaults to 0. For CI scans
           that use the Pro Engine, defaults to 5000 MiB. 

       --max-target-bytes=VAL (absent=1000000)
           Maximum size for a file to be scanned by Semgrep, e.g '1.5MB'. Any
           input program larger than this will be ignored. A zero or negative
           value disables this filter. Defaults to 1000000 bytes

       --metrics=VAL (absent=auto or SEMGREP_SEND_METRICS env)
           Configures how usage metrics are sent to the Semgrep server. If
           'auto', metrics are sent whenever the --config value pulls from
           the Semgrep server or if the user is logged in. If 'on', metrics
           are always sent. If 'off', metrics are disabled altogether and not
           sent. If absent, the SEMGREP_SEND_METRICS environment variable
           value will be used. If no environment variable, defaults to
           'auto'. 

       --no-autofix
           negates -a/--autofix

       --no-dryrun
           negates --dryrun

       --no-error
           negates --error

       --no-exclude-minified-files
           negates --exclude-minified-files

       --no-force-color
           negates --force-color

       --no-git-ignore
           negates --use-git-ignore

       --no-rewrite-rule-ids
           negates --rewrite-rule-ids

       --no-secrets-validation
           Disables secret validation.

       --no-strict
           negates --strict

       --no-test-ignore-todo
           negates --test-ignore-todo

       --no-time
           negates --time

       --no-trace
           negates --trace

       --novcs
           Assume the project is not managed by a version control system
           (VCS), even if the project appears to be under version control
           based on the presence of files such as '.git' or similar. REQUIRES
           --experimental or --semgrepignore-v2.

       -o VAL, --output=VAL
           Save search results to a file or post to URL. Default is to print
           to stdout.

       --optimizations=VAL (absent=all)
           Turn on/off optimizations. Default = 'all'. Use 'none' to turn all
           optimizations off. 

       --oss-only
           Run using only the OSS engine, even if the Semgrep Pro toggle is
           on. This may still run Pro rules, but only using the OSS features. 

       --pro
           Inter-file analysis and Pro languages (currently Apex, C#, and
           Elixir. Requires Semgrep Pro Engine. See
           https://semgrep.dev/products/pro-engine/ for more.

       --pro-intrafile
           Intra-file inter-procedural taint analysis. Implies
           --pro-languages. Requires Semgrep Pro Engine. See
           https://semgrep.dev/products/pro-engine/ for more.

       --pro-languages
           Enable Pro languages (currently Apex, C#, and Elixir). Requires
           Semgrep Pro Engine. See https://semgrep.dev/products/pro-engine/
           for more.

       --pro-path-sensitive
           Path sensitivity. Implies --pro-intrafile. Requires Semgrep Pro
           Engine. See https://semgrep.dev/products/pro-engine/ for more.

       --profile
           <undocumented>

       --project-root=VAL
           Semgrep normally determines the type of project (git or novcs) and
           the project root automatically. The project root is then used to
           locate and use '.gitignore' and '.semgrepignore' files which
           determine target files that should be ignored by semgrep. This
           option forces the project root to be a specific folder and assumes
           a local project without version control (novcs). This option is
           useful to ensure the '.semgrepignore' file that may exist at the
           project root is consulted when the scanning root is not the
           current folder '.'. A valid project root must be a folder (path
           referencing a directory) whose physical path is a prefix of the
           physical path of the scanning roots passed on the command line.
           For example, the command 'semgrep scan --project-root . src' is
           valid if '.' is '/home/me' and 'src' is a directory or a symbolic
           link to a '/home/me/sources' directory or a symbolic link to a
           'sources' directory but not if it is a symbolic link to a
           directory '/var/sources' (assuming '/var' is not a symbolic link).
           REQUIRES --experimental or --semgrepignore-v2.

       -q, --quiet
           Only output findings.

       --remote=VAL
           Remote will quickly check out and scan a remote git repository of
           the format "http[s]://<WEBSITE>/.../<REPO>.git". Must be run with
           --pro. Incompatible with --project-root. Note this requires an
           empty CWD as this command will clone the repository into the CWD.
           REQUIRES --experimental

       --replacement=VAL
           An autofix expression that will be applied to any matches found
           with --pattern. Only valid with a command-line specified pattern. 

       --rewrite-rule-ids
           Rewrite rule ids when they appear in nested sub-directories (Rule
           'foo' in test/rules.yaml will be renamed 'test.foo'). 

       --sarif
           Output results in SARIF format.

       --sarif-output=VAL
           Write a copy of the SARIF output to a file or post to URL.

       --scan-unknown-extensions
           If true, target files specified directly on the command line will
           bypass normal language detection. They will be analyzed according
           to the value of --lang if applicable, or otherwise with the
           analyzers/languages specified in the Semgrep rule(s) regardless of
           file extension or file type. This setting doesn't apply to target
           files discovered by scanning folders. Defaults to false. 

       --secrets
           Run Semgrep Secrets product, including support for secret
           validation. Requires access to Secrets, contact
           support@semgrep.com for more information.

       --semgrepignore-v2
           [DEPRECATED] '--semgrepignore-v2' used to force the use of the
           newer Semgrepignore v2 implementation for discovering and
           filtering target files. It is now the default and only behavior.
           The transitional option '--no-semgrepignore-v2' is no longer
           available. 

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

       --text-output=VAL
           Write a copy of the text output to a file or post to URL.

       --time
           Include a timing summary with the results. If output format is
           json, provides times for each pair (rule, target). This feature is
           meant for internal use and may be changed or removed without
           warning. At the current moment, --trace is better supported. 

       --timeout=VAL (absent=5.)
           Maximum time to spend running a rule on a single file in seconds.
           If set to 0 will not have time limit. Defaults to 5.0 s. 

       --timeout-threshold=VAL (absent=3)
           Maximum number of rules that can time out on a file before the
           file is skipped. If set to 0 will not have limit. Defaults to 3. 

       --trace
           Record traces from Semgrep scans to help debugging. This feature
           is meant for internal use and may be changed or removed without
           warning. Currently only used by `semgrep lsp`. 

       --trace-endpoint=VAL
           Endpoint to send OpenTelemetry traces to, if `--trace` is present.
           The value may be `semgrep-prod` (default), `semgrep-dev`,
           `semgrep-local`, or any valid URL. This feature is meant for
           internal use and may be changed or removed without warning.
           Currently only used by `semgrep lsp`. 

       --use-git-ignore
           '--use-git-ignore' is Semgrep's default behavior. Under the
           default behavior, Git-tracked files are not excluded by Gitignore
           rules and only untracked files are excluded by Gitignore rules.
           '--no-git-ignore' causes semgrep to not call 'git' and not consult
           '.gitignore' files to determine which files semgrep should scan.
           As a result of '--no-git-ignore', gitignored files and Git
           submodules will be scanned unless excluded by other means
           ('.semgrepignore', '--exclude', etc.). This flag has no effect if
           the scanning root is not in a Git repository.

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

       --vim-output=VAL
           Write a copy of the vim output to a file or post to URL.

       --x-eio
           [INTERNAL] Rely on an EIO based implementation for the -j flag

       --x-ignore-semgrepignore-files
           [INTERNAL] Ignore all '.semgrepignore' files found in the project
           tree for the purpose of selecting target files to be scanned by
           semgrep. Other filters may still apply. THIS OPTION IS NOT PART OF
           THE SEMGREP API AND MAY CHANGE OR DISAPPEAR WITHOUT NOTICE. 

       --x-ls
           [INTERNAL] List the selected target files before any rule-specific
           or language-specific filtering. Then exit. The default output
           format is one path per line. THIS OPTION IS NOT PART OF THE
           SEMGREP API AND MAY CHANGE OR DISAPPEAR WITHOUT NOTICE. 

       --x-ls-long
           [INTERNAL] Show selected targets and skipped targets with reasons
           why they were skipped, using an unspecified output format. Implies
           --x-ls. THIS OPTION IS NOT PART OF THE SEMGREP API AND MAY CHANGE
           OR DISAPPEAR WITHOUT NOTICE. 

       --x-pro-naming
           <internal, do not use>

       --x-semgrepignore-filename=FILENAME
           [INTERNAL] Files named FILENAME shall be consulted instead of the
           files named '.semgrepignore'. This option can be useful for
           testing semgrep on intentionally broken code that should normally
           be ignored.

       --x-tr
           <internal, do not use>

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
       https://github.com/semgrep/semgrep/issues

```
