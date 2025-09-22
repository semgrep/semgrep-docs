import React, { useEffect, useRef, ReactNode } from 'react';
import type { Props } from '@theme/Navbar/Search';
import { Markprompt } from '@markprompt/react';
import '@markprompt/css';

// Meilisearch default UI implementation
const MeilisearchDefaultSearch: React.FC<{
  hostUrl: string;
  apiKey: string;
  indexUid: string;
  placeholder: string;
}> = ({ hostUrl, apiKey, indexUid, placeholder }) => {
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Meilisearch instant search scripts
    const loadScript = (src: string) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const loadCSS = (href: string) => {
      return new Promise((resolve, reject) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.onload = resolve;
        link.onerror = reject;
        document.head.appendChild(link);
      });
    };

    const initializeSearch = async () => {
      try {
        // Load required scripts and CSS
        await Promise.all([
          loadCSS('https://cdn.jsdelivr.net/npm/@meilisearch/instant-meilisearch/templates/basic_search.css'),
          loadScript('https://cdn.jsdelivr.net/npm/@meilisearch/instant-meilisearch/dist/instant-meilisearch.umd.min.js'),
          loadScript('https://cdn.jsdelivr.net/npm/instantsearch.js@4')
        ]);

        // Initialize Meilisearch instant search
        if (window.instantsearch && window.instantMeiliSearch) {
          const search = window.instantsearch({
            indexName: indexUid,
            searchClient: window.instantMeiliSearch({
              host: hostUrl,
              apiKey: apiKey,
            }),
          });

          // Add search box widget
          search.addWidgets([
            window.instantsearch.widgets.searchBox({
              container: searchRef.current,
              placeholder: placeholder,
              showReset: true,
              showSubmit: true,
              showLoadingIndicator: true,
            }),
            window.instantsearch.widgets.hits({
              container: '#hits',
              templates: {
                item: `
                  <div class="hit">
                    <h3 class="hit-title">
                      <a href="{{url}}">{{hierarchy.lvl1}}</a>
                    </h3>
                    <p class="hit-description">{{content}}</p>
                  </div>
                `,
                empty: '<div class="no-results">No results found</div>'
              }
            })
          ]);

          search.start();
        }
      } catch (error) {
        console.error('Failed to initialize Meilisearch default UI:', error);
      }
    };

    initializeSearch();
  }, [hostUrl, apiKey, indexUid, placeholder]);

  return (
    <div>
      <div ref={searchRef} id="searchbox"></div>
      <div id="hits"></div>
    </div>
  );
};

// Extend window interface for TypeScript
declare global {
  interface Window {
    instantsearch: any;
    instantMeiliSearch: any;
  }
}

export default function NavbarSearch({ className }: Props): ReactNode {
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
      <MeilisearchDefaultSearch
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
