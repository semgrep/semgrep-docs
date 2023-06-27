---
tags:
  - Jenkins
  - Shared Library
description: Setting up Jenkins shared library with Semgrep scans
---

# Jenkins shared library with Semgrep scans

## Motivation
A good practice when programming is to avoid duplicate code. This applies even when defining your build pipelines. To prevent duplicate code when defining Semgrep tests with Jenkins, create a [Jenkins Shared Library](https://www.jenkins.io/doc/book/pipeline/shared-libraries/) with the Semgrep snippet. Then, call this library in all the projects you have in your organization.

## Creating a Jenkins pipeline to call Semgrep
If you follow [Semgrep documentation](https://semgrep.dev/docs/semgrep-ci/sample-ci-configs/#sample-jenkins-configuration-snippet), you can create a simple Jenkins pipeline to run Semgrep scans.

When rolling out Semgrep in your organization, you need to replicate this pipeline to the hundreds of projects you have in your company. 
After some days, you got it, but then your manager asks you to generate json reports after every semgrep scan to dump results in DefectDojo. It means adding some flags to the semgrep command:
`````
semgrep ci --json --output output.json
`````
But it must be done in all the repositories you have! It will take you time!

## Creating a shared library
Jenkins shared library comes to the rescue. Basically, you encapsulate the semgrep commands in a common library.
The steps are:

1. Create a new repo with a Groovy file in the `vars/` folder. For example, `vars/semgrepFullScan.groovy`. Add the Semgrep snippet to that file:

`````
def call() {
  sh '''docker pull returntocorp/semgrep && \
            docker run \
            -e SEMGREP_APP_TOKEN=$SEMGREP_APP_TOKEN \
            -v "$(pwd):$(pwd)" --workdir $(pwd) \
            returntocorp/semgrep semgrep ci '''
}
`````

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
