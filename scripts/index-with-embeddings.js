#!/usr/bin/env node

const { MeiliSearch } = require('meilisearch');
const cheerio = require('cheerio');
const axios = require('axios');
const { URL } = require('url');
const fs = require('fs').promises;
const OpenAI = require('openai');

// Configuration
const config = {
  indexName: 'docs_semantic',
  embeddingModel: 'text-embedding-3-small', // OpenAI's latest, cheaper model
  batchSize: 100,
  maxTokens: 8000, // Limit for embedding model
  startUrls: [
    'https://semgrep.dev/docs/release-notes',
    'https://semgrep.dev/docs/rule-updates', 
    'https://semgrep.dev/docs'
  ],
  sitemapUrls: ['https://semgrep.dev/docs/sitemap.xml'],
  stopUrls: [
    'https://semgrep.dev/docs/tags/*',
    'https://semgrep.dev/docs/category/*'
  ],
  selectors: {
    lvl0: {
      selector: '.breadcrumbs > li:nth-child(2) span.breadcrumbs__link',
      global: true,
      defaultValue: 'Semgrep documentation'
    },
    lvl1: 'article h1',
    lvl2: 'article h2',
    lvl3: 'article h3',
    lvl4: 'article h4',
    lvl5: 'article h5, article td:first-child',
    lvl6: 'article h6',
    text: 'article p, article li, article td:last-child, article code, article div table td, article div table th'
  }
};

