---
tags:
  - GitHub
  - Docker
  - Semgrep CI
description: How to properly configure your GitHub Actions workflow to use the `nonroot` Semgrep docker image
append_help_link: true
---

# Configuring GitHub Actions to use the `nonroot` Semgrep docker image

When using a [`nonroot` variant](https://hub.docker.com/r/semgrep/semgrep/tags?page=&page_size=&ordering=&name=nonroot) of the Semgrep docker image with GitHub Actions, there is some extra workflow configuration required to ensure that scans run as intended despite the limited permissions of the `nonroot` image.

This [sample GitHub Actions configuration file](/docs/semgrep-ci/sample-ci-configs#sample-github-actions-configuration-file) uses the default Semgrep docker image, which has root permissions, making it very simple to declare it as a container image running on top of something like Ubuntu, using the GitHub Actions workflow YAML syntax.

With the `nonroot` image, the same YAML syntax cannot be used to declare the image, as it will then run into permissions issues when trying to check out the repository during scan time. Instead, the image must be declared using a `docker run` command, along with the proper user and group permissions applied beforehand.

Furthermore, various pieces of git metadata stored as environment variables or in the `GITHUB_EVENT_PATH` JSON file must be copied over from the runner environemnt to the `nonroot` image environment, as Semgrep uses this information to properly configure the scan.

## Sample GitHub Actions workflow file using the `nonroot` Semgrep docker image

The example workflow file below contains the extra steps required to successfully use the `nonroot` image, along with commented explanations before each step.

```yaml
# Name of this GitHub Actions workflow.
name: Semgrep

on:
  # Scan changed files in PRs (diff-aware scanning):
  pull_request: {}
  # Scan on-demand through GitHub Actions interface:
  workflow_dispatch: {}
  # Scan mainline branches if there are changes to .github/workflows/semgrep.yml:
  push:
      branches:
          - main
          - master
      paths:
          - .github/workflows/semgrep.yml
  # Schedule the CI job (this method uses cron syntax):
  schedule:
      - cron: '20 17 * * *' # Sets Semgrep to scan every day at 17:20 UTC.
      # It is recommended to change the schedule to a random time.

jobs:
  semgrep:
    name: semgrep/ci
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Semgrep
        run: |

          # Copy the event.json file into the current working directory 
          # so it gets mounted when we run docker and semgrep can refer 
          # to it when setting git metadata.
          cp $GITHUB_EVENT_PATH ./.github_event_path.json
          # Copy over all GitHub Actions related env vars from the runner
          # environment into a file that will get passed into docker so 
          # we retain all necessary env vars that semgrep uses for 
          # setting git metadata.
          echo "Saving these env vars to file, then passing into docker container."
          printenv | sort | egrep "^GITHUB_" | tee .env
          printenv | sort | egrep "^RUNNER_" | tee -a .env
          # Recursively set the owner:group of all files in the current
          # working directory to the UID and GID of the semgrep user
          # that the non-root semgrep docker image runs as. When we bind
          # mount the directory to our docker container, it retains the
          # permissions of the host.
          sudo chown -R 1000:1000 .
          # Finally, we pass in all the env vars from our file along with
          # setting the SEMGREP_APP_TOKEN and updated GITHUB_EVENT_PATH.
          docker run --rm -v "${PWD}:/src" \
            --env-file .env \
            -e SEMGREP_APP_TOKEN=${{ secrets.SEMGREP_APP_TOKEN }} \
            -e GITHUB_EVENT_PATH="/src/.github_event_path.json" \
            semgrep/semgrep:latest-nonroot \
            semgrep ci
```