---
description: Learn how to automate private rules deployment using the Semgrep API.
tags:
 - API
 - Rules
 - Rule management
---

# Automate private rules deployment using the Semgrep API

You can automate private rules deployment using the Semgrep API using the following steps:

1. Ensure that you've [created your private rules and published them](/writing-rules/private-rules) so that they're available to your organization.

2. Once you've published your rules, activate the rules by setting the rules' `policyMode` parameters using the [Update policies endpoint](https://semgrep.dev/api/v1/docs/#tag/PoliciesService/operation/PoliciesService_UpdatePolicy).

    This endpoint requires you to provide the `rulePath`, which is the **Organization slug** + `.` + the **Rule ID**. You can find the **Organization slug** in Semgrep AppSec Platform under [**Settings > General > Identifiers**](https://semgrep.dev/orgs/-/settings/general/identifiers), and you can see the **Rule ID** defined in the rule's YAML file.

    Example:

    ```text
    # sample rulePath for the Docs deployment using a private rule
    docs.private-rule
    ```

    You can also validate `rulePath` from the publish command output:

    ```console
    --> Uploading rules/examples/private-rule.yml (test cases: [])
    >     Published VisibilityState.ORG_PRIVATE rule at https://semgrep.dev/r/docs.private-rule
    ```

## Considerations

- The folder structure of your rules repository doesn't affect the rules published. For example, if you have two rules in `./rules/examples/`, and you publish them using `semgrep publish ./rules`, there aren't mentions of `examples` in Semgrep AppSec Platform even though it's in the repository path:

  ![Sample custom rules folder structure](/img/publish-custom-rules-1.png#md-width)
  _**Figure**. Sample custom rules folder structure._

  Two rules with the same ID can cause confusion, since the newer rule is the one reflected in Semgrep AppSec Platform.

- Strings in the rule ID separated by periods `.` are treated by Semgrep as labels. For example, if the rule ID is `dw3.go-xfile-sink-example`, the displayed rule name is `go-xfile-sink-example`:

  ![The YAML file shows the ID with label information](/img/publish-custom-rules-2.png#md-width)
  _**Figure**. The YAML file shows the ID with label information._

  Furthermore, multiple rules with similar names are distinguished by their labels, which always include the organization slug. In the following example, there are two rules with the **Rule name** `go-xfile-sink-example`, but the **Labels** are different:

    ![The list of rules in Semgrep AppSec Platform](/img/publish-custom-rules-3.png#md-width)
    _**Figure**. The list of rules in Semgrep AppSec Platform._

- You can structure your custom rules repository as needed. However, to help manage your repository in a scalable manner, Semgrep suggests using the path structure and assigning each of your teams its own folder. Then, create a build step that incorporates some of this path data from the repository into the rule IDs' names before publishing. This way, you have labels in Semgrep AppSec Platform that include information about the origins of the rule, and the labels prevent naming conflicts that could lead to one rule overwriting another rule.
