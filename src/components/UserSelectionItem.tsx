import useChatStore, { type User } from '../zustand/useChatStore';

interface UserSelectionItemProps {
  user: User;
}

const UserSelectionItem: React.FC<UserSelectionItemProps> = ({ user }) => {
  const { addUser, removeUser, selectedUsers } = useChatStore();

  const isSelected = selectedUsers.some(u => u.id === user.id);

  const handleToggleUser = () => {
    if (isSelected) {
      removeUser(user.id);
    } else {
      addUser(user);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', borderBottom: '1px solid #eee' }}>
      <span style={{ fontWeight: isSelected ? 'bold' : 'normal' }}>{user.name}</span>
      <button 
        onClick={handleToggleUser}
        style={{ 
          backgroundColor: isSelected ? '#ff4d4f' : '#52c41a', 
          color: 'white', 
          border: 'none', 
          padding: '5px 10px', 
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        {isSelected ? 'Remove' : 'Add'}
      </button>
    </div>
  );
};

export default UserSelectionItem;