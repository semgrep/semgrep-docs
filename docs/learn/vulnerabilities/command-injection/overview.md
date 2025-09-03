---
title: Command Injection
description: Learn about Command Injection vulnerabilities
hide_title: false
displayed_sidebar: learnSidebar
slug: /learn/vulnerabilities/command-injection
---

# OS Command Injection

Imagine opening your server’s terminal and letting a stranger type whatever they want. That is essentially what happens when untrusted input reaches an operating system command in your code. If your code runs OS commands using untrusted data, you are effectively doing just that. Allowing attackers to execute os commands can result in exposure of sensitive data, disruption of services, and arbitrary code execution. In short, total compromise of the system.

To avoid running OS commands with untrusted input, use libraries with the same functionality wherever possible. If OS commands are unavoidable, use system libraries that can separate the command from the arguments and flags, and always validate and escape the input.

In this article, we will first explain what OS command execution is and why developers use it. Next, we will cover common attacks that exploit this functionality. After that, we will show how these issues can be detected in code. Finally, we will discuss practical steps you can take to reduce risk.

---

### Why Applications Run OS Commands

Applications sometimes call out to the underlying operating system to perform tasks that are difficult to implement otherwise. Examples include listing files, converting media formats, invoking system utilities, or starting background processes. The convenience of delegating work to existing system tools is what makes this technique appealing.

The risk arises because system shells interpret more than just text. They recognize special characters such as `&`, `;`, or `|` that can change the meaning of a command. If untrusted input from users, APIs, or external systems reaches the shell without proper handling, it can alter the command in ways the developer did not intend. This creates an opening for OS command injection.

---

### Common Attacks

One of the most basic forms of OS command injection involves chaining commands. Suppose an application accepts a user parameter and uses it directly in a system call. An attacker could supply input that ends the original command and appends a new one.

For example, consider a URL that runs a script with user input:

```
https://semgrep.dev/check?filename=test.txt
```

If the application internally runs:

```
listfiles test.txt
```

a user could provide input like:

```
test.txt;cat%20/etc/passwords
```

The framework would decode the `%20` character into a string and the actual command executed would become:

```
listfiles test.txt;cat /etc/passwords
```

The second command would reveal sensitive information to the attacker. 

A variation known as blind command injection occurs when the application does not display command output. Attackers then rely on indirect signals, such as time delays. For instance, by submitting input like:

```
test.txt && sleep 10
```

The attacker can measure that the server takes 10 seconds longer to respond, confirming that the injected command ran.

---

### How to Detect Issues in Code

To illustrate, here is a simplified code example:

```python
from flask import Flask, request
import os

app = Flask(__name__)

@app.route("/run")
def run_command():
    directory = request.args.get("directory")
    return_code = os.system("ls " + directory) 
    return "{'return_code':" + return_code + "}"
```

In this code, whatever value a user passes in the `directory` parameter is used in a system command. If someone requests:

```
https://semgrep.dev/run?directory=myfile;whoami
```

Then `whoami` is executed. The vulnerability arises from the data flow: input from a web request moves directly into an OS command without filtering or validation.

Developers can look for red flags such as functions that invoke the shell (`system`, `exec`, `popen`, or `subprocess` with `shell=True`) combined with input that originates from outside the application. Tools like Semgrep can automatically trace this flow. Semgrep can identify when untrusted sources, like web request parameters, reach sensitive functions that execute commands. This makes it possible to scan your codebase for such patterns and prevent them before release.

---

### Recommendations and Mitigations

The most effective safeguard is to avoid calling system commands from your application code. Many tasks that seem to require shell commands can often be implemented using built-in libraries or safe APIs that accept structured parameters instead of raw command strings.

If OS commands are unavoidable, use functions or APIs that accept the command separate from its arguments and flags, ensuring that special characters in the arguments cannot lead to the execution of a second command.

Even then, always carefully validate input. One strategy is to restrict values to a predetermined allowlist. Another is to ensure that input matches a limited format, such as numbers only. Quoting or escaping user input is unreliable on its own, since shells interpret text in many different ways depending on context. There are countless public payload lists showing how attackers bypass escaping and blocklists. Relying on those defenses alone is rarely sufficient.

---

### Conclusion

OS command injection occurs when untrusted input is used in operating system commands, giving attackers control over what those commands execute. We have discussed why applications call OS commands, how injection attacks typically work, how you can detect them in code, and what practices can help reduce the risk.

As a developer, the key lesson is to avoid mixing user input with system commands. When it cannot be avoided, validate inputs strictly and prefer safe execution methods. Tools like Semgrep can help by automatically finding injection points in your codebase.

By treating untrusted input as if it were a stranger at your keyboard, you can keep your terminal under your control.