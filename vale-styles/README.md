# vale-styles

Style enforcement in line with Semgrep technical writing handbook.

----

Before proceeding, ensure that you have [installed Vale version 3.x or later](https://vale.sh/docs/install).

## How to use

1. Create a `vale.ini` file in the root of your repository, and use the following configuration:

    ```ini
    StylesPath = vale-styles
    MinAlertLevel = error
    Packages = Google
    Vocab = Tech

    [formats]
    mdx = md

    [*]
    BasedOnStyles = Vale, GoogleSemgrep
    # Google.WordList = NO
    ```

    See [.vale.ini](https://vale.sh/docs/vale-ini) for additional information on configuration options.

2. Run Vale by invoking it on an existing document

    ```bash
    vale semgrep-docs/docs/somedoc.md
    ```

4. Optional: run Vale as a linter in your preferred environment.
