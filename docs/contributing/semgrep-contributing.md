# `semgrep-cli` contributing

This article explains how to build `semgrep-cli` so that you can make and test changes to the Python wrapper.

The `semgrep-cli` name refers to the project that exposes the actual `semgrep` command. The README explains the relationship between `semgrep-cli` and `semgrep-core`.

## Prerequisite

- Python >= 3.10 installed in your local machine.
- [`pipenv`](https://github.com/pypa/pipenv) for managing your virtual
environment. 
    - Install it by following the `pipenv` [documentation](https://pipenv.pypa.io/en/latest/installation.html). 
    - Ensure `pipenv` is on your `$PATH` before proceeding.

## Set up the environment

Most Python development is done inside the `cli` directory:

```bash
cd cli
```

Next, initialize and enter the virtual environment. The following command installs developer dependencies, such as `pytest`, and installs `semgrep` in editable mode in the virtual environment. From the `cli` directory, run the following command:

```bash
pipenv shell
```

By convention, your shell prompt is prepended with `(cli)` when the virtual environment is active.

Next, install the Python dependencies:

```bash
SEMGREP_SKIP_BIN=true pipenv install --dev
```

:::info
`SEMGREP_SKIP_BIN` tells the installer that you'll use your own `semgrep-core`; see below.*
:::

Running `which semgrep` should return a path within your virtual environment. On macOS, this is likely contained within `$HOME/.local/share/virtualenvs/`.

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

Ensure that you are in the `cli/` directory, and then issue the following command:

```
pipenv run semgrep --help
```

To try a simple analysis, run:

```
echo 'if 1 == 1: pass' | semgrep --lang python --pattern '$X == $X' -
```

You now have Semgrep running locally.

## Install `semgrep`

You can always run `semgrep` from `cli/`, which will use your latest changes in that directory, but you may also want to install the `semgrep` binary. To do this, run

```
pipenv install --dev
```

If you encounter difficulties, reach out to the [`semgrep` team on Slack](https://go.semgrep.dev/slack).

Now you can run `semgrep --help` from anywhere.

If you have installed `semgrep-core` from source, there are convenient targets in the root Makefile that let you update all binaries. After you pull, run:

```
make rebuild
```

See the Makefile in `cli/`

## Add Python packages to `semgrep`

Semgrep uses `mypy` to do static type-checking of its Python code. Therefore, when adding a new Python package, you also need to add typing stubs for that package. This can be done in three steps. For example, suppose you are adding the package `pyyaml` to Semgrep.

1. Install the corresponding package with typing stubs. For this `pyyaml` example, the corresponding package is `types-pyyaml`. In the following command, `--dev` specifies that this package is needed for development but not in production. This command updates `cli/Pipfile` with the typing stubs package, and adds both the typing stubs and the package itself to your `Pipfile.lock`. This allows you to import the package in your code (for example, `import yaml as pyyaml`).
    ```
    pipenv install --dev types-pyyaml
    ```
2. Add the typing stubs package to `.pre-commit-config.yaml` so that the pre-commit `mypy` hook can find the package.
    ```
          - id: mypy
            additional_dependencies: &mypy-deps
              - ...
              - types-PyYAML
    ```
3. Add the original package to `cli/setup.py` in the `install_requires` list variable. You can find the version number either in the `Pipfile.lock` file or by looking up the most recent major version of the package online.
    ```
    install_requires = [
       ...
       "pyyaml~=6.0",
    ]
    ```

This change makes your package a dependency of published Semgrep. Without this change, if you create a pull request, the CI job called `build docker image` fails with a `ModuleNotFoundError`, indicating it cannot find your package.

## Troubleshooting

For a reference build that's known to work, consult the root `Dockerfile`
to build Semgrep inside a container. You can check that it builds with

```
docker build -t semgrep .
```

## Testing

`semgrep-cli` uses [`pytest`](https://docs.pytest.org/en/latest/) for testing.

To run tests, run the following command:

```
pipenv run pytest
```

There are some much slower tests that run Semgrep on many open source projects. To run these slow tests, run:

```sh
pipenv run pytest tests/qa
```

If you want to update the tests to match the current output:

```sh
make regenerate-tests
```

If you want to run a single test file:

```
pipenv run pytest path/to/test.py
```

Or run an individual test function:

```
pipenv run pytest path/to/test.py::test_func_name
```

`semgrep-cli` also includes [`pytest-benchmark`](https://pytest-benchmark.readthedocs.io/en/latest/)
to allow for basic benchmarking functionality. Run the following command:

```
pipenv run pytest --benchmark-only
```
