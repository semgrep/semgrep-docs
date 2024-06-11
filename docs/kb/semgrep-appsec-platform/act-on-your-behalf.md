---
description: "Understand GitHub authorization and permissions."
tags:
  - Semgrep AppSec Platform
  - Deployment
---

# What does "Act on your behalf" mean?

"Act on your behalf" is a permission that GitHub requires of all third-party GH apps that verify an identity, that is, when GitHub is used as an identity provider (IdP). The actual scope of that permission is limited to what the user explicitly permits. As stated in the GitHub documentation:

> The GitHub App can only act on your behalf on resources you grant it access to.

This also applies to read and write permissions&mdash;you have to explicitly grant those permissions on a granular level.

At the start of your Semgrep onboarding experience, the resource granted is your **email address**, but Semgrep itself never acts on your behalf.

(Screenshot)

## How to detect when an app "acts on your behalf"

When an action is undertaken by an app on your behalf, it adds a label "-- with NAME_OF_APP app." 

In contrast, the Semgrep GitHub app performs the action it is permitted to perform as itself. It does not use your identity to perform any actions. You can see this when Semgrep posts PR comments:

Instead, what Semgrep app actually does is just the action itself, that it was permitted to do, not "on your behalf", but as the semgrep-app itself.

In the onboarding flow, there's a "learn more" link, which IIRC leads to this documentation: https://docs.github.com/en/apps/using-github-apps/authorizing-github-apps - I have highlighted relevant sections and attached them as screenshots.

Lastly, if you want to view the actual permissions Semgrep requires to scan with, you can do so here: https://semgrep.dev/docs/deployment/checklist#appendices
We ask for permissions granularly, depending on the feature and scope that the user wants to enable.
You will notice that in the Semgrep permissions documentation, it says Semgrep never "acts on your behalf". How can we say this? For example, if Semgrep acted on your behalf, a PR comment would be Robin Corr --with Semgrep App. (see attached screenshot from GitHub, where a comment is posted "with ExampleApp"). Semgrep doesn't do that. Semgrep just straight up posts PR comments as semgrep app (see screenshot, where it is tagged as a bot).
I hope this help
