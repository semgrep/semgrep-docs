---
slug: getting-started
append_help_link: true
description: "This getting started guides you through the installation of Semgrep, shows you how to run Semgrep locally, and provides an overview of benefits which you may reap by using Semgrep CI."
---

# Getting started with Semgrep CLI

## Running Semgrep locally

Start by running [Semgrep](https://github.com/returntocorp/semgrep/) locally to scan your code. Semgrep runs offline on uncompiled code. **No code leaves your computer**.

1. Install Semgrep. Use one of the following options depending on your system and preference:
    - For macOS:
        ```sh
        brew install semgrep
        ```
    - For Ubuntu, Windows through Windows Subsystem for Linux (WSL), Linux, macOS:
        ```sh
        python3 -m pip install semgrep
        ```
    - To try out Semgrep without installation you may run it through Docker:
        ```sh
        docker run --rm -v "${PWD}:/src" returntocorp/semgrep semgrep --config=auto
        ```
2. Confirm installation by printing help manual page to your terminal. To do so, run the following command:
    ```sh
    semgrep --help
    ```
3. Run recommended Semgrep Registry rules:
    <pre class="language-bash"><code>semgrep --config=auto <span className="placeholder">PATH/TO/SRC</span></code></pre>
    Substitute the <code><span className="placeholder">PATH/TO/SRC</span></code> with the path to your source code.

:::note
By default, when Semgrep Registry is used, Semgrep collects [usage metrics](./metrics.md).
:::

### Next steps

By completing this guide, you are now familiar with a simple use of Semgrep. Here are some additional resources to follow:

- See [Running rules](./running-rules.md) to try out and understand more about Semgrep rules.
- Explore the Semgrep [Rules Registry](https://semgrep.dev/r) to add rules to your project or [writing a rule](./writing-rules/overview.md).
- See [CLI Reference](./cli-reference.md) for command line options and exit codes.

## Testing Semgrep on vulnerable repositories

The following community projects are designed to test code scanners and teach security concepts. Try cloning and scanning them with Semgrep.

<details><summary>Expand for sample projects! 🎉</summary>
<p>

```sh
# juice-shop, a vulnerable Node.js + Express app:
git clone https://github.com/bkimminich/juice-shop
cd juice-shop
semgrep --config=auto

# Or if you don't have Semgrep installed, replace the semgrep command with:
docker run --rm -v "$(pwd)/juice-shop:/src" returntocorp/semgrep semgrep --config p/security-audit /src

# Try railsgoat, a vulnerable Ruby on Rails app:
git clone https://github.com/OWASP/railsgoat
cd railsgoat
semgrep --config=auto

# govwa, a vulnerable Go app:
git clone https://github.com/0c34/govwa
cd govwa
semgrep --config=auto 

# Vulnerable-Flask-App, vulnerable Python + Flask:
git clone https://github.com/we45/Vulnerable-Flask-App
cd Vulnerable-Flask-App
semgrep --config=auto 

# WebGoat, a vulnerable Java + Spring app:
git clone https://github.com/WebGoat/WebGoat
cd WebGoat
semgrep --config=auto 
```

</p>
</details>

## Run Semgrep continuously

Semgrep is at its best when used to continuously scan code. Check out [Semgrep in CI](semgrep-ci/overview.md/) to learn how to get results where you already work: GitHub, GitLab, Slack, Jira, and more. To get results even earlier in the development process, such as in a Git pre-commit hook or VS Code, check the available [Semgrep extensions](./extensions.md).

Check out [Semgrep App](https://semgrep.dev/manage) to integrate CI with PR or MR comments, monitor progress, host private rules (paid tier), and much more! 

## Upgrading

We [release new Semgrep versions](https://github.com/returntocorp/semgrep/releases) often! See [upgrading](./upgrading.md) for more details.
