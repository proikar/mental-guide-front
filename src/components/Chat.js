import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Chat.css';

function Chat() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null); // Реф для поля ввода

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      const botMessage = { role: 'bot', content: data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Ошибка при запросе к API:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'bot', content: 'Ошибка связи с сервером.' },
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="chat-container">
      <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <button className="menu-toggle" onClick={toggleSidebar}>
          ☰
        </button>
        <nav>
          <ul>
            <li>
              <Link to="/chat">
                {isSidebarOpen && <span className="text">Chat</span>}
              </Link>
            </li>
            <li>
              <Link to="/profile">
                {isSidebarOpen && <span className="text">Profile</span>}
              </Link>
            </li>
            <li>
              <Link to="/resources">
                {isSidebarOpen && <span className="text">Resources</span>}
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="chat-main">
        <h1>Chat with our AI Assistant</h1>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.role === 'user' ? 'user' : 'bot'}`}
            >
              {msg.content}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            ref={inputRef} // Привязываем ref к полю ввода
            disabled={isLoading}
          />
          <button onClick={handleSendMessage} disabled={isLoading}>
            {isLoading ? 'Waiting...' : 'Send'}
          </button>
        </div>
      </main>
    </div>
  );
}

export default Chat;