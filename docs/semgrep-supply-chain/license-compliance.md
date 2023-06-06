---
slug: license-compliance
append_help_link: true
title: License compliance
hide_title: true
description: "Semgrep Supply Chain can detect and list a package's license. Prevent or exempt certain packages from being used based on its license."
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

## Viewing licenses

To view a package's license:

1. [Sign in to Semgrep Cloud Platform](https://semgrep.dev/login).
2. Click **[Supply Chain](https://semgrep.dev/orgs/-/supply-chain)** > **Dependencies**. By default licenses are listed in the row of their respective package.

## Blocking, commenting, or allowing licenses 

This section provides guides on blocking or allowing packages in CI pipelines based on the license of a package.

### Types of license permissions

Licenses in Semgrep are assigned the following types of permissions:

<dl>
<dt>Allow</dt>
<dd>Packages with licenses assigned this type of permission are allowed for use in the codebase.</dd>
<dt>Comment</dt>
<dd>Packages with licenses assigned this type of permission are allowed for use in the codebase. A comment is added to the PR or MR. This permission can be useful when you want to remind or warn developers to use certain licenses for internal use only.</dd>
<dt>Block</dt>
<dd>Packages with licenses assigned this type of permission are **not** allowed into the codebase. A comment is added to the PR or MR.</dd>
</dl>

To change the permissions of packages based on the license:

1. From the Supply Chain page, click **Settings** on the header menu. 
2. Click <i class="fa-solid fa-toggle-large-on"></i> **Notifications and restrictions** if it is not already enabled.
3. Browse the available licenses. 
4. Click the permission (Allow, Comment, or Block) you want to set the license to.
5. Optional: Block entire categories of licenses by clicking on the **Set all to** drop-down box next to the license category.

### License categories

This section describes license categories and licenses identified by Semgrep Supply Chain.

#### Weak copyleft licenses

Software using a package with a weak copyleft license may have to maintain the same license as the package in specific cases. To clarify when this applies, consult your legal department. Developers typically choose these packages based on individual cases, so it's suggested to monitor their usage to ensure license compliance.

* LGPL-3.0
* LGPL-2.1
* MPL-2.0
* EPL-2.0
* OSL-3.0
* EUPL-3.0

#### Copyleft licenses

Software using a package with a copyleft license must maintain the same license as the package. To prevent license complications, developers often avoid packages using these licenses.

* GPL-3.0
* GPL-2.0
* AGPL-3.0
* AGPL-2.0
* CC-BY-SA-4.0
* APSL

#### Permissive licenses

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
* Unlicense

#### Uncategorized licenses

Uncategorized licenses are any licenses not included in the previous categories.

## Exempting packages

You can create exemptions to **Allow** specific packages. This feature is useful for internal packages that are not accessed by users or external APIs.

To exempt a package:

1. From the Supply Chain page, click **Dependencies**.
2. Search for the package you want to exempt.
3. Click the package's <i class="fa-solid fa-list-check"></i> **Allow** or <i class="fa-solid fa-trash-xmark"></i> **Block** icon to exempt it. Upon clicking on the icon, its permission changes. The icon always reflects its current, actual permission.

Exempted packages appear in the Supply Chain > **Settings** tab.

<MoreHelp />
