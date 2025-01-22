
## Semgrep Code and Community Edition

Semgrep CE is a fast, lightweight program analysis tool that can help you detect bugs in your code. It makes use of Semgrep's LGPL 2.1 open source engine. These languages are supported by the Semgrep community, at best effort.

Semgrep Code is a static application security testing (SAST) solution designed to detect complex security vulnerabilities. It makes use of proprietary Semgrep analyses, such as cross-file (interfile) dataflow analysis and framework specific analyses, in addition to Semgrep CE. This results in a [**higher true positive rate than Semgrep CE**](/semgrep-pro-vs-oss). Semgrep Code provides the highest quality support by the Semgrep team: reported issues are resolved promptly.

Use either tool to scan local code or integrate it into your CI/CD pipeline to automate the continuous scanning of your repositories.

<div class="language-support-table">

<table>
    <thead><tr>
        <td><strong>Languages</strong></td>
        <td><strong>🚀 Semgrep Code:</strong> <a href="">Free for small teams</a></td>
        <td><strong>Semgrep CE</strong></td>
    </tr></thead>
    <tbody>
    <tr>
      <td>C / C++</td>
      <td><strong>Generally available</strong><br />
         • Cross-file dataflow analysis<br />
         • 150+ Pro rules </td>
      <td> Community supported <br />
         • Limited to single-function analysis<br />
         • Community rules </td>
    </tr>
    <tr>
      <td>C#</td>
      <td><strong>Generally available </strong><br />
         • Cross-file dataflow analysis<br />
         • Supports up to C# 13 (latest)<br />
         • 40+ Pro rules </td>
      <td> Community supported <br />
         • Limited to single-function analysis<br />
         • Community rules <br />
         • Supports up to C# 7.0</td>
    </tr>
    <tr>
      <td>Go</td>
      <td><strong>Generally available</strong><br />
         • Cross-file dataflow analysis<br />
         • 60+ Pro rules </td>
      <td rowspan='13'> Community supported <br />
         • Limited to single-function analysis<br />
         • Community rules </td>
    </tr>
    <tr>
      <td>Java</td>
      <td><strong>Generally available</strong><br />
         • Cross-file dataflow analysis<br />
         • Framework-specific control flow analysis<br />
         • 160+ Pro rules </td>
    </tr>
    <tr>
      <td>JavaScript</td>
      <td><strong>Generally available</strong><br />
         • Cross-file dataflow analysis<br />
         • Framework-specific control flow analysis<br />
         • 70+ Pro rules</td>
    </tr>
    <tr>
      <td>Kotlin</td>
      <td><strong>Generally available </strong><br />
         • Cross-file dataflow analysis<br />
         • 60+ Pro rules</td>
    </tr>
    <tr>
      <td>[Python](/docs/semgrep-code/supported-languages-python)</td>
      <td><strong>Generally available</strong><br />
         • Cross-file dataflow analysis<br />
         • Framework-specific control flow analysis<br />
         • 300+ Pro rules<br />
         • See [Python-specific support details](/docs/semgrep-code/supported-languages-python)</td>
    </tr>
    <tr>
      <td>Typescript</td>
      <td><strong>Generally available </strong><br />
         • Cross-file dataflow analysis<br />
         • Framework-specific control flow analysis<br />
         • 70+ Pro rules</td>
    </tr>
    <tr>
      <td>Ruby</td>
      <td><strong>Generally available </strong><br />
         • Cross-function dataflow analysis<br />
         • 20+ Pro rules</td>
    </tr>
     <tr>
      <td>Rust</td>
      <td><strong>Generally available </strong><br />
         • Cross-function dataflow analysis<br />
         • 40+ Pro rules</td>
    </tr>
    <tr>
      <td>JSX</td>
      <td><strong>Generally available </strong><br />
         • Cross-function dataflow analysis<br />
         • 70+ Pro rules</td>
    </tr>
    <tr>
      <td>PHP</td>
      <td><strong>Generally available </strong><br />
         • Cross-function dataflow analysis<br />
         • 20+ Pro rules</td>
    </tr>
     <tr>
      <td>Scala</td>
      <td><strong>Generally available </strong><br />
         • Cross-function dataflow analysis<br />
         • Community rules</td>
    </tr>
    <tr>
      <td>Swift</td>
      <td><strong>Generally available </strong><br />
         • Cross-function dataflow analysis<br />
         • 50+ Pro rules</td>
    </tr>
    <tr>
      <td>Terraform</td>
      <td><strong>Generally available</strong><br />
         • Cross-function dataflow analysis<br />
         • Community rules</td>
    </tr>
    <tr>
      <td>Generic</td>
      <td><strong>Generally available </strong></td>
      <td rowspan='2'>Community supported</td>
    </tr>
    <tr>
      <td>JSON</td>
      <td><strong>Generally available </strong></td>
    </tr>
    <tr>
      <td>APEX</td>
      <td><strong>Beta</strong></td>
      <td rowspan='2'>Not available</td>
    </tr>
    <tr>
      <td>Elixir</td>
      <td><strong>Beta</strong></td>
    </tr>
   </tbody>
</table>


<details>
 <summary>Click to view experimental languages.</summary>
- Bash
- Cairo
- Circom
- Clojure
- Dart
- Dockerfile
- Hack
- HTML
- Jsonnet
- Julia
- Lisp
- Lua
- Move on Aptos
- Move on Sui
- OCaml
- R
- Scheme
- Solidity
- YAML
- XML
</details>

</div>

<!--  For readability, please keep each column in alphabetical order. -->
