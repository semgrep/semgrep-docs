---
slug: semgrepignore-v2-reference
append_help_link: true
description: |
  Reference of the semgrepignore file fitering mechanism for Semgrep
hide_title: true
title: Semgrepignore v2 reference
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Semgrepignore v2 reference

This document covers the Semgrepignore **v2** target filtering system that is
currently available with the `--experimental` option of the `semgrep`
command. It differs from the legacy **v1** implementation.
referred to as "v1".

## The target filtering process

A `semgrep scan` command takes one or more scanning roots as
arguments. The default scanning root is the current folder, `.`.
Scanning roots are folders, individual files, or named pipes that should be
expanded into a list of regular files to be analyzed. Symbolic links are
allowed as scanning roots.

Expanding a folder consists of listing its contents recursively with
the following exceptions:

* Symbolic links other than the original scanning roots are ignored.
* In Git projects, Git submodules are ignored.
* Paths excluded via Semgrepignore patterns are ignored. Semgrepignore
  patterns can be of different sources which are detailed in the
  upcoming section.

The list of files obtained by expanding the scanning roots are called
**target files**. To obtain target files, Semgrep follows a
number of fixed rules and some configurable filters.

For each scanning root, Semgrep infers a **project root** (v2 only). The
project root determines the location of applicable `.semgrepignore`
files as well as `.gitignore` files in Git projects. In v1 where is no
notion of a project root, the `.semgrepignore` file is unique and
looked up in the current folder.

Semgrep determines the project root for each scanning root by first
obtaining the real path (physical path) to the scanning root. Then,
Semgrep searches up the file hierarchy for a `.git` folder or
similar used by one of the popular file version control systems
(Git, Mercurial, etc.) indicating a project root.
If no project root is found this way, it
defaults to the scanning root itself if it is a folder or to its containing
folder if it is a regular file.

<!-- TODO: explain project detection.
     Go over options to disable listing files using `git ls-files`
     while possibly still consulting the `.gitignore` files -- when we
     have an option for it. Right now we have only `--no-git-ignore`
     which is confusing and too coarse. I'd like to deprecate it as
     soon as we have finer-grained replacements.
-->

:::caution
As an experimental debugging aid, Semgrep provides the `--x-ls` option
to list the target files. `--x-ls-long` additionally prints excluded
files and a brief justification. Beware that these two options are
likely to be renamed or change their behavior in the
future. Meanwhile, its typical usage is:
```
semgrep --x-ls
```
or
```
semgrep --x-ls --experimental
```
:::

## Sources of Semgrepignore patterns

A Semgrepignore pattern is a glob pattern that is matched by Semgrep
against file paths to determine whether these paths should be allowed or
disallowed as target files.

Supported sources of Semgrepignore patterns are:

* command-line `--exclude` and `--include` filters;
* the `.semgrepignore` file in the current folder (v1 only);
* all the `.semgrepignore` files in the project (v2 only);
* all the `.gitignore` files in the project in Git projects (v2 only);
* default Semgrepignore patterns.

These sources of filters are grouped into precedence levels.
Within a precedence level, a path can be deselected and reselected
any number of times. After applying all the filters within a
precedence level, only the selected paths make it to the next
level. There are two precedence levels:

1. command-line `--exclude` and `--include` filters;
2. default Semgrepignore patterns, `.gitignore` files,
   `.semgrepignore` files.

For example, consider this `.semgrepignore` file:
```
*.c
!hello.c
```
In the absence of `--exclude` or `--include` filters,
`hello.c` will be first deselected by `*.c` and then
reselected by the negated pattern `!hello.c`.

However, if we move the `*.c` exclusion pattern to the command line by
invoking `semgrep --exclude *.c`,
the file `hello.c` is deselected and ignored even if
the `.semgrepignore` file contains `!hello.c`.

In a Git project under Semgrepignore v2, `.gitignore` and
`.semgrepignore` files are consulted in the same order as in the
Gitignore specification. In a folder containing both a `.gitignore`
and a `.semgrepignore` file, the `.gitignore` file is read before the
`.semgrepignore` file.

Default Semgrepignore patterns apply in projects that lack a main
`.semgrepignore` file. In v1, the main `.semgrepignore` file is
expected in the current folder. In v2, it is expected at the project
root. These default patterns are:

```
# Common large paths
node_modules/
build/
dist/
vendor/
.env/
.venv/
.tox/
*.min.js
.npm/
.yarn/

# Common test paths
test/
tests/
testsuite/
*_test.go

# Semgrep rules folder
.semgrep

# Semgrep-action log folder
.semgrep_logs/
```

## Semgrepignore pattern syntax

In Semgrepignore v2, the pattern syntax conforms strictly to the
[Gitignore pattern syntax](https://git-scm.com/docs/gitignore#_pattern_format).
They are glob patterns which support `*` and `**` with their usual
meanings. For example, pattern `**/tmp/*.js` matches paths `tmp/foo.js` and
`src/tmp/bar.js`.
Note that the Gitignore specification contains subtleties associated
with determining whether a pattern is anchored (relative to the folder
containing the pattern) or floating (relative to the folder containing
the pattern or any of its subfolders). For
example, `/a` and `a/b` are anchored patterns but not `a/`. Please
consult the Gitignore documentation for details.

In Semgrepignore v1, the following exceptions to the Gitignore
specification apply:

* unsupported: pattern negation with `!`
* unsupported: character ranges such as `[a-z]`
* extension:
  `:include` followed by an unquoted file path relative to the path of
  folder of the source `.semgrepignore` file (the current folder in v1)
  will insert patterns read from that file. A common use case was
  `:include .gitignore` but it has become unnecessary in v2 where
  `.gitignore` files are consulted automatically.
  Include directives are deprecated in v2.
