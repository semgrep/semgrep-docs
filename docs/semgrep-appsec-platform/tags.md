---
slug: tags
append_help_link: true
description: "Guidelines on how to add or remove tags through Semgrep AppSec Platform and semgrepconfig.yml file."
title: Tag projects
hide_title: true
tags:
    - Deployment
    - Semgrep AppSec Platform
---

# Tag projects

Tagging enables you to group projects together based on your organization's unique business structure or needs. By tagging projects, you are able to quickly apply Supply Chain policies and other Semgrep features to specific groups.

Add tags for specific projects in the Semgrep AppSec Platform through the following methods:

* Set tags through the **Semgrep AppSec Platform > Projects > Project details** page.
* Set tags using the Semgrep AppSec Platform API.
* Set tags in your repository's `.semgrepconfig.yml` file.

:::caution Setting tags
* Keep in mind, when setting tags via the `.semgrepconfig.yml` file or Semgrep AppSec Platform API, that these actions **supersede** any tags previously set.
* For example, if you set tags through the API and subsequently run a CI scan, then the previous tags set by the API will be overwritten by any tag definitions in the `.semgrepconfig.yml` file of the repository.
* For this reason, the Semgrep team recommends exclusively choosing either the API or `.semgrepconfig.yml` file to manage and set tags. **Do not use a mix of the two.**
:::

## Set tags through Semgrep AppSec Platform and the API

To manage tags through Semgrep AppSec Platform, follow these steps:

1. Go to the Semgrep AppSec Platform [Projects](https://semgrep.dev/orgs/-/projects) page.
2. Find the project you want to modify, then click its **<i class="far fa-window-restore"></i> icon** under **Details**.
3. Click the **Settings** tab.
4. Add or remove tags under the **Tags** section.
5. Click **Save**.

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
Changes to tags made through the `.semgrepconfig.yml` file are also visible in the **Semgrep AppSec Platform > Projects** page, however, the inverse is **not** true (changes in Semgrep AppSec Platform > Projects page will be overwritten by `.semgrepconfig.yml`.)
:::
