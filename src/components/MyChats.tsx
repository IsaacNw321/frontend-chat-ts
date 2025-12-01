import type { ChatWitUsers, User, UserChats } from "../types"
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export const MyChats: React.FC<UserChats> = ({chats}) => {
  const { id: currentUserId } = useAuth();
  const navigate = useNavigate();

  const startChat = (allUserIds: string[]) => {
    navigate('/chat', { state: { userIds: allUserIds } });
  };

  return (
    <div>
      <h3 className="title-chats">
        Conversaciones anteriores
      </h3>
      <ul className="user-cards-grid">
        {chats.length === 0 ? null : (
          chats.map((chat: ChatWitUsers) => {
          const otherUserNames = chat.users
          .filter((user: User) => user.id !== currentUserId)
          .map((user: User) => user.userName)
          .join(', ');
          const allChatUserIds = chat.users.map((user: User) => user.id);
            return (
              <li key={chat.id} className="user-card">
                <div className="card-header">
                  <h3 className="user-name">
                    {otherUserNames || 'Chat Grupal'} 
                  </h3>
                </div>
                <button 
                onClick={() => startChat(allChatUserIds)}
                className="action-button"
                >
                  Chatear
                </button>
              </li>
            );
        })
        )}
      </ul>
    </div>
  ); 
}