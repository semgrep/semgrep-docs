---
slug: oss-deployment 
append_help_link: true
title: Semgrep OSS in CI 
description: Learn how to set up a Semgrep OSS CI environment for yourself or your organization.
tags:
  - Deployment
  - Semgrep OSS Engine 
---

import CiScheduling from "/src/components/reference/_ci-scheduling.mdx"

# Semgrep OSS in CI 

Semgrep OSS can be set up run static application security testing (SAST) scans on repositories of any size.

This guide explains how to set up Semgrep OSS in your CI pipeline using entirely open source components, also known as a **stand-alone** CI setup. The preferred Semgrep OSS command is `semgrep scan`.

## Prerequisites

- Sufficient permissions in your repository to:
    - Commit a CI configuration file.
    - Start or stop a CI job.
- Optional: Create environment variables.

## Ensure your scans use open source components

This setup uses only the **LGPL 2.1** Semgrep CLI tool. It is not subject to the usage limits of Semgrep Pro. In order to remain strictly open-source, you must ensure that the rules you run use open-source licenses or are your own custom Semgrep rules.

To check a rule's license, check the `license` key under the `metadata` of a Semgrep rule.

<details><summary>Click to expand for an example of a rule with a <code>license</code> key.</summary>

This rule's last line displays a `license: MIT` key-value pair.

```yaml
rules:
  - id: eslint.detect-object-injection
    patterns:
      - pattern: $O[$ARG]
      - pattern-not: $O["..."]
      - pattern-not: "$O[($ARG : float)]"
      - pattern-not-inside: |
          $ARG = [$V];
          ...
          <... $O[$ARG] ...>;
      - pattern-not-inside: |
          $ARG = $V;
          ...
          <... $O[$ARG] ...>;
      - metavariable-regex:
          metavariable: $ARG
          regex: (?![0-9]+)
    message: Bracket object notation with user input is present, this might allow an
      attacker to access all properties of the object and even it's prototype,
      leading to possible code execution.
    languages:
      - javascript
      - typescript
    severity: WARNING
    metadata:
      cwe: "CWE-94: Improper Control of Generation of Code ('Code Injection')"
      primary_identifier: eslint.detect-object-injection
      secondary_identifiers:
        - name: ESLint rule ID security/detect-object-injection
          type: eslint_rule_id
          value: security/detect-object-injection
      license: MIT
```
</details>

For a comparison of the behavior between Semgrep OSS CI scans and Semgrep Pro scans, see [<i class="fa-regular fa-file-lines"></i> Semgrep Pro versus Semgrep OSS](semgrep-pro-vs-oss). 

## Set up the CI job 

### Use template configuration files

Click the link of your CI provider to view a configuration file you can commit to your repository to create a Semgrep job:

