import React, {type ReactNode, useState, useEffect, useRef} from 'react';
import type {Props} from '@theme/Navbar/Search';

interface MeilisearchSearchBarProps {
  hostUrl: string;
  apiKey: string;
  indexUid: string;
  placeholder: string;
}

const MeilisearchSearchBar: React.FC<MeilisearchSearchBarProps> = ({
  hostUrl,
  apiKey,
  indexUid,
  placeholder
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
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
    setShowSuggestions(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleBlur = () => {
    // Delay blur to allow clicking on results
    setTimeout(() => {
      if (!searchContainerRef.current?.contains(document.activeElement)) {
        setIsFocused(false);
        setShowSuggestions(false);
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
            limit: 12,
            cropLength: 200,
            showMatchesPosition: true,
            matchingStrategy: 'all',
            attributesToRetrieve: ['*'],
            attributesToHighlight: ['content', 'hierarchy.lvl1', 'hierarchy.lvl2'],
            highlightPreTag: '<mark>',
            highlightPostTag: '</mark>',
            attributesToCrop: ['content']
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
            limit: 12,
            cropLength: 200,
            showMatchesPosition: true,
            matchingStrategy: 'all',
            attributesToRetrieve: ['*'],
            attributesToHighlight: ['content', 'hierarchy.lvl1', 'hierarchy.lvl2'],
            highlightPreTag: '<mark>',
            highlightPostTag: '</mark>',
            attributesToCrop: ['content']
          }),
        });
      }

      if (response.ok) {
        const data = await response.json();
        
        // Apply Semgrep-specific ranking to prioritize relevant content
        const rankedResults = (data.hits || []).map((result, index) => {
          const title = result.hierarchy?.lvl1 || result.hierarchy?.lvl2 || result.title || '';
          const content = result.content || result._formatted?.content || '';
          const url = result.url || '';
          
          // Calculate Semgrep-specific relevance score
          let relevanceScore = index;
          
          // Boost priority for important Semgrep content types
          if (title.toLowerCase().includes('getting started') || title.toLowerCase().includes('quickstart')) {
            relevanceScore -= 5; // Higher priority
          }
          
          if (title.toLowerCase().includes('tutorial') || title.toLowerCase().includes('guide')) {
            relevanceScore -= 3;
          }
          
          if (title.toLowerCase().includes('configuration') || title.toLowerCase().includes('setup')) {
            relevanceScore -= 2;
          }
          
          if (title.toLowerCase().includes('troubleshooting') || title.toLowerCase().includes('debug')) {
            relevanceScore -= 1;
          }
          
          // Boost for specific Semgrep products
          if (title.toLowerCase().includes('semgrep code') || title.toLowerCase().includes('semgrep pro')) {
            relevanceScore -= 2;
          }
          
          // Penalize tagged pages heavily
          const isTaggedPage = title.includes('tagged with') || content.includes('tagged with');
          if (isTaggedPage) {
            relevanceScore += 1000;
          }
          
          return {
            ...result,
            _semgrepRelevance: relevanceScore
          };
        }).sort((a, b) => a._semgrepRelevance - b._semgrepRelevance);
        
        setResults(rankedResults);
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
      // Preprocess query for better Semgrep documentation search
      const processedQuery = preprocessSemgrepQuery(newQuery);
      handleSearch(processedQuery);
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

  const getDisplayTitle = (result: any): string => {
    return result.hierarchy?.lvl1 || 
           result.hierarchy?.lvl2 || 
           result.title || 
           'Untitled';
  };

  const getDisplayContent = (result: any): string => {
    const content = result._formatted?.content || result.content || '';
    const cleanContent = content
      .replace(/\s+/g, ' ')
      .trim();
    
    return cleanContent.substring(0, 150) + (cleanContent.length > 150 ? '...' : '');
  };

  // Semgrep-specific query preprocessing for better search results
  const preprocessSemgrepQuery = (query: string): string => {
    let processedQuery = query.trim();
    
    // Handle common Semgrep abbreviations and terms
    const semgrepTerms = {
      'ci': 'continuous integration',
      'sast': 'static application security testing',
      'sca': 'supply chain analysis',
      'secrets': 'secret detection',
      'rules': 'custom rules',
      'patterns': 'rule patterns',
      'metavariables': 'metavariable',
      'autofix': 'automatic fix',
      'taint': 'taint analysis',
      'oss': 'open source',
      'pro': 'professional',
      'sms': 'managed scanning',
      'scp': 'cloud platform',
      'ssc': 'supply chain'
    };
    
    // Expand abbreviations
    Object.entries(semgrepTerms).forEach(([abbr, full]) => {
      const regex = new RegExp(`\\b${abbr}\\b`, 'gi');
      processedQuery = processedQuery.replace(regex, `${abbr} ${full}`);
    });
    
    // Handle common developer queries
    if (processedQuery.toLowerCase().includes('how to')) {
      processedQuery += ' tutorial guide';
    }
    
    if (processedQuery.toLowerCase().includes('setup') || processedQuery.toLowerCase().includes('install')) {
      processedQuery += ' configuration installation';
    }
    
    if (processedQuery.toLowerCase().includes('error') || processedQuery.toLowerCase().includes('issue')) {
      processedQuery += ' troubleshooting debug';
    }
    
    return processedQuery;
  };

  // Common Semgrep search suggestions
  const semgrepSuggestions = [
    'Getting started with Semgrep',
    'How to write custom rules',
    'CI/CD integration',
    'Semgrep Pro features',
    'Troubleshooting common issues',
    'Rule writing patterns',
    'Security scanning setup',
    'Supply chain analysis'
  ];

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
          <style>{`
            mark {
              background-color: #ffeb3b;
              color: #000;
              font-weight: bold;
              padding: 1px 2px;
              border-radius: 2px;
            }
            .search-suggestion {
              padding: 8px 12px;
              cursor: pointer;
              border-bottom: 1px solid #eee;
              color: #666;
              font-size: 12px;
            }
            .search-suggestion:hover {
              background-color: #f5f5f5;
            }
          `}</style>
          {query.trim() === '' && isFocused ? (
            <div>
              <div style={{ padding: '8px 12px', fontSize: '11px', color: '#999', borderBottom: '1px solid #eee' }}>
                Popular searches:
              </div>
              {semgrepSuggestions.slice(0, 6).map((suggestion, index) => (
                <div
                  key={index}
                  className="search-suggestion"
                  onClick={() => {
                    setQuery(suggestion);
                    handleSearch(suggestion);
                  }}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          ) : results
            .filter(result => {
              // Filter out tagged pages and category pages
              const title = result.hierarchy?.lvl1 || result.hierarchy?.lvl2 || result.title || '';
              const content = result.content || result._formatted?.content || '';
              
              // Skip results that look like category/tagged pages
              const isTaggedPage = title.includes('docs tagged with') || 
                                 title.includes('doc tagged with') ||
                                 title.includes('tagged with') ||
                                 content.includes('docs tagged with') ||
                                 content.includes('doc tagged with') ||
                                 content.includes('tagged with') ||
                                 title.includes('Choose a KB category') ||
                                 content.includes('Choose a KB category') ||
                                 title.match(/\d+\s+docs?\s+tagged\s+with/) ||
                                 content.match(/\d+\s+docs?\s+tagged\s+with/);
              
              return !isTaggedPage;
            })
            .map((result, index) => {
            const title = getDisplayTitle(result);
            const content = getDisplayContent(result);
              
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
                <div 
                  style={{
                    fontSize: '12px',
                    color: '#666',
                    lineHeight: '1.4'
                  }}
                  dangerouslySetInnerHTML={{ __html: content }}
                />
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

interface SearchConfig {
  enabled: boolean;
  hostUrl: string;
  apiKey: string;
  indexUid: string;
  placeholder: string;
}

const getMeilisearchConfig = (): SearchConfig => {
  if (typeof window === 'undefined') {
    return {
      enabled: false,
      hostUrl: "",
      apiKey: "",
      indexUid: "",
      placeholder: "Search docs... (Disabled)"
    };
  }

  const isNetlifyPreview = window.location.hostname.includes('deploy-preview');
  const isTestingBranch = window.location.hostname.includes('meilisearch-testing') || isNetlifyPreview;
  const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  
  if (isNetlifyPreview || isTestingBranch || isDevelopment) {
    const isNetlify = window.location.hostname.includes('netlify.app') || isNetlifyPreview;
    
    return {
      enabled: true,
      hostUrl: isNetlify ? 
        `${window.location.origin}/.netlify/functions/meilisearch` :
        "https://ms-0e8ae24505f7-30518.sfo.meilisearch.io",
      apiKey: "",
      indexUid: "semgrep_docs",
      placeholder: "Search docs..."
    };
  }
  
  return {
    enabled: false,
    hostUrl: "",
    apiKey: "",
    indexUid: "",
    placeholder: "Search docs..."
  };
};

export default function NavbarSearch({className}: Props): ReactNode {

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
    </div>
  );
}