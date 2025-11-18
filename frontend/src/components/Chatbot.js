import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
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
    if (!input) return;
    
    // 1. Lưu message học sinh vào DB
    const newMsg = {
        student_id,
        sender: 'student',
        content: input,
        emotion: null,
    };
    await axios.post(`http://localhost:5001/api/messages`, newMsg);

    setInput('');
    fetchMessages();

    // 2. Gọi AI trả lời
    const aiRes = await axios.post(`http://localhost:5001/api/ai/chat`, { message: input });
    const botReply = {
        student_id,
        sender: 'bot',
        content: aiRes.data.reply,
        emotion: null,
    };

    await axios.post(`http://localhost:5001/api/messages`, botReply);
    fetchMessages();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // ngăn newline
      sendMessage();
    }
  };
    
  return (
    <div style={{ maxWidth: 500, margin: 'auto', padding: 20 }}>
      <div style={{ border: '1px solid #ccc', height: 400, overflowY: 'scroll', padding: 10 }}>
        {messages.map((msg) => (
          <p key={msg.id}><b>{msg.sender}:</b> {msg.content}</p>
        ))}
        <div ref={chatEndRef} />
      </div>
      <input
        style={{ width: '80%', padding: 10 }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Nhập tin nhắn..."
        onKeyPress={handleKeyPress}
      />
      <button style={{ padding: 10 }} onClick={sendMessage}>Gửi</button>
    </div>
  );
};

export default Chatbot;
