Semgrep findings are typically posted in your PR or MR. The following image displays the parts of a Semgrep PR comment in GitHub; this example appears in a similar form in GitLab and other SCMs:

![An example of a PR comment with various sections annotated.](/img/pr-comment-sections.png#md-width)
_**Figure**. An example of a PR comment with various sections annotated._

- **A - Block indicator**. This appears if a finding fails the CI job. Organizations typically block PRs or MRs with failed jobs.
- **B - Finding description**. A human-written description always appears in a PR or MR comment, describing why your code is flagged. **References** may also be included to help you learn more about the finding.
- **C - Resolution or remediation section**. Various options are provided to help your resolve the finding. Depending on the [type of finding](#type-of-findings-by-resolution), resolution options may vary.
- **D - Ignore instructions**. Click to view instructions about how to ignore the finding by replying to the comment.
