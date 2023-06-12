---
slug: tags
append_help_link: true
description: "Guidelines on how to add or remove tags through Semgrep Cloud Platform and semgrepconfig.yml file."
title: Tagging projects 
hide_title: true
tags:
    - Semgrep Cloud Platform
    - Team & Enterprise Tier
---

<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>

import MoreHelp from "/src/components/MoreHelp"

# Tagging projects 

Add tags for specific projects in the Semgrep Cloud Platform through the following methods:

* Set tags in your repository's `.semgrepconfig.yml` file.
* Set tags through Semgrep Cloud Platform > Project page or Semgrep Cloud Platform API (for Team and Enterprise Tier users).

:::tip Best practices
*  Choose either Semgrep Cloud Platform (and API) or `.semgrepconfig.yml` to manage tags. **Do not use a mix of the two.**
* Semgrep Cloud Platform and its API **never** overwrite your `.semgrepconfig.yml` file. If you choose to use `.semgrepconfig.yml` to manage your tags, use it **exclusively**. Do not use Semgrep Cloud Platform or the API to manage any tags. Any changes to your tags through Semgrep Cloud Platform will be overwritten after a CI scan due to values present in `.semgrepconfig.yml`.
* Semgrep always prioritizes values in `.semgrepconfig.yml` as the source of truth.
:::

## Set tags through Semgrep Cloud Platform and Semgrep Cloud Platform API

To manage tags through Semgrep Cloud Platform, follow these steps:

1. Go to the Semgrep Cloud Platform [Projects](https://semgrep.dev/orgs/-/projects) page.
2. Click on the project's <i class="fa-solid fa-gear"></i> **gear** icon to enter project configuration page, and then add or remove tags.

Refer to [Semgrep API documentation](https://semgrep.dev/api/v1/docs/#tag/Project/operation/semgrep_app.saas.handlers.tagging.openapi_add_tags_to_project) to use the API.

## Set tags in `.semgrepconfig.yml`

You can also add tags through a specific file added to your repository. To do so, follow the instructions below:

1. Create `.semgrepconfig.yml` file in the root directory of your repository.
2. Add tags to the `.semgrepconfig.yml` file. Example of tags added to `.semgrepconfig.yml` file:
    ```yaml
    tags:
        - favourite
        - awesomeproject
    ```

:::caution
Changes to tags made through the `.semgrepconfig.yml` file are also visible in the **Semgrep Cloud Platform > Projects** page, however, the inverse is **not** true (changes in Semgrep Cloud Platform > Projects page will be overwritten by `.semgrepconfig.yml`.)
:::

<MoreHelp />
