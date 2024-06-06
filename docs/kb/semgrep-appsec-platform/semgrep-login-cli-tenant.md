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
it redirects to the default site: `https://semgrep.dev` and it could lead to an authentication issue if you are a single-tenant customers, as the expected site should be an URL like: `https://yourcompany.semgrep.dev`


## To log in to the correct tenant site

Set the environment variable `SEMGREP_APP_URL` before calling the `semgrep login` function.
```console
export SEMGREP_APP_URL=https://yourcompany.semgrep.dev
```
As login can be a recurrent task, one tip is to set the export statement in the `.~/.bashrc` file or similar depending on your operative system.
