import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import type {Props} from '@theme/Navbar/Search';

// Simple fallback search component for testing
const FallbackSearchBar: React.FC<{placeholder: string}> = ({placeholder}) => {
  return (
    <div style={{padding: '8px', border: '1px solid #ccc', borderRadius: '4px', minWidth: '200px'}}>
      <input 
        type="search" 
        placeholder={placeholder}
        disabled
        style={{
          width: '100%',
          border: 'none',
          outline: 'none',
          background: 'transparent'
        }}
      />
    </div>
  );
};

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
        enabled: true,
        placeholder: "🔍 Search docs... (Meilisearch Testing)"
      };
    } else if (isDevelopment) {
      // Development fallback
      return {
        enabled: true,
        placeholder: "🔍 Search docs... (Development)"
      };
    } else {
      // All other branches - disable Meilisearch
      return {
        enabled: false,
        placeholder: "🔍 Search docs... (Disabled)"
      };
    }
  };

  const config = getMeilisearchConfig();

  return (
    <div className={className}>
      <FallbackSearchBar placeholder={config.placeholder} />
    </div>
  );
}
