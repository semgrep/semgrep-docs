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

Semgrep's open source [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server scans AI-generated code for security vulnerabilities using Semgrep Code, Supply Chain, and Secrets. It works with any IDE-based MCP client. If Semgrep detects a security issue in your code, the IDE regenerates code until Semgrep reports no findings or you prompt the IDE to ignore the security issue.

## Additional resources

* Semgrep's `#mcp` [Slack community](https://go.semgrep.dev/slack)
* The [Semgrep MCP server repo on GitHub](https://github.com/semgrep/semgrep/tree/develop/cli/src/semgrep/mcp)
