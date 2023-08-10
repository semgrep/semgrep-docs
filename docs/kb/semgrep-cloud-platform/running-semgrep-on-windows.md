---
description: Use this reference to run Semgrep on Windows systems.
tags:
  - Windows
  - Visual Studio Code
  - WSL
  - Docker
---

# Running Semgrep on Windows

If you look at [Semgrep documentation](https://semgrep.dev/docs/getting-started/#installing-and-running-semgrep-locally) there are two alternatives to execute Semgrep on Windows.
The first one is to install WSL: Windows Subsystem for Linux and the second one will be a Docker execution.
> **Note:** Install Semgrep as Python package is not an alternative at the time this article is being written (August 2023).

# Windows Subsystem for Linux (WSL) option
[Install WSL](https://learn.microsoft.com/en-us/windows/wsl/install) in your Windows allows you to install Semgrep as a Python package. 
Then, you can invoke Semgrep from Windows or from WSL depending on your needs.

From WSL scanning a Windows folder:
```
semgrep scan --config=auto "/mnt/c/YOUR_PROJECT_PATH"
```
Where `/mnt/c/YOUR_PROJECT_PATH` is the Windows path to the project being scanned.

From Windows using a Semgrep instance installed on WSL and scanning a Windows project:
```
cd YOUR_PROJECT_PATH
wsl /home/USER/.local/bin/semgrep scan --config=auto .
```

Where `/home/USER/.local/bin/semgrep` is the path to Semgrep executable in your WSL system.

# Docker option
Once you install [Docker for Windows](https://docs.docker.com/desktop/install/windows-install/) you can invoke Semgrep with the next docker command:

```
docker run --rm -v "%cd%:/src" returntocorp/semgrep semgrep --config=auto
```

Where `%cd%` is the current directory. Equivalent to ${PWD} in Linux systems.

If you need to pass some environment variables such as SEMGREP_APP_TOKEN you can use flag -e or --env as described in the [docker documentation](https://docs.docker.com/engine/reference/commandline/run/):
```
docker run --rm -v "%cd%:/src" -e SEMGREP_APP_TOKEN=YOUR_SEMGREP_TOKEN returntocorp/semgrep semgrep ci
```

# What happens with Visual Studio Code
Semgrep has developed an [extension](https://semgrep.dev/docs/extensions/semgrep-vs-code/) to be used in Visual Studio Code. 
The good news is that it can be used in a Visual Studio Code installed on Windows.
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

> **Note:** To write this article a Windows 10 was used to test.

> **Note:** As the date to write this article (August 2023) install Semgrep as a Python package is not supported, please, check in the [Semgrep documentation](https://semgrep.dev/docs/getting-started/#installing-and-running-semgrep-locally) if it is already supported.
