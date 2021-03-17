# Extensions

Several third-party tools include Semgrep extensions.

### Editor

Semgrep supports Microsoft Visual Studio Code with the [semgrep-vscode](https://marketplace.visualstudio.com/items?itemName=semgrep.semgrep) extension.

### Pre-commit

The [pre-commit framework](https://pre-commit.com/) can run `semgrep` at commit-time. [Install `pre-commit`](https://pre-commit.com/#install) and add the following to `.pre-commit-config.yaml`

```
repos:
- repo: https://github.com/returntocorp/semgrep
  rev: 'v0.43.0'
  hooks:
    - id: semgrep
      # See semgrep.dev/rulesets to select a ruleset and copy its URL
      args: ['--config', '<SEMGREP_RULESET_URL>', '--error']
```

### Semgrep as an engine

Many other tools have functionality powered by Semgrep.
Add yours [with a pull request](https://github.com/returntocorp/semgrep-docs)!

* [nodejsscan](https://github.com/ajinabraham/nodejsscan)
* [libsast](https://github.com/ajinabraham/libsast)
* [DefectDojo](https://github.com/DefectDojo/django-DefectDojo/pull/2781)
* [Dracon](https://github.com/thought-machine/dracon)
* [SALUS](https://github.com/coinbase/salus/blob/master/docs/scanners/semgrep.md)
