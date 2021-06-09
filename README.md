<p align="center">
    <a href="https://semgrep.dev"><img src="https://raw.githubusercontent.com/returntocorp/semgrep/develop/semgrep.svg" height="150" alt="Semgrep logo"/></a>
</p>
<h3 align="center">
  Lightweight static analysis for many languages.
  </br>
  Find bugs and enforce code standards.
</h3>
<br />

This repository powers [Semgrep’s documentation](https://semgrep.dev/docs).

## Contributing

Contributions to the docs are welcome! To start contributing, first please make sure you read and agree with the Semgrep’s [Contributor Covenant Code of Conduct](https://github.com/returntocorp/semgrep/blob/develop/CODE_OF_CONDUCT.md).

### Developing docs locally

1. Install mkdocs: `pip install mkdocs==1.2.1`
2. Install required plugins: `pip install mkdocs-redirects mkdocs-meta-descriptions-plugin`
3. Clone the repo
4. Run the docs locally with `mkdocs serve` and then go to: <http://127.0.0.1:8000/>

If you use `pipx` to manage virtual environments,
you can install the required apps with
`pipx install mkdocs==1.2.1 && pipx inject mkdocs mkdocs-redirects mkdocs-meta-descriptions-plugin`

## Creating content

Content is written in regular Markdown files and Mkdocs uses the Python-Markdown library to render Markdown documents to HTML. Markdown files optionally contain YAML style metadata (front matter) at the top of the file. You can use front matter to override attributes like the document title (which is normally auto-generated), or to add optional support links at the bottom of a page.

For example:

```
---
append_help_link: true
---
```

The above front matter adds a link at the bottom of a docs page directing visitors to the r2c Slack to get more help.

All pages automatically use the first paragraph as a `<meta>` description.
To use a custom description, add a line to the frontmatter like this:

```
description: >-
  Succinct description goes here.
```

### Submitting PRs

Please submit suggested changes via PRs made against this repository’s `main` branch.
