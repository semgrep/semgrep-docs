// Deployment configuration utilities
// Detects deployment context using environment variables

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export type DeployContext = 'production' | 'deploy-preview' | 'branch-deploy' | 'development';

export interface DeploymentConfig {
  context: DeployContext;
  deployUrl: string;
  meilisearchHostUrl: string;
  meilisearchIndexUid: string;
  meilisearchSearchKey: string;
  isProduction: boolean;
  isPreview: boolean;
  isDevelopment: boolean;
  shouldUseNetlifyFunctions: boolean;
}

export function useDeploymentConfig(): DeploymentConfig {
  const context = useDocusaurusContext();
  const customFields = context.siteConfig.customFields || {};

  const deployContext = (customFields.deployContext as string) || 'development';
  const deployUrl = (customFields.deployUrl as string) ||
                    (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');
  const meilisearchHostUrl = (customFields.meilisearchHostUrl as string) ||
                             'https://ms-3ade175771ef-34593.sfo.meilisearch.io';
  const meilisearchIndexUid = (customFields.meilisearchIndexUid as string) || 'semgrep_docs_2';
  const meilisearchSearchKey = (customFields.meilisearchSearchKey as string) || '';

  let normalizedContext: DeployContext = 'development';
  if (deployContext === 'production') {
    normalizedContext = 'production';
  } else if (deployContext === 'deploy-preview') {
    normalizedContext = 'deploy-preview';
  } else if (deployContext === 'branch-deploy') {
    normalizedContext = 'branch-deploy';
  } else if (deployContext === 'development' || deployContext === 'dev') {
    normalizedContext = 'development';
  } else if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname === 'semgrep.dev') {
      normalizedContext = 'production';
    } else if (hostname.includes('deploy-preview')) {
      normalizedContext = 'deploy-preview';
    } else if (hostname.includes('netlify.app')) {
      normalizedContext = 'branch-deploy';
    }
  }

  const isProduction = normalizedContext === 'production';
  const isPreview = normalizedContext === 'deploy-preview';
  const isDevelopment = normalizedContext === 'development';
  const shouldUseNetlifyFunctions = isProduction || isPreview || normalizedContext === 'branch-deploy';

  return {
    context: normalizedContext,
    deployUrl,
    meilisearchHostUrl,
    meilisearchIndexUid,
    meilisearchSearchKey,
    isProduction,
    isPreview,
    isDevelopment,
    shouldUseNetlifyFunctions,
  };
}

export function getMeilisearchUrl(config: DeploymentConfig): string {
  if (config.shouldUseNetlifyFunctions) {
    return `${config.deployUrl}/.netlify/functions/meilisearch`;
  }
  return config.meilisearchHostUrl;
}

export function getMeilisearchChatUrl(config: DeploymentConfig): string {
  if (config.shouldUseNetlifyFunctions) {
    return `${config.deployUrl}/.netlify/functions/meilisearch-chat`;
  }
  return `${config.meilisearchHostUrl}/chat`;
}

export function shouldEnableChatbot(config: DeploymentConfig): boolean {
  return true;
}

export function shouldEnableSearch(config: DeploymentConfig): boolean {
  return true;
}
