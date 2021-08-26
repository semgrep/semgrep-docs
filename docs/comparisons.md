# Semgrep Comparisons (https://semgrep.dev/docs/faq/#comparisons)

### How is Semgrep different than $OTHER_TOOL or $GENERIC_[SAST](https://en.wikipedia.org/wiki/Static_application_security_testing)?

Semgrep is an open-source tool with a simple syntax for writing rules: if you can write code, you can write a Semgrep rule — no program analysis PhD required!

To our knowledge, the only other tool with the explicit goal of allowing custom rules is Semmle’s proprietary tool, CodeQL. CodeQL has a domain-specific language which is extremely powerful but is designed for those with significant program analysis expertise, whereas Semgrep is designed for the security engineer* ** *or developer who wants to automate code review. Our goal is to make writing a Semgrep rule as easy as copying the code you want to find—and letting the Semgrep engine to make the rule and autofix high-quality enough to run in CI or the editor.

Our hosted offering, [Semgrep.dev](http://semgrep.dev/), has a generous free tier (even for private repos!) that offers a hosted CI integration with one-click setup and diff-awareness so you can start running Semgrep right away on new code so that you don’t have to fix all the existing issues when you first start out. For users running inside orgs with lots of repos, the hosted offering also offers a policy and notification system that makes it easy to tune Semgrep so that it only reports issues or suggest fixes that actually get applied. Our goal is a 99% fix rate for what Semgrep reports.

### Besides open-source and ease of writing new rules, what else is different about Semgrep?

**Speedy & offline: Semgrep runs offline on every keystroke**
If you are shipping code daily a code analysis tool that takes a week is not helpful. We think modern static analysis tools should run on every keystroke in the editor, without needing network access. Semgrep runs at approximately 20K-100K loc/sec per rule but our goal is to be even faster.

**Semantic: Semgrep is *smart***
Semgrep automatically handles the nuance of “there’s more than one way to do it”: you write your query and all equivalent variations of that code should be automatically matched. 

As Semgrep evolves, a query like *foo(“password”*) becomes smarter. In the original version of Semgrep, this query would only match the code `foo("password")`. But a few months after release it would match `const x = "password"; foo(x).`  These days Semgrep can [do even more with intraproceedural dataflow](https://semgrep.dev/s/ievans:c-dataflow) analysis, and we’re working on adding more of these semantic ** features with every release.

**Integrated: Semgrep understands git and other version-control systems**
It’s easy to write a new Semgrep rule and have it only apply *going forward*. You can [mute findings](http://todo/) of course, but we have [built-in support for this with Semgrep CI](http://fdsaf/) and GitHub/GitLab/etc. integrations.

**Portability: If you write a Semgrep rule, it runs anywhere
**Many other tools require a buildable environment or can only be run in a VM. Semgrep runs “on the metal” and has minimal dependencies around a statically linked core; our parsers are declaratively-generated C libraries (we contribute to and use [tree-sitter](https://tree-sitter.github.io/)).

And many more: see [our philosophy for development Semgrep](contributing/semgrep-philosophy/) for further reading.

### How is Semgrep different than linters?

Linters use static analysis but typically have a narrower scope for analysis (most rules typically operate on a single line). Some linters also cover stylistic decisions — tabs vs. spaces, for instance — but Semgrep doesn’t care about whitespace or formatting.

Semgrep’s [registry](https://semgrep.dev/explore) has rulesets inspired by the rules of many popular linters and checkers, including ESLint, RuboCop, Bandit, and FindSecBugs. But Semgrep also allows you to enable multiple rulesets at the same time without adding linter-specific artifacts or installation to your code repository.

Some popular linter tools may use tools like Semgrep as an internal engine, and we encourage this! For instance, the popular scanner *NodeJSScan* was re-written to use Semgrep as the core.

Lastly, while many linters are extensible, with Semgrep you don’t need to learn specific abstract syntax tree (AST) based patterns for writing custom rules. Semgrep works across languages and you learn its syntax once; you don't have to mess with MemberExpressions, node visitors, and all that. Before Semgrep, many of us on the maintainer team were writing AST-based rules as well: [one of us wrote an article comparing writing linter rules to Semgrep expressions](https://r2c.dev/blog/2020/why-i-moved-to-semgrep-for-all-my-code-analysis/).

### How is Semgrep different from CodeQL?

Both Semgrep and CodeQL use static analysis to find bugs, but there are a few differences:

* Semgrep operates directly on source code, whereas CodeQL requires a buildable environment
* Semgrep is LGPL-2.1 and free to run anywhere; CodeQL is not open source and you must pay to run it on any non-open-source code
    
* Semgrep supports autofixes; CodeQL does not.
* Semgrep focuses on speed and ease of use. Because it doesn’t require a buildable environment, it doesn’t have some of the analysis features like interprocedural dataflow analysis that CodeQL does.
* Both have publicly available rules
* Semgrep rules look like the source code you’re writing, CodeQL has a separate domain-specific-language for writing queries. 
* Semgrep has an online, hosted free plan; both have a hosted paid plan

See [our philosophy for development Semgrep](contributing/semgrep-philosophy/) for more about what makes Semgrep different.

### How is Semgrep different than SonarQube?

Both Semgrep and SonarQube use static analysis to find bugs, but there are a few differences:

* Extending Semgrep with custom rules is simple, since Semgrep rules look like the source code you’re writing. Writing custom rules with SonarQube is [restricted to a handful of languages](https://docs.sonarqube.org/latest/extend/adding-coding-rules/) and requires familiarity with Java and abstract syntax trees (ASTs).
* Semgrep is LGPL-2.1, SonarQube offers an open-source version but it is missing features. For example, 12 of then supported languages are not available in the open-source offering, and more powerful dataflow features are only available in the paid versions.
* Semgrep supports autofixes; SonarQube does not.
* Semgrep focuses on speed and ease-of-use, making analysis possible at up to 20K-100K loc/sec per rule. SonarQube authors [report approximately 0.4K loc/sec for rulesets in production](https://web.archive.org/web/20210127020636/https://community.sonarsource.com/t/performance-guide-for-large-project-analysis/148/2).
* Semgrep CI supports scanning only changed files (differential analysis), SonarQube does not
* Both have publicly available rules
* Semgrep has an online, hosted free plan; both have a hosted paid plan

See [our philosophy for development Semgrep](contributing/semgrep-philosophy/) for more about what makes Semgrep different.