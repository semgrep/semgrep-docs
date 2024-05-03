---
description: Use the Semgrep rule schema in VS Code to help make rule writing easier.
tags:
  - Rules
  - VS Code
---

import MoreHelp from "/src/components/MoreHelp"

# Use the Semgrep rule schema to write rules in VS Code

You may already be familiar with writing rules in the [Semgrep Editor](/semgrep-code/editor). However, if your IDE of choice is VS Code and you'd like to write Semgrep rules there, using the Semgrep rule schema will provide a richer editing environment, allowing VS Code to understand the shape of your rule's YAML file, including its value sets, defaults, and descriptions ([reference](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml#associating-schemas)).

:::tip
Writing rules locally in your IDE is also helpful for iteratively testing them against an entire local repository, as opposed to just a snippet of test code.
:::

When the schema is set up, auto-completion operates in your VS Code IDE just as it does in the Semgrep Editor when writing rules:

![Example Semgrep YAML rule file with auto-complete](/img/kb/vscode-schema-autocomplete-example.png)

## Add the Semgrep rule schema in VS Code

Adding the Semgrep rule schema in VS Code requires two steps:

1. Install the YAML Language Support extension by Red Hat
2. Associate the Semgrep rule schema

### Install the YAML Language Support extension by Red Hat

You can install the  "YAML" extension authored by "Red Hat" directly in VS Code or by going to the Visual Studio Marketplace and installing it from there. In VS Code, go to the **Extensions** pane and search for `yaml`. This should yield the correction extension as the top result. However, please verify that you are installing the correct extension by ensuring it is the same as [this one](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml).

### Associate the Semgrep rule schema

Once the extension is installed, associate the Semgrep rule schema with Semgrep YAML rule definitions you are working on in VS Code using one of two recommended methods:

1. Directly in the YAML file
2. Using `yaml.schemas` in your VS Code `settings.json` file

We recommend taking a look at the [extension overview section on associating schemas](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml#associating-schemas) as a precursor to gain a preliminary understanding before proceeding.

#### Associating a schema directly in the YAML file

To associate the schema easily and directly with a Semgrep YAML rule file, include the following line at the top of the file:

    # yaml-language-server: $schema=https://json.schemastore.org/semgrep.json

The drawback to this method is that it must be done independently for each YAML rule file.

#### Associating a schema to a glob pattern via `yaml.schemas`

Again, we highly recommend first reading the [extension overview](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml#associating-a-schema-to-a-glob-pattern-via-yaml.schemas) as a supplement to this article to better understand how YAML schemas are handled by the extension.

To associate the Semgrep rule schema via `yaml.schemas` in your VS Code `settings.json` file (on MacOS), go to:

    Code -> Settings -> Settings -> Extensions -> YAML

In the YAML extension settings, scroll down to `Yaml: Schemas` and click `Edit in settings.json`, as shown below:

![MacOS VS Code YAML extension settings](/img/kb/vscode-yaml-schemas.png)

This opens the `settings.json` file with an empty `yaml.schemas` object already entered, ready to be defined. For example, consider the following `yaml.schemas` definition:

```json
"yaml.schemas": {
    "https://json.schemastore.org/semgrep.json": "Downloads/semgrep_rules/*.yaml"
}
```

This associates the schema defined on the left side of the colon (`:`) with files matching the glob pattern on the right. The glob pattern matches any `.yaml` file located in a directory structure that matches `Downloads/semgrep_rules/`. The desired glob pattern differs for varying operating systems and should reflect where you are storing Semgrep YAML rule files.

After completing the configuration for `yaml.schemas`, open a Semgrep rule YAML file to verify that a notice shows at the top similar to this one:

![Example Semgrep YAML rule file with schema defined](/img/kb/vscode-yaml-schema-example-file.png)

This indicates that you've successfully associated the Semgrep rule schema with your Semgrep rule YAML file(s).

<MoreHelp />