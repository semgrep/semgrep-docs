---
description: How to generate lock files for SSC in a Circle CI pipeline
tags:
  - Semgrep Supply Chain
  - CircleCI
  - Lock files
  - Workspaces
---
## How to generate lock files for SSC in a Circle CI pipeline?

Semgrep Supply Chain needs your project's lockfiles as input to scan your codebase successfully.

If you run Semgrep Supply Chain in CircleCI, you can generate the lockfile during the first job and then pass it to the Semgrep scan. You can do this using the concept of a [workspace](https://circleci.com/docs/workspaces/) to share files between jobs.

The following `config.yml` file demonstrates how you can generate a file, and then pass it to subsequent jobs using CircleCI workspaces:

```yaml
version: 2.1

jobs:
  build:
    docker:
      - image: cimg/openjdk:17.0
    steps:
      - checkout
      - run: 
          name: lockfile generation
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
      - image: returntocorp/semgrep
    steps:
      - checkout
      - attach_workspace: # This step attaches the workspace from the previous job
          at: /tmp/workspace
      - run: 
         name: Semgrep scan
         command: |
           cp /tmp/workspace/maven_dep_tree.txt .
           semgrep ci
         
workflows:
  version: 2
  build_and_scan:
    jobs:
      - build
      - scan:
          context:
            - semgrep
          requires:
            - build
```

```yaml
version: 2.1

jobs:
  build:
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
      - image: returntocorp/semgrep
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
      - build
      - scan:
          context:
            - semgrep
          requires:
            - build
```

:::note
The `semgrep` [context](https://circleci.com/docs/contexts/)  is where you must define the environment variables Semgrep needs, such as the `SEMGREP_APP_TOKEN`. 
:::