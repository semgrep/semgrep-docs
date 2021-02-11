# Integrations

Semgrep provides integrations with 3rd party services like Slack and GitHub. When integrations are configured, you can receive emails about Semgrep findings and failures. To configure these and learn more, visit [Dashboard > Integrations](https://semgrep.dev/manage/notifications).

- [Slack](#slack-notifications)
- [Email](#email-notifications)
- [GitHub PR Comments](#automatic-pr-comments)

#### Slack

To receive slack notifications about Semgrep findings, visit [Dashboard > Integrations](https://semgrep.dev/manage/notifications) and select 'Add integration' or 'Setup First Integration' and then choose 'Slack'. Give your channel a name, and then follow the setup instructions on the page to retrieve your Slack URL. 

![An empty Slack channel integration that still needs to be filled in](img/notification-setup.png "An empty Slack channel integration that still needs to be filled in")

Use the 'Test' button to send a test notification and ensure that your channel is configured properly.

![A correctly configured Slack webhook will send a notification like this](img/test-notification.png "Correctly configured webhook will send a notification like this")

#### Email

To receive email notifications about Semgrep findings, visit [Dashboard > Integrations](https://semgrep.dev/manage/notifications) and select 'Add integration' or 'Setup First Integration,' and then choose 'Email'. Enter your email address, give the channel a name of your choosing, and then click 'Save'.

On each scan that has at least one finding, you will receive one email from Semgrep with a summary of all of the findings from that scan.

#### Automatic PR Comments

!!! info
    This feature is currently only available for GitHub. There’s no need to create `secrets.GITHUB_TOKEN` yourself because it’s automatically set by GitHub. It only needs to be passed to the action via the workflow file.

Comments are left when a Semgrep rule finds a result, the policy that contained the rule had [PR Comments](managing-policy.md#changing-policy-actions) selected, and a GITHUB_TOKEN is configured.

To get inline PR comments on your pull requests, set the `GITHUB_TOKEN` environment variable in your workflow file to `secrets.GITHUB_TOKEN`, which is the GitHub app installation access token and takes the form of this snippet:

```
uses: returntocorp/semgrep-action@v1
        env: # Optional environment variable for automatic PR comments
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

See a complete example of this workflow file including this environment variable (commented out) in the [CI Providers](providers.md) section.

Automated comments on Github pull requests will look like this:

![Github Pull Request Comment](img/semgrep-pull-request.png "Comments on Github Pull Request")

As always, please reach out to [support@r2c.dev](mailto:support@r2c.dev) to report any issues.
<br /><br />