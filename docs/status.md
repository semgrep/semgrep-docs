---
template: stats-template.html
title: Semgrep Supported Languages
description: |-
  <p>The level of support in Semgrep for a language consists of:
  <ul>
  <li>what percentage of valid code in the language can be parsed</li>
  <li>what percentage of valid Semgrep patterns for that language perform as expected</li>
  </ul>
  </p>
  
  <p>We take a data-driven approach to promoting new languages from beta to alpha to generally available (GA). Parse rates are calculated and updated daily. The parse rates below are based on a large set of open-source repositories and are also used to validate Semgrep’s performance.</p>
  
  <p>Semgrep parses source code using <a href="https://github.com/returntocorp/pfff/" target="_blank" rel="noopener">pfff</a>, a set of tools and APIs to perform static analysis, code visualizations, code navigations, or style-preserving source-to-source transformations such as refactorings on source code, and <a href="https://tree-sitter.github.io/tree-sitter/" target="_blank" rel="noopener">Tree-sitter</a>, a parser generator tool and an incremental parsing library.
  </p>
---

<div class="languages-table">
  <h2>Language Status</h2>
  <iframe width="550" height="725" border=0 frameBorder=0 src="https://dashboard.semgrep.dev/languages/table"></iframe>
</div>
<br/>

<div class="lang-container">
  <h2>Go Parse Rate</h2>
  <iframe width="450" height="150" frameBorder="0" src="https://dashboard.semgrep.dev/metric/semgrep.core.go.parse.pct/number"></iframe>
</div>

<div class="lang-container">
  <h2>Java Parse Rate</h2>
  <iframe width="450" height="150" frameBorder="0" src="https://dashboard.semgrep.dev/metric/semgrep.core.java.parse.pct/number"></iframe>
</div>

<div class="lang-container">
  <h2>JavaScript Parse Rate</h2>
  <iframe width="450" height="150" frameBorder="0" src="https://dashboard.semgrep.dev/metric/semgrep.core.javascript.parse.pct/number"></iframe>
</div>

<div class="lang-container">
  <h2>Ruby Parse Rate</h2>
  <iframe width="450" height="150" frameBorder="0" src="https://dashboard.semgrep.dev/metric/semgrep.core.ruby.parse.pct/number"></iframe>
</div>

<div class="lang-container">
  <h2>TypeScript Parse Rate</h2>
  <iframe width="450" height="150" frameBorder="0" src="https://dashboard.semgrep.dev/metric/semgrep.core.typescript.parse.pct/number"></iframe>
</div>

<div class="lang-container">
  <h2>TSX Parse Rate</h2>
  <iframe width="450" height="150" frameBorder="0" src="https://dashboard.semgrep.dev/metric/semgrep.core.tsx.parse.pct/number"></iframe>
</div>
