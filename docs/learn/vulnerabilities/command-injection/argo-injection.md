---
title: Argo Injection
description: Learn about Argo Injection vulnerabilities
hide_title: false
displayed_sidebar: learnSidebar
slug: /learn/vulnerabilities/command-injection/argo-injection
---

# Command Injection Risks in Argo Workflows

In March 2021, security researchers reported a command injection issue in Argo Workflows (see [GitHub issue #5061](https://github.com/argoproj/argo-workflows/issues/5061)). The report highlighted how seemingly harmless parameter substitutions could allow attackers to execute arbitrary code inside Kubernetes jobs. 

After this article, you’ll know to avoid using input parameters directly inside script bodies in Argo, and to convert parameters to environment variables instead to keep them safe.

We will first explain what Argo Workflows are and why parameters can be risky. We will then cover common injection attacks against Argo templates. Next, we will show how to detect risky patterns in your code using Semgrep. Finally, we will provide concrete mitigation steps you can apply immediately in your workflows.

---

### Understanding Argo Workflows and Parameters

Argo Workflows is a Kubernetes-native workflow engine designed to define and run complex jobs. It exists to simplify running multi-step workloads, such as data processing or CI/CD pipelines, directly inside Kubernetes. Developers can define workflows in YAML, and Argo executes the steps as pods.

The features that makes Argo so flexible, the use of parameters and templates, is also what creates security risks. Parameters in templates are written with curly brace placeholders (called mustache templates) like `{{inputs.parameters.message}}`. During execution they are replaced by the actual input values. 

---

### Common Injection Attacks in Argo Workflows

When mustache template placeholders are used directly inside a script or command, they act like unquoted user input, meaning they can inject arbitrary commands or code. 

### Injection in the `script` template

The most straightforward risk is **command injection** in shell scripts. Consider this workflow step:

```yaml
script:
  image: debian:9.4
  command: [bash]
  source: |
    echo {{inputs.parameters.message}}
```

If an attacker provides `hello | whoami` as the parameter, Argo replaces the placeholder before execution, and the container runs both `echo hello` and `whoami`. This means that the attacker can execute arbitrary commands inside your pod.

Besides shell scripts, Argo also provides support for other programming languages. With the same technique, these scripts are vulnerable to **code injection.** For example, when using Python, if you write:

```yaml
script:
  image: debian:9.4
  command: [python]
  source: |
    print("{{inputs.parameters.message}}")
```

And the input is crafted as:

```yaml
test")
import os
os.system("id")
print("string
```

The result is that attacker-controlled code is executed, leaking information or taking control of the container.

We have been able to reproduce these issues in all of the languages we tested: Bash, sh, Python, Node.js, Perl, and Ruby. Which means any workflow using inline scripting with parameters is at risk.

### Injection in the `container` template

In the `container` template, you can specify an `image`, `command` and `args`, and this command will be executed on the docker image with the provided args. The command can contain flags, and the args seem to be multiline. Functionally it looks equivalent to the `script` template, but the string in the `args` value is properly escaped, so that no pipe symbol can be used to pipe additional commands.

However, when the command itself is not a direct shell command, but one that initiates a new shell or language interpreter such as Python, the same issues remain. Here’s a vulnerable example:

```yaml
	container:
    image: alpine:latest
    command:
      - sh
      - '-c'
    args:
      - 'echo {{inputs.parameters.message}}'
```

---

### Detecting Vulnerable Patterns in Your Code

Let’s look at a vulnerable workflow template:

```yaml
metadata:
  generateName: semgrep-vuln-research-node
spec:
  templates:
    - name: print-message-node
      inputs:
        parameters:
          - name: message
      outputs: {}
      metadata: {}
      script:
        name: ''
        image: node:9.1-alpine
        command:
          - node
        resources: {}
        source: |
          var rand = Math.floor(Math.random() * 100);
          console.log("{{inputs.parameters.message}}");
  entrypoint: print-message-node
  arguments:
    parameters:
      - name: message
  artifactRepositoryRef:
    key: security-research
  archiveLogs: true
```

Just like the example above, the vulnerability  is that the `message` parameter is substituted directly into a node script. If this workflow were run with an attacker-supplied parameter, it could execute unintended commands.

To detect such cases systematically, with [Semgrep](https://semgrep.dev/), you can use the free and [open source rule](https://github.com/semgrep/semgrep-rules/blob/develop/yaml/argo/security/argo-workflow-parameter-command-injection.yaml) `argo-workflow-parameter-command-injection`. It flags instances where parameters are inserted directly into shell scripts or code sources. Semgrep scans YAML definitions and reports if a parameter placeholder is used in a risky location, such as inside `script.source` or `container.args` fields.

By running Semgrep against your workflow repository, you can catch these injection hotspots before they make it into production.

---

### Recommendations and Mitigations

The most effective mitigation is to avoid inserting parameters directly into script bodies. Instead, convert them into environment variables, which are properly escaped by default. For example, the previous node workflow can be rewritten as:

```yaml
script:
  image: debian:9.4
  env:
    - name: MESSAGE
      value: "{{inputs.parameters.message}}"
  command: [bash]
  source: |
    echo $MESSAGE
```

This way, user input is treated as plain text rather than executable code.

For Python or Node.js, apply the same pattern: store parameters in environment variables and access them safely using the language’s standard library (`os.getenv` in Python, `process.env` in Node.js).

Integrate Semgrep into your CI pipeline to continuously scan for these issues. 

---

### Conclusion

Command injection in Argo Workflows is a subtle but serious risk. What looks like a simple parameter substitution can allow attackers to run arbitrary commands in your Kubernetes environment. In this article, we saw how Argo parameters work, how attackers can abuse them in Bash or Python scripts, how to detect risky patterns using Semgrep, and how to fix workflows by moving parameters into environment variables.

If you use Argo Workflows today, review your YAML templates for direct parameter substitution in scripts and replace them with safer patterns. You can start by scanning your codebase with Semgrep rules designed for Argo.