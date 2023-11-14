---
slug: /semgrep-supply-chain/sbom
append_help_link: true
title: SBOM
hide_title: true
description: Generate a CycloneDX JSON or XML SBOM to view all dependencies of a .
tags:
  - Semgrep Supply Chain
---

# Generating an SBOM (Software bill of materials)

Generate a software bill of materials (SBOM) to assess your third-party dependencies and comply with auditing procedures. Semgrep Supply Chain (SSC) can generate an SBOM for each repository you have added to Semgrep Cloud Platform.

## Supported standards and formats

Semgrep Supply Chain supports the following:

- CycloneDX 1.4 JSON
- CycloneDX 1.4 XML

## Generating and downloading an SBOM for a single project

:::info Prerequisites
- **SBOM generation** can be accessed through Semgrep Cloud Platform (SCP). [Create an account](/semgrep-code/getting-started/#signing-in-to-semgrep-cloud-platform) to use this feature.
- You need at least 1 successful Supply Chain scan for each repository you want to generate an SBOM for. 
:::

1. In Semgrep Cloud Platform, click **Supply Chain > Dependencies**. 
2. Click the **Download <i class="fa-solid fa-download"></i> icon** next to the repository you want an SBOM for.
3. Select the format of the Cyclone Do not refresh or leave the page.
3. Once SCP has generated the SBOM, click the link provided on the toaster notification to download it.
    ![Download link in toaster notification](/img/download-sbom.png)

You have successfully downloaded an SBOM.

## Semgrep Supply Chain fields

