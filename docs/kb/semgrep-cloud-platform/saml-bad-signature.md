---
description: If SAML signature validation fails, check your certificate upload and information.
tags:
  - Semgrep Cloud Platform 
  - SSO
  - Troubleshooting
---

# SSO Error: Signature validation failed. SAML Response rejected.

When setting up SAML single-sign on (SSO), you may encounter the following error: `Signature validation failed. SAML Response rejected`

![SAML signature validation error](/img/signature-validation.png#md-width)

This indicates one of two things:

* You may not have entered the certificate correctly in the Semgrep SSO settings. Verify that the signature there matches the one provided by your IdP.
* Your certificate may have a problem, such being outside its validity dates. Inspect the signature information for the certificate you uploaded to Semgrep Cloud Platform and ensure it is valid.

If your certificate file is stored as `server.crt`, you can view the signature information on the command-line using:

```console
openssl x509 -in server.crt -text -noout
```
Check information such as:

- Certificate authority/Issuer
- Validity dates
- Signature

Address any problems with the certificate. Then, ensure that you have uploaded the resulting certificate correctly to Semgrep Cloud Platform, and attempt a new SSO login.
