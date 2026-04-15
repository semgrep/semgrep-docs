import React from 'react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import MeilisearchChatbotIntegrated from '../components/MeilisearchChatbotIntegrated';
import { useDeploymentConfig, shouldEnableChatbot } from '../utils/deploymentConfig';

export default function Root({children}: {children: React.ReactNode}): JSX.Element {
  const [isBrowser, setIsBrowser] = React.useState(false);
  const config = useDeploymentConfig();

  React.useEffect(() => {
    setIsBrowser(true);
  }, []);

  const chatbotEnabled = shouldEnableChatbot(config);

  return (
    <>
      {children}
      <Tooltip id="glossary-tooltip" place="top" effect="solid" clickable />
      {isBrowser && chatbotEnabled && (
        <MeilisearchChatbotIntegrated 
          indexUid={config.meilisearchIndexUid}
          standalone={false}
        />
      )}
    </>
  );
}

