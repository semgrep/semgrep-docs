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
            attributesToHighlight: ['content', 'hierarchy.lvl1', 'hierarchy.lvl2', 'hierarchy.lvl3'],
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
            attributesToHighlight: ['content', 'hierarchy.lvl1', 'hierarchy.lvl2', 'hierarchy.lvl3'],
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

  // Enhanced highlighting function for better keyword visibility
  const enhanceHighlighting = (content: string, searchQuery: string): string => {
    if (!searchQuery || !content) return content;
    
    // Split search query into individual terms
    const searchTerms = searchQuery.toLowerCase().split(/\s+/).filter(term => term.length > 2);
    
    let highlightedContent = content;
    
    // Highlight each search term with case-insensitive matching
    searchTerms.forEach(term => {
      const regex = new RegExp(`(${term})`, 'gi');
      highlightedContent = highlightedContent.replace(regex, '<mark>$1</mark>');
    });
    
    return highlightedContent;
  };

  const getSectionInfo = (result: any): string => {
    const hierarchy = result.hierarchy || {};
    const url = result.url || '';
    
    // Extract section from hierarchy
    if (hierarchy.lvl0) {
      return hierarchy.lvl0;
    }
    
    // Extract section from URL
    if (url.includes('/docs/')) {
      const pathParts = url.split('/docs/')[1]?.split('/');
      if (pathParts && pathParts.length > 0) {
        const section = pathParts[0];
        // Map common sections to readable names
        const sectionMap: { [key: string]: string } = {
          'getting-started': 'Getting Started',
          'writing-rules': 'Rule Writing',
          'semgrep-ci': 'CI/CD',
          'semgrep-code': 'Semgrep Code',
          'semgrep-pro': 'Semgrep Pro',
          'semgrep-secrets': 'Secrets Detection',
          'semgrep-supply-chain': 'Supply Chain',
          'semgrep-appsec-platform': 'AppSec Platform',
          'deployment': 'Deployment',
          'troubleshooting': 'Troubleshooting',
          'faq': 'FAQ',
          'kb': 'Knowledge Base',
          'release-notes': 'Release Notes'
        };
        
        return sectionMap[section] || section.charAt(0).toUpperCase() + section.slice(1).replace(/-/g, ' ');
      }
    }
    
    return 'Documentation';
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
    <>
      {/* Background blur overlay when search is focused */}
      {isFocused && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
            backdropFilter: 'blur(2px)',
            WebkitBackdropFilter: 'blur(2px)', // Safari support
            zIndex: 999,
            transition: 'all 0.3s ease',
            animation: 'fadeIn 0.3s ease'
          }}
          onClick={handleBlur}
        />
      )}
      <div ref={searchContainerRef} style={{ position: 'relative', width: '100%', zIndex: 1000 }}>
      <div 
        onClick={handleFocus}
        style={{
          display: 'flex',
          alignItems: 'center',
          border: isFocused ? '2px solid #00D4AA' : '1px solid #D1D5DB',
          borderRadius: '12px',
          background: 'white',
          padding: isFocused ? '12px 16px' : '8px 12px',
        transition: 'all 0.3s ease',
          cursor: 'text',
          minWidth: isFocused ? '450px' : '250px',
          width: isFocused ? '100%' : 'auto',
          maxWidth: isFocused ? '600px' : '300px',
          boxShadow: isFocused ? '0 8px 25px rgba(0, 212, 170, 0.2)' : '0 2px 8px rgba(0,0,0,0.08)'
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
            color: '#111827',
            fontWeight: '500',
            transition: 'font-size 0.2s ease'
          }}
        />
        {isLoading && <span style={{fontSize: '12px', color: '#00D4AA', marginLeft: '8px', fontWeight: '500'}}>Searching...</span>}
      </div>
      
      {isOpen && results.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'white',
          border: '1px solid #E5E7EB',
          borderTop: 'none',
          borderRadius: '0 0 12px 12px',
          maxHeight: '450px',
          overflowY: 'auto',
          zIndex: 1001,
          boxShadow: isFocused ? '0 20px 40px rgba(0,0,0,0.25)' : '0 10px 30px rgba(0,0,0,0.15)',
          marginTop: '4px',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)'
        }}>
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            mark {
              background-color: transparent;
              color: #00D4AA;
              font-weight: 700;
              padding: 0;
              border-radius: 0;
              box-shadow: none;
              text-shadow: none;
            }
            .search-suggestion {
              padding: 10px 16px;
              cursor: pointer;
              border-bottom: 1px solid #E5E7EB;
              color: #374151;
              font-size: 13px;
              transition: background-color 0.2s ease;
            }
            .search-suggestion:hover {
              background-color: #F3F4F6;
            }
            .search-result {
              padding: 12px 16px;
              cursor: pointer;
              border-bottom: 1px solid #E5E7EB;
              transition: background-color 0.2s ease;
            }
            .search-result:hover {
              background-color: #F3F4F6;
            }
            .search-result-title {
              font-weight: 600;
              color: #111827;
              font-size: 14px;
              margin-bottom: 4px;
            }
            .search-result-section {
              font-size: 11px;
              color: #00D4AA;
              font-weight: 500;
              margin-bottom: 6px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .search-result-content {
              font-size: 12px;
              color: #6B7280;
              line-height: 1.4;
            }
            .search-result-content mark {
              background-color: transparent;
              color: #00D4AA;
              font-weight: 700;
              padding: 0;
              border-radius: 0;
              box-shadow: none;
            }
            .search-result-title mark {
              background-color: transparent;
              color: inherit;
              font-weight: inherit;
              padding: 0;
              border-radius: 0;
              box-shadow: none;
            }
          `}</style>
          {query.trim() === '' && isFocused ? (
            <div>
          <div style={{
                padding: '12px 16px', 
                fontSize: '12px', 
                color: '#6B7280', 
                borderBottom: '1px solid #E5E7EB',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
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
            const rawTitle = result.hierarchy?.lvl1 || result.hierarchy?.lvl2 || result.title || 'Untitled';
            const title = rawTitle; // No highlighting for titles
            const rawContent = result._formatted?.content || result.content || '';
            const section = getSectionInfo(result);
            
            // Enhanced highlighting for better keyword visibility
            const enhancedContent = enhanceHighlighting(rawContent, query);
            const displayContent = enhancedContent.substring(0, 150) + (enhancedContent.length > 150 ? '...' : '');
              
              return (
                <div
                  key={index}
                  className="search-result"
                  onClick={() => handleResultClick(result)}
                >
                  <div className="search-result-section">
                    {section}
                  </div>
                  <div className="search-result-title">
                    {title}
                </div>
                  <div 
                    className="search-result-content"
                    dangerouslySetInnerHTML={{ __html: displayContent }}
                  />
                </div>
              );
            })}
        </div>
      )}
            </div>
    </>
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