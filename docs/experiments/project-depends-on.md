---
slug: r2c-internal-project-depends-on
append_help_link: true
description: "r2c-internal-project-depends-on lets Semgrep rules only returns results if the project depends on a specific version of a third-party package."
---

# r2c-internal-project-depends-on

Under this key, third-party dependencies can be specified along with the semver (semantic version) range that the rule should trigger for. `r2c-internal-project-depends-on` filters the rule unless one of the children is matched by a lockfile. 

We welcome external contributors to try out the key, but keep in mind there's no expectation of stability across releases yet. **The API and behavior of this feature is subject to change**.

The `r2c-internal-project-depends-on` key must specify either a dependency, or a sequence of dependencies under a `depends-on-either` key.

A dependency consists of three keys:

* `namespace`: The package registry where the third party dependency is found
* `package`: The name of the third party dependency as it appears in the lockfile
* `version`: A semantic version range. Uses [Python packaging specifiers](https://packaging.pypa.io/en/latest/specifiers.html) which support almost all NPM operators, except `^`

So a `r2c-internal-project-depends-on` key will either look like this:
```yaml
r2c-internal-project-depends-on:
  namespace: ...
  package: ...
  version: ...
```
or this:
```yaml
r2c-internal-project-depends-on:
  depends-on-either:
    - namespace: ...
      package: ...
      version: ...
    - namespace: ...
      package: ...
      version: ...
    ...
```

## Example

Here’s an example `r2c-internal-project-depends-on` rule that looks for a known vulnerable version of the AWS CLI from April 2017, but only reports the vulnerability if the `s3` module (where the vulnerability is located) is actually being used:

```yaml
rules:
- id: vulnerable-awscli-apr-2017
  pattern-either:
  - pattern: boto3.resource('s3', ...)
  - pattern: boto3.client('s3', ...)
  r2c-internal-project-depends-on:
    namespace: pypi
    package: awscli
    version: "<= 1.11.82"
  message: this version of awscli is subject to a directory traversal vulnerability in the s3 module
  languages: [python]
```

## Findings

Findings produced by rules with the `r2c-internal-project-depends-on` key can be of two types: _reachable_ and _nonreachable_.
A _reachable_ finding is one with both a dependency match and a pattern match: a vulnerable dependency was found and 
the vulnerable part of the dependency (according to the patterns in the rule) is used somewhere in code. An _unreachable_ 
finding is one with only a dependency match. Reachable findings are reported as coming from the code that was pattern matched. 
Unreachable findings are reported as coming from the lockfile that was dependency matched. Both kinds of findings specify their kind,
along with all matched dependencies, in the `extra` field of semgrep's JSON output, using the `dependency_match_only` and `dependency_matches` fields, respectively.

A finding will only be considered reachable if the file containing the pattern match actually depends on the dependencies in the lockfile containing the dependency match. A file depends on a lockfile if it is the nearest lockfile going up the directory tree.

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

Dependency resolution uses the source of dependency information with the *least amount of ambiguity* available. For all supported languages except Java, this is a lockfile, which lists exact version information for each dependency that a project uses. We do not scan, for example, `package.json` files, because they can contain version ranges. In the case of Java, Maven does not support the creation of lockfiles, so `pom.xml` is the least ambiguous source of information we have, and we consider only dependencies listed with exact versions.