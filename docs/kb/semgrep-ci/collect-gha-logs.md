---
description: Collect logs from GitHub Actions to troubleshoot Semgrep CI scans.
tags:
  - GitHub
  - Semgrep in CI
---


# Collecting Semgrep GitHub Actions logs from Github

1. On Github.com, or in your GitHub instance, navigate to the main page of the repository that Semgrep scanned.
2. Click the **Actions** tab.      
    ![actions-tab](https://docs.github.com/assets/cb-45938/images/help/repository/actions-tab.png)  
3. In the left sidebar, click the GitHub Actions workflow you want to retrieve logs for. The name depends on your configuration but defaults to "Semgrep." In this example it is "Scan":
    ![GitHub actions workflow selection](/img/kb/semgrep-gha-workflow.png)
4. Select the desired workflow run.
5. Click on the Semgrep job name. The name depends on your configuration but defaults to "semgrep/ci":
    ![Semgrep job name](/img/kb/semgrep-gha-jobname.png)
6. In the upper right corner of the log, click the **<i class="fa-solid fa-gear"></i> dropdown menu > Download log archive**.
7. Share the downloaded log archive with Semgrep Support.


## Additional references

* [Using workflow run logs - Downloading logs](https://docs.github.com/en/actions/monitoring-and-troubleshooting-workflows/using-workflow-run-logs#downloading-logs).

