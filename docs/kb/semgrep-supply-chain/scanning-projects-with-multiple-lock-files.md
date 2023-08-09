---
tags:
  - GitHub Actions
  - Lock files
description: Scanning projects with multiple lock files. A Maven example.
---

# Scanning Apache Maven projects with multiple lockfiles

Your project may have many modules, each with a manifest file; for example, `pom.xml` if Maven is used as a build dependency tool.
This [project](https://github.com/r2c-CSE/legend-engine) complies with the above description.
If you correctly generate all lock files, one per module, Semgrep can perform a successful Supply Chain scan for all dependencies in the project.

## Generating lock files before scanning
In the case of using Maven, the command to use is:
```
mvn dependency:tree -DoutputFile=maven_dep_tree.txt
```

And this step must be executed before calling Semgrep. So, a typical GitHub Actions workflow can look like this:
```
on: 
  workflow_dispatch: 
  pull_request: {}
  push:
    branches:
    - main
    paths:
    - .github/workflows/semgrep.yml
name: Semgrep
jobs:
  buildmavenDepTree: 
      runs-on: ubuntu-latest
      steps:
      - uses: actions/checkout@v3
      - name: Set up JDK 17
        uses: actions/setup-java@v3
        with:
          java-version: '17'
          distribution: 'temurin'
      - name: Build with Maven
        run: mvn --batch-mode --update-snapshots package
      - name: Build Dependency Tree
        run: mvn dependency:tree -DoutputFile=maven_dep_tree.txt
      - name: Upload Dependency Tree Artifact     
        uses: actions/upload-artifact@v3
        with:
          name: mavendeptree
          path: maven_dep_tree.txt
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
      - name: Download artifact from previous job
        uses: actions/download-artifact@v3
        with:
          name: mavendeptree 
      - run: semgrep ci 
```

As can be seen, in the case of using GitHub Actions as a CI platform, using artifacts to share files between jobs is required.

## Sharing multiple lock files as artifacts
As the project can have multiple dependency descriptor files (`pom.xml` in the case of Maven), there will be multiple lock files (`maven_dep_tree.txt`).
These lock files must be shared as artifacts between jobs, and the efficient way to do it is through a zip file that gathers all lock files and, in the next job, unzips the lock files and runs Semgrep as usual.
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
In the case of using GitHub Actions and if your project has multiple Maven lock files, uploading all of them as a zip file and downloading them in the next step can help to get a successful semgrep supply chain scan. 
This concept (shared lock files as zip files between jobs) can be extrapolated to other build dependencies systems such as Gradle or other platforms such as GitLab, Bitbucket, Jenkins, etc...
