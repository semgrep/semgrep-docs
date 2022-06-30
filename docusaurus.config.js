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
        src: 'img/semgrep-logo-rainbow.svg',
        srcDark: 'img/semgrep-logo-rainbow.svg',
        href: 'https://semgrep.dev',
        target: '_self'
      },
      items: [
        { to: 'https://semgrep.dev/explore', label: 'Registry', position: 'left', target: '_self' },
        { to: 'https://semgrep.dev/editor', label: 'Playground', position: 'left', target: '_self' },
        { to: 'https://semgrep.dev/manage', label: 'App', position: 'left', target: '_self' },
        { to: 'https://semgrep.dev/pricing', label: 'Pricing', position: 'left', target: '_self' },
        { to: 'https://semgrep.dev/docs/', label: 'Docs', position: 'left', target: '_self' },
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
    announcementBar: {
      id: 'office-hours',
      content:
        'Semgrep Weekly Wednesday Office Hours! 🕙 Every Wednesday at 10am PT. <a target="_blank" rel="noopener noreferrer" href="https://get.semgrep.dev/officehours">Save your seat</a> to join us on July 20th!',
      backgroundColor: '#5F36D9',
      textColor: '#ffffff',
      isCloseable: false,
    },
  },
  scripts: [
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
          { from: "/experiments", to: "/experiments/overview/" },
          { from: "/upgrade", to: "/upgrading/" },
          { from: "/semgrep-ci", to: "/semgrep-ci/overview/" },
          { from: "/sample-ci-configs", to: "/semgrep-ci/sample-ci-configs/" },
          { from: "/status/", to: "/supported-languages/" },
          { from: "/language-support/", to: "/supported-languages/" },
          { from: "/ignoring-findings/", to: "/ignoring-files-folders-code/" },
          { from: "/experiments/join-mode/", to: "/experiments/join-mode/overview/" },
          { from: "/providers/", to: "/semgrep-ci/overview/" },
          { from: "/semgrep-app/role-based-access-control", to: "/semgrep-app/user-management/" },
          { from: "/cli-usage/", to: "/cli-reference/" }
        ]
      }
    ],
  ]
};
