---
description: Why can't I access my Semgrep organization after logging in with GitHub?
tags:
 - GitHub
 - Semgrep AppSec Platform
---

# Why can't I access my Semgrep organization after logging in with GitHub?

When you log in to Semgrep with GitHub authentication, you may be prompted to create a new organization instead of accessing your existing one. This typically happens when there are issues with the GitHub single sign-on (SSO) connection or when the Semgrep GitHub app installation needs to be reviewed by your Semgrep administrator.

## If you aren't a Semgrep administrator

Ensure that:

1. You're logging in with the correct GitHub account 
2. You have the necessary access permissions for the GitHub organization linked to the Semgrep organization. You must be a member, *not* an outside collaborator.

If you have confirmed that you have access with your GitHub administrator, work with your Semgrep administrator to take further steps.

## If you're a GitHub *and* Semgrep administrator

Verify that the Semgrep GitHub app is installed correctly on your GitHub org:

1. Go to the [public Semgrep app on GitHub](https://github.com/apps/semgrep-app).
2. Click the **Configure** button to visit the configuration page and review the app installation. Ensure that you've granted Semgrep the requested permissions and that, if you're not granting **Repository access** to **All repositories**, then you've selected the correct repositories.
3. Try logging in to Semgrep again with your GitHub account.
