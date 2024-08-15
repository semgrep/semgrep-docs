---
slug: secure-defaults
title: Secure defaults
hide_title: true
description: Learn about secure defaults in Semgrep.
tags:
  - Secure guardrails
---

# Secure defaults

**Secure defaults** are inherently secure libraries, frameworks, configurations, or settings. They mitigate common security concerns, such as preventing cross-site request forgery (CSRF) by properly verifying inbound requests in Django or Flask applications. By adopting secure defaults, teams minimize the need for developers to manually implement security measures.

Secure default rules are Semgrep Code (SAST) rules that codify a secure default. The Semgrep team recommends deploying these rules as guardrails because the early adoption of secure defaults helps prevent additional vulnerabilities.

Some secure default rules codify universally secure practices and work out of the box, while others are organization-specific and require customization.

In the following example, the rule detects if a Flask [WTForm](https://flask-wtf.readthedocs.io/en/0.15.x/config/) view is protected from CSRF by default by checking the configuration variable `WTF_CSRF_CHECK_DEFAULT`. If it is set to `False` then the developer must call `csrf.protect()` whenever they handle a request—a manual process they must remember every time. Thus, `WTF_CSRF_CHECK_DEFAULT=True` is a secure default, which this Semgrep rule enforces.

<iframe title="tk" src="https://semgrep.dev/embed/editor?snippet=ReRkO" width="100%" height="432px" frameBorder="0"></iframe>
_**Figure**. A rule that helps secure a Flask app from CSRF by default_

## Semgrep Code supported languages

Semgrep Code provides secure default rules for the following languages:

- C#
- Python (Flask, FastAPI, and Django frameworks)

Custom rules to deploy secure default rules can be written in any of [Semgrep Code’s supported languages](/supported-languages#semgrep-code-and-oss).

## View Semgrep secure default rules

View all proprietary Semgrep secure default rules through the ruleset [p/secure-defaults](https://semgrep.dev/p/secure-defaults).

## Next steps

- [Create your own secure default rules](/secure-guardrails/custom-guardrails-rules#create-a-custom-secure-default)
