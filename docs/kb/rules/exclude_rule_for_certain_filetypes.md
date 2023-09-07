# How to exclude certain file types for a particular rule

Certain filetypes can generate numerous false positives and hold up your triage process. This document helps you achieve a selective middle ground:
* Continue to include the file type to scan with other rules
* Reduce copious amounts of time triaging false positives

## Background

Let's use a real-life case scenario in scanning .svg files as a platform for articulating this solution.   These files mostly comprised a string of thousands of characters:

```
<image id="image0" width="2896" height="998" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAC1AAA**AP**mCAYAAABQS58cAAABR2lDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAzsDIwM1gwqCRmFxc4BgQ4ANUwgCjUcG3a0C1QHBZF2SW3AzZBT+7Sn68UphgqTU7fyemehTAlZJanAyk/wBxWnJBUQkDA2MKkK1cXlIAYncA2SJFQEcB2XNA7HQIewOInQRhHwGrCQlyBrJvANkCyRmJQDMYXwDZOklI4ulIbKi9IMDj4urjoxBqZG5oEUjAuaSDktSKEhDtnF9QWZSZnlGi4AgMpVQFz7xkPR0FIwMjAwYGUJhDVH8OAoclo9g+hFj+EgYGi28MDMwTEWJJUxgYtrcxMEjcQ…..
```

Semgrep’s standard artifactory rule, for example, reports on:

```
_\# ruleid: detected-artifactory-password_

_AP6xxxxxxxxxx_

_\# ruleid: detected-artifactory-password_

_AP2xxxxxxxxxx_

...
```

We can quickly see how the match in bold above will flag the artifactory rule as a false positive.  


## Choosing the appropriate ignoring solution


Semgrep offers many different ways of muting false positives: 

One could employ the nosemgrep directive but this would require having to keep track of each new file for this target .svg file type and editing it accordingly, creating a layer of maintenance with this muting notation. 

One could ignore the file entirely, placing it in the .semgrepignore listing, but then that would preclude this type of file from scanning against not only the artifactory rule, but all rules.  


## Achieving a happy medium


How can we achieve a happy medium of selectively precluding this filetype from the artifactory rule, but still scan .svg files against all other rules?

We can safely assume .svg files do not intentional contain artifactory passwords, so we are safe to preclude this rule from scanning against this filetype and the following procedure demonstrates how to:

* Create a customized version of the rule that is generating the false positives that excludes the target file type:  


a) Download the flaring rule in question from the registry.  For demonstration purposes, we will specify the artifactory rule.    

b) Modify the rule ID to something custom:

  \- id: my_detected-artifactory-password

c) Exclude the target filetype in question from the rule as per:

https://semgrep.dev/docs/writing-rules/rule-syntax/#paths

So, the modified rule reflects an update as such:


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

* Alter the scan command to still scan for the default configuration you have (just using --config=auto as my example) but:

 a) Exclude the original noisy rule as articulated in the false positive reporting (long-hand form) 

 b) Include the new custom rule (above) that excludes your target paths.   

Thus, your original semgrep scan command (or semgrep ci command) now looks like: 


% semgrep scan --config=auto --config=my_custom_artifactory.yml __--exclude-rule generic.secrets.security.detected-artifactory-password.detected-artifactory-password__

You are including the custom rule which excludes scanning against specified paths/file types, so in this case, the .svg files are excluded.   but still scanning against all other remaining rules against all file types, including .svg files. 

