---
slug: supported-languages-python
id: supported-languages-python
append_help_link: true
description: >-
  Detailed documentation for Semgrep's Python support. 
hide_title: true
tags:
    - Semgrep Code 
title: Supported languages for Python
---
# Python

:::tip 
Semgrep’s Python coverage leverages framework-specific analysis capabilities that are not present in OSS. As a result, many framework specific Pro rules will **fail** to return findings if run on OSS. To ensure full security coverage, run: `semgrep login && semgrep ci`.
:::

## Semgrep Code: Analysis capabilities for Python
* Framework-specific control flow analysis 
* Inter-file analysis (cross-file)
* Inter-procedural analysis (cross-function)

## Coverage 
_Semgrep's coverage ethos: comprehensive and accurate detection of common, OWASP Top 10 issues in source code_


In addition to rules, the Semgrep engine itself can analyze code and implicit dataflows in the context of the following supported frameworks:

<table>
    <thead><tr>
        <td><strong>Framework / library</strong></td>
        <td><strong>Category</strong></td>
    </tr></thead>
    <tbody>
    <tr>
        <td>Django</td>
        <td>Web framework</td>
    </tr>
    <tr>
        <td>Flask</td>
        <td>Web framework</td>
    </tr>
    <tr>
        <td>FastAPI</td>
        <td>Web framework</td>
    </tr>
    </tbody>
</table>

<details>
  <summary>**In addition, Semgrep Code supports 100+ libraries & frameworks based on their overall popularity.**</summary>

