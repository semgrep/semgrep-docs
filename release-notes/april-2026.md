---
slug: /release-notes/april-2026
append_build_info: false
description: >-
  Release notes include the changes, fixes, and additions in Semgrep and its components.
title: April 2026
hide_title: true
displayed_sidebar: releasenotesSidebar
tags:
 - Release notes
---

# April 2026

The following updates were made to Semgrep in April 2026.

## 🌐 Semgrep AppSec Platform

### Added

* Users who sign in using GitHub or GitLab when their organization has corporate SSO configured now see an message prompting them to log in with their corporate SSO credentials instead. <!-- source: [PR #27402](https://github.com/semgrep/semgrep-app/pull/27402) -->
* Added workflow execution usage information to the [AI credits dashboard](https://semgrep.dev/orgs/-/settings/usage) so users can see workflow runs alongside scans, triages, and fixes. <!-- source: [PR #28123](https://github.com/semgrep/semgrep-app/pull/28123) -->
* Added the ability to download contributor usage information from **Settings > Usage & Billing**. <!-- source: [PR #28186](https://github.com/semgrep/semgrep-app/pull/28186) -->
* Added AI-powered detection findings to the findings API endpoint (`GET /api/v1/deployments/{slug}/findings`).

### Changed

* Contributor seat limit alerts now explain that scans continue as a courtesy when an organization exceeds its seat limit, replacing the previous inaccurate "scans will be paused" text. <!-- source: [PR #27894](https://github.com/semgrep/semgrep-app/pull/27894) -->
* Removed the **Fixed in** time filter option from all **Findings** pages. <!-- source: [PR #27324](https://github.com/semgrep/semgrep-app/pull/27324) -->

### Fixed

* Fixed an issue where invalid configurations caused the **Integrations** page to not load. Semgrep now displays a meaningful error and allows you to edit or delete the configuration. <!-- source: [PR #27292](https://github.com/semgrep/semgrep-app/pull/27292) -->
* Fixed an issue where Semgrep did not save changes when Gradle or Maven registry integration credentials were updated. <!-- source: [PR #27803](https://github.com/semgrep/semgrep-app/pull/27803) -->
* Fixed an issue where the **Settings > Usage** panel incorrectly showed a subset of seats when a deployment had multiple active licenses for the same product instead of the correct combined total. <!-- source: [PR #27261](https://github.com/semgrep/semgrep-app/pull/27261) -->
* Fixed an issue where the **Remove user from organization** button was available to **Managers**, allowing them to remove Admin users. <!-- source: [PR #27367](https://github.com/semgrep/semgrep-app/pull/27367) -->
* Fixed an issue where read-only users could upload CLI scan results and overwrite findings by setting `SEMGREP_REPO_DISPLAY_NAME`. CLI scan endpoints now enforce scan permissions. <!-- source: [PR #27501](https://github.com/semgrep/semgrep-app/pull/27501) -->
* Fixed an issue where CSV findings exports failed with `IndexError: list index out of range` for some users when a paginated batch returned an empty list. <!-- source: [PR #27585](https://github.com/semgrep/semgrep-app/pull/27585) -->
* Fixed the `repos` filter on the findings and issues API endpoints to use case-insensitive matching. <!-- source: [PR #27997](https://github.com/semgrep/semgrep-app/pull/27997) -->
* Fixed an issue where the **provisionally ignored** filter for the public findings API endpoints returned all findings. <!-- source: [PR #27834](https://github.com/semgrep/semgrep-app/pull/27834) -->
* Fixed an issue where the Jira integration failed to load for deployments that saved their Jira configuration before support for AI-detection findings support was added. <!-- source: [PR #27777](https://github.com/semgrep/semgrep-app/pull/27777) -->
* Minor UI fixes.

## 💻 Semgrep Code

### Added

* The finding details page now displays information on why a finding was ignored at the top of the page. Users no longer need to go to the **Activity** section to see this information. <!-- source: [PR #27901](https://github.com/semgrep/semgrep-app/pull/27901) -->

### Fixed

* Fixed an issue where Autofix wasn't able to create a GitHub pull request due to the Semgrep GitHub app requesting insufficient permissions. <!-- source: [PR #27832](https://github.com/semgrep/semgrep-app/pull/27832) -->
* Fixed an issue where Autofix features were unavailable to organization **members**, as well as **admins**. <!-- source: [PR #28148](https://github.com/semgrep/semgrep-app/pull/28148) -->
* Fixed an issue where Autofix displayed a suggested fix for Supply Chain findings. Autofix is only applicable to Code findings. <!-- source: [PR #27446](https://github.com/semgrep/semgrep-app/pull/27446) -->
* Fixed an issue where Autofix errored out when attempting to open pull requests for Azure DevOps repositories. Semgrep now rejects these requests since Azure DevOps isn't supported. <!-- source: [PR #27444](https://github.com/semgrep/semgrep-app/pull/27444) -->
* Fixed an issue where Autofix errored out when handling requests involving archived repositories. Semgrep now rejects these requests and displays an error message accordingly. <!-- source: [PR #27483](https://github.com/semgrep/semgrep-app/pull/27483) -->
* Fixed an issue where some GitHub Enterprise users stopped seeing Autofix pull requests. <!-- source: [PR #27972](https://github.com/semgrep/semgrep-app/pull/27972) -->
* Fixed an issue where provisionally ignored findings couldn't be triaged without a comment provided. <!-- source: [PR #27379](https://github.com/semgrep/semgrep-app/pull/27379) -->

## ⛓️ Semgrep Supply Chain

### Added

* Added full dependency path relationships to SBOM exports. The `dependencies` section of exported CycloneDX documents now reflects the actual dependency graph, including transitive relationships. Gated behind `sca.dependency_path_public_api.enabled`. <!-- source: [PR #27550](https://github.com/semgrep/semgrep-app/pull/27550) -->
* Added a dedicated advisory detail page at `/advisories/:advisoryId` for each supply chain advisory, replacing the previous drawer. Advisory links throughout the platform now navigate directly to this page. <!-- source: [PR #27685](https://github.com/semgrep/semgrep-app/pull/27685) -->
* Added an `introduced_by` field to the `GetIssue` API for transitive SCA vulnerabilities, identifying the direct dependency that pulled in the vulnerable transitive package. <!-- source: [PR #27363](https://github.com/semgrep/semgrep-app/pull/27363) -->
* Added bulk `introduced_by` data to the `ListIssues` endpoint to support showing transitive dependency origin information on the findings list without per-issue API calls. <!-- source: [PR #27795](https://github.com/semgrep/semgrep-app/pull/27795) -->
* Added LFS network broker support for **Maven** private package registries, enabling Software Composition Analysis against private Maven repositories. Includes proxy configuration, credential handling, CA certificate registration in the Java truststore, and dynamic traffic splitting for deployments with mixed public and private registries. <!-- source: [PR #26871](https://github.com/semgrep/semgrep-app/pull/26871) -->
* Added LFS network broker support for **Gradle** private package registries, with the same proxy and traffic-splitting capabilities as the Maven implementation. <!-- source: [PR #27676](https://github.com/semgrep/semgrep-app/pull/27676) -->

### Fixed

* Fixed an issue with legacy Supply Chain findings URLs that resulted in the findings page showing zero results. <!-- source: [PR #27522](https://github.com/semgrep/semgrep-app/pull/27522) -->


* Fixed the **Dependencies** filter in the findings list ranking fuzzy matches above exact matches. Typing an exact package name such as `ws` now returns the exact match first. <!-- source: [PR #27877](https://github.com/semgrep/semgrep-app/pull/27877) -->
* Fixed advisory ID search failing to find advisories when the input casing differed from the stored format (for example, `CVE-2023-1234` vs `cve-2023-1234`). <!-- source: [PR #28031](https://github.com/semgrep/semgrep-app/pull/28031) -->
* Fixed click-to-fix accepting PR requests for issues that are already fixed, removed, or ignored. The backend now validates issue state before dispatching the fix job. <!-- source: [PR #27672](https://github.com/semgrep/semgrep-app/pull/27672) -->

## 🤖 Semgrep Assistant

### Added

* Added AI-powered detection findings to CSV export, including all shared columns plus AI-specific fields. Multi-type export (combined SAST + AI Detection view) is also supported. <!-- source: [PR #27286](https://github.com/semgrep/semgrep-app/pull/27286) -->
* Added Jira ticketing support for AI Detection findings, treating them as a first-class product type alongside SAST, Supply Chain, and Secrets findings. <!-- source: [PR #27471](https://github.com/semgrep/semgrep-app/pull/27471) -->
* Added findings count and a link to view findings in the AI Detection scan progress timeline when a scan completes. <!-- source: [PR #27392](https://github.com/semgrep/semgrep-app/pull/27392) -->
* Added IAM role-assumption authentication mode for AWS Bedrock BYOK. In addition to static access keys, customers can now configure an IAM role ARN and grant Semgrep cross-account access via the generated External ID. <!-- source: [PR #28110](https://github.com/semgrep/semgrep-app/pull/28110) -->
* Added multi-select issue state filter to the AI Detection combined view (behind feature flag `ui.findings.multiple-issue-states-filter`). <!-- source: [PR #27443](https://github.com/semgrep/semgrep-app/pull/27443) -->
* Added `introduced_by` retry targets for `dsync.user.created` events to handle the case where a user is restored with a different role than originally provisioned. <!-- source: [PR #27575](https://github.com/semgrep/semgrep-app/pull/27575) -->

### Changed

* LLM-based deduplication for AI Detection scans is now enabled for all deployments. The feature was validated at ~$0.0016 per scan with deduplication engaged on 13% of scans, removing at least one duplicate in 82% of those cases. <!-- source: [PR #27634](https://github.com/semgrep/semgrep-app/pull/27634) -->
* Severity+confidence conditional filtering for autotriage is now enabled for all deployments. High and Critical severity findings with High or Medium confidence in PR scans are now included in autotriage analysis. <!-- source: [PR #27633](https://github.com/semgrep/semgrep-app/pull/27633) -->
* Removed "Assistant" branding from the AI provider settings modal. Text now refers to AI providers generically rather than scoping them to Assistant specifically. <!-- source: [PR #27666](https://github.com/semgrep/semgrep-app/pull/27666) -->
* Refined the memory creation system prompt to produce specific, named memories (for example, "ConfigService is an internal backend service") instead of generic conditional rules. <!-- source: [PR #27899](https://github.com/semgrep/semgrep-app/pull/27899) -->

### Fixed

* Fixed the xAI connection test failing with `Model not found: grok-2-latest`. The connection test now uses `grok-4-latest`. <!-- source: [PR #27505](https://github.com/semgrep/semgrep-app/pull/27505) -->
* Fixed the AI Detection scan wait time estimate being grossly inflated (for example, 495 minutes instead of 3 minutes). The estimate now uses the actual age of the oldest unscheduled task rather than a static throughput calculation. <!-- source: [PR #27785](https://github.com/semgrep/semgrep-app/pull/27785) -->
* Fixed autofix PR descriptions showing a numeric OAuth provider ID (for example, `@223361990`) instead of the user's actual GitHub username. <!-- source: [PR #27156](https://github.com/semgrep/semgrep-app/pull/27156) -->
* Fixed a race condition in autotriage where an issue deleted between task enqueue and Celery execution caused an unhandled exception, triggering Celery retries and error spikes (~11,750 errors in 4 hours in one incident). <!-- source: [PR #27825](https://github.com/semgrep/semgrep-app/pull/27825) -->
* Fixed PR comment URL construction for tag-scoped and deployment-wide memories, which previously logged a warning and skipped posting the PR comment. <!-- source: [PR #27891](https://github.com/semgrep/semgrep-app/pull/27891) -->
* Fixed stale SQLAlchemy objects causing `ObjectDeletedError` when activating or deactivating memories. <!-- source: [PR #27512](https://github.com/semgrep/semgrep-app/pull/27512) -->
* Fixed GitHub App permission checks using app manifest permissions (what the app declares) instead of installation-level permissions (what was actually granted), causing the autofix button to be incorrectly hidden or shown. <!-- review: may not be customer-facing — delete if not relevant --> <!-- source: [PR #27513](https://github.com/semgrep/semgrep-app/pull/27513) -->
* Fixed AI triage `compute_triage_with_autofix` not handling the case where an issue is deleted between enqueue and execution. <!-- source: [PR #27825](https://github.com/semgrep/semgrep-app/pull/27825) -->

## 🔐 Semgrep Secrets

### Changed

* Added a validator filter to the Secrets Detection rules page, allowing users to filter rules by whether they include a validator. <!-- source: [PR #27976](https://github.com/semgrep/semgrep-app/pull/27976) -->

### Fixed

* Removed the **Community** option from the Source filter on the Secrets Detection page. Community rules do not apply to Secrets; the option remains on the Code Detections page. <!-- source: [PR #27977](https://github.com/semgrep/semgrep-app/pull/27977) -->
