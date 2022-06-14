---
slug: faq
append_help_link: true
hide_table_of_contents: true
description: >-
  Frequently asked questions about Semgrep, comparisons to similar tools,
  rule licensing, technical support, and more.
---

import MoreHelp from "/src/components/MoreHelp"
import TOCInline from "@theme/TOCInline"


# Frequently Asked Questions

<TOCInline toc={toc} />

## General

### How are Semgrep and its rules licensed?

The [Semgrep command line tool](https://github.com/returntocorp/semgrep) is open-source, licensed under [LGPL 2.1](https://tldrlegal.com/license/gnu-lesser-general-public-license-v2.1-(lgpl-2.1)) — you can use it at work, on private and proprietary code, no problem!

The [Semgrep Registry](https://semgrep.dev/explore) contains rules from different contributors. Most rules, including all community-contributed rules, are under [MIT license](https://tldrlegal.com/license/mit-license). Some of the Registry rules written by r2c are licensed under the [Semgrep Registry license](../licensing/#semgrep-registry-license).

The source for many r2c-written Registry rules is available at [returntocorp/semgrep-rules](https://github.com/returntocorp/semgrep-rules/). Those licensed under the Semgrep Registry license can’t be resold without r2c’s permission. Since r2c offers a paid, hosted application (Semgrep App), it’s important to have this restriction so other companies, like major cloud providers, can’t just resell our rules as a competing service.

### Is it ok to run Semgrep or the r2c rules on my work projects?

Yes! Semgrep is safe to run on your private code. The [Semgrep Registry license’s](../licensing/#semgrep-registry-license) commercial restrictions only come into effect if you are _selling_ the rules provided in the semgrep-rules repository. If that’s the case, you’ll need to talk with r2c first to get permission.

### I’m a security professional and want to use the semgrep-rules project with my clients as part of my paid services. Is that ok?

If you have a typical consulting service and running `semgrep` or `semgrep-rules` is part of your assessments, that’s great and of course feel free to refer your clients to the [Semgrep App](https://semgrep.dev/). But if your entire service is about scanning code and you want to charge for running the `semgrep-rules` repository that r2c and the community created and maintains, you need to discuss this with r2c.

### What is your support policy?

Help is available for all users, free or otherwise, through the [r2c Community Slack](https://r2c.dev/slack). Semgrep Team tier customers receive 8\*5 email/phone/Slack support with committed SLAs. See [Support](../support/) for more details.

### Can I embed the Playground in my website or blog post?

Yes! You can embed a special version of Semgrep Playground with an `iframe`. The source is `https://semgrep.dev/embed/editor?snippet=<snippet-id>` where the `snippet-id` is either the short identifier generated when you share a Playground link (this usually looks like `DzKv`) or the named identifier from a saved rule (this usually looks like `username:rule-name`).

```html
<iframe title="Semgrep example no prints" src="https://semgrep.dev/embed/editor?snippet=DzKv" width="100%" height="432" frameborder="0"></iframe>


<iframe title="Semgrep example no prints" src="https://semgrep.dev/embed/editor?snippet=ievans:print-to-logger" width="100%" height="432" frameborder="0"></iframe>
```

## Comparisons

### How is Semgrep different than $OTHER\_TOOL or $GENERIC\_[SAST](https://en.wikipedia.org/wiki/Static_application_security_testing)?

Semgrep is an open-source tool with a simple syntax for writing rules: if you can write code, you can write a Semgrep rule — no program analysis PhD required!

To our knowledge, the only other tool with the explicit goal of allowing custom rules is GitHub’s proprietary tool, CodeQL. CodeQL has a domain-specific language which is extremely powerful but is designed for those with significant program analysis expertise, whereas Semgrep is designed for the security engineer or developer who wants to automate code review. Our goal is to make writing a Semgrep rule as easy as copying the code you want to find—and letting the Semgrep engine to make the rule and autofix high-quality enough to run in CI or your text editor or IDE.

Our hosted offering, [Semgrep App](https://semgrep.dev/manage), has a generous free tier (even for private repos!). It offers a hosted CI integration with one-click setup so you can start running Semgrep right away. Its diff-awareness lets you scan new code and doesn’t force you to fix all the existing issues when you first start out. For users running inside orgs with lots of repos, the hosted offering also offers a policy and notification system that makes it easy to tune Semgrep so that it only reports issues or suggest fixes that actually get applied. Our goal is a 99% fix rate for what Semgrep reports.

### Besides open-source and ease of writing new rules, what else is different about Semgrep?

**1. Speedy & offline: Semgrep runs offline on every keystroke**

If you are shipping code daily a code analysis tool that takes a week to run is not helpful. We think modern static analysis tools should run on every keystroke in the editor, without needing network access. Semgrep runs at approximately 20K-100K loc/sec per rule but our goal is to be even faster.

**2. Semantic: Semgrep is smart**

Semgrep automatically handles the nuance of “there’s more than one way to do it”: you write your query and all equivalent variations of that code should be automatically matched.

As Semgrep evolves, a query like `foo("password")` becomes smarter. In the original version of Semgrep, this query would only match the code `foo("password")`. But a few months after release it would match `const x = "password"; foo(x).` Today Semgrep can [do even more with intraprocedural dataflow](https://semgrep.dev/s/ievans:c-dataflow) analysis, and we’re working on adding more of these semantic features with every release.

**3. Integrated: Semgrep understands git and other version-control systems**

It’s easy to write a new Semgrep rule and have it only apply _going forward_. You can [ignore findings](../ignoring-files-folders-code) of course, but we have [built-in support for this with Semgrep CI](/semgrep-ci/overview/) and GitHub/GitLab/etc. integrations.

**4. Portable: If you write a Semgrep rule, it runs anywhere**

Many other tools require a buildable environment or can only be run in a VM. Semgrep runs “on the metal” and has minimal dependencies around a statically linked core; our parsers are declaratively-generated C libraries (we contribute to and use [tree-sitter](https://tree-sitter.github.io/)).

And many more: see [the Semgrep philosophy](../contributing/semgrep-philosophy/) for further reading.

### How is Semgrep different than linters?

Linters use static analysis but typically have a narrower scope for analysis (most rules typically operate on a single line). Some linters also cover stylistic decisions — tabs vs. spaces, for instance — but Semgrep doesn’t care about whitespace or formatting.

Semgrep’s [registry](https://semgrep.dev/explore) has rulesets inspired by the rules of many popular linters and checkers, including ESLint, RuboCop, Bandit, and FindSecBugs. But Semgrep also allows you to enable multiple rulesets at the same time without adding linter-specific artifacts or installation to your code repository.

Some popular linter tools may use tools like Semgrep as an internal engine, and we encourage this! For instance, the popular scanner _NodeJSScan_ was re-written to use Semgrep as the core.

Lastly, while many linters are extensible, you need to learn specific abstract syntax tree (AST) based patterns for writing custom rules. Semgrep works across languages and you learn its syntax once; you don't have to mess with MemberExpressions, node visitors, and all that. Before Semgrep, many of us on the maintainer team were writing AST-based rules as well: [one of us wrote an article comparing writing linter rules to Semgrep expressions](https://r2c.dev/blog/2020/why-i-moved-to-semgrep-for-all-my-code-analysis/).

### How is Semgrep different from CodeQL?

Both Semgrep and CodeQL use static analysis to find bugs, but there are a few differences:

- Semgrep operates directly on source code, whereas CodeQL requires a buildable environment
- Semgrep is LGPL-2.1 and free to run anywhere; CodeQL is not open source and you must pay to run it on any non-open-source code
- Semgrep supports autofixes; CodeQL does not.
- Semgrep focuses on speed and ease of use. Because it doesn’t require a buildable environment, it doesn’t have some of the analysis features like interprocedural dataflow analysis that CodeQL does. (Semgrep does have [limited intraproceedural dataflow](/writing-rules/data-flow/overview/))
- Both have publicly available rules
- Semgrep rules look like the source code you’re writing; CodeQL has a separate domain-specific-language for writing queries.
- Semgrep has an online, hosted free plan; both have a hosted paid plan

See [the Semgrep development philosophy](../contributing/semgrep-philosophy/) for more about what makes Semgrep different.

### How is Semgrep different than SonarQube?

Both Semgrep and SonarQube use static analysis to find bugs, but there are a few differences:

- Extending Semgrep with custom rules is simple, since Semgrep rules look like the source code you’re writing. Writing custom rules with SonarQube is [restricted to a handful of languages](https://docs.sonarqube.org/latest/extend/adding-coding-rules/) and requires familiarity with Java and abstract syntax trees (ASTs).
- Semgrep is LGPL-2.1, SonarQube offers an open-source version but it is missing features. For example, 12 of the supported languages are not available in the open-source offering, and more powerful dataflow features are only available in the paid versions.
- Semgrep supports user-defined autofixes; SonarQube does not.
- Semgrep focuses on speed and ease-of-use, making analysis possible at up to 20K-100K loc/sec per rule. SonarQube authors [report approximately 0.4K loc/sec for rulesets in production](https://web.archive.org/web/20210127020636/https://community.sonarsource.com/t/performance-guide-for-large-project-analysis/148/2).
- Semgrep CI supports scanning only changed files (differential analysis), SonarQube does not
- Both have publicly available rules
- Semgrep has an online, hosted free plan; both have a hosted paid plan

See [the Semgrep development philosophy](../contributing/semgrep-philosophy/) for more about what makes Semgrep different.

## Privacy and Security

### Where do you store data?

r2c uses Amazon Web Services (US region) for storing customer data.

### How is data secured, including data-at-rest and data-in-transit?

All customer data is located in AWS (US region). Amazon RDS encrypted DB instances use industry standard AES-256 encryption and TLS 1.2 or higher is used for all data-in-transit.

### Is private source code shared with r2c?

No. Semgrep CI runs fully in your CI pipeline and your source-code never leaves your environment. Only meta-data related to Semgrep runs (see below) are sent to Semgrep's service.

### What data is stored?

[Semgrep](https://github.com/returntocorp/semgrep) may send data to Semgrep App in accordance with the [metrics policy](/metrics).

Configure Semgrep CI to explicitly send two types of data to Semgrep App. These types of data are scan data and findings data.

- Scan data includes project name, CI environment, and scan meta-data.
- Findings data are used to provide human-readable content for notifications and integrations, as well tracking results as new, fixed, or duplicate.

For more information and a detailed description of each data field, refer to [the relevant section in PRIVACY.md](https://github.com/returntocorp/semgrep/blob/develop/PRIVACY.md#data-collected-when-explicitly-requested).

### What network requests are made?

Semgrep CI makes network requests in accordance with the data storage mentioned above.

[Semgrep](https://github.com/returntocorp/semgrep) makes the following network requests:

- When running without `--disable-version-check`, Semgrep makes a network request to check for updates.
- When providing a URL to `--output`, Semgrep performs an HTTP `POST` of the results to the specified URL.
- When providing a registry ID like `p/ci` to `--config`, Semgrep requests the configuration from the [Registry](https://semgrep.dev/explore) and may send metrics in accordance with the [metrics policy](/metrics).

## Configuration

### How do I configure Semgrep for different projects?

Semgrep App provides centralized policy management. See the [Rule Board](../semgrep-app/rule-board/) for more details.

### What is a policy?

A policy is a simple collection of rules and a definition of what to do with rule results: fail the Semgrep CI run and/or send non-blocking notifications to third-party services like Slack. Please see the [Rule Board](../semgrep-app/rule-board/) for more details.

## Monitoring

### Do you have a visualization UI?

Dashboarding is available for Semgrep Team users. Semgrep also supports posting results via web hooks to any JSON endpoint, so you can easily integrate it with your favorite visualization tool.

<MoreHelp />
