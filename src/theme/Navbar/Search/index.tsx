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
  const [isFocused, setIsFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close search when clicking outside
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

  // Handle focus events
  const handleFocus = () => {
    setIsFocused(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleBlur = () => {
    // Delay blur to allow clicking on results
    setTimeout(() => {
      if (!searchContainerRef.current?.contains(document.activeElement)) {
        setIsFocused(false);
      }
    }, 150);
  };

  // Debounced search function
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

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

  // Handle input change with debouncing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    // Clear existing timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // If query is empty, clear results immediately
    if (!newQuery.trim()) {
      setResults([]);
      setIsOpen(false);
      setIsLoading(false);
      return;
    }

    // Set loading state immediately for better UX
    setIsLoading(true);

    // Debounce the search by 300ms
    const timeout = setTimeout(() => {
      handleSearch(newQuery);
    }, 300);

    setSearchTimeout(timeout);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTimeout]);

  const getDisplayTitle = (result: any) => {
    // Skip category/index pages that show "X docs tagged with Y"
    if (result.content?.includes('docs tagged with') || result.content?.includes('doc tagged with')) {
      return null; // Don't show these results
    }
    
    // Use hierarchy for better titles
    if (result.hierarchy?.lvl1) {
      return result.hierarchy.lvl1;
    }
    if (result.hierarchy?.lvl2) {
      return result.hierarchy.lvl2;
    }
    if (result.title) {
      return result.title;
    }
    
    // Fallback to content preview
    const content = result.content || result._formatted?.content || '';
    return content.substring(0, 60) + (content.length > 60 ? '...' : '');
  };

  const getDisplayContent = (result: any) => {
    // Skip category/index pages
    if (result.content?.includes('docs tagged with') || result.content?.includes('doc tagged with')) {
      return null;
    }
    
    // Use formatted content if available, otherwise use regular content
    const content = result._formatted?.content || result.content || '';
    
    // Clean up the content and limit length
    const cleanContent = content
      .replace(/<[^>]*>/g, '') // Remove HTML tags for preview
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
    
    return cleanContent.substring(0, 120) + (cleanContent.length > 120 ? '...' : '');
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
      <div 
        onClick={handleFocus}
        style={{
          display: 'flex',
          alignItems: 'center',
          border: isFocused ? '2px solid #007acc' : '1px solid #ccc',
          borderRadius: '4px',
          background: 'white',
          padding: isFocused ? '8px 12px' : '4px 8px',
          transition: 'all 0.2s ease',
          cursor: 'text',
          minWidth: isFocused ? '300px' : '200px',
          width: isFocused ? '100%' : 'auto',
          maxWidth: isFocused ? '500px' : '250px',
          boxShadow: isFocused ? '0 2px 8px rgba(0, 122, 204, 0.2)' : 'none'
        }}
      >
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          style={{
            border: 'none',
            outline: 'none',
            flex: 1,
            padding: '0',
            fontSize: isFocused ? '16px' : '14px',
            background: 'transparent',
            transition: 'font-size 0.2s ease'
          }}
        />
        {isLoading && <span style={{fontSize: '12px', color: '#666', marginLeft: '8px'}}>Loading...</span>}
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
          {results
            .filter(result => {
              // Filter out category/index pages
              const content = result.content || result._formatted?.content || '';
              return !content.includes('docs tagged with') && !content.includes('doc tagged with');
            })
            .slice(0, 8) // Limit to 8 results for better UX
            .map((result, index) => {
              const title = getDisplayTitle(result);
              const content = getDisplayContent(result);
              
              if (!title || !content) return null;
              
              return (
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
                    color: '#333',
                    fontSize: '14px'
                  }}>
                    {title}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#666',
                    lineHeight: '1.4'
                  }}>
                    {content}
                  </div>
                </div>
              );
            })}
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