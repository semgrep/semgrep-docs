# Signature validation failed.  SAML Response rejected.


![SAML AttributeStatement error](/img/kb/signature-validation.png)

The error raised is in reference to the signature of the requisite certificate uploaded into the SAML configuration and it is an invalid signature.  

You can inspect a certificate and check the return information about it - signing authority, expiration date, signature, etc. - with the following openssl command and should serve as a baseline sanity check for signature validation and remediate accordingly:

```
openssl x509 -in server.crt -text -noout 
```


