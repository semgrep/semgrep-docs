import React, {type ReactNode, useState, useEffect, useRef} from 'react';
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
  const [isFocused, setIsFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
                hybrid: {
                  semanticRatio: 0.7,
                  embedder: "default"
                }
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
                hybrid: {
                  semanticRatio: 0.7,
                  embedder: "default"
                }
              }),
            });
          }

          if (response.ok) {
            const data = await response.json();
            setResults(data.hits || []);
            setIsOpen(true);
          } else {
            // Search failed - silently handle error
            setResults([]);
            setIsOpen(false);
          }
        } catch (error) {
          // Search error - silently handle error
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
    setIsFocused(false);
    
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
    <div ref={searchContainerRef} style={{position: 'relative', minWidth: isFocused ? '400px' : '250px', transition: 'min-width 0.3s ease'}}>
      <div style={{
        padding: '8px', 
        border: `1px solid ${isFocused ? '#007bff' : '#ccc'}`, 
        borderRadius: '4px',
        background: isFocused ? '#fff' : '#f8f9fa',
        transition: 'all 0.3s ease',
        boxShadow: isFocused ? '0 2px 8px rgba(0,123,255,0.15)' : 'none'
      }}>
        <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
          {/* Graph/Chart Icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{color: '#666'}}>
            <path d="M3 3v18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <input 
            type="search" 
            placeholder={placeholder}
            value={query}
            onChange={handleInputChange}
            onFocus={() => {
              setIsFocused(true);
              if (query) setIsOpen(true);
            }}
            onBlur={() => {
              // Delay to allow clicking on results
              setTimeout(() => setIsFocused(false), 200);
            }}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: isFocused ? '16px' : '14px',
              transition: 'font-size 0.3s ease'
            }}
          />
          {/* Brain/AI Icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{color: '#666'}}>
            <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1 .34-4.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0-.34-4.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" stroke="currentColor" strokeWidth="2"/>
          </svg>
          {isLoading && <span style={{fontSize: '16px'}}>⏳</span>}
        </div>
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
          maxHeight: '400px',
          overflowY: 'auto'
        }}>
          {/* Search Header */}
          <div style={{
            padding: '8px 12px',
            borderBottom: '1px solid #eee',
            background: '#f8f9fa'
          }}>
            <div style={{fontSize: '12px', color: '#666', marginBottom: '2px'}}>
              {query}
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '11px',
              color: '#888'
            }}>
              <span>Hybrid Search</span>
              <span>{results.length} results</span>
            </div>
          </div>
          
          {results.map((result, index) => (
            <div
              key={result.id || index}
              onClick={() => handleResultClick(result)}
              style={{
                padding: '12px',
                borderBottom: '1px solid #eee',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
            >
              {/* Main Title */}
              <div 
                style={{
                  fontWeight: 'bold', 
                  fontSize: '14px', 
                  marginBottom: '4px',
                  lineHeight: '1.3'
                }}
                dangerouslySetInnerHTML={{
                  __html: result._formatted?.title || result.title || result.hierarchy?.lvl1 || 'Document'
                }}
              />
              
              {/* Breadcrumb/Category */}
              {result.hierarchy?.lvl2 && (
                <div style={{
                  fontSize: '11px', 
                  color: '#888', 
                  marginBottom: '6px',
                  fontWeight: '500'
                }}>
                  {result.hierarchy.lvl2}
                </div>
              )}
              
              {/* Description */}
              <div 
                style={{
                  fontSize: '12px', 
                  color: '#666', 
                  lineHeight: '1.4',
                  marginBottom: '8px'
                }}
                dangerouslySetInnerHTML={{
                  __html: result._formatted?.content || result.content?.substring(0, 120) + (result.content && result.content.length > 120 ? '...' : '')
                }}
              />
              
              {/* Visual Bar Chart - Hybrid Search Scores */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{
                  width: '40px',
                  height: '4px',
                  background: '#e9ecef',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  display: 'flex'
                }}>
                  <div style={{
                    width: '30%', // Keyword relevance (30% of hybrid search)
                    height: '100%',
                    background: '#28a745' // Green for keyword relevance
                  }}></div>
                </div>
                <span style={{fontSize: '10px', color: '#666'}}>30%</span>
                
                <div style={{
                  width: '40px',
                  height: '4px',
                  background: '#e9ecef',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  display: 'flex'
                }}>
                  <div style={{
                    width: '70%', // Semantic relevance (70% of hybrid search)
                    height: '100%',
                    background: '#007bff' // Blue for semantic relevance
                  }}></div>
                </div>
                <span style={{fontSize: '10px', color: '#666'}}>70%</span>
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
    </div>
  );
}
