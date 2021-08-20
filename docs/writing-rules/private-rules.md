---
append_help_link: true
slug: private-rules
description: "Users in the Team and Enterprise tier for Semgrep App can publish rules to the Semgrep Registry that are not visible to others outside their organization. This can be useful for organizations where rules may contain code-sensitive information or legal requirements prevent using a public registry."
---

# Private rules

Users in the [Team and Enterprise tier](https://semgrep.dev/pricing) for Semgrep App can publish rules to the Semgrep Registry that are not visible to others outside their organization. This can be useful for organizations where rules may contain code-sensitive information or legal requirements prevent using a public registry.

As we continue to develop and refine this feature, we welcome and appreciate all feedback via email at product@returntocorp.com or in our [Community Slack](https://r2c.dev/slack).

## Getting Started

[View instructions](https://github.com/returntocorp/semgrep/tree/develop/upload) on how to beging uploading your private rules.

## FAQ

### Can users from other organizations see my private rules?

No! Private rules are only visible to members of your organization.

### How can I view/use my rule?

You can view your rule in the [registry](https://semgrep.dev/r) by searching for [organization-id].[rule-id]. Example: r2c.test-rule-id. From here, you can add it to an existing policy to be enforced on new scans.

### Can I delete rules I've created?

Private rules cannot currently be deleted. Please contact us at [support@r2c.dev](mailto:support@r2c.dev?subject=Remove%20Private%20Rule) if you'd wish to have a rule removed.

### What happens if a rule with the same ID is published?

Rules are required to have unique IDs. If a rule with the same ID as an existing rule is published, it will override the previous rule.

