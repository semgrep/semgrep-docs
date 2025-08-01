# `semgrep-core` contributing

The following explains how to build `semgrep-core` so you can make and test changes to the OCaml code. Once you have `semgrep-core` installed, you can refer to [semgrep-contributing](semgrep-contributing.md) to see how to build and run the Semgrep application.

## Build `semgrep-core`

This document assumes you are building on MacOS and have already installed the Homebrew package manager. Installation commands and package names for different OSes may vary slightly.

### Check out the code

Begin by cloning the Semgrep repo from Git. Each parser's tree-sitter code is managed as a separate submodule, so pass `--recurse-submodules` to ensure they are cloned as well.

```bash
git clone --recurse-submodules https://github.com/semgrep/semgrep
cd semgrep
```

If you have already cloned without submodules, you can check them out as a second separate step from the root of the repository:

```bash
git submodule update --init --recursive
```

### Prerequisites


`semgrep-core` is written primarily in OCaml. You must [install OCaml](https://opam.ocaml.org/doc/Install.html) and its package manager OPAM, and pin the current compiler version. On MacOS, it is done through the following steps:

```bash
brew install opam
opam init
opam switch create semgrep 5.3.0
eval $(opam env)
```

Next, install some base packages required for setup and compilation.

```bash
brew install pkg-config bash
```

Lastly, you will almost certainly want the Python environment for `semgrep-cli`
configured before proceeding. Please refer to the [Set up the environment](/contributing/semgrep-contributing#set-up-the-environment) documentation.

Once you've returned here, ensure that your shell is able to enter the Python
virtual environment.

```bash
cd cli; pipenv shell # enter the virtual environment
cd ..                # from within the virtual environment, return to the repo root
```

### First-time installation

The root `Makefile` contains targets that take care of building the
right things. It is commented. Please refer to it and keep it
up-to-date.

To install all necessary dependencies, run

```bash
make setup
```

Next, to install `semgrep-core`, run

```
make core
```

Finally, test the installation with 

```
bin/semgrep-core -help
```

If you would like to finish the Semgrep installation, return to the
[Python-side instructions](semgrep-contributing.md).

### Rebuild after a change

Unless there is a significant dependency change, you won't need to run `make dev-setup` again. 

The Semgrep team has provided useful targets to help you build and link the entire semgrep project, including both `semgrep-core` and `semgrep`. You may find these helpful.

To install the latest OCaml binaries and `semgrep` binary after pulling source code changes from Git, run:

```
make rebuild
```

To install after you make a change locally, run

```
make build    # or just `make`
```

After making either of these targets, `semgrep` runs with all your local changes, OCaml and Python both.

```note
Because this updates the `semgrep` binary, if you do not have your Python environment configured properly, you will encounter errors when running these commands. Follow the procedure under [Development](#development)
```

## Development 

In practice, it is not always convenient to use `make build` or `make rebuild`. `make rebuild` will update everything within the project; `make build` will compile and install all the binaries. You can do this yourself in a more targeted fashion.

Below is a flow appropriate for frequent developers of `semgrep-core` 

After you pull, run

```
git submodule update --recursive
```

This will update internal dependencies. (We suggest aliasing it to `uu`)

After `tree-sitter` is updated, you may need to reconfigure it. If so, run

```
make config
```

### Develop `semgrep-core`

If you are developing `semgrep-core`, Use `Makefile` in the repository root for `core` and `core-test` targets; the code is primarily in `src/`.

The following assumes you are in the repository root.

After you pull or make a change, compile using

```
make
```

This will build an executable for `semgrep-core` in `_build/default/src/main/Main.exe` (we suggest aliasing this to `sc`). Try it out by running

```
_build/default/src/main/Main.exe -help
```

When you are done, test your changes with 

```
make core-test
```

Finally, to update the `semgrep-core` binary used by `semgrep`, run

```
make copy-core-for-cli
```

### Test `semgrep-core`

`make test` in the repository root directory will run tests that check code is correctly parsed
and patterns perform as expected. To add a test in an appropriate language subdirectory, `tests/patterns/[LANG]`, create a target file (expected file extension given language) and a .sgrep file with a pattern. The testing suite will check that all places with a comment with `ERROR` were matches found by the .sgrep file. See existing tests for more clarity.

If you are diagnosing test failures, it is time-consuming to re-run the entire test suite.
`make retest` will only re-run tests that failed.

### Development environment

OCaml installations include a language server that most modern editors like
Neovim and Emacs support out of the box.

You can also use Visual Studio Code \(vscode\) to edit the code of Semgrep. The [reason-vscode](https://marketplace.visualstudio.com/items?itemName=jaredly.reason-vscode) Marketplace extension adds support for OCaml/Reason.

The [OCaml and Reason IDE extension](https://github.com/reasonml-editor/vscode-reasonml) by @freebroccolo is another valid extension, but it seems not as actively maintained as reason-vscode.

The source of Semgrep contains also a .vscode/ directory at its root containing a task file to automatically build Semgrep from vscode.

Note that dune and ocamlmerlin must be in your PATH for vscode to correctly build and provide cross-reference on the code. In case of problems, do:

```bash
cd /path/to/semgrep
eval $(opam env)
dune        --version # just checking dune is in your PATH
ocamlmerlin -version  # just checking ocamlmerlin is in your PATH
code .
```

## Test Semgrep performance

### Explore results from a slow run of Semgrep

#### Interpret the result object

For full timing information, run Semgrep with `--time` and `--json` flags. In addition, you can add `time` at the beginning of the command to get the true wall time. The `--json` argument produces a large amount of output, so redirecting the output to a file with `-o` is recommended. 

See the following example for the full command:

<pre class="language-bash"><code>time semgrep --config=auto --time --json -o result.json <span className="placeholder">PATH/TO/SRC</span></code></pre>

Substitute the optional placeholder <code><span className="placeholder">PATH/TO/SRC</span></code> with the path to your source code.

Here is an example result object.

```JSON
      { "results": [], 
        "paths": {},
        "errors": [],
  "time": {
    "max_memory_bytes": 48693248,
    "profiling_times": {
      "config_time": 0.0624239444732666,
      "core_time": 0.11341428756713867,
      "ignores_time": 0.00017690658569335938,
      "total_time": 0.17628788948059082
    },
    "rules": [
      {
        "id": "test-rule"
      }
    ],
    "rules_parse_time": 0.0013418197631835938,
    "targets": [
      {
        "match_times": [
          5.9604644775390625e-06
        ],
        "num_bytes": 340,
        "parse_times": [
          0.0071868896484375
        ],
        "path": "test_functions.java",
        "run_time": 0.011521100997924805
      }
    ],
    "total_bytes": 340
  }
}
```

All the information about timing is contained under `time`.

The first section is `profiling_times`. This contains wall time durations of various relevant steps:
* Getting the rule config files (`config_time`)
* Running the main engine (`core_time`)
* Processing the ignores (`ignores_time`) 

The `total_time` field represents the sum of these steps.

The remaining fields report engine performance. Together, `rule_parse_time` and `targets` should capture all the time spent running `semgrep-core`.

`rule_parse_time` is straightforward. It records the time spent parsing the rules file.

`targets` poses more difficulty. Since files are run in parallel, the amount of time spent parsing (`parse_times`) and matching (`match_times`) will inevitably be meaningless compared against `total_time` or `core_time`. Therefore, the total run time (`run_time`) of each target for each rule is taken within the parallel run. This helps contextualize the time spent parsing and matching each target. The sum of the run times thus can (and usually should) be longer than the total time.

The lists `match_times` and `parse_times` are in the same order as `rules`. That is, the match time of rule `rules[0]` is `match_times[0]`.

Note that `parse_times` is given for each rule, but a file should only be parsed once (the first number). Afterwards, the parse time represents the time spent retrieving the file's AST from the cache.

#### Negative values in the metrics

When a time is not measured, by default it has the value -1. It is common to a have a normal runtime, but -1 for the parse time or match time; this indicates an error in parsing.

#### Tips for exploring Semgrep results

There are several scripts already written to analyze and summarize these timing data. Find them in [`scripts/processing-output`](https://github.com/semgrep/semgrep/tree/develop/scripts/processing-output). If you have a timing file, you can run

```bash
python read_timing.py [your_timing_file]
```

You may need to adjust the line `result_times = results` based on whether you have a timing file or the full results (in which case this should be `result_times = results["time"]`)

### Profile code

You can pass the -profile command-line argument to semgrep-core to get
a short profile of the code. For example, running:

``` bash
cd semgrep-core
./bin/semgrep-core -profile -e foo tests/python
```
will output:

``` bash
---------------------
profiling result
---------------------
Main total                               :      1.975 sec          1 count
Parse_python.parse                       :      0.828 sec          1 count
...
```

You can also instead set the environment variable SEMGREP_CORE_PROFILE to 1 to get the same information:

```bash
cd semgrep-core
export SEMGREP_CORE_PROFILE=1
./bin/semgrep-core -e foo tests/python
```
will output:
```bash
---------------------
profiling result
---------------------
Main total                               :      1.975 sec          1 count
Parse_python.parse                       :      0.828 sec          1 count
...
```

This is especially useful when you don't call directly semgrep-core, but
instead use the python wrapper semgrep.

Note that since semgrep 0.82, you can pass the `--dump-command-for-core` (or the shorter `-d`) to `semgrep` to get the command the python wrapper will use to call semgrep-core (this is an hidden option, which is why you will not see it in `semgrep --help`). For example:

```bash
semgrep --dump-command-for-core --config bench/zulip/input/rules/zulip/rules.zulip.semgrep.yml.yaml bench/zulip/input/zulip/
```
will output:
```bash
Running 10 rules...
/home/pad/github/semgrep/cli/src/semgrep/bin/semgrep-core -json -rules semgrep_rules.yaml -j 20 -targets semgrep_targets.txt -timeout 30 -timeout_threshold 0 -max_memory 0 -json_time -fast
```

where `semgrep_rules.yaml` and `semgrep_targets.txt` are files created by `semgrep` that respectively contain the list of rules and targets. It is easy then to copy-paste this command and possibly add a `-profile` or `-debug` to get more information.


You can also use the SEMGREP_CORE_DEBUG environment variable to add debugging
information, for example:

```bash
export SEMGREP_CORE_DEBUG=1
export SEMGREP_CORE_PROFILE=1
pipenv run semgrep -f ../semgrep-core/tests/PERF/ajin.yaml ../semgrep-core/tests/PERF/three.js
```
will output:
```bash
Debug mode On
Executed as: semgrep-core -lang javascript -rules_file /tmp/tmpy5pzp3p_ -j 8 ../semgrep-core/tests/PERF/three.js
Profile mode On
disabling -j when in profiling mode
PARSING: ../semgrep-core/tests/PERF/three.js
saving rules file for debugging in: /tmp/semgrep_core_rule-97ae74.yaml
---------------------
profiling result
---------------------
Main total                               :      1.975 sec          1 count
Parse_js.parse                           :      0.828 sec          1 count
Semgrep.check                            :      0.791 sec          1 count
Semgrep.match_sts_sts                    :      0.559 sec     185064 count
...
```

### Benchmark code

We have two sets of benchmarks, one on a suite of real repositories against real rulesets (real benchmarks), another that highlights specific slow (rule, file) pairs (micro benchmarks).

To run the micro benchmarks, go to `perf/perf-matching/`, and run `./run-perf-suite`.

To run the real benchmarks, go to `perf`, and run `./run-benchmarks`. See the perf [readme](https://github.com/semgrep/semgrep/blob/develop/perf/README.md) for more details on how these are set up.

There are a number of flags (`./run-benchmarks --help` to see them) which may be helpful if you are using the benchmarks for local development. For example, `./run-benchmarks --plot_benchmarks` will output a graph of the benchmark results at the end.

If you are concerned about performance, the recommended way to test is to hide your change behind a flag and add that flag to run-benchmarks. Add a flag in `src/configuring/Flag_semgrep.ml`. These are ref cells, so you can check whether the flag is enabled or not via `!Flag_semgrep.your_flag`. In `src/core_cli/Core_CLI.ml`, go to options, and add a flag that sets the appropriate `Flag_semgrep`. Then, in `perf/run-benchmarks`, go to the `SemgrepVariants` list, and add your variant.

You can also test the impact of your change by running `./run_benchmarks --std_only` in `perf`, which will only run the default version of semgrep.

***

In these next sections we will give an overview of `semgrep-core` and then some tips for making common changes to `semgrep-core`. These are only tips; without seeing an error, we cannot know its cause and proper resolution, but hopefully it gives useful direction.

## Cheatsheet

The following assume you are in the root of the repository.

Compilation:

* To compile: `make`
* To run the test suite: `make test`
* To install the `semgrep-core` binary: `make install`
* The `semgrep-core` executable produced by `make`: `_build/default/src/main/Main.exe` (alias `sc`)

Running (examples in Python):

* To match a rule file against a target: `sc -rules [your-rule].yaml [your-target].py -lang python`
* To match a pattern against a target: `sc -f [your-pattern].sgrep [your-target].py -lang python`
* To dump a pattern AST: `sc -dump_pattern [your-pattern].sgrep -lang python`
* To dump a target AST: `sc -dump_ast [your-target].py -lang python` 
* To dump a pattern Python AST: `pf -dump_python [your_pattern].sgrep -sgrep_mode -lang python`
* To dump a target Python AST: `pf -dump_python [your_pattern].sgrep -lang python`

Debugging:
* To get the semgrep-core command the python wrapper will use: `semgrep --dump-command-for-core --config [your-config] [your-target-directory]`

Try it out: `sc -f tests/python/dots_stmts.sgrep tests/python/dots_stmts.py -lang python`

## `semgrep-core` overview

### Entry point

The entry point to `semgrep-core` is `Core_CLI.ml`, in `src/core_cli/`. This is where you add command-line arguments. It calls functions depending on the mode in which `semgrep-core` was invoked (`-config` for a yaml file, `-f` for a single pattern, etc.)

When invoked by `semgrep`, `semgrep-core` is called by default with `-config`. This corresponds to the function `semgrep_with_rules_file`, which in turn calls `semgrep_with_rules`. These functions will parse and then match the rule and targets.

### Parsing

`semgrep-core` uses external modules to parse code into augmented language-specific abstract syntax trees (ASTs). Though we call these ASTs, they additionally contain token information such as parentheses that are traditionally only present in concrete syntax trees (CSTs) so that we can output results in the correct range.

When `semgrep-core` receives a rule or a target, it will first need to parse it. The functions that do this are located in `src/parsing/`.

* If it reads a rule, it will go through `Parse_rule.ml`, which uses `Parse_pattern.ml` to parse the code-like portions of the rule
* If it reads a target, it will go through `Parse_target.ml`

Depending on the language, `Parse_pattern.ml` and `Parse_target.ml` will invoke parsers to parse the code. For example, if we have Java code, it will first be parsed into a Java-specific AST.

### Converting to the generic AST

`semgrep-core` does not match based on the Java AST. It has a generic AST, defined in `AST_generic.ml` (in `libs/ast_generic/`), which all language-specific ASTs are converted to.

The functions for this conversion are in either `languages/[LANG]/generic/`. They are named with the appropriate language in a consistent convention.

### Matching

The matching functions are contained in `src/engine/` (e.g. `Match_rules.ml`, `Match_patterns.ml`) and `src/matching/` (e.g. `Generic_vs_generic.ml`). There are several possible matchers to invoke

* spacegrep (for generic mode)
* regexp (to match by regexp instead of semgrep patterns)
* comby (an experimental mode for languages we don't yet support)
* pattern (the main mode)

We will only talk about the last for now. In most cases, `Match_rules.ml` will invoke the `check` function in `Match_patterns.ml`. This will visit the target AST and try to match the pattern to it at each point. If the pattern and the target node correspond, it will call the relevant function in `Generic_vs_generic.ml`.

The core of the matching is done by `Generic_vs_generic.ml`. The logic for whether two expressions, statements, etc. match is contained within this file. 

### Report results

The results of the match will be returned to the calling function in `Main.ml` (for example, `semgrep_with_rules`). From there, the results are formatted and outputted.

There are two modes for outputting: JSON and text. JSON output is processed by functions in `JSON_report.ml` in `semgrep-core/src/reporting/`

## Fix a parse error 

Before you start fixing a parse error, you need to know what parser was used. This bears some explanation.

### Guide to parsers

The parsers used by semgrep fall into these categories:
* legacy parsers (pfff): implemented directly in OCaml via a parser generator
* tree-sitter parsers: third-party parsers implemented as
  [tree-sitter](https://tree-sitter.github.io/) grammars
* generic parser (spacegrep): fallback for unsupported languages,
  comes with its own matching engine

For each language, we need a parser for target files and a parser for
semgrep patterns. For a given language, ideally both would use the same
parser. For historical reasons, some languages use a legacy
parser for patterns and a tree-sitter parser for target code.
Here's the breakdown by language as of February 2021:

* legacy parser for both pattern and target:
  - OCaml
  - PHP
  - Python
* legacy parser for pattern, tree-sitter parser for target:
  - C
  - Go
  - Java
  - JavaScript, JSX, JSON
  - Ruby
  - TypeScript, TSX
* tree-sitter parser for both pattern and target:
  - C#
  - Kotlin
  - Lua
  - R
  - Rust

### Fix a `pfff` parse error

#### Parse with `pfff`

[`pfff`](https://github.com/semgrep/pfff) is an OCaml project that we plug into `semgrep-core` as a git submodule. It uses menhir to generate parsers from a defined grammar.

Consider a Python pattern (or target). To parse it into a generic AST form, we transform the code as follows:

Text -- (via `Lexer_python.mll`) --> Tokens -- (via `Parser_python.mly`) --> `Ast_python` -- (via `Python_to_generic.ml`) --> `AST_generic`

These files live in different places. Specifically,

* `Lexer_python.mll` is in `semgrep-core/src/pfff/lang_python/parsing`
* `Parser_python.mly` is in `semgrep-core/src/pfff/lang_python/parsing`
* `AST_python.ml` is in `semgrep-core/src/pfff/lang_python/parsing`
* `Python_to_generic.ml` is in `semgrep-core/src/parsing/pfff`
* `AST_generic.ml` is in `semgrep-core/src/core/ast`

You will notice that the first three, `Lexer_python.mll`, `Parser_python.mly`, and `AST_python.ml` are in `semgrep-core/src/pfff/`, which is a submodule. This means that when you modify them, you modify the submodule rather than `semgrep-core`. You can develop as usual---`pfff` is compiled when you run `make` in `semgrep-core/`---but will need to go through an extra step to make a pull request (explained later).

When a language is particularly complicated, it can be convenient to first parse into a CST, then convert to the AST. Currently, we only do this for PHP. In this case, there is an extra step:

Tokens -- (via `Parser_php.mly`) --> `Cst_php` -- (via `Ast_php_build.ml`) --> `Ast_php`

The lexers and parsers apply for both patterns and targets of a given language. To avoid parsing invalid targets, we have a function `Flag_semgrep.sgrep_guard` which fails when parsing constructs that only appear in patterns if a target is being parsed.

#### Identify the error

The source of the error can be anywhere along the Text --> `AST_generic` path, so you will want to identify which file is causing it. 

First, create a minimum failing case. If you are debugging a rule, isolate this to an individual pattern if possible, saved in a `.sgrep` file. 

For simplicity, we will use Python in the examples, but you can substitute Python for any language parsed with `pfff`. 

If the problem is in `Lexer_python.mll`, you will probably get a helpful error message which should tell you what you need to change. 

If the problem is in `Parser_python.mly`, you will probably not get a helpful error message, because the error will be reported in the generated parser, not the grammar. To identify which production within the grammar is problematic, you will want to see what AST the parser is trying to produce. Modify the failing case minimally until it parses successfully.

Now, you need to see what generic AST is produced by this similar code. You can actually do this in the playground, by going to Tools -> Dump AST. On the command line, you can run

* For a pattern: 
   ```
   sc -dump_pattern -f [your_pattern].sgrep -lang python
   ```
* For a target: 
   ```
   sc -dump_ast [your_target].py -lang python
   ```

where `sc` is an alias for `semgrep-core/_build/default/src/cli/Main.exe`, the executable produced by running `make` in `semgrep-core/`. If you have installed `semgrep-core`, you can instead use `semgrep-core` here, but each time you make a change you will need to compile (`make`) and then install (`make install`).

By default, tokens are not shown in full in the dumped AST. Their presence is indicated by `()`.

You may also find it useful to see the Python AST representation of the pattern. Just as `make` produces an executable for `semgrep-core` in `semgrep-core/_build/default/src/cli/Main.exe`, it also produces one for `pfff` in `semgrep-core/_build/default/src/pfff/cli/Main.exe` (alias to `pf` for these docs).

To dump the Python AST, run

* For a pattern: 
  ```
  pf -dump_python [your_pattern].sgrep -sgrep_mode -lang python
  ```
* For a target: 
  ```
  pf -dump_python [your_target].py -lang python
  ```

(Note that `-sgrep_mode` does not always work with incomplete programs. You may need to wrap your pattern so that it is a valid program for that language, except for semgrep constructs such as `...`)

#### Fix the error

At this point, the relevant change you need to make will vary depending on your goal. It may be as simple as adding `...` as a possible case. It may require you to introduce a new construct and add it to `AST_generic` and `Ast_python`. As a rule of thumb, prefer to avoid changing `AST_generic` if possible. This will also make your life easier!

If you add a pattern-specific feature, remember to use `Flag_semgrep.sgrep_guard` so that an invalid target does not parse successfully.

When you change the grammar, it is important that you do not introduce conflicts. Check the conflicts before you start by forcing dune to compile the grammar. (You can either use `make clean` and read through the output or make a change in `Parser_python.mly`, run `make`, then remove the change and run `make` again.) Then, after you change the grammar, see if there are any more conflicts than there were before your change.

It can sometimes be okay to introduce a `shift/reduce` conflict, though avoid doing this if possible. It is never okay to introduce a `reduce/reduce` conflict. To understand why, read about [LR(1) parsers](https://en.wikipedia.org/wiki/Canonical_LR_parser).

If you do introduce a conflict, you can figure out how to resolve it by running

```
menhir --explain Parser_python.mly
```

This will produce the file `Parser_python.conflicts` in the same folder as `Parser_python.mly`, which will show the two possible interpretations Menhir is considering for each conflict.

Unfortunately, it will also produce `Parser_python.ml` and `Parser_python.mli`, which will confuse dune when it tries to build. Remove these files before you run `make` again.

#### Commit the fix

Once you have made your desired pattern or target parse, you need to make sure it doesn't break anything else. In `semgrep-core/`, run `make test`. If at the end it says `Ok`, you can commit your fix!

First, if you have any changes in `pfff`, go into the `semgrep-core/src/pfff/` directory, checkout `develop`, pull, and then make a pull request as usual with your changes. This will make a PR to [`pfff`](https://github.com/semgrep/pfff).

When you change files in `pfff`, `semgrep-core` will realize that `pfff` is different (though not which file within `pfff`). If you go back up to `semgrep-core/` and run `git status`, you will see `modified: src/pfff (modified content)`. To pin your latest `pfff` changes to `semgrep-core`, add `src/pfff`.

Now, make the rest of your pull request for `semgrep-core` as usual.

If you haven't changed `pfff`, don't worry about this. Just make a pull request with your changes.

Remember to add test cases so that future changes don't break your example! See [Test `semgrep-core`](#test-semgrep-core)

### Fix a Tree-sitter parse error

There is more information in [Add Support for a Language](#add-support-for-a-language) on tree-sitter which will be helpful. Also, see `semgrep-core/src/parsing/tree-sitter/`.  

## Fix a match error

The first thing you will need to do is understand what you expected and why you aren't getting that. If possible, reduce your rule to a single pattern that doesn't match. You may need to experiment with the clauses in your rule. For example, if you are getting too many matches, it may be because the pattern in `pattern-not` doesn't match what you expect.

If you are unable to do so, you may need to investigate `Match_rule.ml`.

Otherwise, produce a minimal failing pattern/target pair. You will need to compare the ASTs to see which portion is not matching as you expect. Run

```
sc -dump_ast [your_target].py -lang py
```

and then

```
sc -dump_pattern [your_pattern].sgrep -lang py
```

It can be hard to figure out where in the AST you are looking. You can make it easier by using a distinctive variable name in the section you're interested in. 

Once you've isolated the parts that aren't matching, try to figure out where they're different, taking into account special features like metavariables and ellipses. It is unlikely (though not impossible) that the problem would ever be that two identical code segments aren't matching or that there is some AST element that ellipses refuse to match. You might find it helpful to write out the AST parts you want to match on a whiteboard, indicating which part is matched by a special feature. Pare down the code as much as possible and try changing the bit you're interested in.

When you are sure you know what ought to have happened, make it happen. If two pieces of code should match but don't, change `Generic_vs_generic.ml` to tell it that pattern should match the target.

Oftentimes, a matching error is actually a parsing error. You may want to change how `Parser_python.mly` reduces the construct or how it gets converted in `Python_to_generic.ml`. Refer to [Fix a Parse Error](#fix-a-parse-error) for advice.

At the end, confirm the match with

```
sc -f [your_pattern].sgrep [your_target].py -lang py
```

## Fix an autofix error

Autofix runs through both `semgrep-core` and `semgrep`, but the most common autofix error you can encounter is a kind of incorrect range. This happens because `semgrep-core` determines the range of a match based on the locations of the tokens stored in the AST. When the range is incorrect, that usually means a token is missing. You can see token location information with

```
sc -full_token_info -dump_ast [your_target].py -lang py
```

See [Fix a Parse Error](#fix-a-parse-error) for more on parsing 

## Debugging resources

In the process of debugging, you will probably want to print things. We provide a function `pr2` in `Common.ml` (in `semgrep-core/src/pfff/commons/`) to print strings. You can also use the `Printf` module.

If you would like to print an AST element, you can use a `show` function. For example, to print a node of type `any` in `AST_generic`, you can use

`pr2 (show_any your_node)`

Any type that includes `[@@deriving show]` in its definition can be converted to a string in this way.

We also provide some flags that are useful. If you run with `-debug`, you can see the steps `semgrep-core` is taking. You can see more information (and change what you want to see) using `-log_config_file`, which takes a file. You can use one of `semgrep-core/log_config.json.ex1` or `semgrep-core/log_config.json.ex2` to start.

Additionally, the [OCaml debugger](https://ocaml.org/manual/debugger.html) is a great resource.

## Add support for a language

There are some cases where we have chosen to implement a new parser in `pfff`, but in general new languages should use tree-sitter.

### Tree-Sitter parsers

Tree-sitter parsers exist as individual public projects. They are
shared with other users of tree-sitter outside of semgrep. Our
[ocaml-tree-sitter](https://github.com/semgrep/ocaml-tree-sitter-semgrep)
project adds the necessary extensions for supporting semgrep patterns
(ellipsis `...` and such). It also contains the machinery for turning
a tree-sitter grammar into a usable, typed concrete syntax tree (CST).

For example, for the Kotlin language we have:
* input: [tree-sitter-kotlin](https://github.com/fwcd/tree-sitter-kotlin)
* output: [semgrep-kotlin](https://github.com/semgrep/semgrep-kotlin)

Assuming the tree-sitter grammar works well enough, most of the work
consists in mapping the CST to the generic abstract syntax tree (AST)
shared by all languages in semgrep.

These guides go over the integration work in more details:

* [How to add support for a new language](adding-a-language.md)
* [How to upgrade the grammar for a language](updating-a-grammar.md)
* [Tips for converting CST to generic AST](cst-to-ast-tips.md)
