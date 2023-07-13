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
If you use Semgrep with Semgrep Cloud Platform, [only the latest 10 minor versions are supported](/docs/semgrep-cloud-platform/getting-started/).
:::

Installation with Homebrew does not support multiple versions of Semgrep, but you can use either Pip or Docker to install different versions. In the following examples, <code><span className="placeholder">x.y.z</span></code> is a placeholder for a version string.

## Running different versions using pip

You can install a specific Semgrep version using pip's version syntax.

<pre class="language-bash"><code>python3 -m pip install semgrep==<span className="placeholder">x.y.z</span></code></pre>

Confirm installation by the following command:

```
semgrep --version
```

Then, execute Semgrep as you would normally on the command line.

## Running different versions using Docker

To run a version other than `latest` using Docker, use the tag for the version when pulling or running the image.

To pull:

<pre class="language-bash"><code>docker pull returntocorp/semgrep:<span className="placeholder">x.y.z</span></code></pre>

Example for a local run, mounting the desired source directory (`/PATH/TO/SRC`) for scanning:

<pre class="language-bash"><code>docker run --rm -v "<span className="placeholder">/PATH/TO/SRC</span>:/src" returntocorp/semgrep:<span className="placeholder">x.y.z</span> semgrep --config=auto</code></pre>

Example for a GitHub Actions CI configuration:

```yaml
jobs:
  semgrep:
    name: semgrep/ci 
    runs-on: ubuntu-latest

    container:
      image: returntocorp/semgrep:x.y.z
```
