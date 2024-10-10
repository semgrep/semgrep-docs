---
slug: ignoring-lockfiles-dependencies
append_help_link: true
description: "Prevent unwanted noise when scanning for dependency vulnerabilities by ignoring lockfiles or code files."
tags:
 - Semgrep Supply Chain
title: Ignore lockfiles and dependencies
hide_title: true
---

# Ignore lockfiles and dependencies

You can restrict code files or lockfiles from generating open source security findings. To do so, you must [create a `.semgrepignore` file in your repository's root directory](/ignoring-files-folders-code/#define-ignored-files-and-folders-in-semgrep-appsec-platform) and define code files and lock files to ignore. The file paths you provide in your `.semgrepignore` file depend on the option that best suits your organization's needs:

| Goal | Method |
| ---- | ------ |
| Prevent a code file from generating **any reachable findings**. | Include the code file's path in the repository's `.semgrepignore` file. |
| Prevent a lockfile from generating **any unreachable findings** but still generate reachable findings from a code file. | Include the lockfile's path in the repository's `semgrepignore` file. |
| Prevent a code file from generating either reachable or unreachable findings. | Include the file paths of the lockfile and code files in the repository's `.semgrepignore` file. |

> Unreachable findings are only generated from lockfiles, because Semgrep defines unreachable findings as the absence of a match in the code.

## Sample `.semgrepignore` configuration

Given a repository with the following files:

* A file `codefile_with_vuln.js` that generates reachable and unreachable findings due to a vulnerable dependency.
* A `package-lock.json` file that lists the vulnerable dependency.

If you add `codefile_with_vuln.js` to the `.semgrepignore` file, Semgrep ignores any reachable findings generated when scanning `codefile_with_vuln.js`:

```
# .semgrepignore
codefile_with_vuln.js
```

If you add `package-lock.json` to the `.semgrepignore` file, Semgrep presents reachable findings generated when scanning `codefile_with_vuln.js`, but ignores unreachable findings.

```
# .semgrepignore
package-lock.json
```

If you add `codefile_with_vuln.js` and `package-lock.json` to the `.semgrepignore` file, Semgrep ignores reachable and unreachable findings generated when scanning `codefile_with_vuln.js`:

```
# .semgrepignore
codefile_with_vuln.js
package-lock.json
````
