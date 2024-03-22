---
slug: packages-in-semgrep-docker
title: Packages in Semgrep docker
hide_title: true
description: Packages included in the latest Semgrep docker image.
tags:
  - Semgrep in CI
---

# Packages in the Semgrep docker image 

## Packages

The [<i class="fas fa-external-link fa-xs"></i> `semgrep/semgrep:latest` docker image](https://hub.docker.com/r/semgrep/semgrep/tags) contains the following packages:

- `bash`
- `jq`
- `curl`
- Python 3.11 (`3.11-alpine` base image)

The Python 3.11 docker includes additional packages (for example, `ncurses`) that can change without notice. To review them, see the following links:

- [<i class="fas fa-external-link fa-xs"></i> Dockerfile for Python 3.11-alpine](https://github.com/docker-library/python/blob/105d6f34e7d70aad6f8c3e249b8208efa591916a/3.11/alpine3.19/Dockerfile), where you can see the list of packages added to the image.
- [<i class="fas fa-external-link fa-xs"></i> Python docker hub page](https://hub.docker.com/_/python)

## Previous incidents

- [<i class="fas fa-external-link fa-xs"></i> Semgrep v.1.66.0](https://github.com/semgrep/semgrep/releases/tag/v1.66.0) removed `bash`, `jq`, and `curl` to reduce the attack surface of the Semgrep docker image. They were subsequently re-added for future Semgrep releases.

