---
slug: license-compliance
append_help_link: true
title: License compliance
hide_title: true
description: "Semgrep Supply Chain can detect and list a package's license. Prevent or exempt certain packages from being used based on their licenses."
tags:
 - Semgrep Supply Chain
 - Semgrep AppSec Platform
---

# License compliance

:::info Prerequisite
At least one repository that scans for dependencies through Semgrep Supply Chain. See [Scan third-party dependencies](/semgrep-supply-chain/getting-started).
:::

Semgrep Supply Chain's **license compliance** feature enables you to explicitly allow or disallow (block) a package's use in your repository based on its license. For example, your company policy may disallow the use of packages with the Creative Commons Attribution-NonCommercial (CC-BY-NC) license.

![Semgrep Supply Chain Dependencies tab with licenses listed](/img/sc-license-configuration.png#md-width)
_**Figure**. Semgrep Supply Chain's License configuration tab with licenses and permissions listed._

## Language support

Licenses are detected based on the **package manager** used. See [Supported languages](/supported-languages/#semgrep-supply-chain) for a list of supported package managers.

## Types of license policies

Licenses in Semgrep can be assigned any of the following policies:

| Policy | Description |
| - | - |
| Allow | Packages with licenses assigned this type of permission are allowed for use in the codebase. |
| Comment | Packages with licenses assigned this type of permission are allowed for use in the codebase. A comment is added to the PR or MR introducing the package into the codebase. This permission can be useful when you want to remind or warn developers to use certain licenses for internal use only. |
| Block | Packages with licenses assigned this type of permission are <strong>not</strong> allowed into the codebase. A comment is added to the PR or MR introducing the package into the codebase. |

By default, all licenses are set to **Allow**. You must configure your policies to block or leave comments on licenses.

## View license policy

To view a package's license policy:

1. [Sign in to Semgrep AppSec Platform](https://semgrep.dev/login).
2. Navigate to **[Supply Chain](https://semgrep.dev/orgs/-/supply-chain)** > **Dependencies**.

## Change the license policy

To change the policies of packages based on the license:

1. Sign in to [Semgrep AppSec Platform](https://semgrep.dev/login), and navigate to **Supply Chain > License configuration.
2. Browse the available licenses within the **License configuration** section.
   ![License configuration section](/img/sc-license-configuration.png#md-width)
   _**Figure**. The Supply Chain > Settings > License configuration section._
1. Click the permission (**Allow**, **Comment**, or **Block**) you want to set the license to.
2. Optional: Block entire categories of licenses by clicking on the **Set all to** drop-down box next to the license category.

## License categories

Semgrep Supply Chain can identify the following licenses and license categories.

### Popular Weak-copyleft licenses

Software using packages with weak copyleft licenses may have to maintain the same license as the package. To determine if this applies to your project, consult your legal department. Developers typically choose these packages based on individual preferences, so usage should be monitored to ensure license compliance.

* LGPL-3.0
* LGPL-2.1
* MPL-2.0
* EPL-2.0
* OSL-3.0
* EUPL-1.2

### Popular Copyleft licenses

Software using packages with copyleft licenses **must** maintain the same license as the packages. To prevent license complications, developers often avoid packages using these licenses.

* GPL-3.0
* GPL-2.0
* AGPL-3.0
* AGPL-2.0
* CC-BY-SA-4.0
* APSL

### Popular Permissive licenses

Packages with permissive licenses have minimal restrictions on how they can be used or modified. This makes permissive licenses popular among developers for their flexibility, ease of use, and lack of legal concerns.

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

### Other licenses

Packages tagged as **Other** are those with licenses that aren't yet categorized by Semgrep Supply Chain or aren't included in the categories of weak-copyleft licenses, copyleft licenses, or permissive licenses. This category includes all other standard Software Package Data Exchange (SPDX) licenses.

The **Other** license category may include packages with copyleft or permissive licenses. Consult your legal department before using packages in this category.

### Multiple license types

Some packages utilize multiple licenses. Semgrep treats packages with multiple licenses as if all licenses apply and behaves according to the strictest policy. For example, if a package allows use under the MIT license or the GPL-3.0 license, and the GPL-3.0 license is set to Block, but the MIT license is set to Allow, a pull request that adds the package is blocked.

You can add an [exemption for the package](#exempt-dependencies) if subsequent review indicates the dependency is safe for use under any of the detected licenses.

## Create exemptions

You can create exemptions to **allow** specific dependencies. This feature is
useful for internal dependencies not accessed by users or external APIs. 
Dependency exemptions are currently version-specific, so each version used must be
exempted individually.

To exempt a package:

1. Sign in to Semgrep AppSec Platform and navigate to **Supply Chain** >
   **Dependencies**.
2. Search for the dependencies you want to exempt.
3. Click the dependency's <i class="fa-solid fa-list-check"></i> icon to exempt
 it. Upon clicking on the icon, its permission changes. Click again on the icon to remove the exemption if necessary.

Exempted dependencies appear in the **Supply Chain** > **Settings** tab.

### Create custom dependency exceptions

Custom dependency exceptions allow you to manually allowlist a dependency to
prevent Semgrep from blocking a pull request or merge request due to licensing
issues.

For example, if `bitwarden/cli@2023.9.0`, which has a GPL-3.0 license, is on the
allowlist, you must add an additional exception when upgrading to
`bitwarden/cli@2023.9.1`. However, the dependency to which you're upgrading
isn't yet listed in **Dependencies**; they appear only **after** you've scanned
your project. Because the dependency isn't listed, you must manually create the
exception. This ensures that the exclusion won't fail when you upgrade to
`bitwarden/cli@2023.9.1` and scan your project again with Semgrep Supply Chain.

To set a custom dependency exception:

1. Sign in to Semgrep AppSec Platform and navigate to **Supply Chain > License configuration**.
2. In **Custom dependency exceptions**, click **Add custom exception**.
3. In the **Add custom dependency exception** window that appears:
   1. Select the **Ecosystem** where this dependency applies.
   2. Provide the **Package name**, for example, `bitwarden/cli`.
   3. Provide the **Version** information for the package. The major, minor, and
 patch version information is required; pre-release and build metadata are
 optional.
   4. Click **Add** to save and add the exception.

![Semgrep AppSec Platform's Add custom exception window](/img/custom-dependency-exception.png#md-width)
