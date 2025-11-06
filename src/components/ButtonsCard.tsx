import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
interface ButtonsCard {
  userId : string
}
export const ButtonsCard = ({ userId  } : ButtonsCard) => {
  const {id} = useAuth()
  console.log(userId, "mY ID")
    const handleDelete = () => {
        alert(`Confirm delete for user ID: ${userId}`);
    };
    const navigate = useNavigate()
       const startChat = (userId : string) => {
          navigate('/chat', { state: { userId1: id, userId2: userId } });
       };
    return (
        <div className="card-actions">
            <button 
                onClick={() => startChat(userId)}
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