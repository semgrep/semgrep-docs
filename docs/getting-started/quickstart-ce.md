---
slug: quickstart-ce
title: Get started
hide_title: false
description: Learn how to set up Semgrep Community Edition, scan your codebase for security issues, and view your findings
tags:
 - quickstart
 - Semgrep CE
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get started with Semgrep Community Edition

Semgrep Community Edition (CE) is an open source static analysis tool that can find insecure coding patterns and security vulnerabilities in source code. Semgrep CE encompasses a SAST scanning engine, community rules, and integrated development environment plugins.

:::info
Semgrep CE is the open source version of Semgrep Code, a commercial offering recommended for enterprise use cases. Both products share a common command-line interface, but Semgrep Code adds additional capabilities, including a web user interface.
:::

## Prerequisites

See [Prerequisites](/prerequisites) to ensure your machine meets Semgrep's requirements.

## Install Semgrep CE

<Tabs
    defaultValue="macOS"
    values={[
    {label: 'macOS', value: 'macOS'},
    {label: 'Linux', value: 'Linux'},
    {label: 'Windows (beta)', value: 'Windows'},
    ]}
>

<TabItem value='macOS'>

1. Install the Semgrep CLI and confirm the installation:

 ```console
 # install through homebrew
 brew install semgrep

 # install through pip
 python3 -m pip install semgrep

 # confirm installation succeeded by printing the currently installed version
 semgrep --version
 ```

    **Homebrew users:** ensure that you've [added Homebrew to your PATH](https://docs.brew.sh/FAQ#my-mac-apps-dont-find-homebrew-utilities).

</TabItem>

<TabItem value='Linux'>

1. Install the Semgrep CLI and confirm the installation:

 ```console
 # install through pip
 python3 -m pip install semgrep

 # if you get the following error "error: externally-managed-environment",
 # see semgrep.dev/docs/kb/semgrep-appsec-platform/error-externally-managed-environment 

 # confirm installation succeeded by printing the currently installed version
 semgrep --version
 ```

</TabItem>

<TabItem value='Windows'>

1. [Download](https://www.python.org/downloads/) and install Python. Check the box to add python.exe to the PATH; otherwise, you will have difficulty running Pip and Semgrep.

2. Configure your system to run Python with UTF-8 text encodings by default. In PowerShell, run:

 ```console
 [System.Environment]::SetEnvironmentVariable('PYTHONUTF8', '1', 'User')
 ```

3. Install the Semgrep CLI and confirm the installation. In PowerShell, run:

 ```console
 # install through pip
 pip install –upgrade semgrep

 # if you get the following error "error: externally-managed-environment",
 # see semgrep.dev/docs/kb/semgrep-appsec-platform/error-externally-managed-environment 

 # confirm installation succeeded by printing the currently installed version
 semgrep --version
 ```

</TabItem>

</Tabs>

## Create a test file for use with Semgrep CE


Navigate to the directory of your choice, and create a sample file called `app.py` with the following:

```python
# app.py
import os

user_input = input("Enter a Directory: ")
os.system("ls " + user_input)
```

Given this file, you might expect someone to run it as follows:

```bash
$ python3 app.py
Enter a Directory: .
app.py
```

However, because this file didn't follow secure coding principles, a malicious actor might take advantage of the file as follows:

```bash
$ python3 app.py
Enter a Directory: .; cat ~/.ssh/id_*
app.py
-----BEGIN OPENSSH PRIVATE KEY-----
...
```

## Scan `app.py` with Semgrep CE

To check your code for security vulnerabilities:

1. Navigate to the directory where you saved `app.py` using the terminal.
2. Invoke Semgrep CE using `semgrep scan`. The `semgrep scan` command pulls down rules from the [Semgrep Registry](https://semgrep.dev/r), similar to package managers for source code libraries, and stores rules that help define semantic meaning to patterns in source code. By default, Semgrep CE uses open source community rules:

```bash         
┌─────────────┐
│ Scan Status │
└─────────────┘
  Scanning 1 file tracked by git with 1062 Code rules:

  Language      Rules   Files          Origin      Rules
 ─────────────────────────────        ───────────────────
  python          243       1          Community    1062
  <multilang>      48       1
```

The specific numbers shown in your Scan Status printed to the terminal may vary, but you can still see that Semgrep is scanning the source code using community rules. There are over 1000 community rules in the default rule set, but because Semgrep recognizes the source code language, only rules relevant to the code being scanned are evaluated.

To fine-tune your scan, you can include the `--config` parameter, which allows you to choose which rules to run:

```bash
semgrep scan --config "p/python-command-injection" app.py
```

In the preceding example, the command uses a predefined rule set from the Semgrep Registry focused on command injection vulnerabilities in Python. The specific rules you use during a scan will significantly impact what is detected in your source code.

## View and understand Semgrep Scan output

Semgrep displays your results when the scan is completed.

The Scan Summary printed to the terminal tells you how many rules were run and whether or not there were any findings. A finding indicates that Semgrep detected a potential vulnerability. 

```bash
┌──────────────┐
│ Scan Summary │
└──────────────┘
✅ Scan completed successfully.
 • Findings: 1 (1 blocking)
 • Rules run: 24
 • Targets scanned: 1
 • Parsed lines: ~100.0%
 • No ignore information available
Ran 24 rules on 1 file: 1 finding.
```

The findings list includes the name of the rule, a brief explanation of the security issue, and the exact line of code that triggered the finding:

```bash
┌────────────────┐
│ 1 Code Finding │
└────────────────┘

    app.py
   ❯❯❱ python.lang.security.audit.dangerous-system-call-audit.dangerous-system-call-audit
          Found dynamic content used in a system call. This is dangerous if external data can reach this
          function call because it allows a malicious actor to execute commands. Use the 'subprocess' module
 instead, which is easier to use without accidentally exposing a command injection vulnerability.
 Details: https://sg.run/2WL0

 5┆ os.system("ls " + user_input)
```

Each rule is given a unique namespace to help identify it. For example, Python language issues are prefixed with `python.lang`.

The rule's author defines the source code patterns and provides remediation advice or an explanation of the problem. In this example, you can also see the specific expression and line of code where the issue appears.

This example is a [Command Injection](/learn/vulnerabilities/command-injection) vulnerability. The rule advises you to review the [Python Code Injection Cheat Sheet](/cheat-sheets/python-code-injection) to learn more. The link in the output takes you to the **Semgrep Playground**, where you can interactively modify this rule and test it against sample code.

## Next steps

Read Semgrep docs for details on how to:

- [Set up CI/CD pipelines](/deployment/oss-deployment)
- [Install the IDE](/extensions/overview)
- [Write custom rules](/writing-rules/overview)
- [Access learning guides](/docs/learn)
