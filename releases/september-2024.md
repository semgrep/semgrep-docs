---
slug: september-2024
hide_title: true
description: >-
 Release notes include the changes, fixes, and additions in specific versions of Semgrep.
toc_max_heading_level: 3
title: September 2024
tags:
 - Release notes
---

# Semgrep release notes for September 2024

## 🌐 Semgrep AppSec Platform

### Added

- **Semgrep Managed Scanning (SMS)** scans newly created repositories automatically if you grant code access to your GitHub repositories. With this feature enabled, the following steps occur whenever you create a new GitHub repository:
  - Semgrep creates a corresponding project in Semgrep AppSec Platform.
  - Semgrep starts scanning all pull requests to that repository.
  - Semgrep performs full scans weekly.
 You can turn off or turn on diff-aware scans as needed.
- Semgrep AppSec Platform's new **reporting** feature is now GA. With reporting, you can:
  - Evaluate your AppSec program and assess your organization's deployment and adoption of secure guardrails, enabling you to know your current security risk.
  - Gain awareness of trends and opportunities to improve your security posture.
  - Granularly filter data on all the page's charts and view priority findings.
- **CLI**: added the `--max-log-list-entries` flag, allowing you to set the maximum number of entries in the log.
- **Network Broker**: added ability to turn on or off the Network Broker for each source code manager connected to the deployment.

### Changed

- The **Projects** page displays the number of findings from the primary branch, not the most recently scanned branch.
- Error messages originating in Semgrep scans with more than one job now include more detailed information.
- The Semgrep CLI is now more performant. Scans, especially smaller or diff-aware scans, complete faster.
- Semgrep now logs memory-related warnings and errors in debug mode.
- Minor stylistic changes to Semgrep AppSec Platform.

### Fixed

- Fixed an issue where a Semgrep Supply Chain rule couldn't be opened when viewing findings details in Semgrep AppSec Platform on a smaller screen.
- Fixed an issue where soft-deleted deployments caused problems with newly created deployments.
- Fixed an issue where Semgrep didn't post a status update after the finding's status was updated through a pull request or merge request comment.
- Fixed an issue where Semgrep couldn't connect to multiple GitHub cloud organizations. 
- Fixed an issue where SSO errors weren't displayed.
- Fixed an issue with Semgrep Editor where you could be switched unexpectedly to Advanced Mode from Structure Mode if you deleted data that Structure Mode couldn't parse.
- Fixed an issue with Semgrep Editor where it deleted data if you attempted to load a rule containing an unknown nested key, such as taint labels.

## 💻 Semgrep Code

### Added

- Semgrep Pro Engine's dataflow analysis now tracks method invocations on variables of an interface type, assuming that any implementation of the method can be called. For example, in the following code snippet, Semgrep can detect tainted input vulnerabilities in both implementation classes:
    ```java
    public interface MovieService {
        String vulnerableInjection(String input);
    }

    public class SimpleImpl implements MovieService {
        @Override
        public String vulnerableInjection(String input) {
            return sink(input);
        }
    }

    public class MoreImpl implements MovieService {
        @Override
        public String vulnerableInjection(String input) {
            return sink(input);
        }
    }

    public class AppController {
        private MovieService movieService;

        public String pwnTest(String taintedInput) {
            return movieService.vulnerableInjection(taintedInput);
        }
    }
    ```
- Taint analysis can now track method invocations on variables of an interface type when there is a single implementation. For example, Semgrep now detects the tainted input vulnerability in the following code snippet:
    ```java
    public interface MovieService {
        String vulnerableInjection(String input);
    }

    @Service
    public class MovieServiceImpl implements MovieService {
        @Override
        public String vulnerableInjection(String input) {
            return sink(input);
        }
    }

    @RestController("/")
    public class SpringController {

        @Autowired
        private MovieService movieService;

        @GetMapping("/pwn")
        public String pwnTest(@RequestParam("input") String taintedInput) {
            return movieService.vulnerableInjection(taintedInput);
        }
    }
    ```
- **Go**: added support for comparing Go pre-release versions, enabling comparisons of strict core versions, pseudo-versions, and pre-release versions.
- **JavaScript**: uses of values imported through ECMAScript `default` imports, such as `import example from 'mod';` can now be matched by qualified name patterns, such as `mod.default`.
- **Python**:
  - Improved support for Python, including differentiated coverage for Django, Flask, and FastAPI, and coverage for ~100 of the most commonly used libraries.
  - Semgrep's interfile analysis now includes information about Python's standard library, improving its ability to resolve names and types in Python code.
- **TypeScript**: 
  - Added support for type inference for constructor parameter properties. For example, taint analysis can recognize that `sampleFunction` is defined in the `AbstractedService` class in the following code snippet:
    ```typescript
        export class AppController {
            constructor(private readonly abstractedService: AbstractedService) {}

            async taintTest() {
                const src = source();
                await this.abstractedService.sampleFunction(src);
            }
        } 
    ```
  - Improved inference of type information for class fields. This improves taint tracking for dependency injection, as demonstrated in the following example:
    ```typescript
        export class AppController {
            private readonly abstractedService: AbstractedService;

            constructor(abstractedService: AbstractedService) {
            this.abstractedService = abstractedService;
            }

            async taintTest() {
                const src = taintedSource();
                await this.abstractedService.sinkInHere(src);
            }
        }
    ```

