* **Reachable**: A finding is reachable if there's a code pattern in the codebase that matches the vulnerability definition.
* **Always reachable**: A finding is always reachable if it's something Semgrep recommends fixing, regardless of what's in the code.
* **Conditionally reachable**: A finding is conditionally reachable if Semgrep finds a way to reach it when scanning your code when certain conditions are met.
* **No Reachability Analysis**: A finding that Semgrep doesn't scan for reachability.
* **Unreachable**: A finding is unreachable if you don't use the vulnerable piece of code of the imported library or package.
