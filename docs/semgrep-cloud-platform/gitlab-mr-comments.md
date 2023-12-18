---
slug: gitlab-mr-comments 
append_help_link: true
title: GitLab MR comments
hide_title: true
toc_max_heading_level: 4
description: "Enable merge request (MR) comments in your GitLab repositories to display Semgrep findings to developers."
tags:
    - Semgrep Cloud Platform
    - Team & Enterprise Tier
---

import MoreHelp from "/src/components/MoreHelp"
import EnableAutofix from "/src/components/procedure/_enable-autofix.mdx"
import DisplayTaintedDataIntro from "/src/components/concept/_semgrep-code-display-tainted-data.mdx"
import CommentTriggers from "/src/components/reference/_comment-triggers.mdx"
import TroubleshootingPrLinks from "/src/components/reference/_troubleshooting-pr-links.mdx"
import PrCommentsInSast from "/src/components/procedure/_pr-comments-in-sast.mdx"
import DefineConnectionVariables from "/src/components/reference/_define-connection-variables.mdx"

<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>

# Set up GitLab merge request comments

Semgrep can create **merge request (MR) comments** in your GitLab repository. These comments inform your developers of **findings**, such as security issues, in their MRs. Semgrep can also provide remediation tips or code fixes that your developers can click to **commit** into their code directly.

:::info Prerequisites
- Merge request (MR) comments can only be set up through Semgrep Cloud Platform (SCP). [<i class="fas fa-external-link fa-xs"></i> Create an account](/semgrep-code/getting-started/#signing-in-to-semgrep-cloud-platform) to set up MR comments.
- You must connect your GitLab organization (org) to Semgrep. 
    - For GitLab Cloud users, this is done automatically after signing in.
    - For GitLab self-managed users, go to [<i class="fas fa-external-link fa-xs"></i> Settings](https://semgrep.dev/orgs/-/settings) and click **Add GitLab Self-Managed**.
- You must add or onboard a Semgrep project (repository) to SCP and it must complete at least one full scan on your default branch successfully.
:::

## Conditions for MR comment creation

MR comments appear for the following types of scans under these conditions:

<CommentTriggers comment_type="PR"/>

Automated comments on GitLab merge requests are displayed as follows:

![Semgrep GitLab MR comment](/img/gitlab-mr-comment.png#md-width)
**Figure** An inline GitLab merge request comment.

## Confirm account connection and access

### Confirm your Semgrep account's connection to GitLab

MR comments are enabled by default for users who have connected their GitLab organization (org) to Semgrep Cloud Platform. Confirm that you have the correct connection and access:

1. In your SCP account, click **Settings > Source code managers**.
2. Check that an entry for your GitLab org exists and is correct.

### Create a personal access token (PAT)

Creating a PAT grants the API scope to Semgrep, which lets it post comments.

1. In GitLab, go to [<i class="fas fa-external-link fa-xs"></i> Profile > Access Tokens](https://gitlab.com/-/profile/personal_access_tokens), and then add a token with `api` scope.
1. Copy the token created in the previous step.
1. For GitLab CI/CD users:
    1. Navigate to **Your repository** >  **Settings** > **CI/CD**. The URL of the page where you are ends with: `/username/project/-/settings/ci_cd`.
    1. Under **Variables** click **Expand**, and then click **Add variable**.
    1. Enter **PAT** (change this placeholder name as necessary) in the **Key** field and paste the token value copied in step two to the **Value** field.
    1. Select the **Mask variable** checkbox option, and then clear the **Protect variable** checkbox option.
    1. Update your `.gitlab-ci.yml` file with variable `GITLAB_TOKEN` and value `$PAT`. Refer to the following sample, substituting the placeholder <code><span className="placeholder">PAT</span></code> with the name you created for this variable.
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
1. For **other CI providers**:
    1. In your CI provider's interface, define the value of the PAT as a secret. Refer to your CI provider's documentation for steps to do this.
    2. Define the environment variable `GITLAB_TOKEN` and assign the PAT to it.

For more configuration options, see [GitLab CI Sample](/semgrep-ci/sample-ci-configs/#gitlab-ci).

<DefineConnectionVariables name="GitLab CI/CD" comment_type="MR"/>

<PrCommentsInSast name="GitLab" comment_type="MR" />

## Enabling autofix in GitLab repositories

[Autofix](/writing-rules/autofix) is a Semgrep feature in which rules contain suggested fixes to resolve findings.

<EnableAutofix />

## Dataflow traces in MR comments

![Screenshot of a GitLab MR comment with dataflow traces](/img/dataflow-traces-mr-comments.png#bordered)
**Figure** An inline GitLab pull request comment with dataflow traces.

<DisplayTaintedDataIntro />

### View the path of tainted data in MR comments

To enable dataflow traces in your CI pipeline, fulfill the following prerequisites:

:::info Prerequisites
- Set up Semgrep to post GitLab merge request comments, as described on this page.
- To obtain meaningful results of dataflow traces in MR comments, use Semgrep Pro Engine while scanning your repositories to display cross-file (interfile) findings. To enable Semgrep Pro Engine, see [Semgrep Pro Engine overview](/semgrep-code/semgrep-pro-engine-intro/).
- Not all Semgrep rules or rulesets make use of taint tracking. Ensure that you have a ruleset, such as the **default ruleset** added in your **[Policies](https://semgrep.dev/orgs/-/policies)**. If this ruleset is not added, go to [https://semgrep.dev/p/default](https://semgrep.dev/p/default), and then click **Add to Policy**. You can add rules that use taint tracking from [Semgrep Registry](https://semgrep.dev/explore).
:::

## Additional references 

<TroubleshootingPrLinks />

<MoreHelp />
