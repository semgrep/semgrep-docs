<<<<<<< HEAD
### Rule update frequency
=======
### New CVEs and rule updates
>>>>>>> main

Semgrep ingests CVE information and security advisories from the following sources:

- [<i class="fas fa-external-link fa-xs"></i> Reviewed GitHub Security Advisories](https://github.com/advisories?query=type%3Areviewed)
- [<i class="fas fa-external-link fa-xs"></i> Electron release notes](https://releases.electronjs.org/releases/stable)
- [<i class="fas fa-external-link fa-xs"></i> OSV](http://osv.dev/)

Semgrep processes new information multiple times per day, ensuring a maximum lag time of no more than one hour. With this information, Semgrep:

<<<<<<< HEAD
- Generate rules for new security advisories
- Update rules based on changes to existing security advisories
=======
* Generates rules for new security advisories
* Updates existing rules based on changes to security advisories

For major incidents that might affect customers, Semgrep's Security Research team ships its own advisories, even before third-party databases are updated. Semgrep processes [KEVs](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) the same way it processes other types of vulnerabilities.
>>>>>>> main
