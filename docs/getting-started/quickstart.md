---
slug: quickstart
append_help_link: true
title: Quickstart
hide_title: false
description: Learn how to set up Semgrep and scan your first repository.
displayed_sidebar: scanSidebar
tags:
  - quickstart
---


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Learn how to set up Semgrep, scan your first project for security issues, and view your findings.

:::info prerequisites
You must have Python 3.8 or later installed on the machine where the Semgrep CLI is running.
:::

1. Navigate to [Semgrep AppSec Platform](https://semgrep.dev/login), and sign up by clicking on **Sign in with GitHub** or **Sign in with GitLab**. Follow the on-screen prompts to [grant Semgrep the necessary permissions](/deployment/checklist/#permissions) and proceed.
1. Provide the **Organization display name** you'd like to use, then click **Create new organization**.
1. When asked **Where do you want to scan?** click **Run on CLI**.
1. Launch your CLI, and follow the instructions on the [**Scan a project on your machine**](https://semgrep.dev/onboarding/scan) page. For your convenience, the same information is presented below, along with instructions for Windows users.

    <Tabs
        defaultValue="macOS"
        values={[
        {label: 'macOS', value: 'macOS'},
        {label: 'Linux', value: 'Linux'},
        {label: 'Windows Subsystem for Linux (WSL)', value: 'Windows Subsystem for Linux (WSL)'},
        {label: 'Docker', value: 'Docker'},
        ]}
    >

    <TabItem value='macOS'>

    1. Install the Semgrep CLI and confirm the installation:

        ```console
        # install through homebrew
        brew install semgrep

        # install through pip
        python3 -m pip install semgrep

        # confirm installation succeeded by printing the currently installed version
        semgrep --version
        ```

        :::note
        **Homebrew users:** ensure that you've [added Homebrew to your PATH](https://docs.brew.sh/FAQ#my-mac-apps-dont-find-homebrew-utilities).
        :::

    2. Log in to your Semgrep account. Running this command launches a browser window, but you can also use the link that's returned in the CLI to proceed:

        ```console
        semgrep login
        ```

    3. In the **Semgrep CLI login**, click **Activate** to proceed.

    4. Return to the CLI, navigate to the root of your repository, and run your first scan:

        ```console
        semgrep ci
        ```

    </TabItem>

    <TabItem value='Linux'>

    1. Install the Semgrep CLI and confirm the installation:

        ```console
        # install through pip
        python3 -m pip install semgrep

        # confirm installation succeeded by printing the currently installed version
        semgrep --version
        ```

    2. Log in to your Semgrep account. Running this command launches a browser window, but you can also use the link that's returned in the CLI to proceed:

        ```console
        semgrep login
        ```

    3. In the **Semgrep CLI login**, click **Activate** to proceed.

    4. Return to the CLI, navigate to the root of your repository, and run your first scan:

        ```console
        semgrep ci
        ```

    </TabItem>

    <TabItem value='Windows Subsystem for Linux (WSL)'>

    :::info Prerequisites
    Ensure that you have the [Windows Subsystem for Linux installed](https://learn.microsoft.com/en-us/windows/wsl/install) before proceeding.
    :::

    1. Using the WSL interface, install the Semgrep CLI and confirm the installation:

        ```console
        # install through pip
        python3 -m pip install semgrep

        # confirm installation succeeded by printing the currently installed version
        semgrep --version
        ```

    2. Log in to your Semgrep account. Running this command launches a browser window, but you can also use the link that's returned in the CLI to proceed:

        ```console
        semgrep login
        ```

    3. In the **Semgrep CLI login**, click **Activate** to proceed.

    4. Return to the WSL interface, navigate to the root of your repository, and run your first scan:

        ```console
        semgrep ci
        ```

    </TabItem>

    <TabItem value='Docker'>

    :::info Prerequisites
    Ensure that you have [Docker installed](https://docs.docker.com/desktop/) before proceeding.
    :::

    1. Pull the latest image and confirm the version:

        ```console
        docker pull semgrep/semgrep

        # confirm version
        docker run --rm semgrep/semgrep semgrep --version
        ```

    2. For users running Docker on **macOS or Linux** Docker:

        1. Log in to your Semgrep account (running this command will launch a browser window, but you can also use the link that's returned in the CLI to proceed):

            ```console
            docker run -it semgrep/semgrep semgrep login
            ```

        2. In the **Semgrep CLI login**, click **Activate** to proceed. Return to the CLI and copy the login token that's shown.

        3. Navigate into the root of your repository, and run your first scan. Be sure to substitute <code><span class="placeholder">YOUR_TOKEN</span></code> with the login token value you copied in the previous step:

            ```console
            docker run -e SEMGREP_APP_TOKEN=YOUR_TOKEN --rm -v "${PWD}:/src" semgrep/semgrep semgrep ci
            ```

            The provided `-v` option mounts the current directory into the container to be scanned. Navigate into a different repository or provide a specific local directory in the command to scan a different project.

    3. For users running Docker on **Windows**:

        1. Log in to your Semgrep account (running this command will launch a browser window, but you can also use the link that's returned in the CLI to proceed):

            ```console
            docker run -it semgrep/semgrep semgrep login
            ```

        2. In the **Semgrep CLI login**, click **Activate** to proceed. Return to the CLI, and copy the login token that's shown.

        3. Navigate into the root of your repository, and run your first scan. Be sure to substitute <code><span class="placeholder">YOUR_TOKEN</span></code> with the login token value you copied in the previous step:

            ```console
            docker run -e SEMGREP_APP_TOKEN=YOUR_TOKEN --rm -v "%cd%:/src" semgrep/semgrep semgrep ci
            ```

            The provided `-v` option mounts the current directory into the container to be scanned. Navigate into a different repository or provide a specific local directory in the command to scan a different project.

    </TabItem>

    </Tabs>

4. Once you've scanned your first application, return to Semgrep AppSec Platform, and click **View findings** to see the security vulnerabilities in your project. Alternatively, you can view your results in Semgrep AppSec Platform's **Dashboard** page. For detailed information, click **Code** to access your SAST findings or **Supply Chain** to access your SCA findings.

    :::info
    **Code is not uploaded.** Only **findings** are sent to Semgrep AppSec Platform.
    :::
