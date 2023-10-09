---
slug: september-2023
append_help_link: true
title: September 2023
hide_title: true
description: >-
  Release notes include the changes, fixes, and additions in specific versions of Semgrep.
toc_max_heading_level: 3
tags:
  - Release notes
---

# September 2023 release notes

:::info
* Moving forward, these release notes cover the following products:
    * Semgrep Cloud Platform
    * Semgrep Code
    * Semrep Supply Chain
    * Semgrep Assistant (beta)
    * Semgrep documentation and knowledgebase
* Refer to **Semgrep OSS** release notes in [<i class="fas fa-external-link fa-xs"></i> Semgrep GitHub > Releases](https://github.com/returntocorp/semgrep/releases/) as the source of truth for OSS releases.
:::

## Private beta sign-ups

* **Semgrep Secrets** is a code scanner that detects exposed API keys, passwords, and other credentials. Sign up for the private beta by filling out the [<i class="fas fa-external-link fa-xs"></i> Semgrep Secrets Beta](https://get.semgrep.dev/secrets-beta-request.html) form.
* **Semgrep Supply Chain SBOM (software bill of materials)** enables you to export a list of dependencies in the CycloneDX 1.4 XML/JSON format. Sign up for the private beta by filling out the [<i class="fas fa-external-link fa-xs"></i> SSC SBOM Export](https://get.semgrep.dev/SBOM-Export-private-beta.htm) form.

## 🔧 Semgrep OSS Engine

* The following versions of Semgrep OSS Engine were released in September 2023:
  * [<i class="fas fa-external-link fa-xs"></i> 1.38.0](https://github.com/returntocorp/semgrep/releases/tag/v1.38.0)
  * [<i class="fas fa-external-link fa-xs"></i> 1.39.0](https://github.com/returntocorp/semgrep/releases/tag/v1.39.0)
  * [<i class="fas fa-external-link fa-xs"></i> 1.40.0](https://github.com/returntocorp/semgrep/releases/tag/v1.40.0)
  * [<i class="fas fa-external-link fa-xs"></i> 1.41.0](https://github.com/returntocorp/semgrep/releases/tag/v1.41.0)
  * [<i class="fas fa-external-link fa-xs"></i> 1.42.0](https://github.com/returntocorp/semgrep/releases/tag/v1.42.0)

## 🌐 Semgrep Cloud Platform

### Added

- UX: Added a new **onboarding** flow. This onboarding flow streamlines the following steps to ensure that users are able to quickly add repositories for scanning with Semgrep: <!-- #10473 -->
	- **Deployment creation**. The Semgrep team has made improvements to Semgrep account creation and connecting your source code manager, such as GitHub or GitLab. 
	- **Onboarding checklist.** This helps you troubleshoot and resolve any issues early on in your journey.
	- **Tour of features**. Make the most of your Semgrep experience by learning what features are available to you.
- **GitHub Enterprise:** Triage-by-PR is now enabled for public repositories. For this specific configuration, you may need to contact support@semgrep.com to enable this feature. <!-- #10143 -->
- Logging into Semgrep Cloud Platform through the CLI associates your CLI user ID to your Semgrep Cloud Platform account. See the [<i class="fas fa-external-link fa-xs"></i> Anonymous User ID](https://github.com/returntocorp/semgrep/blob/develop/PRIVACY.md#anonymous-user-id) section for more details.

### Changed

- **SCM configuration:** Improved the **Delete message** when deleting SCMs, so that you are aware of the implications of removing an SCM. Many major Semgrep features rely on a connection with your source code manager, so take care when deleting SCMs.

### Fixed

- **GitLab:** Fixed the GitLab CI sample configuration file to help users onboard GitLab repositories more clearly. In particular, the configuration file now includes the `GITLAB_TOKEN` environment variable, which was previously only in the docs.
- Fixed a timeout issue when syncing large numbers (15,000+) of GitHub repositories in Semgrep Cloud Platform.
- Fixed performance issues when synchronizing Semgrep Cloud Platform Projects with their corresponding GitHub repositories <!-- 10156 -->

## 💻 Semgrep Code

### Changed

- **Findings page:** By default, the findings page now displays findings from **default branches**. You can customize this filter by selecting a value from the **Branch** drop-down menu.

### Fixed

- Various UX/UI bugfixes in the Findings page. 

## ⛓️ Semgrep Supply Chain

### Added

- **Filtering:** Allow users to select more than one branch at a time.

## 🤖 Semgrep Assistant (beta)

### Added

- **GitLab:** Semgrep Assistant now supports GitLab cloud hosted and self-managed repositories.
- **Findings page**: Semgrep Assistant verdicts now appear in the Findings page if Assistant recommends that the finding should be **Ignored**. <!-- #10438 -->
![Sample finding entry with Semgrep Assistant verdict](/img/sept-2023-assistant-findings.png)
- **Finding Details page:** For findings with autofixes, the finding's detail page includes a link to the PR comment with the autofix since the PR comment allows for directly committing the autofix. <!-- #10516 -->

### Fixed

- **GitLab:** Fixed a bug in which comments were not appearing on GitLab.com cloud-hosted repositories.

