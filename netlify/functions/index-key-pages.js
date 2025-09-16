const { MeiliSearch } = require('meilisearch');
const axios = require('axios');
const { JSDOM } = require('jsdom');

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST' && event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Initialize Meilisearch client
    const client = new MeiliSearch({
      host: process.env.MEILISEARCH_HOST_URL || 'https://ms-0e8ae24505f7-30518.sfo.meilisearch.io',
      apiKey: process.env.MEILISEARCH_API_KEY || 'b7c62c6347d5a3032f73043eaa40546825c99bc6'
    });

    const indexName = 'semgrep_docs';
    
    // Create or get index
    let index;
    try {
      index = await client.getIndex(indexName);
    } catch (error) {
      if (error.cause?.code === 'index_not_found') {
        await client.createIndex(indexName, { primaryKey: 'id' });
        index = await client.getIndex(indexName);
      } else {
        throw error;
      }
    }

    // Configure index
    await index.updateSearchableAttributes([
      'title',
      'content',
      'hierarchy.lvl0',
      'hierarchy.lvl1',
      'hierarchy.lvl2',
      'hierarchy.lvl3'
    ]);

    await index.updateFilterableAttributes([
      'type',
      'section'
    ]);

    // Set synonyms for Semgrep-specific terms
    await index.updateSynonyms({
      'semgrep': ['semgrep', 'static analysis', 'security scanning', 'code analysis'],
      'rules': ['rules', 'patterns', 'detectors', 'custom rules'],
      'ci': ['ci', 'continuous integration', 'pipeline', 'github actions'],
      'sast': ['sast', 'static application security testing', 'code security'],
      'sca': ['sca', 'supply chain', 'dependencies', 'vulnerabilities'],
      'secrets': ['secrets', 'api keys', 'tokens', 'credentials'],
      'findings': ['findings', 'issues', 'vulnerabilities', 'results'],
      'deployment': ['deployment', 'setup', 'configuration', 'installation']
    });

    // Key pages to index (most important documentation)
    const keyPages = [
      'https://semgrep.dev/docs/writing-rules',
      'https://semgrep.dev/docs/writing-rules/overview',
      'https://semgrep.dev/docs/writing-rules/rule-syntax',
      'https://semgrep.dev/docs/writing-rules/testing-rules',
      'https://semgrep.dev/docs/writing-rules/private-rules',
      'https://semgrep.dev/docs/getting-started',
      'https://semgrep.dev/docs/getting-started/quickstart',
      'https://semgrep.dev/docs/semgrep-ci',
      'https://semgrep.dev/docs/semgrep-ci/overview',
      'https://semgrep.dev/docs/semgrep-ci/github-actions',
      'https://semgrep.dev/docs/semgrep-code',
      'https://semgrep.dev/docs/semgrep-code/overview',
      'https://semgrep.dev/docs/semgrep-secrets',
      'https://semgrep.dev/docs/semgrep-secrets/overview',
      'https://semgrep.dev/docs/semgrep-supply-chain',
      'https://semgrep.dev/docs/semgrep-supply-chain/overview',
      'https://semgrep.dev/docs/kb',
      'https://semgrep.dev/docs/cheat-sheets'
    ];

    const documents = [];
    
    for (const url of keyPages) {
      try {
        console.log('Scraping:', url);
        const response = await axios.get(url, {
          timeout: 10000,
          headers: {
            'User-Agent': 'Semgrep Docs Meilisearch Indexer'
          }
        });

        const dom = new JSDOM(response.data);
        const document = dom.window.document;
        
        const h1Element = document.querySelector('h1');
        const titleElement = document.querySelector('title');
        const title = (h1Element ? h1Element.textContent : '') || (titleElement ? titleElement.textContent : '');

        const breadcrumbElement = document.querySelector('.breadcrumbs > li:nth-child(2) span, .breadcrumbs__link');
        const lvl1Element = document.querySelector('article h1, .theme-doc-markdown h1');
        const lvl2Element = document.querySelector('article h2, .theme-doc-markdown h2');
        const lvl3Element = document.querySelector('article h3, .theme-doc-markdown h3');

        const hierarchy = {
          lvl0: (breadcrumbElement ? breadcrumbElement.textContent : '') || 'Semgrep Documentation',
          lvl1: (lvl1Element ? lvl1Element.textContent : '') || title,
          lvl2: lvl2Element ? lvl2Element.textContent : '',
          lvl3: lvl3Element ? lvl3Element.textContent : ''
        };

        // Extract content sections
        const contentElements = document.querySelectorAll('article p, article li, article code, article td, article pre, article blockquote');
        contentElements.forEach((element, index) => {
          const text = element.textContent ? element.textContent.trim() : '';
          if (text && text.length > 20) {
            const id = `semgrep_doc_${Buffer.from(url).toString('base64').replace(/[^a-zA-Z0-9]/g, '')}_${index}`;
            
            documents.push({
              id,
              url,
              title: title,
              content: text,
              hierarchy: { ...hierarchy },
              type: 'content',
              section: hierarchy.lvl0
            });
          }
        });

        // Add delay to be respectful
        await new Promise(resolve => setTimeout(resolve, 100));

      } catch (error) {
        console.error(`Error scraping ${url}:`, error.message);
      }
    }

    // Clear existing documents and index new ones
    await index.deleteAllDocuments();
    
    if (documents.length > 0) {
      // Index in batches
      const batchSize = 100;
      for (let i = 0; i < documents.length; i += batchSize) {
        const batch = documents.slice(i, i + batchSize);
        await index.addDocuments(batch);
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: `Indexed ${documents.length} documents from ${keyPages.length} key pages`,
        documentsCount: documents.length,
        pagesScraped: keyPages.length
      })
    };

  } catch (error) {
    console.error('Indexing error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Indexing failed',
        message: error.message 
      })
    };
  }
};
