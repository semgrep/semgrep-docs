---
slug: gitlab-mr-comments 
append_help_link: true
title: GitLab MR comments
hide_title: true
toc_max_heading_level: 4
description: "Enable merge request (MR) comments in your GitLab repositories to display Semgrep findings to developers."
tags:
    - Semgrep Cloud Platform
    - Community Tier
    - Team & Enterprise Tier
---

import MoreHelp from "/src/components/MoreHelp"
import EnableAutofix from "/src/components/procedure/_enable-autofix.mdx"

<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>

# Enabling GitLab merge request comments

:::info Prerequisites
* Pull request (PR) comments can only be enabled through Semgrep Cloud Platform (SCP). [Create an account](/semgrep-code/getting-started/#signing-in-to-semgrep-cloud-platform) to set up Slack notifications.
* To receive alerts and notifications, you must [add or onboard a project](/semgrep-code/getting-started/#option-b-adding-a-repository-from-github-gitlab-or-bitbucket) (repository) to Semgrep Cloud Platform for scanning.
:::

This section documents how to enable Semgrep Cloud Platform to post comments on merge requests.

Automated comments on GitLab merge requests are displayed as follows:

![Semgrep GitLab MR comment](/img/gitlab-mr-comment.png)
**Figure** An inline GitLab merge request comment.

To enable GitLab merge request comments, follow these steps:

1. In GitLab, go to [Profile > Access Tokens](https://gitlab.com/-/profile/personal_access_tokens), and then add a token with `api` scope.
1. Copy the token created in the previous step.
1. Navigate to **Your repository** >  **Settings** > **CI/CD**. The URL of the page where you are ends with: `/username/project/-/settings/ci_cd`.
1. Under **Variables** click **Expand**, and then click **Add variable**.
1. Enter **PAT** (change this placeholder name as necessary) in the **Key** field and paste the token value copied in step two to the **Value** field.
1. Select the **Mask variable** checkbox option, and then clear the **Protect variable** checkbox option.
1. Update your `.gitlab-ci.yml` file with variable `GITLAB_TOKEN` and value `$PAT`. Refer to the following example:
```yaml
semgrep:
  # A Docker image with Semgrep installed.
  image: returntocorp/semgrep
  # Run the "semgrep ci" command on the command line of the docker image.
  script: semgrep ci

  rules:
  # Scan changed files in MRs, (diff-aware scanning):
  - if: $CI_MERGE_REQUEST_IID

  # Scan mainline (default) branches and report all findings.
  - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH

  variables:
    # Connect to Semgrep Cloud Platform through your SEMGREP_APP_TOKEN.
    # Generate a token from Semgrep Cloud Platform > Settings
    # and add it as a variable in your GitLab CI/CD project settings.
    SEMGREP_APP_TOKEN: $SEMGREP_APP_TOKEN
    # Receive inline MR comments (requires Semgrep Cloud Platform account)
    GITLAB_TOKEN: $PAT
```
Substitute the placeholder <code><span className="placeholder">PAT</span></code> with the name you created for this variable.

For more configuration options, see [GitLab CI Sample](/semgrep-ci/sample-ci-configs/#gitlab-ci).

:::info
Only rules in the **Comment** and **Block** columns of your [Rule board](https://semgrep.dev/orgs/-/board) create MR comments.
:::

## Enabling autofix in GitLab repositories

[Autofix](/writing-rules/autofix) is a Semgrep feature in which rules contain suggested fixes to resolve findings.

<EnableAutofix />

## Dataflow traces in MR comments

TODO ![Screenshot of a GitLab MR comment with dataflow traces](/img/dataflow-traces-pr-comments.png#bordered)
**Figure** An inline GitLab pull request comment with dataflow traces.

<DisplayTaintedDataIntro />

### Viewing the path of tainted data in MR comments

To enable dataflow traces feature in your CI pipeline, fulfill the following prerequisites:

:::info Prerequisites
- Enable GitLab merge request Semgrep comments. For more details, see [Enabling GitLab merge request comments](#enabling-gitlab-merge-request-comments) section.
- To see meaningful results of dataflow traces in MR comments, use Semgrep Pro Engine while scanning your repositories to see interfile results (results that show the path of data across multiple files). For more information, see [Semgrep Pro Engine overview](/semgrep-code/semgrep-pro-engine-intro/).
- Not all Semgrep rules or rulesets make use of taint tracking. Ensure that you have a ruleset, such as the **default ruleset** added in your **[Rule Board](https://semgrep.dev/orgs/-/board)**. If this ruleset is not added, go to [https://semgrep.dev/p/default](https://semgrep.dev/p/default), and then click **Add to Rule Board**. You can add rules that use taint tracking from [Semgrep Registry](https://semgrep.dev/explore).
:::

<MoreHelp />
