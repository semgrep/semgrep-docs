---
description: How to respond to a malware incident using Semgrep Supply Chain.
tags:
  - Semgrep Supply Chain
---

# Malware incident response with Semgrep Supply Chain

This document describes how to respond to a malicious dependency incident using Semgrep Supply Chain.

## 1. Check the results from your most recent full scan

Semgrep maintains a record of the dependencies in your project that is updated whenever a full scan runs. As soon as you have reason to be concerned, check this record to see if those packages and versions were present in your environment at the time of the scan.

You can do this in Semgrep AppSec Platform using the [**Dependencies** tab](https://semgrep.dev/orgs/-/supply-chain/t/dependencies) and its dependency search functionality and/or via the Semgrep API.

### Find malicious versions of packages with dependency search

The [dependency search](https://semgrep.dev/orgs/-/supply-chain/t/dependencies) supports:

- Finding a package through substring matching
- Finding a specific package using the `@` syntax
- Finding all packages with versions greater or less than a specified version using the `<` or `>` operands

For example, to find all versions of `lodash` that are greater than version 4.17, enter `lodash@>4.17` :

![Sample dependency search for lodash4.17 or later.](/img/ssc-incident-1.png#md-width)
_**Figure**. Sample dependency search for lodash4.17 or later._

You can also use a URL like this: https://semgrep.dev/orgs/my_company/supply-chain/t/dependencies?q=lodash%40%>4.17

### Find malicious versions of packages using the Semgrep API

You can use the Semgrep API to find matching malicious package versions in your projects using the following endpoints:

- [List dependencies](https://semgrep.dev/api/v1/docs/#tag/SupplyChainService/operation/SupplyChainService_ListDependencies)
- [Create a new SBOM export job](https://semgrep.dev/api/v1/docs/#tag/SupplyChainService/operation/SupplyChainService_ListDependencies)

#### List dependencies

Use this endpoint to search for specific packages and versions across your deployment. You can filter by ecosystem and specify version ranges or exact versions.

```bash
curl -L -g 'https://semgrep.dev/api/v1/deployments/{your_deployment_id}/dependencies' \
  -H 'accept: application/json' \
  -H 'authorization: Bearer <YOUR_SEMGREP_APP_TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{
    "dependencyFilter": {
      "ecosysystem": [
        "npm"
      ],
      "packageFilters": [
        {
          "name": "lodash",
          "versionLowerBound": ">4.17"
        },
        {
          "name": "jridgewell-resolve-uri-latest",
          "exactVersion": "9999.999.999"
        }
      ]
    },
    "deploymentId": <your_deployment_id__int>
  }'
```

#### Create a new SBOM export job

Use this endpoint to generate a Software Bill of Materials (SBOM) for a specific repository. This is a multi-step process: first create an export job, then poll for its completion to retrieve the download URL.

**Step 1: Create the export job**

```bash
curl -L 'https://semgrep.dev/api/v1/deployments/{your_deployment_id}/sbom/export' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <YOUR_SEMGREP_APP_TOKEN>' \
  -d '{
    "deploymentId": <your_deployment_id__int>,
    "repositoryId": <repository_id_to_export_for__int>,
    "sbomOutputFormat": "SBOM_OUTPUT_FORMAT_JSON"
  }'
```

This returns a task token that you'll use to check the job status:

```json
{
  "taskToken": "<TASK_TOKEN_FOR_EXPORT_JOB>"
}
```

**Step 2: Poll for job completion**

Use the task token from Step 1 to check the export job status:

```bash
curl -L 'https://semgrep.dev/api/v1/deployments/{your_deployment_id}/sbom/export/{TASK_TOKEN_FOR_EXPORT_JOB}' \
  -H 'Authorization: Bearer <YOUR_SEMGREP_APP_TOKEN>'
```

When the job completes, the response includes a signed download URL:

```json
{
  "status": "SBOM_EXPORT_STATUS_COMPLETED",
  "downloadUrl": "https://s3.amazon.com/signed/url/to/download/sbom"
}
```

You can then download the SBOM from the provided URL.

## 2. Verify that your next scan includes rules for the incident

For all major security incidents, the Semgrep Security Research team responds within one business day, typically within four hours, and delivers rules to all customer accounts to check for malicious package versions.

Due to time zones, holidays, and the sometimes subjective nature of incident severity, please contact [Semgrep support](/docs/support) to verify that we are actively working on a rule in response to a malware incident.

Otherwise, wait for a notification from Semgrep through regular channels, such as Slack, that the rules related to the incident have been deployed.

## 3. Initiate scans on potentially affected projects with Semgrep rules

If the malicious version of the dependency was introduced after the scan, your projects could be affected even if the most recent scans showed no findings.

Furthermore, running a full scan with Semgrep rules provides clear visibility into affected repositories and branches across all scanned code. See [View results from your Semgrep scans](#4-view-results-from-your-semgrep-scans) for more information.

### Initiate scans with Semgrep Managed Scanning

If you're using Semgrep Managed Scans, you can choose to run full scans on any potentially affected repositories manually:

1. Go to the **Projects** page in Semgrep App Platform.
2. Select the projects of interest.
3. Click **Run a new scan > Rule-based detection** to start scans on the repositories that may be affected. For example, in an `npm` package compromise, Semgrep recommends scanning any project that may contain JavaScript.

![Select and run Managed Scans projects manually.](/img/ssc-incident-1.png#md-width)
_**Figure**. Select and run Managed Scans projects manually._

### Initiate scans in your CI/CD pipelines

If you're running scans in your CI/CD pipelines, manually trigger a Semgrep scan of any projects that may be impacted.

### Initiate a local scan

If you have large repositories or difficulty accessing your CI/CD system, it may be most efficient to run a local scan.

In the directory where you want to run the scan, choose one of the following commands:

- Run `semgrep ci --supply-chain` if the repository is checked out using Git. This uploads findings to Semgrep AppSec Platform.
- Run `semgrep scan --config supply-chain .` if you want to scan without a Git checkout. In this mode, findings are available for local review and are not sent to the Semgrep AppSec Platform.

Note: to view findings in the Semgrep AppSec Platform, you must be logged in before running a scan. Log in by running `semgrep login`.

### Scan results

Regardless of the method you use to scan your project, the findings generated are, by default, of **Critical** severity and **Always Reachable**. Any workflows or automation set up using Supply Chain policies or a ticketing system such as Jira are automatically triggered by these findings, so notifications are sent to developers immediately.

## 4. View results from your Semgrep scans

Semgrep AppSec Platform displays all affected projects and their findings after your scans complete using the new rules. To see this information:

1. Go to [**Rules & Policies > Advisories**](https://semgrep.dev/orgs/-/advisories).
2. Using the **Advisory** filter, provide the relevant CVE or keywords. If a CVE ID hasn’t been assigned, use the ID provided by Semgrep.
3. Click the advisory in the results list to open up the **Advisory Details** dialog.
4. Go to **Affected projects**.

![View affected projects for a specific advisory.](/img/ssc-incident-3.png#md-width)
_**Figure**. View affected projects for a specific advisory._

If Semgrep provides you with a direct link in a notification, such as a Slack message, you can use that to view the same information.

To search for an advisory by package name, click on the advisory in the list and open the **Advisory Details** dialog:

![Search for advisories by package name.](/img/ssc-incident-4.png#md-width)
_**Figure**. Search for advisories by package name._

If there are no findings for the rules run on the projects scanned, Semgrep shows no results:

![Advisory details dialog with no findings found.](/img/ssc-incident-6.png#md-width)
_**Figure**. Advisory details dialog with no findings found._

Before concluding you’re not affected, verify that the rules corresponding to the incident were included in recent scans.

However, if there are results, Semgrep shows the number of findings by project, as well as the breakdown of which branches in the codebase are impacted:

![Advisory details dialog with findings found.](/img/ssc-incident-5.png#md-width)
_**Figure**. Advisory details dialog with findings found._

Click on the number of findings to go to the **Findings** page, where you will see a list of results for that project's branch.

## 5. Remove any malicious versions and re-scan your project

Once the incident's impact is clear, immediately remove the malicious dependency from your codebase, including all repositories and branches. The fastest way to do it is often to downgrade to an uncompromised version.

It is essential to follow any other response steps specific to the incident, which could involve changes to CI/CD workflows, internal package registries, and other aspects of your software supply chain.

Once you’ve completed your incident response, re-run a Supply Chain scan on the same set of repositories and verify that the outcome shows no findings for the malicious advisory.

## 6. Block the introduction of malicious packages

To reduce the frequency of such issues, [create Supply Chain policies](/semgrep-supply-chain/policies#create-a-policy) to block the introduction of malicious package versions.

## 7. Additional steps

Depending on the particulars relevant to the incident, other steps may also be recommended. Refer to the [Semgrep blog](https://semgrep.dev/blog/) or to messages from [Support](/support) for the latest updates.
