---
slug: network-broker
title: Semgrep Network Broker
hide_title: false
description: Learn how to set up the Semgrep Network Broker, which facilitates secure access between Semgrep and your private network.
tags:
  - Deployment
---

# Set up the Semgrep Network Broker

The Semgrep Network Broker facilitates secure access between Semgrep and your private network. It accomplishes this by establishing a WireGuard VPN tunnel with the Semgrep infrastructure, then proxying **inbound** HTTP requests from Semgrep to your network through this tunnel. This approach allows Semgrep to interact with on-premise resources without exposing them to the public internet.

Examples of inbound traffic include:

- Pull request (PR) or merge request (MR) comments
- Webhooks

:::info Tier availability
The Semgrep Network Broker is available to Enterprise tier users.
:::

## Prerequisites and feature availability

- The Semgrep Network Broker is a feature that must be enabled in your Semgrep organization (org) before setup. It is only available to paying customers. Contact the [Semgrep support team](/docs/support) to discuss having it enabled for your organization.
  - If you will be using the broker with a dedicated Semgrep tenant, please note that in your request.
- **Docker** must be installed on the server where you install the network broker.

## Configure Semgrep Network Broker

Ensure that you are logged in to the server where you want to run Semgrep Network Broker. Complete the following steps while logged in to that server.

### Create the config file

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

### Generate a keypair

The broker requires a WireGuard keypair to establish a secure connection. To generate your private key to replace `YOUR_PRIVATE_KEY` in the config template:

1. Determine the [network broker version](https://github.com/semgrep/semgrep-network-broker/pkgs/container/semgrep-network-broker) you want to use. The format should be similar to `v0.22.0`. Most users should use the latest version, especially when setting up the broker for the first time.
1. Run the following command in the CLI to generate your private key, replacing the placeholder with the network broker version number:
  <pre class="language-console"><code>docker run ghcr.io/semgrep/semgrep-network-broker:<span className="placeholder">VERSION_NUMBER</span> genkey</code></pre>
1. Run the following command in the CLI to generate your public key, replacing the placeholders with your private key generated in the previous step and the network broker version number:

  <pre class="language-console"><code>echo <span className="placeholder">YOUR_PRIVATE_KEY</span> | sudo docker run -i ghcr.io/semgrep/semgrep-network-broker:<span className="placeholder">VERSION_NUMBER</span> pubkey</code></pre>

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

Update the `config.yaml` by replacing the SCM information containing `YOUR_BASE_URL` with your SCM and its base URL, for GitHub, GitLab, or Bitbucket Data Center.

For GitLab: 
<pre class="language-console"><code>
gitlab:
&nbsp;&nbsp;baseURL: https://<span className="placeholder">GITLAB_BASE_URL</span>/rest/api/latest
&nbsp;&nbsp;token: <span className="placeholder">GITLAB_PAT</span>
</code></pre>

For GitHub:
<pre class="language-console"><code>
github:
&nbsp;&nbsp;baseURL: https://<span className="placeholder">GITHUB_BASE_URL</span>/rest/api/latest
&nbsp;&nbsp;token: <span className="placeholder">GITHUB_PAT</span>
</code></pre>

For Bitbucket  - compatible with Network Broker versions 0.20.0 and later:
<pre class="language-console"><code>
bitbucket:
&nbsp;&nbsp;baseURL: https://<span className="placeholder">BITBUCKET_BASE_URL</span>/rest/api/latest
&nbsp;&nbsp;token: <span className="placeholder">BITBUCKET_ACCESS_TOKEN</span>
</code></pre>

### Add your local address to the config

1. Convert your organization ID to hexadecimal. The organization ID is found in the **Identifiers** section of the [Settings' **Deployment** page](https://semgrep.dev/orgs/-/settings) in Semgrep AppSec Platform. You may also hear this called a deployment ID. You can use a tool such as [Decimal to Hexadecimal converter](https://www.rapidtables.com/convert/number/decimal-to-hex.html) to perform the conversion if needed.
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

The Semgrep Network broker can log details of the proxied requests and responses for troubleshooting. Normally, these should only be collected when working to identify an issue. If requests and responses are large, they can occupy significant memory in the tunnel.

To log additional details, add this snippet to your broker configuration:

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

## Use Semgrep Network Broker with Managed Scans

Semgrep Managed Scans uses Semgrep Network Broker to connect to your internal source code management instance. To clone repositories for scanning from any organization or group, the URL allowlist must include the base URL of your instance. For example, if your source code manager is at `https://git.example.com/`, the following allowlist will permit cloning repositories:

```yaml
inbound:
  allowlist:
    # allow GET requests from https://git.example.com/*
    - url: https://git.example.com/*
      methods: [GET, POST]
```

## Run multiple instances of the Semgrep Network Broker

If necessary, you can run multiple instances of the Semgrep Network Broker. Semgrep handles its requests accordingly, preventing issues like duplicate PR or MR comments.
