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
  // Note that paths are not slugs
  kbSidebar: [
    'Docs home',
    {
      type: 'category',
      label: 'Knowledge base',
      collapsible: false,
      link: {
        type: 'generated-index',
        title: 'Knowledge base',
        description:
          "Choose a KB category to explore:",
        slug: '/kb',
        keywords: ['kb']
      },
      items: [
        {
          type: 'category',
          label: 'Semgrep Code',
          collapsible: true,
          link: {
            type: 'generated-index',
            slug: '/kb/semgrep-code'
          },
          items: [
            {
              type: 'autogenerated',
              dirName: 'kb/semgrep-code',
            },
          ]
        },
        {
          type: 'category',
          label: 'Semgrep Supply Chain (SSC)',
          collapsible: true,
          link: {
            type: 'generated-index',
            slug: '/kb/semgrep-supply-chain'
          },
          items: [
            {
              type: 'autogenerated',
              dirName: 'kb/semgrep-supply-chain',
            },
          ]
        },
        {
          type: 'category',
          label: 'Semgrep Cloud Platform (SCP)',
          collapsible: true,
          link: {
            type: 'generated-index',
            slug: '/kb/semgrep-cloud-platform'
          },
          items: [
            {
              type: 'autogenerated',
              dirName: 'kb/semgrep-cloud-platform',
            },
          ]
        },
        {
          type: 'category',
          label: 'Semgrep in CI',
          collapsible: true,
          link: {
            type: 'generated-index',
            slug: '/kb/semgrep-ci'
          },
          items: [
            {
              type: 'autogenerated',
              dirName: 'kb/semgrep-ci',
            },
          ]
        },
        {
          type: 'category',
          label: 'Integrations',
          collapsible: true,
          link: {
            type: 'generated-index',
            slug: '/kb/integrations'
          },
          items: [
            {
              type: 'autogenerated',
              dirName: 'kb/integrations',
            },
          ]
        },
        {
          type: 'category',
          label: 'Rules',
          collapsible: true,
          link: {
            type: 'generated-index',
            slug: '/kb/rules'
          },
          items: [
            {
              type: 'autogenerated',
              dirName: 'kb/rules',
            },
          ]
        },
      ]
    },
  ],

  tutorialSidebar: [
    'Docs home',
    {
      type: 'link',
      label: 'Knowledge base',
      href: '/kb',
    },
    {
        type: 'category',
        label: 'Getting started',
        collapsible: false,
        items: [
            'getting-started',
            'semgrep-code/getting-started',
            'semgrep-supply-chain/getting-started'
        ]
    },
    {
      type: 'category',
      label: 'Semgrep',
      collapsible: false,
      items: [
        'supported-languages',
            {
                type: 'category',
                label: 'Semgrep CLI',
                link: {
                    type: 'generated-index',
                    title: 'Semgrep command-line interface (CLI)',
                    description:
                      "Learn about the Semgrep open source command-line tool.",
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
                label: 'Semgrep in CI',
                link: {
                    type: 'generated-index',
                    title: 'Semgrep in continuous integration (CI)',
                    description:
                      "Learn how to use Semgrep in continuous integration (CI).",
                    keywords: ['CI']
                  },
                items: [
                    'semgrep-ci/overview',
                    'semgrep-ci/running-semgrep-ci-with-semgrep-cloud-platform',
                    'semgrep-ci/running-semgrep-ci-without-semgrep-cloud-platform',
                    'semgrep-ci/ci-environment-variables',
                    'semgrep-ci/configuring-blocking-and-errors-in-ci',
                    'semgrep-ci/sample-ci-configs',
                    'troubleshooting/semgrep-ci'
                ]
            },
        'ignoring-files-folders-code',
            {
              type: 'category',
              label: 'Extensions',
              collapsible: true,
              link: {
                type: 'doc',
                id: 'extensions/overview'
              },
              items: [
                'extensions/semgrep-vs-code',
                'extensions/semgrep-intellij'
              ]
            },
        {
            type: 'category',
            label: 'Writing custom rules',
            collapsible: true,
            link: {type: 'doc', id: 'writing-rules/overview'},
            items: [
                'writing-rules/pattern-examples',
                'writing-rules/pattern-syntax',
                'writing-rules/rule-ideas',
                'writing-rules/rule-syntax',
                'writing-rules/testing-rules',
                'writing-rules/private-rules',
                'writing-rules/autofix',
                'writing-rules/generic-pattern-matching',
                'writing-rules/metavariable-analysis',
                'troubleshooting/rules',
                {
                    type: 'category',
                    label: 'Experiments 🧪',
                    link: {type: 'doc', id: 'writing-rules/experiments/introduction'},
                    items: [
                      'writing-rules/experiments/aliengrep',
                      'writing-rules/experiments/display-propagated-metavariable',
                      'writing-rules/experiments/extract-mode',
                      { type: 'category',
                          label: 'Join mode',
                          link: {type: 'doc', id: 'writing-rules/experiments/join-mode/overview'},
                          items: [
                              'writing-rules/experiments/join-mode/recursive-joins'
                          ]
                      },
                      'writing-rules/experiments/multiple-focus-metavariables',
                      'writing-rules/experiments/project-depends-on',
                      'writing-rules/experiments/symbolic-propagation',
                      'writing-rules/experiments/taint-labels',
                      'writing-rules/experiments/metavariable-type',
                      'writing-rules/experiments/deprecated-experiments'
                    ]
                  },
                'playground',
                'trophy-case'
            ]
        },
        {
            type: 'category',
            label: 'Data-flow analysis',
            link: {type: 'doc', id: 'writing-rules/data-flow/data-flow-overview'},
            items: [
                'writing-rules/data-flow/constant-propagation',
                'writing-rules/data-flow/taint-mode',
                'writing-rules/data-flow/status'
            ]
        },
        {
            type: 'category',
            label: 'Cheat sheets',
            link: {
                type: 'generated-index',
                title: 'Cheat sheets',
                description:
                  "This category provides Semgrep cheat sheets that help you to prevent specific vulnerabilities.",
                keywords: ['cheat sheet']
              },
            items: [
                {
                    type: 'category',
                    label: 'Code injection',
                    link: {
                        type: 'generated-index',
                        title: 'Code injection',
                        description:
                          "Semgrep code injection prevention cheat sheets.",
                        keywords: ['code injection']
                      },
                    items: [
                        'cheat-sheets/java-code-injection',
                        'cheat-sheets/javascript-code-injection',
                        'cheat-sheets/python-code-injection',
                        'cheat-sheets/ruby-code-injection'
                    ]
                },
                {
                    type: 'category',
                    label: 'Command injection',
                    link: {
                        type: 'generated-index',
                        title: 'Command injection',
                        description:
                          "Semgrep command injection prevention cheat sheets.",
                        keywords: ['command injection']
                      },
                    items: [
                            'cheat-sheets/go-command-injection',
                            'cheat-sheets/java-command-injection',
                            'cheat-sheets/javascript-command-injection',
                            'cheat-sheets/python-command-injection',
                            'cheat-sheets/ruby-command-injection'
                        ]
                },
                {
                    type: 'category',
                    label: 'XSS',
                    link: {
                        type: 'generated-index',
                        title: 'XSS',
                        description:
                            "Semgrep XSS prevention cheat sheets.",
                        keywords: ['XSS']
                        },
                    items: [
                        'cheat-sheets/django-xss',
                        'cheat-sheets/express-xss',
                        'cheat-sheets/flask-xss',
                        'cheat-sheets/go-xss',
                        'cheat-sheets/java-jsp-xss',
                        'cheat-sheets/rails-xss'
                    ]
                },
                {
                    type: 'category',
                    label: 'XXE',
                    link: {
                        type: 'generated-index',
                        title: 'XXE',
                        description:
                            "Semgrep XXE prevention cheat sheets.",
                        keywords: ['XXE']
                        },
                    items: [
                        'cheat-sheets/java-xxe',
                    ]
                },
            ],
        },
        'pricing-and-billing'
      ]
    },
    {
      type: 'category',
      label: 'Semgrep Cloud Platform (SCP)',
      collapsible: false,
      items: [
        'semgrep-cloud-platform/getting-started',
        'semgrep-cloud-platform/dashboard',
        'semgrep-cloud-platform/sso',
        'semgrep-cloud-platform/user-management',
        'semgrep-cloud-platform/tags',
        'semgrep-cloud-platform/semgrep-api',
        'semgrep-cloud-platform/scm',
        'troubleshooting/semgrep-app',
        {
          type: 'category',
          label: 'Notifications',
          collapsible: true,
          link: {type: 'doc', id: 'semgrep-cloud-platform/notifications'},
          items: [
            'semgrep-cloud-platform/github-pr-comments',
            'semgrep-cloud-platform/gitlab-mr-comments',
            'semgrep-cloud-platform/bitbucket-pr-comments',
            'semgrep-cloud-platform/slack',
            'semgrep-cloud-platform/email',
            'semgrep-cloud-platform/webhooks'
          ]
        },
        {
          type: 'category',
          label: 'Ticketing',
          collapsible: true,
          link: {type: 'doc', id: 'semgrep-cloud-platform/ticketing'},
          items: [
            'semgrep-cloud-platform/asana',
            'semgrep-cloud-platform/jira',
            'semgrep-cloud-platform/linear'
          ]
        },
      ]
    },
    {
      type: 'category',
      label: 'Semgrep Code',
      collapsible: false,
      items: [
        'semgrep-code/overview',
        'semgrep-code/getting-started',
        {
          type: 'category',
          label: 'Semgrep Pro Engine',
          collapsible: true,
          link: {type: 'doc', id: 'semgrep-code/semgrep-pro-engine-intro'},
          items: [
            'semgrep-code/semgrep-pro-engine-examples',
            'semgrep-code/semgrep-pro-engine-data-flow'
          ]
        },
        'semgrep-code/pro-rules',
        'semgrep-code/demo-project',
        'semgrep-code/policies',
        'semgrep-code/findings',
        'semgrep-code/semgrep-assistant-code',
        'semgrep-code/editor',
        ]
    },
    {
      type: 'category',
      label: 'Semgrep Supply Chain (SSC)',
      collapsible: false,
      items: [
        'semgrep-supply-chain/overview',
        'semgrep-supply-chain/getting-started',
        {
          type: 'category',
          label: 'Infrastructure-specific configuration',
          collapsible: true,
          link: {type: 'doc', id: 'semgrep-supply-chain/setup-infrastructure'},
          items: [
          'semgrep-supply-chain/setup-maven',
          'semgrep-supply-chain/setup-jenkins-ui',
          ]
        },
        'semgrep-supply-chain/triage-remediation',
        'semgrep-supply-chain/ignoring-deps',
        'semgrep-supply-chain/notifications',
        'semgrep-supply-chain/dependency-search',
        'semgrep-supply-chain/license-compliance',
        'semgrep-supply-chain/sbom',
        'semgrep-supply-chain/glossary'
      ]
    },
    {
      type: 'category',
      label: 'Semgrep Secrets',
      collapsible: false,
      items: [
        'semgrep-secrets/conceptual-overview',
        'semgrep-secrets/getting-started'
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
            'licensing',
            'faq',
            'integrating',
            'usage-limits',
            'contributing/philosophy',
            {
              type: 'doc',
              id: 'metrics',
              label: 'Semgrep privacy policy'
            },
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
            'release-notes/latest',
            {
              type: 'category',
              label: '2023',
              collapsible: true,
                link: {
                    type: 'generated-index',
                    title: '2023 Release notes'
                },
              items: [
                'release-notes/october-2023',
                'release-notes/september-2023',
                'release-notes/august-2023',
                'release-notes/july-2023',
                'release-notes/june-2023',
                'release-notes/may-2023',
                'release-notes/april-2023',
                'release-notes/march-2023',
                'release-notes/february-2023',
                'release-notes/january-2023'
              ]
            },
            {
              type: 'category',
              label: '2022',
              collapsible: true,
                link: {
                    type: 'generated-index',
                    title: '2022 Release notes'
                },
              items: [
                'release-notes/december-2022',
                'release-notes/november-2022',
                'release-notes/october-2022',
                'release-notes/september-2022',
                'release-notes/august-2022',
                'release-notes/july-2022',
                'release-notes/june-2022',
                'release-notes/may-2022',
                'release-notes/april-2022',
                'release-notes/march-2022',
                'release-notes/february-2022',
                'release-notes/january-2022'
              ]
            },
              {
                type: 'category',
                label: '2021',
                collapsible: true,
                link: {
                    type: 'generated-index',
                    title: '2021 Release notes'
                },
                items: [
                  'release-notes/december-2021',
                  'release-notes/november-2021',
                  'release-notes/october-2021',
                  'release-notes/september-2021',
                  'release-notes/august-2021',
                  'release-notes/july-2021',
                  'release-notes/june-2021',
                  'release-notes/may-2021',
                  'release-notes/april-2021',
                ]
              },
            'release-notes/all-release-notes'
        ]
    },
    'release-notes/rule-updates'
],
};
