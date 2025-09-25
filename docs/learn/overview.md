---
title: Semgrep Learning Guides
description: Learn Semgrep through comprehensive, hands-on courses and practical examples
hide_title: false
displayed_sidebar: learnSidebar
slug: /learn
hide_table_of_contents: true
---

import ThemedImage from '@theme/ThemedImage'
import Card from '@site/src/components/Card'
import CardBody from '@site/src/components/Card/CardBody'
import CardHeader from '@site/src/components/Card/CardHeader'
import CardImage from '@site/src/components/Card/CardImage'


This section is all about learning the concepts behind **Application Security** and **Secure Coding** with guided tutorials. Whether a seasoned security engineer looking for resources to share with your teams, a developer looking to improve code quality, or just getting started in cybersecurity we hope you find these guides helpful.

<div class = "col-1-fixed">
  <Card className={'card-50'} link='/learn/security-foundations/sast/overview'>
    <CardImage cardImageUrl='/img/icon-deploy.svg' />
    <div class="card__copy">
        <CardHeader>Security Foundations</CardHeader>
        <CardBody>
          Learn the fundamentals for how Static Analysis Security Testing (SAST) and Software Composition Analysis (SCA) work and why it matters.
        </CardBody>
    </div>
  </Card>
  <Card className={'card-50'} link='/learn/vulnerabilities/overview'>
    <CardImage cardImageUrl='/img/icon-triage.svg' />
    <div class="card__copy">
        <CardHeader>Vulnerabilities</CardHeader>
        <CardBody>
          Deep dive into common security risks with examples for what issues like SQL injection, Cross-Site Scripting, and Open Redirects look like.
        </CardBody>
    </div>
  </Card>
  <Card className={'card-50'} link='/docs/cheat-sheets/overview'>
    <CardImage cardImageUrl='/img/icon-rules.svg' />
    <div class="card__copy">
        <CardHeader>Secure Coding</CardHeader>
        <CardBody>
          Learn how to write code that's secure by design for popular programming languages with cheat sheets to use as a reference.
        </CardBody>
    </div>
  </Card>
  <Card className={'card-50'} link='https://academy.semgrep.dev'>
    <CardImage cardImageUrl='/img/icon-first-scan.svg' />
    <div class="card__copy">
        <CardHeader>Semgrep Academy</CardHeader>
        <CardBody>
          Learn core security concepts by viewing video courses led by experts in the field.<br />
        </CardBody>
    </div>
  </Card>
</div>
