---
tags:
  - Bitbucket
  - Jenkins
  - Pipeline projects
description: Set up Jenkins pipeline projects for Bitbucket repositories.
---

# Set up Jenkins pipeline projects for Bitbucket repositories

## Requirements

Ensure you have set up [triggering events from Bitbucket to Jenkins](https://semgrep.dev/docs/kb/semgrep-ci/bitbucket-triggering-events-to-jenkins/).

## Create a Jenkins pipeline project

1. From the **Jenkins Dashboard** click on create a **New Item**.
1. Type a project name and select the **Pipeline** option.
![Filled-out item name and Pipeline option](/img/kb/bitbucket-jenkins-new.png)
1. In the **General section**, click the **<i class="fa-solid fa-square-check"></i> Build with Bitbucket Push and Pull Request Plugin**. Alternatively, the plugin can also be called **Bitbucket Cloud Pull Request** or **Bitbucket Server Pull Request**.
1. In **Triggers > Select an Action** select **Created** and **Updated**.
![Build triggers for the pipeline project](/img/kb/bitbucket-jenkins-events.png)
1. In the **Pipeline Section**:
    1. In **Repository URL**, enter the Bitbucket repository URL.
    1. In **Branch Specifier**, enter your main or trunk branch (`master` in the screenshot).
    1. In **Script Path**, enter the path to your 'Jenkinsfile'.
    ![Pipeline section > Repository URL and Branch Specifier examples.](/img/kb/bitbucket-jenkins-pipeline-section-1.png)
    ![Pipeline section > Script Path example](/img/kb/bitbucket-jenkins-pipeline-section-2.png)
1. Create the **Jenkinsfile** in the Bitbucket repository. It must define the logic to run Semgrep diff scans if it is a pull request or Semgrep full scans if it is a push to the main branch. It can look like this:
```
pipeline {
      agent any
      environment {
        SEMGREP_APP_TOKEN = credentials('SEMGREP_APP_TOKEN')
        SEMGREP_BASELINE_REF = "origin/master"
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

:::note
- Ensure that you have defined a `SEMGREP_APP_TOKEN` as a credential in Jenkins.
- The variable SEMGREP_BASELINE_REF must be set to the main branch, in the example: `origin/master`.
:::

## Test the new Jenkins pipeline project

1. Commit a change in the repository and create a pull request. It automatically runs a Semgrep diff scan in Jenkins:
![Status view of a failed job run.](/img/kb/bitbucket-jenkins-pullrequest-1.png)
![Console or log view of a job.](/img/kb/bitbucket-jenkins-pullrequest-2.png)
    Note that the pull request can be marked as **failed** if there are blocking findings, as in the example.
1. Merge the change to master. It will run a Semgrep full scan in Jenkins.



