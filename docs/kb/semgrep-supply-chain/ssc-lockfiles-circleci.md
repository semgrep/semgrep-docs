---
title: Generate lockfiles for Semgrep Supply Chain in a Circle CI pipeline
description: How to generate lockfiles for Semgrep Supply Chain in a Circle CI pipeline.
tags:
  - Semgrep Supply Chain
  - CircleCI
  - Lockfiles
  - Workspaces
---

# Generate lockfiles for Semgrep Supply Chain in a Circle CI pipeline

Semgrep Supply Chain needs your project's lockfiles as input to scan your codebase successfully. If the [lockfiles that Supply Chain supports](/docs/supported-languages/#semgrep-supply-chain) are not under source control in your project, you can generate the lockfile as part of the CI job.

In CircleCI, you can generate a lockfile during the first job and then pass it to the Semgrep scan using a [workspace](https://circleci.com/docs/workspaces/) to share files between jobs.

The following `config.yml` file demonstrates how you can generate a lockfile and pass it to subsequent jobs using CircleCI workspaces. This example uses a `maven_dep_tree.txt` file, which [typically needs to be generated](/docs/semgrep-supply-chain/setup-maven) from a `pom.xml` for Maven dependency tracking.

```yaml
version: 2.1

jobs:
  lock_file_generation:
    docker:
      - image: cimg/openjdk:17.0
    steps:
      - checkout
      - run:
          name: lock file generation
          command: |
            mkdir -p workspace
            mvn dependency:tree -DoutputFile=workspace/maven_dep_tree.txt
            cat workspace/maven_dep_tree.txt
      - persist_to_workspace:
          root: workspace
          paths:
            - maven_dep_tree.txt

  scan:
    docker:
      - image: semgrep/semgrep
    steps:
      - checkout
      - attach_workspace: # This step attaches the workspace from the previous job
          at: /tmp/workspace
      - run:
         name: semgrep scan
         command: |
           cp /tmp/workspace/maven_dep_tree.txt .
           semgrep ci

workflows:
  version: 2
  build_and_scan:
    jobs:
      - lock_file_generation
      - scan:
          context:
            - semgrep
          requires:
            - build
```

The `semgrep` [context](https://circleci.com/docs/contexts/) is used here as the name for the context where you define the environment variables Semgrep needs, such as the `SEMGREP_APP_TOKEN`. This is similar to the [sample configuration for CircleCI](/semgrep-ci/sample-ci-configs/#sample-circleci-configuration-snippet). You can choose to give the context a different name if you prefer.
