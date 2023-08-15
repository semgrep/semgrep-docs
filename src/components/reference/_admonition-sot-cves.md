:::info
- Semgrep uses **[GitHub Security Advisory (GHSA)](https://github.com/advisories)** as the source of truth for advisories and rule coverage.
- Semgrep runs a script every day that performs the following:
    - Generates new rules from new GHSAs.
    - Updates dependency **lockfile-only** rules. Update-only rules are rules that do not perform reachability analysis. These rules are on par with [GitHub Dependabot](https://github.com/dependabot) functionality.
:::
