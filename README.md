<p align="center">
    <a href="https://semgrep.dev"><img src="https://raw.githubusercontent.com/returntocorp/semgrep/develop/semgrep.svg" height="150" alt="Semgrep logo"/></a>
</p>
<h3 align="center">
  Lightweight static analysis for many languages.
  </br>
  Find bugs and enforce code standards.
</h3>
<br />

This repository powers [Semgrep’s documentation](https://semgrep.dev/docs). Docs are built using [Docusaurus 2](https://docusaurus.io/).

## Contributing

Contributions to the docs are welcome! To start contributing, first please make sure you read and agree with the Semgrep’s [Contributor Covenant Code of Conduct](https://github.com/returntocorp/semgrep/blob/develop/CODE_OF_CONDUCT.md).

## Building docs locally

1. Clone the repo.
2. Install: `yarn install`.
3. There are two options to run the docs locally:
    1. Enter `yarn dev` and then go to `<http://localhost:3000/>`. This option is for contributors and writers.
    2. Enter `yarn start` and then go to: `<http://localhost:3000/>`. This option is for displaying an accurate preview of the live documentation.It runs a script that replaces certain identifiers with code or file templates. These replacements ensure that certain code or file templates are up-to-date.

## Preview production build

```console
yarn build
```

This command generates static content into the `build` directory. Preview the production build by running:

```console
yarn serve
```

## Creating content

Content is written in regular Markdown or MDX files. Markdown and MDX files optionally contain YAML style metadata (front matter) at the top of the file. You can use front matter to override attributes like the slug and other things.

Read more about [creating documentation using Docusaurus here](https://docusaurus.io/docs).

### Submitting PRs

Please submit suggested changes via PRs made against this repository’s `main` branch.

