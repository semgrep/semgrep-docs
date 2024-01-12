---
slug: connect-scm 
title: Connect a source code manager
hide_title: true
description: tk
tags:
  - Semgrep Cloud Platform
  - Team & Enterprise Tier
  - Deployment
---

# Connect a source code manager

Linking a source code manager (SCM) allows the Semgrep org's membership to be managed by GitHub or GitLab, among other benefits. After connecting your Semgrep org to GitHub or GitLab, members from GitHub or GitLab are able to join the Semgrep organization you created and connected.

You can only connect your Semgrep organization to the source code manager that you originally logged in with. If your organization uses both GitHub and GitLab to manage source code, log in with the source code manager that you would prefer to use to manage Semgrep org membership. You can still scan repositories from other sources.

**For self-hosted SCMs**: perform the steps in tk-link

:::note Connecting to GitHub
Ensure you have sufficient permissions to install GitHub apps. Identify a GitHub organization admin or owner who has permissions to install or approve the app before proceeding.
:::

To connect your SCM:

1. Sign in to Semgrep Cloud Platform.
2. On the sidebar, click **the organization account** you want to make a connection for.
3. Click **Settings** > **Source Code Managers**.
4. Click on your source code manager, for example, **Connect to GitHub**.
![Source code manager tab](/img/source-code-manager.png#md-width)
5. Follow the prompts in the Cloud Platform and select an organization or group to link.
6. After a successful link, you are signed out of Semgrep Cloud Platform automatically, as your credentials have changed after linking an organization.
7. Sign back in to Semgrep Cloud Platform.

You have successfully connected an org in Semgrep Cloud Platform with an organization in your source code management tool.

