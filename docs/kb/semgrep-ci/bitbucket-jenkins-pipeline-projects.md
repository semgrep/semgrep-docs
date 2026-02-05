---
tags:
  - Bitbucket
  - Jenkins
  - Pipeline projects
description: Set up Jenkins pipeline projects for Bitbucket repositories.
---

# Set up Jenkins pipeline projects for Bitbucket repositories

## Prerequisites

Ensure you have set up [triggering events from Bitbucket to Jenkins](/kb/semgrep-ci/bitbucket-triggering-events-to-jenkins/).

## Create a Jenkins pipeline project

1. Sign in to Jenkins.
1. From the **Jenkins Dashboard** click on create a **New Item**.
2. Enter a project name, select **Pipeline** option, and click **OK**.
3. In the **General > Triggers** section, select **Build with BitBucket Push and Pull Request Plugin**. Note that the plugin can also be named **Bitbucket Cloud Pull Request** or **Bitbucket Server Pull Request**.
4. Create the **Triggers**:
   1. Click **Add**.
   2. Select one of the following: **Bitbucket Cloud Pull Request**, **Bitbucket Server Pull Request**, or **Push**.
   3. In **Select an Action**, select **Created**.
   4. Click **Add** again, and select the same trigger as before: **Bitbucket Cloud Pull Request**, **Bitbucket Server Pull Request**, or **Push**.
   5. In **Select an Action**, select **Updated**.
5. Go to the **Pipeline** section. In **Definition**, select **Pipeline script from SCM**.
   1. In **SCM**, select **Git**.
   2. In **Repositories > Repository URL**, enter your Bitbucket repository URL.
   3. In **Branch Specifier (blank for 'any')**, enter the name of your main branch.
   4. In **Script Path**, enter `Jenkinsfile`.
6. Click **Save**.

## Create the Jenkinsfile in your Bitbucket repository

Create the Jenkinsfile in your Bitbucket repository. The file must define the logic to start:

   - Diff-aware scans if the scan is started in the context of a pull request
   - Full scans if you push changes to the main branch.

The following is a sample Jenkinsfile that defines both of these actions:

```groovy
pipeline {
  agent any
  environment {
    SEMGREP_APP_TOKEN = credentials('SEMGREP_APP_TOKEN')
    SEMGREP_BASELINE_REF = "origin/main"
  }
  stages {
    stage('Semgrep-Scan') {
      steps {
        script {
          if (env.BITBUCKET_PULL_REQUEST_ID) {
            echo "Semgrep diff scan"
            sh '''git checkout ${BITBUCKET_PULL_REQUEST_LATEST_COMMIT_FROM_SOURCE_BRANCH}'''
            sh '''git fetch origin +ref/heads/*:refs/remotes/origin/*'''
            sh '''docker run \
              -e SEMGREP_APP_TOKEN=$SEMGREP_APP_TOKEN \
              -e SEMGREP_PR_ID=${BITBUCKET_PULL_REQUEST_ID} \
              -e SEMGREP_BASELINE_REF=$SEMGREP_BASELINE_REF \
              -v "$(pwd):$(pwd)" --workdir $(pwd) \
                semgrep/semgrep semgrep ci'''
            }
            else {
                echo "Semgrep full scan"
                sh '''docker run \
                  -e SEMGREP_APP_TOKEN=$SEMGREP_APP_TOKEN \
                  -v "$(pwd):$(pwd)" --workdir $(pwd) \
                  semgrep/semgrep semgrep ci'''
              }
        }
      }
    }
  }
}
```

Note that:
- You must define `SEMGREP_APP_TOKEN` in Jenkins. You can [create the required token in Semgrep AppSec Platform](https://semgrep.dev/orgs/-/settings/tokens/cli).
- The variable `SEMGREP_BASELINE_REF` in the code snippet must be set to the primary or default branch, which in the example is `origin/main`.

## Test the new Jenkins pipeline project

1. Commit a change to your repository, and create a pull request. This automatically runs a Semgrep diff-aware scan in Jenkins. Note that the job can fail if there are blocking findings as a result of the scan.
2. Merge the pull request to commit the changes to `main`. This triggers a full scan in Jenkins.
