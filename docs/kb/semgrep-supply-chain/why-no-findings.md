---
description: Troubleshoot why findings for Semgrep Supply Chain are not showing.
tags:
  - Semgrep Supply Chain
---
# Why aren't my Supply Chain findings showing?

## Ensure compatibility

First, check that your repository meets the basic requirements for Semgrep Supply Chain:

* Is the language and ecosystem [supported](/docs/supported-languages/#general-availability)?

###  Is the supported lockfile present in an appropriate location with the expected name?

Lockfiles can be present in the root of the repository, or in subdirectories, for monorepos.

### Does the lockfile contain dependencies with pinned versions?

If your dependency file is a [manifest file](/docs/semgrep-supply-chain/glossary/#manifest-file) and contains unpinned versions, Semgrep Supply Chain will not be able to report vulnerabilityes the dependencies that are not pinned. An unpinned dependency may already be installed at a safe version for a particular Advisory. 

Pinned dependencies can be analyzed even if the file contains other unpinned dependencies. Manifest files can also be helpful to determine whether a dependency is [transitive](/docs/semgrep-supply-chain/glossary/#transitive-or-indirect-dependency). 

## Check scan status and result location

Next, ensure that the scan was successful and sent results to the expected location.

### Did the scan run successfully?

If the scan did not complete, or failed when trying to send results, the dependency information will not be available.

Review the error logs from the scan and determine the issue. Here are a few common possibilities:

* The lockfile could not be parsed successfully. The CI output should point to the line where the error occurred.
  - If the lockfile contains any special or additional details, such as environmental markers, variables, or hashes specific to your organization, those may affect parsing success.
* Data was sent to a different Semgrep organization than expected.
  - Check other organizations in Semgrep Cloud Platform to see if the results appear there.
  - If you are running `semgrep ci` locally, use `semgrep logout` and `semgrep login`, and ensure you log in to the desired Semgrep Cloud Platform organization.

### If the scan was a diff-aware (PR/MR) scan, was the lockfile modified? 

Semgrep Supply Chain only runs in [diff-aware scans](/docs/semgrep-ci/running-semgrep-ci-with-semgrep-cloud-platform/#diff-aware-scanning) if the lockfile was modified in the PR/MR.

If code is modified, but the lockfile is not, Supply Chain will not analyze the changes. Any code changes that might impact [reachability](/docs/semgrep-supply-chain/glossary/#reachability) will be identified on the next full scan.

### Did you scan a ref other than your default branch, or does your default branch have a less common name?

Currently, Semgrep Supply Chain only displays findings on one of the following branches in Semgrep Cloud Platform:

* The repository's default branch, if that information is available. This information is typically available for CI scans performed through GitHub Actions.
* One of a set of standard default branch names, including `develop`, `main`, `master`, and `trunk`.

If you perform a scan on another branch, findings will not appear in Semgrep Cloud Platform. This prevents vulnerability findings from persisting incorrectly after they have been resolved on the repository's primary branch.

## Additional references

If you are using Apache Maven and `pom.xml` with Java, see [Setting up SSC scans for specific project management tools:
Apache Maven (Java)](/docs/semgrep-supply-chain/getting-started/#apache-maven-java).

