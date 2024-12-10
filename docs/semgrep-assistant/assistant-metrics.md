

# Assistant metrics and methodology

 
Our metrics for evaluating Semgrep Assistant's performance are derived from two key sources:
- user feedback on Assistant recommendations within the product
- internal triage / benchmarking conducted by our security research team 

This methodology ensures that Assistant is evaluated from both a user-centric perspective and through expert-driven technical scrutiny, giving our product and engineering teams a holistic view into Assistant's real-world performance in a variety of contexts. 

## User feedback 
User feedback reflects performance of Assistant across **600+ customers**, providing a comprehensive real-world dataset. 

The user feedback loop is baked into product workflows to ensure comprehensiveness and to reduce sampling bias. Users are prompted in-line to "thumbs up" or "thumbs down" Assistant suggestions. 


**Results as of December 10, 2024:**


|                        |         |
|------------------------|---------|
| Customers in dataset   | **600+**|
| Assistant runs (findings analyzed) | **X** |
| Human-agree rate       | **95%** |
| Median time to resolution     | **22% faster** |
| Developer time saved per finding (average)   | **30 minutes** |


## Internal benchmarks 
Internal benchmarks for Assistant utilize a systemic process in which a rotating team of security engineers conduct weekly reviews of Assistant generated remediation guidance. 

Internal benchmarks for Assistant run on the same dataset used by our security research team to analyze Semgrep rule performance. This means the dataset is not prone to cherry-picked findings that are easier for AI to analyze, and accurately represents real-world performance across a variety of contexts. 

**Results as of December 10, 2024:**

|                        |         |
|------------------------|---------|
| Findings analyzed  | **X**|
| False positive detection accuracy       | **98%** |
| Remediation guidance accuracy      | **80%** |

**Note:** Remediation guidance is rated on a binary scale of "helpful" / "not helpful".  

