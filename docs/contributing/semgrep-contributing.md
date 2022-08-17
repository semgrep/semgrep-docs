# `semgrep` contributing

The following explains how to build `semgrep` so that you can make and test changes to the Python wrapper. You may want to read the README first to understand the relationship between `semgrep` and `semgrep-core`.

## Setting up the environment

You will need Python >= 3.7.

Most Python development is done inside the `semgrep` directory (from the top level of this repo, `semgrep/semgrep/`):

```bash
cd semgrep
```

We use [`pipenv`](https://github.com/pypa/pipenv) to manage our virtual environment.
You can install it like this:

```bash
python -m pip install pipenv
```

Next we need to initialize the environment.
This command will install dev dependencies such as pytest and will also install semgrep in editable mode in the pipenv.

```bash
SEMGREP_SKIP_BIN=true python -m pipenv install --dev
```

:::note
SEMGREP_SKIP_BIN` tells the installer that we will bring our own semgrep-core; see below.*
:::

## Getting the `semgrep-core` binary

Almost all usages of `semgrep` require the `semgrep-core` binary.
To get this binary,
your safest bet is to follow the instructions in [Building `semgrep-core`](semgrep-core-contributing.md#building-semgrep-core),
which takes around 20 minutes.

Two shortcuts are available as alternatives,
where you use a pre-compiled binary.
The downsides of using a pre-compiled binary are:

1. You will not be able to make edits to `semgrep-core`,
   for example to fix a parse error.
2. Semgrep will fail if the interface between `semgrep` and `semgrep-core` has changed
   since the binary was compiled.
   This has historically been happening around every two months,
   but can happen at any time without notice.

With that in mind, the available shortcuts are:
### The Homebrew shortcut

If you installed Semgrep via Homebrew with `brew install semgrep`,
a `semgrep-core` binary was bundled within that installation,
but is not made available on your `$PATH` by default.

You can add the bundled binary to your `$PATH` with this series of commands,
provided you have `jq` installed:

```bash
export SEMGREP_BREW_INSTALLED_VERSION="$(brew info --json semgrep | jq '.[0].installed[0].version' -r)"
export SEMGREP_BREW_INSTALL_PATH="$(brew --cellar semgrep)/${SEMGREP_BREW_INSTALLED_VERSION}"
export SEMGREP_BREW_PYTHON_PACKAGE_PATH="$(${SEMGREP_BREW_INSTALL_PATH}/libexec/bin/python -m pip list -v | grep '^semgrep\b' | awk '{ print $3 }')"
export SEMGREP_BREW_CORE_BINARY_PATH="${SEMGREP_BREW_PYTHON_PACKAGE_PATH}/semgrep/bin"
export PATH="${SEMGREP_BREW_CORE_BINARY_PATH}:${PATH}"
```

### The manual shortcut

Visit the [releases page](https://github.com/returntocorp/semgrep/releases)
and grab the latest zipfile or tarball for your platform. Extract this archive
and inside should be the necessary binaries. You can confirm this by running:

```bash
./semgrep-core --help
```

Copy this file to somewhere in your `$PATH` so `semgrep` can find them. For
example, you may create a `~/bin/` directory within the repository. [Include it in your `$PATH`](https://unix.stackexchange.com/questions/26047/how-to-correctly-add-a-path-to-path)
and run the binary from there.

Alternatively, you may include it somewhere like `/usr/local/bin/`.

## Running `semgrep`

Ensure that you are in `cli/` directory, and then issue the following command:

```
pipenv run semgrep --help
```

To try a simple analysis, you can run:

```
echo 'if 1 == 1: pass' | python -m semgrep --lang python --pattern '$X == $X' -
/tmp/...
1:if 1 == 1: pass
```

Congratulations, you have Semgrep running locally!

## Installing `semgrep`

You can always run `semgrep` from `semgrep/semgrep/`, which will use your latest changes in that directory, but you may also want to install the `semgrep` binary. To do this, run

```
pipenv install --dev
```

Some people have encountered difficulties with the above. If it fails, you can also try (within the `semgrep/semgrep/` directory)

```
sudo pip install -e .
```

If you have an M1 Mac, this may install the incorrect executable. You can run this instead
```
brew install semgrep
```

Now you can run `semgrep --help` from anywhere.

If you have installed `semgrep-core` from source, there are convenient targets in the root Makefile that let you update all binaries. After you pull, simply run

```
make rebuild
```

See the Makefile in `semgrep/`

## Troubleshooting

For a reference build that's known to work, consult the root `Dockerfile`
to build semgrep inside a container. You can check that it builds with

```
docker build -t semgrep .
```

## Testing

`semgrep` uses [`pytest`](https://docs.pytest.org/en/latest/) for testing.

To run tests, run the following command:

```
pipenv run pytest
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
pipenv run pytest -k test_func_name path/to/test.py
```

`semgrep` also includes [`pytest-benchmark`](https://pytest-benchmark.readthedocs.io/en/latest/)
to allow for basic benchmarking functionality. This can be run like so:

```
pipenv run pytest --benchmark-only
```
