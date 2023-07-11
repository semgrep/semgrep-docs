---
tags:
  - Semgrep CI
  - PR comments
---

import MoreHelp from "/src/components/MoreHelp"

# Why did the comments on a PR or MR not appear inline?

When Semgrep comments on PR or MR findings, the comments are usually posted on the line of code where the finding is identified (inline). However, there are two common reasons why comments may not appear inline.

## Avoiding excessive inline comments

For rules with several findings in the same PR or MR, inline comments for every individual finding occupy a significant amount of space without adding much additional information. Therefore, if the same finding occurs three or more times in a PR or MR, the related comment is posted as a summary (overall) comment.

## Available lines in the displayed diff

### GitHub PRs

GitHub only allows PR comments to be posted on lines of code that are shown in the default file-diff (Files changed) view on GitHub. If a finding appears outside those lines, Semgrep attempts to post the comment as close to the finding as feasible. If that fails, it posts the comment as a summary comment, visible in the Conversation view.

### GitLab MRs

GitLab allows comments to be posted on lines of code outside the default file-diff view, but the comments don't appear in the file-diff (Changes) view. However, they do appear as diff-related comments on the Overview.

<MoreHelp />