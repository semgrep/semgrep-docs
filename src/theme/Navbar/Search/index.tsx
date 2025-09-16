import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import type {Props} from '@theme/Navbar/Search';
import SemanticSearchBar from '@site/src/components/SemanticSearchBar';

import styles from './styles.module.css';

export default function NavbarSearch({className}: Props): ReactNode {
  // Environment-based configuration
  const getMeilisearchConfig = () => {
    // Check if we're on the testing branch
    const isTestingBranch = (typeof window !== 'undefined' && 
                            window.location.hostname.includes('meilisearch-testing'));
    
    // Check if we're in development
    const isDevelopment = typeof window !== 'undefined' && 
                         (window.location.hostname === 'localhost' || 
                          window.location.hostname === '127.0.0.1');
    
    if (isTestingBranch) {
      // Only enable Meilisearch on the testing branch
      return {
        hostUrl: "http://localhost:7700",
        apiKey: "",
        indexUid: "docs_testing"
      };
    } else if (isDevelopment) {
      // Development fallback
      return {
        hostUrl: "http://localhost:7700",
        apiKey: "",
        indexUid: "docs"
      };
    } else {
      // All other branches - disable Meilisearch
      return {
        hostUrl: "",
        apiKey: "",
        indexUid: ""
      };
    }
  };

  const config = getMeilisearchConfig();

  return (
    <div className={clsx(className, styles.navbarSearchContainer)}>
      <SemanticSearchBar 
        hostUrl={config.hostUrl}
        apiKey={config.apiKey}
        indexUid={config.indexUid}
        placeholder="🔍 Search docs..."
        hybridSearch={false}
        semanticWeight={0.7}
      />
    </div>
  );
}
