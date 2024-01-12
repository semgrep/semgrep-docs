# Checklist to successfully PR comments for secrets findings with your custom secrets rules
 
A number of conditions need to be met to successfully generate PR comments from findings raised by custom secrets rules and differ depending on whether you are scanning secrets rules as generic Code secrets rules or under the Secrets product and this article outlines both. 


## Conditions specific to generating a PR comment as a generic secret Code finding


Ensure your rule does not have the following entry: 

```
product: secrets
```

Scanned with this directive, the rule will default to producing a Code finding and subsequently produce a Code PR comment, assuming the policy mode is set correctly to Comment mode (which is the other requirement here for a Code PR comment).


## Conditions specific to generating a PR comment as a Secrets product finding


If you want to scan a secrets rule as a Secret product finding and subsequently generate  a Secrets product PR comment, the following will need to be in place:

Ensure your rule does indeed have the following entry:

```
product: secrets
```

The Secrets policy mode will need to be set correctly to Commend mode.  

You will need have two Secrets feature flags enabled:  one for the Secrets product and one specific for Secrets PR comments.  This can be confirmed with your Semgrep sales representative.  


## Caveat applicable to both generic and Secrets rules 

Only Confirmed Valid findings generate PR comments and of those.  You will need to implement a validator for any custom secrets rule.  


## Testing

Only token validation produces a PR comment and you must use a valid token to test this.

Semgrep suggesgts the following baseline test:

1. Generate a Github token with no permissions.
2. Commit token.
3. Scan and check that there is a finding and a PR comment should, too, be generated.
4. Delete the token immediately thereafter.


The only way to test PR comments: you must use a valid token.
