---
template: cheat-sheet-base.html
title: XSS Prevention for Django
summary: |-
  This is a cross-site scripting (XSS) prevention cheat sheet by r2c. It
  contains code patterns of potential XSS in an application. Instead of scrutinizing code
  for exploitable vulnerabilities, the recommendations in this cheat sheet
  pave a safe road for developers that mitigates the possibility of XSS in your code. By 
  following these recommendations, you can be reasonably sure your code is free of XSS.
mitigation_summary: |-
  In general, always use the template engine provided by Django using <code>render()</code>. If you need HTML escaping, use `mark_safe()</code>
  combined with <code>format_html()</code> and review each individual usage carefully. Once reviewed, mark with `# nosem</code>. Beware of putting data in dangerous locations in
  templates. And as always, run a security checker continuously on your code.
config_url: https://semgrep.dev/p/minusworld.django-xss
pdf: https://web-assets.r2c.dev/security-cheat-sheets/xss/r2c-security-cheat-sheet-xss-prevention-for-django.pdf
conditions:
  - id: "1"
    description: 'Server code: Marking "safe" content, which does not escape HTML'
    condition_details:
      - control: "A"
        short_description: "Using <code>mark_safe()</code>"
        description: |-
          <code>mark_safe()</code> marks the returned content as "safe to render." This instructs the template engine
          to bypass HTML escaping, creating the possibility of a XSS vulnerability.
        example: mark_safe(html_content)
        references:
          - url: https://docs.djangoproject.com/en/3.1/ref/utils/#django.utils.safestring.mark_safe
            text: "<code>mark_safe()</code> documentation"
          - url: https://bandit.readthedocs.io/en/latest/plugins/b703_django_mark_safe.html
            text: "Bandit Check B703 - Django <code>mark_safe()</code>"
          - url: https://docs.djangoproject.com/en/3.0/ref/utils/#django.utils.html.format_html
            text: "<code>format_html()</code> documentation"
        mitigation:
          description: "Ban <code>mark_safe()</code>"
          alternative: "If needed, use in combination with <code>format_html()</code> and review each usage carefully. Create an exemption with <code># nosem</code>."
          rule: "python.django.security.audit.avoid-mark-safe.avoid-mark-safe"
      - control: "B"
        short_description: "Using the <code>SafeString</code> class directly"
        description: |-
          The <code>SafeString</code> class is how Django determines which variables should be
          escaped and which should not. Elements passed to <code>mark_safe()</code> are returned
          as a <code>SafeString</code>. Invoking <code>SafeString</code> directly will bypass HTML escaping
          which could create a XSS vulnerabliity.
        example: SafeString(f"<div>{request.POST.get('name')}</div>")
        references:
          - url: https://docs.djangoproject.com/en/3.1/howto/custom-template-tags/#filters-and-auto-escaping
            text: Filters and auto-escaping in Django
          - url: https://docs.djangoproject.com/en/3.1/ref/utils/#django.utils.safestring.SafeString
            text: "<code>SafeString</code> documentation"
        mitigation:
          description: "Ban <code>SafeString()</code>"
          alternative: "Prefer <code>mark_safe()</code> if necessary."
          rule: "N/A"
      - control: "C"
        short_description: "Registering a custom filter with <code>is_safe=True</code>"
        description: |-
          Registering a filter with <code>is_safe=True</code> indicates to Django that the filter
          absolutely does not introduce any unsafe HTML characters. The value returned
          from the filter will be marked as "safe" when the input is also marked "safe".
          Generally, this is acceptable, but if you cannot be certain the filter is safe,
          it may introduce a XSS vulnerability.
        example: |+
          @register.filter(is_safe=True)
          def myfilter(value):
            return value
        references:
          - url: https://docs.djangoproject.com/en/3.1/howto/custom-template-tags/#filters-and-auto-escaping
            text: Custom filters and auto-escaping
        mitigation:
          description: "Do not mark filters with <code>is_safe=True</code>."
          alternative: "Prefer <code>mark_safe()</code> if necessary."
          rule: python.django.security.audit.xss.filter-with-is-safe
      - control: "D"
        short_description: "Use of the <code>__html__</code> magic method in a class"
        description: |-
          The <code>__html__</code> magic method is used by the Django template engine to determine whether the object
          should be escaped. If available, the value returned by the method will not be escaped and could
          introduce a XSS vulnerability.
        example: |+
          class RawHtml(str):
            def __html__(self):
              return str(self)
        references:
          - url: https://docs.djangoproject.com/en/3.0/ref/utils/#django.utils.html.conditional_escape
            text: "<code>conditional_escape()</code> documentation"
          - url: https://docs.djangoproject.com/en/3.0/_modules/django/utils/html/#conditional_escape
            text: "<code>conditional_escape()</code> source code"
        mitigation:
          description: "Ban <code>__html__</code> in classes"
          alternative: "Prefer <code>mark_safe()</code> if necessary."
          rule: python.django.security.audit.xss.html-magic-method.html-magic-method
      - control: "E"
        short_description: "Using <code>html_safe()</code>"
        description: |-
          The <code>html_safe()</code> decorator adds the <code>__html__</code> magic method to the supplied class.
          The added <code>__html__</code> magic method will return the exact string representation of the class
          (e.g., <code>str(self)</code>). Because objects with the `__html__</code> method are not escaped, this
          could create a XSS vulnerability.
        example: |+
          @html_safe
          class RawHtml(str):
            pass
        references:
          - url: https://docs.djangoproject.com/en/3.0/ref/utils/#django.utils.html.html_safe
            text: "<code>html_safe()</code> documentation"
        mitigation:
          description: "Ban <code>html_safe()</code>"
          alternative: "Prefer <code>mark_safe()</code> if necessary."
          rule: python.django.security.audit.xss.html-safe.html-safe
  - id: "2"
    description: "Server code: Bypassing the template engine"
    condition_details:
      - control: "A"
        short_description: "Directly writing a response using <code>HttpResponse</code> or similar classes"
        description: |-
          Writing results directly to <code>HttpResponse</code> or similar classes bypasses the Django template engine.
          This also bypasses the HTML escaping built into the template engine and creates the possibility
          of a XSS vulnerability. Use <code>render()</code> with a template instead.
        example: 'return HttpResponse("Hello, " + name)'
        references:
          - url: https://django-book.readthedocs.io/en/latest/chapter20.html#cross-site-scripting-xss
            text: "Django Book - Security: XSS"
          - url: https://r2c.dev/blog/2020/be-careful-what-you-request-for-django-method/
            text: Example of XSS via <code>HttpResponseBadRequest</code>
          - url: https://docs.djangoproject.com/en/3.1/ref/request-response/#httpresponse-subclasses
            text: HttpResponse subclasses
        mitigation:
          description: "Ban <code>HttpResponse</code> and similar classes"
          alternative: "Use <code>render()</code>"
          rule: "python.django.security.audit.xss.direct-use-of-httpresponse"
      - control: "B"
        short_description: "Globally disabling autoescape"
        description: |-
          Autoescaping can be globally disabled in Django settings. This should never be
          done if you are rendering HTML; now, every response returned to the user
          will need to be audited to ensure it is free of XSS vulnerabilities.
        example: |+
          TEMPLATES = [
            {
              ...,
              'OPTIONS': {'autoescape': False}
            }
          ]
        references:
          - url: https://docs.djangoproject.com/en/3.1/topics/templates/#django.template.backends.django.DjangoTemplates
            text: "Django template settings documentation"
        mitigation:
          description: "Ban globally dissabling autoescape"
          alternative: "Do not globally disable escaping. If HTML escaping is necessary, use <code>mark_safe()</code>."
          rule: "python.django.security.audit.xss.global-autoescape-off.global-autoescape-off"
      - control: "C"
        short_description: "Setting <code>autoescape=False</code> in a template context"
        description: |-
          Setting <code>autoescape=False</code> in a template context will disable HTML escaping for
          that template. Any data rendered in that template could be a XSS vulnerability.
        example: 'response = render(request, "index.html", {"autoescape": False})'
        references:
          - url: https://github.com/django/django/blob/54ea290e5bbd19d87bd8dba807738eeeaf01a362/django/template/context.py#L135
            text: Context source code
          - url: https://docs.djangoproject.com/en/3.1/ref/templates/api/#django.template.Template.render
            text: "<code>Template.render()</code> documentation"
          - url: https://docs.djangoproject.com/en/3.1/topics/templates/#django.template.loader.render_to_string
            text: "<code>render_to_string()</code> documentation"
          - url: https://docs.djangoproject.com/en/3.1/topics/http/shortcuts/#django.shortcuts.render
            text: "<code>render()</code> documentation"
        mitigation:
          description: "Ban <code>autoescape=False</code> in template contexts"
          alternative: "Use <code>mark_safe()</code> if necessary"
          rule: "python.django.security.audit.xss.context-autoescape-off.context-autoescape-off"
  - id: "3"
    description: "Templates: unescaped variables"
    condition_details:
      - control: "A"
        short_description: "Use of the <code>| safe</code> filter"
        description: |-
          The <code>| safe</code> filter marks the content as "safe for rendering." This has the same
          effect as <code>mark_safe()</code> in Python code. This will permit direct rendering of HTML
          and create a possible XSS vulnerability.
        example: "{ { name | safe } }"
        references:
          - url: https://docs.djangoproject.com/en/3.0/ref/templates/builtins/#safe
            text: "<code>| safe</code> filter documentation"
        mitigation:
          description: "Ban <code>| safe</code>"
          alternative: "Use <code>mark_safe()</code> in Python if necessary."
          rule: "python.flask.security.xss.audit.template-unescaped-with-safe.template-unescaped-with-safe"
      - control: "B"
        short_description: "Use of the <code>| safeseq</code> filter"
        description: |-
          The <code>| safeseq</code> filter marks the content as "safe for rendering." This has the same
          effect as <code>mark_safe()</code> in Python code. This will permit direct rendering of HTML
          and create a possible XSS vulnerability.
        example: '{{ names | safeseq | join:", " }}'
        references:
          - url: https://docs.djangoproject.com/en/3.0/ref/templates/builtins/#safeseq
            text: "<code>| safeseq</code> documentation"
        mitigation:
          description: "Ban <code>| safeseq</code>"
          alternative: "Use <code>mark_safe()</code> in Python if necessary."
          rule: "python.django.security.audit.xss.template-var-unescaped-with-safeseq.template-var-unescaped-with-safeseq"
      - control: "C"
        short_description: "The <code>{% autoescape off %}</code> block"
        description: |-
          The <code>{$ autoescape off %}</code> block disables autoescaping for whole portions of the
          template. Disabling autoescaping allows HTML characters to be rendered directly onto
          the page which could create XSS vulnerabilities.
        example: "{% autoescape off %}"
        references:
          - url: https://docs.djangoproject.com/en/3.0/ref/templates/builtins/#autoescape
            text: "<code>autoescape</code> block documentation"
        mitigation:
          description: "Ban <code>{% autoescape off %}</code>"
          alternative: "Use <code>mark_safe()</code> in Python if necessary."
          rule: "python.django.security.audit.xss.template-autoescape-off.template-autoescape-off"
  - id: "4"
    description: "Templates: Variable in dangerous location"
    condition_details:
      - control: "A"
        short_description: "Unquoted variable in HTML attribute"
        description: |-
          Unquoted template variables rendered into HTML attributes is a potential XSS vector
          because an attacker could inject JavaScript handlers which do not require HTML characters.
          An example handler might look like: <code>onmouseover=alert(1)</code>. HTML escaping will not mitigate this.
          The variable must be quoted to avoid this.
        example: '<div class="{{ classes }}"></div>'
        references:
          - url: https://flask.palletsprojects.com/en/1.1.x/security/#cross-site-scripting-xss
            text: Flask cross-site scripting considerations
        mitigation:
          description: "Flag unquoted HTML attributes with Jinja expressions"
          alternative: "Always use quotes around HTML attributes."
          rule: "python.flask.security.xss.audit.template-unquoted-attribute-var.template-unquoted-attribute-var"
      - control: "B"
        short_description: "Variable in <code>href</code> attribute"
        description: |-
          Template variables in a <code>href</code> value could still accept the <code>javascript:</code> URI.
          This could be a XSS vulnerability. HTML escaping will not prevent this. Use <code>url_for</code>
          to generate links.
        example: '<a href="{{ link }}"></a>'
        references:
          - url: https://flask.palletsprojects.com/en/1.1.x/security/#cross-site-scripting-xss
            text: Flask cross-site scripting considerations
        mitigation:
          description: "Flag template variables in <code>href</code> attributes"
          alternative: "Use <code>url_for</code> to generate links."
          rule: "python.django.security.audit.xss.template-href-var.template-href-var"
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
        example: "<script>var name = {{ name }};</script>"
        mitigation:
          description: "Ban template variables in <code>&lt;script&gt;</code> blocks."
          alternative: "Use the <code>json_script</code> template tag and read the data in JavaScript using the element ID."
          rule: "N/A"
---
