---
title: SQL Injection
description: Learn about SQL Injection (SQLi) vulnerabilities
hide_title: false
displayed_sidebar: learnSidebar
slug: /learn/vulnerabilities/sql-injection
tags:
  - sql-injection
---

If your application uses **Structured Query Language (SQL)** for a relational database and takes any user‑input (directly or indirectly), unsanitized input can be used by an attacker to inject a compromised instruction to your database. This can lead to data theft, data corruption, privilege escalation, or even remote code execution in some cases. So this isn’t just “maybe bad” these flaws often collapse system integrity.

To prevent **SQL injection**, treat user input as data, not as code; use parameterized queries or other safe query‑building methods.

In this article, we’ll explain what SQL injection is and why it still matters. Next, we’ll look at common ways it’s exploited and show a code example (including the Semgrep rule you shared) to help you detect it in your own code. Finally, we’ll offer concrete recommendations and mitigation strategies you can apply immediately.

## What is SQL Injection (SQLi)

SQL (Structured Query Language) is used to query relational databases. When building SQL queries, sometimes developers include parts of queries that come from user input. If the input is not safely handled, an attacker can “inject” SQL fragments that alter the structure of the query—so instead of just passing data, the input influences the logic (e.g. conditions, clauses, or even entirely new statements). This is SQL injection.

The reason it still exists is multi‑fold: many frameworks or libraries allow (or even require) some dynamic SQL assembly; developers sometimes concatenate strings or use template/literal interpolation that mixes code + data; sometimes for performance or flexibility reasons people bypass safer abstractions or ORM features. Also, in large codebases or legacy code, unsafe patterns persist.

Features that increase risk include: allowing raw query execution functions; accepting untrusted input (query params, body, headers, cookies, path parameters, etc.); using template strings or concatenation in query construction; not using parameter binding; constructing queries in places where sanitization or escaping is partial or error‑prone; or using unsafe dynamic SQL stored in database procedures.


## Common SQL Injection Attacks


Let’s walk through how SQL injection (SQLi) plays out in real-world code.

A typical SQLi vulnerability starts when user input is embedded directly into a SQL query string. Consider this example:

```
def search(request):
    query = request.GET['q']
    sql = f"SELECT * FROM some_table WHERE title LIKE '%{query}%';"
    cursor = db.cursor()
    cursor.execute(sql)
```


At first glance, this may seem like a standard search function. But if the user submits a malicious input like:

```
' OR 'a'='a
```


the resulting SQL becomes:

```
SELECT * FROM some_table WHERE title LIKE '%%' OR 'a'='a';
```


This query returns all rows in the table. In a more damaging case, the attacker might input something like:

```
'; DELETE FROM some_table; --
```


Now the SQL becomes:

```
SELECT * FROM some_table WHERE title LIKE '%%'; DELETE FROM some_table; --';
```


This could delete all data in that table. All it took was a few characters in a user-supplied input field.








### Classic Injection via string concatenation

What it is: User input is directly concatenated into a SQL string.

How it works: Suppose you have:

```
"SELECT * FROM users WHERE name = '" + userInput + "';"
```


If userInput is a' OR '1'='1, then the resulting query becomes:

```
SELECT * FROM users WHERE name = 'a' OR '1'='1';
```

That “OR '1'='1'” makes the conditional always true, so the attacker might retrieve all rows.

### Blind SQL Injection

What it is: The attacker doesn’t necessarily see data, but can infer via boolean conditions, timing (delays), or error codes.

How it works: The query might not return visible data, but returns success/failure or delays, which leak information. For example:

```
WHERE IF( substring(column,1,1) = 'a', sleep(5), 0)
```

If the response is delayed, the attacker infers that the first letter is ‘a’.

### Second‑order SQL Injection

What it is: Input is stored somewhere (e.g. database), then later used in a query in an unsafe way.

How it works: Suppose user input is sanitised superficially, stored, but later passed through unsanitized dynamic SQL or template interpolation. Attack happens when that second usage occurs.

### Using high‑privilege commands

What it is: If SQL injection allows execution of arbitrary commands like DROP TABLE, or writing files, or altering schema, etc.

How it works: Because injection can change query structure, sometimes attackers exploit this to escalate damage (data deletion, schema changes, reading configuration).

## Detecting SQL Injection Vulnerabilities in Your Code

Here we use your rule example (the express-sequelize-injection rule) to show how detection works, and generalize.

Example

Consider this JavaScript / TypeScript / Express + Sequelize code:

```
let criteria = req.query.foo

// Unsafe: direct interpolation / template literal
sequelize.query(`SELECT * FROM Foo WHERE criteria LIKE '%${criteria}%'`);

// Unsafe: using replacement in object but still embedding unsanitized user data
sequelize.query(`SELECT * FROM Foo WHERE criteria LIKE '%${obj.replacements[0]}%'`);
```


These are flagged by the express-sequelize-injection Semgrep rule because user‑controlled data (req.query.foo or obj.replacements[0]) is used inside a string that builds a raw SQL query string via interpolation. The rule is configured in taint mode, meaning it tracks “tainted” (user‑influenced) data flow into sinks (here, Sequelize raw query functions). It excludes safe cases (e.g. using parameter replacements placeholders, e.g. ? or named parameter binding) via either sanitizers or by matching patterns of safe APIs.

### What to look for generally

