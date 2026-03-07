---
tags:
  - Jenkins
  - Shared Library
description: Create a Jenkins Shared Library for use with Semgrep scans
---

# Create a Jenkins Shared Library for use with Semgrep scans

Jenkins Pipelines supports the creation of [Shared Libraries](https://www.jenkins.io/doc/book/pipeline/shared-libraries/), which allow you to share parts of Pipelines between multiple projects. 

When integrating Semgrep into your Jenkins instances, you can define a single [Semgrep configuration file](/semgrep-ci/sample-ci-configs/#sample-jenkins-configuration-snippet) and use it with multiple Pipelines. This reduces the work required to set up the integration and simplifies maintenance. Instead of updating each Pipeline, you can update the Shared Library, which each Pipeline uses to obtain its configuration file.

## Create the Shared Library

1. Create a new Git repository.
2. Within your repository, create a new Groovy file in the `vars/` folder, such as `vars/semgrepFullScan.groovy`.
3. In your new Groovy file, add your [Semgrep configuration](/semgrep-ci/sample-ci-configs/#sample-jenkins-configuration-snippet).
4. Log in to your Jenkins deployment, and declare your Shared Library:
   1. Click **<i class="fa-solid fa-gear"></i> Manage Jenkins**.
   2. Go to **System Configuration > System**.
   3. In **Global Trusted Pipeline Libraries**, click **Add**.
   4. Provide the **Name** of your library, the **Default version**, and **Project Repository**. The **Project Repository** value is the URL of your repository.
5. Click **Save**.

## Use the Shared Library

Once you've created the Shared Library, you can use it in your Pipeline by calling it at the top of your Jenkinsfile:

```groovy
@Library('semgrep') _

pipeline {
  agent any
    environment {
      // The following variable is required for a Semgrep AppSec Platform-connected scan:
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

The library name in your Jenkinsfile must match the library name you provided in the Jenkins dashboard, and the function invoked must match the name of the Groovy file in your repository. For example, in the preceding example, the library name is `semgrep`, and the function invoked is `semgrepFullScan()`, which matches the name of the Groovy file in your repository `semgrepFullScan.groovy`.
