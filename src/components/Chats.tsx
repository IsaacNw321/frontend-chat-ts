import { useState, useEffect } from 'react';
import { UserChat } from './Userchat';
import { createChat } from '../utils/chats';
import { useLocation } from 'react-router-dom';
import { getChatByUsers } from '../utils/chats'; 
import '../styles/sessions.css'
import { type ChatWitUsers, type User } from '../types';
import useAuth from '../hooks/useAuth';
interface ChatLocationState {
    userIds: string[]; 
}

const Chat = () => {
    const {id} = useAuth()
    const location = useLocation();
    const { userIds = [] } = (location.state as ChatLocationState) || {}; 

    const [users, setUsers] = useState<User[]>([]); 
    const [chatId, setChatId] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
    if (userIds.length < 2) {
        setIsLoading(false);
        return;
    }
    setIsLoading(true);

    const initializeChat = async () => {
        let chatResult: ChatWitUsers | undefined;
        let usersInChat: User[] = [];

        try {
            chatResult = await getChatByUsers(userIds); 
            if (chatResult) {
                usersInChat = chatResult.users; 
                setUsers(usersInChat)
            } else {             
                chatResult = await createChat({ userIds: userIds });

                if (chatResult) {
                    usersInChat = chatResult.users;
                } else {
                    setIsLoading(false);
                    return; 
                }
            }
            if (chatResult) {
                setChatId(chatResult.id);
                setUsers(usersInChat); 
            }

        } catch (error) {
            console.error('Error initializing chat:', error);
        } finally {
            setIsLoading(false);
        }
    };

    initializeChat();
}, [userIds]);
    const getChatTitle = (users: User[]): string => {
        if (users.length === 2) {
            return `Chat entre ${users[0].userName} y ${users[1].userName}`;
        }
        if (users.length > 2) {
            const userNames = users.map(u => u.userName);
            return `Chat Grupal: ${userNames.slice(0, 3).join(', ')}${userNames.length > 3 ? ` y ${userNames.length - 3} más` : ''}`;
        }
        return 'Cargando Chat...';
    };

    if (isLoading || users.length === 0 || chatId === undefined) {
        return (
            <div className='loadingContainer'> 
                <h2 style={{width: '200px',height : '200px'}}>Cargando, espere por favor</h2>
                <span style={{width: '200px',height : '200px'}} className='loadingSpinner'></span> 
            </div>
        );
    }
    const currentUser: User | undefined = users.find(user => user.id === id);
    return (
        <div className='Container'>
            <div className='chat-container'>
                <h2>{getChatTitle(users)}</h2>
                <UserChat chatId={chatId} currentUser={currentUser} allUsers={users}/>
            </div>
        </div>
    );
};

export default Chat;