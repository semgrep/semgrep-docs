# 🤖 AI Assistant Setup Guide

This guide helps you set up the **AI Assistant** powered by Markprompt alongside your semantic search for the ultimate documentation experience!

## 🎯 What You'll Get

- **🔍 Semantic Search**: Fast, intelligent document search with hybrid modes
- **🤖 AI Chat**: Natural language conversations about Semgrep
- **📚 Context-Aware**: AI references actual documentation pages
- **🎨 Beautiful UI**: Floating chat button with modern design
- **⚡ Lightning Fast**: Local search + cloud AI processing

## 🚀 Quick Setup

### 1. Get Your Markprompt API Key

1. **Sign up at [Markprompt](https://markprompt.com)**
2. **Create a new project** for your documentation
3. **Get your Project Key** from the project settings
4. **Configure data sources** (optional - can use Meilisearch integration)

### 2. Environment Configuration

Create/update your `.env.local` file:

```env
# Meilisearch (for search functionality)
MEILISEARCH_HOST_URL=http://localhost:7700
MEILISEARCH_API_KEY=

# OpenAI (for embeddings - optional but recommended)
OPENAI_API_KEY=your-openai-api-key-here

# Markprompt (for AI chat)
MARKPROMPT_PROJECT_KEY=your-markprompt-project-key-here
```

### 3. Update Component Configuration

Edit `src/theme/Layout/index.tsx` to use your Markprompt key:

```tsx
<AIAssistant 
  projectKey="your-actual-markprompt-project-key"
  placeholder="💬 Ask me anything about Semgrep..."
  apiUrl="http://localhost:7700"
/>
```

### 4. Start Everything

```bash
# 1. Start Meilisearch
meilisearch --db-path ./meili_data --http-payload-size-limit 100MB

# 2. Index with semantic embeddings (if you want the best search)
npm run index-semantic

# 3. Start development server
npm run dev
```

Visit **http://localhost:3000** and look for the floating **🤖** button!

## 🎛️ Features Overview

### Search Bar (Top Navigation)
- **🔀 Hybrid Mode**: Keyword + semantic search (default)
- **🔤 Keyword Mode**: Traditional fast text matching
- **🧠 Semantic Mode**: Pure AI understanding
- Click the mode icon to switch between search types

### AI Assistant (Floating Chat)
- **💬 Natural Conversation**: Ask questions in plain English
- **📚 Documentation References**: AI cites actual docs
- **💡 Quick Actions**: Pre-configured helpful prompts
- **🎨 Beautiful UI**: Smooth animations and responsive design

## 🔧 Advanced Configuration

### Customizing AI Assistant Behavior

Edit `src/components/AIAssistant/index.tsx`:

```tsx
<Markprompt
  projectKey={projectKey}
  model={{
    model: 'gpt-4', // or 'gpt-3.5-turbo' for faster/cheaper
    systemPrompt: `Your custom system prompt here...`
  }}
  display={{
    placeholder: "Your custom placeholder...",
    iDontKnowMessage: "Your custom fallback message..."
  }}
  // ... other options
/>
```

### Integrating with Your Own Data

You can configure Markprompt to use different data sources:

1. **Markprompt's built-in scraping** (easiest)
2. **Meilisearch integration** (best for hybrid search)
3. **Custom API endpoints**

### Styling Customization

Override styles in `src/css/ai-assistant.css`:

```css
/* Custom AI Assistant colors */
.ai-assistant-fab {
  background: linear-gradient(135deg, #your-color, #your-dark-color);
}

.ai-assistant-container {
  width: 500px; /* Make it wider */
  height: 700px; /* Make it taller */
}
```

## 🎨 UI Features

### Floating Action Button
- **Position**: Bottom-right corner (mobile responsive)
- **States**: Chat closed (🤖) vs open (✕)
- **Tooltip**: Helpful context on hover
- **Animation**: Smooth scale and rotate effects

### Chat Interface
- **Header**: Project branding and close button
- **Content**: Markprompt chat interface with custom styling
- **Quick Actions**: Pre-configured helpful questions
- **Backdrop**: Click outside to close

### Search Integration
- **Seamless**: AI can reference search results
- **Context-Aware**: Chat knows about current page
- **Fallback**: Search works even if AI is down

## 📝 Example Conversations

Try these with your AI Assistant:

### Getting Started
- *"How do I install Semgrep?"*
- *"What's the difference between Semgrep OSS and Pro?"*
- *"Show me a simple rule example"*

### Advanced Topics
- *"How do I write a rule for SQL injection?"*
- *"Explain taint mode and data flow analysis"*
- *"How do I set up CI/CD with GitHub Actions?"*

### Troubleshooting
- *"Why am I getting false positives?"*
- *"How do I exclude certain files from scanning?"*
- *"My Semgrep scan is slow, how can I optimize it?"*

## 🔧 Troubleshooting

### AI Assistant Not Appearing
1. **Check console errors** in browser dev tools
2. **Verify Markprompt key** is set correctly
3. **Ensure Layout wrapper** is properly imported

### AI Responses Are Generic
1. **Configure system prompt** with Semgrep-specific context
2. **Upload documentation** to Markprompt dashboard
3. **Enable search integration** for better context

### Search Not Working
1. **Check Meilisearch** is running (`curl http://localhost:7700/health`)
2. **Verify index exists** (`curl http://localhost:7700/indexes`)
3. **Check console logs** for API errors

### Performance Issues
1. **Use GPT-3.5** instead of GPT-4 for faster responses
2. **Reduce context window** in Markprompt settings
3. **Enable caching** in production deployment

## 🚀 Production Deployment

### Environment Variables

```bash
# Production environment
MEILISEARCH_HOST_URL=https://your-meilisearch-server.com
MEILISEARCH_API_KEY=your-production-search-key
MARKPROMPT_PROJECT_KEY=your-production-markprompt-key
```

### Security Considerations

1. **Use read-only API keys** for frontend
2. **Configure CORS** properly for Meilisearch
3. **Set rate limits** in Markprompt dashboard
4. **Monitor usage** to control costs

### Performance Optimization

1. **CDN for assets** and static content
2. **Cache Meilisearch** responses when possible
3. **Use edge functions** for AI processing if available
4. **Monitor response times** and adjust accordingly

## 💰 Cost Considerations

### Markprompt Pricing
- **Free tier**: Limited queries per month
- **Pro tier**: Higher limits + advanced features
- **Enterprise**: Custom pricing for high volume

### OpenAI Embeddings (Optional)
- **Text-embedding-3-small**: ~$0.13 per 1M tokens
- **Full indexing**: ~$3-5 for all documentation
- **Incremental updates**: Minimal ongoing cost

## 🎯 Best Practices

### Content Organization
1. **Clear headings** help AI understand structure
2. **Consistent terminology** improves responses
3. **Cross-references** enable better context

### AI Training
1. **Monitor conversations** for quality
2. **Update system prompts** based on common questions
3. **Provide feedback** to improve responses over time

### User Experience
1. **Quick actions** for common questions
2. **Clear placeholders** guide user input
3. **Graceful degradation** if AI is unavailable

---

🎉 **You now have a world-class documentation experience with both intelligent search AND conversational AI assistance!**

**Next steps:**
1. Customize the AI system prompt for your specific needs
2. Monitor user interactions to improve responses
3. Consider integrating with your support workflow

**Questions?** Try asking the AI assistant itself! 🤖
