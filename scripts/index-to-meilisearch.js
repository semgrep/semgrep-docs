#!/usr/bin/env node

const { MeiliSearch } = require('meilisearch');
const cheerio = require('cheerio');
const axios = require('axios');
const { URL } = require('url');
const fs = require('fs').promises;

// Configuration based on the original Algolia config
const config = {
  indexName: 'docs',
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
  },
  synonyms: [
    ['taint mode', 'taint tracking'],
    ['roles', 'RBAC'],
    ['single sign-on', 'SSO'],
    ['single sign on', 'SSO'],
    ['CI', 'continuous integration'],
    ['CI/CD', 'continuous integration'],
    ['pull request comments', 'PR comments'],
    ['merge request comments', 'MR comments'],
    ['Semgrep Cloud Platform', 'SCP'],
    ['Semgrep Supply Chain', 'SSC'],
    ['Identity provider', 'IdP'],
    ['Jira integration', 'Jira'],
    ['lockfileless', 'without lockfiles'],
    ['node.js', 'JavaScript'],
    ['nodejs', 'JavaScript'],
    ['click to fix', 'click-to-fix']
  ]
};

class MeilisearchIndexer {
  constructor() {
    const host = process.env.MEILISEARCH_HOST_URL || 'http://localhost:7700';
    const apiKey = process.env.MEILISEARCH_API_KEY || '';
    
    console.log(`🔌 Connecting to Meilisearch at: ${host}`);
    console.log(`🔑 Using API key: ${apiKey ? '***' + apiKey.slice(-4) : 'None'}`);
    
    this.client = new MeiliSearch({
      host,
      apiKey
    });
    this.index = null;
    this.documents = [];
    this.visitedUrls = new Set();
  }

  async initialize() {
    try {
      // Try to get existing index
      this.index = await this.client.getIndex(config.indexName);
      console.log('Connected to existing index:', config.indexName);
    } catch (error) {
      if (error.cause?.code === 'index_not_found') {
        // Index doesn't exist, create it
        console.log('Creating new index:', config.indexName);
        await this.client.createIndex(config.indexName, { primaryKey: 'id' });
        this.index = await this.client.getIndex(config.indexName);
        console.log('Created new index:', config.indexName);
      } else {
        throw error; // Re-throw unexpected errors
      }
    }

    // Configure searchable attributes and synonyms
    await this.configureIndex();
  }

  async configureIndex() {
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
      'docusaurus_tag'
    ]);

    // Set synonyms
    const synonymMap = {};
    config.synonyms.forEach((synonymGroup, index) => {
      synonymGroup.forEach(synonym => {
        synonymMap[synonym] = synonymGroup.filter(s => s !== synonym);
      });
    });
    await this.index.updateSynonyms(synonymMap);

    console.log('Index configuration updated');
  }

  async scrapeFromSitemap() {
    console.log('Fetching sitemap...');
    
    for (const sitemapUrl of config.sitemapUrls) {
      try {
        const response = await axios.get(sitemapUrl);
        const $ = cheerio.load(response.data, { xmlMode: true });
        
        $('url > loc').each((_, element) => {
          const url = $(element).text();
          if (this.shouldScrapeUrl(url)) {
            this.visitedUrls.add(url);
          }
        });
      } catch (error) {
        console.error('Error fetching sitemap:', error.message);
      }
    }

    console.log(`Found ${this.visitedUrls.size} URLs to scrape`);
  }

  shouldScrapeUrl(url) {
    // Check if URL matches stop patterns
    for (const stopPattern of config.stopUrls) {
      const pattern = stopPattern.replace(/\*/g, '.*');
      if (new RegExp(pattern).test(url)) {
        return false;
      }
    }

    // Check if URL starts with any of the start URLs
    return config.startUrls.some(startUrl => url.startsWith(startUrl.replace(/\/+$/, '')));
  }

  async scrapePage(url) {
    try {
      console.log('Scraping:', url);
      const response = await axios.get(url, {
        timeout: 10000,
        headers: {
          'User-Agent': 'Meilisearch Documentation Scraper'
        }
      });

      const $ = cheerio.load(response.data);
      const documents = [];

      // Extract hierarchy
      const hierarchy = {};
      Object.entries(config.selectors).forEach(([level, selector]) => {
        if (level.startsWith('lvl')) {
          let value = '';
          if (selector.global) {
            value = $(selector.selector).first().text().trim() || selector.defaultValue || '';
          } else {
            value = $(selector.selector).first().text().trim() || '';
          }
          hierarchy[level] = value;
        }
      });

      // Extract content sections
      const textElements = $(config.selectors.text);
      textElements.each((index, element) => {
        const text = $(element).text().trim();
        if (text && text.length > 10) { // Filter out very short content
          // Create a safe document ID (Meilisearch only allows alphanumeric, -, _)
          const urlHash = Buffer.from(url).toString('base64').replace(/[^a-zA-Z0-9]/g, '');
          const id = `doc_${urlHash}_${index}`;
          
          documents.push({
            id,
            url,
            url_without_anchor: url,
            anchor: `#${index}`,
            content: text,
            hierarchy: { ...hierarchy },
            type: 'content'
          });
        }
      });

      return documents;
    } catch (error) {
      console.error(`Error scraping ${url}:`, error.message);
      return [];
    }
  }

  async scrapeAllPages() {
    console.log('Starting to scrape pages...');
    
    for (const url of this.visitedUrls) {
      const pageDocuments = await this.scrapePage(url);
      this.documents.push(...pageDocuments);
      
      // Add a delay to be respectful to the server
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log(`Scraped ${this.documents.length} documents`);
  }

  async indexDocuments() {
    if (this.documents.length === 0) {
      console.log('No documents to index');
      return;
    }

    console.log(`Indexing ${this.documents.length} documents...`);
    
    // Clear existing documents
    await this.index.deleteAllDocuments();
    
    // Index new documents in batches
    const batchSize = 100;
    for (let i = 0; i < this.documents.length; i += batchSize) {
      const batch = this.documents.slice(i, i + batchSize);
      await this.index.addDocuments(batch);
      console.log(`Indexed batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(this.documents.length/batchSize)}`);
    }

    console.log('Indexing completed!');
  }

  async run() {
    await this.initialize();
    await this.scrapeFromSitemap();
    await this.scrapeAllPages();
    await this.indexDocuments();
  }
}

// Run the indexer
if (require.main === module) {
  const indexer = new MeilisearchIndexer();
  indexer.run().catch(console.error);
}

module.exports = MeilisearchIndexer;
