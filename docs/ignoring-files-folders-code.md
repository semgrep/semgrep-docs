---
slug: ignoring-files-folders-code 
append_help_link: true
title: Ignoring files, folders, or code
description: "This documents various methods to skip or ignore files, folders, or code that are not relevant to a Semgrep scan."
---

import MoreHelp from "/src/components/MoreHelp"

# Ignoring files, folders, or parts of code

Exclude specific files, folders or parts of code from results of Semgrep scans in your repository or working directory. Semgrep will not generate findings for the ignored items.

This is separate from [ignoring a **finding**](../managing-findings), which is a triage operation after a Semgrep scan has found a match.

All Semgrep environments (CLI, CI, and App) adhere to user-defined or Semgrep-defined ignore patterns.

## Reference summary

| Method  | Usage    | Examples |
|:--------|:---------|:---------|
| To ignore blocks of code: `nosemgrep` | Create a comment, followed by a space (` `), followed by `nosemgrep` at the first line or preceding line of the pattern match. | ` // nosemgrep` &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; `// nosemgrep: rule-id` <br /> `# nosemgrep` |
| To ignore files and folders: `.semgrepignore` | Create a `.semgrepignore` file in your **repository's root directory** or your **project's working directory** and add patterns for files and folders there. Patterns follow `.gitignore` syntax with some caveats. See [Defining files and folders in `.semgrepignore`](#defining-files-and-folders-in-semgrepignore). | [`.semgrepignore` sample file](https://raw.githubusercontent.com/returntocorp/semgrep/develop/cli/src/semgrep/templates/.semgrepignore) |

## Understanding Semgrep defaults

Without user customization, Semgrep refers to the following to define ignored files and folders:

* Semgrep's default `.semgrepignore` file
* Your repository's `.gitignore` file (if it exists)

In the absence of a user-generated `.semgrepignore`, Semgrep will refer to [its repository's default template](https://github.com/returntocorp/semgrep/blob/develop/cli/src/semgrep/templates/.semgrepignore):

```
DEFAULT_SEMGREPIGNORE_TEXT
```

:::caution

The default `.semgrepignore` file is opinionated and causes Semgrep to skip these folders:

* `/tests`, `/test`
* `/vendors`

To include the above folders, create a `.semgrepignore` file without those paths.

:::


## Files, folders, and code beyond Semgrep's scope

Semgrep will ignore files beyond the scope of Semgrep's use.

* Large files (maximum file size defaults to 1MB)
* Binary files
* Unknown file extensions (file extensions not matched with any supported programming language)

Large files and unknown file extensions are included or excluded through command line flags (See [CLI reference](https://semgrep.dev/docs/cli-reference/)). Binary files are never scanned.

This document defines **files, folders and code** as those that are **relevant to a Semgrep scan**. For example, `.jpg` files are not a part of Semgrep's scope and therefore are not part of the scope of this document.


## Customizing ignore behavior

Semgrep provides several methods to customize ignore behavior. Refer to the following table to see which method suits your goal:

| Goal | Method |
|:---- |:------ |
| To scan all files within Semgrep's scope each time you run Semgrep (only files within `.git` will be ignored). | Create an empty `.semgrepignore` file in your repository root directory or in your project's working directory. An empty `.semgrepignore` will make Semgrep scan paths in `.gitignore`. |
| To ignore files and folders in `.gitignore`. | Add `.gitignore` to your `.semgrepignore` file. |
| To ignore custom files and folders each time you run a scan. | Add these files to your `.semgrepignore` file or [define them through Semgrep App](#defining-files-and-folders-in-semgrep-app).|
| To ignore specific code blocks each time you run a scan. | Create a comment with the word `nosemgrep`. |
| To ignore files or folders for a particular scan. | Run Semgrep with the flag `--exclude` followed by the pattern or file to be excluded. See [CLI reference](../cli-reference/).
| To include files or folders for a particular scan. | Run Semgrep with the flag `--include` followed by the  pattern or file to be included. See CLI reference. When including a pattern from a `.gitignore` or `.semgrepignore` file, `--include` overrides both, resulting in the file's inclusion in the scan. |
| To include files or folders defined within a `.gitignore` for a particular scan. | Run Semgrep with the flag `--no-git-ignore`, which will override its definition within `.semgrepignore` as well. |
| To ignore files or folders for a particular rule. | Edit the rule to set the `paths` key with one or more patterns. See [Rule syntax](../writing-rules/rule-syntax#paths).


## Defining files and folders in `.semgrepignore`

`.semgrepignore` syntax mirrors `.gitignore` syntax, with the following modifications:

* "Include" patterns (lines starting with `!`) are unsupported.
* "Character range" patterns (lines including a collection of characters inside brackets) are unsupported.
* An `:include ...` directive is added, which allows another file to be included in the ignore pattern list; typically this included file would be the project `.gitignore`. No attempt at cycle detection is made.
* Any line beginning with a colon, but not `:include`, will raise an error.
* `\:` is added to escape leading colons.

Unsupported patterns are silently removed from the pattern list (this is done so that `.gitignore` files may be included without raising errors). The removal will be logged.

For a description of `.gitignore` syntax, see [.gitignore documentation](https://git-scm.com/docs/gitignore).


## Defining files and folders in Semgrep App

Another method for users to define ignore patterns is through a Project in Semgrep App. These patterns follow the same syntax as `.semgrepignore` in the preceding section.

To define files and folders in Semgrep App:

1. Sign into [Semgrep App](https://semgrep.dev/login?return_path=/manage/projects).
2. From the Dashboard Sidebar, select **Projects > [Project name]**.
3. Enter files and folders to ignore in the **Path Ignores** box.

Including files and folders through this method is **additive**. When Semgrep App makes a scan, it will look for a `.semgrepignore` within the repository. If no `.semgrepignore` file is found, it will temporarily create one and add items from Semgrep App's Path Ignores. Adding items to the **Path Ignores** box will not override default Semgrep ignore patterns.


## Ignoring code through nosemgrep

To ignore blocks of code, define an **inline comment**, followed by a **space** (` `), followed by the word `nosemgrep` at either the **first line** or **the line preceding** the potential match. Semgrep will ignore all rule pattern matches. This functionality works across all supported languages.

`nosemgrep` in Python:

```python

bad_func1()  # nosemgrep

# nosemgrep
bad_func2()

```

`nosemgrep` in JavaScript:

```javascript

// nosemgrep
bad_func1()

bad_func2(); // nosemgrep

bad_func3(   // nosemgrep
    arg
);

```

:::info

The space (` `) before `nosemgrep` is required for Semgrep to detect this annotation.

:::

To ignore blocks of code for a **particular rule**, enter its `rule-id` as follows: `nosemgrep: RULE_ID`. To ignore **multiple rules**, use a comma-delimited list. `rule-ids` must be referenced with their namespace.

Python examples:

```python

bad_func1()  # nosemgrep: rule-id-1

# nosemgrep: rule-id-1, rule-id-2
bad_func2() 

```

Javascript examples wherein rules are stored in a `configs` subdirectory:

```javascript

// nosemgrep: configs.rule-id-3
bad_func1()

bad_func2(); // nosemgrep: configs.rule-id-3

bad_func3(   // nosemgrep: configs.rule-id-3, configs.rule-id-4
    arg
);

```

:::info

Previous annotations for ignoring code inline, such as `nosem`, are deprecated.

:::


## Disabling rules on Semgrep App

Semgrep App users can disable rules and rulesets through the Rule Board. See [Removing rules or rulesets](../semgrep-app/rule-board/#removing-rules-or-rulesets).


## Known issues

### `--no-git-ignore` is overridden due to default ignore patterns (.semgrepignore) ([#4537](https://github.com/returntocorp/semgrep/issues/4537))

To fix this, create an empty .semgrepignore file. If the scan is a one-off event, delete the .semgrepignore file to restore default ignore patterns.


<MoreHelp />
