---
tags:
  - Bitbucket
  - Jenkins
  - Freestyle projects
description: Set up Jenkins freestyle projects for Bitbucket repositories.
---

# Set up Jenkins Freestyle projects for Bitbucket repositories

## Requirements

Ensure you have set up [triggering events from Bitbucket to Jenkins](https://semgrep.dev/docs/kb/semgrep-ci/bitbucket-triggering-events-to-jenkins/).

## Create a Jenkins Freestyle project

1. From the Jenkins **Dashboard**, click **New Item**.
1. Type a project name and select **Freestyle project**. Click **OK**.
![Filled-out item name and Freestyle option](/img/kb/bitbucket-jenkins-freestyle.png)
1. On the **General** page, go to the **Source Code Management** section. Select **Git**. Add your Bitbucket **Repository URL**, select the **Credentials** needed to check out sources, and select the **Branches to build**.
![Filled-out repository details](/img/kb/bitbucket-jenkins-freestyle-repository-details.png)
1. In the **Build Triggers** section, click **<i class="fa-solid fa-square-check"></i> Build with Bitbucket Push and Pull Request Plugin**. 
1. In **Triggers > Select an Action** select **Created**, **Updated**, and **Push**.
![Build triggers for the freestyle project](/img/kb/bitbucket-jenkins-freestyle-events.png)
1. In the **Build environment** section, declare the `SEMGREP_APP_TOKEN` by selecting **Use secret text or file.** Set **Variable** to `SEMGREP_APP_TOKEN` and **Credentials > Specific credentials** to your token value. Click **Add** to save your changes.
![Filled-out the secrets text option](/img/kb/bitbucket-jenkins-freestyle-token.png)
:::note
Ensure that you have [defined `SEMGREP_APP_TOKEN` as a credential](https://www.jenkins.io/doc/book/using/using-credentials/#configuring-credentials) in Jenkins.
:::

## Run full scans 
In the **Build Steps** section, add an **Execute Shell** step with the logic below:
```
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
:::note
- The variable `SEMGREP_REPO_URL` links the Semgrep project and findings with the Bitbucket repository.
- The variable `SEMGREP_REPO_NAME` provides an accurate and meaningful name to the Semgrep project.
:::

After adding the script, a full scan runs when you push changes to the main branch.

## Run scans on pull requests (diff-aware scans)

The diff-aware scan configuration must specify a merge base to compare the PR changes against. To achieve that, specify the pull request target branch as `SEMGREP_BASELINE_REF`, and set `SEMGREP_BRANCH` to the pull request source branch to ensure it's correctly identified. Set the `SEMGREP_REPO_NAME` as described above for full scans, and add `SEMGREP_PR_ID` so Semgrep can send comments to the related PR.

One possible way to modify the shell script to include diff-aware scans is:

```
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
- The variable `SEMGREP_BASELINE_REF` must be set to the main branch, which, in the example, is `main`.
:::
