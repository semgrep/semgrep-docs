---
slug: editor
append_help_link: true
title: Write custom rules
hide_title: true
tags:
    - Semgrep Cloud Platform
    - Team & Enterprise Tier
description: "Semgrep Editor is a powerful tool within Semgrep Cloud Platform to write rules and quickly apply these rules across an organization to enforce coding standards across an organization."
---

import MoreHelp from "/src/components/MoreHelp"
import EnableTurboMode from "/src/components/procedure/_enable-turbo-mode.md"
import DeleteCustomRule from "/src/components/procedure/_delete-custom-rule.mdx"

<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>


# Write rules using Semgrep Editor

![Screenshot of the Editor's splash screen](/img/editor-splashscreen.png)

**Semgrep Editor** is an advanced tool for **rule writing**. Write rules on a YAML editor, verify their performance through tests, and add them to your organization’s [Policies page](/semgrep-code/policies) to enforce code standards and increase code security.

To quickly learn Semgrep patterns and syntax, explore the Editor’s library of rules from the **public [Rule Registry](https://semgrep.dev/explore)**. Rules from the Registry can detect OWASP vulnerabilities, best practice violations, and security issues for a wide variety of languages and frameworks. Semgrep Editor enables you to **adapt these rules** for your own organization’s use by [forking](#jumpstart-rule-writing-using-existing-rules) them.

The Editor is free to use on all tiers, but saving a rule for **private use** is a **Team/Enterprise tier feature**.

## Accessing Semgrep Editor

1. Sign in to your [Semgrep Cloud Platform account](https://semgrep.dev/login).
2. Click **Rules > Editor**.
3. Do any of the following steps:
    1. To create a new rule, click on the <i class="fa-solid fa-circle-plus"></i> **(+) plus sign** or <i class="fa-solid fa-file-plus"></i> **Create new rule** button.
    2. To open any rule you’ve recently edited, select it from the **Recent** list.
    3. To view a sample rule, select it from the **Examples** list. The rule renders within the Editor.
    4. To start a tutorial or read the docs, select it from the **Learn** list. This navigates you away from the Editor.

## Viewing rules

![Screenshot of the Editor's main view composed of three panes and top menu](/img/editor-panes.png)

The editor is composed of three panes and a top menu.

<dl>
    <dt>Library</dt>
    <dd>View and open various rules through the library. It contains two top-level folders:
        <ul>
            <li>Your organization’s rules</li>
            <li>Publicly-available Semgrep Registry rules from the <code>semgrep-rules</code> repository</li>
        </ul>
        <strong>Private rules</strong> are denoted by a <strong>lock</strong> icon overlaid over the file icon.
    </dd>
    <dt>Rule editor</dt>
    <dd>Enter your rule’s YAML schema in this pane.</dd>
    <dt>Sample code window</dt>
    <dd>Enter your rule’s test code in this pane and click the <strong>Run button</strong> to verify that the rule runs as intended. A <strong>matches panel</strong> appears after Semgrep is run to display matches and tests.</dd>
    <dt>Top menu</dt>
    <dd>Save, share, and add your rule to the Policies page through this menu.</dd>
</dl>

To **resize the panes**, position your mouse over the borders and click-drag to the desired width. The library pane can be completely hidden to give more space for the editing panes.

Semgrep Registry rules are initially grouped by **directory**. Most of these directories correspond to languages. The Library can also be grouped by **rulesets**, which are rules arranged by category, such as security, best practices, and frameworks.

To group by ruleset, right click on the empty space on the **official registry** entry and select **Group by ruleset**.

<div class = "bordered">

![Screenshot of the Editor's right click menu to group by rulesets](/img/editor-groupbyruleset.png)

</div>

## Creating a rule

To create a rule, click **Create rule** on the splash page or the **(+) sign** next to the Library label. The Editor provides the minimum fields to create a rule:

- `rules`
- `id`
- `pattern`
- `message`
- `languages`
- `severity`

Refer to [Rule syntax](/writing-rules/rule-syntax) for all possible fields and values to create a rule.

<EnableTurboMode />

### Jumpstart rule writing using existing rules

Another method of creating rules is by **forking/copying** from existing rules found in Semgrep Registry. For example, Semgrep’s Java `crypto` ruleset prohibits the use of weak hashing algorithms `SHA-1` and `MD5`. An organization may want to further limit the use of other hash functions as part of their standards or security compliance. The next steps illustrate forking through copying an existing `use-of-sha1` rule and changing the rule to forbid MD2 hashes.

1. Enter related terms into the search bar to find potential rules. In our example, this is **use-of-sha**. <div class="bordered">
![Screenshot of Library pane with SHA1 filter](/img/editor-SHA1.png)</div>
2. Registry rules cannot be edited directly. They can be **forked** by **right-clicking on their entry** in the Library and selecting **Fork rule.** <div class = "bordered">
![Screenshot of forking menu](/img/editor-forking.png) </div>
3. The rule is copied to your organization’s rules.
4. Enter edits to finalize your rule. In this example, the patterns are changed to find matches for [MD2](https://docs.oracle.com/javase/9/docs/specs/security/standard-names.html#messagedigest-algorithms) and the severity is increased from `WARNING` to `ERROR`.
5. Enter updates to test cases.
6. Click **Run** to validate your rule.
7. Click **Save** to save your rule. The following rule displays the end result.

<iframe title="Prevent use of MD2" src="https://semgrep.dev/embed/editor?snippet=RDxN" width="100%" height="432px" frameBorder="0"></iframe>

### Debugging syntax issues

The editor will not save, share, or run if the YAML syntax is **unparseable**. The editor supports error handling, for the following cases:

- Missing `rules` key at start
- Invalid language keys
- Incorrect severity fields
- Missing `id` key
- Missing required schema fields

![Screenshot of Editor's error message](/img/editor-errorwarn-message.png)

If no schema or spelling errors are detected, check for indentation or newline issues. You can also get rule-writing help through the [Semgrep Community Slack](https://go.semgrep.dev/slack).

## Evaluating a rule’s performance

Evaluating a rule through testing ensures that it meets your standards for precision and speed, thus **reducing false positives**. Semgrep uses certain annotations in comments to enable users to test which blocks of code are intended to match with a rule, and which blocks of code should not match.

In the following example, run the rule and click on the three-dot menu to view the result of the tests.

<iframe title="Testing example" src="https://semgrep.dev/embed/editor?snippet=7n1W" width="100%" height="432px" frameBorder="0"></iframe>

To **test a rule**:

1. Create at least one **true positive**: a code sample intended to match the rule.
2. Above this potential match, create a comment, followed by a space (` `), followed by `ruleid:RULE_ID` which specifies the rule that should match. In the preceding example, this is `// ruleid:hardcoded-conditional`.
3. Create at least one **true negative**: a code sample intended not to match the rule.
4. Above this non-match, create a comment followed by a space ( ), followed by `ok:RULE_ID`. For example, `// ok:hardcoded-conditional`.
5. Optional: add more code samples with their corresponding annotations.
6. Click **Run**. Semgrep will detect the annotations and validate the rule based on your tests.

For additional annotations designed to test false positives and false negatives, refer to [Testing rules](/writing-rules/testing-rules).

## Renaming and saving a rule

- To rename a rule, enter the new name in the YAML editor’s `id` field.
- To save a rule, enter <kbd>Ctrl</kbd>+<kbd>S</kbd> (<kbd>⌘</kbd>+<kbd>S</kbd> on Mac) or click the **Save** button.

## Sharing a rule and setting a rule’s visibility

Upon saving, a rule’s visibility is **unlisted** by default. This rule can be shared with anyone through an identifier, even to non-Semgrep Cloud Platform users.

A rule can be saved as a **private rule**, which is visible only to members within an organization. You can still share a private rule, but only members of the organization can see it. Private rules are a **Team/Enterprise tier feature**.

- To set a rule’s visibility to private, click **Share > Private > Confirm**.
- To share a private or unlisted rule, click **Share** and copy the **URL link**.

## Deleting a rule

<DeleteCustomRule />

## Setting code standards with the Policies page

Adding a rule to the Policies page applies the rule across all projects scanned by Semgrep Cloud Platform.

To add a rule to the Policies page:

1. Click **Add to Policy**.
2. Select which [rule mode](/semgrep-code/policies/#blocking-a-pr-or-mr-through-rule-modes) (Monitor, Comment, or Block) to set the rule to, depending on the rule’s relevance.

The rule appears in your Policy page with the mode it is set to.

## Contributing to the open-source Semgrep Registry

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

<MoreHelp />
