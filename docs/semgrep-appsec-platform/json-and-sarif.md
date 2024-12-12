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

For fields that are exclusive to Semgrep AppSec Platform, you must [<i class="fas fa-external-link fa-xs"></i> log in](https://semgrep.dev/login) to generate values for those fields.

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
<td><code>skipped_rules</code></td>
<td>✅</td>
<td>✅</td>
</tr>
<tr>
<td><code>version</code></td>
<td>✅</td>
<td>✅</td>
</tr>
<tr>
<td><code>results</code></td>
<td colspan="2">See [`results` object](#results-object)</td>
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
<tbody><tr>
<td><code>engine_kind</code></td>
<td>✅</td>
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
<tbody><tr>
<td><code>fingerprint</code></td>
<td>❌</td>
<td>✅</td>
</tr>
<tr>
<td><code>is_ignored</code></td>
<td>❌</td>
<td>✅</td>
</tr>
<tr>
<td><code>references</code></td>
<td>✅</td>
<td>✅</td>
</tr>
<tr>
<td><code>owasp</code></td>
<td>✅</td>
<td>✅</td>
</tr>
<tr>
<td><code>cwe</code></td>
<td>✅</td>
<td>✅</td>
</tr>
<tr>
<td><code>metavars</code></td>
<td>❌</td>
<td>✅</td>
</tr>
<tr>
<td><code>message</code></td>
<td>✅</td>
<td>✅</td>
</tr>
<tr>
<td><code>severity</code></td>
<td>✅</td>
<td>✅</td>
</tr>
<tr>
<td><code>validation_state</code></td>
<td>✅</td>
<td>✅</td>
</tr>
</tbody></table>
