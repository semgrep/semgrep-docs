# 🚀 Production Deployment Guide

## Required Changes for Production

### 1. 🔧 Update Search Configuration

**File: `src/theme/Navbar/Search/index.tsx`**
```tsx
export default function NavbarSearch({className}: Props): ReactNode {
  return (
    <div className={clsx(className, styles.navbarSearchContainer)}>
      <SemanticSearchBar 
        hostUrl={process.env.REACT_APP_MEILISEARCH_HOST_URL || "https://your-meilisearch-cloud.com"}
        apiKey={process.env.REACT_APP_MEILISEARCH_SEARCH_KEY || ""}
        indexUid="docs"
        placeholder="🔍 Search docs..."
        hybridSearch={false}
        semanticWeight={0.7}
      />
    </div>
  );
}
```

**File: `src/theme/Layout/index.tsx`**
```tsx
<AIAssistant 
  projectKey={process.env.REACT_APP_MARKPROMPT_PROJECT_KEY || "demo-mode"}
  placeholder="💬 Ask me anything about Semgrep..."
  apiUrl={process.env.REACT_APP_MEILISEARCH_HOST_URL || "https://your-meilisearch-cloud.com"}
/>
```

### 2. 🔒 Environment Variables

**Production `.env` file:**
```env
# Meilisearch Production
REACT_APP_MEILISEARCH_HOST_URL=https://your-meilisearch-instance.com
REACT_APP_MEILISEARCH_SEARCH_KEY=your-public-search-only-key

# AI Assistant (Optional)
REACT_APP_MARKPROMPT_PROJECT_KEY=your-markprompt-project-key

# Indexing (Server-side only)
MEILISEARCH_HOST_URL=https://your-meilisearch-instance.com
MEILISEARCH_API_KEY=your-master-key-with-write-access
OPENAI_API_KEY=your-openai-key-for-embeddings
```

### 3. 🏗️ Infrastructure Setup

