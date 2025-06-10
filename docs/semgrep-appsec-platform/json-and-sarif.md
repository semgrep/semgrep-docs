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

This reference provides Semgrep fields for JSON and SARIF output.

For fields that are exclusive to Semgrep AppSec Platform, you must [<i class="fas fa-external-link fa-xs"></i> sign in](https://semgrep.dev/login) to generate values for those fields.

## Semgrep Code

### JSON

#### JSON top-level fields

These tables provide a **partial** overview of the fields available to Semgrep CE and Semgrep AppSec Platform. Refer to the sample schema for all the fields. 

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

#### JSON example output
 
The following snippet is a JSON output example with all the fields for Semgrep Code.

```json
{
  "check_id": "yaml.github-actions.security.run-shell-injection.run-shell-injection",
  "path": "STRING",
  "start": 
  {
    "line": 18,
    "col": 9,
    "offset": 300
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
      "shortlink": "https://sg.run/11zk",
      "semgrep.dev": {
        "rule": {
          "origin": "community",
          "r_id": 13162,
          "rule_id": "v8UQj2",
          "rv_id": 1025108,
          "url": "https://semgrep.dev/playground/r/akTViyp/yaml.github-actions.security.run-shell-injection.run-shell-injection",
          "version_id": "akTViyp"
        }
      },
      "dev.semgrep.actions": [
        "comment"
      ],
      "semgrep.policy": {
        "id": 91181987,
        "name": "Rule Board - PR Comments column",
        "slug": "rule-board-pr-comments"
      },
      "semgrep.url": "https://semgrep.dev/r/yaml.github-actions.security.run-shell-injection.run-shell-injection"
    },
    "severity": "ERROR",
    "fingerprint": "...",
    "lines": "      - run: echo \"was the box ticked? ${BOX_TICKED}! (${{ inputs.box_ticked }})\"",
    "is_ignored": false,
    "validation_state": "NO_VALIDATOR",
    "engine_kind": "PRO"
  }
}
```

### SARIF

#### SARIF top-level fields

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

#### SARIF example output

The following snippet is a SARIF output example with all the fields for Semgrep Code.

```json
{
  "version": "2.1.0",
  "runs": [
    {
      "invocations": [
        {
          "executionSuccessful": true,
          "toolExecutionNotifications": []
        }
      ],
      "results": [
        {
          "fingerprints": {
            "matchBasedId/v1": "..."
          },
          "fixes": [
            {
              "artifactChanges": [
                {
                  "artifactLocation": {
                    "uri": "Dockerfile"
                  },
                  "replacements": [
                    {
                      "deletedRegion": {
                        "endColumn": 15,
                        "endLine": 39,
                        "startColumn": 1,
                        "startLine": 39
                      },
                      "insertedContent": {
                        "text": "USER non-root\nCMD [\"./main\"]"
                      }
                    }
                  ]
                }
              ],
              "description": {
                "text": "By not specifying a USER, a program in the container may run as 'root'. This is a security hazard. If an attacker can control a process running as root, they may have control over the container. Ensure that the last USER in a Dockerfile is a USER other than 'root'.\n Autofix: Semgrep rule suggested fix"
              }
            }
          ],
          "locations": [
            {
              "physicalLocation": {
                "artifactLocation": {
                  "uri": "Dockerfile",
                  "uriBaseId": "%SRCROOT%"
                },
                "region": {
                  "endColumn": 15,
                  "endLine": 39,
                  "snippet": {
                    "text": "CMD [\"./main\"]"
                  },
                  "startColumn": 1,
                  "startLine": 39
                }
              }
            }
          ],
        }
      ],
      "tool": {
        "driver": {
          "name": "Semgrep OSS",
          "rules": [
            {
              "defaultConfiguration": {
                "level": "error"
              },
              "fullDescription": {
                "text": "By not specifying a USER, a program in the container may run as 'root'. This is a security hazard. If an attacker can control a process running as root, they may have control over the container. Ensure that the last USER in a Dockerfile is a USER other than 'root'."
              },
              "help": {
                "markdown": "By not specifying a USER, a program in the container may run as 'root'. This is a security hazard. If an attacker can control a process running as root, they may have control over the container. Ensure that the last USER in a Dockerfile is a USER other than 'root'.\n\n<b>References:</b>\n - [Semgrep Rule](https://semgrep.dev/r/dockerfile.security.missing-user.missing-user)\n - [https://owasp.org/Top10/A04_2021-Insecure_Design](https://owasp.org/Top10/A04_2021-Insecure_Design)\n",
                "text": "By not specifying a USER, a program in the container may run as 'root'. This is a security hazard. If an attacker can control a process running as root, they may have control over the container. Ensure that the last USER in a Dockerfile is a USER other than 'root'."
              },
              "helpUri": "https://semgrep.dev/r/dockerfile.security.missing-user.missing-user",
              "id": "dockerfile.security.missing-user.missing-user",
              "name": "dockerfile.security.missing-user.missing-user",
              "properties": {
                "precision": "very-high",
                "tags": [
                  "CWE-250: Execution with Unnecessary Privileges",
                  "MEDIUM CONFIDENCE",
                  "OWASP-A04:2021 - Insecure Design",
                  "rule-board-pr-comments",
                  "security"
                ]
              },
              "shortDescription": {
                "text": "Semgrep Finding: dockerfile.security.missing-user.missing-user"
              }
            }
          ],
          "semanticVersion": "1.122.0"
        }
      }
    }
  ],
  "$schema": "https://docs.oasis-open.org/sarif/sarif/v2.1.0/os/schemas/sarif-schema-2.1.0.json"
}
```

## Semgrep Supply Chain

:::info
You must log in to Semgrep to scan with Semgrep Supply Chain.
:::

### JSON

#### JSON example output

The following snippet is a JSON output example with all the fields for Semgrep Supply Chain.

```json
{
  "version": "1.122.0",
  "results": [
    {
      "check_id": "ssc-parity-0ddf890152a281f12fd6d01c3953da8d88ce2e7b",
      "path": "go.mod",
      "start": {
        "line": 6,
        "col": 1,
        "offset": 0
      },
      "end": {
        "line": 6,
        "col": 1,
        "offset": 0
      },
      "extra": {
        "metavars": {},
        "message": "Affected versions of github.com/gin-gonic/gin are vulnerable to Download of Code Without Integrity Check.",
        "metadata": {
          "confidence": "LOW",
          "category": "security",
          "cve": "CVE-2023-29401",
          "cwe": [
            "CWE-494: Download of Code Without Integrity Check"
          ],
          "ghsa": "GHSA-2c4m-59x9-fr2g",
          "owasp": [
            "A06:2021 - Vulnerable and Outdated Components",
            "A08:2021 - Software and Data Integrity Failures"
          ],
          "publish-date": "2023-05-12T20:19:25Z",
          "references": [
            "https://github.com/advisories/GHSA-2c4m-59x9-fr2g",
            "https://nvd.nist.gov/vuln/detail/CVE-2023-29401"
          ],
          "sca-fix-versions": [
            {
              "github.com/gin-gonic/gin": "1.9.1"
            }
          ],
          "sca-kind": "legacy",
          "sca-schema": 20230302,
          "sca-severity": "MODERATE",
          "sca-vuln-database-identifier": "CVE-2023-29401",
          "technology": [
            "go"
          ],
          "license": "Semgrep Rules License v1.0. For more details, visit semgrep.dev/legal/rules-license",
          "vulnerability_class": [
            "Cryptographic Issues"
          ],
          "semgrep.dev": {
            "rule": {
              "r_id": 109470,
              "rv_id": 953164,
              "rule_id": "4bURlK3",
              "version_id": "w8TKlRo",
              "url": "https://semgrep.dev/orgs/-/supply-chain/advisories?q=ssc-parity-0ddf890152a281f12fd6d01c3953da8d88ce2e7b",
              "origin": "custom",
              "rule_name": "ssc-parity-0ddf890152a281f12fd6d01c3953da8d88ce2e7b"
            },
            "src": "unchanged"
          },
          "source": "https://semgrep.dev/orgs/-/supply-chain/advisories?q=ssc-parity-0ddf890152a281f12fd6d01c3953da8d88ce2e7b",
          "semgrep.url": "https://semgrep.dev/orgs/-/supply-chain/advisories?q=ssc-parity-0ddf890152a281f12fd6d01c3953da8d88ce2e7b",
          "dev.semgrep.actions": []
        },
        "severity": "WARNING",
        "fingerprint": "...",
        "lines": "\tgithub.com/gin-gonic/gin v1.6.3 // indirect",
        "is_ignored": false,
        "sca_info": {
          "reachability_rule": false,
          "sca_finding_schema": 20220913,
          "dependency_match": {
            "dependency_pattern": {
              "ecosystem": "gomod",
              "package": "github.com/gin-gonic/gin",
              "semver_range": ">=1.3.1-0.20190301021747-ccb9e902956d, <1.9.1"
            },
            "found_dependency": {
              "package": "github.com/gin-gonic/gin",
              "version": "1.6.3",
              "ecosystem": "gomod",
              "allowed_hashes": {},
              "resolved_url": "github.com/gin-gonic/gin",
              "transitivity": "transitive",
              "manifest_path": "go.mod",
              "lockfile_path": "go.mod",
              "line_number": 6
            },
            "lockfile": "go.mod"
          },
          "reachable": false
        },
        "engine_kind": "OSS"
      }
    }
  ],
  "errors": [],
  "paths": {
    "scanned": [
      "go.mod"
    ]
  },
  "interfile_languages_used": [],
  "skipped_rules": []
}
```

### SARIF

#### SARIF example output

The following snippet is a SARIF output example with all the fields for Semgrep Supply Chain.

```json
{
  "version": "2.1.0",
  "runs": [
    {
      "invocations": [
        {
          "executionSuccessful": true,
          "toolExecutionNotifications": []
        }
      ],
      "results": [
        {
          "fingerprints": {
            "matchBasedId/v1": "..."
          },
          "locations": [
            {
              "physicalLocation": {
                "artifactLocation": {
                  "uri": "go.mod",
                  "uriBaseId": "%SRCROOT%"
                },
                "region": {
                  "endColumn": 1,
                  "endLine": 6,
                  "snippet": {
                    "text": "\tgithub.com/gin-gonic/gin v1.6.3 // indirect"
                  },
                  "startColumn": 1,
                  "startLine": 6
                }
              }
            }
          ],
          "message": {
            "text": "Affected versions of github.com/gin-gonic/gin are vulnerable to Download of Code Without Integrity Check."
          },
          "properties": {
            "exposure": "undetermined"
          },
          "ruleId": "ssc-parity-0ddf890152a281f12fd6d01c3953da8d88ce2e7b"
        },
      ],
      "tool": {
        "driver": {
          "name": "Semgrep OSS",
          "rules": [
            {
              "defaultConfiguration": {
                "level": "warning"
              },
              "fullDescription": {
                "text": "Affected versions of github.com/gin-gonic/gin are vulnerable to Download of Code Without Integrity Check."
              },
              "help": {
                "markdown": "Affected versions of github.com/gin-gonic/gin are vulnerable to Download of Code Without Integrity Check.\n\n<b>References:</b>\n - [Semgrep Rule](https://semgrep.dev/orgs/-/supply-chain/advisories?q=ssc-parity-0ddf890152a281f12fd6d01c3953da8d88ce2e7b)\n - [https://github.com/advisories/GHSA-2c4m-59x9-fr2g](https://github.com/advisories/GHSA-2c4m-59x9-fr2g)\n - [https://nvd.nist.gov/vuln/detail/CVE-2023-29401](https://nvd.nist.gov/vuln/detail/CVE-2023-29401)\n",
                "text": "Affected versions of github.com/gin-gonic/gin are vulnerable to Download of Code Without Integrity Check."
              },
              "helpUri": "https://semgrep.dev/orgs/-/supply-chain/advisories?q=ssc-parity-0ddf890152a281f12fd6d01c3953da8d88ce2e7b",
              "id": "ssc-parity-0ddf890152a281f12fd6d01c3953da8d88ce2e7b",
              "name": "ssc-parity-0ddf890152a281f12fd6d01c3953da8d88ce2e7b",
              "properties": {
                "precision": "very-high",
                "tags": [
                  "CWE-494: Download of Code Without Integrity Check",
                  "LOW CONFIDENCE",
                  "OWASP-A06:2021 - Vulnerable and Outdated Components",
                  "OWASP-A08:2021 - Software and Data Integrity Failures",
                  "security"
                ]
              },
              "shortDescription": {
                "text": "Semgrep Finding: ssc-parity-0ddf890152a281f12fd6d01c3953da8d88ce2e7b"
              }
            },
          ],
          "semanticVersion": "1.122.0"
        }
      }
    }
  ],
  "$schema": "https://docs.oasis-open.org/sarif/sarif/v2.1.0/os/schemas/sarif-schema-2.1.0.json"
}
```
