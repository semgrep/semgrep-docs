/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

module.exports = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  //mySidebar: [{ type: 'autogenerated', dirName: '.' }],

  // But you can create a sidebar manually
  tutorialSidebar: [
    'Docs home',
    {
        type: 'category',
        label: 'Welcome',
        collapsible: false,
        items: [
            'getting-started',
            'semgrep-app/getting-started-with-semgrep-app',
            'semgrep-ci/overview',
            'semgrep-sc/sc-getting-started',
            'contributing/philosophy'
        ]
    },
    {
      type: 'category',
      label: 'Semgrep Platform',
      collapsible: false,
      items: [
        'supported-languages',
        'ignoring-files-folders-code',
        'extensions',
        {
            type: 'category',
            label: 'Data-flow analysis',
            link: {type: 'doc', id: 'writing-rules/data-flow/data-flow-overview'},
            items: [
                'writing-rules/data-flow/data-flow-overview',
                'writing-rules/data-flow/constant-propagation',
                'writing-rules/data-flow/taint-mode',
                'writing-rules/data-flow/status'
            ]
        },
        'deepsemgrep',
        'semgrep-app/pricing-and-billing'
      ],
    },
    {
        type: 'category',
        label: 'Semgrep',
        collapsible: false,
        items: [
            {
                type: 'category',
                label: 'Command-line interface (CLI)',
                link: {
                    type: 'generated-index',
                    title: 'Semgrep command-line interface (CLI)',
                    description:
                      "Learn about Semgrep open source command line tool.",
                    keywords: ['CLI']
                  },
                items: [
                    'getting-started',
                    'running-rules',
                    'managing-findings',
                    'upgrading',
                    'reporting-false-negatives',
                    'cli-reference',
                    'troubleshooting/semgrep'
                ]
            },
            {
                type: 'category',
                label: 'Continuous integration (CI)',
                link: {
                    type: 'generated-index',
                    title: 'Semgrep in continuous integration (CI)',
                    description:
                      "Find out about use of Semgrep in continuous integration (CI)",
                    keywords: ['CI']
                  },
                items: [
                    'semgrep-ci/overview',
                    'semgrep-ci/running-semgrep-ci-with-semgrep-app',
                    'semgrep-ci/running-semgrep-ci-without-semgrep-app',
                    'semgrep-ci/configuration-reference',
                    'semgrep-ci/configuring-blocking-and-errors-in-ci',
                    'semgrep-ci/sample-ci-configs',
                    'troubleshooting/gitlab-sast'
                ]
            },
            {
                type: 'category',
                label: 'Cheat sheets',
                link: {
                    type: 'generated-index',
                    title: 'Cheat sheets',
                    description:
                      "This category provides r2c cheat sheets that help you to prevent specific vulnerabilities.",
                    keywords: ['cheat sheet']
                  },
                items: [
                    {
                        type: 'category',
                        label: 'Command injection',
                        items: [
                            'cheat-sheets/go-command-injection',
                            'cheat-sheets/python-command-injection'
                        ]
                    },
                    {
                        type: 'category',
                        label: 'XSS',
                        items: [
                            'cheat-sheets/django-xss',
                            'cheat-sheets/express-xss',
                            'cheat-sheets/flask-xss',
                            'cheat-sheets/go-xss',
                            'cheat-sheets/java-jsp-xss',
                            'cheat-sheets/rails-xss'
                        ]
                    },
                ],
            },
        ]
    },
    {
        type: 'category',
        label: 'Semgrep App',
        collapsible: false,
        items: [
            'semgrep-app/getting-started-with-semgrep-app',
            'semgrep-app/scm',
            'semgrep-app/dashboard',
            'semgrep-app/rule-board',
            'semgrep-app/findings',
            'semgrep-app/integrations',
            'semgrep-app/editor',
            'semgrep-app/notifications',
            'semgrep-app/sso',
            'semgrep-app/user-management',
            'troubleshooting/semgrep-app',
            'semgrep-app/semgrep-api'
        ]
    },
    {
        type: 'category',
        label: 'Semgrep Supply Chain',
        collapsible: false,
        items: [
            'semgrep-sc/sc-getting-started',
            'semgrep-sc/sc-triage-remediation',
            'semgrep-sc/sc-ignoring-deps',
            'semgrep-sc/sc-supported-langs',
            'semgrep-sc/sc-glossary'
        ]
    },
    {
        type: 'category',
        label: 'Writing custom rules',
        collapsible: false,
        items: [
            'writing-rules/overview',
            'writing-rules/pattern-examples',
            'writing-rules/pattern-syntax',
            'writing-rules/rule-ideas',
            'writing-rules/rule-syntax',
            'writing-rules/testing-rules',
            'writing-rules/private-rules',
            'troubleshooting/rules',
            {
                type: 'category',
                label: 'Experiments 🧪',
                link: {type: 'doc', id: 'writing-rules/experiments/introduction'},
                items: [,
                  'writing-rules/experiments/autofix',
                  'writing-rules/experiments/generic-pattern-matching',
                  { type: 'category',
                      label: 'Join mode',
                      link: {type: 'doc', id: 'writing-rules/experiments/join-mode/overview'},
                      items: [
                          {
                              type: 'doc',
                              label: 'Overview',
                              id: 'writing-rules/experiments/join-mode/overview'
                          },
                          'writing-rules/experiments/join-mode/recursive-joins'
                      ]
                  },
                  'writing-rules/experiments/extract-mode',
                  'writing-rules/experiments/project-depends-on',
                  'writing-rules/experiments/symbolic-propagation',
                  'writing-rules/experiments/taint-propagators',
                  'writing-rules/experiments/taint-labels',
                  'writing-rules/experiments/metavariable-analysis',
                  'writing-rules/experiments/multiple-focus-metavariables',
                  'writing-rules/experiments/display-propagated-metavariable',
                  'writing-rules/experiments/deprecated-experiments'
                ]
              },
            'playground',
            'trophy-case'
        ]
    },
    {
        type: 'category',
        label: 'Contributing',
        collapsible: false,
        items: [
            'contributing/contributing',
            'contributing/contributing-rules',
            'contributing/contributing-code',
            {
                type: 'doc',
                id: 'contributing/semgrep-core-contributing',
                label: 'semgrep-core contributing'
            },
            {
               type: 'doc',
               id: 'contributing/semgrep-contributing',
               label: 'semgrep contributing'
            },
            'contributing/adding-a-language',
            'contributing/updating-a-grammar',
            'contributing/troubleshooting',
        ]
    },
    {
        type: 'category',
        label: 'About Semgrep',
        collapsible: false,
        items: [
            'support',
            {type: 'ref', id: 'release-notes/introduction', label: 'Release notes'},
            'release-notes/rule-updates',
            'security',
            'faq',
            'metrics'
        ],
    },
  ],
  updatesSidebar: [
    // Link to docs home page
    {
        type: 'link',
        label: 'Docs home', // The link label
        href: '/', // The internal path
    },
    {
    type: 'category',
        label: 'Release notes',
        link: {type: 'doc', id: 'release-notes/introduction'},
        items: [
            'release-notes/october-2022',
            'release-notes/september-2022',
            'release-notes/august-2022',
            'release-notes/july-2022',
            'release-notes/june-2022',
            'release-notes/may-2022',
            'release-notes/april-2022',
            'release-notes/march-2022',
            'release-notes/february-2022',
            'release-notes/january-2022',
            'release-notes/december-2021',
            'release-notes/november-2021',
            'release-notes/october-2021',
            'release-notes/september-2021',
            'release-notes/august-2021',
            'release-notes/july-2021',
            'release-notes/june-2021',
            'release-notes/may-2021',
            'release-notes/april-2021',
            'release-notes/all-release-notes'
        ]
    },
    'release-notes/rule-updates'
],
};