---
title: Scan with GitHub and Jenkins
description: Set up full and diff-aware scans in Jenkins with Multibranch Pipeline projects.
toc_max_heading_level: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Scan GitHub projects in Jenkins

This document shows you how to configure Jenkins pipelines to scan code hosted in GitHub repositories.

The configuration described in this document is intended to run full scans on your default branch `main` and diff-aware scans on pull request (PR) branches. It sets up a Multibranch Pipeline project using `when` conditions in the Jenkinsfile and provides access to the variables needed for diff-aware scans.

:::info
Your UI (user interface) may vary depending on your Jenkins installation. The steps in this document use the Classic UI.
:::

## Create the Jenkinsfile

Create the `Jenkinsfile` in the root of your repository based on the following code snippet, which uses Jenkins declarative syntax and runs Semgrep in Docker:

```bash
pipeline {
  agent any
  environment {
    // Required for a Semgrep AppSec Platform-connected scan:
    SEMGREP_APP_TOKEN = credentials('SEMGREP_APP_TOKEN')
    // Set repo name to expected format
    SEMGREP_REPO_NAME = env.GIT_URL.replaceFirst(/^https:\/\/github.com\/(.*)$/, '$1')
  }
  stages {
    stage('semgrep-diff-scan') {
      when {
        branch "PR-*"
      }
      steps {
        sh '''git fetch --no-tags --force --progress -- $GIT_URL +refs/heads/$CHANGE_TARGET:refs/remotes/origin/$CHANGE_TARGET
              git checkout -b $CHANGE_TARGET origin/$CHANGE_TARGET
              git checkout $GIT_BRANCH
           '''
        sh '''docker pull semgrep/semgrep && \
            docker run \
            -e SEMGREP_APP_TOKEN=$SEMGREP_APP_TOKEN \
            -e SEMGREP_REPO_NAME=$SEMGREP_REPO_NAME \
            -e SEMGREP_BASELINE_REF=$(git merge-base $GIT_BRANCH $CHANGE_TARGET) \
            -e SEMGREP_PR_ID="${env.CHANGE_ID}"
            -v "$(pwd):$(pwd)" --workdir $(pwd) \
            semgrep/semgrep semgrep ci '''
      }
    }
    stage('semgrep-scan') {
      when {
        branch "main"
      }
      steps {
        sh '''docker pull semgrep/semgrep && \
            docker run \
            -e SEMGREP_APP_TOKEN=$SEMGREP_APP_TOKEN \
            -e SEMGREP_REPO_NAME=$SEMGREP_REPO_NAME \
            -v "$(pwd):$(pwd)" --workdir $(pwd) \
            semgrep/semgrep semgrep ci '''
      }
    }
  }
  post {
    // Clean after build
    always {
      cleanWs()
    }
  }
}
```

This Jenkinsfile uses a `SEMGREP_APP_TOKEN` [stored in the Jenkins instance credentials store](https://www.jenkins.io/doc/book/security/credentials/#working-with-credentials).

It defines two Semgrep stages: one runs a full scan of the main branch, while the other runs a diff-aware scan of the PR branch. The diff-aware scan configuration uses a computed merge base rather than setting the merge base to the default branch. This is similar to how Semgrep runs in GitHub actions. Setting the `SEMGREP_REPO_NAME` and `SEMGREP_PR_ID` allows Semgrep to identify the connected project and related PR.

To compute the merge base, the pipeline runs additional Git commands to ensure the default branch is available to Git. Afterward, the pipeline cleans the workspace, ensuring that subsequent use of these commands for future scans is successful.

:::info
Using a computed merge base is strongly recommended. If you set `SEMGREP_BASELINE_REF` to `main`, or the primary branch, you may see spurious findings in diff-aware scans if the remote branch has been updated independently of the PR branch, or the branch may not be available locally unless you perform a `git fetch` or `git checkout`, as shown in the example in this document.
:::

## Configure the Multibranch Pipeline project

1. Log in to Jenkins, and click **New Item**.
2. Provide a name for your project, select **Multibranch Pipeline**, and click **OK**. 
3. Under **Branch Sources**, click **Add source** and select **GitHub**.
4. Select **Repository HTTPS URL** and provide your project URL in the following format: `https://github.com/<namespace>/<project>/`.
5. Under **Behaviors > Discover branches > Strategy**, select **Exclude branches that are also filed as PRs**.
6. For **Discover pull requests from origin > Strategy**, select **The current pull request revision**.
7. For **Property strategy**, select **All branches get the same properties**.
8. Under **Build Configuration**, for **Mode**, select **by Jenkinsfile**, and enter the script path as `Jenkinsfile`.
9. Optional: Under **Scan Multibranch Pipeline Triggers**, select **Periodically if not otherwise run** if you want to run the pipeline occasionally, if it's not run for other reasons, and choose the desired interval.
10. Optional: Under **Orphaned Item Strategy**, select **Discard old items** and select the desired time interval and number of items, so that you don’t lose logs for deleted branches immediately.
11. Click **Save** to proceed.

### Add GitHub webhooks

If your Jenkins instance is already configured to manage webhooks automatically on GitHub, these steps are not necessary. To review the settings and view the webhook URL, go to **Manage Jenkins > System Configuration > System > GitHub**. Expand the <i class="fa-solid fa-circle-question"></i> next to **GitHub Servers** to see the webhook URL, and review the information provided to determine whether hooks are managed automatically. If not, follow these steps:

1. Go to the repository on GitHub.
2. Go to **<i class="fa-solid fa-gear"></i> Settings > <i class="fa-solid fa-webhook"></i> Webhooks**.
3. Click **Add webhook**.
4. In **Payload URL**, enter your Jenkins instance's webhook URL. This URL is in the form `$JENKINS_BASE_URL/github-webhook/`.
5. For **Content type**, select **application/json**.
6. Under **Which events would you like to trigger this webhook?** select **Send me everything**.
7. Click **Add webhook** to proceed.
