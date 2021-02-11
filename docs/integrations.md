# CI Integrations

Semgrep CI provides integrations with 3rd party services like Slack and GitHub. When integrations are configured, you can receive notifications about Semgrep CI findings and failures. To configure these and learn more, visit [Dashboard > Integrations](https://semgrep.dev/manage/notifications).

- [Slack](#slack)
- [Email](#email)
- [PR comments](#pr-comments)

### Slack

To receive Slack notifications about Semgrep findings on pull requests and code pushes, visit [Dashboard > Integrations](https://semgrep.dev/manage/notifications) and select 'Add integration' or 'Setup First Integration' and then choose 'Slack'. Give your channel a name, and then follow the setup instructions on the page to retrieve your Webhook URL. 

![An empty Slack channel integration that still needs to be filled in](img/notification-setup.png "An empty Slack channel integration that still needs to be filled in")

Use the 'Test' button to send a test notification and ensure that your channel is configured properly.

![A correctly configured Slack webhook will send a notification like this](img/test-notification.png "Correctly configured webhook will send a notification like this")

### Email

To receive email notifications about Semgrep findings on pull requests and code pushes, visit [Dashboard > Integrations](https://semgrep.dev/manage/notifications) and select 'Add integration' or 'Setup First Integration,' and then choose 'Email'. Enter your email address, give the channel a name of your choosing, and then click 'Save'.

On each scan that has at least one finding, you will receive one email from Semgrep with a summary of all of the findings from that scan.

### PR comments

!!! info
    This feature is currently only available for GitHub. There’s no need to create `secrets.GITHUB_TOKEN` yourself because it’s automatically set by GitHub. It only needs to be passed to the action via the workflow file.

Pull request comments are left when

1. Semgrep finds a result in CI 
2. [the CI policy has PR comments enabled](managing-policy.md#changing-policy-actions), and
3. a GITHUB_TOKEN is configured as follows

```
uses: returntocorp/semgrep-action@v1
        env: # Optional environment variable for automatic PR comments
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

See a complete example of this workflow file including this environment variable (commented out) in the [CI Providers](sample-ci-configs.md#github-actions) section.

Automated comments on GitHub pull requests will look like this:

![GitHub Pull Request Comment](img/semgrep-pull-request.png "Comments on GitHub Pull Request")
