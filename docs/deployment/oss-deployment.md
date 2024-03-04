---
slug: oss-deployment 
append_help_link: true
title: Semgrep OSS in CI 
description: Learn how to set up a Semgrep OSS CI environment for yourself or your organization.
tags:
  - Deployment
  - Semgrep OSS Engine 
---

# Semgrep OSS in CI 

Semgrep OSS can be set up run static application security testing (SAST) scans on repositories of any size.

This guide explains how to set up Semgrep OSS in your CI pipeline using entirely open source components, also known as a **stand-alone** CI setup. The preferred Semgrep command when running OSS Semgrep is `semgrep scan`.

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

For a comparison of the behavior between Semgrep OSS CI scans and Semgrep Pro scans, see

## Prerequisites

- Sufficient permissions in your repository to:
    - Commit a CI configuration file.
    - Start or stop a CI job.
- Optional: Create environment variables.

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

Reference or add the [semgrep/semgrep](https://hub.docker.com/r/semgrep/semgrep) Docker image directly. The method to add the Docker image varies based on the CI provider. This method is used in the BitBucket Pipelines code snippet#bitbucket-pipelines-code-snippet. TODO add link

#### Install `semgrep` within your CI job

If you cannot use the Semgrep Docker image, install Semgrep as a step or command within your CI job:

1. Add `pip3 install semgrep` into the configuration file as a step or command, depending on your CI provider's syntax.
2. Run any valid `semgrep ci` command, such as `semgrep ci --config auto`.

This method is used in ADD LINK

## Configure your CI job

The following sections describe methods to customize your CI job.

### Passing or failing the CI job

By default, a Semgrep CI job exits with exit code 1 if the scan returns any findings. This causes the job to fail.

Semgrep provides **fail open** options. These options enable you to suppress findings that block your pipeline:

<dl>
	<dt><code>semgrep ci</code></dt>
	<dd><strong>Fail</strong> on blocking findings, but <strong>passes</strong> on internal errors. This is the default behavior.</dd>
	<dt><code>semgrep ci --no-suppress-errors</code></dt>
	<dd>The Semgrep CI job <strong>fails</strong> on blocking findings and on internal errors.</dd>
	<dt><code>semgrep ci || true</code></dt>
	<dd><strong>Pass</strong> on blocking findings and on internal errors.</dd>
</dl>

Refer to [Semgrep exit codes](/docs/cli-reference/#exit-codes) to understand various internal issues that cause Semgrep to fail.

### Diff-aware scanning

<DiffAwareScanning />

### Setting a scan schedule

<CiScheduling />

### Customizing rules and rulesets

#### Adding rules to scan with `semgrep ci`

`semgrep ci` accepts a list of rules and rulesets to run on each scan. The rules and rulesets can come from the [Semgrep Registry](https://semgrep.dev/explore/), or your own rules. The sources for rules to scan with are:

* A `.semgrep` folder located at the root of your repository.
* The value of the `SEMGREP_RULES` environment variable.

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

#### Writing your own rules

Write custom rules to enforce your team's coding standards and security practices. Rules can be forked from existing community-written rules.

See [Writing rules](/writing-rules/overview/) to learn how to write custom rules.

### Ignoring files

<CiIgnoringFiles />

### Saving or exporting findings to a file

To save or export findings, pass file format options and send the formatted findings to a file.

For example, to save to a JSON file:

`semgrep ci --json > findings.json`

You can also use the SARIF format:

`semgrep ci --sarif > findings.sarif`

Refer to the [CLI reference](/cli-reference) for output formats.

## Migrating to Semgrep Cloud Platform from a stand-alone CI setup

Migrate to Semgrep Cloud Platform to:

* **View and manage findings in a centralized location**. False positives can be ignored through triage actions.These actions can be undertaken in bulk.
* **Configure rules and actions to undertake when a finding is generated by the rule**. You can undertake the following actions:
    * Audit the rule. This means that findings are kept within Semgrep's Findings page and are not surfaced to your team's SCM.
    * Show the finding to your team through the use of PR and MR comments.
    * Block the pull or merge request.

To migrate to Semgrep Cloud Platform:

1. Create an account in [Semgrep Cloud Platform](https://semgrep.dev/login).
2. Click **[Projects](https://semgrep.dev/orgs/-/projects)** > **Scan New Project** > Run scan in CI.
3. Follow the steps in the setup to complete your migration.
4. Optional: If you have previously set a custom `SEMGREP_TIMEOUT` environment variable, commit it to the CI configuration file created by Semgrep Cloud Platform. Do not copy `SEMGREP_RULES`.
4. Optional: Remove the old CI job that does not use Semgrep Cloud Platform.

## Semgrep OSS jobs versus Semgrep Pro jobs

<!-- should be a table -->
* Stand-alone Semgrep jobs cannot send [PR or MR comments](/category/pr-or-mr-comments/). These comments describe the finding and help developers resolve vulnerabilities and other code issues.
* Stand-alone Semgrep jobs cannot fail a CI job based on the severity of a finding or some other user-defined criteria. There are no user-defined rule modes to distinguish between rules.
* Findings are written to a log, but there is no record of a finding's **status**, such as open, ignored, or fixed.
* Stand-alone jobs do not run software composition analysis (SCA) or secrets detection scans.
* Stand-alone Semgrep OSS jobs run on trunk branches.

| Feature  | Semgrep Pro CI (`semgrep ci`)| Semgrep OSS CI (`semgrep scan`) |
| -------  | ------ | ------ |
| SCA (software composition analysis) scans         |  ✔️        | --       |
| Secrets  scans         |  ✔️       | --        |
| PR (pull request) or MR (merge request) comments         |  ✔️        | --       |

<!--

| Diff-aware scans         |  ✔️        | --       |
-->
