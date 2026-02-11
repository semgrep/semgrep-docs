import React, { useState } from 'react';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import styles from './styles.module.css';

export default function CopyToMarkdownButton(): JSX.Element | null {
  // Since this component is only used in DocItem/Content, we're always in a doc context
  const {metadata} = useDoc();
  const [buttonText, setButtonText] = useState('Copy as md');
  const [isLoading, setIsLoading] = useState(false);

  // Only show if we have a valid doc ID
  if (!metadata?.id) {
    return null;
  }

  // Construct the markdown file path using the doc ID
  // The doc ID is the file path relative to docs/ directory
  // Example: metadata.id = "getting-started/introduction" -> /docs/markdown/getting-started/introduction.md
  const getMarkdownPath = () => {
    const docId = metadata.id;
    
    // Handle index/homepage
    if (docId === 'Docs home' || docId === 'index' || !docId) {
      return '/docs/markdown/index.md';
    }
    
    // Add .md extension
    return `/docs/markdown/${docId}.md`;
  };

  const handleCopy = async () => {
    setIsLoading(true);
    const markdownPath = getMarkdownPath();
    const resetTextMS = 2000;
    const btnText = 'Copy as md';

    try {
      const response = await fetch(markdownPath);
      if (!response.ok) {
        throw new Error(`Failed to fetch markdown: ${response.status}`);
      }

      const markdownText = await response.text();

      // Create clipboard item within user gesture
      const clipboardItem = new ClipboardItem({
        'text/plain': Promise.resolve(markdownText),
      });

      await navigator.clipboard.write([clipboardItem]);
      setButtonText('Copied!');
      
      setTimeout(() => {
        setButtonText(btnText);
        setIsLoading(false);
      }, resetTextMS);
    } catch (err) {
      console.error('Error copying markdown:', err);
      setButtonText('Failed');
      
      setTimeout(() => {
        setButtonText(btnText);
        setIsLoading(false);
      }, resetTextMS);
    }
  };

  return (
    <button
      id="copy-docs-markdown-llm-button"
      className={styles.copyButton}
      onClick={handleCopy}
      disabled={isLoading}
      type="button"
    >
      {buttonText}
    </button>
  );
}
