const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Semgrep',
  tagline: 'Lightweight static analysis for many languages. Find bug variants with patterns that look like source code.',
  url: 'https://semgrep.dev/',
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
      },
      items: [
        { to: '/explore', label: 'Rules', position: 'left' },
        { to: '/editor', label: 'Playground', position: 'left' },
        { to: '/manage', label: 'Dashboard', position: 'left' },
        { to: '/docs', label: 'Docs', position: 'left' },
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
            },
            {
              label: 'Examples',
              to: '/docs/writing-rules/rule-ideas/',
            },
            {
              label: 'Tour',
              to: '/learn',
            },
          ],
        },
        {
          title: 'Product',
          items: [
            {
              label: 'Privacy',
              to: '/privacy',
            },
            {
              label: 'Issues',
              href: 'https://github.com/returntocorp/semgrep/issues',
            },
            {
              label: 'Terms of service',
              to: '/terms',
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
      facetFilters: []
      //... other Algolia params
    },
    gtag: {
      // You can also use your "G-" Measurement ID here.
      trackingID: 'G-1851JH9FSR',
    },
  },
  scripts: [
    {
      src: '/fs.js',
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
          { from: "/semgrep-ci/managing-policy", to: "/semgrep-app/managing-policy/" },
          { from: "/managing-policy", to: "/semgrep-app/managing-policy/" },
          { from: "/integrations", to: "/semgrep-app/notifications/" },
          { from: "/notifications", to: "/semgrep-app/notifications/" },
          { from: "/experiments", to: "/experiments/overview/" },
          { from: "/semgrep-ci", to: "/semgrep-ci/overview/" },
          { from: "/sample-ci-configs", to: "/semgrep-ci/sample-ci-configs/" },
        ]
      }
    ],
  ]
};
