const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Semgrep',
  tagline: 'Lightweight static analysis for many languages. Find bug variants with patterns that look like source code.',
  url: 'https://semgrep.dev',
  baseUrl: '/docs/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'r2c', // Usually your GitHub org/user name.
  projectName: 'semgrep', // Usually your repo name.
  trailingSlash: true,
  themeConfig: {
    navbar: {
      logo: {
        alt: 'Semgrep logo',
        src: 'img/semgrep-icon-text-horizontal.svg',
        srcDark: 'img/semgrep-icon-text-horizontal-dark.svg',
        href: 'https://semgrep.dev',
        target: '_self'
      },
      items: [
        { to: 'https://semgrep.dev/explore', label: 'Registry', position: 'left', target: '_self' },
        { to: 'https://semgrep.dev/editor', label: 'Playground', position: 'left', target: '_self' },
        {
          type: 'dropdown',
          label: 'Products',
          position: 'left',
          items: [
            {
              label: 'Semgrep App',
              to: 'https://semgrep.dev/products/semgrep-app'
            },
            {
              label: 'Semgrep Supply Chain',
              to: 'https://semgrep.dev/products/semgrep-supply-chain'
            }
          ]
        },
        { to: 'https://semgrep.dev/pricing', label: 'Pricing', position: 'left', target: '_self' },
        { to: 'https://semgrep.dev/docs/', label: 'Docs', position: 'left', target: '_self' },
        { to: 'https://semgrep.dev/orgs/-/', label: 'Login', position: 'right', target: '_self' },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Community',
          items: [
            {
              label: 'Slack',
              href: 'https://r2c.dev/slack',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/returntocorp/semgrep'
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/r2cdev',
            },
          ],
        },
        {
          title: 'Learn',
          items: [
            {
              label: 'Docs',
              to: '/docs/',
              target: '_self'
            },
            {
              label: 'Examples',
              to: '/docs/writing-rules/rule-ideas/',
              target: '_self'
            },
            {
              label: 'Tour',
              to: 'https://semgrep.dev/learn',
              target: '_self'
            },
          ],
        },
        {
          title: 'Product',
          items: [
            {
              label: 'Privacy',
              to: 'https://semgrep.dev/privacy',
              target: '_self'
            },
            {
              label: 'Issues',
              href: 'https://github.com/returntocorp/semgrep/issues',
            },
            {
              label: 'Terms of service',
              to: 'https://semgrep.dev/terms',
              target: '_self'
            },
          ],
        },
        {
          title: 'About',
          items: [
            {
              label: 'r2c blog',
              href: 'https://r2c.dev/blog',
            },
            {
              label: 'About us',
              href: 'https://r2c.dev/team'
            },
            {
              label: 'Semgrep release updates',
              href: 'https://us18.campaign-archive.com/home/?u=ee2dc8f77e27d3739cf4df9ef&id=9b175e26fa'
            }
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} r2c. Built with Docusaurus.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
      additionalLanguages: ['java'],
    },
    algolia: {
      apiKey: 'f53612c29d04a2ff71dce6e3b2f76752',
      indexName: 'docs',

      // Optional: see doc section below
      contextualSearch: false,

      // Optional: see doc section below
      appId: 'RGEY1AKPUC',

      // Optional: Algolia search parameters
      searchParameters: {},
      facetFilters: [],
      //... other Algolia params
    },
    image: 'https://semgrep.dev/thumbnail.png',
  },
  scripts: [
    {
      src: 'https://kit.fontawesome.com/9a8c23ae22.js',
      crossorigin: 'anonymous',
      async: true
    },
    {
      src: 'https://semgrep.dev/docs/fs.js',
      async: true
    },
    {
      src: '/docs/js/gtm.js',
      async: true
    }
  ],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/returntocorp/semgrep-docs/edit/main',
          routeBasePath: '/'
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          // You can also use your "G-" Measurement ID here.
          trackingID: 'G-1851JH9FSR',
        },
      },
    ],
    [
      '@docusaurus/plugin-sitemap',
      {
        changefreq: 'weekly',
        priority: 0.5,
        trailingSlash: false,
      },
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          { from: "/writing-rules/pattern-logic", to: "/writing-rules/rule-syntax/" },
          { from: "/writing-rules/index", to: "/writing-rules/overview/" },
          { from: "/semgrep-ci/managing-policy", to: "/semgrep-app/rule-board/" },
          { from: "/managing-policy", to: "/semgrep-app/rule-board/" },
          { from: "/semgrep-app/managing-policy", to: "/semgrep-app/rule-board/" },
          { from: "/integrations", to: "/semgrep-app/notifications/" },
          { from: "/notifications", to: "/semgrep-app/notifications/" },
          { from: "/sso", to: "/semgrep-app/sso/" },
          { from: "/experiments", to: "/writing-rules/experiments/introduction/" },
          { from: "/upgrade", to: "/upgrading/" },
          { from: "/semgrep-ci", to: "/semgrep-ci/overview/" },
          { from: "/sample-ci-configs", to: "/semgrep-ci/sample-ci-configs/" },
          { from: "/status/", to: "/supported-languages/" },
          { from: "/language-support/", to: "/supported-languages/" },
          { from: "/ignoring-findings/", to: "/ignoring-files-folders-code/" },
          { from: "/experiments/join-mode/", to: "/writing-rules/experiments/join-mode/overview/" },
          { from: "/providers/", to: "/semgrep-ci/overview/" },
          { from: "/semgrep-app/role-based-access-control", to: "/semgrep-app/user-management/" },
          { from: "/cli-usage/", to: "/cli-reference/" },
          { from: "/writing-rules/data-flow", to: "/writing-rules/data-flow/data-flow-overview/" },
          { from: "/writing-rules/data-flow/overview/", to: "/writing-rules/data-flow/data-flow-overview/"},
          { from: "/release-notes/", to: "/release-notes/introduction/" },
          { from: "/rule-updates/", to: "/release-notes/rule-updates/" },
          { from: "/experiments/overview/", to: "/writing-rules/experiments/introduction/" },
          { from: "/experiments/generic-pattern-matching/", to: "/writing-rules/generic-pattern-matching/" },
          { from: "/experiments/join-mode/overview/", to: "/writing-rules/experiments/join-mode/overview/" },
          { from: "/experiments/join-mode/recursive-joins/", to: "/writing-rules/experiments/join-mode/recursive-joins/" },
          { from: "/experiments/extract-mode/", to: "/writing-rules/experiments/extract-mode/" },
          { from: "/experiments/r2c-internal-project-depends-on/", to: "/writing-rules/experiments/r2c-internal-project-depends-on/" },
          { from: "/experiments/symbolic-propagation/", to: "/writing-rules/experiments/symbolic-propagation/" },
          { from: "/experiments/taint-propagators/", to: "/writing-rules/data-flow/taint-mode/" },
          { from: "/writing-rules/experiments/taint-propagators/", to: "/writing-rules/data-flow/taint-mode/" },
          { from: "/experiments/taint-labels/", to: "/writing-rules/experiments/taint-labels/" },
          { from: "/experiments/metavariable-analysis/", to: "/writing-rules/metavariable-analysis/" },
          { from: "/experiments/multiple-focus-metavariables/", to: "/writing-rules/experiments/multiple-focus-metavariables/" },
          { from: "/experiments/display-propagated-metavariable/", to: "/writing-rules/experiments/display-propagated-metavariable/" },
          { from: "/experiments/deprecated-experiments/", to: "/writing-rules/experiments/deprecated-experiments/" },
          { from: "/semgrep-sc/supply-chain-supported-languages/", to: "/supported-languages/" },
          { from: "/writing-rules/experiments/autofix/", to: "/writing-rules/autofix/" },
          { from: "/writing-rules/experiments/generic-pattern-matching/", to: "/writing-rules/generic-pattern-matching/" },
          { from: "/writing-rules/experiments/metavariable-analysis/", to: "/writing-rules/metavariable-analysis/" }
        ]
      }
    ],
  ]
};
