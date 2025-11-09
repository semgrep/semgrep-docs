---
slug: overview
append_help_link: true
description: >-
  Learn how to use Semgrep in an editor, in pre-commit, and in other tools.
---
<!-- IMPORTANT: Make sure to edit the .md.template source file, not the
     generated .md file -->

import IdeList from "/src/components/reference/_ide-list.md"

# Extensions

Several third-party tools include Semgrep extensions.

## Official IDE extensions

<IdeList />

## Use of Language Server Protocol (LSP)

All of the official IDE extensions use the [Language Server Protocol](https://microsoft.github.io/language-server-protocol/) to communicate with Semgrep. This allows the team to focus on one codebase that can be shared across most modern editor platforms.

## `pre-commit`

Prevent secrets or security issues from entering your Git source control history by running Semgrep as a [<i class="fas fa-external-link fa-xs"></i> pre-commit](https://pre-commit.com/) hook. See [`pre-commit` documentation](/extensions/pre-commit) for details.

## Semgrep as an engine

Many other tools have capabilities powered by Semgrep.
Add yours [with a pull request](https://github.com/semgrep/semgrep-docs)!

- [DefectDojo](https://github.com/DefectDojo/django-DefectDojo/pull/2781)
- [Dracon](https://github.com/thought-machine/dracon)
- [GitLab SAST](https://docs.gitlab.com/ee/user/application_security/sast/#multi-project-support)
- [GuardDog](https://github.com/datadog/guarddog)
- [litbsast](https://github.com/ajinabraham/libsast)
- [mobsfscan](https://github.com/MobSF/mobsfscan)
- [nodejsscan](https://github.com/ajinabraham/nodejsscan)
- [ScanMyCode CE (Community Edition)](https://github.com/marcinguy/scanmycode-ce)
- [SecObserve](https://github.com/SecObserve/SecObserve)
