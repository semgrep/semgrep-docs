---
description: Understanding the FedRAMP authorization boundary for code scanning services like Semgrep
tags:
  - Semgrep AppSec Platform
  - FedRAMP
---

# FedRAMP authorization boundary for code scanning services like Semgrep

At Semgrep, we understand the importance of staying within the FedRAMP Authorization Boundary guidelines, especially when it comes to code security and scanning services. Many other companies agree with our understanding of the FedRAMP Authorization Boundary guidance (Section 7) which stipulates that corporate services (like source code management or code security and scanning services) are outside of the FedRAMP Authorization Boundary so long as they do not contain any federal data or unauthorized metadata.  

When a code scanning service such as Semgrep scans your source code, it does not gain access to any federal data or government related meta-data if it is not contained within your source code.

The FedRAMP Authorization Boundary guidance specifically calls out that DevOps is outside of FedRAMP scope so long as *“there is no federal information within this environment”*. This requirement is almost always satisfied. When Semgrep scans code for a FedRAMP compliant customer, metadata is stored about their code but nothing else (that can be related to what federal data they store). For more information around metrics collected by Semgrep, please refer to our [docs](/docs/metrics).

![FedRAMP](/img/kb/FedRAMP.png)