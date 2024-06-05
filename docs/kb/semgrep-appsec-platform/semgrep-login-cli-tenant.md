---
description: Fix a semgrep login issue for single-tenant customers.
tags:
  - Semgrep AppSec Platform
  - Login
  - Troubleshooting
---



## semgrep login doesn't redirect to my Semgrep site.

When executing the command: 
```console
semgrep login
```
it redirects to the default site: `https://semgrep.dev` and it could lead to an authentication issue if you are a single-tenant customers, as the expected site should be an URL like: `https://yourcompany.semgrep.dev`


## How to fix this login issue

It can be solved by setting the environment variable `SEMGREP_APP_URL` before calling the `semgrep login` function.
```console
export SEMGREP_APP_URL=https://yourcompany.semgrep.dev
```
As login can be a recurrent task, one tip is to set the export statement in the `.~/.bashrc` file or similar depending on your operative system.
