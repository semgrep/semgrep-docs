const { MeiliSearch } = require('meilisearch');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const client = new MeiliSearch({
      host: process.env.MEILISEARCH_HOST_URL || 'https://ms-0e8ae24505f7-30518.sfo.meilisearch.io',
      apiKey: process.env.MEILISEARCH_API_KEY || 'b7c62c6347d5a3032f73043eaa40546825c99bc6'
    });

    // Create OpenAI embedder
    try {
      await client.createEmbedder('default', {
        source: 'openai',
        model: 'text-embedding-3-small',
        apiKey: process.env.OPENAI_API_KEY
      });
      // OpenAI embedder created successfully
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          success: true, 
          message: 'OpenAI embedder configured successfully',
          embedder: 'default',
          model: 'text-embedding-3-small'
        })
      };
    } catch (error) {
      if (error.cause?.code === 'embedder_already_exists') {
        // OpenAI embedder already exists
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ 
            success: true, 
            message: 'OpenAI embedder already exists',
            embedder: 'default',
            model: 'text-embedding-3-small'
          })
        };
      } else {
        // Error creating OpenAI embedder
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ 
            error: 'Failed to create OpenAI embedder', 
            message: error.message,
            details: error.cause
          })
        };
      }
    }
  } catch (error) {
    // Setup embedder error
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
