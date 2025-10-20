---
slug: quickstart-ce
title: Quickstart
hide_title: false
description: Learn how to set up Semgrep Community Edition, scan your codebase for security issues, and view your findings
tags:
  - quickstart
  - Semgrep CE
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get started with Semgrep Community Edition

Learn how to set up Semgrep Community Edition (CE), scan your first project, which is any codebase, repository, or folder within a monorepo, for security issues, and view your findings.

## Prerequisites

See [Prerequisites](/prerequisites) to ensure that your machine meets Semgrep's requirements.

## Scan your project

<Tabs
    defaultValue="macOS"
    values={[
    {label: 'macOS', value: 'macOS'},
    {label: 'Linux', value: 'Linux'},
    {label: 'Windows (beta)', value: 'Windows'},
    {label: 'Windows Subsystem for Linux (WSL)', value: 'Windows Subsystem for Linux (WSL)'},
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

    **Homebrew users:** ensure that you've [added Homebrew to your PATH](https://docs.brew.sh/FAQ#my-mac-apps-dont-find-homebrew-utilities).

2. Navigate to the root of your project, and run your first scan:

    ```console
    semgrep scan
    ```

</TabItem>

<TabItem value='Linux'>

1. Install the Semgrep CLI and confirm the installation:

    ```console
    # install through pip
    python3 -m pip install semgrep

    # if you get the following error "error: externally-managed-environment",
    # see semgrep.dev/docs/kb/semgrep-appsec-platform/error-externally-managed-environment 

    # confirm installation succeeded by printing the currently installed version
    semgrep --version
    ```

1. Navigate to the root of your project, and run your first scan:

    ```console
    semgrep scan
    ```

</TabItem>

<TabItem value='Windows'>

1. [Download](https://www.python.org/downloads/) and install Python. Make sure to check the box to add python.exe to the PATH, otherwise you will have difficulty running Pip and Semgrep.

2. Configure your system to run Python with UTF-8 text encodings by default. In PowerShell, run:

    ```console
    [System.Environment]::SetEnvironmentVariable('PYTHONUTF8', '1', 'User')
    ```

3. Install the Semgrep CLI and confirm the installation. In PowerShell, run:

    ```console
    # install through pip
    pip install –upgrade semgrep

    # if you get the following error "error: externally-managed-environment",
    # see semgrep.dev/docs/kb/semgrep-appsec-platform/error-externally-managed-environment 

    # confirm installation succeeded by printing the currently installed version
    semgrep --version
    ```

4. Navigate to the root of your project, and run your first scan:

    ```console
    semgrep scan
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

2. Navigate to the root of your project, and run your first scan:

    ```console
    semgrep scan
    ```

</TabItem>

</Tabs>

## View your findings

Semgrep prints your findings to the CLI when the scan is complete:

```bash
# sample findings output from Semgrep CE

    server.js
     ❱ javascript.express.security.audit.express-check-csurf-middleware-
       usage.express-check-csurf-middleware-usage                       
          A CSRF middleware was not detected in your express          
          application. Ensure you are either using one such as `csurf`
          or `csrf` (see rule references) and/or you are properly     
          doing CSRF validation in your routes with a token or        
          cookies.                                                    
          Details: https://sg.run/BxzR                                
                                                                      
           15┆ const app = express(); // Web framework to handle
               routing requests                                 
   
    ❯❱ javascript.express.security.audit.express-cookie-settings.express-
       cookie-session-default-name                                       
          Don’t use the default session cookie name Using the default 
          session cookie name can open your app to attacks. The       
          security issue posed is similar to X-Powered-By: a potential
          attacker can use it to fingerprint the server and target    
          attacks accordingly.                                        
          Details: https://sg.run/1Z5x                                
                                                                      
           78┆ app.use(session({
           79┆     // genid: (req) => {
           80┆     //    return genuuid() // use UUIDs for
               session IDs                                
           81┆     //},
           82┆     secret: cookieSecret,
           83┆     // Both mandatory in Express v4
           84┆     saveUninitialized: true,
           85┆     resave: true
           86┆     /*
           87┆     // Fix for A5 - Security MisConfig
             [hid 15 additional lines, adjust with --max-lines-per-finding] 
```

