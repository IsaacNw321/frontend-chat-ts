import useChatStore from '../zustand/useChatStore';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
interface ChatGroupMakerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatGroupMaker: React.FC<ChatGroupMakerProps> = ({ isOpen, onClose }) => {
  const { selectedUsers, removeUser, clearSelectedUsers } = useChatStore();
  const {id} = useAuth()
   const navigate = useNavigate()
  const handleCreateGroup = () => {
    if (selectedUsers.length < 2) {
      alert('You need at least two other users to create a group chat.');
      return;
    }
    const userIds = selectedUsers.map(u => u.id);
    const userIdsArray = [...userIds, id]; 
    navigate('/chat', { state: { userIds: userIdsArray } });
    clearSelectedUsers();
    onClose(); 
  };

  const asideStyle: React.CSSProperties = {
    position: 'fixed', 
    top: 0,
    left: 0,
    height: '100%',
    width: '350px',
    boxShadow: '2px 0 5px rgba(0,0,0,0.5)',
    zIndex: 1000,
    padding: '20px',
    transition: 'transform 0.3s ease-in-out',
    transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
    display: 'flex',
    flexDirection: 'column',
  };
  const usersContainerStyle: React.CSSProperties = {
    flexGrow: 1, 
    overflowY: 'auto', 
    maxHeight: 'calc(100vh - 200px)', 
    marginBottom: '15px',
  };

  return (
    <aside className="chat-group-maker-aside" style={asideStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h2>👥 Crear Chat Grupal</h2>
        <button
          onClick={onClose}
          style={{ 
            fontSize: '1.5rem', 
            border: 'none', 
            background: 'none', 
            cursor: 'pointer',
            color: '#333'
          }}
        >
          &times; 
        </button>
      </div>

      <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '10px 0' }} />
      
      {selectedUsers.length > 0 ? (
        <>
          <p>
            Usuarios seleccionados: {selectedUsers.length}
            <button 
              onClick={clearSelectedUsers} 
              style={{ marginLeft: '10px', color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}
            >
              (Quitar todos)
            </button>
          </p>
          
          <div style={usersContainerStyle}>
            <ul className="selected-users-list" style={{ listStyle: 'none', padding: 0 }}>
              {selectedUsers.map(user => (
                <li key={user.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px dotted #eee' }}>
                  {user.userName}
                  <button 
                    onClick={() => removeUser(user.id)}
                    style={{ color: 'blue', border: 'none', background: 'none', cursor: 'pointer' }}
                  >
                    (Quitar)
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <p>Selecciona los usuarios para el grupo (mínimo 2).</p>
      )}

      <button 
        onClick={handleCreateGroup}
        disabled={selectedUsers.length < 2}
        style={{ 
          padding: '10px 20px', 
          backgroundColor: selectedUsers.length >= 2 ? '#4CAF50' : '#cccccc',
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          cursor: selectedUsers.length >= 2 ? 'pointer' : 'not-allowed',
          marginTop: 'auto' 
        }}
      >
        Crear Grupo ({selectedUsers.length})
      </button>
    </aside>
  );
};