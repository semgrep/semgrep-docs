---
title: SQL Injection
description: Learn about SQL Injection (SQLi) vulnerabilities
hide_title: false
displayed_sidebar: learnSidebar
slug: /learn/vulnerabilities/sql-injection
tags:
  - sql-injection
---

If your application uses **Structured Query Language (SQL)** for a relational database and takes any user‑input (directly or indirectly), unsanitized input can be used by an attacker to inject a compromised instruction to your database. This can lead to data theft, data corruption, privilege escalation, or even remote code execution in some cases. These flaws compromise system integrity for your applications.

This type of vulnerability is well known but still too often left open to compromise. To prevent **SQL injection**, treat user input as tainted, not as safe variables to include in your queries. Parameterized queries, object-relational mapping (ORM) libraries and other safe query‑building methods are plentiful.

In this article, we’ll explain what SQL injection is and why it still matters. Next, we’ll look at common ways it’s exploited and show code examples to help you identify it in your own code. Finally, we’ll offer recommendations and mitigation strategies you can apply immediately.

## What is SQL Injection (SQLi)

SQL is used to query relational databases. When building SQL queries, often developers include parts of queries that come from user input. If the input is not safely handled, an attacker can “inject” SQL fragments that alter the structure of the query. Instead of just passing as data, the user input influences the logic (ie. conditions, clauses, or even entirely new statements).

There are many reasons this vulnerability still happens.

- many frameworks or libraries allow (or even require) some dynamic SQL assembly
- concatenating strings or using template interpolation is convenient
- when optimizing long query performance, safeguards from ORM or other abstractions may be short-circuited

Somtimes in large codebases, legacy code, or unsafe patterns persist in documentation that may have been used as a reference.

## Common SQL Injection Attacks

Let’s walk through some examples for what SQL injection looks like in real-world code.

A typical SQLi vulnerability starts when user input is embedded directly into a SQL query string. Consider this Python example:

```python
def search(request):
    query = request.GET['q']
    sql = f"SELECT * FROM semgrep_customers WHERE company = '{query}';"
    cursor = db.cursor()
    cursor.execute(sql)
```

There are DB compliant libraries that can be used with a variety of databases incuding sqlite, postgres, mysql, and more.

This may seem like a standard select, but you might notice that if the user submits something that disrupts parsing the query they can execute arbitrary SQL commands.

Passing `' OR 'a'='a` as your query becomes:
```
SELECT * FROM semgrep_customers WHERE company = '' OR 'a'='a';
```

This returns all rows in the table because the second expression always evaluates to true. In a more damaging case, the attacker might input something like:

```
'; DELETE FROM semgrep_customers; --
```

This could delete all data in that table. All it took was a few characters in a user-supplied input field.


### Classic Injection via string concatenation

The above example used string interpolation but the same can occur when concatenating strings.

Suppose you build a query like this:

```
"SELECT * FROM users WHERE name = '" + userInput + "';"
```

By manipulating the value of `userInput` the attacker can inject their command into the query behavior such as returning the full table results `' OR '1'='1` or executing arbitrary database operations with `; DROP table users; --`.

### Blind SQL Injection

The previous examples still require knowledge of how the database tables are structured and which database is being used. The attacker might be able to infer details by using boolean conditions, timing (delays), or injecting error codes.

A successful or failure in a query can leak information.

For example:

```
WHERE IF( substring(column,1,1) = 'a', sleep(5), 0)
```

If the response is delayed, the attacker infers that the first letter is ‘a’.

### Second‑order SQL Injection

Another indirect attack vector may be when data is fetched from the database itself and used in a query. If an attacker can enter data into the database, they can insert the malicious string that the source code treats as a trusted source because the data came from inside the database.

Suppose user input is sanitized superficially, stored, but later passed through un-sanitized dynamic SQL. An attack happens when that second usage of the payload occurs.

## Detecting SQL Injection Vulnerabilities in Your Code

