import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const student_id = 1; // ví dụ

  const chatEndRef = useRef(null);

  const fetchMessages = async () => {
    const res = await axios.get(`http://localhost:5001/api/messages/${student_id}`);
    setMessages(res.data);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    setIsLoading(true);
    const userMessage = input.trim();
    setInput('');
    
    try {
      // 1. Lưu message học sinh vào DB
      const newMsg = {
          student_id,
          sender: 'student',
          content: userMessage,
          emotion: null,
      };
      await axios.post(`http://localhost:5001/api/messages`, newMsg);
      fetchMessages();

      // 2. Gọi AI trả lời
      const aiRes = await axios.post(`http://localhost:5001/api/ai/chat`, { message: userMessage });
      const botReply = {
          student_id,
          sender: 'bot',
          content: aiRes.data.reply,
          emotion: null,
      };

      await axios.post(`http://localhost:5001/api/messages`, botReply);
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // ngăn newline
      sendMessage();
    }
  };
    
  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <div className="header-info">
          <div className="bot-avatar">🤖</div>
          <div>
            <h3>AI Assistant</h3>
            <span className="status">Online</span>
          </div>
        </div>
      </div>
      
      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender === 'student' ? 'user-message' : 'bot-message'}`}>
            <div className="message-avatar">
              {msg.sender === 'student' ? '👤' : '🤖'}
            </div>
            <div className="message-content">
              <div className="message-bubble">
                {msg.content}
              </div>
              <div className="message-time">
                {new Date(msg.created_at).toLocaleTimeString('vi-VN', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message bot-message">
            <div className="message-avatar">🤖</div>
            <div className="message-content">
              <div className="message-bubble typing">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      
      <div className="chat-input-container">
        <input
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nhập tin nhắn của bạn..."
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
        <button 
          className={`send-button ${isLoading ? 'disabled' : ''}`}
          onClick={sendMessage}
          disabled={isLoading || !input.trim()}
        >
          {isLoading ? '⏳' : '📤'}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
