---
title: XML Security
description: Learn about XML Security
hide_title: false
displayed_sidebar: learnSidebar
slug: /learn/vulnerabilities/xml-security
tags:
  - xml
  - xxe
---

If your applications ever parse XML—whether it comes from user uploads, web services, or configuration files—you could be exposed to a risk. For developers, this matters because even if you are not writing low-level parsing code, the libraries you rely on might be insecure by default.

The key takeaway is simple: XML is powerful but risky. Unless you configure your parser securely, attackers can exploit features that were designed for flexibility, not safety.

This article will give you a solid foundation in XML security. First, we’ll look at the basics of XML and the features that create risks. Next, we’ll walk through the most common XML-based attacks and show you how to recognize them in code. Finally, we’ll cover practical steps you can take to configure parsers securely and reduce your exposure.

## What is XML Security?

In 2017, XML security had its own spot on the OWASP Top 10 list of the most critical web application risks. In the latest 2021 update, it is no longer called out as a separate category but instead falls under “Security Misconfiguration.” Even so, XML vulnerabilities remain common—searching the CVE database for XML-related flaws returns thousands of entries, including recent ones that enabled attackers to steal data or execute code remotely.

Fundamentally, as its name indicates, eXtensible Markup Language (XML) is a markup language. It is designed for storing and sending data. 

XML provides several mechanisms for loading parts from the document from other sources. Two commonly used mechanisms are external Document Type Definitions (DTDs), and external entities. 

### External Document Type Definition

The XML DTD is defined at the top of an XML document using the `DOCTYPE` keyword. It defines the legal structure of the document. 

```jsx
<!DOCTYPE sast_tool [
 <!ELEMENT sast_tool (name, fp)>
 <!ELEMENT name (#PCDATA)>
 <!ELEMENT fp (#PCDATA)>
]>
```

When this DTD is loaded from another source instead of defined in the document itself, it is called an external DTD. To use an external DTD, use the `SYSTEM`  keyword and provide a URL or filename to the DTD.

```jsx
<!DOCTYPE semgrep SYSTEM "URL-or-filename.dtd">
```

### External XML Entities

XML entities are used to represent structured data. The XML specification has several entities built in. But as the X in XML implies: it is an extensible language and custom entities can be defined in the DTD using the `ENTITY` keyword.

```jsx
<!DOCTYPE foo [ <!ENTITY best_sast_tool "Semgrep" > ]>
```

XML entities can recursively use other custom entities in their definition.

```jsx
<!ENTITY semgrep "Semgrep" >
<!ENTITY best_sast_tool "&semgrep;" >
```

Similarly to external DTDs, entities can also be externally loaded using the `SYSTEM` command, these are called external XML entities.

```jsx
<!DOCTYPE foo [ <!ENTITY best_sast_tool SYSTEM "http://semgrep.dev/xml-entity-definition" > ]>
```

The XML specification includes more than just DTDs and external entities for including external data. Other features like XInclude, the `schemaLocation` attribute, the `xsl:include` element,  the `document()` function, and `import` or `include` statements can all be used to reference external resources. You can find an overview of these and more in our [XML Cheat Sheet](/cheat-sheets/java-xxe).

## Common XML Attacks

XML was designed to store and transmit data. When an application receives an XML file, or reads one from the filesystem, it needs to parse the XML data. To achieve this many libraries are available that implement the XML specifications as described above. However, if the XML data is untrusted, there are several features in the specifications that can be manipulated to achieve malicious behaviour.

### XML Injection

The first type of attack does not trick the parser into fetching external content. Instead, the attacker injects additional tags or attributes into the XML itself to alter the logic of the application.

Imagine an application that reads user account details from XML like this:

```xml
<user>
  <name>pieter</name>
  <admin>false</admin>
</user>
```

If the application does not validate input properly, an attacker could send:

```xml
<user>
  <name>pieter</name>
  <admin>true</admin>
</user>
```

If the code simply trusts the `admin` field, the attacker could escalate privileges. This is similar in spirit to SQL Injection but applied to XML-based logic.

### Exponential Entity Expansion (XEE)

