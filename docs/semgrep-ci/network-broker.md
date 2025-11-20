---
slug: network-broker
title: Semgrep Network Broker
hide_title: false
description: Learn how to set up the Semgrep Network Broker, which facilitates secure access between Semgrep and your private network.
tags:
  - Deployment
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Set up the Semgrep Network Broker

The Semgrep Network Broker facilitates secure access between Semgrep and your private network. The Network Broker creates a WireGuard VPN tunnel to the Semgrep backend and proxies **inbound** HTTP requests (from Semgrep to the customer) through the tunnel. This allows Semgrep to communicate with private network resources like a Source Code Manager (SCM) without exposing them to the public internet.

Examples of inbound traffic include:

- [Pull request comments](/docs/category/pr-or-mr-comments)
- Code access for [Semgrep Managed Scans](/docs/deployment/managed-scanning/overview) if enabled
- [Webhooks](/docs/semgrep-appsec-platform/webhooks)

## Feature Availability
:::info Tier availability
The Semgrep Network Broker is available to Enterprise tier users.
:::
The Semgrep Network Broker is a feature that must be enabled in your Semgrep organization before setup. It is only available to paying customers. Contact the [Semgrep support team](/docs/support) to discuss having it enabled for your organization.

If you will be using the Network Broker with a dedicated Semgrep tenant, please note that in your request.

## Deployment
The Network Broker can be run as a bare Docker container, in a Kubernetes cluster, or simply as a standalone binary on a machine.

Only one instance of the WireGuard-based Network Broker can be run concurrently. Multiple brokers with the same configuration will cause disconnects, instability, and package loss.

### System Requirements
- CPU: 1
- RAM: 512 MB

### Network Requirements
- Between Semgrep and Broker:
  - Allow traffic from `wireguard.semgrep.dev` on UDP port 51820. If you are on a dedicated Semgrep tenant, allow traffic from `wireguard.<tenant-name>.semgrep.dev` instead.
  - If using the `--deployment-id` CLI flag, allow outbound to `semgrep.dev` on TCP port 443 for HTTPS.
- Between Broker and each private network resource:
  - Enable outbound on TCP ports 80 and 443 for HTTP/HTTPS communication.

:::info Determining IP Addresses
To determine the IP addresses for a domain, use dig. The addresses are listed under the ANSWER section. Example: `dig wireguard.semgrep.dev`
:::

