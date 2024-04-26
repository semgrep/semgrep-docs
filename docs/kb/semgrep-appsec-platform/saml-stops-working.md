---
description: Learn to troubleshoot SAML configuration when SAML stops working.
tags:
  - Semgrep AppSec Platform 
  - SSO
  - Troubleshooting
---

import MoreHelp from "/src/components/MoreHelp"

# SAML stops working

This article walks you through troubleshooting categorical SAML failures, or
instances where your SAML configuration stops working suddenly after you've
successfully configured it and used it for some time. There are several reasons
why these failures happen.

## The SAML configuration uses a faulty SSL certificate

One component of the SAML configuration is host validation of the targeted IdP
server, which entails uploading and registering the IdP's x509 certificate. If
the certificate becomes invalid - expiration, revocation, or rotation - host
validation fails for the IdP server. Then, the IdP server fails to respond to
requests.
 
### Expired certificate

The most likely cause of an invalid certificate is that it is expired. If that's
the case, you must upload a newly generated x509 certificate into your existing
SAML configuration. 

If you're not sure if your certificate has expired or not, you can check using the following commands:

```console
# return all certificate information
openssl x509 -in server.crt -text -noout 

# return only the expiration date
openssl x509 -in server.crt -text -noout -dates
```

The expiration date appears in the response as `notAfter=expiration_date`*`.

### Rotated certificate

If your certificate isn't expired, verify that it is the same certificate used
by the IdP. To do this:

1. Get information about the certificate your SAML configuration is using:

    ```console
    # return all certificate information
    openssl x509 -in server.crt -text -noout 
    ```
2. Query the certificate seated on the IdP's host:  

    ```console
    openssl s_client -connect <IDP host:PORT> -show-certificates
    ```

3. Verify that the IdP's certificate's proprieties, such as the signature, issuer
DN, validity period, subject key identifier, and so on, match those on the SAML
configuration's certificate.

If the certificates do not match, upload the correct certificate to your SAML configuration.

### Revoked certificate

Check the Certificate Revocation List (CRL) to determine if your certificate has
been revoked. A certificate can be irreversibly revoked if the certificate
authority (CA) has improperly issued a certificate or if a private key becomes
compromised. CRLs are published frequently for hosts, so if your SAML
configuration stops working, you can check to see if you're using a revoked
certificate. If so, upload a new, valid certificate to your SAML
configuration.

## There was a change in network routing

A network change can stop
networking communication with the Semgrep users' intranet endpoint and the IdP's
host, resulting in malfunctioning SAML. To fix this issue, consult 
your network administrators or run [Wireshark](https://www.wireshark.org/) to
investigate your network traffic. Semgrep Support can provide information on the
Wireshark filters that help identify the relevant traffic.

### Changes to the SAML login URL or adding a redirect

If your SAML administrator changes the SAML configuration on the IdP side, you
must change your Semgrep SAML configuration to match. For example, some of these
changes would be updates to the login URL or adding a redirect.

To determine what changes were made, you can use a SAML tracer.

Chrome offers a SAML tracer called
[SAML-tracer](https://chromewebstore.google.com/detail/saml-tracer/mpdajninpobndbfcldcmbpnnbhibjmch?pli=1)
that you can [add to your
browser](https://support.google.com/chrome_webstore/answer/2664769?hl=en).

<MoreHelp />
