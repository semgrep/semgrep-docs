# How to scan multiple or nested lock files

Semgrep Supply Chain uses lockfiles as part of its reachability analysis by determining the exact version of a dependency that a codebase is using.  Semgrep scan reliably parses lockfiles - go.mod’s, gemfile.lock’s, package-lock.json, requirement.txt, etc - to articulate all packages, libraries sourced in the compilation and subsequently report on known, associated common vulnerabilities and exposures (CVE’s).  

By default, Semgrep sources any lockfiles located only  in a repo’s top-level directory.  If the repo carries multiple lockfiles, nested in other locations, you can still achieve full coverage by temporarily moving these nested lockfiles to the top-level directory, assuming they have unique names.  Semgrep will scan all lockfiles in the top-level directory of a repo. 

You can reference all supported lock file types here: 
https://semgrep.dev/docs/supported-languages/#general-availability
