import { type User } from "../types";
import { ButtonsCard } from "./ButtonsCard";
import useChatStore from "../zustand/useChatStore";
interface UserCardProps {
    user: User;
}

export const UserCard: React.FC<UserCardProps> = ({ user}) => {
    const { addUser, removeUser, selectedUsers } = useChatStore();
  const isSelected = selectedUsers.some(u => u.id === user.id);
  const handleToggleUser = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    if (isSelected) {
      removeUser(user.id);
    } else {
      addUser(user);
    }
  };
  const handleCardClick = () => {
    console.log("creating")
    // navigate(`/user/${user.id}`); 
  };
    return (
        <li key={user.id} className="user-card" onClick={handleCardClick}>
            <div className="card-header">
                <h3 className="user-name">{user.userName}</h3>
            </div>
            <button 
        onClick={handleToggleUser}
        className={`select-group-btn ${isSelected ? 'remove' : 'add'}`}
        style={{ marginTop: '10px', padding: '8px 12px', cursor: 'pointer', borderRadius: '4px' }}
      >
        {isSelected ? '❌ Remove' : '➕ Add to Group'}
      </button>
            <ButtonsCard userId={user.id}/>
        </li>
    );
};