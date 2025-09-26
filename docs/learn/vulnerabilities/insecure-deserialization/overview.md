---
title: Insecure Deserialization
description: Learn about Insecure Deserialization vulnerabilities with Python examples.
hide_title: false
displayed_sidebar: learnSidebar
slug: /learn/vulnerabilities/insecure-deserialization
tags:
- insecure-deserialization
---

Need an object later? Convert it to text and save it in a file. This magic is built into most programming languages and it’s called serialization. However, a single line of code for restoring the state of an object could grant attackers full access to your server.

If your application takes serialized data from a file, a cookie, or a network request, and restores it into an object, then you're potentially at risk. Deserialization was designed to reconstruct complex objects, but when used on untrusted input, it can reconstruct more than just data.  **Insecure deserialization** lets attackers provide specially crafted data that executes code, reads files, or cause the application to crash.

In this article, we explain what serialization and deserialization are, why these features exist, and why you should think twice about how you use this capability. We walk through common attack techniques and show what insecure deserialization looks like in code. Finally, we give you clear guidance to reduce your exposure and detect these issues early.

## What Is Serialization?

Serialization is the process of turning objects into a stream of bytes or text so they can be stored or sent over the network. Deserialization is the reverse: converting that stream back into usable objects.

This is a practical solution to a common problem. Applications need a way to store session data, share structured objects between services, or persist application state across runs.

Most programming languages include built-in or standard libraries for serialization. These libraries often support complex types, not just simple data. Some even let developers define how the serialization process works. This power is useful… but risky.

Here’s an example of what that looks like in Python. First, we’ll need an object type to serialize and deserialize:

```python
class SASTool:
    def __init__(self, name, language, is_best=False):
        self.name = name
        self.language = language  
        self.is_best = is_best
        
    def __repr__(self):
        return f"SASTool(name='{self.name}', language='{self.language}', is_best={self.is_best})"
```

To create a bytestream in Python, one commonly used library is `pickle` .

```python
# Create our favorite SAST tool
semgrep = SASTool("Semgrep", "Multi-language", is_best=True)
print("Original object:", semgrep)

# Serialize with pickle
pickle_data = pickle.dumps(semgrep)
print("Pickle serialized (base64):", base64.b64encode(pickle_data).decode())

# Deserialize 
restored_tool = pickle.loads(pickle_data)
print("Restored object:", restored_tool)
```

Running this, will yield the following output.

```
Original object: SASTool(name='Semgrep', language='Multi-language', is_best=True)
Pickle serialized (base64): gASVWAAAAAAAAACMCF9fbWFpbl9flIwHU0FTVG9vbJSTlCmBlH2UKIwEbmFtZZSMB1NlbWdyZXCUjAhsYW5ndWFnZZSMDk11bHRpLWxhbmd1YWdllIwHaXNfYmVzdJSIdWIu
Restored object: SASTool(name='Semgrep', language='Multi-language', is_best=True)
```

The danger arises when these libraries are used to deserialize data that comes from outside the application, such as HTTP request bodies or uploaded files. Many deserialization functions do more than just reconstruct data. They may call constructors, restore method references, or trigger custom behavior. This means that malicious input can trigger unexpected code execution.

## Common Insecure Deserialization Attacks

When a deserialization function instantiates objects, it may invoke code as part of that process. If an attacker controls the input, they can choose what classes get instantiated and which methods are run. This commonly is escalated into remote code execution, or denial of service.

### Remote Code Execution (RCE)

To continue with our Python example, the `__reduce__` method can be used to specify how an object should be deserialized. A payload that includes such an object can execute code when loaded. 

```python
class MaliciousSASTool:
    def __reduce__(self):
        return (os.system, ('whoami',))
```

If this class is included in a serialized stream, any system that deserializes it will run the payload.

```python
malicious_tool = MaliciousSASTool()
malicious_pickle = pickle.dumps(malicious_tool)

print("Malicious payload (base64):")
print(base64.b64encode(malicious_pickle).decode())

print("Demonstrating what happens when deserialized:")
pickle.loads(malicious_pickle)  # This will execute 'whoami' and show your username
```

The output of this snippet is:

```
Malicious payload (base64):
gASVIQAAAAAAAACMBXBvc2l4lIwGc3lzdGVtlJOUjAZ3aG9hbWmUhZRSlC4=
Demonstrating what happens when deserialized:
pieter
```

