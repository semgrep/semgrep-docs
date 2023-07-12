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

Installation with brew does not support multiple versions of Semgrep, but you can use either pip or Docker to install different versions.

## Running different versions using pip

With `pip`, you can install a specific Semgrep version using pip's version syntax:

```
python3 -m pip install semgrep==x.y.z
```

Confirm installation by the following command:

```
semgrep --version
```

Then, execute Semgrep as you would normally on the command line.

## Running different versions using Docker

To run a version other than `latest` using Docker, use the tag for the version when pulling or running the image.

To pull:

```
docker pull returntocorp/semgrep:x.y.z
```

Example for a local run:

```
docker run --rm -v "${PWD}:/src" returntocorp/semgrep:x.y.z semgrep --config=auto
```

Example for a GitHub Actions CI configuration:

```
jobs:
  semgrep:
    name: semgrep/ci 
    runs-on: ubuntu-latest

    container:
      image: returntocorp/semgrep:x.y.z
```
