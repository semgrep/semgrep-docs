Integrations with source code providers, dependent on CI provider:

| Feature                | GitHub with GitHub Actions | GitLab with GL CI/CD | GitHub, GitLab, or BitBucket with other CI providers |
| -------                | -------------------------- | ------------------   | -----------------------                  |
| **Diff-aware scanning**    | ✅                         | ✅                  | ✅  (May need additional set up) |
| **Hyperlinks**             | ✅                         | ✅                  | ✅  (May need additional set up) |
| **PR or MR comments**      | ✅                         | ✅                  | ✅  (May need additional set up) |
| **SCM security dashboard** | ✅ GitHub Advanced Security Dashboard | ✅ GitLab Security Dashboard | ❌ No |

For example, if you use CircleCI as your CI provider on a GitHub repository, Semgrep AppSec Platform does not have any support for GitHub Advanced Security Dashboard.

The following list defines the above features.

<dl>
    <dt>Diff-aware scanning</dt>
    <dd>Semgrep AppSec Platform can scan only changes in files when running on a pull or merge request (PR or MR). This keeps the scan fast and reduces finding duplication.</dd>
    <dt>Hyperlinks to code</dt>
    <dd>Semgrep AppSec Platform collects findings in a Findings page. In this page, you can click on a finding to return to your SCM (Github, GitLab, or Bitbucket) to view the lines of code in your repository that generated the finding.</dd>
    <dt>Receiving results (findings) as PR or MR comments</dt>
    <dd>This feature enables you to receive <a href="/docs/semgrep-code/notifications/#github-pull-request-comments">PR or MR comments</a> from Semgrep AppSec Platform on the lines of code that generated a finding.</dd>
    <dt>SCM security dashboard</dt>
    <dd>Send Semgrep findings to your SCM's security dashboard.</dd>
</dl>
