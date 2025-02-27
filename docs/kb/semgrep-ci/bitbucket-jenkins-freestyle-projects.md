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
1. In the **Build Triggers** section, click **<i class="fa-solid fa-square-check"></i> Build with Bitbucket Push and Pull Request Plugin**. Alternatively, the plugin can also be called **Bitbucket Cloud Pull Request** or **Bitbucket Server Pull Request**.
1. In **Triggers > Select an Action** select **Created**, **Updated** and **Push**.
![Build triggers for the freestyle project](/img/kb/bitbucket-jenkins-freestyle-events.png)
1. In the **Build environment** section declare the `SEMGREP_APP_TOKEN` selecting the option **Use secret text or file.**
![Filled-out the secrets text option](/img/kb/bitbucket-jenkins-freestyle-token.png)
:::note
The `SEMGREP_APP_TOKEN` must be defined as a credential in Jenkins settings.
:::

## Running full scans 
In the section **Build Steps** add a new **Execute Shell** step with the logic explained in the steps below:
```
docker run \
    -e SEMGREP_APP_TOKEN=$SEMGREP_APP_TOKEN \
    -v "$(pwd):$(pwd)" --workdir $(pwd) \
    semgrep/semgrep semgrep ci
```
Now, after a push to the main branch a new Semgrep full scan runs.

## Running pull requests scans (diff scans)

For this approach, it is required to set some Environment variables that you would typically see natively in Bitbucket but not on the Jenkins side. For Semgrep to integrate natively, the following environment variables are needed:
SEMGREP_REPO_URL
`SEMGREP_REPO_NAME`
`SEMGREP_BRANCH`
`SEMGREP_PR_ID`
`SEMGREP_BASELINE_REF`

One possible version of the shell script is:

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
