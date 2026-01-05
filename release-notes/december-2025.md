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
- You can now link directly to a specific tab in the Admin panel, making it faster to navigate to specific settings.



### Changed
- Updated the Findings page with redesigned filters, improved navigation, and more intuitive links. The code path now opens a finding's details page, and an in-product tour introduces the new layout.



## 💻 Semgrep Code

### Added

### Changed
- The project name now links directly to project details, making it easier to jump to scan details from the project list.

### Fixed

## ⛓️ Semgrep Supply Chain

### Added
- The advisories page now shows related findings across projects and branches, making it easier to understand the impact of a supply chain advisory in your environment.
- Expanded Maven reachability coverage. New high severity reachability rules improve vulnerability detection for Java, Kotlin, and Scala projects.

### Changed
- Filter dependencies by multiple license policy outcomes. The **Dependencies** page license filter now supports multi-select, so you can view dependencies that are Allowed, Blocked, or Commented at the same time. 


### Fixed
- Fixed project filtering on the **Dependencies** page. Filtering by multiple projects now works as expected; the search field clears correctly after you select a project.


## 🤖 Semgrep Assistant

### Added

### Changed
- Pull request comments for Semgrep rules now include AI-generated explanations to help developers understand findings. The summary replaces the rule message, with more details available when expanded.

### Fixed

## 🔐 Semgrep Secrets

### Added

### Changed

- Semgrep Secrets findings are now assigned **Critical** severity. This applies to Secrets findings in scans performed after November 10th. Any existing findings from those rules will update to Critical after the project's next full scan.

### Fixed

## 📝 Documentation and knowledge base

### Added

## 🔧 OSS Engine

### Added

* The following versions of the OSS Engine were released in December 2025:
  * [<i class="fas fa-external-link fa-xs"></i> TBD](https://github.com/semgrep/semgrep/releases/tag/vTBD)

