import { useState, useEffect, useRef, useCallback } from 'react';
import io from 'socket.io-client';
import { sendMessage, getMessagesForChat } from '../utils/chats';
import { type UserChatProps } from '../types';

const socket = io(`${import.meta.env.VITE_BACKEND_URL_WEBSOCKET}`);

export const UserChat = ({ chatId, currentUser, allUsers }: UserChatProps) => { 
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<any[]>([]); 
    const messagesEndRef = useRef<HTMLDivElement>(null); 
    const getUserName = useCallback((userId: string) => {
        const user = allUsers.find(u => u.id === userId);
        return user ? user.userName : 'Usuario Desconocido';
    }, [allUsers]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(() => {
        const loadMessages = async () => {
            try {
                const chatData = await getMessagesForChat(chatId); 
                console.log(chatData)
                const savedMessages = chatData.messages;

                const initialMessages = savedMessages.map(msg => ({
                    ...msg, 
                    from: msg.fromId === currentUser?.id ? "Yo" : getUserName(msg.fromId),
                }));
                
                initialMessages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
                
                const welcomeMessage = { 
                    body: "Recuerda la educación, respeto y empatía en cada mensaje.", 
                    from: "Normas del Chat", 
                    fromId: "system" 
                }; 
                
                setMessages([welcomeMessage, ...initialMessages]);
            } catch (error) {
                console.error("Failed to load messages:", error);
                setMessages([{ body: "Recuerda la educacion, respeto y empatia en cada mensaje.", from: "Normas del Chat" }]);
            }
        };

        const receivedMessage = (message: any) => {
            const formattedMessage = {
                ...message,
                from: message.fromId === currentUser?.id ? "Yo" : getUserName(message.fromId)
            };
            setMessages((prevMessages) => [...prevMessages, formattedMessage]);
        };

        if (chatId) {
            socket.emit('joinRoom', { roomId: chatId });
            loadMessages();
            socket.on('message', receivedMessage);
        }
        
        return () => {
            if (chatId) {
                socket.emit('leaveRoom', { roomId: chatId });
                socket.off('message', receivedMessage);
            }
        };
    }, [chatId, currentUser?.id, getUserName]);
    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    
   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const messageBody = message.trim();
    if (!messageBody || !chatId || !currentUser?.id) return;
    const messagePayload = { 
        chatId: chatId, 
        fromId: currentUser.id,
        body: messageBody 
    };
    socket.emit('sendMessage', messagePayload);  
    setMessage('');
    try {
        await sendMessage(messagePayload); 
    } catch (error) {
        console.error("Failed to persist message via API:", error);
    }
};

    return (
        <>
        <div className="chat-container">
            <ul className="messages-list">
                {messages.map((msg, index) => (
                    <li 
                        key={index} 
                        className={`message-item ${msg.fromId === currentUser?.id ? "my-message" : "other-message"}`}
                    >
                        <p>
                            <strong>{msg.from}:</strong> {msg.body}
                        </p>
                    </li>
                ))}
                <div ref={messagesEndRef} />
            </ul>
            <form onSubmit={handleSubmit} className="message-form">
                <input
                    type="text"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    className="message-input"
                    placeholder="Escribe tu mensaje..."
                    disabled={!chatId} 
                />
                <button 
                    className="sendButton" 
                    type="submit" 
                    disabled={!message.trim() || !chatId}
                >
                    Enviar
                </button>
            </form>
        </div>
        </>
    );
};