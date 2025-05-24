---
slug: json-and-sarif
title: JSON and SARIF fields
hide_title: true
description: Reference for all Semgrep JSON and SARIF export fields.
tags:
  - Semgrep AppSec Platform
toc_max_heading_level: 4
---

# Semgrep JSON and SARIF fields

This reference provides all Semgrep fields for JSON and SARIF output.

For fields that are exclusive to Semgrep AppSec Platform, you must [<i class="fas fa-external-link fa-xs"></i> sign in](https://semgrep.dev/login) to generate values for those fields.

## Semgrep Code

### Simplified schema

```json
{
  "check_id": "STRING",
  "path": "STRING",
  "start": 
  {
    "line": NUMBER,
    "col": NUMBER,
    "offset": NUMBER
  },
  "end": {
    "line": 18,
    "col": 82,
    "offset": 373
  },
  "extra": {
    "metavars": {
      "$SHELL": {
        "start": {
          "line": 18,
          "col": 14,
          "offset": 305
        },
        "end": {
          "line": 18,
          "col": 82,
          "offset": 373
        },
        "abstract_content": "echo \"was the box ticked? ${BOX_TICKED}! (${{ inputs.box_ticked }})\""
      }
    },
    "message": "Using variable interpolation `${{...}}` with `github` context data in a `run:` step could allow an attacker to inject their own code into the runner. This would allow them to steal secrets and code. `github` context data can have arbitrary user input and should be treated as untrusted. Instead, use an intermediate environment variable with `env:` to store the data and use the environment variable in the `run:` script. Be sure to use double-quotes the environment variable, like this: \"$ENVVAR\".",
    "metadata": {
      "category": "security",
      "cwe": [
        "CWE-78: Improper Neutralization of Special Elements used in an OS Command ('OS Command Injection')"
      ],
      "owasp": [
        "A01:2017 - Injection",
        "A03:2021 - Injection"
      ],
      "references": [
        "https://docs.github.com/en/actions/learn-github-actions/security-hardening-for-github-actions#understanding-the-risk-of-script-injections",
        "https://securitylab.github.com/research/github-actions-untrusted-input/"
      ],
      "technology": [
        "github-actions"
      ],
      "cwe2022-top25": true,
      "cwe2021-top25": true,
      "subcategory": [
        "vuln"
      ],
      "likelihood": "HIGH",
      "impact": "HIGH",
      "confidence": "HIGH",
      "license": "Semgrep Rules License v1.0. For more details, visit semgrep.dev/legal/rules-license",
      "vulnerability_class": [
        "Command Injection"
      ],
      "source": "https://semgrep.dev/r/yaml.github-actions.security.run-shell-injection.run-shell-injection",
      "shortlink": "https://sg.run/pkzk",
      "semgrep.dev": {
        "rule": {
          "origin": "community",
          "r_id": 13162,
          "rule_id": "v8UjQj",
          "rv_id": 1025998,
          "url": "https://semgrep.dev/playground/r/QkT0Wyp/yaml.github-actions.security.run-shell-injection.run-shell-injection",
          "version_id": "QkT0Wyp"
        }
      },
      "dev.semgrep.actions": [
        "comment"
      ],
      "semgrep.policy": {
        "id": 38225,
        "name": "Rule Board - PR Comments column",
        "slug": "rule-board-pr-comments"
      },
      "semgrep.url": "https://semgrep.dev/r/yaml.github-actions.security.run-shell-injection.run-shell-injection"
    },
    "severity": "ERROR",
    "fingerprint": "ed184f570e121fd62774716df70aa1826ee41f2fc2e5b4e05565faae6797e9102d4512eb849eb33dc660c40e8c55bcb61a920253adca21de706e1833f9208295_0",
    "lines": "      - run: echo \"was the box ticked? ${BOX_TICKED}! (${{ inputs.box_ticked }})\"",
    "is_ignored": false,
    "validation_state": "NO_VALIDATOR",
    "engine_kind": "PRO"
  }
}
```

### JSON

<table>
<thead>
<tr>
<th>Field</th>
<th>Semgrep CE</th>
<th>Semgrep AppSec Platform</th>
</tr>
</thead>
<tbody><tr>
<td><code>errors</code></td>
<td>✅</td>
<td>✅</td>
</tr>
<tr>
<td><code>interfile_languages_used</code></td>
<td>❌</td>
<td>✅</td>
</tr>
<tr>
<td><code>paths</code></td>
<td>✅</td>
<td>✅</td>
</tr>
<tr>
<td><code>results</code></td>
<td colspan="2">See [`results` object](#results-object)</td>
</tr>
<tr>
<td><code>skipped_rules</code></td>
<td>✅</td>
<td>✅</td>
</tr>
<tr>
<td><code>version</code></td>
<td>✅</td>
<td>✅</td>
</tr>
</tbody></table>

#### `results` object

<table>
<thead>
<tr>
<th>Field</th>
<th>Semgrep CE</th>
<th>Semgrep AppSec Platform</th>
</tr>
</thead>
<tbody><tr>
<td><code>check_id</code></td>
<td>✅</td>
<td>✅</td>
</tr>
<tr>
<td><code>end</code></td>
<td>✅</td>
<td>✅</td>
</tr>
<tr>
<td><code>extra</code></td>
<td colspan="2">See [`extra` object](#extra-object)</td>
</tr>
<tr>
<td><code>skipped_rules</code></td>
<td>✅</td>
<td>✅</td>
</tr>
<tr>
<td><code>start</code></td>
<td>✅</td>
<td>✅</td>
</tr>
<tr>
<td><code>paths</code></td>
<td>✅</td>
<td>✅</td>
</tr>
</tbody></table>

#### `extra` object

<table>
<thead>
<tr>
<th>Field</th>
<th>Semgrep CE</th>
<th>Semgrep AppSec Platform</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>engine_kind</code></td>
<td>✅</td>
<td>✅</td>
</tr>
<tr>
<td><code>fingerprint</code></td>
<td>❌</td>
<td>✅</td>
</tr>
<tr>
<td><code>fix</code></td>
<td>✅</td>
<td>✅</td>
</tr>
<tr>
<td><code>is_ignored</code></td>
<td>❌</td>
<td>✅</td>
</tr>
<tr>
<td><code>lines</code><strong>*</strong></td>
<td>❌</td>
<td>✅</td>
</tr>
<tr>
<td><code>message</code></td>
<td>✅</td>
<td>✅</td>
</tr>
<tr>
<td><code>metadata</code></td>
<td colspan="2">See [`metadata` object](#metadata-object)</td>
</tr>
<tr>
<td><code>metavars</code></td>
<td>❌</td>
<td>✅</td>
</tr>
<tr>
<td><code>severity</code></td>
<td>✅</td>
<td>✅</td>
</tr>
<tr>
<td><code>validation_state</code>(for Secrets scans only)</td>
<td>✅</td>
<td>✅</td>
</tr>
</tbody></table>

_*<strong>`lines`</strong> refers to the **text** of the matched lines, not the line numbers themselves. See the [`results` object](#results-object) to view line numbers._

#### `metadata` object

<table>
<thead>
<tr>
<th>Field</th>
<th>Semgrep CE</th>
<th>Semgrep AppSec Platform</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>category</code></td>
<td>✅</td>
<td>✅</td>
</tr>
<tr>
<td><code>confidence</code></td>
<td>✅</td>
<td>✅</td>
</tr>
<tr>
<td><code>cwe</code></td>
<td>✅</td>
<td>✅</td>
</tr>
<tr>
<td><code>impact</code></td>
<td>✅</td>
<td>✅</td>
</tr>
<tr>
<td><code>license</code></td>
<td>✅</td>
<td>✅</td>
</tr>
<tr>
<td><code>likelihood</code></td>
<td>✅</td>
<td>✅</td>
</tr>
<tr>
<td><code>owasp</code></td>
<td>✅</td>
<td>✅</td>
</tr>
<tr>
<td><code>references</code></td>
<td>✅</td>
<td>✅</td>
</tr>
<tr>
<td><code>semgrep.dev</code></td>
<td>❌</td>
<td>✅</td>
</tr>
<tr>
<td><code>semgrep.policy</code></td>
<td>❌</td>
<td>✅</td>
</tr>
<tr>
<td><code>shortlink</code></td>
<td>✅</td>
<td>✅</td>
</tr>
<tr>
<td><code>source</code></td>
<td>✅</td>
<td>✅</td>
</tr>
<tr>
<td><code>subcategory</code></td>
<td>✅</td>
<td>✅</td>
</tr>
<tr>
<td><code>technology</code></td>
<td>✅</td>
<td>✅</td>
</tr>
<tr>
<td><code>vulnerability_class</code></td>
<td>✅</td>
<td>✅</td>
</tr>
</tbody></table>

### SARIF

<table>
<thead>
<tr>
<th>Field</th>
<th>Semgrep CE</th>
<th>Semgrep AppSec Platform</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>$schema</code></td>
<td>✅</td>
<td>✅</td>
</tr>
<tr>
<td><code>runs</code></td>
<td colspan="2">See [`runs` object](#runs-object)</td>
</tr>
<tr>
<td><code>version</code></td>
<td>✅</td>
<td>✅</td>
</tr>
</tbody></table>

#### `runs` object
<table>
<thead>
<tr>
<th>Field</th>
<th>Semgrep CE</th>
<th>Semgrep AppSec Platform</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>invocations</code></td>
<td>✅</td>
<td>✅</td>
</tr>
<tr>
<td><code>results</code></td>
<td colspan="2">See [`results` object](#results-object-1)</td>
</tr>
<tr>
<td><code>rules</code></td>
<td>✅</td>
<td>✅</td>
</tr>
<tr>
<td><code>semanticVersion</code></td>
<td>✅</td>
<td>✅</td>
</tr>
</tbody></table>


#### `results` object

<table>
<thead>
<tr>
<th>Field</th>
<th>Semgrep CE</th>
<th>Semgrep AppSec Platform</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>fingerprints</code></td>
<td>❌</td>
<td>✅</td>
</tr>
<tr>
<td><code>locations</code></td>
<td>✅</td>
<td>✅</td>
</tr>
<tr>
<td><code>message</code></td>
<td>✅</td>
<td>✅</td>
</tr>
<tr>
<td><code>properties</code></td>
<td>✅</td>
<td>✅</td>
</tr>
<tr>
<td><code>ruleId</code></td>
<td>✅</td>
<td>✅</td>
</tr>
</tbody></table>

## Semgrep Supply Chain

:::info
Semgrep Supply Chain fields are available only through Semgrep AppSec Platform.
:::

See the following schema snippet for a general structure of a Semgrep Supply Chain SARIF file.

```json
{
    "version":"2.1.0",
    "runs": [{
        "invocations": [
        {
            "executionSuccessful":true,
            "toolExecutionNotifications":[]
        }
    ],
    "results":[
    {
        "fingerprints":
        {
            "matchBasedId/v1": "..."
        },
        "locations":[{
            "physicalLocation":{
                "artifactLocation":{
                    "uri":"go.mod",
                    "uriBaseId":"%SRCROOT%"
                },
                "region":{
                    "endColumn":1,
                    "endLine":6,
                    "snippet":{
                        "text":"\tgithub.com/gin-gonic/gin v1.6.3 // indirect"
                    },
                    "startColumn":1,
                    "startLine":6
                }
            }
        }],
        "message":{
            "text":"Affected versions of github.com/gin-gonic/gin are vulnerable to..."
        },
        "properties":{
            "exposure":"undetermined"
        },
        "ruleId":"ssc-parity-xxx"
    },
```
