---
slug: playground
append_help_link: true
title: Semgrep Playground
description: "Semgrep Playground is a beginner-friendly environment for creating your first rules."
hide_title: true

---

import MoreHelp from "/src/components/MoreHelp"
import EnableTurboMode from "/src/components/procedure/_enable-turbo-mode.md"

# Creating and managing rules with Semgrep Playground

Semgrep Playground is a live editor used to create and test rule patterns on sample code. By testing rule patterns on sample code, you are able to quickly assess the purpose, utility, and speed of a rule as well as save it for later refinement, reuse, or sharing.

The Playground is composed of three panes and a top menu.

![Screenshot of default playground view](/img/playground-editor.png "Default playground view")

<dl>
    <dt>Library</dt>
    <dd>View and open various rules through the library. You must be signed in to view your saved rules and access the Registry.</dd>
    <dt>Rule editor</dt>
    <dd>Enter your rule's YAML schema in this pane. This pane supports both a simple and advanced view.</dd>
    <dt>Sample code</dt>
    <dd>Enter test code in this pane and click the <strong>Run button</strong> to verify that the rule performs as intended. A matches panel appears after Semgrep is run to display matches and tests. This pane also contains metadata editing and docs viewing functionalities.</dd>
    <dt>Top menu</dt>
    <dd>Save, share, and add your rule to the Rule Board through this menu.</dd>
</dl>

To resize the panes, position your mouse over the borders and drag to the desired width. You can hide the entire library pane to give more space for the editing panes.

## Creating a rule

Use two modes to create a rule:

<dl>
    <dt>Simple mode</dt>
    <dd>Simple mode is best for quick and simple pattern-matching use cases, but does not display all Semgrep operators.</dd>
    <dt>Advanced mode</dt>
    <dd>Advanced mode provides the minimum required YAML keys for a Semgrep rule. To complete the rule, advanced mode requires users to fill in additional keys such as pattern operators or metadata.</dd>
</dl>

### Learning Semgrep basics through simple mode

Simple mode provides the **most common pattern-matching operators in Semgrep**.


The following **keys** are supported in this mode as drop-down boxes:

* `language`
* `pattern`
* `pattern-either`
* `pattern-inside`
* `pattern-not`
* `pattern-not-inside`
* `pattern-regex`
* `autofix`


#### Limitations of simple mode

Simple mode has the following limitations:

* Supports only **one language** per rule.

* Does **not** include support for the following operators:

    * `pattern-not-regex`
    * `metavariable-regex`
    * `metavariable-pattern`
    * `metavariable-comparison`

* Does **not** support the following modes:

    * Join mode
    * Taint mode

To **create a rule** in simple mode:

1. Ensure that you are in **Simple mode**:
![Screenshot of the simple view](/img/pleditor-simple.png "Playground simple mode")
2. Click **File > New** to start from a blank slate.
3. Select a language from the **language is** drop-down box to specify a language in which the test code is written.
4. After the **code is** button, enter the rule pattern.
5. Optional: Click on the **plus** button to add fields for additional operators. Select the pattern operator and enter the pattern.
6. Optional: Click on **Rule metadata** tab on the **Sample code** pane to enter additional metadata fields.
7. Click **Run** or press <kbd>Ctrl</kbd>+<kbd>Enter</kbd> (<kbd>⌘</kbd>+<kbd>Enter</kbd> on Mac).


<EnableTurboMode />

### Writing complex rules using advanced mode

Advanced mode is a YAML editor for writing a rule **using any valid key from the Semgrep [schema](../writing-rules/rule-syntax/)**. Advanced mode provides default values for the required keys for a Semgrep rule definition and expects the user to modify and add keys to finish the rule.

To create a rule in advanced mode:

1. Ensure that you are in the **Advanced mode**.
![Screenshot of the advanced view](/img/pleditor-advanced.png "Playground advanced mode")
2. Enter the keys and values needed to finish your rule.
3. Click **Run** or press <kbd>Ctrl</kbd>+<kbd>Enter</kbd> (<kbd>⌘</kbd>+<kbd>Enter</kbd> on Mac).

## Running and testing a rule for precision

**Testing a rule** ensures that it meets your standards for precision and speed. Aside from running a rule in the Playground, it is possible to test a rule by creating comment annotations for intended and unintended findings (matches). You can achieve this by creating assertions within the test pane.

Refer to [Testing rules](../writing-rules/testing-rules) for the syntax and method to run test files.

### Debugging errors when creating a rule

Common errors are syntax or match issues.

#### The pattern can't be parsed for the language

Check that the **Language is** value and **Test code** language match. Use full AST elements for the language. For example:

* In Java, Python's ``print`` command is not a valid element.
* ``1+`` or ``if $X:`` are not valid patterns because they are not full AST elements.

#### The pattern syntax is invalid

Check your metavariable definitions, and use of operators. Metavariables must be uppercase letters preceded by a dollar sign $, such as `$PAYMENT_OUTPUT` or `$X`. Refer to [Pattern syntax](../writing-rules/pattern-syntax/).


#### The YAML syntax is unparsable in the advanced view