- [GitHub Actions](/docs/semgrep-ci/sample-ci-configs/#github-actions)
- [GitLab CI/CD](/docs/semgrep-ci/sample-ci-configs/#gitlab-cicd)
- [Jenkins](/docs/semgrep-ci/sample-ci-configs/#jenkins)
- [Bitbucket Pipelines](/docs/semgrep-ci/sample-ci-configs/#bitbucket-pipelines)
- [Buildkite](/docs/semgrep-ci/sample-ci-configs/#buildkite)
- [CircleCI](/docs/semgrep-ci/sample-ci-configs/#circleci)
- [Azure Pipelines](/docs/semgrep-ci/sample-ci-configs/#azure-pipelines)

### Use other methods

Use either of the following methods to run Semgrep on other CI providers.

#### Direct docker usage

Reference or add the [semgrep/semgrep](https://hub.docker.com/r/semgrep/semgrep) Docker image directly. The method to add the Docker image varies based on the CI provider. This method is used in the [BitBucket Pipelines code snippet](/semgrep-ci/sample-ci-configs/#sample-bitbucket-pipelines-configuration-snippet).

#### Install `semgrep` within your CI job

If you cannot use the Semgrep Docker image, install Semgrep as a step or command within your CI job:

1. Add `pip3 install semgrep` into the configuration file as a step or command, depending on your CI provider's syntax.
2. Run any valid `semgrep scan` command, such as `semgrep scan --config auto`.

For an example, see the the [Azure Pipelines code snippet](/semgrep-ci/sample-ci-configs/#sample-azure-pipelines-configuration-snippet).

## Configure your CI job

The following sections describe methods to customize your CI job.

<!-- 
### Pass or fail the CI job

By default, a Semgrep CI job exits with exit code 1 if the scan returns any findings. This causes the job to fail.

Semgrep provides **fail open** options. These options enable you to suppress findings that block your pipeline:

<dl>
	<dt><code>semgrep scan</code></dt>
	<dd><strong>Fail</strong> on blocking findings, but <strong>passes</strong> on internal errors. This is the default behavior.</dd>
	<dt><code>semgrep scan --no-suppress-errors</code></dt>
	<dd>The Semgrep CI job <strong>fails</strong> on blocking findings and on internal errors.</dd>
	<dt><code>semgrep scan || true</code></dt>
	<dd><strong>Pass</strong> on blocking findings and on internal errors.</dd>
</dl>

Refer to [Semgrep exit codes](/docs/cli-reference/#exit-codes) to understand various internal issues that cause Semgrep to fail.
-->
<!--
### Diff-aware scanning

<DiffAwareScanning />
-->

### Schedule your scans

<CiScheduling />

### Customize rules and rulesets

#### Add rules to scan with `semgrep scan`

You can customize what rules to run in your CI job. The rules and rulesets can come from the [Semgrep Registry](https://semgrep.dev/explore/), or your own rules. The sources for rules to scan with are:

* The value of the `SEMGREP_RULES` environment variable.
* The value passed after `--config`. You can use multiple `--config` arguments, one per value. For example: `semgrep scan --config p/default --config p/comment`.

The `SEMGREP_RULES` environment variable accepts a list of local and remote rules and rulesets to run. The `SEMGREP_RULES` list is delimited by a space (` `) if the variable is exported from a shell command or script block. For example, see the following BitBucket Pipeline snippet:

```yaml
# ...
  script:
    - export SEMGREP_RULES="p/nginx p/ci no-exec.yml" 
    - semgrep ci
# ...
```

The line defining `SEMGREP_RULES` defines three different sources, delimited by a space:

```
- export SEMGREP_RULES="p/nginx p/ci no-exec.yml" 
```

The example references two rulesets from Semgrep Registry (`p/nginx` and `p/ci`) and a rule available in the repository (`no-exec.yml`).

If the `SEMGREP_RULES` environment variable is defined from a YAML block, the list of rules and rulesets to run is delimited by a newline. See the following example of a GitLab CI/CD snippet:
```YAML
# ...
variables:
  SEMGREP_RULES: >-
    p/nginx
    p/ci
    no-exec.yml
# ...
```

#### Write your own rules

Write custom rules to enforce your team's coding standards and security practices. Rules can be forked from existing community-written rules.

See [Writing rules](/writing-rules/overview) to learn how to write custom rules.

### Ignore files

See [<i class="fa-regular fa-file-lines"></i> Ignore files, folders, and code](/ignore-oss).

<CiIgnoringFiles />

### Save or export findings to a file

To save or export findings, pass file format options and send the formatted findings to a file.

For example, to save to a JSON file:

`semgrep scan --json > findings.json`

You can also use the SARIF format:

`semgrep scan --sarif > findings.sarif`

Refer to the [CLI reference](/cli-reference) for output formats.

## Migrate to Semgrep Cloud Platform from a stand-alone CI setup

Migrate to Semgrep Cloud Platform to:

* **View and manage findings in a centralized location**. False positives can be ignored through triage actions. These actions can be undertaken in bulk.
* **Configure rules and actions to undertake when a finding is generated by the rule**. You can undertake the following actions:
    * Audit the rule. This means that findings are kept within Semgrep's **Findings** page and are not surfaced to your team's SCM.
    * Show the finding to your team through the use of PR and MR comments.
    * Block the pull or merge request.

To migrate to Semgrep Cloud Platform:

1. Create an account in [Semgrep Cloud Platform](https://semgrep.dev/login).
2. Click **[Projects](https://semgrep.dev/orgs/-/projects)** > **Scan New Project** > Run scan in CI.
3. Follow the steps in the setup page to complete your migration.
4. Optional: Remove the old CI job that does not use Semgrep Cloud Platform.

## Semgrep OSS jobs versus Semgrep Pro jobs

| Feature  | Semgrep Pro CI (`semgrep ci`)| Semgrep OSS CI (`semgrep scan`) |
| -------  | ------ | ------ |
| Customized SAST scans         |  ✔️        | ✔️       |
| [SCA (software composition analysis) scans](/semgrep-supply-chain/overview)         |  ✔️        | --       |
| [Secrets  scans](/semgrep-secrets/conceptual-overview)         |  ✔️       | --        |
| [PR (pull request) or MR (merge request) comments](/category/pr-or-mr-comments)         |  ✔️        | --       |
| [Finding status tracked over lifetime](/semgrep-code/findings)         |  ✔️        | --       |

