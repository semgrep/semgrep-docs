---
tags:
  - Bitbucket
  - Jenkins
  - webhooks
description: How to trigger events from the Bitbucket server to a Jenkins instance
---

# Trigger events from Bitbucket to Jenkins

This document shows you how to connect your Bitbucket source code manager (SCM) to Jenkins, a CI/CD environment, using webhooks. By connecting Bitbucket to Jenkins, you can customize jobs, such as your Semgrep job, based on push or pull events from Bitbucket.

:::info Prerequisites
You must install the <i class="fas fa-external-link fa-xs"> Bitbucket Push and Pull Request plugin on your Jenkins server. This method requires that your Jenkins instance be compatible with this plugin.
:::

To connect Bitbucket to a Jenkins instance and trigger builds on Bitbucket’s push and pull request events, define a Bitbucket webhook:

1. Log in to Bitbucket, and go to your repository.
2. In your Bitbucket repository, click **Repository Settings > Webhooks > Add webhook**.
3. Enter a **Title** for your webhook.
4. Enter the **URL** for your Jenkins instance. It must follow the following pattern: `https://<YOUR_JENKINS_SERVER>/bitbucket-hook/`.
5. Add the following **Triggers**:
   1. In **Repository**, select **Push**.
   2. In **Pull request**, select **Created** and **Updated**.

At this point, the Bitbucket webhook is configured and can be used in Jenkins.
