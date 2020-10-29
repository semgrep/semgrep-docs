# Frequently Asked Questions

[TOC]

# General

#### What is the license for semgrep? What about the rules?
[Semgrep CLI](https://github.com/returntocorp/semgrep) is open-source, licensed under the [LGPL 2.1](https://tldrlegal.com/license/gnu-lesser-general-public-license-v2.1-(lgpl-2.1)) license — you can use it at work, on private and proprietary code, no problem!
    
The [Semgrep Registry](https://semgrep.dev/explore) contains rules from many different contributors, often under differing licenses. If you use Semgrep Registry through Semgrep.dev, r2c is vetting the rules to make sure that the licenses are compatible with using them at your company.

Many of the rules that r2c writes have their source available at [returntocorp/semgrep-rules](https://github.com/returntocorp/semgrep-rules/). These are licensed as LGPL 2.1 under the [Commons Clause](https://commonsclause.com/). This means the source for the rules is available, but they can’t be resold without r2c’s permission. Although the Commons Clause and related licenses like the BSL/SSPL are embraced by many great open-source projects ([Sentry](https://blog.sentry.io/2019/11/06/relicensing-sentry/), [Cockroach](https://www.cockroachlabs.com/blog/oss-relicensing-cockroachdb/), [Mongo](https://www.mongodb.com/licensing/server-side-public-license/faq)), it is not technically open-source under the OSI definition. Why do we have this restriction if we love open source software so much? Since r2c offers a paid, hosted version at Semgrep.dev, it’s important for us to have this restriction so other companies like major cloud providers can’t just resell the rules we’ve worked on as a competing service to Semgrep.dev.

If the LGPL + Common Clause license is an issue for you as a contributor, please give us feedback! r2c may be able to offer you semgrep-rules under a separate license on a case-by-case basis.

#### Is it ok to run Semgrep or the r2c rules on my work projects?

Yes! Semgrep is safe to run on your private code. The Common Clause restriction only comes into effect if you are *selling* the rules provided in the semgrep-rules repository. If that’s the case, you’ll need to talk with r2c first to get permission.

#### I’m a security professional and want to use the semgrep-rules project with my clients as part of my paid services. Is that ok?
Probably! If you have typical consulting service and running semgrep-rules is just a part of your assessments, that’s great—and of course feel free to refer your clients to the hosted [Semgrep.dev](https://semgrep.dev/). But if your entire service is about scanning code and you just want to charge people for running the semgrep-rules repo that r2c did the work to create and maintain, that’s something you’d need to reach out to us about.


#### What is your support policy?
Help is available for all users, free or otherwise, through the [r2c Community Slack](https://r2c.dev/slack). Semgrep Team tier customers receive 8\*5 email/phone/Slack support with committed SLAs. See [Support](support.md) for more details.

# Billing / Pricing

#### What features differ between the Semgrep Community (free) and Team (paid) versions?
See the Semgrep feature and pricing comparison at [r2c.dev/pricing](https://r2c.dev/pricing)

#### Who is a user and how do you count them?
For the Semgrep Team edition, a user is any project contributor whose pull request or code was scanned in the billing cycle. For example, if a project has 4 unique contributors who pushed code during the period, and Semgrep runs on all their pull requests, there are 4 users. If these unique contributors push to many projects, they will only be counted once; please feel free to scan often and widely. Semgrep does not charge on a line-of-code or per-project basis. 

# Comparisons

#### How is Semgrep different than linters?
Linters use static analysis but have a narrower scope for analysis (most rules typically operate on a single line).

Semgrep incorporates rulesets inspired by the rules of many popular linters and checkers, including ESLint, RuboCop, Bandit, and FindSecBugs. But Semgrep also allows you to enable multiple rulesets at the same time without adding linter-specific artifacts or installation to your code repository.

Lastly, while many linters are extensible, with Semgrep you don’t need to learn specific abstract syntax tree (AST) based patterns for writing custom rules. You can read more about the spectrum from linters to complex analysis tools in Instagram's wonderful article [Static Analysis at Scale: An Instagram Story](https://instagram-engineering.com/static-analysis-at-scale-an-instagram-story-8f498ab71a0c).

#### How is Semgrep different from CodeQL?
Both Semgrep and CodeQL use static analysis to find bugs. Semgrep operates directly on source code, whereas CodeQL requires a buildable environment. Both have an public set of rules. CodeQL is not open source, Semgrep is LGPL. Semgrep focuses on speed and ease of use. Because it doesn’t require a buildable environment, it doesn’t have some of the analysis features like types and interprocedural dataflow analysis that CodeQL does. Semgrep rules look like the source code you’re writing, CodeQL has a separate domain-specific-language for writing queries. Semgrep supports autofixes; CodeQL does not.

#### How is Semgrep different than SonarQube?
Both Semgrep and SonarQube use static analysis to find bugs. While Semgrep engine is generic, the Semgrep rules are targeted to OWASP Top 10 and other security-centric issues. Both products are open-source. Extending Semgrep with custom rules is simple, since Semgrep rules look like the source code you’re writing. Writing custom rules with SonarQube is [restricted to a handful of languages](https://docs.sonarqube.org/latest/extend/adding-coding-rules/) and requires familiarity with Java and abstract syntax trees (ASTs).

# Privacy and Security

#### Where do you store data?
r2c uses Amazon Web Services (US region) for storing customer data.

#### How is data secured, including data-at-rest and data-in-transit?
All customer data is located in AWS (US region). Amazon RDS encrypted DB instances use industry standard AES-256 encryption and TLS 1.2 or higher is used for all data-in-transit.

#### Is private source code shared with r2c?
No. Semgrep CI runs fully in your CI pipeline and your source-code never leaves your environment. Only meta-data related to Semgrep runs (see below) are sent to Semgrep's service.

#### What data do you store?
Semgrep CI collects usage data to provide useful results and to help improve the product. Two types of data are sent to r2c servers: scan data and findings data. Scan data includes project id, CI environment and scan meta-data. Findings data are used to provide human readable content for notifications and integrations, as well tracking results as new, fixed, or duplicate. For more information and detailed description for each data field, refer to Semgrep CI [PRIVACY.md](https://github.com/returntocorp/semgrep-action/blob/develop/PRIVACY.md). Note that [Semgrep CLI](https://github.com/returntocorp/semgrep) does not collect or send any scan or findings data.

# Configuration

#### How do I configure Semgrep for different projects?
Semgrep Community and Team editions provide centralized policy management. See [Managing CI policy](managing-policy.md) for more details.

#### What is a policy?
A policy is a simple collection of rules and a definition of what to do with rule results: fail the Semgrep CI run and/or send non-blocking notifications to third-party services like Slack. Please see [Managing CI policy](managing-policy.md) for more details.

# Monitoring

#### Do you have a visualization UI?
Dashboarding is available for Semgrep Team users. Semgrep also supports posting results via web hooks to any JSON endpoint, so you can easily integrate it with your favorite visualization tool.
