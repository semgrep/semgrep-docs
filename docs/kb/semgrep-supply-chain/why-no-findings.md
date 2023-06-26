---
description: Troubleshoot why findings for Semgrep Supply Chain are not showing.
tags:
  - Semgrep Supply Chain
---
# Why aren't Supply Chain findings showing?

## Ensure compatibility

First, verify that your repository meets the basic requirements for Semgrep Supply Chain:

### Are the language and ecosystem supported?

Check the [Supported Languages table](/docs/supported-languages/#general-availability) for support for the project's language and ecosystem, as well as any ecosystem-specific requirements.

###  Is the supported lockfile present in an appropriate location with the expected name?

Lockfiles can be present in the root of the repository, or in subdirectories, for monorepos. Only the lockfile names indicated in the [Supported Languages table](/docs/supported-languages/#general-availability) are recognized by Semgrep Supply Chain.

### Does the lockfile contain dependencies with pinned versions?

If your dependency file is a [manifest file](/docs/semgrep-supply-chain/glossary/#manifest-file) and contains unpinned versions, Semgrep Supply Chain does not report vulnerabilities for the dependencies that are not pinned. An unpinned dependency may already be installed at a safe version for a particular [Advisory](https://semgrep.dev/docs/semgrep-supply-chain/glossary/#advisory).

Pinned dependencies can be analyzed even if the file contains other unpinned dependencies. Manifest files can also be helpful to determine whether a dependency is [transitive](/docs/semgrep-supply-chain/glossary/#transitive-or-indirect-dependency).

## Check scan status and result location

Next, ensure that the scan was successful and sent results to the expected location.

### Did the scan run successfully?

If the scan did not complete, or failed when trying to send results, the dependency information will not be available.

Review the logs from the scan and determine whether it was successful, or ran into an issue. Common issues include:

* The lockfile could not be parsed successfully. The CI output should point to the line where the error occurred.
  - If the lockfile contains any special or additional details, such as environmental markers, variables, or hashes specific to your organization, those may affect parse results.
* Data was sent to a different Semgrep organization than expected.
  - Check other organizations you belong to in Semgrep Cloud Platform to see if the results appear there.
  - If you are running `semgrep ci` locally, use `semgrep logout` and `semgrep login`, and ensure you log in to the desired Semgrep Cloud Platform organization.

### If the scan was a diff-aware (PR/MR) scan, was the lockfile modified? 

Semgrep Supply Chain only runs in [diff-aware scans](/docs/semgrep-ci/running-semgrep-ci-with-semgrep-cloud-platform/#diff-aware-scanning) if the lockfile was modified in the PR/MR.

If code is modified, but the lockfile is not, Supply Chain does not analyze the changes. Any code changes that might impact [reachability](/docs/semgrep-supply-chain/glossary/#reachability) will be identified on the next full scan.

### Did Semgrep scan a ref other than your default branch, or does your default branch have a less common name?

Currently, Semgrep Supply Chain only displays findings on one of the following branches in Semgrep Cloud Platform:

* The repository's default branch, if that information is available. This information is typically available for CI scans performed through GitHub Actions.
* One of a set of standard default branch names, including `develop` (or `development`), `main`, `master`, and `trunk`.

If a scan runs on a different branch, findings do not show in Semgrep Cloud Platform. This prevents vulnerability findings from persisting incorrectly after they have been resolved on the repository's primary branch.

## Additional references

If the project uses Java and Apache Maven with `pom.xml`, see [Setting up SSC scans for specific project management tools:
Apache Maven (Java)](/docs/semgrep-supply-chain/getting-started/#apache-maven-java).

## If you're still having trouble

If you've addressed these issues but are still not seeing vulnerability findings, or if you need assistance setting up Semgrep Supply Chain for your projects, such as handling lockfile naming or addressing parsing issues, please [reach out for help](docs/support/).