| No  | Library                  | Category                                 |
|----:|:-------------------------|:-----------------------------------------|
|   0 | bcrypt                   | Cryptographic Library                    |
|   1 | cryptography             | Cryptographic Library                    |
|   2 | passlib                  | Cryptographic Library                    |
|   3 | pycrypto                 | Cryptographic Library                    |
|   4 | pycryptodome             | Cryptographic Library                    |
|   5 | pycryptodomex            | Cryptographic Library                    |
|   6 | rsa                      | Cryptographic Library                    |
|   7 | aiomysql                 | Database Library                         |
|   8 | aiopg                    | Database Library                         |
|   9 | aiosqlite                | Database Library                         |
|  10 | django                   | Database Library                         |
|  11 | djangoorm                | Database Library                         |
|  12 | mysql-connector          | Database Library                         |
|  13 | mysqldb                  | Database Library                         |
|  14 | peewee                   | Database Library                         |
|  15 | pep249                   | Database Library                         |
|  16 | ponyorm                  | Database Library                         |
|  17 | psycopg2                 | Database Library                         |
|  18 | pymongo                  | Database Library                         |
|  19 | pymssql                  | Database Library                         |
|  20 | pymysql                  | Database Library                         |
|  21 | pyodbc                   | Database Library                         |
|  22 | sqlalchemy               | Database Library                         |
|  23 | sqlobject                | Database Library                         |
|  24 | dill                     | Deserialization Library                  |
|  25 | joblib                   | Deserialization Library                  |
|  26 | jsonpickle               | Deserialization Library                  |
|  27 | lang                     | Deserialization Library                  |
|  28 | numpy                    | Deserialization Library                  |
|  29 | pandas                   | Deserialization Library                  |
|  30 | pyyaml                   | Deserialization Library                  |
|  31 | ruamel                   | Deserialization Library                  |
|  32 | ruamel.yaml              | Deserialization Library                  |
|  33 | torch                    | Deserialization Library                  |
|  34 | aiofile                  | File System Library                      |
|  35 | django                   | File System Library                      |
|  36 | fileinput                | File System Library                      |
|  37 | fs                       | File System Library                      |
|  38 | io                       | File System Library                      |
|  39 | linecache                | File System Library                      |
|  40 | openpyxl                 | File System Library                      |
|  41 | os                       | File System Library                      |
|  42 | pickleshare              | File System Library                      |
|  43 | pillow                   | File System Library                      |
|  44 | shelve                   | File System Library                      |
|  45 | shutil                   | File System Library                      |
|  46 | stdlib                   | File System Library                      |
|  47 | stdlib2                  | File System Library                      |
|  48 | stdlib3                  | File System Library                      |
|  49 | tempfile                 | File System Library                      |
|  50 | toml                     | File System Library                      |
|  51 | ldap3                    | LDAP Library                             |
|  52 | stdlib                   | Library With Code Execution Capabilities |
|  53 | stdlib2                  | Library With Code Execution Capabilities |
|  54 | stdlib3                  | Library With Code Execution Capabilities |
|  55 | aiohttp                  | Network Library                          |
|  56 | boto3                    | Network Library                          |
|  57 | botocore                 | Network Library                          |
|  58 | httplib2                 | Network Library                          |
|  59 | httpx                    | Network Library                          |
|  60 | paramiko                 | Network Library                          |
|  61 | pycurl                   | Network Library                          |
|  62 | requests                 | Network Library                          |
|  63 | urllib3                  | Network Library                          |
|  64 | commands                 | OS Interaction Library                   |
|  65 | dotenv                   | OS Interaction Library                   |
|  66 | os                       | OS Interaction Library                   |
|  67 | paramiko                 | OS Interaction Library                   |
|  68 | popen2                   | OS Interaction Library                   |
|  69 | stdlib                   | OS Interaction Library                   |
|  70 | stdlib2                  | OS Interaction Library                   |
|  71 | stdlib3                  | OS Interaction Library                   |
|  72 | subprocess               | OS Interaction Library                   |
|  73 | libxml2                  | Regex Library                            |
|  74 | re                       | Regex Library                            |
|  75 | regex                    | Regex Library                            |
|  76 | stdlib                   | Regex Library                            |
|  77 | stdlib2                  | Regex Library                            |
|  78 | stdlib3                  | Regex Library                            |
|  79 | aws-lambda               | Serverless Framework                     |
|  80 | aiohttp                  | Web Framework                            |
|  81 | cherrypy                 | Web Framework                            |
|  82 | django                   | Web Framework                            |
|  83 | django-crispy-forms      | Web Framework                            |
|  84 | django_allauth           | Web Framework                            |
|  85 | django_channels          | Web Framework                            |
|  86 | django_rest_frameworkapi | Web Framework                            |
|  87 | fastapi                  | Web Framework                            |
|  88 | flask                    | Web Framework                            |
|  89 | flask-jwt-extended       | Web Framework                            |
|  90 | flask-login              | Web Framework                            |
|  91 | flask-session            | Web Framework                            |
|  92 | flask-talisman           | Web Framework                            |
|  93 | flask-wtf                | Web Framework                            |
|  94 | lang                     | Web Framework                            |
|  95 | pyramid                  | Web Framework                            |
|  96 | starlette                | Web Framework                            |
|  97 | wtforms                  | Web Framework                            |
|  98 | libxml2                  | XML Parsing Library                      |
|  99 | lxml                     | XML Parsing Library                      |
| 100 | sax                      | XML Parsing Library                      |
| 101 | stdlib                   | XML Parsing Library                      |
| 102 | stdlib2                  | XML Parsing Library                      |
| 103 | stdlib3                  | XML Parsing Library                      |
| 104 | xml                      | XML Parsing Library                      |
| 105 | xml.dom                  | XML Parsing Library                      |
| 106 | xml.dom.minidom          | XML Parsing Library                      |
| 107 | xml.dom.pulldom          | XML Parsing Library                      |
| 108 | xml.etree                | XML Parsing Library                      |
| 109 | xml.sax                  | XML Parsing Library                      |


</details>

### Benchmark results (_exclusive of_ [AI](https://semgrep.dev/docs/semgrep-assistant/overview) processing): 

Our benchmarking process involves scanning open-source repositories, triaging the findings, and making iterative rule updates. This process was developed and is used internally by our security research team to monitor and improve rule performance.

Results as of **September 9, 2024**:

<table>
    <tbody>
    <tr>
        <td>Benchmark true positive rate (before AI processing) for latest ruleset</td>
        <td>**84%**</td>
    </tr>
    <tr>
        <td>Lines of code scanned</td>
        <td>**~20 million**</td>
    </tr>
    <tr>
        <td>Repositories scanned</td>
        <td>**192**</td>
    </tr>
      <tr>
        <td>Findings triaged to date</td>
        <td>**~1000**</td>
    </tr>
    
    </tbody>
</table>
