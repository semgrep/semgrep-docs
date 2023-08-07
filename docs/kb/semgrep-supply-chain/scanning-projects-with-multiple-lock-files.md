---
tags:
  - GitHub Actions
  - Lock files
description: Scanning projects with multiple lock files in GitHub Actions
---

# Scanning projects with multiple lock files in GitHub Actions

Your project may have many modules, each with a dependency descriptor file; for example, `pom.xml` if Maven is used as a build dependency tool.
This [project](https://github.com/finos/legend-engine) complies with the above description.
In this case, Semgrep will run a successful supply chain scan of all the lock files, one per module, if they are correctly generated.

## Generating lock files as the previous step
In the case of using Maven, the command to use is:
```
mvn dependency:tree -DoutputFile=maven_dep_tree.txt
```

And this step must be executed before calling Semgrep. So, a typical Jenkins pipeline can look like this:
```
pipeline {
  agent any
    environment {
      SEMGREP_APP_TOKEN = credentials('SEMGREP_APP_TOKEN')
      SEMGREP_BRANCH="${GIT_BRANCH}"
    }
    stages {
      stage ('Generate-LockFile') {
        steps {
            withMaven(maven: 'maven') {
              sh "mvn dependency:tree -DoutputFile=maven_dep_tree.txt"
            }
        }
      }
      stage('Semgrep-Scan') {
        steps {
                script {
                    if (env.GIT_BRANCH == 'master') {
                      sh 'pip3 install semgrep'
                      sh 'semgrep ci'
                    }  
                }
        }
      }
    }
}
```
In the case of using GitHub Actions as a CI platform, then using artifacts to share files between jobs is required.

## Sharing lock files as artifacts
As the project can have multiple dependency descriptor files (`pom.xml` in the case of Maven), there will be multiple lock files (`maven_dep_tree.txt`).
These lock files must be shared as artifacts between jobs, and the efficient way to do it are through a zip file that can gather all lock files and then, in the next job, unzip the lock files and run Semgrep as usual.
Here is a GitHub Actions workflow example:
```
on: 
  workflow_dispatch: 
  pull_request: {}
  push:
    branches:
    - master
    paths:
    - .github/workflows/semgrep.yml
  schedule:
  - cron: 00 5 1 * *
name: Semgrep
jobs:
  buildmavenDepTree: 
      runs-on: ubuntu-latest
      steps:
      - uses: actions/checkout@v3
      - name: Set up JDK 11
        uses: actions/setup-java@v3
        with:
          java-version: '11'
          distribution: 'temurin'
      - name: Build Dependency Tree
        run: mvn dependency:tree -DoutputFile=maven_dep_tree.txt -Dmaven.test.skip=true
      - name: Create Zip File
        run: find . -type f -name 'maven_dep_tree.txt' -exec zip -r archive.zip {} +
      - name: Upload Dependency Zip    
        uses: actions/upload-artifact@v3
        with:
          name: zipfile
          path: archive.zip
  semgrep:
    needs: buildmavenDepTree
    name: Scan
    runs-on: ubuntu-20.04
    env:
      SEMGREP_APP_TOKEN: ${{ secrets.SEMGREP_APP_TOKEN }}
    container:
      image: returntocorp/semgrep
    steps:
      - uses: actions/checkout@v3
      - name: Download artifact from the previous job
        uses: actions/download-artifact@v3
        with:
          name: zipfile    
      - name: Semgrep Scan  
        run: |
          unzip -o archive.zip
          semgrep ci
```

## Conclusions
In the case of using GitHub Actions and if your project has multiple lock files, uploading all of them as a zip file and downloading them in the next step can help to get a successful semgrep supply chain scan.

