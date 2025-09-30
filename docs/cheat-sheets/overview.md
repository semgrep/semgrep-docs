---
slug: /cheat-sheets/overview
displayed_sidebar: learnSidebar
append_help_link: true
title: Cheat Sheets
hide_title: false
description: Learn about and prevent specific OWASP vulnerabilities through these Semgrep cheat sheets.
hide_table_of_contents: false
---

import ThemedImage from '@theme/ThemedImage'
import Card from '@site/src/components/Card'
import CardBody from '@site/src/components/Card/CardBody'
import CardHeader from '@site/src/components/Card/CardHeader'
import CardImage from '@site/src/components/Card/CardImage'


Semgrep **cheat sheets** serve as security reference guides with programming language–specific examples. They are designed to help you mitigate common risks in popular libraries and frameworks while ensuring secure practices in your source code.

See [Supported Languages](/docs/supported-languages) for the complete set of languages and [package managers](/docs/supported-languages#package-manager-support) supported by Semgrep.

<div class = "col-1-fixed">
  <Card className={'card-50'} link='/docs/category/go'>
    <CardImage cardImageUrl='/img/icon-triage.svg' />
    <div class="card__copy">
        <CardHeader>Go</CardHeader>
        <CardBody>
        Cheat sheets for the Go ecosystem including net/http.
        </CardBody>
    </div>
  </Card>
  <Card className={'card-50'} link='/docs/category/java'>
    <CardImage cardImageUrl='/img/icon-triage.svg' />
    <div class="card__copy">
        <CardHeader>Java</CardHeader>
        <CardBody>
        Cheat sheets for the Java ecosystem including JSP.
        </CardBody>
    </div>
  </Card>
  <Card className={'card-50'} link='/docs/category/javascript'>
    <CardImage cardImageUrl='/img/icon-triage.svg' />
    <div class="card__copy">
        <CardHeader>JavaScript</CardHeader>
        <CardBody>
        Cheat sheets for the JavaScript ecosystem including Express.
        </CardBody>
    </div>
  </Card>
  <Card className={'card-50'} link='/docs/category/python'>
    <CardImage cardImageUrl='/img/icon-triage.svg' />
    <div class="card__copy">
        <CardHeader>Python</CardHeader>
        <CardBody>
        Cheat sheets for the Python ecosystem including Django and Flask.
        </CardBody>
    </div>
  </Card>
  <Card className={'card-50'} link='/docs/category/ruby'>
    <CardImage cardImageUrl='/img/icon-triage.svg' />
    <div class="card__copy">
        <CardHeader>Ruby</CardHeader>
        <CardBody>
        Cheat sheets for the Ruby ecosystem including Rails.
        </CardBody>
    </div>
  </Card>
</div>

## Additional Resources

* [Vulnerabilities](/learn/vulnerabilities/overview): Descriptions for different classes of vulnerabilities you may encounter.

* [Secure Coding Blog](https://semgrep.dev/blog/secure-coding/): Recent blog posts from the Semgrep team about secure coding practices.




