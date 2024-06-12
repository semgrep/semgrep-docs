---
description: Execute `semgrep login` correctly for customers on dedicated tenants.
tags:
  - Semgrep AppSec Platform
  - Login
  - Troubleshooting
---



## The `semgrep login` command doesn't redirect to my Semgrep tenant site

When executing the command: 
```console
semgrep login
```
it redirects to `https://semgrep.dev`. You may receive an error when logging in: `The requested URL was not found on the server`. As a Semgrep tenant user,  you should be redirected to your tenant site, such as: <code>https://<span className="placeholder">MY_COMPANY</span>.semgrep.dev</code>


## To log in to the correct tenant site

Set the environment variable `SEMGREP_APP_URL` before calling the `semgrep login` function.
```console
export SEMGREP_APP_URL=https://mycompany.semgrep.dev
semgrep login
```
If you frequently log in from the command line, set the SEMGREP_APP_URL variable in your shell initialization file, such as `~/.zshrc` or `~ /.bash_profile`, depending on your operating system.
