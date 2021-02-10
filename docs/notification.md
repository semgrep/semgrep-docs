# Notifications

Semgrep provides integrations with 3rd party services like Slack, Jira, DefectDojo, and others. To configure these and learn more, visit [Manage > Notifications](https://semgrep.dev/manage/notifications).


#### Automatic PR Comments (beta)

!!! info
    This feature is currently only available for GitHub.

To get inline PR comments on your pull requests, set the `GITHUB_TOKEN` environment variable in your workflow file to `secrets.GITHUB_TOKEN`, which is the GitHub app installation access token and takes the form of this snippet:

```
uses: returntocorp/semgrep-action@v1
        env: # Optional environment variable for automatic PR comments (beta)
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

See a complete example of this workflow file including this environment variable (commented out) in the [above example workflow file](#github-actions).

!!! info
    There’s no need to create `secrets.GITHUB_TOKEN` yourself because it’s automatically set by GitHub. It only needs to be passed to the action via the workflow file.

Comments are left when Semgrep CI finds a result that blocks CI.
Note that this feature is experimental; please reach out to [support@r2c.dev](mailto:support@r2c.dev) to report any issues.
<br /><br />