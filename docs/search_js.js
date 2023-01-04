function replaceEmptySearchResults() {
  let emptyResults = document.getElementById('mkdocs-search-results');
  let updatedResults = '<p>Sorry, no results found in the docs. Try searching the <a href="https://semgrep.dev/r">Semgrep Registry</a> for related rules or ask a question in the <a href="https://go.semgrep.dev/slack">Semgrep community Slack</a>.</p>';
  emptyResults.innerHTML = updatedResults;
}

let hasSearchResults = document.getElementById('mkdocs-search-results');

if (hasSearchResults) {
  const config = { attributes: true, childList: true, subtree: true };
  const callback = function(mutationsList) {
    for(const mutation of mutationsList) {
        if (mutation.target.innerHTML === '<p>No results found</p>') {
          replaceEmptySearchResults();
        }
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(hasSearchResults, config);
}