import React from 'react';
import Layout from '@theme-original/Layout';
import type LayoutType from '@theme/Layout';
import type {WrapperProps} from '@docusaurus/types';
import AIAssistant from '@site/src/components/AIAssistant';

type Props = WrapperProps<typeof LayoutType>;

export default function LayoutWrapper(props: Props): JSX.Element {
  return (
    <>
      <Layout {...props} />
      <AIAssistant 
        projectKey="your-markprompt-project-key"
        placeholder="💬 Ask me anything about Semgrep..."
        apiUrl="http://localhost:7700"
      />
    </>
  );
}
