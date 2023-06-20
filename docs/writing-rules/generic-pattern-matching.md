---
append_help_link: true
description: "Semgrep can match generic patterns in languages that it doesn’t support yet. You can use generic pattern matching for languages that do **not** have a parser, configuration files, or other structured data such as XML."
---

# Generic pattern matching

<!-- If you ever need to replace the examples below, a good way is to look
     into the semgrep-rules repo under "generic" for an existing rule
     that makes sense. -->

## Introduction

Semgrep can match generic patterns in languages that it does **not** yet support. Use generic pattern matching for languages that do not have a parser, configuration files, or other structured data such as XML.

As an example, consider this rule:
```yaml
rules:
  - id: dynamic-proxy-scheme
    pattern: proxy_pass $$SCHEME:// ...;
    paths:
      include:
        - "*.conf"
        - "*.vhost"
        - sites-available/*
        - sites-enabled/*
    languages:
      - generic
    severity: WARNING
    message: >-
      The protocol scheme for this proxy is dynamically determined.
      This can be dangerous if the scheme is injected by an
      attacker because it may forcibly alter the connection scheme.
      Consider hardcoding a scheme for this proxy.
    metadata:
      references:
        - https://github.com/yandex/gixy/blob/master/docs/en/plugins/ssrf.md
      category: security
      technology:
        - nginx
      confidence: MEDIUM
```

