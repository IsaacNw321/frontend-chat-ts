
interface ButtonsCard {
  userId : string,
}
export const ButtonsCard = ({ userId  } : ButtonsCard) => {

    const handleChat = () => {
        alert(`Starting chat with user ID: ${userId}`);
    };

    const handleDelete = () => {
        alert(`Confirm delete for user ID: ${userId}`);
    };

    return (
        <div className="card-actions">
            <button 
                onClick={handleChat}
                className="action-button primary-btn"
            >
                Empezar Chat
            </button>
            <button 
                onClick={handleDelete}
                className="action-button secondary-btn delete-btn"
            >
                Eliminar
            </button>
        </div>
    );
}