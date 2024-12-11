You can export findings to a **CSV** file. Semgrep can export up to **10,000 most recent findings**. For findings greater than 10,000, you must use the [<i class="fas fa-external-link fa-xs"></i>API](https://semgrep.dev/api/v1/docs/).

Findings exported in the CSV file are not affected by filters you apply in the page.

Export findings by navigating to the product page and clicking the **<i class="fa-regular fa-download"></i> icon** near the time filters.

![The download findings CSV button](/img/download-csv.png#md-width)
_**Figure**. The download findings CSV button._

<details>
<summary>Click to view a description of all fields included in the CSV.</summary>
| Field  | Description |
| -------  | ------ |
| Id | The unique id number of the finding. |
| Rule name | The name of the rule.  |
| Product | The Semgrep product. Possible values are **Code**, **Supply Chain**, or **Secrets**.  |
| Severity | The finding's severity. Possible values are **Critical**, **High**, **Medium**, or **Low**.  |
| Status | The finding's triage status.   |
| Confidence | The finding's confidence. Possible values are **High**, **Medium**, or **Low**.  |
| Category | The finding's category, such as **best practices**, **security**, or **correctness**.  |
| Is pro rule | Boolean value that returns `TRUE` if the rule that generated the finding is a pro rule.    |
| Assistant triage result | Provides Semgrep Assistant's assessment. Possible values are `True positive` or `False positive`. These values appear only if Assistant is enabled.  |
| Assistant triage reason | A short AI-generated reason why Assistant thinks the finding is a true or false positive. These values appear only if Assistant is enabled.  |
| Assistant component | A descriptor, such as `API`, `Payments processing`, `Infrastructure`, that Assistant tags the finding with, based on the code's context.  |
| Repository name | The name of the repository where Semgrep found the finding.  |
| Repository URL | The repository URL.   |
| Line of code URL | The URL to the specific line of code where the finding match began. A finding may be several lines long. |
| Semgrep platform link  | A link to the finding's **Details** page in Semgrep AppSec Platform. |
| Created at | The time the finding was created in your timezone.  |
| Last Opened at | The time the finding was last opened. |
| Branch | The name of the branch where the finding was detected.  |
| Triaged at | The most recent time that the finding was triaged. |
| Triage comment | A triage comment created by the user.  |
| Triage reason | The reason why the finding was triaged, created by the user. |
| Rule description | The description of the rule. This is the same as the rule's `message` key.  |
</details>
