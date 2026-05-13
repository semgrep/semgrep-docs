### New CVEs and rule updates

Semgrep ingests CVE information and security advisories from the following sources:

- [<i class="fas fa-external-link fa-xs"></i> Reviewed GitHub Security Advisories](https://github.com/advisories?query=type%3Areviewed)
- [<i class="fas fa-external-link fa-xs"></i> Electron release notes](https://releases.electronjs.org/releases/stable)
- [<i class="fas fa-external-link fa-xs"></i> OSV](http://osv.dev/)

Semgrep processes new information at least four times per day, ensuring a maximum lag time of no more than six hours. With this information, Semgrep:

* Generates rules for new security advisories
* Updates existing rules based on changes to security advisories

For active incidents, Semgrep's security response team can ship its own advisories, including rules, before third-party databases are updated. Semgrep processes [KEVs](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) the same way it processes other types of vulnerabilities.