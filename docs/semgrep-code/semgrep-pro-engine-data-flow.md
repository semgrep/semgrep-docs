---
slug: semgrep-pro-engine-data-flow
append_help_link: true
description: "This article documents data flow analysis implementation in Semgrep Cloud Platform and helps you to enable and find it on the Findings page."
hide_title: false
title: Semgrep Pro Engine taint traces
---

import MoreHelp from "/src/components/MoreHelp"
import DisplayTaintedDataIntro from "/src/components/concept/_semgrep-code-display-tainted-data.mdx"
import DisplayTaintedDataProcedure from "/src/components/procedure/_semgrep-code-display-tainted-data.mdx"

## Introduction

This article documents dataflow analysis of Semgrep Pro Engine and cross-file analysis in the Semgrep Code. This document helps you to enable these features and provides an overview of the benefits compared to the analysis of Semgrep OSS.

## Viewing the path of tainted data

<DisplayTaintedDataIntro />

### Displaying tainted data in Semgrep Code

<DisplayTaintedDataProcedure />

<MoreHelp />
