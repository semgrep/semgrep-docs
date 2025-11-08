---
slug: dependency-search
append_help_link: true
title: View and search for dependencies
hide_title: true
description: "View and search through all your dependencies in all your onboarded repositories at any time."
tags:
  - Semgrep Supply Chain
  - Semgrep AppSec Platform
---

# View and search for dependencies

:::info Prerequisite
At least one project (a repository or subfolder in a monorepo) that scans for dependencies through Semgrep Supply Chain. See [Scan third-party dependencies](/semgrep-supply-chain/getting-started).
:::

Semgrep Supply Chain's dependency search feature allows you to view and query for any dependency in your project at any time. This feature detects all transitive and direct dependencies across all of your projects in Semgrep AppSec Platform. Dependency search lists all the versions of a dependency, as well as the projects that use the dependency.

For newly discovered vulnerabilities, which may not yet have a formal CVE or Supply Chain rule, you can use dependency search to see if you use the vulnerable dependency in any of your repositories. You can also use dependency search to see all the versions of a dependency, which can be useful for standardization purposes.

![Screenshot of default dependency search page](/img/SSC-DepSearch.png)
_**Figure**. Default dependency search page._

## Enable and use dependency search

To search your dependencies:

1. Sign in to [Semgrep AppSec Platform](https://semgrep.dev/login).
2. Go to **Settings > General > Supply Chain**.
  ![Semgrep Supply Chain Settings tab](/img/sc-settings.png#md-width) _**Figure**. The Semgrep Supply Chain Settings tab._
1. Click <i class="fa-solid fa-toggle-large-on"></i> **Dependency search** if it's not already enabled.
2. Navigate to **Supply Chain > Dependencies**.
  ![Semgrep Supply Chain Dependencies tab](/img/SSC-DepSearch.png#md-width) _**Figure**. The Semgrep Supply Chain Dependencies tab._

At this point, Semgrep displays the manifest files or lockfiles that it has used to determine dependency information and the dependencies included in each of the manifest files or lockfiles.

### View additional manifest files or lockfiles

By default, Semgrep only displays dependencies listed in a given project's first **10** manifest files or lockfiles. To load information from additional files:

1. Sign in to [Semgrep AppSec Platform](https://semgrep.dev/login).
2. Navigate to **Supply Chain > Dependencies**, and scroll to the bottom of the page.
3. Click **Fetch more lockfiles**.

## Search for dependencies

To search for dependencies:

1. Sign in to [Semgrep AppSec Platform](https://semgrep.dev/login).
1. Navigate to **Supply Chain > Dependencies**.
1. Using the **Dependency** search bar, type the name of the dependency you are searching for.
1. Optional: Apply filters as necessary for your search.

:::tip
Search for ranges of dependency versions with the `>` or `<` operators following the @ operator. For example, `body-parser@<1.18.0` finds all versions of `body-parser` less than 1.18.0.
:::

## Search filters

Dependency search provides the following filters, which correspond to the data points displayed by Semgrep about each dependency:

| Filter | Description |
| - | - |
| Dependency | The name and version of the dependency. |
| Projects | The projects where the dependency can be found. |
| Transitivity | The relationship of the dependency to your codebase. |
| License Policy | The License Policy you set. Determines whether a dependency can be used based on its license. |
| License | The dependency's license type. |
| Language | The language of the dependency. |

![Screenshot of dependency search with query](/img/SSC-DepSearch-Query.png#md-width)
_**Figure**. Dependency search page with sample search query._

## Dependency paths (beta)

:::info
This feature is currently in invite-only beta. Please contact [Semgrep Support](/support) for more information.
:::

The Dependency paths feature allows you to view dependency paths for all transitive dependencies introduced in a project, up to seven layers of depth. With this information, you can understand:

- How a transitive dependency was introduced
- How deeply the transitive dependency is nested in the dependency tree.

### Supported languages

Semgrep generates dependency paths for most C#, Java, JavaScript, Kotlin, and Python projects.

#### C#

Semgrep generates dependency paths for C# projects using NuGet.

#### Java

Semgrep generates dependency paths for Java projects that include a `maven_dep_tree.txt` file whenever you invoke a scan using `semgrep ci`.

Semgrep can also generate dependency paths for Java projects with lockfiles and Java projects **without lockfiles** if they're built using Maven or Gradle with the help of the Gradle Wrapper. Dependency paths for such projects are available when [scanning without lockfiles](/semgrep-supply-chain/getting-started#scan-a-project-without-lockfiles-beta).

#### JavaScript

Semgrep generates dependency paths for JavaScript projects that use `npm`, `yarn`, or `pnpm` and include a lockfile whenever you invoke a scan using `semgrep ci`.

#### Kotlin

Semgrep generates dependency paths for Kotlin projects built using Maven when a `maven_dep_tree.txt` file is present, and for Maven or Gradle when [scanning without lockfiles](/semgrep-supply-chain/getting-started#scan-a-project-without-lockfiles-beta).

#### Python

Semgrep generates dependency paths for Python projects that use the following package managers:

- `poetry` and `poetry.lock` file
- `pip` with `requirements.txt`
- `uv` (requires Semgrep version `1.127.0` or later)

Semgrep also supports Python projects that use the following package managers:

- `Pipenv`
- `piptools`

when [scanning without lockfiles](/semgrep-supply-chain/getting-started#scan-a-project-without-lockfiles-beta).

### View the dependency path

After you have been added to the Dependency paths beta and a new scan completes on a repository, view the dependency paths in Semgrep AppSec Platform on:

- The **Finding Details** page for a transitive finding
- The **Supply Chain > Dependencies** tab when you view a transitive dependency; click **Transitive** to see the dependency path

![Supply Chain dependency graph](/img/ssc-dependency-graph.png#md-width)
_**Figure**. Supply Chain findings with a dependency graph shown._

## Troubleshooting: no dependencies appear on the Dependencies page

If you don't see any results on the Dependencies page, ensure that:

* Semgrep Supply Chain supports your manifest file or lockfile. Refer to [Supported languages](/supported-languages) for a list of supported languages, manifest files, and lockfiles.
* Your filters and search syntax are correct.
* You've performed a full scan of the repository at least once since enabling dependency search. Only dependencies detected during full scans are shown on the **Dependencies** page.

If you're having trouble seeing dependencies after a scan, see [Why aren't Supply Chain findings showing?](https://semgrep.dev/docs/kb/semgrep-supply-chain/why-no-findings) for additional troubleshooting tips.
