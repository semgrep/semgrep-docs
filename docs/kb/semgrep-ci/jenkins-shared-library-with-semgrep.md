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

By following the [Semgrep Jenkins CI configuration](https://semgrep.dev/docs/semgrep-ci/sample-ci-configs/#sample-jenkins-configuration-snippet), you can create a simple Jenkins pipeline to run Semgrep scans.

When rolling out Semgrep more widely in your organization, you need to replicate this pipeline to the many projects you have in your organization. If the Semgrep configuration later requires updates, each pipeline would have to be updated individually, which is time-consuming. Using a shared library prevents this issue.

## Creating a shared library

A Jenkins shared library encapsulates the Semgrep commands in a single library file, which is then called by all other workflows that use Semgrep.

### Create the library file

Create a new repository with a Groovy file in the `vars/` folder. For example, `vars/semgrepFullScan.groovy`. Add the Semgrep snippet to that file:

```
def call() {
  sh '''docker pull returntocorp/semgrep && \
            docker run \
            -e SEMGREP_APP_TOKEN=$SEMGREP_APP_TOKEN \
            -v "$(pwd):$(pwd)" --workdir $(pwd) \
            returntocorp/semgrep semgrep ci '''
}
```

### Declare your library in Jenkins

These steps are for the Jenkins UI.

1. Go to the Dashboard.
2. Click **<i class="fa-solid fa-gear"></i> Manage Jenkins**.
3. Under **System Configuration**, click **System**.
4. In the **Global Pipeline Libraries** section, define the library, including the name, version, and Git URL.

## Using the shared library in the Jenkins pipeline

Once you have defined the shared library, you can use it in your pipelines. If you named the library "semgrep" in the Jenkins UI, calling it looks like:

```
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
```

Line 1 must have the name of the shared library, and the function invoked (`semgrepFullScan`) must match the name of the Groovy file created before (`semgrepFullScan.groovy`).

## Conclusions

Using a Jenkins Shared Library can simplify your pipelines and avoid code duplication across all your projects, saving you time if you need to add flags to the Semgrep command or otherwise update it.