This type of attack has been used in the wild against systems that deserialize input from cookies, form data, or APIs. The impact is often full system compromise.

### Denial of Service (DoS)

Some deserialization libraries allow deeply nested or complex object graphs. An attacker can craft a payload that consumes excessive memory or CPU when deserialized.

In Python, we can craft deeply nested objects like this:

```python
class NestedBomb:
    def __init__(self, depth=0):
        if depth < 1000:  # Create deep nesting
            self.child = NestedBomb(depth + 1)
        self.data = "A" * 10000  # Large data per level
```

I would not recommend trying to pickle and unpickle this one. This results in exponential memory usage and can exhaust system resources.


## Detecting Insecure Deserialization in Your Code

Let’s look at an example in a web application server.

```python
import pickle
from flask import Flask, request

app = Flask(__name__)

@app.route('/load_tool', methods=['POST'])
def load_sast_tool():
    tool_data = request.get_data()
    sast_tool = pickle.loads(tool_data)  # Vulnerable!

    return f"Loaded tool: {sast_tool.name}"
```

This code takes raw POST data and directly deserializes it with `pickle`. An attacker can send a malicious payload instead of legitimate tool data.

A similar vulnerable pattern in Java might look like this:

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


## Recommendations and Mitigations

The most effective way to prevent insecure deserialization is to avoid deserializing untrusted input entirely. If you must deserialize user-controlled data, take the following steps:

### Use safer formats

Prefer simple data formats like JSON or YAML (with safe loading). These formats reconstruct primitive types like strings, arrays, and dictionaries.

Let's see how our SASTool example looks with safe alternatives:

```python
@dataclass
class SafeSASTool:
    name: str
    language: str
    is_best: bool = False

# Create our tool
semgrep = SafeSASTool("Semgrep", "Multi-language", True)
print("Original object:", semgrep)

# JSON serialization - only handles basic data types
json_data = json.dumps(asdict(semgrep))
print("\\nJSON serialized:", json_data)
restored_from_json = SafeSASTool(**json.loads(json_data))
print("JSON deserialized:", restored_from_json)

# YAML serialization - safe_load prevents code execution
yaml_data = yaml.dump(asdict(semgrep))
print("\\nYAML serialized:")
print(yaml_data)
restored_from_yaml = SafeSASTool(**yaml.safe_load(yaml_data))
print("YAML deserialized:", restored_from_yaml)
```

Running this code will output:

```
Original object: SafeSASTool(name='Semgrep', language='Multi-language', is_best=True)

JSON serialized: {"name": "Semgrep", "language": "Multi-language", "is_best": true}
JSON deserialized: SafeSASTool(name='Semgrep', language='Multi-language', is_best=True)

YAML serialized:
is_best: true
language: Multi-language
name: Semgrep

YAML deserialized: SafeSASTool(name='Semgrep', language='Multi-language', is_best=True)
```

Unlike pickle, JSON and YAML (with `safe_load`) only reconstruct data. They can't execute code or instantiate arbitrary objects. An attacker can't inject malicious payloads because these formats don't support object reconstruction or method calls.

### Validate input structure

If you must deserialize, apply strict validation first. Check the input against a schema or known allowlist of expected fields before processing.

### Require digital signatures

Signed tokens ensure that serialized data cannot be altered without detection. This helps secure session data or configuration blobs sent by the client.

### Disable unsafe features

Some libraries let you configure safe modes. For example, in Python use `yaml.safe_load()` instead of `yaml.load()`. In Java, use deserialization filters to restrict what classes can be loaded.

### Review third-party dependencies

Some libraries store internal state using deserialization under the hood. Ensure that these are not exposed to untrusted input and check for any known CVEs related to insecure deserialization.

### Use automated tools

Semgrep can detect deserialization risks in your code and in libraries you use. Run it as part of your development process to catch problems early.


## Conclusion

Insecure deserialization happens when applications trust input that was never meant to be trusted. The feature was designed to restore objects. But when misused, they allow attackers to take full control of the system.

A single deserialization call might look harmless, but as we've seen, it can open the door to far more than just data. By understanding the risks, choosing safer alternatives, and using tools like Semgrep to catch unsafe patterns early, you can keep this powerful feature from becoming a security liability.

For additional Python examples, see [Python Deserialization](/learn/vulnerabilities/insecure-deserialization/python).
