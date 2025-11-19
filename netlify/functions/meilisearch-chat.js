const { MeiliSearch } = require('meilisearch');

// Helper function to call OpenAI API
async function callOpenAI(messages, context) {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    console.warn('OPENAI_API_KEY not set, falling back to simple extraction');
    return null;
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // Fast and cost-effective. Use 'gpt-4o-mini' for better quality
        messages: [
          {
            role: 'system',
            content: `You are a helpful assistant for Semgrep documentation. Answer questions based on the provided context from the Semgrep docs. Be concise, accurate, and include relevant code examples when appropriate. If the context doesn't contain enough information, say so and suggest checking the full documentation.`
          },
          {
            role: 'system',
            content: `Context from Semgrep documentation:\n\n${context}`
          },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 500,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      })
    });

    if (!response.ok) {
      console.error('OpenAI API error:', response.status, await response.text());
      return null;
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || null;
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    return null;
  }
}

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed. Use POST.' })
    };
  }

  try {
    const client = new MeiliSearch({
      host: process.env.MEILISEARCH_HOST_URL || 'https://ms-3ade175771ef-34593.sfo.meilisearch.io',
      apiKey: process.env.MEILISEARCH_API_KEY
    });

    const { messages, index } = JSON.parse(event.body || '{}');

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing or invalid messages array' })
      };
    }

    const indexUid = index || 'semgrep_docs';
    const userMessage = messages[messages.length - 1];
    
    if (!userMessage || userMessage.role !== 'user') {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Last message must be from user' })
      };
    }

    const searchResults = await client.index(indexUid).search(userMessage.content, {
      limit: 5,
      hybrid: {
        semanticRatio: 0.8, // Prioritize semantic search for chat
        embedder: "default"
      },
      attributesToRetrieve: ['content', 'hierarchy', 'url', 'title'],
      cropLength: 300,
      attributesToCrop: ['content']
    });

    // Build context from top search results for OpenAI
    const contextParts = searchResults.hits.slice(0, 3).map((hit, idx) => {
      const title = hit.hierarchy?.lvl1 || hit.title || 'Documentation';
      const content = hit.content || '';
      const url = hit.url || '';
      return `[Source ${idx + 1}: ${title}]\nURL: ${url}\n${content.substring(0, 600)}`;
    });
    const contextString = contextParts.join('\n\n---\n\n');

    // Try to use OpenAI, fall back to simple extraction if unavailable
    let answer = await callOpenAI(messages, contextString);
    
    if (!answer) {
      // Fallback to simple extraction if OpenAI fails or is not configured
      answer = generateAnswer(userMessage.content, searchResults.hits);
    }

    const response = {
      answer: answer,
      sources: searchResults.hits.slice(0, 3).map(hit => ({
        title: hit.hierarchy?.lvl1 || hit.title || 'Documentation',
        url: hit.url,
        snippet: hit.content?.substring(0, 200) + '...'
      })),
      conversationId: Date.now().toString()
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response)
    };

  } catch (error) {
    console.error('Chat error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      })
    };
  }
};

function generateAnswer(question, hits) {
  if (hits.length === 0) {
    return "I couldn't find specific information about that in the Semgrep documentation. Could you rephrase your question or check the main documentation sections?";
  }

  const topResult = hits[0];
  const title = topResult.hierarchy?.lvl1 || topResult.title || 'Documentation';
  const content = topResult.content || '';
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 20);
  const relevantContent = sentences.slice(0, 3).join('. ') + '.';

  return `Based on the Semgrep documentation on **${title}**:\n\n${relevantContent}\n\nFor more details, check out the [full documentation](${topResult.url}).`;
}

