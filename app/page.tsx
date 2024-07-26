// app/page.tsx
'use client'; // Ensure this component is client-side

import { useState } from 'react';
import axios from 'axios';

const Chat = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post('/api/chat', { message: input });
      const botMessage = { role: 'bot', content: response.data.reply };
      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }

    setInput('');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Chatbot</h1>
      <div style={styles.chatWindow}>
        {messages.map((msg, index) => (
          <div key={index} style={msg.role === 'user' ? styles.userMessage : styles.botMessage}>
            <strong>{msg.role === 'user' ? 'You' : 'Bot'}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.button}>Send</button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#121212',
    color: 'white',
    padding: '20px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  chatWindow: {
    flex: 1,
    overflowY: 'auto',
    padding: '10px',
    border: '1px solid #333',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  userMessage: {
    marginBottom: '10px',
    padding: '10px',
    borderRadius: '8px',
    backgroundColor: '#1E1E1E',
    textAlign: 'right',
  },
  botMessage: {
    marginBottom: '10px',
    padding: '10px',
    borderRadius: '8px',
    backgroundColor: '#333',
  },
  inputContainer: {
    display: 'flex',
  },
  input: {
    flex: 1,
    padding: '10px',
    border: '1px solid #333',
    borderRadius: '8px',
    backgroundColor: '#1E1E1E',
    color: 'white',
  },
  button: {
    padding: '10px 20px',
    marginLeft: '10px',
    backgroundColor: '#6200EE',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    cursor: 'pointer',
  },
};

export default Chat;
