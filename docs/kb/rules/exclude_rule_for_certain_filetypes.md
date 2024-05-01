# How to exclude certain file types for a particular rule

Certain filetypes can generate numerous false positives and delay your triage process. This document helps you achieve a selective middle ground:

* Continue to include the file type to scan with other rules
* Reduce time spent triaging false positives

## Background

This article uses a real-life case in scanning `.svg` files. `svg` files mostly comprise a string of thousands of characters:

```
<image id="image0" width="2896" height="998" xlink:href="data:image/png;
base64,iVBORw0KGgoAAAANSUhEUgAAC1AAA**AP6*mCAYAAABQS58cAAABR2lDQ1BJQ0M
gUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAzsDIwM1gwqCRmFxc4B
gQ4ANUwgCjUcG3a0C1QHBZF2SW3AzZBT+7Sn68UphgqTU7fyemehTAlZJanAyk/wBxWnJBU
QkDA2MKkK1cXlIAYncA2SJFQEcB2XNA7HQIewOInQRhHwGrCQlyBrJvANkCyRmJQDMYXwDZ
OklI4ulIbKi9IMDj4urjoxBqZG5oEUjAuaSDktSKEhDtnF9QWZSZnlGi4AgMpVQFz7xkPR0F
IwMjAwYGUJhDVH8OAoclo9g+hFj+EgYGi28MDMwTEWJJUxgYtrcxMEjcQ…..
```

Semgrep’s standard artifactory rule (see in [Semgrep Registry](https://semgrep.dev/r?q=generic.secrets.security.detected-artifactory-password.detected-artifactory-password)), for example, reports on:

```
_\# ruleid: detected-artifactory-password_

_AP6xxxxxxxxxx_

_\# ruleid: detected-artifactory-password_

_AP2xxxxxxxxxx_

...
```

Because `.svg` files are made up of thousands of characters, the substring `AP6*m...` in the `.svg` snippet creates a false positive finding due to the artifactory rule. It is a false positive because no passwords are leaked by the `.svg` file.

## Choosing the appropriate ignoring solution

Semgrep offers many different ways of ignoring false positives: 

* **Adding `nosemgrep` as a comment on the first line of code in the file.** This would require having to keep track of each new file for this target `.svg` file type and editing each file accordingly, requiring constant maintenance.
* **Ignore the file entirely, by adding it to a `.semgrepignore file`**. This would exclude the file from being scanned with all rules, not just the artifactory rule.

## Achieving a happy medium: creating a custom rule to exclude a file type

You can safely assume `.svg` files do not intentionally contain artifactory passwords, so you can exclude this file type from being scanned. The following procedure demonstrates how to create a customized version of the rule that is generating the false positives that excludes the target file type.

1. Download the rule generating false positives from the [Registry](https://semgrep.dev/r).
2. Modify the rule ID to something custom:
```
  \- id: my_detected-artifactory-password
```
3. Exclude the target filetype in question from the rule through the [`path` field](/deployment/teams#user-roles-and-access): 

```
 % cat my_custom_artifactory.yml 
 
rules:

  \- id: my_detected-artifactory-password
  
    options:
    
    .
    .
    .
    
    - metavariable-analysis:
        analyzer: entropy
        metavariable: $ITEM 
    paths:
    
       exclude:
          - "*.svg" 
   languages:
       - generic
    .
    .
    .
```
4. Alter the scan command to still scan for the default configuration you have, with the following changes:
    1. Exclude the original noisy rule as articulated in the false positive reporting.
    2. Include the new custom rule that excludes your target paths.

Thus, your original `semgrep scan` command or `semgrep ci` command can be similar to the following::

```
% semgrep scan --config=auto --config=my_custom_artifactory.yml --exclude-rule generic.secrets.security.detected-artifactory-password.detected-artifactory-password
```
