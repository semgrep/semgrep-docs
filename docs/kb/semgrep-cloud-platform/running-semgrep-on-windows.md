---
description: Use this reference to run Visual Studio Code on Windows systems with the Semgrep extension.
tags:
  - Windows
  - Visual Studio Code
  - WSL
---

# Visual Studio Code and Semgrep on Windows
Semgrep has developed an [extension](https://semgrep.dev/docs/extensions/semgrep-vs-code/) to be used in Visual Studio Code. 
The extension can be used in Visual Studio Code installed on Windows, but you'll need to install WSL and add Semgrep to it.
The steps to install and use it are as follow:

1. Install WSL. 
2. Install [Semgrep on WSL as Python package.](https://semgrep.dev/docs/getting-started/#installing-and-running-semgrep-locally)
3. Run `semgrep login` to get the login URL for the Semgrep Cloud Platform. Open the login URL in the browser and login.
4. Install Visual Studio Code on Windows, you can use [this guide.](https://code.visualstudio.com/docs/setup/windows)
5. Install WSL extension for Visual Studio Code. Check [these steps.](https://code.visualstudio.com/docs/remote/wsl)
6. Install Semgrep extension for Visual Studio Code. Check [how to install an extension.](https://code.visualstudio.com/docs/editor/extension-marketplace#_install-an-extension)
7. Open the project from the Windows Command line with commands as `code /mnt/c/PATH_TO_TO_YOUT_PROJECT`

You can scan with Semgrep now, clicking on the Semgrep icon in the right down corner!

![image info](/img/kb/vscode-windows.png)

:::info
This setup has been tested on Windows 10 with VS Code <X> and Semgrep <Y>. If you're having trouble with installation on other versions, [reach out to us](/docs/support). 
:::

> **Note:** As the date to write this article (August 2023) install Semgrep as a Python package is not supported, please, check in the [Semgrep documentation](https://semgrep.dev/docs/getting-started/#installing-and-running-semgrep-locally) if it is already supported.
