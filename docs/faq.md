---
slug: faq
append_help_link: true
hide_table_of_contents: true
displayed_sidebar: aboutSidebar
tags:
  - Support
description: >-
  Frequently asked questions about Semgrep, comparisons to similar tools,
  rule licensing, technical support, and more.
---

import TOCInline from "@theme/TOCInline"

# Frequently asked questions

<TOCInline toc={toc} />

## General

### How are Semgrep and its rules licensed?

#### Semgrep OSS Engine

The [Semgrep Engine](https://github.com/semgrep/semgrep) is open source, licensed under [LGPL 2.1](https://tldrlegal.com/license/gnu-lesser-general-public-license-v2.1-(lgpl-2.1)) - you can use it at work, on private and proprietary code, no problem!

Semgrep offers three paid products:

* [<i class="fas fa-external-link fa-xs"></i> Semgrep Code](https://semgrep.dev/products/semgrep-code), a static application security testing (SAST) tool that can perform taint, cross-file, and cross-function analysis.
* [<i class="fas fa-external-link fa-xs"></i> Semgrep Supply Chain](https://semgrep.dev/products/semgrep-supply-chain/), which performs dependency scanning.
* [<i class="fas fa-external-link fa-xs"></i> Semgrep Secrets](https://semgrep.dev/products/semgrep-secrets/), which can detect and validate leaked secrets in code.

#### Semgrep Registry

The [<i class="fas fa-external-link fa-xs"></i> Semgrep Registry](https://semgrep.dev/explore) contains rules from different contributors.

Semgrep **Community** rules written by the Semgrep team are licensed under the [Commons Clause](https://github.com/semgrep/semgrep-rules/blob/develop/LICENSE). The source for these Registry rules is available at [semgrep/semgrep-rules](https://github.com/semgrep/semgrep-rules/).

Those rules licensed under the Commons Clause license cannot be resold without Semgrep, Inc. (“Semgrep”)’s permission. Since Semgrep offers a paid, hosted application, it’s important to have this restriction so other companies, like major cloud providers, cannot resell Semgrep’s rules as a competing service.

In addition to Semgrep Community rules, [Semgrep Code](https://semgrep.dev/products/semgrep-code) includes **Pro rules** which are proprietary and only available to paying customers.

### Is it OK to run Semgrep or Semgrep, Inc. rules on my work projects?

Yes! Semgrep is safe to run on your private code. The [Semgrep Registry license’s](https://github.com/semgrep/semgrep-rules/blob/develop/LICENSE) commercial restrictions only come into effect if you are **selling** a product using rules provided in the Semgrep Registry. If that’s the case, contact [<i class="fa-regular fa-envelope"></i> partners@semgrep.com](mailto:partners@semgrep.com) for a license.

### I’m a security professional. Do I have to pay for Semgrep?

If you are a security consultant and you want to use Semgrep OSS Engine with the Semgrep Community Rules as part of your assessments, that’s great and you don’t have to pay. Feel free to refer your clients to our [Semgrep](https://semgrep.dev/) product suite.

If your service delivers code scanning, meaning a service that includes static application security testing (SAST), software composition analysis (SCA), or secrets scanning, and you want to charge for scanning that includes rules in the [semgrep-rules repository](https://github.com/semgrep/semgrep-rules), **you must purchase a license**.

If you want to use Semgrep Code, including its proprietary cross-file (interfile) analysis, Semgrep Supply Chain (SCA), or Semgrep Secrets rules as part of your consulting services, you need a license. Please contact us at [<i class="fa-regular fa-envelope"></i> sales@semgrep.com](mailto:sales@semgrep.com).

### Can I ship my own code analysis software that uses Semgrep?

Yes, you can use the Semgrep OSS Engine in your own code analysis software, subject to the terms of the LGPL 2.1 license (among other things, you must open source any modification you make to it). If you are writing your own, original rules for your scanner, there are no further restrictions. But your rules cannot be derived from Semgrep Community Rules or Semgrep Pro Rules (see below).

The Semgrep Community Rules are licensed under the [Commons Clause](https://github.com/semgrep/semgrep-rules/blob/develop/LICENSE). You can use the Semgrep community rules as long as you are shipping a free and open source software (FOSS) product. You have to open source any modifications you have done to the rules.

You **cannot** ship the Semgrep Community or Pro rules in a commercial product without a license from Semgrep, Inc. For more information, please contact [<i class="fa-regular fa-envelope"></i> partners@semgrep.com](mailto:partners@semgrep.com).

### Contacting Semgrep support

All users can contact Semgrep support. Regardless if you are a free tier or paid tier user, reach our support through the [Semgrep Community Slack](https://go.semgrep.dev/slack). Paying Semgrep Team tier customers receive 8\*5 email and Slack support with committed SLAs. See [Support](/support) for more details.

### Embedding the Playground in my website or blog post

Embed a special version of Semgrep Playground with an `iframe`. The source is `https://semgrep.dev/embed/editor?snippet=<snippet-id>` where the `snippet-id` is either the short identifier generated when you share a Playground link (this usually looks like `DzKv`) or the named identifier from a saved rule (this usually looks like `username:rule-name`).

```html
<iframe title="Semgrep example no prints" src="https://semgrep.dev/embed/editor?snippet=KPzL" width="100%" height="432" frameborder="0"></iframe>
```

<!-- vale off -->
### How does Semgrep go "beyond regex"?
<!-- vale on -->

Semgrep is semantic grep for code: it understands the **structure of code** and builds a syntax tree to search for matches. Where `grep "2"` only matches the exact string `2`, Semgrep matches other equivalent forms, such as [`x = 1; y = x + 1`](https://semgrep.dev/playground/s/5rKgj) when searching for `2`. Semgrep's [pattern syntax](/writing-rules/pattern-syntax/) provides specific mechanisms to fine-tune matches, such as the [ellipsis operator](/writing-rules/pattern-syntax#ellipsis-operator) and [metavariables](/writing-rules/pattern-syntax#metavariables).

See the following rule for a more complex example illustrating Semgrep features:

<iframe title="Go dangerous method usage" src="https://semgrep.dev/embed/editor?snippet=go.gorm.security.audit.gorm-dangerous-methods-usage.gorm-dangerous-method-usage" width="100%" height="432" frameborder="0"></iframe>

- It uses [typed metavariables](writing-rules/pattern-syntax/#typed-metavariables) so it can specify the type `http.Request`.
- In the sink, the rule tracks imports down to function usage.
- In the sanitizer, it removes type aware Booleans and a string convert function.
- It leverages regex only to reduce how many patterns to write for finding dangerous functions.

## Comparisons

### How is Semgrep different from $OTHER\_TOOL or $GENERIC\_[SAST](https://en.wikipedia.org/wiki/Static_application_security_testing)?

Semgrep is an open source tool with a simple syntax for writing rules: if you can write code, you can write a Semgrep rule—no program analysis Ph. D. required!

To the Semgrep team's knowledge, the only other tool with the explicit goal of allowing custom rules is GitHub’s proprietary tool, CodeQL. CodeQL has a domain-specific language that is extremely powerful but is designed for those with significant program analysis expertise, whereas Semgrep is designed for the security engineer or developer who wants to automate code review. Our goal is to make writing a Semgrep rule as easy as copying the code you want to find—and letting the Semgrep engine make the rule and autofix high-quality enough to run in CI or your text editor or IDE.

[Semgrep AppSec Platform](https://semgrep.dev/manage) provides a Team tier that is free for up to 10 contributors on private repositories. It offers a hosted CI integration with a quick setup so you can start running Semgrep right away.

Semgrep's diff-awareness lets you scan new code and doesn’t force you to fix all the existing issues when you first start. For users running inside organizations with many repositories, the hosted offering also offers a policy and notification system that makes it easy to tune Semgrep so that it only reports issues or suggests fixes that get applied.

Our goal is a 99% fix rate for what Semgrep reports.

### Besides the ease of writing new rules, what else is different about Semgrep?

#### Speedy and offline: Semgrep runs offline on every keystroke

If you are shipping code daily a code analysis tool that takes a week to run is not helpful. We think modern static analysis tools should run on every keystroke in the editor, without needing network access. Semgrep runs at approximately 20K-100K loc/sec per rule but our goal is to be even faster.

#### Semantic: Semgrep is smart

Semgrep automatically handles the nuance of “there’s more than one way to do it”: you write your query and all equivalent variations of that code are automatically matched.

As Semgrep evolves, queries similar to `foo("password")` become smarter. In the original version of Semgrep, this query would only match the code `foo("password")`. But a few months after release Semgrep would match `const x = "password"; foo(x)`.

Today Semgrep can [do even more with intraprocedural dataflow](https://semgrep.dev/s/50zj) analysis, and we’re working on adding more of these semantic features with every release.

#### Integrated: Semgrep understands Git

It’s easy to write a new Semgrep rule and have it only apply _going forward_. You can [ignore findings](/ignoring-files-folders-code) of course, but we have [<i class="fas fa-external-link fa-xs"></i> built-in support for this with Semgrep AppSec Platform](https://semgrep.dev/manage) and various repository integrations.

#### Portable: If you write a Semgrep rule, it runs anywhere

Many other tools require a buildable environment or can only be run in a VM. Semgrep runs “on the metal” and has minimal dependencies around a statically linked core; our parsers are declaratively generated C libraries (we contribute to and use [tree-sitter](https://tree-sitter.github.io)).

See [the Semgrep philosophy](/contributing/semgrep-philosophy) for further reading.

### Comparing Semgrep to linters

Similar to a linter, Semgrep can be run in your developer's IDE. Semgrep has three IDE extensions:

- [Visual Studio Code (VS Code)](/docs/extensions/semgrep-vs-code)
- [IntelliJ](/docs/extensions/semgrep-intellij)
- [<i class="fas fa-external-link fa-xs"></i> LSP support for Emacs](https://github.com/emacs-lsp/lsp-mode)

Linters use static analysis but typically have a narrower scope for analysis (most rules typically operate on a single line). Some linters also cover stylistic decisions (for example use of tabs versus spaces), but Semgrep doesn’t care about whitespace or formatting.

Semgrep’s [registry](https://semgrep.dev/explore) includes rulesets inspired by the rules of many popular linters and checkers, including ESLint, RuboCop, Bandit, and FindSecBugs. But Semgrep also allows you to enable multiple rulesets at the same time without adding linter-specific artifacts or installation to your code repository.

Some popular linter tools may use tools like Semgrep as an internal engine, and we encourage this! For instance, the popular scanner _NodeJSScan_ was re-written to use Semgrep as the core.

Lastly, while many linters are extensible, you need to learn specific abstract syntax tree (AST) based patterns for writing custom rules. Semgrep works across languages and you learn its syntax once; you don't have to mess with MemberExpressions, node visitors, and all that. Before Semgrep, many of us on the maintainer team were writing AST-based rules as well: [one of us wrote an article comparing writing linter rules to Semgrep expressions](https://semgrep.dev/blog/2020/why-i-moved-to-semgrep-for-all-my-code-analysis/).


### Comparing Semgrep to CodeQL

Both Semgrep and CodeQL use static analysis to find bugs, but there are a few differences:

<!-- vale off -->
- Semgrep operates directly on source code, whereas CodeQL requires a buildable environment.
- Semgrep provides both proprietary and open source options that can be run anywhere; CodeQL is not open source and you must pay to run it on any non-open-source code.
- Semgrep focuses on speed and ease of use. and doesn’t require compiled code.
  - Semgrep OSS engine provides [intraprocedural dataflow](/writing-rules/data-flow/data-flow-overview). Semgrep Code's cross-file and cross-function analysis has similar capabilities as CodeQL in terms of cross-function dataflow analysis for a subset of supported languages.
- Both have publicly available rules.
- Semgrep rules look like the source code you’re writing; CodeQL has a separate domain-specific-language for writing queries.
- Semgrep has an online, hosted free plan for up to ten contributors to private repositories; both have a hosted paid plan.
<!-- vale on -->

See [the Semgrep development philosophy](/contributing/semgrep-philosophy/) for more about what makes Semgrep different.

### Comparing Semgrep to Snyk

#### SAST

Both Semgrep and Snyk offer SAST solutions that are out of the box. Semgrep makes it easier to customize the rules that run against your code. Furthermore, when you know which rules were run, you can analyze your results to see if the relevant vulnerabilities were caught.

In addition to selecting your rules, Semgrep allows you to write custom rules to capture use cases driven by your organization's goals. To help you write rules, Semgrep Editor provides a structure mode to guide you through the process, allows you to test your in-progress rules, and adds them to your organization’s [Policies page](/semgrep-code/policies). Semgrep offers rule-writing capabilities to all users, while Snyk limits it to Enterprise users.

Both Semgrep and Snyk offer remediation advice for findings identified during scans. Snyk displays its recommendations in its UI and CLI, while Semgrep displays remediation advice and guidance in its UI and in the form of PR or MR comments.

Snyk and Semgrep both display prioritization metrics, such as severity level, to help you decide which findings you should work on first. For SAST, Snyk encapsulates this information into a priority score, which provides you with information on the impact and actionability related to the finding. Semgrep, on the other hand, provides recommendations through Assistant, which offers functionality like GPT-4-powered security recommendations to help you review, triage, and remediate your Semgrep findings.

Semgrep offers autofix suggestions for SAST and SCA. Snyk offers autofix capability for its SCA product, but not its SAST product.

#### SCA

Snyk offers reachability analysis for Java, JavaScript, and TypeScript, while Semgrep offers reachability analysis for [multiple languages, including Java, JavaScript, and Ruby](supported-languages/#semgrep-supply-chain)

Snyk offers limited information on whether dependencies are direct or transitive. However, this information is only available with Enterprise plans, and the information is limited to projects using Node.js, specifically npm and Yarn packages, and Maven. Semgrep Supply Chain offers advanced reachability analysis for direct dependencies in the form of dataflow reachability. Semgrep offers this coverage for seven languages and counting.

Semgrep and Snyk both offer license compliance features, ensuring that the dependencies that your developers use meet the requirements set by your organization.

To help you manage your findings, Semgrep provides you with the findings' EPSS probabilities, severity levels, transitivity information, and multiple levels of dataflow reachability. Snyk assesses impact and likelihood and encapsulates this information into a risk score. 

#### Policies and rules management 

Semgrep Code and Semgrep Secret's policies management feature provides extensive flexibility, especially with respect to a developer's workflow, by allowing results to appear:

- Only in the AppSec team’s view (monitor mode)
- In the AppSec team's view **and** in the developer’s workflow, while not failing the CI job (comment mode)
- In the AppSec team's view **and** in the developer’s workflow, while also failing the CI job (block mode)

Semgrep Supply Chain results in a failed CI job only when there are critical or high-severity findings.

#### Secrets detection

Semgrep Secrets leverages semantic analysis, entropy analysis, and validation to accurately detect and fix secrets. Snyk maintains a [business partnership with GitGuardian](https://blog.gitguardian.com/were-teaming-up-with-snyk-to-strengthen-developer-security/) to offer secrets scanning as part of Snyk Code.

> See [Semgrep vs. Snyk](https://semgrep.dev/resources/semgrep-vs-snyk) for a detailed comparison.

### Comparing Semgrep to SonarQube

Both Semgrep and SonarQube use static analysis to find bugs, but there are a few differences:

- Extending Semgrep with custom rules is simple since Semgrep rules look like the source code you’re writing. Writing custom rules with SonarQube is [<i class="fas fa-external-link fa-xs"></i> restricted to a handful of languages](https://docs.sonarqube.org/latest/extend/adding-coding-rules/) and requires familiarity with Java and abstract syntax trees (ASTs).
- Semgrep supports user-defined autofixes; SonarQube does not.
- Semgrep focuses on speed and ease-of-use, making analysis possible at up to 20K-100K loc/sec per rule. SonarQube authors [report approximately 0.4K loc/sec for rulesets in production](https://web.archive.org/web/20221109203440/https://community.sonarsource.com/t/performance-guide-for-large-project-analysis/148/2).
- Semgrep supports scanning only changed files (differential analysis), SonarQube does not.
- Both have publicly available rules
- Semgrep has an online, hosted free plan for up to ten contributors to private repositories; both have a hosted paid plan.

See [the Semgrep development philosophy](/contributing/semgrep-philosophy) for more about what makes Semgrep different

## Privacy and Security

### Where do you store data?

Semgrep, Inc uses Amazon Web Services (US region) for storing customer data.

### How is data secured, including data-at-rest and data-in-transit?

All customer data is located in AWS (US region). Amazon RDS encrypted database instances use industry-standard AES-256 encryption and TLS 1.2 or higher is used for all data-in-transit.

### Is private source code shared with Semgrep, Inc?


By default, Semgrep configurations run fully in your CI pipeline and your source code never leaves your environment. Only metadata related to Semgrep runs (see the following question) are sent to Semgrep's service.

If you choose to enable it, Semgrep Assistant requires code access. See the [Privacy and legal considerations](/semgrep-assistant/overview#privacy-and-legal-considerations) section to understand how your code is stored and retained.

### What data is stored?

[Semgrep](https://github.com/semgrep/semgrep) sends data to Semgrep AppSec Platform in accordance with the [metrics policy](/metrics).

These types of data include **scan data** and **findings data**.

- Scan data includes project name, CI environment, and scan meta-data.
- Findings data are used to provide human-readable content for notifications and integrations, as well as tracking results as new, fixed, or duplicate.

For more information and a detailed description of each data field, refer to [the relevant section in PRIVACY.md](https://github.com/semgrep/semgrep/blob/develop/PRIVACY.md#data-collected-when-explicitly-requested).

### What network requests are made?

Semgrep makes network requests in accordance with the data storage previously mentioned.

[Semgrep](https://github.com/semgrep/semgrep) makes the following network requests:

- When running without `--disable-version-check`, Semgrep makes a network request to check for updates.
- When providing a URL to `--output`, Semgrep performs an HTTP `POST` of the results to the specified URL.
- When providing a registry ID like `p/ci` to `--config`, Semgrep requests the configuration from the [Registry](https://semgrep.dev/explore) and may send metrics in accordance with the [metrics policy](/metrics).

## Configuration

### How do I configure Semgrep for different projects?

Semgrep AppSec Platform provides centralized policy management. See the [Policies documentation](/semgrep-code/policies) for more details.

### What is a policy?

A policy is a simple collection of rules and a definition of what to do with rule results: fail the Semgrep CI run and/or send non-blocking notifications to third-party services like Slack. Please see the [Policies documentation](/semgrep-code/policies) for more details.

## Monitoring

### Do you have a visualization UI?

Semgrep Team users can create custom dashboards and visualizations. Semgrep also supports posting results through [webhooks](/semgrep-appsec-platform/webhooks) to any JSON endpoint, so you can easily integrate it with your favorite visualization tool.
