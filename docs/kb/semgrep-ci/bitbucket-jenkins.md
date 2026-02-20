---
descriptions:
tags:
  - Bitbucket Cloud
  - Bitbucket Data Center
  - Jenkins
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Run Semgrep in Jenkins when using Bitbucket as the source code manager

To scan your code hosted by Bitbucket with Semgrep using a Jenkins project or pipeline, you must:

1. Set up webhooks to connect Jenkins to Bitbucket.
2. Configure the Jenkins project or pipeline to run Semgrep.

## Set up webhooks to allow triggering events from Bitbucket to Jenkins

Webhooks are required to connect your Bitbucket source code manager (SCM) to Jenkins.

:::info Prerequisites
You must install the <i class="fas fa-external-link fa-xs"></i> Bitbucket Push and Pull Request plugin on your Jenkins server. This method requires that your Jenkins instance be compatible with this plugin.
:::

1. Log in to Bitbucket, and go to your repository.
2. In your Bitbucket repository, go to **Repository Settings > Webhooks > Add webhook**.
3. Enter a **Title** for your webhook.
4. Enter the **URL** for your Jenkins instance using the following pattern: `https://<YOUR_JENKINS_SERVER>/bitbucket-hook/`.
5. Add the following **Triggers**:
   1. In the **Repository** list, select **Push**.
   2. In the **Pull request** list, select **Created** and **Updated**.

## Configure Jenkins to run Semgrep

<Tabs
    defaultValue="pipelines"
    values={[
    {label: 'Pipeline', value: 'pipelines'},
  {label: 'Freestyle', value: 'freestyle'},
    ]}
>

<TabItem value='pipelines'>

1. Sign in to Jenkins.
2. From the **Jenkins Dashboard** click on create a **New Item**.
3. Enter a project name, select **Pipeline** option, and click **OK**.
4. In the **General > Triggers** section, select **Build with BitBucket Push and Pull Request Plugin**.
5. Create the **Triggers**:
   1. Click **Add**.
   2. Select one of the following: **Bitbucket Cloud Pull Request**, **Bitbucket Server Pull Request**, or **Push**.
   3. In **Select an Action**, select **Created**.
   4. Click **Add** again, and select the same trigger as before: **Bitbucket Cloud Pull Request**, **Bitbucket Server Pull Request**, or **Push**.
   5. In **Select an Action**, select **Updated**.
6. Go to the **Pipeline** section. In **Definition**, select **Pipeline script from SCM**.
   1. In **SCM**, select **Git**.
   2. In **Repositories > Repository URL**, enter your Bitbucket repository URL.
   3. In **Branch Specifier (blank for 'any')**, enter the name of your main branch.
   4. In **Script Path**, enter `Jenkinsfile`.
7. Click **Save**.

### Create and add the Jenkinsfile to your repository

Create the Jenkinsfile in your Bitbucket repository. The file must define the logic to start:

   - Diff-aware scans if the scan is started in the context of a pull request
   - Full scans if you push changes to the main branch.

The following code snippets are sample Jenkinsfile that defines both of these actions. Choose the file for your deployment based on whether you're using Bitbucket Cloud or Bitbucket Data Center.

<Tabs
    defaultValue="cloud"
    values={[
    {label: 'Bitbucket Cloud', value: 'cloud'},
  {label: 'Bitbucket Data Center', value: 'datacenter'},
    ]}
>

<TabItem value='cloud'>
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
- The variable `SEMGREP_BASELINE_REF` in the code snippet must be set to the primary or default branch, which in the example is `origin/main`.\
</TabItem>
<TabItem value='datacenter'>
```javascript
pipeline {
  agent any
    environment {
      // The following variable is required for a Semgrep AppSec Platform-connected scan:
      SEMGREP_APP_TOKEN = credentials('SEMGREP_APP_TOKEN')
      BITBUCKET_TOKEN = credentials('FS_BITBUCKET_TOKEN')

      // Uncomment the following line to scan changed
      // files in PRs or MRs (diff-aware scanning):
      // SEMGREP_BASELINE_REF = "${env.CHANGE_ID != null ? 'main' : ''}"

      // Troubleshooting:

      // Uncomment the following lines if Semgrep AppSec Platform > Findings Page does not create links
      // to the code that generated a finding or if you are not receiving PR or MR comments.
      // SEMGREP_JOB_URL = "${BUILD_URL}"
      // SEMGREP_COMMIT = "${GIT_COMMIT}"
      // SEMGREP_BRANCH = "${GIT_BRANCH}"
      // SEMGREP_REPO_NAME = env.GIT_URL.replaceFirst(/^https:\/\/YOUR_BITBUCKET_DATA_CENTER_URL\/scm\/(.*).git$/, '$1')
      // SEMGREP_REPO_URL = env.GIT_URL.replaceFirst(/^(https:\/\/.*?)\/scm\/(.*)\/(.*)\.git$/, '$1/projects/$2/repos/$3')
      // SEMGREP_PR_ID = "${env.CHANGE_ID != null ? env.CHANGE_ID : ''}"
      SEMGREP_APP_URL = "https://semgrep.dev"
    }
    stages {
      stage('Semgrep-Scan') {
        steps {
            sh 'pip3 install semgrep'
            sh 'semgrep ci'
        }
    }
  }
}
```
</TabItem>
</Tabs>

