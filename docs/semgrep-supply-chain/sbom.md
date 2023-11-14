---
slug: /semgrep-supply-chain/sbom
append_help_link: true
title: SBOM
hide_title: true
description: Generate a CycloneDX JSON or XML SBOM to view all dependencies of a repository.
tags:
  - Semgrep Supply Chain
---

# Generating an SBOM (software bill of materials)

Generate a software bill of materials (SBOM) to assess your third-party dependencies and comply with auditing procedures. Semgrep Supply Chain (SSC) can generate an SBOM for each repository you have added to Semgrep Cloud Platform.

## Supported standards and formats

Semgrep Supply Chain supports the following:

- CycloneDX 1.4 JSON
- CycloneDX 1.4 XML

## Generating and downloading an SBOM for a single project

:::info Prerequisites
- **SBOM generation** can be performed only through Semgrep Cloud Platform (SCP). [Create an account](/semgrep-code/getting-started/#signing-in-to-semgrep-cloud-platform) to use this feature.
- You need at least 1 successful Supply Chain scan on the **trunk branch** of each repository you want to generate an SBOM for. To add a repository to Semgrep for scanning, see [<i class="fa-regular fa-file-lines"></i> Running scans](/semgrep-cloud-platform/getting-started/#running-scans).
:::

1. In Semgrep Cloud Platform, click **Supply Chain > Dependencies**. 
2. Click the **Download <i class="fa-solid fa-download"></i>** icon next to the repository you want an SBOM for.
3. Click the format you want the SBOM to be in. After clicking, Do not refresh or leave the page.
3. Once SCP has generated the SBOM, click the link provided on the toaster notification to download it.
    ![Download link in toaster notification](/img/download-sbom.png#bordered)

You have successfully downloaded an SBOM.

## Semgrep-specific SBOM data fields

In addition to the [<i class="fas fa-external-link fa-xs"></i> minimum elements that define an SBOM](https://www.ntia.doc.gov/files/ntia/publications/sbom_minimum_elements_report.pdf), Semgrep provides additional metadata in the `vulnerabilities` field. Under `vulnerabilities` are a list of data objects that each describe a specific vulnerability. Each vulnerability has the following data fields:

| Semgrep-specific field | Description |
| -------  | ------ |
| Advisories  | Links to GitHub or NIST advisories about the specific vulnerability. |
| Affects | The name and version of the package that the vulnerability affects. |
| Analysis | Semgrep's analysis of this vulnerability in your supply chain. Under analysis are `state` and `justification` fields, which describe if your codebase is affected by the vulnerability and the reason why Semgrep thinks it is or is not affected. |
| CWEs | The assigned CWE (common weakness enumeration) number. |
| Description | A short description of the vulnerability. |
| Detail | A longer description of the vulnerability, including the affected versions. |
| Ratings | Semgrep Supply Chain's severity rating of this vulnerability. |
| References | Links to the specific CVE. References can come from NIST and GitHub Security Advisory. |
| Source | The primary source of this vulnerability's advisory. |
| Tools | Details about Semgrep, which is the tool used to generate the SBOM. |
