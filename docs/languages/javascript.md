---
slug: /languages/javascript
title: JavaScript
hide_title: true
description: >-
  Detailed documentation for Semgrep's JavaScript support. 
tags:
  - Semgrep Code 
---

# JavaScript frameworks and analyses

:::tip 
Semgrep’s Python coverage leverages framework-specific analysis capabilities that are not present in OSS. As a result, many framework specific Pro rules will **fail** to return findings if run on OSS. To ensure full security coverage, run: `semgrep login && semgrep ci`.
:::

## Semgrep Code analyses

- Framework-specific control flow analysis
- Inter-file analysis (cross-file)
- Inter-procedural analysis (cross-function)

### Coverage

Semgrep aims to provide comprehensive and accurate detection of common OWASP Top 10 issues in source code.

In addition to rules, the Semgrep engine itself can analyze code and implicit dataflows in the context of the following supported frameworks:


| Supported frameworks | Type of framework |
| -------              | ------            |
| Express              | Web framework     |
| Koa                  | Web framework     |
| Hapi                 | Web framework     |
| NestJS               | Web framework     |

<details>
<summary>**In addition, Semgrep Code supports 50+ libraries & frameworks based on their overall popularity.**</summary>

| Supported libraries           | Type of library                          |
| -------                       | ------                                   |
| `axios`                         | Network library           |
| `nodemail`                      | Network library           |
| `node-fetch`                    | Network library           |
| `needle`                        | Network library           |
| `http`                          | Network library           |
| `https`                         | Network library           |
| `net`                           | Network library           |
| `http2`                         | Network library           |
| `got`                           | Network library           |
| `request`                       | Network library           |
| `marked`                        | Markdown library          |
| `dot`                           | Template engine           |
| `child-process`                 | OS interaction library    |
| `nestjs`                        | Web framework             |
| `express`                       | Web framework             |
| `koa`                           | Web framework             |
| `hapi`                          | Web framework             |
| `sqlite`                      | Database library          |
| `sqlite3`                       | Database library          |
| `typeorm`                       | Database library          |
| `mongoose`                      | Database library          |
| `mongodb`                       | Database library          |
| `knex`                          | Database library          |
| `mikro-orm`                     | Database library          |
| `@mikro-orm/core`               | Database library          |
| `@mikro-orm/better-sqlite`      | Database library          |
| `@mikro-orm/entity-generator`   | Database library          |
| `@mikro-orm/knex`               | Database library          |
| `@mikro-orm/libsql`             | Database library          |
| `@mikro-orm/mariadb`            | Database library          |
| `@mikro-orm/migrations-mongodb` | Database library          |
| `@mikro-orm/migrations`         | Database library          |
| `@mikro-orm/mongodb`            | Database library          |
| `@mikro-orm/mssql`              | Database library          |
| `@mikro-orm/mysql`              | Database library          |
| `@mikro-orm/postgresql`         | Database library          |
| `@mikro-orm/reflection`         | Database library          |
| `@mikro-orm/seeder`             | Database library          |
| `@mikro-orm/sqlite`             | Database library          |
| `pg`                            | Database library          |
| `pg-native`                     | Database library          |
| `pg-pool`                       | Database library          |
| `mysql`                         | Database library          |
| `mysql2`                        | Database library          |
| `sequelize`                     | Database library          |
| `libxml`                        | XML parsing library       |
| `xpath`                         | XML parsing library       |
| `puppeteer`                     | Library with code execution capabilities |
| `vm2`                           | Library with code execution capabilities | 
| `vm`                          | Library with code execution capabilities |
| `rimraf`                        | File System Library       |
| `papaparse`                     | File system library       |
| `fs-extra`                      | File system library       |
| `fs`                            | File system library       |
| `sharp`                         | File system library       |
| `path`                          | File system library       |
| `webcrypto`                     | Cryptographic library     |
| `crypto`                        | Cryptographic library     |
| `http-body`                     | Express middleware        |
| `cors`                          | Express middleware        |
| `express-session`               | Express middleware        |
| `helmet`                        | Express middleware        |
| `@koa/cors`                     | Koa middleware            |
| `lodash`                        | Utility library           |
| `validator`                     | String validation library    |
| `escape-string-regexp`          | String sanitization library  |
| `date-fns`                      | Date manipulation library    |
| `moment`                        | Date manipulation library    |
| `luxon`                         | Date manipulation library    |
| `dayjsfns`                      | Date manipulation library    |
| `mongo-sanitize`                | String sanitization library  |
| `express-mongo-sanitize`        | String sanitization library  |

</details>

## Benchmark results exclusive of [AI](https://semgrep.dev/docs/semgrep-assistant/overview) processing

Semgrep's benchmarking process involves scanning open source repositories, triaging the findings, and making iterative rule updates. This process was developed and is used internally by the Semgrep security research team to monitor and improve rule performance.

Results as of February 25, 2025:

| Benchmark | Value |
| :---- | :---- |
| True positive rate (before AI processing) for latest `p/default` ruleset | 63% |
| Lines of code scanned | ~8 million |
| Repositories scanned | 153 |
| Findings triaged to date | ~600 |
