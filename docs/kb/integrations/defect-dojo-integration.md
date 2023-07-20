---
tags:
  - DefectDojo
  - Integrations
description: How to connect Semgrep and DefectDojo
---

# How to connect Semgrep and DefectDojo

[DefectDojo](https://www.defectdojo.com/) is a well-known vulnerability management tool. It allows you to gather security issues from tools like Semgrep and more. By integrating Semgrep findings into DefectDojo, security teams can gather security issues from multiple tools into one place and more effectively monitor their security posture.

## Integration
Follow these steps to prep DefectDojo and generate Semgrep findings in the proper format:

1. In DefectDojo:
    1 Create your [**product**](https://defectdojo-dev.readthedocs.io/en/latest/features.html#products).
    2. In that DefectDojo product, create an **engagement** called `semgrep`. An engagement is a channel to import results.
2. Run a semgrep scan with flags `--json --output report.json` to generate a JSON report.

Now, there are all the necessary elements to start playing with [DefectDojo API](https://documentation.defectdojo.com/integrations/api-v2-docs/).

### DefectDojo API example 

To run API DefectDojo operations such as GET, POST, and DELETE, an API token is necessary. To get it, follow the [API guide](https://documentation.defectdojo.com/integrations/api-v2-docs/).

* Once got it, in your system, usually in your CI environment, declare the environment variable `DEFECT_DOJO_API_TOKEN`
```
export DEFECT_DOJO_API_TOKEN=[YOUR_DEFECT_DOJO_TOKEN]
```
Exploring the DefectDojo API, the endpoint is: `/api/v2/import-scan/` for the first import and `/api/v2/reimport-scan` for the following imports.

These endpoints receive some parameters. The following must be specified:
* `file`: The Semgrep scan findings report or export in JSON format
* `scan_type`: A descriptive name for the scan type. In this example, we use "Semgrep JSON Report" for Semgrep importation.
* `product_name`: The name of the product in DefectDojo to send the Semgrep findings report to.
* `engagement_name`: Depending on your use case, the [`engagement_name`](https://defectdojo-dev.readthedocs.io/en/latest/about.html#engagements) can describe a moment in time that the test is taking place in, or it can be used as a simple description about the import. In this case, you can name it `semgrep`.

So a Python function using this endpoint can look like this:

```
def uploadToDefectDojo(is_new_import, token, url, product_name, engagement_name, filename):
    multipart_form_data = {
        'file': (filename, open(filename, 'rb')),
        'scan_type': (None, 'Semgrep JSON Report'),
        'product_name': (None, product_name),
        'engagement_name': (None, engagement_name),
    }

    endpoint = '/api/v2/import-scan/' if is_new_import else '/api/v2/reimport-scan/'
    r = requests.post(
        url + endpoint,
        files=multipart_form_data,
        headers={
            'Authorization': 'Token ' + token,
        }
    )
    if r.status_code != 200:
        sys.exit(f'Post failed: {r.text}')
    print(r.text)
```

The full version of this Python script can be found in the [Semgrep Utilities repository](https://github.com/r2c-CSE/semgrep-utilities/blob/main/integrations/defectdojo/import_semgrep_to_defect_dojo.py).
It is ready to execute.

### Running the script

To run the script:
```
python3 integrations/defectdojo/import_semgrep_to_defect_dojo.py --host DOJO_URL --product PRODUCT_NAME --engagement ENGAGEMENT_NAME --report REPORT_FILE 
```
Where:
* `DOJO_URL` is the URL where DefectDojo is.
* `PRODUCT_NAME` is the DefectDojo product name.
* `ENGAGEMENT_NAME` is the DefectDojo engagement name for that product.
* `REPORT_FILE` is the Semgrep report path

## Integrating Semgrep and DefectDojo in a CI pipeline

To prevent tampering at any point of delivery, it is crucial to integrate security scans and dump results to DefectDojo in the **same pipeline or CI job**.
The following is an example of a GitLab job importing Semgrep findings to DefectDojo:

```
import-semgrep-to-defectdojo:
  stage: import
  image: python:3.9-bullseye
  script:
    - echo "Importing Semgrep scan to DefectDojo"
    - pip3 install requests
    - curl -O https://raw.githubusercontent.com/r2c-CSE/semgrep-utilities/main/integrations/defectdojo/import_semgrep_to_defect_dojo.py
    - python3 import_semgrep_to_defect_dojo.py --host $DEFECTDOJO_URL --product $PRODUCT --engagement semgrep --report report.json || true
  rules:
    # Scan changed files in MRs, (diff-aware scanning):
    - if: $CI_MERGE_REQUEST_IID
    # Scan mainline (default) branches and report all findings.
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
  tags:
    - defectdojo
  variables:
    DEFECT_DOJO_API_TOKEN: $DEFECT_DOJO_API_TOKEN
```

### Adding checksum validation
During the CI job and to verify that the job downloads the correct Python script securely, check the integrity with a checksum such as SHA 256 code. It prevents tampered scripts from executing.

```
    - echo $IMPORT_SEMGREP_TO_DEFECTDOJO_SHA_CHECKSUM > sha-import-dd.tmp
    - shasum -a 256 -U -c sha-import-dd.tmp
```
Where:
* `IMPORT_SEMGREP_TO_DEFECTDOJO_SHA_CHECKSUM` is the result of executing `shasum -a 256 -U import_semgrep_to_defect_dojo.py`

## Conclusions
Dumping Semgrep scan results to [DefectDojo](https://www.defectdojo.com/) can speed up vulnerability management operations in an organization. Integrating scans and imports in the same CI pipeline should be a high priority for DevSecOps programs.
