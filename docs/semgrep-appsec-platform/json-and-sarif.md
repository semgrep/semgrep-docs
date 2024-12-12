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

## JSON

### Top-level fields

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
