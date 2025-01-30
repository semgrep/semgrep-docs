---
slug: january-2025
title: January 2025
hide_title: true
description: >-
  Release notes include the changes, fixes, and additions in specific versions of Semgrep.
tags:
  - Release notes
---

# Semgrep release notes for January 2025

<!-- Remember to update latest endpoint -->
<!-- Remember to update index page -->


## 🌐 Semgrep AppSec Platform

- Links to the project settings & scans pages will now use project IDs rather than names
- ADO SMS public beta
- Email link to join org
- Policy management API

## Changed

- The **search bar** in the **Projects** page now loads faster.  <!-- 18697 -->

## 💻 Semgrep Code

### Added

- Added support for lambdas (anonymous functions) as callbacks. This is supported for all languages that have lambdas.

```javascript
var tainted = source();

function withCallback1(val, callback) {
    if (val) {
        callback(val);
    }
}

withCallback1(tainted, function (val) {
    sink(val); // finding !
});
```

### Changed

- Removed **pip** from the Semgrep Docker image. If you need it, you may install it by running `apk add py3-pip`.

### Fixed

- The `semgrep test` and `semgrep validate` commands have been correctly documented as **EXPERIMENTAL** in `semgrep --help`.
  - Those commands are not GA. It is recommended to use the `semgrep scan --test` and `semgrep scan --validate`, or the variants without the implicit **scan** commands.
- Improve error handling for capabilities ancillary to a scan, such as looking for `nosemgrep` comments and rendering autofixes, to reduce the likelihood of an unexpected error in such a component bringing down the entire scan.
- Fix the behavior of semgrep when running into broken symlinks. If such a path is passed explicitly as a scanning root on the command line, it results in an error. Otherwise if it's a file discovered while scanning the file system, it's a warning.
- Fixed another crash due to exception in `lines_of_file`. The code should now be more robust and not abort the whole scan when an out of bound line access happens during the nosemgrep analysis or when displaying the lines of a match. (saf-1778)

## ⛓️ Semgrep Supply Chain

### Added

<!-- Dependency graphs? -->
- [Dependency Paths](/semgrep-supply-chain/dependency-search#view-the-dependency-path) are now available for the following languages and package managers:
  - JavaScript: All package managers supported by Semgrep.
  - Python: Only Poetry is supported.
- Semgrep can now scan C# Nuget codebases without the need for a lockfile. This feature is in **private beta**. See also [Scan a project without lockfiles](/semgrep-supply-chain/getting-started#scan-a-project-without-lockfiles-beta). Reach out to [<i class="fa-regular fa-envelope"></i> support@semgrep.com](mailto:support@semgrep.com) to join the beta program.
- Semgrep Supply Chain now ingests CVE information from [<i class="fas fa-external-link fa-xs"></i> Electron release notes](https://releases.electronjs.org/releases/stable). This information is used to generate rules that can detect if you're affected by CVEs from this source.

### Changed

- Semgrep Supply Chain [Policies](/supply-chain/policies) are now in public beta. Creating a policy enables you to:
  - Customize when Semgrep sends a finding as a PR or MR comment or fails the CI job.
  - Customize the projects and conditions that send a comment or fail a CI job.

### Fixed

- Fixed bug where supply chain diff-aware scans of `package-lock.json` v2 projects incorrectly produced non-new findings.

## 🤖 Semgrep Assistant 

## 🔐 Semgrep Secrets

## 📝 Documentation and knowledge base

### Added 
- Added the following new documents, articles and sections:
  - [Semgrep for developers](/for-developers/overviews) is a new series of documents that aims to:
    - Help AppSec engineers educate developers about Semgrep and secure coding.
    - Inform developers of how to resolve Semgrep findings in various environments, such as their pull requests or merge requests.
  - KB_ARTICLE_NAME
- Minor additions and updates:
  - tk
- Major updates have been made to the following documentation:
  - Supported languages
- Thanks to savq for their improvements to Semgrep's contributing documentation.

## 🔧 Semgrep Community Edition (CE)

* The following versions of Semgrep CE were released in January 2025:

  - [<i class="fas fa-external-link fa-xs"></i> 1.102.0](https://github.com/semgrep/semgrep/releases/tag/v1.102.0) 
  - [<i class="fas fa-external-link fa-xs"></i> 1.103.0](https://github.com/semgrep/semgrep/releases/tag/v1.103.0)
  - [<i class="fas fa-external-link fa-xs"></i> 1.104.0](https://github.com/semgrep/semgrep/releases/tag/v1.104.0)
