---
tags:
  - Jenkins
  - Shared Library
description: Setting up Jenkins shared library with Semgrep scans
---

# Jenkins shared library with Semgrep scans

## Motivation
A good practice when programming is to avoid duplicate code. The main issue with code duplication is not the duplication itself, but when you need to modify a piece of this duplicated code, you need to do it two, three or n-times as many repetitions as you have. And even worse, when the duplicated fragment has a bug or a vulnerability, you need to fix it in all the occurrences.
Luckily, there is an easy solution for this: encapsulate code in only one place: a method, a function, or a library; it doesn’t matter; the key concept here is removing duplications and replacing them with a simple call.

When defining a Jenkins pipeline, you add the logic to build/test your software; for example, test your software with Semgrep to identify security bugs.
In this article, we will define a [Jenkins Shared Library](https://www.jenkins.io/doc/book/pipeline/shared-libraries/) with the Semgrep snippet so we can call this library in all the projects we have in our organisation.

## Creating a Jenkins pipeline to call Semgrep
If you follow [Semgrep documentation](https://semgrep.dev/docs/semgrep-ci/sample-ci-configs/#sample-jenkins-configuration-snippet), you can create a simple Jenkins pipeline like this:

`````
pipeline {
  agent any
    environment {
      // The following variable is required for a Semgrep Cloud Platform-connected scan:
      SEMGREP_APP_TOKEN = credentials('SEMGREP_APP_TOKEN')

      // Uncomment the following line to scan changed 
      // files in PRs or MRs (diff-aware scanning): 
      // SEMGREP_BASELINE_REF = "main"

      // Troubleshooting:

      // Uncomment the following lines if Semgrep Cloud Platform > Findings Page does not create links
      // to the code that generated a finding or if you are not receiving PR or MR comments.
      // SEMGREP_JOB_URL = "${BUILD_URL}"
      // SEMGREP_COMMIT = "${GIT_COMMIT}"
      // SEMGREP_BRANCH = "${GIT_BRANCH}"
      // SEMGREP_REPO_NAME = env.GIT_URL.replaceFirst(/^https:\/\/github.com\/(.*).git$/, '$1')
      // SEMGREP_REPO_URL = env.GIT_URL.replaceFirst(/^(.*).git$/,'$1')
      // SEMGREP_PR_ID = "${env.CHANGE_ID}"
    }
    stages {
      stage('Semgrep-Scan') {
        steps {
            sh '''docker pull returntocorp/semgrep && \
            docker run \
            -e SEMGREP_APP_TOKEN=$SEMGREP_APP_TOKEN \
            -e SEMGREP_REPO_URL=$SEMGREP_REPO_URL \
            -e SEMGREP_BRANCH=$SEMGREP_BRANCH \
            -e SEMGREP_REPO_NAME=$SEMGREP_REPO_NAME \
            -e SEMGREP_BRANCH=$SEMGREP_BRANCH \
            -e SEMGREP_COMMIT=$SEMGREP_COMMIT \
            -e SEMGREP_PR_ID=$SEMGREP_PR_ID \
            -v "$(pwd):$(pwd)" --workdir $(pwd) \
            returntocorp/semgrep semgrep ci '''
      }
    }
  }
}
`````

When rolling out Semgrep in your organization, you need to replicate this pipeline to the hundreds of projects you have in your company. 
After some days, you got it, but then your manager asks you to generate json reports after every semgrep scan to dump results in DefectDojo. It means adding some flags to the semgrep command:
`````
semgrep ci --json --output output.json
`````
But it must do in all the repositories you have! It will take you time!

## Creating a shared library
Jenkins shared library comes to the rescue. Basically, you encapsulate the semgrep commands in a common library.
The steps are:

1. Create a new repo with a groovy file and add the semgrep snippet there:

`````
def call() {
  sh '''docker pull returntocorp/semgrep && \
            docker run \
            -e SEMGREP_APP_TOKEN=$SEMGREP_APP_TOKEN \
            -e SEMGREP_REPO_NAME=$SEMGREP_REPO_NAME \
            -v "$(pwd):$(pwd)" --workdir $(pwd) \
            returntocorp/semgrep semgrep ci '''
}
`````
> Note: this file must be in a folder called “vars” example: vars/semgrepFullScan.groovy

2. Declare your library in Jenkins
    1. Go to Dashboard
    2. Manage Jenkins 
    3. System
    4. Global Pipeline libraries
    5. Define library: name, version (branch), and the Git URL.

## Using the shared library in the Jenkins pipeline

Once you have defined the shared library, you can use it in your pipelines. Now the Jenkins pipeline can look like this:
`````
@Library('semgrep') _

pipeline {
  agent any
    environment {
      // The following variable is required for a Semgrep Cloud Platform-connected scan:
      SEMGREP_APP_TOKEN = credentials('SEMGREP_APP_TOKEN')

    }
    stages {
      stage('Semgrep-Scan') {
        steps {
            semgrepFullScan()
      }
    }
  }
}
`````
Note that line 1 must have the name of the shared library, and the function invoked (semgrepFullScan) must have the name of the groovy file created before -> semgrepFullScan.groovy

## Conclusions
Using Jenkins Shared Library can simplify your pipelines and avoid code duplications along with all your projects. And if you need to change the snippet, for example, adding some flags, it will take you some seconds because the change is only in one single and centralised place.
