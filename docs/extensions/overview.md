---
slug: overview
append_help_link: true
description: >-
  Learn how to use Semgrep in an editor, in pre-commit, and in other tools.
---

import IdeList from "/src/components/reference/_ide-list.md"

# Extensions

Several third-party tools include Semgrep extensions.

### Official IDE extensions

<IdeList />

### Use of Language Server Protocol (LSP)

All of the official extensions use the [Language Server Protocol](https://microsoft.github.io/language-server-protocol/) to communicate with Semgrep. This allows the team to focus on one codebase that can be shared across most modern editor platforms.

### Semgrep as an engine

Many other tools have capabilities powered by Semgrep.
Add yours [with a pull request](https://github.com/semgrep/semgrep-docs)!

- [DefectDojo](https://github.com/DefectDojo/django-DefectDojo/pull/2781)
- [Dracon](https://github.com/thought-machine/dracon)
- [GitLab SAST](https://docs.gitlab.com/ee/user/application_security/sast/#multi-project-support)
- [GuardDog](https://github.com/datadog/guarddog)
- [libsast](https://github.com/ajinabraham/libsast)
- [mobsfscan](https://github.com/MobSF/mobsfscan)
- [nodejsscan](https://github.com/ajinabraham/nodejsscan)
- [ScanMyCode CE (Community Edition)](https://github.com/marcinguy/scanmycode-ce)
- [SecObserve](https://github.com/MaibornWolff/SecObserve)
