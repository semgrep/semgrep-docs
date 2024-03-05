---
description: How to generate lock files for SSC in a Circle CI pipeline
tags:
  - Semgrep Supply Chain
  - CircleCI
  - Lock files
  - Workspaces
---
## How to generate lock files for SSC in a Circle CI pipeline?

When running SSC scan, Semgrep needs the lock files as input. 

If the scan happens during a CI/CD pipeline, you could generate the lock file in a first job (lock file generation) and pass it to the second job (semgrep scan).

If the CI/CD platform is CircleCI, then you could use the concept [workspace](https://circleci.com/docs/workspaces/) to share files between jobs.

Using workspaces, a `config.yml` for CircleCI could look like this:

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
The [context](https://circleci.com/docs/contexts/) `semgrep` is where you can define all the environment variables semgrep needs, such as the `SEMGREP_APP_TOKEN`. 
:::