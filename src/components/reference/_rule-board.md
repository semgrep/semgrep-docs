Semgrep Cloud Platform's Rule Board displays all rules and rulesets that are used to scan repositories. These rules are scanned based on the repository's programming language and framework as well as additional Semgrep parameters, such as ignored files.

For example, given five repositories each with different programming languages, the Rule Board only scans using rules and rulesets for that repository's language that are in the Rule Board.

Semgrep's speed is not affected by having multiple rules for different languages in the Rule Board.

You may select rules and rulesets from your own rules, your organization's rules, or rules from the Registry.

![Screenshot of Rule board](/img/rule-board.png "Screenshot of Rule board")

The Rule Board is composed of three columns:


<dl>
    <dt>Monitor</dt>
    <dd>Rules here show findings only on Semgrep Cloud Platform.</dd>
    <dt>Comment</dt>
    <dd>Rules here show findings to developers through PRs or MRs.</dd>
    <dt>Block</dt>
    <dd>Rules here show block merges and commits, in addition to showing findings in Semgrep Cloud Platform and PRs or MRs.</dd>
</dl>    

To add rules and rulesets to your Rule Board:

1. Click **Rule Board** on the left sidebar.
2. Click Add Rules. A right-side drawer appears.
3. Type in a search term relevant to your codebase's framework or programming language.
4. Drag a card from the search results to the appropriate column.
5. Select **Save changes**.

For more information on operations such as filtering and deleting as well as Rule board management, see [Rule board](/docs/semgrep-code/rule-board).
