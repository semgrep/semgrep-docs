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
      debouncedNormalize();
    }
  });

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

