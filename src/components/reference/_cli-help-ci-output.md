```
NAME
       semgrep ci - the recommended way to run semgrep in CI

SYNOPSIS
       semgrep ci [OPTION]…

DESCRIPTION
       In pull_request/merge_request (PR/MR) contexts, `semgrep ci` will only
       report findings that were introduced by the PR/MR.

       When logged in, `semgrep ci` runs rules configured on Semgrep App and
       sends findings to your findings dashboard.

       Only displays findings that were marked as blocking.

OPTIONS
       -a, --autofix
           Apply autofix patches. WARNING: data loss can occur with this
           flag. Make sure your files are stored in a version control system.
           Note that this mode is experimental and not guaranteed to function
           properly. 

       --allow-untrusted-validators
           Allows running rules with validators from origins other than
           semgrep.dev. Avoid running rules from origins you don't trust.

       --audit-on=VAL (absent SEMGREP_AUDIT_ON env)

       --baseline-commit=VAL (absent SEMGREP_BASELINE_COMMIT env)
           Only show results that are not found in this commit hash. Aborts
           run if not currently in a git directory, there are unstaged
           changes, or given baseline hash doesn't exist. 

       --code
           Run Semgrep Code (SAST) product.

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

       --dry-run
           When set, will not start a scan on semgrep.dev and will not report
           findings. Instead will print out json objects it would have sent.

       --dryrun
           If --dryrun, does not write autofixes to a file. This will print
           the changes to the console. This lets you see the changes before
           you commit to them. Only works with the --autofix flag. Otherwise
           does nothing. 

       --emacs
           Output results in Emacs single-line format.

       --emacs-output=VAL
           Write a copy of the emacs output to a file or post to URL.

       --enable-experimental-requirements
           Experimental: support wider set of requirements lockfiles.

       --enable-nosem
           Enables 'nosem'. Findings will not be reported on lines containing
           a 'nosem' comment at the end. Enabled by default.

       --enable-version-check (absent SEMGREP_ENABLE_VERSION_CHECK env)
           Checks Semgrep servers to see if the latest version is run;
           disabling this may reduce exit time after returning results. 

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
           Skip minified files. These are files that are > 7% whitespace, or
           who have a large number of bytes per line. By default minified
           files are scanned 

       --exclude-rule=VAL
           Skip any rule with the given id. Can add multiple times.

       --experimental
           Enable experimental features.

       -f VAL, -c VAL, --config=VAL
           Not supported in 'ci' mode

       --files-with-matches
           Output only the names of files containing matches. REQUIRES
           --experimental

       --force-color (absent SEMGREP_FORCE_COLOR env)
           Always include ANSI color in the output, even if not writing to a
           TTY; defaults to using the TTY status 

       --gh-token=VAL (absent GH_TOKEN env)
           The GitHub token.

       --github-api-url=VAL (absent GITHUB_API_URL env)
           The GitHub API URL.

       --github-event-name=VAL (absent GITHUB_EVENT_NAME env)
           The GitHub event name.

       --github-event-path=VAL (absent GITHUB_EVENT_PATH env)
           The GitHub event path.

       --github-head-ref=VAL (absent GITHUB_HEAD_REF env)
           The GitHub HEAD ref.

       --github-ref=VAL (absent GITHUB_REF env)
           The GitHub ref.

       --github-repository=VAL (absent GITHUB_REPOSITORY env)
           The GitHub repository.

       --github-repository-id=VAL (absent GITHUB_REPOSITORY_ID env)
           The ID of the repository.

       --github-repository-owner-id=VAL (absent GITHUB_REPOSITORY_OWNER_ID
       env)
           The repository owner's account ID.

       --github-run-id=VAL (absent GITHUB_RUN_ID env)
           The GitHub run ID.

       --github-server-url=VAL (absent=https://github.com or
       GITHUB_SERVER_URL env)
           The GitHub server URL.

       --github-sha=VAL (absent GITHUB_SHA env)
           The GitHub commit.

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

       --internal-ci-scan-results
           <internal, do not use>

       -j VAL, --jobs=VAL (absent=4)
           Number of subprocesses to use to run checks in parallel. Defaults
           to the number of cores detected on the system (1 if using --pro). 

       --json
           Output results in Semgrep's JSON format.

       --json-output=VAL
           Write a copy of the json output to a file or post to URL.

       --junit-xml
           Output results in JUnit XML format.

       --junit-xml-output=VAL
           Write a copy of the JUnit XML output to a file or post to URL.

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
           the Semgrep server. If 'on', metrics are always sent. If 'off',
           metrics are disabled altogether and not sent. If absent, the
           SEMGREP_SEND_METRICS environment variable value will be used. If
           no environment variable, defaults to 'auto'. 

       --no-autofix
           negates -a/--autofix

       --no-dryrun
           negates --dryrun

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

       --no-suppress-errors
           negates --suppress-errors

       --no-trace
           negates --trace

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

       -q, --quiet
           Only output findings.

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

       --semgrep-branch=VAL (absent SEMGREP_BRANCH env)
           The Git branch.

       --semgrep-commit=VAL (absent SEMGREP_COMMIT env)
           The commit of the Git repository.

       --semgrep-job-url=VAL (absent SEMGREP_JOB_URL env)
           The job URL.

       --semgrep-pr-id=VAL (absent SEMGREP_PR_ID env)
           The PR/MR ID.

       --semgrep-pr-title=VAL (absent SEMGREP_PR_TITLE env)
           The PR/MR title.

       --semgrep-repo-display-name=VAL (absent SEMGREP_REPO_DISPLAY_NAME env)
           The name the repository should be displayed as for this scan.
           Setting it allows users to scan individual repos in one monorepo
           separately.

       --semgrep-repo-name=VAL (absent SEMGREP_REPO_NAME env)
           The name of the Git repository.

       --semgrep-repo-url=VAL (absent SEMGREP_REPO_URL env)
           The URL of the Git repository.

       --skip-unknown-extensions
           negates --scan-unknown-extensions

       --subdir=VAL (absent=/src)
           Scan only a subdirectory of this folder. This creates a project
           specific to the subdirectory unless SEMGREP_REPO_DISPLAY_NAME is
           set. Expects a relative path. (Note that when two scans have the
           same SEMGREP_REPO_DISPLAY_NAME but different targeted directories,
           the results of the second scan overwrite the first.)

       --supply-chain
           Run Semgrep Supply Chain product.

       --suppress-errors (absent SEMGREP_SUPPRESS_ERRORS env)
           Configures how the CI command reacts when an error occurs. If
           true, encountered errors are suppressed and the exit code is zero
           (success). If false, encountered errors are not suppressed and the
           exit code is non-zero (failure).

       --text
           Output results in text format.

       --text-output=VAL
           Write a copy of the text output to a file or post to URL.

       --timeout=VAL (absent=5.)
           Maximum time to spend running a rule on a single file in seconds.
           If set to 0 will not have time limit. Defaults to 5.0 s. 

       --timeout-threshold=VAL (absent=3)
           Maximum number of rules that can time out on a file before the
           file is skipped. If set to 0 will not have limit. Defaults to 3. 

       --trace
           Record traces from Semgrep scans to help debugging. This feature
           is meant for internal use and may be changed or removed without
           warning. 

       --trace-endpoint=VAL (absent SEMGREP_OTEL_ENDPOINTS env)
           Endpoint to send OpenTelemetry traces to, if `--trace` is present.
           The value may be `semgrep-prod` (default), `semgrep-dev`,
           `semgrep-local`, or any valid URL. This feature is meant for
           internal use and may be changed or removed wihtout warning. 

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

       --vim
           Output results in vim single-line format.

       --vim-output=VAL
           Write a copy of the vim output to a file or post to URL.

       --x-dump-rule-partitions=VAL (absent=0)
           Internal flag.

COMMON OPTIONS
       --help[=FMT] (default=auto)
           Show this help in format FMT. The value FMT must be one of auto,
           pager, groff or plain. With auto, the format is pager or plain
           whenever the TERM env var is dumb or undefined.

EXIT STATUS
       semgrep ci exits with:

       0   on success.

       123 on indiscriminate errors reported on standard error.

       124 on command line parsing errors.

       125 on unexpected internal errors (bugs).

ENVIRONMENT
       These environment variables affect the execution of semgrep ci:

       GH_TOKEN
           See option --gh-token.

       GITHUB_API_URL
           See option --github-api-url.

       GITHUB_EVENT_NAME
           See option --github-event-name.

       GITHUB_EVENT_PATH
           See option --github-event-path.

       GITHUB_HEAD_REF
           See option --github-head-ref.

       GITHUB_REF
           See option --github-ref.

       GITHUB_REPOSITORY
           See option --github-repository.

       GITHUB_REPOSITORY_ID
           See option --github-repository-id.

       GITHUB_REPOSITORY_OWNER_ID
           See option --github-repository-owner-id.

       GITHUB_RUN_ID
           See option --github-run-id.

       GITHUB_SERVER_URL
           See option --github-server-url.

       GITHUB_SHA
           See option --github-sha.

       SEMGREP_AUDIT_ON
           See option --audit-on.

       SEMGREP_BASELINE_COMMIT
           See option --baseline-commit.

       SEMGREP_BRANCH
           See option --semgrep-branch.

       SEMGREP_COMMIT
           See option --semgrep-commit.

       SEMGREP_ENABLE_VERSION_CHECK
           See option --enable-version-check.

       SEMGREP_FORCE_COLOR
           See option --force-color.

       SEMGREP_JOB_URL
           See option --semgrep-job-url.

       SEMGREP_OTEL_ENDPOINTS
           See option --trace-endpoint.

       SEMGREP_PR_ID
           See option --semgrep-pr-id.

       SEMGREP_PR_TITLE
           See option --semgrep-pr-title.

       SEMGREP_REPO_DISPLAY_NAME
           See option --semgrep-repo-display-name.

       SEMGREP_REPO_NAME
           See option --semgrep-repo-name.

       SEMGREP_REPO_URL
           See option --semgrep-repo-url.

       SEMGREP_SEND_METRICS
           See option --metrics.

       SEMGREP_SUPPRESS_ERRORS
           See option --suppress-errors.

AUTHORS
       Semgrep Inc. <support@semgrep.com>

BUGS
       If you encounter an issue, please report it at
       https://github.com/semgrep/semgrep/issues

```
