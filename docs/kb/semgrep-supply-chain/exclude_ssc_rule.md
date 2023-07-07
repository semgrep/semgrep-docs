# How to selectively exclude a Supply Chain rule

If you find you need to mute the reporting for a specific Semgrep Supply Chain rule, you can selectively turn off this rule from generating any findings whilst still scanning for all remaining Supply Chain rules. 

## Solution

* First, determine the hash representation of the rule ID for the rule in question:

  Browse to the Findings tab and locate the finding, for example: 

![image info](/img/kb/rule_browse.png)


You can determine the rule name by clicking on the __<> object__, to browse to the source rule and review the rule description. There you will see the rule id, prefixed with the ssc notation, which produces the following page:

![image info](/img/kb/rule_details.png)


Secondly, excluding a rule requires specifying the __—exclude-rule__ flag, supplied with the rule’s hash value.  In this case, you  you can exclude the rule by modifying your ```semgrep ci```  or ```semgrep scan``` command as such: 


```%semgrep ci --exclude-rule  ssc-c2ea697d-9a88-4a20-b128-36b50911f0ca```


You can review all the feature flags available for the ```semgrep ci``` or ```semgrep scan``` commands referencing the help pages by issuing either of the commands:


```% semgrep ci --help```

```% semgrep scan —help```


both listing the supported flag:

```--exclude-rule TEXT           Skip any rule with the given id. Can add multiple  times.```


