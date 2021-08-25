---
slug: private-rules
description: "Users in the Team and Enterprise tier for Semgrep App can publish rules to the Semgrep Registry that are not visible to others outside their organization. This can be useful for organizations where rules may contain code-sensitive information or legal requirements prevent using a public registry."
---

import MoreHelp from "/src/components/MoreHelp"

# Private rules

Users in the [Team and Enterprise tier](https://semgrep.dev/pricing) for Semgrep App can publish rules to the Semgrep Registry that are not visible to others outside their organization. This can be useful for organizations where rules may contain code-sensitive information or legal requirements prevent using a public registry.

As we continue to develop and refine this feature, we welcome and appreciate all feedback via email at [product@r2c.dev](mailto:product@r2c.dev) or in our [Community Slack](https://r2c.dev/slack).

## Getting started

***DEPLOYMENT_ID*** can be found in Semgrep App [here](https://semgrep.dev/manage/settings)

***SEMGREP_TOKEN*** can be generated in Semgrep App [here](https://semgrep.dev/manage/settings/tokens)

### Dockerhub
In a directory with the rule file RULE_YAML you want to upload run:
```
docker pull returntocorp/semgrep-upload:latest
docker run -v $(pwd):/rules -e SEMGREP_UPLOAD_DEPLOYMENT=DEPLOYMENT_ID -e SEMGREP_TOKEN=SOME_TOKEN returntocorp/semgrep-upload:latest /rules/RULE_YAML
```

### Using different registry_url

You can change the registry URL used by setting the SEMGREP_REGISTRY_BASE_URL env variable

### Local Dev

```
make setup
pipenv install
pipenv run python upload_private_rules.py rule.yaml --deployment_id DEPLOYMENT_ID --token SOME_TOKEN
```

### Docker Dev

```
make build
docker run -v $(pwd):/src -e SEMGREP_UPLOAD_DEPLOYMENT=DEPLOYMENT_ID -e SEMGREP_TOKEN=SOME_TOKEN returntocorp/semgrep-upload /src/RULE_YAML
```

### Deploy

```
make deploy
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