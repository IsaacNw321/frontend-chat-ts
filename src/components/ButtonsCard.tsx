import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Role } from "../types";
import { useMutation, useQueryClient } from '@tanstack/react-query'; 
import axios from "axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
interface ButtonsCardProps { 
 userId : string
}

export const ButtonsCard = ({ userId } : ButtonsCardProps) => {
  const axiosPrivate = useAxiosPrivate()
 const {id, role} = useAuth()
 const navigate = useNavigate()
 const queryClient = useQueryClient(); 
    const controller = new AbortController()
 const startChat = (userId : string) => {
  const userIdsArray = [id, userId]; 
  navigate('/chat', { state: { userIds: userIdsArray } });
 };
 const deleteUser = async (id: string| null): Promise<boolean| undefined> => {
    try {
        const response = await axiosPrivate.delete(`/users/${id}`,{
           signal : controller.signal
        });
        if(response.status === 200){
           return true 
        } else{
            return false
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || error.response?.statusText || "Failed to delete user");
        }
        throw error;
    }
};
 
 const deleteMutation = useMutation({
  mutationFn: () => deleteUser(userId), 
  onSuccess: () => {

   queryClient.invalidateQueries({ queryKey: ['users'] }); 
  alert(`Usuario eliminado.`);
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