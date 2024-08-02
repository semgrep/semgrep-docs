---
slug: primary-branch
title: Primary branch
hide_title: true
description: Set your primary or default branch to ensure Semgrep full scans display accurate counts and deduplicated findings.
tags:
  - Semgrep AppSec Platform
---

# Set a primary branch

A **primary branch** is the base or target branch for pull and merge requests. It is usually referred to as a **default branch** or **trunk** by your source code manager (SCM). Typical names for a primary branch include `dev`, `production`, or `develop`.

In many cases, Semgrep automatically detects primary branches. If you have projects (repositories) with unique primary branch names, you can set them through the Semgrep web app.

:::
Currently in private beta
- Primary branches are set on a per-project basis. They cannot be set in bulk.
:::

## Semgrep autodetection behavior


| Source code manager | Behavior |
| -------  | ------ |
| GitHub         <td rowspan="2"> Automatically detected when Semgrep fetches your repository list. </td> | GitLab

## Discover which projects do not have a primary branch
