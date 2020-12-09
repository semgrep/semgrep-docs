---
template: cheat-sheet-base.html
title: XSS Prevention for Ruby on Rails
summary: |-
  This is a cross-site scripting (XSS) prevention cheat sheet by r2c. It
  contains code patterns of potential XSS in an application. Instead of scrutinizing code
  for exploitable vulnerabilities, the recommendations in this cheat sheet
  pave a safe road for developers that mitigates the possibility of XSS in your code. By 
  following these recommendations, you can be reasonably sure your code is free of XSS.
mitigation_summary: |-
  In general, always let Rails render ERB template files rather than constructing them in code.
  If HTML escaping is needed, use <code>html_safe()</code> in Ruby code and review each individual usage carefully.
  Once reviewed, mark the line with <code># nosem</code>. Beware of putting data in dangerous locations in
  templates. And as always, run a security checker continuously on your code.
config_url: https://semgrep.dev/p/minusworld.ruby-on-rails-xss
pdf: https://web-assets.r2c.dev/security-cheat-sheets/xss/r2c-security-cheat-sheet-xss-prevention-for-ruby-on-rails.pdf
conditions:
  - id: "1"
    description: "Server code: Unescaped variable enters template engine in Python code"
    condition_details:
      - control: "A"
        short_description: "Using <code>html_safe()</code>"
        description: |-
          <code>html_safe()</code> marks the supplied string as "safe for HTML rendering." This bypasses
          HTML escaping and potentially creates XSS vulnerabilities.
        example: 'html = "<div>#{name}</div>".html_safe'
        references:
          - url: https://github.com/presidentbeef/brakeman/blob/main/docs/warning_types/cross_site_scripting/index.markdown
            text: "Brakeman scanner - Cross-site scripting"
          - url: https://www.netsparker.com/blog/web-security/preventing-xss-ruby-on-rails-web-applications/
            text: Preventing XSS in Ruby on Rails
        mitigation:
          description: "Ban <code>html_safe()</code>"
          alternative: "If needed, review each usage and exempt with <code># nosem</code>."
          rule: "ruby.rails.security.audit.xss.avoid-html-safe.avoid-html-safe"
      - control: "B"
        short_description: "Using <code>content_tag()</code>"
        description: |
          <code>content_tag()</code>'s escaping behavior has changed between Rails 2 and 3. In Rails 2,
          no supplied content is escaped. In Rails 2 and 3, attribute names are not escaped.
          Further, the returned value is marked as "safe," the same as if <code>html_safe()</code> had been used.
          This confusing behavior makes it difficult to use <code>content_tag()</code> properly; improper use
          can create XSS vulnerabilities in your application.
        example: 'content_tag :p, "Hello, #{name}"'
        references:
          - url: https://brakemanscanner.org/docs/warning_types/content_tag/
            text: Brakeman scanner - Content tag
        mitigation:
          description: "Ban <code>content_tag()</code>"
          alternative: "If necessary, prefer <code>html_safe()</code> due to its straightforward behavior."
          rule: "ruby.rails.security.audit.xss.avoid-content-tag.avoid-content-tag"
      - control: "C"
        short_description: "Using <code>raw()</code>"
        description: |
          <code>raw()</code> disables HTML escaping for the returned content. This permits
          raw HTML to be rendered in a template, which could create a XSS vulnerability.
        example: "raw @user.name"
        references:
          - url: https://api.rubyonrails.org/classes/ActionView/Helpers/OutputSafetyHelper.html#method-i-raw
            text: "<code>raw()</code> documentation"
          - url: https://www.netsparker.com/blog/web-security/preventing-xss-ruby-on-rails-web-applications/
            text: Preventing XSS in Ruby on Rails
        mitigation:
          description: "Ban <code>raw()</code>"
          alternative: "Prefer <code>html_safe()</code> if necessary."
          rule: "ruby.rails.security.audit.xss.avoid-raw.avoid-raw"
      - control: "D"
        short_description: "Disabling of <code>ActiveSupport#escape_html_entities_in_json</code>"
        description: |
          <code>ActiveSupport#escape_html_entities_in_json</code> is a setting which determines whether <code>Hash#to_json()</code> will
          escape HTML characters. Disabling this could create XSS vulnerabilities.
        example: "config.active_support.escape_html_entities_in_json = false"
        references:
          - url: https://rubydoc.info/docs/rails/ActiveSupport/JSON/Encoding.escape_html_entities_in_json=
            text: "<code>escape_html_entities_in_json</code> documentation"
          - url: https://brakemanscanner.org/docs/warning_types/cross_site_scripting_to_json/
            text: Brakeman scanner - Cross-site scripting (JSON)
          - url: https://stackoverflow.com/a/43877771
            text: "How to disable HTML escaping for JSON, but keep enabled for views?"
        mitigation:
          description: "Ban disabling of <code>ActiveSupport#escape_html_entities_in_json</code>"
          alternative: "If HTML is needed in JSON, use <code>JSON.generate()</code> and review each usage carefully. Exempt each case with <code># nosem</code>."
          rule: "ruby.lang.security.json-entity-escape.json-entity-escape"
  - id: "2"
    description: "Server code: Bypassing the template engine"
    condition_details:
      - control: "A"
        short_description: "Manually creating an ERB template"
        description: |-
          Manually creating an ERB template could create a server-side template injection (SSTI) vulnerability if
          it is created with user input. (This could also result in XSS.) Due to the severity of this type of
          vulnerability, it is better to use a template file instead of creating templates in code.
        example: ERB.new("<div>#{@user.name}</div>").result
        references:
          - url: https://github.com/presidentbeef/brakeman/blob/main/docs/warning_types/template_injection/index.markdown
            text: Brakeman scanner - Template injection
          - url: https://www.trustedsec.com/blog/rubyerb-template-injection/
            text: Ruby ERB template injection
        mitigation:
          description: "Ban template creation in code"
          alternative: "Use ERB template files"
          rule: "ruby.rails.security.audit.xss.manual-template-creation.manual-template-creation"
      - control: "B"
        short_description: "Rendering an inline template with <code>render inline:</code>"
        description: |-
          <code>render inline:</code> is the same as creating a template manually and is therefore susceptible
          to the same vulnerabilities as manually creating an ERB template. This can result in a
          SSTI or XSS vulnerability.
        example: 'render inline: "<div>#{@user.name}</div>"'
        references:
          - url: https://github.com/brunofacca/zen-rails-security-checklist#output-escaping--sanitization
            text: Zen Rails Security Checklist
          - url: https://brakemanpro.com/2017/09/08/cross-site-scripting-in-rails#inline-renders---even-worse-than-xss
            text: Inline renders - even worse than XSS!
        mitigation:
          description: "Ban <code>render inline:</code>"
          alternative: "Use ERB template files"
          rule: "ruby.rails.security.audit.xss.avoid-render-inline.avoid-render-inline"
      - control: "C"
        short_description: "Using <code>render text:</code>"
        description: |-
          <code>render text:</code> unintuitively sets the Content-Type to text/html. This means anything rendered
          through <code>render text:</code> will be interpreted as HTML. Templates rendered in this manner could create
          a XSS vulnerability.
        example: 'render text: "<div>#{@user.name}</div>"'
        references:
          - url: https://brakemanpro.com/2017/09/08/cross-site-scripting-in-rails#inline-renders---even-worse-than-xss
            text: Inline renders - even worse than XSS!
        mitigation:
          description: "Ban <code>render text:</code>"
          alternative: "Use ERB template files"
          rule: "ruby.rails.security.audit.xss.avoid-render-text.avoid-render-text"
  - id: "3"
    description: "Templates: Variable explicitly unescaped"
    condition_details:
      - control: "A"
        short_description: "Using <code>html_safe()</code>"
        description: |-
          <code>html_safe()</code> marks the supplied string as "safe for HTML rendering." This bypasses
          HTML escaping and potentially creates XSS vulnerabilities.
        example: "<%= name.html_safe %>"
        references:
          - url: https://github.com/presidentbeef/brakeman/blob/main/docs/warning_types/cross_site_scripting/index.markdown
            text: "Brakeman scanner - Cross-site scripting"
          - url: https://www.netsparker.com/blog/web-security/preventing-xss-ruby-on-rails-web-applications/
            text: Preventing XSS in Ruby on Rails
        mitigation:
          description: "Ban <code>html_safe()</code>"
          alternative: "Prefer using <code>html_safe()</code> in Ruby code instead of templates."
          rule: "ruby.rails.security.audit.xss.templates.avoid-html-safe.avoid-html-safe"
      - control: "B"
        short_description: "Using <code>content_tag()</code>"
        description: |
          <code>content_tag()</code>'s escaping behavior has changed between Rails 2 and 3. In Rails 2,
          no supplied content is escaped. In Rails 2 and 3, attribute names are not escaped.
          Further, the returned value is marked as "safe," the same as if <code>html_safe()</code> had been used.
          This confusing behavior makes it difficult to use <code>content_tag()</code> properly; improper use
          can create XSS vulnerabilities in your application.
        example: '<%= content_tag :p, "Hello, #{name}" %>'
        references:
          - url: https://brakemanscanner.org/docs/warning_types/content_tag/
            text: Brakeman scanner - Content tag
        mitigation:
          description: "Ban <code>content_tag()</code>"
          alternative: "If necessary, prefer <code>html_safe()</code> in Ruby code due to its straightforward behavior."
          rule: "ruby.rails.security.audit.xss.templates.avoid-content-tag.avoid-content-tag"
      - control: "C"
        short_description: "Using <code>raw()</code>"
        description: |-
          <code>raw()</code> disables HTML escaping for the returned content. This permits
          raw HTML to be rendered in a template, which could create a XSS vulnerability.
        example: "<%= raw @user.name =>"
        references:
          - url: https://api.rubyonrails.org/classes/ActionView/Helpers/OutputSafetyHelper.html#method-i-raw
            text: "<code>raw()</code> documentation"
          - url: https://www.netsparker.com/blog/web-security/preventing-xss-ruby-on-rails-web-applications/
            text: Preventing XSS in Ruby on Rails
        mitigation:
          description: "Ban <code>raw()</code>"
          alternative: "Prefer <code>html_safe()</code> in Ruby code if necessary."
          rule: "ruby.rails.security.audit.xss.templates.avoid-raw.avoid-raw"
      - control: "D"
        short_description: "Using <code><%== ... %></code>, which is an alias for <code>html_safe()</code>"
        description: |-
          The double-equals <code>==</code> is an ERB alias for <code>html_safe()</code>. This will mark the contents as
          "safe for rendering" and may introduce an XSS vulnerability.
        example: "<%== @user.name %>"
        references:
          - url: https://medium.com/sumone-technical-blog/a-pretty-way-to-unescape-html-in-a-ruby-on-rails-application-efc22b850027
            text: Alias for <code>html_safe()</code>
          - url: https://stackoverflow.com/questions/4251284/raw-vs-html-safe-vs-h-to-unescape-html#:~:text===
            text: Raw vs. html_safe
        mitigation:
          description: "Ban <code><%== ... %></code>, which is an alias for <code>html_safe()</code>"
          alternative: "Prefer <code>html_safe()</code> in Ruby code if necessary."
          rule: ruby.rails.security.audit.xss.templates.alias-for-html-safe.alias-for-html-safe
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
        example: "<div class=<%= classes %></div>"
        references:
          - url: https://flask.palletsprojects.com/en/1.1.x/security/#cross-site-scripting-xss
            text: Flask cross-site scripting considerations - unquoted variable in HTML attribute
        mitigation:
          description: "Flag unquoted HTML attributes ERB expressions"
          alternative: "Always use quotes around HTML attributes."
          rule: "ruby.rails.security.audit.xss.templates.unquoted-attribute.unquoted-attribute"
      - control: "B"
        short_description: "Variable in <code>href</code> attribute"
        description: |-
          Template variables in a <code>href</code> value could still accept the <code>javascript:</code> URI.
          This could be a XSS vulnerability. HTML escaping will not prevent this. Use <code>link_to</code>
          beginning with a literal forward slash to generate links.
        example: '<a href="<%= link %>"></a>'
        references:
          - url: https://flask.palletsprojects.com/en/1.1.x/security/#cross-site-scripting-xss
            text: Flask cross-site scripting considerations - variable in <code>href</code>
        mitigation:
          description: "Flag template variables in <code>href</code> attributes"
          alternative: "Use <code>url_for</code> to generate links."
          rule: "ruby.rails.security.audit.xss.templates.var-in-href.var-in-href"
      - control: "C"
        short_description: "Using <code>link_to</code> with unrestricted URL scheme"
        description: |-
          Detected a template variable used in 'link_to'. This will generate dynamic data in the 'href' attribute.
          This allows a malicious actor to input the 'javascript:' URI and is subject to cross-
          site scripting (XSS) attacks. If using a relative URL, start with a literal forward slash and concatenate the URL,
          like this: <code><%= link_to "Here", "/"+@link %></code>. You may also consider setting the Content Security Policy (CSP) header.
        example: '<%= link_to "Here", @link %>'
        references:
          - url: https://cheatsheetseries.owasp.org/cheatsheets/Ruby_on_Rails_Cheat_Sheet.html#cross-site-scripting-xss
            text: OWASP Cheatsheet - Ruby on Rails XSS
          - url: https://github.com/presidentbeef/brakeman/blob/main/docs/warning_types/link_to_href/index.markdown
            text: Brakeman scanner - link_to
        mitigation:
          description: "Flag <code>link_to</code> in templates"
          alternative: "If you must use this, add a literal forward-slash at the beginning to create a relative url."
          rule: "ruby.rails.security.audit.xss.templates.dangerous-link-to.dangerous-link-to"
      - control: "D"
        short_description: "Variable in <code>&lt;script&gt;</code> block"
        description: |-
          Template variables placed directly into JavaScript or similar are now directly in a code execution context.
          Normal HTML escaping will not prevent the possibility of code injection because code can be written without
          HTML characters. This creates the potential for XSS vulnerabilities, or worse.
        example: "<script>var name = <%= name %>;</script>"
        references:
          - url: https://www.veracode.com/blog/secure-development/nodejs-template-engines-why-default-encoders-are-not-enough
            text: "Template engines: Why default encoders are not enough"
          - url: https://blog.ircmaxell.com/2018/06/protecting-rails-xss.html
            text: Protecting against XSS in Rails - JavaScript contexts
          - url: https://api.rubyonrails.org/classes/ActionView/Helpers/JavaScriptHelper.html#method-i-escape_javascript
            text: "<code>escape_javascript</code> documentation"
        mitigation:
          description: "Ban template variables in <code>&lt;script&gt;</code> blocks."
          alternative: "If necessary, use the the <code>escape_javascript</code> function or its alias, <code>j</code>. Review each usage carefully and exempt with <code># nosem</code>."
          rule: "ruby.rails.security.audit.xss.templates.var-in-script-tag.var-in-script-tag"
---
