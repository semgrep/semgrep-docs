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

Contributions to the docs are welcome! To start contributing, please make sure you:

* Read and agree with the [Semgrep Contributor Covenant Code of Conduct](https://github.com/returntocorp/semgrep/blob/develop/CODE_OF_CONDUCT.md).
* Read and sign the [Semgrep Contributor License Agreement (CLA)](https://cla-assistant.io/returntocorp/semgrep-docs).

The purpose of the CLA is to allow future relicensing without having to track down any past contributor. By signing the CLA, you are granting r2c a non-exclusive license to use your contribution while retaining your ownership of it.

Questions? We're happy to help!

* Email us: [support@r2c.dev](mailto:support@r2c.dev)
* Join our [Slack](https://r2c.dev/slack)

### Developing docs locally

1. Clone the repo
2. Install: `yarn install`
3. Run the docs locally with `yarn start` and then go to: <http://localhost:3000/>

## Build and preview

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

