---
slug: network-broker
title: Start Guide for Semgrep Network Broker
hide_title: false
description: Learn how to set up the Semgrep Network Broker
tags:
  - Semgrep CI
  - Network broker
---

# Getting started with the Semgrep Network Broker

The Semgrep Network Broker facilitates secure access between Semgrep and a private network. It accomplishes this by establishing a Wireguard VPN tunnel with the Semgrep backend, then proxying inbound (Semgrep --> customer) HTTP requests through this tunnel. This approach allows Semgrep to interact with on-prem resources without having to expose them to the public internet.

Examples of inbound traffic include:

- Pull Request comments
- JIRA integrations
- Webhooks

:::info Prerequisites
- The Semgrep Network Broker is a feature that must be enabled in your Semgrep organization (org) prior to set up. Contact us on Slack or support@semgrep.com to get started.
- Docker must be installed on the server where you want to install the network broker. :::

## Setup

### Build

From the server terminal where you want to install the Network broker, create a `config.yaml` file that should look like this:

```
inbound:
  wireguard:
    localAddress: fdf0:59dc:33cf:9be8:yyyy:0:1
    privateKey: wwwwwwwww
    peers:
      - publicKey: PHlrQ3EpnGg9eTvuk1GwJVXD+3r3mTAvEnljVhM/cC4=
        endpoint: wireguard.semgrep.dev:51820
        allowedIps: fdf0:59dc:33cf:9be9:0000:0000:0000:0001/128
  heartbeat:
    url: http://[fdf0:59dc:33cf:9be9:0000:0000:0000:0001]/ping
  allowlist: []
  gitlab:
    baseUrl: <https://gitlab.xxxx.net/api/v4>
    token: glpat-xxxxx
```

<aside> 💡 The publicKey is the Semgrep public key. (PHlrQ3EpnGg9eTvuk1GwJVXD+3r3mTAvEnljVhM/cC4=)
</aside>


### Keypairs

The broker requires a Wireguard keypair to establish a secure connection.

To generate a customer public key:

```
docker run [ghcr.io/semgrep/semgrep-network-broker:](<http://ghcr.io/semgrep/semgrep-network-broker:latest>)[v0.14.0](<http://ghcr.io/semgrep/semgrep-network-broker:v0.14.0>) genkey
```

<aside> 💡 The version in the example is v0.14.0. You can use the latest stable version of the network broker. Check here.
</aside>

To generate a private key:

```
echo xxxxxxx | sudo docker run -i [ghcr.io/semgrep/semgrep-network-broker:v0.14.0](<http://ghcr.io/semgrep/semgrep-network-broker:v0.14.0>) pubkey
```

<aside> 💡 The xxxxx should be the generated public key
</aside>

:::info Tip 

Your public key is safe to share. _Do not_ share your private key with anyone (including Semgrep). :::

Update the config.yaml with the private key:

Add the customer public key in the Semgrep Cloud Platform:

### Configuration

1. Update the `config.yaml` with the GitLab/Github URL:

![Screenshot 2024-01-17 at 11.34.23.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/aeaf09c9-e827-4fed-b6a2-cc0fcc31bc3c/88dc88a1-6a3a-446a-a159-b5a9b33a853f/Screenshot_2024-01-17_at_11.34.23.png)

1. Update the `config.yaml` with a new GitLab/GitHub PAT token (User settings→Personal Access Token):

![Screenshot 2024-01-17 at 11.36.07.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/aeaf09c9-e827-4fed-b6a2-cc0fcc31bc3c/7d27eb8d-7498-4ed7-bf65-e8f0983ec057/Screenshot_2024-01-17_at_11.36.07.png)

![Screenshot 2024-01-17 at 11.36.54.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/aeaf09c9-e827-4fed-b6a2-cc0fcc31bc3c/21462d0b-e7f1-462e-9834-32e33ebec82b/Screenshot_2024-01-17_at_11.36.54.png)

<aside>
💡 API scope is enough

</aside>

1. Update the `config.yaml` with a local Address, basically it should be the local address: `fdf0:59dc:33cf:9be8:0:xxxx:0:1` where xxxx is the deployment_id in hexadecimal. Example: deployment id: 8849 in hexadecimal is 2291. 

<aside>
💡 You can use some online utilities to this conversion, like [this](https://www.rapidtables.com/convert/number/decimal-to-hex.html).

</aside>

1. Execute the following command to start with the broker:

`sudo docker run -d -it --rm -v $(pwd):/emt [ghcr.io/semgrep/semgrep-network-broker:v0.14.0](http://ghcr.io/semgrep/semgrep-network-broker:v0.14.0) -c /emt/config.yaml`

1. You can check the logs with `sudo docker logs xxxx` where `xxxx` is the container id

---
Not finding what you need in this doc? Ask questions in our [Community Slack group](https://go.semgrep.dev/slack), or see [Support](https://semgrep.dev/docs/support/) for other ways to get help.
