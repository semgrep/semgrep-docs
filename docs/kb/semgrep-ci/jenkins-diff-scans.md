---
title: Full and diff-aware scans with GitHub and Jenkins
description: Set up full and diff-aware scans in Jenkins with Multibranch pipeline projects.
toc_max_heading_level: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Full and diff-aware scans with GitHub and Jenkins

This guide shows you how to set up:

- Full scans that run on the default branch
- Full and diff-aware scans that run on the default branch and pull request (PR) branches

Full scans use a simple Jenkins Pipeline project. Full and diff-aware scans use a Jenkins Multibranch Pipeline project. Both options use GitHub as the source code manager, and the repository scanned has a default branch named `main`.

:::info
Your UI (user interface) may vary depending on your Jenkins installation. The steps in this document use the Classic UI.
:::

<Tabs
    defaultValue="full-scans"
    values={[
    {label: 'Full Semgrep scans only', value: 'full-scans'},
    {label: 'Full and diff-aware Semgrep scans', value: 'full-and-diff-scans'},
    ]}
>

<TabItem value='full-scans'>

### Create the Jenkinsfile

Create the `Jenkinsfile` in the root of the GitHub repository where you're setting up Semgrep. This code snippet uses Jenkins declarative syntax and runs Semgrep in Docker.

```bash
pipeline {
  agent any
  environment {
    // Required for a Semgrep AppSec Platform-connected scan:
    SEMGREP_APP_TOKEN = credentials('SEMGREP_APP_TOKEN')
  }
  stages {
    stage('semgrep-scan') {
      steps {
        sh '''docker pull semgrep/semgrep && \
            docker run \
            -e SEMGREP_APP_TOKEN=$SEMGREP_APP_TOKEN \
            -v "$(pwd):$(pwd)" --workdir $(pwd) \
            semgrep/semgrep semgrep ci '''
      }
    }
  }
}
```

This Jenkinsfile uses a `SEMGREP_APP_TOKEN` stored in the Jenkins instance credentials store. It does not set any other variables.

### Set up the Pipeline

1. Under **General**, Check the box **GitHub Project** box and provide your project URL (in the format `https://github.com/<namespace>/<project>/`).
2. In the **Build Triggers** section, select the **GitHub Hook trigger for GITScm polling** box.
1. Under **Pipeline**, select **Pipeline script from SCM** from the dropdown.
2. For **SCM**: Select **Git**. This opens up the **Repositories** area. Provide the URL you provided in step 3 as your **Repository URL**. If you need to provide the credentials to access a private repo, do so now as well.
4. For **Branches to build**, enter `refs/heads/main`.
5. For **Additional Behaviours**: click **Add**. From the options, select **Check out to specific local branch**, and enter `**` in **Branch name**.
6. In **Script Path**, enter `Jenkinsfile`.
7. Select **Lightweight checkout**.

### On GitHub

If your Jenkins instance is already configured to manage webhooks automatically on GitHub, these steps are not necessary. 

To review the settings and view the webhook URL, go to **Manage Jenkins > Configure System > GitHub**. Expand the <i class="fa-solid fa-circle-question"></i> next to **GitHub Server** to find the webhook URL, and review the configuration to see if hooks are managed automatically.

If they are not, follow these steps:

1. Go to the repository on GitHub.
2. Select **<i class="fa-solid fa-gear"></i> Settings > <i class="fa-solid fa-webhook"></i> Webhooks**.
2. Click **Add webhook**.
3. In **Payload URL**, enter your Jenkins' instance webhook URL. Generally this is in the form `$JENKINS_BASE_URL/github-webhook/`.
4. For **Content type**, Select `application/json`.
5. Select **Send me everything**.

With the configuration provided initially, findings in Semgrep AppSec Platform appear under the Jenkins project name, rather than under the typical GitHub name `<namespace>/<project>`. To change the name using `SEMGREP_REPO_NAME`, use this Jenkinsfile instead:

