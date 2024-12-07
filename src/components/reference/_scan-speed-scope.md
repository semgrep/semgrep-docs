| Interface | Scope of scan | Analysis | Typical speed |
| --------- | ------------- | ------------- | ------------- |
| IDE (per keystroke and on save) | Current file  | Single-function, single-file | In a few seconds |
| CLI on commit (through [`pre-commit`](https://pre-commit.com/)) | Files staged for commit (cross-function, single-file analysis) | Cross-function, single-file | Under 5 minutes |
|PR or MR comments | All committed files and changes in the PR or MR | Cross-function, single-file analysis | Under 5 minutes |
