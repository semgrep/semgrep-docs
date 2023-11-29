Adding a repository from GitHub, GitLab, or BitBucket enables Semgrep Cloud Platform to perform many of its core features, such as the ability to record, triage, and manage findings.

* Azure Pipelines
* Bitbucket
* Buildkite
* CircleCI
* GitHub Actions
* GitLab CI/CD
* Jenkins

:::info Prerequisites
* **For GitHub or GitLab SaaS users:** A GitHub or GitLab SaaS repository associated with your account.
* **For BitBucket SaaS users:** A BitBucket repository and sufficient permissions to edit a BitBucket Pipeline and add repository variables.
:::

To add a repository from GitHub, GitLab, or BitBucket, follow these steps:

1. Ensure you are signed in to Semgrep Cloud Platform.
2. Click **[Projects](https://semgrep.dev/orgs/-/projects)** on the left sidebar.
3. Optional: For **GitHub Actions**. If you do not see the repository you want to add, adjust [GitHub Application's Repository Access](https://github.com/settings/installations) configuration. See [Detecting GitHub repositories](#detecting-github-repositories) for more information.
4. Click **Scan new project**, and then click **Run scan in CI**.
5. Select which CI provider for Semgrep to integrate with.
6. Follow the instructions displayed on Semgrep Cloud Platform page for your particular CI provider.

You have now added a repository to Semgrep Cloud Platform. A scan begins automatically after adding a new repository.
