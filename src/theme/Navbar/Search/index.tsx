import React, {type ReactNode, useState, useEffect} from 'react';
import clsx from 'clsx';
import type {Props} from '@theme/Navbar/Search';

// Working Meilisearch component for testing
const MeilisearchSearchBar: React.FC<{
  hostUrl: string;
  apiKey: string;
  indexUid: string;
  placeholder: string;
}> = ({hostUrl, apiKey, indexUid, placeholder}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

      const searchMeilisearch = async (searchQuery: string) => {
        if (!searchQuery.trim()) {
          setResults([]);
          setIsOpen(false);
          return;
        }

        setIsLoading(true);
        try {
          // Check if we're using Netlify function or direct Meilisearch
          const isNetlifyFunction = hostUrl.includes('/.netlify/functions/');
          
          let response;
          if (isNetlifyFunction) {
            // Use Netlify function
            response = await fetch(hostUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                index: indexUid,
                q: searchQuery,
                limit: 5,
                attributesToHighlight: ['content', 'hierarchy.lvl1', 'hierarchy.lvl2'],
                attributesToCrop: ['content:100'],
                cropLength: 100,
              }),
            });
          } else {
            // Use direct Meilisearch API
            response = await fetch(`${hostUrl}/indexes/${indexUid}/search`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                ...(apiKey && { 'Authorization': `Bearer ${apiKey}` }),
              },
              body: JSON.stringify({
                q: searchQuery,
                limit: 5,
                attributesToHighlight: ['content', 'hierarchy.lvl1', 'hierarchy.lvl2'],
                attributesToCrop: ['content:100'],
                cropLength: 100,
              }),
            });
          }

          if (response.ok) {
            const data = await response.json();
            setResults(data.hits || []);
            setIsOpen(true);
          } else {
            console.error('Search failed:', response.status);
            setResults([]);
            setIsOpen(false);
          }
        } catch (error) {
          console.error('Search error:', error);
          setResults([]);
          setIsOpen(false);
        } finally {
          setIsLoading(false);
        }
      };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    // Debounce search
    const timeoutId = setTimeout(() => {
      searchMeilisearch(value);
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  const handleResultClick = (result: any) => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    
    if (result.url) {
      window.location.href = result.url;
    }
  };

  return (
    <div style={{position: 'relative', minWidth: '250px'}}>
      <div style={{padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}}>
        <input 
          type="search" 
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onFocus={() => query && setIsOpen(true)}
          style={{
            width: '100%',
            border: 'none',
            outline: 'none',
            background: 'transparent'
          }}
        />
        {isLoading && <span style={{float: 'right'}}>⏳</span>}
      </div>
      
      {isOpen && results.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'white',
          border: '1px solid #ccc',
          borderRadius: '4px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          zIndex: 1000,
          maxHeight: '300px',
          overflowY: 'auto'
        }}>
          {results.map((result, index) => (
            <div
              key={result.id || index}
              onClick={() => handleResultClick(result)}
              style={{
                padding: '8px 12px',
                borderBottom: '1px solid #eee',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
            >
              <div style={{fontWeight: 'bold', fontSize: '14px'}}>
                {result.hierarchy?.lvl1 || 'Document'}
              </div>
              <div style={{fontSize: '12px', color: '#666'}}>
                {result.content?.substring(0, 100)}...
              </div>
            </div>
          ))}
        </div>
      )}
      
      {isOpen && results.length === 0 && query && !isLoading && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'white',
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '8px 12px',
          zIndex: 1000
        }}>
          No results found for "{query}"
        </div>
      )}
    </div>
  );
};

export default function NavbarSearch({className}: Props): ReactNode {
  // Environment-based configuration
  const getMeilisearchConfig = () => {
    // Check if we're on a Netlify preview (testing branch)
    const isNetlifyPreview = (typeof window !== 'undefined' && 
                             window.location.hostname.includes('deploy-preview'));
    
    // Check if we're on the testing branch
    const isTestingBranch = (typeof window !== 'undefined' && 
                            window.location.hostname.includes('meilisearch-testing'));
    
    // Check if we're in development
    const isDevelopment = typeof window !== 'undefined' && 
                         (window.location.hostname === 'localhost' || 
                          window.location.hostname === '127.0.0.1');
    
    if (isNetlifyPreview || isTestingBranch || isDevelopment) {
      // Enable Meilisearch on testing branches and previews
      const isNetlify = typeof window !== 'undefined' && 
                       (window.location.hostname.includes('netlify.app') || 
                        window.location.hostname.includes('deploy-preview'));
      
      return {
        enabled: true,
        hostUrl: isNetlify ? 
          `${window.location.origin}/.netlify/functions/meilisearch` : // Netlify function
          "http://localhost:7700", // Local Meilisearch
        apiKey: "", // No API key needed
        indexUid: isNetlify ? "semgrep_docs" : "docs", // Different index names
        placeholder: "🔍 Search Semgrep docs... (Meilisearch powered!)"
      };
    } else {
      // All other branches - disable Meilisearch
      return {
        enabled: false,
        hostUrl: "",
        apiKey: "",
        indexUid: "",
        placeholder: "🔍 Search docs... (Disabled)"
      };
    }
  };

  const config = getMeilisearchConfig();

  if (!config.enabled) {
    return (
      <div className={className}>
        <div style={{padding: '8px', border: '1px solid #ccc', borderRadius: '4px', minWidth: '200px'}}>
          <input 
            type="search" 
            placeholder={config.placeholder}
            disabled
            style={{
              width: '100%',
              border: 'none',
              outline: 'none',
              background: 'transparent'
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <MeilisearchSearchBar 
        hostUrl={config.hostUrl}
        apiKey={config.apiKey}
        indexUid={config.indexUid}
        placeholder={config.placeholder}
      />
    </div>
  );
}
