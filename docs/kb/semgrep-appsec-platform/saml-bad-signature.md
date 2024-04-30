---
description: If SAML signature validation fails, check your certificate upload and information.
tags:
  - Semgrep AppSec Platform 
  - SSO
  - Troubleshooting
---

import MoreHelp from "/src/components/MoreHelp"

# SAML SSO Error: Signature validation failed

When setting up SAML single-sign on (SSO), you may encounter the following error: `Signature validation failed. SAML Response rejected`

![SAML signature validation error](/img/signature-validation.png#md-width)

This indicates one of two things:

* You may not have entered the certificate correctly in the Semgrep SSO settings. Verify that the signature there matches the one provided by your IdP.
* Your certificate may have a problem, such as being outside its validity dates. Inspect the signature information for the certificate you uploaded to Semgrep AppSec Platform and ensure it is valid.

If your certificate file is stored as `server.crt`, you can view the signature information on the command-line using:

```console
openssl x509 -in server.crt -text -noout
```
Check information such as:

- Certificate authority or Issuer
- Validity dates
- Signature algorithm and value

Address any problems with the certificate. Then, upload the resulting certificate to the Semgrep AppSec Platform: 

1. Log in to [Semgrep AppSec Platform](https://semgrep.dev/login).
2. Click **<i class="fa-solid fa-gear"></i> Settings > Access > [SSO](https://semgrep.dev/orgs/-/settings/access/sso)**.
3. In the **Upload/Paste certificate** box, add the correct certificate.
4. Click **Save** to save this setting.

After updating the settings, attempt a new SSO login.

<MoreHelp />