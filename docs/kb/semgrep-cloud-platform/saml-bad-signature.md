# SSO Error: Signature validation failed.  SAML Response rejected.

When setting up single-sign on (SSO), you may encounter the following error description:

```
Signature validation failed. SAML Response rejected
```

To fix this, you can inspect the certificate you uploaded to Semgrep Cloud Platform by entering the following command in your terminal:

```console
openssl x509 -in server.crt -text -noout 
```

Check the information it returns, such as:

- Signing authority
- Expiration date
- Signature

Fix your certificate based on the information from the `openssl` command.
