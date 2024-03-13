---
slug: semgrep-vs-code
append_help_link: true
---

import MoreHelp from "/src/components/MoreHelp"

# Semgrep Visual Studio Code extension

[Semgrep](https://semgrep.dev/) is a fast, static analysis tool for finding bugs, detecting vulnerabilities, and enforcing code standards powered by an open-source engine. Semgrep's Visual Studio Code extension scans lines when you change or open files, or scans all files in your workspace. It offers:


## Configure the extension

To configure the Semgrep extension, open its **Extension Settings** page:

1. Use <kbd>⇧Shift+Ctrl+X</kbd> or <kbd>⇧Shift+⌘Command+X</kbd> (macOS) to open the **Extensions** view.
2. Select **Semgrep**.
3. Click the **gear** and select **Extension Settings**.

## Configuration options

- **Semgrep › Do Hover**: Enable AST node views when hovering over a finding.
- **Semgrep › Path**: Set the path to the Semgrep executable.
- **Semgrep › Scan: Configuration**: Specify rules or rulesets you want Semgrep to use to scan your code. Each item can be a YAML configuration file, a URL of a configuration file, or a directory of YAML files. Use `auto` to automatically obtain rules tailored to your project. Semgrep uses your project URL to log into the Semgrep Registry. See [Running rules](https://semgrep.dev/docs/running-rules/) for more information. Run `Semgrep: Update rules` using the Visual Studio Code Command Palette to update the rules configuration for your next scan whenever you change the rule configuration.
- **Semgrep › Scan: Exclude**: List files and directories that Semgrep should ignore when scanning.
- **Semgrep › Scan: Include**: List files and directories scanned by Semgrep. This option globally overrides the workspace setting. As a result, Semgrep scans all included paths.
- **Semgrep › Scan: Jobs**: Specify how many parallel jobs can run simultaneously. The default number of parallel jobs is one.
- **Semgrep › Scan: Max Memory**: Sets the maximum memory in MB to use.
- **Semgrep › Scan: Max Target Bytes**: Sets the maximum size of the target in bytes to scan.
- **Semgrep › Scan: Only Git Dirty**: Allow Semgrep to scan your code whenever you open a new file and display the findings for lines that have changed since the last commit. On by default. 
- **Semgrep › Scan: Pro_intrafile**: Enable intrafile scanning using the Pro Engine. 
- **Semgrep › Scan: Timeout**: Set the maximum run time in seconds before Semgrep times out and stops scanning your code. The default value is 30.
- **Semgrep › Scan: Timeout Threshold**: Set the maximum number of rules that can timeout on a file before the file is skipped. If set to 0, there will be no limit. Defaults to 3.
- **Semgrep > Trace: Server**: This option is useful for debugging. The **messages** option displays communication of the Semgrep Visual Studio Code extension with the LSP server. The default option is **verbose**.

### Experimental configuration options:

The following experimental features should only be used upon recommendation by Semgrep:

- **Semgrep > Heap Size JS**: Set the maximum heap size in MB for the JavaScript version of the extension. Increase if the extension crashes while downloading rules.
- **Semgrep > Ignore Cli Version**: Ignore the CLI Version and enable all extension features.
- **Semgrep > Stack Size JS**: Set the maximum stack size in KB for the JavaScript version of the extension.
- **Semgrep > Use JS**: Use the JavaScript version of the extension. Enabled by default for Windows users.

## Commands

Run Semgrep extension commands through the Visual Studio Code Command Palette. You can access the Command Palette by pressing <kbd>Ctrl+⇧Shift+P</kbd> or <kbd>⌘Command+⇧Shift+P</kbd> (macOS) on your keyboard. See [Command Palette](https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette) documentation. The following list includes all available Semgrep extension commands:

- `Semgrep: Sign in`: Sign in or log in to the Semgrep Cloud Platform (this command opens a new window in your browser). When you sign in, you can automatically scan with Semgrep [Pro rules](https://semgrep.dev/docs/semgrep-code/pro-rules/) and add additional rules to the [Policies](https://semgrep.dev/orgs/-/policies) in Semgrep Code. If you are logged in with the command-line interface using <code>semgrep&nbsp;login</code> you are already signed in with the Visual Studio Code Semgrep extension also. Alternatively, you can log in through your command-line interface bu running `semgrep login`.
- `Semgrep: Sign out`: Log out from Semgrep Cloud Platform. Alternatively, you can sign out through your command-line interface by running `semgrep logout`.
- `Semgrep: Scan changed files in a workspace`: Scan files that have been changed since the last commit in your current workspace.
- `Semgrep: Scan all files in a workspace`: Scan all files in the current workspace.
- `Semgrep: Update rules`: For logged-in users. If the rules in the [Policies](https://semgrep.dev/orgs/-/policies) or rules included through the **Semgrep › Scan: Configuration** configuration option have been changed, this command loads the new configuration of your rules for your next scan.
- `Semgrep: Search by pattern`: Search for patterns in code using Semgrep pattern syntax. For more information, see [Pattern syntax](https://semgrep.dev/docs/writing-rules/pattern-syntax/) documentation.

Tip: You can also click the Semgrep icon in the Visual Studio Code to quickly access all available commands.