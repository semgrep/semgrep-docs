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
      limit: 10,
      hybrid: {
        semanticRatio: 0.8, // Prioritize semantic search for chat
        embedder: "default"
      },
      attributesToRetrieve: ['content', 'hierarchy', 'hierarchy_lvl0', 'hierarchy_lvl1', 'hierarchy_lvl2', 'hierarchy_radio_lvl0', 'hierarchy_radio_lvl1', 'hierarchy_radio_lvl2', 'url', 'title'],
      cropLength: 300,
      attributesToCrop: ['content']
    });

    // Filter and deduplicate for better context
    const seenUrlsForContext = new Set();
    const uniqueHitsForContext = searchResults.hits
      .filter(hit => {
        if (!hit.content || hit.content.trim().length === 0) return false;
        const baseUrl = hit.url?.split('#')[0];
        if (!baseUrl || seenUrlsForContext.has(baseUrl)) return false;
        seenUrlsForContext.add(baseUrl);
        return true;
      })
      .slice(0, 3);

    // Build context from top unique search results for OpenAI
    const contextParts = uniqueHitsForContext.map((hit, idx) => {
      // Prioritize lvl1 (page title) over lvl2 (subsection)
      let title = hit.hierarchy_lvl1 || hit.hierarchy_radio_lvl1 || hit.hierarchy?.lvl1 || hit.hierarchy_lvl2 || hit.hierarchy_radio_lvl2 || hit.hierarchy?.lvl2 || hit.title || 'Documentation';
      
      // Filter out Docusaurus internal anchors
      if (title.includes('__docusaurus_skipToContent_fallback') || title.includes('#__DOCUSAURUS') || title.match(/^[A-Z]+#__/)) {
        title = hit.hierarchy_lvl0 || hit.hierarchy?.lvl0 || 'Documentation';
      }
      
      // Clean up any # symbols, anchors, and extra spaces
      title = title
        .replace(/#__docusaurus[_a-zA-Z]+/gi, '')
        .replace(/#__DOCUSAURUS[_A-Z]+/gi, '')
        .replace(/\s*#\s*/g, ' - ')
        .replace(/\s+/g, ' ')
        .trim() || 'Documentation';
      
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

    // Deduplicate and filter sources
    const seenUrls = new Set();
    const uniqueSources = searchResults.hits
      .filter(hit => {
        // Filter out empty content
        if (!hit.content || hit.content.trim().length === 0) return false;
        
        // Remove anchor from URL for deduplication
        const baseUrl = hit.url?.split('#')[0];
        if (!baseUrl || seenUrls.has(baseUrl)) return false;
        
        seenUrls.add(baseUrl);
        return true;
      })
      .slice(0, 3)
      .map(hit => {
        // Prioritize lvl1 (page title) over lvl2 (subsection)
        let title = hit.hierarchy_lvl1 || hit.hierarchy_radio_lvl1 || hit.hierarchy?.lvl1 || hit.hierarchy_lvl2 || hit.hierarchy_radio_lvl2 || hit.hierarchy?.lvl2 || hit.title || 'Documentation';
        
        // Filter out Docusaurus internal anchors
        if (title.includes('__docusaurus_skipToContent_fallback') || title.includes('#__DOCUSAURUS') || title.match(/^[A-Z]+#__/)) {
          title = hit.hierarchy_lvl0 || hit.hierarchy?.lvl0 || 'Documentation';
        }
        
        // Clean up any # symbols, anchors, and extra spaces
        title = title
          .replace(/#__docusaurus[_a-zA-Z]+/gi, '')
          .replace(/#__DOCUSAURUS[_A-Z]+/gi, '')
          .replace(/\s*#\s*/g, ' - ')
          .replace(/\s+/g, ' ')
          .trim() || 'Documentation';
        
        return {
          title: title,
          url: hit.url,
          snippet: hit.content?.substring(0, 200) + '...'
        };
      });

    const response = {
      answer: answer,
      sources: uniqueSources,
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
  // Prioritize lvl1 (page title) over lvl2 (subsection)
  let title = topResult.hierarchy_lvl1 || topResult.hierarchy_radio_lvl1 || topResult.hierarchy?.lvl1 || topResult.hierarchy_lvl2 || topResult.hierarchy_radio_lvl2 || topResult.hierarchy?.lvl2 || topResult.title || 'Documentation';
  
  // Filter out Docusaurus internal anchors
  if (title.includes('__docusaurus_skipToContent_fallback') || title.includes('#__DOCUSAURUS') || title.match(/^[A-Z]+#__/)) {
    title = topResult.hierarchy_lvl0 || topResult.hierarchy?.lvl0 || 'Documentation';
  }
  
  // Clean up any # symbols, anchors, and extra spaces
  title = title
    .replace(/#__docusaurus[_a-zA-Z]+/gi, '')
    .replace(/#__DOCUSAURUS[_A-Z]+/gi, '')
    .replace(/\s*#\s*/g, ' - ')
    .replace(/\s+/g, ' ')
    .trim() || 'Documentation';
  
  const content = topResult.content || '';
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 20);
  const relevantContent = sentences.slice(0, 3).join('. ') + '.';

  return `Based on the Semgrep documentation on **${title}**:\n\n${relevantContent}\n\nFor more details, check out the [full documentation](${topResult.url}).`;
}

