* **Reachable**: A finding is reachable if there's a vulnerable function call or vulnerable package in use. The finding should be addressed as soon as possible.
  * **Reachable in code**: A finding is reachable in code if there's a code pattern in the codebase that matches the vulnerability definition.
  * **Always reachable**: A finding is always reachable if it's something Semgrep recommends fixing, regardless of what's in the code.
* **Needs review**: A finding that requires manual triage and review; follow the instruction provided.
  * **Conditionally reachable**: A finding is conditionally reachable if Semgrep finds a way to reach it when scanning your code when certain conditions are met.
  * **No Reachability Analysis**: A finding that Semgrep doesn't scan for reachability.
* **Unreachable**: No vulnerable function call found. This finding can be deprioritized.
