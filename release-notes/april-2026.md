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

* Added a **Developer Approvals** workflow for exception requests: developers can now propose an ignore exception from a PR comment using `/fp`, `/ar`, or `/other`, and an admin must approve the request before the finding is dismissed. This is gated per-product via deployment configuration. <!-- review: may not be customer-facing — delete if not relevant --> <!-- source: [PR #27405](https://github.com/semgrep/semgrep-app/pull/27405) -->
* Added a **Pending approval** tab to the Code, Secrets, and Supply Chain findings pages, visible when Developer Approvals is enabled, so admins can review all pending exception requests in one place. <!-- source: [PR #27375](https://github.com/semgrep/semgrep-app/pull/27375) -->
* Added the ability to filter findings by exception request state (pending, approved, denied). <!-- review: may not be customer-facing — delete if not relevant --> <!-- source: [PR #27309](https://github.com/semgrep/semgrep-app/pull/27309) -->
* Added a migration callout banner on the Policies page to direct users to the automations migration wizard for upgrading from legacy automations to Smart Policies. <!-- source: [PR #27524](https://github.com/semgrep/semgrep-app/pull/27524) -->
* Added policy simplification suggestions to the automation form: when editing a policy with rule- or ruleset-based conditions, Semgrep now suggests equivalent attribute-based conditions (severity, confidence, product) to simplify the policy. <!-- source: [PR #27487](https://github.com/semgrep/semgrep-app/pull/27487) -->
* Added a **Run against existing findings** button to the remediation policy create and edit form, allowing admins to immediately apply a policy's actions to all currently matching open findings. <!-- source: [PR #28356](https://github.com/semgrep/semgrep-app/pull/28356) -->
* Added an **Open Autofix PR** action type to remediation policies, supporting both scan-triggered and manual runs. <!-- source: [PR #28378](https://github.com/semgrep/semgrep-app/pull/28378) -->
* Added linked actions in automations: adding a **Block PR/MR merge** action now automatically includes a **Comment on PR/MR** action as a dependent. <!-- source: [PR #27424](https://github.com/semgrep/semgrep-app/pull/27424) -->
* Added SCIM support for `dsync.user.created` events: new users are created and provisioned into the default deployment when a directory sync user creation event is received. <!-- source: [PR #27259](https://github.com/semgrep/semgrep-app/pull/27259) -->
* Added SCIM support for `dsync.user.deleted` events: users are de-provisioned from their deployment and organization membership when a directory sync deletion event is received. <!-- source: [PR #27523](https://github.com/semgrep/semgrep-app/pull/27523) -->
* Added SCIM support for `dsync.user.updated` events: user org roles are updated when a directory sync update event is received. <!-- source: [PR #27592](https://github.com/semgrep/semgrep-app/pull/27592) -->
* Added SCIM support for `dsync.group.created` events: teams are created and synced from directory groups. <!-- source: [PR #27765](https://github.com/semgrep/semgrep-app/pull/27765) -->
* Added multi-deployment SCIM support: a single auth provider can now provision users and groups into multiple distinct deployments using a `deployment_id` custom attribute. <!-- source: [PR #27833](https://github.com/semgrep/semgrep-app/pull/27833) -->
* Added an `include_remediation` opt-in field to the `ListIssues` v2 API endpoint, allowing API consumers to retrieve autofix and upgrade guidance availability per issue without making individual `GetIssue` calls. <!-- source: [PR #27502](https://github.com/semgrep/semgrep-app/pull/27502) -->
* Added an audit logs API endpoint (`GET /api/audit/v1/deployments/{deployment_id}/logs`) for deployment admins, supporting cursor pagination and time-range filtering. <!-- review: may not be customer-facing — delete if not relevant --> <!-- source: [PR #27485](https://github.com/semgrep/semgrep-app/pull/27485) -->
* Added a post-login SSO nudge: users who sign in via GitHub or GitLab OAuth when their organization has corporate SSO configured now see an interstitial prompting them to use the corporate SSO path instead. <!-- review: may not be customer-facing — delete if not relevant --> <!-- source: [PR #27402](https://github.com/semgrep/semgrep-app/pull/27402) -->
* Added workflow execution usage to the AI credits dashboard so customers can see workflow runs alongside scans, triages, and fixes. <!-- source: [PR #28123](https://github.com/semgrep/semgrep-app/pull/28123) -->
* Added a minimum floor of 60 AI credits per month for paid customers, ensuring even single-seat deployments receive a meaningful monthly allocation. <!-- source: [PR #28176](https://github.com/semgrep/semgrep-app/pull/28176) -->
* Added a contributor usage Download Report button to **Settings > Usage & Billing**, backed by a 90-day contributor dataset. <!-- source: [PR #28186](https://github.com/semgrep/semgrep-app/pull/28186) -->

### Changed

* Contributor seat limit alerts now use accurate messaging: alerts explain that scans continue as a courtesy when a deployment exceeds its seat limit, replacing the previous inaccurate "scans will be paused" copy. <!-- source: [PR #27894](https://github.com/semgrep/semgrep-app/pull/27894) -->
* Updated community tier pricing display in **Settings > Usage & Billing** to reflect current prices: Semgrep Code and Semgrep Supply Chain at `$30/seat/month`, Semgrep Secrets at `$15/seat/month`. <!-- source: [PR #27739](https://github.com/semgrep/semgrep-app/pull/27739) -->
* Renamed the **Create automation** button on the Policies page to **Create policy** for consistent terminology throughout the UI. <!-- source: [PR #28171](https://github.com/semgrep/semgrep-app/pull/28171) -->
* Selected projects and tags in the automations scope multi-select now appear at the top of the list, making it easier to review and edit existing selections. <!-- source: [PR #27131](https://github.com/semgrep/semgrep-app/pull/27131) -->
* Automation policy condition popovers now truncate long value lists (showing "or X others"), preventing the popover from becoming unusable when conditions reference many rules or rulesets. <!-- source: [PR #27958](https://github.com/semgrep/semgrep-app/pull/27958) -->
* Removed the **Fixed in** option from the time filter dropdown on the findings list page. <!-- source: [PR #27324](https://github.com/semgrep/semgrep-app/pull/27324) -->
* Invalid integration configurations now display a meaningful error in the UI and allow users to edit or delete the affected config, rather than causing the integrations page to crash or fail to load. <!-- review: may not be customer-facing — delete if not relevant --> <!-- source: [PR #27292](https://github.com/semgrep/semgrep-app/pull/27292) -->
* Updated the Azure DevOps webhook creation error message to accurately indicate that **Full Access** is required (the previous message incorrectly referenced `Project:write`). <!-- review: may not be customer-facing — delete if not relevant --> <!-- source: [PR #27453](https://github.com/semgrep/semgrep-app/pull/27453) -->

### Fixed

* Fixed a cross-tenant IDOR vulnerability in the Nango ticketing integration: the `CreateNangoTicketingInstance` endpoint now validates that the supplied `connection_id` belongs to the requesting tenant before allowing any operations. <!-- source: [PR #27291](https://github.com/semgrep/semgrep-app/pull/27291) -->
* Fixed a cross-tenant data leak where the `triage-vars` rule lookup could resolve rules from a different deployment than the one specified in the request URL. <!-- source: [PR #27974](https://github.com/semgrep/semgrep-app/pull/27974) -->
* Fixed a cross-tenant write amplifier on `CreateMemory` where rule validation did not scope the lookup to the deployment in the request. <!-- source: [PR #28009](https://github.com/semgrep/semgrep-app/pull/28009) -->
* Fixed registry configuration edits silently dropping credential changes: updating an existing token, password, or role in a registry config now correctly sends the new credentials. <!-- source: [PR #27803](https://github.com/semgrep/semgrep-app/pull/27803) -->
* Fixed button text truncation in the SCM config card for GitHub private app configurations, where up to three buttons were crammed into a narrow column. <!-- source: [PR #27725](https://github.com/semgrep/semgrep-app/pull/27725) -->
* Fixed the **Settings > Usage** panel incorrectly showing a subset of seats when a deployment had multiple active licenses for the same product (for example, an expiring base license plus an expansion). The panel now shows the correct combined total. <!-- source: [PR #27261](https://github.com/semgrep/semgrep-app/pull/27261) -->
* Fixed N+1 database queries in the bulk triage endpoint and moved the search index sync outside the database transaction, reducing bulk triage latency significantly. <!-- source: [PR #27721](https://github.com/semgrep/semgrep-app/pull/27721) -->
* Fixed the repos filter on the findings and issues APIs to use case-insensitive matching, consistent with the project listing endpoint. <!-- source: [PR #27997](https://github.com/semgrep/semgrep-app/pull/27997) -->
* Fixed the project-and-branch filter button growing unbounded when a long project or branch name was selected, breaking the filter bar layout. The button now truncates with an ellipsis and shows the full name in a tooltip. <!-- source: [PR #27705](https://github.com/semgrep/semgrep-app/pull/27705) -->
* Fixed the **Remove user from organization** button being available to Member users with a Manager team role, allowing them to remove Admin users. The button now correctly requires `rbac_update` permission. <!-- source: [PR #27367](https://github.com/semgrep/semgrep-app/pull/27367) -->
* Fixed read-only role users being able to upload CLI scan results and overwrite findings by setting `SEMGREP_REPO_DISPLAY_NAME`. CLI scan endpoints now enforce scan permissions. <!-- source: [PR #27501](https://github.com/semgrep/semgrep-app/pull/27501) -->
* Fixed a follow-up where the read-only role scan permission check did not work correctly in production due to token roles not accounting for the `readonly` org role type. <!-- source: [PR #27643](https://github.com/semgrep/semgrep-app/pull/27643) -->
* Fixed CSV findings export failing with `IndexError: list index out of range` for some users when a paginated batch returned an empty list. <!-- source: [PR #27585](https://github.com/semgrep/semgrep-app/pull/27585) -->
* Fixed `provisionally_ignored` not working as a `status` filter value in the public findings, bulk triage, and create tickets APIs (previously returned all findings unfiltered). <!-- source: [PR #27834](https://github.com/semgrep/semgrep-app/pull/27834) -->
* Fixed exception request APIs returning 404 instead of 400 when the Developer Approvals feature is not enabled for a deployment. <!-- source: [PR #28115](https://github.com/semgrep/semgrep-app/pull/28115) -->
* Fixed the Jira integration failing to load for deployments that saved their Jira configuration before AI SAST Jira support was added, causing a `TypeError` crash on the integrations page. <!-- source: [PR #27777](https://github.com/semgrep/semgrep-app/pull/27777) -->
* Fixed legacy finding URLs that included both `primary=true` and an explicit `repo_ref` parameter returning no results. <!-- source: [PR #27522](https://github.com/semgrep/semgrep-app/pull/27522) -->
* Fixed blocking automations (v1.1) not enforcing CI blocks: the blocking result was written to the database but never written to S3, so the CLI completion endpoint never received the block list and scans always passed. <!-- source: [PR #27827](https://github.com/semgrep/semgrep-app/pull/27827) -->
* Fixed duplicate automations firing for the same issues within a single scan. <!-- source: [PR #27609](https://github.com/semgrep/semgrep-app/pull/27609) -->

## 💻 Semgrep Code

### Added

* Added Developer Approvals for PR comment triage: when Developer Approvals is enabled, commenting `/fp`, `/ar`, or `/other` on a PR now submits a pending exception request instead of immediately ignoring the finding. Admins are notified via PR comment when they approve or deny the request. <!-- review: may not be customer-facing — delete if not relevant --> <!-- source: [PR #27436](https://github.com/semgrep/semgrep-app/pull/27436) -->
* Added pending exception request information to finding cards in list and group views. <!-- review: may not be customer-facing — delete if not relevant --> <!-- source: [PR #27412](https://github.com/semgrep/semgrep-app/pull/27412) -->
* Added exception request auto-expiration: when an issue's triage state changes externally (admin triage, automation, AI reaction), any pending exception request for that issue is automatically expired. <!-- review: may not be customer-facing — delete if not relevant --> <!-- source: [PR #27496](https://github.com/semgrep/semgrep-app/pull/27496) -->
* Added an ignore reason alert at the top of the finding details page that displays when, why, and by whom a finding was ignored, so users no longer need to scroll to the Activity section to find this context. <!-- source: [PR #27901](https://github.com/semgrep/semgrep-app/pull/27901) -->
* Added a **Pull requests: Write** permission check to the autofix preflight, so customers learn about the missing permission before the fix runs (previously, the fix would complete code generation, push the branch, and only fail at PR creation). <!-- source: [PR #27832](https://github.com/semgrep/semgrep-app/pull/27832) -->
* Added autofix support for chained taint scenarios: new per-deployment feature flags enable passing the full dataflow trace and fix-similar-findings context to the fix model, reducing cases where an autofix PR introduces new findings on taint sources. <!-- source: [PR #27885](https://github.com/semgrep/semgrep-app/pull/27885) -->
* Added AI Detection findings to the public findings API (`GET /api/v1/deployments/{slug}/findings`) with `issue_type=ai_sast`, including `exploit_conditions` and `ai_impact` fields. <!-- review: may not be customer-facing — delete if not relevant --> <!-- source: [PR #27287](https://github.com/semgrep/semgrep-app/pull/27287) -->

### Changed

* Code Autofix is now in **public beta**. <!-- review: may not be customer-facing — delete if not relevant --> <!-- source: [PR #27510](https://github.com/semgrep/semgrep-app/pull/27510) -->
* Autofix is now visible and accessible to Member users, not just admins. Previously, the fix button and click-to-fix filter were hidden for members because they required the `panel_settings` permission. <!-- source: [PR #28148](https://github.com/semgrep/semgrep-app/pull/28148) -->

### Fixed

* Fixed autofix showing a fix UI for SCA findings. Autofix is now guarded to SAST-only issue types. <!-- source: [PR #27446](https://github.com/semgrep/semgrep-app/pull/27446) -->
* Fixed autofix for Azure DevOps repositories: rather than running the full fix workflow and crashing at PR creation, Semgrep now rejects the autofix request upfront with a clear error when the SCM type does not support PR creation. <!-- source: [PR #27444](https://github.com/semgrep/semgrep-app/pull/27444) -->
* Fixed autofix requests for archived repositories failing with a cryptic 404. Semgrep now rejects these requests upfront with a clear error message. <!-- source: [PR #27483](https://github.com/semgrep/semgrep-app/pull/27483) -->
* Fixed autofix private beta flag incorrectly blocking users with a PAT that has `pull_requests: write` permission. GitHub treats that single permission as covering both commenting and PR creation, but the Semgrep model split them — the cached record had `writePullRequest=false` for those users. <!-- source: [PR #27972](https://github.com/semgrep/semgrep-app/pull/27972) -->
* Fixed autofix `IncorrectPermissionsError` surfacing as "Unknown" fix job failures. These errors now correctly map to `FIX_JOB_ERROR_TYPE_NO_WRITE_ACCESS`. <!-- source: [PR #27372](https://github.com/semgrep/semgrep-app/pull/27372) -->
* Fixed the triage button incorrectly defaulting to "ignored" for all aggregate state selections when the multi-issue-state filter flag was enabled. <!-- source: [PR #27583](https://github.com/semgrep/semgrep-app/pull/27583) -->
* Fixed findings list links from the scan details page showing "All states" instead of "Open" when the multi-issue-state filter flag was enabled. <!-- source: [PR #27807](https://github.com/semgrep/semgrep-app/pull/27807) -->
* Fixed the finding details page displaying "Issue type Sast" instead of "Code" in certain areas. <!-- source: [PR #27543](https://github.com/semgrep/semgrep-app/pull/27543) -->
* Fixed the triage submit button remaining disabled when triaging a provisionally ignored finding to an ignored sub-reason without a comment. <!-- source: [PR #27379](https://github.com/semgrep/semgrep-app/pull/27379) -->
* Fixed exception request operations incorrectly accepting already-triaged issues. Guards now check `aggregate_state` instead of `status`, which does not reflect triage decisions. <!-- review: may not be customer-facing — delete if not relevant --> <!-- source: [PR #27476](https://github.com/semgrep/semgrep-app/pull/27476) -->

## ⛓️ Semgrep Supply Chain

### Added

* Added full dependency path relationships to SBOM exports. The `dependencies` section of exported CycloneDX documents now reflects the actual dependency graph, including transitive relationships. Gated behind `sca.dependency_path_public_api.enabled`. <!-- source: [PR #27550](https://github.com/semgrep/semgrep-app/pull/27550) -->
* Added a dedicated advisory detail page at `/advisories/:advisoryId` for each supply chain advisory, replacing the previous drawer. Advisory links throughout the platform now navigate directly to this page. <!-- source: [PR #27685](https://github.com/semgrep/semgrep-app/pull/27685) -->
* Added an `introduced_by` field to the `GetIssue` API for transitive SCA vulnerabilities, identifying the direct dependency that pulled in the vulnerable transitive package. <!-- source: [PR #27363](https://github.com/semgrep/semgrep-app/pull/27363) -->
* Added bulk `introduced_by` data to the `ListIssues` endpoint to support showing transitive dependency origin information on the findings list without per-issue API calls. <!-- source: [PR #27795](https://github.com/semgrep/semgrep-app/pull/27795) -->
* Added LFS network broker support for **Maven** private package registries, enabling Software Composition Analysis against private Maven repositories. Includes proxy configuration, credential handling, CA certificate registration in the Java truststore, and dynamic traffic splitting for deployments with mixed public and private registries. <!-- source: [PR #26871](https://github.com/semgrep/semgrep-app/pull/26871) -->
* Added LFS network broker support for **Gradle** private package registries, with the same proxy and traffic-splitting capabilities as the Maven implementation. <!-- source: [PR #27676](https://github.com/semgrep/semgrep-app/pull/27676) -->

### Fixed

* Fixed the **Dependencies** filter in the findings list ranking fuzzy matches above exact matches. Typing an exact package name such as `ws` now returns the exact match first. <!-- source: [PR #27877](https://github.com/semgrep/semgrep-app/pull/27877) -->
* Fixed advisory ID search failing to find advisories when the input casing differed from the stored format (for example, `CVE-2023-1234` vs `cve-2023-1234`). <!-- source: [PR #28031](https://github.com/semgrep/semgrep-app/pull/28031) -->
* Fixed click-to-fix accepting PR requests for issues that are already fixed, removed, or ignored. The backend now validates issue state before dispatching the fix job. <!-- source: [PR #27672](https://github.com/semgrep/semgrep-app/pull/27672) -->

## 🤖 Semgrep Assistant

### Added

* Added AI Detection findings to CSV export, including all shared columns plus AI-specific fields. Multi-type export (combined SAST + AI Detection view) is also supported. <!-- source: [PR #27286](https://github.com/semgrep/semgrep-app/pull/27286) -->
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
