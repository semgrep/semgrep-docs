---
description: Learn to troubleshoot SAML configuration when SAML stops working.
tags:
  - Semgrep AppSec Platform
  - SSO
  - Troubleshooting
---



# Troubleshooting SAML SSO

This article walks you through troubleshooting SAML SSO failures, including the case where your SAML configuration stops working after you've successfully configured it and used it for some time. There are several common reasons why a configuration may fail.

## Certificate issues

If you see the error `Signature validation failed. SAML Response rejected` it's likely there is a problem with the certificate. signature validation fails if the IdP certificate becomes invalid via expiration, revocation, or rotation.

### Expired certificate

The most likely cause of an invalid certificate is that it is expired. If that's the case, upload a newly generated x509 certificate into your existing
SAML configuration.

To determine if this is the issue, follow the guidance to resolve the [signature validation error](/docs/kb/semgrep-appsec-platform/saml-bad-signature).

### Rotated or revoked certificate

If the certificate isn't expired or outside its validity dates, verify that it matches certificate used by the IdP, and that the certificate has not been revoked.

If you are not a SAML administrator, the best next step is to contact your administrator to determine if you need to provide a new certificate due to rotation or revocation of the certificate.

## There was a change in network routing

If your SAML administrator changes the SAML configuration on the IdP side, you must change your Semgrep SAML configuration to match. For example, your administrator might update the login URL or add a redirect. This can result in errors in SAML communication.

To resolve the issue, reach out to your SAML administrator to determine the new information to use.
