---
slug: overview
append_help_link: true
description: >-
  Learn how to use Semgrep in an editor, in pre-commit, and in other tools.
---


import Login from "/src/components/procedure/_login-activate.mdx"

# Extensions

Several third-party tools include Semgrep extensions.

### Official IDE extensions

- Microsoft Visual Studio Code: [`semgrep-vscode`](https://marketplace.visualstudio.com/items?itemName=semgrep.semgrep)
- IntelliJ Ultimate Idea (and most other IntelliJ products) [`semgrep-intellij`](https://plugins.jetbrains.com/plugin/22622-semgrep)
- Emacs: [`lsp-mode`](https://github.com/emacs-lsp/lsp-mode)

### The LSP Command

All of our official extensions use the [Language Server Protocol](https://microsoft.github.io/language-server-protocol/) to communicate
with Semgrep. This allows us to focus on one codebase that can be shared across most modern editor platforms. To implement a custom extension,
one can wrap `semgrep lsp` to start the Semgrep Language Server, which will communicate over `stdio`. Alternatively, this protocol is a
great way to integrate Semgrep into a project, as it can perform incremental scans, and caches various computations to hugely increase performance.
Please let us know on our community Slack linked below if you do, we'd be more than happy to help in anyway.

### Pre-commit

The [pre-commit framework](https://pre-commit.com/) can run `semgrep` at commit-time. [Install `pre-commit`](https://pre-commit.com/#install) and add the following to `.pre-commit-config.yaml`

```yaml
repos:
- repo: https://github.com/semgrep/semgrep
  rev: 'SEMGREP_VERSION_LATEST'
  hooks:
    - id: semgrep
      # See https://semgrep.dev/explore to select a ruleset and copy its URL
      args: ['--config', '<SEMGREP_RULESET_URL>', '--error', '--skip-unknown-extensions']
```

The pre-commit can also run custom rules and rulesets from Semgrep Code, similar to running `semgrep ci` using the following configuration:

```yaml
repos:
- repo: https://github.com/semgrep/semgrep
  rev: 'SEMGREP_VERSION_LATEST'
  hooks:
    - id:  semgrep-ci
```

#### Run with Semgrep Pro rules

If you would like to run the pre-commit hook **locally** while using Semgrep Pro rules:

<Login />

### Version management

- asdf: [ASDF Semgrep](https://github.com/brentjanderson/asdf-semgrep)

### Semgrep as an engine

Many other tools have functionality powered by Semgrep.
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
