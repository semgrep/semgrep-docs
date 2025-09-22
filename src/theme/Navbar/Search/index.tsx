import React, {type ReactNode, useState, useEffect, useRef} from 'react';
import type {Props} from '@theme/Navbar/Search';
import {Markprompt} from '@markprompt/react';
import '@markprompt/css';

// Simple working Meilisearch component
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
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = async (searchQuery: string) => {
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
            limit: 8,
            cropLength: 150,
            showMatchesPosition: true,
            matchingStrategy: 'all'
          }),
        });
      } else {
        // Use direct Meilisearch API
        response = await fetch(`${hostUrl}/indexes/${indexUid}/search`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            q: searchQuery,
            limit: 8,
            cropLength: 150,
            showMatchesPosition: true,
            matchingStrategy: 'all'
          }),
        });
      }

      if (response.ok) {
        const data = await response.json();
        setResults(data.hits || []);
        setIsOpen(true);
      } else {
        console.error('Search failed:', response.statusText);
        setResults([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResultClick = (result: any) => {
    setResults([]);
    setIsOpen(false);
    
    if (result.url) {
      // Convert live site URLs to current preview environment URLs
      const currentOrigin = window.location.origin;
      const liveUrl = result.url;
      
      // If it's a live semgrep.dev URL, convert it to the current preview environment
      if (liveUrl.includes('https://semgrep.dev/docs/')) {
        const path = liveUrl.replace('https://semgrep.dev', '');
        window.location.href = `${currentOrigin}${path}`;
      } else {
        // For other URLs, use as-is
        window.location.href = liveUrl;
      }
    }
  };

  return (
    <div ref={searchContainerRef} style={{ position: 'relative', width: '100%' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #ccc',
        borderRadius: '4px',
        background: 'white',
        padding: '4px 8px'
      }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch(query)}
          placeholder={placeholder}
          style={{
            border: 'none',
            outline: 'none',
            flex: 1,
            padding: '4px 8px',
            fontSize: '14px'
          }}
        />
        {isLoading && <span style={{fontSize: '12px', color: '#666'}}>Loading...</span>}
      </div>
      
      {isOpen && results.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'white',
          border: '1px solid #ccc',
          borderTop: 'none',
          borderRadius: '0 0 4px 4px',
          maxHeight: '400px',
          overflowY: 'auto',
          zIndex: 1000,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          {results.map((result, index) => (
            <div
              key={index}
              onClick={() => handleResultClick(result)}
              style={{
                padding: '12px',
                borderBottom: index < results.length - 1 ? '1px solid #eee' : 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
            >
              <div style={{
                fontWeight: 'bold',
                marginBottom: '4px',
                color: '#333'
              }}>
                {result.hierarchy?.lvl1 || result.title || 'Untitled'}
              </div>
              <div style={{
                fontSize: '12px',
                color: '#666',
                lineHeight: '1.4'
              }}
              dangerouslySetInnerHTML={{
                __html: result._formatted?.content || result.content?.substring(0, 120) + (result.content && result.content.length > 120 ? '...' : '')
              }}
              />
            </div>
          ))}
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
                            (window.location.hostname.includes('meilisearch-testing') ||
                             window.location.hostname.includes('deploy-preview')));
    
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
          "https://ms-0e8ae24505f7-30518.sfo.meilisearch.io", // Meilisearch Cloud
        apiKey: "", // No API key needed for Netlify function
        indexUid: "semgrep_docs", // Use same index name everywhere
        placeholder: "Search docs..."
      };
    } else {
      // All other branches - disable Meilisearch
      return {
        enabled: false,
        hostUrl: "",
        apiKey: "",
        indexUid: "",
        placeholder: "Search docs... (Disabled)"
      };
    }
  };

  const config = getMeilisearchConfig();

  if (!config.enabled) {
    return (
      <div className={className}>
        <input
          type="search"
          placeholder={config.placeholder}
          disabled
          style={{
            padding: '8px 12px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '14px',
            opacity: 0.6
          }}
        />
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
      <Markprompt
        projectKey="semgrep-docs"
        defaultView="chat"
        display="sheet"
        trigger={{
          element: (
            <button 
              style={{
                padding: '8px 12px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                background: 'white',
                cursor: 'pointer',
                fontSize: '14px',
                marginLeft: '8px'
              }}
              title="Ask AI about Semgrep"
            >
              AI
            </button>
          )
        }}
        search={{
          enabled: false // We'll use Meilisearch for search
        }}
        chat={{
          enabled: true,
          showRelatedQuestions: true,
          defaultView: {
            message: "Hello! I'm an AI assistant for Semgrep documentation. How can I help you?",
            prompts: [
              'What is Semgrep?',
              'How do I write custom rules?',
              'How do I set up CI/CD with Semgrep?',
              'What are secure guardrails?'
            ]
          }
        }}
        references={{
          getHref: (reference) => reference.file?.path || '#',
          getLabel: (reference) => reference.title || reference.file?.path || 'Document'
        }}
      />
    </div>
  );
}