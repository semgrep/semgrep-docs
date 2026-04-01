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

* The following versions of the OSS Engine were released in March 2026:
  * [<i class="fas fa-external-link fa-xs"></i>VERSION](https://github.com/semgrep/semgrep/releases/tag/VERSION)
