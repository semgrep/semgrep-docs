---
slug: /languages/javascript
title: JavaScript
hide_title: true
description: >-
  Detailed documentation for Semgrep's JavaScript support. 
tags:
  - Semgrep Code
  - Semgrep Supply Chain
---

import LangCallout from "/src/components/concept/_lang-callout.md"
import LangCoverage from "/src/components/concept/_lang-coverage.md"
import LangDefCode from "/src/components/concept/_lang-def-code.md"
import LangDefSsc from "/src/components/concept/_lang-def-ssc.md"
import LangCeIntro from "/src/components/concept/_lang-ce-intro.md"
import LangSscFeatures from "/src/components/concept/_lang-ssc-features.md"

# JavaScript support

<LangCallout name="JavaScript" />

## JavaScript support in Semgrep Code

<LangDefCode />

### Analyses and frameworks

- Framework-specific control flow analysis
- Interfile analysis (cross-file)
- Interprocedural analysis (cross-function)
* All analyses performed by [Semgrep CE](#javascript-support-in-semgrep-ce)

### Coverage

<LangCoverage />

In addition to rules, the Semgrep engine itself can analyze code and implicit dataflows in the context of the following supported frameworks:

| Supported frameworks | Type of framework |
| -------              | ------            |
| Express              | Web framework     |
| Koa                  | Web framework     |
| Hapi                 | Web framework     |
| NestJS               | Web framework     |

<details>
<summary>**Semgrep Code supports 50+ libraries & frameworks based on their overall popularity.**</summary>

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

#### Benchmark results exclusive of [AI](/semgrep-assistant/overview) processing

Semgrep's benchmarking process involves scanning open source repositories, triaging the findings, and making iterative rule updates. This process was developed and is used internally by the Semgrep security research team to monitor and improve rule performance.

Results as of **February 25, 2025**:

| Benchmark | Value |
| :---- | :---- |
| True positive rate (before AI processing) for latest `p/default` ruleset | 63% |
| Lines of code scanned | ~8 million |
| Repositories scanned | 153 |
| Findings triaged to date | ~600 |

## JavaScript support in Semgrep Supply Chain

<LangDefSsc />

### Supported package managers

Semgrep supports the following JavaScript package managers:

- npm
- Yarn
- pnpm

### Analyses and features

The following analyses and features are available for JavaScript:

<LangSscFeatures />

## JavaScript support in Semgrep CE

<LangCeIntro />
<!-- use a component here -->


The Semgrep Registry provides the following JavaScript rulesets:

- [<i class="fas fa-external-link fa-xs"></i> `p/default`](https://semgrep.dev/p/default)
-  [<i class="fas fa-external-link fa-xs"></i> `p/javascript`](https://semgrep.dev/p/javascript)
- [<i class="fas fa-external-link fa-xs"></i> `p/trailofbits`](https://semgrep.dev/p/trailofbits)
- [<i class="fas fa-external-link fa-xs"></i> `p/xss`](https://semgrep.dev/p/trailofbits)

Sample usage:

```bash
semgrep scan --config p/javascript
```
