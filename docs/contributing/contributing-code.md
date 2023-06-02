# Contributing code

Semgrep welcomes contributions from anyone. If you have an idea for a feature
or notice a bug please [open an issue](https://github.com/returntocorp/semgrep/issues/new/choose).
Creating an issue first is preferable to moving directly to a pull request so
that we can ensure you're on the right track without any wasted effort. This
is also a great way to contribute to Semgrep even if you're not making changes
yourself.

This README gives an overview of the repository. For further information on building, you will be directed to [semgrep-core contributing](semgrep-core-contributing.md) and/or [semgrep-cli contributing](semgrep-contributing.md) in [Making a Change](#making-a-change). 

## File structure

Semgrep consists of a Python wrapper (`semgrep-cli`) around an OCaml engine (`semgrep-core`) which performs the core parsing/matching work. Within `semgrep-core`, there are two sources of parsers, `pfff` and `tree-sitter-lang` using [tree-sitter](https://github.com/tree-sitter/tree-sitter). Additionally, `semgrep-core` contains a subengine, `spacegrep`, for generic matching.

You may also be interested in `perf`, which contains our code for running repositories against specific rulesets.

There are many other files, but the below diagram broadly displays the file structure.

```
.
├── cli/  (Python wrapper)
│   └── src/
│       └── semgrep/
│ 
├── src/  (semgrep-core)
│   │── analyzing/  (Dataflow analysis)
│   │── core_cli/  (Entrypoint for semgrep-core)
│   └── matching/  (Matching engine)
│
├── languages/  (Language parsers)
│
├── libs/  (Library components)
│   │── ast_generic/  (Generic AST)
│   └── spacegrep/  (Generic matching)
│
└── perf/  (Performance benchmarking)
```

Most of Semgrep's logic is in `cli/src` and `src`.

## Code relationship

The `semgrep-core` binary stands alone. Once built, it is possible to run `semgrep-core` on a semgrep rule for a given language with a file/directory and receive matches. 

For example, say you create the config file `unsafe-exec.yaml` and the program `unsafe-exec.py`:

```yaml
rules:
- id: unsafe-exec
  pattern: exec(...);
  message: Avoid use of exec; it can lead to a remote code execution.
  severity: WARNING
  languages: [python]
```

```python
exec("ls");
```

If you run `semgrep-core -config unsafe-exec.yaml unsafe-exec.py -lang python`, it will output

```
unsafe-exec.py:1 with rule unsafe-exec
 exec("ls");
```

If you run `semgrep --config unsafe-exec.yaml unsafe-exec.py`, it will output

```
running 1 rules...
unsafe-exec.py
severity:warning rule:unsafe-exec: Avoid use of exec; it can lead to a remote code execution.
1:exec("ls");
ran 1 rules on 1 files: 1 findings
```

The matched code is the same, but with `semgrep-cli` the output is more polished and includes the message. 

`semgrep-cli` invokes the `semgrep-core` binary as a subprocess, with a flag to request JSON output. It reads the `semgrep-core` output and transforms it appropriately.

Currently, depending on the flags used, `spacegrep` is invoked both independently by `semgrep-cli` as a subprocess and by `semgrep-core` as a subfolder. Therefore, `semgrep-cli` requires the `spacegrep` binary, but building `semgrep-core` will build `spacegrep` as well.

## Making a change

Semgrep runs on Python versions >= 3.7. If you don't have one of these versions installed, please do so before proceeding.

Because the Python and OCaml development paths are relatively independent, the instructions are divided into Python ([semgrep-cli contributing](semgrep-contributing.md)) and OCaml ([semgrep-core contributing](semgrep-core-contributing.md)).

To fully build Semgrep from source, start at [semgrep-core contributing](semgrep-core-contributing.md). It will direct you to [semgrep-cli contributing](semgrep-contributing.md) when appropriate.

Depending on what change you want to make, it might be simpler to build only `semgrep-cli` or only `semgrep-core`. For example, if you only want to modify Python code, you can skip installing OCaml by downloading binaries for the OCaml parts. Similarly, if you only want to modify OCaml code, you can work on `semgrep-core`/`spacegrep` directly.

If you only want to build `semgrep-cli`, go straight to [semgrep-cli contributing](semgrep-contributing.md). Otherwise, follow the instructions in [semgrep-core contributing](semgrep-core-contributing.md).

Below is a guide for what functionality each of `semgrep-cli` and `semgrep-core` controls.

### Only `semgrep-cli`

The python code for Semgrep performs pre and post-processing work. You likely need to touch only `semgrep-cli` if you want to affect

* How output is formatted
* What files are scanned for each language
* The message that is displayed

Go to [semgrep-cli contributing](semgrep-contributing.md)

### Only `semgrep-core`

The OCaml code for Semgrep performs all the parsing and matching work. You likely need to touch only `semgrep-core` if you want to

* Fix a parse error
* Fix a matching error
* Improve Semgrep's performance

Go to [semgrep-core contributing](semgrep-core-contributing.md)

### Both `semgrep` and `semgrep-core`

There are some features that cross through both OCaml and Python code. You will likely need to touch both `semgrep-cli` and `semgrep-core` if you want to

* Fix an autofix error
* Add a new language
* Change error reporting

Go to [semgrep-core contributing](semgrep-core-contributing.md). It will direct you to [semgrep-cli contributing](semgrep-contributing.md) when appropriate. 

## Development workflow

Before each commit Semgrep will run [`pre-commit`](https://pre-commit.com/) to
ensure files are well-formatted and check for basic linting bugs. If you don't
have `pre-commit` installed the following command will do so for you:

```
python -m pip install pre-commit
```

Our `pre-commit` configuration uses Docker images. Please ensure you have
[Docker installed](https://docs.docker.com/get-docker/) before running
`pre-commit`. Install the `pre-commit` hooks with the following command:

```
pre-commit install
```

To ensure `pre-commit` is working as expected, run the following command:

```
pre-commit run --all
```

Once `pre-commit` is working you may commit code and create pull requests as
you would expect. Pull requests require approval of at least one maintainer and
[CI to be passing](https://github.com/returntocorp/semgrep/actions).

### Explaining code

It's important for code to be easy to maintain. This allows all of us to
spend more time on new features rather than spending it on studying
legacy code. As a general rule of thumb, assume that all context that
is not written down will be lost and forgotten. Useful context includes:

* Why does this code exist?
* What or who uses this code?
* What does this code achieve?
* Could this code be replaced by an off-the-shelf component? Why not?
* Does it implement a formal specification or a well-known pattern? Where can
  we learn more about it?

We ask that **each source file start with one comment** that
concisely answers these questions.

Here's a short example:
```
(*
   Generate unique names with a given prefix.
*)
```

It can be improved by explaining the code's uses:
```
(*
   Generate unique names with a given prefix. This is used to
   name new grammar rules and new OCaml variables.
*)
```

### Adding a changelog entry

#### Quick reference

Add a new file named like `changelog.d/gh-1234.fixed` that contains
a single paragraph of Markdown text such as:
```
Fix emojis absorbed by the fleeb generator
```

File name format:
```
gh-1234.fixed
   ^^^^ ^^^^^
   |    |
   |    one of: "added", "changed", "fixed", "infra"
   GitHub issue or pull request ID
```

Valid changelog file suffixes are:
- `added` - New features or other previously non-existing functionality
- `changed` - Items that have changed the way Semgrep functions
- `fixed` - Bug fixes or other improvements
- `infra` - Workflow improvements or other non-code updates

#### When to add a changelog entry

If you contribute code that affects users, you must add an entry
to the changelog, in the [`changelog.d`
folder](https://github.com/returntocorp/semgrep/tree/develop/changelog.d). At
each Semgrep release, these files are automatically gathered and formatted to
produce [release notes](https://github.com/returntocorp/semgrep/blob/develop/CHANGELOG.md).

A changelog entry is required if you are:
- Adding new features or other previously non-existing functionality.
- Including important changes in the way Semgrep functions.
- Submitting bug fixes or other improvements.
- Creating workflow improvements or other non-code updates.

A tool called [`towncrier`](https://github.com/twisted/towncrier) is
used for changelog management.

### Troubleshooting pre-commit

On M1 macs some `pre-commit` tests may fail.

If those checks are running in docker containers (such as `hadolint`) and exit with code 137, this means they are running into a memory limit.
This is because for running x86_64 images on an M1 mac, docker will utilize an emulation with qemu that can cause higher memory consumption.
To fix this, change the memory limit in Docker Desktop in the Resources section of the Preferences, 8.00GB should be sufficient.

### Working with git submodules

A submodule is a reference to a specific commit in another git
repository. This results in a subfolder containing a checkout of that
repository at that particular commit. Submodules have a reputation of
being tricky to use. To minimize problems, make sure to follow these
guidelines:

* When checking out a new branch or commit, update the submodules
  using the command `git submodule update --init --recursive`.
  Adding a shortcut to your shell can be useful. The following is a
  Bash function that lets you call `gitup`. It goes into your `~/.bashrc`:

```bash
gitup() {
  echo "git submodule update --init --recursive"
  git submodule update --init --recursive
}
```

* When modifying both a parent repo A and one of its submodules B,
  make one pull request for each (PR A, PR B).
  1. Before merging PR B, make sure the branch on repo B is **not
     lagging behind** the main branch. This ensures that the submodule
     includes all the latest changes made by others.
  2. Make sure PR B is merged **before** PR A.
     This ensures that other developers will pick up the changes on B
     when making their own changes.
  3. After merging PR A, check that submodule B is still up-to-date
     with respect to its main branch, especially if PR B was merged
     more than an hour ago.
  Good to know:
  - Merging in B can be done with a merge commit or by squashing the
    commits.
  - If squashing commits in B, you must know that the original commit
    referenced by A becomes orphaned when the branch is deleted but
    remains cached by git for a while. This is usually sufficient to
    not require A to point to the newly-squashed commit. _If this turns
    out to be problematic in practice, we may have to disallow
    commit squashing in the future._
