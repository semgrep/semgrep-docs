# 🚀 Staging Meilisearch Setup Guide

This guide explains how to set up Meilisearch for GitHub staging branches and preview deployments.

## 📋 Prerequisites

1. **Staging Meilisearch Instance**: You need a separate Meilisearch instance for staging
2. **Environment Variables**: Configure staging-specific environment variables
3. **Deployment Platform**: Set up your staging deployment (Netlify, Vercel, etc.)

## 🔧 Setup Steps

### 1. Create Staging Meilisearch Instance

#### Option A: Meilisearch Cloud (Recommended)
1. Create a new project in [Meilisearch Cloud](https://cloud.meilisearch.com)
2. Name it "semgrep-docs-staging"
3. Choose a region close to your staging deployment
4. Get your API keys:
   - Master key (for indexing)
   - Search-only key (for frontend)

#### Option B: Self-Hosted Staging Instance
```bash
# Using Docker
docker run -d \
  --name meilisearch-staging \
  -p 7701:7700 \
  -v $(pwd)/meili_data_staging:/meili_data \
  -e MEILI_MASTER_KEY=your-staging-master-key \
  -e MEILI_ENV=production \
  getmeili/meilisearch:v1.20
```

### 2. Environment Variables

Create environment variables for your staging deployment:

#### For Netlify/Vercel Deployment:
```bash
# Staging Meilisearch Configuration
REACT_APP_MEILISEARCH_STAGING_HOST_URL=https://your-staging-meilisearch.com
REACT_APP_MEILISEARCH_STAGING_API_KEY=your-staging-search-key

# For indexing (CI/CD only)
MEILISEARCH_STAGING_HOST_URL=https://your-staging-meilisearch.com
MEILISEARCH_STAGING_API_KEY=your-staging-master-key
```

#### For GitHub Actions:
Add these as repository secrets:
- `MEILISEARCH_STAGING_HOST_URL`
- `MEILISEARCH_STAGING_API_KEY`

### 3. Index Staging Content

Run the staging indexing script:

```bash
# Set environment variables
export MEILISEARCH_STAGING_HOST_URL="https://your-staging-meilisearch.com"
export MEILISEARCH_STAGING_API_KEY="your-staging-master-key"

# Index staging content
npm run index-staging
```

### 4. Deploy to Staging

#### For Netlify:
1. Connect your staging branch to Netlify
2. Set build command: `npm run deploy-staging`
3. Add environment variables in Netlify dashboard

#### For Vercel:
1. Connect your staging branch to Vercel
2. Set build command: `npm run build`
3. Add environment variables in Vercel dashboard
4. Add post-build command: `npm run index-staging`

## 🔄 Automated Staging Deployment

### GitHub Actions Workflow

Create `.github/workflows/deploy-staging.yml`:

```yaml
name: Deploy to Staging

on:
  push:
    branches: [staging, develop]
  pull_request:
    branches: [main]

jobs:
  deploy-staging:
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
        
      - name: Index to Staging Meilisearch
        env:
          MEILISEARCH_STAGING_HOST_URL: ${{ secrets.MEILISEARCH_STAGING_HOST_URL }}
          MEILISEARCH_STAGING_API_KEY: ${{ secrets.MEILISEARCH_STAGING_API_KEY }}
        run: yarn index-staging
        
      - name: Deploy to staging
        run: # Your staging deployment command
```

## 🎯 Testing Staging Search

### 1. Verify Environment Detection
The search component automatically detects staging environments by checking:
- `window.location.hostname.includes('staging')`
- `window.location.hostname.includes('preview')`
- `window.location.hostname.includes('deploy-preview')`

### 2. Test Search Functionality
1. Deploy to staging
2. Open browser dev tools
3. Check console for Meilisearch connection logs
4. Test search queries
5. Verify results come from staging index

### 3. Debug Common Issues

#### Search Not Working
```javascript
// Check in browser console
console.log('Current config:', {
  hostUrl: process.env.REACT_APP_MEILISEARCH_STAGING_HOST_URL,
  indexUid: 'docs_staging',
  isStaging: window.location.hostname.includes('staging')
});
```

#### Index Empty
```bash
# Check staging index status
curl -H "Authorization: Bearer YOUR_STAGING_API_KEY" \
  "https://your-staging-meilisearch.com/indexes/docs_staging/stats"
```

## 🔒 Security Best Practices

### 1. API Key Management
- Use search-only keys for frontend
- Use master keys only for indexing
- Rotate keys regularly
- Never commit keys to repository

### 2. CORS Configuration
```javascript
// Configure CORS for staging domain
{
  "corsOrigins": [
    "https://staging-docs.semgrep.dev",
    "https://deploy-preview-123--semgrep-docs.netlify.app"
  ]
}
```

### 3. Rate Limiting
- Set up rate limiting on staging instance
- Monitor usage to prevent abuse
- Use different limits than production

## 📊 Monitoring Staging

### 1. Health Checks
```bash
# Check staging Meilisearch health
curl "https://your-staging-meilisearch.com/health"

# Check index status
curl -H "Authorization: Bearer YOUR_STAGING_API_KEY" \
  "https://your-staging-meilisearch.com/indexes/docs_staging/stats"
```

### 2. Search Analytics
Monitor staging search usage:
- Query patterns
- Error rates
- Response times
- Popular search terms

## 🚀 Production Migration

When ready to promote staging to production:

1. **Backup staging index**:
   ```bash
   # Export staging index
   curl -H "Authorization: Bearer YOUR_STAGING_API_KEY" \
     "https://your-staging-meilisearch.com/indexes/docs_staging/documents" \
     > staging_index_backup.json
   ```

2. **Update production environment variables**
3. **Run production indexing**
4. **Verify search functionality**
5. **Monitor for issues**

## 🆘 Troubleshooting

### Common Issues

#### 1. Environment Variables Not Loading
- Check deployment platform environment variable settings
- Verify variable names match exactly
- Ensure variables are set for correct environment

#### 2. CORS Errors
- Add staging domain to Meilisearch CORS settings
- Check if staging URL is accessible
- Verify API key permissions

#### 3. Index Not Found
- Run staging indexing script
- Check API key has write permissions
- Verify index name matches configuration

#### 4. Search Results Empty
- Check if staging site is accessible
- Verify sitemap URL is correct
- Check scraping logs for errors

### Getting Help

1. Check browser console for errors
2. Review Meilisearch logs
3. Test API endpoints directly
4. Compare with working production setup

---

🎉 **Your staging Meilisearch setup is now ready!** 

The search will automatically use the staging configuration when deployed to staging environments, providing a complete preview experience for your documentation.
