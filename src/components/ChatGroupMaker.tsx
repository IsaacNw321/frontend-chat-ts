import useChatStore from '../zustand/useChatStore';

export const ChatGroupMaker: React.FC = () => {
  const { selectedUsers, removeUser, clearSelectedUsers } = useChatStore();

  const handleCreateGroup = () => {
    if (selectedUsers.length < 2) {
      alert('You need at least two other users to create a group chat.');
      return;
    }
    const userIds = selectedUsers.map(u => u.id);
    console.log("Creating group with users:", userIds);

    alert(`Group Chat created with ${selectedUsers.length} users! (API call placeholder)`);
    clearSelectedUsers(); 
  };

  return (
    <div className="chat-group-maker-panel" style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
      <h2>👥 Crear Chat Grupal</h2>
      
      {selectedUsers.length > 0 ? (
        <>
          <p>
            Usuarios seleccionados: {selectedUsers.length}
            {selectedUsers.length > 0 && 
              <button 
                onClick={clearSelectedUsers} 
                style={{ marginLeft: '10px', color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}
              >
                (Quitar todos)
              </button>
            }
          </p>
          <ul className="selected-users-list" style={{ listStyle: 'none', padding: 0 }}>
            {selectedUsers.map(user => (
              <li key={user.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0' }}>
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
        </>
      ) : (
        <p>Selecciona los usuarios para el grupo minimo 2.</p>
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
          marginTop: '10px'
        }}
      >
        Crear Grupo ({selectedUsers.length})
      </button>
    </div>
  );
};