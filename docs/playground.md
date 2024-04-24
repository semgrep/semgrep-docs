---
slug: playground
append_help_link: true
title: Semgrep Playground
description: "Semgrep Playground is a beginner-friendly environment for creating your first rules."
hide_title: true

---

import MoreHelp from "/src/components/MoreHelp"
import EnableTurboMode from "/src/components/procedure/_enable-turbo-mode.md"

# Create and manage rules with Semgrep Playground

Semgrep Playground is a live editor used to create and test rule patterns on sample code. By testing rule patterns on sample code, you can quickly assess a rule's purpose, utility, and speed and save it for later refinement, reuse, or sharing.

Semgrep Playground is composed of three panes and a top menu.

![Screenshot of default playground view](/img/playground-editor.png "Default playground view")

<dl>
    <dt>Library</dt>
    <dd>View and open rules owned by your organization or available through the <a href="https://semgrep.dev/r">Semgrep Registry</a>. You must be <a href="https://semgrep.dev/login">signed in to Semgrep</a> to view these rules.</dd>
    <dt>Rule editor</dt>
    <dd>Enter your rule's YAML schema in this pane. This pane supports both simple and advanced modes.</dd>
    <dt>Sample code</dt>
    <dd>Enter test code in this pane and click <strong>Run</strong> to verify that the rule performs as intended. A matches panel appears after Semgrep runs to display matches and tests. This pane also contains metadata editing and docs viewing functionalities.</dd>
    <dt>Top menu</dt>
    <dd>Save, share, and add your rule to one of your policies.</dd>
</dl>

<!-- 
Commenting this out because 1) this doc is long enough as it is and 2) I don't think we need to walk people through basic UI stuff

To resize the panes, position your mouse over the borders and drag to the desired width. You can hide the **Library** pane to give more space for the editing panes.
-->

## Create rules

Semgrep Playground offers two modes to create rules:

<dl>
    <dt>Simple mode</dt>
    <dd>Simple mode is ideal for quick and simple pattern-matching use cases, but it doesn't display all Semgrep operators.</dd>
    <dt>Advanced mode</dt>
    <dd>Advanced mode provides the minimum required YAML keys for a Semgrep rule. To complete the rule, you must fill in additional keys, such as pattern operators or metadata.</dd>
</dl>

### Write rules using simple mode

To **create a rule** in simple mode:

