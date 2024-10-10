---
slug: /semgrep-supply-chain/sbom
append_help_link: true
title: SBOM
hide_title: true
description: Generate a CycloneDX JSON or XML SBOM to view all repository dependencies.
tags:
 - Semgrep Supply Chain
 - Semgrep AppSec Platform
---

# Generate a software bill of materials

:::info Prerequisite
At least one repository that scans for dependencies through Semgrep Supply Chain. See [Scan third-party dependencies](/semgrep-supply-chain/getting-started).
:::

Generate a software bill of materials (SBOM) to assess your third-party dependencies and comply with auditing procedures. Semgrep Supply Chain (SSC) can generate an SBOM for each repository you have added to Semgrep AppSec Platform. When generating an SBOM, Semgrep uses:

- The vulnerability information from the default branch for the project
- The dependency information from the latest full scan for the project.

## Supported standards and formats

Semgrep Supply Chain supports the following SBOM formats:

- CycloneDX 1.4 JSON
- CycloneDX 1.4 XML

## Generate and download an SBOM for a single project

SBOM generation can be performed only through Semgrep AppSec Platform.

1. In Semgrep AppSec Platform, go to **Supply Chain > Dependencies**.
2. Click the **Download <i class="fa-solid fa-download"></i>** icon next to the repository you want an SBOM for.
3. Click the format you want the SBOM to be in. After clicking, refresh or leave the page only after the SBOM has been generated.
4. Once Semgrep has generated the SBOM, click the link on the toaster notification to download it.
    ![Download link in toaster notification](/img/download-sbom.png) _**Figure**. The Dependencies tab displays a successful SBOM download._

You have successfully downloaded an SBOM.

:::note Supply Chain scans on non-primary branches
Typically, full scans are run only on default branches. However, if your workflow differs and you run full scans on non-primary branches, this can create a mismatch between dependencies and vulnerabilities in the generated SBOM. To avoid the mismatch, ensure that the latest full scan runs on the default branch of the repository for which you want to generate an SBOM.
:::

## Semgrep-specific SBOM data fields

In addition to the [<i class="fas fa-external-link fa-xs"></i> minimum elements that define an SBOM](https://www.ntia.doc.gov/files/ntia/publications/sbom_minimum_elements_report.pdf), Semgrep provides additional metadata in the `vulnerabilities` field. Nested under the `vulnerabilities` field is a list of data objects describing a specific vulnerability. Each data object contains the following data fields:

| Semgrep-specific field | Description |
| -------  | ------ |
| Advisories  | Links to GitHub or NIST advisories about the specific vulnerability. |
| Affects | The name and version of the package that the vulnerability affects. |
| Analysis | Semgrep's analysis of this vulnerability in your supply chain. Under analysis are `state` and `justification` fields, which describe if your codebase is affected by the vulnerability and why Semgrep thinks it is or is not affected. |
| CWEs | The assigned CWE (common weakness enumeration) number. |
| Description | A short description of the vulnerability. |
| Detail | A longer description of the vulnerability, including the affected versions. |
| Ratings | Semgrep Supply Chain's severity rating of this vulnerability. |
| References | Links to the specific CVE. References can come from NIST and GitHub Security Advisory. |
| Source | The primary source of this vulnerability's advisory. |
| Tools | Details about Semgrep, the tool used to generate the SBOM. |
