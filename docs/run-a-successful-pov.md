---
slug: run-a-successful-pov
title: Run a successful POV with Semgrep
hide_title: true
description: Explore and deploy the Semgrep platform through a proof-of-value (POV) trial. Semgrep dedicates support and engineering resources to ensure you are able to run Semgrep smoothly.
tags:
  - Semgrep AppSec Platform
  - Support
---

# Run a successful proof-of-value (POV) with Semgrep

:::note Start a POV
To start a proof-of-value (POV), contact Sales at [<i class="fa-regular fa-envelope"></i> sales@semgrep.com](mailto:sales@semgrep.com).
:::

Run a POV to learn more about Semgrep solutions and receive support that is specific to your infrastructure and business needs. During a POV, you receive dedicated sales, engineering, and support resources to ensure that every Semgrep feature that supports your infrastructure is implemented quickly and reliably.

## POV requirements

To run a successful POV, the Semgrep team needs decisions regarding the following factors from your organization:

- **The number of trial licenses**
    - How many trial licenses are needed? Who among your organization will be evaluating Semgrep?
- **The team involved in running the POV**
    - Semgrep creates accounts for everyone on the team who is involved in the POV.
- **The method to scan the repositories used in the POV**
    - **Recommended: Semgrep Managed Scans (SMS)**
        - This is the fastest way to deploy Semgrep to the repositories you want to scan. It requires code access, which can be limited to only certain repositories. See [Permissions](/deployment/checklist#permissions) to review SMS requirements.
    - **CI/CD**
        - This method relies on a CI configuration file, such as a GitHub Actions workflow file. A CI/CD job must be created for all of the repositories you want to scan.
- **The technical resources**
    - You must decide on and communicate the repositories you want Semgrep to scan for the POV.
    - You must decide on and communicate to Semgrep your account management, infra, and tech needs.

:::tip Benefits of Semgrep Managed Scans
SMS is the **fastest** and **most scalable** deployment method, since it enables you to onboard repositories for scanning without the need for CI integrations. However, SMS requires code access. [Review the required permissions](/deployment/checklist#permissions).
:::

## Summary

The following table includes a short summary of the POV process.

| Step | Activities |
| -------  | ------ |
| Both parties agree to run a POV | <ul><li>Verify that your technical stack is supported by Semgrep.</li><li>Begin gathering necessary permissions from your organization for **technical resources** to run the POV.</li></ul>  |
| Pre-POV kickoff call and preparation |  <ul><li>Both parties establish success criteria and alignment of the POV goals through a **kickoff call**.</li><li>Semgrep prepares for the POV by creating a dedicated Slack channel and other nessary accounts.</li></ul>      |
| Formal POV period | <ul><li>Semgrep deployment rollout.</li><li>Detection and remediation of findings.</li><li>Analysis of Semgrep ROI.</li></ul>       |
| Optional POV activities | <ul><li>A roadmap call with the Semgrep product team.</li><li>A rule-writing session where you can learn how to write custom Semgrep rules.</li></ul> |
| POV conclusion | Semgrep sets up a wrap-up call that discusses Semgrep's performance and your feedback about Semgrep. |

## General steps 

Running a POV involves the following steps:

### Both parties agree to running a POV

- From your end (the buyer), a need has been identified and budget has been allocated.
- From Semgrep's end, the team has verified, with your help, that your technical stack is supported by Semgrep. This includes:
    - Programming languages
    - Source code managers
    - Account management
    - Other factors
- **Optional**: If you'd like a **technical deep dive** of Semgrep from a sales engineer, you can request for one through your account executive.
- Semgrep recommends that **the buyer (you) start gathering and gaining approvals** from your organization for resources needed to run the POV, such as repository access. 

### Pre-POV

#### Kickoff call

- During the pre-POV kickoff call, both parties set **success criteria**.
- You and your organization can define the success criteria, or Semgrep can assist you in creating them. 
- The pre-POV kickoff call ensures that all stakeholders are aligned for the goals of the POV.
- It also ensures that the technical requirements for both parties are clearly communicated.

#### Preparation for POV

In preparation for the POV, Semgrep performs the following tasks:

- Sets up a **dedicated Slack channel** where you can reach out to the team during the POV.
- Creates an account in Semgrep AppSec Platform for your organization.
- Connects your source code manager, such as GitHub or Bitbucket, to Semgrep.
- Sets up SSO if you require it.
- For on-premise environments, Semgrep sets up the Network Broker to facilitate secure access between Semgrep and your private network.

### Formal POV period

This is a **two-week** period in which Semgrep assists you in deployment, scanning, triage, reporting, and all other related functions for a successful security program.

It is broken into three smaller phases.

#### Semgrep deployment rollout

In this phase, the Semgrep team assists you to complete the following tasks:

- Onboard with SMS or onboard in CI
- Repos that are in scope for testing are onboarded and findings are seen in Semgrep Platform for products in the POV scope
- Assistant has been enabled and is analyzing full scan findings
- Plan for enabling PR comments and involving developers in Semgrep

#### Detection and remediation of findings

In this phase, the Semgrep team assists you to complete the following tasks:

- Review the quality of findings with out-of-the-box rules
- Show how Semgrep **filters out noise** with:
    - Assistant Memories and triage for Semgrep Code
    - Direct and transitive reachability for Semgrep Supply Chain
    - Secrets validation for Semgrep Secrets
- Improve developer experience through contextual, actionable vulnerability information 
    - Inline PR comments
    - Tailored remediation guidance in PR comments
    - Breaking changes and upgrade guidance for Supply Chain findings
- Integrate Jira for ticket creation and Slack for notifications if part of the success criteria

#### Semgrep return-on-investment

In the final phase, the Semgrep team provides you with data on the return on investment that Semgrep provides, compared to your existing security program.

Some metrics include:

- The number of developers in your company and the cost per developer per hour
- Number of hours **reduced** per developer, per year in triage time, research and fix time by having Semgrep Assistant provide autofix and triage recommendations
- Number of hours reduced in triage time per developer by having the ability to detect if secrets are valid or invalid
- Reduction in review time with Semgrep Supply Chain reachability analysis

### Optional POV activities

Feel free to request for the following:

- **Roadmap call**. You can request a call with the Product team to learn about Semgrep's upcoming features and approaches.
- **Rule-writing session**. Learn how to write Semgrep rules to customize Semgrep for your organization's unique code standards.

### POV conclusion

When the POV ends, Semgrep sets up a wrap-up call that discusses the following:

- Semgrep's performance measured against the evaluation criteria
- Your feedback about Semgrep

## Trial license duration

The trial license duration lasts for 30 days.

## Appendix: common questions and evaluation criteria

<details>
<summary>
Click to view a sample of common questions you and your team may ask to identify specific needs and criteria to evaluate Semgrep.
</summary>

- **Feature set**
  - What features and language support do you need?
  - How easy is it to set up a Semgrep POV environment?
- **Deployment**
  - Does Semgrep support your unique infrastructure or network needs?
  - Does Semgrep support your SCM and CI provider? Can you easily deploy Semgrep through SMS?
- **Integrations and notifications**
  - Do the Semgrep integrations support your workflows for that tool? For example, does Semgrep support your custom fields in Jira?
  - Are your custom workflows supported by the Semgrep API? 
- **Findings and reports**
  - What percent of findings are true positives? How does this compare with previous tools? 
  - Is Semgrep Assistant (AI) able to reduce false positives? 
  - Does the dashboard assist you in tracking secure guardrails?
- **Security**
  - Can Semgrep handle your sensitive data securely?
  - Can Semgrep successfully block PRs based on the criteria you need to set?
- **Support and documentation**
    - How easy is it to work with the Semgrep support team? Do they respond within the timeframe provided to you?
    - Does the documentation provide you with a clear explanation of the product and features? Was it easy for you to find answers?

</details>
