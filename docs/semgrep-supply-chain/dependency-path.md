---
slug: dependency-path
append_help_link: true
title: Dependency paths (beta)
hide_title: true
description: "View dependency paths for your transitive dependencies."
tags:
  - Semgrep Supply Chain
  - Semgrep AppSec Platform
---

# Dependency paths (beta)

:::info
This feature is currently in invite-only beta. Please contact [Semgrep Support](/support) for more information.
:::

The %%Dependency|dependency%% paths feature allows you to view dependency paths for all transitive dependencies introduced in a project, up to seven layers of depth. With this information, you can understand:

- How a transitive dependency was introduced
- How deeply the transitive dependency is nested in the dependency tree.

## Supported languages

Semgrep generates dependency paths for most C#, Java, JavaScript, Kotlin, and Python projects.

### C#

Semgrep generates dependency paths for C# projects using NuGet.

### Java

Semgrep generates dependency paths for Java projects that include a `maven_dep_tree.txt` file whenever you invoke a scan using `semgrep ci`.

Semgrep can also generate dependency paths for Java projects with lockfiles and Java projects **without lockfiles** if they're built using Maven or Gradle with the help of the Gradle Wrapper. %%Dependency|dependency%% paths for such projects are available when [scanning without lockfiles](/semgrep-supply-chain/getting-started#scan-a-project-without-lockfiles-beta).

### JavaScript

Semgrep generates dependency paths for JavaScript projects that use `npm`, `yarn`, or `pnpm` and include a lockfile whenever you invoke a scan using `semgrep ci`.

### Kotlin

Semgrep generates dependency paths for Kotlin projects built using Maven when a `maven_dep_tree.txt` file is present, and for Maven or Gradle when [scanning without lockfiles](/semgrep-supply-chain/getting-started#scan-a-project-without-lockfiles-beta).

### Python

Semgrep generates dependency paths for Python projects that use the following package managers:

- `poetry` and `poetry.lock` file
- `uv` (requires Semgrep version `1.127.0` or later)

Semgrep also generates dependency paths for Python projects that use the following package managers:

- `Pipenv`
- `piptools`
- `pip` with `requirements.txt`

when [scanning without lockfiles](/semgrep-supply-chain/getting-started#scan-a-project-without-lockfiles-beta).

## View the dependency path

Once [Semgrep Support](/support) has added you to the %%Dependency|dependency%% paths beta program and a new scan has completed on one of your projects, you can view dependency paths in Semgrep AppSec Platform using one of the following two methods:

- Go to the [**Supply Chain** findings page](https://semgrep.dev/orgs/-/supply-chain), and used the **Transitivity > Transitive** filter to show transitive findings. Click the finding to open its **finding details** page. Click **Dependency path**.
- Go to the **Supply Chain > Dependencies** tab. Filter for **Transitive** dependencies. Click the dependency's **Transitive** link to proceed.
