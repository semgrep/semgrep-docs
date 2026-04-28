---
tags:
  - Semgrep CLI
  - Semgrep in CI
description: How to test scans with different versions of Semgrep.
---

# How to run different versions of Semgrep

Most of the time, it's best to run the latest version of Semgrep, as it has the most recent features and fixes.

However, when testing or managing upgrades, it can be helpful to run different versions of Semgrep to compare behavior. 

:::info
If you use Semgrep with Semgrep AppSec Platform, [only the latest 10 minor versions are supported](/deployment/checklist/#semgrep-versions).
:::

Installation with Homebrew does not support multiple versions of Semgrep, but you can use [`pipx`](https://pipx.pypa.io/stable/how-to/install-pipx/), [`uv`](https://docs.astral.sh/uv/), or Docker to install different versions. In the following examples, <code><span className="placeholder">x.y.z</span></code> is a placeholder for a version string.

## Running different versions using pipx

Install a specific Semgrep version using `pipx`'s version syntax:

<pre class="language-bash"><code>pipx install semgrep==<span className="placeholder">x.y.z</span></code></pre>

If you already have Semgrep installed via `pipx`, use `--force` to reinstall a different version:

<pre class="language-bash"><code>pipx install --force semgrep==<span className="placeholder">x.y.z</span></code></pre>

## Running different versions using uv

You can also pin a specific version using `uv tool install`:

<pre class="language-bash"><code>uv tool install semgrep==<span className="placeholder">x.y.z</span></code></pre>

Or run a specific version one-off, without installing it persistently, using `uvx`:

<pre class="language-bash"><code>uvx semgrep@<span className="placeholder">x.y.z</span> --version</code></pre>

Confirm installation:

```
semgrep --version
```

Then, execute Semgrep as you would normally on the command line.

## Running different versions using Docker

To run a version other than `latest` using Docker, use the tag for the version when pulling or running the image.

To pull:

<pre class="language-bash"><code>docker pull semgrep/semgrep:<span className="placeholder">x.y.z</span></code></pre>

To run locally, mounting the desired source directory (`/PATH/TO/SRC`) for scanning:

<pre class="language-bash"><code>docker run --rm -v "<span className="placeholder">/PATH/TO/SRC</span>:/src" semgrep/semgrep:<span className="placeholder">x.y.z</span> semgrep --config=auto</code></pre>

To run in GitHub Actions CI:

```yaml
jobs:
  semgrep:
    name: semgrep/ci 
    runs-on: ubuntu-latest

    container:
      image: semgrep/semgrep:x.y.z
```
