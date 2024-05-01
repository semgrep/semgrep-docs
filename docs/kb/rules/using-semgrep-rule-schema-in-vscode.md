---
description: Use the Semgrep rule schema in VS Code to help make rule writing easier.
tags:
  - Rules
  - VS Code
---

import MoreHelp from "/src/components/MoreHelp"

# Use the Semgrep rule schema to write rules in VS Code

You may already be familiar with writing rules in the [Semgrep Playground](/docs/playground). However, if your IDE of choice is VS Code and you'd like to write Semgrep rules there, utilizing the Semgrep rule schema can be a great aid while doing so. The Semgrep rule schema will provide a richer editing environment, allowing for VS Code to understand the shape of your rule's YAML file, including its value sets, defaults, and descriptions ([reference](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml#associating-schemas)).

:::tip
Writing rules locally in your IDE is also helpful when iteratively testing your rule against an entire local repository, as opposed to just a snippet of test code.
:::

When setup properly, you can expect to get auto-completion options in your VS Code IDE just as you would in the Semgrep Playground when writing rules:

![Example Semgrep YAML rule file with auto-complete](/img/kb/vscode-schema-autocomplete-example.png)

## Adding the Semgrep rule schema in VS Code

Adding the Semgrep rule schema in VS Code requires two steps:

1. Install the YAML Language Support extension by Red Hat
2. Associate the Semgrep rule schema

### Install the YAML Language Support extension by Red Hat

You can install the extension either directly in VS Code or by going to the Visual Studio Marketplace and installing it from there. In VS Code, typically just searching `yaml` will yield the correction extension as the top result. However, please verify you are installing the correct extension by ensuring it is the same as the one [linked here](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml).

### Associate the Semgrep rule schema

Once the extension is properly installed, you will need to associate the Semgrep rule schema with any Semgrep YAML rule definitions you are working on in VS Code. This can be done in several ways and we suggest first reading the [extension overview](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml#associating-schemas) to fully understand all of them. Here, we will cover two of them.

#### Associating a schema directly in the YAML file

Perhaps the easiest and most direct way to associate the schema is to include the following line at the top of your Semgrep YAML rule file:

    # yaml-language-server: $schema=https://json.schemastore.org/semgrep.json

The drawback to this method is that you would have to do this for each YAML rule file.

#### Associating a schema to a glob pattern via `yaml.schemas`

Again, we highly recommend first reading the [extension overview](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml#associating-a-schema-to-a-glob-pattern-via-yaml.schemas) as a supplement to this article to better understand how YAML schemas are handled by the extension.

To associate the Semgrep rule schema via `yaml.schemas` in your VS Code `settings.json` file (on MacOS), go to:

    Code -> Settings -> Settings -> Extensions -> YAML

And then from within those settings, scroll down to where it says `Yaml: Schemas` and click on `Edit in settings.json`, as shown below:

![MacOS VS Code YAML extension settings](/img/kb/vscode-yaml-schemas.png)

This will open up your `settings.json` file with an empty `yaml.schemas` object already entered for you, ready to be filled in and defined. For example, consider the following `yaml.schemas` definition:

```json
"yaml.schemas": {
    "https://json.schemastore.org/semgrep.json": "Downloads/semgrep_rules/*.yaml"
}
```

Here, we are saying that the schema as defined on the left side of the colon (`:`), should match to the glob pattern as defined on the right side. The glob pattern is matching any `.yaml` file located in a directory structure that matches `Downloads/semgrep_rules/`. Please keep in mind that the glob pattern will differ for varying operating systems and by where you are storing your Semgrep YAML rule files.

If you are successful in configuring `yaml.schemas` and then open a Semgrep rule YAML file, you should notice something like the following at the top:

![Example Semgrep YAML rule file with schema defined](/img/kb/vscode-yaml-schema-example-file.png)

<MoreHelp />