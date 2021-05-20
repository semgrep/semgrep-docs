---
append_help_link: true
---

# CI Integrations

Semgrep CI provides integrations with 3rd party services like Slack and GitHub. When integrations are configured, you can receive notifications about Semgrep CI findings and failures. To configure these and learn more, visit [Dashboard > Integrations](https://semgrep.dev/manage/integrations).

- [CI Integrations](#ci-integrations)
    - [Slack](#slack)
    - [Email](#email)
    - [Pull request comments](#pull-request-comments)

### Slack

To receive Slack notifications about Semgrep findings on pull requests and code pushes, visit [Dashboard > Integrations](https://semgrep.dev/manage/integrations) and select 'Add integration' or 'Setup First Integration' and then choose 'Slack'. Give your channel a name, and then follow the setup instructions on the page to retrieve your Webhook URL.

![An empty Slack channel integration that still needs to be filled in](img/notification-setup.png "An empty Slack channel integration that still needs to be filled in")

Use the 'Test' button to send a test notification and ensure that your channel is configured properly.

![A correctly configured Slack webhook will send a notification like this](img/test-notification.png "Correctly configured webhook will send a notification like this")

### Email

To receive email notifications about Semgrep findings on pull requests and code pushes, visit [Dashboard > Integrations](https://semgrep.dev/manage/integrations) and select 'Add integration' or 'Setup First Integration,' and then choose 'Email'. Enter your email address, give the channel a name of your choosing, and then click 'Save'.

On each scan that has at least one finding, you will receive one email from Semgrep with a summary of all of the findings from that scan.

### Pull request comments

<!-- prettier-ignore-start -->
!!! info
    This feature is currently only available for GitHub.
<!-- prettier-ignore-end -->

Pull request comments are left when

1. Semgrep finds a result in CI, and
2. [the CI policy has pull request comments enabled](managing-policy.md#changing-policy-actions)

Automated comments on GitHub pull requests look like this:

![GitHub Pull Request Comment](img/semgrep-pull-request.png "Comments on GitHub Pull Request")

Note that [Semgrep App](https://semgrep.dev) uses the permissions requested by [the Semgrep GitHub App](https://github.com/marketplace/semgrep-dev) to leave PR comments.

If you are using Github Actions to run Semgrep, no extra changes are needed to get PR comments. If you are using another CI provider, in addition to the environment variables you set after following [sample CI configurations](sample-ci-configs.md) you need to ensure that the following environment variables are correctly defined:

- `SEMGREP_COMMIT` is set to the full commit hash of the code being scanned (e.g. `d8875d6a63bba2b377a57232e404d2e367dce82d`)
- `SEMGREP_PR_ID` is set to the PR number of the pull request on Github (e.g. `2900`)
- `SEMGREP_REPO_NAME` is set to the repo name (e.g. `returntocorp/semgrep`)
