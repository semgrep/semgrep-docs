---
append_help_link: true
---

# Getting started

Start by installing Semgrep locally for use on your command line. It's available through Homebrew, pip, or Docker.

```sh
# For macOS
$ brew install semgrep

# For Ubuntu / Windows via WSL / Linux / macOS
$ python3 -m pip install semgrep

# For Docker users
$ docker pull returntocorp/semgrep
```

Next, navigate to a local code repository and run Semgrep using a set of rules from the public Semgrep Registry. Analysis executes fully on your computer: **code is never uploaded anywhere**.

```sh
# Navigate to a local code repository
cd path/to/src

# Confirm installation by running --help. Semgrep documentation should print to your terminal
$ semgrep --help

# Run the curated `ci` ruleset containing rules for many languages. Files are scanned with the
# rules matching their language (e.g. Go rules scan Go files). Semgrep respects your `.gitignore`.
$ semgrep --config=p/ci
```

Semgrep makes it easy to write custom rules that look like the code you already write.

```sh
# Check for Python print statements
$ semgrep -e 'print(...)' --lang=py path/to/src

# Check for Python == where the left and right hand sides are the same (often a bug)
$ semgrep -e '$X == $X' --lang=py path/to/src
```

With Semgrep running locally, consider the following:

* 

---

See [CLI Reference](cli-usage.md) for command line options and exit codes.

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

Semgrep rules can cover a wide range of use cases:

- Automating code review comments
- Detecting secure coding violations
- Detecting API routes, database models, or similar code segments
- Identifying authentication violations
- Lightweight vulnerability detection
- Scanning configuration files
- And more! Check out more use cases [here](writing-rules/rule-ideas.md).


Visit [Writing Rules > Getting started](writing-rules/overview.md) for an in-depth guide and reference material.

This rule is used to find and discourage `print(...)` in production code. You can edit this rule here or visit the [Playground](https://semgrep.dev/editor) to write and deploy your own rule.

<iframe title="Semgrep example with Python Flask routes" src="https://semgrep.dev/embed/editor?snippet=ievans:print-to-logger" width="100%" height="432px" frameborder="0"></iframe>

<p align="center" style="font-size: 12px">
    <img src="../img/semgrep-ci.gif" alt="A reviewer writes a Semgrep rule and adds it to an organization-wide policy."/></br>
    A reviewer writes a Semgrep rule and adds it to an organization-wide policy.
</p>

# Run Semgrep continuously

Finally, Semgrep is at its best when used to continuously scan code.
Check out [Semgrep CI](semgrep-ci.md) to learn how to get results where you already work:
GitHub, GitLab, Slack, Jira, and more.
To get results even earlier in the development process,
such as in a Git pre-commit hook or VS Code,
check the available [Semgrep extensions](extensions.md).

For teams running Semgrep on multiple projects, see [Semgrep App](https://semgrep.dev/manage). Its free and paid tiers let users:

1. Centrally define code standards
2. Monitor the impact of standards
3. Host private rules
4. Push notifications to 3rd-party services
