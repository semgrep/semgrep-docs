# Troubleshooting GitLab SAST

GitLab includes a SAST analyzer that uses Semgrep to find vulnerabilities.
If you're having trouble and you suspect the issue lies with Semgrep, you can find some advice below.
If you suspect your issue lies with GitLab,
check [GitLab's own SAST troubleshooting guide](https://docs.gitlab.com/ee/user/application_security/sast/#troubleshooting).

[TOC]

# The `semgrep-sast` CI job is slow

The Semgrep SAST job should take less than a minute to scan a project with 100k lines of code.
If you see worse performance,
please [reach out](../support.md) to the Semgrep maintainers for help with tracking down the cause.
Long runtimes are typically caused by just one rule or source code file taking too long.

If you suspect large and complex source code files (such as minified JS or generated code)
are making the job last too long, you might want to exclude these files from scanning.
[GitLab's path exclusion feature](https://docs.gitlab.com/ee/user/application_security/sast/#vulnerability-filters)
does not skip scanning excluded files. It scans everything, and then hides results from excluded files.

To improve performance by 10x on a typical project, you can use [Semgrep CI](../semgrep-ci.md) directly:

- Semgrep CI skips scanning unchanged files in your merge requests,
- it also skips common large directories such as vendored dependencies or tests,
- and lets you skip scanning paths by committing a `.semgrepignore` file.

# The `semgrep-sast` report has too many false positives or false negatives

If you're not getting results where you should,
or you get too many results, the problem might be with the patterns Semgrep scans for.
Semgrep search patterns look just like the source code they're meant to find,
so they are easy to learn and update.

You can review the search patterns in the
[rules directory of the Semgrep GitLab SAST analyzer](https://gitlab.com/gitlab-org/security-products/analyzers/semgrep/-/tree/main/rules)
and report issues to the GitLab team.
We have a [Semgrep rule writing tutorial](https://semgrep.dev/learn)
that will help better understand these rule files.
You can also refer to the [Semgrep Registry](https://semgrep.dev/r)
which is a collection of 1000+ Semgrep rules curated by r2c.

<!--
# The Semgrep SAST analyzer reports no results

TODO
-->

# The Semgrep SAST analyzer crashes, fails, or is otherwise broken

If Semgrep crashes while scanning,
it will print an error message to explain what went wrong,
and often also what to do to fix it.

The output of Semgrep is hidden by default,
but [GitLab provides a way](https://docs.gitlab.com/ee/user/application_security/sast/#sast-debug-logging)
to see it by setting an environment variable:

```yaml
variables:
  SECURE_LOG_LEVEL: "debug"
```

# How to get help

Please check the [Support](../support.md) page to get help from the Semgrep maintainers & community,
via Slack, GitHub, email, or phone.
