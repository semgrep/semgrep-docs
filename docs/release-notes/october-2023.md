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
  - [<i class="fas fa-external-link fa-xs"></i> 1.43.0](https://github.com/semgrep/semgrep/releases/tag/v1.43.0)
  - [<i class="fas fa-external-link fa-xs"></i> 1.44.0](https://github.com/semgrep/semgrep/releases/tag/v1.44.0)
  - [<i class="fas fa-external-link fa-xs"></i> 1.45.0](https://github.com/semgrep/semgrep/releases/tag/v1.45.0)
  - [<i class="fas fa-external-link fa-xs"></i> 1.46.0](https://github.com/semgrep/semgrep/releases/tag/v1.46.0)

## 🌐 Semgrep Cloud Platform

### Added
- Added a button to **Remove** source code manager (SCM) apps. This is helpful when you have a misconfigured SCM app, such as GitHub's `semgrep-app`, and want to reinstall it. <!--(10688)--> To remove an SCM, click **<i class="fa-solid fa-gear"></i> Settings > Source code managers**.
    ![Remove your source code manager](/img/settings-scm-remove.png)
- Added Semgrep Assistant to the new **Getting started** guide in the onboarding flow. <!--(10716) -->
- **OpenAPI:** Renamed instances of r2c to Semgrep. <!--(10685) -->
- **CLI login:** New users are now directed to create a Semgrep org when they are logging in for the first time to Semgrep Cloud Platform from the CLI. <!-- (10596) -->

### Changed

- Updated the default CircleCI YAML snippet to include full and diff scans. <!-- (#10678) -->

### Fixed

- Fixed UI issues in the new onboarding flow.
- Fixed an issue where Semgrep Cloud Platform could crash during the onboarding flow. <!--(#10940) -->
- Various frontend fixes and improvements to the following:
	- Finding detail page
	- Projects page
- Fixed an issue where the **Delete user** functionality did not work for some Semgrep orgs. <!-- (#10756) -->

## 💻 Semgrep Code

### Fixed

- Speed and stability improvements across the product. Semgrep Code pages, such as Findings and Policies, now load faster.
- **Semgrep Assistant:** Component tags are now visible for all Assistant users.
    - **Component tags** use GPT-4 to categorize a finding based on its function, such as:
        - Payments
        - User authentication
        - Infrastructure
    - By categorizing your code through component tags, Semgrep Assistant is able to help you prioritize **high-risk issues**, for example if Semgrep has detected a code finding related to payments or user authentication.
    ![Semgrep Assistant Component tag list](/img/assistant-component-tags.png)

## ⛓️ Semgrep Supply Chain

### Added

- Added a new, public [<i class="fas fa-external-link fa-xs"></i> Semgrep Supply Chain API](https://semgrep.dev/api/v1/docs/#tag/SupplyChainService) where you can filter and query third-party vulnerability findings by a variety of parameters, such as:
    - Severity
    - Repository
    - Exposure
- **C# reachability** is now **GA (generally available)**. Semgrep Supply Chain has added reachability rule support for all C# CVEs from May 2022 onward.
- **SBOM export:** Add vulnerabilities enriched with reachability analysis to export SBOMs. <!-- (#10879 ) -->
- Dependency license scanning:
    - Added support for NuGet (C#) license detection. <!-- (10777) -->
    - Added support for RubyGems (Ruby) license detection.
- **Advisories:** Added a tooltip displaying the date when a CVE Numbering Authority (CNA) created the security advisory. [<i class="fas fa-external-link fa-xs"></i> CVE Numbering Authorities](https://nvd.nist.gov/general/cve-process) include the MITRE Corporation. These dates are not assigned by Semgrep, Inc. <!-- (10743) -->
![Tooltip of advisory creation date](/img/advisories-date-created.png#bordered)

### Changed

- **SBOM (software bill of materials) export:** The name of the exported SBOM file now follows the following format: `sbom-<org_name>-<repo_name>-<MM-DD-YY_H-m-s>--<serial_number>.<xml|json>` <!-- (10850) -->

### Fixed

* **SBOM export:** Fixed an issue where SBOM export failed when encountering dependencies with empty names.
* **Vulnerabilities page:** Fixed an issue where triage states did not update until a page refresh. Triage states now update as the user performs a triage action. <!-- (10887) -->

## 🔐 Semgrep Secrets (beta)

### Added

- Semgrep Secrets is now in **public beta**.
- **Projects page:** Added a new column to display a Semgrep Secrets counter. This counter counts all secrets regardless of validation state. <!--(10588)-->

### Fixed

- Fixed links to branches in GitLab self-hosted repositories. <!-- (#10897) -->

## 📝 Documentation and knowledge base

### Added
- Added Semgrep Secrets documentation:
	- [<i class="fa-regular fa-file-lines"></i> Conceptual overview of Semgrep Secrets](/semgrep-secrets/conceptual-overview)
	- [<i class="fa-regular fa-file-lines"></i> Getting started with Semgrep Secrets](/semgrep-secrets/getting-started)
- Added [<i class="fa-regular fa-file-lines"></i> Repository rulesets](/kb/semgrep-ci/github-repository-rulesets-semgrep) knowledge base article. This article explains how to scale Semgrep across many GitHub repositories.
- Created an automated job to sync the help output of the Semgrep CLI tool with [<i class="fa-regular fa-file-lines"></i> CLI reference](/cli-reference).

### Changed

- The [<i class="fa-regular fa-file-lines"></i> Policies](/semgrep-code/policies) documentation has been improved.

### Fixed

* Various improvements to knowledge base articles.
