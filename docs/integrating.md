---
slug: integrating
append_help_link: true
tags:
  - Support
description: >-
  Learn about integrating Semgrep and the Semgrep Registry into your product.
---

# Semgrep integration guide for partners

We're excited that you're integrating Semgrep into your tooling! Our goal with Semgrep is to bring world-class security tools to developers based on our conviction that software will run the most exciting parts of the future. It's not something that we can do alone; we want to build a community around sharing programmatic knowledge about how to build secure software.

## Requirements for integrators

* Do not resell rules from the Registry, unless you acquire an explicit license from Semgrep, Inc. Semgrep rules are [released under the Semgrep Rules License](https://github.com/semgrep/semgrep-rules/blob/develop/LICENSE), which prohibits redistribution in a commercial product.
* State that you are using Semgrep; refer to Semgrep as capital S with the trademark: Semgrep™
* Link to [semgrep.dev/login](https://semgrep.dev/login) to allow users to get an API token to pass to Semgrep so they can access the Pro Engine and rules.
* Set `SEMGREP_INTEGRATION_NAME` in your environment to your domain name (for example, "xyz.com"). This helps us reproduce and debug issues with Semgrep in your environment.
* Don't integrate `semgrep scan` in a CI setup. Instead use `semgrep ci`, which has diff-awareness built-in and is designed to be easy to integrate into dozens of CI environments. It's also much faster.
* Enable metrics (`--metrics=on`) by default, which lets the Semgrep team prioritize languages and technologies to improve speed and accuracy.
* Contribute new public rules back to the [semgrep-rules repository](https://github.com/semgrep/semgrep-rules). This helps us avoid community fragmentation and will automatically pull your rule into the searchable Registry on semgrep.dev; plus Semgrep will maintain it for you!

For more information, please refer to [the section on licensing](licensing.md) in our documentation. If you have additional questions, email us at [partners@semgrep.com](mailto:partners@semgrep.com). 