</TabItem>

<TabItem value='freestyle'>

To set up a Freestyle project to scan your Bitbucket projects with Semgrep:

1. Sign in to Jenkins.
2. [Define `SEMGREP_APP_TOKEN` as a credential](https://www.jenkins.io/doc/book/using/using-credentials/#configuring-credentials) in Jenkins. You will add this credential to your project at a later step.
3. From the Jenkins **Dashboard**, click **New Item**.
4. Type a project name, select **Freestyle project**, and click **OK**.
5. Go to **General > Source Code Management**. Select **Git**. Then:
   1. Add your Bitbucket **Repository URL**
   2. Add the **Credentials** needed to check out your sources
   3. Add the **Branches to build**.
6. In the **Triggers** section, select **Build with Bitbucket Push and Pull Request Plugin**. Then, create the **Triggers**:
   1. Click **Add**.
   2. Select one of the following: **Bitbucket Cloud Pull Request** or **Bitbucket Server Pull Request**.
   3. In **Select an Action**, select **Created**.
   4. Click **Add** again, and select the same trigger as before: **Bitbucket Cloud Pull Request** or **Bitbucket Server Pull Request**.
   5. In **Select an Action**, select **Updated**.
   6. Click **Add > Push**.
7. Next, add your Semgrep token to the environment:
   1. In the **Environment** Section, select **Use secret text(s) or file(s)**.
   2. Under **Bindings**, select **Secret text**.
   3. Set **Variable** to `SEMGREP_APP_TOKEN`.
   4. Under **Credentials > Specific credentials**, choose the defined credential for the token.
   5. Click **Add** to save your changes.
8. In the **Build Steps** section, click **Add build step > Execute shell**. In **Command**, provide one of the following scripts to run Semgrep:
    ```bash
    #!/bin/bash

    BASELINE_REF="main"
    BASELINE_REF_ORIGIN="origin/$BASELINE_REF" 
    REPO_URL=$GIT_URL
    REPO_NAME=$(echo "$GIT_URL" | awk -F'/' '{print $(NF-1)"/"$(NF)}' | sed 's/.git$//')

    ## Merge or push to primary branch
    if [ $BITBUCKET_SOURCE_BRANCH = $BASELINE_REF ]; then
        docker run -e SEMGREP_APP_TOKEN=$SEMGREP_APP_TOKEN \
                  -e SEMGREP_REPO_URL=$REPO_URL \
                  -e SEMGREP_REPO_NAME=$REPO_NAME \
                  -v "$(pwd):$(pwd)" --workdir $(pwd) \
                  semgrep/semgrep semgrep ci
    ## pull request scans
    elif [ $BITBUCKET_PULL_REQUEST_ID -ge 0 ]; then
        git checkout $BITBUCKET_SOURCE_BRANCH && git pull
        docker run -e SEMGREP_APP_TOKEN=$SEMGREP_APP_TOKEN \
              -e SEMGREP_BASELINE_REF=$BASELINE_REF_ORIGIN \
                  -e SEMGREP_REPO_URL=$REPO_URL \
                  -e SEMGREP_REPO_NAME=$REPO_NAME \
                  -e SEMGREP_BRANCH=$BITBUCKET_SOURCE_BRANCH \
                  -e SEMGREP_PR_ID=$BITBUCKET_PULL_REQUEST_ID \
                  -v "$(pwd):/src" \
                  semgrep/semgrep semgrep ci
    fi 
    ```
    :::note
    - The variable `SEMGREP_BASELINE_REF` must be set to the default branch, which is `main` in the preceding example.
    - The configuration for a diff-aware scan must specify a merge base against which the pull request changes are compared. To do this:
      - Set the pull request target branch as `SEMGREP_BASELINE_REF`
      - Set `SEMGREP_BRANCH` to the pull request source branch to ensure it's correctly identified.
      - Set `SEMGREP_PR_ID` so that Semgrep can send comments to the relevant pull request.
    :::
</TabItem>
</Tabs>

### Test the implementation

To ensure that Semgrep scans correctly in your Jenkins pipeline or project:

1. Commit a change to your repository, and create a pull request. This automatically runs a Semgrep diff-aware scan in Jenkins. Note that the job can fail if there are blocking findings as a result of the scan.
2. Merge the pull request to commit the changes to `main`. This triggers a full scan in Jenkins.
