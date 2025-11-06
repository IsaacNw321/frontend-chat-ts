import { useState, useEffect } from 'react';
//import { UserChat } from './UserChat';
import { getUserById } from '../utils/users';
//import { createChat } from '../utils/chat';
import { useLocation, useNavigate } from 'react-router-dom';
//import { getChats } from '../utils/chat';
import '../styles/sessions.css'
import { type User } from '../types';
const Chat = () => {
    
  const location = useLocation();
  const navigate = useNavigate();
  const { userId1, userId2 } = location.state || {};
  console.log(userId1, userId2)
  const [user1, setUser1] = useState<User | undefined >(undefined);
  const [user2, setUser2] = useState<User | undefined>(undefined);

  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    setIsLoading(true)
     const fetchUsersAndCreateChat = async () => {
      if (!userId1 || !userId2) {
        console.error('User IDs are not defined');
        return;
      }

     try {
        
         const user1Data = await getUserById(userId1);
         const user2Data = await getUserById(userId2);
         console.log("usuarios", user1Data, user2Data)
         setUser1(user1Data);
         setUser2(user2Data);
     } catch (error) {
         console.error('Error fetching users or creating chat:', error);
     } finally{
        setIsLoading(false)
     }
    }
    fetchUsersAndCreateChat();
  }, [])

 if(isLoading || user1 === null || user2 === null){
  return(
    <div className='loadingContainer'> 
        <h2 style={{width: '200px',height : '200px'}}>Cargando, espere por favor</h2>
        <span style={{width: '200px',height : '200px'}} className='loadingSpinner'></span> 
    </div>
  )
 }

  return (
    <div className='loginContainer'>
      <div className='chat-container'>
      <h2>{user1?.firstName && user2?.firstName !== undefined 
        ? `Chat entre ${user1.firstName} y ${user2.firstName}` 
        : null}  </h2>
      <button className='backButton' onClick={() => navigate('/dashboard')}>
        Regresar
      </button>
      </div>
    </div>
  );
};

export default Chat;