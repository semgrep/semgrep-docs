---
description: Learn how to remove users from Semgrep.
tags:
 - Semgrep AppSec Platform
 - Deployment
---

# Remove users from your Semgrep AppSec Platform organization

When you remove a user from your connected GitHub organization, GitLab group, or single sign-on (SSO) provider:

* They can no longer sign in to Semgrep.
* Any active session for that user in the platform will expire within seven days.

However, their user record may still appear in your Semgrep organization's members list.

To have the user record removed from your Semgrep organization as well:

1. Ensure that you have removed the user from connected groups in the identity provider.
2. [Contact Semgrep Support](/support) to have the user removed from their association with your organization. Provide the following information in your request:
    - The user's email address and sign-in method(s).
    - Your Semgrep organization name or ID.

## Managing available identity provides GitHub and GitLab users

If you have multiple identity providers enabled in your Semgrep organization, and want to prevent users from logging in using their GitHub or GitLab credentials:

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login), and navigate to **Settings > Access > Login Methods**.
2. Click the <i class="fa-solid fa-toggle-large-on"></i> toggle for **GitHub SSO** or **GitLab SSO** to turn off this sign-in method.

This change prevents any new logins from users with GitHub or GitLab credentials.
