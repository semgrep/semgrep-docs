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
1. Install mkdocs: `pip install mkdocs`
2. Install required plugins: `pip install mkdocs-redirects`
3. Clone the repo
4. Run the docs locally with `mkdocs serve` and then go to: http://127.0.0.1:8000/

If you use `pipx` to manage virtual environments,
you can install the required apps with
`pipx install mkdocs && pipx inject mkdocs mkdocs-redirects`
