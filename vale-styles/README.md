# vale-styles

Style enforcement in line with Semgrep technical writing handbook.

**🔥 Caution 🔥**
This style repository is a work-in-progress.

----

**Prerequisite:**
* Existing `vale.sh` installation.

## How to use

1. Use the following configuration in your vale.ini file:
    ```
    StylesPath = styles
    MinAlertLevel = error
    Packages = Google
    Vocab = Tech
    
    [formats]
    mdx = md
    
    [*]
    BasedOnStyles = Vale, GoogleSemgrep
    # Google.WordList = NO
    ```
2. Pull this repository into a `styles` folder. This folder can be created in your home directory (~/styles). 
2. Run `vale` by invoking it on an existing document: `vale semgrep-docs/docs/somedoc.md`
3. (Optional) Run `vale` as a linter in your preferred environment.
