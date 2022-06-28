---
slug: private-rules
description: "Users in the Team and Enterprise tier for Semgrep App can publish rules to the Semgrep Registry that are not visible to others outside their organization. This can be useful for organizations where rules may contain code-sensitive information or legal requirements prevent using a public registry."
---

import MoreHelp from "/src/components/MoreHelp"

# Private rules

Users in the [Team and Enterprise tier](https://semgrep.dev/pricing) for Semgrep App can publish rules to the Semgrep Registry as private rules that are not visible to others outside their organization. The private rules enable you to hide code-sensitive information or legal requirements that prevent you from using a public registry.

As we continue to develop and refine this feature, we welcome and appreciate your feedback! Email us at [product@r2c.dev](mailto:product@r2c.dev) or contact us in our [Community Slack](https://r2c.dev/slack).

## Getting started

To create private rules, use the [Semgrep CLI](../getting-started.md) to run these commands:

1. Interactively login to Semgrep:

    ```sh
    semgrep login
    ```

2. Run `semgrep publish` followed by the path to your private rules:

    ```sh
    semgrep publish myrules/
    ```

If the directory contains test cases for the rules, Semgrep uploads them as well (see [testing Semgrep rules](../../writing-rules/testing-rules)).

You can also change the visibility of the rules. For instance, to publish the rules as unlisted (which does not require authentication but will not be displayed in the public registry):

```sh
semgrep publish --visiblity=unlisted myrules/
```

For more details, run `semgrep publish --help`.

## Viewing and using private rules

View your rule in the [editor](https://semgrep.dev/orgs/-/editor) under the folder corresponding to your organization name. 

You can also find it in the [registry](https://semgrep.dev/r) by searching for [organization-id].[rule-id]. For example: `r2c.test-rule-id`. 

To enforce the rule on new scans, add the rule in the [registry](https://semgrep.dev/r) to an existing policy.

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

## Appendix

### Visibility of private rules

Private rules are only visible to logged-in members of your organization.

### Deleting private rules

You cannot delete private rules. To remove a private rule, contact us at [support@r2c.dev](mailto:support@r2c.dev?subject=Remove%20Private%20Rule).

### Publishing a rule with the same rule ID

Rules have unique IDs. If you publish a rule with the same ID as an existing rule, the new rule overwrites the previous one.

<MoreHelp />