class SemanticMeilisearchIndexer {
  constructor() {
    this.client = new MeiliSearch({
      host: process.env.MEILISEARCH_HOST_URL || 'http://localhost:7700',
      apiKey: process.env.MEILISEARCH_API_KEY || ''
    });

    // Initialize OpenAI for embeddings (if API key provided)
    if (process.env.OPENAI_API_KEY) {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
      });
      console.log('✅ OpenAI embeddings enabled');
    } else {
      console.log('⚠️  OpenAI API key not found - proceeding without embeddings');
      console.log('   Set OPENAI_API_KEY environment variable to enable semantic search');
    }

    this.index = null;
  }

  async initialize() {
    try {
      // Try to get existing index
      this.index = await this.client.getIndex(config.indexName);
      console.log('Connected to existing index:', config.indexName);
    } catch (error) {
      if (error.cause?.code === 'index_not_found') {
        // Index doesn't exist, create it
        await this.client.createIndex(config.indexName, { primaryKey: 'id' });
        this.index = await this.client.getIndex(config.indexName);
        console.log('Created new index:', config.indexName);
      } else {
        throw error;
      }
    }

    await this.configureIndex();
  }

  async configureIndex() {
    console.log('Configuring index for semantic search...');

    // Configure embeddings if OpenAI is available
    if (this.openai) {
      await this.index.updateEmbedders({
        default: {
          source: 'userProvided',
          dimensions: 1536 // text-embedding-3-small dimensions
        }
      });
      console.log('✅ Embeddings configured');
    }

    // Set searchable attributes
    await this.index.updateSearchableAttributes([
      'hierarchy.lvl0',
      'hierarchy.lvl1', 
      'hierarchy.lvl2',
      'hierarchy.lvl3',
      'hierarchy.lvl4',
      'hierarchy.lvl5',
      'hierarchy.lvl6',
      'content',
      'type',
      'url'
    ]);

    // Set filterable attributes
    await this.index.updateFilterableAttributes([
      'type',
      'language',
      'version',
      'docusaurus_tag',
      'hierarchy.lvl0',
      'hierarchy.lvl1'
    ]);

    // Configure ranking rules for hybrid search
    await this.index.updateRankingRules([
      'words',
      'typo', 
      'proximity',
      'attribute',
      'sort',
      'exactness'
    ]);

    console.log('✅ Index configuration updated for semantic search');
  }

  async generateEmbedding(text) {
    if (!this.openai || !text || text.length < 10) {
      return null;
    }

    try {
      // Truncate text if too long for embedding model
      const truncatedText = text.length > config.maxTokens * 4 
        ? text.substring(0, config.maxTokens * 4) 
        : text;

      const response = await this.openai.embeddings.create({
        model: config.embeddingModel,
        input: truncatedText
      });

      return response.data[0].embedding;
    } catch (error) {
      console.error('Error generating embedding:', error.message);
      return null;
    }
  }

  async generateEmbeddingsForBatch(documents) {
    if (!this.openai) {
      return documents; // Return documents without embeddings
    }

    console.log(`Generating embeddings for ${documents.length} documents...`);
    const startTime = Date.now();

    // Process documents in smaller batches to avoid rate limits
    const embeddingBatchSize = 20;
    const results = [];

    for (let i = 0; i < documents.length; i += embeddingBatchSize) {
      const batch = documents.slice(i, i + embeddingBatchSize);
      
      // Prepare texts for embedding
      const texts = batch.map(doc => {
        // Combine hierarchy and content for better semantic understanding
        const hierarchyText = Object.values(doc.hierarchy)
          .filter(v => v && v.trim())
          .join(' > ');
        return `${hierarchyText}: ${doc.content}`.trim();
      });

      try {
        // Generate embeddings for the batch
        const response = await this.openai.embeddings.create({
          model: config.embeddingModel,
          input: texts
        });

        // Add embeddings to documents
        const batchWithEmbeddings = batch.map((doc, index) => ({
          ...doc,
          _vectors: {
            default: response.data[index].embedding
          }
        }));

        results.push(...batchWithEmbeddings);

        // Rate limiting - wait a bit between batches
        if (i + embeddingBatchSize < documents.length) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      } catch (error) {
        console.error(`Error generating embeddings for batch ${i}-${i + embeddingBatchSize}:`, error.message);
        // Add documents without embeddings if API fails
        results.push(...batch);
      }
    }

    const duration = (Date.now() - startTime) / 1000;
    console.log(`✅ Generated embeddings in ${duration.toFixed(2)}s`);

    return results;
  }

  async scrapeFromSitemap() {
    console.log('Fetching sitemap...');
    const allUrls = new Set();

    for (const sitemapUrl of config.sitemapUrls) {
      try {
        const response = await axios.get(sitemapUrl);
        const $ = cheerio.load(response.data, { xmlMode: true });
        
        $('loc').each((_, element) => {
          const url = $(element).text().trim();
          if (this.shouldScrapeUrl(url)) {
            allUrls.add(url);
          }
        });
      } catch (error) {
        console.error(`Error fetching sitemap ${sitemapUrl}:`, error.message);
      }
    }

    // Add start URLs
    config.startUrls.forEach(url => {
      if (this.shouldScrapeUrl(url)) {
        allUrls.add(url);
      }
    });

    console.log(`Found ${allUrls.size} URLs to scrape`);
    return Array.from(allUrls);
  }

  shouldScrapeUrl(url) {
    // Skip URLs that match stop patterns
    return !config.stopUrls.some(pattern => {
      const regex = new RegExp(pattern.replace('*', '.*'));
      return regex.test(url);
    });
  }

  async scrapeUrl(url) {
    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      const documents = [];

      // Extract hierarchy information
      const hierarchy = {};
      for (const [level, selector] of Object.entries(config.selectors)) {
        if (level === 'text') continue;
        
        const selectorConfig = typeof selector === 'object' ? selector : { selector };
        const elements = $(selectorConfig.selector);
        
        if (elements.length > 0) {
          const value = elements.first().text().trim() || selectorConfig.defaultValue || '';
          hierarchy[level] = value;
        }
      }

      // Extract content sections with better semantic chunking
      const textElements = $(config.selectors.text);
      textElements.each((index, element) => {
        const text = $(element).text().trim();
        if (text && text.length > 20) { // Slightly higher threshold for better content
          // Create a safe document ID
          const urlHash = Buffer.from(url).toString('base64').replace(/[^a-zA-Z0-9]/g, '');
          const id = `doc_${urlHash}_${index}`;
          
          documents.push({
            id,
            url,
            url_without_anchor: url,
            anchor: `#${index}`,
            content: text,
            hierarchy: { ...hierarchy },
            type: 'content',
            // Add searchable text combination for better semantic search
            searchableText: `${Object.values(hierarchy).filter(v => v).join(' ')} ${text}`.trim()
          });
        }
      });

      return documents;
    } catch (error) {
      console.error(`Error scraping ${url}:`, error.message);
      return [];
    }
  }

  async indexDocuments(documents) {
    if (documents.length === 0) return;

    console.log(`\nIndexing ${documents.length} documents with semantic embeddings...`);
    
    // Generate embeddings for all documents
    const documentsWithEmbeddings = await this.generateEmbeddingsForBatch(documents);

    // Index in batches
    const batchSize = config.batchSize;
    for (let i = 0; i < documentsWithEmbeddings.length; i += batchSize) {
      const batch = documentsWithEmbeddings.slice(i, i + batchSize);
      
      try {
        await this.index.addDocuments(batch);
        console.log(`Indexed batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(documentsWithEmbeddings.length / batchSize)}`);
      } catch (error) {
        console.error(`Error indexing batch ${i}-${i + batchSize}:`, error.message);
      }
    }

    console.log('✅ Semantic indexing completed!');
  }

  async run() {
    try {
      await this.initialize();
      
      const urls = await this.scrapeFromSitemap();
      console.log('Starting to scrape pages...');
      
      let allDocuments = [];
      for (const url of urls) {
        console.log(`Scraping: ${url}`);
        const documents = await this.scrapeUrl(url);
        allDocuments.push(...documents);
      }

      console.log(`\nScraped ${allDocuments.length} documents`);
      await this.indexDocuments(allDocuments);
      
    } catch (error) {
      console.error('Indexing failed:', error);
      process.exit(1);
    }
  }
}

// Run the indexer
if (require.main === module) {
  const indexer = new SemanticMeilisearchIndexer();
  indexer.run();
}

module.exports = SemanticMeilisearchIndexer;
