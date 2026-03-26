| Feature | GitHub with GitHub Actions | GitLab with GL CI/CD | *GitHub, GitLab, or Bitbucket with other CI providers |
| - | - | - | - |
| **Diff-aware scanning** | ✅ | ✅ | ✅ |
| **Hyperlinks** | ✅ | ✅ | ✅ |
| **PR or MR comments** | ✅ | ✅ | ✅ |
| **SCM security dashboard** | ✅ GitHub Advanced Security Dashboard | ✅ GitLab Security Dashboard | ❌ No |

*For example, if you use CircleCI as your CI provider on a GitHub repository, Semgrep AppSec Platform does not have any support for GitHub Advanced Security Dashboard.

### Feature definitions

| Feature | Description |
| - | - |
| Diff-aware scanning | Semgrep AppSec Platform can scan only changes in files when running on a pull request or merge request (PR or MR). This keeps the scan fast and reduces finding duplication. |
| Hyperlinks to code | Semgrep AppSec Platform collects findings in a Findings page. In this page, you can click on a finding to return to your SCM (GitHub, GitLab, or Bitbucket) to view the lines of code in your repository that generated the finding. |
| Receiving results (findings) as PR or MR comments |  This feature enables you to receive PR or MR comments from Semgrep AppSec Platform on the lines of code that generated a finding. |
| SCM security dashboard | Send Semgrep findings to your SCM's security dashboard. |
