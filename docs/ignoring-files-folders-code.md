---
slug: ignoring-files-folders-code
append_help_link: true
title: Ignoring files, folders, and code
description: "This documents various methods to skip or ignore files or folders that are not relevant to a Semgrep scan."
---

import MoreHelp from "/src/components/MoreHelp"
import IgnoreIndividualFindingNoGrouping from "/src/components/procedure/_ignore-individual-finding-no-grouping.mdx"

# Ignoring files, folders, or parts of code

This document describes two types of ignore operations:

* **Ignoring as exclusion.** Exclude or skip specific **files and folders** from the scope of Semgrep scans in your repository or working directory. Ignoring in this context means that Semgrep does not generate findings for the ignored files and folders.
* **Ignoring as triage action**. Ignore specific parts of code that would have generated a finding. Ignoring in this context means that Semgrep generates a finding record and automatically triages it as **Ignored**, a triage state.

All Semgrep environments (CLI, CI, and Semgrep Cloud Platform) adhere to user-defined or Semgrep-defined ignore patterns.

## Reference summary

| Method  | Usage    | Examples |
|:--------|:---------|:---------|
| To ignore blocks of code: `nosemgrep` | Create a comment, followed by a space (` `), followed by `nosemgrep` at the first line or preceding line of the pattern match. This generates a finding that is automatically ignored. | ` // nosemgrep` &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; `// nosemgrep: rule-id` <br /> `# nosemgrep` |
| To ignore files and folders: `.semgrepignore` | Create a `.semgrepignore` file in your **repository's root directory** or your **project's working directory** and add patterns for files and folders there. Patterns follow `.gitignore` syntax with some caveats. See [Defining ignored files and folders in `.semgrepignore`](#defining-ignored-files-and-folders-in-semgrepignore). | [`.semgrepignore` sample file](https://raw.githubusercontent.com/semgrep/semgrep/develop/cli/src/semgrep/templates/.semgrepignore) |

## Understanding Semgrep defaults

Without user customization, Semgrep refers to the following to define ignored files and folders:

* Semgrep's default `.semgrepignore` file
* Your repository's `.gitignore` file (if it exists)

In the absence of a user-generated `.semgrepignore`, Semgrep refers to [its repository's default template](https://github.com/semgrep/semgrep/blob/develop/cli/src/semgrep/templates/.semgrepignore):

```
DEFAULT_SEMGREPIGNORE_TEXT

```

:::caution
The default `.semgrepignore` file causes Semgrep to skip these folders:

* `/tests`, `/test`
* `/vendors`

To include the above folders, create a `.semgrepignore` file without those paths.
:::

## Files, folders, and code beyond Semgrep's scope

There are files that Semgrep ignores even without `.semgrepignore`:

* Large files (maximum file size defaults to 1MB)
* Binary files
* Unknown file extensions (file extensions not matched with any supported programming language)

Large files and unknown file extensions are included or excluded through command line flags (See [CLI reference](https://semgrep.dev/docs/cli-reference/)). Binary files are never scanned.

This document defines **files, folders and code** as those that are **relevant to a Semgrep scan**. For example, `.jpg` files are not a part of Semgrep's scope and therefore are not part of the scope of this document.


## Customizing ignore behavior

Semgrep provides several methods to customize ignore behavior. Refer to the following table to see which method suits your goal:

| Goal | Method |
|:---- |:------ |
| To scan all files within Semgrep's scope each time you run Semgrep (only files within `.git` are ignored). | Create an empty `.semgrepignore` file in your repository root directory or in your project's working directory. An empty `.semgrepignore` will make Semgrep scan paths in `.gitignore`. |
| To ignore files and folders in `.gitignore`. | Add `:include .gitignore` to your `.semgrepignore` file. |
| To ignore custom files and folders each time you run a scan. | Add these files to your `.semgrepignore` file or [define them through Semgrep Cloud Platform](#defining-ignored-files-and-folders-in-semgrep-cloud-platform).|
| To ignore specific code blocks each time you run a scan. | Create a comment with the word `nosemgrep`. |
| To ignore files or folders for a particular scan. | Run Semgrep with the flag `--exclude` followed by the pattern or file to be excluded. See [CLI reference](../cli-reference/).
| To include files or folders for a particular scan. | Run Semgrep with the flag `--include` followed by the  pattern or file to be included. See CLI reference. When including a pattern from a `.gitignore` or `.semgrepignore` file, `--include` does not override either, still resulting in the file's exclusion. |
| To include files or folders defined within a `.gitignore` for a particular scan. | Run Semgrep with the flag `--no-git-ignore`, which overrides its definition within `.semgrepignore` as well. |
| To ignore files or folders for a particular rule. | Edit the rule to set the `paths` key with one or more patterns. See [Rule syntax](../writing-rules/rule-syntax#paths).


## Defining ignored files and folders in `.semgrepignore`

`.semgrepignore` syntax mirrors `.gitignore` syntax, with the following modifications:

* "Include" patterns (lines starting with `!`) are unsupported.
* "Character range" patterns (lines including a collection of characters inside brackets) are unsupported.
* An `:include ...` directive is added, which allows another file to be included in the ignore pattern list; typically this included file would be the project `.gitignore`. No attempt at cycle detection is made.
* Any line that begins with a colon, but not `:include`, raises an error.
* `\:` is added to escape leading colons.

Unsupported patterns are silently removed from the pattern list (this is done so that `.gitignore` files may be included without raising errors). The removal is logged.

For a description of `.gitignore` syntax, see [.gitignore documentation](https://git-scm.com/docs/gitignore).

## Defining ignored files and folders in Semgrep Cloud Platform

Another method for users to define ignore patterns is through a Project in Semgrep Cloud Platform. These patterns follow the same syntax as `.semgrepignore` in the preceding section.

To define files and folders in Semgrep Cloud Platform:

1. Sign in to [Semgrep Cloud Platform](https://semgrep.dev/login?return_path=/manage/projects).
2. From the Dashboard Sidebar, select **[Projects](https://semgrep.dev/orgs/-/projects)** > **[Project name]**.
3. Select the name of the project to modify, and then click the respective <i class="fa-solid fa-gear"></i> **gear** icon in the Settings column.
4. Enter files and folders to ignore in the **Path Ignores** box.

Including files and folders through this method is **additive**. When Semgrep Cloud Platform makes a scan, it looks for a `.semgrepignore` within the repository. If no `.semgrepignore` file is found, Semgrep temporarily creates one and adds items from Semgrep Cloud Platform's Path Ignores. Adding items to the **Path Ignores** box does not override default Semgrep ignore patterns.

You can also add files to `.semgrepignore` while triaging individual findings in the **No grouping** view on the Findings page:

<IgnoreIndividualFindingNoGrouping />

:::note
Add files to `.semgrepignore` in the fifth step of the procedure described above. 
:::

## Ignoring code through nosemgrep

To ignore blocks of code, define an **inline comment**, followed by a **space** (` `), followed by the word `nosemgrep` at either the **first line** or **the line preceding** the potential match. Semgrep ignores all rule pattern matches. This functionality works across all supported languages.

:::caution
Ignoring code through this method still generates a finding. The finding is automatically set to the **Ignored** triage state.
:::

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

JavaScript examples wherein rules are stored in a `configs` subdirectory:

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

## Disabling rules on Semgrep Cloud Platform

Semgrep Cloud Platform users can disable rules and rulesets through the Policies page. See [Disabling rules](/semgrep-code/policies#disabling-rules) and [Disabling rulesets](/semgrep-code/triage-remediation/#disable-a-ruleset-or-a-rule).

## Known issues

### `--no-git-ignore` is overridden due to default ignore patterns (.semgrepignore) ([#4537](https://github.com/semgrep/semgrep/issues/4537))

To fix this, create an empty .semgrepignore file. If the scan is a one-off event, delete the .semgrepignore file to restore default ignore patterns.

<MoreHelp />
