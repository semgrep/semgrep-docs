# Meilisearch Setup for Semgrep Docs

This document explains how to set up and use Meilisearch for search functionality in the Semgrep documentation.

## Prerequisites

1. **Meilisearch Server**: You need a running Meilisearch instance. You can:
   - Run locally with Docker: `docker run -it --rm -p 7700:7700 getmeili/meilisearch:v1.0`
   - Use [Meilisearch Cloud](https://www.meilisearch.com/pricing)
   - Deploy on your own infrastructure

## Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
# Meilisearch Configuration for Frontend (use public search key)
REACT_APP_MEILISEARCH_HOST_URL=http://localhost:7700
REACT_APP_MEILISEARCH_API_KEY=

# Meilisearch Configuration for Indexing (use master key)
MEILISEARCH_HOST_URL=http://localhost:7700
MEILISEARCH_API_KEY=your-master-key-here
```

## Setup Steps

### 1. Start Meilisearch Server

```bash
# Using Docker (recommended for development)
docker run -it --rm -p 7700:7700 getmeili/meilisearch:v1.0

# Or using Docker with persistence
docker run -it --rm \
  -p 7700:7700 \
  -v $(pwd)/meili_data:/meili_data \
  getmeili/meilisearch:v1.0
```

### 2. Create API Keys

1. Open Meilisearch dashboard: http://localhost:7700
2. Go to the "Keys" section
3. Note down the "Master Key" for indexing
4. Create a search-only key for frontend use (or use the default search key)

### 3. Index Documentation Content

Run the indexing script to populate Meilisearch with documentation content:

```bash
npm run index-meilisearch
```

This script will:
- Connect to your Meilisearch instance
- Scrape the documentation from the sitemap
- Extract content using the same selectors as the original Algolia config
- Index all content with proper hierarchy and metadata

### 4. Start Development Server

```bash
npm run dev
```

The search bar in the navbar should now use Meilisearch instead of Algolia.

## Configuration

### Meilisearch Settings

The indexing script configures:
- **Searchable attributes**: Content hierarchy and text
- **Filterable attributes**: Type, language, version, tags
- **Synonyms**: Same as original Algolia configuration

### Search Component Options

You can modify the search behavior in `src/theme/Navbar/Search/index.tsx`:

```tsx
<MeilisearchSearchBar 
  hostUrl={process.env.REACT_APP_MEILISEARCH_HOST_URL}
  apiKey={process.env.REACT_APP_MEILISEARCH_API_KEY}
  indexUid="docs"
  placeholder="Search docs..."
  enableDarkMode="auto"
  enhancedSearchInput={true}
/>
```

## Maintenance

### Re-indexing Content

When documentation is updated, re-run the indexing script:

```bash
npm run index-meilisearch
```

You might want to set up automated indexing through:
- GitHub Actions on content changes
- Webhook triggers from your CMS
- Scheduled cron jobs

### Monitoring

Monitor your Meilisearch instance:
- Check the dashboard for search analytics
- Monitor index size and performance
- Review search logs for issues

## Troubleshooting

### Search Not Working

1. Check browser console for errors
2. Verify Meilisearch server is running
3. Confirm API keys are correct
4. Check CORS settings in Meilisearch

### Indexing Fails

1. Verify master key is correct
2. Check Meilisearch server logs
3. Ensure the documentation site is accessible
4. Review network connectivity

### Performance Issues

1. Consider using Meilisearch Cloud for better performance
2. Optimize index settings
3. Use pagination for large result sets
4. Implement result caching

## Migration Notes

This setup replaces the previous Algolia integration with Meilisearch while maintaining:
- Same search UX and behavior
- Compatible content structure
- Similar configuration options
- Equivalent synonym handling

The search functionality should work identically to the previous Algolia implementation.
