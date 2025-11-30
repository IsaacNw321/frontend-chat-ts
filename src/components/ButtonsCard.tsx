import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Role } from "../types";
import { deleteUser } from "../utils/users"; 
import { useMutation, useQueryClient } from '@tanstack/react-query'; 

interface ButtonsCardProps { 
 userId : string
}

export const ButtonsCard = ({ userId } : ButtonsCardProps) => {
 const {id, role} = useAuth()
 const navigate = useNavigate()
 const queryClient = useQueryClient(); 

 const startChat = (userId : string) => {
  const userIdsArray = [id, userId]; 
  navigate('/chat', { state: { userIds: userIdsArray } });
 };
 
 const deleteMutation = useMutation({
  mutationFn: () => deleteUser(userId), 
  onSuccess: () => {

   queryClient.invalidateQueries({ queryKey: ['users'] }); 
  alert(`User ${userId} deleted successfully.`);
  },
  onError: (error) => {
   console.error("Deletion failed:", error);
   alert("Ha habido un error al eliminar el usuario.");
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
      Empezar Chat
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