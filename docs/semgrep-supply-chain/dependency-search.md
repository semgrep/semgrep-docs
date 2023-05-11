---
slug: dependency-search
append_help_link: true
title: Dependency search 
hide_title: true
description: "Search through all your dependencies in all your onboarded repositories at any time."
tags:
  - Semgrep Supply Chain
  - Team & Enterprise Tier
---

import MoreHelp from "/src/components/MoreHelp"

<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>

# Searching through your dependencies

Semgrep Supply Chain's dependency search feature allows you to query for any dependency in your codebase at any time. This feature detects all transitive and direct dependencies across all of your repositories in Semgrep Cloud Platform (SCP). Dependency search lists all the versions of a dependency as well as the repositories that use the dependency.

For newly discovered vulnerabilities, which may not yet have a formal CVE or Supply Chain rule, you can use dependency search to discover if you use the vulnerable dependency across all your repositories. You can also use dependency search to see all the versions of a dependency, which can be useful for standardization purposes.

:::info Feature maturity
Dependency search is in **beta**. To enable this feature, reach out to [andy@semgrep.com](mailto:andy@semgrep.com).
:::

![Screenshot of default dependency search page](/img/SSC-DepSearch.png)
*Figure 1.* Default dependency search page.

## Using dependency search

:::info Prerequisites
* You can only use dependency search through Semgrep Cloud Platform. [Sign up or sign in to Semgrep Cloud Platform](https://semgrep.dev/login).
* You need at least **one** completed Semgrep Supply Chain scan of all the repositories you want to search through.
:::

To search through your dependencies: 

1. Sign in to [Semgrep Cloud Platform](https://semgrep.dev/login).
2. Click **Supply Chain** > **Dependencies**.
3. Type the name of the dependency you are searching for. 
4. Optional: Apply filters as necessary for your search.

:::tip
Search for ranges of supported versions with the `>` or `<` operators following the @ operator. For example, `body-parser@<1.18.0` finds all versions of `body-parser greater than 1.18.0`.
:::
    
Dependency search provides the following filters:

<dl>
<dt>Transitivity</dt>
<dd>Refers to the relationship of the dependency to your codebase. The relationship can be direct, indirect, or unknown.</dd>
<dt>Ecosystem</dt>
<dd>Refers to the language of the dependency</dd>
</dl>

![Screenshot of dependency search with query](/img/SSC-DepSearch-Query.png)
*Figure 2.* Dependency search page with sample search query.

## Data provided by dependency search

You can view the following information in the Dependencies page:

| Detail | Description |
| ------ | ------ |
| Repository name | The name of the repository and its parent organization. |
| Trunk branch  | The name of the trunk branch, typically main or master. |
| Last full scan | Time of the last full scan performed on the repository. |
| Number of dependencies | The total number of direct, indirect, and unknown dependencies. |
| Lockfile  | The name of the lockfile parsed to generate the list of dependencies. |
| Language | The programming language of the repository. |
| Ecosystem | The package manager used to manage dependencies. |
| Dependencies | The list of dependencies, starting with direct dependencies. |

## Troubleshooting

This section describes possible issues and how to resolve them.

### No dependencies appear in the Dependencies page

To ensure that your dependencies appear, check the following:

* Ensure that Semgrep Supply Chain can parse your lockfile. Refer to [Supported languages](/supported-languages) for a list of supported languages and lockfiles.
* Make sure you've scanned the repository at least once.
* If you are using filters, ensure that your filters and search syntax is correct.

