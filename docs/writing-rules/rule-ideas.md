# Rule examples

Not sure what to write a rule for? Below are some common questions, ideas, and topics to spur your imagination. Happy hacking! 💡

[TOC]

# Common use cases

Below are common use cases with sample rules to get you thinking.

| Use case                          | Semgrep rule                                                                                                                                                                                                                                                                                                                                           |
| :-------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ban dangerous APIs                | [Prevent use of exec](https://semgrep.dev/s/clintgibler:no-exec)                                                                                                                                                                                                                                                                                         |
| Search routes and authentication   | [Extract Spring routes](https://semgrep.dev/s/clintgibler:spring-routes)                                                                                                                                                                                                                                                                                 |
| Enforce the use secure defaults   | [Securely set Flask cookies](https://semgrep.dev/s/dlukeomalley:flask-set-cookie)                                                                                                                                                                                                                                                                        |
| Enforce project best-practices    | [Use assertEqual for == checks](https://semgrep.dev/s/dlukeomalley:use-assertEqual-for-equality), [Always check subprocess calls](https://semgrep.dev/s/dlukeomalley:unchecked-subprocess-call)                                                                                                                                                            |
| Codify project-specific knowledge | [Verify transactions before making them](https://semgrep.dev/s/dlukeomalley:verify-before-make)                                                                                                                                                                                                                                                          |
| Audit security hotspots           | [Finding XSS in Apache Airflow](https://semgrep.dev/s/ievans:airflow-xss), [Hardcoded credentials](https://semgrep.dev/s/dlukeomalley:hardcoded-credentials)                                                                                                                                                                                               |
| Audit configuration files         | [Find S3 ARN uses](https://semgrep.dev/s/dlukeomalley:s3-arn-use)                                                                                                                                                                                                                                                                                        |
| Migrate from deprecated APIs      | [DES is deprecated](https://semgrep.dev/editor?registry=java.lang.security.audit.crypto.des-is-deprecated), [Deprecated Flask APIs](https://semgrep.dev/editor?registry=python.flask.maintainability.deprecated.deprecated-apis), [Deprecated Bokeh APIs](https://semgrep.dev/editor?registry=python.bokeh.maintainability.deprecated.deprecated_apis) |
| Apply automatic fixes             | [Use listenAndServeTLS](https://semgrep.dev/s/clintgibler:use-listenAndServeTLS)   
| Ban importing some packages       | [Ban imports matching a regex](https://semgrep.dev/s/ievans:regex-on-importedmodules)

# Rule prompts

Try answering these questions to uncover important rules for your project.

1. From recent post mortems: what code issues contributed to it?
1. [XYZ] is a (security, performance, other) library that everyone should use, but they don’t consistently.
1. When you review code, what changes do you frequently ask for?
1. What vulnerability classes from bug bounty submissions reoccur (or appear in different places of the codebase)?
1. Are there eng / perf patterns? Consistent exception handlers?
1. What issues were caused by misconfigurations in Infrastructure-as-Code files (JSON)?
1. What are some “invariants” that should hold about your code - things that should always or never be true (e.g. every admin route checks if user is admin)?
1. What methods/APIs are deprecated and you’re trying to move away from?

                                                                                                                                                                                                                                                 
