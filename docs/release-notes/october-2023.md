---
slug: October-2023
append_help_link: true
hide_title: true
description: >-
  Release notes include the changes, fixes, and additions in specific versions of Semgrep.
toc_max_heading_level: 3
title: October 2023
tags:
  - Release notes
---

# October 2023 release notes

## 🔧 Semgrep OSS Engine

- The following versions of Semgrep OSS Engine were released in October 2023:
  - [<i class="fas fa-external-link fa-xs"></i> 1.43.0](https://github.com/returntocorp/semgrep/releases/tag/v1.43.0)
  - [<i class="fas fa-external-link fa-xs"></i> 1.44.0](https://github.com/returntocorp/semgrep/releases/tag/v1.44.0)
  - [<i class="fas fa-external-link fa-xs"></i> 1.45.0](https://github.com/returntocorp/semgrep/releases/tag/v1.45.0)
  - [<i class="fas fa-external-link fa-xs"></i> 1.46.0](https://github.com/returntocorp/semgrep/releases/tag/v1.46.0)

## 🌐 Semgrep Cloud Platform

### Added
- Added a button to **Remove** source code manager (SCM) apps. This is helpful when you may have a malconfigured SCM app, such as GitHub's `semgrep-app`, and want to reinstall it. <!--(10688)--> To remove an SCM, click **<i class="fa-solid fa-gear"></i> Settings > Source code managers**.
todo add image <!--settings-scm-remove -->
- Added Semgrep Assistant to the new onboarding flow. <!--(10716) -->
- **OpenAPI:** Renamed instances of r2c to Semgrep. <!--(10685) -->
- **Projects page:** Added a new column to display a Semgrep Secrets counter. This counter counts all secrets regardless of validation state. <!--(10588)-->
- **CLI login:** New users are now directed to create a Semgrep org when they are logging in for the first time to Semgrep Cloud Platform from the CLI. <!-- (10596) -->

### Fixed

- Fixed UI issues in the new onboarding flow.
- Fixed an issue where Semgrep Cloud Platform could crash during the onboarding flow. <!--(#10940) -->
- Various frontend fixes and improvements to the following:
	- Finding detail page
	- Projects page
- Fixed an issue where the **Delete user** functionality did not work for some Semgrep orgs. <!-- (#10756) -->

### Changed

- Updated the default CircleCI YAML snippet to include full and diff scans. <!-- (#10678) -->

## 💻 Semgrep Code

### Fixed

- Speed and stability improvements.


## ⛓️ Semgrep Supply Chain

## 🤖 Semgrep Assistant (beta)

## 🔐 Semgrep Secrets (beta)

### Added

## 📝 Documentation and knowledge base

### Added
* Added Semgrep Secrets documentation:
	* [<i class="fa-regular fa-file-lines"></i> Conceptual overview of Semgrep Secrets](/semgrep-secrets/conceptual-overview)
	* [<i class="fa-regular fa-file-lines"></i> Getting started with Semgrep Secrets](/semgrep-secrets/getting-started)
* Added Required rulesets

### Changed

- The Policies documentation has been improved.
### Fixes

* Various improvements to knowledge base articles.

