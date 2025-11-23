import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Role } from "../types";
interface ButtonsCard {
  userId : string
}
export const ButtonsCard = ({ userId  } : ButtonsCard) => {
  const {id, role} = useAuth()
    const handleDelete = () => {
        alert(`This is not working yet`);
    };
    const navigate = useNavigate()
       const startChat = (userId : string) => {
          const userIdsArray = [id, userId]; 
          navigate('/chat', { state: { userIds: userIdsArray } });
       };
    return (
        <div className="card-actions">
            <button 
                onClick={() => startChat(userId)}
                className="action-button primary-btn"
            >
                Empezar Chat
            </button>
            {
              role === Role.USER ? null :   
            <button 
                onClick={handleDelete}
                className="action-button secondary-btn delete-btn"
            >
                Eliminar
            </button>
            }
        </div>
    );
}