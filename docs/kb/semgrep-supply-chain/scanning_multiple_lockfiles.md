# How to scan multiple or nested lock files

Semgrep Supply Chain uses manifest files or lockfiles as part of its reachability analysis to determine the exact version of a dependency that a codebase is using. Semgrep parses manifest files or lockfiles, such as:

* `go.mod`
* `gemfile.lock`
* `package-lock.json`

By default, Semgrep parses manifest files or lockfiles in any directory or subdirectory. Some package managers, such as `npm` or `yarn`, have support for [Workspaces](https://yarnpkg.com/features/workspaces), which can affect Semgrep's parsing behavior. If you use workspaces, reach out to [Semgrep support](mailto:support@semgrep.com) for assistance in setting up Semgrep Supply Chain.

See [Supported languages > Semgrep Supply Chain](https://semgrep.dev/docs/supported-languages/#semgrep-supply-chain) for more information. 
