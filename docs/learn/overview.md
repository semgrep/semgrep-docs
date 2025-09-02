---
title: Semgrep Learn
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


Welcome to Semgrep Learn, your comprehensive resource for application security knowledge, rule writing expertise, and static analysis fundamentals! Whether you're a seasoned security engineer, a developer looking to improve code quality, or just starting your AppSec journey, Semgrep Learn provides the resources you need to excel.

At Semgrep, we believe security knowledge should be accessible to everyone. That's why our learning platform offers free, in-depth content covering:

- **SAST Fundamentals**: Understand how static analysis security testing works and why it matters
- **Writing Semgrep Rules**: Master the art of creating custom rules to find vulnerabilities in your codebase
- **Vulnerability Topics**: Deep dives into common security issues like SQL injection, XSS, and more
- **Secure Coding Practices**: Learn how to write code that's secure by design

Our platform includes interactive tutorials, practical examples, downloadable resources, and step-by-step guides to help you implement what you've learned. Whether you want to become a rule-writing expert or simply understand how to better secure your applications, Semgrep Learn meets you where you are.

Ready to enhance your security knowledge? Explore our articles and tutorials today and join the growing community of Semgrep security experts!

<div class = "col-2-fixed">
  <Card className={'card-50'} link='https://academy.semgrep.dev'>
    <CardImage cardImageUrl='/img/icon-first-scan.svg' />
    <div class="card__copy">
        <CardHeader>Courses</CardHeader>
        <CardBody>
          Learn core security concepts through video courses curated by Semgrep.<br />
        </CardBody>
    </div>
  </Card>
  <Card className={'card-50'} link='/learn/security-foundations/sast/overview'>
    <CardImage cardImageUrl='/img/icon-rules.svg' />
    <div class="card__copy">
        <CardHeader>Security Foundations</CardHeader>
        <CardBody>
          Learn the fundamentals of SAST.
        </CardBody>
    </div>
  </Card>
  <Card className={'card-50'} link='https://semgrep.dev/learn'>
    <CardImage cardImageUrl='/img/icon-rules.svg' />
    <div class="card__copy">
        <CardHeader>Rules</CardHeader>
        <CardBody>
          Learn to write rules through interactive learning.
        </CardBody>
    </div>
  </Card>
  <Card className={'card-50'} link='/learn/vulnerabilities/overview'>
    <CardImage cardImageUrl='/img/icon-rules.svg' />
    <div class="card__copy">
        <CardHeader>Vulnerabilities</CardHeader>
        <CardBody>
          Learn about common security vulnerabilities and how to prevent them.
        </CardBody>
    </div>
  </Card>
</div>
