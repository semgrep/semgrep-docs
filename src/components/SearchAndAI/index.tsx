import React from 'react';
import SemanticSearchBar from '@site/src/components/SemanticSearchBar';
import AIAssistant from '@site/src/components/AIAssistant';

interface SearchAndAIProps {
  // Search props
  searchHostUrl?: string;
  searchApiKey?: string;
  searchIndexUid?: string;
  searchPlaceholder?: string;
  hybridSearch?: boolean;
  semanticWeight?: number;
  
  // AI Assistant props
  markpromptProjectKey?: string;
  aiPlaceholder?: string;
  aiEnabled?: boolean;
}

const SearchAndAI: React.FC<SearchAndAIProps> = ({
  // Search defaults
  searchHostUrl = 'http://localhost:7700',
  searchApiKey = '',
  searchIndexUid = 'docs_semantic',
  searchPlaceholder = '🔍 Search docs...',
  hybridSearch = true,
  semanticWeight = 0.7,
  
  // AI defaults
  markpromptProjectKey = 'your-markprompt-project-key',
  aiPlaceholder = '💬 Ask me anything about Semgrep...',
  aiEnabled = true,
}) => {
  return (
    <>
      {/* Semantic Search Bar (for navbar) */}
      <SemanticSearchBar
        hostUrl={searchHostUrl}
        apiKey={searchApiKey}
        indexUid={searchIndexUid}
        placeholder={searchPlaceholder}
        hybridSearch={hybridSearch}
        semanticWeight={semanticWeight}
      />
      
      {/* AI Assistant (floating chat) - only if enabled */}
      {aiEnabled && (
        <AIAssistant
          projectKey={markpromptProjectKey}
          placeholder={aiPlaceholder}
          apiUrl={searchHostUrl}
        />
      )}
    </>
  );
};

export default SearchAndAI;
