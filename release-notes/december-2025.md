---
slug: december-2025
hide_title: true
description: >-
    Release notes include the changes, fixes, and additions in specific versions of Semgrep.
toc_max_heading_level: 3
title: December 2025
tags:
  - Release notes
---

<!-- Remember to add previous month's under-the-cut behavior --> 
<!-- Remember to update index page -->
 
# Semgrep release notes for December 2025

The following updates were made to Semgrep in December 2025.

## 🌐 Semgrep AppSec Platform

### Added
- New **Priority** findings tab to surface high-priority findings. Each product has default priority categories, and Semgrep admins can customize the **Priority** tab to control which findings appear.
- New **Provisionally ignored** finding state. Findings marked as unreachable, invalid, or Assistant false positives move out of your default open list while remaining available for review.
- You can now link directly to a specific tab in the Admin panel, making it faster to navigate to settings.



### Changed
- Updated the Findings page with redesigned filters, improved navigation, and more intuitive links. The code path now opens a finding's details page, and an in-product tour introduces the new layout.
- On the **Projects** page, the project name now links directly to details, making it easier to jump to scan details from the project list.


## 💻 Semgrep Code

### Added

### Changed
- Git LFS objects are excluded from baseline scans. Files tracked with Git LFS are no longer scanned during baseline runs, avoiding large or binary files that are not supported by Semgrep.

### Fixed
- Improved handling of partially scanned files in CI. CI scan results now report files that fail to scan due to errors such as timeouts or out-of-memory conditions, preventing findings in those files from being incorrectly marked as fixed.
- Improved timeout handling. Fixed a rare issue where timeouts could be mishandled, which could lead to inconsistent warnings or scan behavior.
- Fixed validation failures for certain valid rules. Rules that include emoji in messages now validate correctly.
- Fixed an interfile scan timeout regression. Restored the previous default job behavior to prevent unexpected timeout changes.


## ⛓️ Semgrep Supply Chain

### Added
- The advisories page now shows related findings across projects and branches, making it easier to understand the impact of a supply chain advisory in your environment.
- Expanded Maven reachability coverage. New High severity reachability rules improve vulnerability detection for Java, Kotlin, and Scala projects.
- Symbol analysis support for Supply Chain–only scans when calling `semgrep ci`.

### Changed
- Filter dependencies by multiple license policy outcomes. The **Dependencies** page license filter now supports multi-select, so you can view dependencies that are Allowed, Blocked, or Commented at the same time. 


### Fixed
- Fixed project filtering on the **Dependencies** page. Filtering by multiple projects now works as expected; the search field clears correctly after you select a project.
- Fixed symbol analysis to analyze only relevant language files per ecosystem during Supply Chain scans.

## 🤖 Semgrep Assistant

### Added
- Cursor post-generation hook support. New MCP flags let Semgrep integrate with Cursor post-code-generation workflows.

### Changed
- Pull request comments for Semgrep rules now include AI-generated explanations to help developers understand findings. The summary replaces the rule message, with more details available when expanded.

### Fixed

## 🔐 Semgrep Secrets

### Added

### Changed

- Semgrep Secrets findings are now assigned **Critical** severity. This applies to Secrets findings in scans performed after November 2025. Any existing findings from those rules will update to Critical after the project's next full scan.

### Fixed

## 📝 Documentation and knowledge base

### Added

## 🔧 OSS Engine

### Changed
- ==Updated Docker base image. Semgrep’s Docker image now uses Alpine Linux 3.23==

* The following versions of the OSS Engine were released in December 2025:
  * 
* The following versions of the OSS Engine were released in November 2025:
  * [<i class="fas fa-external-link fa-xs"></i> 1.145.0](https://github.com/semgrep/semgrep/releases/tag/v1.145.0)
    * [<i class="fas fa-external-link fa-xs"></i> 1.146.0](https://github.com/semgrep/semgrep/releases/tag/v1.146.0)