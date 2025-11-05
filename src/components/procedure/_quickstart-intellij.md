1. Install the Semgrep extension:
   -  Visit [<i class="fas fa-external-link fa-xs"></i> Semgrep's page on the JetBrains Marketplace](https://plugins.jetbrains.com/plugin/22622-semgrep).
   -  In IntelliJ: **Settings/Preferences > Plugins > Marketplace > Search for `semgrep-intellij` > Install**. You may need to restart IntelliJ for the Semgrep extension to be installed.

2. Sign in: Press <kbd>Ctrl+⇧Shift+A</kbd> (Windows) or <kbd>⌘Command+⇧Shift+A</kbd> (macOS) and sign in to Semgrep AppSec Platform by selecting the following command:
   ```
   Sign in with Semgrep
   ```
3. Test the extension by pressing <kbd>Ctrl+⇧Shift+A</kbd> (Windows) or <kbd>⌘Command+⇧Shift+A</kbd> (macOS) and run the following command:
   ```
   Scan workspace with Semgrep
   ```
4. See Semgrep findings: Hold the pointer over the code that has the red underline.

:::info Feature maturity
Semgrep's IntelliJ extensions are currently in beta. Currently, the IntelliJ extension only supports Semgrep Community Edition (CE) - it doesn't support Semgrep Supply Chain, Secrets, Pro rules, or Pro Engine. Please join the [Semgrep community Slack workspace](http://go.semgrep.dev/slack) and let the Semgrep team know if you encounter any issues.
:::
