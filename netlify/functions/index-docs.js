const { MeiliSearch } = require('meilisearch');
const axios = require('axios');
const cheerio = require('cheerio');

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
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

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Initialize Meilisearch client
    const client = new MeiliSearch({
      host: process.env.MEILISEARCH_HOST_URL || 'http://localhost:7700',
      apiKey: process.env.MEILISEARCH_API_KEY || ''
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

    // Scrape Semgrep docs
    const documents = [];
    const visitedUrls = new Set();

    // Get sitemap
    try {
      const sitemapResponse = await axios.get('https://semgrep.dev/docs/sitemap.xml');
      const $ = cheerio.load(sitemapResponse.data, { xmlMode: true });
      
      $('url > loc').each((_, element) => {
        const url = $(element).text();
        if (url.startsWith('https://semgrep.dev/docs')) {
          visitedUrls.add(url);
        }
      });
    } catch (error) {
      console.error('Error fetching sitemap:', error.message);
    }

    // Scrape pages (limit to first 50 for demo)
    const urlsToScrape = Array.from(visitedUrls).slice(0, 50);
    
    for (const url of urlsToScrape) {
      try {
        const response = await axios.get(url, {
          timeout: 10000,
          headers: {
            'User-Agent': 'Semgrep Docs Meilisearch Indexer'
          }
        });

        const $ = cheerio.load(response.data);
        const title = $('h1').first().text().trim() || $('title').text().trim();

        const hierarchy = {
          lvl0: $('.breadcrumbs > li:nth-child(2) span, .breadcrumbs__link').first().text().trim() || 'Semgrep Documentation',
          lvl1: $('article h1, .theme-doc-markdown h1').first().text().trim() || title,
          lvl2: $('article h2, .theme-doc-markdown h2').first().text().trim() || '',
          lvl3: $('article h3, .theme-doc-markdown h3').first().text().trim() || ''
        };

        // Extract content sections
        const contentElements = $('article p, article li, article code, article td, article pre, article blockquote');
        contentElements.each((index, element) => {
          const text = $(element).text().trim();
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
        message: `Indexed ${documents.length} documents from ${urlsToScrape.length} pages`,
        documentsCount: documents.length,
        pagesScraped: urlsToScrape.length
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