Some general guidance on where to focus triage for SQLi:
- Places in code where user input (from query params, body, cookies, headers, files, etc.) enters and is used in raw SQL functions, dynamic query builders, or template literals.
- Usage of dangerous “raw query” / “query string” APIs. In many frameworks or ORMs there are methods like query(...), execute(...), or string interpolation.
- Absence of parameter binding, named parameters, or prepared statements.


Semgrep can help identify SQL injection patterns across large codebases. You can use the [p/sql-injection](https://semgrep.dev/p/sql-injection) ruleset to find common injection patterns, including following more complex tainted data flows.

Integrating Semgrep scanning into your development workflow is a way to catch SQLi issues during development and before reaching production. To scan your codebase run:

```
semgrep --config p/sql-injection
```

### Example Semgrep Rule: express-sequelize-injection

Consider this JavaScript / TypeScript / Express + Sequelize code:

```
let criteria = req.query.foo

// ok: this is proper handling that should not match
sequelize.query(
  'SELECT * FROM projects WHERE status = ?',
  {
    replacements: [req.body.foo],
    type: QueryTypes.SELECT
  }
)

// Unsafe: direct interpolation / template literal
sequelize.query(`SELECT * FROM Foo WHERE criteria LIKE '%${criteria}%'`);

// Unsafe: using replacement in object but still embedding unsanitized user data
sequelize.query(`SELECT * FROM Foo WHERE criteria LIKE '%${obj.replacements[0]}%'`);
```

These are flagged by the [express-sequelize-injection](https://semgrep.dev/playground/r/bZT2ew/javascript.sequelize.security.audit.sequelize-injection-express.express-sequelize-injection) rule.


## Recommendations and Mitigations

Here are some robust and concrete tips for writing secure database queries.

### Always use parameterized queries

This is the most reliable way to prevent SQLi. Instead of building the SQL string manually, placeholders are used and the values are passed separately. This separates code from data and let's the library properly check for and escape any malicious strings. 

This is a Python example that lets the `execute` function santize the query string that was passed with an http request:

```python
cursor.execute(
    "SELECT * FROM some_table WHERE title LIKE %s",
    [request.GET['q']]
)
```

Most database drivers support parameterized queries because this has been a long-standing problem in the industry. Specific placeholder syntax may vary (`%s`, `?`, `:name`, etc.) but the concept remains the same.

### Avoid raw string construction in queries

Even if data appears safe and from a trusted source, if a user can manipulate it avoid using it in concatenation expressions or string interpolation.


### Make the safe path the default

Favor tools and abstractions (like ORMs) that use parameterized queries by default. If you have to drop down to raw queries for performance or flexibility reasons, document why, and audit the input path rigorously.

### Audit third-party query extensions

Even if you're using an ORM, be cautious with third-party extensions or custom query builders. These sometimes allow constructing queries via string interpolation under the hood, which can reintroduce the same risk. Prefer mature and well-reviewed packages as part of your software supply chain.

### Check stored procedures too

Application code is not the only place where injection can occur. A stored procedure may run with the database, but if not checked or scanned could still leave the database open to compromise. Avoid unsafe constructs like EXEC or EXECUTE in combination with concatenation.

### Limit database privileges

Use separate permissions for database maintenance / migration / schema changes from the permissions used for application logic.

While this does not prevent SQLi from happening, it can limit the consequences.

### Catch Database Errors

Attackers will look at error messages to learn more about how something has been designed. If a database error is not caught in the application logic and is presented to the end user, this could provide a clue that there is an underlying vulnerability waiting to be exploited.

## Conclusion

SQL injection is a well‑known, yet still prevalent vulnerability. It arises whenever user input is treated as part of the SQL command, rather than strictly as literal data.

We saw how SQL injection works (string concatenation, template literals, blind or second‑order forms), and how detection tools like Semgrep can help. We outlined strong mitigation strategies such as parameterization, use of trusted libraries, strict input validation, least privilege, etc.























