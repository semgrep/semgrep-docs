import React from 'react';
import Layout from '@theme-original/Layout';
import type LayoutType from '@theme/Layout';
import type {WrapperProps} from '@docusaurus/types';
import AIAssistant from '@site/src/components/AIAssistant';

type Props = WrapperProps<typeof LayoutType>;

export default function LayoutWrapper(props: Props): JSX.Element {
  // Safe environment variable access for browser
  const markpromptKey = typeof window !== 'undefined' 
    ? (window as any).__MARKPROMPT_KEY__ || "your-markprompt-project-key"
    : "your-markprompt-project-key";
  
  const meilisearchUrl = typeof window !== 'undefined'
    ? (window as any).__MEILISEARCH_URL__ || "http://localhost:7700"
    : "http://localhost:7700";

  return (
    <>
      <Layout {...props} />
      <AIAssistant 
        projectKey={markpromptKey}
        placeholder="💬 Ask me anything about Semgrep..."
        apiUrl={meilisearchUrl}
      />
    </>
  );
}
