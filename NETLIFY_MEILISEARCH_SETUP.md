# 🔍 Meilisearch + Netlify Previews Setup

This guide shows how to add Meilisearch search functionality to your existing Netlify preview deployments.

## 🎯 **How It Works**

Your current setup:
- ✅ **Netlify** automatically creates preview deployments for PRs
- ✅ **Static site** builds and deploys successfully
- ❌ **Search functionality** is missing from previews

**New setup:**
- ✅ **Netlify** continues creating preview deployments
- ✅ **GitHub Actions** indexes content to Meilisearch
- ✅ **Search works** automatically in all previews

## 🚀 **Quick Setup (5 minutes)**

### **Step 1: Set up Meilisearch Instance**

Choose one option:

#### Option A: Meilisearch Cloud (Recommended)
1. Go to [cloud.meilisearch.com](https://cloud.meilisearch.com)
2. Create a new project: "semgrep-docs-previews"
3. Get your API keys:
   - **Master key** (for indexing)
   - **Search-only key** (for frontend)

#### Option B: Self-hosted
```bash
docker run -d \
  --name meilisearch-previews \
  -p 7701:7700 \
  -e MEILI_MASTER_KEY=your-preview-master-key \
  getmeili/meilisearch:v1.20
```

### **Step 2: Add GitHub Secrets**

In your GitHub repository:
1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add these repository secrets:
   - `MEILISEARCH_STAGING_HOST_URL` = `https://your-meilisearch-instance.com`
   - `MEILISEARCH_STAGING_API_KEY` = `your-master-key-here`

### **Step 3: Test It**

1. **Create a PR** to trigger the workflow
2. **Check the PR comment** - it will show search status
3. **Wait for Netlify preview** to deploy
4. **Test search** in the preview URL

## 🔧 **How the Integration Works**

### **Automatic Flow:**
```
1. You create/update a PR
   ↓
2. GitHub Actions runs (indexes to Meilisearch)
   ↓
3. Netlify builds and deploys preview
   ↓
4. Search automatically works in preview
```

### **Environment Detection:**
The search component automatically detects Netlify previews by checking:
- `window.location.hostname.includes('deploy-preview')`
- `window.location.hostname.includes('netlify.app')`

### **Configuration:**
- **Development:** Uses `localhost:7700`
- **Netlify Previews:** Uses your staging Meilisearch instance
- **Production:** Uses your production Meilisearch instance

## 📊 **What You'll See**

### **In GitHub Actions:**
```
🔍 Indexing to preview Meilisearch...
✅ Meilisearch indexing completed for preview
```

### **In PR Comments:**
```
## 🔍 Meilisearch Search Status

**Preview Search:** ✅ Configured
- **Search Index:** `docs_staging`
- **Preview URL:** Will be available after Netlify deployment
- **Search will work automatically** when preview is live
```

### **In Netlify Previews:**
- Search bar appears in navbar
- Search works immediately
- Results come from your staging Meilisearch index

## 🎨 **Customization Options**

### **Different Meilisearch Instance per Branch:**
```javascript
// In src/theme/Navbar/Search/index.tsx
const getMeilisearchConfig = () => {
  const branch = process.env.GITHUB_REF_NAME || 'main';
  
  if (branch === 'staging') {
    return {
      hostUrl: "https://staging-meilisearch.semgrep.dev",
      indexUid: "docs_staging"
    };
  }
  // ... other configurations
};
```

### **Preview-Specific Index Names:**
```javascript
// Use PR number for unique indexes
const prNumber = process.env.GITHUB_PR_NUMBER;
const indexUid = prNumber ? `docs_pr_${prNumber}` : 'docs_staging';
```

## 🔒 **Security & Best Practices**

### **API Key Security:**
- ✅ Use **search-only keys** for frontend
- ✅ Use **master keys** only for indexing
- ✅ Store keys in **GitHub Secrets**
- ❌ Never commit keys to repository

### **CORS Configuration:**
```javascript
// In your Meilisearch instance
{
  "corsOrigins": [
    "https://semgrep-docs.netlify.app",
    "https://deploy-preview-*.netlify.app"
  ]
}
```

### **Rate Limiting:**
- Set up rate limiting on your Meilisearch instance
- Monitor usage to prevent abuse
- Use different limits than production

## 🆘 **Troubleshooting**

### **Search Not Working in Preview:**
1. **Check GitHub Actions logs** for indexing errors
2. **Verify environment variables** are set correctly
3. **Check browser console** for CORS or connection errors
4. **Test Meilisearch instance** directly

### **Index Empty:**
```bash
# Check if indexing worked
curl -H "Authorization: Bearer YOUR_API_KEY" \
  "https://your-meilisearch.com/indexes/docs_staging/stats"
```

### **CORS Errors:**
- Add `*.netlify.app` to CORS origins
- Check if preview URL is accessible
- Verify API key permissions

## 🎉 **Benefits**

### **For Developers:**
- ✅ **Full search functionality** in every preview
- ✅ **No manual setup** required
- ✅ **Consistent experience** across all environments
- ✅ **Automatic indexing** of new content

### **For Reviewers:**
- ✅ **Test search features** before merging
- ✅ **Verify search results** are correct
- ✅ **No broken search** in previews
- ✅ **Complete documentation experience**

### **For Team:**
- ✅ **Faster feedback** on search changes
- ✅ **Better PR reviews** with working search
- ✅ **Reduced production issues**
- ✅ **Improved developer experience**

---

🎯 **Result:** Every Netlify preview now has fully functional search, automatically!

The search will work seamlessly with your existing Netlify preview system - no changes to your current deployment process needed.
