---
description: Use this reference to run Visual Studio Code on Windows systems with the Semgrep extension.
tags:
  - Windows
  - Visual Studio Code
  - WSL
---

# Running Semgrep in Visual Studio Code on Windows

:::caution
Beginning with v1.6.2., the [Visual Studio Code extension](https://semgrep.dev/docs/extensions/semgrep-vs-code/) runs natively on Windows, so you do *not* need WSL to use Semgrep's extension.
:::

Semgrep has developed an [extension](https://semgrep.dev/docs/extensions/semgrep-vs-code/) to be used in Visual Studio Code. 
The extension can be used in Visual Studio Code installed on Windows by installing WSL and adding Semgrep to it.
Follow these steps to set up WSL, Semgrep, and the VS Code extension:

1. Install WSL. 
2. Install [Semgrep on WSL as Python package.](https://semgrep.dev/docs/getting-started/#installing-and-running-semgrep-locally)
3. Run `semgrep login` to get the login URL for the Semgrep Cloud Platform. Open the login URL in the browser and login.
4. Install WSL extension for Visual Studio Code. Check [these steps.](https://code.visualstudio.com/docs/remote/wsl)
5. Install Semgrep extension for Visual Studio Code. Check [how to install an extension.](https://code.visualstudio.com/docs/editor/extension-marketplace#_install-an-extension)
6. Open the project in VS Code

Click the Semgrep icon to scan your project (see image below).

![image info](/img/kb/vscode-windows.png)

:::info
This setup has been tested on Windows 11 with VS Code Version: 1.81.0 (Universal) and Semgrep 1.34.0. If you're having trouble with installation on other versions, [reach out to support](/docs/support). 
:::