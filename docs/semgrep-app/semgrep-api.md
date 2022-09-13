---
slug: semgrep-api
append_help_link: true
title: Semgrep API
hide_title: true
description: >-
  This document links to Semgrep API documentation.
tags:
    - Semgrep App
    - Team & Enterprise Tier 
---

<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>

# Semgrep API

Semgrep App provides an API that enables you to list deployments, gather findings created by Semgrep App, and list projects. The API documentation uses the OpenAPI format. The API requires a [Team or Enterprise tier account](https://semgrep.dev/pricing/), with the subsequent API token provisioned in your settings.

See the API documentation of **[Semgrep Web App](https://semgrep.dev/api/v1/docs/)** for full reference information.
