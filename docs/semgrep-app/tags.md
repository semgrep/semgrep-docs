---
slug: tags
append_help_link: true
description: "Guidelines on how to add or remove tags through Semgrep App and semgrepconfig.yml file."
title: Managing projects through tags
hide_title: true
tags:
    - Semgrep App
    - Community Tier
    - Team & Enterprise Tier
---

<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>

# Managing projects through tags

Add tags for specific projects in the Semgrep App on the configuration page of a project.

To manage tags, follow these steps:
1. Go to the Semgrep App [Projects](https://semgrep.dev/orgs/-/projects) tab.
2. Click on the project's <i class="fa-solid fa-gear"></i> cogwheel icon to enter project configuration page, and then add or remove tags.

You can also add tags through a specific file added to your repository. To do so, follow the instructions below:
1. Create `.semgrepconfig.yml` file in the root directory of your repository.
2. Add tags to the `.semgrepconfig.yml` file. Example of tags added to `.semgrepconfig.yml` file:
    ```yaml
    tags:
        - favourite
        - awesomeproject
    ```

Tags added through `.semgrepconfig.yml` are displayed in Semgrep App [Projects](https://semgrep.dev/orgs/-/projects) tab also.

:::note
Removing tags added through the `.semgrepconfig.yml` does not remove the tags from Semgrep App. To remove these tags, remove them on the [Projects](https://semgrep.dev/orgs/-/projects) configuration page of the Semgrep App.
:::

<MoreHelp />
