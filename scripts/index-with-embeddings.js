#!/usr/bin/env node

const { MeiliSearch } = require('meilisearch');
const cheerio = require('cheerio');
const axios = require('axios');
const { URL } = require('url');
const fs = require('fs').promises;
const OpenAI = require('openai');
const { pipeline } = require('@xenova/transformers');

// Configuration
const config = {
  indexName: 'docs',
  embeddingModel: 'text-embedding-3-small', // OpenAI's latest, cheaper model
  batchSize: 100,
  maxTokens: 8000, // Limit for embedding model
  semanticRatio: 0.5, // Hybrid search: 50% semantic, 50% text (ratio not shown in UI)
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

    // Initialize embedding system
    if (process.env.OPENAI_API_KEY) {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
      });
      this.embeddingMethod = 'openai';
      console.log('✅ OpenAI embeddings enabled');
    } else {
      console.log('🤖 No OpenAI key found - using local embeddings');
      this.embeddingMethod = 'local';
      this.localEmbedder = null; // Will be initialized lazily
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

    // Configure embeddings with document templates for better semantic understanding
    if (this.embeddingMethod === 'openai') {
      await this.index.updateEmbedders({
        default: {
          source: 'userProvided',
          dimensions: 1536, // text-embedding-3-small dimensions
          documentTemplate: '{{hierarchy.lvl0}} > {{hierarchy.lvl1}} > {{hierarchy.lvl2}}: {{content}}'
        }
      });
      console.log('✅ OpenAI embeddings configured with document template');
    } else if (this.embeddingMethod === 'local') {
      await this.index.updateEmbedders({
        default: {
          source: 'userProvided',
          dimensions: 384, // sentence-transformers/all-MiniLM-L6-v2 dimensions
          documentTemplate: '{{hierarchy.lvl0}} > {{hierarchy.lvl1}} > {{hierarchy.lvl2}}: {{content}}'
        }
      });
      console.log('✅ Local embeddings configured with document template');
    }

    // Set searchable attributes with enhanced content types
    await this.index.updateSearchableAttributes([
      'hierarchy.lvl0',
      'hierarchy.lvl1', 
      'hierarchy.lvl2',
      'hierarchy.lvl3',
      'hierarchy.lvl4',
      'hierarchy.lvl5',
      'hierarchy.lvl6',
      'content',
      'searchableText',
      'context',
      'type',
      'url'
    ]);

    // Set filterable attributes for better filtering
    await this.index.updateFilterableAttributes([
      'type',
      'priority',
      'language',
      'version',
      'docusaurus_tag',
      'hierarchy.lvl0',
      'hierarchy.lvl1',
      'hierarchy.lvl2'
    ]);

    // Set sortable attributes for better ranking
    await this.index.updateSortableAttributes([
      'priority',
      'hierarchy.lvl0',
      'hierarchy.lvl1'
    ]);

    // Set enhanced synonyms for Semgrep-specific terms
    await this.index.updateSynonyms({
      // Core Semgrep concepts
      'semgrep': ['semgrep', 'static analysis', 'security scanning', 'code analysis', 'sast tool', 'code security tool'],
      'rules': ['rules', 'patterns', 'detectors', 'custom rules', 'rule writing', 'semgrep rules', 'detection rules'],
      'findings': ['findings', 'issues', 'vulnerabilities', 'results', 'matches', 'detections', 'security issues'],
      'registry': ['registry', 'semgrep registry', 'rule registry', 'ruleset', 'rulesets'],
      
      // CI/CD and deployment
      'ci': ['ci', 'continuous integration', 'pipeline', 'github actions', 'gitlab ci', 'automation', 'cicd'],
      'deployment': ['deployment', 'setup', 'configuration', 'installation', 'integration', 'onboarding'],
      'workflow': ['workflow', 'pipeline', 'automation', 'ci/cd', 'devops', 'build pipeline'],
      'pr': ['pr', 'pull request', 'merge request', 'mr', 'code review'],
      
      // Security concepts
      'sast': ['sast', 'static application security testing', 'code security', 'security analysis', 'static analysis'],
      'sca': ['sca', 'supply chain', 'dependencies', 'vulnerabilities', 'dependency scanning', 'supply chain analysis'],
      'secrets': ['secrets', 'api keys', 'tokens', 'credentials', 'sensitive data', 'secret detection'],
      'taint': ['taint', 'taint analysis', 'data flow', 'taint mode', 'taint tracking', 'taint propagation'],
      'reachability': ['reachability', 'reachable', 'unreachable', 'dead code', 'code reachability'],
      
      // Semgrep products and editions
      'sms': ['sms', 'semgrep managed scanning', 'managed scans', 'cloud scanning', 'managed service'],
      'scp': ['scp', 'semgrep cloud platform', 'semgrep app', 'semgrep platform', 'appsec platform'],
      'ssc': ['ssc', 'semgrep supply chain', 'supply chain security', 'dependency security', 'supply chain analysis'],
      'oss': ['oss', 'open source', 'community edition', 'free version', 'semgrep ce', 'community'],
      'pro': ['pro', 'semgrep pro', 'commercial', 'paid version', 'enterprise', 'professional'],
      'ce': ['ce', 'community edition', 'open source', 'free', 'oss'],
      
      // Technical concepts
      'metavariables': ['metavariables', 'variables', 'placeholders', 'pattern variables', 'metavars'],
      'autofix': ['autofix', 'automatic fixes', 'remediation', 'code fixes', 'auto fix', 'fix suggestions'],
      'patterns': ['patterns', 'rules', 'expressions', 'syntax patterns', 'semgrep patterns'],
      'cross-file': ['cross-file', 'interfile', 'cross file', 'inter-file', 'multi-file'],
      'cross-function': ['cross-function', 'interfunction', 'cross function', 'inter-function', 'multi-function'],
      'reachability': ['reachability', 'reachable', 'unreachable', 'dead code', 'code reachability'],
      
      // Integration & auth
      'sso': ['sso', 'single sign-on', 'single sign on', 'authentication', 'identity'],
      'saml': ['saml', 'identity provider', 'idp', 'federation', 'saml sso'],
      'github': ['github', 'git', 'version control', 'repository', 'github.com'],
      'gitlab': ['gitlab', 'git', 'version control', 'repository', 'gitlab.com'],
      'bitbucket': ['bitbucket', 'atlassian', 'bitbucket cloud', 'bitbucket server'],
      
      // File types and languages
      'javascript': ['javascript', 'js', 'node.js', 'nodejs', 'typescript', 'ts', 'ecmascript'],
      'python': ['python', 'py', 'django', 'flask', 'python3', 'python2'],
      'java': ['java', 'spring', 'maven', 'gradle', 'jvm', 'kotlin'],
      'go': ['go', 'golang', 'golang.org'],
      'csharp': ['csharp', 'c#', 'dotnet', '.net', 'microsoft'],
      'php': ['php', 'laravel', 'symfony', 'wordpress'],
      'ruby': ['ruby', 'rails', 'ruby on rails', 'gem'],
      'rust': ['rust', 'cargo', 'rustlang'],
      'cpp': ['cpp', 'c++', 'c plus plus', 'cxx'],
      'c': ['c', 'c language', 'ansi c'],
      
      // Common terms
      'config': ['config', 'configuration', 'settings', 'setup', 'yaml', 'yml'],
      'policy': ['policy', 'policies', 'governance', 'compliance', 'rule policy'],
      'ignore': ['ignore', 'exclude', 'suppress', 'disable', 'skip', 'semgrepignore'],
      'scan': ['scan', 'scanning', 'analysis', 'check', 'run', 'execute'],
      'baseline': ['baseline', 'baseline scan', 'initial scan', 'first scan'],
      'diff': ['diff', 'differential', 'incremental', 'changed code', 'pr scan'],
      'full': ['full', 'complete', 'entire', 'whole', 'full scan'],
      
      // Semgrep-specific features
      'click-to-fix': ['click-to-fix', 'click to fix', 'autofix', 'one-click fix', 'quick fix'],
      'lockfileless': ['lockfileless', 'without lockfiles', 'no lockfile', 'lockfile free'],
      'rbac': ['rbac', 'roles', 'role-based access', 'permissions', 'access control'],
      'jira': ['jira', 'atlassian jira', 'jira integration', 'ticket system'],
      'slack': ['slack', 'slack integration', 'notifications', 'alerts'],
      'webhook': ['webhook', 'webhooks', 'api integration', 'callback'],
      
      // Vulnerability types
      'injection': ['injection', 'sql injection', 'code injection', 'command injection', 'xss'],
      'xss': ['xss', 'cross-site scripting', 'script injection', 'dom xss'],
      'xxe': ['xxe', 'xml external entity', 'xml injection', 'billion laughs'],
      'deserialization': ['deserialization', 'unserialize', 'pickle', 'java deserialization'],
      'path-traversal': ['path traversal', 'directory traversal', 'file inclusion', 'lfi', 'rfi'],
      'csrf': ['csrf', 'cross-site request forgery', 'request forgery'],
      'ssrf': ['ssrf', 'server-side request forgery', 'request smuggling'],
      
      // Framework-specific
      'express': ['express', 'express.js', 'node express', 'express framework'],
      'spring': ['spring', 'spring boot', 'spring framework', 'java spring'],
      'django': ['django', 'django framework', 'python django'],
      'laravel': ['laravel', 'php laravel', 'laravel framework'],
      'react': ['react', 'react.js', 'reactjs', 'facebook react'],
      'angular': ['angular', 'angularjs', 'angular framework'],
      'nextjs': ['nextjs', 'next.js', 'next js', 'vercel next']
    });

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
    if (!text || text.length < 10) {
      return null;
    }

    try {
      if (this.embeddingMethod === 'openai') {
        // Truncate text if too long for embedding model
        const truncatedText = text.length > config.maxTokens * 4 
          ? text.substring(0, config.maxTokens * 4) 
          : text;

        const response = await this.openai.embeddings.create({
          model: config.embeddingModel,
          input: truncatedText
        });

        return response.data[0].embedding;
      } else if (this.embeddingMethod === 'local') {
        // Initialize local embedder if not already done
        if (!this.localEmbedder) {
          console.log('🔄 Loading local embedding model (first time may take a moment)...');
          this.localEmbedder = await pipeline('feature-extraction', 'sentence-transformers/all-MiniLM-L6-v2');
          console.log('✅ Local embedding model loaded');
        }

        // Truncate text for local model
        const truncatedText = text.length > 500 
          ? text.substring(0, 500) 
          : text;

        const embeddings = await this.localEmbedder(truncatedText, {
          pooling: 'mean',
          normalize: true
        });

        return Array.from(embeddings.data);
      }
    } catch (error) {
      console.error('Error generating embedding:', error.message);
      return null;
    }
  }

  async generateEmbeddingsForBatch(documents) {
    if (this.embeddingMethod !== 'openai' && this.embeddingMethod !== 'local') {
      return documents; // Return documents without embeddings
    }

    console.log(`Generating embeddings for ${documents.length} documents...`);
    const startTime = Date.now();

    // Process documents in smaller batches to avoid rate limits
    const embeddingBatchSize = 20;
    const results = [];

    for (let i = 0; i < documents.length; i += embeddingBatchSize) {
      const batch = documents.slice(i, i + embeddingBatchSize);
      
      // Prepare texts for embedding with enhanced context
      const texts = batch.map(doc => {
        // Combine hierarchy, context, and content for better semantic understanding
        const hierarchyText = Object.values(doc.hierarchy)
          .filter(v => v && v.trim())
          .join(' > ');
        
        // Create enhanced text for technical documentation
        const contextText = doc.context ? `Context: ${doc.context}` : '';
        const typeText = doc.type ? `Type: ${doc.type}` : '';
        const priorityText = doc.priority ? `Priority: ${doc.priority}` : '';
        
        // Combine all elements for comprehensive semantic understanding
        const enhancedText = [
          hierarchyText,
          contextText,
          typeText,
          priorityText,
          doc.content
        ].filter(Boolean).join(' | ');
        
        return enhancedText.trim();
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

  extractSemanticSections($, hierarchy, url) {
    const documents = [];
    const urlHash = Buffer.from(url).toString('base64').replace(/[^a-zA-Z0-9]/g, '');
    
    // Extract different types of content with semantic understanding
    const contentTypes = [
      {
        type: 'code_example',
        selector: 'article pre code, article .code-block, article .highlight',
        priority: 0.9
      },
      {
        type: 'procedure',
        selector: 'article ol li, article ul li',
        priority: 0.8
      },
      {
        type: 'definition',
        selector: 'article dl dt, article dl dd',
        priority: 0.8
      },
      {
        type: 'warning_tip',
        selector: 'article .admonition, article .alert, article .tip, article .warning',
        priority: 0.7
      },
      {
        type: 'heading',
        selector: 'article h1, article h2, article h3, article h4, article h5, article h6',
        priority: 0.9
      },
      {
        type: 'paragraph',
        selector: 'article p',
        priority: 0.6
      }
    ];

    contentTypes.forEach(({ type, selector, priority }) => {
      $(selector).each((index, element) => {
        const text = $(element).text().trim();
        if (text && text.length > 15) {
          const id = `doc_${urlHash}_${type}_${index}`;
          
          // Extract context from surrounding elements
          const context = this.extractContext($, element);
          
          documents.push({
            id,
            url,
            url_without_anchor: url,
            anchor: `#${type}_${index}`,
            content: text,
            hierarchy: { ...hierarchy },
            type: type,
            priority: priority,
            context: context,
            // Enhanced searchable text with context
            searchableText: `${Object.values(hierarchy).filter(v => v).join(' ')} ${context} ${text}`.trim()
          });
        }
      });
    });

    return documents;
  }

  extractContext($, element) {
    // Extract surrounding context for better semantic understanding
    const $element = $(element);
    const context = [];
    
    // Get parent section context
    const parentSection = $element.closest('section, .section, .content');
    if (parentSection.length) {
      const sectionTitle = parentSection.find('h1, h2, h3, h4, h5, h6').first().text().trim();
      if (sectionTitle) context.push(sectionTitle);
    }
    
    // Get previous heading for context
    const prevHeading = $element.prevAll('h1, h2, h3, h4, h5, h6').first();
    if (prevHeading.length) {
      context.push(prevHeading.text().trim());
    }
    
    return context.join(' | ');
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

      // Extract content sections with better semantic chunking for technical docs
      const sections = this.extractSemanticSections($, hierarchy, url);
      documents.push(...sections);

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

  // Example search method demonstrating hybrid search capabilities
  async search(query, options = {}) {
    if (!this.index) {
      throw new Error('Index not initialized. Call initialize() first.');
    }

    const searchOptions = {
      q: query,
      limit: options.limit || 10,
      filter: options.filter || null,
      sort: options.sort || null,
      attributesToRetrieve: ['id', 'url', 'content', 'hierarchy', 'type', 'priority', 'context'],
      attributesToHighlight: ['content', 'hierarchy.lvl1', 'hierarchy.lvl2'],
      highlightPreTag: '<mark>',
      highlightPostTag: '</mark>'
    };

    // Note: semanticRatio not included in search request to avoid percentage display in UI
    // The search will use hybrid search (semantic + text) based on embedder configuration
    // but won't show the percentage breakdown bars in the results

    try {
      const results = await this.index.search(searchOptions);
      return results;
    } catch (error) {
      console.error('Search failed:', error);
      throw error;
    }
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
      
      console.log('\n🎉 Semantic indexing completed!');
      console.log('\nExample searches you can now perform:');
      console.log('- "How to set up Semgrep in CI/CD"');
      console.log('- "JavaScript XSS vulnerabilities"');
      console.log('- "Semgrep Pro vs Community Edition"');
      console.log('- "Cross-file analysis configuration"');
      console.log('- "Taint analysis examples"');
      
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
