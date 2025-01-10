Semgrep findings are typically posted in your PR or MR. The following image displays the parts of a Semgrep PR comment in GitHub; this example appears in a similar form in GitLab and other SCMs:

![An example of a PR comment with various sections annotated.](/img/dataflow-graph-comment.png#md-width)
_**Figure**. An example of a PR comment with various sections annotated._

<dl>
<dt>A - Block indicator</dt>
<dd>This appears if a finding fails the CI job. Organizations typically block PRs or MRs with failed jobs.</dd>
<dt>B - Finding description</dt>
<dd>A human-written description always appears in a PR or MR comment, describing why your code is flagged. **References** may also be included to help you learn more about the finding.</dd>
<dt>C - Dataflow graph</dt>
<dd>Some Code findings have a dataflow graph, which indicates that the finding was detected through <a href="/writing-rules/glossary#taint-analysis">taint analysis</a>. The dataflow graph provides the lines of code identifying sources, sinks, and traces of unsanitized data flowing through your program. You can click the links on the boxes to take you to the lines of code.</dd>
<dt>D - Resolution or remediation section</dt>
<dd>Various options are provided to help your resolve the finding. Depending on the <a href="#type-of-findings-by-resolution">type of finding</a>, resolution options may vary.</dd>
<dt>E - Ignore instructions</dt>
<dd>Click to view instructions about how to ignore the finding by replying to the comment.</dd>
</dl>
