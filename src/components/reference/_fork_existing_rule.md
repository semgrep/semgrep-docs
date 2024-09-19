One way to create new rules is to fork an existing rule in Semgrep Registry and modify it to meet your software and business requirements.

For example, Semgrep’s Java `crypto` ruleset prohibits the use of weak hashing algorithms `SHA-1` and `MD5`. However, your organization also prohibits the use of other hash functions as part of its standards or security compliance. The following steps illustrate the process of forking an existing `use-of-sha1` rule and changing it to forbid MD2 hashes.

1. Use the search bar to find relevant rules. For this example, you can search for rules using `SHA1`.
   ![Library pane with SHA-1 filter](/img/editor-SHA1.png)
2. Under **java > lang > security > audit > crypto**, click **use-of-sha1** to load the rule. You cannot directly edit the rules in Semgrep Registry, so click **Fork** to make a copy.
   ![Default rule ready to be copied](/img/editor-forking.png)
   Alternatively, you can right-click the rule's name and select **Fork rule**.
3. Semgrep copies the rule to your organization's set of rules.
4. Edit the rule.
5. Update your test cases.
6. Click **Run** to test and validate your rule.
7. When you finish your changes, click **Save**.

The following example shows how [the original rule, identifying uses of `SHA-1` and `MD5`, has been modified to find uses of MD2](https://docs.oracle.com/javase/9/docs/specs/security/standard-names.html#messagedigest-algorithms) and the severity of such findings is increased from `WARNING` to `ERROR`.

<iframe title="Prevent use of MD2" src="https://semgrep.dev/embed/editor?snippet=RDxN" width="100%" height="432px" frameBorder="0"></iframe>

When you fork a rule, the copy is independent from the original. To run your new rule in your scans, [add it to a policy](#add-a-rule-to-the-policies-page). If you want your copy to replace the rule you forked, add it to a policy, then disable the original on the Policies page.