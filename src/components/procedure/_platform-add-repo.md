Adding a repository from GitHub, GitLab, or BitBucket enables Semgrep Cloud Platform to perform many of its core features, such as the ability to record, triage, and manage findings.

:::note
Ensure that:

* You have [connected your Semgrep organization to your source code manager](/semgrep-cloud-platform/user-management/#connecting-a-semgrep-organization-account-to-your-scm).
* Your user account for the CI/CD system has sufficient permissions to edit the pipeline and create environmental variables
:::

To add a repository from GitHub, GitLab, or BitBucket:

1. Ensure you are signed in to Semgrep Cloud Platform.
2. Click **[Projects](https://semgrep.dev/orgs/-/projects)** on the left sidebar.
3. For **GitHub Actions** users only: if you do not see the repository you want to add, adjust [GitHub Application's Repository Access](https://github.com/settings/installations) configuration. See [Detecting GitHub repositories](#detecting-github-repositories) for more information.
4. Click **Scan new project**, and then click **Run scan in CI**.
5. Select which CI provider for Semgrep to integrate with.
6. Follow the instructions displayed on Semgrep Cloud Platform page for your particular CI provider.

You have now added a repository to Semgrep Cloud Platform. A scan begins automatically after adding a new repository.
