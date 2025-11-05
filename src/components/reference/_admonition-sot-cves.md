### Semgrep Supply Chain rule update frequency

Semgrep ingests CVE information and security advisories from the following sources:

- [<i class="fas fa-external-link fa-xs"></i> Reviewed GitHub Security Advisories](https://github.com/advisories?query=type%3Areviewed)
- [<i class="fas fa-external-link fa-xs"></i> Electron release notes](https://releases.electronjs.org/releases/stable)

Semgrep processes new information at least once per day to:

* Generate rules for new security advisories
* Update rules based on changes to existing security advisories
