---
tags:
  - Bitbucket
  - Jenkins
  - Pipeline projects
description: Setting up pipeline Jenkins projects for Bitbucket repositories
---

# Setting up pipeline Jenkins projects for Bitbucket repositories

## Requirements
Follow [this guide](https://semgrep.dev/docs/kb/semgrep-ci/bitbucket-triggering-events-to-jenkins/) to setup triggering events from Bitbucket to Jenkins.

## Creating a Jenkins pipeline project

Steps:
1. From the **Jenkins Dashboard** click on create a **New Item**, type a project name and select the **Pipeline** option.
![image info](/img/kb/bitbucket-jenkins-new.png)

2. In the **General section** -> Mark the check: **“Build with BitBucket Push and Pull Request Plugin”** and define the triggers for Push and Pull request Created and Updated.
![image info](/img/kb/bitbucket-jenkins-events.png)

:::note
Depends on your BitBucket instance it can be "Bitbucket Cloud Pull Request" or "Bitbucket Server Pull Request".
:::

3. In the **Pipeline Section**:
* Specify the BitBucket repository URL
* Sepecify the main branch (master in the example)
* Specify the Script path to Jenkinsfile

![image info](/img/kb/bitbucket-jenkins-pipeline-section-1.png)
![image info](/img/kb/bitbucket-jenkins-pipeline-section-2.png)

4. Create the **Jenkinsfile** in the Bitbucket repository:

It must define the logic to run Semgrep diff scans if it is a pull request or Semgrep full scans if it is a push to the main branch. It can look like this:

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
                 returntocorp/semgrep semgrep ci'''
              }
              else {
                 echo "Semgrep full scan"
                 sh '''docker run \
                   -e SEMGREP_APP_TOKEN=$SEMGREP_APP_TOKEN \
                   -v "$(pwd):$(pwd)" --workdir $(pwd) \
                   returntocorp/semgrep semgrep ci'''
               }
             }
           }
         }
      }
}
```
:::note
It is required to define the SEMGREP_APP_TOKEN as a credential in Jenkins.
:::

:::note
The variable SEMGREP_BASELINE_REF must be set to the main branch, in the example: “origin/master”.
:::

## Testing the new Jenkins pipeline project

1. Commit a change in the repository and create a pull request. It will automatically run a Semgrep diff scan in Jenkins:
![image info](/img/kb/bitbucket-jenkins-pullrequest-1.png)
![image info](/img/kb/bitbucket-jenkins-pullrequest-2.png)

:::note
The pull request can be marked as falied if there are blocking findings, as in the example.
:::

2. Merge the change to master. It will run a Semgrep full scan in Jenkins.



