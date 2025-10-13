// Normalize search results - hide generic category labels and add result count
(function() {
  'use strict';

  // List of generic breadcrumb labels to hide
  const GENERIC_LABELS = [
    'USE CASES',
    'PREREQUISITES', 
    'GETTING STARTED',
    'DEPLOYMENT',
    'INTEGRATIONS',
    'CONFIGURATION',
    'ADVANCED',
    'REFERENCE',
    'API',
    'EXAMPLES'
  ];

  // Popular/suggested docs to show when search is empty
  const SUGGESTED_DOCS = [
    { title: 'Quickstart', section: 'Get started', url: '/docs/getting-started/quickstart' },
    { title: 'Write custom rules', section: 'SAST (Code)', url: '/docs/semgrep-code/write-custom-rules' },
    { title: 'CLI reference', section: 'References', url: '/docs/cli-reference' },
    { title: 'Local CLI scans', section: 'Semgrep OSS', url: '/docs/semgrep-code/semgrep-oss/cli-oss' },
    { title: 'Set rules through Policies', section: 'SAST (Code)', url: '/docs/semgrep-code/policies' },
    { title: 'Supported languages', section: 'Get started', url: '/docs/supported-languages' },
    { title: 'Core deployment', section: 'Set up and deploy scans', url: '/docs/deployment/core-deployment' },
    { title: 'Triage and remediation', section: 'SAST (Code)', url: '/docs/semgrep-code/triage-remediation' }
  ];

  function addResultCount() {
    // Find the search results container
    const searchResults = document.querySelectorAll('.MarkpromptSearchResult');
    const searchContainer = document.querySelector('.MarkpromptSearchResults');
    
    if (!searchContainer || searchResults.length === 0) {
      return;
    }

    // Check if we already added a counter
    let counter = document.querySelector('.search-result-count');
    
    if (!counter) {
      counter = document.createElement('div');
      counter.className = 'search-result-count';
      // Insert at the beginning of the search results
      searchContainer.insertBefore(counter, searchContainer.firstChild);
    }

    // Update the count
    const count = searchResults.length;
    const plural = count === 1 ? 'result' : 'results';
    counter.textContent = `${count} ${plural} found`;
  }

  function normalizeSearchResults() {
    const searchResults = document.querySelectorAll('.MarkpromptSearchResult');
    
    if (searchResults.length === 0) {
      return;
    }

    searchResults.forEach((result) => {
      const subtitles = result.querySelectorAll('.MarkpromptSearchResultSubtitle');
      
      // If there are multiple subtitle elements, check if any are generic labels
      subtitles.forEach((subtitle) => {
        const text = subtitle.textContent.trim().toUpperCase();
        
        // Hide generic category labels
        if (GENERIC_LABELS.includes(text)) {
          subtitle.classList.add('hide-generic');
        }
      });
    });

    // Add result count after normalizing
    addResultCount();
  }

  function showSuggestedDocs() {
    const searchInput = document.querySelector('.MarkpromptSearchInput, input[type="search"]');
    const searchContainer = document.querySelector('.MarkpromptSearchResults');
    
    if (!searchContainer) return;
    
    // Only show suggestions if search is empty or has minimal input
    const query = searchInput?.value?.trim() || '';
    if (query.length > 0) return;
    
    // Check if suggestions already exist
    if (document.querySelector('.suggested-docs-container')) return;
    
    // Create suggestions container
    const suggestionsContainer = document.createElement('div');
    suggestionsContainer.className = 'suggested-docs-container';
    
    const header = document.createElement('div');
    header.className = 'suggested-docs-header';
    header.textContent = 'Popular pages';
    suggestionsContainer.appendChild(header);
    
    // Create suggestion items
    SUGGESTED_DOCS.forEach(doc => {
      const item = document.createElement('a');
      item.className = 'MarkpromptSearchResult suggested-doc-item';
      item.href = doc.url;
      
      const section = document.createElement('div');
      section.className = 'MarkpromptSearchResultSubtitle';
      section.textContent = doc.section;
      
      const title = document.createElement('h3');
      title.className = 'MarkpromptSearchResultHeading';
      title.textContent = doc.title;
      
      item.appendChild(section);
      item.appendChild(title);
      suggestionsContainer.appendChild(item);
    });
    
    // Clear existing content and add suggestions
    searchContainer.innerHTML = '';
    searchContainer.appendChild(suggestionsContainer);
  }

  function removeSuggestedDocs() {
    const suggestionsContainer = document.querySelector('.suggested-docs-container');
    if (suggestionsContainer) {
      suggestionsContainer.remove();
    }
  }

  // Debounce function to prevent too many calls
  let debounceTimer;
  function debouncedNormalize() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(normalizeSearchResults, 150);
  }

  // Watch for search results to appear - only watch the search dialog
  const observer = new MutationObserver((mutations) => {
    // Check if any mutations involve search results
    const hasSearchResults = mutations.some(mutation => 
      Array.from(mutation.addedNodes).some(node => 
        node.nodeType === 1 && 
        (node.classList?.contains('MarkpromptSearchResult') || 
         node.querySelector?.('.MarkpromptSearchResult'))
      )
    );
    
    if (hasSearchResults) {
      removeSuggestedDocs(); // Remove suggestions when real results appear
      debouncedNormalize();
    }
  });

  // Watch for search input changes
  function setupSearchListeners() {
    const searchInput = document.querySelector('.MarkpromptSearchInput, input[type="search"]');
    
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        
        if (query.length === 0) {
          // Show suggestions when search is cleared
          setTimeout(showSuggestedDocs, 300);
        } else {
          // Remove suggestions when user types
          removeSuggestedDocs();
        }
      });
    }
  }

  // Watch for dialog opening
  function watchForDialogOpen() {
    const dialogObserver = new MutationObserver(() => {
      const dialog = document.querySelector('[role="dialog"]');
      const searchInput = document.querySelector('.MarkpromptSearchInput, input[type="search"]');
      
      if (dialog && searchInput) {
        setupSearchListeners();
        // Show suggestions after dialog opens if search is empty
        setTimeout(showSuggestedDocs, 200);
      }
    });
    
    dialogObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // Start observing when DOM is ready
  function startObserving() {
    // Only observe the dialog/modal area if it exists
    const searchDialog = document.querySelector('[role="dialog"]') || 
                         document.querySelector('.MarkpromptContentDialog') ||
                         document.body;
    
    observer.observe(searchDialog, {
      childList: true,
      subtree: true
    });
    
    // Start watching for dialog opens
    watchForDialogOpen();
    
    normalizeSearchResults();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startObserving);
  } else {
    startObserving();
  }

  // Run once after a short delay
  setTimeout(normalizeSearchResults, 1000);
})();

