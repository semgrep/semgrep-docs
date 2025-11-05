---
slug: private-rules
description: "Semgrep Code users can publish rules to the Semgrep Registry that are not visible to others outside their organization. This can be useful for organizations where rules may contain code-sensitive information or legal requirements prevent using a public registry."
tags:
  - Rule writing
---

import DeleteCustomRule from "/src/components/procedure/_delete-custom-rule.mdx"

# Private rules

Users with Semgrep Code's [Team or Enterprise tier](https://semgrep.dev/pricing) can publish rules to the [Semgrep Registry](https://semgrep.dev/explore) as private rules that are not visible to those outside their organization. Maintaining the rules' privacy allows you the benefits of using the Semgrep Registry while keeping sensitive code or information internal.

## Creating private rules

You can create private rules the same way you create other custom rules. The subsequent sections can help you create and save your private rules.

### Create private rules through Semgrep AppSec Platform

To create and publish private rules through the Semgrep AppSec Platform:

1. Go to [Semgrep Editor](https://semgrep.dev/orgs/-/editor).
1. Click <i className="fa-solid fa-file-plus-minus inline_svg"></i> **Create New Rule**.
1. Choose one of the following options to create your rule:
    - Click the <i class="fa-solid fa-circle-plus"></i> **plus** icon, select **New rule**, provide the YAML file for your rule, and then click <i className="fa-solid fa-floppy-disk inline_svg"></i> **Save**.
    - In the <i class="fa-solid fa-server"></i> **Library** panel, select a rule from a category in **Semgrep Registry**. Click <i className="fa-solid fa-code-branch inline_svg"></i> **Fork**, modify the rule or test code, and then click <i className="fa-solid fa-floppy-disk inline_svg"></i> **Save**.
1. Click <i className="fa-solid fa-earth-americas inline_svg"></i> **Share**.
1. Click <i className="fa-solid fa-lock inline_svg"></i> **Private**.

Your private rule has been created and added to the Registry. It is visible only to logged in users of your organization, and its private status is reflected by the **Share** button displaying a <i className="fa-solid fa-lock inline_svg"></i> icon.

Private rules are stored in the folder with the same name as your Semgrep AppSec Platform organization.

### Create private rules through the Semgrep command-line interface

To create private rules through the [Semgrep CLI](/getting-started/quickstart), :

1. Log in to Semgrep. Running this command launches a browser window, but you can also use the link that's returned in the CLI to proceed:

  ```console
  semgrep login
  ```

2. In the **Semgrep CLI login**, click **Activate** to proceed.

3. Create your rule. For more information, see [Contributing rules](/contributing/contributing-to-semgrep-rules-repository).

4. Publish your rule from the command line using `semgrep publish` command followed by the path to your private rules:

  ```console
  semgrep publish myrules/
  ```

If the rules are in the directory you publish from, you can use `semgrep publish .` to refer to the current directory. You must provide the directory specification.

If the directory contains test cases for the rules, Semgrep uploads them as well (see [testing Semgrep rules](/writing-rules/testing-rules)).

You can change the visibility of the rules. For instance, to publish the rules as unlisted (which does not require authentication but results in the rules hidden from users of the public registry):

```console
semgrep publish --visibility=unlisted myrules/
```

For more details, run `semgrep publish --help`.

## View and use private rules

View your rules in [Semgrep Editor](https://semgrep.dev/orgs/-/editor) under the folder corresponding to your organization name.

You can also find it in the [Semgrep Registry](https://semgrep.dev/explore) by searching for `[organization-id].[rule-id]`. For example: `r2c.test-rule-id`.

To use the rule with subsequent scans, add the rule in the [Registry](https://semgrep.dev/explore) to an existing policy.

## Automatically publish rules

This section provides examples of how to automatically publish your private rules so they are accessible within your private organization. Publishing your private rules in this manner does not make them public. In the following examples, the private rules are stored in `private_rule_dir`, which is a subdirectory of the repository root. If your rules are in the root of your repository, you can replace the command with `semgrep publish --visibility=org_private .` to refer to the repository root. You must provide the directory specification.

The following sample of the GitHub Actions workflow publishes rules from a private Git repository after a merge to the `main`, `master`, or `develop` branches.

1. Ensure that `SEMGREP_APP_TOKEN` is defined in your GitHub project or organization's secrets.
2. Create the following file at `.github/workflows/semgrep-publish.yml`:
    ```yaml
    name: semgrep-publish

    on:
      push:
        branches:
        - main
        - master
        - develop

    jobs:
      publish:
        name: publish-private-semgrep-rules
        runs-on: ubuntu-latest
        container:
          image: semgrep/semgrep
        steps:
        - uses: actions/checkout@v4
        - name: publish private semgrep rules
          run: semgrep publish --visibility=org_private ./private_rule_dir
          env:
            SEMGREP_APP_TOKEN: ${{ secrets.SEMGREP_APP_TOKEN }}
    ```

    Alternatively, if you use GitLab, you can use the subsequent sample after ensuring that `SEMGREP_APP_TOKEN` is defined in your GitLab project's CI/CD variables:
    ```yaml
    semgrep-publish:
      image: semgrep/semgrep
      script: semgrep publish --visibility=org_private ./private_rule_dir

    rules:
      - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH

    variables:
      SEMGREP_APP_TOKEN: $SEMGREP_APP_TOKEN
    ```

## Delete private rules

<DeleteCustomRule />

## Appendix

### Visibility of private rules

Private rules are only visible to logged-in members of your organization.

### Publish a rule with the same rule ID

Rules have unique IDs. If you publish a rule with the same ID as an existing rule, the new rule overwrites the previous one.
