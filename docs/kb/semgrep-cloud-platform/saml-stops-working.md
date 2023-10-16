# Why a working SAML configuration can suddenly stop working


You've set up your SAML SSO configuration in the Semgrep platform and everything is working properly.  Users are successfully logging in and then all of a sudden, out of the blue, SSO authentication stops working without warning - a categorical failure.  Nothing changed in your configuration; you changed nothing in the SAML configuration.  Why is this happening?

There are at least three categorical reasons why an successfully implemented SAML configuration can stop working suddenly.  


### Faulty SSL certificate

One component of the SAML configuration is host validation of the targeted IdP server, entailing an upload/registraion of the IdP's x509 certificate.  If the certificate becomes invalid - expiration, revocation or rotation - host validation will fail for the IdP server and subsequently the IdP server will fail to respond to requests.  

##### Expired certificate (most likely) or Rotated Certificate (less likely)

Most likely cause for a faulty certificate:  the original uploaded x509 certificate expired, for which a newly generated x509 should be uploaded into the existing SAML configuration.  You can test the certificate's expiration by executing the following command:

You can inspect a certificate and check the return information about it - signing authority, expiration date, etc. - with the following openssl command: 

```
openssl x509 -in server.crt -text -noout 
```

or to be more specific for expiry date only:

```
openssl x509 -in server.crt -text -noout -dates
```

The expiration date appears in the response as *notAfter=expiration_date*.


If it is not expired, does it match the same certificate as used by the IdP?  This is where you can simultaneously use the *noout* information to determine if the IdP's host certificate was rotated.  Query the certificate seated on the IdP's host and confirm the certificate's proprieties (signature, issuer DN, validity period, subject key identifier, etc) match up with the SAML's certificate:  

```
openssl s_client -connect <IDP host:PORT> -show-certificates
```


##### Revoked certificate (least likely)

Ensure to check the Certificate Revocation List (CRL) to determine if this certificate has been revoked.  A certificate is irreversibly revoked if, for example, it is discovered that the certificate authority (CA) had improperly issued a certificate, or if a private-key is thought to have been compromised.  CRL's are published frequently for a host and you can verify against that. 

### Changed the SAML login url/added a redirect

Perhaps your SAML administrator changed some of the SAML configuration qualities on the IdP side; these changes need to be updated within your Semgrep SAML configuration.  You can determine the redirects and URLs posted to with a SAML tracer.   

Chrome has a SAML tracer called SAML-tracer and freely downloadable.  Like Wireshark, you can view the URLs in a UI where you can view the 302 redirects, for example.  

![SAML tracer extension](/img/kb/saml-tracer-extension.png)

![SAML tracer viewer](/img/kb/saml-tracer-viewer.png)


### Change in network routing

Some networking change, such as a firewall exception rule may have been introduced that severs the networking communication within the Semgrep user's intranet endpoint and the IdP's host.  This will render SAML dysfunctional.  Consulting with your network admins or run Wireshark to investigate this kind of problem and Semgrep Support can give pointers on introducing Wireshark filters for this network traffic:

https://www.wireshark.org/
