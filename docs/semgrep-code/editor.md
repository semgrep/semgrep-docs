---
slug: editor
append_help_link: true
title: Write custom rules
hide_title: true
toc_max_heading_level: 2
tags:
    - Semgrep Code
    - Semgrep AppSec Platform
description: "Semgrep Editor is a powerful tool within Semgrep AppSec Platform to write rules and quickly apply these rules across an organization to enforce coding standards across an organization."
---

import EnableTurboMode from "/src/components/procedure/_enable-turbo-mode.md"
import DeleteCustomRule from "/src/components/procedure/_delete-custom-rule.mdx"
import InstallPrivateGitHubApp from "/src/components/procedure/_install-private-github-app.mdx"

# Write rules using Semgrep Editor

![Semgrep Editor's splash screen](/img/editor-splashscreen.png)

**Semgrep Editor** allows you to write rules, verify their performance through tests, and add them to your organization’s [Policies page](/semgrep-code/policies) to enforce code standards and increase code security.

The Editor is free to use on all subscription tiers.

## Access Semgrep Editor

1. Sign in to your [Semgrep AppSec Platform account](https://semgrep.dev/login).
2. Click **Rules > Editor**.
3. Do any of the following steps:
    1. To create a new rule, click on the <i class="fa-solid fa-circle-plus"></i> **(+) plus sign** or <i class="fa-solid fa-file-plus"></i> **Create new rule** button.
    2. To open any rule you’ve recently edited, select it from the **Recent** list.
    3. To view a sample rule, select it from the **Examples** list. The rule renders within the Editor.
    4. To start a tutorial or read the docs, select it from the **Learn** list. This navigates you away from the Editor.

## View a rule

Semgrep Editor is composed of three panes and a top menu.

![Semgrep Editor's main view composed of three panes and top menu](/img/editor-panes.png)

<dl>
    <dt>Library</dt>
    <dd>View and open rules owned by your organization or available through the <a href="https://semgrep.dev/r">Semgrep Registry</a>.</dd>
    <dt>Rule editor</dt>
    <dd>Enter your rule's YAML in this pane. This pane supports both structure and advanced modes.  This pane also contains metadata editing functionality in Structure mode, and match review functionality in Advanced mode.</dd>
    <dt>Sample code</dt>
    <dd>Enter test code in this pane and click <strong>Run</strong> to verify that the rule performs as intended. A matches panel appears after Semgrep runs to display matches and tests.</dd>
    <dt>Top menu</dt>
    <dd>Save, share, and add your rule to one of your policies.</dd>
</dl>

### Group Registry rules

By default, Semgrep Registry rules are grouped by **directory**. Most of these directories correspond to languages. The Library can also be grouped by **rulesets**, which are rules sorted by category, such as security, best practices, and frameworks.

To group by ruleset, right-click on the empty space on the registry's name entry and select **Group by ruleset**.

![Semgrep Editor's right click menu to group by rulesets](/img/editor-groupbyruleset.png)

## Create a rule

To create a rule, click **Create rule** on the splash page or the **(+) sign** next to the Library label.

Semgrep Editor offers two rule-writing modes:

<dl>
    <dt>Structure mode (beta)</dt>
    <dd>Structure mode is a hybrid interface that offers guidance for rule writing while supporting additional features the way advanced mode does.</dd>
    <dt>Advanced mode</dt>
    <dd>Advanced mode provides the minimum required YAML keys for a Semgrep rule. To complete the rule, you must fill in additional keys, such as pattern operators or metadata.</dd>
</dl>

### Write a rule using structure mode (beta)

Structure mode is a UI-based ruled writing editor that guides you through the process of writing a rule.

Structure mode features include:

- **Match badges**: Match badges are visual indicators paired with pattern operators. The match badge shows the number of matches associated with each pattern operator.
  ![Sample pattern with match badges](/img/match-badges.png#md-width)
- **Automatic indentation**: When adding a new pattern to a nested operator such as `patterns` or `pattern-either`, the editor automatically indents sub-patterns correctly.
- **Differentiation between patterns and pattern constraints**: A pattern is one of six different operators that describes zero or more locations in a rule. These include `pattern`, `any`, `all`, `inside`, `regex`, and `not`. You can combine these in prescribed ways, such as `any` and `all`, using range union and intersection, but they still define ranges. Pattern constraints describe Boolean constrains that must be met for a match to occur. If the constraint doesn't hold, then the ranges determined by the pattern operators aren't applicable.
  ![Sample pattern with pattern constraint](/img/pattern-and-pattern-constraint.png#md-width)
- **Interoperability with advanced mode**: You can write a rule using structure mode and view or export it in YAML, or you can paste in the YAML for a rule and edit it with structure mode.
- **Drag and drop**" You can move around the elements of a rule using drag and drop.
- **Pattern disabling**: You can toggle individual patterns on or off for actions like testing.
  ![Sample pattern with disable pattern toggle highlighted](/img/disable-pattern.png#md-width)

To write a **search** rule using structure mode:

1. Ensure that you are in **structure** mode.
    ![Semgrep Playground's structure mode](/img/pleditor-structure.png)
2. Select your first operator. Options include: `pattern`, `any`, `all`, `inside`, `regex`.
3. Specify the pattern if applicable. Example: `print("...")`.
4. Optional: specify a constraint by clicking on the **filter** icon.
   1. Specify whether the constraint is `focus`, `comparison`, or `metavariable`.
   2. Provide the pattern for the code for which the constraint should be applied.
5. Select the child operator and specify its pattern, if applicable. You can add as many child elements as you need. These child elements can also have their own constraints.
6. Optional: Expand the **Rule info** panel, and update the following fields:
   1. Rule ID: the name of the rule
   2. Language: the language of the code for which this rule runs against
   3. Severity: the severity level of the finding if this rule generates a match
   4. Message: the message to print with the finding if this rule generates a match
7. Click **Run** or press <kbd>Ctrl</kbd>+<kbd>Enter</kbd> (<kbd>⌘</kbd>+<kbd>Enter</kbd> on Mac).

To write a **taint** rule using structure mode:

1. Ensure that you are in **structure** mode. and that you have selected **taint**.
    ![Semgrep Playground's structure view for writing taint rules](/img/structure-mode-taint.png)
2. Define your **Sources**.
   1. Select your first operator. Options include: `pattern`, `any`, `all`, `inside`, `regex`.
   2. Specify the pattern if applicable. Example: `print("...")`.
   3. Optional: specify a constraint by clicking on the **filter** icon.
      1. Specify whether the constraint is `focus`, `comparison`, or `metavariable`.
      2. Provide the pattern for the code for which the constraint should be applied.
3. Define your **Sinks**.
   1. Select your first operator. Options include: `pattern`, `any`, `all`, `inside`, `regex`.
   2. Specify the pattern if applicable. Example: `print("...")`.
   3. Optional: specify a constraint by clicking on the **filter** icon.
      1. Specify whether the constraint is `focus`, `comparison`, or `metavariable`.
      2. Provide the pattern for the code for which the constraint should be applied.
4. Add **Sanitizers**.
      1. Select your first operator. Options include: `pattern`, `any`, `all`, `inside`, `regex`.
      2. Specify the pattern if applicable. Example: `print("...")`.
      3. Optional: specify a constraint by clicking on the **filter** icon.
         1. Specify whether the constraint is `focus`, `comparison`, or `metavariable`.
         2. Provide the pattern for the code for which the constraint should be applied.
5. Optional: Expand the **Rule info** panel, and update the following fields:
   1. Rule ID: the name of the rule
   2. Language: the language of the code for which this rule runs against
   3. Severity: the severity level of the finding if this rule generates a match
   4. Message: the message to print with the finding if this rule generates a match
6. Click **Run** or press <kbd>Ctrl</kbd>+<kbd>Enter</kbd> (<kbd>⌘</kbd>+<kbd>Enter</kbd> on Mac).

### Write a rule using advanced mode

Advanced mode is a YAML editor that allows you to write rules using [Semgrep syntax](../writing-rules/rule-syntax/).

:::info Rules syntax
Refer to [Rule syntax](/writing-rules/rule-syntax) for all possible fields and values to create a rule.

To quickly learn Semgrep patterns and syntax, explore the Editor’s library of rules from the **public [Rule Registry](https://semgrep.dev/explore)**. Rules from the Registry can detect OWASP vulnerabilities, best practice violations, and security issues for a wide variety of languages and frameworks. Semgrep Editor enables you to **adapt these rules** for your own organization’s use by [forking](#write-a-new-rule-by-forking-an-existing-rule) them.
:::

To write a rule in advanced mode:

1. Ensure that you are in **advanced** mode.
    ![Semgrep Playground's advanced mode](/img/pleditor-advanced.png "Playground advanced mode")
1. Click the **plus sign** and select a template. The **New rule** template includes the minimum keys required for a Semgrep rule, but there are additional templates that can help you write more complex rules:
   - **Semgrep Assistant**: use Semgrep Assistant to [generate custom rules](/semgrep-assistant/getting-started/#write-custom-rules-beta)
   - **Metavariable-comparison**: demonstrates how to use [the `metavariable-comparison` key](/writing-rules/rule-syntax/#metavariable-comparison)
   - **Metavariable-pattern**: demonstrates how to use [the `metavariable-pattern` key](/writing-rules/rule-syntax/#metavariable-pattern)
   - **Dataflow analysis**: demonstrates how to leverage dataflow analysis through [`pattern-sources`](/writing-rules/data-flow/taint-mode/#sources), [`pattern-sinks`](/writing-rules/data-flow/taint-mode/#sinks), and [`pattern-sanitizers`](/writing-rules/data-flow/taint-mode/#sanitizers).
   - **Dataflow analysis with taint labels**: demonstrates [how to define the sources you want to track and how data must flow](/writing-rules/data-flow/taint-mode/#taint-labels-pro-)
   - **HTTP validators**: Demonstrates how to write [Semgrep Secrets rules](/semgrep-secrets/rules/) that include [validators](/semgrep-secrets/validators/)
2. Modify the template, adding and changing the keys and values needed to finish your rule.
3. Optional: Click **Metadata** to update and enter additional metadata fields.
4. Click **Run** or press <kbd>Ctrl</kbd>+<kbd>Enter</kbd> (<kbd>⌘</kbd>+<kbd>Enter</kbd> on Mac).

:::warning Syntax issues
Semgrep Editor won't save or run your rule if it can't parse the YAML syntax of your rule. Fix any issues indicated by the red annotations before proceeding.
:::

## Run and test a rule

After you write a rule, testing it ensures it performs as expected. To test a rule:

1. Create at least one **true positive**: a code sample intended to match the rule.
2. Above this potential match, create a comment, followed by a space (` `), followed by `ruleid:RULE_ID` which specifies the rule that should match. In the preceding example, this is `// ruleid:hardcoded-conditional`.
3. Create at least one **true negative**: a code sample intended not to match the rule.
4. Above this non-match, create a comment followed by a space (` `), followed by `ok:RULE_ID`. For example, `// ok:hardcoded-conditional`.
5. Optional: add more code samples with their corresponding annotations.
6. Click **Run**. Semgrep detects the annotations and validates the rule based on your tests.

In addition to testing for matches, you can test that your rule doesn't match what it shouldn't, preventing false positives. To do so, you can [create comment annotations for intended and unintended findings](/writing-rules/testing-rules/) in **test code**.

Once you've written a rule and created comment annotations, you can run your rule against your comment annotations by clicking **Run**. You can also press <kbd>Ctrl</kbd>+<kbd>Enter</kbd> (<kbd>⌘</kbd>+<kbd>Enter</kbd> on Mac).

### Turbo mode (beta)

<EnableTurboMode />

## Code search (beta)

Code search allows you to test a Semgrep rule by running it against one or more GitHub repositories or projects instead of just a few lines of test code. Its results highlight all instances of matching code in those target repositories, allowing you to see whether your rule works as intended or not. This rapid feedback can help you develop more accurate and effective rules.

![Code search in Semgrep Editor](/img/code-search.png)
***Figure.*** Code search in Semgrep Editor

### Prerequisites

* Code search is currently available to all paying customers of Semgrep Code.
* You must grant Semgrep code access by [installing the private Semgrep GitHub app](#install-the-private-semgrep-github-app-to-enable-code-access) if you would like to run code search against your repositories. Otherwise, you can run code search against public repositories. 

#### Install the private Semgrep GitHub app to enable code access

<InstallPrivateGitHubApp />

:::info
Code search currently works with repositories or projects hosted by Github.com.
:::

To run your rule against selected repositories or projects:

1. Sign in to [Semgrep AppSec Platform](https://semgrep.dev/login).
2. Go to **Rules > Editor**, and open up the rule you want to test.
3. In the **code panel** click **live code**.
4. Select the repositories against which you want the rule to run. You can use the search bar to narrow down the list of repositories shown. Semgrep currently supports both public repositories and private repositories available to your Semgrep organization. 
5. Optional: If you're running your rule against multiple repositories, select the **Limit to first result per repository** checkbox to see only the first result per repository. This speeds up your search and allows you to receive your results faster.
6. Click **Run** to start the search.
7. When the search completes, you'll see a list of results where the rule generated a finding when run against your codebase. The links, which include filenames and line numbers, take you to GitHub, where you can view and remediate the issue.

![Code search results in Semgrep Editor](/img/code-search-results.png)
***Figure.*** Code search results in Semgrep Editor

## Set a rule’s visibility and share a rule

Upon saving, a rule’s visibility is **private** by default. A private rule is visible only to members within an organization.

- To share a rule, click **Share > Public > Confirm**. If you want to share this specific version of the rule, you can also toggle Permalink. This provides a shortlink to this version of the rule, which will not change if the rule is modified.
- To share a private rule with those who can access it, click **Share** and copy the **URL link**.

Some older rules in Semgrep AppSec Platform may be **unlisted** rather than private. These rules are marked with an icon without a lock, and can be shared with anyone, including those who cannot access Semgrep AppSec Platform.

To change an unlisted rule's visibility to private for increased security, click **Share > Private > Confirm**.

## Rename a rule

To rename a rule, enter the new name in the YAML editor’s `id` field. The, save the rule by entering <kbd>Ctrl</kbd>+<kbd>S</kbd> (<kbd>⌘</kbd>+<kbd>S</kbd> on Mac) or clicking the **Save** button.

## Delete a rule

<DeleteCustomRule />

## Add a rule to the Policies page

The **[Policies](/semgrep-code/policies/)** page displays rules that Semgrep Cloud Platform uses to scan your project's code. Rules added to the **Policies** page become part of every Semgrep scan you run.

When adding a rule to your **Policies** page, you must also set the **rule mode** that determines what actions Semgrep performs when that rule generates a finding. See [Policies](/semgrep-code/policies/#block-a-pr-or-mr-through-rule-modes) for more information on each rule mode.

To add a rule to the **Policies** page:

1. Ensure you're [signed in to Semgrep](https://semgrep.dev/login).
2. Click **Add to Policy**.
3. Select one of the following rule mode options based on the relevance of the rule: **Monitor mode**, **Comment mode**, or **Block mode**.

If successful, you'll see a pop-up window indicating that your rule has been added.

## Organize private rules

All private rules for an organization are saved to the organization's folder. To further organize rules, consider organizational naming conventions to keep related rules near each other, such as by internal team, rule language, or vulnerability category.

## Semgrep Registry rules

[Semgrep Registry](https://semgrep.dev/explore/) is an open-source, community-driven repository of rules. These rules can detect OWASP vulnerabilities, best practice violations, and security issues for various languages and frameworks. You can fork an existing rule to use as a starting point for writing your own.

### Write a new rule by forking an existing rule

One way to create new rules is to fork an existing rule in Semgrep Registry and modify it to meet your software and business requirements.

For example, Semgrep’s Java `crypto` ruleset prohibits the use of weak hashing algorithms `SHA-1` and `MD5`. However, your organization also prohibits the use of other hash functions as part of its standards or security compliance. The following steps illustrate the process of forking an existing `use-of-sha1` rule and changing it to forbid MD2 hashes.

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

When you fork a rule, the copy is independent from the original. To run your new rule in your scans, [add it to a policy](#add-a-rule-to-the-policies-page). If you want your copy to replace the rule you forked, add it to a policy, then disable the original on the Policies page.

### Contribute to the open-source Semgrep Registry

:::info
For general contributing guidelines, see [Contributing rules](/contributing/contributing-to-semgrep-rules-repository).
:::

To have your rule accepted faster, include the following:

- Include **test cases** for both a true positive and a true negative. See [Tests](/contributing/contributing-to-semgrep-rules-repository/#tests) for more details.
- Include a descriptive rule **message**. See [Rule messages](/contributing/contributing-to-semgrep-rules-repository/#rule-messages) for more information.
- Include **metadata fields**. See [Semgrep registry rule requirements](/contributing/contributing-to-semgrep-rules-repository/#semgrep-registry-rule-requirements) for more information.

To **create a PR** from the Semgrep Editor:

1. Click <i className="fa-solid fa-earth-americas inline_svg"></i> **Share**.
1. (Optional) Click <i className="fa-solid fa-cloud-arrow-up inline_svg"></i> **Publish to Registry**.
1. Fill in the required and optional fields.
1. Click <i className="fa-solid fa-circle-check inline_svg"></i> **Continue**, and then click <i className="fa-solid fa-code-pull-request inline_svg"></i> **Create PR**.