```bash
pipeline {
  agent any
  environment {
    // Required for a Semgrep AppSec Platform-connected scan:
    SEMGREP_APP_TOKEN = credentials('SEMGREP_APP_TOKEN')
    // Set typical project (repo) name
    SEMGREP_REPO_NAME = env.GIT_URL.replaceFirst(/^https:\/\/github.com\/(.*)$/, '$1')
  }
  stages {
    stage('semgrep-scan') {
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
}
```

</TabItem>

<TabItem value='full-and-diff-scans'>

Semgrep [diff-aware scans](/docs/semgrep-code/glossary#diff-aware-scan) can be set up in several different ways using Jenkins. This example sets up a Multibranch Pipeline using `when` conditions in the Jenkinsfile. The Multibranch Pipeline provides access to useful variables for the diff-aware scan configuration. The intent of the configuration is to run full scans on the default branch and diff-aware scans on PR branches.

### Create the Jenkinsfile

To start the process, create the initial `Jenkinsfile` in the root of the repository where you're setting up Semgrep. This code snippet uses Jenkins declarative syntax and runs Semgrep in Docker.

```bash
pipeline {
  agent any
  environment {
    // Required for a Semgrep Cloud Platform-connected scan:
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

This Jenkinsfile uses a `SEMGREP_APP_TOKEN` stored in the Jenkins instance credentials store. 

It defines two Semgrep stages: one stage runs a full scan for the main branch, while the other stage runs a diff-aware scan for PR branches. The diff-aware scan configuration uses a computed merge base, rather than setting the merge base to the default branch. This is similar to how Semgrep runs in GitHub actions. Setting the `SEMGREP_REPO_NAME` and `SEMGREP_PR_ID` allows Semgrep to identify the connected project and related PR.

To compute the merge base, the pipeline runs additional Git commands to ensure that the default branch is available to Git for computation. Afterward, the pipeline cleans the workspace so subsequent use of these commands for future scans is successful.

:::info
Using a computed merge base is strongly recommended. If you instead set `SEMGREP_BASELINE_REF` to `main` or `master` instead, you may see spurious findings in diff-aware scans if the remote branch has been updated independently of the PR branch, or the branch may not be available locally unless you perform a `git fetch` or `git checkout` as shown in this example.
:::

### Configure the Multibranch pipeline

1. Under **Branch Sources**, click **Add source** and select **GitHub**.
2. Select **Repository HTTPS URL** and provide your project URL (in the format `https://github.com/<namespace>/<project>/`).
3. Under **Behaviors**, for **Discover branches**, select **Exclude branches that are also filed as PRs** as the **Strategy**.
4. For **Discover pull requests from origin**, select **The current pull request revision** as the **Strategy**.
5. For **Property strategy**, select **All branches get the same properties**.
6. Under **Build Configuration**, for **Mode**, select **by Jenkinsfile**, and enter the script path as `Jenkinsfile`.
7. Optional: Under **Scan Multibranch Pipeline Triggers**, select **Periodically if not otherwise run** if you want to run the pipeline occasionally if it's not run for other reasons and choose the desired interval.
8. Optional: under **Orphaned Item Strategy**, select **Discard old items** and select the desired time interval and/or number of items, so that you don’t lose logs for deleted branches immediately.

### On GitHub

If your Jenkins instance is already configured to manage webhooks automatically on GitHub, these steps are not necessary. 

To review the settings and view the webhook URL, go to **Manage Jenkins > Configure System > GitHub**. Expand the <i class="fa-solid fa-circle-question"></i> next to **GitHub Server** to find the webhook URL, and review the configuration to see if hooks are managed automatically.

If they are not, follow these steps:

1. Go to the repository on GitHub.
2. Select **<i class="fa-solid fa-gear"></i> Settings > <i class="fa-solid fa-webhook"></i> Webhooks**.
2. Click **Add webhook**.
3. In **Payload URL**, enter your Jenkins' instance webhook URL. Generally this is in the form `$JENKINS_BASE_URL/github-webhook/`.
4. For **Content type**, Select `application/json`.
5. Select **Send me everything**.

:::info
Unlike full scans, diff-aware scans only consider changes within modified files. At this time, cross-file analysis is not supported for diff-aware scans.
:::

</TabItem>

</Tabs>
