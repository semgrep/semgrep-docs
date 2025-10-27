import React from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useSidebarBreadcrumbs} from '@docusaurus/plugin-content-docs/client';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import {translate} from '@docusaurus/Translate';
import HomeBreadcrumbItem from '@theme/DocBreadcrumbs/Items/Home';
import styles from './styles.module.css';

function getSectionInfo(pathname: string) {
  if (pathname.startsWith('/docs/getting-started') || 
      pathname.startsWith('/docs/deployment') ||
      pathname.startsWith('/docs/semgrep-appsec-platform') ||
      pathname.startsWith('/docs/semgrep-assistant') ||
      pathname.startsWith('/docs/semgrep-ci') ||
      pathname.startsWith('/docs/semgrep-code') ||
      pathname.startsWith('/docs/semgrep-secrets') ||
      pathname.startsWith('/docs/semgrep-supply-chain') ||
      pathname.startsWith('/docs/secure-guardrails') ||
      pathname.startsWith('/docs/prerequisites') ||
      pathname.startsWith('/docs/supported-languages') ||
      pathname.startsWith('/docs/languages/') ||
      pathname.startsWith('/docs/extensions') ||
      pathname.startsWith('/docs/troubleshooting/semgrep')) {
    return { label: 'Scan', href: '/getting-started/quickstart' };
  }
  if (pathname.startsWith('/docs/writing-rules') || 
      pathname.startsWith('/docs/cheat-sheets') ||
      pathname.startsWith('/docs/semgrepignore-v2-reference') ||
      pathname.startsWith('/docs/troubleshooting/rules')) {
    return { label: 'Write rules', href: '/writing-rules/overview' };
  }
  if (pathname.startsWith('/docs/for-developers')) {
    return { label: 'For developers', href: '/for-developers/overview' };
  }
  if (pathname.startsWith('/docs/learn')) {
    return { label: 'Learning guides', href: '/learn' };
  }
  if (pathname.startsWith('/docs/kb')) {
    return { label: 'Knowledge base', href: '/kb' };
  }
  if (pathname.startsWith('/docs/faq') ||
      pathname.startsWith('/docs/semgrep-pro-vs-oss') ||
      pathname.startsWith('/docs/integrating') ||
      pathname.startsWith('/docs/run-a-successful-pov') ||
      pathname.startsWith('/docs/metrics')) {
    return { label: "What's Semgrep", href: '/faq/overview' };
  }
  if (pathname.startsWith('/docs/release-notes')) {
    return { label: 'Release notes', href: '/release-notes' };
  }
  if (pathname.startsWith('/docs/trophy-case') ||
      pathname.startsWith('/docs/support') ||
      pathname.startsWith('/docs/security') ||
      pathname.startsWith('/docs/licensing') ||
      pathname.startsWith('/docs/usage-and-billing') ||
      pathname.startsWith('/docs/contributing')) {
    return { label: 'Support & resources', href: '/trophy-case' };
  }
  return null;
}

function BreadcrumbsItem({
  children,
  href,
  isLast,
}: {
  children: React.ReactNode;
  href?: string;
  isLast?: boolean;
}): JSX.Element {
  const className = 'breadcrumbs__item';
  if (isLast) {
    return (
      <li
        className={clsx(className, styles.breadcrumbsItemLink, ThemeClassNames.docs.docBreadcrumbsItemLink, 'breadcrumbs__item--active')}
        itemProp="itemListElement"
        itemScope
        itemType="https://schema.org/ListItem">
        <span className="breadcrumbs__link" itemProp="name">
          {children}
        </span>
        <meta itemProp="position" content={String(1)} />
      </li>
    );
  }
  return (
    <li
      className={clsx(className, styles.breadcrumbsItemLink, ThemeClassNames.docs.docBreadcrumbsItemLink)}
      itemProp="itemListElement"
      itemScope
      itemType="https://schema.org/ListItem">
      <Link
        className="breadcrumbs__link"
        aria-label={translate({
          id: 'theme.docs.breadcrumbs.navAriaLabel',
          message: 'Breadcrumbs',
          description: 'The ARIA label for breadcrumbs',
        })}
        href={href}
        itemProp="item">
        <span itemProp="name">{children}</span>
      </Link>
      <meta itemProp="position" content={String(1)} />
    </li>
  );
}

export default function DocBreadcrumbs(): JSX.Element | null {
  const breadcrumbs = useSidebarBreadcrumbs();
  const location = useLocation();

  if (!breadcrumbs || breadcrumbs.length === 0) {
    return null;
  }

  const sectionInfo = getSectionInfo(location.pathname);
  
  const filteredBreadcrumbs = breadcrumbs.filter((item, idx) => {
    if (idx === 0 && sectionInfo) {
      return item.label.toLowerCase() !== sectionInfo.label.toLowerCase();
    }
    return true;
  });

  return (
    <nav
      className={clsx(
        ThemeClassNames.docs.docBreadcrumbs,
        styles.breadcrumbsContainer,
      )}
      aria-label={translate({
        id: 'theme.docs.breadcrumbs.navAriaLabel',
        message: 'Breadcrumbs',
        description: 'The ARIA label for breadcrumbs',
      })}>
      <ul
        className="breadcrumbs"
        itemScope
        itemType="https://schema.org/BreadcrumbList">
        <HomeBreadcrumbItem />
        {sectionInfo && (
          <BreadcrumbsItem href={sectionInfo.href}>
            {sectionInfo.label}
          </BreadcrumbsItem>
        )}
        {filteredBreadcrumbs.map((item, idx) => {
          const isLast = idx === filteredBreadcrumbs.length - 1;
          return (
            <BreadcrumbsItem
              key={idx}
              href={undefined}
              isLast={isLast}>
              {item.label}
            </BreadcrumbsItem>
          );
        })}
      </ul>
    </nav>
  );
}

