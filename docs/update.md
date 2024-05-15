---
slug: update
append_help_link: true
description: "Update Semgrep by running the correct commands for your environment or operating system."
title: Update Semgrep
hide_title: true
---



# Update Semgrep

Stay up-to-date by running the latest version of Semgrep automatically in CI or your local CLI.

For Docker users, enter the following commands:

```sh
docker pull semgrep/semgrep:latest

# confirm your Semgrep installation
docker run --rm semgrep/semgrep semgrep --version
```

You can also use the following commands in either your CLI or CI environment:

```sh
# macOS users only, using Homebrew
brew upgrade semgrep

# macOS, Linux, or Windows Subsystem for Linux (WSL) users, using pip
python3 -m pip install --upgrade semgrep

# confirm your Semgrep installation
semgrep --version
```
