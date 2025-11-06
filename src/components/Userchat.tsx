import { useState, useEffect } from 'react';
//import io from 'socket.io-client';
//import { createMessage } from '../utils/messages';
//import { getChatById } from '../utils/chat';

//const socket = io(`${import.meta.env.VITE_BACKEND_URL}`);

export const UserChat = ({ chatId } : any) => {
   
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      body: "Recuerda la educacion, respeto y empatia en cada mensaje.",
      from: "Normas del Chat"
    }
  ]);
  useEffect(() => {
   // socket.emit('joinRoom', { roomId: chatId });

    return () => {
   //   socket.emit('leaveRoom', { roomId: chatId });
    };
  }, [chatId]);

  const handleSubmit = async (e : any) => {
    e.preventDefault();
    const newMessage = {
      body: message,
      from: "Yo",
      timestamp: new Date().toISOString()
    };
   // socket.emit('message', { roomId: chatId, message: message });
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage('');
   // const saveMessage = await createMessage({ chatId, fromId, body: message });
  };
/*
  useEffect(() => {
  
    const getMessages = async () => {
      const savedMessages = await getChatById(chatId);

      const chatMessages = savedMessages.messages.map(msg => ({
        body: msg.body,
        from: msg.fromId === fromId ? "Yo" : "Usuario",
        timestamp: msg.createdAt
      }));
      chatMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

      setMessages((prevMessages) => [
        ...prevMessages.filter(msg => msg.from === "Normas del Chat"),
        ...chatMessages
      ]);
    };
    getMessages();
  }, [chatId, fromId]);

  useEffect(() => {
    const receivedMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on('message', receivedMessage);
    return () => {
      socket.off('message', receivedMessage);
    };
  }, [messages]);
*/
  return (
    <div className="chat-container">
      <ul className="messages-list">
        {messages.map((msg, index) => (
          <li key={index} className={`message-item ${msg.from === "Yo" ? "my-message" : "other-message"}`}>
            <p><strong>{msg.from}:</strong> {msg.body}</p>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="message-form">
        <input
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          className="message-input"
          placeholder="Escribe tu mensaje..."
        />
        <button className="sendButton" type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
};