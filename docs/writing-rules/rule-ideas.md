---
append_help_link: true
slug: rule-ideas
---

# Custom rule examples

Not sure what to write a rule for? Below are some common questions, ideas, and topics to spur your imagination. Happy hacking! 💡

## Use cases

### Automate code review comments

_Time to write this rule: **5 minutes**_

You can use Semgrep and its GitHub integration to [automate PR comments](/semgrep-code/notifications/) that you frequently make in code reviews. Writing a custom rule for the code pattern you want to target is usually straightforward. If you want to understand the Semgrep syntax, see the [documentation](../pattern-syntax/) or try the [tutorial](https://semgrep.dev/learn). 

![A reviewer writes a Semgrep rule and adds it to an organization-wide policy](/img/semgrep-ci.gif)
<br />
A reviewer writes a Semgrep rule and adds it to an organization-wide policy.


### Ban dangerous APIs

_Time to write this rule: **5 minutes**_

Semgrep can detect dangerous APIs in code. If integrated into CI/CD pipelines, you can use Semgrep to block merges or flag for review when someone adds such dangerous APIs to the code. For example, a rule that detects React's `dangerouslySetInnerHTML` looks like this.

<iframe src="https://semgrep.dev/embed/editor?snippet=minusworld:docs-dangerously-set-inner-html" title="Ban dangerous APIs with Semgrep" width="100%" height="432px" frameBorder="0"></iframe>


### Exempting special cases of dangerous APIs

_Time to write this rule: **5 minutes**_

If you have a legitimate use case for a dangerous API, you can exempt a specific use of the API using a `nosemgrep` comment. The rule below checks for React's `dangerouslySetInnerHTML`, but the code is annotated with a `nosemgrep` comment. Semgrep will not detect this line. This allows Semgrep to continuously check for future uses of `dangerouslySetInnerHTML` while allowing for this specific use.

<iframe src="https://semgrep.dev/embed/editor?snippet=minusworld:docs-dangerously-set-inner-html-nosem" title="Exempt special cases of dangerous APIs with Semgrep" width="100%" height="432px" frameBorder="0"></iframe>

### Detect tainted data flowing into a dangerous sink

_Time to write this rule: **5 minutes**_

Semgrep's [dataflow engine with support for taint tracking](/writing-rules/data-flow/data-flow-overview/) can be used to detect when data flows from a user-provided value into a security-sensitive function.

This rule detects when a user of the ExpressJS framework passes user data into the `run()` method of a sandbox. 

<iframe src="https://semgrep.dev/embed/editor?snippet=ievans:simple-taint-dataflow" title="ExpressJS dataflow to sandbox.run" width="100%" height="432px" frameBorder="0"></iframe>


### Detect security violations

_Time to write this rule: **5 minutes**_

Use Semgrep to flag specific uses of APIs too, not just their presence in code. We jokingly call these the "security off" buttons and make extensive use of Semgrep to detect them.

This rule detects when HTML autoescaping is explicitly disabled for a Django template.

<iframe src="https://semgrep.dev/embed/editor?snippet=minusworld:docs-context-autoescape-off" title="Detect security violations in code with Semgrep" width="100%" height="432px" frameBorder="0"></iframe>


### Scan configuration files using JSON, YAML, or Generic pattern matching

_Time to write this rule: **10 minutes**_

Semgrep [natively supports JSON and YAML](../supported-languages.md) and can be used to write rules for configuration files. This rule checks for skipped TLS verification in Kubernetes clusters.

<iframe src="https://semgrep.dev/embed/editor?snippet=minusworld:docs-kubernetes-skip-tls-verify" title="Match configuration files with Semgrep" width="100%" height="432px" frameBorder="0"></iframe>

The [Generic pattern matching](/writing-rules/generic-pattern-matching/) mode is for languages and file formats that Semgrep does not natively support. For example, you can write rules for Dockerfiles using the generic mode. The Dockerfile rule below checks for invalid port numbers.

<iframe src="https://semgrep.dev/embed/editor?snippet=minusworld:docs-dockerfile-invalid-port" title="Match Dockerfiles with Semgrep" width="100%" height="432px" frameBorder="0"></iframe>


### Enforce authentication patterns

_Time to write this rule: **15 minutes**_

If a project has a "correct" way of doing authentication, Semgrep can be used to enforce this so that authentication mishaps do not happen. In the example below, this Flask app requires an authentication decorator on all routes. The rule detects routes that are missing authentication decorators. If deployed in CI/CD pipelines, Semgrep can block undecorated routes or flag a security member for further investigation.

<iframe src="https://semgrep.dev/embed/editor?snippet=minusworld:docs-missing-auth-annotation" title="Enforce authentication patterns in code with Semgrep" width="100%" height="432px" frameBorder="0"></iframe>


### Systematize project-specific coding patterns

_Time to write this rule: **10 minutes**_

Automate institutional knowledge using Semgrep. This has several benefits, including teaching new members about coding patterns in an automatic way and keeping a project up-to-date with coding patterns. If you keep coding guidelines in a document, converting these into Semgrep rules is a great way to free developers from having to remember all the guidelines.

In this example, a legacy API requires calling `verify_transaction(t)` before calling `make_transaction(t)`. The Semgrep rule below detects when these methods are not called correctly.

<iframe src="https://semgrep.dev/embed/editor?snippet=Nr3z" title="Systematize project-specific coding patterns with Semgrep" width="100%" height="432px" frameBorder="0"></iframe>


### Extract information with metavariables

_Time to write this rule: **15 minutes**_

Semgrep metavariables can be used as output in the `message` key. This can be used to extract and collate information about a codebase. Click through to [this example](https://semgrep.dev/s/clintgibler:spring-routes) which extracts Java Spring routes. This can be used to quickly see all the exposed routes of an application.


### Burn down deprecated APIs

_Time to write this rule: **5 minutes**_

Semgrep can detect deprecated APIs just as easily as dangerous APIs. Identifying deprecated API calls can help an application migrate to current or future versions.

This rule example detects a function that is deprecated as of Django 4.0.

<iframe src="https://semgrep.dev/embed/editor?snippet=minusworld:docs-deprecated-api" title="Burn down deprecated APIs with Semgrep" width="100%" height="432px" frameBorder="0"></iframe>


### Promote secure alternatives

_Time to write this rule: **5 minutes**_

Some libraries or APIs have safe alternatives, such as [Google's `re2`](https://github.com/google/re2), an implementation of the standard `re` interface that ships with Python that is resistant to regular expression denial-of-service. This rule detects the use of `re` and recommends `re2` as a safe alternative with the same interface.

<iframe src="https://semgrep.dev/embed/editor?snippet=minusworld:docs-use-re2" title="Promote secure alternatives with Semgrep" width="100%" height="432px" frameBorder="0"></iframe>


## Prompts for writing custom rules

Try answering these questions to uncover important rules for your project.

1. From recent post mortems: what code issues contributed to it?
1. [XYZ] is a (security, performance, other) library that everyone should use, but they don’t consistently.
1. When you review code, what changes do you frequently ask for?
1. What vulnerability classes from bug bounty submissions reoccur (or appear in different places of the codebase)?
1. Are there eng / perf patterns? Consistent exception handlers?
1. What issues were caused by misconfigurations in Infrastructure-as-Code files (JSON)?
1. What are some “invariants” that should hold about your code - things that should always or never be true (e.g. every admin route checks if user is admin)?
1. What methods/APIs are deprecated and you’re trying to move away from?
