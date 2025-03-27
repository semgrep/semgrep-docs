---
tags:
  - Semgrep CLI
  - Semgrepignore
description: Why am I getting findings in files that should be ignored?
---

# Why am I getting findings in files that should be ignored?

If you don't have already a `.semgrepignore` file, refer to our [guide on how to exclude files from Semgrep scans](/docs/ignoring-files-folders-code). 

If you already have a `.semgrepignore` file and are not seeing the results you expect, you may be seeing the effect of changes in Semgrep 1.112.0 and above. Starting with Semgrep CE 1.112.0, the Semgrepignore specification has changed slightly to better align with Git and Gitignore and to offer more flexibility. The new specification is referred to as [Semgrepignore v2](/docs/semgrepignore-v2-reference). 

## Requirements for Semgrepignore v2

### If you're using Git

Place the the `.semgrepignore` file in root of the Git project (preferred) or in any folder in the project where you want to consistently ignore some files. `.semgrepignore files follow the same specification as `.gitignore` files, which they extend.

### If you're not using Git

Place the `.semgrepignore` file in the folder passed on the `semgrep scan` command line. For example, if the command is `semgrep scan foo/`, and the `.semgrepignore` file is in the current directory, move the `.semgrepignore` file from the current directory to `foo/.semgrepignore`.

## Troubleshooting Semgrepignore v2 issues

To ensure you're using Semgrepignore v2, pass the flag `--semgrepignore-v2` to `semgrep scan` or to `semgrep ci`. To use the legacy Semgrepignore v1 implementation, use `--no-semgrepignore-v2`. These options are for troubleshooting the migration from v1 to v2. These flags will be removed when v2 becomes the only implementation available.

## Best practices

* When scanning a whole project, run `semgrep` from the project root.
* Place a `.semgrepignore` file at the project root.
* Optionally, place `.semgrepignore` files in subfolders so as to keep the
  exclusion patterns simple and to allow moving these subfolders
  around without having to edit the file exclusion patterns.
* Refer to the [Gitignore
  specification](https://git-scm.com/docs/gitignore)
  for the precise syntax and usage of `.semgrepignore` files.
