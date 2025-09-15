import React, { useState, useEffect, useRef } from 'react';
import './styles.css';

interface SearchResult {
  id: string;
  url: string;
  content: string;
  hierarchy: {
    lvl0?: string;
    lvl1?: string;
    lvl2?: string;
    lvl3?: string;
  };
  _semanticScore?: number;
  _rankingScore?: number;
}

interface SemanticSearchBarProps {
  hostUrl?: string;
  apiKey?: string;
  indexUid?: string;
  placeholder?: string;
  hybridSearch?: boolean;
  semanticWeight?: number;
}

const SemanticSearchBar: React.FC<SemanticSearchBarProps> = ({
  hostUrl = 'http://localhost:7700',
  apiKey = '',
  indexUid = 'docs_semantic',
  placeholder = 'Search docs...',
  hybridSearch = true,
  semanticWeight = 0.7,
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchMode, setSearchMode] = useState<'hybrid' | 'keyword' | 'semantic'>('keyword');
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Smart query preprocessing for better search results
  const preprocessQuery = (query: string): string => {
    if (!query) return query;
    
    // Common question words that can dilute search results
    const questionWords = ['what', 'is', 'how', 'do', 'does', 'can', 'where', 'when', 'why', 'which'];
    const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
    
    // Extract meaningful terms
    const words = query.toLowerCase().split(/\s+/);
    const importantWords = words.filter(word => 
      !questionWords.includes(word) && 
      !stopWords.includes(word) && 
      word.length > 2
    );
    
    // If we have important terms, use them; otherwise use original query
    if (importantWords.length > 0) {
      // Add quotes around important terms for exact matching when beneficial
      const processedTerms = importantWords.map(word => {
        // Known Semgrep acronyms/terms that should be searched exactly
        if (['sms', 'scp', 'ssc', 'oss', 'pro', 'ce', 'ci', 'cd', 'api', 'ide', 'sso', 'saml'].includes(word)) {
          return `"${word.toUpperCase()}"`;
        }
        return word;
      });
      
      return processedTerms.join(' ');
    }
    
    return query;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
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
      console.log('🔍 Original query:', searchQuery, 'Mode:', searchMode);
      
      // Improve query processing for better results
      const processedQuery = preprocessQuery(searchQuery);
      console.log('⚡ Processed query:', processedQuery);
      
      const requestBody: any = {
        q: processedQuery,
        limit: 10,
        attributesToHighlight: ['content', 'hierarchy.lvl1', 'hierarchy.lvl2'],
        attributesToCrop: ['content:100'],
        cropLength: 100,
        showRankingScore: true,
        // Improve ranking for better relevance
        rankingScoreThreshold: 0.1,
      };

      // Configure search based on mode
      if (searchMode === 'hybrid' && hybridSearch) {
        // Hybrid search: combine keyword and semantic
        requestBody.hybrid = {
          semanticRatio: semanticWeight,
          embedder: 'default'
        };
        console.log('🔀 Using hybrid search with semantic ratio:', semanticWeight);
      } else if (searchMode === 'semantic') {
        // Pure semantic search
        requestBody.q = ''; // Empty query for pure vector search
        requestBody.vector = searchQuery; // This would need embedding generation
        console.log('🧠 Using pure semantic search');
      }
      // 'keyword' mode uses default behavior (no special config)

      const response = await fetch(`${hostUrl}/indexes/${indexUid}/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(apiKey && { 'Authorization': `Bearer ${apiKey}` }),
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('📊 Search results:', data.hits?.length || 0, 'hits in', data.processingTimeMs, 'ms');
        
        // Process results to add semantic scoring information
        const processedResults = (data.hits || []).map((hit: any) => ({
          ...hit,
          _semanticScore: hit._semanticScore || 0,
          _rankingScore: hit._rankingScore || 0,
        }));

        setResults(processedResults);
        setIsOpen(true);
      } else {
        console.error('❌ Search failed:', response.status, response.statusText);
        // Fallback to keyword search if semantic fails
        if (searchMode === 'hybrid' || searchMode === 'semantic') {
          console.log('🔄 Falling back to keyword search');
          await searchKeywordFallback(searchQuery);
        } else {
          setResults([]);
          setIsOpen(false);
        }
      }
    } catch (error) {
      console.error('❌ Search error:', error);
      // Fallback to keyword search
      if (searchMode !== 'keyword') {
        console.log('🔄 Falling back to keyword search due to error');
        await searchKeywordFallback(searchQuery);
      } else {
        setResults([]);
        setIsOpen(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const searchKeywordFallback = async (searchQuery: string) => {
    try {
      const requestBody = {
        q: searchQuery,
        limit: 10,
        attributesToHighlight: ['content', 'hierarchy.lvl1', 'hierarchy.lvl2'],
        attributesToCrop: ['content:100'],
        cropLength: 100,
      };

      const response = await fetch(`${hostUrl}/indexes/docs/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(apiKey && { 'Authorization': `Bearer ${apiKey}` }),
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        setResults(data.hits || []);
        setIsOpen(true);
      }
    } catch (error) {
      console.error('❌ Keyword fallback failed:', error);
      setResults([]);
      setIsOpen(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    // Debounce search
    const timeoutId = setTimeout(() => {
      searchMeilisearch(value);
    }, 200);

    return () => clearTimeout(timeoutId);
  };

  const handleResultClick = (result: SearchResult) => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    if (inputRef.current) {
      inputRef.current.blur();
    }
    
    // Navigate to the result
    if (result.url) {
      window.location.href = result.url;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query || !text) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  };

  const getSearchModeIcon = () => {
    switch (searchMode) {
      case 'hybrid':
        return '🔀';
      case 'semantic':
        return '🧠';
      case 'keyword':
        return '🔤';
      default:
        return '🔍';
    }
  };

  const getSearchModeLabel = () => {
    switch (searchMode) {
      case 'hybrid':
        return 'Hybrid';
      case 'semantic':
        return 'Semantic';
      case 'keyword':
        return 'Keyword';
      default:
        return 'Search';
    }
  };

  return (
    <div className="semantic-search-container" ref={searchRef}>
      <div className="search-input-wrapper">
        <input
          ref={inputRef}
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query && setIsOpen(true)}
          className="semantic-search-input"
          style={{
            padding: '0.375rem 2.5rem 0.375rem 0.75rem',
            borderRadius: '0.375rem',
            border: '1px solid #ccc',
            minWidth: '250px',
            fontSize: '14px',
          }}
        />
        
        {/* Search mode toggle */}
        <div className="search-mode-toggle" title={`${getSearchModeLabel()} Search`}>
          <button
            onClick={() => {
              const modes: Array<'hybrid' | 'keyword' | 'semantic'> = ['hybrid', 'keyword', 'semantic'];
              const currentIndex = modes.indexOf(searchMode);
              const nextMode = modes[(currentIndex + 1) % modes.length];
              setSearchMode(nextMode);
              if (query) {
                searchMeilisearch(query);
              }
            }}
            className="search-mode-button"
            title="Toggle search mode"
          >
            <span style={{ fontSize: '12px' }}>{getSearchModeIcon()}</span>
          </button>
        </div>

        {isLoading && (
          <div className="search-loading">
            <div className="loading-spinner" />
          </div>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="search-dropdown">
          <div className="search-results-header">
            <span className="search-mode-indicator">
              {getSearchModeIcon()} {getSearchModeLabel()} Search
            </span>
            <span className="results-count">
              {results.length} results
            </span>
          </div>
          <div className="search-results">
            {results.map((result, index) => (
              <div
                key={result.id || index}
                className="search-result-item"
                onClick={() => handleResultClick(result)}
                onMouseDown={(e) => e.preventDefault()} // Prevent input blur
              >
                <div className="result-hierarchy">
                  {result.hierarchy?.lvl0 && (
                    <span className="hierarchy-lvl0">{result.hierarchy.lvl0}</span>
                  )}
                  {result.hierarchy?.lvl1 && (
                    <>
                      <span className="hierarchy-separator"> › </span>
                      <span className="hierarchy-lvl1">{result.hierarchy.lvl1}</span>
                    </>
                  )}
                  {result.hierarchy?.lvl2 && (
                    <>
                      <span className="hierarchy-separator"> › </span>
                      <span className="hierarchy-lvl2">{result.hierarchy.lvl2}</span>
                    </>
                  )}
                </div>
                <div
                  className="result-content"
                  dangerouslySetInnerHTML={{
                    __html: highlightMatch(
                      result.content?.substring(0, 150) + '...' || 'No content',
                      query
                    ),
                  }}
                />
                {(result._rankingScore !== undefined || result._semanticScore !== undefined) && (
                  <div className="result-scores">
                    {result._rankingScore !== undefined && (
                      <span className="score-badge ranking-score" title="Ranking Score">
                        📊 {(result._rankingScore * 100).toFixed(0)}%
                      </span>
                    )}
                    {result._semanticScore !== undefined && (
                      <span className="score-badge semantic-score" title="Semantic Relevance">
                        🧠 {(result._semanticScore * 100).toFixed(0)}%
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {isOpen && results.length === 0 && query && !isLoading && (
        <div className="search-dropdown">
          <div className="no-results">
            No results found for "{query}" in {getSearchModeLabel().toLowerCase()} mode
          </div>
        </div>
      )}
    </div>
  );
};

export default SemanticSearchBar;
