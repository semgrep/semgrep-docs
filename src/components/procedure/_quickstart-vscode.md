1. [Install the Semgrep extension](https://code.visualstudio.com/docs/editor/extension-marketplace#_install-an-extension). If you're unfamiliar with installing VS Code extensions, see the Extension Marketplace's article [Install an Extension](https://code.visualstudio.com/docs/editor/extension-marketplace#_install-an-extension).
2. Use <kbd>Ctrl+⇧Shift+P</kbd> or <kbd>⌘Command+⇧Shift+P</kbd> (macOS) to launch the Command Palette, and run the following to sign in to Semgrep AppSec Platform:
   ```console
   Semgrep: Sign in
   ```
   You can use the extension without signing in, but doing so enables better results since you benefit from [Semgrep Code](/semgrep-code/overview) and its [Pro rules](/semgrep-code/pro-rules).
3. Launch the Command Palette using <kbd>Ctrl+⇧Shift+P</kbd> or <kbd>⌘Command+⇧Shift+P</kbd> (macOS), and scan your files by running:
   ```console
   Semgrep: Scan all files in workspace
   ```
4. To see detailed vulnerability information, hover over the code underlined in yellow. You can also see the findings identified by Semgrep using <kbd>⇧Shift+Ctrl+M</kbd> or <kbd>⌘Command+⇧Shift+M</kbd> (macOS) and opening the **Problems** tab.
