---
tags:
  - Semgrep CLI
  - Semgrepignore
description: Why am I getting findings in files that should be ignored?
---

# Why am I getting findings in files that should be ignored?

If you don't have already a `.semgrepignore` file, refer to our
[guide on how to exclude files from Semgrep
scans](/docs/ignoring-files-folders-code). Otherwise, if
you already have a `.semgrepignore` file, read on.

Starting with Semgrep CE 1.112.0, the Semgrepignore specification has
changed slightly to better align with Git and Gitignore and to offer
more flexibility.
The new specification is referred to as
[Semgrepignore v2](/docs/semgrepignore-v2-reference).
If you're getting findings in files that should have been
ignored according to your `.semgrepignore` file, check the
following:

1. If you're using Git, check that the `.semgrepignore` file is at the
   root of the Git project or at least is within the project.
   `.semgrepignore` files can be placed in any folder in the project
   and follow the same specification as `.gitignore` files,
   which they extend.
2. If you're not using Git, check that the `.semgrepignore` file
   is in the folder passed on the `semgrep scan` command line.
   For example, if the command is `semgrep scan foo/`, you must move
   the `.semgrepignore` file from the current folder
   to `foo/.semgrepignore`.

To ensure you're using Semgrepignore v2, pass the flag
`--semgrepignore-v2` to `semgrep scan` or to `semgrep
ci`. To use the legacy Semgrepignore v1 implementation, use
`--no-semgrepignore-v2`. These options are for troubleshooting the
migration from v1 to v2. These flags will be removed when v2 becomes
only implementation available.

## Best practices

* When scanning a whole project, run `semgrep` from the project root.
* Place a `.semgrepignore` file at the project root.
* Optionally, place `.semgrepignore` files in subfolders so as to keep the
  exclusion patterns simple and to allow moving these subfolders
  around without having to edit the file exclusion patterns.
* Refer to the [Gitignore
  specification](https://git-scm.com/docs/gitignore)
  for the precise syntax and usage of `.semgrepignore` files.
