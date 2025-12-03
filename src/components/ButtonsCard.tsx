import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Role } from "../types";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { deleteUser } from "../utils/users";

interface ButtonsCardProps {
  userId : string
}

export const ButtonsCard = ({ userId } : ButtonsCardProps) => {
  const axiosPrivate = useAxiosPrivate()
  const {id, role} = useAuth()
  const navigate = useNavigate()
  const queryClient = useQueryClient();

  const startChat = (userId : string) => {
    const userIdsArray = [id, userId];
    navigate('/chat', { state: { userIds: userIdsArray } });
  };

  const deleteMutation = useMutation({
    mutationFn: () => {
        const controller = new AbortController();
        
        return deleteUser(axiosPrivate, userId, controller);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      alert(`Usuario eliminado.`);
    },
    onError: (error: Error) => {
      console.error("Deletion failed:", error);
      alert(`Ha habido un error al eliminar el usuario: ${error.message}`);
    },
  });

  const handleDelete = () =>{
    deleteMutation.mutate();
  }

  return (
    <div className="card-actions">
      <button 
        onClick={() => startChat(userId)}
        className="action-button primary-btn"
      >
        Chatear
      </button>
      {
        role === Role.USER ? null :  
        <button 
          onClick={handleDelete}
          className="action-button secondary-btn delete-btn"
          disabled={deleteMutation.isPending} 
        >
          {deleteMutation.isPending ? 'Eliminando...' : 'Eliminar'}
        </button>
      }
    </div>
  );
}