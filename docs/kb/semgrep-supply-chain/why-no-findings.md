---
description: Troubleshoot why findings for Semgrep Supply Chain are not showing.
tags:
  - Semgrep Supply Chain
---
# Why aren't Supply Chain findings showing?

## Ensure compatibility

First, verify that your repository meets the basic requirements for Semgrep Supply Chain:

### Are the language and ecosystem supported?

Check the [Supported Languages table](/docs/supported-languages/#general-availability) to verify support for the project's language and ecosystem, as well as any ecosystem-specific requirements.

###  Is the supported lockfile present in an appropriate location with the expected name?

Semgrep Supply Chain searches the parent directories of any code files for the nearest relevant lockfile. Monolithic repositories (monorepos) have their findings grouped based on the lockfiles present in subdirectories.

Semgrep Supply Chain only recognizes the lockfile names indicated in the [Supported Languages table](/docs/supported-languages#general-availability).

[Reach out for help](#if-youre-still-having-trouble) if you run into trouble with lockfile location or naming.

### Does the lockfile contain dependencies with exact versions?

If your dependency file is a [manifest file](/docs/semgrep-supply-chain/glossary#manifest-file) and does not specify exact (pinned) versions for all dependencies, Semgrep Supply Chain does not report vulnerabilities for the dependencies that are not pinned. This is because an unpinned dependency may already be installed at a safe version for a particular [Advisory](/docs/semgrep-supply-chain/glossary#advisory), and not require upgrade.

Pinned dependencies can be analyzed even if the file contains other unpinned dependencies. Manifest files can also be helpful to determine whether a dependency is [transitive](/docs/semgrep-supply-chain/glossary#transitive-or-indirect-dependency).

## Check scan status and result location

Next, ensure that the scan was successful and sent results to the expected location.

### Did the scan run successfully?

If the scan did not complete, or failed when trying to send results, the dependency information will not be available.

Review the logs from the scan and determine whether it was successful, or ran into an issue.

#### Lockfile parsing failure

The lockfile may not have been parsed successfully. The CI output should point to the line where the error occurred. Here is an example from a failed attempt to parse a `Pipfile.lock` (Python):

```
Error Returned: Failed to parse app/Pipfile** at 40:1 - expected one of ['([^\\s=]+)\\s*=\\s*', 'EOF', '\\n+'] 40 | [requires]
```

If the lockfile contains any special or additional details, such as environmental markers, variables, or hashes specific to your organization, those may affect parse results. [Reach out for help](#if-youre-still-having-trouble) if you run into this!

#### Data sent to a different organization

If the scan did run successfully, the scan data may have been sent to a different Semgrep organization than expected.

* Check other organizations you belong to in Semgrep AppSec Platform to see if the results appear there.
* If you are running `semgrep ci` locally, use `semgrep logout` and `semgrep login`, and ensure you log in to the desired Semgrep AppSec Platform organization.

### If the scan was a diff-aware (PR/MR) scan, was the lockfile modified?

Semgrep Supply Chain only runs in [diff-aware scans](/docs/semgrep-ci/running-semgrep-ci-with-semgrep-appsec-platform/#diff-aware-scanning) if the lockfile was modified in the PR/MR.

If code is modified, but the lockfile is not, Supply Chain does not analyze the changes. Any code changes that might impact [reachability](/docs/semgrep-supply-chain/glossary#reachability) will be identified on the next full scan.

### Did Semgrep scan a ref other than your default branch, or does your default branch have a less common name?

If the Semgrep Supply Chain scan ran on a branch other than the default, or a default branch with a less common name, make sure to select the desired branch on the Vulnerabilities page to see findings.

![Branch selector with branch options shown](/img/kb/ssc-branch-selector.png)

Using the example in the screenshot, to see vulnerabilities from `new-vuln-branch`, select it from the list.

By default, the Vulnerabilities page displays vulnerabilities from:

* The repository's default branch, if that information is available. This information is typically available for CI scans performed through GitHub Actions.
* One of a set of standard default branch names, such as:
  * `develop` (or `development`)
  * `main`
  * `master`
  * `trunk`

### Are all findings in the scan unreachable vulnerabilities?

By default, Semgrep AppSec Platform shows only [reachable](/docs/semgrep-supply-chain/glossary#reachability) vulnerabilities in the UI. 

To see all vulnerabilities, select all boxes under the "Exposure" filter.

![Exposure filter with all boxes selected](/img/kb/ssc-vuln-filter.png)

## Additional references

If the project uses Java and Apache Maven with `pom.xml`, see [Setting up SSC scans for specific project management tools:
Apache Maven (Java)](/semgrep-supply-chain/setup-maven).

## If you're still having trouble

If you've addressed these issues but are still not seeing vulnerability findings, or if you need assistance setting up Semgrep Supply Chain for your projects, such as handling lockfile naming or addressing parsing issues, [reach out for help](/docs/support).
