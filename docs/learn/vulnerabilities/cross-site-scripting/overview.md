---
title: Cross-Site Scripting (XSS)
description: Learn about Cross-Site Scripting (XSS) vulnerabilities.
hide_title: false
displayed_sidebar: learnSidebar
slug: /learn/vulnerabilities/cross-site-scripting
tags:
  - xss
---

**Cross-Site Scripting (XSS)** happens when a malicious user injects scripts into the content of a trusted website that are executed in other users’ browsers. This has the potential to expose otherwise private information because the code is assumed to be safe to execute.

This article will walk you through the fundamentals of XSS, explain how common attacks work, show what vulnerable code looks like, and provide practical steps you can take to prevent these issues in your own projects.

## What is Cross-Site Scripting (XSS)

Cross-site scripting remains one of the most frequently reported web vulnerabilities in the Common Vulnerabilities and Exposures (CVE) database and consistently appears in the OWASP Top Ten list. This issue continues to affect applications of all sizes, from small personal projects to major platforms. 

At its core, cross-site scripting is a problem that arises because web applications are designed to be interactive experiences. Applications want users to add comments, search for information, and share content. This interactivity requires user-provided input to be displayed back to the page. This goal also creates an opportunity for malicious code to be introduced.

When user input is not handled safely, the browser may interpret it as executable code instead of plain text. This means the attacker can essentially place their own instructions into the application, which then runs in the unsuspecting user’s browser. The risk comes from failing to properly control when and how user data is used within pages and the corresponding access granted by running the code within the domain.

## Common XSS Attacks

The security community generally groups cross-site scripting into three categories: stored, reflected, and Document Object Model (DOM)-based.

### Stored Cross-Site Scripting

**Stored cross-site scripting** happens when an attacker injects malicious code that is permanently stored on the server, for example in a comment field or a user profile. When other users view that page, the code is delivered to them as if it were part of the site. A comment like `<script>alert('semgrep.dev')</script>` may look harmless, but if not sanitized, it runs every time the page loads.

### Reflected Cross-Site Scripting

**Reflected cross-site scripting** occurs when an attacker tricks a user into clicking a crafted link, often through phishing or social engineering. The malicious code is embedded in the URL, and when the application reflects that value directly into the page, it executes. For example, a search query to `https://semgrep.dev/search?q=%3Cscript%3Ealert('XSS')%3C/script%3E` could trigger execution if the application displays the query without cleaning it first.

### DOM-based Cross-Site Scripting

**DOM-based cross-site scripting** is slightly different. Instead of relying on the server to send malicious code, it abuses the client-side JavaScript logic itself. If the script on a page takes data directly from the URL or another source and inserts it into the page without validation, it can lead to execution of unexpected code. A simple example would be client-side code that does `document.body.innerHTML = location.hash;` without any checks since this is a user-controlled part of the URL (ie. https://semgrep.dev/#payload-here).


## Detecting XSS Vulnerabilities in Your Code

Finding cross-site scripting issues can be difficult because they often look like normal functionality. Consider the following snippet:

```html
<form action="/search">
  <input type="text" name="q">
</form>
<p>You searched for: <span id="result"></span></p>
<script>
  const params = new URLSearchParams(window.location.search);
  document.getElementById('result').innerHTML = params.get('q');
</script>

```

Here, the code takes the value of `q` from the URL and inserts it directly into the page. If someone navigates to `https://semgrep.dev/search?q=<img src=x onerror=alert(1)>` (in practice this would be URLencoded, but left as is for readability here), the payload runs in the browser. The issue lies in how untrusted input flows into a part of the page where it is interpreted as code.

Developers can detect these patterns by reviewing how data travels from input sources (like forms, query parameters, or stored fields) to sensitive sinks (like `innerHTML`, `document.write`, or raw template outputs). Tools like Semgrep can automate this by scanning for dangerous data flows and highlighting cases where user-controlled values reach unsafe functions without proper handling.

## Recommendations and Mitigations

Developers do not need to become security experts to prevent cross-site scripting. A few consistent practices go a long way. Always treat user input as untrusted, and ensure that any data rendered into a page is correctly encoded for the context it is used in. For example, text shown in HTML should be encoded so that characters like `<` and `>` are not interpreted as tags. Avoid directly setting content with functions like `innerHTML` unless it is absolutely necessary.

When working with dynamic behavior, use safer alternatives such as APIs that insert text rather than raw HTML. For stored data, validate and sanitize input before saving it to the database. For client-side code, be cautious about how data from the URL or other data sources makes its way into the page so that it is encoded properly before being used in a script. Many popular web frameworks now automate proper HTML encoding. As long as you use and don't circumvent the paved path in your templating engine you can be safer.

Detecting issues early with automated tools such as Semgrep can give developers confidence that risky patterns are identified before they reach production.

## Conclusion

Cross-site scripting is one of the most common and enduring security issues in web applications. By understanding stored, reflected, and DOM-based variants, developers can better recognize where their code may be at risk. The underlying problem is always the same: untrusted input making its way into the page without safe handling. By encoding output properly, avoiding risky functions, and using tools like Semgrep to detect flaws, developers can reduce exposure significantly.

Just as interactive features make applications more engaging, they also increase opportunities for mistakes. Addressing cross-site scripting is not just about preventing attacks but about building trust with users and protecting their experience. For developers, the next step is clear: review your code, try scanning it with Semgrep, and take proactive steps to stop cross-site scripting before it becomes a problem.






