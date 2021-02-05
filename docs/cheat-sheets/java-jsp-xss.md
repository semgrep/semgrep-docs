---
template: cheat-sheet-base.html
title: XSS Prevention for Java + JSP
summary: |-
  This is a cross-site scripting (XSS) prevention cheat sheet by r2c. It
  contains code patterns of potential XSS in an application. Instead of scrutinizing code
  for exploitable vulnerabilities, the recommendations in this cheat sheet
  pave a safe road for developers that mitigates the possibility of XSS in your code. By 
  following these recommendations, you can be reasonably sure your code is free of XSS.
mitigation_summary: |-
  JSPs are fraught with peril. HTML escaping in JSP templates requires escaping all data
  that is rendered onto the page. Worse, business logic can be embedded into JSPs with
  scriptlets. This is easy to forget or abuse and can easily create XSS
  vulnerabilities. The default option should be the safe option: Consider using a view or
  template engine that escapes by default,
  such as JSF or Velocity. If you cannot migrate to another framework, use a custom
  EL resolver that applies escaping by default in JSPs, such as
  https://docs.oracle.com/javaee/6/api/javax/el/ELResolver.html, otherwise you MUST
  ensure all data is escaped. Do not use scriptlets.
  If you are developing a REST API, consider using JAX-RS instead of writing
  directly to <code>HttpServletResponse</code>. This is easier to review, maintain, and
  audit for issues. And as always, develop a secure coding policy and use a security
  checker to enforce it.
