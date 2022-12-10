Adding a repository from SCM providers such as GitHub or GitLab ensures that Semgrep scans your codebase every time a PR or MR is created.

:::info Prerequisite
A GitHub or GitLab SaaS repository associated with your account.
:::

To add a repository from GitHub or GitLab, follow these steps:

1. Ensure you are signed in to Semgrep App.
2. Click **[Projects](https://semgrep.dev/orgs/-/projects)** on the left sidebar.
3. Optional: If you do not see the repository you want to add in the **Projects** page of Semgrep app, follow the steps in the succeeding sections to ensure that Semgrep App can detect the repository.
4. Click **Scan new project**, and then click **Run scan in CI**.
5. Select which repository provider for Semgrep to integrate with.
6. Follow instructions displayed on Semgrep App page for your particular repository provider.
7. Optional: For **GitHub Actions**. If you do not see the repository you want to add, adjust [GitHub Application's Repository Access](https://github.com/settings/installations) configuration. See [Detecting GitHub repositories](#detecting-github-repositories) for more information.
8. If successful, Semgrep App scans the repository for the first time using default, pre-selected rules.
