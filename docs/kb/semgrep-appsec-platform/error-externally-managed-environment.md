---
description: Learn how to handle externally managed environment errors when installing Semgrep, and how to install Semgrep using pipx or uv instead.
tags:
 - Semgrep AppSec Platform
 - Semgrep Code
 - Semgrep Secrets
 - Semgrep Supply Chain
---

# error: externally-managed-environment

If your Python environment is [externally managed by a package manager](https://packaging.python.org/en/latest/specifications/externally-managed-environments/), you can't use `pip` for system-wide installations. This results in the `externally-managed-environment` when you try to use `pip` to install Semgrep.

Error message on macOS:

```console
error: externally-managed-environment

× This environment is externally managed
╰─> To install Python packages system-wide, try brew install
 xyz, where xyz is the package you are trying to
 install.
    
 If you wish to install a Python library that isn't in Homebrew,
 use a virtual environment:
    
 python3 -m venv path/to/venv
 source path/to/venv/bin/activate
 python3 -m pip install xyz
    
 If you wish to install a Python application that isn't in Homebrew,
 it may be easiest to use 'pipx install xyz', which will manage a
 virtual environment for you. You can install pipx with
    
 brew install pipx
    
 You may restore the old behavior of pip by passing
 the '--break-system-packages' flag to pip, or by adding
 'break-system-packages = true' to your pip.conf file. The latter
 will permanently disable this error.
    
 If you disable this error, we STRONGLY recommend that you additionally
 pass the '--user' flag to pip, or set 'user = true' in your pip.conf
 file. Failure to do this can result in a broken Homebrew installation.
    
 Read more about this behavior here: <https://peps.python.org/pep-0668/>

note: If you believe this is a mistake, please contact your Python installation or OS distribution provider. You can override this, at the risk of breaking your Python installation or OS, by passing --break-system-packages.
hint: See PEP 668 for the detailed specification.
```

Error message on Ubuntu:

```console
error: externally-managed-environment

× This environment is externally managed
╰─> To install Python packages system-wide, try apt install
 python3-xyz, where xyz is the package you are trying to
 install.
    
 If you wish to install a non-Debian-packaged Python package,
 create a virtual environment using python3 -m venv path/to/venv.
 Then use path/to/venv/bin/python and path/to/venv/bin/pip. Make
 sure you have python3-full installed.
    
 If you wish to install a non-Debian packaged Python application,
 it may be easiest to use pipx install xyz, which will manage a
 virtual environment for you. Make sure you have pipx installed.
    
 See /usr/share/doc/python3.12/README.venv for more information.

note: If you believe this is a mistake, please contact your Python installation or OS distribution provider. You can override this, at the risk of breaking your Python installation or OS, by passing --break-system-packages.
hint: See PEP 668 for the detailed specification.
```

## How to fix this error

The recommended way to install Semgrep is to use a tool that manages isolated environments for standalone Python applications, such as [`pipx`](https://pipx.pypa.io/stable/) or [`uv`](https://docs.astral.sh/uv/). See the [Python Packaging guide on installing stand-alone command-line tools](https://packaging.python.org/en/latest/guides/installing-stand-alone-command-line-tools/) for more on these tools.

Choose one of the following:

- Install [`pipx`](https://pipx.pypa.io/stable/how-to/install-pipx/), then run `pipx install semgrep`.
- Install [`uv`](https://docs.astral.sh/uv/getting-started/installation/), then run `uv tool install semgrep`. To run a one-off Semgrep command without persistently installing it, use `uvx semgrep`. See the [`uv` tools guide](https://docs.astral.sh/uv/guides/tools/) for more details.
- Install Semgrep using [`homebrew`](https://brew.sh/), with `brew install semgrep`.

If you're already using a custom Python virtual environment, you can install Semgrep in this existing environment instead.
