# Getting started

1. [Run Semgrep locally](#run-semgrep-locally)
2. [Write a rule](#write-a-rule)
3. [Run Semgrep continously](#run-semgrep-continuously)

# Run Semgrep locally

We'll start by running [Semgrep CLI](https://github.com/returntocorp/semgrep/) locally to scan your code. It runs offline on uncompiled code: **no code leaves your machine**.

Install Semgrep using Homebrew or pip, or run without installation via Docker:

```sh
# For macOS
$ brew install semgrep

# For Ubuntu/WSL/Linux/macOS
$ python3 -m pip install semgrep

# To try Semgrep without installation run via Docker
$ docker run --rm -v "${PWD}:/src" returntocorp/semgrep --help
```

Next, we'll confirm installation and run both a simple "grep-like" rule and a full ruleset:

```sh
# Confirm installation by running --help. Semgrep documentation should print to your terminal
$ semgrep --help

# Check for Python == where the left and right hand sides are the same (often a bug)
$ semgrep -e '$X == $X' --lang=py path/to/src

# Run the r2c-ci ruleset (with rules for many languages) on your own code!
$ semgrep --config=p/r2c-ci path/to/src
```

Visit [Running rules](running-rules.md) to learn more or try Semgrep on known vulnerable test projects:

<details><summary>Expand for sample projects! 🎉</summary>
<p>

These community projects are designed to test code scanners and teach security concepts. Try cloning and scanning them with Semgrep.

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

# 2. Write a rule

Once Semgep is running locally, see the [Semgrep Tutorial](https://semgrep.dev/learn) to quickly learn how to write precise rules. 

Visit [Writing Rules > Getting started](writing-rules/overview.md) for an in-depth guide and reference material.

<p align="center" style="font-size: 12px">
    <img src="/docs/img/semgrep-ci.gif" alt="A reviewer writes a Semgrep rule and adds it to an organization-wide policy."/></br>
    A reviewer writes a Semgrep rule and adds it to an organization-wide policy.
</p>

# 3. Run Semgrep continously

Finally, Semgrep is at its best when used to continuously scan code. Visit [Integrations](integrations.md) to learn how to get results where you already work: GitHub, GitLab, Slack, Jira, VS Code, and more.

For teams running Semgrep on multiple projects, see [Semgep Community](https://semgrep.dev/manage). This free infrastructure lets users:

1. Centrally define code standards for your projects
2. Monitor the impact of your standards
3. Host private rules
4. Push notifications to 3rd party services
