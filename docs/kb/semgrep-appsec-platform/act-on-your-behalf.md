---
description: "Understand GitHub authorization and permissions."
tags:
  - Semgrep AppSec Platform
  - Deployment
---

# What does "Act on your behalf" mean?

**Act on your behalf** is a permission that GitHub requires of all third-party apps that verify a user's identity, that is, when GitHub is used as an identity provider (IdP). The actual scope of this permission is limited to what the user explicitly permits. As stated in the [GitHub documentation](https://docs.github.com/en/apps/using-github-apps/authorizing-github-apps#about-github-apps-acting-on-your-behalf):

> The GitHub App can only do things that both you and the app have permission to do.

This restriction also applies to read and write permissions&mdash;for example, you have to explicitly grant read and write permissions on a granular level for an app to act on your behalf.

At the start of your Semgrep onboarding experience, the resource granted is your **email address**, but Semgrep itself never acts on your behalf.

![You grant Semgrep read access to your email address when you sign in for the first time.](/img/new-onboarding.png#md-noborder)
_**Figure**. You grant Semgrep read access to your email address when you sign in for the first time._

## How to detect when an app acts on your behalf

<!-- vale off -->
When an action is undertaken by an app on your behalf, GitHub adds a label **&mdash; with <span className="placeholder">NAME_OF_APP</span> app**.
<!-- vale on -->

![GitHub **ExampleApp** performing an action on behalf of a user.](/img/github-act-on-your-behalf.png)
_**Figure**. GitHub **ExampleApp** performing an action on behalf of a user._

In contrast, the Semgrep GitHub app performs the action it's permitted to perform as itself. It does not use your identity to perform any actions. You can see this when Semgrep posts PR comments:

![The Semgrep GitHub app commenting on a pull request as itself.](/img/semgrep-not-acting-on-your-behalf.png#md-noborder)
_**Figure**. The Semgrep GitHub app commenting on a pull request as itself._

## Further reading

- [Permissions required by Semgrep for scanning a remote repository](/deployment/checklist#appendices)
