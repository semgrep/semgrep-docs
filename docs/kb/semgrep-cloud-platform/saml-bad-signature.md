# SSO Error: Signature validation failed.  SAML Response rejected.

When setting up single-sign on (SSO), you may encounter the following error:

```
Signature validation failed. SAML Response rejected
```

To fix this, inspect the signature of the certificate you uploaded to Semgrep Cloud Platform:

```console
openssl x509 -in server.crt -text -noout
```

Check the **signature information** it returns, such as:

- Signing authority
- Expiration date
- Signature

Fix any incorrect information returned by the `openssl` command.
