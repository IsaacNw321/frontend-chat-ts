import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { UserChat } from './Userchat';
import { useLocation } from 'react-router-dom';
import { createChat } from '../utils/chats';
import '../styles/sessions.css'
import { type ChatWitUsers, type User, type PostChatPayload } from '../types';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { getChatByUsers } from '../utils/chats';

interface ChatLocationState {
  userIds: string[]; 
}

const Chat = () => {
  const axiosPrivate = useAxiosPrivate()
  const {id} = useAuth()
  const location = useLocation();
  const controller = new AbortController()
  const { userIds = [] } = (location.state as ChatLocationState) || {}; 

  const [users, setUsers] = useState<User[]>([]); 
  const [chatId, setChatId] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const createMutation = useMutation({
    mutationFn: (payload: PostChatPayload) => createChat(axiosPrivate, payload),
    onError: (error) => {
      console.error("Error creating chat:", error);
    }
  });

  useEffect(() => {
    return () => {
      controller.abort();
    };
  }, []);

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
        chatResult = await getChatByUsers(axiosPrivate, userIds , controller.signal as AbortSignal); 
        
        if (chatResult) {
          usersInChat = chatResult.users; 
        } else { 
          const payload: PostChatPayload = { userIds: userIds };
          chatResult = await createMutation.mutateAsync(payload);
          
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
  }, [userIds, createMutation.mutateAsync]); 

  const getChatTitle = (users: User[]): string => {
    if (users.length === 2) {
      const otherUser = users.find(u => u.id !== id);
      return `Chat con ${otherUser?.userName || 'Usuario'}`;
    }
    if (users.length > 2) {
      const userNames = users.map(u => u.userName);
      return `Chat Grupal: ${userNames.slice(0, 3).join(', ')}${userNames.length > 3 ? ` y ${userNames.length - 3} más` : ''}`;
    }
    return 'Cargando Chat...';
  };

  const isOverallLoading = isLoading || createMutation.isPending;
  
  if (isOverallLoading || users.length === 0 || chatId === undefined) {
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
        <h2 className='titleChat'>{getChatTitle(users)}</h2>
        <UserChat chatId={chatId} currentUser={currentUser} allUsers={users}/>
      </div>
    </div>
  );
};

export default Chat;