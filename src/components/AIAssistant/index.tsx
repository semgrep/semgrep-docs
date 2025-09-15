import React, { useState, useEffect } from 'react';
import { Markprompt } from '@markprompt/react';
import './styles.css';

interface AIAssistantProps {
  projectKey?: string;
  placeholder?: string;
  iDontKnowMessage?: string;
  referencesHeading?: string;
  loadingHeading?: string;
  apiUrl?: string;
}

// Demo Chat Component that works without API key
const DemoChat: React.FC<{ placeholder: string }> = ({ placeholder }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '👋 Hi! I\'m the Semgrep AI Assistant demo. While you can type here, I need a Markprompt API key to provide real answers.\n\n✨ **Your semantic search is working perfectly!** Try searching in the top navigation bar.\n\n🔧 **To enable real AI chat:**\n1. Sign up at [markprompt.com](https://markprompt.com)\n2. Get your project key\n3. Update `src/theme/Layout/index.tsx`\n\n💡 **Try searching for:** "taint mode", "writing rules", "CI setup"'
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const demoResponse = {
      role: 'assistant',
      content: `I see you asked: "${input}"\n\n🤖 I'd love to help, but I need a real Markprompt API key to provide intelligent answers about Semgrep!\n\n🔍 **In the meantime, try the semantic search above** - it's already working and very powerful!\n\n⭐ **Popular searches:**\n• "How to write Semgrep rules"\n• "CI/CD integration guide"\n• "Taint analysis tutorial"`
    };

    setMessages([...messages, userMessage, demoResponse]);
    setInput('');
  };

  return (
    <div className="demo-chat">
      <div className="demo-chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            <div className="message-content">
              {message.content.split('\n').map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="demo-chat-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          className="demo-chat-input"
        />
        <button type="submit" className="demo-chat-send">
          Send
        </button>
      </form>
    </div>
  );
};

const AIAssistant: React.FC<AIAssistantProps> = ({
  projectKey = 'your-markprompt-project-key',
  placeholder = '💬 Ask me anything about Semgrep...',
  iDontKnowMessage = "I don't know how to answer that. Try rephrasing your question or check our documentation for more details.",
  referencesHeading = '📚 References',
  loadingHeading = '🤔 Thinking...',
  apiUrl,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before rendering (SSR safety)
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  if (!mounted) {
    return null; // Don't render during SSR
  }

  return (
    <>
      {/* Floating Chat Button */}
      <div className="ai-assistant-fab" onClick={handleToggle}>
        <div className="fab-icon">
          {isOpen ? '✕' : '🤖'}
        </div>
        <div className="fab-tooltip">
          {isOpen ? 'Close AI Assistant' : 'Ask AI Assistant'}
        </div>
      </div>

      {/* Chat Interface */}
      {isOpen && (
        <div className="ai-assistant-container">
          <div className="ai-assistant-header">
            <div className="header-content">
              <span className="assistant-title">
                🤖 Semgrep AI Assistant
              </span>
              <button 
                className="close-button"
                onClick={handleToggle}
                aria-label="Close AI Assistant"
              >
                ✕
              </button>
            </div>
            <div className="assistant-subtitle">
              Ask questions about Semgrep, rules, configuration, and more!
            </div>
          </div>

          <div className="ai-assistant-content">
            {projectKey === 'your-markprompt-project-key' ? (
              <DemoChat placeholder={placeholder} />
            ) : (
              <Markprompt
                projectKey={projectKey}
                placeholder={placeholder}
                iDontKnowMessage={iDontKnowMessage}
                className="markprompt-custom"
              />
            )}
          </div>

          {/* Quick Actions */}
          <div className="ai-assistant-quick-actions">
            <div className="quick-actions-title">💡 Quick Questions:</div>
            <div className="quick-actions-grid">
              <button 
                className="quick-action-btn"
                onClick={() => {
                  // This would trigger a question in the chat
                  console.log('Quick action: Getting started');
                }}
              >
                🚀 Getting Started
              </button>
              <button 
                className="quick-action-btn"
                onClick={() => {
                  console.log('Quick action: Writing rules');
                }}
              >
                📝 Writing Rules
              </button>
              <button 
                className="quick-action-btn"
                onClick={() => {
                  console.log('Quick action: CI/CD setup');
                }}
              >
                ⚙️ CI/CD Setup
              </button>
              <button 
                className="quick-action-btn"
                onClick={() => {
                  console.log('Quick action: Troubleshooting');
                }}
              >
                🔧 Troubleshooting
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="ai-assistant-backdrop"
          onClick={handleToggle}
        />
      )}
    </>
  );
};

export default AIAssistant;
