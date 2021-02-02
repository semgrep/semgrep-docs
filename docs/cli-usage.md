# CLI Usage

The following usage documentation is for the [Semgrep CLI](https://github.com/returntocorp/semgrep).

[TOC]

# Command Line Options

See `semgrep --help` for command line options.

# Exit Codes

`semgrep` may exit with the following exit codes:

- `0`: Semgrep ran successfully and found no errors
- `1`: Semgrep ran successfully and found issues in your code
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