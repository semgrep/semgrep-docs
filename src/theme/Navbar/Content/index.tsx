import React from 'react';
import {useThemeConfig} from '@docusaurus/theme-common';
import {
  splitNavbarItems,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import NavbarItem from '@theme/NavbarItem';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import SearchBar from '@theme/SearchBar';
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';
import NavbarLogo from '@theme/Navbar/Logo';
import NavbarSearch from '@theme/Navbar/Search';
import { useLocation } from '@docusaurus/router';
import styles from './styles.module.css';

function useNavbarItems() {
  return useThemeConfig().navbar.items;
}

function NavbarItems({items}: {items: any[]}) {
  return (
    <>
      {items.map((item, i) => (
        <NavbarItem {...item} key={i} />
      ))}
    </>
  );
}

function NavbarContentLayout({
  left,
  right,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <div className="navbar__inner">
      <div className="navbar__items">{left}</div>
      <div className="navbar__items navbar__items--right">{right}</div>
    </div>
  );
}

export default function NavbarContent(): JSX.Element {
  const mobileSidebar = useNavbarMobileSidebar();
  const items = useNavbarItems();
  const location = useLocation();

  const getCurrentSection = () => {
    const path = location.pathname;
    // Check specific paths before general ones
    if (path.startsWith('/docs/deployment/claim-a-license')) {
      return 'explore';
    }
    if (path.startsWith('/docs/getting-started') || 
        path.startsWith('/docs/deployment') ||
        path.startsWith('/docs/semgrep-appsec-platform') ||
        path.startsWith('/docs/semgrep-assistant') ||
        path.startsWith('/docs/semgrep-ci') ||
        path.startsWith('/docs/semgrep-code') ||
        path.startsWith('/docs/semgrep-secrets') ||
        path.startsWith('/docs/semgrep-supply-chain') ||
        path.startsWith('/docs/secure-guardrails') ||
        path.startsWith('/docs/prerequisites') ||
        path.startsWith('/docs/supported-languages') ||
        path.startsWith('/docs/languages/') ||
        path.startsWith('/docs/extensions') ||
        path.startsWith('/docs/troubleshooting/semgrep')) {
      return 'scan';
    }
    if (path.startsWith('/docs/writing-rules') || 
        path.startsWith('/docs/cheat-sheets') ||
        path.startsWith('/docs/semgrepignore-v2-reference') ||
        path.startsWith('/docs/troubleshooting/rules')) {
      return 'write-rules';
    }
    if (path.startsWith('/docs/for-developers')) {
      return 'explore';
    }
    if (path.startsWith('/docs/learn')) {
      return 'learning-guides';
    }
    if (path.startsWith('/docs/kb') || path.startsWith('/docs/support')) {
      return 'help';
    }
    if (path.startsWith('/docs/faq') || 
        path.startsWith('/docs/semgrep-pro-vs-oss') ||
        path.startsWith('/docs/integrating') ||
        path.startsWith('/docs/run-a-successful-pov') ||
        path.startsWith('/docs/metrics')) {
      return 'explore';
    }
    if (path.startsWith('/docs/release-notes') ||
        path.startsWith('/docs/trophy-case') ||
        path.startsWith('/docs/security') ||
        path.startsWith('/docs/licensing') ||
        path.startsWith('/docs/usage-and-billing') ||
        path.startsWith('/docs/contributing')) {
      return 'explore';
    }
    return null;
  };

  const currentSection = getCurrentSection();

  const allDocSections = [
    { 
      label: 'Scan with Semgrep', 
      to: '/getting-started/quickstart', 
      pathPrefix: '/docs/getting-started', 
      position: 'left' as const,
      className: currentSection === 'scan' ? 'navbar__link--active' : ''
    },
    { 
      label: 'Write rules', 
      to: '/writing-rules/overview', 
      pathPrefix: '/docs/writing-rules', 
      position: 'left' as const,
      className: currentSection === 'write-rules' ? 'navbar__link--active' : ''
    },
    { 
      label: 'Learning guides', 
      to: '/learn', 
      pathPrefix: '/docs/learn', 
      position: 'left' as const,
      className: currentSection === 'learning-guides' ? 'navbar__link--active' : ''
    },
    { 
      label: 'API', 
      to: 'https://semgrep.dev/api/v1/docs', 
      position: 'left' as const,
      className: ''
    },
    { 
      label: 'Help', 
      pathPrefix: '/docs/kb', 
      position: 'left' as const,
      type: 'dropdown',
      className: currentSection === 'help' ? 'navbar__link--active' : '',
      items: [
        { label: 'Knowledge base', to: '/kb' },
        { label: 'Support', to: '/support' },
      ]
    },
    { 
      label: 'Explore', 
      pathPrefix: '/docs/trophy-case', 
      position: 'left' as const,
      type: 'dropdown',
      className: currentSection === 'explore' ? 'navbar__link--active' : '',
      items: [
        { label: "What's Semgrep", to: '/faq/overview' },
        { label: 'For developers', to: '/for-developers/overview' },
        { label: 'Release notes', to: '/release-notes' },
        { label: 'Support & resources', to: '/trophy-case' },
        { type: 'html', value: '<hr style="margin: 0.3rem 0;" />' },
        { label: 'Registry', to: 'https://semgrep.dev/explore', target: '_blank' },
        { label: 'Playground', to: 'https://semgrep.dev/editor', target: '_blank' },
        { label: 'Semgrep Academy', to: 'https://academy.semgrep.dev', target: '_blank' },
      ]
    },
  ];

  const docSectionPaths = [
    '/docs/deployment',
    '/docs/semgrep-appsec-platform',
    '/docs/semgrep-assistant',
    '/docs/semgrep-ce-languages',
    '/docs/semgrep-ci',
    '/docs/semgrep-code',
    '/docs/semgrep-pro-vs-oss',
    '/docs/semgrep-secrets',
    '/docs/semgrep-supply-chain',
    '/docs/semgrepignore-v2-reference',
    '/docs/cheat-sheets',
    '/docs/extensions',
    '/docs/languages',
    '/docs/secure-guardrails',
    '/docs/contributing',
    '/docs/troubleshooting',
    '/docs/faq',
    '/docs/release-notes',
  ];

  const isInDocsArea = location.pathname.startsWith('/docs');

  let itemsToShow = items;
  
  if (isInDocsArea) {
    const filteredDocSections = allDocSections;
    const rightItems = items.filter((item: any) => item.position === 'right');
    itemsToShow = [...filteredDocSections, ...rightItems];
  }

  const [leftItems, rightItems] = splitNavbarItems(itemsToShow);

  const searchBarItem = items.find((item: any) => item.type === 'search');

  return (
    <NavbarContentLayout
      left={
        <>
          {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
          <NavbarLogo />
          <NavbarItems items={leftItems} />
        </>
      }
      right={
        <>
          <NavbarItems items={rightItems} />
          <NavbarColorModeToggle className={styles.colorModeToggle} />
          {!searchBarItem && (
            <NavbarSearch>
              <SearchBar />
            </NavbarSearch>
          )}
        </>
      }
    />
  );
}

