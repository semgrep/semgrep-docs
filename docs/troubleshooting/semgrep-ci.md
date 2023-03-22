---
slug: semgrep-ci
description: "Get more information when Semgrep in CI hangs, crashes, times out, or runs too slowly."
title: Troubleshooting Semgrep in CI
hide_title: true
append_help_link: true
---

import MoreHelp from "/src/components/MoreHelp"

# Troubleshooting Semgrep in CI

If you're seeing results reported on files that have not changed since the last scan,  timing out, or anything else related to running semgrep in CI, see instructions in sections below on your CI provider.

## GitHub

The first piece of information r2c uses are the GitHub Actions logs. You can send them to r2c by clicking the settings button next to **search logs** and then **download log archive**.

If this does not have the information you need, save the logs that Semgrep CI produces. On each run, Semgrep CI creates a `.semgrep_logs` folder with the following information:

- The debug logs
- The output collected from Semgrep (including the timing data described below).
- If a run used a Semgrep configuration, the flat list of rules run is listed.

To collect these logs, you need to upload them as an artifact. Modify your workflow to match the following:

```yaml
semgrep:
    name: semgrep with managed policy
    runs-on: ubuntu-20.04
    env:
      SEMGREP_APP_TOKEN: ${{ secrets.SEMGREP_APP_TOKEN }}
    container:
      image: returntocorp/semgrep
    steps:
      - uses: actions/checkout@v3
      - run: semgrep ci
      - name: package-logs
        if: always()
        run: tar czf logs.tgz ~/.semgrep/last.log
      - name: upload-logs
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: logs.tgz
          path: logs.tgz
          retention-days: 1
```

## Retrieving Semgrep CI logs

When you run `semgrep ci --config p/ci` logs are saved in `~/.semgrep/last.log`.

## Reproducing the run locally

It is possible to reproduce some parts of Semgrep CI locally to aid in debugging through the following steps:

1. Go to the [API token page](https://semgrep.dev/orgs/-/settings/tokens) and create a new API token.
2. Run the following command, and then paste in your API key when prompted:
    ```
    semgrep login
    ```
3. Run the following code: <pre class="language-bash"><code>SEMGREP_REPO_NAME=<span className="placeholder">your-organization</span>/<span className="placeholder">repository-name</span> semgrep ci</code></pre>
For example, `SEMGREP_REPO_NAME=returntocorp/semgrep semgrep ci` would be used for the GitHub repository `returntocorp/semgrep`. As a result, Semgrep fetches the rules configured on all Semgrep Cloud Platform policies for this repository and run a local Semgrep scan using those rules.

<MoreHelp />