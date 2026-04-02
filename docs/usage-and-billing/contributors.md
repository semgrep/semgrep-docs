---
slug: contributor-count-explained
append_help_link: true
title: How Semgrep calculates contributor count
description: Learn how Semgrep calculates contributor count, including deduplication, bot filtering, and repository visibility rules.
displayed_sidebar: aboutSidebar
tags:
  - Support
  - Semgrep AppSec Platform
hide_title: true
---

# How Semgrep calculates contributor count

This page explains how Semgrep calculates contributor count beyond the [basic billing definition](/usage-and-billing/overview#contributor-counts). It is intended to help explain why a contributor count may differ from your organization's internal estimate and how Semgrep reduces double-counting in repository history. 

## Why contributor counts can be hard to calculate

Raw commit history does not always cleanly map to unique people. The same contributor can appear under multiple identities over time, including:
- Multiple company email addresses
- Email aliases or formatting variations
- GitHub-generated noreply addresses used in merge commits

Repository history can also include bots and automation accounts that should not count as human contributors. To make contributor counts more accurate, Semgrep applies normalization, deduplication, and filtering steps to the underlying commit data.

## How Semgrep reduces double-counting

Semgrep uses commit metadata from scanned repositories to identify likely duplicate identities and count them once.

This process can include:
- normalizing common email variations
- matching contributors who appear under multiple company domains
- resolving GitHub noreply addresses back to known contributor identities when possible

The goal is to better reflect distinct human contributors rather than counting every raw identity in commit history as a separate person.

## How Semgrep handles personal email addresses

Personal email addresses sometimes appear in repository history alongside company-managed identities. Personal emails are weak identifiers and are harder to match reliably across environments. Semgrep applies some filtering rules to reduce overcounting and also keeps a pre-filtered version of the data for auditing and comparison.

- If the primary domain for the deployment is a company domain, Semgrep does not count contributors who appear only with personal email addresses. It still counts contributors who have at least one company email address.
- If the primary domain for the deployment is a personal email domain, such as gmail.com, Semgrep counts only contributors whose email matches that domain. It does not count contributors who appear only with other personal email domains.
- If Semgrep cannot identify a primary domain, it does not apply personal email filtering.


## How Semgrep handles bots and automation accounts


Contributor count is intended to measure human contributors, not automated systems. Semgrep excludes known bot and automation accounts from the calculation using maintained exclusion lists informed by bot-related patterns in commit metadata.

## Public and private repositories

Public GitHub repositories that are explicitly set to be visible to everyone are excluded from contributor count calculations.

All GitHub Enterprise Server repositories are treated as private for this purpose, regardless of visibility.

## Why your internal estimate might differ

A customer’s internal estimate may differ from Semgrep’s contributor count for a few common reasons:
- One person appears under multiple identities in commit history
- Bots or service accounts are present in raw repository data
- Public repositories are excluded
- Personal email addresses cannot always be matched reliably
- Limited git history reduces the set of visible contributors 

Because of this, contributor count should be understood as a usage metric based on observed repository activity over a defined period, not as an employee roster or HR headcount.

## Why git history matters

Contributor count depends on the commit history available at scan time. If a checkout includes limited history, Semgrep might not see every contributor active during the full 90-day lookback window. 

## Questions about your contributor count

If you have questions about your contributor count, contact [Semgrep support](/support) or your account manager for help reviewing the result.