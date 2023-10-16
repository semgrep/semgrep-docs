# SAML configuration error:  There is no AttributeStatement on the Response


![SAML AttributeStatement error](/img/kb/attribute-statement.png)

1) There are two potential solutions for this problem, which will depend on the expectations of the Service Provider:

      a) If the Service Provider anticipates a value for the specific SAML Attribute statement, you should ensure to include a value within the SAML settings.

      b) Conversely, if the Service Provider does not expect that specific Attribute statement to be transmitted, you should remove the statement from the                   SAML settings.

as per:

https://support.okta.com/help/s/article/SAML-attribute-statement-with-no-value-configured-not-properly-closed-in-assertion?language=en_US


Essentially, there is an attribute within your Service Provider (SP) that does not have a value ascribed to it and the payload you are sending back to your SP (what is your SP?  Okta, OneLogin etc) contains this attribute and hence, the SP raises this error.  

2) You can investigate the payload to determine what attribute it is failing on.  Again, Okta provides a nice KB article on how to debug this:

https://support.okta.com/help/s/article/How-to-View-a-SAML-Response-in-Your-Browser-for-Troubleshooting?language=en_US


Then you will need to take the appropriate measure from the two choices listed in #1.
