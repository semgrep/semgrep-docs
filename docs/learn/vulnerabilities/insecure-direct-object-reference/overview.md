---
title: Insecure Direct Object Reference (IDOR)
description: Learn about Insecure Direct Object Reference (IDOR) vulnerabilities
hide_title: false
displayed_sidebar: learnSidebar
slug: /learn/vulnerabilities/idor
---


Imagine you’re browsing your order history in an online store. You notice the URL includes an order ID, and out of curiosity, you try changing the number to see what happens.

As a developer, you probably don’t expect that exposing an endpoint like `/order/1337` could be risky on its own. But if the system doesn’t confirm that the authenticated user is allowed to view that order, it’s effectively handing out private data to anyone who knows or guesses the right ID. In the same webshop, however, viewing a public page like `/article/1234` is completely expected, that kind of access is part of the intended user experience.

This contrast highlights why **Insecure Direct Object Reference (IDOR)** bugs are so tricky: the exact same URL pattern can be safe in one place and risky in another. They’re easy to miss in code reviews, and hard for automated tools to catch unless they understand the specific context of your application. By using end user supplied parameters to reference a specific object on a remote server, it allows privilege escalation to access objects that should be restricted.

In this article, we’ll walk through what IDOR is, how attackers exploit it, how to recognize risky patterns in your code, and what to do to prevent it.


## What Is Insecure Direct Object Reference (IDOR)?

IDOR stands for Insecure Direct Object Reference. It’s a type of access control failure where a program exposes internal resources using identifiers that users can guess or manipulate. If the system doesn’t check that the user is authorized to access that resource, it opens the door to abuse.

This pattern was originally highlighted in the OWASP Top 10 under its own name, and today it falls under the broader category of Broken Access Control. It exists because many applications rely on predictable identifiers (integers, UUIDs, or filenames) and assume that if a user has the ID, they’re allowed to access the resource. But in reality, users frequently discover or guess other valid IDs, either by enumeration, brute force, or indirect leakage.

The root cause of IDOR is not just that an identifier is exposed, but that access control decisions are made (or skipped) based solely on user input.


## Common Attacks to Exploit IDOR

Imagine if our web platform allowed users to download Semgrep findings by name:

```
GET /findings-report/0xDC0DE-2025-03-18.pdf
```

If the backend simply looks up the file using the filename in the URL and returns it, an attacker can change the value to another filename:

```
GET /findings-report/faang-2025-09-17.pdf
```

If no access control check is in place, they now have a list of unresolved vulnerabilities for a large company.

This type of attack pattern can take many forms:

- **Numeric ID manipulation**: Attackers increment or decrement resource IDs in URLs or forms.
- **UUID guessing**: Even though UUIDs look random, in some systems they are exposed or reused in predictable ways.
- **Parameter tampering**: Web forms or API calls that accept `user_id`, `file_id`, or similar fields can be manipulated if the backend trusts the input blindly.
- **Indirect object references**: In some systems, identifiers appear in cookies, local storage, or metadata, which users can modify.

Attackers often discover these vulnerabilities during exploratory testing, such as browsing the application while authenticated and capturing requests with tools like browser dev tools or proxies.


## Detecting IDOR Vulnerabilities

Most static analysis tools look for dangerous sinks, such as executing code or running a command. But unlike traditional injection attacks, IDOR isn’t about where the input goes. IDOR is closer to a logic flaw: it’s the absence of an authorization check at the right point in the request flow.

Take the following Python example:

```python
def get_user_profile(request):
    user_id = request.GET.get("id")
    user = db.lookup_user(user_id)
    return JsonResponse(user.to_dict())
```

There’s no direct evidence here that anything is wrong. The code will likely work perfectly in production. But without a check like `if user_id != request.user.id`, the system allows any logged-in user to view any profile just by changing the `id` parameter.

This kind of problem requires context. The analyzer needs to understand not just that `user_id` came from the request, but that it controls access to a sensitive resource, and that no permission check was made before returning it.

This makes generic detection difficult, even for powerful static analyzers like Semgrep. Instead, what is required, is writing custom rules for your application that describe the access control logic you're expecting. For example, you might define a rule that flags any time a route parameter `user_id` is used in a query without checking it against the current user.

## Recommendations and Mitigations for Preventing IDOR

The most reliable way to prevent IDOR is to treat every request as untrusted, and never assume that having a resource ID means having access to it.

Design your access control in layers:

### Avoid exposing raw IDs

Consider using indirect references, such as short tokens or scoped identifiers that map to real records internally. Object records and files should never be referenced directly by an identifier that is easily guessable. 

Use randomly generated filenames but put rate limiting in place to mitigate against brute force attacks.

### Centralize access checks

Don’t scatter `if` statements everywhere. Build helper functions or decorators that can be applied consistently across routes. Use frameworks with built-in functionality to apply authentication and authorization.

If your framework supports declarative access control (like policy-based decorators or middleware), use it. Otherwise, document your expected permissions and test them using integration or security tests.

## Conclusion

IDOR is a simple vulnerability with serious consequences. It happens when applications use predictable identifiers for sensitive resources and forget to check whether the user is authorized to access them. These bugs are common, hard to detect automatically, and often missed in code reviews.

We’ve seen how IDOR works, why it’s difficult to find with static tools, how to recognize risky patterns, and what defensive steps to take. The most important step you can take is to build authorization checks that explicitly confirm whether a user has access to a resource, not just whether they’re logged in.

Security tools like Semgrep can help you enforce your project’s access control expectations by highlighting when critical checks are missing.
