---
slug: network-broker
title: Semgrep Network Broker
hide_title: false
description: Learn how to set up the Semgrep Network Broker, which facilitates secure access between Semgrep and your private network.
tags:
  - Semgrep in CI
  - Network broker
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
- **Docker** must be installed on the server where you install the network broker.

## Configure Semgrep Network Broker

Ensure that you are logged in to the server where you want to run Semgrep Network Broker. Complete the following steps while logged in to that server.

1. Create a `config.yaml` file similar to the following snippet. The steps required to generate values for the placeholders `SEMGREP_LOCAL_ADDRESS`, `YOUR_PRIVATE_KEY`, `YOUR_BASE_URL`, and `YOUR_TOKEN`, are provided in subsequent steps of this guide.

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
      token: YOUR_TOKEN
  ```

  The `publicKey` value should be entered precisely as follows:

  ```console
  4EqJwDZ8X/qXB5u3Wpo2cxnKlysec93uhRvGWPix0lg=
  ```

1. The broker requires a WireGuard keypair to establish a secure connection. To generate your private key `YOUR_PRIVATE_KEY`:

   1. Determine the [network broker version](https://github.com/semgrep/semgrep-network-broker/pkgs/container/semgrep-network-broker) you want to use. The format should be similar to `v0.14.0`.

   1. Run the following command in the CLI to generate your private key, replacing the placeholder with the network broker version number:
  <pre class="language-console"><code>docker run ghcr.io/semgrep/semgrep-network-broker:<span className="placeholder">VERSION_NUMBER</span> genkey</code></pre>

1. Run the following command in the CLI to generate your public key, replacing the placeholders with your private key generated in the previous step and the network broker version number:

  <pre class="language-console"><code>echo `<span className="placeholder">YOUR_PRIVATE_KEY</span>` | sudo docker run -i ghcr.io/semgrep/semgrep-network-broker:<span className="placeholder">VERSION_NUMBER</span> pubkey</code></pre>

  :::info Key sharing 
  Your public key is safe to share. Do **not** share your private key with anyone, including Semgrep.
  :::

1. Update the `config.yaml` file with your private key:

  ```yaml
  inbound:
    wireguard:
      localAddress: fdf0:59dc:33cf:9be8:yyyy:0:1
      privateKey: YOUR_PRIVATE_KEY
      ...
  ```

1. Add your public key to the Semgrep Cloud Platform:

   1. Log in to Semgrep Cloud Platform.
   2. Navigate to **Settings** > **Broker**.
   3. Paste your public key and click **Add Public Key**.

   ![Screenshot of Semgrep Cloud Platform's Network Broker page](/img/scp-broker.png#md-width)

2. Update the `config.yaml` by replacing `YOUR_BASE_URL` with your GitLab or GitHub URL:

  ```yaml
  # for GitLab 
  gitlab:
    baseUrl: <https://gitlab.exampleCo.net/api/v4>
    token: YOUR_TOKEN

  # for GitHub 
  github:
    baseUrl: <https://github.exampleCo.com/api/v3>
    token: YOUR_TOKEN
  ```

1. [Create a GitLab personal access token (PAT)](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#create-a-personal-access-token) with the `api` scope, and add the token to `config.yaml` by replacing `YOUR_TOKEN` in the `token` field:

  ```yaml
  gitlab:
    baseUrl: <https://gitlab.xxxx.net/api/v4>
    token: YOUR_TOKEN
  ```

  GitHub users can [use their personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) as long as it has the `pull_requests:write` permission set:

  ```yaml
  github:
    baseUrl: <https://github.exampleCo.com/api/v3>
    token: YOUR_TOKEN
  ```

1. Convert your deployment ID to hexadecimal for use in creating your deployment's local address `SEMGREP_LOCAL_ADDRESS`. You can use a tool such as [Decimal to Hexadecimal converter](https://www.rapidtables.com/convert/number/decimal-to-hex.html) if needed.

  <pre class="language-console"><code>fdf0:59dc:33cf:9be8:0:<span className="placeholder">DEPLOYMENT_ID</span>:0:1</code></pre>
 
  Update the `localAddress` field of `config.yaml`; 

  ```yaml
  inbound:
    wireguard:
      localAddress: fdf0:59dc:33cf:9be8:0:DEPLOYMENT_ID:0:1
  ```

1. Run the following command to start Semgrep Network Broker with your updated configuration file:

  <pre class="language-console"><code>sudo docker run -d -it --rm -v $(pwd):/emt ghcr.io/semgrep/semgrep-network-broker:<span className="placeholder">VERSION_NUMBER</span> -c /emt/config.yaml</code></pre>

## Check Semgrep Network Broker logs

You can check the logs for Semgrep Network Broker by running:

<pre class="language-console"><code>sudo docker logs <span className="placeholder">CONTAINER_ID</span></code></pre>
