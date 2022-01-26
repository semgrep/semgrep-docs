# Semgrep Playground

Semgrep Playground is a live editor used to create and test rule patterns on sample code. By testing the pattern out on sample code, you are able to quickly assess the purpose, utility, and speed of a rule as well as save it for later refinement, reuse, or for sharing.


## Creating a rule

There are two ways to create a rule:

* **Simple view.** The simple view is best for quick and simple pattern-matching use cases, but does not display all of Semgrep's operators.
* **Advanced view.** The advanced view provides the minimum required keys for a Semgrep rule and expects users to fill in additional keys, such as pattern operators or metadata, to complete the rule.


### Using simple view

The simple view is best for quick and simple pattern-matching use cases. It provides the most common pattern-matching operators in Semgrep. This view is used by default.


![alt_text](images/image1.png "image_tooltip")


The following keys are supported in Simple View:

* `language`
* `pattern`
* `pattern-either`
* `pattern-inside`
* `pattern-not`
* `pattern-not-inside`
* `pattern-regex`
* `message`
* `autofix`

The following metadata keys are supported in simple view:

* `category`
* `technology`
* `source-rule-url`

The simple view has the following limitations:

* It supports only one language per rule.
* It does not have support for the following operators: 
    * `pattern-not-regex`
    * `metavariable-regex`
    * `metavariable-pattern`
    * `metavariable-comparison`
* It does not support the following experimental features:
    * Join mode
    * Taint mode

To create a rule in simple view:

1. Ensure that you are in simple view:

![alt_text](images/image2.png "image_tooltip")


2. Click **File > New** to start from a blank slate.
3. Select a language from the **language is **drop-down box. This refers to the language that the test code is written in.
4. Enter the pattern to test for after the **code is** button.
5. Optional: Click on the **plus **button to add fields for additional operators. Select the pattern operator and enter the pattern.
6. Optional: Click on **Rule metadata** to enter additional metadata fields.


### Using advanced view

