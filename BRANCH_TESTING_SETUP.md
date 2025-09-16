# 🧪 Meilisearch Testing on Specific Branch

This setup allows you to test Meilisearch search functionality **only on a specific branch** without affecting your main documentation.

## 🎯 **How It Works**

- ✅ **Testing branch only**: Meilisearch works only on `meilisearch-testing` branch
- ✅ **Other branches**: Search is disabled (no Meilisearch)
- ✅ **Development**: Still works locally for testing
- ✅ **Isolated testing**: Won't affect production or other branches

## 🚀 **Quick Setup**

### **Step 1: Create Testing Branch**

```bash
# Create and switch to testing branch
git checkout -b meilisearch-testing

# Push the branch
git push origin meilisearch-testing
```

### **Step 2: Set up Meilisearch Instance**

Choose one option:

#### Option A: Local Testing (Easiest)
```bash
# Run Meilisearch locally
docker run -it --rm -p 7700:7700 getmeili/meilisearch:v1.20
```

#### Option B: Meilisearch Cloud
1. Go to [cloud.meilisearch.com](https://cloud.meilisearch.com)
2. Create project: "semgrep-docs-testing"
3. Get your API keys

### **Step 3: Configure Environment Variables**

#### For Local Testing:
Create `.env.local` file:
```env
REACT_APP_MEILISEARCH_HOST_URL=http://localhost:7700
REACT_APP_MEILISEARCH_API_KEY=
MEILISEARCH_HOST_URL=http://localhost:7700
MEILISEARCH_API_KEY=your-master-key-here
```

#### For Netlify Preview:
Add these environment variables in Netlify:
```env
REACT_APP_MEILISEARCH_HOST_URL=https://your-meilisearch-instance.com
REACT_APP_MEILISEARCH_API_KEY=your-search-key
```

### **Step 4: Test Locally**

```bash
# Start Meilisearch (if using local)
docker run -it --rm -p 7700:7700 getmeili/meilisearch:v1.20

# In another terminal, start the dev server
yarn dev

# Index the content
yarn index-meilisearch
```

### **Step 5: Test on Netlify Preview**

1. **Push to testing branch**:
   ```bash
   git add .
   git commit -m "Test Meilisearch on testing branch"
   git push origin meilisearch-testing
   ```

2. **Check Netlify preview** - search should work
3. **Check other branches** - search should be disabled

## 🔧 **Configuration Details**

### **Branch Detection:**
The system detects the testing branch by:
- `process.env.REACT_APP_BRANCH_NAME === 'meilisearch-testing'`
- `window.location.hostname.includes('meilisearch-testing')`

### **Index Name:**
- **Testing branch**: `docs_testing`
- **Development**: `docs`
- **Other branches**: Disabled

### **Environment Variables:**
- **Testing branch**: Uses `REACT_APP_MEILISEARCH_HOST_URL`
- **Development**: Uses `REACT_APP_MEILISEARCH_HOST_URL`
- **Other branches**: Empty (disabled)

## 🎨 **Customization**

### **Change Branch Name:**
Edit `src/theme/Navbar/Search/index.tsx`:
```javascript
const isTestingBranch = process.env.REACT_APP_BRANCH_NAME === 'your-branch-name';
```

### **Add More Branches:**
```javascript
const testingBranches = ['meilisearch-testing', 'search-experiment', 'feature-search'];
const isTestingBranch = testingBranches.includes(process.env.REACT_APP_BRANCH_NAME);
```

### **Different Index per Branch:**
```javascript
const branchIndexMap = {
  'meilisearch-testing': 'docs_testing',
  'search-experiment': 'docs_experiment',
  'feature-search': 'docs_feature'
};
const indexUid = branchIndexMap[process.env.REACT_APP_BRANCH_NAME] || 'docs';
```

## 🧪 **Testing Scenarios**

### **Test 1: Search Works on Testing Branch**
1. Switch to `meilisearch-testing` branch
2. Start dev server: `yarn dev`
3. Index content: `yarn index-meilisearch`
4. Test search in browser
5. ✅ Should work

### **Test 2: Search Disabled on Other Branches**
1. Switch to `main` branch
2. Start dev server: `yarn dev`
3. Check search bar
4. ✅ Should be disabled/not work

### **Test 3: Netlify Preview**
1. Push to `meilisearch-testing` branch
2. Check Netlify preview URL
3. Test search functionality
4. ✅ Should work

### **Test 4: Other Branch Preview**
1. Push to `main` branch
2. Check Netlify preview URL
3. Check search functionality
4. ✅ Should be disabled

## 🔍 **Debugging**

### **Check Branch Detection:**
```javascript
// Add to browser console
console.log('Branch:', process.env.REACT_APP_BRANCH_NAME);
console.log('Hostname:', window.location.hostname);
console.log('Is testing branch:', process.env.REACT_APP_BRANCH_NAME === 'meilisearch-testing');
```

### **Check Meilisearch Config:**
```javascript
// Add to browser console
console.log('Meilisearch config:', {
  hostUrl: process.env.REACT_APP_MEILISEARCH_HOST_URL,
  apiKey: process.env.REACT_APP_MEILISEARCH_API_KEY ? '***' : 'None',
  indexUid: 'docs_testing'
});
```

### **Check Index Status:**
```bash
# Check if index exists
curl -H "Authorization: Bearer YOUR_API_KEY" \
  "http://localhost:7700/indexes/docs_testing/stats"
```

## 🎉 **Benefits**

### **Safe Testing:**
- ✅ **Isolated environment** for testing
- ✅ **No impact** on production
- ✅ **Easy to enable/disable**
- ✅ **Branch-specific configuration**

### **Development Workflow:**
- ✅ **Test locally** before pushing
- ✅ **Test on preview** before merging
- ✅ **Compare with/without** Meilisearch
- ✅ **Easy rollback** (just switch branches)

### **Team Collaboration:**
- ✅ **Others can test** by switching branches
- ✅ **No conflicts** with main branch
- ✅ **Clear testing environment**
- ✅ **Easy to share results**

## 🚀 **Next Steps**

1. **Create the testing branch**
2. **Set up Meilisearch instance**
3. **Test locally first**
4. **Test on Netlify preview**
5. **Share results with team**
6. **Decide whether to merge to main**

---

🎯 **Result:** You can now test Meilisearch safely on a dedicated branch without affecting your main documentation!

The search will only work on the `meilisearch-testing` branch, giving you a safe environment to experiment and test the functionality.
