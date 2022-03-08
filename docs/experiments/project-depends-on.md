---
slug: project-depends-on
append_help_link: true
description: "project-depends-on lets Semgrep rules only returns results if the project depends on a specific version of a third-party package."
---

# project-depends-on

Under this key, third-party dependencies can be specified along with the semver range that the rule should trigger for. `project-depends-on` filters the rule unless one of the children is matched by a lockfile. In this initial release, the key is named `r2c-internal-project-depends-on` to signal that the syntax & behavior for the key is not stable and may be subject to removal or future changes. 

We welcome external contributors to try out the key, but keep in mind there's no expectation of stability across releases yet.

`r2c-internal-project-depends-on` patterns must specify three keys:

* `namespace`: The package registry where the third party dependency is found
* `package`: The name of the third party dependency as it appears in a lockfile
* `version`: A semantic version range. Uses [Python packaging specifiers](https://packaging.pypa.io/en/latest/specifiers.html) which supports almost all NPM operators, except `^`

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

## Supported Languages

| Language   | Namespace  | Scans dependencies from          |
|:---------- |:-----------|:---------------------------------|
| Python     | pypi       | `Pipfile.lock`                   |
| JavaScript | npm        | `yarn.lock`, `package-lock.json` |
| Java       | maven      | `pom.xml`                        |
| Go         | gomod      | `go.sum`                         |
| Ruby       | gem        | `Gemfile.lock`                   |
| Rust       | cargo      | `cargo.lock`                     |

## Limitations

* Dependency resolution uses the source of dependency information with the *least amount of ambiguity* available. For all supported languages except Java, this is a lockfile, which lists exact version information for each dependency that a project uses. We do not scan, for example, `package.json` files, because they can contain version ranges. In the case of Java, Maven does not support the creation of lockfiles, so `pom.xml` is the least ambiguous source of information we have.