Check for spelling and indentation issues. The key names must match [Semgrep's schema](../writing-rules/rule-syntax/).

#### The rule does not behave as expected or does not find the desired match

File a [bug](https://github.com/returntocorp/semgrep/issues/new?title=semgrep.dev%20bug%20report) or reach out through [Semgrep Community Slack](https://go.semgrep.dev/slack).

## Exploring rules through Semgrep Registry

[Semgrep Registry](https://semgrep.dev/explore/) is an open-source, community-driven repository of rules. These rules can detect OWASP vulnerabilities, best practice violations, and security issues for a wide variety of languages and frameworks. These rules can be used as a starting point for writing your own custom rules by creating a forked rule.

[Signing in to Semgrep Cloud Platform](https://semgrep.dev/login?return_path=/playground/) enables you to access the Registry directly from the Playground's Library pane.

### Jumpstart rule writing using existing rules

Another method of creating rules is by **forking** or **copying** from existing rules found in Semgrep Registry. For example, Semgrep’s Java `crypto` ruleset prohibits the use of weak hashing algorithms `SHA-1` and `MD5`. An organization can further limit the use of other hash functions as part of its standards or security compliance. The next steps illustrate forking through copying an existing `use-of-sha1` rule and changing the rule to forbid MD2 hashes.

1. Enter related terms into the search bar to find potential rules. In our example, this is `SHA1.` <div class="bordered">
![Screenshot of Library pane with SHA1 filter](/img/editor-SHA1.png)</div>
2. Registry rules cannot be edited directly. They can be **forked** by **right-clicking on their entry** in the Library and selecting **Fork rule.** <div class = "bordered">
![Screenshot of forking menu](/img/editor-forking.png) </div>
3. The rule is copied to your organization’s rules.
4. Enter edits to finalize your rule. In this example, the patterns are changed to find matches for [MD2](https://docs.oracle.com/javase/9/docs/specs/security/standard-names.html#messagedigest-algorithms) and the severity is increased from `WARNING` to `ERROR`.
5. Enter updates to test cases.
6. Click **Run** to validate your rule.
7. Click **Save** to save your rule. The following rule displays the end result.

<iframe title="Prevent use of MD2" src="https://semgrep.dev/embed/editor?snippet=KxU5pW" width="100%" height="432px" frameBorder="0"></iframe>

## Setting code standards by adding a rule to the Rule Board

The [Rule Board](/semgrep-code/rule-board/) displays rules that Semgrep Cloud Platform uses to scan your project's code. Adding a rule to the Rule Board allows you to quickly set a rule as part of every Semgrep scan. A rule on the Rule Board is represented as a card and can be placed on either the Audit Board or the Block board depending on the importance of the rule. Rules can be dragged from one column to another.

To add a rule to the Rule Board:

1. Ensure that you are signed in.
2. Click **Add to Rule Board**.
3. Select either the **Monitor**, **Comment**, or **Block** board based on the importance of the rule. Findings for rules on the Block board prevent PR merges within a CI environment. Findings for rules on the Comment board leave comments within the PR or MR.

## Embedding a rule in your site

The **Embedded Playground** is an interactive editor which can be embedded in an external domain or web page such as a blog post. It is a means to display Semgrep's rules in action.

The Embedded Playground has two panes:

<dl>
    <dt>Rule Pane</dt>
    <dd>This displays the rule data. The rule must have a <strong>reference</strong> (either a short identifier or saved name) from Semgrep Playground.</dd>
    <dt>Test Code</dt>
    <dd>This displays the code that the rule will act upon. On the bottom right is the Run button, which will run the rule on the test code.</dd>
</dl>

Both panes are editable, allowing viewers to try the Semgrep rule out for themselves or to change parts of the rule.

:::info Prerequisite
A site or page with sufficient editing permissions for you to embed the rule.
:::

To embed a rule:

1. In the Playground, click **Share**.
2. Copy the **identifier**. This comes in two patterns:
    1. For signed-in users: `[username]:[rule-name]`, such as `ievans:print-to-logger`
    2. For anonymous users: `[4-letter permalink]`, such as **dZkP**
3. Create the **URL reference**. Substitute the identifier in this template: `https://semgrep.dev/embed/editor?snippet=IDENTIFIER`. For example, using the identifier `ievans:print-to-logger` creates `https://semgrep.dev/embed/editor?snippet=ievans:print-to-logger`.
4. Optional: To test the URL reference, enter the URL in your browser's address bar.
![Screenshot of the embedded Playground in its own tab](/img/playground-widget.png "Embedded playground in its own tab")
5. In the following snippet, replace the `src="URL_REFERENCE"` placeholder value with the previously-created **URL reference**:
    ```html
    <iframe title="Semgrep example no prints" src="URL_REFERENCE" width="100%" height="432" frameborder="0"></iframe>
    ```

    The rendered iframe example:

    ```html
    <iframe title="Semgrep example no prints" src="https://semgrep.dev/embed/editor?snippet=ievans:print-to-logger" width="100%" height="432" frameborder="0"></iframe>
    ```

<MoreHelp />
