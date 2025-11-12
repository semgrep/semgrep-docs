---
description: Learn why the count of dependencies differs across various pages in Semgrep AppSec Platform.
tags:
 - Semgrep AppSec Platform
 - Semgrep Supply Chain
---

# Why does the Projects page display a different dependency count from the Dependencies page?

The **Projects** page displays the count of individual dependency entries in the latest full scan for the project. The **Dependencies** page shows only unique entries for a dependency, taking into account its lockfile and transitivity status. Dependencies that appear more than once indicate their line locations on hover.

The **Dependencies** page also [loads only the first ten dependency sources](/semgrep-supply-chain/dependency-search#view-additional-manifest-files-or-lockfiles) by default. Load additional dependency sources to see the full count.
