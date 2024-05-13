const lightCodeTheme = require('prism-react-renderer').themes.github;
const darkCodeTheme = require('prism-react-renderer').themes.dracula;

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Semgrep',
  tagline: 'Lightweight static analysis for many languages. Find bug variants with patterns that look like source code.',
  url: 'https://semgrep.dev',
  baseUrl: '/docs/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'semgrep', // Usually your GitHub org/user name.
  projectName: 'semgrep', // Usually your repo name.
  trailingSlash: false,
  themes: ['@markprompt/docusaurus-theme-search'],
  themeConfig: {
    markprompt: {
      projectKey: 'jbhF5LligltdKaJucMjDcWcRodaVpzqE',
      trigger: { floating: false },
      systemPrompt: 'You are a kind AI who loves to help people!',
      model: 'gpt-4',
      search: {
        enabled: true,
        provider: {
          name: 'algolia',
          apiKey: 'f53612c29d04a2ff71dce6e3b2f76752',
          appId: 'RGEY1AKPUC',
          indexName: 'docs',
        },
      },
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
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
            },
            {
              label: 'Semgrep Secrets',
              to: 'https://semgrep.dev/products/semgrep-secrets'
            }
          ]
        },
        { to: 'https://semgrep.dev/pricing', label: 'Pricing', position: 'left', target: '_self' },
        { to: 'https://semgrep.dev/docs/', label: 'Docs', position: 'left', target: '_self' },
        {to: 'kb', label: 'Knowledge base', position: 'left'},
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
              href: 'https://github.com/semgrep/semgrep'
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
              href: 'https://github.com/semgrep/semgrep/issues',
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
      additionalLanguages: ['java', 'ruby', 'php', 'csharp', 'rust', 'scala', 'kotlin', 'bash', 'json'],
    },
    //algolia: {
    //  apiKey: 'f53612c29d04a2ff71dce6e3b2f76752',
    //  indexName: 'docs',

    //  // Optional: see doc section below
    //  contextualSearch: false,

    //  // Optional: see doc section below
    //  appId: 'RGEY1AKPUC',

    //  // Optional: Algolia search parameters
    //  searchParameters: {},
    //  facetFilters: [],
    //  //... other Algolia params
    //  "customRanking": [
    //    "desc(weight.page_rank)"
    //  ],
    //  "ranking": [
    //    "desc(weight.page_rank)",
    //    "custom",
    //    "filters",
    //    "typo",
    //    "attribute",
    //    "words",
    //    "exact",
    //    "proximity"
    //  ]
    //},
    image: 'https://semgrep.dev/thumbnail.png',
    //announcementBar: {
    //  id: 'office-hours',
    //  content:
    //    'Group Office Hours | Meet community members and get support from our technical Customer Success Engineers.  <a target="_blank" rel="noopener noreferrer" href="https://get.semgrep.dev/Weekly-Group-Office-Hours.html">Book now</a>!',
    //  backgroundColor: '#00A67D',
    //  textColor: '#ffffff',
    //  isCloseable: false,
    //},
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
            'https://github.com/semgrep/semgrep-docs/edit/main',
          routeBasePath: '/'
        },
        theme: {
          customCss: require.resolve('./src/css/custom.scss'),
        },
        gtag: {
          // Updated 5 Mar to use GA4 tag
          trackingID: 'G-XYYV814DDN',
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
          { from: "/writing-rules/pattern-logic", to: "/writing-rules/rule-syntax" },
          { from: "/writing-rules/index", to: "/writing-rules/overview" },
          { from: "/semgrep-ci/managing-policy", to: "/semgrep-code/policies" },
          { from: "/managing-policy", to: "/semgrep-code/policies" },
          { from: "/semgrep-app/managing-policy", to: "/semgrep-code/policies" },
          { from: "/integrations", to: "/semgrep-appsec-platform/notifications" },
          { from: "/notifications", to: "/semgrep-appsec-platform/notifications" },
          { from: "/experiments", to: "/writing-rules/experiments/introduction" },
          { from: "/upgrade", to: "/update" },
          { from: "/semgrep-ci", to: "/deployment/core-deployment" },
          { from: "/sample-ci-configs", to: "/semgrep-ci/sample-ci-configs" },
          { from: "/status/", to: "/supported-languages" },
          { from: "/language-support/", to: "/supported-languages" },
          { from: "/ignoring-findings/", to: "/ignoring-files-folders-code" },
          { from: "/experiments/join-mode/", to: "/writing-rules/experiments/join-mode/overview" },
          { from: "/providers/", to: "/deployment/core-deployment" },
          { from: "/cli-usage/", to: "/cli-reference" },
          { from: "/writing-rules/data-flow", to: "/writing-rules/data-flow/data-flow-overview" },
          { from: "/writing-rules/data-flow/overview/", to: "/writing-rules/data-flow/data-flow-overview/"},
          { from: "/release-notes/", to: "/release-notes/introduction" },
          { from: "/rule-updates/", to: "/release-notes/rule-updates" },
          { from: "/experiments/overview/", to: "/writing-rules/experiments/introduction" },
          { from: "/experiments/generic-pattern-matching/", to: "/writing-rules/generic-pattern-matching" },
          { from: "/experiments/join-mode/overview/", to: "/writing-rules/experiments/join-mode/overview" },
          { from: "/experiments/join-mode/recursive-joins/", to: "/writing-rules/experiments/join-mode/recursive-joins" },
          { from: "/experiments/extract-mode/", to: "/writing-rules/experiments/extract-mode" },
          { from: "/experiments/r2c-internal-project-depends-on/", to: "/writing-rules/experiments/r2c-internal-project-depends-on" },
          { from: "/experiments/symbolic-propagation/", to: "/writing-rules/experiments/symbolic-propagation" },
          { from: "/experiments/taint-propagators/", to: "/writing-rules/data-flow/taint-mode" },
          { from: "/writing-rules/experiments/taint-propagators/", to: "/writing-rules/data-flow/taint-mode" },
          { from: "/experiments/taint-labels/", to: "/writing-rules/data-flow/taint-mode" },
          { from: "/experiments/metavariable-analysis/", to: "/writing-rules/metavariable-analysis" },
          { from: "/experiments/multiple-focus-metavariables/", to: "/writing-rules/experiments/multiple-focus-metavariables" },
          { from: "/experiments/display-propagated-metavariable/", to: "/writing-rules/experiments/display-propagated-metavariable" },
          { from: "/experiments/deprecated-experiments/", to: "/writing-rules/experiments/deprecated-experiments" },
          { from: "/semgrep-sc/supply-chain-supported-languages/", to: "/supported-languages" },
          { from: "/writing-rules/experiments/autofix/", to: "/writing-rules/autofix" },
          { from: "/writing-rules/experiments/generic-pattern-matching/", to: "/writing-rules/generic-pattern-matching" },
          { from: "/writing-rules/experiments/metavariable-analysis/", to: "/writing-rules/metavariable-analysis" },

          /* MAR 24 2023 POST LAUNCH REDIRECTS */

          // Deepsemgrep
          { from: "/deepsemgrep/"                         , to: "/semgrep-code/semgrep-pro-engine-intro" }     ,
          { from: "/deepsemgrep/deepsemgrep-introduction" , to: "/semgrep-code/semgrep-pro-engine-intro" }     ,
          { from: "/deepsemgrep/deepsemgrep-examples"     , to: "/semgrep-code/semgrep-pro-engine-examples" }  ,
          { from: "/deepsemgrep/semgrep-pro-data-flow"    , to: "/semgrep-code/semgrep-pro-engine-data-flow" } ,

          // Troubleshooting
          { from: "/troubleshooting/gitlab-sast/" , to: "/troubleshooting/semgrep-ci" } ,

          // Semgrep Assistant
          { from: "/semgrep-code/semgrep-assistant-code", to: "/semgrep-assistant/overview" }   ,

          // Semgrep Code
          { from: "/semgrep-app/integrations"                        , to: "/semgrep-appsec-platform/notifications" }   ,
          { from: "/semgrep-app/demo-project/"                       , to: "/deployment/core-deployment" }    ,
          { from: "/semgrep-app/rule-board/"                         , to: "/semgrep-code/policies" }      ,
          { from: "/semgrep-app/findings/"                           , to: "/semgrep-code/findings" }        ,
          { from: "/semgrep-app/editor/"                             , to: "/semgrep-code/editor" }          ,
          { from: "/semgrep-app/notifications/"                      , to: "/semgrep-appsec-platform/notifications" }   ,
          { from: "/semgrep-code/getting-started-with-semgrep-code/" , to: "/deployment/core-deployment" } ,

          //Semgrep Cloud Platform
          { from: "/semgrep-app/dashboard/"                        , to: "/semgrep-appsec-platform/dashboard" }           ,
          { from: "/semgrep-app/getting-started-with-semgrep-app/" , to: "/deployment/core-deployment" }     ,
          { from: "/semgrep-app/pricing-and-billing/"              , to: "/usage-and-billing" } ,
          { from: "/semgrep-app/scm/"                              , to: "/deployment/connect-scm" }                 ,
          { from: "/semgrep-app/semgrep-api/"                      , to: "/semgrep-appsec-platform/semgrep-api" }         ,
          { from: "/semgrep-app/tags/"                             , to: "/semgrep-appsec-platform/tags" }                ,

          //Semgrep Supply Chain
          { from: "/semgrep-sc/scanning-open-source-dependencies/"        , to: "/semgrep-supply-chain/getting-started" }                 ,
          { from: "/semgrep-sc/sc-glossary/"                              , to: "/semgrep-supply-chain/glossary" }                        ,
          { from: "/semgrep-sc/ignoring-lockfiles-dependencies/"          , to: "/semgrep-supply-chain/ignoring-lockfiles-dependencies" } ,
          { from: "/semgrep-sc/receiving-notifications-from-ssc/"         , to: "/semgrep-appsec-platform/github-pr-comments" }                   ,
          { from: "/semgrep-sc/semgrep-supply-chain-overview/"            , to: "/semgrep-supply-chain/overview" }                        ,
          { from: "/semgrep-sc/triaging-and-remediating-vulnerabilities/" , to: "/semgrep-supply-chain/triage-and-remediation" },

          /* APR 27 2023  */
          { from: "/semgrep-code/notifications/"            , to: "/semgrep-appsec-platform/notifications" }  ,
          { from: "/semgrep-ci/configuration-reference" , to: "/semgrep-ci/ci-environment-variables" },

          /* MAY 12 2023  */
          { from: "/semgrep-cloud-platform/pricing-and-billing/"            , to: "/usage-and-billing" },
          { from: "/extensions/"                                            , to: "/extensions/overview" },

          /* JULY 14 2023  */
          { from: "/semgrep-code/rule-board/"                                            , to: "/semgrep-code/policies" },

          /* AUG 31 2023  */
          { from: "/kb/semgrep-cloud-platform/running-semgrep-on-windows/" , to: "/kb/integrations/semgrep-vs-code-windows" },

          /* OCT 18 2023  */
          { from: "/kb/semgrep-ci/github-required-workflows-semgrep/" , to: "/kb/semgrep-ci/github-repository-rulesets-semgrep" },

          /* NOV 23 2023  */
          { from: "/getting-started/" , to: "/getting-started/quickstart" },
          /* JAN 20 2024  */
          { from: "/semgrep-app/role-based-access-control/", to: "/deployment/teams" },
          { from: "/semgrep-app/user-management/", to: "/deployment/teams" },
          { from: "/semgrep-cloud-platform/user-management/", to: "/deployment/teams" },
          { from: "/sso", to: "/deployment/sso" },
          { from: "/semgrep-cloud-platform/sso", to: "/deployment/sso" },
          { from: "/semgrep-app/sso/"                              , to: "/deployment/sso" },
          /* JAN 30 - FEB 20 2024  */
          { from: "/usage-limits/" , to: "/usage-and-billing" },
          { from: "/upgrading/" , to: "/update" },
          { from: "/semgrep-code/getting-started/" , to: "/deployment/core-deployment" },
          { from: "/semgrep-cloud-platform/getting-started/" , to: "/deployment/core-deployment" },
          { from: "/semgrep-cloud-platform/scm/" , to: "/deployment/connect-scm" },
          { from: "/managing-findings/" , to: "/semgrep-ci/findings-ci" },
          { from: "/semgrep-supply-chain/notifications/" , to: "/semgrep-appsec-platform/github-pr-comments" }, //we can't reference a category page fyi
          /* MAR 20, 2024  */
          { from: "/semgrep-ci/overview/" , to: "/deployment/add-semgrep-to-ci" } ,
          { from: "/semgrep-ci/running-semgrep-ci-with-semgrep-cloud-platform/" , to: "/deployment/core-deployment" } ,
          { from: "/semgrep-ci/running-semgrep-ci-without-semgrep-cloud-platform/" , to: "/deployment/oss-deployment" } ,
          { from: "/semgrep-code/demo-project" , to: "/deployment/core-deployment" },
          { from: "/semgrep-ci/running-semgrep-ci-with-semgrep-app/" , to: "/deployment/core-deployment" } ,
          { from: "/semgrep-ci/running-semgrep-ci-without-semgrep-app/" , to: "/deployment/oss-deployment" } ,
          /* APR  23, 2024  */
          { from: "/getting-started/" , to: "/getting-started/quickstart" } ,
          /* APR  23, 2024  */
          { from: "/playground/" , to: "/semgrep-code/editor" },
          { from: "/semgrep-cloud-platform/semgrep-api/" , to: "/semgrep-appsec-platform/semgrep-api" } ,
          /* APR 30, 2024 */
          { from: "/semgrep-cloud-platform/asana/" , to: "/semgrep-appsec-platform/asana" } ,
          { from: "/semgrep-cloud-platform/bitbucket-pr-comments/" , to: "/semgrep-appsec-platform/bitbucket-pr-comments" } ,
          { from: "/semgrep-cloud-platform/github-pr-comments/" , to: "/semgrep-appsec-platform/github-pr-comments" } ,
          { from: "/semgrep-cloud-platform/gitlab-mr-comments/" , to: "/semgrep-appsec-platform/gitlab-mr-comments" } ,
          { from: "/semgrep-cloud-platform/dashboard/" , to: "/semgrep-appsec-platform/dashboard" } ,
          { from: "/semgrep-cloud-platform/email-notifications/" , to: "/semgrep-appsec-platform/email-notifications" } ,
          { from: "/semgrep-cloud-platform/jira/" , to: "/semgrep-appsec-platform/jira" } ,
          { from: "/semgrep-cloud-platform/linear/" , to: "/semgrep-appsec-platform/linear" } ,
          { from: "/semgrep-cloud-platform/notifications/" , to: "/semgrep-appsec-platform/notifications" } ,
          { from: "/semgrep-cloud-platform/slack-notifications/" , to: "/semgrep-appsec-platform/slack-notifications" } ,
          { from: "/semgrep-cloud-platform/tags/" , to: "/semgrep-appsec-platform/tags" } ,
          { from: "/semgrep-cloud-platform/ticketing/" , to: "/semgrep-appsec-platform/ticketing" } ,
          { from: "/semgrep-cloud-platform/webhooks/" , to: "/semgrep-appsec-platform/webhooks" } ,
          /* MAY 7, 2024 */
          { from: "/kb/semgrep-secrets/secrets_pr_comments" , to: "/semgrep-secrets/policies" } ,
        ]
      }
    ],
  ]
};
