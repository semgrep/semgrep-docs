### Security Rules

If you are publishing a rule intended for the Semgrep Registry, these rules require extra metadata fields to ensure consistency across the ecosystem in both Semgrep App and Semgrep CLI.

This will help users of Semgrep identify rules in different categories such as:

- High confidence security rules for CI pipelines
- OWASP Top 10 or CWE Top 25 rule packs
- Technology e.g. `react` so they can be included in the `p/react` rule packs
- Audit rules with lower confidence intended for code auditors

#### Metadata:

To help with this effort, we require people to follow a strict list of metadata requirements that enable the above categories:

- cwe
- references
- category
- subcategory
- likelihood
- impact
- confidence

An example of what this looks like can be found below:

- [High confidence JavaScript/TypeScript rule](https://semgrep.dev/playground/r/javascript.express.security.audit.express-open-redirect.express-open-redirect)
- [Medium confidence Python rule](https://semgrep.dev/playground/r/python.lang.security.dangerous-system-call.dangerous-system-call)
- [Low confidence C# rule](https://semgrep.dev/playground/r/cs.lang.security.insecure-deserialization.fast-json.insecure-fastjson-deserialization)

```
  metadata:
    technology:
      - STRING
    references:
      - https://STRING
    cwe:
      - "CWE-NUMBER: STRING"
    category: security
    subcategory:
      - STRING
    likelihood: STRING
    impact: STRING
    confidence: STRING
```
A breakdown of what each field means is below with examples:

##### CWE:

Include the appropriate <a href="https://cwe.mitre.org/index.html">Comment Weakness Enumeration (CWE)</a> so users have the context to what vulnerability the rule should find. Some examples:

If you were writing a SQL Injection rule you would use the following:

```
cwe:                
  - 'CWE-89: Improper Neutralization of Special Elements used in an SQL Command ('SQL Injection')'
```

If you were writing an XSS rule you would use the following:

```
cwe: 
  - 'CWE-79: Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting')'
```

##### Confidence:

Including confidence, indicators tell users and Semgrep App about the rule and if it should be actioned on, we use LOW, MEDIUM, and HIGH indicators:

- HIGH - Security concern, with high true positives (useful in CI/CD pipelines and for those who don't want to deal with false positives)
- MEDIUM - Security concern, but some false positives (useful in CI/CD pipelines  and for those who are okay with minimal false positives)
- LOW - Expect a fair amount of false positives, think audit style rules (Should only be run by those who are okay with a lot of false positives)

<b>HIGH</b>

HIGH confidence rules generally use Semgrep advanced features such as `metavariable-comparison` or `taint mode`, with the intent to be a true positive, below are some useful examples:

- https://semgrep.dev/orgs/-/editor/r/go.lang.security.audit.crypto.use_of_weak_rsa_key.use-of-weak-rsa-key
- https://semgrep.dev/playground/r/javascript.express.security.audit.express-open-redirect.express-open-redirect
- https://semgrep.dev/playground/r/javascript.jose.security.jwt-hardcode.hardcoded-jwt-secret?editorMode=advanced

```
confidence: HIGH 
```

<b>MEDIUM</b>

MEDIUM confidence rules generally use Semgrep advanced features such as `metavariable-comparison` or `taint mode`, but with some false positives, below are some useful examples:

- https://semgrep.dev/playground/r/javascript.express.security.audit.express-ssrf.express-ssrf
- https://semgrep.dev/playground/r/javascript.express.security.express-xml2json-xxe.express-xml2json-xxe?editorMode=advanced

```
confidence: MEDIUM 
```

<b>LOW</b>

Examples of LOW confidence rules generally find something which appears to be dangerous and have a lot of false positives, below are some useful examples:
- https://semgrep.dev/playground/r/php.lang.security.eval-use.eval-use
- https://semgrep.dev/playground/r/javascript.browser.security.dom-based-xss.dom-based-xss?editorMode=advanced

```
confidence: LOW 
```

##### Likelihood:

Including a likelihood indicator tells users and Semgrep App about the rule likelihood if how possible is this vulnerability going to occur, we use LOW, MEDIUM, and HIGH indicators:

- HIGH
- MEDIUM
- LOW

<b>HIGH</b>

HIGH likelihood rules tend to be something which is easily reasoned with if found very likely to be a concern:

Some general examples include:
- The use of weak encryption
  - https://semgrep.dev/playground/r/go.lang.security.audit.crypto.use_of_weak_rsa_key.use-of-weak-rsa-key?editorMode=advanced
- Disabled security feature in a configuration
- Hardcoded secrets that use `"..."`
  - https://semgrep.dev/playground/r/javascript.jose.security.jwt-hardcode.hardcoded-jwt-secret?editorMode=advanced
- `taint mode sources` which reach a `taint mode sink` with `taint mode sanitizers`


```
likelihood: HIGH 
```

<b>MEDIUM</b>

MEDIUM likelihood rules tend to be vulnerable in most circumstances but may be hard for an attacker to achieve due to some constraints. In addition, rules that may only find part of a problem, not the whole issue:


Some general examples:
- `taint mode sources` which reach a `taint mode sink`  but the source is something which can only be vulnerable in certain conditions e.g. OS Environment Variables, or loading from disk
  - https://semgrep.dev/playground/r/python.aws-lambda.security.dangerous-spawn-process.dangerous-spawn-process?editorMode=advanced
- `taint mode sources` with a `taint mode sink` but is missing a `taint mode sanitizer` which can introduce more false positives
  - https://semgrep.dev/playground/r/javascript.express.security.express-puppeteer-injection.express-puppeteer-injection?editorMode=advanced

```
likelihood: MEDIUM 
```

<b>LOW</b>

LOW likelihood rules tend to be which tends to be security rule which finds 'something' dangerous, but does not do anything to ensure it is  vulnerable, for example:

- `taint mode sources` such as function arguments which may or may not be tainted which reach a `taint mode sink`
  - https://semgrep.dev/playground/r/typescript.react.security.audit.react-href-var.react-href-var?editorMode=advanced
- A rule which uses `search mode` to find the use of a dangerous function e.g. trustAsHTML, bypassSecurityTrust(), eval(), or innerHTML
  - https://semgrep.dev/playground/r/javascript.browser.security.dom-based-xss.dom-based-xss?editorMode=advanced

```
likelihood: LOW 
```


##### Impact:

Including an impact indicator tells users and Semgrep App about the rule impact, and how much 'damage' would this vulnerability would cause to the application, we use LOW, MEDIUM, and HIGH indicators:


<b>HIGH</b>

HIGH impact rules tend to be something which would be extremely damaging such as injection vulnerabilities, for example:

- https://semgrep.dev/playground/r/javascript.sequelize.security.audit.sequelize-injection-express.express-sequelize-injection
- https://semgrep.dev/playground/r/ruby.rails.security.audit.xxe.xml-external-entities-enabled.xml-external-entities-enabled?editorMode=advanced


```
impact: HIGH 
```

<b>MEDIUM</b>

MEDIUM impact rules are issues that are less likely to lead to full system compromise but still are fairly damaging to the application.

- https://semgrep.dev/playground/r/python.flask.security.injection.raw-html-concat.raw-html-format?editorMode=advanced
- https://semgrep.dev/playground/r/python.flask.security.injection.ssrf-requests.ssrf-requests?editorMode=advanced

```
impact: MEDIUM 
```

<b>LOW</b>

LOW impact rules are rules which are a security issue, but the impact will not be too damaging to the application if discovered. 

- https://semgrep.dev/playground/r/go.gorilla.security.audit.session-cookie-missing-secure.session-cookie-missing-secure?editorMode=advanced
- https://semgrep.dev/playground/r/javascript.browser.security.raw-html-join.raw-html-join?editorMode=advanced

```
impact: LOW 
```


##### Subcategory:

Including a subcategory indicator tells users and Semgrep App about the rule type if it is a vulnerability, audit, or guardrail indicator:

<b>vuln</b>

A vulnerability rule is something that will be something developers will want to resolve for example a SQL Injection rule which uses taint mode.

- https://semgrep.dev/playground/r/javascript.sequelize.security.audit.sequelize-injection-express.express-sequelize-injection

```
subcategory:          
  - vuln
```
<b>audit</b>

An audit rule, is useful for code auditors, for example, a SQL rule which just finds all uses of `database.exec(...)` which could be problematic.

- https://semgrep.dev/playground/r/generic.html-templates.security.unquoted-attribute-var.unquoted-attribute-var?editorMode=advanced

```
subcategory:          
  - audit
```

<b>guardrail</b>

A guardrail rule, is useful for companies writing custom rules, for example finding all usages to non-standard XML parsing libraries, you should use only your company-approved library.

```
subcategory:          
  - guardrail
```



##### References:

References help define specific rule packs for languages, libraries, and frameworks which are available on our <a href="https://semgrep.dev/r">Semgrep Registry</a>.

For example, writing a rule to find an issue in react, you would include:
- https://semgrep.dev/playground/r/typescript.react.security.audit.react-href-var.react-href-var?editorMode=advanced
```
references: 
  - react
```

Another example, writing a rule to find an issue in express, you would include:

- https://semgrep.dev/playground/r/javascript.sequelize.security.audit.sequelize-injection-express.express-sequelize-injection

```
references: 
  - express
```