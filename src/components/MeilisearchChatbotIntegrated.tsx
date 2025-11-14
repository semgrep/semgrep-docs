import React, { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
  sources?: Array<{
    title: string;
    url: string;
    snippet: string;
  }>;
}

interface MeilisearchChatbotIntegratedProps {
  hostUrl?: string;
  indexUid?: string;
  initialQuery?: string;
  onClose?: () => void;
  standalone?: boolean;
}

const MeilisearchChatbotIntegrated: React.FC<MeilisearchChatbotIntegratedProps> = ({
  hostUrl,
  indexUid = 'semgrep_docs',
  initialQuery,
  onClose,
  standalone = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '👋 Hi! I\'m your Semgrep documentation assistant. Ask me anything about Semgrep rules, CI/CD integration, or security scanning!',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const hasProcessedInitialQuery = useRef(false);

  useEffect(() => {
    if (initialQuery && !hasProcessedInitialQuery.current) {
      hasProcessedInitialQuery.current = true;
      setInput(initialQuery);
      setIsOpen(true);
      setTimeout(() => {
        handleSendWithQuery(initialQuery);
      }, 500);
    }
  }, [initialQuery]);

  useEffect(() => {
    const handleOpenChat = (event: CustomEvent) => {
      const { query } = event.detail;
      setInput(query);
      setIsOpen(true);
      setTimeout(() => handleSendWithQuery(query), 500);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('openChat' as any, handleOpenChat);
      return () => window.removeEventListener('openChat' as any, handleOpenChat);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  const getChatUrl = () => {
    if (typeof window === 'undefined') return '';
    
    const isNetlify = window.location.hostname.includes('netlify.app') || 
                      window.location.hostname.includes('deploy-preview');
    const isLocalhost = window.location.hostname === 'localhost' || 
                        window.location.hostname === '127.0.0.1';
    
    if (hostUrl) return hostUrl;
    
    if (isNetlify || isLocalhost) {
      return `${window.location.origin}/.netlify/functions/meilisearch-chat`;
    }
    
    return 'https://ms-0e8ae24505f7-30518.sfo.meilisearch.io/chat';
  };

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleSendWithQuery = async (queryText: string) => {
    if (!queryText.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: queryText.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const chatUrl = getChatUrl();
      const response = await fetch(chatUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          index: indexUid
        })
      });

      if (response.ok) {
        const data = await response.json();
        const assistantMessage: Message = {
          role: 'assistant',
          content: data.answer || 'Sorry, I couldn\'t generate a response.',
          sources: data.sources || [],
          timestamp: new Date()
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error('Failed to get response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '❌ Sorry, I encountered an error. Please try again or search the documentation directly.',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => handleSendWithQuery(input);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
    if (onClose) onClose();
  };

  const suggestedQuestions = [
    'How do I write my first Semgrep rule?',
    'How to integrate Semgrep with CI/CD?',
    'What is taint mode?',
    'How do I ignore false positives?'
  ];

  if (!isOpen && standalone) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '64px',
          height: '64px',
          borderRadius: '32px',
          background: 'linear-gradient(135deg, #00D4AA 0%, #00A67D 100%)',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 8px 32px rgba(0, 212, 170, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '32px',
          zIndex: 9999,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          animation: 'pulse 2s infinite'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)';
          e.currentTarget.style.boxShadow = '0 12px 48px rgba(0, 212, 170, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 212, 170, 0.4)';
        }}
        title="Chat with Semgrep Assistant"
        aria-label="Open chat"
      >
        💬
      </button>
    );
  }

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: standalone ? 'fixed' : 'absolute',
        bottom: standalone ? '24px' : '100%',
        right: standalone ? '24px' : '0',
        width: isMinimized ? '320px' : '420px',
        height: isMinimized ? '60px' : '680px',
        background: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 9999,
        overflow: 'hidden',
        border: '1px solid rgba(0, 212, 170, 0.2)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        animation: 'slideUp 0.4s ease-out',
        marginBottom: standalone ? '0' : '10px'
      }}
    >
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #00D4AA 0%, #00A67D 100%)',
          color: 'white',
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: '20px 20px 0 0',
          boxShadow: '0 4px 20px rgba(0, 212, 170, 0.2)',
          cursor: isMinimized ? 'pointer' : 'default'
        }}
        onClick={() => isMinimized && setIsMinimized(false)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px'
          }}>
            ✨
          </div>
          <div>
            <div style={{ fontWeight: '700', fontSize: '17px', letterSpacing: '-0.2px' }}>
              Ask AI
            </div>
            <div style={{ fontSize: '13px', opacity: 0.9, fontWeight: '400' }}>
              {isLoading ? 'Thinking...' : 'Powered by Meilisearch'}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMinimized(!isMinimized);
            }}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              color: 'white',
              fontSize: '20px',
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: '8px',
              lineHeight: '1',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
            title={isMinimized ? 'Maximize' : 'Minimize'}
          >
            {isMinimized ? '□' : '_'}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              color: 'white',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '0 8px',
              borderRadius: '8px',
              lineHeight: '1',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
            title="Close"
          >
            ×
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages - Same as before but shorter for brevity */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              background: 'linear-gradient(180deg, #F9FAFB 0%, #F3F4F6 100%)'
            }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: message.role === 'user' ? 'flex-end' : 'flex-start',
                  gap: '8px',
                  animation: 'fadeIn 0.3s ease-out'
                }}
              >
                <div
                  style={{
                    maxWidth: '85%',
                    padding: '14px 18px',
                    borderRadius: message.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    background: message.role === 'user' 
                      ? 'linear-gradient(135deg, #00D4AA 0%, #00A67D 100%)'
                      : 'white',
                    color: message.role === 'user' ? 'white' : '#1F2937',
                    fontSize: '15px',
                    lineHeight: '1.6',
                    boxShadow: message.role === 'user'
                      ? '0 4px 12px rgba(0, 212, 170, 0.3)'
                      : '0 2px 8px rgba(0, 0, 0, 0.1)',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    position: 'relative'
                  }}
                >
                  <div
                    dangerouslySetInnerHTML={{ 
                      __html: message.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    }}
                  />
                  <button
                    onClick={() => copyToClipboard(message.content, index)}
                    style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      background: 'rgba(0, 0, 0, 0.1)',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '4px 8px',
                      fontSize: '11px',
                      cursor: 'pointer',
                      opacity: 0.6,
                      color: message.role === 'user' ? 'white' : '#6B7280'
                    }}
                    title="Copy"
                  >
                    {copiedIndex === index ? '✓' : '📋'}
                  </button>
                </div>
                
                {message.sources && message.sources.length > 0 && (
                  <div style={{ 
                    maxWidth: '85%', 
                    fontSize: '13px',
                    background: 'white',
                    padding: '12px',
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
                  }}>
                    <div style={{ fontWeight: '600', marginBottom: '8px', color: '#374151' }}>📚 Sources:</div>
                    {message.sources.map((source, idx) => (
                      <div key={idx} style={{ marginBottom: '6px' }}>
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#00D4AA', textDecoration: 'none', fontWeight: '500' }}
                        >
                          {idx + 1}. {source.title} →
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                padding: '14px 18px',
                background: 'white',
                borderRadius: '18px 18px 18px 4px',
                maxWidth: '85%',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
              }}>
                <div className="typing-indicator">
                  <span></span><span></span><span></span>
                </div>
                <span style={{ fontSize: '14px', color: '#6B7280' }}>Thinking...</span>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            style={{
              padding: '20px 24px',
              borderTop: '1px solid rgba(0, 0, 0, 0.05)',
              background: 'white',
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-end'
            }}
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              disabled={isLoading}
              style={{
                flex: 1,
                border: '2px solid #E5E7EB',
                borderRadius: '12px',
                padding: '12px 16px',
                fontSize: '15px',
                resize: 'none',
                maxHeight: '120px',
                minHeight: '48px',
                fontFamily: 'inherit',
                outline: 'none',
                background: '#F9FAFB'
              }}
              rows={1}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              style={{
                background: input.trim() && !isLoading 
                  ? 'linear-gradient(135deg, #00D4AA 0%, #00A67D 100%)'
                  : '#D1D5DB',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '12px 20px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed',
                minWidth: '70px'
              }}
            >
              {isLoading ? '...' : 'Send'}
            </button>
          </div>
        </>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .typing-indicator {
          display: flex;
          gap: 4px;
        }
        
        .typing-indicator span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #00D4AA;
          animation: typingAnimation 1.4s infinite;
        }
        
        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }
        
        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }
        
        @keyframes typingAnimation {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-10px); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default MeilisearchChatbotIntegrated;

