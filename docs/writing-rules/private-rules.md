---
slug: private-rules
description: "Users of the Team and Enterprise tier for Semgrep Code can publish rules to the Semgrep Registry that are not visible to others outside their organization. This can be useful for organizations where rules may contain code-sensitive information or legal requirements prevent using a public registry."
---

import MoreHelp from "/src/components/MoreHelp"
import DeleteCustomRule from "/src/components/procedure/_delete-custom-rule.mdx"

# Private rules

Users of the [Team or Enterprise tier](https://semgrep.dev/pricing) of Semgrep Code can publish rules to the [Semgrep Registry](https://semgrep.dev/explore) as private rules that are not visible to others outside their organization. Maintaining the rules' privacy allows you the benefits of using the Semgrep Registry while keeping sensitive code or information internal.

## Creating private rules

Create private rules the same way you create other custom rules. Private rules are stored in Semgrep Registry but they are not visible outside your organization. The two sections below can help you to create and save your private rules.

:::info Prerequisite
[Team or Enterprise tier](https://semgrep.dev/pricing) of Semgrep Code.
:::

### Creating private rules through Semgrep Cloud Platform

To publish private rules through the Semgrep Cloud Platform:

1. Go to [Semgrep Editor](https://semgrep.dev/orgs/-/editor).
1. Click <i className="fa-solid fa-file-plus-minus inline_svg"></i> **Create New Rule**.
1. Choose one of the following:
    - Create a new rule and test code by clicking <i class="fa-solid fa-circle-plus"></i> **plus** icon, select **New rule**, and then click <i className="fa-solid fa-floppy-disk inline_svg"></i> **Save**.
    - In the <i class="fa-solid fa-server"></i> **Library** panel, select a rule from a category in **Semgrep Registry**. Click <i className="fa-solid fa-code-branch inline_svg"></i> **Fork**, modify the rule or test code, and then click <i className="fa-solid fa-floppy-disk inline_svg"></i> **Save**.
1. Click <i className="fa-solid fa-earth-americas inline_svg"></i> **Share**.
1. Click <i className="fa-solid fa-lock inline_svg"></i> **Private**.

Your private rule has been created and added to the Registry, visible only to logged in users of your organization. Its private status is reflected by the **Share** button displaying a <i className="fa-solid fa-lock inline_svg"></i> icon.

Private rules are stored in the folder with the same name as your Semgrep Cloud Platform organization.

### Creating private rules through the command line

To create private rules through the [Semgrep CLI](/getting-started/quickstart/), :

1. Interactively login to Semgrep:

    ```sh
    semgrep login
    ```
1. Create your rule. For more information, see [Contributing rules](/contributing/contributing-to-semgrep-rules-repository/) documentation.
1. Publish your rule from the command line with `semgrep publish` command followed by the path to your private rules:

    ```sh
    semgrep publish myrules/
    ```

If the directory contains test cases for the rules, Semgrep uploads them as well (see [testing Semgrep rules](../../writing-rules/testing-rules)).

You can also change the visibility of the rules. For instance, to publish the rules as unlisted (which does not require authentication but will not be displayed in the public registry):

```sh
semgrep publish --visibility=unlisted myrules/
```

For more details, run `semgrep publish --help`.

## Viewing and using private rules

View your rule in the [editor](https://semgrep.dev/orgs/-/editor) under the folder corresponding to your organization name. 

You can also find it in the [registry](https://semgrep.dev/explore) by searching for [organization-id].[rule-id]. For example: `r2c.test-rule-id`. 

To enforce the rule on new scans, add the rule in the [registry](https://semgrep.dev/explore) to an existing policy.

## Automatically publishing rules

This section provides an example of how to automatically publish your private rules so they are accessible within your private organization. "Publishing" your private rules in this manner does not make them public. The following sample of the GitHub Actions workflow publishes rules from a private Git repository after a merge to the `main`, `master`, or `develop` branches.

1. Make sure that `SEMGREP_APP_TOKEN` is defined in your Github project or organization's secrets.
2. Create the following file at `.github/workflows/semgrep-publish.yml`:
    ```yaml
    name: semgrep-publish

    on:
      push:
        branches:
        - develop
        - main
        - master

    jobs:
      publish:
        name: public-private-semgrep-rules
        runs-on: ubuntu-latest
        steps:
        - uses: actions/checkout@v2
          with:
            path: semgrep-rules
        - name: publish private semgrep rules
          run: |
            docker run --env SEMGREP_APP_TOKEN=$SEMGREP_APP_TOKEN --rm -v ${GITHUB_WORKSPACE}/semgrep-rules:/src returntocorp/semgrep:develop semgrep publish --visibility=org_private /src/private_rule_dir
          env:
            SEMGREP_APP_TOKEN: ${{ secrets.SEMGREP_APP_TOKEN }}
    ```

## Deleting private rules

<DeleteCustomRule />

## Appendix

### Visibility of private rules

Private rules are only visible to logged-in members of your organization.

### Publishing a rule with the same rule ID

Rules have unique IDs. If you publish a rule with the same ID as an existing rule, the new rule overwrites the previous one.

<MoreHelp />
