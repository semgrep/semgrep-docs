---
tags:
  - GitHub
  - Repository rulesets
description: Set up GitHub required workflows to efficiently implement Semgrep scans across many repositories.
---

# Using GitHub repository rulesets to implement Semgrep

Use [GitHub repository rulesets](https://docs.github.com/en/enterprise-cloud@latest/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/creating-rulesets-for-a-repository#introduction) to quickly implement Semgrep scans across hundreds or thousands of repositories in your GitHub organization. Repository rulesets enable you to add a Semgrep scan to many repositories as a workflow that is [required to pass before merging](https://docs.github.com/en/enterprise-cloud@latest/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets#require-workflows-to-pass-before-merging).

This allows you to set up a centralized repository with a single Semgrep workflow file that can be applied to as many repositories as desired. Formerly, this feature was called [required workflows](https://github.blog/changelog/2023-08-02-github-actions-required-workflows-will-move-to-repository-rules/).

## Setting up the central Semgrep scan workflow

To use the Semgrep workflow in other repositories, you can either create a new repository with the Semgrep workflow file, or add it to an existing repository where you store common workflows. 

When a workflow is required to pass before merging, the workflow file needs to be in a repository that matches the widest visibility of the repositories you want to run it in. For example, if you want to run Semgrep on public, internal, and private repositories, the repository containing the workflow file must be public.

After creating or identifying the repository, add the Semgrep workflow file at your desired path. In this example, it's placed in the standard location for a GitHub workflow: `.github/workflows/semgrep.yml`:

![Semgrep repository with workflow file](/img/kb/semgrep-workflow-repo.png)

This repository is internal, so it could only be used to store workflows to run on internal and private repositories.

You can use the [sample configuration](/docs/semgrep-ci/sample-ci-configs/#sample-github-actions-configuration-file) provided in the documentation, or a custom configuration, if you've already developed one.

## Configuring repository workflow access

If you haven't previously used the repository containing the Semgrep workflow to implement repository rulesets, you may need to provide access to the workflow for other repositories in the organization.

1. In the repository containing the Semgrep workflow, click **Settings > Actions > General**.
2. In the **Access** section, select one of the **Accessible from** options to make the repository accessible to your organization or more broadly.

![Repository workflow access](/img/kb/semgrep-workflow-actions-access.png)

## Configuring an organization secret

To run a scan using `semgrep ci`, Semgrep requires a valid app token. By default, the token is referenced in GitHub Actions configurations as `${{ secrets.SEMGREP_APP_TOKEN }}`. When the workflow file is committed to a single repository, the secret is also typically added to the repository secrets for Actions.

To make the secret available to all repositories that use this workflow, create the secret as an [organization secret](https://docs.github.com/en/enterprise-cloud@latest/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-an-organization).

If you prefer to not to add the secret as an organization secret, you should separately determine how to make the value available to the workflow when it runs on the target repositories.

## Creating the organization ruleset

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

You can refer to GitHub's [Creating rulesets for repositories in your organization](https://docs.github.com/en/enterprise-cloud@latest/organizations/managing-organization-settings/creating-rulesets-for-repositories-in-your-organization) for more general guidance on creating a ruleset for your organization.

## Verify by creating a pull request

After setup, hen you create a pull request in a repository where this ruleset applies, the Semgrep workflow runs for the PR even if there is no `.github/workflows/semgrep.yml` file in that repository.

The required workflow allows merge if the scan is successful, or blocks the pull request if the scan has blocking findings.

![Example PR with successful required workflow](/img/kb/semgrep-workflow-pr-example.png)

## Limitations

Workflows required by repository rulesets are only triggered by `pull_request` or `merge_group` events. When triggered for a pull request, Semgrep runs a [diff-aware scan] and only scans changed files. Therefore, to run a full scan for your organization's repositories (scan all files), you would need to choose a different approach, such as [reusable workflows](/docs/kb/semgrep-ci/github-reusable-workflows-semgrep).