Places in code where user input (from query params, body, cookies, headers, files, etc.) enters and is used in raw SQL functions, dynamic query builders, or template literals.

Usage of dangerous “raw query” / “query string” APIs. In many frameworks or ORMs there are methods like query(...), execute(...), or string interpolation.

Absence of parameter binding, named parameters, or prepared statements.

Where sanitization / escaping is partial, ad hoc, or wrong.

### How Semgrep helps

Semgrep rules (both community and Pro) for SQL injection let you define pattern sinks (places where injection could happen) and pattern sources (places where tainted data enters), as in your example rule.

Semgrep supports “taint mode” which propagates taint through variables and function calls, so you can catch cases not just at the immediate point of concatenation but via intermediate variables.

You can also import or write rules to detect the absence of safe query patterns (e.g. flag uses of raw SQL query APIs without parameterization). This can complement detection of actual vulnerabilities.

## Recommendations and Mitigations

Here are more robust and concrete tips for writing secure database queries.

Always use parameterized queries
This is the most reliable way to prevent SQLi. Instead of building the SQL string manually, placeholders are used and the values are passed separately. This separates code from data. For example:

cursor.execute(
    "SELECT * FROM some_table WHERE title LIKE %s",
    [request.GET['q']]
)


Most database drivers support parameterized queries, though the placeholder syntax may vary: %s, ?, :name, etc.

Avoid raw string construction in queries
Even if data appears safe (e.g., from an image caption), if it was originally submitted by a user, it’s untrusted. Avoid string concatenation or interpolation when constructing queries.

Make the safe path the default
Favor tools and abstractions (like ORMs) that use parameterized queries by default. If you have to drop down to raw queries for performance or flexibility reasons, document why, and audit the input path rigorously.

Use tools to enforce safe patterns
Tools like Semgrep can detect when user input reaches query functions without proper sanitation or parameterization. Use it not just as a scanner for existing code, but as part of your development workflow (e.g., pre-commit hooks or CI pipelines) to prevent SQLi patterns from entering your codebase in the first place.

For example, the following Semgrep pattern can catch raw SQL execution with concatenated input:

$VAR = request.GET[...]
...
$CUR.execute("..." + $VAR)


Audit third-party query extensions
Even if you're using an ORM, be cautious with third-party extensions or custom query builders. These sometimes allow constructing queries via string interpolation under the hood, which can reintroduce the same risk. Prefer mature and well-reviewed packages.

Use empty parameter lists as placeholders
Even when no user input is needed, pass an empty list to parameterized APIs. This encourages correct usage later and makes mistakes easier to detect:

sql = "SELECT * FROM something"
cursor.execute(sql, [])


Here are specific actions you (or your team) can take to prevent or reduce SQL injection risk.

Always use parameterized queries or prepared statements (with placeholders for user input). Ensure you never concatenate user data into SQL commands. This is one of the primary defenses per OWASP. 
OWASP Cheat Sheet Series
+2
OWASP Cheat Sheet Series
+2

Use an ORM or query builder that supports safe query APIs. But be careful: ORMs often provide raw query functions or escape features; using them incorrectly can bypass safety.

Validate and restrict user input. Use allow‑lists (whitelists) or strict schema validation (e.g. input expected to be integer, date, enumerated values). Don’t trust user input, even from internal sources.

Limit database privileges. Ensure that the database user used by the application has only the necessary permissions (least privilege). That way, even if injection happens, damage is limited. 
Snyk
+1

Use stored procedures carefully. They can help, but only if they do not themselves build dynamic SQL that concatenates user data. If stored procedures are used, avoid unsafe constructs like EXEC/EXECUTE with concatenation inside them.

Escaping / sanitization as last resort. Escaping user values appropriately for the database and context can help, but this approach is more error‑prone and often fails when multiple layers are involved or when there are encoding/locale issues. It’s strongly discouraged as primary defense. OWASP noted it as a weaker option. 
OWASP Cheat Sheet Series

Use security tools: static analysis (like Semgrep) in taint mode; dynamic scanning; code reviews that focus specifically on query building; fuzz testing. Semgrep’s ruleset for SQL injection (e.g. --config "p/sql‑injection") already covers many languages (JavaScript, Python, Go, PHP, etc.), so integrating those into CI / pre‑commit can catch issues early.

Provide remediation guidance. When tools flag an unsafe pattern, give clear instructions or examples of what “safe” code looks like, including showing how to convert a vulnerable raw query to a parameterized query or safe ORM API. Optionally, for some rules/tools you may consider autofixes that transform raw queries into safe ones automatically (if feasible).

## Conclusion

SQL injection is a well‑known, yet still prevalent vulnerability. It arises whenever user input is treated as part of the code (SQL command), rather than strictly as data.

We saw how SQL injection works (string concatenation, template literals, blind or second‑order forms), and how detection tools like Semgrep can help (with taint tracking, pattern sources/sinks etc.). And we outlined strong mitigation strategies: parameterization, use of safe APIs, strict input validation, least privilege, etc.

Call to action: Review the SQL injection‑related rules in Semgrep (such as your express‑sequelize‑injection rule plus the “p/sql‑injection” family). See which ones are applicable to your stack. Then audit your codebase for unsafe raw queries or dynamic SQL. Adopt parameterized queries wherever possible, and build those into your CI/CD/security tooling.





