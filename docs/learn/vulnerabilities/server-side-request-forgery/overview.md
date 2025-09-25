---
title: Server Side Request Forgery (SSRF)
description: Learn about Server Side Request Forgery vulnerabilities
hide_title: false
displayed_sidebar: learnSidebar
slug: /learn/vulnerabilities/server-side-request-forgery
---

**Server-Side Request Forgery (SSRF)** happens when a malicious user can manipulate your application into making network requests to unintended servers. This vulnerability is possible when users can manipulate the domain of a URL that your server sends requests to.

This article will walk you through the fundamentals of SSRF, explain how common attacks work, show what vulnerable code looks like, and provide practical steps you can take to prevent these issues in your own projects.

## What is SSRF?

In 2021, the security community added Server-Side Request Forgery (SSRF) to the OWASP Top 10 list of most critical web application risks. The OWASP Top 10 is based on recent data from a variety of sources such as security vendors and consultancies and bug bounties. SSRF earned its spot due to several high-profile breaches that have been traced back to SSRF, including incidents where attackers gained access to internal cloud metadata services.

Server-Side Request Forgery is a security issue that arises when a program accepts input from a user and uses it to make network requests. The original purpose of fetching remote data from within server-side code is usually harmless. You might need to grab a file from a partner service, query an external API, or allow users to preview a link.

The risk of SSRF comes from the way applications handle user-supplied URLs. When a program takes input from a user and uses it to build an outbound request, the server effectively allows the user to decide where the application sends requests to. Because these requests come from inside the server’s own environment, they often bypass the protections that normally shield internal services from the public internet. Features such as automatic redirects, flexible URL parsing, or built-in authentication can make the problem worse, because they extend the server’s reach and trust in ways an attacker can exploit.

## Common SSRF Attacks

One of the simplest SSRF attacks involves making a request to a URL controlled by the attacker. Imagine a web application that lets users paste in a link to fetch metadata. If the application directly requests whatever link the user provides, the attacker can force the server to fetch malicious content instead of safe data like:

```
https://attacker.com
```

A second type of attack targets internal services. Cloud environments often expose metadata endpoints on private network addresses. An attacker who provides a URL like:

```
https://169.254.169.254/latest/meta-data/
```

The above can trick your server into retrieving sensitive metadata and credentials from the internal network. From there, the attacker may escalate access to control cloud resources or steal secrets.

OWASP maintains an [SSRF cheat sheet](https://owasp.org/Top10/A10_2021-Server-Side_Request_Forgery_%28SSRF%29) with further examples.



## Detecting SSRF Vulnerabilities in Your Code

Let’s look at a short Python example:

```python
import requests
from flask import request

def fetch_data_vulnerable():
    user_supplied_url = request.args.get("url")
    if user_supplied_url.startswith("https://semgrep.dev")
	    response = requests.get(user_supplied_url)
	  else
		  response = None
    return response.text
    
def fetch_data_securely():
    user_supplied_request_params = request.args.get("params")
    response = requests.get("https://semgrep.dev/" + user_supplied_request_params)
    return response.text
```

In the function `fetch_data_vulnerable`, a request is made to a user-supplied url. There is a check to see if the url is on the domain [`semgrep.dev`](http://semgrep.dev) but it is insufficient. Notice what happens if the user enters `https://semgrep.dev.attacker.com`. The resulting URL is an attacker-controlled domain. This is a textbook case of SSRF.

Tools like Semgrep can detect this type of issue automatically. They will look for untrusted input from user requests flowing into functions that send HTTP requests. The rule recognizes when user input is concatenated into the URL or passed through intermediate variables. This makes it practical to find SSRF vulnerabilities across large codebases without needing to manually inspect every string operation.


## Recommendations and Mitigations

It is often required or desirable for the functionality of the application to let users control part of the request. However, to avoid SSRF, under no circumstances should you allow user input to control the host portion of a URL. As we’ve seen earlier in this article, even checking the domain against an allowlist is still risky if it’s not properly implemented. The best solution is to restrict user input to safe components of the url such as query parameters or paths, and encode them properly. 

So, instead of building `https://` + user input, consider using a fixed base domain like `https://api.semgrep.dev/` and only appending user-controlled values after it.

If this is not possible, validation can still be a strong defense. Apply strict checks to ensure that user input does not include unexpected schemes (`file://`, `gopher://`, etc.), IP addresses, or nested authentication segments. Where possible, use allowlists of trusted domains, rather than trying to block known bad ones.

Finally, monitor your code regularly. Automated tools like Semgrep make it easier to detect when risky patterns creep in over time. Running these checks as part of your development workflow can prevent issues from slipping into production in the first place.


## Conclusion

Server-Side Request Forgery has been the root cause of significant breaches. The core risk is simple: if your server makes requests based on untrusted input, you may unintentionally give attackers a bridge into systems they should never reach.

We covered the basics of SSRF, explored common attacks, looked at a vulnerable code example, and reviewed practical ways to prevent this issue. The main message is clear—never let users dictate the base of the URL your server requests.

Just as high-profile breaches showed, overlooking SSRF can turn a small coding choice into a major incident. By understanding the risk and applying the safeguards discussed here, you can protect your projects and avoid repeating the mistakes that attackers count on. If you’d like to go deeper, try running Semgrep on your own code and explore our security rules for SSRF detection.