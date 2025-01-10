---
slug: packages-in-semgrep-docker
title: Packages in Semgrep docker
hide_title: true
description: Packages included in the latest Semgrep docker image.
tags:
  - Deployment
  - Semgrep AppSec Platform
---

# Packages in the Semgrep docker image

## Packages

In addition to the `semgrep` binary, the [<i class="fas fa-external-link fa-xs"></i> `semgrep/semgrep:latest` docker image](https://hub.docker.com/r/semgrep/semgrep/tags) contains the following packages:

- `bash`
- `jq`
- `curl`
- Python 3.11 (`alpine:3.19` base image)

The Alpine 3.19 docker image includes additional packages that can change without notice. To review them, run `docker run alpine:3.19 apk list`.

:::caution
* Do **not** rely on the presence of packages from the Alpine docker image in your CI workflows. They are not guaranteed to be included in the future and are not managed by Semgrep.
* `jq` and `curl` may be removed in future Semgrep releases. You can install them directly in the docker image. For example:
```yaml
  job:
    container: semgrep/semgrep:latest
    runs-on: ubuntu-latest-16-core
    steps:
      - uses: actions/checkout@v3
      - name: Install dependencies
        run: apk add bash jq curl
      - run: semgrep scan --json ... | jq ...
```
:::

## Previous incidents

- [<i class="fas fa-external-link fa-xs"></i> Semgrep v.1.66.0](https://github.com/semgrep/semgrep/releases/tag/v1.66.0) removed `bash`, `jq`, and `curl` to reduce the attack surface of the Semgrep docker image. They were subsequently re-added for future Semgrep releases.
