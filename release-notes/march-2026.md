---
slug: march-2026
hide_title: true
description: >-
    Release notes include the changes, fixes, and additions in specific versions of Semgrep.
toc_max_heading_level: 3
title: March 2026
tags:
  - Release notes
---

<!-- Remember to add previous month's under-the-cut behavior --> 
<!-- Remember to update index page -->
 
# Semgrep release notes for March 2026

The following updates were made to Semgrep in March 2026.

## 🌐 Semgrep AppSec Platform

### Added

- AI-powered detection scanning is now available as a public beta feature to all customers. Organizations using Semgrep Multimodal have AI Detection enabled automatically. To enable or disable AI Detection, use the toggle in Settings under Code (SAST).
- Semgrep is now available as a Cursor and Claude Code plugin, providing automatic security scanning for SAST, Supply Chain, and Secrets on every file modified by AI agents.
- Autofix is now in public beta, providing AI-generated fix suggestions and automated pull requests for SAST and Supply Chain findings. 
  - Code Autofix supports all languages on GitHub Cloud.  
  - Supply Chain Autofix supports Python and JavaScript on GitHub Cloud and GitLab Cloud.
- Added API endpoints to link findings to existing Jira tickets or remove existing links programmatically.
- Added file path filtering to findings pages.
- Exception request activity, created, approved, and rejected, now appears in the finding timeline for better audit visibility.


### Changed
- Semgrep Assistant is now Semgrep Multimodal. The terminology has been updated throughout the interface to better reflect its AI-powered capabilities.
  - Code and AI-powered detection findings appear in the Code tab.
  - Use filters to filter findings by AI-powered detection or rule-based detection. 
- Click to Fix has been renamed to Autofix across the product.
- Improved performance of the Projects page by optimizing how finding counts are loaded, resulting in faster load times for large deployments.
- Improved performance of the Findings page by optimizing how code snippets are loaded, ensuring the page loads quickly.
- Contributor counts on the **Billing & Usage** page now reflect the last 90 days of activity instead of 30 days.
- Improved performance of registry search, resulting in faster load times for the **Policies** page and public registry.
- Simplified GitHub onboarding by requiring only a single GitHub App installation instead of two. Existing users can now uninstall the public GitHub App if previously installed.
- GitHub Cloud source code manager connections can now be added without requiring GitHub SSO login, and users can connect multiple GitHub.com organizations.
- Improved clarity in the member invite flow to better explain that invitations do not grant access automatically and users still need authorization through configured login methods.
- Redesigned the Automations form: compact layout, multiselect condition values, and streamlined action configuration.

### Fixed

- Fixed an issue where team onboarding could fail when soft-deleted users were incorrectly included in team membership.
- Fixed an issue where long filter dropdown menus could not be scrolled to view all available options.
- Fixed an issue where the BatchGetRules API endpoint could return rules from all deployments a user belonged to instead of only the requested deployment.
- Fixed an issue where the Invite users action remained enabled for personal GitHub App installations, where organization member invites are not supported.
- ==Added server-side validation to enforce the 3,000 character limit for triage notes across all API endpoints, ensuring consistency with the frontend limit==.
- Fixed an issue where Slack notifications were missing merge request hyperlinks for self-managed GitLab instances with custom domain names.
- Fixed an issue where OpenID Connect SSO login could fail after recent provider updates that require the `iss` parameter.
- Fixed a scrolling issue in the Add condition dropdown in the Automations form.
- ==Fixed a security issue where users with read-only permissions could bypass restrictions by uploading scan results via the CLI==.
- Added validation to limit exception request notes to 1,250 characters to ensure combined approval triage notes remain within display limits.
- Fixed an issue where the "Retry setup" button could incorrectly appear for repositories that already had scans in progress or completed.



## 💻 Semgrep Code

### Added



## ⛓️ Semgrep Supply Chain

### Added

- Lockfileless dependency scanning for Java and Kotlin projects is now in public beta. Maven, Gradle, Artifactory, Nexus Cloud, and on-premises source code managers are supported.

## 🤖 Semgrep Assistant

## 🔐 Semgrep Secrets

## 📝 Documentation and knowledge base

## 🔧 OSS Engine

### Added

- Improved scan performance through compiler-level optimizations, with notable improvements for both diff and full scans.
- Added PowerShell language support (beta), including parsing and pattern matching capabilities.
- Added support for agentic hooks in Windsurf IDE.
- Improved Pro taint tracking through lambda calls, cross-file tracking for globals, and better Scala type and call resolution.

### Changed

- Updated Kotlin tree-sitter parser to the latest grammar.
- Supply Chain analysis of npm package lock files now uses a proprietary parser and is available only to Semgrep Pro users.
- Semgrep secret validation now times out after 30 seconds instead of 15 minutes. This timeout is configurable via the `--secrets-timeout` flag. 

### Fixed

- Fixed path filtering when scanning single files to correctly match project-relative patterns like `/src/test/**/*.java`.
- Fixed `requirements.txt` parser silently dropping pinned dependencies that followed unpinned package names.
- Improved error reporting by surfacing target file discovery errors as warnings instead of silently ignoring them.
- Fixed various parsing issues in Rust, Python, and Kotlin.

* The following versions of the OSS Engine were released in March 2026:
  * [<i class="fas fa-external-link fa-xs"></i>v1.155.0](https://github.com/semgrep/semgrep/releases/tag/v1.155.0)
  * [<i class="fas fa-external-link fa-xs"></i>v1.156.0](https://github.com/semgrep/semgrep/releases/tag/v1.156.0)
  * [<i class="fas fa-external-link fa-xs"></i>v1.157.0](https://github.com/semgrep/semgrep/releases/tag/v1.157.0)
