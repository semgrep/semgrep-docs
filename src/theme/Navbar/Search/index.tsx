import React, {type ReactNode, useState, useEffect} from 'react';
import clsx from 'clsx';
import type {Props} from '@theme/Navbar/Search';
import {Markprompt} from '@markprompt/react';
import '@markprompt/css';

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
  const [suggestions, setSuggestions] = useState<string[]>([]);

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
                limit: 8,
                attributesToHighlight: ['title', 'content', 'hierarchy.lvl1', 'hierarchy.lvl2'],
                attributesToCrop: ['content:150'],
                cropLength: 150,
                showMatchesPosition: true,
                matchingStrategy: 'all',
                // hybrid: {
                //   semanticRatio: 0.7,
                //   embedder: "default"
                // }
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
                limit: 8,
                attributesToHighlight: ['title', 'content', 'hierarchy.lvl1', 'hierarchy.lvl2'],
                attributesToCrop: ['content:150'],
                cropLength: 150,
                showMatchesPosition: true,
                matchingStrategy: 'all',
                // hybrid: {
                //   semanticRatio: 0.7,
                //   embedder: "default"
                // }
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
    
    // Show suggestions for short queries
    if (value.length >= 2 && value.length < 4) {
      const commonTerms = [
        'custom rules', 'writing rules', 'ci integration', 'github actions',
        'autofix', 'playground', 'private rules', 'testing rules',
        'patterns', 'metavariables', 'taint analysis', 'guardrails',
        'secrets', 'supply chain', 'deployment', 'configuration'
      ];
      const filtered = commonTerms.filter(term => 
        term.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
    
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
              <div style={{fontWeight: 'bold', fontSize: '14px', marginBottom: '4px'}}>
                {result._formatted?.title || result.title || result.hierarchy?.lvl1 || 'Document'}
              </div>
              {result.hierarchy?.lvl1 && result.hierarchy.lvl1 !== result.title && (
                <div style={{fontSize: '11px', color: '#888', marginBottom: '2px'}}>
                  {result.hierarchy.lvl1}
                </div>
              )}
              <div style={{fontSize: '12px', color: '#666', lineHeight: '1.4'}}>
                {result._formatted?.content || result.content?.substring(0, 150)}
                {result.content && result.content.length > 150 && '...'}
              </div>
            </div>
          ))}
        </div>
      )}
      
          {isOpen && suggestions.length > 0 && query.length >= 2 && query.length < 4 && (
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
              maxHeight: '200px',
              overflowY: 'auto'
            }}>
              <div style={{padding: '8px 12px', fontSize: '12px', color: '#666', borderBottom: '1px solid #eee'}}>
                Suggestions:
              </div>
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setQuery(suggestion);
                    searchMeilisearch(suggestion);
                    setSuggestions([]);
                  }}
                  style={{
                    padding: '8px 12px',
                    cursor: 'pointer',
                    fontSize: '13px'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
          
          {isOpen && results.length === 0 && query && !isLoading && suggestions.length === 0 && (
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
        placeholder: "🔍 Search docs... (Full Documentation Indexed!)"
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
          <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
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
                      fontSize: '14px'
                    }}
                    title="Ask AI about Semgrep"
                  >
                    🤖 AI
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
        </div>
      );
}