#### Option A: Meilisearch Cloud (Recommended)
1. **Sign up**: [cloud.meilisearch.com](https://cloud.meilisearch.com)
2. **Create instance**: Choose your region and plan
3. **Get API keys**: 
   - Master key (for indexing)
   - Search-only key (for frontend)
4. **Configure domain**: Set up custom domain if needed

#### Option B: Self-Hosted Meilisearch
```yaml
# docker-compose.yml
version: '3.8'
services:
  meilisearch:
    image: getmeili/meilisearch:v1.20
    ports:
      - "7700:7700"
    volumes:
      - ./meili_data:/meili_data
    environment:
      - MEILI_MASTER_KEY=your-secure-master-key
      - MEILI_ENV=production
      - MEILI_HTTP_ADDR=0.0.0.0:7700
    restart: unless-stopped
```

### 4. 🚦 Deployment Pipeline

#### Update `package.json` Scripts
```json
{
  "scripts": {
    "build": "docusaurus build",
    "index-production": "NODE_ENV=production node scripts/index-to-meilisearch.js",
    "index-semantic-production": "NODE_ENV=production node scripts/index-with-embeddings.js",
    "deploy": "yarn build && yarn index-production"
  }
}
```

#### CI/CD Pipeline Example (GitHub Actions)
```yaml
# .github/workflows/deploy.yml
name: Deploy Documentation
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'yarn'
      
      - name: Install dependencies
        run: yarn install --frozen-lockfile
      
      - name: Build documentation
        run: yarn build
        
      - name: Index to Meilisearch
        env:
          MEILISEARCH_HOST_URL: ${{ secrets.MEILISEARCH_HOST_URL }}
          MEILISEARCH_API_KEY: ${{ secrets.MEILISEARCH_API_KEY }}
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
        run: yarn index-production
        
      - name: Deploy to hosting
        run: # Your deployment command
```

### 5. 🔐 Security Best Practices

#### API Key Security
- **Frontend**: Use search-only keys with limited permissions
- **Backend**: Use master keys only for indexing scripts
- **Secrets**: Store all keys in environment variables/secrets manager

#### CORS Configuration
```javascript
// Meilisearch CORS settings
{
  "corsOrigins": [
    "https://yourdomain.com",
    "https://www.yourdomain.com"
  ]
}
```

### 6. 🎯 Performance Optimization

#### Index Optimization
```javascript
// scripts/optimize-for-production.js
const optimizeIndex = async () => {
  // Set production-optimized settings
  await index.updateSettings({
    searchableAttributes: [
      'hierarchy.lvl0',
      'hierarchy.lvl1', 
      'hierarchy.lvl2',
      'content'
    ],
    displayedAttributes: [
      'hierarchy',
      'content',
      'url',
      'anchor'
    ],
    filterableAttributes: [
      'type',
      'hierarchy.lvl0'
    ],
    // Reduce index size
    pagination: {
      maxTotalHits: 1000
    }
  });
};
```

#### Caching Strategy
```javascript
// Add to your search component
const searchCache = new Map();

const searchWithCache = async (query) => {
  const cacheKey = `${query}-${searchMode}`;
  
  if (searchCache.has(cacheKey)) {
    return searchCache.get(cacheKey);
  }
  
  const results = await searchMeilisearch(query);
  searchCache.set(cacheKey, results);
  
  // Clear cache after 5 minutes
  setTimeout(() => searchCache.delete(cacheKey), 300000);
  
  return results;
};
```

### 7. 📊 Monitoring & Analytics

#### Error Tracking
```javascript
// Add to search component
const trackSearchError = (error, query) => {
  // Send to your analytics service
  analytics.track('Search Error', {
    query,
    error: error.message,
    timestamp: new Date().toISOString()
  });
};
```

#### Search Analytics
```javascript
const trackSearchQuery = (query, resultsCount, searchMode) => {
  analytics.track('Search Query', {
    query,
    resultsCount,
    searchMode,
    timestamp: new Date().toISOString()
  });
};
```

### 8. 💰 Cost Optimization

#### Meilisearch Costs
- **Cloud**: ~$29/month for starter plan
- **Self-hosted**: Server costs + maintenance time

#### OpenAI Embeddings (Optional)
- **Initial indexing**: ~$3-5 for full docs
- **Updates**: Minimal ongoing cost
- **Consider**: Local embeddings for cost reduction

#### Markprompt AI Chat
- **Free tier**: Limited queries
- **Pro**: $19/month for more usage

### 9. 🔄 Maintenance Strategy

#### Index Updates
```bash
# Automated index updates
# Run when documentation changes
yarn index-production

# Or set up webhook for automatic updates
```

#### Health Monitoring
```javascript
// Health check endpoint
const healthCheck = async () => {
  try {
    const health = await fetch(`${MEILISEARCH_URL}/health`);
    return health.ok;
  } catch (error) {
    return false;
  }
};
```

### 10. 🎚️ Feature Flags

#### Gradual Rollout
```javascript
// Feature flags for production
const FEATURES = {
  AI_ASSISTANT: process.env.REACT_APP_ENABLE_AI === 'true',
  SEMANTIC_SEARCH: process.env.REACT_APP_ENABLE_SEMANTIC === 'true',
  DEBUG_LOGGING: process.env.NODE_ENV === 'development'
};
```

## Pre-Launch Checklist

- [ ] ✅ Meilisearch production instance running
- [ ] 🔑 API keys configured and tested
- [ ] 🏗️ Documentation indexed in production
- [ ] 🔒 CORS properly configured
- [ ] 📊 Analytics and error tracking set up
- [ ] 🚦 CI/CD pipeline working
- [ ] 🎯 Performance tested under load
- [ ] 💰 Cost monitoring in place
- [ ] 🔄 Backup and recovery plan
- [ ] 📱 Mobile responsiveness verified

## Launch Day

1. **Deploy** with feature flags off
2. **Verify** search functionality
3. **Enable** features gradually
4. **Monitor** performance and errors
5. **Gather** user feedback

## Post-Launch

- **Monitor** search query patterns
- **Optimize** based on user behavior  
- **Update** index as documentation changes
- **Scale** infrastructure as needed

---

🎉 **You'll have a production-ready, enterprise-grade search and AI system!**
