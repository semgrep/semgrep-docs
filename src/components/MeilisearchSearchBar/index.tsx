import React, { useEffect, useRef, useState } from 'react';

interface MeilisearchSearchBarProps {
  hostUrl?: string;
  apiKey?: string;
  indexUid?: string;
  placeholder?: string;
  enableDarkMode?: boolean | 'auto';
  enhancedSearchInput?: boolean;
}

const MeilisearchSearchBar: React.FC<MeilisearchSearchBarProps> = ({
  hostUrl = 'http://localhost:7700',
  apiKey = '',
  indexUid = 'docs',
  placeholder = 'Search docs...',
  enableDarkMode = 'auto',
  enhancedSearchInput = true,
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Only run on client side
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !searchInputRef.current || typeof window === 'undefined') {
      return;
    }

    // Dynamic import to avoid SSR issues
    const initializeSearch = async () => {
      try {
        const docsSearchBar = (await import('docs-searchbar.js')).default;
        
        // Import CSS
        await import('docs-searchbar.js/dist/cdn/docs-searchbar.css');

        docsSearchBar({
          hostUrl,
          apiKey,
          indexUid,
          inputSelector: '#meilisearch-searchbar-input',
          enableDarkMode,
          enhancedSearchInput,
          debug: false, // Set to true to enable debug mode
          meilisearchOptions: {
            limit: 10,
          },
          handleSelected: (input, event, suggestion, datasetNumber, context) => {
            // Handle selection - navigate to the selected result
            if (suggestion?.url && typeof window !== 'undefined') {
              // For same-origin URLs, use client-side navigation
              if (suggestion.url.startsWith(window.location.origin)) {
                const path = suggestion.url.replace(window.location.origin, '');
                window.location.href = path;
              } else {
                window.location.href = suggestion.url;
              }
              input.setVal('');
            }
          },
        // Remove transformData since we've formatted the data correctly in Meilisearch
        });
      } catch (error) {
        console.error('Failed to initialize Meilisearch search:', error);
      }
    };

    initializeSearch();
  }, [isClient, hostUrl, apiKey, indexUid, enableDarkMode, enhancedSearchInput]);

  // Show a placeholder during SSR
  if (!isClient) {
    return (
      <div className="meilisearch-searchbar-container">
        <input
          type="search"
          placeholder={placeholder}
          className="navbar__search-input"
          style={{
            padding: '0.375rem 0.75rem',
            borderRadius: '0.375rem',
            border: '1px solid #ccc',
            minWidth: '200px',
          }}
          disabled
        />
      </div>
    );
  }

  return (
    <div className="meilisearch-searchbar-container">
      <input
        ref={searchInputRef}
        type="search"
        id="meilisearch-searchbar-input"
        placeholder={placeholder}
        className="navbar__search-input"
        style={{
          padding: '0.375rem 0.75rem',
          borderRadius: '0.375rem',
          border: '1px solid #ccc',
          minWidth: '200px',
        }}
      />
    </div>
  );
};

export default MeilisearchSearchBar;
