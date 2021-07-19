---
append_help_link: true
---

# Generic pattern matching
## Introduction
Semgrep can match matches generic patterns in languages that it doesn’t yet support. You can use generic pattern matching for languages that don’t yet have a parser, configuration files, and other structured data, such as HTML or XML. Generic pattern matching is experimental.

As an example, consider this rule:
```yaml
rules:
- id: terraform-all-origins-allowed
  patterns:
  - pattern-inside: cors_rule { ... }
  - pattern: allowed_origins = ["*"]
  languages:
  - generic
  severity: WARNING
  message: CORS rule on bucket permits any origin
```

The above rule matches this code snippet:

```bash
resource "aws_s3_bucket" "b" {
  bucket = "s3-website-test-open.hashicorp.com"
  acl    = "private"

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["PUT", "POST"]
    allowed_origins = ["*"]  # <--- Matches here
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }
}
```

Generic pattern matching has the following properties:

* A document is interpreted as a nested sequence of ASCII words, ASCII punctuation, and other bytes.
* `...` allows skipping non-matching elements, up to 10 lines down the last match.
* `$X` (metavariable) matches any word.
* Indentation determines primary nesting in the document.
* Common ASCII braces `()`, `[]`, and `{}` introduce secondary nesting but only within single lines. Therefore, misinterpreted or mismatched braces don't disturb the structure of the rest of document.
* The document must be at least as indented as the pattern: any indentation specified in the pattern must be honored in the document.

## Caveats and limitations

Spacegrep should work fine with any human-readable text, as long as it’s primarily based on ASCII symbols. In practice, it might work great with some languages and less well with others. In general, it’s possible or even easy to write code in weird ways that will prevent Spacegrep from matching. Note it’s not good for detecting malicious code. For example, in HTML one can write `&#x48;&#x65;&#x6C;&#x6C;&#x6F`; instead of `Hello` and this is not something Spacegrep would match if the pattern is `Hello`, unlike if it had full HTML support.

With respect to Semgrep operators and features:

* metavariable support is limited to capturing a single “word”, which is a token of the form [A-Za-z0-9_]+. They can’t capture sequences of tokens such as hello, world (in this case there are 3 tokens: `hello`, `,`, and `world`).
* the ellipsis operator is supported and spans at most 10 lines
* pattern operators like either/not/inside are supported
* inline regular expressions for strings (`"=~/word.*/"`) is not supported 

## Command line example

Sample pattern `exec.pat` contains: `exec(...)`

Sample document `exec.doc` contains:

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
$ spacegrep -p exec.pat -d exec.doc
exec("ls")
exec(some_var)
exec (foo)
exec (
    bar
)
# exec(foo)
print("exec(bar)")
```

## Semgrep Registry rules for generic pattern matching
You can peruse [existing generic rules](https://semgrep.dev/r?lang=generic&sev=ERROR,WARNING,INFO&tag=dgryski.semgrep-go,hazanasec.semgrep-rules,ajinabraham.njsscan,best-practice,security,java-spring,go-stdlib,ruby-stdlib,java-stdlib,js-node,nodejsscan,owasp,dlint,react,performance,compatibility,portability,correctness,maintainability,secuirty,mongodb,experimental,caching,robots-denied,missing-noreferrer,missing-noopener) in the Semgrep registry. In general, short patterns on structured data will perform the best.

## Cheat sheet
Some examples of what will and will not match on the `generic` tab of the Semgrep cheat sheet below:

<iframe src="https://semgrep.dev/embed/cheatsheet" scrolling="0" width="100%" height="800"  frameBorder="0"></iframe>
<br />

## Hidden bonus
In the Semgrep code the generic pattern matching implementation is called **spacegrep** because it tokenizes based on whitespace (and because it sounds cool 😎).
