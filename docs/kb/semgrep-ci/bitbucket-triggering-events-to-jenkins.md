---
tags:
  - Bitbucket
  - Jenkins
  - webhooks
description: How to trigger events from the Bitbucket server to a Jenkins instance
---
# Triggering events from Bitbucket to Jenkins


A common scenario for many organizations is having:
* Bitbucket (Cloud or Server) as Source Code Management system to manage source code repositories.
* Jenkins as CI/CD platform to run pipelines.
So, it is crucial to have some kind of links between the two platforms.

## Defining a Bitbucket webhook 
One way to connect Bitbucket (Cloud or Server) to a Jenkins instance is defining a Bitbucket webhook.
It will allow us to trigger builds on Bitbucket's push and pull requests events.

There are two requirements to comply:
* Installing the plugin ["Bitbucket Push and Pull Request"](https://plugins.jenkins.io/bitbucket-push-and-pull-request/) on the Jenkins server.
* Having network visibility between the two platforms.

:::note
Read the plugin documentation to review it is compatible with your Jenkins instance.
:::

The steps to setup the webhook are the following:

* For a specific Bitbucket repository click on **Repository Settings**->**Webhooks**->**Add Webhook**
![image info](/img/kb/ci-bitbucket-defining-webhook.png)
* Put a name to the webhook.
* Specify the URL. It must be `https://<YOUR_JENKINS_SERVER>/bitbucket-hook/`
* Select Triggers for “Push” and “Pull requests Created and Updated”.
![Webhook set up page](/img/kb/ci-bitbucket-select-triggers.png)

Now the webhook is set on the Bitbucket side. You can use it from your Jenkins instance.
