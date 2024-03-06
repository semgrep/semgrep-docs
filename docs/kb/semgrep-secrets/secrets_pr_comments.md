# Successfully generate PR comments for secrets findings when using custom secrets rules

You Semgrep deployment must meet the required conditions before it can generate
PR comments from findings raised by custom secrets rules. These conditions
differ based on whether you're using Semgrep Code's secrets rules or Semgrep
Secrets.

## For users of Semgrep Code

1. Set your [policy mode to
   **Comment**](/semgrep-code/policies/#blocking-a-pr-or-mr-through-rule-modes).

2. Ensure that your rule *doesn't* include the following line:

    ```console
    product: secrets
    ```

    If your rule includes this directive, Semgrep defaults to producing a
    Semgrep Code finding and a Semgrep Code PR comment.

## For users of Semgrep Secrets

> At this time, Semgrep Secrets supports only the use of GitHub.

1. Set your [policy mode to
   **Comment**](/semgrep-code/policies/#blocking-a-pr-or-mr-through-rule-modes).

2. Ensure that your rule includes the following line:

    ```console
    product: secrets
    ```

:::info
Ensure that the [rules](/semgrep-secrets/rules) you use include [validators](/semgrep-secrets/validators).
:::

## Testing secrets PR comments

Semgrep recommends the following testing steps to ensure that your Semgrep
deployment is configured correctly to push PR comments when it identifies
secrets:

1. Generate a GitHub token with *no* permissions. The token *must* be valid.
2. Add the token to a file in your repository and commit the changes.
3. Scan the repository and check that Semgrep generated a finding and pushed a
   PR comment.

Delete the token when you've completed your test.