1. Ensure that you are in **simple** mode.
    ![Semgrep Playground's simple view](/img/pleditor-simple.png)
2. Select a language from the **Language is** drop-down box to specify the language your code is in.
3. In the field after **code is**, enter a rule pattern.
4. Optional: Click the **plus** button to add fields for additional operators. For each additional operator:
   1. Select the pattern operator
   2. Enter the pattern.
5. Optional: Click **Metadata** to update and enter additional metadata fields.
   [Metadata view](/img/rule-metadata.png)
6. Click **Run** or press <kbd>Ctrl</kbd>+<kbd>Enter</kbd> (<kbd>⌘</kbd>+<kbd>Enter</kbd> on Mac).

Simple mode provides you with the most common pattern-matching operators in Semgrep. You can select these operators using the provided drop-down menus. The following table lists the operators available and their corresponding keys in the rule:

| **Key** | **Drop-down menu option** |
| - | - |
| `language` | Language is |
| `pattern` | Code is |
| `pattern-either` | or is |
| `pattern-inside` | and is inside |
| `pattern-not` | and is not |
| `pattern-not-inside` | and is not inside |
| `pattern-regex` | and matches regex |
| `autofix` | and autofix is |

<!--
* `language`
* `pattern`
* `pattern-either`
* `pattern-inside`
* `pattern-not`
* `pattern-not-inside`
* `pattern-regex`
* `autofix`
-->

#### Limitations of simple mode

1. Simple mode supports the use of only **one language** per rule.
2. Simple mode doesn't include support for the following operators:
   * `pattern-not-regex`
   * `metavariable-regex`
   * `metavariable-pattern`
   * `metavariable-comparison`
3. Simple mode doesn't support:
   * Join mode
   * Taint mode

### Write rules using advanced mode

Advanced mode is a YAML editor that allows you to write rules using [Semgrep syntax](../writing-rules/rule-syntax/).

To create a rule in advanced mode:

1. Ensure that you are in **advanced** mode.
    ![Semgrep Playground's advanced mode](/img/pleditor-advanced.png "Playground advanced mode")
1. Click the **plus sign** and select a template.
2. Modify the template, adding and changing the keys and values needed to finish your rule.
3. Click **Run** or press <kbd>Ctrl</kbd>+<kbd>Enter</kbd> (<kbd>⌘</kbd>+<kbd>Enter</kbd> on Mac).

While the **New rule** template includes the minimum keys required for a Semgrep rule, there are additional templates that can help you write more complex rules:

* Semgrep Assistant: use Semgrep Assistant to [generate custom rules](/semgrep-assistant/getting-started/#write-custom-rules-beta)
* Metavariable-comparison: demonstrates how to use [the `metavariable-comparison` key](/writing-rules/rule-syntax/#metavariable-comparison)
* Metavariable-pattern: demonstrates how to use [the `metavariable-pattern` key](/writing-rules/rule-syntax/#metavariable-pattern)
* Dataflow analysis: demonstrates how to leverage dataflow analysis through [`pattern-sources`](/writing-rules/data-flow/taint-mode/#sources), [`pattern-sinks`](/writing-rules/data-flow/taint-mode/#sinks), and [`pattern-sanitizers`](/writing-rules/data-flow/taint-mode/#sanitizers).
* Dataflow analysis with taint labels: demonstrates [how to define the sources you want to track and how data must flow](/writing-rules/data-flow/taint-mode/#taint-labels-pro-)
* HTTP validators: Demonstrates how to [Semgrep Secrets rules](/semgrep-secrets/rules/) that include [validators](/semgrep-secrets/validators/)

## Run and test rules

After you write a rule, testing it ensures it performs as expected. In addition to testing for matches, you can test that it does not match what it shouldn't, preventing false positives. To do so, you can [create comment annotations for intended and unintended findings](/writing-rules/testing-rules/) in **test code**.

Once you've written a rule and created comment annotations, you can run your rule against your comment annotations by clicking **Run**. You can also press <kbd>Ctrl</kbd>+<kbd>Enter</kbd> (<kbd>⌘</kbd>+<kbd>Enter</kbd> on Mac).

### Turbo mode

<EnableTurboMode />

## Semgrep Registry rules

[Semgrep Registry](https://semgrep.dev/explore/) is an open-source, community-driven repository of rules. These rules can detect OWASP vulnerabilities, best practice violations, and security issues for various languages and frameworks. You can fork an existing rule to use as a starting point for writing your own.

To access the Semgrep Registry directly from the Playground, you must sign in to your [Semgrep account](https://semgrep.dev/login?return_path=/playground/).

### Write new rules based on existing rules

One way to create new rules is to fork an existing rule in Semgrep Registry and modify it to meet your software and business requirements. 

For example, Semgrep’s Java `crypto` ruleset prohibits the use of weak hashing algorithms `SHA-1` and `MD5`. However, your organization s the use of other hash functions as part of its standards or security compliance. The following steps illustrate the process of forking an existing `use-of-sha1` rule and changing it to forbid MD2 hashes.

1. Use the search bar to find relevant rules. For this example, you can search for rules using `SHA1`.
   ![Library pane with SHA-1 filter](/img/editor-SHA1.png)
2. Under **java > lang > security > audit > crypto**, click **use-of-sha1** to load the rule. You cannot directly edit the rules in Semgrep Registry, so click **Fork** to make a copy.
   ![Default rule ready to be copied](/img/editor-forking.png)
   Alternatively, you can right-click the rule's name and select **Fork rule**.
3. Semgrep copies the rule to your organization's set of rules.
4. Edit the rule.
5. Update your test cases.
6. Click **Run** to test and validate your rule.
7. When you finish your changes, click **Save**.

The following example shows how [the original rule, identifying uses of `SHA-1` and `MD5`, has been modified to find uses of MD2](https://docs.oracle.com/javase/9/docs/specs/security/standard-names.html#messagedigest-algorithms) and the severity of such findings is increased from `WARNING` to `ERROR`.

<iframe title="Prevent use of MD2" src="https://semgrep.dev/embed/editor?snippet=RDxN" width="100%" height="432px" frameBorder="0"></iframe>

## Add rules to the Policies page

The **[Policies](/semgrep-code/policies/)** page displays rules that Semgrep Cloud Platform uses to scan your project's code. Rules added to the **Policies** page become part of every Semgrep scan you run.

When adding a rule to your **Policies** page, you must also set the **rule mode** that determines what actions Semgrep performs when that rule generates a finding. See [Policies](/semgrep-code/policies/#blocking-a-pr-or-mr-through-rule-modes) for more information on each rule mode.

To add a rule to the **Policies** page:

1. Ensure you're [signed in to Semgrep](https://semgrep.dev/login).
2. Click **Add to Policy**.
3. Select one of the following rule mode options based on the relevance of the rule: **Monitor mode**, **Comment mode**, or **Block mode**.

If successful, you'll see a pop-up window indicating that your rule has been added.

## Embed a rule in your site

The Embedded Playground is an interactive editor that you can embed in an external web page, such as a blog post, to display Semgrep's rules in action. The Embedded Playground features a rule pane and space for test code. Both panes are editable, allowing viewers to try the Semgrep rule out for themselves or to change parts of the rule.

To embed a rule:

1. In the **Playground**, click **Share**.
2. Copy the **URL**.
3. In the following snippet, replace `src="URL_REFERENCE"` with the **URL** you just copied:
    ```html
    <iframe title="Semgrep example no prints" src="URL_REFERENCE" width="100%" height="432" frameborder="0"></iframe>
    ```

The rendered iFrame example looks as follows:

<iframe title="Semgrep example no prints" src="https://semgrep.dev/embed/editor?snippet=java.lang.security.audit.crypto.use-of-sha1.use-of-sha1" width="100%" height="432" frameborder="0"></iframe>

## Further resources

* [Semgrep Registry](https://semgrep.dev/explore)
* Learn about [writing rules form Semgrep](/writing-rules/overview/)
* [Troubleshoot rules that don't perform as expected](/troubleshooting/rules)

<MoreHelp />
