---
description: Learn how to remove users from Semgrep.
tags:
 - Semgrep AppSec Platform
 - Deployment
---

# Remove users from your Semgrep organization

When you remove a user from your identity provider, such as your single sign-on (SSO) instance, GitHub, or GitLab, they can no longer sign in to Semgrep, even if their record appears in your Semgrep organization's members list.

To completely remove a user from your Semgrep organization:

1. Ensure that you have removed the user from your identity provider, such as your SSO instance, GitHub, or GitLab.
2. [Contact Semgrep Support](/support) to have the user removed from Semgrep's database. Provide the following information in your request:
    - The user's email address.
    - Your Semgrep organization name or ID.

## GitHub and GitLab users

If you have GitHub or GitLab authentication enabled and want to prevent users from logging in using their credentials from these providers:

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login), and navigate to **Settings > Access > Login Methods**.
2. Click the <i class="fa-solid fa-toggle-large-on"></i> toggle for **GitHub SSO** or **GitLab SSO** to turn off this sign-in method.

This change prevents any new logins from users with GitHub or GitLab credentials.