---
slug: license-compliance
append_help_link: true
title: License compliance
hide_title: true
description: "Semgrep Supply Chain can detect and list a package's license. Prevent or exempt certain packages from being used based on their licenses."
tags:
  - Team & Enterprise tier
  - Semgrep Supply Chain
---

# License compliance

Semgrep Supply Chain's **license compliance** feature enables you to explicitly allow or disallow (block) a package's use in your repository based on its license. For example, your company policy may disallow the use of packages with the Creative Commons Attribution-NonCommercial (CC-BY-NC) license.

![Screenshot of Semgrep Supply Chain Dependencies tab with licenses listed](/img/sc-license-scanning.png)
*Figure 1*. Screenshot of Semgrep Supply Chain Dependencies tab with licenses listed.

:::info Prerequisites
* License scanning can accessed through Semgrep Cloud Platform (SCP). [Create an account](/semgrep-code/getting-started/#signing-in-to-semgrep-cloud-platform) to view and manage license workflows.
* To detect licenses, you must:
    * [Add or onboard a project](/semgrep-code/getting-started/#option-b-adding-a-repository-from-github-gitlab-or-bitbucket) (repository) to Semgrep Cloud Platform for scanning.
    * [Enable dependency search](/semgrep-supply-chain/dependency-search/#using-dependency-search).
:::

:::caution Feature maturity and support
* License compliance is currently in **Beta**.
* In general, licenses are detected based on the **package manager**. Refer to [Supported languages](/supported-languages/#semgrep-supply-chain) to see supported package managers.
* The creation of pull request (PR) comments through the Comment policy is only available for GitHub Free and Pro plans.
:::

## Viewing licenses

To view a package's license:

1. [Sign in to Semgrep Cloud Platform](https://semgrep.dev/login).
2. Click **[Supply Chain](https://semgrep.dev/orgs/-/supply-chain)** > **Dependencies**. Detected licenses are listed in the row for a given package.

## Blocking, commenting, or allowing licenses

This section provides guides on blocking or allowing packages in CI pipelines based on the license of a package.

### Types of license policies

Licenses in Semgrep are assigned the following policies:

<dl>
<dt>Allow</dt>
<dd>Packages with licenses assigned this type of permission are allowed for use in the codebase.</dd>
<dt>Comment</dt>
<dd>Packages with licenses assigned this type of permission are allowed for use in the codebase. A comment is added to the PR or MR that introduces the package into the codebase. This permission can be useful when you want to remind or warn developers to use certain licenses for internal use only.</dd>
<dt>Block</dt>
<dd>Packages with licenses assigned this type of permission are <strong>not</strong> allowed into the codebase. A comment is added to the PR or MR that introduces the package into the codebase.</dd>
</dl>

:::tip
By default, all licenses are set to **Allow**. You must configure your policies to block or leave comments on licenses.
:::

To change the policies of packages based on the license:

1. From the Supply Chain page, click **Settings** on the header menu.
2. Browse the available licenses within the **License configuration** section.
![Screenshot of license configuration section](/img/sc-license-configuration.png#bordered)
*Figure 3.* Screenshot of Supply Chain > Settings > License configuration section.
3. Click the permission (Allow, Comment, or Block) you want to set the license to.
4. Optional: Block entire categories of licenses by clicking on the **Set all to** drop-down box next to the license category.

### License categories

This section describes license categories and licenses identified by Semgrep Supply Chain.

#### Popular weak-copyleft licenses

Software using a package with a weak copyleft license may have to maintain the same license as the package in specific cases. To clarify when this applies, consult your legal department. Developers typically choose these packages based on individual cases, so it's suggested to monitor their usage to ensure license compliance.

* LGPL-3.0
* LGPL-2.1
* MPL-2.0
* EPL-2.0
* OSL-3.0
* EUPL-1.2

#### Popular copyleft licenses

Software using a package with a copyleft license must maintain the same license as the package. To prevent license complications, developers often avoid packages using these licenses.

* GPL-3.0
* GPL-2.0
* AGPL-3.0
* AGPL-2.0
* CC-BY-SA-4.0
* APSL

#### Popular permissive licenses

Software using a package with a permissive license have minimal restrictions on how the software can be used or modified. This makes permissive licenses popular among developers for their flexibility and ease of use without legal concerns.

* MIT
* Apache-2.0
* BSD-3
* BSD-2
* BSD-3-Clause
* BSD-2-Clause
* CC_BY-4.0
* WTFPL
* MS-PL
* Unlicensed

#### Other licenses

**Other** licenses include licenses that are not yet categorized by Semgrep Supply Chain, or are not  included in the previous categories. These licenses include all other standard Software Package Data Exchange (SPDX) licenses.

:::caution
The **Other** license category may include copyleft or permissive licenses. Consult your legal department before using licenses in this category.
:::

#### Multiple licenses

Some packages allow multiple licenses. Semgrep treats packages with multiple licenses as if all licenses apply, and behaves according to the strictest policy. For example, if a package allows use under either an MIT license or a GPL-3.0 license, and the GPL-3.0 license is set to Block, but the MIT license is set to Allow, a PR that adds the package is blocked.

Add an [exemption for the package](#exempting-packages) if subsequent review indicates the dependency is safe for use under one of the detected licenses.

## Exempting packages

You can create exemptions to **Allow** specific packages. This feature is useful for internal packages that are not accessed by users or external APIs.

To exempt a package:

1. From the Supply Chain page, click **Dependencies**.
2. Search for the package you want to exempt.
3. Click the package's <i class="fa-solid fa-list-check"></i> icon to exempt it. Upon clicking on the icon, its permission changes.

Exempted packages appear in the Supply Chain > **Settings** tab.

Package exemptions are currently version-specific. Each version used must be exempted individually.

<MoreHelp />
