import React from 'react';
import { useLocation } from '@docusaurus/router';
import Link from '@docusaurus/Link';
import styles from './DocSecondaryNav.module.css';
import { useDocsSidebar } from '@docusaurus/plugin-content-docs/client';

/**
 * Secondary navigation bar for docs sections
 * Shows contextual navigation based on which section the user is in
 */
export default function DocSecondaryNav(): JSX.Element | null {
  const sidebar = useDocsSidebar();
  const location = useLocation();
  
  // Don't render if we're not in a docs context
  if (!sidebar) {
    return null;
  }
  
  // Get the sidebar name from the sidebar object
  const sidebarName = sidebar.name;

  // Define all sections - these match "Browse other sections" in the sidebar
  const allSections = [
    { label: 'What\'s semgrep', to: '/faq/overview', sidebar: 'whatsSemgrepSidebar' },
    { label: 'Scan with Semgrep', to: '/getting-started/quickstart', sidebar: 'scanSidebar' },
    { label: 'Write Semgrep rules', to: '/writing-rules/overview', sidebar: 'rulewritingSidebar' },
    { label: 'Semgrep for developers', to: '/for-developers/overview', sidebar: 'devSidebar' },
    { label: 'Semgrep learning guides', to: '/learn', sidebar: 'learnSidebar' },
    { label: 'Knowledge base', to: '/kb', sidebar: 'kbSidebar' },
    { label: 'Release notes', to: '/release-notes', sidebar: null },
    { label: 'About Semgrep', to: '/trophy-case', sidebar: 'aboutSidebar' },
  ];

  // Filter out the current section to show only other sections
  const navItems = allSections.filter(section => section.sidebar !== sidebarName);

  // Don't show the nav on the top-level sidebar (docs home)
  if (sidebarName === 'topLevelSidebar' || !navItems.length) {
    return null;
  }

  return (
    <nav className={styles.docSecondaryNav}>
      <div className={styles.docSecondaryNavContainer}>
        <ul className={styles.docSecondaryNavList}>
          {navItems.map((item, index) => (
            <li key={index} className={styles.docSecondaryNavItem}>
              <Link to={item.to} className={styles.docSecondaryNavLink}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

