/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

- By default, Docusaurus generates a sidebar from the docs folder structure
mySidebar: [{ type: 'autogenerated', dirName: '.' }],
 */



module.exports = {
  // Note that paths are not slugs
  topLevelSidebar: [
    { type: 'doc', label: 'Docs home', id: 'Docs home', className: 'home-top-level' },
    { type: 'ref', id: 'getting-started/quickstart', label: 'Scan with Semgrep', className: 'top-category-separator'},
    { type: 'ref', id: 'writing-rules/overview', label: 'Write Semgrep rules', className: 'top-category'},
    { type: 'ref', id: 'for-developers/developer-overview', label: 'Semgrep for developers', className: 'top-category'},
    {
      type: 'link',
      label: 'Knowledge base',
      href: '/kb',
      className: 'top-category-separator'
    },
    { type: 'ref', id: 'cheat-sheets/java-code-injection', label: 'Cheat sheets for security issues', className: 'top-category'},
    { type: 'link', href: '/release-notes', label: 'Release notes', className: 'top-category'},
    { type: 'ref', id: 'faq/overview', label: 'About Semgrep', className: 'top-category' },
    { type: 'link', href: 'https://semgrep.dev/api/v1/docs/', label: 'API'},
  ],
  scanSidebar: [
    { type: 'doc', label: 'Docs home', id: 'Docs home', className: 'home-top-level' },
    {
        type: 'category',
        label: 'Get started',
        collapsible: false,
        items: [
            'getting-started/quickstart',
            'getting-started/quickstart-sms',
            'prerequisites',
            'getting-started/scm-support',
            {
                type: 'category',
                collapsible: true,
                label: 'Supported languages',
                link: {type: 'doc', id: 'supported-languages'},
                items: [
                    'languages/csharp',
                    'languages/go',
                    'languages/java',
                    'languages/javascript',
                    'languages/kotlin',
                    'languages/python',
                    'languages/ruby',
                    'languages/scala',
                    'languages/swift',
                ]
            },
            {
              type: 'category',
              label: 'Local and CLI scans',
              collapsible: true,
              link: {type: 'generated-index'},
              items: [
                'getting-started/cli',
                'running-rules',
                'update',
                'deployment/local-to-scp-scans',
                'troubleshooting/semgrep',
              ]
            },
        ]
    },
    {
      type: 'category',
      label: 'Set up and deploy scans',
      collapsible: false,
      items: [
        {
            type: 'category',
            collapsible: true,
            label: 'Core deployment',
            link: {type: 'doc', id: 'deployment/core-deployment'},
            items: [
                'deployment/deployment-checklist',
                'deployment/create-account-and-orgs',
                {
                    type: 'category',
                    collapsible: true,
                    label: 'Connect a source code manager',
                    link: {type: 'doc', id: 'deployment/connect-scm'},
                    items: [
                      'semgrep-appsec-platform/scm-code-access'
                    ]
                },
                /* 'semgrep-cloud-platform/scm', superseded by connect-scm */
                'deployment/sso',
                {
                    type: 'category',
                    collapsible: true,
                    label: 'Scan repositories with the AppSec Platform',
                    link: {type: 'generated-index'},
                    items: [
                        'deployment/add-semgrep-to-ci',
                        'deployment/add-semgrep-other-ci',
                        'deployment/customize-ci-jobs',
                        'semgrep-ci/configuring-blocking-and-errors-in-ci',
                        {
                          type: 'category',
                          label: 'Managed Scans (beta)',
                          collapsible: true,
                          link: {type: 'doc', id: 'deployment/managed-scanning/overview'},
                          items: [
                              'deployment/managed-scanning/azure',
                              'deployment/managed-scanning/bitbucket',
                              'deployment/managed-scanning/github',
                              'deployment/managed-scanning/gitlab'
                          ]
                      },
                        {
                            type: 'category',
                            label: 'Configuring SCA scans',
                            collapsible: true,
                            link: {type: 'doc', id: 'semgrep-supply-chain/setup-infrastructure'},
                            items: [
                                'semgrep-supply-chain/setup-maven',
                                'semgrep-supply-chain/setup-jenkins-ui'
                            ]
                        },
                        'deployment/manage-projects',
                        'deployment/primary-branch',
                        'troubleshooting/semgrep-app'
                    ]
                },
                {
                  type: 'category',
                  label: 'PR or MR comments',
                  collapsible: true,
                  link: {type: 'generated-index'},
                  items: [
                    'semgrep-appsec-platform/azure-pr-comments',
                    'semgrep-appsec-platform/github-pr-comments',
                    'semgrep-appsec-platform/gitlab-mr-comments',
                    {
                      type: 'category',
                      label: 'Bitbucket PR comments',
                      collapsible: true,
                      link: {type: 'generated-index'},
                      items: [
                        'semgrep-appsec-platform/bitbucket-cloud-pr-comments',
                        'semgrep-appsec-platform/bitbucket-data-center-pr-comments',
                      ]
                    }
                  ]
                },
                {
                  type: 'category',
                  collapsible: true,
                  label: 'Customize core deployment',
                  link: {type: 'doc', id: 'deployment/beyond-core-deployment'},
                  items: [
                      {
                        type: 'category',
                        label: 'Ignore files, folders, and code',
                        collapsible: true,
                        items: [
                          {
                            type: 'doc',
                            id: 'ignoring-files-folders-code',
                            label: 'Semgrep Code',
                          },
                          {
                            type: 'doc',
                            id: 'semgrep-supply-chain/ignoring-deps',
                            label: 'Semgrep Supply Chain',
                          },
                        ]
                      },
                      'semgrep-code/semgrep-pro-engine-intro',
                      'semgrep-code/policies',
                      'semgrep-supply-chain/license-compliance',
                      {
                        type: 'doc',
                        id: 'semgrep-assistant/getting-started', // document ID
                        label: 'Enable Assistant', // sidebar label
                      },
                      {
                        type: 'doc',
                        id: 'writing-rules/overview', // document ID
                        label: 'Write custom rules', // sidebar label
                      },
                  ]
                },
            ]
        },
        {
            type: 'category',
            collapsible: true,
            label: 'Deployment at scale',
            link: {type: 'generated-index'},
            items: [
                'deployment/teams',
                'semgrep-appsec-platform/tags',
                'semgrep-ci/network-broker'
            ]
        },
        {
          type: 'category',
          label: 'Secure guardrails',
          collapsible: true,
          link: {type: 'doc', id: 'secure-guardrails/overview'},
          items: [
            'secure-guardrails/secure-defaults',
            'secure-guardrails/custom-guardrails-rules'
          ]
        },
        {
          type: 'category',
          label: 'Notifications',
          collapsible: true,
          link: {type: 'doc', id: 'semgrep-appsec-platform/notifications'},
          items: [
            'semgrep-appsec-platform/slack',
            'semgrep-appsec-platform/email',
            'semgrep-appsec-platform/webhooks'
          ]
        },
        'semgrep-appsec-platform/dashboard',
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
            'extensions/semgrep-intellij',
            'extensions/pre-commit',
          ]
        },
        {
          type: 'category',
          label: 'Integrations',
          collapsible: true,
          items: [
            'mcp',
            'semgrep-appsec-platform/jira',
            'semgrep-appsec-platform/wiz'
          ]
        },
      ]
    },
    {
      type: 'category',
      label: 'Scan and triage',
      collapsible: false,
      items: [
        {
            type: 'category',
            collapsible: true,
            label: 'SAST (Code)',
            items: [
                'semgrep-code/overview',
                {
                    type: 'category',
                    collapsible: true,
                    label: 'View findings',
                    link: {type: 'doc', id: 'semgrep-code/findings',},
                    items: [
                      'semgrep-appsec-platform/details-page',
                    ]
                },
                'semgrep-code/policies',
                'semgrep-code/triage-remediation',
                'semgrep-code/semgrep-pro-engine-intro',
                'semgrep-code/semgrep-pro-engine-examples',
                'semgrep-code/remove-duplicates',
                'semgrep-code/editor',
                'semgrep-code/pro-rules',
                {
                    type: 'category',
                    label: 'Semgrep Community Edition',
                    collapsible: true,
                    items: [
                        'semgrep-ce-languages',
                        'deployment/oss-deployment',
                        'getting-started/cli-oss',
                        ]
                },
            ]
        },
        {
            type: 'category',
            collapsible: true,
            label: 'SCA (Supply Chain)',
            items: [
                'semgrep-supply-chain/overview',
                {
                  type: 'category',
                  collapsible: true,
                  label: 'Open source security vulnerabilities',
                  link: {
                    type: 'doc',
                    id: 'semgrep-supply-chain/getting-started',
                  },
                  items: [
                      'semgrep-supply-chain/view-export',
                      'semgrep-supply-chain/policies',
                      'semgrep-supply-chain/triage-remediation',
                      'semgrep-supply-chain/upgrade-guidance',
                      'semgrep-supply-chain/ignoring-deps',
                  ]
                },
                'semgrep-supply-chain/sbom',
                'semgrep-supply-chain/dependency-search',
                'semgrep-supply-chain/license-compliance',
                'semgrep-supply-chain/malicious-dependencies'
            ]
        },
        {
            type: 'category',
            collapsible: true,
            label: 'Secrets',
            items: [
                'semgrep-secrets/conceptual-overview',
                'semgrep-secrets/getting-started',
                'semgrep-secrets/historical-scanning',
                'semgrep-secrets/generic-secrets',
                'semgrep-secrets/view-triage',
                'semgrep-secrets/policies',
                'semgrep-secrets/rules',
                'semgrep-secrets/validators',
                'semgrep-secrets/glossary'
            ]
          },
        ]
      },
      {
        type: 'category',
        label: 'Semgrep Assistant',
        collapsible: false,
        items: [
          {
            type: 'category',
            label: 'Overview',
            collapsible: true,
            link: {
              type: 'doc',
              id: 'semgrep-assistant/overview'
            },
            items: [
              'semgrep-assistant/metrics',
              'semgrep-assistant/privacy'
            ]
          },
          {
            type: 'category',
            label: 'Getting started',
            collapsible: true,
            link: {
              type: 'doc',
              id: 'semgrep-assistant/getting-started'
            },
            items: [
              'semgrep-assistant/customize'
            ]
          },
          'semgrep-assistant/analyze'
          ]
      },
      {
      type: 'category',
      label: 'References',
      collapsible: false,
      items: [
        {
            type: 'category',
            label: 'CI references',
            collapsible: true,
            link: {type: 'generated-index'},
            items: [
                'semgrep-ci/ci-environment-variables',
                'semgrep-ci/sample-ci-configs',
                'semgrep-ci/findings-ci',
                'semgrep-ci/packages-in-semgrep-docker'
            ]
        },
       {
            type: 'category',
            label: 'Language-specific features',
            collapsible: true,
            link: {type: 'generated-index'},
            items: [
                'semgrep-code/java'
            ]
        },
        {
            type: 'category',
            label: 'Glossaries',
            collapsible: true,
            link: { type: 'generated-index'},
            items: [
                'semgrep-code/glossary',
                'semgrep-supply-chain/glossary'
            ]
        },
        {
            type: 'category',
            label: 'Experimental features',
            collapsible: true,
            link: {type: 'generated-index'},
            items: [
                'semgrepignore-v2-reference'
            ]
        },
        'cli-reference',
        'semgrep-appsec-platform/json-and-sarif'
      ]
    }
  ],
  rulewritingSidebar: [
        { type: 'doc', label: 'Docs home', id: 'Docs home', className: 'home-top-level' },
        {
            type: 'category',
            label: 'Write rules for Semgrep Code',
            collapsible: false,
            items: [
                'writing-rules/overview',
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
                      'writing-rules/experiments/pattern-syntax',
                      'writing-rules/experiments/aliengrep',
                      'writing-rules/experiments/display-propagated-metavariable',
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
                      'writing-rules/experiments/metavariable-type',
                      'writing-rules/experiments/deprecated-experiments'
                    ],
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
                'writing-rules/glossary'
            ]
        },
        {
          type: 'category',
          label: 'Write rules for Semgrep Secrets',
          collapsible: false,
          items: [
              'semgrep-secrets/rules',
              'semgrep-secrets/validators'
          ]
        }
  ],
  cheatsheetSidebar: [
    { type: 'doc', label: 'Docs home', id: 'Docs home', className: 'home-top-level' },
        {
            type: 'category',
            label: 'Cheat sheets',
            collapsible: false,
            //link: {
            //    type: 'generated-index',
            //    title: 'Cheat sheets',
            //    //description:
            //      //"This category provides Semgrep cheat sheets that help you to prevent specific vulnerabilities.",
            //    keywords: ['cheat sheet']
            //  },
            items: [
                'cheat-sheets/overview',
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
],
  aboutSidebar: [
    { type: 'doc', label: 'Docs home', id: 'Docs home', className: 'home-top-level' },
    {
        type: 'category',
        label: 'About Semgrep',
        collapsible: false,
        items: [
            'trophy-case',
            'support',
            'security',
            'licensing',
            'faq/overview',
            'integrating',
            'usage-and-billing',
            'deployment/claim-a-license',
            'contributing/philosophy',
            'semgrep-pro-vs-oss',
            'run-a-successful-pov',
            {
              type: 'category',
              label: 'Comparisons with other tools',
              collapsible: true,
              items: [
                  'faq/comparisons/codeql',
                  'faq/comparisons/endor-labs',
                  'faq/comparisons/opengrep',
                  'faq/comparisons/snyk',
                  'faq/comparisons/sonarqube',
                ]
            },
            {
              type: 'doc',
              id: 'metrics',
              label: 'Semgrep metrics'
            },
            {
              type: 'category',
              label: 'Contribute to Semgrep',
              collapsible: true,
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
            }
        ],
    },
  ],
  kbSidebar: [
    { type: 'doc', label: 'Docs home', id: 'Docs home', className: 'home-top-level' },
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
          label: 'Semgrep Assistant',
          collapsible: true,
          link: {
            type: 'generated-index',
            slug: '/kb/semgrep-assistant'
          },
          items: [
            {
              type: 'autogenerated',
              dirName: 'kb/semgrep-assistant',
            },
          ]
        },
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
          label: 'Semgrep AppSec Platform',
          collapsible: true,
          link: {
            type: 'generated-index',
            slug: '/kb/semgrep-appsec-platform'
          },
          items: [
            {
              type: 'autogenerated',
              dirName: 'kb/semgrep-appsec-platform',
            },
          ]
        },
        {
          type: 'category',
          label: 'Semgrep Secrets',
          collapsible: true,
          link: {
            type: 'generated-index',
            slug: '/kb/semgrep-secrets'
          },
          items: [
            {
              type: 'autogenerated',
              dirName: 'kb/semgrep-secrets',
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
  devSidebar: [
    { type: 'ref', label: 'Docs home', id: 'Docs home', className: 'home-top-level' },
    { type: 'doc', id: 'for-developers/developer-overview', label: 'Overview' },
    { type: 'doc', id: 'for-developers/developer-signin', label: 'Sign in to Semgrep' },
    {
        type: 'category',
        label: 'Resolve findings',
        collapsible: false,
        items: [
            'for-developers/resolve-findings-through-comments',
            'for-developers/resolve-findings-through-app',
        ],
    },
    {
        type: 'category',
        label: 'Run scans',
        collapsible: false,
        items: [
            'for-developers/developer-local-scans',
            'for-developers/ide',
        ],
    },
    {
        type: 'category',
        label: 'References',
        collapsible: false,
        items: [
            'for-developers/detection',
        ],
    },
  ],
};
