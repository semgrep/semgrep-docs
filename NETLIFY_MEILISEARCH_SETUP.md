# 🚀 Netlify Meilisearch Setup

Deploy Meilisearch with Semgrep docs to your existing Netlify site!

## 🎯 **What We're Building**

✅ **Netlify Functions**: Serverless Meilisearch proxy  
✅ **Semgrep Docs Index**: Full documentation search  
✅ **Public Search**: Available on all Netlify previews  
✅ **Local Development**: Works with local Meilisearch  

## 🚀 **Setup Steps**

### **1. Deploy to Netlify**

Your site is already connected to Netlify, so just push the changes:

```bash
git add .
git commit -m "Add Netlify Meilisearch functions"
git push origin meilisearch-testing-clean
```

### **2. Set Environment Variables**

In your Netlify dashboard:

1. **Go to Site Settings → Environment Variables**
2. **Add these variables**:

```
MEILISEARCH_HOST_URL = http://localhost:7700
MEILISEARCH_API_KEY = your-master-key-here
```

**Note**: For production, you'll need a hosted Meilisearch instance.

### **3. Index the Documentation**

After deployment, trigger the indexing:

```bash
# Call the indexing function
curl -X POST https://your-site.netlify.app/.netlify/functions/index-docs
```

Or visit: `https://your-site.netlify.app/.netlify/functions/index-docs`

### **4. Test the Search**

Visit your Netlify preview and test the search with:
- "custom rules"
- "CI integration"
- "secrets detection"
- "supply chain security"

## 🔧 **How It Works**

### **Netlify Functions**:

1. **`/netlify/functions/meilisearch.js`**:
   - Proxies search requests to Meilisearch
   - Handles CORS for cross-origin requests
   - Provides health checks and stats

2. **`/netlify/functions/index-docs.js`**:
   - Scrapes Semgrep documentation
   - Indexes content to Meilisearch
   - Configures search settings and synonyms

### **Search Component**:
- Automatically detects Netlify vs local environment
- Uses Netlify function on deployed sites
- Falls back to local Meilisearch for development

## 🎯 **Production Setup**

For a production Meilisearch instance:

### **Option 1: Meilisearch Cloud**
```bash
# Set in Netlify environment variables
MEILISEARCH_HOST_URL = https://your-project.meilisearch.io
MEILISEARCH_API_KEY = your-master-key
```

### **Option 2: Self-hosted**
```bash
# Deploy to Railway/Render/Fly.io
MEILISEARCH_HOST_URL = https://your-meilisearch-instance.com
MEILISEARCH_API_KEY = your-master-key
```

## 🔄 **Automated Indexing**

Set up GitHub Actions for automatic re-indexing:

```yaml
name: Update Semgrep Docs Index

on:
  schedule:
    - cron: '0 2 * * *'  # Daily at 2 AM
  workflow_dispatch:

jobs:
  update-index:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Netlify function
        run: |
          curl -X POST ${{ secrets.NETLIFY_SITE_URL }}/.netlify/functions/index-docs
```

## 🎉 **Benefits**

✅ **No Additional Hosting**: Uses existing Netlify setup  
✅ **Serverless**: Functions scale automatically  
✅ **Free Tier**: Netlify functions are free for reasonable usage  
✅ **Easy Updates**: Just push to GitHub  
✅ **Local Development**: Works with local Meilisearch  

## 🔍 **Testing**

### **Local Development**:
```bash
yarn dev
# Search uses local Meilisearch at localhost:7700
```

### **Netlify Preview**:
- Search uses Netlify function
- Automatically indexes Semgrep docs
- Full search functionality

### **Production**:
- Set up hosted Meilisearch instance
- Update environment variables
- Deploy and test

---

🎯 **Result**: A fully functional Semgrep docs search powered by Meilisearch, deployed on your existing Netlify infrastructure!