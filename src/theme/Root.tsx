import React from 'react';
import MeilisearchChatbotIntegrated from '../components/MeilisearchChatbotIntegrated';

export default function Root({children}: {children: React.ReactNode}): JSX.Element {
  const [isBrowser, setIsBrowser] = React.useState(false);

  React.useEffect(() => {
    setIsBrowser(true);
  }, []);

  const shouldEnableChatbot = () => {
    if (typeof window === 'undefined') return false;
    
    const isProduction = window.location.hostname === 'semgrep.dev';
    const isNetlifyPreview = window.location.hostname.includes('deploy-preview');
    const isTestingBranch = window.location.hostname.includes('meilisearch-testing') || isNetlifyPreview;
    const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    return isProduction || isNetlifyPreview || isTestingBranch || isDevelopment;
  };

  return (
    <>
      {children}
      {isBrowser && shouldEnableChatbot() && (
        <MeilisearchChatbotIntegrated 
          indexUid="semgrep_docs"
          standalone={false}
        />
      )}
    </>
  );
}

