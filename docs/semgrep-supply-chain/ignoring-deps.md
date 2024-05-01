---
slug: ignoring-lockfiles-dependencies
append_help_link: true
description: "Prevent unwanted noise when scanning for dependency vulnerabilities by ignoring lockfiles or code files."
tags:
    - Semgrep Supply Chain
    - Team & Enterprise Tier
title: Ignoring lockfiles and dependencies 
hide_title: true
---

import MoreHelp from "/src/components/MoreHelp"

<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>

# Ignoring lockfiles and dependencies 


There are several methods to restrict code files or lock files from generating dependency findings.

Create a `.semgrepignore` file in your repository's root directory and define code files and lock files to ignore. For more information, see [Ignoring files, folders, and code](/ignoring-files-folders-code/#defining-ignored-files-and-folders-in-semgrep-appsec-platform).

Refer to the following table to see which goal best suits your need:



| Goal | Method |
| ---- | ------ |
| Prevent a code file from generating **any reachable findings**. | Include the code file's path in the repository's `.semgrepignore` file. |
| Prevent a lockfile from generating **any unreachable findings** but still generate reachable findings from a code file. | Include a file path in in the repository's `semgrepignore` file. |
| Prevent a code file from generating any reachable or unreachable findings. | Include a file paths of the lockfile and code file in the repository's `.semgrepignore` file. |

:::info
Unreachable findings are only generated from lockfiles. This is because unreachable findings are defined as the absence of a match in the code.
:::

### Examples

Given the following:

* A `codefile_with_vuln.js` that has reachable and unreachable findings due to a vulnerable dependency.
* A `package-lock.json` that lists the vulnerable dependency.

In the following example, adding `codefile_with_vuln.js` to `.semgrepignore` ignores any reachable findings from `codefile_with_vuln.js`.

```
codefile_with_vuln.js
```

In the following example, adding`package-lock.json` to `.semgrepignore` generates reachable findings from `codefile_with_vuln.js`, but ignores unreachable findings.

```
package-lock.json
```

In the following example, adding both `package-lock.json` and `codefile_with_vuln.js` ignores both reachable and unreachable findings.

```
codefile_with_vuln.js
package-lock.json
````
