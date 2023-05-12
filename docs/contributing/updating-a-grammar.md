---
slug: updating-a-grammar
---
How to upgrade the grammar for a language
==

Like for adding a language, most of these instructions happen in `ocaml-tree-sitter`.  

Let's call our language "X".

Summary (ocaml-tree-sitter)
--

In ocaml-tree-sitter:
1. Update submodule tree-sitter-X.
2. From `lang/`, run `./test-lang X`.
3. From `lang/`, ask an Semgrep team developer to run `./release X`.

In semgrep:
1. In the semgrep repo, update submodule semgrep-X.
2. In the semgrep repo, update the OCaml code that maps the CST to the
   generic AST.

In the end, **make sure the generated code used by the main branch of
semgrep can be regenerated** from the main branch of ocaml-tree-sitter:
1. Merge your semgrep branch.
2. Merge your ocaml-tree-sitter branch.


Components
--

Here are the main components:

* the OCaml code generator
  [ocaml-tree-sitter](https://github.com/returntocorp/ocaml-tree-sitter):
  generates OCaml parsing code from tree-sitter grammars extended
  with `...` and such. Publishes code into the git repos of the
  form `semgrep-X`.
* the original tree-sitter grammar `tree-sitter-X` e.g.,
  [tree-sitter-ruby](https://github.com/tree-sitter/tree-sitter-ruby):
  the original tree-sitter grammar for the language.
  This is the git submodule `lang/semgrep-grammars/src/tree-sitter-X`
  in ocaml-tree-sitter. It is installed at the project's root
  in `node_modules` by invoking `npm install`.
* syntax extensions to support semgrep patterns, such as ellipses
  (`...`) and metavariables (`$FOO`).
  This is `lang/semgrep-grammars/src/semgrep-X`. It can be tested from
  that folder with `make && make test`.
* an automatically-modified grammar for language X in `lang/X`.
  It is modified so as to accommodate various requirements of the
  ocaml-tree-sitter code generator. `lang/X/src` and
  `lang/X/ocaml-src` contain the C/C++/OCaml code that will published
  into semgrep-X e.g.
  [semgrep-ruby](https://github.com/returntocorp/semgrep-ruby)
  and used by semgrep.
* [semgrep-X](https://github.com/returntocorp/semgrep-ruby):
  provides generated OCaml/C parsers as a dune project. Is a submodule
  of semgrep.
* [semgrep](https://github.com/returntocorp/semgrep): uses the parsers
  provided by semgrep-X, which produce a CST. The
  program's CST or pattern's CST is further transformed into an AST
  suitable for pattern matching.

Make sure the above is clear in your mind before proceeding further.
If you have questions, the best way is reach out on the [Semgrep
Community Slack channel](https://go.semgrep.dev/slack).

Before upgrading
--

Make sure the `grammar.js` file or equivalent source files
defining the grammar are included in the `fyi.list` file in
`ocaml-tree-sitter/lang/X`.

Why: It is important for tracking and _understanding_ the changes made at the
source.

How: See [How to add support for a new language](adding-a-language.md).

Upgrade the tree-sitter-X submodule
--

Say you want to upgrade (or downgrade) tree-sitter-X from some old
commit to commit `602f12b`. This uses the git submodule way, without
anything weird. The commands might be something like this:

```
git submodule update --init --recursive --depth 1
git checkout -b upgrade-X
cd lang/semgrep-grammars/src/tree-sitter-X
  git fetch origin --unshallow
  git checkout 602f12b
  cd ..
```

Testing
--

First, build and install ocaml-tree-sitter normally, based on the
instructions found in the [main README](https://github.com/returntocorp/ocaml-tree-sitter-semgrep/blob/main/README.md).

```
./configure
make setup
make
make install
```

Then, build support for your language in `lang/`. The following
commands will build and test the language:

```
cd lang
  ./test-lang X
```

:::caution
Check the generated code for the presence of `Blank` nodes. Those
correspond to [missing tokens](https://github.com/tree-sitter/tree-sitter/issues/1151).
:::

Check with:
```
grep Blank lang/X/ocaml-src/lib/CST.ml
```
If anything comes up, you must modify the grammar so as to create
a named rule for the node of the `Blank` kind. Eventually, the generated
`CST.ml` should not have `Blank` nodes anymore but a token type instead.
Where a `Blank` node exists, we won't be able to get a token or its location
at parsing time.

If this works, we're all set. Commit the new commit for the
tree-sitter-X submodule:
```
git status
git commit semgrep-languages/semgrep-X
git push origin upgrade-X
```

Then make a pull request to merge this into ocaml-tree-sitter's
main branch. It's ok to merge at this point, even if the generated code
hasn't been exported (**Publishing** section below) or if you haven't
done the necessary changes in semgrep (**Semgrep integration** below).

We can now consider publishing the code to semgrep-X.

Publishing
--

_Please [ask someone at Semgrep, Inc. to run this step](https://github.com/returntocorp/ocaml-tree-sitter-semgrep/blob/main/doc/release.md)._

From the `lang` folder of ocaml-tree-sitter, we'll perform the
release. This step redoes some of the work that was done earlier and
checks that everything is clean before committing and pushing the
changes to semgrep-X.

```
cd lang
  ./release --dry-run X  # dry-run release
  ...                    # 'git status' will show changes for language X
  ./release X  # commits and pushes to semgrep-X
```

This step is safe. Semgrep at this point is unaffected by those
changes. There is now a new commit at
`https://github.com/returntocorp/semgrep-X` e.g.
https://github.com/returntocorp/semgrep-javascript.
The [`fyi/` folder](https://github.com/returntocorp/semgrep-javascript/tree/main/fyi)
contains original files from which the code was generated.
[`fyi/versions`](https://github.com/returntocorp/semgrep-javascript/blob/main/fyi/versions)
shows the last change for each file, allowing you to check that you
got the correct version of `grammar.js` or some other source file.

Semgrep integration
--

From the semgrep repository, point the submodule for semgrep-X to the
latest commit from the "Publishing" step. Then rebuild semgrep-core,
which will normally fail if the grammar changed. If the source
`grammar.js` was included in the `fyi` folder for `semgrep-X` (as it
should), `git diff HEAD^` should help figure out the changes since the
last version.

Conclusion
--

The main difficulty is to understand how the different git projects
interact and to not make mistakes when dealing with git submodules,
which takes a bit of practice.

See also
--

[How to add support for a new language](adding-a-language.md)
