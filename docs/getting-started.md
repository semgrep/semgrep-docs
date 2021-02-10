# Getting started

- [Getting started](#getting-started)
- [Run Semgrep locally](#run-semgrep-locally)
- [Write a rule](#write-a-rule)
- [Run Semgrep continuously](#run-semgrep-continuously)

# Run Semgrep locally

Start by running [Semgrep CLI](https://github.com/returntocorp/semgrep/) locally to scan your code. It runs offline on uncompiled code: **no code leaves your machine**.

Install Semgrep using Homebrew or pip, or run without installation via Docker:

```sh
# For macOS
$ brew install semgrep

# For Ubuntu/WSL/Linux/macOS
$ python3 -m pip install semgrep

# To try Semgrep without installation run via Docker
$ docker run --rm -v "${PWD}:/src" returntocorp/semgrep --help
```

Confirm installation and run both a simple “grep-like” rule and a full ruleset:


```sh
# Confirm installation by running --help. Semgrep documentation should print to your terminal
$ semgrep --help

# Check for Python == where the left and right hand sides are the same (often a bug)
$ semgrep -e '$X == $X' --lang=py path/to/src

# Run the r2c CI ruleset (with rules for many languages) on your own code!
$ semgrep --config=p/ci path/to/src
```

See [CLI usage](cli-usage.md) for command line options and exit codes.

Visit [Running rules](running-rules.md) to learn more or try Semgrep on known vulnerable test projects:

<details><summary>Expand for sample projects! 🎉</summary>
<p>

These community projects are designed to test code scanners and teach security concepts. Try cloning and scanning them with Semgrep.

```sh
# juice-shop, a vulnerable Node.js + Express app
$ git clone https://github.com/bkimminich/juice-shop
$ semgrep --config p/security-audit juice-shop
# railsgoat, a vulnerable Ruby on Rails app
$ git clone https://github.com/OWASP/railsgoat
$ semgrep --config p/security-audit railsgoat

# govwa, a vulnerable Go app
$ git clone https://github.com/0c34/govwa
$ semgrep --config p/security-audit govwa

# vulnerable Python + Flask app
$ git clone https://github.com/we45/Vulnerable-Flask-App
$ semgrep --config p/security-audit Vulnerable-Flask-App

# WebGoat, a vulnerable Java + Spring app
$ git clone https://github.com/WebGoat/WebGoat
$ semgrep --config p/security-audit WebGoat
```

</p>
</details>
</br>

# Write a rule

Once Semgrep is running locally, see the [Semgrep Tutorial](https://semgrep.dev/learn) to quickly learn how to write precise rules.

Visit [Writing Rules > Getting started](writing-rules/overview.md) for an in-depth guide and reference material.

<p align="center" style="font-size: 12px">
    <img src="/docs/img/semgrep-ci.gif" alt="A reviewer writes a Semgrep rule and adds it to an organization-wide policy."/></br>
    A reviewer writes a Semgrep rule and adds it to an organization-wide policy.
</p>

# Run Semgrep continuously

Finally, Semgrep is at its best when used to continuously scan code. Visit [Integrations](integrations.md) to learn how to get results where you already work: GitHub, GitLab, Slack, Jira, VS Code, and more.

For teams running Semgrep on multiple projects, see [Semgrep App](https://semgrep.dev/manage). Its free and paid tiers let users:

1. Centrally define code standards
2. Monitor the impact of standards
3. Host private rules
4. Push notifications to 3rd-party services
