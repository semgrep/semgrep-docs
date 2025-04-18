---
description: "Azure OpenAI: Error 429 - Max Tokens Exceeded"
tags:
  - Semgrep Assistant
---

# Azure OpenAI: Error 429 - Max Tokens Exceeded

If you have chosen Azure OpenAI as your AI provider for Semgrep Assistant, and you see **Error 429 - Max Tokens Exceeded**:

1. Go to **Azure OpenAI Studio > Deployments** and select your active deployment.
1. Under **Details**, click **Edit** and increase the **Tokens per Minute Rate Limit** to the maximum value.
1. If the error persists, contact Microsoft Azure support to request a quota upgrade.

If you can't save the endpoint and API key when configuring Semgrep, Semgrep cannot establish a connection with Azure OpenAI.

1. Ensure that the endpoint URL is correctly formatted. It should look something like `https://<YOUR_DEPLOYMENT_NAME>.openai.azure.com/openai/deployments/mymodel/chat/completions?api-version=2023-05-06-preview`.
1. Verify that your API key is correct.