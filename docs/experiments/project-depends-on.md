---
slug: project-depends-on
append_help_link: true
description: "project-depends-on lets Semgrep rules only returns results if the project depends on a specific version of a third-party package."
---

# project-depends-on

Under this key, NPM or PyPI dependencies can be specified along with the semver range that the rule should trigger for. `project-depends-on` filters the rule unless one of the children is matched by a lockfile. In this initial release, the key is named `r2c-internal-project-depends-on` to signal that the syntax & behavior for the key is not stable and may be subject to removal or future changes. 

We welcome external contributors to try out the key, but keep in mind there's no expectation of stability across releases yet.

## Example

Here’s an example project-depends-on rule that looks for a known vulnerable version of the AWS CLI from April 2017, but only reports the vulnerability if the `s3` module (where the vulnerability is located) is actually being used:

```yaml
rules:
- id: vulnerable-awscli-apr-2017
  patterns:
    - pattern-either:
      - pattern: boto3.resource('s3', ...)
      - pattern: boto3.client('s3', ...)
    - r2c-internal-project-depends-on:
      - namespace: pypi
        package: awscli
        version: "<= 1.11.82"
  message: this version of awscli is subject to a directory traversal vulnerability in the s3 module
  languages: [python]
```

## Limitations

* Dependency resolution supports **only Yarn, npm, and Pip lockfiles** (pipfile.lock, yarn.lock, package-json.lock)
* Uses [Python packaging specifiers](https://packaging.pypa.io/en/latest/specifiers.html) which supports almost all NPM operators, except `^`
