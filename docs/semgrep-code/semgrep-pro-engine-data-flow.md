---
slug: semgrep-pro-engine-data-flow
append_help_link: true
description: "This article documents data flow analysis implementation in Semgrep AppSec Platform and helps you to enable and find it on the Findings page."
hide_title: false
title: Cross-file analysis taint traces
---


import DisplayTaintedDataIntro from "/src/components/concept/_semgrep-code-display-tainted-data.mdx"
import DisplayTaintedDataProcedure from "/src/components/procedure/_semgrep-code-display-tainted-data.mdx"

## Introduction

This article documents the cross-file (interfile) dataflow analysis in Semgrep Code. This document helps you to enable these features and provides an overview of the benefits compared to the analysis of Semgrep Community Edition (CE).

## Viewing the path of tainted data

<DisplayTaintedDataIntro />

### Displaying tainted data in Semgrep Code

<DisplayTaintedDataProcedure />
