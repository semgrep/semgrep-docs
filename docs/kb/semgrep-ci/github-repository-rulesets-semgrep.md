---
tags:
  - GitHub
  - Repository rulesets
description: Set up GitHub required workflows to efficiently implement Semgrep scans across many repositories.
---

# Use GitHub repository rulesets to implement Semgrep

Use [GitHub repository rulesets](https://docs.github.com/en/enterprise-cloud@latest/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/creating-rulesets-for-a-repository#introduction) to quickly implement Semgrep scans across hundreds or thousands of repositories in your GitHub organization. 

Repository rulesets allow you to add a Semgrep scan as a workflow that is [required for pull requests to pass before merging](https://docs.github.com/en/enterprise-cloud@latest/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets#require-workflows-to-pass-before-merging). Formerly, this feature was called [required workflows](https://github.blog/changelog/2023-08-02-github-actions-required-workflows-will-move-to-repository-rules/).

Repository rulesets use a centralized workflow file to execute the Semgrep scan action, meaning you can run scans on pull requests in as many repositories as desired by creating a single file.

## Set up the central Semgrep scan workflow

To use the Semgrep workflow in other repositories, you can create a new repository with the Semgrep workflow file, or add it to an existing repository where you store common workflows. This example describes creating the workflow in a new repository called `semgrep-workflow`.

1. Create a new repository following the [GitHub documentation](https://docs.github.com/en/get-started/quickstart/create-a-repo). 
  1. Name the repository `semgrep-workflow`.
  2. Choose the repository visibility that matches the widest visibility of the repositories you want to run the workflow in. For example, if you want to run Semgrep on public, internal, and private repositories, the repository containing the workflow file must be public.
2. Add the Semgrep workflow file to the repository at `.github/workflows/semgrep.yml`. You can use the [sample configuration](/semgrep-ci/sample-ci-configs/#sample-github-actions-configuration-file) provided in the documentation, or a [custom configuration](/deployment/customize-ci-jobs).

![Semgrep repository with workflow file](/img/kb/semgrep-workflow-repo.png)

The example repository is internal, so it can only be used to store workflows that run on internal and private repositories.

### Recommended configuration with merge queues

If you use [merge queues](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue) for repositories that will be scanned with this workflow, your config must include `merge_group` as a trigger in the `on:` block. Otherwise, [the workflow cannot run in the merge queue](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue#triggering-merge-group-checks-with-github-actions) and can block the queue.

Unlike for `pull_request` event types, Semgrep does not have any automatic configuration to run diff scans on `merge_group` events, so additional configuration is needed to run diff scans in this environment. The most straightforward solution is to configure the workflow to be skipped during the merge group check, since the primary goal of a Semgrep diff scan is to inform the developer **before** merging if they are introducing security issues.

With the recommended alterations and removal of event types that do not occur with repository rulesets, the [sample configuration](/docs/semgrep-ci/sample-ci-configs/#sample-github-actions-configuration-file) would look like this:

```yaml
name: Semgrep

on:
  pull_request: {}
  workflow_dispatch: {}
  merge_group:
    types: [checks_requested]

jobs:
  semgrep:
    name: semgrep/ci
    runs-on: ubuntu-latest

    container:
      image: semgrep/semgrep

    # Skip any PR created by dependabot and any check triggered by merge group
    if: (github.actor != 'dependabot[bot]') && (github.event != 'merge_group')

    steps:
      - uses: actions/checkout@v4
      - run: semgrep ci
        env:
          SEMGREP_APP_TOKEN: ${{ secrets.SEMGREP_APP_TOKEN }}
```

## Configure repository workflow access

The repository containing the Semgrep workflow must allow access to workflows from other repositories in the organization. 

To configure access:

1. In the repository containing the Semgrep workflow, click **Settings > Actions > General**.
2. In the **Access** section, select one of the **Accessible from** options to make the repository workflows accessible to your organization.

![Repository workflow access](/img/kb/semgrep-workflow-actions-access.png)

## Configure an organization secret

To run a scan using `semgrep ci`, Semgrep requires a valid token. When configuring Semgrep as a required workflow for multiple repositories, set up the token as an organization secret.

:::info
If you use a custom `semgrep.yml` configuration, ensure you refer to the secret as `${{ secrets.SEMGREP_APP_TOKEN }}` in your configuration. For the required workflow, this refers to the organization secret.
:::

1. Click **Create new token** on **Settings > [Tokens](https://semgrep.dev/orgs/-/settings/tokens)** in the Semgrep AppSec Platform.
2. Ensure the **Agent (CI)** scope is checked for the token.
3. Copy the token value for use on GitHub, and click **Save**.
4. Create an organization secret, following the [GitHub documentation](https://docs.github.com/en/enterprise-cloud@latest/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-an-organization).
  1. Name the secret `SEMGREP_APP_TOKEN`.
  2. Paste the value you copied from the Semgrep AppSec Platform.
  3. Select a value for **Repository access** that matches the repositories you intend to scan with the workflow.
  4. Click **Add secret**.

## Create an organization ruleset

To create the ruleset:

1. Go to your GitHub organization page and click **Settings**.
2. Under **Code, planning, and automation**, click **Repository** and then **Repository rulesets**.
    ![Repository rulesets](/img/kb/semgrep-workflow-repository-rulesets.png).
3. Click **New branch ruleset**.
4. Configure the enforcement status, bypass list, target repositories, and target branches based on your organization policies.
5. Under **Branch protections**, check the box **Require workflows to pass before merging**.
6. Click **Add workflow**.
7. In the **Add required workflow** modal, select the repository where you placed the Semgrep workflow.
8. Then, select the branch, tag, or commit to use.
9. In the **Pick a workflow file** field, click and select the Semgrep workflow you created in [Setting up the central Semgrep scan workflow](#setting-up-the-central-semgrep-scan-workflow).
10. Click **Add workflow**.
    ![Require workflows to pass before merging](/img/kb/semgrep-workflow-require-pass.png)
11. Click **Create** to create the ruleset.

Refer to GitHub's [Creating rulesets for repositories in your organization](https://docs.github.com/en/enterprise-cloud@latest/organizations/managing-organization-settings/creating-rulesets-for-repositories-in-your-organization) for more general guidance on creating a ruleset for your organization.

## Verify by creating a pull request

After completing the preceding steps, create a pull request in an affected repository to verify the workflow runs as expected.

1. Identify a repository targeted by the organization ruleset you created in the previous section.
2. Create a pull request in that repository, following the [GitHub documentation](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request).
3. After creating the pull request, review the checks and ensure the Semgrep workflow ran as expected.

The required workflow allows merge if the scan is successful, or blocks the pull request if the scan has blocking findings.

![Example pull request with successful required workflow](/img/kb/semgrep-workflow-pr-example.png)

## Limitations

Workflows required by repository rulesets are only triggered by `pull_request` or `merge_group` events. When triggered for a pull request, Semgrep runs a [diff-aware scan](/deployment/customize-ci-jobs#set-up-diff-aware-scans), which only scans changed files. 

To run full scans (scan all files) for your organization's repositories as well, you would need to supplement this setup with another approach, such as [reusable workflows](/docs/kb/semgrep-ci/github-reusable-workflows-semgrep).
