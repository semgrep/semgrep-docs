---
slug: upgrading
append_help_link: true
description: "Update Semgrep by running the correct commands for your environment or operating system."
title: Updating Semgrep
hide_title: true
---

import MoreHelp from "/src/components/MoreHelp"

# Updating Semgrep

We [release new Semgrep versions](https://github.com/returntocorp/semgrep/releases) often, with many performance and bug improvements. 

Stay up to date by running the latest version of Semgrep automatically in CI. Or use the following commands:

Using Homebrew:
```sh
brew upgrade semgrep
```

Using pip:
```sh
python3 -m pip install --upgrade semgrep
```

Using Docker:
```sh
docker pull returntocorp/semgrep:latest
```


<MoreHelp />
