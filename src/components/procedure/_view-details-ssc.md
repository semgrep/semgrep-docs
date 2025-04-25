To view detailed information about a finding:

1. Within Semgrep AppSec Platform, navigate to the **Supply Chain** page. By default this page loads the **Vulnerabilities** tab.
1. Locate the finding you want to review, then click **Details**.

The details page is divided into several panels:

- General information: 
  - The name of the package and a description of the finding
  - Its reachability, whether it is direct or transitive, its CVE number, EPSS, and severity
  - Its remediation version, if any
  - Links to references
  - A badge indicating if it can cause breaking changes or not (beta)
- Branch and finding history information
  - Which branches it can be found
  - Where it was first detected
  - AI analysis performed, if any
- Graphs and code:
  - **Your code**: the source file in which a match was detected; the highlight indicates where the match was found
  - **Dependency path**: displays the path of dependencies, useful when analyzing transitive dependencies
  - **Pattern** and **Rule**: the pattern and rule logic that determined the match 
