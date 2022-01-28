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
      label: 'Semgrep',
      items: [
        'getting-started',
        {
          type: 'category',
          label: 'Running rules',
          items: ['rules', 'running-rules', 'managing-findings'],
        },
        {
          type: 'category',
          label: 'Writing rules',
          items: [
            'writing-rules/overview',
            'writing-rules/pattern-examples',
            'writing-rules/pattern-syntax',
            'writing-rules/rule-ideas',
            'writing-rules/rule-syntax',
            { type: 'category',
              label: 'Data-flow analysis',
              items: ['writing-rules/data-flow/overview', 'writing-rules/data-flow/constant-propagation', 'writing-rules/data-flow/taint-mode', 'writing-rules/data-flow/status']
            },
            'writing-rules/testing-rules',
            'writing-rules/private-rules'
          ],
        },
        'cli-usage',
        'ignoring-files-folders-code',
        'extensions',
        'faq',
        'metrics',
        {
          type: 'category',
          label: 'Experiments 🧪',
          items: ['experiments/overview', 'experiments/generic-pattern-matching', 'experiments/join-mode', 'experiments/project-depends-on', 'experiments/symbolic-propagation']
        },
        'upgrading'
      ],
    },
    {
      type: 'category',
      label: 'Semgrep CI',
      items: ['semgrep-ci/overview', 'semgrep-ci/configuration-reference', 'semgrep-ci/sample-ci-configs'],
    },
    {
      type: 'category',
      label: 'Semgrep App',
      items: ['semgrep-app/rule-board', 'semgrep-app/managing-policy', 'semgrep-app/findings','semgrep-app/integrations', 'semgrep-app/notifications', 'semgrep-app/sso', 'semgrep-app/rbac', 'semgrep-app/pricing-and-billing'],
    },
    {
      type: 'category',
      label: 'Troubleshooting',
      items: ['troubleshooting/gitlab-sast', 'troubleshooting/rules', 'troubleshooting/semgrep-app', 'troubleshooting/semgrep'],
    },
    'language-support',
    'support',
    'trophy-case',
    {
        type: 'category',
        label: 'Contributing',
        items: [
          'contributing/contributing',
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
          'contributing/philosophy'
        ]
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
    'release-notes',
    'security'
  ],
};
