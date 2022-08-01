---
slug: rule-updates
description: >-
  Rule updates document significant rule updates made monthly.
toc_max_heading_level: 2
---

import LinkToRegistryRule from "/src/components/LinkToRegistryRule"

# Rule updates

Welcome to monthly rule updates! This document includes selected new rules and rule updates made by the Semgrep community and r2c.

## July 2022

### New Community rules

- <LinkToRegistryRule ruleId="csharp.dotnet.security.audit.missing-or-broken-authorization.missing-or-broken-authorization" />
- <LinkToRegistryRule ruleId="csharp.dotnet.security.audit.open-directory-listing.open-directory-listing" />
- <LinkToRegistryRule ruleId="csharp.dotnet.security.audit.misconfigured-lockout-option.misconfigured-lockout-option" />
- <LinkToRegistryRule ruleId="csharp.dotnet.security.audit.mass-assignment" />
- <LinkToRegistryRule ruleId="csharp.lang.security.cryptography.unsigned-security-token" />
- <LinkToRegistryRule ruleId="csharp.lang.security.open-redirect" />
- <LinkToRegistryRule ruleId="csharp.lang.security.stacktrace-disclosure" />

### Updated rules

- <LinkToRegistryRule ruleId="generic.secrets.security.detected-username-and-password-in-uri.detected-username-and-password-in-uri" /> (altered behavior)
- <LinkToRegistryRule ruleId="python.requests.best-practice.use-timeout" /> (fix autofix)
- <LinkToRegistryRule ruleId="dockerfile.best-practice.use-workdir.use-workdir" /> (improved message)
- <LinkToRegistryRule ruleId="python.pyramid.security.sqlalchemy-sql-injection.pyramid-sqlalchemy-sql-injection" /> (fixed bug)

### Rule changes

- Added additional import scenarios for os.system in <LinkToRegistryRule ruleId="python.lang.security.audit.dangerous-system-call" />

### Removed false positives (FPs)

- <LinkToRegistryRule ruleId="javascript.lang.security.detect-eval-with-expression.detect-eval-with-expression" /> 
- <LinkToRegistryRule ruleId="terraform.azure.security.appservice.appservice-account-identity-registered.appservice-account-identity-registered" />
- <LinkToRegistryRule ruleId="python.django.security.audit.xss.direct-use-of-httpresponse.direct-use-of-httpresponse" />

Rewritten with taint mode:
- <LinkToRegistryRule ruleId="javascript.express.security.audit.express-path-join-resolve-traversal" />
- <LinkToRegistryRule ruleId="javascript.lang.security.audit.code-string-concat" />
- <LinkToRegistryRule ruleId="javascript.lang.security.audit.path-traversal.path-join-resolve-traversal" />

Updated precision of source with `focus-metavariable`:
- <LinkToRegistryRule ruleId="javascript.express.security.injection.tainted-sql-string" />
- <LinkToRegistryRule ruleId="javascript.lang.security.audit.sqli.node-mysql-sqli" />

Added additional filters for acceptable SSL policies:
- <LinkToRegistryRule ruleId="terraform.aws.security.insecure-load-balancer-tls-version " />

Added sanitizers:
- <LinkToRegistryRule ruleId="typescript.angular.security.audit.angular-domsanitizer" />

Added sanitizers and a constant string filter:
- <LinkToRegistryRule ruleId="typescript.react.security.audit.react-dangerouslysetinnerhtml" />

Uses taint mode to remove uninteresting sources
- <LinkToRegistryRule ruleId="typescript.react.security.audit.react-href-var" />
    
Reduced severity to INFO:
- <LinkToRegistryRule ruleId="typescript.react.security.audit.react-jwt-decoded-property" />
- <LinkToRegistryRule ruleId="typescript.react.security.audit.react-jwt-in-localstorage " />
- <LinkToRegistryRule ruleId="typescript.react.security.audit.react-missing-noopener" />
- <LinkToRegistryRule ruleId="typescript.react.security.audit.react-missing-noreferrer" />

### Other

Fixed message typo:
- <LinkToRegistryRule ruleId="javascript.lang.best-practice.leftover_debugging" />
