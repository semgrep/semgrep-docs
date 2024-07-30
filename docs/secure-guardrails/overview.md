---
slug: secure-guardrails-in-semgrep
title: Secure guardrails
hide_title: true
description: Learn about secure guardrails and how to deploy them in Semgrep.
tags:
  - Secure guardrails
---

# Secure guardrails in Semgrep

Secure guardrails guide **developers** towards fixing security issues in the early stages of development. By deploying secure guardrails, you can:

- Prevent issues from merging into production or default branches. This improves security posture and reduces the growth of the vulnerability backlog.
- Reduce the time and cost to address issues—the earlier a vulnerability is detected, the faster it is to fix.

The deployment of secure guardrails maximizes the impact of early detection by providing **specific** and **actionable** remediation guidance to developers. Customization enables you to set the **amount of alerts** that developers receive.

This document defines secure guardrails and presents an overview of the guardrail deployment process in Semgrep.

![Time to fix a true positive vulnerability](/img/guardrails-time-to-fix-monochrome.png#md-width-centered)
_**Figure**. Secure guardrails maximize the potential impact of early detection by  providing tailored remediation guidance to developers. (Chart for illustration purposes only.)_

Secure guardrails consist of:

<dl>
<dt>Content</dt>
<dd>
  The content that identifies, explains, and provides remediation guidance for the security issue, such as the Semgrep rule and Semgrep Assistant (AI) remediation guidance.

  Semgrep uses **rules**, which are instructions that detect patterns in your code, such as security issues, bugs, and more. Semgrep generates and reports **findings** to you whenever it finds code that matches the patterns defined by rules.

  Semgrep rules also include a **message** that guides remediation and provides other metadata about the vulnerability, such as its OWASP category, which are presented to the developer. Further improvements to this guidance are made through Semgrep Assistant.
</dd>
<dt>Interface</dt>
<dd>The developer-native **interface** where the developer can see the content and triage or remediate the finding, such as Visual Studio Code (VS Code), pre-commit on CLI, or GitHub pull request comments. See [all supported interfaces](#support-for-developer-interfaces-pre-build).</dd>
</dl>

![Semgrep products provide the content; the Semgrep web app provides the means to configure developer notifications](/img/guardrails-content-interface.png#md-width-centered)
_**Figure**. Semgrep products provide the content of the guardrail, namely its rules and suggested remediations. The [Semgrep web app](https://semgrep.dev/login) provides the means to configure and deploy guardrails: what rules to deploy as well as where and how to alert developers._

## Qualities of secure guardrails

### Speed

Scans must be quick to successfully integrate into developer workflows without slowing them down.

The following table lists the speed of a Semgrep cross-function scan in relation to the environment the scan is run in:


| Interface | Scope of scan | Typical speed |
| --------- | --------------| ------------- |
| IDE (per keystroke and on save) | Current file | In a few seconds |
| CLI on commit (through [`pre-commit`](https://pre-commit.com/)) | Files staged for commit | Under 5 minutes |
|PR or MR comments | All committed files and changes in the PR or MR | Under 5 minutes |

### Support for developer interfaces (pre-build)

Guardrails should be able to provide remediation guidance and means to triage findings or give feedback within developer interfaces.

Semgrep supports the following interfaces:

<table>
<thead><tr>
    <th>Interface</th>
    <th>Supported providers and apps</th>
    <th>Triage and remediation actions</th>
</tr></thead>
<tbody>
<tr>
    <td rowspan="2">IDEs</td>
    <td>[Visual Studio Code (VS Code)](https://marketplace.visualstudio.com/items?itemName=Semgrep.semgrep)</td>
    <td rowspan="2">
    <ul><li>Receive human-written remediation guidance.</li>
    <li>Ignore or apply a [1-click autofix](/writing-rules/autofix), if it is available, to findings individually.</li></ul>
    </td>
</tr>
<tr>
    <td>[IntelliJ-based IDEs](https://plugins.jetbrains.com/plugin/22622-semgrep)</td>
</tr>
<tr>
    <td rowspan="4">PR or MR comments</td>
    <td>[All GitHub plans](/semgrep-appsec-platform/github-pr-comments)</td>
    <td rowspan="4">
    <ul><li>Receive human-written and Semgrep Assistant remediation guidance\*; you can customize the confidence level at which the AI leaves a comment.</li>
    <li>Ignore or apply a [1-click autofix](/writing-rules/autofix), if it is available, to findings individually.</li></ul>
    </td>
</tr>
<tr>
    <td>[All GitLab plans](/semgrep-appsec-platform/gitlab-mr-comments)</td>
</tr>
<tr>
    <td>[All Bitbucket plans](/semgrep-appsec-platform/bitbucket-pr-comments)</td>
</tr>
<tr>
    <td>[Azure Devops Cloud](/semgrep-appsec-platform/azure-pr-comments)</td>
</tr>
<tr>
    <td>CLI through <code>pre-commit</code></td>
    <td>Most terminal emulator apps</td>
    <td>
    <ul><li>Receive human-written remediation guidance.</li>
    <li>Ignore or apply [a 1-click autofix](/writing-rules/autofix), if it is available, to findings individually.</li></ul>
    </td>
</tr>
</tbody>
</table>

_\*To receive Assistant guidance, check that your source code manager (SCM) is supported: [list of supported source code managers (SCMs)](/semgrep-assistant/overview#support-and-availability)._

![Semgrep remediation guidance in VS Code](/img/guardrails-ide-quickfix.png#md-width-centered) <br />
![Semgrep remediation guidance in VS Code > Quick fix menu](/img/guardrails-ide-fix.png#md-width-centered)
_**Figure**. Remediation message provided in VS Code. The message appears when a user hovers over findings, which are marked with squiggly lines. Developers can click the **Quick Fix** button to either ignore the finding or, if the rule provides an autofix, apply the fix._


![A PR comment detecting a hardcoded secret](/img/guardrails-secrets.png#bordered)
_**Figure**. A PR comment detecting a hardcoded secret._

### Customizability

Every organization has its own secure coding practices. Customizability ensures that the tool can adapt to the unique needs of an organization.

Semgrep provides customizability through:

- Custom rules - You can create custom rules and deploy them as guardrails. Learn more about Semgrep rule structure in [the next section](#remediation-guidance).
- Assistant Memories - this feature allows you to add and save additional context when Semgrep Assistant provides remediation. For example, you can provide organization-specific public keys, which Semgrep Assistant remembers.

![Assistant Memories form within a finding's details page](/img/guardrails-memories.png#md-width-centered)
_**Figure**. A form on a finding's details page where you can enter additional instructions or context._

### Remediation guidance

Remediation guidance can come in three forms:

- The rule's `message`
- AI-generated remediation guidance through Semgrep Assistant
- The rule's `fix`

Much of the remediation guidance originates from the rule itself, which is also used to generate Semgrep Assistant's advice. Learning the basic Semgrep rule structure can help you customize remediation for developers in the future, or write and deploy guardrails of your own.

The following example illustrates a basic Semgrep rule.

<iframe title="Semgrep example for message, fix, and basic metadata fields" src="https://semgrep.dev/embed/editor?snippet=Abrx2" width="100%" height="432px" frameBorder="0"></iframe>
_**Figure**. A simple Semgrep rule that illustrates the common fields or keys used to create guardrails. Scroll through the **Rule** pane to view all the fields used to define the rule._

<details>
<summary>Click to view a line-by-line explanation of each field in the sample rule.</summary>

```yaml
rules:
  # The name of the rule (required):
  - id: fix-and-message-demo-copy
    # The language of the target code (required):
    languages:
      - python
    # How severe the impact of the finding is (required):
    severity: ERROR
    # Description and advice that appears in the IDE,
    # PR or MR comment, or CLI (required):
    message: >-
      You're using an unsafe function.
      Prefer safe_function() if possible.
    # The matching logic of the rule (required):
    pattern: unsafe_function(...)
    # A substitution that resolves the finding (optional).
    fix: safe_function(...)
    # Metadata is optional but helpful to AI-generated remediation.
    metadata:
      # A category that describes the rule. Typically security:
      category: security
      # Confidence of the rule to detect true positives:
      confidence: HIGH
      # How likely an attacker can exploit the issue:
      likelihood: HIGH
      # Indicates how much damage a vulnerability can cause:
      impact: HIGH
      # A sub-type under category. Typically vuln, audit, or secure default:
      subcategory:
        - vuln
```

</details>

#### The rule `message`

This description explains **why** the finding was generated and outlines **general advice** on resolving the issue. Messages notify developers in all interfaces where you've deployed a guardrail.

#### AI-generated remediation guidance and code suggestions (Semgrep Assistant)

This is a tailored, **step-by-step** outline of what a developer must change to fix the insecure code.
The guidance makes use of the Semgrep rule, AI's understanding of code, and a prompt tree that incorporates inputs such as:

- Prior triage decisions
- Custom instructions
- Broader context of the file

![Semgrep PR comment with detailed remediation steps](/img/guardrails-comment-step-by-step.png#md-width-centered)
_**Figure**. AI-generated guidance. Developers are able to commit the suggestion directly._

:::info
- Within developer-native interfaces, Semgrep Assistant only appears in PR or MR comments. Assistant guidance does not appear in the IDE or `pre-commit`.
- You can adjust when the guidance is shown to developers based on the level of confidence in the guidance.
:::

#### The rule's human-written autofix (`fix`)

Sometimes a rule can resolve a finding by replacing, for example, an insecure function with a secure one. These rules make use of Semgrep's [autofix](/writing-rules/autofix) feature, which enables rule-writers to provide a human-written fix.

Semgrep Assistant does **not** provide a code snippet suggestion when a human-written fix is provided in the rule.

## Deploy secure guardrails

### Prerequisites

#### For AppSec engineers

- You have completed a [Semgrep core deployment](/deployment/core-deployment).
- Your [Policies](https://semgrep.dev/orgs/-/policies) page should have at least one rule.

#### For developers

- You must have a Semgrep account.
- You must have joined your Semgrep organization.
- To use Semgrep with your IDE, you must install the extension for the IDE and sign in to Semgrep through the extension.
- To use Semgrep with `pre-commit`, you must install and set up `pre-commit`, then sign in to Semgrep through the CLI.

Rules can be **configured on a per-product, per-interface basis** to notify developers when a finding from that rule is detected. The customization enables you to manage the amount of notifications a developer may receive. The following table describes how to deploy guardrails for each product and interface:

<table>
<thead><tr>
    <th>Interface</th>
    <th>Semgrep Code</th>
    <th>Semgrep Secrets</th>
    <th>Semgrep Supply Chain</th>
</tr></thead>
<tbody>
<tr>
<td>IDE</td>
<td colspan="2" >To notify developers of findings from a rule, add the rule to your Policies.</td>
<td>Coming soon</td>
</tr>
<tr>
<td>PR or MR comments</td>
<td colspan="2">To notify developers, a rule must be in Comment mode; you can configure your Policies to include only <strong>high confidence, high severity rules</strong>.</td>
<td>Developers receive comments about any <strong>reachable vulnerability of high or critical severity.</strong></td>
</tr>
<tr>
<td>CLI through <code>pre-commit</code></td>
<td colspan="2">To notify developers of findings from a rule, add the rule to your Policies.</td>
<td>Developers are notified of **all** findings by default.</td>
</tr>
</tbody>
</table>

![Policies page > Code tab](/img/guardrails-policies.png#bordered)
_**Figure**. Policies page > Code tab. Rules should be in either Comment or Block mode to leave a PR or MR comment._

## Next steps

- Learn about [secure defaults and their implementation in Semgrep](/secure-guardrails/secure-defaults).
- Create custom rules that you can [deploy as guardrails](/secure-guardrails/custom-guardrails-rules).
