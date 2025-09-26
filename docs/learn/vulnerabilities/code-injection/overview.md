---
title: Code Injection
description: Learn about Code Injection vulnerabilities
hide_title: false
displayed_sidebar: learnSidebar
slug: /learn/vulnerabilities/code-injection
tags:
  - code-injection
---

# Code Injection

An attacker's ultimate goal is often to escalate a vulnerability into something as impactful as possible. The most dangerous outcome is arbitrary code execution, and few vulnerabilities provide as direct a path to it as code injection.

**Code injection** can enable attackers to run their own code, leading to unauthorized access, data leaks, and full system compromise. Allowing untrusted input to reach code execution functions effectively hands control of the system to the attacker.

In this article, we’ll explain what dynamic code evaluation is and why this functionality is sometimes enabled in applications. We’ll then explore common attack techniques, show how these issues can be detected in your own code, and outline practical steps to reduce risk.


## What Is Code Injection?

Code injection is a type of software vulnerability that occurs when untrusted input is treated as code and executed. In other words, the attacker supplies data that the application mistakenly interprets as instructions.

This functionality often exists because developers use features like dynamic evaluation (`eval` or `exec`) to add flexibility to their code. Such features allow applications to evaluate text as code at runtime. While this can solve problems quickly, it also opens a door: if outside input reaches these functions, the application can be tricked into running commands the developer never intended.

Dynamic execution is sometimes used to launch other programs (like opening a file explorer), or to run code in a background, parallel process.

The security risk arises because the interpreter or runtime cannot distinguish between “intended” code and injected code once the input is passed along. At that point, the attacker’s instructions are executed with the same permissions as the application.


## Common Code Injection Attacks

One common form of code injection involves dynamic evaluation of input. Developers sometimes reach for this approach when they want to quickly process user-provided data. 

### Remote Code Execution (RCE)

Even if you didn’t write any code yourself that allows for dynamic evaluation of input, you should be cautious. Many Remote Code Execution (RCE) vulnerabilities surface through the use of third party libraries that do.

For example, imagine a small web application that lets users send in a list of numbers to be added together. A developer might be tempted to pass the raw input directly into a function like `eval` to convert it into a list structure at runtime. For example, imagine a Flask route that looks like this:

```python
from flask import Flask, request

app = Flask(__name__)

@app.route("/sum")
def sum_numbers():
    numbers = request.args.get("numbers")
    numbers_list = eval(numbers)
    total = 0
    for num in numbers_list:
        total += num
    return f"Sum is {total}"
```

An intended request might have the following value for the numbers request parameter:

```
[1,2,3]
```

The `eval` function quickly turns this string into a Python list-object, and the resulting list is easy to work with for the developer.
But since the application uses `eval`, an attacker could instead send a malicious string instead: 

```
__import__('os').system('whoami')
```

The actual command is likely to be more malicious than executing `whoami`, with consequences far beyond just adding numbers.



## Detecting Code Injection in Your Code

Here is what that vulnerable web application might look like in simplified form:

```python
from flask import Flask, request

app = Flask(__name__)

@app.route("/route")
def my_route():
    input_string = request.args.get("string")
    eval(input_string)
```

The vulnerability arises from the data flow: the request parameter, controlled by the user, flows directly into `eval`. Instead of being treated only as data, it is interpreted as code and executed by the runtime.

To spot issues like this, developers can review whether functions such as `eval` or `exec` ever receive input that originated outside the application. This isn’t always easy, as the function calls to these functions may be in third party code. Additionally, evaluating large projects manually is error-prone and time-consuming. Tools like Semgrep make this easier by automatically tracing input from sources such as web requests into functions that interpret or execute code. This allows teams to detect risky flows before they become exploitable vulnerabilities.


## Recommendations and Mitigations

The simplest way to avoid code injection is to never run dynamic code based on user input. If you find yourself reaching for functions that evaluate or execute code at runtime, stop and ask whether there is a safer alternative.

When dynamic evaluation truly cannot be avoided, strict validation becomes essential. This means defining exactly what input is acceptable and rejecting everything else. For example, if only numbers are valid, enforce numeric input only. Avoid strategies such as trying to sanitize or escape input, since these are error-prone and attackers often find ways around them.


## Conclusion

Code injection happens when applications execute untrusted input as code, giving attackers control over what the application runs. We have discussed what code injection is, how common attacks work, how you can detect them, and what practical steps can reduce risk.

As a developer, the key takeaway is simple: do not mix user input with code execution. When this is unavoidable, validate inputs strictly and use safer alternatives whenever possible. Tools like Semgrep can help you detect risky patterns before they lead to real-world problems.

Code injection remains one of the most impactful security issues because it gives attackers a direct path to execute their own instructions. By understanding how these vulnerabilities arise and how to avoid them, you can make deliberate choices about when and how to use dynamic code, and ensure that flexibility never comes at the cost of security.