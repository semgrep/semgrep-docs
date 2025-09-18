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

    // Set up OpenAI embedder for hybrid search
    try {
      await client.createEmbedder('default', {
        source: 'openai',
        model: 'text-embedding-3-small',
        apiKey: process.env.OPENAI_API_KEY
      });
      console.log('✅ OpenAI embedder configured for hybrid search');
    } catch (error) {
      if (error.cause?.code === 'embedder_already_exists') {
        console.log('ℹ️  OpenAI embedder already exists, continuing...');
      } else {
        console.log('⚠️  Could not configure OpenAI embedder:', error.message);
        console.log('⚠️  Error details:', error);
      }
    }

    // Get all URLs from sitemap
    const visitedUrls = new Set();
    
    try {
      const sitemapResponse = await axios.get('https://semgrep.dev/docs/sitemap.xml');
      const dom = new JSDOM(sitemapResponse.data, { contentType: 'text/xml' });
      const document = dom.window.document;
      
      const urlElements = document.querySelectorAll('url > loc');
      urlElements.forEach(element => {
        const url = element.textContent;
        if (url && url.startsWith('https://semgrep.dev/docs')) {
          visitedUrls.add(url);
        }
      });
    } catch (error) {
      console.error('Error fetching sitemap:', error.message);
    }

    console.log(`Found ${visitedUrls.size} URLs to scrape`);

    // Process URLs in batches to avoid timeout
    const allUrls = Array.from(visitedUrls);
    const batchSize = 20; // Process 20 pages at a time
    const totalBatches = Math.ceil(allUrls.length / batchSize);
    
    let allDocuments = [];
    
    // Get batch number from query parameter or start with 0
    const batchNumber = parseInt(event.queryStringParameters?.batch || '0');
    const startIndex = batchNumber * batchSize;
    const endIndex = Math.min(startIndex + batchSize, allUrls.length);
    const currentBatch = allUrls.slice(startIndex, endIndex);
    
    console.log(`Processing batch ${batchNumber + 1}/${totalBatches} (pages ${startIndex + 1}-${endIndex})`);
    
    for (const url of currentBatch) {
      try {
        const response = await axios.get(url, {
          timeout: 8000,
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
            
            allDocuments.push({
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
        await new Promise(resolve => setTimeout(resolve, 50));

      } catch (error) {
        console.error(`Error scraping ${url}:`, error.message);
      }
    }

    // Index documents for this batch
    if (allDocuments.length > 0) {
      // For first batch, clear existing documents
      if (batchNumber === 0) {
        await index.deleteAllDocuments();
      }
      
      // Index in smaller batches
      const docBatchSize = 100;
      for (let i = 0; i < allDocuments.length; i += docBatchSize) {
        const docBatch = allDocuments.slice(i, i + docBatchSize);
        await index.addDocuments(docBatch);
      }
    }

    const isComplete = batchNumber + 1 >= totalBatches;
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: `Processed batch ${batchNumber + 1}/${totalBatches}`,
        batchNumber: batchNumber + 1,
        totalBatches: totalBatches,
        documentsInBatch: allDocuments.length,
        totalUrls: allUrls.length,
        isComplete: isComplete,
        nextBatchUrl: isComplete ? null : `?batch=${batchNumber + 1}`
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
