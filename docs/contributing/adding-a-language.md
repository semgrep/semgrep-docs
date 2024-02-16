---
slug: adding-a-language
---
How to add support for a new language
==

This is about adding support for a new programming language in
semgrep using the
[tree-sitter](https://tree-sitter.github.io/tree-sitter/)
technology. While new languages should use tree-sitter,
semgrep also supports some languages independently if there's a good
legacy OCaml parser for them. Check for your language in
[pfff](https://github.com/semgrep/pfff) and if you see it
in there, [talk to us](/support/).
Otherwise, let's get started.

Repositories involved directly:
* [semgrep](https://github.com/semgrep/semgrep): the semgrep command line program;
* [ocaml-tree-sitter-semgrep](https://github.com/semgrep/ocaml-tree-sitter-semgrep): language-specific setup, generates C/OCaml parsers for semgrep;
* new repo semgrep-_X_ for the new language _X_: C/OCaml parser generated from ocaml-tree-sitter-semgrep by an admin.

Submodules overview (semgrep repo)
--

There are quite a few GitHub repositories involved in porting a language.
Here is the file hierarchy of the [semgrep
repository](https://github.com/semgrep/semgrep):

```sh
/semgrep-core/src
├── ocaml-tree-sitter-core  # runtime library for tree-sitter parsers
├── pfff                    # non-tree-sitter parsers
└── tree-sitter-lang        # generated tree-sitter parsers
    ├── semgrep-java
    ...
    └── semgrep-ruby
```

When done with the work in [ocaml-tree-sitter-semgrep](https://github.com/semgrep/ocaml-tree-sitter-semgrep), you'll need a new repo semgrep-X to host the generated parser code.
Ask someone from the Semgrep team to create one for you. For this, they should use
the template
[semgrep-lang-template](https://github.com/semgrep/semgrep-lang-template)
when creating the repo.

The instructions for adding a language start in [ocaml-tree-sitter-semgrep](https://github.com/semgrep/ocaml-tree-sitter-semgrep) (as indicated below). Be careful that you are always in the correct repo!

Setup (ocaml-tree-sitter-semgrep repo)
--

As a model, you can use the existing setup for `ruby` or `javascript`. Our
most complicated setup is for `typescript` and `tsx`.

### Expedited setup

If you're lucky, the language you want to add can be added with the
script `add-simple-lang`:

```
cd lang
./add-simple-lang --help
```
follow the instructions from --help

This often works with languages that define a single dialect using a
`grammar.js` file at the root of the project. If this simplified
approach fails, use the **Manual setup** instructions below to understand
what's going on or to set things up manually.

### Manual setup

From the ocaml-tree-sitter repo, do the following:

1. Create a `lang/X` folder.
2. Make a `test/ok` directory. Inside the directory,
   create a simple `hello-world` program for the language you are porting.
   Name the program `hello-world.<ext>`.
3. Now make a file called `extensions.txt` and input all the language extensions
   (.rb, .kt, etc) for your language in the file.
4. Create a file called `fyi.list` with all the information files, such as
    `semgrep-grammars/src/tree-sitter-X/LICENSE`,
    `semgrep-grammars/src/tree-sitter-X/grammar.js`,
    `semgrep-grammars/src/semgrep-X/grammar.js`, etc.
   to bundle with the final OCaml/C project.
5. Link the Makefile.common to a Makefile in the directory with:
   `ln -s ../Makefile.common Makefile`
6. Create a test corpus. You can do this by:
   * Running `most-starred-for-language` in order to gather projects
     on which to run parsing stats. Run with the following command:
     `./scripts/most-starred-for-language <lang> <github_username> <api_key>`
   * Using github advanced search to find the most starred or most forked repositories.
7. Copy the generated `projects.txt` file into the `lang/X` directory.
8. Add in extra projects and extra input sets as you see necessary.

Here's the file hierarchy for Ruby:

```shell
lang/ruby               # language name of the form [a-z][a-z0-9]*
├── extensions.txt      # standard name. Required for stats.
├── fyi.list            # list of informational files to copy. Recommended.
├── Makefile -> ../Makefile.common
├── projects.txt        # standard name. Required for stats.
└── test                # sample input files
    ├── ok              # contains input files supported by the current grammar
    │   ├── comment.rb
    │   ├── ex1.rb
    │   ├── ex2.rb
    │   ├── hello.rb
    │   └── poly.rb
    └── xfail            # contains input files that are expected to fail
        └── rating.rb
```

To test a language in ocaml-tree-sitter, you must build the
ocaml-tree-sitter OCaml code generator, run it to produce a parser,
then run some tests for the parser. Full instructions for this
are given in [updating-a-grammar](updating-a-grammar.md) under
"Testing". The short instructions are:
1. For the first time, build everything with `./scripts/rebuild-everything`.
2. Subsequently, work from the `lang/X` folder and run
   `make` and `make test`.

### The `fyi.list` file

The `fyi.list` file was created to specify informational files that
should accompany the generated files. These files are typically:

* the source grammar, most often a single `grammar.js` file.
* the licensing conditions usually specified in a `LICENSE` file.

Example:

```
# Comments are allowed on their own line.
# Blank lines are ok.

# Each path is relative to ocaml-tree-sitter/lang
semgrep-grammars/src/tree-sitter-ruby/LICENSE
semgrep-grammars/src/tree-sitter-ruby/grammar.js
semgrep-grammars/src/semgrep-ruby/grammar.js
```

The files listed in `fyi.list` end up in a `fyi` folder in
tree-sitter-lang. For example,
[see `ruby/fyi`](https://github.com/semgrep/semgrep-ruby/tree/main).

Extending the original grammar with semgrep syntax
--

This is best done after everything else is set up. Some constructs
such as semgrep metavariables (`$FOO`) may already be valid constructs
in the language, in which case there's nothing to do. Some support for
the semgrep ellipsis `...` usually needs to be added as well.

You'll need to learn [how to create tree-sitter
grammars](https://tree-sitter.github.io/tree-sitter/creating-parsers).

1. Work from `semgrep-grammars/src/semgrep-X` and use `make` and
   `make test` to build and test.
2. Add new test cases to `test/corpus/semgrep.text`.
3. Edit `grammar.js`.
4. Refer to the original grammar in
   `semgrep-grammars/src/tree-sitter-X` to determine which rules to
   extend.

For an example of how to extend a language, you can:
* Look at what was done for the semgrep extensions of other languages
  in their respective `semgrep-*` folders.
* Look at how tree-sitter-typescript extends the javascript grammar.
  This is the file [`common/define-grammar.js` in the
  tree-sitter-typescript repo](https://github.com/tree-sitter/tree-sitter-typescript/blob/master/common/define-grammar.js).

Avoiding parsing conflicts is the trickiest part. Asking for help is
encouraged.

💡 A note on the JavaScript syntax that's heavily used to define and extend
grammars:

When possible, we prefer the shorthand notation for anonymous functions
made of a single expression:
```js
(x) => x
```
which is the same as
```js
(x) => { return x; }
```
which is itself the same as
```js
function(x) { return x; }
```

When extending any rule with an alternate choice such as `$.ellipsis`,
the simpler way is this one:

```js
expression: ($, previous) => choice(previous, $.ellipsis),
```

However, if the `previous` rule is known to be a `choice()`, we can avoid
one level of nesting and append to the original list of choices, which
is done as follows:
```js
expression: ($, previous) => choice(...previous.members, $.ellipsis),
```

Whether to use one or the other is a matter of taste.

Finally, on rare occasions where the rule body is more than a single
expression, you'll have to use the curly-brace/return syntax:
```js
expression: ($, previous) => {
  if (semgrep_ext)
    return choice(...previous.members, $.ellipsis);
  else
    return previous;
},
```

Parsing statistics
--

From a language's folder such as `lang/csharp`, two targets are
available to exercise the generated parser:

* `make test`: runs on `test/ok` and `test/xfail`
* `make stat`: downloads the code specified in `projects.txt` and
  parses the files whose extension matches those in `extensions.txt`,
  reporting parsing success in the form of a CSV file.

For gathering a good test corpus, you can use [GitHub
Search](https://github.com/search/advanced) or the script provided in
`scripts/most-starred-for-language.py`. For github searches, filter by
programming language and use a constraint to select large projects,
such as "> 100 forks". Collect the repository URLs and put them into
`projects.txt`.

Publishing generated parsers
--

After you have pushed your ocaml-tree-sitter changes to the main
branch, do the following:
1. Check that the original `grammar.js`, `src/scanner.c`/`.cc` (if
   applicable) look clean and have minimal external dependencies.
2. In `ocaml-tree-sitter/lang/Makefile`, add language under
   'SUPPORTED_LANGUAGES' and 'STAT_LANGUAGES'.
3. In `ocaml-tree-sitter/lang` directory, run `./release X --dry-run`.
   If this looks good, please [ask someone from the Semgrep team](https://github.com/semgrep/ocaml-tree-sitter-semgrep/blob/main/doc/release.md) to
   publish the code using `./release X`.

### Troubleshooting

Various errors can occur along the way.

Compilation errors in C or C++ are usually due to a missing source
file `scanner.c` or `scanner.cc`, or a grammar with a name that
doesn't match the name inside the scanner file. JavaScript files may
also be missing, in particular in the case of grammars that extend
existing grammars such as C++ for C or TypeScript for
JavaScript. Check for `require()` calls in `grammar.js` and learn how
this NodeJS primitive resolves paths.

There may also be errors when generating or compiling
OCaml code. These are likely bugs in ocaml-tree-sitter and they should
be reported or fixed right away.

Here are some known types of parsing errors:

* A syntax error. The input program is in the wrong syntax or uses a
  recent feature that's not supported yet: `make test` or directly the
  `parse_X` program will show the tree produced by tree-sitter with
  one or more `ERROR` nodes.
* A "reparsing" error. It's an error generated after the first
  successful parsing pass by the tree-sitter parser, during the
  reparsing pass by the OCaml code performed by the generated
  `Parse.ml` file.  The error message should tell you something like
  "cannot interpret tree-sitter's output", with details on what code
  failed to match what pattern. This is most likely a bug in
  ocaml-tree-sitter.
* A segmentation fault. This could be due to a bug in the
  OCaml/tree-sitter C bindings and should be fixed. A simple test case
  that reproduces the problem would be nice.
  See https://github.com/semgrep/ocaml-tree-sitter/issues/65

Parsing errors that are due
to an incomplete or incorrect grammar should be recorded, and
eventually reported and/or fixed in the upstream project.
We keep failing test cases in a `fail/` folder, preferably in the form
of the minimal program suitable for a bug report, with a comment
describing what was expected and what's going on.

## pfff

Pfff defines a list programming languages, some of which have parsers
in pfff itself. Others are tree-sitter parsers which are otherwise
independent from pfff. You need to add the new language to the list of
languages in pfff.

Look under **Adding a Language** in [pfff](https://github.com/semgrep/pfff/blob/develop/README.md)
for step-by-step instructions.

## semgrep-core

Now that you have added your new language 'X' to pfff, do the following:
1. Add the new pfff submodule to semgrep-core.
2. In `Check_pattern.ml`, add 'X' to `lang_has_no_dollar_ids`/ If the grammar
   has no dollar identifiers, add it above 'true'. Otherwise, add it above 'false'.
3. In `synthesizing/Pretty_print_generic.ml`, add 'X' to the appropriate functions:
   * print_bool
   * if_stmt
   * while_stmt
   * do_while
   * for_stmt
   * def_stmt
   * return
   * break
   * continue
   * literal
4. In `parsing/Test_parsing.ml`, add in 'X' to `dump_tree_sitter_cst_lang`.
   You can look to the other languages as reference to what code to add.
5. Create a file `parsing/Parse_X_tree_sitter.ml`. Add basic functionality to
   define the function `parse` and import module `Parse_tree_sitter_helpers`.
   You can look at csharp and kotlin files in order to get a better idea of how to
   define the parse file function, but this file should contain something similar to:
   ```
   module H = Parse_tree_sitter_helpers

   let parse file =
    H.wrap_parser
        (fun () ->
            Parallel.backtrace_when_exn := false
            Parallel.invoke Tree_sitter_X.Parse.file file ()
        )
   ```
6. In `parsing/tree_sitter/dune`, add `tree-sitter-lang.X`.
7. Write a basic test case for your language in `tests/X/hello-world.X`. This can
   just be a hello-world function.
8. Test that the command
   `semgrep-core/bin/semgrep-core -dump_tree_sitter_cst test/X/hello-world`
   prints out a CST for your language.

## Legal concerns

Be thankful for the authors of the original code, keep clearly visible
license notices, and make it easy to get back to the original projects:

* Make sure to preserve the `LICENSE` files. This should be listed in
  the `fyi.list` file.
* For sample input in `test/`, consider Public Domain ("The
  Unlicense") files or write your own, for simplicity.
  [GitHub Search](https://github.com/search/advanced)
  allows you to filter projects by license and by programming language.

## See also

[How to upgrade the grammar for a language](updating-a-grammar.md)
