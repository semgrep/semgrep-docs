# `semgrep-cli` contributing

The following explains how to build `semgrep-cli` so that you can make and test changes to the Python wrapper.
The `semgrep-cli` name refers to the project which exposes the actual `semgrep` command.
You may want to read the README first to understand the relationship between `semgrep-cli` and `semgrep-core`.

## Prerequisite

- Python >= 3.8 installed in your local machine.
- [`pipenv`](https://github.com/pypa/pipenv) for managing your virtual
environment. Install it by following the `pipenv` [documentation](https://pipenv.pypa.io/en/latest/installation.html). Ensure `pipenv` is on your `$PATH` before proceeding.

## Set up the environment

Most Python development is done inside the `cli` directory:

```bash
cd cli
```

Next, initialize and enter the virtual environment. The following command installs developer dependencies such as `pytest` and also installs `semgrep` in editable mode in the virtual environment. From the `cli` directory, enter:

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

Running `which semgrep` should return a path within your virtual environment. On MacOS, this is likely contained within `$HOME/.local/share/virtualenvs/`.

## Get the `semgrep-core` binary

Almost all usages of `semgrep-cli` require the `semgrep-core` binary.
To get this binary, your safest bet is to follow the instructions in [Building `semgrep-core`](semgrep-core-contributing.md#build-semgrep-core), which takes around 20 minutes.

Two shortcuts are available as alternatives, where you use a pre-compiled binary. The downsides of using a pre-compiled binary are:

- You are not able to make edits to `semgrep-core`, for example to fix a parse error.
- Semgrep fails if the interface between `semgrep-cli` and `semgrep-core` has changed since the binary was compiled. This has historically been happening around every two months, but can happen at any time without notice.

With that in mind, the available shortcuts are:

### The Homebrew shortcut

If you installed Semgrep through Homebrew with `brew install semgrep`, a `semgrep-core` binary was bundled within that installation, but is not made available on your `$PATH` by default.

You can add the bundled binary to your `$PATH` with this series of commands, provided you have `jq` installed:

```bash
export SEMGREP_BREW_INSTALLED_VERSION="$(brew info --json semgrep | jq '.[0].installed[0].version' -r)"
export SEMGREP_BREW_INSTALL_PATH="$(brew --cellar semgrep)/${SEMGREP_BREW_INSTALLED_VERSION}"
export SEMGREP_BREW_PYTHON_PACKAGE_PATH="$(${SEMGREP_BREW_INSTALL_PATH}/libexec/bin/python -m pip list -v | grep '^semgrep\b' | awk '{ print $3 }')"
export SEMGREP_BREW_CORE_BINARY_PATH="${SEMGREP_BREW_PYTHON_PACKAGE_PATH}/semgrep/bin"
export PATH="${SEMGREP_BREW_CORE_BINARY_PATH}:${PATH}"
```

### The manual shortcut

Visit the [releases page](https://github.com/semgrep/semgrep/releases) and grab the latest zipfile or tarball for your platform. Extract this archive and inside should be the necessary binaries. You can confirm this by running:

```bash
./semgrep-core --help
```

Copy this file to somewhere in your `$PATH` so `semgrep-cli` can find them. For example, you may create a `~/bin/` directory within the repository. Include it in your `$PATH` and run the binary from there.

Alternatively, you may include it somewhere like `/usr/local/bin/`.

## Run `semgrep-cli`

Ensure that you are in `cli/` directory, and then issue the following command:

```
pipenv run semgrep --help
```

To try a simple analysis, you can run:

```
echo 'if 1 == 1: pass' | semgrep --lang python --pattern '$X == $X' -
```

Congratulations, you have Semgrep running locally!

## Install `semgrep`

You can always run `semgrep` from `cli/`, which will use your latest changes in that directory, but you may also want to install the `semgrep` binary. To do this, run

```
pipenv install --dev
```

Some people have encountered difficulties with the above. If it fails, you can reach out to the [`semgrep` team on Slack](https://go.semgrep.dev/slack).

Now you can run `semgrep --help` from anywhere.

If you have installed `semgrep-core` from source, there are convenient targets in the root Makefile that let you update all binaries. After you pull, simply run

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
3. Add the original package to `cli/setup.py` in the `install_requires` list variable. You can find the version number either in the `Pipfile.lock` changes or by looking up online the most recent major version of the package.
    ```
    install_requires = [
       ...
       "pyyaml~=6.0",
    ]
    ```

This change makes your package a dependency of published Semgrep. Without this change, if you create a pull request, the CI job called `build docker image` fails with a `ModuleNotFoundError`, indicating that it is unable to find your package.

## Troubleshooting

For a reference build that's known to work, consult the root `Dockerfile`
to build semgrep inside a container. You can check that it builds with

```
docker build -t semgrep .
```

## Testing

`semgrep-cli` uses [`pytest`](https://docs.pytest.org/en/latest/) for testing.

To run tests, run the following command:

```
pipenv run pytest
```

There are some much slower tests which run semgrep on many open source projects. To run these slow tests, run:

```sh
pipenv run pytest tests/qa
```

If you want to update the tests to match to the current output:
```sh
make regenerate-tests
```

Running a single test file is simple too:

```
pipenv run pytest path/to/test.py
```

Or running an individual test function:

```
pipenv run pytest path/to/test.py::test_func_name
```

`semgrep-cli` also includes [`pytest-benchmark`](https://pytest-benchmark.readthedocs.io/en/latest/)
to allow for basic benchmarking functionality. This can be run like so:

```
pipenv run pytest --benchmark-only
```