The advanced view is a YAML editor for writing a rule using any valid key from the Semgrep [schema](https://semgrep.dev/docs/writing-rules/rule-syntax/). It provides default values for the minimum required keys for a Semgrep rule definition and expects the user to modify and add keys to finish the rule.

To create a rule in the advanced view:

1. Ensure that you're in **Advanced view**.

![alt_text](images/image3.png "image_tooltip")

2. Enter the keys and values needed to finish your rule.


## Running and testing a rule

To **run a rule**: 

1. Enter your own code snippet or use samples from the Playground.
2. Optional: Use the `develop` branch docker image by clicking **Tools > Use develop docker image**. This docker image contains the latest code pushed to Semgrep's repository, including experimental features. 
3. Press **Run **or `**Ctrl+Enter**`.

To **use a sample** from the Playground:

1. Click **Tools** > **Load sample *`<code>LANGUAGE</code>`* code**.
![alt_text](images/image4.png "image_tooltip")
2. Select any of the following:
    1. hello world
    2. 100-line file
    3. 1000-line file
3. The rule is executed automatically on the selected option.
4. To run again, press Run or type **Ctrl+Enter**.

100-line and 1000-line files are taken at random from GitHub open source projects.

**Testing a rule** ensures that it meets your standards for precision and speed. Aside from running a rule on the Playground, it is possible to test a rule by creating comment annotations for intended and unintended matches. This is achieved by creating a test file. 

Refer to (Testing rules)[https://semgrep.dev/docs/writing-rules/testing-rules/] for the syntax and method to run test files.


### Debugging errors when creating a rule

Common errors are syntax or match issues.


#### The pattern can't be parsed for the language

Check that the **Language is** value and **Test code** language match. Use full AST elements for the language. For example:

* In Java, Python's ``print`` command is not a valid element.
* ``1+`` or ``if $X:`` are not valid patterns because they are not full AST elements.

#### The pattern syntax is invalid

Check your metavariable definitions, and use of operators. Metavariables must be uppercase letters preceded by a dollar sign $, such as `$PAYMENT_OUTPUT` or `$X`. Refer to Pattern syntax[https://semgrep.dev/docs/writing-rules/pattern-syntax/].


#### The YAML syntax is unparsable in Advanced view

Check for spelling and indentation issues. The key names must match Semgrep's schema[https://semgrep.dev/docs/writing-rules/rule-syntax/].

#### The rule does not behave as expected or does not find the desired match

File a **bug**[https://github.com/returntocorp/semgrep/issues/new?title=semgrep.dev%20bug%20report] or reach out through **Semgrep Community Slack**[https://r2c.dev/slack].


### Evaluating a rule's performance

After running Semgrep on the test code, a summary of findings appears under the **Matches** column.

The **Performance **column displays how long it takes in seconds for Semgrep to run your rule. It also displays the following benchmarks:

* Blazing
* Quick
* Decent
* Fair
* Okay
* Slow
* Sluggish

These benchmarks take into account the **visual complexity** of the rule.


## Adding a rule to the Rule Board

**Adding a rule to the (Rule Board)**[https://semgrep.dev/docs/semgrep-app/rule-board/] allows you to quickly set a rule as part of every Semgrep scan. To add a rule to the Rule Board:

1. Ensure that you are logged-in.
2. Click **Add to Rule Board**.
3. Select either the Audit or Block boards depending on the importance of the rule. Matches for rules on the Block board will prevent PR merges within a CI environment.


## Saving and sharing a Semgrep rule

A rule is saved by either **explicitly naming it** or when it is **assigned a shortcode** for sharing. Rules are **unlisted **by default. This means they do not appear publicly in the Registry[] nor can they be searched for, but are accessible via their sharing URL.

To explicitly name a rule:

1. Sign into Semgrep.
2. Click on the **Untitled rule** box.
3. Enter the name of your rule and press **Save**.

To assign a random shortcode:

1. Click on **Share**. This will auto-generate a random shortcode and URL to access the rule.

To retrieve or open a rule:

1. Click **File > Open…**
2. Enter the rule's name in the **Filter…** search box or scroll to find the rule.
3. Click on the rule. The rule loads into the Playground.

To rename a rule:

1. Sign into Semgrep. 
2. In the Playground, open the rule to rename.
3. Enter a new name and press **Save**. This creates a new rule.
4. Delete the old rule to complete the renaming process.


## Using a rule in CI

Using a rule in your CI pipeline enables you to run the rule at a certain hook or event. This allows users to add guardrails against security, style, and general code violations.

Semgrep can be used in the following CI environments:

* GitHub (pre-commit and workflows)
* GitLab
* CircleCI
* AppVeyor
* TravisCI

**Prerequisites:**

1. Ensure that you have sufficient permissions to update your CI environment.

To add your rule to your CI pipeline:

1. Click **Share**.
2. Select the CI environment from the tabs under the header **Use in CI**.
3. Click on the **clipboard icon** on the upper right of the snippet to copy it.
4. Paste the snippet into the config file specified above the snippet.
![alt_text](images/image5.png "image_tooltip")


## Embedding a rule in your site

The **Embedded Playground** is an interactive editor which can be embedded in an external domain or web page such as a blog post. It is a means to display Semgrep's rules in action.

The Embedded Playground has two panes:

* **Rule Pane.** This displays the rule data. The rule must have a **reference **(either a short identifier or saved name) from Semgrep Playground.
* **Test Code.** This displays the code that the rule will act upon. On the bottom right is the Run button, which will run the rule on the test code.

Both panes are editable, allowing viewers to try the Semgrep rule out for themselves or to change parts of the rule.

**Prerequisites:**

1. A site or page with sufficient editing permissions for you to embed the rule.

To embed a rule:

1. In the Playground, click **Share**.
2. Copy the **identifier**. This comes in two patterns:
    1. For signed-in users: **<code>[username]:[rule-name]</code>**, such as <code>ievans:print-to-logger</code>
    2. For anonymous users: [4-letter shortcode], such as **dZkP**
3. Create the **URL reference**. Substitute the identifier in this template: `<code>https://semgrep.dev/embed/editor?snippet=IDENTIFIER</code>`. For example, using the identifier ievans:print-to-logger creates `<code>https://semgrep.dev/embed/editor?snippet=IDENTIFIER</code>`.
4. **Optional:** To test the URL reference, enter the URL in your browser's address bar.
5. In the following snippet, replace the `<code>src</code>` placeholder value with the previously-created URL reference:

```
 <iframe title="Semgrep example no prints" src="`URL Reference`" width="100%" height="432" frameborder="0"></iframe>
```
The finished result is:

```
<iframe title="Semgrep example no prints" src="https://semgrep.dev/embed/editor?snippet=IDENTIFIER" width="100%" height="432" frameborder="0"></iframe>
```
