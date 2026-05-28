<p align="center">
    <a href="https://semgrep.dev"><img src="static/img/semgrep.svg" height="130" alt="Semgrep logo"/></a>
</p>
<h3 align="center">
  Lightweight static analysis for many languages.
  </br>
  Find bugs and enforce code standards.
</h3>
<br />

Documentation for [docs.semgrep.dev](https://docs.semgrep.dev), built with [Mintlify](https://mintlify.com).

## Local development

```bash
bash run-build-scripts
cd docs && npx mintlify@latest dev
```

## Pull requests

Mintlify deploys preview URLs via the [GitHub App](https://www.mintlify.com/docs/deploy/github). CI runs `run-build-scripts` and link checks in [`.github/workflows/docs-ci.yml`](./.github/workflows/docs-ci.yml).

## Contributing

See [CONTRIBUTING](https://github.com/semgrep/semgrep/blob/develop/CONTRIBUTING.md) and the [Code of Conduct](https://github.com/semgrep/semgrep/blob/develop/CODE_OF_CONDUCT.md).