### Artifacts
You can choose between deploying pre-made artifacts or building your own.
#### Pre-built by Semgrep
- Docker images are available from [ghcr.io/semgrep/semgrep-network-broker](https://github.com/semgrep/semgrep-network-broker/pkgs/container/semgrep-network-broker).
- A sample [Kubernetes Manifest](https://github.com/semgrep/semgrep-network-broker/blob/develop/kubernetes.yaml) is present within the repository. This should be extended for production.

#### Build Yourself
See the [Network Broker repository](https://github.com/semgrep/semgrep-network-broker)'s README for instructions on how to build it yourself.

## Configure Semgrep Network Broker

Ensure that you are logged in to the server where you want to run Semgrep Network Broker. Complete the following steps while logged in to that server.

### Create the config file

<Tabs
    defaultValue="current"
    values={[
    {label: 'v0.25.0 and later', value: 'current'},
    {label: 'v0.24.0 and earlier', value: 'legacy'}
    ]}
>

<TabItem value='current'>

Create a `config.yaml` file similar to the following snippet, or copy a starting config from the Semgrep AppSec Platform at  **Settings > Broker**. The steps required to generate values for the placeholders `SEMGREP_LOCAL_ADDRESS`, `YOUR_PRIVATE_KEY`, and `YOUR_BASE_URL`, as well as the scopes required for the access tokens, are provided in subsequent steps of this guide.

```yaml
  inbound:
    wireguard:
      localAddress: SEMGREP_LOCAL_ADDRESS
      privateKey: YOUR_PRIVATE_KEY
      peers:
        - endpoint: wireguard.semgrep.dev:51820
    allowlist: []
    gitlab:
      baseUrl: YOUR_BASE_URL
      token: GITLAB_PAT
```

</TabItem>
<TabItem value='legacy'>

:::note
Semgrep recommends that users running Network Broker v0.24.0 or earlier to upgrade to v0.25.0 or later. This enables the use of a simplified config file.
:::

Create a `config.yaml` file similar to the following snippet, or copy a starting config from the Semgrep AppSec Platform at  **Settings > Broker**. The steps required to generate values for the placeholders `SEMGREP_LOCAL_ADDRESS`, `YOUR_PRIVATE_KEY`, and `YOUR_BASE_URL` are provided in subsequent steps of this guide.

```yaml
  inbound:
    wireguard:
      localAddress: SEMGREP_LOCAL_ADDRESS
      privateKey: YOUR_PRIVATE_KEY
      peers:
        - publicKey: 4EqJwDZ8X/qXB5u3Wpo2cxnKlysec93uhRvGWPix0lg=
          endpoint: wireguard.semgrep.dev:51820
          allowedIps: fdf0:59dc:33cf:9be9:0000:0000:0000:0001/128
    heartbeat:
      url: http://[fdf0:59dc:33cf:9be9:0000:0000:0000:0001]/ping
    allowlist: []
    gitlab:
      baseUrl: YOUR_BASE_URL
      token: GITLAB_PAT
```

The `publicKey` value should be entered precisely as shown in the example:

```console
4EqJwDZ8X/qXB5u3Wpo2cxnKlysec93uhRvGWPix0lg=
```

</TabItem>
</Tabs>

#### Multiple configuration files
You can overlay multiple configuration files on top of each other by passing multiple `-c` arguments:

```console
semgrep-network-broker -c config1.yaml -c config2.yaml -c config3.yaml
```

Note that arrays are replaced, while maps are merged.

### Generate a keypair

The broker requires a WireGuard keypair to establish a secure connection. To generate your private key to replace `YOUR_PRIVATE_KEY` in the config template:

1. Determine the [Network Broker version](https://github.com/semgrep/semgrep-network-broker/pkgs/container/semgrep-network-broker) you want to use. The format should be similar to `v0.22.0`. Most users should use the latest version, especially when setting up the broker for the first time.
1. Run the following command in the CLI to generate your private key, replacing the placeholder with the Network Broker version number:
  <pre class="language-console"><code>docker run ghcr.io/semgrep/semgrep-network-broker:<span className="placeholder">VERSION_NUMBER</span> genkey</code></pre>
1. Run the following command in the CLI to generate your public key, replacing the placeholders with your private key generated in the previous step and the Network Broker version number:

  <pre class="language-console"><code>echo <span className="placeholder">"YOUR_PRIVATE_KEY"</span> | sudo docker run -i ghcr.io/semgrep/semgrep-network-broker:<span className="placeholder">VERSION_NUMBER</span> pubkey</code></pre>

  :::info Key sharing
  Your public key is safe to share. Do **not** share your private key with anyone, including Semgrep.
  :::

### Update the config with the keypair

1. Update the `config.yaml` file by replacing `YOUR_PRIVATE_KEY` with the value of your private key.
1. Add your public key to the Semgrep AppSec Platform:
   1. Log in to Semgrep AppSec Platform.
   2. Navigate to **Settings** > **Broker**.
   3. Paste your public key and click **Add Public Key**.
   ![Screenshot of Semgrep AppSec Platform's Network Broker page](/img/scp-broker.png#md-width)

### Update the config with your SCM information

Update the `config.yaml` by replacing the SCM information containing `YOUR_BASE_URL` with your SCM and its base URL for Azure DevOps, GitHub, GitLab, or Bitbucket Data Center.

<Tabs
    defaultValue="gh"
    values={[
    {label: 'Azure DevOps', value: 'ado'},
    {label: 'Bitbucket', value: 'bb'},
    {label: 'GitHub', value: 'gh'},
    {label: 'GitLab', value: 'gl'},
    ]}
>

<TabItem value='ado'>

<pre class="language-console"><code>
azuredevops:
&nbsp;&nbsp;baseURL: https://<span className="placeholder">ADO_BASE_URL</span>/*
&nbsp;&nbsp;token: <span className="placeholder">ADO_PAT</span>
</code></pre>

:::info Access tokens
Semgrep recommends providing the access token when you [connect the source code manager](/deployment/connect-scm#connect-to-cloud-hosted-orgs) instead of in the Network Broker configuration. However, if you must provide the token in the Network Broker configuration, see [Prerequisites](/semgrep-appsec-platform/azure-pr-comments#prerequisites) for access token requirements.
:::
</TabItem>

<TabItem value='bb'>

Bitbucket is compatible with Network Broker versions 0.20.0 and later.

<pre class="language-console"><code>
bitbucket:
&nbsp;&nbsp;baseURL: https://<span className="placeholder">BITBUCKET_BASE_URL</span>/rest/api/latest
&nbsp;&nbsp;token: <span className="placeholder">BITBUCKET_ACCESS_TOKEN</span>
</code></pre>

:::info Access tokens
Semgrep recommends providing the access token when you [connect the source code manager](/deployment/connect-scm) instead of in the Network Broker configuration. However, if you must provide the token in the Network Broker configuration, see Prerequisites for access token requirements:
- [Bitbucket Cloud](/semgrep-appsec-platform/bitbucket-cloud-pr-comments#create-and-add-a-workspace-access-token)
- [Bitbucket Data Center](/semgrep-appsec-platform/bitbucket-data-center-pr-comments#prerequisites)
:::

</TabItem>
<TabItem value='gh'>

<pre class="language-console"><code>
github:
&nbsp;&nbsp;baseURL: https://<span className="placeholder">GITHUB_BASE_URL</span>/api/v3
&nbsp;&nbsp;token: <span className="placeholder">GITHUB_PAT</span>
</code></pre>

</TabItem>
<TabItem value='gl'>

<pre class="language-console"><code>
gitlab:
&nbsp;&nbsp;baseURL: https://<span className="placeholder">GITLAB_BASE_URL</span>/api/v4
&nbsp;&nbsp;token: <span className="placeholder">GITLAB_PAT</span>
</code></pre>

:::info Access token
Semgrep recommends providing the access token when you [connect the source code manager](/deployment/connect-scm#connect-to-cloud-hosted-orgs) instead of in the Network Broker configuration. However, if you must provide the token in the Network Broker configuration, see [Prerequisites](/semgrep-appsec-platform/gitlab-mr-comments#prerequisites) for access token requirements.
:::

</TabItem>
</Tabs>

### Add your local address to the config

1. Convert your organization ID to hexadecimal. The organization ID is found in Semgrep AppSec Platform under [**Settings > General > Identifiers**](https://semgrep.dev/orgs/-/settings/general/identifiers) in Semgrep AppSec Platform. This is sometimes also called a deployment ID. You can use a tool such as [Decimal to Hexadecimal converter](https://www.rapidtables.com/convert/number/decimal-to-hex.html) to perform the conversion if needed.
2. Embed the resulting hexadecimal value in the string `fdf0:59dc:33cf:9be8:0:ORGANIZATION_ID:0:1`, replacing `ORGANIZATION_ID` with the value.
3. Update the `localAddress` field of `config.yaml`, replacing `SEMGREP_LOCAL_ADDRESS` with the string you generated in Step 2.

  ```yaml
  inbound:
    wireguard:
      localAddress: fdf0:59dc:33cf:9be8:0:ORGANIZATION_ID:0:1
  ```

### Start the broker

Run the following command to start Semgrep Network Broker with your completed configuration file:

  <pre class="language-console"><code>sudo docker run -d -it --rm -v $(pwd):/emt ghcr.io/semgrep/semgrep-network-broker:<span className="placeholder">VERSION_NUMBER</span> -c /emt/config.yaml</code></pre>

## Check Semgrep Network Broker logs

You can check the logs for Semgrep Network Broker by running:

<pre class="language-console"><code>sudo docker logs <span className="placeholder">CONTAINER_ID</span></code></pre>

### Adjusting log verbosity

The Semgrep Network Broker can log details of the proxied requests and responses for troubleshooting. To log additional details, add this snippet to your broker configuration:

:::warning Performance impact
Please enable these settings only while working to identify issues. Otherwise, significant memory in the tunnel is used on large request and response bodies.
:::

```yaml
inbound:
  logging:
    logRequestBody: true
    logResponseBody: true
```

In the logs, this leads to entries for `proxy.request` and `proxy.response`.

These values can also be set on a per-allowlist basis:

```
inbound:
  allowlist:
    - url: https://httpbin.org/*
      methods: [GET, POST]
      logRequestBody: true
      logResponseBody: true
```

This provides additional flexibility when troubleshooting. See the [broker README](https://github.com/semgrep/semgrep-network-broker?tab=readme-ov-file#logging) for more details.

### Enable verbose WireGuard logging

To troubleshoot connection issues potentially related to the WireGuard configuration, you can enable verbose logging by adding the following snippet to the broker configuration:

```yaml
inbound:
  wireguard:
    verbose: true
```

## Use Semgrep Network Broker with Managed Scans

Semgrep Managed Scans uses Semgrep Network Broker to connect to your internal source code management instance.

To enable Managed Scans when using Network Broker, ensure that you've updated your SCM information to allow code access:

<Tabs
    defaultValue="gh"
    values={[
    {label: 'Azure DevOps', value: 'ado'},
    {label: 'Bitbucket', value: 'bb'},
    {label: 'GitHub', value: 'gh'},
    {label: 'GitLab', value: 'gl'},
    ]}
>

<TabItem value='ado'>

<pre class="language-console"><code>
azuredevops:
&nbsp;&nbsp;baseURL: https://<span className="placeholder">ADO_BASE_URL</span>/*
&nbsp;&nbsp;token: <span className="placeholder">ADO_PAT</span>
&nbsp;&nbsp;allowCodeAccess: true
</code></pre>

:::info Access tokens
Semgrep recommends providing the access token when you [connect the source code manager](/deployment/connect-scm#connect-to-cloud-hosted-orgs) instead of in the Network Broker configuration. However, if you must provide the token in the Network Broker configuration, see [Prerequisites and permissions](/deployment/managed-scanning/azure#prerequisites-and-permissions) for access token requirements.
:::

</TabItem>

<TabItem value='bb'>

<pre class="language-console"><code>
bitbucket:
&nbsp;&nbsp;baseURL: https://<span className="placeholder">BITBUCKET_BASE_URL</span>/rest/api/latest
&nbsp;&nbsp;token: <span className="placeholder">BITBUCKET_ACCESS_TOKEN</span>
&nbsp;&nbsp;allowCodeAccess: true
</code></pre>

:::info Access tokens
Semgrep recommends providing the access token when you [connect the source code manager](/deployment/connect-scm#connect-to-on-premise-orgs-and-projects) instead of in the Network Broker configuration. However, if you must provide the token in the Network Broker configuration, see [Prerequisites and permissions](/deployment/managed-scanning/bitbucket#prerequisites-and-permissions) for access token requirements.
:::

</TabItem>
<TabItem value='gh'>

<pre class="language-console"><code>
github:
&nbsp;&nbsp;baseURL: https://<span className="placeholder">GITHUB_BASE_URL</span>/api/v3
&nbsp;&nbsp;token: <span className="placeholder">GITHUB_PAT</span>
&nbsp;&nbsp;allowCodeAccess: true
</code></pre>

:::info Access tokens
Semgrep recommends [connecting to GitHub using the Semgrep GitHub app](https://semgrep.dev/docs/deployment/connect-scm#connect-to-on-premise-orgs-and-projects), rather than providing the access token in the Network Broker configuration. However, if you must provide the token in the Network Broker configuration, see the GitHub instructions at [Grant code access to Semgrep with an access token](/docs/semgrep-appsec-platform/scm-code-access#grant-code-access-to-semgrep-with-an-access-token).
:::

</TabItem>
<TabItem value='gl'>

<pre class="language-console"><code>
gitlab:
&nbsp;&nbsp;baseURL: https://<span className="placeholder">GITLAB_BASE_URL</span>/api/v4
&nbsp;&nbsp;token: <span className="placeholder">GITLAB_PAT</span>
&nbsp;&nbsp;allowCodeAccess: true
</code></pre>

:::info Access tokens
Semgrep recommends providing the access token when you [connect the source code manager](/deployment/connect-scm#connect-to-on-premise-orgs-and-projects) instead of in the Network Broker configuration. However, if you must provide the token in the Network Broker configuration, see [Prerequisites and permissions](/deployment/managed-scanning/gitlab#prerequisites-and-permissions) for access token requirements.
:::

</TabItem>
</Tabs>

The Semgrep Network Broker supports repository cloning with GitHub when `allowCodeAccess` is `true`, beginning with Network Broker `v0.32.0`. For other source code managers, or earlier Network Broker versions the URL allowlist must include the base URL of your instance in order to clone repositories for scanning from **any** organization or group. For example, if your source code manager is at `https://git.example.com/`, the following allowlist will permit cloning repositories:

```yaml
inbound:
  allowlist:
    # allow GET requests from https://git.example.com/*
    - url: https://git.example.com/*
      methods: [GET, POST]
```

Semgrep also creates and updates [GitHub Checks](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/about-status-checks#checks) when performing Managed Scans on pull requests. If you are running `v0.30.0` or earlier of the Network Broker: to ensure checks can be both created and updated, add the `PATCH` method to the preceding allowlist example, or add a separate entry to allowlist check updates:

```yaml
inbound:
  allowlist:
    # allow PATCH requests to update checks
    - url: https://git.example.com/api/v3/repos/:owner/:repo/check-runs/:id
      methods: [GET, POST, PATCH]
```

In Network Broker `v0.31.0` and later, this URL is part of the default allowlist.

## Run multiple instances of the Semgrep Network Broker

Do not attempt to run multiple instances of the Semgrep Network Broker to increase availability. Running multiple instances can result in contention and is less reliable than running a single instance.

## Allowlist multiple source code managers with one configuration file

It is possible to allow access to multiple source code managers (SCM) within a single configuration file. One entry for a given SCM [uses the SCM-specific key provided in the configuration file](/semgrep-ci/network-broker#update-the-config-with-your-scm-information), as shown in the following example for a GitHub connection:

<pre class="language-console"><code>
github:
&nbsp;&nbsp;baseURL: https://<span className="placeholder">GITHUB_BASE_URL</span>/api/v3
&nbsp;&nbsp;token: <span className="placeholder">GITHUB_PAT</span>
</code></pre>

Subsequent entries for the same SCM require you to modify `allowlist` and add specific information needed for the HTTP requests. The following is a sample allowlist for additional GitHub entries:

<pre class="language-console"><code>
allowlist:
&nbsp;- url: https://<span className="placeholder">GITHUB_BASE_URL</span>/api/v3/repos/:owner/:repo
&nbsp;&nbsp;  methods: [GET]
&nbsp;&nbsp;  setRequestHeaders:
&nbsp;&nbsp;&nbsp;   Authorization: "Bearer <span className="placeholder">GITHUB_PAT</span>"
&nbsp;- url: https://<span className="placeholder">GITHUB_BASE_URL</span>/api/v3/repos/:owner/:repo/pulls
&nbsp;&nbsp;  methods: [GET]
&nbsp;&nbsp;  setRequestHeaders:
&nbsp;&nbsp;&nbsp;   Authorization: "Bearer <span className="placeholder">GITHUB_PAT</span>"
&nbsp;- url: https://<span className="placeholder">GITHUB_BASE_URL</span>/api/v3/repos/:owner/:repo/pulls/:number/comments
&nbsp;&nbsp;  methods: [POST]
&nbsp;&nbsp;  setRequestHeaders:
&nbsp;&nbsp;&nbsp;   Authorization: "Bearer <span className="placeholder">GITHUB_PAT</span>"
&nbsp;- url: https://<span className="placeholder">GITHUB_BASE_URL</span>/api/v3/:owner/:repo/issues/:number/comments
&nbsp;&nbsp;  methods: [POST]
&nbsp;&nbsp;  setRequestHeaders:
&nbsp;&nbsp;&nbsp;   Authorization: "Bearer <span className="placeholder">GITHUB_PAT</span>"
&nbsp;...
</code></pre>
