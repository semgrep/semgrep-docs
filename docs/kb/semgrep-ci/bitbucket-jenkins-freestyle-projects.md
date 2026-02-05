---
tags:
  - Bitbucket
  - Jenkins
  - Freestyle projects
description: Set up Jenkins freestyle projects for Bitbucket repositories.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Set up Jenkins Freestyle projects for Bitbucket repositories

:::info prerequisites
Ensure you have set up [triggering events from Bitbucket to Jenkins](/kb/semgrep-ci/bitbucket-triggering-events-to-jenkins/).
:::

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

7. Next, you must add your Semgrep token to the environment:
   1. In the **Environment** Section, select **Use secret text(s) or file(s)**.
   2. Under **Bindings**, select **Secret text**.
   3. Set **Variable** to `SEMGREP_APP_TOKEN`.
   4. Under **Credentials > Specific credentials**, choose the defined credentiaion for the token.
   5. Click **Add** to save your changes.

8. In the **Build Steps** section, click **Add build step > Execute shell**. In **Command**, provide one of the following scripts to run Semgrep. You can choose to run a full scan when you push changes to your primary branch, or you can choose to run both full scans and diff-aware scans to identify issues whenever you open a pull request:

    <Tabs
        defaultValue="full"
        values={[
        {label: 'Full scan only', value: 'full'},
      {label: 'Full scan and diff-aware scans', value: 'diff'},
        ]}
    >

    <TabItem value='full'>
    ```bash
    #!/bin/bash

    REPO_URL=$GIT_URL
    REPO_NAME=$(echo "$GIT_URL" | awk -F'/' '{print $(NF-1)"/"$(NF)}' | sed 's/.git$//')

    docker run \
        -e SEMGREP_APP_TOKEN=$SEMGREP_APP_TOKEN \
        -e SEMGREP_REPO_URL=$REPO_URL \
        -e SEMGREP_REPO_NAME=$REPO_NAME \
        -v "$(pwd):$(pwd)" --workdir $(pwd) \
        semgrep/semgrep semgrep ci
    ```
    In the preceeding script:
    - The variable `SEMGREP_REPO_URL` links the Semgrep project and findings with the Bitbucket repository.
    - The variable `SEMGREP_REPO_NAME` provides an accurate and meaningful name to the Semgrep project.
    </TabItem>

    <TabItem value='diff'>
    The configuration for a diff-aware scan must specify a merge base against which the pull request changes are compared. To do this:
    - Set the pull request target branch as `SEMGREP_BASELINE_REF`
    - Set `SEMGREP_BRANCH` to the pull request source branch to ensure it's correctly identified.
    - Set `SEMGREP_PR_ID` so that Semgrep can send comments to the relevant pull request.

    The following is a sample script that includes diff-aware scans:

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

    Note that the variable `SEMGREP_BASELINE_REF` must be set to the default branch, which is `main` in this example.
    </TabItem>
    </Tabs>


## Test the new Jenkins Freestyle project

1. Commit a change to your repository, and create a pull request. This automatically runs a Semgrep diff-aware scan in Jenkins. Note that the job can fail if there are blocking findings as a result of the scan.
2. Merge the pull request to commit the changes to `main`. This triggers a full scan in Jenkins.
