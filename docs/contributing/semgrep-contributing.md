# `semgrep-cli` contributing

This article explains how to build `semgrep-cli` so that you can make and test changes to the Python wrapper.

The `semgrep-cli` name refers to the project that exposes the actual `semgrep` command. The README explains the relationship between `semgrep-cli` and `semgrep-core`.

## Prerequisite

- Python >= 3.10 installed in your local machine.
- [`uv`](https://github.com/astral-sh/uv) for managing your virtual
environment. 
    - Install it by following the `uv` [documentation](https://docs.astral.sh/uv/getting-started/installation/)
    - Ensure `uv` is on your `$PATH` before proceeding.

## Set up the environment

Most Python development is done inside the `cli` directory:

```bash
cd cli
```

Next, initialize the virtual environment. The following commands installs both the required dependencies and the developer dependencies, such as `pytest`, and installs `semgrep` in editable mode in the virtual environment. From the `cli` directory, run the following command:

```bash
uv sync
uv build
uv pip install dist/*.whl
```

To execute `semgrep` in this virtual environiment, you could activate the virtual environment as follows:

```bash
source .venv/bin/activate
semgrep --help
```

Running `which semgrep` should return a path within your local virtual environment. On macOS, this is likely contained within `cli/.venv/bin/`.

## Get the `semgrep-core` binary

Almost all usages of `semgrep-cli` require the `semgrep-core` binary.
To get the binary, follow the instructions in [Building `semgrep-core`](semgrep-core-contributing.md#build-semgrep-core). It takes approximately 20 minutes.

### Use a precompiled binary

You can use a precompiled binary, but note two downsides:

- You cannot modify `semgrep-core`, for example, to fix a parse error.
- Semgrep scans fail if the interface between `semgrep-cli` and `semgrep-core` has changed since the binary was compiled. This has happened roughly every two months historically, but can happen at any time without notice.

If you installed Semgrep using Homebrew (with `brew install semgrep`), a `semgrep-core` binary was bundled within that installation. However, it is not made available on your `$PATH` by default.

You can add the bundled binary to your `$PATH` with this series of commands, provided you have `jq` installed:

```bash
export SEMGREP_BREW_INSTALLED_VERSION="$(brew info --json semgrep | jq '.[0].installed[0].version' -r)"
export SEMGREP_BREW_INSTALL_PATH="$(brew --cellar semgrep)/${SEMGREP_BREW_INSTALLED_VERSION}"
export SEMGREP_BREW_PYTHON_PACKAGE_PATH="$(${SEMGREP_BREW_INSTALL_PATH}/libexec/bin/python -m pip list -v | grep '^semgrep\b' | awk '{ print $3 }')"
export SEMGREP_BREW_CORE_BINARY_PATH="${SEMGREP_BREW_PYTHON_PACKAGE_PATH}/semgrep/bin"
export PATH="${SEMGREP_BREW_CORE_BINARY_PATH}:${PATH}"
```

## Run `semgrep-cli`

Ensure that you are in the `cli/` directory and that you have activated the virtual environment with the installed wheel, then issue the following command:

```bash
semgrep --help
```

To try a simple analysis, run:

```bash
echo 'if 1 == 1: pass' | semgrep --lang python --pattern '$X == $X' -
```

You now have Semgrep running locally.

If you encounter difficulties, reach out to the [`semgrep` team on Slack](https://go.semgrep.dev/slack).

Now you can run `semgrep --help` from anywhere.

If you have installed `semgrep-core` from source, there are convenient targets in the root Makefile that let you update all binaries. After you pull, run:

```bash
make
```

See the Makefile in `cli/`

## Add Python packages to `semgrep`

Semgrep uses `mypy` to do static type-checking of its Python code. Therefore, when adding a new Python package, you also need to add typing stubs for that package. This can be done in three steps. For example, suppose you are adding the package `pyyaml` to Semgrep.

1. Install the corresponding package with typing stubs. For this `pyyaml` example, the corresponding package is `types-pyyaml`. In the following command, `--group dev` specifies that this package is needed for development but not in production. This command updates `cli/pyproject.toml` with the typing stubs package, and adds both the typing stubs and the package itself to your `uv.lock`. This allows you to import the package in your code (for example, `import yaml as pyyaml`).
    ```
    uv add --group dev  types-pyyaml
    ```
2. Add the typing stubs package to `.pre-commit-config.yaml` so that the pre-commit `mypy` hook can find the package.
    ```
          - id: mypy
            additional_dependencies: &mypy-deps
              - ...
              - types-PyYAML
    ```
3. Add the original package to `cli/pyproject.toml` in the `dependencies` list. You can find the version number either in the `Pipfile.lock` file or by looking up the most recent major version of the package online.
    ```
    dependencies = [
       ...
       "pyyaml~=6.0",
    ]
    ```

This change makes your package a dependency of published Semgrep. Without this change, if you create a pull request, the CI job called `build docker image` fails with a `ModuleNotFoundError`, indicating it cannot find your package.

## Troubleshooting

For a reference build that's known to work, consult the root `Dockerfile`
to build Semgrep inside a container. You can check that it builds with

```sh
docker build -t semgrep .
```

## Testing

`semgrep-cli` uses [`pytest`](https://docs.pytest.org/en/latest/) for testing.

To run tests, run the following command:

```sh
uv run pytest
```

There are some much slower tests that run Semgrep on many open source projects. To run these slow tests, run:

```sh
uv run pytest tests/qa
```

If you want to update the tests to match the current output:

```sh
make regenerate-tests
```

If you want to run a single test file:

```sh
uv run pytest path/to/test.py
```

Or run an individual test function:

```sh
uv run pytest path/to/test.py::test_func_name
```

`semgrep-cli` also includes [`pytest-benchmark`](https://pytest-benchmark.readthedocs.io/en/latest/)
to allow for basic benchmarking functionality. Run the following command:

```sh
uv run pytest --benchmark-only
```
