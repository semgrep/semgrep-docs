---
title: Diff-aware scans with GitHub and Jenkins
description: Set up full and diff-aware scans in Jenkins with Multibranch pipeline projects.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Full and diff-aware scans with GitHub and Jenkins

This guide shows you how to set up either full scans that run on the default branch, or full and diff-aware scans that run on the default branch and PR branches, respectively. Full scans use a simple Pipeline project. Full and diff-aware scans use a Multibranch Pipeline project, which provides access to useful variables for the diff-aware scan configuration. Both options use GitHub as the source code manager, with a repository whose default branch is `main`.

:::info
Your UI (user interface) may vary depending on your Jenkins installation. These steps use a Classic UI Jenkins interface.
:::

<Tabs
    defaultValue="full-scans"
    values={[
    {label: 'Full Semgrep scans only', value: 'full-scans'},
    {label: 'Full and diff-aware Semgrep scans', value: 'full-and-diff-scans'},
    ]}
>

<TabItem value='full-scans'>

## Create your Jenkinsfile

To start the process, create your initial `Jenkinsfile` in the root of the repository where you're setting up Semgrep. This code snippet uses Jenkins declarative syntax and runs Semgrep in Docker.

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

## Set up a pipeline

### Under General

1. Check the box **GitHub Project** and enter the URL for the project: `https://github.com/<namespace>/<project>/`
2. Under **Build Triggers**, select the **GitHub Hook trigger for GITScm polling** box.

### Under Pipeline

1. Definition: Pipeline script from SCM
2. SCM: Git
3. Repositories:
    - Repository URL: `https://github.com/<namespace>/<project>/`
    - Credentials: (select the appropriate credentials for your project)
4. Branches to build: `refs/heads/main`
5. Additional Behaviours: from the drop-down box, select "Check out to specific local branch"
    - Enter `**` for Branch name.
6. Script Path: Jenkinsfile
7. Check box: Lightweight checkout

### On GitHub

If your Jenkins instance is configured to manage webhooks automatically on GitHub, these steps are not necessary. To review the settings and view the webhook URL, go to **Manage Jenkins > Configure System > GitHub**. Expand the <i class="fa-solid fa-circle-question"></i> next to **GitHub Server** to find the webhook URL, and review the configuration to see if hooks are managed automatically.

1. Visit `https://github.com/<namespace>/<project>/settings/hooks`.
2. Click **Add Webhook**.
3. Under **Payload URL**, enter your Jenkins' instance webhook URL. Generally this is in the form `$JENKINS_BASE_URL/github-webhook/`.
4. Select `application/json` for Content-Type.
5. Select **Send me everything**.

With configuration provided previously, findings in Semgrep AppSec Platform appear under the Jenkins project name, rather than under the typical GitHub name `<namespace>/<project>`. To change the name using `SEMGREP_REPO_NAME`, use this Jenkinsfile instead:

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

Semgrep diff-aware scans can be set up in several different ways using Jenkins. This example sets up a Multibranch Pipeline using `when` conditions in the Jenkinsfile. The intent of the configuration is to run full scans on the default branch and diff-aware scans on PR branches.

## Create the Jenkinsfile

Add the following to a Jenkinsfile in the root of the repository. This code snippet uses Jenkins declarative syntax and runs Semgrep in Docker.

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
            -e SEMGREP_PR_ID = "${env.CHANGE_ID}"
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

The Jenkinsfile defines two Semgrep stages: one stage runs a full scan for the main branch, while the other stage runs a diff-aware scan for PR branches. The diff-aware scan configuration uses a computed merge base, rather than setting the merge base to the default branch. This is similar to how Semgrep runs in GitHub actions. Setting the SEMGREP_REPO_NAME and SEMGREP_PR_ID allows Semgrep to identify the connected project and related PR.

To compute the merge base, the pipeline runs additional Git commands to ensure that the default branch is available to Git for computation. Afterward, the pipeline cleans the workspace so subsequent use of these commands for future scans is successful.

:::info
Using a computed merge base is strongly recommended. If you instead set `SEMGREP_BASELINE_REF` to `main` or `master` instead, you may see spurious findings in diff-aware scans if the remote branch has been updated independently of the PR branch, or the branch may not be available locally unless you perform a `git fetch` or `git checkout` as shown in this example.
:::

## Configure the Multibranch pipeline

- Branch Sources: GitHub
    - Credentials: (select the appropriate credentials for your project)
    - Repository HTTPS URL: `https://github.com/<namespace>/<project>`
- Behaviors:
    - Discover branches
        - Strategy: exclude branches that are also filed as PRs
    - Discover pull requests from origin
        - The current pull request revision
    - Check out to matching local branch
    - Property strategy: all branches get the same properties
- Build Configuration: by Jenkinsfile
- Scan Repository Triggers: periodically if not otherwise run, 30 min (interval configurable)
- Optional: Discard old items (7 days/7 items), so that you don’t lose logs for deleted branches immediately

### On GitHub

If your Jenkins instance is configured to manage webhooks automatically on GitHub, these steps are not necessary. To review the settings and view the webhook URL, go to **Manage Jenkins > Configure System > GitHub**. Expand the <i class="fa-solid fa-circle-question"></i> next to **GitHub Server** to find the webhook URL, and review the configuration to see if hooks are managed automatically.

1. Visit `https://github.com/<namespace>/<project>/settings/hooks`.
2. Click **Add Webhook**.
3. Under **Payload URL**, enter your Jenkins' instance webhook URL. Generally this is in the form `$JENKINS_BASE_URL/github-webhook/`.
4. Select `application/json` for Content-Type.
5. Select **Send me everything**.

</TabItem>

</Tabs>
