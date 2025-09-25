---
title: Understanding Static Code Scanning Tools (What is SAST?)
description: Learn how to implement SAST with Semgrep to find security vulnerabilities in your code
hide_title: false
displayed_sidebar: learnSidebar
---

A **Static Application Security Testing (SAST)** tool can analyze your code without executing it, scanning for potential security vulnerabilities, bugs, and code quality issues early in the development process. SAST tools examine source code acting as an automated security expert, reviewing each line of code. This doesn’t replace human review but helps accelerate the discovery of vulnerabilities and the confidence in code being ready for release.

Some key features of a good SAST tool:

- The static analysis engine should **support whole program taint analysis** which tracks the flow of tainted data such as untrusted user input and any expressions that operate upon it that may be exploited.
- **Support many programming language and frameworks** used during development, this includes core programming languages, infrastructure as code, and scripts.
- Work and **integrate seamlessly with any existing developer tooling** like IDEs, pre-commit, PR/MR comments, CI/CD pipelines, etc. Finding data should be exportable into common formats such as proprietary JSON, SARIF, or CSV so information can be sent to vulnerability management systems and for viewing metrics/trends over time.
- Support **easy to create customization**, which is crucial to be able to detect vulnerabilities for internally developed libraries and frameworks that out-of-the box solutions would miss.
- When an issue is discovered, **provide detailed remediation** **guidance** **and code auto-fixing** capabilities helps reduce the time to remediate.

We will explore how this works in the next section.

## Source Code Analysis & Taint Tracking

Static analysis tools perform many types of analysis, but a comprehensive taint analysis engine is essential for any SAST solution. Taint analysis is a data-flow analysis technique that tracks untrusted or **tainted data** as it moves through a function or method. This tainted data originates from **sources** such as user input. When tainted data isn't properly checked or sanitized, the analysis reports an issue whenever this data reaches a vulnerable function, known as a **sink**. 

Examples of **sources**:

- HTTP request parameters
- Cookie values
- Database query results
- File uploads

Examples of **vulnerable** **sinks**:

- SQL query execution functions
- Command execution methods like **exec()** or **system()**
- HTML rendering functions
- File Input/Output system operations
- Serialization/deserialization methods

A data flow analysis can help with visualizing the path data takes through the software, from `req.params` (source) to `exec` (sink):

![dataflow example](../assets/sast-dataflow.png)

Just finding the usage of a vulnerable function such as `exec(...)` could uncover issues, but that will produce a significant amount more of false positives than being able to reason through findings which come from actionable locations such as user-controlled input.

## Broad Language Support

Modern development teams don’t use just one language, your SAST solution should be capable of handling all of the modern languages you use daily to write and deploy software. With this in mind, your SAST tool should have support for your existing development practices by integrating into existing tools:

- Cover the common programming languages in your organization usages e.g. C++, Java, JavaScript, Typescript, Golang, etc.
- Frameworks for common languages such as Flask, Django, Express, Spring, Next.js, React, etc. should also be supported.
- Support infrastructure as code languages such as Jsonnet, Terraform, Docker, etc.
- Provide a default-ruleset that covers common vulnerabilities specific to those supported languages.
- Support community driven rules to help increase coverage for a variety of languages that may not be in the default ruleset.

## Incorporating Security Testing Into Your Workflow

To get teams to action on SAST findings they need to be surfaced in the places people will look at them, which is your development environment and workflows.  

Effective SAST implementation requires integration at multiple stages of development. For developers to adopt security scanning, it must fit seamlessly into their workflow.

At the local development stage, SAST tools should provide immediate feedback as code is being written. This helps catch vulnerabilities before they even reach your repository. Later in the pipeline, integrations with your CI/CD systems ensure thorough scanning before deployment.

For a comprehensive guide on how to effectively incorporate security testing throughout your development lifecycle, check out our detailed article on [Incorporating security testing into developer workflows](security-testing-workflow).

## Customization

Being able to write custom rules helps with edge-cases where internal knowledge is needed to be able accurately report if something is a security vulnerability or passes the code smell test. For example:

- Your developers keep seeing the same issue get introduced into a codebase and want to prevent further additions.
- You received a bug bounty report and want to ensure that the issue does not exist in other parts of your product or re-surface in the future.
- Your internally written library exports a method e.g. `evaluateAndRespond` that executes code once called.
- A custom `security.json` file needs to include `"encyrpt": true` for all new entries.
- You want to ban any calls to a library you wrote 10 years ago, and get all code repositories to migrate to a new library.
- You have created a custom HTTP request library that you want to track that as a source if any request parameters enter dangerous sink locations that lead to SQL Injection or SSRF.

Without the ability to customize your SAST tool, it will be treated more like a check-box exercise for regulatory purposes. Instead, a SAST tool should *enable* your developers and security teams to internally detect and reduce risk at scale.

## Fix Guidance

You won’t know how to fix a vulnerability out-right without already understanding the problem it introduces, so detection alone doesn’t always cut it. Your SAST solution should provide:

- Default remediation advice which explains common ways to resolve the problem for the language you are working in.
- The ability to extend the guidance to link to internal documentation, suggest libraries, or provide code examples of how you solve this within your organization.
- Have [auto-fix](https://semgrep.dev/docs/writing-rules/autofix) capabilities that can automatically fix the vulnerability in the susceptible piece of code.
- Integrate with LLMs to provide contextual remediation guidance and code fix suggestions.