### Changed

- Semgrep attempts to recover from out-of-memory errors during interfile data flow analysis instead of immediately falling back to intrafile analysis.

### Fixed

- Fixed an issue with type inference in Kotlin and Scala, so that constructor invocations like `Foo()` are now properly inferred to be of type `Foo`.
- Fixed an issue where some findings were reported when a rule ID was specified, even when a `nosem` comment was present.
- Restored missing taint findings that were possibly missed before improving index sensitivity:
    ```js
    def foo(t):
        x = third_party_func(t)
        return x

    def test1():
        t = ("ok", taint)
        y = foo(t)
        sink(y) # now it's found
    ```
- Fixed an issue with interfile constant propagation where some definitions were incorrectly identified as constant, even though other parts of the codebase modified them.
- Fixed an issue in taint signature instantiation that prevented the tracking of updates to a nested object's field. For example, in the following code snippet, Semgrep identified that `Nested.update` modifies the `fld` attribute of a `Nested` object. Before this issue was fixed, Semgrep would not identify that `Wrapper.update` modified the `fld` attribute of the `nested` object attribute in a `Wrapper` object. This is no longer the case.
    ```java
    public class Nested {
        private String fld;
        public void update(String str) {
        fld = str;
        }
        // ...
    }

    public class Wrapper {
        private Nested nested;
        public void update(String str) {
        this.nested.update(str);
        }
        // ...
    }
    ```
- Fixed an issue with overly aggressive match deduplication that led to findings being closed and reopened in certain circumstances.
- Fixed an issue with regex-fix numbered capture groups. Formerly, regex with numbered capture groups like `\1\2\3` would be the same as `\1\1\1`. Now, the following code:
    ```python
    # src.py
    12345
    ```
    and the following rule:
    ```yaml
    pattern: $X
    fix-regex:
        regex: (1)(2)(3)(4)(5)
        replacement: \5\4\3\2\1
    ```
    results in:
    ```
    54321
    ```
- **Docker**: `CMD $...ARGS` behaves like `CMD ...` and matches any `CMD` instruction that uses array syntax, such as `CMD ["ls"]`. This fix applies to the other command-like instructions, including RUN and ENTRYPOINT.
- **Julia**: fixed issue regarding incorrect range matching parametrized type expressions.
- **Python**: fixed an issue that could lead to failure to name to type imported Python symbols during interfile analysis.

## ⛓️ Semgrep Supply Chain

### Changed

- Semgrep consolidates lockfile parsing logic to the beginning of the scan. This consolidated process now considers changed and unchanged lockfiles during all steps of diff-aware scans.

### Fixed

- Fixed an issue where certain parsing errors caused by access to an unbound variable caused Semgrep Supply Chain to crash.
- Fixed an issue where Supply Chain findings displayed in Semgrep AppSec Platform were color-coded based on the rule severity, not the finding severity.

## 🤖 Semgrep Assistant

### Added

- Assistant displays the message "Assistant did not find any high risk markers in this file" on a finding details page if it didn't determine a specific risk level for the finding.

### Changed

- Semgrep Assistant now provides inline code fixes that you can directly commit based on its guidance, instead of generating inline code fixes and guidance independently.
- Semgrep Assistant is now enabled by default if you allow code access to your repositories.
- Semgrep AppSec Platform only displays **Assistant recommended tasks** information on the **Dashboard** if there are tasks for the current week.

## 📝 Documentation and knowledge base

### Added

- New Semgrep Docs homepage.

### Changed

- Updated theming, including colors and styling.
- Various updates and reorganization of documentation for Semgrep Assistant.
- Various improvements to the [Network broker](/semgrep-ci/network-broker) documentation.

### Fixed

- Updated and fixed various broken links.
- Minor typographical fixes.

## 🔧 OSS Engine

* The following versions of the OSS Engine were released in September 2024:
  * [<i class="fas fa-external-link fa-xs"></i>1.86.0](https://github.com/semgrep/semgrep/releases/tag/v1.86.0)
  * [<i class="fas fa-external-link fa-xs"></i>1.87.0](https://github.com/semgrep/semgrep/releases/tag/v1.87.0)
  * [<i class="fas fa-external-link fa-xs"></i>1.88.0](https://github.com/semgrep/semgrep/releases/tag/v1.88.0)
  * [<i class="fas fa-external-link fa-xs"></i>1.89.0](https://github.com/semgrep/semgrep/releases/tag/v1.89.0)
  * [<i class="fas fa-external-link fa-xs"></i>1.90.0](https://github.com/semgrep/semgrep/releases/tag/v1.90.0)
