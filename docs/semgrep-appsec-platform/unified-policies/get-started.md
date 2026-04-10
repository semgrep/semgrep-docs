---
slug: get-started
title: Get started
hide_title: true
description: Learn how to get started and manage unified policies.
tags:
  - policies
---

# Create and manage unified policies

This document explains how to migrate existing policies to [unified policies](/semgrep-appsec-platform/unified-policies/overview), as well as how to create new unified policies.

## Migrate existing policies

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login).
2. Go to **Rules & Policies > Policies**. You will see a banner that prompts you to begin the upgrade to unified policies. Click to launch the **Upgrade to Unified Policies** dialog, and follow the on-screen prompts to proceed.
3. Review the policies that Semgrep has migrated for you. For each product where you have existing policies, select the **I have reviewed these migration details** checkbox to proceed.
4. When you have completed the migration process, you'll be redirected to the new **Policies** page where you can manage your detection and remediation policies.

## Manage existing detection policies

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login).
1. Go to **Rules & Policies > Detection**. You can manage your policies for:
      - Code rules
      - Secrets rules
      - Supply Chain advisories.
1. Select the product for which you’d like to manage your Detection policy, and click **Edit**.
1. Find the rules and rulesets for which you’d like to modify. In addition to the  filters that allow you to narrow down the list of rules based on scanning behaviors, languages, rulesets, and more, you can search for the rule using its name or label.
1. To change the behavior of your rules:
   1. Select the rules by clicking the checkboxes next to their names, then click **Change scanning behavior (n)**. Alternatively, if you're modifying only one rule, you can click the rule’s link in the **Projects scanning** column.
   2. The **Projects scanning** dialog appears. You can choose to use the rules with **All projects**, **Selected projects** by **Project name**, **Selected projects** by **Tags**, **All with exceptions**, or **None (disable)**.
    3. To use the rules with all of your projects, click **All projects**, then click **Save**.
    4. To use the rules with some of your projects, click **Selected projects**, then click the checkboxes next to the projects to which the rule applies. Click **Save** to proceed.
    5. To exclude specific projects, click **All with exceptions**, then select the projects to which the rule doesn’t apply. Click **Save** to proceed.
    6. To prevent the rules from being used at all, click **None (Disable)**, then **Save** to proceed.

## Create a remediation policy

1. Sign in to Semgrep AppSec Platform.
1. Go to **Rules & Policies > Remediation**. 
1. To create a policy that defines the automated responses to security findings:
   1. Click **+ Create automation**.
   2. Provide a **Policy name**.
   3. Set the **Scope** of the policy by selecting all of the projects to which this policy applies.
   4. Define the **Conditions** that trigger the policy by clicking **+ Add condition** to expand a drop-down list of attributes that you can use. Select the attribute, then set the specific conditions. 
      - For example, you can select **Severity**, then complete the conditional statement provided to read **When Severity is any of Critical, High**.
      - You can define as many conditions as necessary, and Semgrep treats them additively.
   5. Choose the **Actions** that occur if there are findings that trigger the policy by clicking **+ Add action**. You can choose multiple **Actions**, including:
      - **Comment on and block PR/MR merge**
      - **Comment on PR/MR**
      - **Create a JIRA ticket**
      - **Send a Slack message**
      - **Call a webhook**
       Note that the following actions require additional configuration: [Create a Jira ticket](/semgrep-appsec-platform/jira), [Send a Slack message](/semgrep-appsec-platform/slack-notifications), and [Call a webhook](/semgrep-appsec-platform/webhooks).
   6. Click **Create & Enable** to save and proceed, so that Semgrep uses your new policy the next time you scan a project within its scope. Otherwise, click **Create** to save your changes without enabling the policy.