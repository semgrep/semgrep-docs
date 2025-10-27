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
import type {Props} from '@theme/Navbar/Content';

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

  const allDocSections = [
    { label: 'Scan', to: '/getting-started/quickstart', pathPrefix: '/docs/getting-started', position: 'left' },
    { label: 'Write rules', to: '/writing-rules/overview', pathPrefix: '/docs/writing-rules', position: 'left' },
    { label: 'For developers', to: '/for-developers/overview', pathPrefix: '/docs/for-developers', position: 'left' },
    { label: 'Learning guides', to: '/learn', pathPrefix: '/docs/learn', position: 'left' },
    { label: 'Knowledge base', to: '/kb', pathPrefix: '/docs/kb', position: 'left' },
    { 
      label: 'Explore', 
      pathPrefix: '/docs/trophy-case', 
      position: 'left',
      type: 'dropdown',
      items: [
        { label: "What's Semgrep", to: '/faq/overview' },
        { label: 'Release notes', to: '/release-notes' },
        { label: 'Support & resources', to: '/trophy-case' },
        { type: 'html', value: '<hr style="margin: 0.3rem 0;" />' },
        { label: 'API', to: 'https://semgrep.dev/api/v1/docs', target: '_blank' },
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

