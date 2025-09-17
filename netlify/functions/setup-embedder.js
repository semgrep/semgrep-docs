const { MeiliSearch } = require('meilisearch');

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST' && event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Initialize Meilisearch client
    const client = new MeiliSearch({
      host: process.env.MEILISEARCH_HOST_URL || 'https://ms-0e8ae24505f7-30518.sfo.meilisearch.io',
      apiKey: process.env.MEILISEARCH_API_KEY || 'b7c62c6347d5a3032f73043eaa40546825c99bc6'
    });

    // Create embedder for hybrid search
    try {
      await client.createEmbedder('default', {
        source: 'huggingface',
        model: 'sentence-transformers/all-MiniLM-L6-v2'
      });
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Embedder created successfully for hybrid search',
          embedder: 'default',
          model: 'sentence-transformers/all-MiniLM-L6-v2'
        })
      };
    } catch (error) {
      if (error.cause?.code === 'embedder_already_exists') {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            message: 'Embedder already exists',
            embedder: 'default',
            model: 'sentence-transformers/all-MiniLM-L6-v2'
          })
        };
      } else {
        throw error;
      }
    }

  } catch (error) {
    console.error('Embedder setup error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Embedder setup failed',
        message: error.message,
        details: error.cause
      })
    };
  }
};
