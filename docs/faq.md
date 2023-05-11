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

# Frequently asked questions

<TOCInline toc={toc} />

## General

### How are Semgrep and its rules licensed?

#### Semgrep OSS Engine

The [Semgrep Engine](https://github.com/returntocorp/semgrep) is open-source, licensed under [LGPL 2.1](https://tldrlegal.com/license/gnu-lesser-general-public-license-v2.1-(lgpl-2.1)) - you can use it at work, on private and proprietary code, no problem!

The Semgrep team provides two paid products:

* [Semgrep Code](https://semgrep.dev/products/semgrep-code), which includes the [Pro Engine, a proprietary engine extension enabling advanced analysis](https://semgrep.dev/products/pro-engine).
* Semgrep Supply Chain, which performs dependency scanning.

#### Semgrep Registry

The [Semgrep Registry](https://semgrep.dev/explore) contains rules from different contributors. Semgrep Registry rules written by the Semgrep team are licensed under the [Commons Clause](https://github.com/returntocorp/semgrep-rules/blob/develop/LICENSE). The source for these Registry rules is available at [returntocorp/semgrep-rules](https://github.com/returntocorp/semgrep-rules/). Those rules licensed under the Commons Clause license cannot be resold without Semgrep, Inc. (“Semgrep”)’s permission. Since Semgrep offers a paid, hosted application, it’s important to have this restriction so other companies, like major cloud providers, cannot resell Semgrep’s rules as a competing service.

[Semgrep Code](https://semgrep.dev/products/semgrep-code)’s Team tier includes Pro rules which are proprietary and only available to paying customers.

### Is it ok to run Semgrep or the Semgrep rules on my work projects?

Yes! Semgrep is safe to run on your private code. The [Semgrep Registry license’s](https://github.com/returntocorp/semgrep-rules/blob/develop/LICENSE) commercial restrictions only come into effect if you are *selling* a product using rules provided in the Semgrep Registry. If that’s the case, contact **partners@semgrep.com** for a license.

### I’m a security professional. Do I have to pay for Semgrep?

If you are a security consultant and you want to use Semgrep OSS Engine with the Semgrep Community Rules as part of your assessments, that’s great and you don’t have to pay. Of course feel free to refer your clients to our [Semgrep](https://semgrep.dev/) product suite.

If your service delivers code scanning (meaning a service that includes static application security testing (SAST) or software composition analysis (SCA)) and you want to charge for scanning that includes rules in the [semgrep-rules repository](https://github.com/returntocorp/semgrep-rules), you need an explicit license. For more information, please contact partners@semgrep.com.

If you want to use Semgrep Code (including its proprietary interfile analysis, the Pro Engine), Semgrep Supply Chain (SCA), or Semgrep Pro rules as part of your consulting services, you need a license. Please contact us at sales@semgrep.com.

### Can I ship my own code analysis software that uses Semgrep?

Yes, you can use the Semgrep OSS Engine in your own code analysis software, subject to the terms of the LGPL 2.1 license (among other things, you must open source any modification you make to it). If you are writing your own, original rules for your scanner, there are no further restrictions. But your rules cannot be derived from Semgrep Community Rules or Semgrep Pro Rules (see below).

The Semgrep Community Rules are licensed under the [Commons Clause](https://github.com/returntocorp/semgrep-rules/blob/develop/LICENSE). You can use the Semgrep community rules as long as you are shipping a free and open-source software (FOSS) product. You have to open source any modifications you have done to the rules.

You **cannot** ship the Semgrep Community rules in a commercial product without an explicit license from Semgrep, Inc. For more information, please contact partners@semgrep.com.

The Semgrep Pro Rules are proprietary and cannot be redistributed without explicit license from Semgrep, Inc. For more information, please contact partners@semgrep.com.

### Contacting Semgrep support 

All users can contact Semgrep support. Regardless if you are free tier or paid tier user, reach our support through the [Semgrep Community Slack](https://semgrep.slack.com/). Semgrep Team tier customers receive 8\*5 email/phone/Slack support with committed SLAs. See [Support](../support/) for more details.

### Embedding the Playground in my website or blog post

Embed a special version of Semgrep Playground with an `iframe`. The source is `https://semgrep.dev/embed/editor?snippet=<snippet-id>` where the `snippet-id` is either the short identifier generated when you share a Playground link (this usually looks like `DzKv`) or the named identifier from a saved rule (this usually looks like `username:rule-name`).

```html
<iframe title="Semgrep example no prints" src="https://semgrep.dev/embed/editor?snippet=DzKv" width="100%" height="432" frameborder="0"></iframe>


<iframe title="Semgrep example no prints" src="https://semgrep.dev/embed/editor?snippet=ievans:print-to-logger" width="100%" height="432" frameborder="0"></iframe>
```

## Usage limits

This section describes usage limits.

:::caution important dates
* The Semgrep Community tier will be replaced with Team tier on May 23, 2023.
* All users with any number of contributors are able to access Semgrep Supply Chain, Semgrep Pro Rules, and other paid offerings for free as of this update (May 15, 2023).
* A grace period for all users with any number of contributors is ongoing from now until July 31, 2023.
:::

### What is changing about Semgrep tiers?

We are sunsetting the Community tier and offering our Team tier for free to all users, subject to a usage limit of 10 contributors scanning on private repositories. A contributor is someone who has contributed code to a private repository being scanned by Semgrep.

You can now access the Team tier features of Semgrep Supply Chain, Semgrep Code, and Semgrep Cloud Platform features such as SSO. Our highest level of support will still be available through the Enterprise tier. This updated Enterprise tier includes such features as single-tenancy and a secure network tunnel, ideal for organizations with increased infrastructure, reporting, and other custom requirements.

If the number of contributors has exceeded the usage limit, you will need to purchase licensing for the 11th contributor onward. 

### What is the usage limit?

The usage limit is 10 contributors. A contributor is someone who has made at least one commit to a scanned private repository within the last 30 days.

### How are contributors calculated?

Contributors are calculated using `git log` over the past 30 days.

### What happens when the usage limit is exceeded?

Semgrep scans stop when the usage limit is exceeded. You can resume scanning through the following:

* A one-time 30-day free trial (automatically triggered when the usage limit is exceeded for the first time)
* By purchasing additional licenses
* By waiting for the next billing cycle

### What happens when the combined limit (usage limit + purchased licenses) is exceeded?

For organizations with monthly credit card billing, the additional licenses will be automatically charged. For organizations with annual contracts, scans will continue uninterrupted, and usage will be discussed during quarterly true-up conversations. True-ups account for any contributors added or removed during the contract term.

### What if the first scan exceeds the contributor usage limit?

Semgrep will complete the first scan and a one-time 30-day free trial will automatically start. After the trial concludes, if scans are run on private repositories that exceed the usage limit, scans will not run until additional licenses are purchased.

### How is the cost calculated for the Team tier?

The 11th contributor and onwards are charged. A 20-member engineering team would pay $7,200 per year for both products at the discounted bundled rate.

For example:

| Product  | List price | Months | Quantity | Subtotal | Discount | Total price |
| -------  | ------ | ------- | ----- | ------ | ---- | ----- |
| Semgrep Supply Chain (bundle)  | $30 | 12 | 20 | $7,200 | 10 licenses ($3,600) | $3600 |
| Code (bundle)  | $30 | 12 | 20 | $7,200 | 10 licenses ($3,600) | $3600 |
| Total (bundle) |    | | | | | $7200 |

### Can a single product be purchased?
Yes, you can buy a single product. Products can also be disabled from the Settings page.

### Can I purchase a different number of licenses per product?

If you are purchasing licenses for both products, you can't purchase a different number of licenses per product because the products are bundled together. Both Semgrep Supply Chain and Semgrep Code will run on every scan unless disabled (for all projects) from the settings page.

### Do public projects have the same contribution limits?

No, public projects have no limits on contributors.

### Is the command `semgrep scan` subject to the usage limit?

Yes, but only if the scan is by a logged-in/authenticated contributor or user. Semgrep computes contributor counts for any logged-in scan command (for example, `semgrep ci`, `semgrep scan`, etc.) when the Pro Engine, Supply Chain, or Pro rules are used.

## Comparisons

### How is Semgrep different from $OTHER\_TOOL or $GENERIC\_[SAST](https://en.wikipedia.org/wiki/Static_application_security_testing)?

Semgrep is an open-source tool with a simple syntax for writing rules: if you can write code, you can write a Semgrep rule — no program analysis Ph. D. required!

To our knowledge, the only other tool with the explicit goal of allowing custom rules is GitHub’s proprietary tool, CodeQL. CodeQL has a domain-specific language that is extremely powerful but is designed for those with significant program analysis expertise, whereas Semgrep is designed for the security engineer or developer who wants to automate code review. Our goal is to make writing a Semgrep rule as easy as copying the code you want to find—and letting the Semgrep engine make the rule and autofix high-quality enough to run in CI or your text editor or IDE.

Our hosted offering, [Semgrep Cloud Platform](https://semgrep.dev/manage), has a generous free tier (even for private repositories!). It offers a hosted CI integration with a quick setup so you can start running Semgrep right away. Semgrep's diff-awareness lets you scan new code and doesn’t force you to fix all the existing issues when you first start. For users running inside organizations with many repositories, the hosted offering also offers a policy and notification system that makes it easy to tune Semgrep so that it only reports issues or suggests fixes that get applied. Our goal is a 99% fix rate for what Semgrep reports.

### Besides open-source and ease of writing new rules, what else is different about Semgrep?

**1. Speedy & offline: Semgrep runs offline on every keystroke**

If you are shipping code daily a code analysis tool that takes a week to run is not helpful. We think modern static analysis tools should run on every keystroke in the editor, without needing network access. Semgrep runs at approximately 20K-100K loc/sec per rule but our goal is to be even faster.

**2. Semantic: Semgrep is smart**

Semgrep automatically handles the nuance of “there’s more than one way to do it”: you write your query and all equivalent variations of that code are automatically matched.

As Semgrep evolves, queries similar to `foo("password")` become smarter. In the original version of Semgrep, this query would only match the code `foo("password")`. But a few months after release Semgrep would match `const x = "password"; foo(x)`. Today Semgrep can [do even more with intraprocedural dataflow](https://semgrep.dev/s/ievans:c-dataflow) analysis, and we’re working on adding more of these semantic features with every release.

**3. Integrated: Semgrep understands git and other version-control systems**

It’s easy to write a new Semgrep rule and have it only apply _going forward_. You can [ignore findings](../ignoring-files-folders-code) of course, but we have [built-in support for this with Semgrep CI](/semgrep-ci/overview/) and GitHub/GitLab/etc. integrations.

**4. Portable: If you write a Semgrep rule, it runs anywhere**

Many other tools require a buildable environment or can only be run in a VM. Semgrep runs “on the metal” and has minimal dependencies around a statically linked core; our parsers are declaratively generated C libraries (we contribute to and use [tree-sitter](https://tree-sitter.github.io/)).

And many more: see [the Semgrep philosophy](../contributing/semgrep-philosophy/) for further reading.

### Comparing Semgrep to linters

Linters use static analysis but typically have a narrower scope for analysis (most rules typically operate on a single line). Some linters also cover stylistic decisions (for example use of tabs versus spaces), but Semgrep doesn’t care about whitespace or formatting.

Semgrep’s [registry](https://semgrep.dev/explore) includes rulesets inspired by the rules of many popular linters and checkers, including ESLint, RuboCop, Bandit, and FindSecBugs. But Semgrep also allows you to enable multiple rulesets at the same time without adding linter-specific artifacts or installation to your code repository.

Some popular linter tools may use tools like Semgrep as an internal engine, and we encourage this! For instance, the popular scanner _NodeJSScan_ was re-written to use Semgrep as the core.

Lastly, while many linters are extensible, you need to learn specific abstract syntax tree (AST) based patterns for writing custom rules. Semgrep works across languages and you learn its syntax once; you don't have to mess with MemberExpressions, node visitors, and all that. Before Semgrep, many of us on the maintainer team were writing AST-based rules as well: [one of us wrote an article comparing writing linter rules to Semgrep expressions](https://semgrep.dev/blog/2020/why-i-moved-to-semgrep-for-all-my-code-analysis/).

### Comparing Semgrep to CodeQL

Both Semgrep and CodeQL use static analysis to find bugs, but there are a few differences:

- Semgrep operates directly on source code, whereas CodeQL requires a buildable environment
- Semgrep is LGPL-2.1 and free to run anywhere; CodeQL is not open source and you must pay to run it on any non-open-source code
- Semgrep supports autofixes; CodeQL does not.
- Semgrep focuses on speed and ease of use. Semgrep doesn’t require compiled code, it doesn’t yet provide some of the analysis features of CodeQL. Semgrep has [limited intraprocedural dataflow](/writing-rules/data-flow/data-flow-overview/) and the proprietary [DeepSemgrep, now part of the Pro Engine](/semgrep-code/semgrep-pro-engine-intro) extension to Semgrep provides similar capabilities as CodeQL in terms of interprocedural dataflow analysis for a subset of supported languages.
- Both have publicly available rules
- Semgrep rules look like the source code you’re writing; CodeQL has a separate domain-specific-language for writing queries.
- Semgrep has an online, hosted free plan; both have a hosted paid plan

See [the Semgrep development philosophy](../contributing/semgrep-philosophy/) for more about what makes Semgrep different.

### Comparing Semgrep to SonarQube

Both Semgrep and SonarQube use static analysis to find bugs, but there are a few differences:

- Extending Semgrep with custom rules is simple since Semgrep rules look like the source code you’re writing. Writing custom rules with SonarQube is [restricted to a handful of languages](https://docs.sonarqube.org/latest/extend/adding-coding-rules/) and requires familiarity with Java and abstract syntax trees (ASTs).
- Semgrep is LGPL-2.1, SonarQube offers an open-source version but it is missing features. For example, 12 of the supported languages are not available in the open-source offering, and more powerful dataflow features are only available in the paid versions.
- Semgrep supports user-defined autofixes; SonarQube does not.
- Semgrep focuses on speed and ease-of-use, making analysis possible at up to 20K-100K loc/sec per rule. SonarQube authors [report approximately 0.4K loc/sec for rulesets in production](https://web.archive.org/web/20210127020636/https://community.sonarsource.com/t/performance-guide-for-large-project-analysis/148/2).
- Semgrep CI supports scanning only changed files (differential analysis), SonarQube does not
- Both have publicly available rules
- Semgrep has an online, hosted free plan; both have a hosted paid plan

See [the Semgrep development philosophy](../contributing/semgrep-philosophy/) for more about what makes Semgrep different.

## Privacy and Security

### Where do you store data?

Semgrep uses Amazon Web Services (US region) for storing customer data.

### How is data secured, including data-at-rest and data-in-transit?

All customer data is located in AWS (US region). Amazon RDS encrypted database instances use industry-standard AES-256 encryption and TLS 1.2 or higher is used for all data-in-transit.

### Is private source code shared with Semgrep?

No. Semgrep CI runs fully in your CI pipeline and your source-code never leaves your environment. Only meta-data related to Semgrep runs (see below) are sent to Semgrep's service.

### What data is stored?

[Semgrep](https://github.com/returntocorp/semgrep) may send data to Semgrep App in accordance with the [metrics policy](/metrics).

Configure Semgrep CI to explicitly send two types of data to Semgrep App. These types of data are scan data and findings data.

- Scan data includes project name, CI environment, and scan meta-data.
- Findings data are used to provide human-readable content for notifications and integrations, as well as tracking results as new, fixed, or duplicate.

For more information and a detailed description of each data field, refer to [the relevant section in PRIVACY.md](https://github.com/returntocorp/semgrep/blob/develop/PRIVACY.md#data-collected-when-explicitly-requested).

### What network requests are made?

Semgrep CI makes network requests in accordance with the data storage previously mentioned.

[Semgrep](https://github.com/returntocorp/semgrep) makes the following network requests:

- When running without `--disable-version-check`, Semgrep makes a network request to check for updates.
- When providing a URL to `--output`, Semgrep performs an HTTP `POST` of the results to the specified URL.
- When providing a registry ID like `p/ci` to `--config`, Semgrep requests the configuration from the [Registry](https://semgrep.dev/explore) and may send metrics in accordance with the [metrics policy](/metrics).

## Configuration

### How do I configure Semgrep for different projects?

Semgrep App provides centralized policy management. See the [Rule Board](/semgrep-code/rule-board/) for more details.

### What is a policy?

A policy is a simple collection of rules and a definition of what to do with rule results: fail the Semgrep CI run and/or send non-blocking notifications to third-party services like Slack. Please see the [Rule Board](/semgrep-code/rule-board/) for more details.

## Monitoring

### Do you have a visualization UI?

Semgrep Team users can create custom dashboards and visualizations. Semgrep also supports posting results through webhooks to any JSON endpoint, so you can easily integrate it with your favorite visualization tool.

<MoreHelp />
