#!/bin/bash

# Staging Meilisearch Setup Script
# This script helps set up Meilisearch for staging environments

set -e

echo "🚀 Setting up Meilisearch for Staging"
echo "======================================"

# Check if required environment variables are set
if [ -z "$MEILISEARCH_STAGING_HOST_URL" ]; then
    echo "❌ MEILISEARCH_STAGING_HOST_URL is not set"
    echo "Please set it to your staging Meilisearch instance URL"
    echo "Example: export MEILISEARCH_STAGING_HOST_URL='https://staging-meilisearch.semgrep.dev'"
    exit 1
fi

if [ -z "$MEILISEARCH_STAGING_API_KEY" ]; then
    echo "❌ MEILISEARCH_STAGING_API_KEY is not set"
    echo "Please set it to your staging Meilisearch master key"
    echo "Example: export MEILISEARCH_STAGING_API_KEY='your-master-key-here'"
    exit 1
fi

echo "✅ Environment variables configured"
echo "   Host: $MEILISEARCH_STAGING_HOST_URL"
echo "   API Key: ***${MEILISEARCH_STAGING_API_KEY: -4}"

# Test connection to Meilisearch
echo ""
echo "🔌 Testing connection to staging Meilisearch..."
if curl -s -H "Authorization: Bearer $MEILISEARCH_STAGING_API_KEY" \
    "$MEILISEARCH_STAGING_HOST_URL/health" > /dev/null; then
    echo "✅ Connection successful"
else
    echo "❌ Failed to connect to staging Meilisearch"
    echo "Please check your URL and API key"
    exit 1
fi

# Check if staging site is accessible
echo ""
echo "🌐 Checking if staging site is accessible..."
STAGING_SITE_URL="https://staging-docs.semgrep.dev"
if curl -s --head "$STAGING_SITE_URL" | head -n 1 | grep -q "200 OK"; then
    echo "✅ Staging site is accessible at $STAGING_SITE_URL"
else
    echo "⚠️  Staging site may not be accessible at $STAGING_SITE_URL"
    echo "   This is normal if you haven't deployed to staging yet"
fi

# Run the indexing script
echo ""
echo "📚 Indexing staging documentation..."
if npm run index-staging; then
    echo "✅ Staging indexing completed successfully"
else
    echo "❌ Staging indexing failed"
    exit 1
fi

# Verify the index was created
echo ""
echo "🔍 Verifying staging index..."
INDEX_STATS=$(curl -s -H "Authorization: Bearer $MEILISEARCH_STAGING_API_KEY" \
    "$MEILISEARCH_STAGING_HOST_URL/indexes/docs_staging/stats")

if echo "$INDEX_STATS" | grep -q "numberOfDocuments"; then
    DOC_COUNT=$(echo "$INDEX_STATS" | grep -o '"numberOfDocuments":[0-9]*' | cut -d':' -f2)
    echo "✅ Staging index created with $DOC_COUNT documents"
else
    echo "❌ Failed to verify staging index"
    exit 1
fi

echo ""
echo "🎉 Staging Meilisearch setup completed!"
echo ""
echo "Next steps:"
echo "1. Deploy your staging branch to your hosting platform"
echo "2. Set the following environment variables in your deployment:"
echo "   - REACT_APP_MEILISEARCH_STAGING_HOST_URL=$MEILISEARCH_STAGING_HOST_URL"
echo "   - REACT_APP_MEILISEARCH_STAGING_API_KEY=<your-search-only-key>"
echo "3. Test the search functionality on your staging site"
echo ""
echo "For more information, see STAGING_MEILISEARCH_SETUP.md"
