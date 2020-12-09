---
template: cheat-sheet-base.html
title: XSS Prevention for Flask
summary: |-
  This is a cross-site scripting (XSS) prevention cheat sheet by r2c. It
  contains code patterns of potential XSS in an application. Instead of scrutinizing code
  for exploitable vulnerabilities, the recommendations in this cheat sheet
  pave a safe road for developers that mitigates the possibility of XSS in your code. By 
  following these recommendations, you can be reasonably sure your code is free of XSS.
mitigation_summary: |-
  In general, you should use <code>render_template()</code> when showing data to users. If you need HTML escaping, use `Markup()</code> and review
  each individual usage carefully. Once reviewed, mark the line with <code># nosem</code>. Beware of putting data in dangerous locations in
  templates. And as always, run a security checker continuously on your code.
config_url: https://semgrep.dev/p/minusworld.flask-xss
pdf: https://web-assets.r2c.dev/security-cheat-sheets/xss/r2c-security-cheat-sheet-xss-prevention-for-flask.pdf
conditions:
  - id: "1"
    description: "Server code: Unescaped variable enters template engine in Python code"
    condition_details:
      - control: "A"
        short_description: "<code>render_template_string()</code> with string formatting"
        description: |-
          <code>render_template_string()</code> renders a Jinja2 template directly from a string.
          If the template is modified in any way, such as with string formatting, it creates
          a potential server-side template injection. Using <code>render_template()</code> is strictly
          safer because it does not create an opportunity to modify the template.
        example: 'render_template_string("<div>%s</div>" % request.args.get("name"))'
        references:
          - url: https://blog.nvisium.com/p263
            text: Exploring SSTI in Flask/Jinja2
          - url: https://pequalsnp-team.github.io/cheatsheet/flask-jinja2-ssti
            text: Flask & Jinja2 SSTI Cheatsheet
        mitigation:
          description: "Ban <code>render_template_string()</code>"
          alternative: "Use <code>render_template()</code>."
          rule: "python.flask.security.audit.render-template-string.render-template-string"
      - control: "B"
        short_description: "<code>render_template()</code> with unescaped file extension"
        description: |
          Flask only escapes templates with <code>.html</code>, <code>.htm</code>, <code>.xml</code>, or <code>.xhtml</code> extensions.
          This is not always obvious and could create cross-site scripting vulnerabilities.
        example: 'render_template("unsafe.jinja2")'
        references:
          - url: https://flask.palletsprojects.com/en/1.1.x/templating/#jinja-setup
            text: Flask documentation - Escaping behavior
          - url: https://bento.dev/checks/flask/unescaped-file-extension/
            text: Bento check - Unescaped Template Extension
          - url: https://r2c.dev/blog/2020/bento-check-unescaped-template-extensions-in-flask/
            text: Unescaped template extensions in Flask
        mitigation:
          description: "Ban unescaped extensions"
          alternative: "Only use <code>.html</code> extensions for templates. If no escaping is needed, review each case and exempt with <code># nosem</code>."
          rule: "python.flask.security.unescaped-template-extension.unescaped-template-extension"
      - control: "C"
        short_description: "Explicitly unescaping variables using <code>Markup()</code>"
        description: |
          <code>Markup()</code> disables HTML escaping for the returned content. This permits
          raw HTML to be rendered in a template, which could create a XSS vulnerability.
        example: "flask.Markup(html_content)"
        references:
          - url: "https://flask.palletsprojects.com/en/1.1.x/templating/#controlling-autoescaping"
            text: Flask autoescaping documentation
        mitigation:
          description: "Ban <code>Markup()</code>"
          alternative: "If needed, review each usage and exempt with <code># nosem</code>."
          rule: "python.flask.security.xss.audit.explicit-unescape-with-markup.explicit-unescape-with-markup"
  - id: "2"
    description: "Server code: Bypassing the template engine"
    condition_details:
      - control: "A"
        short_description: "Returning directly from a route"
        description: |-
          Returning values directly from a route bypasses the template rendering engine,
          therefore bypassing any escaping. Use functionality provided by Flask to return
          content from routes, such as <code>render_template()</code> or <code>jsonify()</code>.
        example: |+
          @app.route("/index/<msg>")
          def index(msg):
            return "Hello! " + msg
        references:
          - url: https://help.semmle.com/wiki/display/PYTHON/Reflected+server-side+cross-site+scripting
            text: Reflected server-side cross-site scripting
        mitigation:
          description: "Ban returning values directly from routes"
          alternative: "Use <code>render_template()</code> or <code>jsonify()</code>."
          rule: "python.flask.security.audit.directly-returned-format-string.directly-returned-format-string"
      - control: "B"
        short_description: "Using a Jinja2 environment directly"
        description: |-
          Flask already comes with a Jinja2 environment ready for use which can be invoked
          via the <code>render_template()</code> function. Using Jinja2 directly may bypass
          the escaping protections that are enabled in Flask by default.
        example: |
          with open('template', 'r') as fin:
            jinja2.Template(fin.read()).render()
        references:
          - url: https://bandit.readthedocs.io/en/latest/plugins/b701_jinja2_autoescape_false.html
            text: Bandit Check - Jinja2 Autoescape False
        mitigation:
          description: "Ban using Jinja2 directly"
          alternative: "Use <code>render_template()</code>."
          rule: "python.flask.security.xss.audit.direct-use-of-jinja2.direct-use-of-jinja2"
  - id: "3"
    description: "Templates: Variable explicitly unescaped"
    condition_details:
      - control: "A"
        short_description: "Usage of the <code>| safe</code> filter"
        description: |-
          The <code>| safe</code> filter disables HTML escaping for the provided content. This permits
          raw HTML to be rendered in a template, which could create a XSS vulnerability.
        example: "{{ name | safe }}"
        references:
          - url: https://flask.palletsprojects.com/en/1.1.x/templating/#controlling-autoescaping
            text: Flask autoescaping documentation
        mitigation:
          description: "Ban <code>| safe</code>"
          alternative: "Use <code>Markup()</code> in Python code if necessary."
          rule: "python.flask.security.xss.audit.template-unescaped-with-safe.template-unescaped-with-safe"
      - control: "B"
        short_description: "Disabling autoescaping with <code>{% autoescape false %}</code>"
        description: |-
          The <code>{$ autoescape false %}</code> block disables autoescaping for whole portions of the
          template. Disabling autoescaping allows HTML characters to be rendered directly onto
          the page which could create XSS vulnerabilities.
        example: "{% autoescape false %}"
        references:
          - url: https://flask.palletsprojects.com/en/1.1.x/templating/#controlling-autoescaping
            text: Flask autoescaping documentation
        mitigation:
          description: "Ban <code>{$ autoescape false %}</code>"
          alternative: "Use <code>Markup()</code> in Python code if necessary."
          rule: "python.flask.security.xss.audit.template-autoescape-off.template-autoescape-off"
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
        example: "<div class={{ classes }}></div>"
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
          rule: "python.flask.security.xss.audit.template-href-var.template-href-var"
      - control: "C"
        short_description: "Variable in <code>&lt;script&gt;</code> block"
        description: |-
          Template variables placed directly into JavaScript or similar are now directly in a code execution context.
          Normal HTML escaping will not prevent the possibility of code injection because code can be written without
          HTML characters. This creates the potential for XSS vulnerabilities, or worse.
        references:
          - url: https://www.veracode.com/blog/secure-development/nodejs-template-engines-why-default-encoders-are-not-enough
            text: "Template engines: Why default encoders are not enough"
          - url: https://flask.palletsprojects.com/en/1.1.x/templating/#standard-filters
            text: "<code>tojson</code> documentation"
          - url: https://stackoverflow.com/a/44840756
            text: "How to use <code>tojson</code> in a data attribute"
          - url: https://adamj.eu/tech/2020/02/18/safely-including-data-for-javascript-in-a-django-template/
            text: "Safely including data for JavaScript in a Django template"
        example: "<script>var name = {{ name }};</script>"
        mitigation:
          description: "Ban template variables in <code>&lt;script&gt;</code> blocks."
          alternative: "Use the <code>tojson</code> filter inside a data attribute and <code>JSON.parse()</code> in JavaScript."
          rule: "N/A"
---
