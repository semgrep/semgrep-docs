# Getting started

[TOC]

# Run Semgrep locally

Use Semgrep locally to scan specific files or your entire codebase, choosing one-off "grep-like" patterns or existing rules.

To install Semgrep use Homebrew or pip, or run without installation via Docker:

```sh
# For macOS
$ brew install semgrep

# For Ubuntu/WSL/Linux/macOS
$ python3 -m pip install semgrep

# To try Semgrep without installation run via Docker
$ docker run --rm -v "${PWD}:/src" returntocorp/semgrep --help
```

To confirm installation and get an overview of Semgrep’s functionality run with `--help`:

```sh
$ semgrep --help
```

Once installed, Semgrep can run with single rules or entire rulesets. Visit [Running rules](running-rules.md) to learn more or try the following:

```sh
# Check for Python == where the left and right hand sides are the same (often a bug)
$ semgrep -e '$X == $X' --lang=py path/to/src

# Run the r2c-ci ruleset (with rules for many languages) on your own code!
$ semgrep --config=p/r2c-ci path/to/src
```

<details><summary>🎉Try Semgrep on known vulnerable test projects! 🎉</summary>
<p>

These community projects are designed to test code scanners and teach security concepts. Try cloning and scanning them to see Semgrep in action!

```sh
# juice-shop, a vulnerable Node.js + Express app
$ git clone https://github.com/bkimminich/juice-shop
$ semgrep --config p/r2c-security-audit juice-shop
# railsgoat, a vulnerable Ruby on Rails app
$ git clone https://github.com/OWASP/railsgoat
$ semgrep --config p/r2c-security-audit railsgoat

# govwa, a vulnerable Go app
$ git clone https://github.com/0c34/govwa
$ semgrep --config p/r2c-security-audit govwa

# vulnerable Python + Flask app
$ git clone https://github.com/we45/Vulnerable-Flask-App
$ semgrep --config p/r2c-security-audit Vulnerable-Flask-App

# WebGoat, a vulnerable Java + Spring app
$ git clone https://github.com/WebGoat/WebGoat
$ semgrep --config p/r2c-security-audit WebGoat
```

</p>
</details>
</br>

# Write your own rule

Quickly start with the [Semgrep Tutorial](https://semgrep.dev/learn) or visit [Writing Rules > Getting started](writing-rules/overview.md) for an in-depth guide.


# Run and centrally manage Semgrep CI

Semgrep is at its best when used to continuously scan code. Visit [Integrations](integrations.md) to learn how to get results where you already work: GitHub, GitLab, Slack, Jira, VS Code, and more.

For teams running Semgrep on multiple projects, see [Semgep Community](https://semgrep.dev/manage). Semgrep provides free infrastructure to:

1. Centrally define code standards for your projects
2. Monitor the impact of your standards
3. Host private rules

<p align="center" style="font-size: 12px">
    <img src="/img/semgrep-ci.gif" alt="A reviewer writes a Semgrep rule and adds it to an organization-wide policy."/></br>
    A reviewer writes a Semgrep rule and adds it to an organization-wide policy.
</p>