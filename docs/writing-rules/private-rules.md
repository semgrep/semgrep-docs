---
slug: private-rules
description: "Users in the Team and Enterprise tier for Semgrep App can publish rules to the Semgrep Registry that are not visible to others outside their organization. This can be useful for organizations where rules may contain code-sensitive information or legal requirements prevent using a public registry."
---

import MoreHelp from "/src/components/MoreHelp"

# Private rules

Users in the [Team and Enterprise tier](https://semgrep.dev/pricing) for Semgrep App can publish rules to the Semgrep Registry that are not visible to others outside their organization. This can be useful for organizations where rules may contain code-sensitive information or legal requirements prevent using a public registry.

As we continue to develop and refine this feature, we welcome and appreciate all feedback via email at [product@r2c.dev](mailto:product@r2c.dev) or in our [Community Slack](https://r2c.dev/slack).

## Getting started

Run 

```
semgrep login
semgrep publish myrules/
```

Test cases will be included as well (see [testing Semgrep rules](../writing-rules/testing-rules)).

You can also publish rules as unlisted with the same command:

```
semgrep publish --visiblity=unlisted myrules/
```

## Automatically Publishing Rules

Here is a sample Github Actions workflow to automatically publish rules from a private Git repo after they are merged:

```
name: semgrep-publish

on:
  push:
    branches:
    - main

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
        docker run --rm -v ${GITHUB_WORKSPACE}/semgrep-rules:/src returntocorp/semgrep:develop publish --visibility=org_private /src
```

## FAQ

### Can users from other organizations see my private rules?

No! Private rules are only visible to members of your organization.

### How can I view/use my rule?

You can view your rule in the [registry](https://semgrep.dev/r) by searching for [organization-id].[rule-id]. Example: r2c.test-rule-id. From here, you can add it to an existing policy to be enforced on new scans.

### Can I delete rules I've created?

Private rules cannot currently be deleted. Please contact us at [support@r2c.dev](mailto:support@r2c.dev?subject=Remove%20Private%20Rule) if you'd wish to have a rule removed.

### What happens if a rule with the same ID is published?

Rules are required to have unique IDs. If a rule with the same ID as an existing rule is published, it will override the previous rule.

<MoreHelp />