**EXpontential Entity Expansion (XEE)** happens when the mechanism for recursively defining XML entities with other entities is manipulated into expanding several layers of nested entities. This type of attack is also known as an XML bomb or billion laughs attack. As an example, here is the [XML bomb payload](https://github.com/semgrep/java-xxe-research/blob/main/payloads-new/xml-attacks/xml-bomb.xml) we used in our research project on GitHub.

```jsx
<?xml version="1.0"?>
<!DOCTYPE lolz [
 <!ENTITY lol "lol">
 <!ELEMENT lolz (#PCDATA)>
 <!ENTITY lol1 "&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;">
 <!ENTITY lol2 "&lol1;&lol1;&lol1;&lol1;&lol1;&lol1;&lol1;&lol1;&lol1;&lol1;">
 <!ENTITY lol3 "&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;">
 <!ENTITY lol4 "&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;">
 <!ENTITY lol5 "&lol4;&lol4;&lol4;&lol4;&lol4;&lol4;&lol4;&lol4;&lol4;&lol4;">
 <!ENTITY lol6 "&lol5;&lol5;&lol5;&lol5;&lol5;&lol5;&lol5;&lol5;&lol5;&lol5;">
 <!ENTITY lol7 "&lol6;&lol6;&lol6;&lol6;&lol6;&lol6;&lol6;&lol6;&lol6;&lol6;">
 <!ENTITY lol8 "&lol7;&lol7;&lol7;&lol7;&lol7;&lol7;&lol7;&lol7;&lol7;&lol7;">
 <!ENTITY lol9 "&lol8;&lol8;&lol8;&lol8;&lol8;&lol8;&lol8;&lol8;&lol8;&lol8;">
]>
<lolz>&lol9;</lolz>
```

Parsing a document like that with several layers of nested entities can lead to the parser consuming too many resources on the server, leading to a Denial of Service (DoS) attack.

### XML External Entity (XXE) Injection

**XML eXternal Entity (XXE)** happens when one of the 9 mechanisms to include external content is manipulated into parsing read content from an unintended location. This can lead to the disclosure of confidential data if the identifier supplied by the attacker is something like `file:///etc/passwd` . In other cases, XXE payloads can be used to upload code files that can later be triggered in remote code execution attacks, like in [this CVE](https://www.horizon3.ai/red-team-blog-cve-2022-28219/#:~:text=Then%20send%20the%20request%20to%20trigger%20the%20XXE%20and%20file%20upload%3A) where the identifier referenced a java code archive. In PHP, the right identifier by itself can even cause arbitrary code execution when the `expect` module is loaded. In that case, a pseudo-uri like `expect://cmd` will execute `cmd` and return the output of the command.

## Detecting XML Security Vulnerabilities in Your Code

Detecting XML issues can be challenging because risky behavior often comes from default parser configurations rather than obvious coding mistakes. Let’s look at a Java example.

```java
DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
DocumentBuilder builder = factory.newDocumentBuilder();
Document doc = builder.parse("input.xml");
```

At first glance, this looks harmless. But in many XML libraries, this setup will **process external entities by default**. If `input.xml` is attacker-controlled, the parser could make network requests or expose files.

Tools like **Semgrep** can help detect these patterns. Rules for XXE look for places in code where XML parsing from untrusted sources occurs without security features enabled.  For XML Injection, detection is more about how the application uses parsed data. If the code blindly trusts XML input without validating it against a strict schema, that’s a sign of risk.

## Recommendations and Mitigations

While the flexibility of XML can lead to security vulnerabilities, you can mitigate these risks by configuring your parser correctly and adopting a secure development mindset. Here are some key recommendations and mitigations to consider.

### Consider using alternative formats

Before you even start, ask yourself if you really need to use XML. For many modern applications, simpler and less risky data formats like **JSON** (JavaScript Object Notation) or **YAML** (YAML Ain't Markup Language) are perfectly suitable. Both are lightweight and widely supported, offering similar data-structuring capabilities without the complex and sometimes vulnerable features of XML like DTDs and external entities. If your use case involves web APIs or configuration files, JSON or YAML can be a much safer default choice.

### Use up-to-date language and libraries

Staying current is critical. Vulnerabilities are frequently discovered in older language versions and libraries. During some of our research on XML parsers in Java, we ran into a known JDK bug where DOM parsers do not honor setExpandEntityReferences(false) for certain JDK versions. Using up-to-date versions ensures you benefit from the latest security patches and bug fixes. Regularly check for updates and integrate them into your development workflow.

### Disabling DTD processing

One of the most effective ways to prevent both XEE and XXE attacks is to disable DTD processing entirely. Since DTDs are the primary mechanism for declaring and referencing entities, disabling them prevents the parser from attempting to process any external content. Most XML parsers provide a configuration setting to achieve this. For instance, in Java, you can often set a `FEATURE` like `XMLConstants.FEATURE_SECURE_PROCESSING` or `XMLInputFactory.IS_SUPPORTING_EXTERNAL_ENTITIES` to `false`.

### Disable external entities

If you can't disable DTDs completely, the next best thing is to disable external entities. This is a more granular approach that allows internal DTDs to be processed while blocking any references to external resources. This can be configured separately from DTD processing and is a key step in preventing XXE attacks. Some parsers, like the Python `defusedxml` library, are specifically designed to be resistant to these attacks by default, making them a safer alternative to standard libraries.

### Disabling external schema/stylesheet processing

To prevent attacks related to schema and stylesheet processing, you can also configure your parser to disable the processing of external schemas and stylesheets. The specific method depends on the library, but it's a critical security control to include in your parser's configuration. In Java, the `setAttribute` method can be used to set `XMLConstants.ACCESS_EXTERNAL_SCHEMA`  and `XMLConstants.ACCESS_EXTERNAL_STYLESHEET` to an empty string to disable these features. The feature, however, is not implemented effectively for all parsers, consult our cheat sheet to ensure you configure your specific parser securely!

## Conclusion

XML is flexible, but that flexibility comes with risks. Features like entities, DTDs, and external references were designed for convenience, not for secure handling of untrusted data. Left unconfigured, many parsers will expose your application to denial-of-service, data disclosure, or logic flaws.

We covered the basics of XML, walked through the common attacks of entity expansion, XXE, and XML injection, and showed how to recognize insecure parsing patterns in code. The most important step you can take is to configure parsers securely or avoid XML entirely if you don’t need it.

To dive deeper, explore the [Semgrep XML Security resources](/docs/cheat-sheets/java-xxe) and consider scanning your code with Semgrep to catch risky configurations before attackers do.

Just like the OWASP top 10 reflects, XML risks haven't disappeared—they've just become part of a broader story about secure configuration.