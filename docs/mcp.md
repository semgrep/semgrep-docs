---
slug: mcp
append_help_link: false
title: MCP Server
hide_title: true
description: Learn about the MCP server for using Semgrep to scan code for security vulnerabilities.
tags:
 - MCP
 - Semgrep Code
---

# Semgrep MCP Server

Semgrep's open source Model Context Protocol (MCP) server enables you to scan for security vulnerabilities.

Semgrep is a fast, deterministic static analysis tool that semantically understands many [languages](https://semgrep.dev/docs/supported-languages) and comes with over [5,000 rules](https://semgrep.dev/registry). [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) is a standardized API for LLMs, Agents, and IDEs like Cursor, VS Code, Windsurf, or any tool that supports MCP to receive specialized help, gain context, and harness the power of tools.

Semgrep's open source MCP works with any IDE-based MCP client, enabling LLMs to use Semgrep to find and fix security issues in the code they generate.

:::note Beta project
Semgrep MCP Server is an active beta project in development. Join the `#mcp` [Slack community](https://go.semgrep.dev/slack) channel to provide your feedback, bug reports, feature requests, and code contributions.
:::

To learn more and get started, see the [Semgrep MCP server repo on GitHub](https://github.com/semgrep/mcp).
