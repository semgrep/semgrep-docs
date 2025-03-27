---
slug: ignoring-dependencies
append_help_link: true
description: "Prevent unwanted noise when scanning for dependency vulnerabilities by ignoring manifest files, lockfiles, or code files."
tags:
 - Semgrep Supply Chain
title: Ignore manifest files, lockfiles, and dependencies
hide_title: true
---

# Ignore manifest files, lockfiles, and dependencies

You can restrict code files or manifest files or lockfiles from generating Supply Chain findings. To do so, you must [create a `.semgrepignore` file in your repository's root directory](/ignoring-files-folders-code/#define-ignored-files-and-folders-in-semgrep-appsec-platform) and define code files and lock files to ignore. The file paths you provide in your `.semgrepignore` file depend on the option that best suits your organization's needs:

| Goal | Method |
| ---- | ------ |
| Prevent a code file from generating **any reachable findings**. | Include the code file's path in the repository's `.semgrepignore` file. |
| Prevent any findings from being generated using the dependencies in a manifest file or lockfile | Include the file paths of the manifest file or lockfile in the repository's `.semgrepignore` files |


> Unreachable findings are only generated from manifest files or lockfiles, because Semgrep defines unreachable findings as the absence of a match in the code.

## Sample `.semgrepignore` configuration

Given a repository with the following files:

* A file `codefile_with_vuln.js` that generates reachable and unreachable findings due to a vulnerable dependency.
* A `package-lock.json` file that lists the vulnerable dependency.

If you add `codefile_with_vuln.js` to the `.semgrepignore` file, Semgrep ignores any reachable findings generated when scanning `codefile_with_vuln.js`, but can still generate findings from `package-lock.json`:

```
# .semgrepignore
codefile_with_vuln.js
```

If you add `package-lock.json` to the `.semgrepignore` file, Semgrep will not scan dependencies from this lockfile, so no Supply Chain findings will be generated in either `codefile_with_vuln.js` or `package-lock.json`:

```
# .semgrepignore
package-lock.json
````
