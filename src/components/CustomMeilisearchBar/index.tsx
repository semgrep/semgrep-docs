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
}

interface CustomMeilisearchBarProps {
  hostUrl?: string;
  apiKey?: string;
  indexUid?: string;
  placeholder?: string;
}

const CustomMeilisearchBar: React.FC<CustomMeilisearchBarProps> = ({
  hostUrl = 'http://localhost:7700',
  apiKey = '',
  indexUid = 'docs',
  placeholder = 'Search docs...',
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
      console.log('Searching for:', searchQuery);
      console.log('Request URL:', `${hostUrl}/indexes/${indexUid}/search`);
      
      const requestBody = {
        q: searchQuery,
        limit: 8,
        attributesToHighlight: ['content', 'hierarchy.lvl1', 'hierarchy.lvl2'],
        attributesToCrop: ['content:50'],
        cropLength: 50,
      };
      console.log('Request body:', requestBody);

      const response = await fetch(`${hostUrl}/indexes/${indexUid}/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(apiKey && { 'Authorization': `Bearer ${apiKey}` }),
        },
        body: JSON.stringify(requestBody),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers));

      if (response.ok) {
        const data = await response.json();
        console.log('Search results:', data);
        setResults(data.hits || []);
        setIsOpen(true);
      } else {
        const errorText = await response.text();
        console.error('Search failed:', {
          status: response.status,
          statusText: response.statusText,
          error: errorText
        });
        setResults([]);
        setIsOpen(false);
      }
    } catch (error) {
      console.error('Search error details:', error);
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

  return (
    <div className="custom-search-container" ref={searchRef}>
      <div className="search-input-wrapper">
        <input
          ref={inputRef}
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query && setIsOpen(true)}
          className="custom-search-input"
          style={{
            padding: '0.375rem 0.75rem',
            borderRadius: '0.375rem',
            border: '1px solid #ccc',
            minWidth: '200px',
            fontSize: '14px',
          }}
        />
        {isLoading && (
          <div className="search-loading">
            <div className="loading-spinner" />
          </div>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="search-dropdown">
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
                      result.content?.substring(0, 100) + '...' || 'No content',
                      query
                    ),
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {isOpen && results.length === 0 && query && !isLoading && (
        <div className="search-dropdown">
          <div className="no-results">No results found for "{query}"</div>
        </div>
      )}
    </div>
  );
};

export default CustomMeilisearchBar;
