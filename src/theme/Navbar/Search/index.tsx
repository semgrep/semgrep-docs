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
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSources, setAiSources] = useState<any[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Detect dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      const theme = document.documentElement.getAttribute('data-theme');
      setIsDarkMode(theme === 'dark');
    };
    
    checkDarkMode();
    
    // Watch for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
    
    return () => observer.disconnect();
  }, []);

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
            attributesToCrop: ['content'],
            hybrid: {
              semanticRatio: 0.5,
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
            attributesToCrop: ['content'],
            hybrid: {
              semanticRatio: 0.5,
              embedder: "default"
            }
              }),
            });
          }

          if (response.ok) {
            const data = await response.json();
        
        // Apply Semgrep-specific ranking to prioritize relevant content
        const rankedResults = (data.hits || []).map((result, index) => {
          // Prioritize lvl1 (page title) over lvl2 (subsection)
          let title = result.hierarchy_lvl1 || result.hierarchy_radio_lvl1 || result.hierarchy?.lvl1 || result.hierarchy_lvl2 || result.hierarchy_radio_lvl2 || result.hierarchy?.lvl2 || result.title || '';
          
          // Remove common emojis (🔧, 📝, etc.)
          title = title.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '').replace(/[\u2600-\u27BF]/g, '').trim();
          
          // Filter out Docusaurus internal anchors
          if (title.includes('__docusaurus_skipToContent_fallback') || title.includes('#__DOCUSAURUS') || title.match(/^[A-Z]+#__/)) {
            title = result.hierarchy_lvl0 || result.hierarchy?.lvl0 || '';
          }
          
          // Clean up any # symbols, anchors, and extra spaces
          title = title
            .replace(/#__docusaurus[_a-zA-Z]+/gi, '')
            .replace(/#__DOCUSAURUS[_A-Z]+/gi, '')
            .replace(/\s*#\s*/g, ' - ')
            .replace(/\s+/g, ' ')
            .trim();
          
          // If still no title, extract from URL path
          if (!title && result.url) {
            const urlPath = result.url.split('/docs/')[1];
            if (urlPath) {
              const pathParts = urlPath.split('#')[0].split('/');
              const lastPart = pathParts[pathParts.length - 1] || pathParts[pathParts.length - 2];
              if (lastPart) {
                title = lastPart.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
              }
            }
          }
          title = title || 'Documentation';
          
          const content = result.content || result._formatted?.content || '';
          const url = result.url || '';
          
          // Calculate Semgrep-specific relevance score
          let relevanceScore = index;
          
          const queryLower = searchQuery.toLowerCase();
          const titleLower = title.toLowerCase();
          const contentLower = content.toLowerCase();
          
          // Extract main query terms (skip stop words)
          const queryTerms = queryLower.replace(/what|is|are|how|to|the|a|an|do|does|can/g, '').trim().split(/\s+/).filter(t => t.length > 2);
          
          // CRITICAL: Multi-term match bonus - if multiple query terms appear, boost significantly
          const termsInTitle = queryTerms.filter(term => titleLower.includes(term)).length;
          const termsInContent = queryTerms.filter(term => contentLower.includes(term)).length;
          
          if (termsInTitle >= 2) {
            relevanceScore -= 25; // HUGE boost for multiple terms in title
          }
          if (termsInContent >= queryTerms.length && queryTerms.length > 1) {
            relevanceScore -= 15; // Large boost if ALL query terms appear in content
          }
          
          // HIGHEST PRIORITY: URL path directly matches query term
          queryTerms.forEach(term => {
            if (url.includes(`/docs/${term}`) || url.includes(`/${term}/`) || url.includes(`-${term}`)) {
              relevanceScore -= 20; // Very high boost for direct path match
            }
          });
          
          // HIGH PRIORITY: Title contains exact query term
          queryTerms.forEach(term => {
            if (titleLower.includes(term)) {
              relevanceScore -= 10; // High boost for title match
            }
          });
          
          // Intent-specific boosting for "ignore" queries
          if (queryLower.includes('ignore') || queryLower.includes('ignoring')) {
            if (titleLower.includes('ignore') || titleLower.includes('ignoring')) {
              relevanceScore -= 15; // Strong boost for ignore-related pages
            }
            if (url.includes('ignoring-') || url.includes('/ignore')) {
              relevanceScore -= 12;
            }
          }
          
          // Query-specific boosting - boost content that matches user intent
          if (queryLower.includes('rule') || queryLower.includes('write') || queryLower.includes('custom')) {
            if (titleLower.includes('rule writing') || titleLower.includes('create a rule') || titleLower.includes('custom rule')) {
              relevanceScore -= 10; // Highest priority for exact match
            }
            if (titleLower.includes('rule') && !titleLower.includes('rule update')) {
              relevanceScore -= 5;
            }
          }
          
          // Boost priority for important Semgrep content types
          if (titleLower.includes('getting started') || titleLower.includes('quickstart')) {
            relevanceScore -= 5; // Higher priority
          }
          
          if (titleLower.includes('tutorial') || titleLower.includes('guide')) {
            relevanceScore -= 3;
          }
          
          if (titleLower.includes('configuration') || titleLower.includes('setup')) {
            relevanceScore -= 2;
          }
          
          if (titleLower.includes('troubleshooting') || titleLower.includes('debug')) {
            relevanceScore -= 1;
          }
          
          // Boost for specific Semgrep products 
          if (titleLower.includes('semgrep code') || titleLower.includes('semgrep pro')) {
            relevanceScore -= 2;
          }
          
          // Penalize tagged pages heavily
          const isTaggedPage = title.includes('tagged with') || content.includes('tagged with');
          if (isTaggedPage) {
            relevanceScore += 1000;
          }
          
          // HEAVILY penalize release notes unless specifically searching for them
          if ((titleLower.includes('release notes') || url.includes('/release-notes') || titleLower.includes('added') || titleLower.includes('fixed')) && 
              !queryLower.includes('release') && !queryLower.includes('changelog') && !queryLower.includes('added') && !queryLower.includes('fixed')) {
            relevanceScore += 15; // Heavy penalty
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

  const fetchAIAnswer = async () => {
    if (!query.trim() || aiLoading) return;
    
    setAiLoading(true);
    try {
      const chatUrl = `${window.location.origin}/.netlify/functions/meilisearch-chat`;
      const response = await fetch(chatUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{
            role: 'user',
            content: query
          }],
          index: indexUid
        })
      });

      if (response.ok) {
        const data = await response.json();
        setAiResponse(data.answer || 'Sorry, I couldn\'t generate a response.');
        setAiSources(data.sources || []);
      } else {
        setAiResponse('Failed to get AI response. Please try again.');
      }
    } catch (error) {
      console.error('AI fetch error:', error);
      setAiResponse('Error fetching AI response.');
    } finally {
      setAiLoading(false);
    }
  };

  // Handle input change with debouncing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setAiResponse(null); // Clear AI response on new query
    setAiSources([]);

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
    // Prioritize lvl1 (page title) over lvl2 (subsection)
    let title = result.hierarchy_lvl1 || 
                result.hierarchy_radio_lvl1 || 
                result.hierarchy?.lvl1 ||
                result.hierarchy_lvl2 || 
                result.hierarchy_radio_lvl2 || 
                result.hierarchy?.lvl2 || 
                result.title || 
                '';
    
    // Remove common emojis (🔧, 📝, etc.)
    title = title.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '').replace(/[\u2600-\u27BF]/g, '').trim();
    
    // Filter out Docusaurus internal anchors and weird titles
    if (title.includes('__docusaurus_skipToContent_fallback') || 
        title.includes('#__DOCUSAURUS') ||
        title.match(/^[A-Z]+#__/)) {
      // Try to get a better title from other fields
      title = result.hierarchy_lvl0 || result.hierarchy?.lvl0 || '';
    }
    
    // Clean up the title
    title = title.replace(/#__docusaurus_skipToContent_fallback/gi, '')
                 .replace(/#__DOCUSAURUS[_A-Z]+/gi, '')
                 .replace(/\s*#\s*/g, ' - ')
                 .replace(/\s+/g, ' ')
                 .trim();
    
    // If still no title, extract from URL path
    if (!title && result.url) {
      const urlPath = result.url.split('/docs/')[1];
      if (urlPath) {
        // Get the last part of the path (before anchor)
        const pathParts = urlPath.split('#')[0].split('/');
        const lastPart = pathParts[pathParts.length - 1] || pathParts[pathParts.length - 2];
        
        if (lastPart) {
          // Convert kebab-case to Title Case
          title = lastPart
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        }
      }
    }
    
    return title || 'Documentation';
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
    const url = result.url || '';
    
    // Extract section from URL path - this is the most reliable method
    if (url.includes('/docs/')) {
      // First, strip any anchors from the URL
      const cleanUrl = url.split('#')[0].split('?')[0];
      const pathParts = cleanUrl.split('/docs/')[1]?.split('/');
      if (pathParts && pathParts.length > 0) {
        let section = pathParts[0];
        
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
          'semgrep-assistant': 'Semgrep Assistant',
          'deployment': 'Deployment',
          'troubleshooting': 'Troubleshooting',
          'faq': 'FAQ',
          'kb': 'Knowledge Base',
          'release-notes': 'Release Notes',
          'for-developers': 'For Developers',
          'extensions': 'Extensions',
          'integrations': 'Integrations',
          'secure-guardrails': 'Secure Guardrails',
          'managing-findings': 'Managing Findings',
          'managing-policy': 'Managing Policy',
          'notifications': 'Notifications',
          'sample-ci-configs': 'CI Configurations',
          'cheat-sheets': 'Cheat Sheets',
          'deepsemgrep': 'DeepSemgrep',
          'prerequisites': 'Prerequisites',
          'supported-languages': 'Language Support',
          'local-and-cli-scans': 'Local Scans',
          'core-deployment': 'Core Deployment',
          'deployment-at-scale': 'Deployment at Scale',
          'dashboard': 'Dashboard',
          'sso': 'SSO',
          'usage-and-billing': 'Usage & Billing',
          'usage-limits': 'Usage Limits',
          'upgrade': 'Upgrade',
          'update': 'Update',
          'upgrading': 'Upgrading',
          'status': 'Status',
          'support': 'Support',
          'trophy-case': 'Trophy Case',
          'licensing': 'Licensing',
          'security': 'Security',
          'metrics': 'Metrics',
          'mcp': 'MCP',
          'semgrepignore-v2-reference': 'Semgrepignore',
          'ignoring-files-folders-code': 'Ignoring Files',
          'ignoring-findings': 'Ignoring Findings',
          'running-rules': 'Running Rules',
          'reporting-false-negatives': 'Reporting Issues',
          'run-a-successful-pov': 'POV Guide'
        };
        
        return sectionMap[section] || section.charAt(0).toUpperCase() + section.slice(1).replace(/-/g, ' ');
      }
    }
    
    // Fallback: try to determine section from URL patterns
    if (url.includes('/writing-rules/')) {
      return 'Rule Writing';
    }
    if (url.includes('/semgrep-secrets/')) {
      return 'Secrets Detection';
    }
    if (url.includes('/semgrep-supply-chain/')) {
      return 'Supply Chain';
    }
    if (url.includes('/semgrep-ci/') || url.includes('/deployment/')) {
      return 'CI/CD';
    }
    if (url.includes('/getting-started/')) {
      return 'Getting Started';
    }
    if (url.includes('/semgrep-assistant/')) {
      return 'Semgrep Assistant';
    }
    
    return 'Documentation';
  };

  // Semgrep-specific query preprocessing for better search results
  const preprocessSemgrepQuery = (query: string): string => {
    let processedQuery = query.trim();
    
    // Don't modify "how to" queries - they work fine as-is
    if (processedQuery.toLowerCase().startsWith('how to')) {
      return processedQuery;
    }
    
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
    
    // Handle common developer queries (but not "how to")
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

  // Enhanced markdown rendering for AI responses
  const renderMarkdown = (text: string): string => {
    let html = text;
    
    // Handle code blocks with language (```language\ncode\n```)
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, language, code) => {
      const lang = language || '';
      const escapedCode = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      return `<pre style="background: #1F2937; color: #E5E7EB; padding: 12px; border-radius: 8px; overflow-x: auto; margin: 12px 0; font-size: 12px; line-height: 1.5; font-family: 'Monaco', 'Menlo', 'Consolas', monospace;"><code>${escapedCode}</code></pre>`;
    });
    
    // Handle inline code (`code`)
    html = html.replace(/`([^`]+)`/g, '<code style="background: #F3F4F6; color: #1F2937; padding: 2px 6px; border-radius: 4px; font-size: 12px; font-family: \'Monaco\', \'Menlo\', \'Consolas\', monospace;">$1</code>');
    
    // Handle links [text](url)
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" style="color: #059669; text-decoration: underline;">$1</a>');
    
    // Handle bold **text**
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Handle newlines
    html = html.replace(/\n/g, '<br />');
    
    return html;
  };

  return (
    <>
      {/* Background overlay when search is focused or results are open */}
      {(isFocused || isOpen) && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
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
          border: (isFocused || aiResponse || aiLoading) ? '2px solid #00D4AA' : '1px solid #D1D5DB',
          borderRadius: '12px',
          background: 'white',
          padding: (isFocused || aiResponse || aiLoading) ? '12px 16px' : '8px 12px',
        transition: 'all 0.3s ease',
          cursor: 'text',
          minWidth: (isFocused || aiResponse || aiLoading) ? '450px' : '250px',
          width: (isFocused || aiResponse || aiLoading) ? '100%' : 'auto',
          maxWidth: (isFocused || aiResponse || aiLoading) ? '600px' : '300px',
          boxShadow: (isFocused || aiResponse || aiLoading) ? '0 8px 25px rgba(0, 212, 170, 0.2)' : '0 2px 8px rgba(0,0,0,0.08)'
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
            fontSize: (isFocused || aiResponse || aiLoading) ? '16px' : '14px',
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
          background: isDarkMode ? '#1b1b1d' : 'white',
          border: `1px solid ${isDarkMode ? '#303033' : '#E5E7EB'}`,
          borderTop: 'none',
          borderRadius: '0 0 12px 12px',
          maxHeight: aiResponse ? '650px' : '450px',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1001,
          boxShadow: isDarkMode 
            ? (isFocused ? '0 20px 40px rgba(0,0,0,0.6)' : '0 10px 30px rgba(0,0,0,0.4)')
            : (isFocused ? '0 20px 40px rgba(0,0,0,0.25)' : '0 10px 30px rgba(0,0,0,0.15)'),
          marginTop: '4px',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          transition: 'max-height 0.3s ease-in-out'
        }}>
          {/* Results count and Ask AI button header */}
          <div style={{
            padding: '8px 16px',
            fontSize: '12px',
            color: isDarkMode ? '#9ca3af' : '#6B7280',
            borderBottom: `1px solid ${isDarkMode ? '#303033' : '#E5E7EB'}`,
            backgroundColor: isDarkMode ? '#252529' : '#F9FAFB',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: '12px' }}>
              {(() => {
                const seenUrls = new Set();
                const count = results.filter(result => {
                  const title = result.hierarchy?.lvl1 || result.hierarchy?.lvl2 || result.title || '';
                  const content = result.content || result._formatted?.content || '';
                  const url = result.url || '';
                  const baseUrl = url.split('#')[0];
                  
                  if (seenUrls.has(baseUrl)) {
                    return false;
                  }
                  
                  const isTaggedPage = title.includes('docs tagged with') || title.includes('doc tagged with') || 
                                      title.includes('tagged with') || content.includes('docs tagged with') || 
                                      content.includes('doc tagged with') || content.includes('tagged with') || 
                                      title.includes('Choose a KB category') || content.includes('Choose a KB category') || 
                                      title.match(/\d+\s+docs?\s+tagged\s+with/) || content.match(/\d+\s+docs?\s+tagged\s+with/);
                  const hasContent = content && content.trim().length > 10;
                  const isNotJustTitle = content.toLowerCase() !== title.toLowerCase();
                  
                  if (!isTaggedPage && hasContent && isNotJustTitle) {
                    seenUrls.add(baseUrl);
                    return true;
                  }
                  
                  return false;
                }).length;
                return `${count} ${count === 1 ? 'result' : 'results'} found`;
              })()}
            </span>
            <button
              onClick={fetchAIAnswer}
              disabled={aiLoading}
              style={{
                background: 'linear-gradient(135deg, #00D4AA 0%, #00A67D 100%)',
                color: 'white',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s',
                boxShadow: '0 2px 8px rgba(0, 212, 170, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 212, 170, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 212, 170, 0.3)';
              }}
              title="Get AI-powered answer"
            >
              <span style={{ fontSize: '16px' }}>{aiLoading ? '⏳' : '✨'}</span>
              <span>{aiLoading ? 'Thinking...' : 'Ask AI'}</span>
            </button>
            </div>
          
          {/* AI Response Section */}
          {aiResponse && (
            <div style={{
              padding: '16px',
              backgroundColor: isDarkMode ? '#1e3a32' : '#F0FDF4',
              borderBottom: '2px solid #00D4AA',
              animation: 'fadeIn 0.3s ease-in'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '12px',
                fontSize: '13px',
                fontWeight: '600',
                color: isDarkMode ? '#10b981' : '#059669'
              }}>
                <span style={{ fontSize: '16px' }}>✨</span>
                <span>AI Answer</span>
              </div>
              <div style={{
                fontSize: '13px',
                lineHeight: '1.6',
                color: isDarkMode ? '#d1d5db' : '#374151',
                marginBottom: aiSources.length > 0 ? '12px' : '0'
              }}
              dangerouslySetInnerHTML={{ 
                __html: renderMarkdown(aiResponse)
              }}
              />
              {aiSources.length > 0 && (
                <div style={{ marginTop: '12px' }}>
                  <div style={{
                    fontSize: '11px',
                    fontWeight: '600',
                    color: isDarkMode ? '#9ca3af' : '#6B7280',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Sources:
                  </div>
                  {aiSources.slice(0, 3).map((source, idx) => (
                    <a
                      key={idx}
                      href={source.url}
                      onClick={() => setIsOpen(false)}
                      style={{
                        display: 'block',
                        padding: '6px 8px',
                        marginBottom: '4px',
                        fontSize: '11px',
                        color: isDarkMode ? '#10b981' : '#059669',
                        textDecoration: 'none',
                        backgroundColor: isDarkMode ? '#1e3a32' : 'white',
                        borderRadius: '4px',
                        border: `1px solid ${isDarkMode ? '#065f46' : '#D1FAE5'}`,
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = isDarkMode ? '#134e3a' : '#ECFDF5';
                        e.currentTarget.style.borderColor = '#00D4AA';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = isDarkMode ? '#1e3a32' : 'white';
                        e.currentTarget.style.borderColor = isDarkMode ? '#065f46' : '#D1FAE5';
                      }}
                    >
                      {source.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
          
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
            
            /* Dark mode styles */
            [data-theme="dark"] .search-suggestion {
              border-bottom: 1px solid #303033;
              color: #d1d5db;
            }
            [data-theme="dark"] .search-suggestion:hover {
              background-color: #2d2d30;
            }
            [data-theme="dark"] .search-result {
              border-bottom: 1px solid #303033;
            }
            [data-theme="dark"] .search-result:hover {
              background-color: #2d2d30;
            }
            [data-theme="dark"] .search-result-title {
              color: #e5e7eb;
            }
            [data-theme="dark"] .search-result-content {
              color: #9ca3af;
            }
          `}</style>
          
          {/* Scrollable search results container */}
          <div style={{
            overflowY: 'auto',
            flex: 1,
            minHeight: 0
          }}>
          {query.trim() === '' && isFocused ? (
            <div>
            <div style={{
                padding: '12px 16px', 
                fontSize: '12px', 
                color: isDarkMode ? '#9ca3af' : '#6B7280', 
                borderBottom: `1px solid ${isDarkMode ? '#303033' : '#E5E7EB'}`,
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
          ) : (() => {
            // Filter and deduplicate results
            const seenUrls = new Set();
            const filteredResults = results.filter(result => {
              const title = result.hierarchy?.lvl1 || result.hierarchy?.lvl2 || result.title || '';
              const content = result.content || result._formatted?.content || '';
              const url = result.url || '';
              
              // Get base URL without anchor for deduplication
              const baseUrl = url.split('#')[0];
              
              // Skip duplicates (same page, different anchors)
              if (seenUrls.has(baseUrl)) {
                return false;
              }
              
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
              
              // Filter out header-only documents with no meaningful content
              const hasContent = content && content.trim().length > 10;
              const isNotJustTitle = content.toLowerCase() !== title.toLowerCase();
              
              if (!isTaggedPage && hasContent && isNotJustTitle) {
                seenUrls.add(baseUrl);
                return true;
              }
              
              return false;
            });
            
            return (
              <>
                {filteredResults.map((result, index) => {
            // Prioritize lvl1 (page title) over lvl2 (subsection)
            let rawTitle = result.hierarchy_lvl1 || result.hierarchy_radio_lvl1 || result.hierarchy?.lvl1 || result.hierarchy_lvl2 || result.hierarchy_radio_lvl2 || result.hierarchy?.lvl2 || result.title || '';
            
            // Remove common emojis (🔧, 📝, etc.)
            rawTitle = rawTitle.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '').replace(/[\u2600-\u27BF]/g, '').trim();
            
            // Filter out Docusaurus internal anchors
            if (rawTitle.includes('__docusaurus_skipToContent_fallback') || rawTitle.includes('#__DOCUSAURUS') || rawTitle.match(/^[A-Z]+#__/)) {
              rawTitle = result.hierarchy_lvl0 || result.hierarchy?.lvl0 || '';
            }
            
            // Clean up any # symbols, anchors, and extra spaces
            rawTitle = rawTitle
              .replace(/#__docusaurus[_a-zA-Z]+/gi, '')
              .replace(/#__DOCUSAURUS[_A-Z]+/gi, '')
              .replace(/\s*#\s*/g, ' - ')
              .replace(/\s+/g, ' ')
              .trim();
            
            // If still no title, extract from URL path
            if (!rawTitle && result.url) {
              const urlPath = result.url.split('/docs/')[1];
              if (urlPath) {
                const pathParts = urlPath.split('#')[0].split('/');
                const lastPart = pathParts[pathParts.length - 1] || pathParts[pathParts.length - 2];
                if (lastPart) {
                  rawTitle = lastPart.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                }
              }
            }
            rawTitle = rawTitle || 'Documentation';
            
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
              </>
            );
          })()}
          </div>
          {/* End of scrollable search results container */}
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
        "https://ms-3ade175771ef-34593.sfo.meilisearch.io",
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
