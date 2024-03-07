---
slug: semgrep-app-ghe
append_help_link: true
title: Install the Semgrep App for GitHub Enterprise
hide_title: false
description: Learn how to install the Semgrep App for use |
    with GitHub Enterprise (GHE) deployments.
tags:
  - GitHub Enterprise
  - Semgrep App
---

The Semgrep App for GitHub Enterprise (GHE) creates a connection between Semgrep
and orgs in your GHE deployment. It allows you to get Semgrep results as PR
comments, add Semgrep to your projects with one click, and manage rules and
results across multiple projects from one centralized place.

This article walks you through installing the Semgrep App for use with GHE
deployments. There are two primary installation steps:

1. Install the Semgrep App for the first time using the GHE organization (org)
   that "owns" the app.
2. Install the app for additional GHE orgs.

## Install the Semgrep App for the first time using the organization that "owns" the app

When you install the Semgrep App for GHE for the first time in your GHE
instance, you must choose the organization within your deployment to act as the
owner of the app. As the owner, this GHE org controls the settings and
permissions granted to the app.

1. Log in to [Semgrep Cloud Platform](https://semgrep.dev/login/).
1. Go to **Settings** > **Source Code Managers**, and click **Add GitHub
   Enterprise**.
   ![Semgrep Cloud Platform's Source code managers page](/img/ghe-1.png#md-width)
1. In the popup window, provide:
   - The **Name of your GitHub Organization**
   - The **URL** to access your deployment
   - A random string in the **Access token** field; this field will be optional in the future
    Click **Connect** to save your changes.
   ![Connect your GitHub Organization popup window](/img/ghe-2.png#md-width)
1. Refresh your browser. You should see a new entry under **Source code
   managers** that displays the GHE org and instance URL you entered. Click
   **Create App**.
   ![Semgrep Cloud Platform's Source code managers page with new GHE instance](/img/ghe-3.png#md-width)
2. In the popup window:
   1. Ensure that:
      - You've selected **Organization**
      - The **GitHub Organization name** is populated (if not, enter the name of
        your org)
      - You've selected the **Use for multiple GitHub orgs (Enterprise-public
        app)** checkbox
      ![Popup window to provide GitHub org information](/img/ghe-4.png#md-width)
   2. Review the permissions for the app; as the app owner, note that you can
   change these permissions later. Click **Create GitHub App** to proceed.
   3. Click **Create GitHub App** to proceed.
      ![Create private Semgrep GitHub App popup with option to create app](/img/ghe-5.png#md-width)
      If this step is successful, the blue **Create GitHub App** button turns into a gray **Created** button.
      ![Create private Semgrep GitHub App popup showing that an app has been created](/img/ghe-6.png#md-width)
3. Click **Install** under **Step 4**. You'll be taken to your GHE instance and
   asked to name your app. You can choose whatever name you'd like, but Semgrep
   recommends that you name it something that indicates that this is the Semgrep
   GHE app.
4. After you name your app, choose the GHE org to which you want it installed.
   Select the org that you want to act as the owner of the app, and click
   **Install**.
   ![List of orgs to which the Semgrep app can be installed](/img/ghe-7.png#md-width)
5. Wait for the installation to complete. When done, you will be redirected to
   Semgrep.
6. Verify the installation by navigating to **Settings** > **Source Code
   Managers**. Ensure that the entry for your SCM shows a gray **Installed**
   button.
   ![Semgrep Cloud Platform's Source code managers list showing GHE instance](/img/ghe-8.png#md-width)
7. In GHE, you should see the app listed as installed on the **GitHub Apps**
   page.
   ![GHE showing installed Semgrep App](/img/ghe-9.png#md-width)
   You can click **Configure** to choose the repositories to which the app
   has access. Additionally, you can go to **App settings** to customize the
   permissions granted to the app.
   ![GitHub Apps page showing App settings link](/img/ghe-10.png#md-width)

At this point, you've successfully installed the GHE Semgrep App on the owner GHE org. In the future, other members of your GHE instance can install the app on their GHE orgs using the public link if they have the proper permissions. You can get the public link from GHE by going to **GitHub Apps** > **App settings**.

![App installation page](/img/ghe-11.png#md-width)

## Install the app for your GHE org

You can install the Semgrep app onto additional GHE orgs at any time. To do so:

1. Go to the public link for the app shared with you by your admin. Click **Install**.
   ![App installation page](/img/ghe-12.png#md-width)
2. Choose the GHE org to which you want the app installed, and click **Install**.
   ![Org list](/img/ghe-13.png#md-width)
3. In the popup confirmation message, click **Install**.
   ![GitHub installation prompt](/img/ghe-14.png#md-width)
4. The GHE org should now be listed under **Source code organizations**.
    ![Source code organizations list](/img/ghe-15.png#md-width)