short_config_url: p/minusworld.java-httpservlet-jsp-xss
pdf: https://web-assets.r2c.dev/security-cheat-sheets/xss/r2c-security-cheat-sheet-xss-prevention-for-java-jsp.pdf
conditions:
  - id: "1"
    description: "Server code: writing a response directly"
    condition_details:
      - control: "A"
        short_description: "Using the <code>PrintWriter</code> from <code>HttpServletResponse</code>"
        description: |-
          The <code>PrintWriter from `HttpServletResponse</code> permits writing data directly to the response
          that will be returned to the user. This bypasses any safety mechanisms built into any
          frameworks in use.
        example: response.getWriter().write("<p>Hello, " + name + "!</p>");
        references: []
        mitigation:
          description: "Ban use of <code>PrintWriter</code> from <code>HttpServletResponse</code>"
          alternative: 'Render JSP pages using request forwarding: <code>request.getRequestDispatcher("/page.jsp").forward(...);</code>'
          rule: "java.lang.security.audit.xss.no-direct-response-writer.no-direct-response-writer"
      - control: "B"
        short_description: "Using the <code>OutputStream</code> from <code>HttpServletResponse</code>"
        description: |-
          The <code>OutputStream</code> from <code>HttpServletResponse</code> permits writing data directly to the response
          that will be returned to the user. This bypasses any safety mechanisms built into any
          frameworks in use.
        example: |+
          String template = "<p>Hello, " + name + "!</p>";
          response.getOutputStream().write(template.getBytes());
        references:
          - url: https://www.baeldung.com/jsp#forwarding
            text: Request forwarding to render JSP pages
        mitigation:
          description: "Ban use of <code>OutputStream</code> from <code>HttpServletResponse</code>"
          alternative: 'Render JSP pages using request forwarding: <code>request.getRequestDispatcher("/page.jsp").forward(...);</code>'
          rule: "java.lang.security.audit.xss.no-direct-response-writer.no-direct-response-writer"
  - id: "2"
    description: "JSP page: Variable is not explicitly escaped"
    condition_details:
      - control: "A"
        short_description: "Any variable used without <code><c:out ...></code> tag"
        description: |-
          The <code>out</code> tag from the JSTL taglib escapes the given value. Without this or another escaping method,
          data in the JSP will be unescaped. This could create XSS vulnerabilities.
        example: "<div>${userObj.name}</div>"
        references:
          - url: https://stackoverflow.com/questions/2658922/xss-prevention-in-jsp-servlet-web-application
            text: XSS prevention in JSP application
          - url: https://pukkaone.github.io/2011/01/03/jsp-cross-site-scripting-elresolver.html
            text: JSP cross-site scripting ELResolver
        mitigation:
          description: "Require use of JSTL <code>escapeXml</code> function in every expression."
          alternative: "Require use of JSTL <code>escapeXml</code> function in every expression."
          rule: "java.lang.security.audit.xss.jsp.use-escapexml.use-escapexml"
      - control: "B"
        short_description: "Any expression without <code>escapeXml</code>"
        description: |-
          The <code>escapeXml</code> JSTL expression will escape XML characters. Any data rendered without
          this or another escaping method will be a potential site for XSS.
        example: "<div>${userObj.name}</div>"
        references:
          - url: https://stackoverflow.com/questions/2658922/xss-prevention-in-jsp-servlet-web-application
            text: XSS prevention in JSP application
          - url: https://pukkaone.github.io/2011/01/03/jsp-cross-site-scripting-elresolver.html
            text: JSP cross-site scripting ELResolver
        mitigation:
          description: "Require use of JSTL <code>escapeXml</code> function in every expression."
          alternative: "Require use of JSTL <code>escapeXml</code> function in every expression."
          rule: "java.lang.security.audit.xss.jsp.use-escapexml.use-escapexml"
  - id: "3"
    description: "JSP page: Variable in dangerous location"
    condition_details:
      - control: "A"
        short_description: "Unquoted variable in HTML attribute"
        description: |-
          Unquoted template variables rendered into HTML attributes is a potential XSS vector
          because an attacker could inject JavaScript handlers which do not require HTML characters.
          An example handler might look like: <code>onmouseover=alert(1)</code>. HTML escaping will not mitigate this.
          The variable must be quoted to avoid this.
        example: "<div class=${classes}></div>"
        references:
          - url: https://flask.palletsprojects.com/en/1.1.x/security/#cross-site-scripting-xss
            text: Flask cross-site scripting considerations - unquoted variable in HTML attribute
        mitigation:
          description: "Flag unquoted HTML attributes with Jinja expressions"
          alternative: "Always use quotes around HTML attributes."
          rule: "N/A"
      - control: "B"
        short_description: "Variable in <code>href</code> attribute"
        description: |-
          Template variables in a <code>href</code> value could still accept the <code>javascript:</code> URI.
          This could be a XSS vulnerability. HTML escaping will not prevent this. Use <code>url_for</code>
          to generate links.
        example: '<a href="${link}"></a>'
        references:
          - url: https://flask.palletsprojects.com/en/1.1.x/security/#cross-site-scripting-xss
            text: Flask cross-site scripting considerations - variable in <code>href</code>
        mitigation:
          description: "Flag template variables in <code>href</code> attributes"
          alternative: "N/A"
          rule: "N/A"
      - control: "C"
        short_description: "Variable in <code>&lt;script&gt;</code> block"
        description: |-
          Template variables placed directly into JavaScript or similar are now directly in a code execution context.
          Normal HTML escaping will not prevent the possibility of code injection because code can be written without
          HTML characters. This creates the potential for XSS vulnerabilities, or worse.
        references:
          - url: https://www.veracode.com/blog/secure-development/nodejs-template-engines-why-default-encoders-are-not-enough
            text: "Template engines: Why default encoders are not enough"
          - url: https://adamj.eu/tech/2020/02/18/safely-including-data-for-javascript-in-a-django-template/
            text: "Safely including data for JavaScript in a Django template"
          - url: https://docs.djangoproject.com/en/3.0/ref/templates/builtins/#json-script
            text: "<code>json_script</code> documentation"
        example: "<script>var name = ${name};</script>"
        mitigation:
          description: "Ban template variables in <code>&lt;script&gt;</code> blocks."
          alternative: "N/A"
          rule: "N/A"
---
