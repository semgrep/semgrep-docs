---
slug: json-and-sarif
title: JSON and SARIF fields
hide_title: true
description: tk
tags:
  - Semgrep AppSec Platform
---

# Semgrep JSON and SARIF fields

This reference provides all Semgrep fields for JSON and SARIF output.

For fields that are exclusive to Semgrep AppSec Platform, you must [<i class="fas fa-external-link fa-xs"></i> sign in](https://semgrep.dev/login) to generate values for those fields.

## JSON

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


### `results` object

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

### `extra` object

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
<td><code>lines</code></td>
<td>✅</td>
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

### `metadata` object

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

## SARIF


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

### `runs` object
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
<td>❌</td>
<td>✅</td>
</tr>
<tr>
<td><code>semanticVersion</code></td>
<td>✅</td>
<td>✅</td>
</tr>
</tbody></table>


### `results` object

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
