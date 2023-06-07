---
slug: extensions
append_help_link: true
description: >-
  Learn how to use Semgrep in an editor, in pre-commit, and in other tools.
---

import MoreHelp from "/src/components/MoreHelp"

# Extensions

Several third-party tools include Semgrep extensions.


### Editor

- IntelliJ IDEA: [`semgrep-idea-plugin`](https://github.com/jtmelton/semgrep-idea-plugin)
- Microsoft Visual Studio Code: [`semgrep-vscode`](https://marketplace.visualstudio.com/items?itemName=semgrep.semgrep)
- Vim: [`semgrep.vim`](https://github.com/returntocorp/semgrep.vim)

### Pre-commit

The [pre-commit framework](https://pre-commit.com/) can run `semgrep` at commit-time. [Install `pre-commit`](https://pre-commit.com/#install) and add the following to `.pre-commit-config.yaml`

```yaml
repos:
- repo: https://github.com/returntocorp/semgrep
  rev: 'SEMGREP_VERSION_LATEST'
  hooks:
    - id: semgrep
      # See https://semgrep.dev/explore to select a ruleset and copy its URL
      args: ['--config', '<SEMGREP_RULESET_URL>', '--error', '--skip-unknown-extensions']
```

The pre-commit can also run custom rules and rulesets from Semgrep Code, similar to running `semgrep ci` using the following configuration:

```yaml
repos:
- repo: https://github.com/returntocorp/semgrep
  rev: 'SEMGREP_VERSION_LATEST'
  hooks:
    - id:  semgrep-ci
      # See https://semgrep.dev/explore to select a ruleset and copy its URL
      args: ['--config', '<SEMGREP_RULESET_URL>', '--error', '--skip-unknown-extensions']
```

### Version management

- asdf: [ASDF Semgrep](https://github.com/brentjanderson/asdf-semgrep)

### Semgrep as an engine

Many other tools have functionality powered by Semgrep.
Add yours [with a pull request](https://github.com/returntocorp/semgrep-docs)!

- [DefectDojo](https://github.com/DefectDojo/django-DefectDojo/pull/2781)
- [Dracon](https://github.com/thought-machine/dracon)
- [GitLab SAST](https://docs.gitlab.com/ee/user/application_security/sast/#multi-project-support)
- [GuardDog](https://github.com/datadog/guarddog)
- [libsast](https://github.com/ajinabraham/libsast)
- [mobsfscan](https://github.com/MobSF/mobsfscan)
- [nodejsscan](https://github.com/ajinabraham/nodejsscan)
- [SALUS](https://github.com/coinbase/salus/blob/master/docs/scanners/semgrep.md)
- [ScanMyCode CE (Community Edition)](https://github.com/marcinguy/scanmycode-ce) 
- [SecObserve](https://github.com/MaibornWolff/SecObserve)

<MoreHelp />
