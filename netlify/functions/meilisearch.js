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

  try {
    // Initialize Meilisearch client
    const client = new MeiliSearch({
      host: process.env.MEILISEARCH_HOST_URL || 'https://ms-3ade175771ef-34593.sfo.meilisearch.io',
      apiKey: process.env.MEILISEARCH_API_KEY // API key must be set in environment variables
    });

    const { httpMethod, body, queryStringParameters } = event;

    if (httpMethod === 'GET') {
      // Handle GET requests (health check, stats, etc.)
      const path = event.path.replace('/.netlify/functions/meilisearch', '');
      
      if (path === '/health') {
        const health = await client.health();
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(health)
        };
      }
      
      if (path === '/stats') {
        const stats = await client.getStats();
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(stats)
        };
      }
    }

    if (httpMethod === 'POST') {
      // Handle search requests
      const searchData = JSON.parse(body || '{}');
      const { index, q, ...searchParams } = searchData;

      if (!index || !q) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Missing required parameters: index and q' })
        };
      }

      const searchResults = await client.index(index).search(q, searchParams);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(searchResults)
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };

  } catch (error) {
    // Log error for debugging
    console.error('Meilisearch function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      })
    };
  }
};