The above rule [matches](https://semgrep.dev/playground/r/generic.nginx.security.dynamic-proxy-scheme.dynamic-proxy-scheme) this code snippet:

```
server {
  listen              443 ssl;
  server_name         www.example.com;
  keepalive_timeout   70;

  ssl_certificate     www.example.com.crt;
  ssl_certificate_key www.example.com.key;

  location ~ /proxy/(.*)/(.*)/(.*)$ {
    # ruleid: dynamic-proxy-scheme
    proxy_pass $1://$2/$3;
  }

  location ~* ^/internal-proxy/(?<proxy_proto>https?)/(?<proxy_host>.*?)/(?<proxy_path>.*)$ {
    internal;

    # ruleid: dynamic-proxy-scheme
    proxy_pass $proxy_proto://$proxy_host/$proxy_path ;
    proxy_set_header Host $proxy_host;
}

  location ~ /proxy/(.*)/(.*)/(.*)$ {
    # ok: dynamic-proxy-scheme
    proxy_pass http://$1/$2/$3;
  }

  location ~ /proxy/(.*)/(.*)/(.*)$ {
    # ok: dynamic-proxy-scheme
    proxy_pass https://$1/$2/$3;
  }
}
```

Generic pattern matching has the following properties:

* A document is interpreted as a nested sequence of ASCII words, ASCII punctuation, and other bytes.
* `...` (ellipsis operator) allows skipping non-matching elements, up to 10 lines down the last match.
* `$X` (metavariable) matches any word.
* `$...X` (ellipsis metavariable) matches a sequence of words, up to 10 lines down the last match.
* Indentation determines primary nesting in the document.
* Common ASCII braces `()`, `[]`, and `{}` introduce secondary nesting but only within single lines. Therefore, misinterpreted or mismatched braces don't disturb the structure of the rest of document.
* The document must be at least as indented as the pattern: any indentation specified in the pattern must be honored in the document.

## Caveats and limitations of generic mode

Semgrep can reliably understand the syntax of natively [supported languages](/supported-languages/). The generic mode is useful for unsupported languages, consequently bringing specific limitations.

:::caution
The quality of results in the generic mode can vary depending on the language you use it for.
:::

The generic mode works fine with any human-readable text, as long as it is primarily based on ASCII symbols. Since the generic mode does not understand the syntax of the language you are scanning, the quality of the result may differ from language to language or even depend on specific code. As a consequence, the generic mode works well for some languages, but it does not give consistent results always. Generally, it's possible or even easy to write code in weird ways that prevent generic mode from matching.

**Example**: In XML, one can write `&#x48;&#x65;&#x6C;&#x6C;&#x6F` instead of `Hello`. If a rule pattern in generic mode is `Hello`, Semgrep is unable to match the `&#x48;&#x65;&#x6C;&#x6C;&#x6F`, unlike if it had full XML support.

With respect to Semgrep operators and features:

* metavariable support is limited to capturing a single “word”, which is a token of the form [A-Za-z0-9_]+. They can’t capture sequences of tokens such as hello, world (in this case there are 3 tokens: `hello`, `,`, and `world`).
* the ellipsis operator is supported and spans at most 10 lines
* pattern operators like either/not/inside are supported
* inline regular expressions for strings (`"=~/word.*/"`) is not supported

## Troubleshooting

### Common pitfall #1: not enough `...`

Rule of thumb:
> If the pattern commonly matches many lines, use `... ...` (20 lines), or `... ... ...` (30 lines) etc. to make sure to match all the lines.

Here's an innocuous pattern that should match the call to a function `f()`:
```
f(...)
```
It matches the following code [just fine](https://semgrep.dev/s/9v9R):
```
f(
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9
)
```

But it will [fail](https://semgrep.dev/s/1z6Q) here because the function arguments span more than 10 lines:
```
f(
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10
)
```

The [solution](https://semgrep.dev/s/9v9R) is to use multiple `...` in the pattern:
```
f(... ...)
```

### Common pitfall #2: not enough indentation

Rule of thumb:
> If the target code is always indented, use indentation in the pattern.

In the following example, we want to match the `system` sections containing a `name` field:
```
# match here
[system]
  name = "Debian"

# DON'T match here
[system]
  max_threads = 2
[user]
  name = "Admin Overlord"
```

❌ This pattern will [incorrectly](https://semgrep.dev/s/ry1A) catch the `name` field in the `user` section:
```
[system]
...
name = ...
```

✅ This pattern will catch [only](https://semgrep.dev/s/bXAr) the `name` field in the `system` section:
```
[system]
  ...
  name = ...
```

### Handling line-based input

This section explains how to use Semgrep's generic mode to match
single lines of code using an ellipsis metavariable. Many simple
configuration formats are collections of key and value pairs delimited
by newlines. For example, to extract the `password` value from the
following made-up input:

```
username = bob
password = p@$$w0rd
server = example.com
```

Unfortunately, the following pattern does not match the whole line. In generic mode, metavariables only capture a single word (alphanumeric sequence):

```
password = $PASSWORD
```

This pattern matches the input file but does not assign the value `p` to `$PASSWORD` instead of the full value `p@$$w0rd`.

To match an arbitrary sequence of items and capture their value in the example:

1. Use a named ellipsis, by changing the pattern to the following:

    ```yaml
    password = $...PASSWORD
    ```

    This still leads Semgrep to capture too much information. The value assigned to `$...PASSWORD` are now `p@$$w0rd` and<br />
    `server = example.com`. In generic mode, an ellipsis extends until the end of the current block or up to 10 lines below, whichever comes first. To prevent this behavior, continue with the next step.

2. In the Semgrep rule, specify the following key:

    ```yaml
    generic_ellipsis_max_span: 0
    ```

    This option forces the ellipsis operator to match patterns within a single line.
    Example of the [resulting rule](https://semgrep.dev/playground/r/L1UkAg/returntocorp.password-in-config-file):

    ```yaml
    id: password-in-config-file
    pattern: |
      password = $...PASSWORD
    options:
      # prevent ellipses from matching multiple lines
      generic_ellipsis_max_span: 0
    message: |
      password found in config file: $...PASSWORD
    languages:
      - generic
    severity: WARNING
    ```

### Ignoring comments

By default, the generic mode does **not** know about comments or code
that can be ignored. In the following example, we are
scanning for CSS code that sets the text color to blue. The target code
is the following:

```
color: /* my fave color */ blue;
```

Use the [`options.generic_comment_style`](/writing-rules/rule-syntax/#options)
to ignore C-style comments as it is the case in our example.
Our simple Semgrep rule is:

```yaml
id: css-blue-is-ugly
pattern: |
  color: blue
options:
  # ignore comments of the form /* ... */
  generic_comment_style: c
message: |
  Blue is ugly.
languages:
  - generic
severity: WARNING
```

## Command line example

Sample pattern: `exec(...)`

Sample target file `exec.txt` contains:
```bash
import exec as safe_function
safe_function(user_input)

exec("ls")

exec(some_var)

some_exec(foo)

exec (foo)

exec (
    bar
)

# exec(foo)

print("exec(bar)")
```

Output:
```bash
$ semgrep -l generic -e 'exec(...)` exec.text
7:exec("ls")
--------------------------------------------------------------------------------
11:exec(some_var)
--------------------------------------------------------------------------------
19:exec (foo)
--------------------------------------------------------------------------------
23:exec (
24:128
25:    bar
26:129
27:)
--------------------------------------------------------------------------------
31:# exec(foo)
--------------------------------------------------------------------------------
35:print("exec(bar)")
ran 1 rules on 1 files: 6 findings
```

## Semgrep Registry rules for generic pattern matching
You can peruse [existing generic rules](https://semgrep.dev/r?lang=generic&sev=ERROR,WARNING,INFO&tag=dgryski.semgrep-go,hazanasec.semgrep-rules,ajinabraham.njsscan,best-practice,security,java-spring,go-stdlib,ruby-stdlib,java-stdlib,js-node,nodejsscan,owasp,dlint,react,performance,compatibility,portability,correctness,maintainability,secuirty,mongodb,experimental,caching,robots-denied,missing-noreferrer,missing-noopener) in the Semgrep registry. In general, short patterns on structured data will perform the best.

## Cheat sheet
Some examples of what will and will not match on the `generic` tab of the Semgrep cheat sheet below:

<iframe src="https://semgrep.dev/embed/cheatsheet" scrolling="0" width="100%" height="800"  frameBorder="0"></iframe>
<br />

## Hidden bonus
In the Semgrep code the generic pattern matching implementation is called **spacegrep** because it tokenizes based on whitespace (and because it sounds cool 😎).
