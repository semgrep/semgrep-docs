Features dependent on your SCM:

| Feature | GitHub | GitLab | BitBucket |
| ------- | -------- | ------- | -------- |
| **PR or MR comments** |  ✅ Yes | ✅ Yes | ❌ No |

Features dependent on your CI **and** SCM:

| Feature | GitHub | GitLab | BitBucket | CI provider support |
| ------- | -------- | ------- | -------- | ---------------- |
| **Diff-aware scanning** | ✅ Supported | ✅ Supported | ✅ Supported  | ✅ Supported (may need additional set up) | 
| **Hyperlinks** | ✅ Supported | ✅ Supported | ✅ Supported  |  ✅ Supported (may need additional set up) |
| **SCM security dashboard** |  ✅ GitHub Advanced Security Dashboard |  ✅ GitLab Security Dashboard | ❌ No | ❗ Only GitHub Actions and GitLab CI/CD |

For example, if you use CircleCI as your CI provider on a GitHub repository, SCP does not have any support for GitHub Advanced Security Dashboard.

The following list defines the above features.

<dl>
    <dt>Receiving results (findings) as PR or MR comments</dt>
    <dd>This feature enables you to receive <a href="/docs/semgrep-app/notifications/#enabling-github-pull-request-comments">PR or MR comments</a> from Semgrep Cloud Platform on the lines of code that generated a finding.</dd>
    <dt>Diff-aware scanning</dt>
    <dd>Semgrep Cloud Platform can scan only changes in files when running on a pull or merge request (PR or MR). This keeps the scan fast and reduces finding duplication.</dd>
    <dt>Hyperlinks to code</dt>
    <dd>Semgrep Cloud Platform collects findings in a Findings page. In this page, you can click on a finding to return to your SCM (Github, GitLab, or Bitbucket) to view the lines of code in your repository that generated the finding.</dd>
    <dt>SCM security dashboard</dt>
    <dd>Send Semgrep findings to your SCM's security dashboard.</dd>
</dl>
