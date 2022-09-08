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
            'contributing/philosophy',
        ]
    },
    {
      type: 'category',
      label: 'Semgrep features',
      collapsible: false,
      items: [
        'supported-languages',
        {
            type: 'category',
            label: 'Scanning code with rules',
            items: [
                'running-rules',
                'managing-findings'
            ],
        },
        {
            type: 'category',
            label: 'Writing custom rules',
            items: [
                'writing-rules/overview',
                'writing-rules/pattern-examples',
                'writing-rules/pattern-syntax',
                'writing-rules/rule-ideas',
                'writing-rules/rule-syntax',
                'writing-rules/testing-rules',
                'writing-rules/private-rules',
                'troubleshooting/rules'
            ]
        },
        'ignoring-files-folders-code',
        'extensions',
        {
            type: 'category',
            label: 'Data-flow analysis',
            items: [
                'writing-rules/data-flow/overview',
                'writing-rules/data-flow/constant-propagation',
                'writing-rules/data-flow/taint-mode',
                'writing-rules/data-flow/status'
            ]
        },
        {
          type: 'category',
          label: 'Experiments 🧪',
          items: [
            'experiments/overview',
            'experiments/generic-pattern-matching',
            { type: 'category',
                label: 'Join mode',
                items: [
                    {
                        type: 'doc',
                        label: 'Overview',
                        id: 'experiments/join-mode/overview'
                    },
                    'experiments/join-mode/recursive-joins'
                ]
            },
            'experiments/extract-mode',
            'experiments/project-depends-on',
            'experiments/symbolic-propagation',
            'experiments/taint-propagators',
            'experiments/taint-labels',
            'experiments/metavariable-analysis'
          ]
        },
        'deepsemgrep',
      ],
    },
    {
        type: 'category',
        label: 'Using Semgrep',
        collapsible: false,
        items: [
            {
                type: 'category',
                label: 'Semgrep command-line interface (CLI)',
                items: [
                    'getting-started',
                    'cli-reference',
                    'upgrading',
                    'reporting-false-negatives',
                    'troubleshooting/semgrep'
                ]
            },
            {
                type: 'category',
                label: 'Semgrep in continuous integration (CI)',
                items: [
                    'semgrep-ci/overview',
                    'semgrep-ci/running-semgrep-ci-with-semgrep-app',
                    'semgrep-ci/running-semgrep-ci-without-semgrep-app',
                    'semgrep-ci/configuration-reference',
                    'semgrep-ci/sample-ci-configs',
                    'troubleshooting/gitlab-sast'
                ]
            },
            {
                label: 'Semgrep App',
                type: 'category',
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
                ],
            },
            {
                type: 'category',
                label: 'Cheat sheets',
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
            'semgrep-app/pricing-and-billing',
        ]
    },
    {
        type: 'category',
        label: 'Learn Semgrep',
        collapsible: false,
        items: [
            'playground',
            'trophy-case',
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
            'release-notes',
            'rule-updates',
            'security',
            'licensing',
            'faq',
            'metrics'
        ],
    },
  ],
};
