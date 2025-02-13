---
slug: overview
append_help_link: true
description: >-
  Learn how to use Semgrep in an editor, in pre-commit, and in other tools.
---

import IdeList from "/src/components/reference/_ide-list.md"
import Login from "/src/components/procedure/_login-activate.mdx"

# Extensions

Several third-party tools include Semgrep extensions.

### Official IDE extensions

<IdeList />

### Use of Language Server Protocol (LSP)

All of the official extensions use the [Language Server Protocol](https://microsoft.github.io/language-server-protocol/) to communicate with Semgrep. This allows the team to focus on one codebase that can be shared across most modern editor platforms.

### Pre-commit

The [pre-commit framework](https://pre-commit.com/) can run `semgrep` at commit-time. [Install `pre-commit`](https://pre-commit.com/#install) and add the following to `.pre-commit-config.yaml`

```yaml
repos:
- repo: https://github.com/semgrep/pre-commit
  rev: 'SEMGREP_VERSION_LATEST'
  hooks:
    - id: semgrep
      # See https://semgrep.dev/explore to select a ruleset and copy its URL
      args: ['--config', '<SEMGREP_RULESET_URL>', '--error', '--skip-unknown-extensions']
```

The pre-commit can also run custom rules and rulesets from Semgrep Code, similar to running `semgrep ci` using the following configuration:

```yaml
repos:
- repo: https://github.com/semgrep/pre-commit
  rev: 'SEMGREP_VERSION_LATEST'
  hooks:
    - id:  semgrep-ci
```

For guidance on customizing Semgrep's behavior in pre-commit, see [Customize Semgrep in pre-commit](/docs/kb/integrations/customize-semgrep-precommit).

#### Run with Semgrep Pro rules

If you would like to run the pre-commit hook **locally** while using Semgrep Pro rules:

<Login />

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
