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
    docs: {
      sidebar: {
        hideable: true,
      },
    },
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
              label: 'Semgrep Code',
              to: 'https://semgrep.dev/products/semgrep-code/'
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
              href: 'https://go.semgrep.dev/slack',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/returntocorp/semgrep'
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/semgrep',
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
              label: 'Semgrep blog',
              href: 'https://semgrep.dev/blog/',
            },
            {
              label: 'About us',
              href: 'https://semgrep.dev/about'
            },
            {
              label: 'Semgrep release updates',
              href: 'https://twitter.com/semgrepreleases'
            }
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Semgrep, Inc. Semgrep®️  is a registered trademark of Semgrep, Inc. These docs are made with Docusaurus.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
      additionalLanguages: ['java', 'ruby', 'php', 'csharp', 'rust', 'scala'],
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
      "customRanking": [
        "desc(weight.page_rank)"
      ],
      "ranking": [
        "desc(weight.page_rank)",
        "custom",
        "filters",
        "typo",
        "attribute",
        "words",
        "exact",
        "proximity"
      ]
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
          customCss: require.resolve('./src/css/custom.scss'),
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
    'docusaurus-plugin-sass',
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          { from: "/writing-rules/pattern-logic", to: "/writing-rules/rule-syntax/" },
          { from: "/writing-rules/index", to: "/writing-rules/overview/" },
          { from: "/semgrep-ci/managing-policy", to: "/semgrep-code/rule-board/" },
          { from: "/managing-policy", to: "/semgrep-code/rule-board/" },
          { from: "/semgrep-app/managing-policy", to: "/semgrep-code/rule-board/" },
          { from: "/integrations", to: "/semgrep-cloud-platform/notifications/" },
          { from: "/notifications", to: "/semgrep-cloud-platform/notifications/" },
          { from: "/sso", to: "/semgrep-cloud-platform/sso/" },
          { from: "/experiments", to: "/writing-rules/experiments/introduction/" },
          { from: "/upgrade", to: "/upgrading/" },
          { from: "/semgrep-ci", to: "/semgrep-ci/overview/" },
          { from: "/sample-ci-configs", to: "/semgrep-ci/sample-ci-configs/" },
          { from: "/status/", to: "/supported-languages/" },
          { from: "/language-support/", to: "/supported-languages/" },
          { from: "/ignoring-findings/", to: "/ignoring-files-folders-code/" },
          { from: "/experiments/join-mode/", to: "/writing-rules/experiments/join-mode/overview/" },
          { from: "/providers/", to: "/semgrep-ci/overview/" },
          { from: "/semgrep-app/role-based-access-control", to: "/semgrep-cloud-platform/user-management/" },
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
          { from: "/writing-rules/experiments/metavariable-analysis/", to: "/writing-rules/metavariable-analysis/" },

          /* MAR 24 2023 POST LAUNCH REDIRECTS */

          // Deepsemgrep
          { from: "/deepsemgrep/"                         , to: "/semgrep-code/semgrep-pro-engine-intro/" }     ,
          { from: "/deepsemgrep/deepsemgrep-introduction" , to: "/semgrep-code/semgrep-pro-engine-intro/" }     ,
          { from: "/deepsemgrep/deepsemgrep-examples"     , to: "/semgrep-code/semgrep-pro-engine-examples/" }  ,
          { from: "/deepsemgrep/semgrep-pro-data-flow"    , to: "/semgrep-code/semgrep-pro-engine-data-flow/" } ,

          // Troubleshooting
          { from: "/troubleshooting/gitlab-sast/" , to: "/troubleshooting/semgrep-ci/" } ,

          // Semgrep CI
          { from: "/semgrep-ci/running-semgrep-ci-with-semgrep-app/" , to: "/semgrep-ci/running-semgrep-ci-with-semgrep-cloud-platform/" } ,
          { from: "/semgrep-ci/running-semgrep-ci-without-semgrep-app/" , to: "/semgrep-ci/running-semgrep-ci-with-semgrep-cloud-platform/" } ,

          // Semgrep Code
          { from: "/semgrep-app/integrations"                        , to: "/semgrep-cloud-platform/notifications/" }   ,
          { from: "/semgrep-app/demo-project/"                       , to: "/semgrep-code/demo-project/" }    ,
          { from: "/semgrep-app/rule-board/"                         , to: "/semgrep-code/rule-board/" }      ,
          { from: "/semgrep-app/findings/"                           , to: "/semgrep-code/findings/" }        ,
          { from: "/semgrep-app/editor/"                             , to: "/semgrep-code/editor/" }          ,
          { from: "/semgrep-app/notifications/"                      , to: "/semgrep-cloud-platform/notifications/" }   ,
          { from: "/semgrep-code/getting-started-with-semgrep-code/" , to: "/semgrep-code/getting-started/" } ,

          //Semgrep Cloud Platform
          { from: "/semgrep-app/dashboard/"                        , to: "/semgrep-cloud-platform/dashboard/" }           ,
          { from: "/semgrep-app/getting-started-with-semgrep-app/" , to: "/semgrep-cloud-platform/getting-started/" }     ,
          { from: "/semgrep-app/pricing-and-billing/"              , to: "/semgrep-cloud-platform/pricing-and-billing/" } ,
          { from: "/semgrep-app/scm/"                              , to: "/semgrep-cloud-platform/scm/" }                 ,
          { from: "/semgrep-app/semgrep-api/"                      , to: "/semgrep-cloud-platform/semgrep-api/" }         ,
          { from: "/semgrep-app/sso/"                              , to: "/semgrep-cloud-platform/sso/" }                 ,
          { from: "/semgrep-app/tags/"                             , to: "/semgrep-cloud-platform/tags/" }                ,
          { from: "/semgrep-app/user-management/"                  , to: "/semgrep-cloud-platform/user-management/" }     ,

          //Semgrep Supply Chain
          { from: "/semgrep-sc/scanning-open-source-dependencies/"        , to: "/semgrep-supply-chain/getting-started/" }                 ,
          { from: "/semgrep-sc/sc-glossary/"                              , to: "/semgrep-supply-chain/glossary/" }                        ,
          { from: "/semgrep-sc/ignoring-lockfiles-dependencies/"          , to: "/semgrep-supply-chain/ignoring-lockfiles-dependencies/" } ,
          { from: "/semgrep-sc/receiving-notifications-from-ssc/"         , to: "/semgrep-supply-chain/notifications/" }                   ,
          { from: "/semgrep-sc/semgrep-supply-chain-overview/"            , to: "/semgrep-supply-chain/overview/" }                        ,
          { from: "/semgrep-sc/triaging-and-remediating-vulnerabilities/" , to: "/semgrep-supply-chain/triage-and-remediation/" },

          /* APR 27 2023  */
          { from: "/semgrep-code/notifications/"            , to: "/semgrep-cloud-platform/notifications/" }  ,
          { from: "/semgrep-ci/configuration-reference" , to: "/semgrep-ci/ci-environment-variables/" }
        ]
      }
    ],
  ]
};
